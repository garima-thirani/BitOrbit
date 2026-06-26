# The Ultimate System Design Handbook

# Chapter 6 -- Distributed Caching & CDN Deep Dive

# Part 2 -- Memcached vs Redis

> **Theme:** Both Redis and Memcached are in-memory data stores designed
> to reduce latency and offload databases. At first glance they seem
> similar, but their capabilities, architecture, and production use
> cases differ significantly. Choosing the wrong one can unnecessarily
> complicate or limit your system.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand what Memcached is.
-   Compare Redis and Memcached architecture.
-   Learn when each technology is the better choice.
-   Understand performance, persistence, scalability, and operational
    trade-offs.
-   Answer Redis vs Memcached interview questions confidently.

------------------------------------------------------------------------

# Story -- Two Warehouses

Imagine two warehouses.

**Warehouse A** stores only boxes.

It is extremely fast because every box looks the same.

**Warehouse B** stores boxes, shelves, filing cabinets, lockers, and
conveyor belts.

It is slightly more complex but can solve many more business problems.

Memcached is Warehouse A.

Redis is Warehouse B.

------------------------------------------------------------------------

# Why Compare Them?

Both systems:

-   Store data in RAM
-   Reduce database load
-   Improve latency
-   Scale horizontally

However, they were designed with different philosophies.

------------------------------------------------------------------------

# What is Memcached?

Memcached is a distributed in-memory **key-value cache**.

It focuses on one goal:

> **Serve cached values as fast as possible.**

It intentionally keeps its feature set small.

------------------------------------------------------------------------

# What is Redis?

Redis is an **in-memory data platform**.

Besides caching, it supports:

-   Persistence
-   Replication
-   Pub/Sub
-   Streams
-   Transactions
-   Lua scripting
-   Distributed locks
-   Rich data structures

Redis is often used as much more than a cache.

------------------------------------------------------------------------

# Architecture Comparison

## Memcached

``` text
Application
      │
      ▼
 Memcached
      │
      ▼
 Database
```

Simple and lightweight.

------------------------------------------------------------------------

## Redis

``` text
Application
      │
      ▼
 Redis
 ├── Cache
 ├── Pub/Sub
 ├── Streams
 ├── Leaderboards
 ├── Sessions
 └── Locks
```

Acts as a multi-purpose infrastructure component.

------------------------------------------------------------------------

# Data Model Comparison

  Feature       Memcached   Redis
  ------------- ----------- -------
  Strings       ✅          ✅
  Hashes        ❌          ✅
  Lists         ❌          ✅
  Sets          ❌          ✅
  Sorted Sets   ❌          ✅
  Streams       ❌          ✅

Redis provides much richer modeling capabilities.

------------------------------------------------------------------------

# Persistence

## Memcached

-   Pure cache
-   Data disappears after restart

Perfect when cached data can always be rebuilt.

------------------------------------------------------------------------

## Redis

Supports persistence:

-   RDB snapshots
-   AOF (Append Only File)

Useful when data should survive restarts.

------------------------------------------------------------------------

# Replication & High Availability

## Memcached

-   Client-side sharding
-   No built-in replication
-   Simpler deployment

## Redis

-   Primary-replica replication
-   Redis Sentinel
-   Redis Cluster
-   Automatic failover

Better suited for mission-critical infrastructure.

------------------------------------------------------------------------

# Memory Management

Both systems store data in RAM.

However:

**Memcached**

-   Very memory efficient
-   Simpler allocation model

**Redis**

-   Slightly higher memory overhead
-   Richer functionality

------------------------------------------------------------------------

# Performance

For simple key-value lookups:

-   Both are extremely fast.
-   Differences are often negligible compared to network latency.

The decision is usually based on features rather than raw speed.

------------------------------------------------------------------------

# Production Use Cases

## Use Memcached When

-   Simple object caching
-   Stateless web applications
-   Easy horizontal scaling
-   No persistence required

Examples:

-   HTML fragments
-   API responses
-   Product pages

------------------------------------------------------------------------

## Use Redis When

-   Sessions
-   Rate limiting
-   Leaderboards
-   Messaging
-   Distributed locks
-   Pub/Sub
-   Streams
-   Real-time analytics

Redis often replaces multiple specialized systems.

------------------------------------------------------------------------

# Feature Comparison

  Capability             Memcached   Redis
  ---------------------- ----------- --------
  Key-Value Cache        ✅          ✅
  Persistence            ❌          ✅
  Replication            ❌          ✅
  Pub/Sub                ❌          ✅
  Transactions           ❌          ✅
  Lua Scripting          ❌          ✅
  Cluster                Limited     Native
  Rich Data Structures   ❌          ✅

------------------------------------------------------------------------

# Production Example

A large social media platform uses:

-   Redis for sessions, feeds, notifications, leaderboards, and rate
    limiting.
-   Memcached (historically) for simple page and object caching.

Modern architectures increasingly consolidate around Redis because of
its versatility.

------------------------------------------------------------------------

# Advantages & Disadvantages

## Memcached

### Advantages

-   Very simple
-   Lightweight
-   Excellent object cache
-   Low memory overhead

### Disadvantages

-   Limited feature set
-   No persistence
-   No native replication
-   No advanced data structures

------------------------------------------------------------------------

## Redis

### Advantages

-   Rich ecosystem
-   Multiple data structures
-   Persistence
-   Replication
-   Streams
-   Pub/Sub
-   High availability

### Disadvantages

-   More operational complexity
-   Higher memory usage
-   More configuration options to manage

------------------------------------------------------------------------

# Interview Callout

**Question**

"If both Redis and Memcached are available, which would you choose for a
modern backend?"

Good answer:

> "For most modern distributed systems, I would choose Redis because it
> supports caching, persistence, replication, rich data structures,
> Pub/Sub, and distributed primitives. Memcached remains a strong choice
> for simple, high-performance object caching when those additional
> capabilities are unnecessary."

------------------------------------------------------------------------

# Common Mistakes

-   Assuming Redis is only a cache.
-   Choosing Redis solely because it has more features.
-   Using persistence when it isn't required.
-   Ignoring memory overhead.
-   Treating Memcached as highly available without additional
    infrastructure.

------------------------------------------------------------------------

# Memory Trick

**Memcached = Memory Cache**

**Redis = Data Platform**

------------------------------------------------------------------------

# Quick Summary

  Requirement         Recommended
  ------------------- -------------
  Simple cache        Memcached
  Sessions            Redis
  Leaderboards        Redis
  Pub/Sub             Redis
  Distributed locks   Redis
  Persistence         Redis

------------------------------------------------------------------------

# Dependency Map

``` text
Distributed Caching
        │
        ├── Redis
        │     ├── Cluster
        │     ├── Replication
        │     ├── Persistence
        │     └── Data Structures
        │
        └── Memcached
              ├── Simple Cache
              └── Lightweight
```

------------------------------------------------------------------------

# Coming Next

**Part 3 -- CDN Fundamentals & Cache-Control Headers**

Topics:

-   What is a CDN?
-   Global edge networks
-   Cache-Control
-   ETag
-   Vary
-   Browser caching
-   Origin servers
