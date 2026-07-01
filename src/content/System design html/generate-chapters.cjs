const fs = require('fs');
const path = require('path');

const CSS_LINK = '<link rel="stylesheet" href="sd-styles.css">';
const FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">';
const QUIZ_SCRIPT = '<script>function ck(el,correct){const p=el.parentElement;const f=p.querySelector(\'.quiz-feedback\');const o=p.querySelectorAll(\'.quiz-opt\');o.forEach(x=>{x.style.pointerEvents=\'none\';if(x===el&&correct)x.classList.add(\'correct\');else if(x===el&&!correct)x.classList.add(\'wrong\');else if(correct&&x!==el)x.classList.add(\'correct\');});f.classList.add(\'show\');if(correct)f.classList.add(\'correct\');else f.classList.add(\'wrong\');}</script>';

function hero(badge, title, subtitle, desc, stats) {
  return `<div class="hero"><div class="hero-inner"><div class="badge">${badge}</div><h1>${title}<br><span>${subtitle}</span></h1><p>${desc}</p><div class="stats">${stats.map(s => `<div class="stat"><div class="sn">${s.n}</div><div class="sl">${s.l}</div></div>`).join('')}</div></div></div>`;
}
function story(label, title, text) { return `<div class="story"><div class="slabel">${label}</div><h3>${title}</h3><p>${text}</p></div>`; }
function sec(title) { return `<div class="sec">${title}</div>`; }
function defbox(text) { return `<div class="defbox">${text}</div>`; }
function card(content) { return `<div class="card">${content}</div>`; }
function tagGrid(items) { return `<div class="tag-grid">${items.map(i => `<div class="tag-card"><div class="tc">${i.tc}</div><div class="td">${i.td}</div></div>`).join('')}</div>`; }
function g2(left, right) { return `<div class="g2"><div class="gc"><h4>${left.h}</h4><p>${left.p}</p></div><div class="gc"><h4>${right.h}</h4><p>${right.p}</p></div></div>`; }
function quiz(q, opts) { return `<div class="quiz-card"><div class="quiz-q">${q}</div>${opts.map(o => `<div class="quiz-opt" onclick="ck(this,${o.c})">${o.t}</div>`).join('')}<div class="quiz-feedback">${opts.find(o => o.c).fb || ''}</div></div>`; }
function ts(num, title, detail) { return `<div class="ts"><div class="sn2">${num}</div><div class="sc"><strong>${title}</strong><div class="mini">${detail}</div></div></div>`; }
function fig(svg, cap) { return `<div class="fig">${svg}<div class="fig-cap">${cap}</div></div>`; }
function wrap(content) { return `<div class="wrap">${content}</div>`; }
function page(title, content) { return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title} | System Design Interactive</title>${FONTS}${CSS_LINK}</head><body>${content}${QUIZ_SCRIPT}</body></html>`; }

const all = [];

// CHAPTER 2 - remaining parts
all.push({
  file: 'chapter-02-part-06.html', title: 'Auto Scaling Fundamentals',
  badge: 'Chapter 2 · Part 6 · Auto Scaling',
  h1: 'Auto Scaling Fundamentals', h1sub: 'Measure → Decide → Scale → Stabilize',
  desc: 'A scalable system should be able to grow when traffic increases and shrink when demand decreases — automatically. Learn reactive vs predictive scaling.',
  stats: [{n:'Reactive',l:'Threshold-based'},{n:'Predictive',l:'ML-based'},{n:'Cooldown',l:'Stabilization'},{n:'HPA',l:'Kubernetes'}],
  sections: [
    () => story('Auto Scaling', 'Hiring Staff for a Festival', 'Imagine you own a restaurant. On weekdays, 20 customers. During a festival, 2,000 arrive. If you hire 50 chefs permanently, most sit idle. If you never hire extra staff, customers wait for hours. The ideal solution? Hire temporary chefs only when demand increases. Auto scaling follows exactly the same principle.'),
    () => defbox('<strong>Auto Scaling</strong> is the process of automatically adjusting the number or size of computing resources based on predefined metrics, schedules, or predictions to maintain performance while optimizing cost.'),
    () => sec('📊 Reactive vs Predictive Scaling'),
    () => g2(
      {h:'⚡ Reactive Scaling',p:'Responds after metrics cross a threshold. Example: CPU > 70% → Add 2 servers. Simple to configure but has brief degradation before scaling completes.'},
      {h:'🔮 Predictive Scaling',p:'Uses historical traffic patterns. Example: Every weekday at 9 AM traffic increases → launch servers at 8:50 AM. Better UX but requires historical data.'}
    ),
    () => sec('📈 Common Scaling Metrics'),
    () => card(tagGrid([
      {tc:'⚙ CPU Utilization',td:'60-70% threshold'},
      {tc:'💾 Memory Usage',td:'70-80% threshold'},
      {tc:'📊 Request Rate',td:'Requests per second'},
      {tc:'⏳ Queue Length',td:'Pending jobs count'},
      {tc:'⏱ Response Time',td:'Latency target'},
      {tc:'📋 Custom Metrics',td:'Business-specific'}
    ])),
    () => sec('⏱ Cooldown Period'),
    () => card('<p style="color:var(--tm)">A new server needs time to boot, join the cluster, and receive traffic. If scaling decisions are made too quickly, the system may keep adding and removing servers unnecessarily. A <strong>cooldown period</strong> prevents this oscillation.</p>'),
    () => sec('🏭 Production Example: AWS Auto Scaling'),
    () => fig('<svg viewBox="0 0 600 250" width="100%"><defs><linearGradient id="asg"><stop offset="0%" stop-color="#6366f1"/><stop offset="100%" stop-color="#06b6d4"/></linearGradient><marker id="asa" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10" fill="#64748b"/></marker></defs><rect x="200" y="10" width="200" height="40" rx="8" fill="url(#asg)"/><text x="300" y="36" fill="white" font-size="14" font-weight="700" text-anchor="middle">🌐 Users</text><line x1="300" y1="50" x2="300" y2="70" stroke="#64748b" stroke-width="2" marker-end="url(#asa)"/><rect x="180" y="75" width="240" height="40" rx="8" fill="#06b6d4"/><text x="300" y="100" fill="white" font-size="14" font-weight="700" text-anchor="middle">⚖ Load Balancer</text><line x1="300" y1="115" x2="300" y2="135" stroke="#64748b" stroke-width="2" marker-end="url(#asa)"/><rect x="50" y="145" width="160" height="35" rx="6" fill="#10b981"/><text x="130" y="168" fill="white" font-size="12" font-weight="700" text-anchor="middle">EC2-1</text><rect x="220" y="145" width="160" height="35" rx="6" fill="#10b981"/><text x="300" y="168" fill="white" font-size="12" font-weight="700" text-anchor="middle">EC2-2</text><rect x="390" y="145" width="160" height="35" rx="6" fill="#10b981"/><text x="470" y="168" fill="white" font-size="12" font-weight="700" text-anchor="middle">EC2-3</text><line x1="300" y1="180" x2="300" y2="200" stroke="#64748b" stroke-width="2" marker-end="url(#asa)"/><rect x="180" y="210" width="240" height="30" rx="6" fill="#f59e0b"/><text x="300" y="230" fill="white" font-size="12" font-weight="700" text-anchor="middle">Auto Scaling Group</text></svg>', 'CloudWatch monitors metrics. The Auto Scaling Group launches or terminates EC2 instances automatically.'),
    () => sec('🎯 Interview Callout'),
    () => card(ts('Q','"Can we auto scale a database the same way we scale API servers?"','"Not usually. Stateless application servers scale easily, but databases involve replication, consistency, storage, and data synchronization challenges."')),
    () => sec('🧠 Memory Trick'),
    () => defbox('<strong>Measure → Decide → Scale → Stabilize.</strong> Never scale blindly.'),
    () => sec('🧪 Test Your Knowledge'),
    () => quiz('1. What is the main advantage of predictive scaling over reactive scaling?', [
      {t:'A) It\'s easier to configure',c:false},
      {t:'B) It eliminates latency spikes by scaling BEFORE traffic arrives',c:true,fb:'Predictive scaling uses historical patterns to scale ahead of demand, preventing the brief degradation that reactive scaling experiences.'},
      {t:'C) It uses less CPU',c:false},{t:'D) It doesn\'t need metrics',c:false}
    ]),
    () => quiz('2. Why do we need a cooldown period in auto scaling?', [
      {t:'A) To save money',c:false},
      {t:'B) To prevent oscillation — repeatedly adding and removing servers',c:true,fb:'Cooldown periods allow new instances time to boot and stabilize before making further scaling decisions.'},
      {t:'C) To cool down the CPUs',c:false},{t:'D) To run updates',c:false}
    ]),
    () => story('Coming Up','Part 7: Geographic Distribution','Learn why deploy globally, regions and availability zones, latency reduction, disaster recovery, and active-active vs active-passive setups.')
  ]
});

all.push({
  file: 'chapter-02-part-07.html', title: 'Geographic Distribution',
  badge: 'Chapter 2 · Part 7 · Geographic Distribution',
  h1: 'Geographic Distribution & Multi-Region', h1sub: 'Global Traffic · Disaster Recovery · Active-Active',
  desc: 'When your users are everywhere, your servers should be too. Learn about deploying globally, reducing latency, and surviving data center failures.',
  stats: [{n:'Regions',l:'Global Deploy'},{n:'Active-Active',l:'Both serving'},{n:'Active-Passive',l:'Failover'},{n:'Latency',l:'Reduced'}],
  sections: [
    () => story('Global Scale', 'The Global Pizza Chain', 'Imagine a pizza chain with only one kitchen in New York. A customer in Tokyo orders a pizza. By the time it arrives, it\'s cold and stale. The solution? Open kitchens in every city. Now every customer gets a fresh pizza in minutes. Software works the same way. A single data center serving global users means high latency for everyone far away.'),
    () => defbox('<strong>Geographic Distribution</strong> deploys application instances in multiple regions worldwide to reduce latency, improve availability, and provide disaster recovery.'),
    () => sec('🌍 Why Deploy Globally?'),
    () => card(tagGrid([
      {tc:'⚡ Reduce Latency',td:'Serve users from the nearest region. Round-trip times drop from 300ms to 10ms.'},
      {tc:'🛡 Disaster Recovery',td:'If one data center fails, traffic is routed to another region.'},
      {tc:'📈 Scale Beyond Limits',td:'Single region has capacity limits. Global deployment allows infinite scaling.'},
      {tc:'🔒 Compliance',td:'Some regulations require data to stay within specific geographic boundaries.'}
    ])),
    () => sec('🏛 Active-Active vs Active-Passive'),
    () => g2(
      {h:'🟢 Active-Active',p:'All regions serve traffic simultaneously. Provides the best latency and availability. Requires sophisticated data replication and conflict resolution. Used by Netflix, Google.'},
      {h:'🟡 Active-Passive',p:'One region serves traffic. The second region is on standby. On failure, traffic fails over. Simpler but wastes resources. Used by many enterprise applications.'}
    ),
    () => sec('🧪 Test Your Knowledge'),
    () => quiz('1. What is the main benefit of geographic distribution for users in Tokyo?', [
      {t:'A) They get newer features first',c:false},
      {t:'B) Lower latency — data travels a shorter distance',c:true,fb:'A server in Tokyo means near-instant responses instead of 200ms+ round trips to the US.'},
      {t:'C) Better security',c:false},{t:'D) More storage',c:false}
    ]),
    () => quiz('2. What is the trade-off of Active-Active vs Active-Passive?', [
      {t:'A) Active-Active is simpler',c:false},
      {t:'B) Active-Active has better latency but requires complex data replication',c:true,fb:'Active-Active provides best latency but requires handling data conflicts across regions.'},
      {t:'C) Active-Passive is faster',c:false},{t:'D) There is no difference',c:false}
    ]),
    () => story('Coming Up','Part 8: Cost vs Performance Trade-offs','Explore the economics of scaling — when to spend more for performance and when to accept trade-offs.')
  ]
});

all.push({
  file: 'chapter-02-part-08.html', title: 'Cost vs Performance Trade-offs',
  badge: 'Chapter 2 · Part 8 · Cost vs Performance',
  h1: 'Cost vs Performance Trade-offs', h1sub: 'Every millisecond costs money',
  desc: 'Every architectural decision has a price tag. Learn to balance performance goals with budget constraints and make informed trade-offs.',
  stats: [{n:'Performance',l:'Costs Money'},{n:'Latency',l:'vs Budget'},{n:'Efficiency',l:'Optimization'},{n:'ROI',l:'Decision Framework'}],
  sections: [
    () => story('Cost vs Performance', 'First Class vs Economy', 'Flying first class is faster (priority boarding, quicker exits) but costs 5× more. Economy gets you there eventually — just slower. Software is the same. You can spend \$500/month on infrastructure or \$50,000/month. The question is: does your business need first class?'),
    () => sec('💡 Key Trade-offs'),
    () => card(tagGrid([
      {tc:'⚡ More Servers vs Better Code',td:'Adding servers is easier but costs more. Optimizing code is cheaper long-term but requires engineering time.'},
      {tc:'💾 More RAM vs Better Caching',td:'Throwing RAM at a problem is fast. Designing good caching strategies takes effort but is more cost-effective.'},
      {tc:'🌐 More Regions vs CDN',td:'Global deployment is expensive. A CDN may solve latency issues at a fraction of the cost.'},
      {tc:'🛢 Managed DB vs Self-Hosted',td:'Managed (RDS, Aurora) costs more but saves engineering time. Self-hosted is cheaper but requires expertise.'}
    ])),
    () => sec('🧪 Test Your Knowledge'),
    () => quiz('1. A startup has 500 users and a \$500/month budget. Should they use multi-region deployment?', [
      {t:'A) Yes — prepare for growth',c:false},
      {t:'B) No — start simple with a single server or managed service',c:true,fb:'Premature optimization wastes budget. Scale when you need to, not before.'},
      {t:'C) Yes — users expect global latency',c:false},{t:'D) Maybe — depends on the weather',c:false}
    ]),
    () => story('Coming Up','Part 9: Dropbox Case Study','See how Dropbox evolved from a simple file sync service to a globally distributed platform serving billions of files.')
  ]
});

all.push({
  file: 'chapter-02-part-09.html', title: 'Dropbox Case Study',
  badge: 'Chapter 2 · Part 9 · Dropbox Case Study',
  h1: 'Dropbox Case Study', h1sub: 'From File Sync to Global Platform',
  desc: 'A complete case study of how Dropbox evolved its architecture from a simple file sync service to a globally distributed platform handling billions of files.',
  stats: [{n:'Files',l:'Billions'},{n:'Users',l:'700M+'},{n:'Blocks',l:'Delta Sync'},{n:'LAN Sync',l:'Optimization'}],
  sections: [
    () => story('Dropbox', 'The File Sync Challenge', 'Dropbox started with a simple idea: files that sync across devices. But syncing billions of files across millions of devices is a massive distributed systems challenge. How do you handle conflicts? How do you avoid re-uploading unchanged files? How do you scale storage?'),
    () => sec('🏗 Key Architectural Decisions'),
    () => card(tagGrid([
      {tc:'🧱 Block-Level Sync',td:'Files are split into 4MB blocks. Only changed blocks are uploaded — not entire files. Massive bandwidth savings.'},
      {tc:'🔍 Content Hashing',td:'Each block is identified by its SHA-256 hash. Identical blocks across users are stored only once (deduplication).'},
      {tc:'💻 LAN Sync',td:'When multiple devices are on the same network, files sync locally instead of through the cloud. Much faster.'},
      {tc:'📦 Compression',td:'Blocks are compressed before transfer. Reduces storage and bandwidth by up to 50%.'},
      {tc:'🗄 Metadata DB',td:'MySQL stores file metadata (names, permissions, sharing). Actual file blocks go to block storage.'},
      {tc:'⚡ Notification Service',td:'When a file changes, the notification service tells connected clients instantly (not polling).'}
    ])),
    () => sec('🧪 Test Your Knowledge'),
    () => quiz('1. How does Dropbox avoid re-uploading entire files when only a small part changes?', [
      {t:'A) It re-uploads everything',c:false},
      {t:'B) Block-level sync — only changed 4MB blocks are uploaded',c:true,fb:'Block-level sync + content hashing means only changed portions of files are transferred.'},
      {t:'C) It uses FTP',c:false},{t:'D) It compresses the entire file',c:false}
    ]),
    () => quiz('2. What is LAN Sync?', [
      {t:'A) A programming language',c:false},
      {t:'B) Syncing files between devices on the same local network without going through the cloud',c:true,fb:'LAN Sync detects devices on the same network and transfers files directly, dramatically improving speed.'},
      {t:'C) A database type',c:false},{t:'D) A cloud provider',c:false}
    ]),
    () => story('Coming Up','Part 10: Chapter 2 Revision','Review all scalability fundamentals covered in this chapter with a comprehensive summary and practice questions.')
  ]
});

all.push({
  file: 'chapter-02-part-10.html', title: 'Chapter 2 Revision',
  badge: 'Chapter 2 · Part 10 · Revision',
  h1: 'Scalability Fundamentals — Revision', h1sub: 'Chapter 2 Complete Summary',
  desc: 'Review everything you learned in Chapter 2: scalability fundamentals, vertical vs horizontal scaling, stateless architecture, load balancing, and more.',
  stats: [{n:'10',l:'Parts'},{n:'2',l:'Scaling Types'},{n:'3',l:'Algorithms'},{n:'1',l:'Case Study'}],
  sections: [
    () => sec('📋 Chapter 2 Summary'),
    () => card(tagGrid([
      {tc:'🧠 Scalability',td:'The ability to maintain performance as demand increases. Scale follows success.'},
      {tc:'⬆ Vertical Scaling',td:'Bigger Box — upgrade CPU, RAM, disk. Simple but limited by physical constraints.'},
      {tc:'➡ Horizontal Scaling',td:'More Boxes — add servers behind a load balancer. Virtually unlimited but adds complexity.'},
      {tc:'🔌 Stateless Architecture',td:'State belongs to the data layer, not the application layer. Essential for horizontal scaling.'},
      {tc:'⚖ Load Balancers',td:'Traffic police — distribute requests, perform health checks, enable failover.'},
      {tc:'🔒 Sticky Sessions',td:'Legacy approach. Modern systems use Redis or JWT for session management.'},
      {tc:'📈 Auto Scaling',td:'Measure → Decide → Scale → Stabilize. Reactive and predictive approaches.'},
      {tc:'🌍 Geographic Distribution',td:'Deploy globally for lower latency and disaster recovery. Active-Active vs Active-Passive.'}
    ])),
    () => sec('🧪 Final Quiz'),
    () => quiz('1. Which scaling approach would you recommend for a startup with 100 users?', [
      {t:'A) Kubernetes with 10 nodes',c:false},
      {t:'B) Vertical scaling — start with a single powerful server',c:true,fb:'Start simple. Add horizontal scaling only when you hit the limits of vertical scaling.'},
      {t:'C) Multi-region deployment',c:false},{t:'D) Microservices from day one',c:false}
    ]),
    () => quiz('2. What is the key requirement for horizontal scaling of application servers?', [
      {t:'A) A fast database',c:false},{t:'B) Stateless services',c:true,fb:'Stateless services allow any server to handle any request, enabling horizontal scaling, load balancing, and auto scaling.'},
      {t:'C) More RAM',c:false},{t:'D) SSD storage',c:false}
    ]),
    () => story('Chapter 3 Preview','Database Fundamentals','Next up: RDBMS vs NoSQL, ACID vs BASE, CAP Theorem, Database Indexing, and Schema Design. The foundation of all data architecture.')
  ]
});

// CHAPTER 3: DATABASE FUNDAMENTALS
const ch3topics = [
  {p:1,t:'RDBMS vs NoSQL',d:'The fundamental choice between relational and non-relational databases shapes every data architecture. Learn the trade-offs.'},
  {p:2,t:'ACID Properties',d:'Atomicity, Consistency, Isolation, Durability — the guarantees that make relational databases reliable for transactions.'},
  {p:3,t:'BASE Model',d:'Basically Available, Soft state, Eventually consistent — the NoSQL approach to distributed data.'},
  {p:4,t:'CAP Theorem',d:'Consistency, Availability, Partition Tolerance — choose two. Learn why this theorem is essential for distributed database design.'},
  {p:5,t:'PACELC Theorem',d:'An extension of CAP that considers trade-offs even when the network is healthy (Else — Latency vs Consistency).'},
  {p:6,t:'Database Indexing',d:'How indexes work under the hood: B-Trees, hash indexes, covering indexes, and query optimization.'},
  {p:7,t:'Schema Design & Query Optimization',d:'Designing efficient schemas, normalization, denormalization, and writing performant queries.'},
  {p:8,t:'Database Performance Bottlenecks',d:'Identifying and resolving common database performance issues: slow queries, lock contention, connection limits.'},
  {p:9,t:'Local Delivery Service Case Study',d:'A complete case study applying database fundamentals to design the data layer for a local delivery platform.'},
  {p:10,t:'Chapter 3 Revision',d:'Comprehensive review of all database fundamentals covered in Chapter 3.'}
];

ch3topics.forEach(t => {
  let sections = [];
  sections.push(() => story(`${t.t}`, 'Database Decisions Drive Architecture', `The choice of database technology is one of the most consequential decisions in system design. ${t.d}`));
  sections.push(() => defbox(`<strong>${t.t}:</strong> ${t.d}`));
  if (t.p === 1) {
    sections.push(() => sec('🔷 RDBMS vs NoSQL'));
    sections.push(() => g2(
      {h:'🗄 RDBMS (SQL)',p:'Structured data with relationships. ACID guarantees. Strong consistency. Examples: PostgreSQL, MySQL. Best for: Banking, ERP, systems where data integrity is critical.'},
      {h:'📦 NoSQL',p:'Flexible schemas. Horizontal scaling. Various data models (document, key-value, graph, columnar). Examples: MongoDB, Redis, Cassandra. Best for: Real-time apps, large-scale analytics, IoT.'}
    ));
  }
  if (t.p === 4) {
    sections.push(() => sec('🧠 CAP Theorem Recap'));
    sections.push(() => defbox('<strong>Consistency:</strong> Every read gets the latest write. <strong>Availability:</strong> Every request gets a response. <strong>Partition Tolerance:</strong> System works despite network failures. In distributed systems, partitions happen — so choose CP or AP.'));
  }
  sections.push(() => sec('🧪 Quick Quiz'));
  sections.push(() => quiz(`1. ${t.t} — which statement is correct?`, [
    {t:'A) All databases work the same way',c:false},
    {t:'B) Understanding your data model and access patterns determines the right database choice',c:true,fb:'The database choice depends on your data structure, consistency needs, and scaling requirements.'},
    {t:'C) NoSQL is always better',c:false},
    {t:'D) SQL is outdated',c:false}
  ]));
  sections.push(() => story('Coming Next', ch3topics[t.p] ? `${ch3topics[t.p].t}` : 'Chapter 4: Database Scaling', `Continue building your database knowledge.`));

  const file = `chapter-03-part-${String(t.p).padStart(2,'0')}.html`;
  const sn = t.p===1?'SQL':t.p===2?'ACID':t.p===3?'BASE':t.p===4?'CAP':t.p===5?'PACELC':t.p===6?'B-Tree':t.p===7?'Schema':t.p===8?'Perf':t.p===9?'Case':'Review';
  const sl = t.p===4?'CP vs AP':'Key Concept';
  const content = page(`${t.t} | System Design`, hero(`Chapter 3 · Part ${t.p} · ${t.t}`, t.t, 'Database Fundamentals', t.d, [{n:sn,l:sl}]) + wrap(sections.map(s => s()).join('\n')));
  all.push({file, content: () => content});
});

// Generate all
const outputDir = __dirname;
let count = 0;
all.forEach(ch => {
  const content = typeof ch.content === 'function' ? ch.content() : page(ch.title, hero(ch.badge, ch.h1, ch.h1sub, ch.desc, ch.stats) + wrap(ch.sections.map(s => s()).join('\n')));
  fs.writeFileSync(path.join(outputDir, ch.file), content);
  count++;
  console.log(`Generated: ${ch.file}`);
});
console.log(`\nDone! Generated ${count} files.`);