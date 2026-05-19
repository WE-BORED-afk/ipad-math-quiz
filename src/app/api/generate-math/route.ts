import { NextRequest, NextResponse } from "next/server";

function parseQuizJson(text: string) {
  // Strategy 1: Parse directly
  try {
    return JSON.parse(text);
  } catch { /* continue */ }

  // Strategy 2: Fix invalid backslash escapes (e.g. \pi, \alpha, \cdot)
  // Valid JSON escapes: \", \\, \/, \b, \f, \n, \r, \t, \uXXXX
  const fixed = text.replace(/\\(?!["\\\/bfnrtu]|u[0-9a-fA-F]{4})/g, "\\\\");
  try {
    return JSON.parse(fixed);
  } catch { /* continue */ }

  // Strategy 3: Remove control characters and try again
  const cleaned = fixed.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "");
  try {
    return JSON.parse(cleaned);
  } catch { /* continue */ }

  // Strategy 4: Extract from markdown code block
  const blockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (blockMatch) {
    const blockFixed = blockMatch[1].replace(/\\(?!["\\\/bfnrtu]|u[0-9a-fA-F]{4})/g, "\\\\");
    try {
      return JSON.parse(blockFixed);
    } catch { /* continue */ }
  }

  throw new Error(`Unable to parse JSON from Gemini response. Raw (first 300 chars): ${text.substring(0, 300)}`);
}

export async function POST(req: NextRequest) {
  try {
    const { exam_type, subject, category, topic, difficulty } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing GEMINI_API_KEY environment variable" }, { status: 500 });
    }

    const prompt = `คุณเป็นผู้เชี่ยวชาญด้านการออกข้อสอบ ${subject || "คณิตศาสตร์"} สำหรับแนวข้อสอบ ${exam_type || "A-Level"} ${category ? "ในหมวดหมู่ " + category : ""}
ภารกิจของคุณคือสร้างโจทย์ในรูปแบบ JSON เท่านั้น
- ต้องใช้ภาษาไทย
- ใช้ LaTeX สำหรับสมการ ตัวแปร และสัญลักษณ์ทางวิทยาศาสตร์/คณิตศาสตร์ทั้งหมด (ครอบด้วย $...$)
- สำคัญมาก: ในไฟล์ JSON ทุก backslash ของ LaTeX ต้องใส่เป็น double backslash เสมอ (เช่น \\\\frac, \\\\pi, \\\\theta, \\\\alpha, \\\\sqrt, \\\\cdot, \\\\times)
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
      console.error("Gemini API error:", err);
      return NextResponse.json({ error: "Gemini API error", detail: err }, { status: 502 });
    }

    const geminiData = await geminiRes.json();
    const text: string = geminiData.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    const quiz = parseQuizJson(text);
    return NextResponse.json(quiz);

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Route error:", message);
    return NextResponse.json({ error: "Internal server error", detail: message }, { status: 500 });
  }
}
