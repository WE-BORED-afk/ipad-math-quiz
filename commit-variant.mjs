import fs from 'fs';

let content = fs.readFileSync('src/components/QuizEngine.tsx', 'utf8');

const wrapperStart = '<div data-impeccable-variants="81b076b0"';
const wrapperEnd = '{/* impeccable-variants-end 81b076b0 */}\n        </div>';

const startIndex = content.indexOf(wrapperStart);
const endIndex = content.indexOf(wrapperEnd, startIndex);

if (startIndex === -1 || endIndex === -1) {
  console.log("Could not find impeccable variants wrapper");
  process.exit(1);
}

const wrapperContent = content.substring(startIndex, endIndex + wrapperEnd.length);

const v2Start = '<div data-impeccable-variant="2">';
const v2Index = wrapperContent.indexOf(v2Start);

if (v2Index === -1) {
  console.log("Could not find variant 2");
  process.exit(1);
}

const nextVariant = '<div data-impeccable-variant="3">';
let v2EndIndex = wrapperContent.indexOf(nextVariant, v2Index);
if (v2EndIndex === -1) {
    v2EndIndex = wrapperContent.indexOf('{/* impeccable-variants-end', v2Index);
}

let v2Content = wrapperContent.substring(v2Index + v2Start.length, v2EndIndex).trim();

if (v2Content.endsWith('</div>')) {
    v2Content = v2Content.substring(0, v2Content.lastIndexOf('</div>')).trim();
}

const newContent = content.substring(0, startIndex) + v2Content + '\n' + content.substring(endIndex + wrapperEnd.length);

fs.writeFileSync('src/components/QuizEngine.tsx', newContent);
console.log("Variant 2 committed successfully");
