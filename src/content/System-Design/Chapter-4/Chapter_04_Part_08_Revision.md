# The Ultimate System Design Handbook

# Chapter 4 -- Database Scaling

# Part 8 -- Revision Chapter

> **Purpose:** Consolidate all major database scaling concepts into a
> single interview-ready revision guide.

------------------------------------------------------------------------

# Quick Revision Notes

## Database Sharding

-   Splits rows across multiple databases.
-   Improves write scalability.
-   Requires a good shard key.
-   Introduces cross-shard complexity.

Remember:

**Replication copies data.**

**Sharding splits data.**

------------------------------------------------------------------------

## Consistent Hashing

Used when servers are added or removed frequently.

Benefits:

-   Minimal data movement
-   Better cluster balancing
-   Used by caches and distributed databases

Virtual Nodes improve distribution.

------------------------------------------------------------------------

## Primary--Replica Pattern

-   Primary accepts writes.
-   Replicas serve reads.
-   Replication copies changes.

Benefits:

-   Read scalability
-   High availability

Challenge:

-   Replication lag.

------------------------------------------------------------------------

## Read Replicas

Ideal for:

-   Product catalogs
-   Dashboards
-   News sites
-   Social media feeds

Avoid replicas for critical read-after-write operations.

------------------------------------------------------------------------

## Multi-Leader Replication

Multiple databases accept writes.

Advantages:

-   Lower global write latency
-   Regional independence

Challenges:

-   Conflict detection
-   Conflict resolution
-   Eventual consistency

------------------------------------------------------------------------

## Connection Pooling

Reuse connections instead of creating one per request.

Benefits:

-   Lower latency
-   Better throughput
-   Reduced database load

Monitor:

-   Pool size
-   Active connections
-   Timeouts

------------------------------------------------------------------------

## News Aggregator

Architecture includes:

-   Primary DB
-   Read Replicas
-   Redis Cache
-   Search Engine
-   Message Queue
-   Sharding
-   Feed Workers

------------------------------------------------------------------------

# Chapter Cheat Sheet

  Topic                Key Idea
  -------------------- -----------------------
  Sharding             Split data
  Consistent Hashing   Minimize key movement
  Primary              Writes
  Replica              Reads
  Read Replicas        Scale reads
  Multi-Leader         Multiple writers
  Connection Pool      Reuse DB connections
  Queue                Async processing
  Redis                Fast cache

------------------------------------------------------------------------

# Flashcards

### Q

Difference between sharding and replication?

**A** Sharding distributes data. Replication copies data.

------------------------------------------------------------------------

### Q

Why is consistent hashing better than modulo hashing?

**A** Only a small subset of keys move when nodes change.

------------------------------------------------------------------------

### Q

Who accepts writes in a primary--replica setup?

**A** The primary database.

------------------------------------------------------------------------

### Q

Main problem with read replicas?

**A** Replication lag.

------------------------------------------------------------------------

### Q

When should multi-leader replication be avoided?

**A** Financial systems requiring strict consistency.

------------------------------------------------------------------------

### Q

Why use a connection pool?

**A** Creating database connections is expensive.

------------------------------------------------------------------------

# Mind Map

``` text
Database Scaling
│
├── Sharding
│     └── Consistent Hashing
│
├── Primary–Replica
│     ├── Read Replicas
│     └── Replication Lag
│
├── Multi-Leader
│     └── Conflict Resolution
│
├── Connection Pooling
│
└── News Aggregator
```

------------------------------------------------------------------------

# Common Mistakes

-   Sharding too early.
-   Poor shard keys.
-   Ignoring replication lag.
-   Reading critical data from replicas.
-   Using multi-leader without conflict handling.
-   Oversized connection pools.
-   Forgetting monitoring.

------------------------------------------------------------------------

# Interview Questions (No Answers)

## Level 1

1.  Explain database sharding and when it is required.

## Level 2

2.  Compare modulo hashing with consistent hashing.

## Level 3

3.  Design a read-heavy architecture using primary-replica databases and
    explain how you handle stale reads.

## Level 4

4.  Design a globally distributed database for millions of users.
    Explain sharding, replication, failover, and conflict resolution.

## Level 5

5.  Your primary database has become a bottleneck at 100,000 QPS. Walk
    through your scaling strategy before introducing a new database
    technology.

------------------------------------------------------------------------

# Design Exercises

1.  Design the database for a video streaming platform.
2.  Scale an e-commerce order database beyond one machine.
3.  Design a multi-region messaging database.
4.  Improve the database architecture for a social media feed.
5.  Design a globally distributed product catalog.

------------------------------------------------------------------------

# Cross-Topic Dependency Map

``` text
Database Fundamentals
        │
        ▼
Database Scaling
        │
        ├── Sharding
        ├── Consistent Hashing
        ├── Replication
        ├── Read Scaling
        ├── Connection Pooling
        └── High Availability
                │
                ▼
Caching (Chapter 5)
```

------------------------------------------------------------------------

# Next Chapter Preview

**Chapter 5 -- Caching Fundamentals**

Topics:

-   Cache-Aside
-   Read-Through
-   Write-Through
-   Write-Behind
-   Cache Eviction (LRU, LFU, FIFO)
-   Cache Stampede
-   Cache Invalidation
-   When NOT to Cache
-   Ticketmaster Case Study
