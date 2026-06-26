# The Ultimate System Design Handbook

# Chapter 5 -- Caching Fundamentals

# Part 8 -- Revision Chapter

> **Purpose:** Consolidate every important caching concept into a single
> interview-ready revision guide.

------------------------------------------------------------------------

# Quick Revision Notes

## Why Caching?

-   Reduce latency
-   Reduce database load
-   Improve throughput
-   Lower infrastructure cost

Remember:

**Cache = Copy, Database = Source of Truth**

------------------------------------------------------------------------

## Cache Patterns

### Cache-Aside

-   Application manages cache.
-   Most common.
-   Lazy loading.

### Read-Through

-   Cache loads data automatically.

### Write-Through

-   Write cache and database together.

### Write-Behind

-   Write cache first.
-   Persist asynchronously.

------------------------------------------------------------------------

## Eviction Policies

### LRU

Least Recently Used.

Best for changing workloads.

### LFU

Least Frequently Used.

Best for long-term hot data.

### FIFO

First In First Out.

Simple but rarely optimal.

------------------------------------------------------------------------

## Cache Stampede

Occurs when many requests rebuild the same expired key.

Solutions:

-   Mutex locking
-   Request coalescing
-   TTL jitter
-   Stale-While-Revalidate
-   Early refresh

------------------------------------------------------------------------

## Cache Invalidation

Strategies:

-   TTL
-   Event-based invalidation
-   Tag-based invalidation
-   Versioned keys
-   Refresh-ahead

------------------------------------------------------------------------

## When NOT to Cache

Avoid caching:

-   Financial balances
-   OTPs
-   Highly volatile data
-   Sensitive personal data
-   One-off queries

------------------------------------------------------------------------

## Ticketmaster Case Study

Architecture highlights:

-   Redis for event metadata
-   Database locks for inventory
-   Queue for flash sales
-   Read replicas
-   CDN for static assets

------------------------------------------------------------------------

# Chapter Cheat Sheet

  Topic                Key Idea
  -------------------- ------------------------
  Cache                Fast temporary storage
  Cache Hit            Served from cache
  Cache Miss           Load from DB
  Cache-Aside          App manages cache
  Read-Through         Cache manages reads
  Write-Through        Sync writes
  Write-Behind         Async writes
  LRU                  Recent
  LFU                  Popular
  FIFO                 Oldest
  Stampede             Many misses together
  TTL                  Time expiry
  Event Invalidation   Refresh on update

------------------------------------------------------------------------

# Flashcards

### Q

What is a cache hit?

**A** The requested data is already available in cache.

------------------------------------------------------------------------

### Q

Most common caching strategy?

**A** Cache-Aside.

------------------------------------------------------------------------

### Q

Best eviction policy for general workloads?

**A** LRU.

------------------------------------------------------------------------

### Q

Main cause of cache stampede?

**A** Many requests rebuilding the same expired key.

------------------------------------------------------------------------

### Q

Why use TTL jitter?

**A** Prevent synchronized expirations.

------------------------------------------------------------------------

### Q

Should account balances be cached aggressively?

**A** No.

------------------------------------------------------------------------

# Mind Map

``` text
Caching
│
├── Fundamentals
│
├── Patterns
│   ├── Cache-Aside
│   ├── Read-Through
│   ├── Write-Through
│   └── Write-Behind
│
├── Eviction
│   ├── LRU
│   ├── LFU
│   └── FIFO
│
├── Stampede
│   ├── Mutex
│   ├── SWR
│   └── TTL Jitter
│
├── Invalidation
│
├── Anti-Patterns
│
└── Ticketmaster
```

------------------------------------------------------------------------

# Common Mistakes

-   Caching everything.
-   Using long TTLs for dynamic data.
-   Ignoring cache hit ratio.
-   Forgetting invalidation.
-   Treating cache as the source of truth.
-   No protection against stampedes.
-   Caching sensitive information.

------------------------------------------------------------------------

# Interview Questions (No Answers)

## Level 1

1.  What is a cache and why is it useful?

## Level 2

2.  Compare Cache-Aside, Read-Through, Write-Through, and Write-Behind.

## Level 3

3.  Design a caching layer for an e-commerce website. Explain
    invalidation and eviction.

## Level 4

4.  How would you prevent a cache stampede during a flash sale with
    millions of users?

## Level 5

5.  Design the complete caching strategy for Ticketmaster, including
    Redis, CDN, database consistency, and failure handling.

------------------------------------------------------------------------

# Design Exercises

1.  Design Redis caching for an online bookstore.
2.  Improve cache hit ratio for a social media feed.
3.  Design cache invalidation for product prices.
4.  Prevent cache stampedes in a stock market application.
5.  Design a multi-layer cache for a streaming platform.

------------------------------------------------------------------------

# Cross-Topic Dependency Map

``` text
Database
   │
   ▼
Caching
   │
   ├── Redis
   ├── CDN
   ├── Replication
   ├── Load Balancing
   └── Messaging
          │
          ▼
Distributed Caching (Chapter 6)
```

------------------------------------------------------------------------

# Next Chapter Preview

**Chapter 6 -- Distributed Caching & CDN Deep Dive**

Topics:

-   Redis Cluster
-   Redis Data Structures
-   Memcached vs Redis
-   CDN Architecture
-   Cache-Control Headers
-   ETag & Vary
-   Edge Caching
-   Multi-tier Caching
-   Cache Warming
-   Facebook News Feed Case Study
