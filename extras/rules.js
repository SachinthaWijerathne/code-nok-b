const axios = require('axios')
const cheerio =require('cheerio')
const fs=require('fs')
const path=require('path')



async function fetchRules(game) {
  const RULES_URL = `https://gamer.lk/rules/${game}`;
  const OUTPUT_FILE = path.resolve(`rules_${game}.txt`);
  try {
    const { data } = await axios.get(RULES_URL);
    const $ = cheerio.load(data);

    const allParagraphs = $(".entry-content p")
      .map((_, el) => $(el).text().trim())
      .get();

    const rules = [];

    let inRuleSection = false;
    for (const para of allParagraphs) {
      if (/^4\./.test(para)) {
        inRuleSection = true;
        rules.push(para);
      } else if (inRuleSection) {
        if (/^[5-9]\./.test(para)) break;
        rules.push(para);
      }
    }

    if (!rules.length) {
      console.log("No rules found in section 4.");
      return;
    }

    // Strip all leading 4.x.x or 4.x. or 4. patterns
    const cleanedRules = rules.map((r) =>
      r.replace(/^4(\.\d+)*\.\s*-*\s*/, "").trim()
    );

    // Save as string array
    const output = `[\n${cleanedRules
      .map((r) => `  "${r.replace(/"/g, '\\"')}"`)
      .join(",\n")}\n]\n`;
    fs.writeFileSync(OUTPUT_FILE, output, "utf-8");
    console.log(`✔ Cleaned rules saved to ${OUTPUT_FILE}`);
  } catch (err) {
    console.error("❌ Failed to fetch or save Tekken 8 rules:", err.message);
  }
}

fetchRules('apex');
