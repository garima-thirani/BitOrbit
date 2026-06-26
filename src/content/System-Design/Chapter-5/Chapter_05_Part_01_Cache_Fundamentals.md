# The Ultimate System Design Handbook

# Chapter 5 -- Caching Fundamentals

# Part 1 -- Cache Fundamentals & Why Caching Exists

> **Theme:** Computers are fast. Memory is faster. The closer your data
> is to the CPU and the user, the faster your application becomes.
> Caching is the art of avoiding unnecessary work.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand what caching is.
-   Learn why caches dramatically improve performance.
-   Recognize cache hit and cache miss behavior.
-   Identify where caches exist in modern systems.
-   Explain caching confidently in interviews.

------------------------------------------------------------------------

# Story -- The Neighborhood Grocery Store

Imagine your house is next to a small grocery shop.

For daily essentials like milk and bread, you visit the nearby shop.

Only when you need something unusual do you travel to the large
wholesale market across town.

The nearby shop is your **cache**.

The wholesale market is your **database**.

The shop keeps only frequently used items because visiting the wholesale
market every time would waste time.

Software systems work exactly the same way.

------------------------------------------------------------------------

# Why Caching Exists

Databases are powerful but expensive compared to memory.

Every database request involves:

-   Network latency
-   Query execution
-   Disk or storage access
-   Serialization
-   Response transfer

If thousands of users repeatedly request the same data, the database
performs identical work again and again.

Caching stores frequently accessed data closer to the application so
repeated requests become much faster.

------------------------------------------------------------------------

# What is a Cache?

A cache is a temporary storage layer that keeps frequently accessed data
so future requests can be served faster.

Caches trade **memory** for **speed**.

------------------------------------------------------------------------

# Basic Architecture

``` text
          Client
             │
             ▼
      Application
             │
      ┌──────┴──────┐
      ▼             ▼
    Cache        Database
```

The application checks the cache first.

If the data exists, it returns immediately.

Otherwise it loads the data from the database and usually stores it in
the cache for future requests.

------------------------------------------------------------------------

# Cache Hit vs Cache Miss

## Cache Hit

``` text
Client
   │
   ▼
 Cache

✓ Data Found

↓

Return Immediately
```

Fast response.

No database access.

------------------------------------------------------------------------

## Cache Miss

``` text
Client
   │
   ▼
 Cache

✗ Data Missing

↓

Database

↓

Store in Cache

↓

Return Response
```

The first request is slower.

Future requests become faster.

------------------------------------------------------------------------

# Why Memory Is Faster Than Disk

Approximate access speeds:

  Storage           Relative Speed
  ----------------- ----------------------------
  CPU Cache         Fastest
  RAM               Very Fast
  SSD               Slower
  HDD               Much Slower
  Remote Database   Slowest (includes network)

Even modern SSDs are significantly slower than RAM.

This is why Redis and Memcached store data in memory.

------------------------------------------------------------------------

# Where Caches Exist

Caching happens at many layers.

``` text
Browser Cache
      │
CDN Cache
      │
Load Balancer
      │
Application Cache
      │
Redis / Memcached
      │
Database Buffer Cache
      │
Disk
```

Multiple cache layers reduce latency even further.

------------------------------------------------------------------------

# What Should Be Cached?

Good candidates:

-   Product details
-   User profiles
-   Configuration
-   Trending content
-   Search results
-   Homepage data

Poor candidates:

-   Frequently changing financial balances
-   One-time passwords
-   Highly sensitive short-lived information

We'll study cache invalidation later.

------------------------------------------------------------------------

# Benefits of Caching

-   Lower latency
-   Reduced database load
-   Higher throughput
-   Better user experience
-   Lower infrastructure costs

One Redis instance can often offload millions of database queries per
day.

------------------------------------------------------------------------

# Production Example

An online shopping platform receives 50,000 requests per second for a
popular product.

Without caching:

``` text
50,000

↓

Database
```

The database becomes overloaded.

With Redis:

``` text
50,000

↓

Redis

↓

Database (only on cache misses)
```

Database traffic drops dramatically.

------------------------------------------------------------------------

# Trade-offs

Caching is powerful, but introduces challenges:

-   Stale data
-   Cache invalidation
-   Extra infrastructure
-   Memory cost
-   Cache consistency

These trade-offs are why caching strategies matter.

------------------------------------------------------------------------

# Interview Callout

**Question**

"Why not cache everything?"

Good answer:

> "Caching consumes memory, introduces consistency challenges, and some
> data changes too frequently to benefit from caching."

------------------------------------------------------------------------

# Common Mistakes

-   Treating cache as the source of truth.
-   Forgetting cache expiration.
-   Caching highly volatile data.
-   Ignoring cache hit ratio.
-   Assuming caches never fail.

------------------------------------------------------------------------

# Memory Trick

Remember:

**Cache = Copy, Not Truth.**

The database remains the authoritative source.

------------------------------------------------------------------------

# Quick Summary

  Concept      Meaning
  ------------ ------------------------------------------
  Cache        Fast temporary storage
  Cache Hit    Data found in cache
  Cache Miss   Data fetched from database
  Hit Ratio    Percentage of requests served from cache

------------------------------------------------------------------------

# Dependency Map

``` text
Performance
     │
     ▼
Caching
     │
     ├── Redis
     ├── Memcached
     ├── CDN
     ├── Database
     └── Cache Invalidation
```

------------------------------------------------------------------------

# Coming Next

**Part 2 -- Cache-Aside, Read-Through, Write-Through & Write-Behind**

Topics:

-   Four major caching patterns
-   Read and write flows
-   Advantages and trade-offs
-   Production use cases
