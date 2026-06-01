const testApi = async () => {
  let successCount = 0;
  let failCount = 0;
  
  for (let i = 1; i <= 5; i++) {
    console.log(`\n--- Test ${i} ---`);
    try {
      const res = await fetch('https://ipad-math-quiz.vercel.app/api/generate-math', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exam_type: 'A-Level',
          subject: 'คณิตศาสตร์',
          topic: 'แคลคูลัส',
          difficulty: 'ยาก'
        })
      });
      
      const text = await res.text();
      if (!res.ok) {
        console.error(`Status ${res.status}:`, text);
        failCount++;
      } else {
        try {
          const data = JSON.parse(text);
          if (data && data.content && data.content.question) {
            console.log(`✅ Success! Question snippet: ${data.content.question.substring(0, 50)}...`);
            successCount++;
          } else {
            console.error(`❌ Invalid structure:`, text);
            failCount++;
          }
        } catch (e) {
          console.error(`❌ JSON Parse Error on raw response:`, text);
          failCount++;
        }
      }
    } catch (e) {
      console.error(`❌ Fetch error:`, e.message);
      failCount++;
    }
    
    // wait 1 second between requests to avoid rate limits
    await new Promise(r => setTimeout(r, 1000));
  }
  
  console.log(`\nResults: ${successCount} passed, ${failCount} failed.`);
};

testApi();
