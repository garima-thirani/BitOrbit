# The Ultimate System Design Handbook

# Chapter 6 -- Distributed Caching & CDN Deep Dive

# Part 8 -- Revision Chapter

> **Purpose:** Consolidate the major concepts from Chapter 6 into one
> interview-focused revision guide.

------------------------------------------------------------------------

# Quick Revision Notes

## Redis Cluster

-   In-memory datastore
-   16,384 hash slots
-   Horizontal scaling
-   Primary/Replica architecture
-   Rich data structures

Remember:

**Redis = Memory + Data Structures + Distribution**

------------------------------------------------------------------------

## Redis Data Structures

  Structure    Best Use
  ------------ -----------------
  String       Cache, sessions
  Hash         Objects
  List         Queues
  Set          Unique values
  Sorted Set   Leaderboards
  Stream       Event logs

------------------------------------------------------------------------

## Memcached vs Redis

**Memcached**

-   Simple cache
-   No persistence
-   Lightweight

**Redis**

-   Cache + platform
-   Persistence
-   Replication
-   Pub/Sub
-   Streams

------------------------------------------------------------------------

## CDN

Purpose:

-   Reduce latency
-   Protect origin
-   Lower bandwidth
-   Improve availability

Key concepts:

-   Edge servers
-   PoPs
-   Browser cache
-   Origin cache

------------------------------------------------------------------------

## HTTP Caching Headers

  Header          Purpose
  --------------- -------------------------
  Cache-Control   Cache policy
  ETag            Version validation
  Last-Modified   Timestamp validation
  Vary            Multiple cache variants

------------------------------------------------------------------------

## Edge Optimization

-   Anycast routing
-   Origin Shield
-   HTTP/2
-   HTTP/3
-   Compression
-   Persistent connections

------------------------------------------------------------------------

## Multi-Tier Caching

L1 → Application Memory

↓

L2 → Redis

↓

L3 → CDN

↓

Origin Database

Each layer reduces work for the next.

------------------------------------------------------------------------

## Geo Replication

Strategies:

-   Active-Passive
-   Active-Active

Trade-off:

Latency vs Consistency.

------------------------------------------------------------------------

## Cache Warming

Methods:

-   Startup
-   Scheduled
-   Predictive
-   Event-driven
-   Rolling deployments

Goal:

Prevent cold-cache latency.

------------------------------------------------------------------------

## Facebook News Feed

Architecture:

-   Redis timelines
-   CDN media
-   Kafka feed workers
-   Hybrid fan-out
-   Ranking service

------------------------------------------------------------------------

# Chapter Cheat Sheet

  Topic           Key Idea
  --------------- --------------------------
  Redis Cluster   Horizontal cache scaling
  Hash Slots      16,384 partitions
  Memcached       Lightweight cache
  CDN             Global edge cache
  Cache-Control   Browser/CDN policy
  ETag            Cache validation
  Origin Shield   Protect origin
  L1/L2/L3        Cache hierarchy
  Cache Warming   Prevent cold starts
  Fan-Out         Feed generation strategy

------------------------------------------------------------------------

# Flashcards

### Q

Why does Redis Cluster use hash slots?

**A** To simplify distribution and rebalancing.

------------------------------------------------------------------------

### Q

When should Memcached be preferred?

**A** For simple object caching without advanced features.

------------------------------------------------------------------------

### Q

What is an ETag?

**A** A version identifier used to validate cached resources.

------------------------------------------------------------------------

### Q

Difference between browser cache and CDN?

**A** Browser cache serves one user; CDN serves many users globally.

------------------------------------------------------------------------

### Q

What is origin shielding?

**A** An intermediate cache that reduces duplicate requests to the
origin.

------------------------------------------------------------------------

### Q

Why warm caches?

**A** To avoid cold-start latency and database spikes.

------------------------------------------------------------------------

# Mind Map

``` text
Distributed Caching
│
├── Redis Cluster
│   ├── Hash Slots
│   ├── Replication
│   └── Data Structures
│
├── Memcached
│
├── CDN
│   ├── Edge
│   ├── Cache-Control
│   ├── ETag
│   └── Origin Shield
│
├── Multi-Tier Cache
│
├── Cache Warming
│
└── Facebook Feed
```

------------------------------------------------------------------------

# Common Mistakes

-   Using Redis as the source of truth.
-   Ignoring cache hit ratio.
-   Caching dynamic authenticated responses.
-   Forgetting regional latency.
-   Not planning cache invalidation.
-   Overloading origin after deployments.
-   Using only one feed generation strategy.

------------------------------------------------------------------------

# Interview Questions (No Answers)

## Level 1

1.  Explain Redis Cluster and hash slots.

## Level 2

2.  Compare Redis and Memcached. When would you choose each?

## Level 3

3.  Design a CDN strategy for a global video streaming platform.

## Level 4

4.  Design a multi-tier caching architecture for an e-commerce
    application serving 100 million users.

## Level 5

5.  Design Facebook's News Feed focusing on Redis, CDN, fan-out
    strategies, hot keys, and cache warming.

------------------------------------------------------------------------

# Design Exercises

1.  Design Redis caching for an online gaming platform.
2.  Build a global CDN strategy for image delivery.
3.  Design a cache hierarchy for a banking dashboard.
4.  Optimize cache warming for Black Friday traffic.
5.  Design a globally distributed feed system.

------------------------------------------------------------------------

# Cross-Topic Dependency Map

``` text
Caching
    │
    ▼
Distributed Caching
    │
    ├── Redis Cluster
    ├── CDN
    ├── Multi-Tier Cache
    ├── Geo Replication
    ├── Cache Warming
    └── Feed Systems
           │
           ▼
Messaging Systems (Chapter 7)
```

------------------------------------------------------------------------

# Next Chapter Preview

**Chapter 7 -- Messaging Systems**

Topics:

-   Synchronous vs Asynchronous Communication
-   RabbitMQ & AMQP
-   Apache Kafka
-   Delivery Guarantees
-   Dead Letter Queues
-   Kafka vs RabbitMQ
-   Idempotency
-   Tinder Case Study
