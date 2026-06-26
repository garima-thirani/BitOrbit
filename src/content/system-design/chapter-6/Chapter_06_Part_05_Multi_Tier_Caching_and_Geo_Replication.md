# The Ultimate System Design Handbook

# Chapter 6 -- Distributed Caching & CDN Deep Dive

# Part 5 -- Multi-Tier Caching (L1/L2/L3) & Geo-Distributed Replication

> **Theme:** Modern systems rarely rely on a single cache. Instead, they
> build a hierarchy of caches---from CPU and application memory to Redis
> and CDNs---so every request is answered from the fastest possible
> layer.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand multi-tier cache hierarchies.
-   Learn L1, L2 and L3 cache architectures.
-   Understand geo-distributed caching and replication.
-   Learn consistency trade-offs across regions.
-   Design globally distributed caching systems.

------------------------------------------------------------------------

# Story -- Three Warehouses

Imagine a company sells products worldwide.

-   A shelf inside the store (fastest)
-   A city warehouse (fast)
-   A national warehouse (slower)

Employees always check the nearest storage first.

Only if it's unavailable do they travel farther.

Caching follows the same principle.

------------------------------------------------------------------------

# Why Multiple Cache Layers?

One cache cannot optimize every request.

Different layers optimize for:

-   Latency
-   Network distance
-   Memory cost
-   Scalability
-   Availability

Each layer protects the one below it.

------------------------------------------------------------------------

# L1 Cache -- Application Cache

Stored inside the application process.

``` text
Application
   │
 L1 Cache
```

Examples:

-   In-memory maps
-   Guava Cache
-   Caffeine

### Advantages

-   Nanosecond access
-   No network hop

### Limitations

-   Lost on restart
-   Not shared between instances

------------------------------------------------------------------------

# L2 Cache -- Distributed Cache

Shared across all application servers.

``` text
App A ─┐
App B ─┼──► Redis Cluster
App C ─┘
```

Examples:

-   Redis
-   Memcached

### Advantages

-   Shared state
-   Horizontal scaling
-   High hit ratio

------------------------------------------------------------------------

# L3 Cache -- CDN / Edge

Closest to end users.

``` text
User
 │
CDN Edge
 │
Origin
```

Caches:

-   Images
-   CSS
-   JS
-   Videos
-   Public APIs

------------------------------------------------------------------------

# Request Flow

``` text
Client
  │
  ▼
L3 CDN
  │ Miss
  ▼
Application
  │
L1 Cache
  │ Miss
  ▼
L2 Redis
  │ Miss
  ▼
Database
```

A hit at any layer avoids work below it.

------------------------------------------------------------------------

# Cache Hierarchy

  Layer   Scope             Latency
  ------- ----------------- -----------------
  L1      Local process     Lowest
  L2      Shared cache      Very Low
  L3      Global edge       Low (near user)
  DB      Source of truth   Highest

------------------------------------------------------------------------

# Geo-Distributed Replication

Global applications deploy caches in multiple regions.

``` text
      US Redis
         │
     Replication
         │
      EU Redis
         │
     Replication
         │
     APAC Redis
```

Each region serves nearby users.

------------------------------------------------------------------------

# Replication Models

## Active-Passive

One region updates.

Others replicate.

Simple but slower globally.

------------------------------------------------------------------------

## Active-Active

Multiple regions accept writes.

Requires conflict resolution.

Lower latency, higher complexity.

------------------------------------------------------------------------

# Consistency Challenges

Suppose a product price changes in Europe.

Before replication completes:

-   Europe shows ₹100
-   Asia still shows ₹95

Applications must decide:

-   Serve stale data?
-   Route to origin?
-   Invalidate globally?

This is the latency vs consistency trade-off.

------------------------------------------------------------------------

# Cache Warming Across Regions

Frequently accessed objects are proactively loaded into regional caches
after deployment or failover.

Benefits:

-   Higher initial hit ratio
-   Lower origin load
-   Better user experience

------------------------------------------------------------------------

# Production Example

A video streaming platform:

-   L1: Application metadata cache
-   L2: Redis for sessions and manifests
-   L3: CDN for images and video segments

Millions of requests never reach the database.

------------------------------------------------------------------------

# Best Practices

-   Use L1 for tiny hot objects.
-   Use L2 for shared application state.
-   Use L3 for static global assets.
-   Monitor hit ratios independently.
-   Replicate strategically, not blindly.

------------------------------------------------------------------------

# Interview Callout

**Question**

"Why have both an L1 cache and Redis?"

Good answer:

> L1 avoids even the network hop to Redis, while Redis provides a shared
> cache across application instances. Together they maximize performance
> and reduce infrastructure load.

------------------------------------------------------------------------

# Common Mistakes

-   Treating all cache layers equally.
-   Ignoring regional latency.
-   Over-replicating rarely used data.
-   Forgetting invalidation across layers.
-   Measuring only Redis hit ratio instead of end-to-end cache
    efficiency.

------------------------------------------------------------------------

# Memory Trick

**L1 = Me**

**L2 = My Team**

**L3 = My City**

**Database = Headquarters**

------------------------------------------------------------------------

# Quick Summary

  Layer             Best For
  ----------------- ----------------------
  L1                Local hot objects
  L2                Shared cache
  L3                Global content
  Geo Replication   Regional performance

------------------------------------------------------------------------

# Dependency Map

``` text
Caching
 │
 ├── L1 (Application)
 ├── L2 (Redis)
 ├── L3 (CDN)
 │
 └── Geo Replication
       ├── Regions
       ├── Consistency
       └── Availability
```

------------------------------------------------------------------------

# Coming Next

**Part 6 -- Cache Warming Strategies**

Topics:

-   Cold starts
-   Preloading
-   Background warming
-   Predictive warming
-   Rolling deployments
