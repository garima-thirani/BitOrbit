# The Ultimate System Design Handbook

# Chapter 3 -- Database Fundamentals

# Part 10 -- Revision Chapter

> **Purpose:** Consolidate every important concept from Chapter 3 into
> one interview-focused revision guide.

------------------------------------------------------------------------

# Quick Revision Notes

## RDBMS vs NoSQL

**RDBMS** - Structured schema - SQL - ACID transactions - Strong
consistency - Best for financial and transactional systems

**NoSQL** - Flexible schema - Horizontal scalability - High write
throughput - Often follows BASE principles - Best for large-scale
distributed workloads

------------------------------------------------------------------------

## ACID

-   **Atomicity** -- All or nothing.
-   **Consistency** -- Valid state before and after every transaction.
-   **Isolation** -- Concurrent transactions do not interfere.
-   **Durability** -- Committed data survives crashes.

Memory:

``` text
A → All or Nothing
C → Correct Rules
I → Independent Transactions
D → Don't Lose Data
```

------------------------------------------------------------------------

## BASE

-   Basically Available
-   Soft State
-   Eventually Consistent

Used when availability and scalability are more important than immediate
consistency.

------------------------------------------------------------------------

## CAP Theorem

During a network partition:

Choose between:

-   Consistency
-   Availability

Partition tolerance is assumed in distributed systems.

------------------------------------------------------------------------

## PACELC

If Partition:

Choose Availability or Consistency.

Else:

Choose Latency or Consistency.

PACELC extends CAP by explaining trade-offs during normal operation.

------------------------------------------------------------------------

## Database Indexing

Important index types:

-   B-Tree
-   Hash
-   Composite
-   Clustered
-   Non-Clustered

Remember:

Indexes improve reads.

Indexes slow writes.

------------------------------------------------------------------------

## Schema Design

Normalize for:

-   Data integrity
-   Reduced duplication

Denormalize for:

-   Faster reads
-   Analytics
-   Reduced joins

Design around access patterns.

------------------------------------------------------------------------

## Query Optimization

Best practices:

-   Avoid `SELECT *`
-   Filter early
-   Use indexes
-   Review execution plans
-   Fix N+1 queries
-   Benchmark changes

------------------------------------------------------------------------

## Database Bottlenecks

Common bottlenecks:

-   Slow queries
-   Missing indexes
-   Lock contention
-   CPU saturation
-   Memory pressure
-   Disk I/O
-   Connection exhaustion
-   Network latency

Always measure before optimizing.

------------------------------------------------------------------------

## Local Delivery Service

Key architectural decisions:

-   PostgreSQL for transactions
-   Redis for caching
-   Search engine for search
-   NoSQL/In-memory store for live driver locations
-   Read replicas for scaling reads

------------------------------------------------------------------------

# Chapter Cheat Sheet

  Topic                Key Takeaway
  -------------------- -------------------------------------
  RDBMS                Structured, ACID, relationships
  NoSQL                Flexible, scalable, distributed
  ACID                 Correctness
  BASE                 Availability & eventual consistency
  CAP                  Partition-time trade-offs
  PACELC               Everyday latency vs consistency
  Indexes              Faster reads
  Schema               Model business correctly
  Query Optimization   Reduce unnecessary work
  Bottlenecks          Measure first
  Case Study           Match database to workload

------------------------------------------------------------------------

# Flashcards

### Q

When should you choose an RDBMS?

**A** When strong consistency, transactions, and relationships are
important.

------------------------------------------------------------------------

### Q

When is NoSQL a better fit?

**A** When flexibility, scalability, and high write throughput are
priorities.

------------------------------------------------------------------------

### Q

What does ACID protect?

**A** Transaction correctness.

------------------------------------------------------------------------

### Q

What does BASE optimize for?

**A** Availability and scalability.

------------------------------------------------------------------------

### Q

Difference between CAP and PACELC?

**A** CAP discusses partitions. PACELC also explains latency vs
consistency during normal operation.

------------------------------------------------------------------------

### Q

Most common index?

**A** B-Tree.

------------------------------------------------------------------------

### Q

What causes the N+1 query problem?

**A** One parent query followed by one query for every child record.

------------------------------------------------------------------------

### Q

Why are indexes not free?

**A** They consume storage and slow inserts, updates, and deletes.

------------------------------------------------------------------------

# Mind Map

``` text
Database Fundamentals
│
├── RDBMS
├── NoSQL
│
├── ACID
├── BASE
│
├── CAP
│
├── PACELC
│
├── Indexes
│     ├── B-Tree
│     ├── Hash
│     └── Composite
│
├── Schema Design
│
├── Query Optimization
│
├── Bottlenecks
│
└── Delivery Service
```

------------------------------------------------------------------------

# Common Mistakes

-   Choosing databases based on popularity.
-   Ignoring access patterns.
-   Indexing every column.
-   Forgetting write costs of indexes.
-   Confusing ACID consistency with CAP consistency.
-   Overusing NoSQL.
-   Ignoring execution plans.
-   Optimizing before measuring.

------------------------------------------------------------------------

# Interview Questions (No Answers)

## Level 1

1.  Explain the differences between SQL and NoSQL databases.

## Level 2

2.  Explain each ACID property using a banking example.

## Level 3

3.  Compare ACID, BASE, CAP, and PACELC. When would you use each
    concept?

## Level 4

4.  Design the database layer for a global food delivery application.
    Explain indexing, schema, replication, and bottlenecks.

## Level 5

5.  Your PostgreSQL database is experiencing 10× traffic growth. Walk
    through your optimization strategy before introducing sharding.

------------------------------------------------------------------------

# Design Exercises

1.  Design the schema for an online bookstore.
2.  Optimize a social media feed query.
3.  Design a banking database emphasizing ACID.
4.  Model an IoT platform using SQL and NoSQL together.
5.  Improve a slow order-history query for an e-commerce platform.

------------------------------------------------------------------------

# Cross-Topic Dependency Map

``` text
Requirements
      │
      ▼
Database Choice
      │
      ├── ACID / BASE
      ├── CAP / PACELC
      ├── Schema Design
      ├── Indexes
      ├── Query Optimization
      └── Performance
              │
              ▼
Database Scaling (Chapter 4)
```

------------------------------------------------------------------------

# Next Chapter Preview

**Chapter 4 -- Database Scaling**

Topics:

-   Database Sharding
-   Horizontal Partitioning
-   Consistent Hashing
-   Read/Write Separation
-   Primary-Replica Architecture
-   Read Replicas
-   Multi-Leader Replication
-   Connection Pooling
-   News Aggregator Case Study
