# The Ultimate System Design Handbook

# Chapter 6 -- Distributed Caching & CDN Deep Dive

# Part 6 -- Cache Warming Strategies

> **Theme:** A cache is most valuable when it already contains the data
> users need. After deployments, restarts, or failures, caches are
> empty. The period before popular data returns to the cache is called a
> **cold start**. Cache warming minimizes this problem by proactively
> filling caches before users notice.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand cold starts and cold caches.
-   Learn different cache warming strategies.
-   Compare proactive vs reactive warming.
-   Understand production deployment considerations.
-   Design cache warming solutions in interviews.

------------------------------------------------------------------------

# Story -- Opening a New Supermarket

A supermarket opens tomorrow morning.

If the shelves are empty when customers arrive, employees will spend all
day restocking while customers wait.

Instead, the supermarket stocks the shelves the night before.

Customers walk in and immediately find what they need.

Cache warming follows the same principle.

------------------------------------------------------------------------

# What is a Cold Cache?

A **cold cache** contains little or no useful data.

This happens after:

-   Service restart
-   Redis restart
-   Deployment
-   Failover
-   New region launch

The first requests become cache misses.

------------------------------------------------------------------------

# Why Cold Starts Hurt

Without cache warming:

``` text
Users
  │
  ▼
Empty Cache
  │
  ▼
Database
```

Thousands of requests suddenly reach the database.

Effects:

-   Higher latency
-   Increased database CPU
-   Cache stampedes
-   Poor user experience

------------------------------------------------------------------------

# What is Cache Warming?

Cache warming is the process of **preloading frequently accessed data
into the cache before users request it.**

Goal:

> Turn future cache misses into cache hits.

------------------------------------------------------------------------

# Strategy 1 -- Startup Warming

When the application starts:

1.  Load popular products.
2.  Load configuration.
3.  Load feature flags.
4.  Populate Redis.

``` text
Application Start
      │
Preload Hot Keys
      │
Users Arrive
      │
Cache Hit
```

------------------------------------------------------------------------

# Strategy 2 -- Scheduled Warming

Run periodic background jobs.

Examples:

-   Top 100 products
-   Homepage
-   Trending news
-   Popular videos

Useful when popularity changes throughout the day.

------------------------------------------------------------------------

# Strategy 3 -- Predictive Warming

Use analytics to predict future demand.

Examples:

-   Black Friday products
-   Cricket World Cup pages
-   Concert ticket events
-   Movie releases

Load expected hot data before traffic arrives.

------------------------------------------------------------------------

# Strategy 4 -- Event-Driven Warming

Warm cache immediately after important events.

Examples:

-   Product published
-   New article released
-   New video uploaded
-   Sale begins

``` text
Event
 │
 ▼
Warm Cache
 │
 ▼
Users
```

------------------------------------------------------------------------

# Strategy 5 -- Rolling Deployment Warming

Large systems deploy gradually.

``` text
Server A

Warm Cache

↓

Receive Traffic

↓

Deploy Server B
```

Benefits:

-   Prevents all servers becoming cold simultaneously.
-   Reduces origin load.

------------------------------------------------------------------------

# Production Example

An e-commerce platform expects a flash sale at midnight.

30 minutes before launch:

-   Product metadata loaded into Redis.
-   CDN prefetches product images.
-   Search index refreshed.
-   Homepage cache rebuilt.

When millions of users arrive, almost every request is a cache hit.

------------------------------------------------------------------------

# Best Practices

-   Warm only hot data.
-   Monitor cache hit ratio after deployment.
-   Combine warming with TTL jitter.
-   Avoid warming millions of unused objects.
-   Measure database load during warm-up.

------------------------------------------------------------------------

# Trade-offs

  Strategy       Benefit               Cost
  -------------- --------------------- ----------------------
  Startup        Fast first requests   Longer startup
  Scheduled      Predictable           May warm unused data
  Predictive     Excellent UX          Requires analytics
  Event-Driven   Fresh cache           More infrastructure
  Rolling        Stable deployments    Slower rollout

------------------------------------------------------------------------

# Interview Callout

**Question**

"How would you avoid a cold cache after deploying a new Redis cluster?"

Good answer:

> "I would preload hot keys using background workers, gradually shift
> traffic with rolling deployments, and monitor cache hit ratios. For
> static assets, I would also prefetch objects into the CDN."

------------------------------------------------------------------------

# Common Mistakes

-   Warming the entire database.
-   Ignoring changing traffic patterns.
-   Starting all servers simultaneously.
-   Forgetting to monitor cache effectiveness.
-   Triggering a cache stampede during warm-up.

------------------------------------------------------------------------

# Memory Trick

**Warm Before Users Arrive.**

Just like stocking shelves before opening a store.

------------------------------------------------------------------------

# Quick Summary

  Strategy       Best For
  -------------- ---------------------
  Startup        Restarts
  Scheduled      Regular hot content
  Predictive     Seasonal traffic
  Event-Driven   New content
  Rolling        Deployments

------------------------------------------------------------------------

# Dependency Map

``` text
Caching
   │
   ├── Cache Warming
   │      ├── Startup
   │      ├── Scheduled
   │      ├── Predictive
   │      ├── Event
   │      └── Rolling
   │
   ├── Cache Stampede
   └── CDN
```

------------------------------------------------------------------------

# Coming Next

**Part 7 -- Case Study: Facebook News Feed**

Topics:

-   Feed generation
-   Fan-out strategies
-   Multi-tier caching
-   Redis
-   CDN
-   Scaling billions of reads
