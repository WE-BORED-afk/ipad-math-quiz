import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { exam_type, subject, category, topic, difficulty } = await req.json();

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 });
  }

  const prompt = `คุณเป็นผู้เชี่ยวชาญด้านการออกข้อสอบ ${subject || "คณิตศาสตร์"} สำหรับแนวข้อสอบ ${exam_type || "A-Level"} ${category ? "ในหมวดหมู่ " + category : ""}
ภารกิจของคุณคือสร้างโจทย์ในรูปแบบ JSON เท่านั้น
- ต้องใช้ภาษาไทย
- ใช้ LaTeX สำหรับสมการ ตัวแปร และสัญลักษณ์ทางวิทยาศาสตร์/คณิตศาสตร์ทั้งหมด (ครอบด้วย $...$)
- สำคัญมาก: ต้อง escape เครื่องหมาย backslash สำหรับคำสั่ง LaTeX ทุกครั้งด้วย double backslash (เช่น \\\\frac, \\\\pi, \\\\theta) เพื่อไม่ให้ JSON เกิด Error
- ตัวเลือก (options) ต้องมี 4 ตัวเลือกเท่านั้น
- อธิบายวิธีทำอย่างละเอียดเป็นขั้นเป็นตอนในช่อง explanation
- คำใบ้ (hints) ควรมี 2-3 ข้อ เพื่อช่วยไกด์ผู้เรียน
ห้ามมีข้อความใดๆ นอกเหนือจาก JSON

สร้างโจทย์ 1 ข้อ ${topic ? "เรื่อง " + topic : ""} ระดับความยาก ${difficulty || "ปานกลาง"} โดยผลลัพธ์ต้องตรงตามโครงสร้าง JSON นี้:
{
  "metadata": { "topic": "...", "sub_topic": "...", "difficulty": "...", "exam_type": "${exam_type || "A-Level"}" },
  "content": { "question": "...", "options": ["...", "...", "...", "..."], "correct_answer_index": 0, "hints": ["...", "..."], "explanation": "..." }
}`;

  const geminiRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { response_mime_type: "application/json" },
      }),
    }
  );

  if (!geminiRes.ok) {
    const err = await geminiRes.text();
    return NextResponse.json({ error: "Gemini API error", detail: err }, { status: 502 });
  }

  const geminiData = await geminiRes.json();
  let text: string = geminiData.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  // Fix unescaped backslashes from LaTeX before parsing
  text = text.replace(/\\(?!["\\/bfnrtu])/g, "\\\\");

  const quiz = JSON.parse(text);
  return NextResponse.json(quiz);
}
