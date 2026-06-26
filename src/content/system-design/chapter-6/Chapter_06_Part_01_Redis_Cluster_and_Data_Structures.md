# The Ultimate System Design Handbook

# Chapter 6 -- Distributed Caching & CDN Deep Dive

# Part 1 -- Redis Cluster & Redis Data Structures

> **Theme:** A single Redis server is incredibly fast---but eventually
> one machine becomes the bottleneck. Redis Cluster enables horizontal
> scaling while preserving Redis's low-latency performance.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand why Redis is widely used.
-   Learn Redis Cluster architecture.
-   Understand hash slots and request routing.
-   Explore Redis data structures and their use cases.
-   Answer Redis interview questions confidently.

------------------------------------------------------------------------

# Story -- One Warehouse vs Many Warehouses

A warehouse serves an entire country.

Initially, one warehouse is enough.

As demand grows, trucks wait in long queues.

The company opens multiple warehouses and distributes inventory.

Customers are routed to the warehouse holding their products.

Redis Cluster follows the same idea.

------------------------------------------------------------------------

# Why Redis?

Redis is an **in-memory data store**.

Instead of reading from disk:

``` text
Application
    │
    ▼
 RAM
```

It keeps data in memory, enabling sub-millisecond latency.

Common uses:

-   Cache
-   Session store
-   Leaderboards
-   Rate limiting
-   Pub/Sub
-   Distributed locks

------------------------------------------------------------------------

# Why Redis Cluster?

One Redis instance is limited by:

-   CPU
-   RAM
-   Network bandwidth

Redis Cluster distributes data across multiple nodes.

``` text
        Clients
           │
     Cluster Router
    ┌────┬────┬────┐
    ▼    ▼    ▼    ▼
 Node1 Node2 Node3 Node4
```

------------------------------------------------------------------------

# Hash Slots

Redis Cluster uses **16,384 hash slots**.

Each key is hashed:

``` text
hash(key) % 16384
```

Each node owns a subset of slots.

Example:

  Node   Slots
  ------ --------------
  A      0--4095
  B      4096--8191
  C      8192--12287
  D      12288--16383

Adding nodes moves slots---not the whole database.

------------------------------------------------------------------------

# Request Flow

``` text
Client
  │
Hash Key
  │
Hash Slot
  │
Correct Node
  │
Return Value
```

------------------------------------------------------------------------

# High Availability

Each primary node has one or more replicas.

``` text
Primary A
    │
 Replica A

Primary B
    │
 Replica B
```

If a primary fails, a replica can be promoted.

------------------------------------------------------------------------

# Redis Data Structures

## Strings

Most common type.

Examples:

-   User session
-   Cache entry
-   Token

Commands:

``` text
SET
GET
INCR
```

------------------------------------------------------------------------

## Lists

Ordered collections.

Use cases:

-   Task queues
-   Activity feeds
-   Recent history

------------------------------------------------------------------------

## Sets

Unique unordered values.

Use cases:

-   Tags
-   Unique visitors
-   Mutual friends

------------------------------------------------------------------------

## Sorted Sets (ZSET)

Each member has a score.

Perfect for:

-   Leaderboards
-   Rankings
-   Trending content

------------------------------------------------------------------------

## Hashes

Store multiple fields for one object.

``` text
User
 ├── Name
 ├── Email
 └── Age
```

Efficient for user profiles.

------------------------------------------------------------------------

## Streams

Append-only event log.

Useful for:

-   Event processing
-   Notifications
-   Messaging

------------------------------------------------------------------------

# Choosing the Right Structure

  Structure    Best For
  ------------ --------------------
  String       Cache, sessions
  Hash         Objects
  List         Queues
  Set          Unique collections
  Sorted Set   Rankings
  Stream       Event logs

------------------------------------------------------------------------

# Production Example

A gaming platform:

-   Sessions → Strings
-   Profiles → Hashes
-   Global leaderboard → Sorted Sets
-   Notifications → Streams

One technology serves multiple workloads.

------------------------------------------------------------------------

# Advantages

-   Extremely low latency
-   Rich data structures
-   Horizontal scaling
-   Replication
-   High throughput

------------------------------------------------------------------------

# Limitations

-   Memory is expensive
-   Complex queries are limited
-   Cross-slot operations require care
-   Persistence trades performance for durability

------------------------------------------------------------------------

# Interview Callout

**Question**

"Why doesn't Redis Cluster shard by modulo?"

Good answer:

> "Redis Cluster uses 16,384 hash slots, making rebalancing simpler and
> reducing data movement when nodes are added or removed."

------------------------------------------------------------------------

# Common Mistakes

-   Treating Redis as the source of truth.
-   Storing unlimited data.
-   Choosing the wrong data structure.
-   Ignoring memory usage.

------------------------------------------------------------------------

# Memory Trick

**String → Value**

**Hash → Object**

**List → Queue**

**Set → Unique**

**ZSET → Ranking**

**Stream → Events**

------------------------------------------------------------------------

# Quick Summary

  Topic        Key Idea
  ------------ ---------------------
  Redis        In-memory datastore
  Cluster      Horizontal scaling
  Hash Slots   16,384 partitions
  Replica      High availability
  ZSET         Leaderboards

------------------------------------------------------------------------

# Dependency Map

``` text
Distributed Caching
      │
      ▼
Redis Cluster
      │
      ├── Hash Slots
      ├── Replication
      ├── Consistent Hashing
      ├── Data Structures
      └── High Availability
```

------------------------------------------------------------------------

# Coming Next

**Part 2 -- Memcached vs Redis**

Topics:

-   Architecture
-   Feature comparison
-   Performance
-   Persistence
-   Production use cases
