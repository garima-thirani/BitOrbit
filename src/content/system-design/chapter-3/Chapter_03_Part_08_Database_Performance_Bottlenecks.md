# The Ultimate System Design Handbook

# Chapter 3 -- Database Fundamentals

# Part 8 -- Database Performance Bottlenecks

> **Theme:** A database rarely becomes slow overnight. Performance
> issues usually grow gradually as traffic, data volume, and inefficient
> queries increase. Great engineers know how to identify the real
> bottleneck before trying to optimize it.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Identify common database bottlenecks.
-   Understand CPU, memory, disk, network, and locking issues.
-   Learn how connection pools affect performance.
-   Understand monitoring metrics.
-   Build a structured troubleshooting approach.

------------------------------------------------------------------------

# Story -- A Busy Restaurant Kitchen

A restaurant starts serving 20 customers a day. One chef is enough.

Months later, 2,000 customers arrive.

Food is delayed.

Customers blame the chef.

The owner buys a bigger oven.

Nothing changes.

Why?

The real bottleneck was that **only one cashier was taking orders**.

Databases are similar.

The slow query you see may only be the symptom.

The real bottleneck may be locks, missing indexes, disk I/O, or
exhausted connections.

------------------------------------------------------------------------

# What is a Database Bottleneck?

A bottleneck is the resource or operation that limits the maximum
throughput of the database.

Typical symptoms:

-   Slow queries
-   High latency
-   Timeouts
-   Deadlocks
-   CPU spikes
-   Connection exhaustion

Never optimize blindly.

Measure first.

------------------------------------------------------------------------

# Common Bottlenecks

## 1. Slow Queries

Most database issues originate from inefficient SQL.

Example:

``` sql
SELECT *
FROM Orders;
```

On a table with 500 million rows, this forces a massive scan.

Better:

``` sql
SELECT id, status
FROM Orders
WHERE customer_id = 42;
```

Use indexes and retrieve only the required columns.

------------------------------------------------------------------------

## 2. Missing Indexes

Without indexes:

``` text
Query
  │
  ▼
Full Table Scan
```

With indexes:

``` text
Query
  │
  ▼
Index Lookup
  │
  ▼
Matching Rows
```

A missing index can increase execution time from milliseconds to
seconds.

------------------------------------------------------------------------

## 3. Lock Contention

Transactions often lock rows while updating them.

Example:

Transaction A updates Order #100.

Transaction B tries to update the same row.

Transaction B waits.

If many transactions wait, throughput drops.

Reduce long-running transactions and keep updates as short as possible.

------------------------------------------------------------------------

## 4. Connection Exhaustion

Every client needs a database connection.

If an application opens thousands of connections without reusing them:

``` text
App Servers
     │
1000 Connections
     │
Database
```

The database spends more time managing connections than executing
queries.

Solution:

Use a **connection pool**.

------------------------------------------------------------------------

## 5. CPU Bottlenecks

High CPU usage may indicate:

-   Complex joins
-   Poor query plans
-   Missing indexes
-   Excessive sorting
-   Aggregations

Scaling hardware may help temporarily, but query optimization usually
provides better long-term gains.

------------------------------------------------------------------------

## 6. Memory Pressure

Databases cache frequently accessed pages in memory.

When memory is insufficient:

-   More disk reads occur.
-   Cache hit ratio drops.
-   Query latency increases.

Adding RAM often improves read-heavy workloads dramatically.

------------------------------------------------------------------------

## 7. Disk I/O

Disks are much slower than memory.

Frequent random reads or writes can saturate storage.

Symptoms:

-   High I/O wait
-   Slow writes
-   Slow backups

Solutions:

-   SSDs
-   Better indexing
-   Query optimization
-   Archiving old data

------------------------------------------------------------------------

## 8. Network Latency

In distributed systems, the database may be in another Availability Zone
or Region.

Even fast queries become slow if every request crosses a high-latency
network.

Reduce unnecessary round trips.

------------------------------------------------------------------------

# Monitoring Database Health

Key metrics:

  Metric               Why It Matters
  -------------------- ------------------------
  Query Latency        User experience
  QPS                  Throughput
  CPU Utilization      Compute pressure
  Memory Usage         Cache efficiency
  Disk I/O             Storage bottlenecks
  Active Connections   Connection pressure
  Cache Hit Ratio      Read performance
  Lock Wait Time       Transaction contention

Monitoring these metrics continuously helps identify problems before
users notice them.

------------------------------------------------------------------------

# Troubleshooting Framework

When a database slows down, ask:

1.  Has traffic increased?
2.  Which queries are slow?
3.  Are indexes being used?
4.  Is CPU or memory saturated?
5.  Are connections exhausted?
6.  Is lock contention occurring?
7.  Is the bottleneck application-side or database-side?

Avoid guessing.

Investigate systematically.

------------------------------------------------------------------------

# Production Example

An online shopping platform experiences slow checkout during a flash
sale.

Investigation reveals:

-   CPU is only 35%.
-   Memory is healthy.
-   Disk usage is low.

However:

-   Thousands of transactions are waiting on the same inventory row.

The bottleneck is lock contention---not hardware.

The solution is redesigning inventory updates, not buying larger
servers.

------------------------------------------------------------------------

# Best Practices

-   Review slow query logs regularly.
-   Add indexes based on access patterns.
-   Keep transactions short.
-   Use connection pooling.
-   Monitor before scaling.
-   Benchmark changes in staging before production.

------------------------------------------------------------------------

# Interview Callout

**Question**

"The database is slow. What's your first step?"

Good answer:

> "I would identify the bottleneck using metrics and execution plans
> before making architectural changes. Optimizing the wrong component
> wastes time and money."

------------------------------------------------------------------------

# Common Mistakes

-   Scaling before measuring.
-   Ignoring slow query logs.
-   Leaving unused indexes.
-   Opening excessive database connections.
-   Assuming CPU is always the problem.

------------------------------------------------------------------------

# Memory Trick

Remember:

**Measure → Identify → Optimize → Validate**

------------------------------------------------------------------------

# Quick Summary

  Bottleneck        Typical Solution
  ----------------- ----------------------
  Slow Query        Rewrite SQL
  Missing Index     Add Index
  Lock Contention   Shorter Transactions
  Connections       Connection Pool
  CPU               Optimize Queries
  Memory            Increase Cache/RAM
  Disk I/O          SSD + Better Queries
  Network           Reduce Round Trips

------------------------------------------------------------------------

# Dependency Map

``` text
Performance
    │
    ▼
Database Bottlenecks
    │
    ├── Indexes
    ├── Query Optimization
    ├── Connection Pooling
    ├── Replication
    └── Database Scaling
```

------------------------------------------------------------------------

# Coming Next

**Part 9 -- Case Study: Local Delivery Service**

We'll combine everything learned so far to design the database layer for
a scalable food and grocery delivery platform.
