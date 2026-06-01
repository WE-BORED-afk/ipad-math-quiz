"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { InlineMath } from "react-katex";
import { Loader2, Lightbulb, CheckCircle2, XCircle, RefreshCw, Settings, X, ChevronRight, ChevronDown, Lock } from "lucide-react";

// Data structure
interface MathQuiz {
  metadata: {
    topic: string;
    sub_topic: string;
    difficulty: string;
    exam_type: string;
  };
  content: {
    question: string;
    options: string[];
    correct_answer_index: number;
    hints: string[];
    explanation: string;
  };
}

const mockQuiz: MathQuiz = {
  metadata: {
    topic: "พีชคณิตและฟังก์ชัน",
    sub_topic: "เซต",
    difficulty: "ปานกลาง",
    exam_type: "A-Level"
  },
  content: {
    question: "กำหนดให้ $A = \\{1, 2, 3\\}$ และ $B = \\{2, 3, 4\\}$ จงหา $A \\cap B$",
    options: ["{1}", "{2, 3}", "{4}", "{1, 2, 3, 4}"],
    correct_answer_index: 1,
    hints: [
      "Interection ($\\cap$) คือการเอาสมาชิกที่ซ้ำกัน",
      "ลองดูว่าเลขไหนที่อยู่ในทั้ง A และ B"
    ],
    explanation: "$A \\cap B$ คือเซตของสมาชิกที่อยู่ในทั้ง A และ B ซึ่งคือ $\\{2, 3\\}$"
  }
};

type ExamType = "A-Level" | "TGAT" | "TPAT";

interface SubjectData {
  name: string;
  active: boolean;
  categories?: string[];
  topics?: Record<string, string[]>;
}

const EXAM_TYPES: ExamType[] = ["A-Level", "TGAT", "TPAT"];

const EXAM_DATA: Record<ExamType, SubjectData[]> = {
  "A-Level": [
    {
      name: "คณิตศาสตร์ประยุกต์ 1",
      active: true,
      categories: ["พีชคณิตและฟังก์ชัน", "มิติและรูปทรง", "การวิเคราะห์ข้อมูล"],
      topics: {
        "พีชคณิตและฟังก์ชัน": ["เซต", "ตรรกศาสตร์", "จำนวนจริง", "ฟังก์ชัน", "Expo-Log", "ตรีโกณมิติ"],
        "มิติและรูปทรง": ["เรขาคณิตวิเคราะห์", "ภาคตัดกรวย", "เมทริกซ์", "เวกเตอร์"],
        "การวิเคราะห์ข้อมูล": ["สถิติ", "ความน่าจะเป็น", "ลำดับและอนุกรม", "แคลคูลัสเบื้องต้น"]
      }
    },
    {
      name: "ฟิสิกส์",
      active: true,
      categories: ["กลศาสตร์", "คลื่นและแสง", "ไฟฟ้าและแม่เหล็ก"],
      topics: {
        "กลศาสตร์": ["การเคลื่อนที่แนวตรง", "แรงและกฎการเคลื่อนที่", "การเคลื่อนที่แบบต่างๆ", "งานและพลังงาน"],
        "คลื่นและแสง": ["คลื่นกล", "เสียง", "แสงเชิงฟิสิกส์", "แสงเชิงรังสี"],
        "ไฟฟ้าและแม่เหล็ก": ["ไฟฟ้าสถิต", "ไฟฟ้ากระแส", "แม่เหล็กไฟฟ้า"]
      }
    },
    {
      name: "เคมี",
      active: true,
      categories: ["เคมีพื้นฐาน", "เคมีกายภาพ", "เคมีอินทรีย์"],
      topics: {
        "เคมีพื้นฐาน": ["อะตอมและตารางธาตุ", "พันธะเคมี", "ปริมาณสารสัมพันธ์"],
        "เคมีกายภาพ": ["ของแข็ง ของเหลว แก๊ส", "อัตราการเกิดปฏิกิริยา", "สมดุลเคมี", "กรด-เบส"],
        "เคมีอินทรีย์": ["สารประกอบคาร์บอน", "เชื้อเพลิงซากดึกดำบรรพ์", "สารชีวโมเลกุล"]
      }
    },
    { name: "คณิตศาสตร์ประยุกต์ 2", active: false },
    { name: "วิทยาศาสตร์ประยุกต์", active: false },
    { name: "ชีววิทยา", active: false },
    { name: "ภาษาไทย", active: false },
    { name: "สังคมศึกษา", active: false },
    { name: "ภาษาอังกฤษ", active: false },
  ],
  "TGAT": [
    { name: "TGAT1 การสื่อสารภาษาอังกฤษ", active: false },
    { name: "TGAT2 การคิดอย่างมีเหตุผล", active: false },
    { name: "TGAT3 สมรรถนะการทำงาน", active: false },
  ],
  "TPAT": [
    { name: "TPAT1 กสพท", active: false },
    { name: "TPAT2 ศิลปกรรมศาสตร์", active: false },
"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { InlineMath } from "react-katex";
import { Loader2, Lightbulb, CheckCircle2, XCircle, RefreshCw, Settings, X, ChevronRight, ChevronDown, Lock } from "lucide-react";

// Data structure
interface MathQuiz {
  metadata: {
    topic: string;
    sub_topic: string;
    difficulty: string;
    exam_type: string;
  };
  content: {
    question: string;
    options: string[];
    correct_answer_index: number;
    hints: string[];
    explanation: string;
  };
}

const mockQuiz: MathQuiz = {
  metadata: {
    topic: "พีชคณิตและฟังก์ชัน",
    sub_topic: "เซต",
    difficulty: "ปานกลาง",
    exam_type: "A-Level"
  },
  content: {
    question: "กำหนดให้ $A = \\{1, 2, 3\\}$ และ $B = \\{2, 3, 4\\}$ จงหา $A \\cap B$",
    options: ["{1}", "{2, 3}", "{4}", "{1, 2, 3, 4}"],
    correct_answer_index: 1,
    hints: [
      "Interection ($\\cap$) คือการเอาสมาชิกที่ซ้ำกัน",
      "ลองดูว่าเลขไหนที่อยู่ในทั้ง A และ B"
    ],
    explanation: "$A \\cap B$ คือเซตของสมาชิกที่อยู่ในทั้ง A และ B ซึ่งคือ $\\{2, 3\\}$"
  }
};

type ExamType = "A-Level" | "TGAT" | "TPAT";

interface SubjectData {
  name: string;
  active: boolean;
  categories?: string[];
  topics?: Record<string, string[]>;
}

const EXAM_TYPES: ExamType[] = ["A-Level", "TGAT", "TPAT"];

const EXAM_DATA: Record<ExamType, SubjectData[]> = {
  "A-Level": [
    {
      name: "คณิตศาสตร์ประยุกต์ 1",
      active: true,
      categories: ["พีชคณิตและฟังก์ชัน", "มิติและรูปทรง", "การวิเคราะห์ข้อมูล"],
      topics: {
        "พีชคณิตและฟังก์ชัน": ["เซต", "ตรรกศาสตร์", "จำนวนจริง", "ฟังก์ชัน", "Expo-Log", "ตรีโกณมิติ"],
        "มิติและรูปทรง": ["เรขาคณิตวิเคราะห์", "ภาคตัดกรวย", "เมทริกซ์", "เวกเตอร์"],
        "การวิเคราะห์ข้อมูล": ["สถิติ", "ความน่าจะเป็น", "ลำดับและอนุกรม", "แคลคูลัสเบื้องต้น"]
      }
    },
    {
      name: "ฟิสิกส์",
      active: true,
      categories: ["กลศาสตร์", "คลื่นและแสง", "ไฟฟ้าและแม่เหล็ก"],
      topics: {
        "กลศาสตร์": ["การเคลื่อนที่แนวตรง", "แรงและกฎการเคลื่อนที่", "การเคลื่อนที่แบบต่างๆ", "งานและพลังงาน"],
        "คลื่นและแสง": ["คลื่นกล", "เสียง", "แสงเชิงฟิสิกส์", "แสงเชิงรังสี"],
        "ไฟฟ้าและแม่เหล็ก": ["ไฟฟ้าสถิต", "ไฟฟ้ากระแส", "แม่เหล็กไฟฟ้า"]
      }
    },
    {
      name: "เคมี",
      active: true,
      categories: ["เคมีพื้นฐาน", "เคมีกายภาพ", "เคมีอินทรีย์"],
      topics: {
        "เคมีพื้นฐาน": ["อะตอมและตารางธาตุ", "พันธะเคมี", "ปริมาณสารสัมพันธ์"],
        "เคมีกายภาพ": ["ของแข็ง ของเหลว แก๊ส", "อัตราการเกิดปฏิกิริยา", "สมดุลเคมี", "กรด-เบส"],
        "เคมีอินทรีย์": ["สารประกอบคาร์บอน", "เชื้อเพลิงซากดึกดำบรรพ์", "สารชีวโมเลกุล"]
      }
    },
    { name: "คณิตศาสตร์ประยุกต์ 2", active: false },
    { name: "วิทยาศาสตร์ประยุกต์", active: false },
    { name: "ชีววิทยา", active: false },
    { name: "ภาษาไทย", active: false },
    { name: "สังคมศึกษา", active: false },
    { name: "ภาษาอังกฤษ", active: false },
  ],
  "TGAT": [
    { name: "TGAT1 การสื่อสารภาษาอังกฤษ", active: false },
    { name: "TGAT2 การคิดอย่างมีเหตุผล", active: false },
    { name: "TGAT3 สมรรถนะการทำงาน", active: false },
  ],
  "TPAT": [
    { name: "TPAT1 กสพท", active: false },
    { name: "TPAT2 ศิลปกรรมศาสตร์", active: false },
    { name: "TPAT3 วิทยาศาสตร์ เทคโนโลยี และวิศวกรรมศาสตร์", active: false },
    { name: "TPAT4 สถาปัตยกรรมศาสตร์", active: false },
    { name: "TPAT5 ครุศาสตร์-ศึกษาศาสตร์", active: false },
  ]
};

const DIFFICULTIES = ["ง่าย", "ปานกลาง", "ยาก"];

const MODELS = [
  { id: "auto", name: "Auto (ลูปอัตโนมัติตามโควต้า)" },
  { id: "gemini-3.5-flash", name: "Gemini 3.5 Flash (ฉลาดสุด)" },
  { id: "gemini-3-flash", name: "Gemini 3 Flash" },
  { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash" },
  { id: "gemini-3.1-flash-lite", name: "Gemini 3.1 Flash Lite" },
  { id: "gemini-2.5-flash-lite", name: "Gemini 2.5 Flash Lite" },
  { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash (ด่านสุดท้าย/กันตาย)" },
];


export default function QuizEngine() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [quiz, setQuiz] = useState<MathQuiz | null>(mockQuiz);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hintLevel, setHintLevel] = useState(0);
  
  // Settings State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [examType, setExamType] = useState<ExamType>("A-Level");
  const [subject, setSubject] = useState("คณิตศาสตร์ประยุกต์ 1");
  const [category, setCategory] = useState("พีชคณิตและฟังก์ชัน");
  const [topic, setTopic] = useState("เซต");
  const [difficulty, setDifficulty] = useState("ปานกลาง");
  const [model, setModel] = useState("auto");
  const [expandedSection, setExpandedSection] = useState<string>("examType");

  const currentSubjectData = EXAM_DATA[examType].find(s => s.name === subject);
  const hasCategories = currentSubjectData?.categories && currentSubjectData.categories.length > 0;

  const handleExamTypeChange = (type: ExamType) => {
    setExamType(type);
    const firstActiveSubject = EXAM_DATA[type].find(s => s.active);
    if (firstActiveSubject) {
      setSubject(firstActiveSubject.name);
      if (firstActiveSubject.categories) {
        setCategory(firstActiveSubject.categories[0]);
        setTopic(firstActiveSubject.topics![firstActiveSubject.categories[0]][0]);
      } else {
        setCategory("");
        setTopic("");
      }
    } else {
      setSubject("");
      setCategory("");
      setTopic("");
    }
    setExpandedSection("subject");
  };

  const fetchNewQuiz = async () => {
    if (!subject) {
      alert("กรุณาเลือกวิชาที่รองรับการใช้งานก่อน");
      return;
    }
    
    setLoading(true);
    setSelectedOption(null);
    setHintLevel(0);
    
    try {
      const response = await fetch('/api/generate-math', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          exam_type: examType,
          subject: subject, 
          category: category, 
          topic: topic, 
          difficulty: difficulty,
          model: model === "auto" ? undefined : model
        })
      });
      
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || errData.error || `HTTP ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.content && data.metadata) {
        setQuiz(data as MathQuiz);
      } else {
        throw new Error("Invalid data format received from AI");
      }
    } catch (error) {
      console.error("Failed to fetch new quiz", error);
      alert(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  function renderMathText(text: string) {
    const parts = text.split('$');
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <InlineMath key={index} math={part} />;
      }
      return <span key={index}>{part}</span>;
    });
  }

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto flex flex-col gap-8 relative font-sans">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl">
          <div className="relative">
            <div className="absolute inset-0 border-2 border-cyan-400 rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-[-10px] bg-blue-500/20 blur-xl rounded-full"></div>
            <Loader2 className="w-12 h-12 animate-spin text-cyan-400 relative z-10" />
          </div>
          <p className="text-cyan-500/80 animate-pulse font-mono text-sm tracking-widest uppercase">system.generating(quiz)...</p>
        </div>
      )}
      {/* Settings Modal rendered via Portal to escape stacking context on iPad */}

      {mounted && isModalOpen && createPortal(
                    setIsModalOpen(false);
                    fetchNewQuiz();
                  }
                }}
                className={`w-full py-3 rounded-xl font-bold font-mono text-sm transition-all flex items-center justify-center gap-2 uppercase tracking-wide ${
                  subject 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                }`}
              >
                Execute
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      , document.body)}

      {/* Header Info */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex flex-col items-start gap-1 px-4 py-2 bg-white/5 dark:bg-[#0a0a0a]/50 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-xl shadow-sm hover:border-blue-400/50 dark:hover:border-cyan-500/50 hover:bg-white/10 dark:hover:bg-white/5 transition-all group"
        >
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-blue-600 dark:text-cyan-500 uppercase tracking-widest">
            <Settings className="w-3 h-3 group-hover:rotate-90 transition-transform duration-500" />
            <span>sys.{examType}.{subject || 'NO_SUBJ'}.{difficulty}</span>
          </div>
          <div className="text-base font-bold text-gray-900 dark:text-gray-200">{topic || subject || "โปรดเลือกวิชา"}</div>
        </button>
        
        <button 
          onClick={fetchNewQuiz}
          disabled={!subject}
          className={`p-3 rounded-full transition-all border ${
            subject 
              ? 'bg-white/5 dark:bg-[#0a0a0a]/50 border-transparent dark:border-white/5 text-gray-500 dark:text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]'
              : 'bg-white/5 border-white/5 text-gray-600 cursor-not-allowed opacity-50'
          }`}
          title="โจทย์ข้อถัดไป"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {quiz ? (
        <>
          {/* Question */}
          <div className="text-xl md:text-2xl leading-relaxed font-medium text-gray-900 dark:text-gray-100 bg-white/40 dark:bg-[#050505]/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-200/50 dark:border-white/5 shadow-sm">
            {renderMathText(quiz.content.question)}
          </div>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {quiz.content.options.map((option, idx) => {
              const isAnswered = selectedOption !== null;
              let btnClass = "border-gray-200 dark:border-white/10 hover:border-blue-400 dark:hover:border-cyan-500/50 hover:bg-white/50 dark:hover:bg-cyan-900/10 text-gray-700 dark:text-gray-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]";
              
              if (isAnswered) {
                if (idx === quiz.content.correct_answer_index) {
                  btnClass = "border-green-500/50 bg-green-50 dark:bg-green-500/10 text-green-800 dark:text-green-300 shadow-[0_0_20px_rgba(34,197,94,0.15)]";
                } else if (idx === selectedOption) {
                  btnClass = "border-red-500/50 bg-red-50 dark:bg-red-500/10 text-red-800 dark:text-red-300";
                } else {
                  btnClass = "border-gray-200 dark:border-white/5 opacity-40 bg-gray-50 dark:bg-transparent";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => setSelectedOption(idx)}
                  className={`flex items-center gap-4 w-full p-4 text-left border rounded-xl transition-all duration-300 backdrop-blur-sm ${btnClass}`}
                >
                  <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg border font-mono text-sm ${isAnswered ? 'border-current' : 'border-gray-300 dark:border-white/20'}`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <div className="text-lg flex-1 overflow-x-auto pb-1 no-scrollbar">
                    {renderMathText(option)}
                  </div>
                  
                  {isAnswered && idx === quiz.content.correct_answer_index && <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]" />}
                  {isAnswered && idx === selectedOption && idx !== quiz.content.correct_answer_index && <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />}
                </button>
              );
            })}
          </div>

          {/* Feedback & Hints */}
          <div className="mt-2 flex flex-col gap-4">
            {/* Hint System */}
            {selectedOption !== quiz.content.correct_answer_index && (
              <div className="flex flex-col gap-3">
                {quiz.content.hints.slice(0, hintLevel).map((hint, idx) => (
                  <div key={idx} className="p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl flex gap-3 text-amber-900 dark:text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.05)]">
                    <Lightbulb className="w-5 h-5 flex-shrink-0 text-amber-500" />
                    <div className="text-sm">
                      <span className="font-mono font-bold mr-2 text-[10px] uppercase tracking-widest text-amber-600 dark:text-amber-400">Hint {idx + 1}:</span>
                      {renderMathText(hint)}
                    </div>
                  </div>
                ))}
                
                {hintLevel < quiz.content.hints.length && (
                  <button 
                    onClick={() => setHintLevel(prev => prev + 1)}
                    className="self-start px-4 py-2 text-cyan-700 dark:text-cyan-400 bg-cyan-50/50 dark:bg-cyan-900/20 hover:bg-cyan-100 dark:hover:bg-cyan-900/40 border border-cyan-200 dark:border-cyan-800/50 rounded-lg text-xs font-mono transition-colors flex items-center gap-2 uppercase tracking-wide"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    Request_Hint ({quiz.content.hints.length - hintLevel} Left)
                  </button>
                )}
              </div>
            )}

            {/* Explanation (Shown when answered) */}
            {selectedOption !== null && (
              <div className={`p-5 rounded-xl border backdrop-blur-md ${selectedOption === quiz.content.correct_answer_index ? 'bg-green-50 dark:bg-green-500/5 border-green-200 dark:border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.05)]' : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10'} animate-in fade-in slide-in-from-bottom-4`}>
                <h4 className={`font-mono text-xs font-bold uppercase tracking-widest mb-3 ${selectedOption === quiz.content.correct_answer_index ? 'text-green-800 dark:text-green-400' : 'text-gray-800 dark:text-gray-400'}`}>
                  {selectedOption === quiz.content.correct_answer_index ? 'Status: Correct / Explanation' : 'Status: Incorrect / Explanation'}
                </h4>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed overflow-x-auto text-sm md:text-base">
                  {renderMathText(quiz.content.explanation)}
                </div>
                
                {selectedOption === quiz.content.correct_answer_index && (
                  <button 
                    onClick={fetchNewQuiz}
                    className="mt-6 w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl font-bold font-mono text-sm transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex justify-center items-center gap-2 uppercase tracking-wide"
                  >
                    Next_Problem <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex h-64 items-center justify-center">
          <button 
            onClick={fetchNewQuiz}
            disabled={!subject}
            className={`px-8 py-3 rounded-xl font-bold font-mono text-sm transition-all uppercase tracking-wide ${
              subject 
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]' 
                : 'bg-white/10 text-gray-500 cursor-not-allowed border border-white/5'
            }`}
          >
            {subject ? 'Init_System()' : 'LOCKED: Select Exam First'}
          </button>
        </div>
      )}
    </div>
  );
}

