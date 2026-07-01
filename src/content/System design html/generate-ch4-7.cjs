const fs = require('fs');
const path = require('path');

const CSS_LINK = '<link rel="stylesheet" href="sd-styles.css">';
const FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">';
const QS = '<script>function ck(el,correct){const p=el.parentElement;const f=p.querySelector(\'.quiz-feedback\');const o=p.querySelectorAll(\'.quiz-opt\');o.forEach(x=>{x.style.pointerEvents=\'none\';if(x===el&&correct)x.classList.add(\'correct\');else if(x===el&&!correct)x.classList.add(\'wrong\');else if(correct&&x!==el)x.classList.add(\'correct\');});f.classList.add(\'show\');if(correct)f.classList.add(\'correct\');else f.classList.add(\'wrong\');}</script>';

function h(b,t,s,d,st){return '<div class="hero"><div class="hero-inner"><div class="badge">'+b+'</div><h1>'+t+'<br><span>'+s+'</span></h1><p>'+d+'</p><div class="stats">'+st.map(function(x){return '<div class="stat"><div class="sn">'+x.n+'</div><div class="sl">'+x.l+'</div></div>';}).join('')+'</div></div></div>';}
function st(l,t,x){return '<div class="story"><div class="slabel">'+l+'</div><h3>'+t+'</h3><p>'+x+'</p></div>';}
function se(t){return '<div class="sec">'+t+'</div>';}
function db(t){return '<div class="defbox">'+t+'</div>';}
function ca(c){return '<div class="card">'+c+'</div>';}
function tg(i){return '<div class="tag-grid">'+i.map(function(x){return '<div class="tag-card"><div class="tc">'+x.tc+'</div><div class="td">'+x.td+'</div></div>';}).join('')+'</div>';}
function g2(l,r){return '<div class="g2"><div class="gc"><h4>'+l.h+'</h4><p>'+l.p+'</p></div><div class="gc"><h4>'+r.h+'</h4><p>'+r.p+'</p></div></div>';}
function qu(q,o){return '<div class="quiz-card"><div class="quiz-q">'+q+'</div>'+o.map(function(x){return '<div class="quiz-opt" onclick="ck(this,'+x.c+')">'+x.t+'</div>';}).join('')+'<div class="quiz-feedback">'+(o.find(function(x){return x.c;}).fb||'')+'</div></div>';}
function wr(c){return '<div class="wrap">'+c+'</div>';}
function pg(t,c){return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>'+t+' | System Design Interactive</title>'+FONTS+CSS_LINK+'</head><body>'+c+QS+'</body></html>';}

var all = [];

function addCh(file,title,badge,h1,hs,desc,stats,secs){
  var sections = secs.map(function(f){return f();}).join('\n');
  var content = pg(title, h(badge, h1, hs, desc, stats) + wr(sections));
  all.push({file:file,content:content});
}

// Chapter 4
var ch4 = [
  {p:1,t:'Database Sharding',s:'Horizontal Partitioning',d:'Splitting a large database into smaller, independent databases called shards.'},
  {p:2,t:'Consistent Hashing',s:'Distributed Key Mapping',d:'A technique that minimizes data movement when the number of shards changes.'},
  {p:3,t:'Primary-Replica Separation',s:'Scaling Reads',d:'Separating read and write operations. Writes go to primary, reads go to replicas.'},
  {p:4,t:'Read Replicas',s:'Read-Heavy Workloads',d:'Dedicated database replicas that handle read-only queries.'},
  {p:5,t:'Multi-Leader Replication',s:'Conflict Resolution',d:'Multiple nodes accept writes and replicate to each other.'},
  {p:6,t:'Connection Pooling',s:'Database Optimization',d:'Managing database connections efficiently.'},
  {p:7,t:'News Aggregator Case Study',s:'Database Scaling in Practice',d:'Applying database scaling patterns to design the data layer for a global news aggregator.'},
  {p:8,t:'Chapter 4 Revision',s:'Database Scaling Summary',d:'Comprehensive review of all database scaling concepts.'}
];

ch4.forEach(function(t){
  var secs = [];
  secs.push(function(){return st(t.t,'Database Scaling Decisions','Database scaling is one of the hardest challenges in system design. '+t.d);});
  secs.push(function(){return db('<strong>'+t.t+':</strong> '+t.d);});
  if(t.p===1){
    secs.push(function(){return se('Sharding Strategies');});
    secs.push(function(){return tg([{tc:'Key-Based (Hash)',td:'Shard key % N. Simple but adding shards requires rehashing.'},{tc:'Range-Based',td:'Divide data by ranges. Simple but can cause hotspots.'},{tc:'Geographic',td:'Shard by region. Good for data residency.'}]);});
  }
  if(t.p===2){
    secs.push(function(){return se('How Consistent Hashing Works');});
    secs.push(function(){return ca('<p style="color:var(--tm)">Imagine a circle with all possible hash values. Servers and keys are placed on this circle. Each key is assigned to the nearest server clockwise. When a server is added or removed, only its immediate neighbors are affected.</p>');});
  }
  if(t.p===3){
    secs.push(function(){return se('Primary-Replica Architecture');});
    secs.push(function(){return ca('<p style="color:var(--tm)"><strong>Primary:</strong> Handles all writes. <strong>Replicas:</strong> Handle read-only queries. This separation allows read-heavy systems to scale horizontally.</p>');});
  }
  secs.push(function(){return se('Quick Quiz');});
  secs.push(function(){return qu('1. '+t.t+' - what is the key benefit?',[{t:'A) Makes the database smaller',c:false},{t:'B) Enables horizontal scaling of database workloads',c:true,fb:'Database scaling distributes data across multiple machines.'},{t:'C) Eliminates indexes',c:false},{t:'D) Makes queries faster automatically',c:false}]);});
  secs.push(function(){return st('Coming Next',t.p<8?'Next topic':'Chapter 5: Caching','Continue building your knowledge.');});

  var file = 'chapter-04-part-'+(t.p<10?'0':'')+t.p+'.html';
  addCh(file,t.t+' | System Design','Chapter 4 Part '+t.p+' - '+t.t,t.t,t.s,t.d,[{n:'Scaling',l:'Database'},{n:'Shards',l:'Horizontal'},{n:'Replicas',l:'Reads'},{n:t.p===7?'Case':'Learn',l:t.p===7?'Study':''}],secs);
});

// Chapter 5
[1,2,3,4,5,6,7,8].forEach(function(p){
  var topics = ['Cache Fundamentals','Caching Patterns','Cache Eviction Policies','Cache Stampede','Cache Invalidation','When NOT to Cache','Ticketmaster Case Study','Chapter 5 Revision'];
  var subs = ['Why Caching Matters','Cache-Aside, Read-Through, Write-Through','LRU, LFU, FIFO, TTL','Preventing Cache Collapse','Keeping Stale Data Out','Anti-Patterns','Caching for High Demand','Caching Summary'];
  var descs = ['Caching is the most impactful performance optimization.','Keeping cache and database in sync.','What stays and what goes when cache is full.','Preventing thousands of requests from missing cache simultaneously.','How to ensure users see fresh data.','Scenarios where caching hurts more than helps.','How ticket booking systems handle millions of concurrent users.','Comprehensive review of caching concepts.'];
  var t = topics[p-1], s = subs[p-1], d = descs[p-1];
  var secs = [];
  secs.push(function(){return st(t,'The Cache Mindset','Caching stores expensive-to-compute results in fast memory. '+d);});
  secs.push(function(){return db('<strong>'+t+':</strong> '+d);});
  if(p===1){
    secs.push(function(){return se('Where Caching Helps');});
    secs.push(function(){return tg([{tc:'Read-Heavy Workloads',td:'90%+ reads benefit most.'},{tc:'Repeated Computations',td:'Expensive calculations with same result.'},{tc:'Database Results',td:'Frequently accessed data.'},{tc:'Static Assets',td:'Images, CSS, JS.'}]);});
  }
  if(p===2){
    secs.push(function(){return se('Cache-Aside Pattern');});
    secs.push(function(){return ca('<p style="color:var(--tm)">1. Check cache first 2. Cache hit -> return 3. Cache miss -> query DB 4. Store in cache 5. Return data. This is the most common pattern.</p>');});
  }
  secs.push(function(){return se('Quick Quiz');});
  secs.push(function(){return qu('1. '+t+' - what is the primary goal?',[{t:'A) Reduce storage costs',c:false},{t:'B) Improve read performance by reducing database load',c:true,fb:'Caching avoids expensive database queries.'},{t:'C) Increase write throughput',c:false},{t:'D) Simplify code',c:false}]);});
  secs.push(function(){return st('Coming Next',p<8?topics[p]:'Chapter 6: Advanced Caching','Continue learning.');});

  var file = 'chapter-05-part-'+(p<10?'0':'')+p+'.html';
  addCh(file,t+' | System Design','Chapter 5 Part '+p+' - '+t,t,s,d,[{n:'Cache',l:'Performance'},{n:'Hit Rate',l:'>90%'},{n:p===7?'Case':'Pattern',l:p===7?'Study':'Design'}],secs);
});

// Chapter 6
[1,2,3,4,5,6,7,8].forEach(function(p){
  var topics = ['Redis Cluster & Data Structures','Memcached vs Redis','CDN Fundamentals','Edge Caching & Latency','Multi-Tier Caching','Cache Warming','Facebook News Feed Case Study','Chapter 6 Revision'];
  var subs = ['Beyond Simple Key-Value','Choosing the Right Cache','Content Delivery Networks','Compute at the Edge','Cache Everywhere','Preventing Cold Start','Caching at Planet Scale','Advanced Caching Summary'];
  var descs = ['Redis is a data structure server with clustering.','In-memory caches designed for different purposes.','CDNs bring content closer to users globally.','Moving computation to edge locations.','Caching at browser, CDN, app, and DB levels.','Pre-populating caches before traffic arrives.','How Facebook delivers personalized content to billions.','Review of advanced caching concepts.'];
  var t = topics[p-1], s = subs[p-1], d = descs[p-1];
  var secs = [];
  secs.push(function(){return st(t,'Advanced Caching',d);});
  secs.push(function(){return db('<strong>'+t+':</strong> '+d);});
  if(p===1){
    secs.push(function(){return se('Redis Data Structures');});
    secs.push(function(){return tg([{tc:'Strings',td:'Simple key-value pairs.'},{tc:'Lists',td:'Ordered collections for queues.'},{tc:'Sets',td:'Unique elements for tags.'},{tc:'Hashes',td:'Maps of fields for objects.'}]);});
  }
  if(p===2){
    secs.push(function(){return se('Memcached vs Redis');});
    secs.push(function(){return g2({h:'Memcached',p:'Simple, fast, multi-threaded. String values only. No persistence.'},{h:'Redis',p:'Rich data structures, persistence, replication, clustering.'});});
  }
  if(p===3){
    secs.push(function(){return se('How CDNs Work');});
    secs.push(function(){return ca('<p style="color:var(--tm)">A network of geographically distributed servers caching static content. When a user requests content, the CDN serves it from the nearest edge server - reducing latency by up to 90%. Examples: CloudFront, Cloudflare, Akamai.</p>');});
  }
  secs.push(function(){return se('Quick Quiz');});
  secs.push(function(){return qu('1. '+t+' - why is this important?',[{t:'A) It replaces databases',c:false},{t:'B) It reduces latency and improves UX globally',c:true,fb:'Advanced caching brings content closer to users.'},{t:'C) Eliminates servers',c:false},{t:'D) Only for videos',c:false}]);});
  secs.push(function(){return st('Coming Next',p<8?topics[p]:'Chapter 7: Communication','Continue learning.');});

  var file = 'chapter-06-part-'+(p<10?'0':'')+p+'.html';
  addCh(file,t+' | System Design','Chapter 6 Part '+p+' - '+t,t,s,d,[{n:p<=2?'Redis':'CDN',l:'Tech'},{n:p<=2?'Cluster':'Edge',l:'Setup'},{n:p===7?'Case':'Cache',l:p===7?'Study':'Layer'}],secs);
});

// Chapter 7
[1,2].forEach(function(p){
  var topics = ['Communication in Distributed Systems','Synchronous Communication'];
  var subs = ['How Services Talk','REST, gRPC, GraphQL'];
  var descs = ['Synchronous and asynchronous communication patterns in distributed systems.','The client sends a request and waits for a response.'];
  var t = topics[p-1], s = subs[p-1], d = descs[p-1];
  var secs = [];
  secs.push(function(){return st(t,'Communication Patterns',d);});
  secs.push(function(){return db('<strong>'+t+':</strong> '+d);});
  if(p===1){
    secs.push(function(){return se('Communication Patterns');});
    secs.push(function(){return tg([{tc:'Synchronous (REST/gRPC)',td:'Client waits for response. Tight coupling.'},{tc:'Async (Message Queue)',td:'Client sends and continues. Loose coupling.'},{tc:'Event-Driven (Pub/Sub)',td:'Maximum decoupling. Used by Kafka.'}]);});
  }
  if(p===2){
    secs.push(function(){return se('gRPC vs REST');});
    secs.push(function(){return g2({h:'REST (HTTP/JSON)',p:'Human-readable. Great for public APIs. Higher overhead.'},{h:'gRPC (HTTP/2+Protobuf)',p:'Binary, faster, streaming. Best for internal services.'});});
  }
  secs.push(function(){return se('Quick Quiz');});
  secs.push(function(){return qu('1. '+t+' - which is correct?',[{t:'A) All services should be sync',c:false},{t:'B) Choice depends on consistency, latency, and coupling needs',c:true,fb:'Sync is simpler but creates coupling. Async improves resilience.'},{t:'C) Message queues are outdated',c:false},{t:'D) REST is always better',c:false}]);});

  var file = 'chapter-07-part-0'+p+'.html';
  addCh(file,t+' | System Design','Chapter 7 Part '+p+' - '+t,t,s,d,[{n:p===1?'Sync':'gRPC',l:'Pattern'}],secs);
});

// Generate all
var dir = __dirname;
var count = 0;
all.forEach(function(ch){
  fs.writeFileSync(path.join(dir, ch.file), ch.content);
  count++;
  console.log('Generated: '+ch.file);
});
console.log('\nDone! Generated '+count+' files.');