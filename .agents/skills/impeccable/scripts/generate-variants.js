const fs = require('fs');

const originalJSX = `
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 animate-in fade-in duration-200">
                  <div className="v-modal w-full max-w-md bg-white dark:bg-black border border-gray-200 dark:border-white/10 flex flex-col relative shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
                    <div className="p-6 border-b border-gray-100 dark:border-white/10 flex justify-between items-center">
                      <h2 className="text-3xl text-gray-900 dark:text-white" style={{ fontFamily: 'var(--font-display), Georgia, serif' }}>
                        Settings
                      </h2>
                      <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="p-2 space-y-1 relative">
                      {expandedSection && (
                        <div 
                          className="fixed inset-0 z-40"
                          onClick={() => setExpandedSection("")}
                        />
                      )}

                      {/* Exam Type Dropdown */}
                      <div className={\`relative \${expandedSection === "examType" ? "z-50" : "z-40"}\`}>
                        <button 
                          onClick={() => setExpandedSection(expandedSection === "examType" ? "" : "examType")}
                          className="v-item w-full flex justify-between items-center rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors relative z-50"
                        >
                          <div className="flex flex-col items-start">
                            <span className="text-[11px] font-mono text-gray-500 uppercase tracking-widest">Exam Type</span>
                            <span className="text-base font-medium text-gray-900 dark:text-gray-100 mt-1">{examType}</span>
                          </div>
                          <ChevronDown className={\`w-5 h-5 text-gray-400 transition-transform \${expandedSection === "examType" ? "rotate-180" : ""}\`} />
                        </button>
                        {expandedSection === "examType" && (
                          <div className="absolute top-full left-0 right-0 mt-1 p-2 flex flex-col gap-1 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                            {EXAM_TYPES.map((e) => (
                              <button
                                key={e}
                                onClick={() => handleExamTypeChange(e)}
                                className={\`px-4 py-3 rounded-md text-sm font-medium text-left transition-all \${examType === e ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'}\`}
                              >
                                {e}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Subject Dropdown */}
                      <div className={\`relative \${expandedSection === "subject" ? "z-50" : "z-30"}\`}>
                        <button 
                          onClick={() => setExpandedSection(expandedSection === "subject" ? "" : "subject")}
                          className="v-item w-full flex justify-between items-center rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors relative z-50"
                        >
                          <div className="flex flex-col items-start">
                            <span className="text-[11px] font-mono text-gray-500 uppercase tracking-widest">Subject</span>
                            <span className={\`text-base font-medium mt-1 \${subject ? 'text-gray-900 dark:text-gray-100' : 'text-red-500 dark:text-red-400'}\`}>
                              {subject || "Select a subject"}
                            </span>
                          </div>
                          <ChevronDown className={\`w-5 h-5 text-gray-400 transition-transform \${expandedSection === "subject" ? "rotate-180" : ""}\`} />
                        </button>
                        {expandedSection === "subject" && (
                          <div className="absolute top-full left-0 right-0 mt-1 p-2 flex flex-col gap-1 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200 max-h-64 overflow-y-auto">
                            {EXAM_DATA[examType].map((s) => {
                              const isLocked = !s.active;
                              return (
                                <button
                                  key={s.name}
                                  disabled={isLocked}
                                  onClick={() => {
                                    setSubject(s.name);
                                    if (s.categories) {
                                      setCategory(s.categories[0]);
                                      setTopic(s.topics![s.categories[0]][0]);
                                      setExpandedSection("category");
                                    } else {
                                      setCategory("");
                                      setTopic("");
                                      setExpandedSection("difficulty");
                                    }
                                  }}
                                  className={\`px-4 py-3 rounded-md text-sm font-medium text-left transition-all flex justify-between items-center \${subject === s.name ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : isLocked ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-60' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}\`}
                                >
                                  <div className="flex flex-col">
                                    <span>{s.name}</span>
                                    {isLocked && <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-mono mt-0.5">Coming Soon</span>}
                                  </div>
                                  {isLocked && <Lock className="w-4 h-4 text-gray-400 dark:text-gray-600" />}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Category Dropdown */}
                      {hasCategories && (
                        <div className={\`relative \${expandedSection === "category" ? "z-50" : "z-20"}\`}>
                          <button 
                            onClick={() => setExpandedSection(expandedSection === "category" ? "" : "category")}
                            className="v-item w-full flex justify-between items-center rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors relative z-50"
                          >
                            <div className="flex flex-col items-start">
                              <span className="text-[11px] font-mono text-gray-500 uppercase tracking-widest">Category</span>
                              <span className="text-base font-medium text-gray-900 dark:text-gray-100 mt-1">{category}</span>
                            </div>
                            <ChevronDown className={\`w-5 h-5 text-gray-400 transition-transform \${expandedSection === "category" ? "rotate-180" : ""}\`} />
                          </button>
                          {expandedSection === "category" && currentSubjectData?.categories && (
                            <div className="absolute top-full left-0 right-0 mt-1 p-2 flex flex-col gap-1 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200 max-h-64 overflow-y-auto">
                              {currentSubjectData.categories.map((c) => (
                                <button
                                  key={c}
                                  onClick={() => {
                                    setCategory(c);
                                    setTopic(currentSubjectData.topics![c][0]);
                                    setExpandedSection("topic");
                                  }}
                                  className={\`px-4 py-3 rounded-md text-sm font-medium text-left transition-all \${category === c ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}\`}
                                >
                                  {c}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Topic Dropdown */}
                      {hasCategories && (
                        <div className={\`relative \${expandedSection === "topic" ? "z-50" : "z-10"}\`}>
                          <button 
                            onClick={() => setExpandedSection(expandedSection === "topic" ? "" : "topic")}
                            className="v-item w-full flex justify-between items-center rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors relative z-50"
                          >
                            <div className="flex flex-col items-start">
                              <span className="text-[11px] font-mono text-gray-500 uppercase tracking-widest">Topic</span>
                              <span className="text-base font-medium text-gray-900 dark:text-gray-100 mt-1">{topic}</span>
                            </div>
                            <ChevronDown className={\`w-5 h-5 text-gray-400 transition-transform \${expandedSection === "topic" ? "rotate-180" : ""}\`} />
                          </button>
                          {expandedSection === "topic" && currentSubjectData?.topics && (
                            <div className="absolute top-full left-0 right-0 mt-1 p-3 flex flex-wrap gap-2 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200 max-h-64 overflow-y-auto">
                              {currentSubjectData.topics[category].map((t) => (
                                <button
                                  key={t}
                                  onClick={() => {
                                    setTopic(t);
                                    setExpandedSection("difficulty");
                                  }}
                                  className={\`px-3 py-1.5 rounded-md text-xs font-mono transition-all border \${topic === t ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800/50 text-blue-700 dark:text-blue-300' : 'bg-transparent border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}\`}
                                >
                                  {t}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Difficulty Dropdown */}
                      <div className={\`relative \${expandedSection === "difficulty" ? "z-50" : "z-0"}\`}>
                        <button 
                          onClick={() => setExpandedSection(expandedSection === "difficulty" ? "" : "difficulty")}
                          className="v-item w-full flex justify-between items-center rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors relative z-50"
                        >
                          <div className="flex flex-col items-start">
                            <span className="text-[11px] font-mono text-gray-500 uppercase tracking-widest">Difficulty</span>
                            <span className="text-base font-medium text-gray-900 dark:text-gray-100 mt-1">{difficulty}</span>
                          </div>
                          <ChevronDown className={\`w-5 h-5 text-gray-400 transition-transform \${expandedSection === "difficulty" ? "rotate-180" : ""}\`} />
                        </button>
                        {expandedSection === "difficulty" && (
                          <div className="absolute bottom-full left-0 right-0 mb-1 p-3 grid grid-cols-3 gap-2 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                            {DIFFICULTIES.map((d) => (
                              <button
                                key={d}
                                onClick={() => {
                                  setDifficulty(d);
                                  setExpandedSection("");
                                }}
                                className={\`py-2 rounded-md text-xs font-mono transition-all border \${difficulty === d ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800/50 text-blue-700 dark:text-blue-300' : 'bg-transparent border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}\`}
                              >
                                {d}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-6 pt-4 mt-auto">
                      <button 
                        disabled={!subject}
                        onClick={() => {
                          if (subject) {
                            setIsModalOpen(false);
                            fetchNewQuiz();
                          }
                        }}
                        className={\`w-full py-4 rounded-xl font-bold font-mono text-sm transition-all flex items-center justify-center gap-2 uppercase tracking-widest \${
                          subject 
                            ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-[0_10px_15px_-3px_rgba(59,130,246,0.2)] hover:shadow-[0_15px_20px_-3px_rgba(59,130,246,0.3)]' 
                            : 'bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                        }\`}
                      >
                        Execute
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
`;

let v2 = originalJSX
  .replace(/v-modal w-full max-w-md bg-white dark:bg-black border border-gray-200 dark:border-white\/10 flex flex-col relative shadow-\[0_4px_30px_rgba\(0,0,0,0\.1\)\]/g, 
           'v-modal w-full max-w-lg bg-[#f8fafc] dark:bg-[#050505] border border-gray-200 dark:border-white/10 flex flex-col relative shadow-2xl')
  .replace(/flex flex-col items-start/g, 'flex flex-row items-center gap-4')
  .replace(/mt-1/g, 'mt-0')
  .replace(/<span className="text-\[11px\] font-mono text-gray-500 uppercase tracking-widest">([^<]+)<\/span>/g, '<span className="text-xs font-mono text-gray-500 uppercase tracking-widest w-24 text-left">$1</span>')
  .replace(/<div className="p-6 border-b border-gray-100 dark:border-white\/10 flex justify-between items-center">/g, '<div className="p-4 border-b border-gray-200 dark:border-white/5 flex justify-between items-center bg-gray-50 dark:bg-white/5">')
  .replace(/text-3xl text-gray-900 dark:text-white" style={{ fontFamily: 'var\(--font-display\), Georgia, serif' }}/g, 'text-sm font-mono text-gray-500 uppercase tracking-widest"');

let v3 = originalJSX
  .replace(/v-modal w-full max-w-md bg-white dark:bg-black border border-gray-200 dark:border-white\/10 flex flex-col relative shadow-\[0_4px_30px_rgba\(0,0,0,0\.1\)\]/g, 
           'v-modal w-full max-w-md bg-blue-50 dark:bg-[#020617] border-2 border-blue-100 dark:border-blue-900/50 flex flex-col relative shadow-[0_10px_40px_rgba(59,130,246,0.15)]')
  .replace(/bg-gray-50 dark:bg-white\/5/g, 'bg-blue-100/50 dark:bg-blue-900/20')
  .replace(/text-gray-900 dark:text-white/g, 'text-blue-900 dark:text-blue-50');

const template = \`
          {/* Variants: insert below this line */}
          <style data-impeccable-css="81b076b0">{\\\`
            @scope ([data-impeccable-variant="1"]) {
              :scope[data-p-radius="sharp"] .v-modal { border-radius: 0.375rem; }
              :scope[data-p-radius="round"] .v-modal { border-radius: 1rem; }
              :scope[data-p-shadow="1"] .v-modal { box-shadow: 0 4px 30px rgba(0,0,0,0.1); }
              :scope[data-p-shadow="0"] .v-modal { box-shadow: none; border: 1px solid var(--border-color, rgba(255,255,255,0.1)); }
              :scope[data-p-density="airy"] .v-item { padding: 1.25rem 1.5rem; }
              :scope[data-p-density="snug"] .v-item { padding: 0.75rem 1rem; }
            }
            @scope ([data-impeccable-variant="2"]) {
              :scope[data-p-radius="sharp"] .v-modal { border-radius: 0.25rem; }
              :scope[data-p-radius="round"] .v-modal { border-radius: 0.75rem; }
              :scope[data-p-density="airy"] .v-item { padding: 1rem; }
              :scope[data-p-density="snug"] .v-item { padding: 0.5rem 1rem; }
            }
            @scope ([data-impeccable-variant="3"]) {
              :scope[data-p-radius="round"] .v-modal { border-radius: 1.5rem; }
              :scope[data-p-radius="sharp"] .v-modal { border-radius: 0.5rem; }
            }
          \\\`}</style>

          <div data-impeccable-variant="1" data-impeccable-params='[
            {"id":"radius","kind":"steps","default":"round","label":"Corners","options":[{"value":"sharp","label":"Sharp"},{"value":"round","label":"Round"}]},
            {"id":"shadow","kind":"toggle","default":true,"label":"Elevation"},
            {"id":"density","kind":"steps","default":"airy","label":"Density","options":[{"value":"airy","label":"Airy"},{"value":"snug","label":"Snug"}]}
          ]'>
\${originalJSX}
          </div>
          <div data-impeccable-variant="2" style={{ display: "none" }} data-impeccable-params='[
            {"id":"radius","kind":"steps","default":"round","label":"Corners","options":[{"value":"sharp","label":"Sharp"},{"value":"round","label":"Round"}]},
            {"id":"density","kind":"steps","default":"snug","label":"Density","options":[{"value":"airy","label":"Airy"},{"value":"snug","label":"Snug"}]}
          ]'>
\${v2}
          </div>
          <div data-impeccable-variant="3" style={{ display: "none" }} data-impeccable-params='[
            {"id":"radius","kind":"steps","default":"round","label":"Corners","options":[{"value":"sharp","label":"Sharp"},{"value":"round","label":"Round"}]}
          ]'>
\${v3}
          </div>
\`;

const file = fs.readFileSync('src/components/QuizEngine.tsx', 'utf8');
const parts = file.split('{/* Variants: insert below this line */}');
if (parts.length > 1) {
  fs.writeFileSync('src/components/QuizEngine.tsx', parts[0] + '{/* Variants: insert below this line */}' + template + parts[1]);
} else {
  console.error("Could not find insertion point!");
}
