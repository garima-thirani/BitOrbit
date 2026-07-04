const fs = require('fs');
const path = require('path');

const CSS_LINK = '<link rel="stylesheet" href="sd-styles.css">';
const FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">';
const QS = '<script>function ck(el,correct){const p=el.parentElement;const f=p.querySelector(\'.quiz-feedback\');const o=p.querySelectorAll(\'.quiz-opt\');o.forEach(x=>{x.style.pointerEvents=\'none\';if(x===el&&correct)x.classList.add(\'correct\');else if(x===el&&!correct)x.classList.add(\'wrong\');else if(correct&&x!==el)x.classList.add(\'correct\');});f.classList.add(\'show\');if(correct)f.classList.add(\'correct\');else f.classList.add(\'wrong\');}</script>';

function H(b,t,s,d,st){return '<div class="hero"><div class="hero-inner"><div class="badge">'+b+'</div><h1>'+t+'<br><span>'+s+'</span></h1><p>'+d+'</p><div class="stats">'+st.map(function(x){return '<div class="stat"><div class="sn">'+x.n+'</div><div class="sl">'+x.l+'</div></div>';}).join('')+'</div></div></div>';}
function ST(l,t,x){return '<div class="story"><div class="slabel">'+l+'</div><h3>'+t+'</h3><p>'+x+'</p></div>';}
function SE(t){return '<div class="sec">'+t+'</div>';}
function DB(t){return '<div class="defbox">'+t+'</div>';}
function CA(c){return '<div class="card">'+c+'</div>';}
function TG(i){return '<div class="tag-grid">'+i.map(function(x){return '<div class="tag-card"><div class="tc">'+x.tc+'</div><div class="td">'+x.td+'</div></div>';}).join('')+'</div>';}
function G2(l,r){return '<div class="g2"><div class="gc"><h4>'+l.h+'</h4><p>'+l.p+'</p></div><div class="gc"><h4>'+r.h+'</h4><p>'+r.p+'</p></div></div>';}
function QU(q,o){return '<div class="quiz-card"><div class="quiz-q">'+q+'</div>'+o.map(function(x){return '<div class="quiz-opt" onclick="ck(this,'+x.c+')">'+x.t+'</div>';}).join('')+'<div class="quiz-feedback">'+(o.find(function(x){return x.c;}).fb||'')+'</div></div>';}
function TS(n,t,d){return '<div class="ts"><div class="sn2">'+n+'</div><div class="sc"><strong>'+t+'</strong><div class="mini">'+d+'</div></div></div>';}
function FI(s,c){return '<div class="fig">'+s+'<div class="fig-cap">'+c+'</div></div>';}
function WR(c){return '<div class="wrap">'+c+'</div>';}
function PG(t,c){return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>'+t+' | System Design Interactive</title>'+FONTS+CSS_LINK+'</head><body>'+c+QS+'</body></html>';}
function TB(h,r){return '<table><thead><tr>'+h.map(function(x){return '<th>'+x+'</th>';}).join('')+'</tr></thead><tbody>'+r.map(function(row){return '<tr>'+row.map(function(c){return '<td>'+c+'</td>';}).join('')+'</tr>';}).join('')+'</tbody></table>';}
function VB(t){return '<div class="viz-box">'+t+'</div>';}

// SVG helpers
function arrowSVG() {
  return '<defs><marker id="a" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10" fill="#64748b"/></marker></defs>';
}

// ===== CHAPTER 3: DATABASE FUNDAMENTALS =====
// Part 1: RDBMS vs NoSQL
var ch3p1 = [
  ST('The Library vs The Warehouse','Why Different Databases Exist','Imagine two businesses. The first is a <strong>library</strong>. Every book has a catalog number, author, genre, shelf, and borrowing history. Everything is organized and relationships matter. The second is a <strong>warehouse</strong>. Millions of boxes arrive daily, each containing different items. Some boxes have clothes, some have electronics, others have books. The structure changes constantly. Trying to run the warehouse like the library would slow everything down. Trying to run the library like the warehouse would create chaos. Databases face the same challenge.'),
  SE('What is an RDBMS?'),
  DB('<strong>RDBMS (Relational Database Management System):</strong> Stores data in <strong>tables</strong> connected through relationships. Fixed schema, SQL support, strong consistency, ACID transactions, rich joins, referential integrity. Examples: PostgreSQL, MySQL, Oracle, SQL Server.'),
  FI('<svg viewBox="0 0 600 200" width="100%">'+arrowSVG()+'<rect x="50" y="20" width="200" height="60" rx="10" fill="#4f46e5"/><text x="150" y="58" fill="white" font-size="18" font-weight="700" text-anchor="middle">Users Table</text><text x="150" y="80" fill="#a5b4fc" font-size="12" text-anchor="middle">ID | Name | Email</text><line x1="250" y1="50" x2="350" y2="50" stroke="#64748b" stroke-width="3" marker-end="url(#a)"/><rect x="360" y="20" width="200" height="60" rx="10" fill="#06b6d4"/><text x="460" y="58" fill="white" font-size="18" font-weight="700" text-anchor="middle">Orders Table</text><text x="460" y="80" fill="#67e8f9" font-size="12" text-anchor="middle">ID | UserID | Amount</text><text x="300" y="130" fill="#94a3b8" font-size="14" text-anchor="middle">Relationships between tables allow complex queries</text><text x="300" y="160" fill="#94a3b8" font-size="13" text-anchor="middle">"Show all orders for user Alice"</text></svg>','RDBMS tables are connected through foreign key relationships.'),
  SE('What is NoSQL?'),
  DB('<strong>NoSQL (Not Only SQL):</strong> Relaxes relational constraints to improve scalability, flexibility, or performance. Categories: Document (MongoDB), Key-Value (Redis), Column Family (Cassandra), Graph (Neo4j).'),
  SE('NoSQL Categories'),
  TG([
    {tc:'📄 Document DB',td:'JSON-like documents. MongoDB, Couchbase. Flexible schemas, nested data.'},
    {tc:'🔑 Key-Value',td:'Every value retrieved by unique key. Redis, DynamoDB. Excellent for caching.'},
    {tc:'📊 Wide Column',td:'Optimized for enormous datasets. Cassandra, HBase. Analytics, IoT, time-series.'},
    {tc:'🔗 Graph',td:'Optimized for relationships. Neo4j, Neptune. Recommendation engines, social networks.'}
  ]),
  SE('RDBMS vs NoSQL Comparison'),
  TB(['Feature','RDBMS','NoSQL'],[
    ['Schema','Fixed','Flexible'],
    ['Transactions','Strong (ACID)','Varies (BASE)'],
    ['Joins','Excellent','Limited'],
    ['Horizontal Scaling','Harder','Easier'],
    ['Consistency','Strong','Often Tunable'],
    ['Query Language','SQL','Vendor Specific']
  ]),
  SE('When to Choose Each'),
  G2(
    {h:'✅ Choose RDBMS When',p:'Financial systems, Inventory, ERP, Banking. Strong consistency required. Complex relationships. ACID transactions critical.'},
    {h:'✅ Choose NoSQL When',p:'Rapid schema evolution. Massive horizontal scale. High write throughput. Large semi-structured datasets. Global distribution.'}
  ),
  SE('Production Insight: Polyglot Persistence'),
  ST('Real World','Amazon & Netflix Use Multiple Databases','Modern architectures often use <strong>polyglot persistence</strong> — different databases for different services. Amazon uses document-oriented patterns for product catalogs and relational databases for orders & payments. Netflix uses a mix of relational databases, Cassandra, Elasticsearch, and Redis depending on the workload.'),
  SE('Interview Callout'),
  TS('Q','"Which database would you choose?"','Avoid answering with a product name. Instead explain: 1) Data model 2) Access patterns 3) Consistency needs 4) Scale 5) Operational constraints. Then justify the database.'),
  SE('Common Mistakes'),
  TG([
    {tc:'❌ Assuming NoSQL Replaces SQL',td:'They solve different problems. Choose based on requirements.'},
    {tc:'❌ Choosing MongoDB Because "It Scales"',td:'Every database has trade-offs. Understand your access patterns first.'},
    {tc:'❌ Ignoring Query Patterns',td:'Your queries determine the optimal data model and indexing strategy.'}
  ]),
  SE('Memory Trick'),
  DB('<strong>Relationships → SQL</strong> · <strong>Flexibility & Scale → NoSQL</strong>'),
  SE('Test Your Knowledge'),
  QU('1. Which database type is best for a banking system requiring strong consistency and complex joins?',[
    {t:'A) MongoDB',c:false},
    {t:'B) PostgreSQL (RDBMS) — ACID transactions and relational integrity',c:true,fb:'Banking requires ACID guarantees, strong consistency, and complex joins — all strengths of RDBMS.'},
    {t:'C) Redis',c:false},
    {t:'D) Cassandra',c:false}
  ]),
  QU('2. What does "polyglot persistence" mean?',[
    {t:'A) Using only one database type',c:false},
    {t:'B) Using different databases for different services based on workload needs',c:true,fb:'Polyglot persistence means choosing the best database for each specific use case within the same system.'},
    {t:'C) Speaking multiple programming languages',c:false},
    {t:'D) Using only NoSQL databases',c:false}
  ]),
  ST('Coming Next','Part 2: ACID Properties','Learn about Atomicity, Consistency, Isolation, and Durability — the foundation of reliable transactional databases.')
];

// Part 2: ACID Properties
var ch3p2 = [
  ST('The ATM That Lost Money','Why Transactions Exist','Imagine you withdraw ₹10,000 from an ATM. The ATM deducts the amount from your account. Before dispensing cash, the ATM loses power. Your account now shows ₹10,000 less. You never received the money. Would you trust this bank again? Databases face this exact problem millions of times every day. Without guarantees, partial updates would corrupt data permanently. This is why transactions and ACID properties exist.'),
  SE('What is a Transaction?'),
  DB('<strong>Transaction:</strong> A group of operations treated as one logical unit. Either every operation succeeds, or none of them do. Example: Transfer ₹500 from Alice to Bob — deduct from Alice AND add to Bob must both happen or neither happens.'),
  SE('The Four ACID Properties'),
  FI('<svg viewBox="0 0 700 300" width="100%"><defs><linearGradient id="ac"><stop offset="0%" stop-color="#6366f1"/><stop offset="100%" stop-color="#06b6d4"/></linearGradient></defs><rect x="20" y="20" width="140" height="80" rx="12" fill="url(#ac)"/><text x="90" y="55" fill="white" font-size="22" font-weight="700" text-anchor="middle">A</text><text x="90" y="80" fill="#a5f3fc" font-size="13" text-anchor="middle">Atomicity</text><rect x="190" y="20" width="140" height="80" rx="12" fill="#10b981"/><text x="260" y="55" fill="white" font-size="22" font-weight="700" text-anchor="middle">C</text><text x="260" y="80" fill="#a7f3d0" font-size="13" text-anchor="middle">Consistency</text><rect x="360" y="20" width="140" height="80" rx="12" fill="#f59e0b"/><text x="430" y="55" fill="white" font-size="22" font-weight="700" text-anchor="middle">I</text><text x="430" y="80" fill="#fde68a" font-size="13" text-anchor="middle">Isolation</text><rect x="530" y="20" width="140" height="80" rx="12" fill="#ef4444"/><text x="600" y="55" fill="white" font-size="22" font-weight="700" text-anchor="middle">D</text><text x="600" y="80" fill="#fca5a5" font-size="13" text-anchor="middle">Durability</text><text x="350" y="150" fill="#94a3b8" font-size="14" text-anchor="middle">Each property solves a different reliability problem</text><text x="350" y="180" fill="#94a3b8" font-size="13" text-anchor="middle">Together they ensure data integrity even during failures</text></svg>','ACID properties work together to guarantee reliable transactions.'),
  SE('Atomicity — All or Nothing'),
  DB('<strong>Atomicity:</strong> A transaction either completes fully or rolls back completely. Like a light switch — it is either ON or OFF. There is no valid "half ON" state. If any operation in a transaction fails, the database returns to its previous state as if nothing happened.'),
  SE('Consistency — Valid State'),
  DB('<strong>Consistency:</strong> A transaction moves the database from one valid state to another. Database rules must always hold. Example: If a rule says "Account Balance >= 0", a transaction that would violate this rule should fail. Consistency depends on constraints, foreign keys, triggers, and business rules.'),
  SE('Isolation — No Interference'),
  DB('<strong>Isolation:</strong> Prevents transactions from interfering with one another. Imagine two people editing the same document simultaneously — without coordination, one overwrites the other. Isolation ensures concurrent transactions produce the same result as if they ran sequentially.'),
  SE('Durability — Survives Crash'),
  DB('<strong>Durability:</strong> Once a transaction is committed, it survives failures. If the database crashes one second after a successful transaction, the committed data should not disappear. Techniques: Write-Ahead Logging (WAL), replication, persistent storage, database checkpoints.'),
  SE('ACID Together — Flight Booking Example'),
  CA('<p style="color:var(--tm)">Imagine purchasing a flight ticket. The system must: 1) Reserve the seat 2) Charge the payment 3) Generate the ticket. If payment fails, the seat reservation should disappear. If ticket generation fails, the payment should roll back. <strong>All three operations behave as one transaction.</strong></p>'),
  SE('Trade-offs of ACID'),
  TG([
    {tc:'🔒 Lock Contention',td:'Strong isolation requires locks, which can slow concurrent operations.'},
    {tc:'🐢 Reduced Throughput',td:'ACID guarantees add overhead compared to relaxed consistency models.'},
    {tc:'⏱ Higher Latency',td:'Ensuring durability (fsync, WAL) adds latency to each write.'},
    {tc:'📈 Harder Horizontal Scaling',td:'ACID across distributed nodes is complex and expensive.'}
  ]),
  SE('Test Your Knowledge'),
  QU('1. Which ACID property ensures that a partially completed transaction is rolled back on failure?',[
    {t:'A) Consistency',c:false},
    {t:'B) Atomicity — all or nothing',c:true,fb:'Atomicity guarantees that either all operations in a transaction succeed, or none are applied.'},
    {t:'C) Isolation',c:false},
    {t:'D) Durability',c:false}
  ]),
  QU('2. What technique do databases use to guarantee Durability?',[
    {t:'A) In-memory caching',c:false},
    {t:'B) Write-Ahead Logging (WAL)',c:true,fb:'WAL ensures committed transactions are recorded on disk before the database acknowledges success.'},
    {t:'C) Indexing',c:false},
    {t:'D) Sharding',c:false}
  ]),
  ST('Coming Next','Part 3: BASE Model','Learn about Basically Available, Soft state, Eventually consistent — the NoSQL approach to distributed data.')
];

// Part 3: BASE Model
var ch3p3 = [
  ST('The Library That Never Closes','Why BASE Exists','Imagine a library that never closes. Books can be slightly out of order. Sometimes a book you want is temporarily on someone\'s desk. But the library is always open, and eventually everything returns to its proper place. This is the BASE philosophy — prioritize availability over immediate consistency.'),
  SE('What is BASE?'),
  DB('<strong>BASE</strong> stands for: <strong>B</strong>asically <strong>A</strong>vailable, <strong>S</strong>oft state, <strong>E</strong>ventually consistent. It is the consistency model used by many NoSQL databases. Unlike ACID\'s strong guarantees, BASE accepts temporary inconsistency in exchange for higher availability and scalability.'),
  SE('ACID vs BASE'),
  TB(['Property','ACID','BASE'],[
    ['Consistency','Strong','Eventual'],
    ['Availability','Lower','Higher'],
    ['Performance','Lower per write','Higher throughput'],
    ['Scaling','Vertical first','Horizontal native'],
    ['Use Case','Banking, ERP','Social media, Analytics']
  ]),
  SE('Test Your Knowledge'),
  QU('1. What does "Eventually Consistent" mean in BASE?',[
    {t:'A) Data is never consistent',c:false},
    {t:'B) Given enough time without updates, all replicas will converge to the same value',c:true,fb:'Eventual consistency means that if no new updates are made, all nodes will eventually agree on the same data.'},
    {t:'C) Consistency is guaranteed immediately',c:false},
    {t:'D) Data is always available',c:false}
  ]),
  ST('Coming Next','Part 4: CAP Theorem','Consistency, Availability, Partition Tolerance — choose two. Learn why this theorem is essential for distributed database design.')
];

// Part 4: CAP Theorem
var ch3p4 = [
  ST('The Two Data Centers','Why CAP Exists','Imagine two data centers connected by a network cable. A user in Data Center A updates their profile picture. Before the update reaches Data Center B, the network cable is cut. Now a user in Data Center B tries to view the profile. Should Data Center B show the old picture (stay available) or refuse to answer (stay consistent)? This is the CAP dilemma.'),
  SE('The CAP Theorem'),
  DB('<strong>CAP Theorem:</strong> In a distributed system, you can guarantee at most two of three properties: <strong>C</strong>onsistency, <strong>A</strong>vailability, <strong>P</strong>artition Tolerance. Since network partitions are inevitable in distributed systems, the real choice is between CP (Consistency + Partition Tolerance) and AP (Availability + Partition Tolerance).'),
  FI('<svg viewBox="0 0 700 400" width="100%"><defs><linearGradient id="cg"><stop offset="0%" stop-color="#6366f1"/><stop offset="100%" stop-color="#818cf8"/></linearGradient><linearGradient id="ca"><stop offset="0%" stop-color="#10b981"/><stop offset="100%" stop-color="#6ee7b7"/></linearGradient><linearGradient id="cp"><stop offset="0%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#fcd34d"/></linearGradient></defs><circle cx="350" cy="200" r="180" fill="none" stroke="#334155" stroke-width="2" stroke-dasharray="6 4"/><circle cx="205" cy="140" r="95" fill="url(#cg)" opacity=".25"/><text x="205" y="145" fill="#a5b4fc" font-size="18" font-weight="700" text-anchor="middle">Consistency</text><text x="205" y="170" fill="#94a3b8" font-size="12" text-anchor="middle">Same data everywhere</text><circle cx="495" cy="140" r="95" fill="url(#ca)" opacity=".25"/><text x="495" y="145" fill="#6ee7b7" font-size="18" font-weight="700" text-anchor="middle">Availability</text><text x="495" y="170" fill="#94a3b8" font-size="12" text-anchor="middle">Every request gets a response</text><circle cx="350" cy="290" r="95" fill="url(#cp)" opacity=".25"/><text x="350" y="295" fill="#fcd34d" font-size="18" font-weight="700" text-anchor="middle">Partition Tolerance</text><text x="350" y="320" fill="#94a3b8" font-size="12" text-anchor="middle">Works despite network failures</text></svg>','CAP Theorem: In distributed systems, partitions happen — choose CP or AP.'),
  SE('Test Your Knowledge'),
  QU('1. During a network partition, what does a CP system do?',[
    {t:'A) Continue serving all requests with stale data',c:false},
    {t:'B) Reject requests until the partition heals',c:true,fb:'CP systems choose consistency over availability during partitions. Banking systems use CP.'},
    {t:'C) Automatically shard the database',c:false},
    {t:'D) Ignore the partition',c:false}
  ]),
  ST('Coming Next','Part 5: PACELC Theorem','An extension of CAP that considers trade-offs even when the network is healthy.')
];

// Part 5: PACELC
var ch3p5 = [
  ST('Beyond CAP','The PACELC Extension','CAP only describes behavior during network partitions. But what about when the network is healthy? PACELC extends CAP: <strong>P</strong>artition → choose <strong>A</strong>vailability or <strong>C</strong>onsistency. <strong>E</strong>lse (when network is healthy) → choose <strong>L</strong>atency or <strong>C</strong>onsistency.'),
  DB('<strong>PACELC:</strong> If a partition occurs (P), trade off Availability (A) vs Consistency (C). Else (E), trade off Latency (L) vs Consistency (C). This gives a more complete picture of real-world database trade-offs.'),
  SE('Test Your Knowledge'),
  QU('1. What does PACELC add beyond CAP?',[
    {t:'A) Nothing, it is the same',c:false},
    {t:'B) It considers trade-offs even when the network is healthy (Latency vs Consistency)',c:true,fb:'PACELC acknowledges that even without partitions, there are trade-offs between latency and consistency.'},
    {t:'C) It removes Partition Tolerance',c:false},
    {t:'D) It adds Security',c:false}
  ]),
  ST('Coming Next','Part 6: Database Indexing','How indexes work under the hood: B-Trees, hash indexes, covering indexes, and query optimization.')
];

// Part 6: Database Indexing
var ch3p6 = [
  ST('The Library Card Catalog','Why Indexes Exist','Imagine a library with 1 million books but no catalog system. To find a specific book, you must check every shelf. This could take days. A card catalog (index) tells you exactly which shelf the book is on. Databases work the same way — indexes are data structures that speed up data retrieval.'),
  SE('What is an Index?'),
  DB('<strong>Database Index:</strong> A data structure that improves the speed of data retrieval operations on a table. Like a book\'s index, it provides a quick way to locate data without scanning the entire table. Trade-off: Indexes speed up reads but slow down writes (because the index must be updated).'),
  SE('Common Index Types'),
  TG([
    {tc:'🌳 B-Tree Index',td:'The most common type. Balanced tree structure. Good for range queries, sorting, and equality lookups. Used by PostgreSQL, MySQL by default.'},
    {tc:'🔑 Hash Index',td:'Uses a hash function. Excellent for equality lookups (WHERE id = 42). Not suitable for range queries. Used by Redis, some NoSQL databases.'},
    {tc:'📊 Covering Index',td:'Includes all columns needed by a query. The database can answer the query entirely from the index without touching the table.'},
    {tc:'🔗 Composite Index',td:'Index on multiple columns. Column order matters — the most selective column should come first.'}
  ]),
  SE('Test Your Knowledge'),
  QU('1. What is the main trade-off of adding a database index?',[
    {t:'A) Indexes have no downsides',c:false},
    {t:'B) Faster reads but slower writes (index must be maintained)',c:true,fb:'Indexes speed up SELECT queries but slow down INSERT/UPDATE/DELETE because the index structure must be updated.'},
    {t:'C) Indexes use less storage',c:false},
    {t:'D) Indexes only work for integers',c:false}
  ]),
  ST('Coming Next','Part 7: Schema Design & Query Optimization','Designing efficient schemas, normalization, denormalization, and writing performant queries.')
];

// Part 7: Schema Design
var ch3p7 = [
  ST('Building a House','Why Schema Design Matters','Building a database without schema design is like building a house without blueprints. It might stand, but it will have structural problems. Good schema design anticipates how data will be queried and ensures the database can answer those queries efficiently.'),
  SE('Normalization vs Denormalization'),
  G2(
    {h:'📐 Normalization',p:'Eliminates data redundancy by splitting data into related tables. Reduces storage, ensures consistency. Can require complex JOINs. Best for: OLTP, systems where data integrity is critical.'},
    {h:'📦 Denormalization',p:'Adds redundant data to reduce JOINs. Improves read performance at the cost of storage and write complexity. Best for: Read-heavy workloads, analytics, reporting.'}
  ),
  SE('Test Your Knowledge'),
  QU('1. When would you choose denormalization over normalization?',[
    {t:'A) When storage is expensive',c:false},
    {t:'B) When read performance is critical and JOINs are too slow',c:true,fb:'Denormalization trades storage for read speed by reducing the need for JOINs.'},
    {t:'C) When data integrity is most important',c:false},
    {t:'D) When writes are frequent',c:false}
  ]),
  ST('Coming Next','Part 8: Database Performance Bottlenecks','Identifying and resolving common database performance issues: slow queries, lock contention, connection limits.')
];

// Part 8: Performance Bottlenecks
var ch3p8 = [
  ST('The Traffic Jam','Database Performance','Even the best-designed database can become slow under load. Common bottlenecks include: slow queries (missing indexes), lock contention (concurrent writes), connection pool exhaustion (too many connections), and disk I/O saturation (slow storage).'),
  SE('Common Bottlenecks & Solutions'),
  TG([
    {tc:'🐢 Slow Queries',td:'Missing indexes, full table scans. Fix: Add indexes, optimize query plans, use EXPLAIN ANALYZE.'},
    {tc:'🔒 Lock Contention',td:'Multiple transactions waiting for the same rows. Fix: Shorter transactions, better isolation levels, optimistic locking.'},
    {tc:'🔗 Connection Pool Exhaustion',td:'Too many concurrent database connections. Fix: Connection pooling (PgBouncer, HikariCP), increase max connections.'},
    {tc:'💿 Disk I/O Saturation',td:'Storage cannot keep up with read/write demand. Fix: SSDs, better indexing, caching layer (Redis).'}
  ]),
  SE('Test Your Knowledge'),
  QU('1. What is the first thing to check when a database query is slow?',[
    {t:'A) Buy more RAM',c:false},
    {t:'B) Check if the query is using an index (EXPLAIN ANALYZE)',c:true,fb:'Always measure before optimizing. EXPLAIN ANALYZE shows whether indexes are being used.'},
    {t:'C) Rewrite the application in Go',c:false},
    {t:'D) Shard the database',c:false}
  ]),
  ST('Coming Next','Part 9: Local Delivery Service Case Study','A complete case study applying database fundamentals to design the data layer for a local delivery platform.')
];

// Part 9: Case Study
var ch3p9 = [
  ST('Local Delivery Service','Database Design in Practice','Design the data layer for a local food delivery service. Requirements: restaurants register, customers place orders, delivery drivers accept deliveries, real-time tracking. Let\'s apply everything we learned about database fundamentals.'),
  SE('Database Choices'),
  TG([
    {tc:'🗄 Restaurants & Menu (RDBMS)',td:'Structured data with relationships. PostgreSQL for restaurants, menu items, categories, pricing.'},
    {tc:'📦 Orders & Payments (RDBMS)',td:'ACID transactions critical. PostgreSQL with proper isolation levels for order processing.'},
    {tc:'⚡ Real-time Tracking (Redis)',td:'Driver location updates. Redis for fast reads/writes with TTL-based expiration.'},
    {tc:'📊 Analytics (Columnar)',td:'Historical order data for business intelligence. Cassandra or ClickHouse for time-series analytics.'}
  ]),
  SE('Test Your Knowledge'),
  QU('1. Why use Redis for real-time driver tracking instead of PostgreSQL?',[
    {t:'A) Redis is cheaper',c:false},
    {t:'B) Redis provides low-latency reads/writes with automatic data expiration',c:true,fb:'Redis is optimized for high-throughput, low-latency operations with built-in TTL — perfect for ephemeral location data.'},
    {t:'C) PostgreSQL cannot store location data',c:false},
    {t:'D) Redis is required for all databases',c:false}
  ]),
  ST('Coming Next','Part 10: Chapter 3 Revision','Comprehensive review of all database fundamentals covered in Chapter 3.')
];

// Part 10: Revision
var ch3p10 = [
  SE('Chapter 3 Summary'),
  TG([
    {tc:'🗄 RDBMS vs NoSQL',td:'Relationships → SQL. Flexibility & Scale → NoSQL. Polyglot persistence uses both.'},
    {tc:'📋 ACID',td:'Atomicity (all or nothing), Consistency (valid state), Isolation (no interference), Durability (survives crash).'},
    {tc:'📦 BASE',td:'Basically Available, Soft state, Eventually consistent. Prioritizes availability over immediate consistency.'},
    {tc:'🎯 CAP Theorem',td:'Consistency, Availability, Partition Tolerance. Choose two. Partitions happen — choose CP or AP.'},
    {tc:'🔍 PACELC',td:'Extends CAP: During partitions choose A vs C. Else choose L vs C.'},
    {tc:'🌳 Indexing',td:'B-Tree (range queries), Hash (equality), Covering (all columns), Composite (multiple columns).'},
    {tc:'📐 Schema Design',td:'Normalization (no redundancy, complex JOINs) vs Denormalization (redundancy, fast reads).'},
    {tc:'🐢 Performance',td:'Slow queries → missing indexes. Lock contention → shorter transactions. Connection pool → PgBouncer.'}
  ]),
  SE('Final Quiz'),
  QU('1. A social media app needs to store user profiles (structured), posts (flexible schema), and friend relationships (graph). What database strategy should you use?',[
    {t:'A) Use PostgreSQL for everything',c:false},
    {t:'B) Polyglot persistence: RDBMS for profiles, document DB for posts, graph DB for relationships',c:true,fb:'Different data models benefit from different database types. Polyglot persistence chooses the best tool for each job.'},
    {t:'C) Use MongoDB for everything',c:false},
    {t:'D) Use only NoSQL databases',c:false}
  ]),
  ST('Chapter 4 Preview','Database Scaling','Next up: Database Sharding, Consistent Hashing, Primary-Replica Architecture, Read Replicas, and Multi-Leader Replication.')
];

// Build all Chapter 3 files
var ch3 = [ch3p1, ch3p2, ch3p3, ch3p4, ch3p5, ch3p6, ch3p7, ch3p8, ch3p9, ch3p10];
var ch3titles = ['RDBMS vs NoSQL','ACID Properties','BASE Model','CAP Theorem','PACELC Theorem','Database Indexing','Schema Design & Query Optimization','Database Performance Bottlenecks','Local Delivery Service Case Study','Chapter 3 Revision'];
var ch3subs = ['Relational vs Non-Relational','Atomicity, Consistency, Isolation, Durability','Basically Available, Soft State, Eventually Consistent','Consistency, Availability, Partition Tolerance','Extending CAP for Real-World Systems','B-Trees, Hash Indexes, Query Optimization','Normalization, Denormalization, Performance','Slow Queries, Lock Contention, Connection Limits','Applying Database Fundamentals','Complete Chapter Summary'];
var ch3stats = [
  [{n:'SQL',l:'Structured'},{n:'NoSQL',l:'Flexible'},{n:'ACID',l:'Transactions'},{n:'Scale',l:'Horizontal'}],
  [{n:'A',l:'Atomicity'},{n:'C',l:'Consistency'},{n:'I',l:'Isolation'},{n:'D',l:'Durability'}],
  [{n:'BA',l:'Available'},{n:'S',l:'Soft State'},{n:'E',l:'Eventual'},{n:'vs ACID',l:'Trade-offs'}],
  [{n:'C',l:'Consistency'},{n:'A',l:'Availability'},{n:'P',l:'Partition'},{n:'CP/AP',l:'Choice'}],
  [{n:'P',l:'Partition'},{n:'A/C',l:'Trade-off'},{n:'E',l:'Else'},{n:'L/C',l:'Trade-off'}],
  [{n:'B-Tree',l:'Range'},{n:'Hash',l:'Equality'},{n:'Covering',l:'All cols'},{n:'Composite',l:'Multi-col'}],
  [{n:'Normalize',l:'No Redundancy'},{n:'Denormalize',l:'Fast Reads'},{n:'JOINs',l:'Relationships'},{n:'Performance',l:'Optimization'}],
  [{n:'Queries',l:'Slow'},{n:'Locks',l:'Contention'},{n:'Pool',l:'Exhaustion'},{n:'Disk',l:'I/O'}],
  [{n:'RDBMS',l:'Orders'},{n:'Redis',l:'Tracking'},{n:'Analytics',l:'Columnar'},{n:'Design',l:'Case Study'}],
  [{n:'10',l:'Parts'},{n:'ACID',l:'Guarantees'},{n:'BASE',l:'Flexibility'},{n:'CAP',l:'Theorem'}]
];

var count = 0;
var dir = __dirname;

ch3.forEach(function(secs, i) {
  var p = i + 1;
  var file = 'chapter-03-part-' + (p < 10 ? '0' : '') + p + '.html';
  var content = PG(ch3titles[i] + ' | System Design', H('Chapter 3 · Part ' + p + ' · ' + ch3titles[i], ch3titles[i], ch3subs[i], ch3titles[i] + ' — ' + ch3subs[i] + '. Learn the fundamentals of database design for system design interviews.', ch3stats[i]) + WR(secs.join('\n')));
  fs.writeFileSync(path.join(dir, file), content);
  count++;
  console.log('Generated: ' + file);
});

// Now rebuild Chapter 2 parts 4-10 with full content
// Part 4: Load Balancers
var ch2p4 = [
  ST('The Supermarket Checkout','Why Load Balancers Exist','Imagine a supermarket with six checkout counters. If every customer joins Counter 1 while Counters 2-6 remain empty, the queue becomes enormous. Instead, a staff member directs each customer to an appropriate counter. That person is acting as a <strong>load balancer</strong>. Without a load balancer, thousands of users may accidentally hit the same server while others remain idle.'),
  DB('<strong>Load Balancer:</strong> A networking component that distributes incoming requests across multiple backend servers to improve scalability, availability, and fault tolerance.'),
  FI('<svg viewBox="0 0 800 250" width="100%"><defs><linearGradient id="lbg"><stop offset="0%" stop-color="#6366f1"/><stop offset="100%" stop-color="#06b6d4"/></linearGradient><marker id="lba" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10" fill="#64748b"/></marker></defs><rect x="300" y="10" width="200" height="50" rx="10" fill="url(#lbg)"/><text x="400" y="42" fill="white" font-size="18" font-weight="700" text-anchor="middle">🌐 Users</text><line x1="400" y1="60" x2="400" y2="90" stroke="#64748b" stroke-width="3" marker-end="url(#lba)"/><rect x="280" y="100" width="240" height="50" rx="10" fill="#06b6d4"/><text x="400" y="132" fill="white" font-size="17" font-weight="700" text-anchor="middle">⚖ Load Balancer</text><line x1="320" y1="150" x2="120" y2="190" stroke="#64748b" stroke-width="3" marker-end="url(#lba)"/><line x1="400" y1="150" x2="400" y2="190" stroke="#64748b" stroke-width="3" marker-end="url(#lba)"/><line x1="480" y1="150" x2="680" y2="190" stroke="#64748b" stroke-width="3" marker-end="url(#lba)"/><rect x="30" y="190" width="180" height="45" rx="8" fill="#10b981"/><text x="120" y="218" fill="white" font-size="15" font-weight="700" text-anchor="middle">Server A ✅</text><rect x="310" y="190" width="180" height="45" rx="8" fill="#10b981"/><text x="400" y="218" fill="white" font-size="15" font-weight="700" text-anchor="middle">Server B ✅</text><rect x="590" y="190" width="180" height="45" rx="8" fill="#ef4444"/><text x="680" y="218" fill="white" font-size="15" font-weight="700" text-anchor="middle">Server C ❌</text></svg>','If Server C fails, the load balancer automatically routes traffic to A and B.'),
  SE('Layer 4 vs Layer 7'),
  G2(
    {h:'🔵 Layer 4 (Transport)',p:'Works using IP addresses and TCP/UDP ports. <strong>Faster</strong>, lower latency. Cannot inspect application content. Examples: AWS NLB, HAProxy (TCP mode).'},
    {h:'🟢 Layer 7 (Application)',p:'Understands HTTP. Can inspect URLs, headers, cookies, hostnames. Allows intelligent routing: /images → Image Service, /api → API Service. Examples: AWS ALB, NGINX, Envoy.'}
  ),
  SE('Load Balancing Algorithms'),
  TG([
    {tc:'🔁 Round Robin',td:'Requests rotate sequentially: 1→A, 2→B, 3→C, 4→A. Simple and fair if servers have equal capacity. Ignores current server load.'},
    {tc:'📊 Least Connections',td:'Sends traffic to the server with the fewest active connections. Better when requests have varying durations. Prevents overloading busy servers.'},
    {tc:'🔒 IP Hash',td:'The client\'s IP determines the backend server. Useful for session affinity. Be careful: uneven IP distributions can create hotspots.'}
  ]),
  SE('Health Checks & Failover'),
  CA('<p style="color:var(--tm)">A load balancer continuously verifies backend health. Typical checks: HTTP 200 on /health, TCP connection, custom health endpoint. If a server fails, it is <strong>removed from rotation</strong> and traffic is redirected to healthy servers. This enables automatic failover without manual intervention.</p>'),
  SE('Interview Callout'),
  TS('Q','"Why can\'t clients connect directly to servers?"','"A load balancer provides a single entry point, distributes requests, removes failed servers automatically, and enables horizontal scaling without clients knowing backend topology."'),
  SE('Memory Trick'),
  DB('<strong>One Door → Many Rooms.</strong> The load balancer is the front door. Users don\'t choose the room. The receptionist does.'),
  SE('Test Your Knowledge'),
  QU('1. Which load balancer type can route /api to API servers and /images to image servers?',[
    {t:'A) Layer 4 (Transport)',c:false},
    {t:'B) Layer 7 (Application) — understands HTTP paths',c:true,fb:'Layer 7 load balancers can inspect HTTP content like URL paths, headers, and cookies for intelligent routing.'},
    {t:'C) Layer 3 (Network)',c:false},
    {t:'D) Layer 2 (Data Link)',c:false}
  ]),
  QU('2. What happens when a server fails behind a load balancer?',[
    {t:'A) The load balancer also fails',c:false},
    {t:'B) Health checks detect the failure and remove the server from rotation',c:true,fb:'Health checks continuously monitor servers. Failed servers are automatically removed from the pool.'},
    {t:'C) Users are notified to try again later',c:false},
    {t:'D) The server is automatically rebooted',c:false}
  ]),
  ST('Coming Next','Part 5: Sticky Sessions','Learn about session affinity, why sticky sessions exist, the problems they introduce, and modern alternatives like JWT and Redis-backed sessions.')
];

// Part 5: Sticky Sessions
var ch2p5 = [
  ST('Returning to the Same Banker','What Are Sticky Sessions?','Imagine you visit a bank every week. Only one employee knows your paperwork, preferences, and history. Whenever you arrive, the receptionist always sends you to the same employee. Initially convenient. Now imagine that employee is sick. Nobody else knows your case. Your work stops. This is exactly how sticky sessions behave.'),
  DB('<strong>Sticky Session:</strong> Once a client is assigned to a server, future requests from that client continue going to the same server. The server becomes responsible for maintaining that user\'s session.'),
  SE('Problems with Sticky Sessions'),
  TG([
    {tc:'📊 Poor Load Distribution',td:'One server may accumulate many active users while others remain underutilized.'},
    {tc:'💀 Single Point of User State',td:'If the assigned server crashes, the user\'s session is lost.'},
    {tc:'📈 Difficult Auto Scaling',td:'Adding new servers doesn\'t help existing users tied to old servers.'},
    {tc:'🚀 Complicated Deployments',td:'Rolling updates become harder because active sessions cannot easily move between servers.'}
  ]),
  SE('Modern Alternatives'),
  G2(
    {h:'🔴 Redis Session Store',p:'Move session data out of the application into a shared Redis cluster. Any server can retrieve the user\'s session. Eliminates coupling between users and servers.'},
    {h:'🔵 JWT (JSON Web Token)',p:'Encode user identity in a signed token. The client sends it with every request. No server-side session memory needed. Excellent horizontal scalability.'}
  ),
  SE('Memory Trick'),
  DB('<strong>Sticky Sessions = Sticky Problems.</strong> Useful for legacy systems. Avoid for modern distributed architectures.'),
  SE('Test Your Knowledge'),
  QU('1. What is the main problem with sticky sessions?',[
    {t:'A) They are too fast',c:false},
    {t:'B) They create coupling between users and specific servers',c:true,fb:'Sticky sessions tie users to specific servers, causing poor load distribution, failure risks, and scaling difficulties.'},
    {t:'C) They require more RAM',c:false},
    {t:'D) They only work with PostgreSQL',c:false}
  ]),
  ST('Coming Next','Part 6: Auto Scaling','Learn why auto scaling exists, reactive vs predictive scaling, scaling policies, and production examples from AWS and Kubernetes.')
];

// Part 6: Auto Scaling
var ch2p6 = [
  ST('Hiring Staff for a Festival','Why Auto Scaling Exists','Imagine you own a restaurant. On weekdays, 20 customers. During a festival, 2,000 arrive. If you hire 50 chefs permanently, most sit idle. If you never hire extra staff, customers wait for hours. The ideal solution? Hire temporary chefs only when demand increases. Auto scaling follows exactly the same principle.'),
  DB('<strong>Auto Scaling:</strong> The process of automatically adjusting the number or size of computing resources based on predefined metrics, schedules, or predictions to maintain performance while optimizing cost.'),
  SE('Reactive vs Predictive Scaling'),
  G2(
    {h:'⚡ Reactive Scaling',p:'Responds after metrics cross a threshold. Example: CPU > 70% → Add 2 servers. Simple to configure but has brief performance degradation before scaling completes.'},
    {h:'🔮 Predictive Scaling',p:'Uses historical traffic patterns. Example: Every weekday at 9 AM traffic increases → launch servers at 8:50 AM. Better user experience but requires historical data.'}
  ),
  SE('Common Scaling Metrics'),
  TG([
    {tc:'⚙ CPU Utilization',td:'60-70% threshold'},
    {tc:'💾 Memory Usage',td:'70-80% threshold'},
    {tc:'📊 Request Rate',td:'Requests per second'},
    {tc:'⏳ Queue Length',td:'Pending jobs count'},
    {tc:'⏱ Response Time',td:'Latency target'},
    {tc:'📋 Custom Metrics',td:'Business-specific'}
  ]),
  SE('Cooldown Period'),
  CA('<p style="color:var(--tm)">A new server needs time to boot, join the cluster, and receive traffic. If scaling decisions are made too quickly, the system may keep adding and removing servers unnecessarily. A <strong>cooldown period</strong> prevents this oscillation.</p>'),
  SE('Memory Trick'),
  DB('<strong>Measure → Decide → Scale → Stabilize.</strong> Never scale blindly.'),
  SE('Test Your Knowledge'),
  QU('1. What is the main advantage of predictive scaling over reactive scaling?',[
    {t:'A) It\'s easier to configure',c:false},
    {t:'B) It eliminates latency spikes by scaling BEFORE traffic arrives',c:true,fb:'Predictive scaling uses historical patterns to scale ahead of demand, preventing the brief degradation that reactive scaling experiences.'},
    {t:'C) It uses less CPU',c:false},
    {t:'D) It doesn\'t need metrics',c:false}
  ]),
  ST('Coming Next','Part 7: Geographic Distribution','Learn why deploy globally, regions and availability zones, latency reduction, disaster recovery, and active-active vs active-passive setups.')
];

// Part 7: Geographic Distribution
var ch2p7 = [
  ST('One Restaurant for the Entire World','Why Geographic Distribution Matters','Imagine opening a single restaurant in New York. Customers from New York are happy. Customers from London wait hours. Customers from Tokyo receive cold food. The restaurant is excellent. The location is the problem. Software behaves the same way. If your only server is in Virginia, users in India, Australia, and Europe experience higher latency because every request must travel across continents.'),
  DB('<strong>Geographic Distribution:</strong> Deploying application instances in multiple regions worldwide to reduce latency, improve availability, and provide disaster recovery.'),
  SE('Region vs Availability Zone'),
  G2(
    {h:'🌍 Region',p:'A separate geographic area with independent infrastructure. Examples: US East, Europe West, Asia Pacific. Each region contains multiple Availability Zones.'},
    {h:'🏢 Availability Zone (AZ)',p:'An isolated data center within a Region. Applications deploy across multiple AZs first, then across multiple Regions.'}
  ),
  SE('Active-Passive vs Active-Active'),
  G2(
    {h:'🟡 Active-Passive',p:'One Region serves traffic. The second waits for failure. Simpler, lower operational complexity. Backup resources are mostly idle. Failover takes time.'},
    {h:'🟢 Active-Active',p:'Both regions serve traffic simultaneously. Better latency and availability. Requires sophisticated data replication and conflict resolution. Used by Netflix, Google.'}
  ),
  SE('Disaster Recovery: RTO and RPO'),
  TG([
    {tc:'⏱ RTO (Recovery Time Objective)',td:'How quickly must service recover? Lower RTO = faster failover = higher cost.'},
    {tc:'📊 RPO (Recovery Point Objective)',td:'How much data loss is acceptable? Lower RPO = less data loss = more replication = higher cost.'}
  ]),
  SE('Memory Trick'),
  DB('<strong>Multi-AZ</strong> protects against data center failures. <strong>Multi-Region</strong> protects against regional failures.'),
  SE('Test Your Knowledge'),
  QU('1. What is the main benefit of geographic distribution for users in Tokyo?',[
    {t:'A) They get newer features first',c:false},
    {t:'B) Lower latency — data travels a shorter distance',c:true,fb:'A server in Tokyo means near-instant responses instead of 200ms+ round trips to the US.'},
    {t:'C) Better security',c:false},
    {t:'D) More storage',c:false}
  ]),
  ST('Coming Next','Part 8: Cost vs Performance Trade-offs','Explore the economics of scaling — when to spend more for performance and when to accept trade-offs.')
];

// Part 8: Cost vs Performance
var ch2p8 = [
  ST('Buying a Car','Why Cost Matters','Imagine you need a car for your daily commute. You have three options: Economy car, Luxury sedan, Formula 1 race car. The Formula 1 car is the fastest. Does that make it the best choice? No. It is expensive, difficult to maintain, uncomfortable, and unnecessary for city traffic. Software architecture is similar. The most scalable architecture is not always the right architecture.'),
  DB('<strong>Cost vs Performance:</strong> Every component in your architecture has a cost — servers, databases, load balancers, storage, network bandwidth, monitoring, engineering effort, operational complexity. As architects, we optimize for <strong>business value</strong>, not just technical excellence.'),
  SE('The Law of Diminishing Returns'),
  CA('<p style="color:var(--tm)">The first optimization often provides huge benefits. Adding a Redis cache may reduce latency from <strong>500ms to 50ms</strong>. A second optimization might reduce it to <strong>40ms</strong>. A third optimization may cost thousands of dollars to reach <strong>35ms</strong>. Eventually, each improvement costs more while delivering less value.</p>'),
  SE('Over-Engineering vs Under-Engineering'),
  G2(
    {h:'⚠ Over-Engineering',p:'A startup with 500 users deploys Kubernetes, Kafka, Cassandra, Service Mesh, Multi-region. The monthly bill exceeds revenue. Solved tomorrow\'s problem while creating today\'s.'},
    {h:'⚠ Under-Engineering',p:'Storing all customer data in a single SQLite file while serving millions of users. The application cannot grow. Good architecture finds the balance.'}
  ),
  SE('Decision Framework'),
  CA('<p style="color:var(--tm)">Before introducing a new component, ask: 1) What problem does it solve? 2) Is the problem real today? 3) What is the operational cost? 4) Can a simpler solution work? 5) How difficult will maintenance become? <strong>If you cannot justify a component, remove it.</strong></p>'),
  SE('Memory Trick'),
  DB('<strong>Simple until necessary. Complex only when justified.</strong>'),
  SE('Test Your Knowledge'),
  QU('1. A startup has 500 users and a $500/month budget. Should they use multi-region deployment?',[
    {t:'A) Yes — prepare for growth',c:false},
    {t:'B) No — start simple with a single server or managed service',c:true,fb:'Premature optimization wastes budget. Scale when you need to, not before.'},
    {t:'C) Yes — users expect global latency',c:false},
    {t:'D) Maybe — depends on the weather',c:false}
  ]),
  ST('Coming Next','Part 9: Dropbox Case Study','See how Dropbox evolved from a simple file sync service to a globally distributed platform serving billions of files.')
];

// Part 9: Dropbox Case Study
var ch2p9 = [
  ST('Designing Dropbox','Cloud File Storage HLD','Design a cloud storage system similar to Dropbox where users can upload files, download files, synchronize files across devices, and share files using links. The service should support millions of users and large files.'),
  SE('Requirements'),
  G2(
    {h:'✅ Functional',p:'User authentication, File upload/download, File synchronization, Folder management, Shareable links, File version history (optional).'},
    {h:'📊 Non-Functional',p:'High availability, Durable storage, Low download latency, Horizontal scalability, Secure file access.'}
  ),
  SE('Capacity Estimation'),
  CA('<p style="color:var(--tm)">Assumptions: 20 million DAU, average file uploaded/day = 50 MB, total uploads/day ≈ 1 PB. Read traffic is much higher than write traffic. <strong>Key insight:</strong> Storage dominates infrastructure cost. Metadata is much smaller than file content.</p>'),
  SE('High-Level Architecture'),
  FI('<svg viewBox="0 0 700 450" width="100%"><defs><linearGradient id="dg"><stop offset="0%" stop-color="#4f46e5"/><stop offset="100%" stop-color="#06b6d4"/></linearGradient><marker id="da" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10" fill="#64748b"/></marker></defs><rect x="250" y="10" width="200" height="40" rx="8" fill="url(#dg)"/><text x="350" y="36" fill="white" font-size="15" font-weight="700" text-anchor="middle">🌐 Users</text><line x1="350" y1="50" x2="350" y2="70" stroke="#64748b" stroke-width="2" marker-end="url(#da)"/><rect x="230" y="75" width="240" height="40" rx="8" fill="#06b6d4"/><text x="350" y="100" fill="white" font-size="14" font-weight="700" text-anchor="middle">⚖ Load Balancer</text><line x1="280" y1="115" x2="150" y2="150" stroke="#64748b" stroke-width="2" marker-end="url(#da)"/><line x1="420" y1="115" x2="550" y2="150" stroke="#64748b" stroke-width="2" marker-end="url(#da)"/><rect x="30" y="155" width="240" height="40" rx="8" fill="#10b981"/><text x="150" y="180" fill="white" font-size="14" font-weight="700" text-anchor="middle">API Servers</text><rect x="430" y="155" width="240" height="40" rx="8" fill="#10b981"/><text x="550" y="180" fill="white" font-size="14" font-weight="700" text-anchor="middle">Upload Service</text><line x1="150" y1="195" x2="150" y2="230" stroke="#64748b" stroke-width="2" marker-end="url(#da)"/><line x1="550" y1="195" x2="550" y2="230" stroke="#64748b" stroke-width="2" marker-end="url(#da)"/><rect x="30" y="235" width="240" height="40" rx="8" fill="#f59e0b"/><text x="150" y="260" fill="white" font-size="14" font-weight="700" text-anchor="middle">🗄 Metadata DB</text><rect x="430" y="235" width="240" height="40" rx="8" fill="#f59e0b"/><text x="550" y="260" fill="white" font-size="14" font-weight="700" text-anchor="middle">☁ Object Storage</text><line x1="300" y1="275" x2="350" y2="310" stroke="#64748b" stroke-width="2" marker-end="url(#da)"/><rect x="230" y="315" width="240" height="40" rx="8" fill="#ef4444"/><text x="350" y="340" fill="white" font-size="14" font-weight="700" text-anchor="middle">📤 Sync / Notification Queue</text><line x1="350" y1="355" x2="350" y2="390" stroke="#64748b" stroke-width="2" marker-end="url(#da)"/><rect x="230" y="395" width="240" height="40" rx="8" fill="#7c3aed"/><text x="350" y="420" fill="white" font-size="14" font-weight="700" text-anchor="middle">⚙ Worker Services</text></svg>','Dropbox HLD: API servers handle metadata, upload service streams to object storage, queue handles background processing.'),
  SE('Key Architectural Decisions'),
  TG([
    {tc:'🧱 Block-Level Sync',td:'Files are split into 4MB blocks. Only changed blocks are uploaded — not entire files. Massive bandwidth savings.'},
    {tc:'🔍 Content Hashing',td:'Each block is identified by its SHA-256 hash. Identical blocks across users are stored only once (deduplication).'},
    {tc:'💻 LAN Sync',td:'When multiple devices are on the same network, files sync locally instead of through the cloud. Much faster.'},
    {tc:'📦 Compression',td:'Blocks are compressed before transfer. Reduces storage and bandwidth by up to 50%.'}
  ]),
  SE('Memory Trick'),
  DB('<strong>Metadata is small. Files are huge.</strong> Treat them differently. Never store large binary files inside the relational database.'),
  SE('Test Your Knowledge'),
  QU('1. How does Dropbox avoid re-uploading entire files when only a small part changes?',[
    {t:'A) It re-uploads everything',c:false},
    {t:'B) Block-level sync — only changed 4MB blocks are uploaded',c:true,fb:'Block-level sync + content hashing means only changed portions of files are transferred.'},
    {t:'C) It uses FTP',c:false},
    {t:'D) It compresses the entire file',c:false}
  ]),
  ST('Coming Next','Part 10: Chapter 2 Revision','Review all scalability fundamentals covered in this chapter with a comprehensive summary and practice questions.')
];

// Part 10: Chapter 2 Revision
var ch2p10 = [
  SE('Chapter 2 Summary'),
  TG([
    {tc:'🧠 Scalability',td:'The ability to maintain performance as demand increases. Scale follows success.'},
    {tc:'⬆ Vertical Scaling',td:'Bigger Box — upgrade CPU, RAM, disk. Simple but limited by physical constraints.'},
    {tc:'➡ Horizontal Scaling',td:'More Boxes — add servers behind a load balancer. Virtually unlimited but adds complexity.'},
    {tc:'🔌 Stateless Architecture',td:'State belongs to the data layer, not the application layer. Essential for horizontal scaling.'},
    {tc:'⚖ Load Balancers',td:'Traffic police — distribute requests, perform health checks, enable failover.'},
    {tc:'🔒 Sticky Sessions',td:'Legacy approach. Modern systems use Redis or JWT for session management.'},
    {tc:'📈 Auto Scaling',td:'Measure → Decide → Scale → Stabilize. Reactive and predictive approaches.'},
    {tc:'🌍 Geographic Distribution',td:'Deploy globally for lower latency and disaster recovery. Active-Active vs Active-Passive.'}
  ]),
  SE('Final Quiz'),
  QU('1. Which scaling approach would you recommend for a startup with 100 users?',[
    {t:'A) Kubernetes with 10 nodes',c:false},
    {t:'B) Vertical scaling — start with a single powerful server',c:true,fb:'Start simple. Add horizontal scaling only when you hit the limits of vertical scaling.'},
    {t:'C) Multi-region deployment',c:false},
    {t:'D) Microservices from day one',c:false}
  ]),
  QU('2. What is the key requirement for horizontal scaling of application servers?',[
    {t:'A) A fast database',c:false},
    {t:'B) Stateless services',c:true,fb:'Stateless services allow any server to handle any request, enabling horizontal scaling, load balancing, and auto scaling.'},
    {t:'C) More RAM',c:false},
    {t:'D) SSD storage',c:false}
  ]),
  ST('Chapter 3 Preview','Database Fundamentals','Next up: RDBMS vs NoSQL, ACID vs BASE, CAP Theorem, Database Indexing, and Schema Design. The foundation of all data architecture.')
];

// Write Chapter 2 parts 4-10
var ch2parts = [ch2p4, ch2p5, ch2p6, ch2p7, ch2p8, ch2p9, ch2p10];
var ch2titles = ['Load Balancers','Sticky Sessions','Auto Scaling Fundamentals','Geographic Distribution','Cost vs Performance Trade-offs','Dropbox Case Study','Chapter 2 Revision'];
var ch2subs = ['Layer 4 vs Layer 7 · Round Robin · Health Checks','Session Affinity · Sticky Sessions = Sticky Problems','Measure → Decide → Scale → Stabilize','Global Traffic · Disaster Recovery · Active-Active','Every millisecond costs money','From File Sync to Global Platform','Scalability Fundamentals Complete Summary'];
var ch2stats = [
  [{n:'Layer 4',l:'Transport'},{n:'Layer 7',l:'Application'},{n:'3',l:'Algorithms'},{n:'Health',l:'Checks'}],
  [{n:'Sticky',l:'Legacy Fix'},{n:'Redis',l:'Shared Store'},{n:'JWT',l:'Token Auth'},{n:'Stateless',l:'Best Practice'}],
  [{n:'Reactive',l:'Threshold'},{n:'Predictive',l:'ML-based'},{n:'Cooldown',l:'Stabilize'},{n:'HPA',l:'Kubernetes'}],
  [{n:'Regions',l:'Global'},{n:'Active-Active',l:'Both serve'},{n:'Active-Passive',l:'Failover'},{n:'Latency',l:'Reduced'}],
  [{n:'Performance',l:'Costs Money'},{n:'Latency',l:'vs Budget'},{n:'Efficiency',l:'Optimization'},{n:'ROI',l:'Framework'}],
  [{n:'Files',l:'Billions'},{n:'Users',l:'700M+'},{n:'Blocks',l:'Delta Sync'},{n:'LAN Sync',l:'Optimization'}],
  [{n:'10',l:'Parts'},{n:'2',l:'Scaling Types'},{n:'3',l:'Algorithms'},{n:'1',l:'Case Study'}]
];

ch2parts.forEach(function(secs, i) {
  var p = i + 4;
  var file = 'chapter-02-part-0' + p + '.html';
  var content = PG(ch2titles[i] + ' | System Design', H('Chapter 2 · Part ' + p + ' · ' + ch2titles[i], ch2titles[i], ch2subs[i], ch2titles[i] + ' — ' + ch2subs[i] + '. Learn the fundamentals of scalability for system design interviews.', ch2stats[i]) + WR(secs.join('\n')));
  fs.writeFileSync(path.join(dir, file), content);
  count++;
  console.log('Generated: ' + file);
});

console.log('\nDone! Generated ' + count + ' files total.');