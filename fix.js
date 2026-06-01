const fs = require('fs');
let content = fs.readFileSync('src/components/QuizEngine.tsx', 'utf8');
let secondIndex = content.indexOf('"use client";', 10);
if (secondIndex !== -1) {
    fs.writeFileSync('src/components/QuizEngine.tsx', content.substring(secondIndex));
    console.log('Fixed QuizEngine.tsx');
} else {
    console.log('Second use client not found');
}
