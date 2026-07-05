const fs = require('fs');
const path = require('path');

const pythonDir = path.join(__dirname, '..', 'Python');
const outputDir = path.join(__dirname);

const modules = [
  { dir: 'Module1', files: ['Chapter1.md','Chapter2.md','Chapter3.md','Chapter4.md'] },
  { dir: 'Module2', files: ['Chapter5.md','Chapter6.md','Chapter7.md'] },
  { dir: 'Module3', files: ['Chapter8.md','Chapter9.md','Chapter10.md','Chapter11.md'] },
  { dir: 'module4', files: ['Chapter12.md','Chapter13.md','Chapter14.md','Chapter15.md','Chapter16.md'] },
  { dir: 'Module5', files: ['Chapter17.md','Chapter18.md','Chapter19.md'] },
  { dir: 'Module6', files: ['Chapter20.md','Chapter21.md','Chapter22.md'] },
  { dir: 'Module7', files: ['Chapter23.md','Chapter24.md'] },
  { dir: 'Module8', files: ['Chapter25.md','Chapter26.md','Chapter27.md','Chapter28.md','Chapter29.md','Chapter30.md'] },
  { dir: 'Module9', files: ['Chapter31.md','Chapter32.md','Chapter33.md','Chapter34.md','Chapter35.md'] },
  { dir: 'Module10', files: ['Chapter36.md','Chapter37.md','Chapter38.md'] },
  { dir: 'Module11', files: ['Chapter39.md','Chapter40.md','Chapter41.md','Chapter42.md'] },
  { dir: 'Module12', files: ['Chapter43.md','Chapter44.md','Chapter45.md'] },
  { dir: 'Module13', files: ['Chapter46.md','Chapter47.md','Chapter48.md'] },
  { dir: 'Module14', files: ['Chapter49.md','Chapter50.md','Chapter51.md','Chapter52.md','Chapter53.md'] }
];

function extractTitle(content) {
  const match = content.match(/^# (.+)$/m);
  return match ? match[1].trim() : 'Python Chapter';
}

function extractSubtitle(content) {
  const match = content.match(/^## (.+)$/m);
  return match ? match[1].trim() : '';
}

function extractBadge(content) {
  const moduleMatch = content.match(/^# Module (\d+)/m);
  const chapterMatch = content.match(/^# Chapter (\d+)/m);
  if (moduleMatch && chapterMatch) {
    return 'Module ' + moduleMatch[1] + ' · Chapter ' + chapterMatch[1];
  }
  return 'Python';
}

function extractStats(content) {
  const stats = [];
  const lines = content.split('\n');
  let count = 0;
  for (const line of lines) {
    if (line.startsWith('## ') && count < 4) {
      const clean = line.replace(/^## /, '').trim();
      const words = clean.split(' ');
      const sn = words.slice(0, 2).join(' ');
      const sl = words.slice(2).join(' ');
      stats.push({ sn: sn || clean, sl: sl || '' });
      count++;
    }
  }
  if (stats.length === 0) {
    return [
      { sn: 'Python', sl: 'Language' },
      { sn: 'Learn', sl: 'Code' },
      { sn: 'Build', sl: 'Projects' },
      { sn: 'Master', sl: 'Skills' }
    ];
  }
  return stats;
}

function extractSections(content) {
  const sections = [];
  const lines = content.split('\n');
  let currentSection = null;
  let currentContent = [];

  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (currentSection) {
        sections.push({ title: currentSection, content: currentContent.join('\n') });
      }
      currentSection = line.replace(/^## /, '').trim();
      currentContent = [];
    } else if (currentSection) {
      currentContent.push(line);
    }
  }
  if (currentSection) {
    sections.push({ title: currentSection, content: currentContent.join('\n') });
  }
  return sections;
}

function mdToHtml(md) {
  var html = md;
  
  // Replace code blocks first (before escaping)
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, function(m, lang, code) {
    return '<div class="viz-box">' + code.trim() + '</div>';
  });
  
  // Replace inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Headings
  html = html.replace(/^### (.+)$/gm, '<h4 style="color:#e2e8f0;font-size:1rem;margin:16px 0 8px">$1</h4>');
  html = html.replace(/^#### (.+)$/gm, '<h5 style="color:#94a3b8;font-size:.9rem;margin:12px 0 6px">$1</h5>');
  
  // Bold
  html = html.replace(/^\*\*(.+?)\*\*$/gm, '<strong style="color:#e2e8f0">$1</strong>');
  
  // Lists
  html = html.replace(/^- (.+)$/gm, '<li style="color:var(--text2);font-size:.85rem;margin:4px 0">$1</li>');
  html = html.replace(/^\d+\. (.+)$/gm, '<li style="color:var(--text2);font-size:.85rem;margin:4px 0">$1</li>');
  
  // Tables
  html = html.replace(/\|(.+)\|/g, function(m) {
    var cells = m.split('|').filter(function(c) { return c.trim(); });
    if (cells.length > 0 && m.indexOf('---') === -1) {
      return '<tr>' + cells.map(function(c) { return '<td style="padding:8px 12px;border:1px solid #1e293b;color:var(--text2);font-size:.82rem">' + c.trim() + '</td>'; }).join('') + '</tr>';
    }
    return m;
  });
  
  // Paragraphs
  html = html.replace(/\n\n/g, '</p><p style="color:var(--text2);font-size:.9rem;line-height:1.8;margin:8px 0">');
  html = html.replace(/\n/g, '<br>');

  return '<p style="color:var(--text2);font-size:.9rem;line-height:1.8;margin:8px 0">' + html + '</p>';
}

function generateHtml(title, subtitle, badge, stats, sections) {
  var statsHtml = stats.map(function(s) {
    return '<div class="stat"><div class="sn">' + s.sn + '</div><div class="sl">' + s.sl + '</div></div>';
  }).join('');

  var sectionsHtml = sections.map(function(sec) {
    var contentHtml = mdToHtml(sec.content);
    return '\n<div class="sec">' + sec.title + '</div>\n<div class="card">\n' + contentHtml + '\n</div>';
  }).join('');

  return '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>' + title + ' | Python Interactive</title>\n<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">\n<link rel="stylesheet" href="py-styles.css">\n</head>\n<body>\n\n<div class="hero">\n<div class="hero-inner">\n<div class="badge">' + badge + '</div>\n<h1>' + title + '<br><span>' + subtitle + '</span></h1>\n<p>Interactive Python learning with code examples, visualizations, and interview preparation.</p>\n<div class="stats">\n' + statsHtml + '\n</div>\n</div>\n</div>\n\n<div class="wrap">\n' + sectionsHtml + '\n</div>\n\n<script>\nfunction checkQuiz(el, correct) {\n  const parent = el.parentElement;\n  const feedback = parent.querySelector(\'.quiz-feedback\');\n  const opts = parent.querySelectorAll(\'.quiz-opt\');\n  opts.forEach(function(o) { o.style.pointerEvents = \'none\'; if (o === el && correct) o.classList.add(\'correct\'); else if (o === el && !correct) o.classList.add(\'wrong\'); else if (correct && o !== el) o.classList.add(\'correct\'); });\n  feedback.classList.add(\'show\');\n  if (correct) feedback.classList.add(\'correct\');\n  else feedback.classList.add(\'wrong\');\n}\n</script>\n</body>\n</html>';
}

var generated = 0;
var chapterNum = 1;

for (var m = 0; m < modules.length; m++) {
  var mod = modules[m];
  for (var f = 0; f < mod.files.length; f++) {
    var file = mod.files[f];
    var filePath = path.join(pythonDir, mod.dir, file);
    if (fs.existsSync(filePath)) {
      var content = fs.readFileSync(filePath, 'utf-8');
      var title = extractTitle(content);
      var subtitle = extractSubtitle(content);
      var badge = extractBadge(content);
      var stats = extractStats(content);
      var sections = extractSections(content);
      
      var html = generateHtml(title, subtitle, badge, stats, sections);
      var num = String(chapterNum).padStart(2, '0');
      var outputFile = 'python-chapter-' + num + '.html';
      fs.writeFileSync(path.join(outputDir, outputFile), html);
      console.log('Generated: ' + outputFile + ' - ' + title + ' (' + html.length + ' bytes)');
      generated++;
      chapterNum++;
    } else {
      console.log('File not found: ' + filePath);
    }
  }
}

console.log('\nTotal generated: ' + generated + ' Python chapter HTML files');