import fs from 'fs';

let content = fs.readFileSync('src/components/QuizEngine.tsx', 'utf8');

const startMarker = '{mounted && isModalOpen && createPortal(';
const endMarker = ', document.body)}';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker, startIndex);

if (startIndex === -1 || endIndex === -1) {
  console.log("Could not find portal markers");
  process.exit(1);
}

// The original modal div
const originalModal = content.substring(startIndex + startMarker.length, endIndex).trim();

// Build Variant 1: Restrained Chalkboard (Clean, mono, white/gray borders)
let v1 = originalModal
  .replace('max-w-md rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] border border-blue-900/40', 'max-w-md rounded-xl shadow-2xl border border-white/20 bg-[#0a0a0a]')
  .replace('text-lg font-bold text-gray-100', 'text-base font-mono font-bold text-gray-200 tracking-wide')
  .replace('text-cyan-400', 'text-gray-400')
  .replace('bg-black/20 border border-white/10 rounded-xl hover:bg-white/5', 'bg-transparent border-b border-white/10 rounded-none hover:bg-white/5')
  .replace('bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]', 'bg-white text-black hover:bg-gray-200 shadow-md');

// Build Variant 2: Configuration Tool (Wider, side-by-side labels)
let v2 = originalModal
  .replace('max-w-md rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] border border-blue-900/40', 'max-w-lg rounded-md shadow-[0_0_0_1px_rgba(255,255,255,0.1)] bg-[#111]')
  .replace('p-4 flex justify-between items-center', 'py-3 px-4 flex justify-between items-center gap-4')
  .replace('flex flex-col items-start', 'flex items-center gap-4 w-full')
  .replace(/<span className="text-\[10px\][^>]*>.*?<\/span>/g, '<span className="text-xs font-mono text-gray-500 uppercase w-32 shrink-0">Label</span>')
  .replace('text-sm font-bold text-gray-200 mt-1', 'text-sm text-gray-100 flex-1 text-right')
  .replace('bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]', 'bg-gray-800 border border-gray-600 hover:bg-gray-700 text-white shadow-none');

// Build Variant 3: Indigo Wash (Soft blue hue, softer shadows)
let v3 = originalModal
  .replace('max-w-md rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] border border-blue-900/40', 'max-w-md rounded-3xl shadow-[0_20px_60px_-15px_rgba(79,70,229,0.3)] border border-indigo-500/20 bg-[#0f111a]')
  .replace('bg-black/20 border border-white/10', 'bg-indigo-950/20 border border-indigo-500/10')
  .replace('text-cyan-500', 'text-indigo-400')
  .replace('text-cyan-400', 'text-indigo-400')
  .replace('bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500', 'bg-indigo-600 hover:bg-indigo-500');


const newContent = `${content.substring(0, startIndex + startMarker.length)}
        <div data-impeccable-variants="81b076b0" data-impeccable-variant-count="3" style={{ display: "contents" }}>
          {/* impeccable-variants-start 81b076b0 */}
          {/* Original */}
          <div data-impeccable-variant="original">
${originalModal}
          </div>
          {/* Variants: insert below this line */}
          <div data-impeccable-variant="1">
${v1}
          </div>
          <div data-impeccable-variant="2">
${v2}
          </div>
          <div data-impeccable-variant="3">
${v3}
          </div>
          {/* impeccable-variants-end 81b076b0 */}
        </div>
      ${content.substring(endIndex)}
`;

fs.writeFileSync('src/components/QuizEngine.tsx', newContent);
console.log("Successfully injected variants");
