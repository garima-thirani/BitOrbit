# The Ultimate System Design Handbook

# Chapter 4 -- Database Scaling

# Part 1 -- Database Sharding & Horizontal Partitioning

> **Theme:** Every database has a limit. Sharding is the technique that
> allows databases to continue growing after a single machine is no
> longer enough.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand why sharding exists.
-   Differentiate vertical scaling from horizontal database scaling.
-   Learn common sharding strategies.
-   Understand shard keys and hotspot problems.
-   Explain sharding trade-offs in interviews.

------------------------------------------------------------------------

# Story -- The Growing Library

Imagine a city library with one giant room containing every book.

At first, it works perfectly.

Years later, the library contains 100 million books.

People wait hours while librarians search shelves.

Buying bigger shelves helps only for a while.

Eventually the city builds **multiple library branches**, each storing a
subset of books.

Instead of one enormous library, the workload is divided.

Database sharding follows the same idea.

------------------------------------------------------------------------

# Why Sharding Exists

A single database eventually reaches limits:

-   CPU
-   Memory
-   Disk capacity
-   Disk I/O
-   Network bandwidth
-   Maximum concurrent connections

Even the largest server has physical limits.

At internet scale, we distribute data across many database servers.

------------------------------------------------------------------------

# What is Sharding?

## Intuition

Sharding is the process of splitting one logical database into multiple
smaller databases called **shards**.

Each shard stores only a portion of the total data.

Applications still see one logical database.

------------------------------------------------------------------------

# Formal Definition

> Database sharding is a horizontal partitioning technique in which rows
> are distributed across multiple independent database instances based
> on a sharding key.

Unlike replication, every shard owns **different** data.

------------------------------------------------------------------------

# Horizontal Partitioning vs Vertical Partitioning

## Horizontal Partitioning (Sharding)

Split rows.

``` text
Users

1-1,000,000  → Shard A

1,000,001-2,000,000 → Shard B
```

Each shard has the same schema.

------------------------------------------------------------------------

## Vertical Partitioning

Split columns or services.

``` text
User Service

id
name
email

Profile Service

avatar
bio
preferences
```

Useful when different parts of a record have different access patterns.

------------------------------------------------------------------------

# Basic Sharding Architecture

``` text
                Application
                     │
             Shard Router
          ┌──────┼──────┐
          ▼      ▼      ▼
      Shard A Shard B Shard C
```

The router decides which shard stores or retrieves a row.

------------------------------------------------------------------------

# Choosing a Shard Key

The shard key determines where data lives.

Good shard keys:

-   User ID
-   Customer ID
-   Tenant ID

Poor shard keys:

-   Country (uneven sizes)
-   Boolean values
-   Status fields

A bad shard key creates hotspots.

------------------------------------------------------------------------

# Common Sharding Strategies

## 1. Range-Based Sharding

``` text
1–1M   → Shard A

1M–2M  → Shard B
```

Advantages: - Simple - Efficient range queries

Disadvantages: - New data often accumulates in the last shard.

------------------------------------------------------------------------

## 2. Hash-Based Sharding

    hash(user_id) % N

Example:

    hash(42) % 4 = 2

Store on Shard 2.

Advantages: - Better distribution

Disadvantages: - Range queries become difficult.

------------------------------------------------------------------------

## 3. Geographic Sharding

``` text
Europe → EU Database

India → APAC Database

USA → US Database
```

Useful for: - Compliance - Latency - Data residency

------------------------------------------------------------------------

# Hotspots

Imagine every celebrity account is stored on one shard.

Millions of requests target that shard while others remain idle.

This is called a **hot shard**.

Solutions include:

-   Better shard keys
-   Consistent hashing (next chapter)
-   Caching
-   Replication

------------------------------------------------------------------------

# Cross-Shard Queries

Suppose you ask:

``` sql
SELECT COUNT(*)
FROM Users;
```

The answer exists across every shard.

The coordinator must:

1.  Query all shards.
2.  Aggregate results.
3.  Return one answer.

Cross-shard joins and transactions become expensive.

------------------------------------------------------------------------

# Re-Sharding

Eventually shards fill up.

You may need to:

``` text
Shard A

↓

Split

↓

Shard A1

Shard A2
```

Moving data between shards is operationally expensive and should be
planned carefully.

------------------------------------------------------------------------

# Production Example

A large e-commerce platform may shard customer data by customer ID.

Benefits:

-   Independent scaling
-   Smaller indexes
-   Lower lock contention

However, reporting queries spanning all customers become more complex.

------------------------------------------------------------------------

# Advantages

-   Near-unlimited horizontal growth
-   Smaller indexes
-   Better write throughput
-   Reduced contention
-   Independent scaling

------------------------------------------------------------------------

# Disadvantages

-   Operational complexity
-   Cross-shard transactions
-   Rebalancing
-   Harder backups
-   Harder analytics

------------------------------------------------------------------------

# Interview Callout

**Question**

"When would you shard a database?"

Good answer:

> "Only after optimizing queries, adding indexes, caching, and using
> read replicas. Sharding increases operational complexity and should be
> introduced when a single database can no longer meet scalability
> requirements."

------------------------------------------------------------------------

# Common Mistakes

-   Sharding too early.
-   Choosing a poor shard key.
-   Ignoring hotspot formation.
-   Assuming sharding improves every query.
-   Forgetting cross-shard operations.

------------------------------------------------------------------------

# Memory Trick

Remember:

**Replication copies data.**

**Sharding splits data.**

------------------------------------------------------------------------

# Quick Summary

  Concept                Meaning
  ---------------------- ---------------------------
  Shard                  One partition of data
  Shard Key              Determines data placement
  Horizontal Partition   Split rows
  Vertical Partition     Split columns/services
  Hot Shard              Uneven traffic
  Re-Sharding            Redistributing data

------------------------------------------------------------------------

# Dependency Map

``` text
Database Scaling
      │
      ▼
Sharding
      │
      ├── Consistent Hashing
      ├── Read Replicas
      ├── Replication
      ├── Connection Pooling
      └── Distributed Transactions
```

------------------------------------------------------------------------

# Coming Next

**Part 2 -- Consistent Hashing**

Topics:

-   Why modulo hashing fails
-   Hash rings
-   Virtual nodes
-   Rebalancing
-   CDN and cache cluster applications
