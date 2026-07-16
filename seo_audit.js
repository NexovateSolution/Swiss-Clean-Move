const fs = require('fs');
const path = require('path');

const dePath = path.join(__dirname, 'messages', 'de.json');
const deData = JSON.parse(fs.readFileSync(dePath, 'utf8'));
const seoPages = deData.seoPages || {};
const keys = Object.keys(seoPages);

const report = {
  duplicateTitles: [],
  duplicateDescriptions: [],
  faqFrequencies: {},
  overusedFaqs: [],
  aiWordingInstances: [],
  repetitionIssues: []
};

const titles = {};
const descriptions = {};

keys.forEach(key => {
  const page = seoPages[key];
  if (!page) return;

  // Check Title
  if (page.title) {
    if (titles[page.title]) titles[page.title].push(key);
    else titles[page.title] = [key];
  }

  // Check Description
  if (page.description) {
    if (descriptions[page.description]) descriptions[page.description].push(key);
    else descriptions[page.description] = [key];
  }

  // Check FAQs
  if (page.faqs && Array.isArray(page.faqs)) {
    page.faqs.forEach(faq => {
      if (faq.question) {
        if (report.faqFrequencies[faq.question]) report.faqFrequencies[faq.question].push(key);
        else report.faqFrequencies[faq.question] = [key];
      }
    });
  }

  // Check AI wording
  const fullText = JSON.stringify(page).toLowerCase();
  const aiPhrases = ["in today's world", "whether you're", "look no further", "in der heutigen welt", "suchen sie nicht weiter", "egal ob sie"];
  aiPhrases.forEach(phrase => {
    if (fullText.includes(phrase)) {
      report.aiWordingInstances.push({ key, phrase });
    }
  });

  // Repetition check (crude: checking for exact long strings)
  if (page.intro && page.intro.includes("Wenn Sie auf der Suche nach höchster Schweizer Qualität")) {
    report.repetitionIssues.push(key);
  }
});

Object.keys(titles).forEach(t => {
  if (titles[t].length > 1) report.duplicateTitles.push({ title: t, pages: titles[t] });
});

Object.keys(descriptions).forEach(d => {
  if (descriptions[d].length > 1) report.duplicateDescriptions.push({ description: d, pages: descriptions[d] });
});

Object.keys(report.faqFrequencies).forEach(q => {
  if (report.faqFrequencies[q].length > 5) {
    report.overusedFaqs.push({ question: q, count: report.faqFrequencies[q].length });
  }
});

console.log("Audit Report:");
console.log("Duplicate Titles:", report.duplicateTitles.length);
console.log("Duplicate Descriptions:", report.duplicateDescriptions.length);
console.log("Overused FAQs (>5 pages):", report.overusedFaqs.length);
console.log("AI Wording Instances:", report.aiWordingInstances.length);
console.log("Repetitive Paragraph Instances:", report.repetitionIssues.length);
