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

const originalModal = content.substring(startIndex + startMarker.length, endIndex).trim();

// Base Light Mode Replacement Map
const applyLightMode = (str) => {
  return str
    .replace(/bg-\[#050505\] w-full max-w-md rounded-2xl shadow-\[0_0_50px_rgba\(6,182,212,0\.15\)\] border border-blue-900\/40/g, 'bg-white w-full max-w-md rounded-2xl shadow-xl border border-gray-200')
    .replace(/border-b border-white\/5 flex justify-between items-center bg-white\/5/g, 'border-b border-gray-100 flex justify-between items-center bg-gray-50/80')
    .replace(/text-lg font-bold text-gray-100/g, 'text-lg font-bold text-gray-900')
    .replace(/p-2 text-gray-400 hover:text-white hover:bg-white\/10/g, 'p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100')
    .replace(/bg-black\/20 border border-white\/10 rounded-xl hover:bg-white\/5/g, 'bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 shadow-sm')
    .replace(/text-\[10px\] font-mono text-cyan-500/g, 'text-[10px] font-mono text-blue-600 font-semibold')
    .replace(/text-sm font-bold text-gray-200 mt-1/g, 'text-sm font-bold text-gray-800 mt-1')
    .replace(/bg-\[#050505\] border border-cyan-500\/30/g, 'bg-white border border-gray-200 shadow-lg')
    .replace(/bg-blue-900\/30 text-cyan-400/g, 'bg-blue-50 text-blue-700 font-semibold')
    .replace(/text-gray-400 hover:bg-white\/5 hover:text-white/g, 'text-gray-600 hover:bg-gray-50 hover:text-gray-900')
    .replace(/text-gray-600 bg-white\/5/g, 'text-gray-400 bg-gray-50')
    .replace(/text-gray-500 hover:text-gray-300 hover:bg-white\/5/g, 'text-gray-500 hover:text-gray-800 hover:bg-gray-100')
    .replace(/bg-blue-500\/20 border-blue-400\/50 text-blue-200/g, 'bg-blue-50 border-blue-200 text-blue-700')
    .replace(/bg-cyan-500\/20 border-cyan-400\/50 text-cyan-200/g, 'bg-blue-50 border-blue-200 text-blue-700')
    .replace(/bg-black\/40 border-t border-white\/5/g, 'bg-gray-50 border-t border-gray-100')
    .replace(/bg-white\/10 text-gray-500 cursor-not-allowed border border-white\/5/g, 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200')
    .replace(/text-cyan-400/g, 'text-blue-500')
    .replace(/text-gray-100/g, 'text-gray-900')
    .replace(/text-gray-200/g, 'text-gray-800')
    .replace(/shadow-\[0_10px_40px_rgba\(0,0,0,0\.8\)\]/g, 'shadow-lg');
};

const baseLight = applyLightMode(originalModal);

// Variant 1: Pure Minimalist (Clean, crisp, white)
const v1 = baseLight;

// Variant 2: Soft Blue Theme (Light blue backgrounds)
const v2 = baseLight
  .replace('bg-white w-full max-w-md', 'bg-[#f8fafc] w-full max-w-md border-blue-100 shadow-blue-900/5')
  .replace('bg-gray-50/80', 'bg-blue-50/50')
  .replace(/bg-white border border-gray-200/g, 'bg-white border border-blue-100')
  .replace('bg-gray-50 border-t border-gray-100', 'bg-blue-50 border-t border-blue-100');

// Variant 3: Frosted Glass Light Mode (Translucent, modern)
const v3 = baseLight
  .replace('bg-white w-full max-w-md', 'bg-white/80 backdrop-blur-xl w-full max-w-md border-white/50 shadow-2xl')
  .replace('bg-gray-50/80', 'bg-white/40')
  .replace(/bg-white border border-gray-200/g, 'bg-white/60 backdrop-blur-md border border-white/40 shadow-sm')
  .replace('bg-gray-50 border-t border-gray-100', 'bg-white/40 border-t border-white/50');

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
console.log("Successfully injected Light Mode variants");
