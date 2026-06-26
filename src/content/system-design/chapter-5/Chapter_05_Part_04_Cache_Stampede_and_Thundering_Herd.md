# The Ultimate System Design Handbook

# Chapter 5 -- Caching Fundamentals

# Part 4 -- Cache Stampede & Thundering Herd

> **Theme:** A cache can protect your database---until it expires. If
> thousands of requests miss the cache simultaneously, they all rush to
> the database at once. This is known as a **cache stampede** or
> **thundering herd**, and it has caused real production outages.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand what a cache stampede is.
-   Learn why it happens.
-   Explore prevention techniques.
-   Understand production-ready mitigation strategies.
-   Answer cache stampede interview questions confidently.

------------------------------------------------------------------------

# Story -- The Concert Ticket Counter

A stadium opens ticket sales at exactly **10:00 AM**.

10,000 people arrive together.

Only one ticket counter exists.

Everyone rushes the counter simultaneously.

The counter becomes overloaded.

The same thing happens when a popular cache entry expires.

Instead of one database query, thousands occur at once.

------------------------------------------------------------------------

# What is a Cache Stampede?

A cache stampede occurs when many requests try to rebuild the same
expired cache entry simultaneously.

``` text
Users
 │ │ │ │ │
 ▼ ▼ ▼ ▼ ▼
Cache Miss
     │
     ▼
Database

1000 identical queries
```

The database becomes overwhelmed.

------------------------------------------------------------------------

# Why It Happens

Typical flow:

1.  Popular key expires.
2.  Thousands of users request it.
3.  Every request misses the cache.
4.  Every request queries the database.
5.  Database CPU spikes.
6.  Latency increases.
7.  Cascading failures may begin.

------------------------------------------------------------------------

# Thundering Herd

A thundering herd is a broader problem where many waiting clients wake
up together after a shared event.

Examples:

-   Cache expiry
-   Lock release
-   Server restart
-   Scheduled refresh

Cache stampede is a common form of the thundering herd problem.

------------------------------------------------------------------------

# Architecture

``` text
          Clients
    ┌────┬────┬────┐
    ▼    ▼    ▼    ▼
         Cache
           │
      Expired Key
           │
           ▼
        Database
```

Without protection, every client reaches the database.

------------------------------------------------------------------------

# Solution 1 -- Mutex Lock

Only one request rebuilds the cache.

``` text
Cache Miss
    │
Acquire Lock
    │
 ┌──┴──┐
 │     │
Yes    No
 │      │
DB   Wait/Retry
 │
Update Cache
 │
Release Lock
```

Advantages:

-   Prevents duplicate work.
-   Easy to understand.

Trade-offs:

-   Waiting requests experience extra latency.
-   Lock failures must be handled carefully.

------------------------------------------------------------------------

# Solution 2 -- Request Coalescing

Instead of each request querying independently, identical requests are
merged.

``` text
100 Requests

↓

One Database Query

↓

Shared Response
```

Very effective for highly popular keys.

------------------------------------------------------------------------

# Solution 3 -- Stale-While-Revalidate

Serve slightly stale data while refreshing the cache in the background.

``` text
Client

↓

Old Cache Value

↓

Background Refresh

↓

Fresh Cache
```

Users receive fast responses while freshness is restored asynchronously.

Used heavily by CDNs and web caches.

------------------------------------------------------------------------

# Solution 4 -- Probabilistic Early Expiration

Instead of allowing every key to expire at exactly the same time,
refresh some entries slightly earlier using probability.

Benefits:

-   Spreads database load.
-   Prevents synchronized expirations.

------------------------------------------------------------------------

# Solution 5 -- TTL Jitter

Never assign identical expiration times.

Bad:

``` text
100 Keys

Expire at 12:00 PM
```

Better:

``` text
Expire between
11:58–12:03
```

Randomized TTLs prevent large expiration waves.

------------------------------------------------------------------------

# Production Example

A news website caches its homepage for 60 seconds.

Without protection:

-   50,000 users refresh after TTL expires.
-   Database receives 50,000 identical queries.

With mutex + stale-while-revalidate:

-   One request rebuilds.
-   Everyone else receives cached content.
-   Database load remains stable.

------------------------------------------------------------------------

# Choosing the Right Strategy

  Strategy                 Best For
  ------------------------ ----------------------
  Mutex Lock               Single hot key
  Request Coalescing       API gateways
  Stale-While-Revalidate   News, CDN, content
  TTL Jitter               Large cache clusters
  Early Expiration         High-scale systems

Large systems often combine multiple techniques.

------------------------------------------------------------------------

# Interview Callout

**Question**

"How would you prevent a cache stampede on a popular product page?"

Good answer:

> "I would combine cache-aside with mutex locking, randomized TTLs, and
> stale-while-revalidate. This ensures only one request rebuilds the
> cache while users continue receiving fast responses."

------------------------------------------------------------------------

# Common Mistakes

-   Giving every key the same TTL.
-   Ignoring hot keys.
-   Locking the entire cache instead of a single key.
-   Returning database errors instead of stale data.

------------------------------------------------------------------------

# Memory Trick

Remember:

**One Cache Miss should create One Database Query---not one thousand.**

------------------------------------------------------------------------

# Quick Summary

  Problem             Solution
  ------------------- ------------------------
  Stampede            Mutex Lock
  Burst Expiration    TTL Jitter
  Duplicate Queries   Request Coalescing
  Slow Refresh        Stale-While-Revalidate

------------------------------------------------------------------------

# Dependency Map

``` text
Caching
   │
   ├── Cache Patterns
   ├── Eviction
   ├── Stampede
   │      ├── Mutex
   │      ├── SWR
   │      ├── TTL Jitter
   │      └── Coalescing
   └── Cache Invalidation
```

------------------------------------------------------------------------

# Coming Next

**Part 5 -- Cache Invalidation Strategies**

Topics:

-   TTL
-   Event-based invalidation
-   Tag-based invalidation
-   Versioned keys
-   Cache consistency patterns
