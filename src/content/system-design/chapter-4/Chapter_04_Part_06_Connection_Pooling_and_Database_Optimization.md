# The Ultimate System Design Handbook

# Chapter 4 -- Database Scaling

# Part 6 -- Connection Pooling & Database Optimization

> **Theme:** Opening a database connection is expensive. Connection
> pools reuse existing connections so applications spend time executing
> queries instead of repeatedly establishing new connections.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand why connection pools exist.
-   Learn the lifecycle of a database connection.
-   Understand pool sizing and common tuning strategies.
-   Learn practical database optimization techniques.
-   Recognize production bottlenecks related to connections.

------------------------------------------------------------------------

# Story -- The Toll Booth

Imagine a toll plaza.

If every car had to build a brand-new toll booth before paying, traffic
would never move.

Instead, fixed toll booths are reused by thousands of cars.

Database connections work the same way.

Creating a new connection for every request wastes time and resources.

------------------------------------------------------------------------

# Why Database Connections Are Expensive

Creating a connection requires:

-   TCP handshake
-   Authentication
-   Session initialization
-   Resource allocation

Doing this for every request increases latency and CPU usage.

------------------------------------------------------------------------

# What is Connection Pooling?

A connection pool maintains a reusable set of open database connections.

Application threads borrow a connection, execute queries, and return it
to the pool.

``` text
Application
     │
     ▼
Connection Pool
 ┌────┼────┐
 ▼    ▼    ▼
C1   C2   C3
     │
     ▼
 Database
```

------------------------------------------------------------------------

# Connection Lifecycle

``` text
Request

↓

Borrow Connection

↓

Execute Query

↓

Return Connection

↓

Reuse
```

Connections are recycled instead of recreated.

------------------------------------------------------------------------

# Pool Sizing

A pool that is too small causes waiting.

A pool that is too large overwhelms the database.

Example:

``` text
200 App Threads

↓

20 Database Connections

↓

Requests share connections efficiently.
```

Pool size should be based on:

-   Database capacity
-   CPU cores
-   Query latency
-   Concurrent workload

Bigger is **not** always better.

------------------------------------------------------------------------

# Connection Exhaustion

Without pooling:

``` text
1000 Requests

↓

1000 Connections

↓

Database Overloaded
```

With pooling:

``` text
1000 Requests

↓

50 Reusable Connections

↓

Stable Database
```

------------------------------------------------------------------------

# Timeouts

Important settings:

-   Connection timeout
-   Idle timeout
-   Query timeout
-   Maximum lifetime

These prevent stale or broken connections from remaining in the pool.

------------------------------------------------------------------------

# Popular Connection Pool Libraries

Examples include:

-   HikariCP (Java)
-   PgBouncer (PostgreSQL)
-   ProxySQL (MySQL)
-   SQLAlchemy Pool (Python)

These tools improve throughput with minimal application changes.

------------------------------------------------------------------------

# Database Optimization Beyond Pooling

Connection pooling alone is not enough.

Also optimize:

## Queries

-   Avoid `SELECT *`
-   Use indexes
-   Filter early
-   Batch operations

## Schema

-   Normalize appropriately
-   Denormalize when justified

## Caching

Reduce unnecessary database traffic with Redis or application caches.

## Read Replicas

Route read-heavy workloads away from the primary.

## Monitoring

Track:

-   Slow queries
-   Active connections
-   Lock waits
-   Cache hit ratio
-   Replication lag

------------------------------------------------------------------------

# Production Example

An e-commerce platform runs 300 API servers.

Without pooling:

-   Every request opens a new database connection.
-   Database reaches its connection limit.
-   Requests begin timing out.

After introducing PgBouncer:

-   Connections are reused.
-   Database load drops.
-   Throughput increases without changing application logic.

------------------------------------------------------------------------

# Best Practices

-   Reuse connections.
-   Keep transactions short.
-   Close borrowed connections promptly.
-   Monitor pool utilization.
-   Tune incrementally using production metrics.

------------------------------------------------------------------------

# Interview Callout

**Question**

"Why can't we simply allow unlimited database connections?"

Good answer:

> "Each connection consumes memory and CPU. Too many concurrent
> connections reduce throughput because the database spends more time
> managing sessions than executing queries."

------------------------------------------------------------------------

# Common Mistakes

-   Creating a connection per request.
-   Oversized pools.
-   Forgetting connection timeouts.
-   Holding connections during slow external API calls.
-   Ignoring pool utilization metrics.

------------------------------------------------------------------------

# Memory Trick

Remember:

**Connections are expensive. Queries are cheap. Reuse the connections.**

------------------------------------------------------------------------

# Quick Summary

  Concept           Purpose
  ----------------- ----------------------------------
  Connection Pool   Reuse database connections
  Borrow/Return     Efficient lifecycle
  Pool Size         Balance throughput and stability
  Timeouts          Remove stale connections
  Monitoring        Prevent exhaustion

------------------------------------------------------------------------

# Dependency Map

``` text
Database Scaling
      │
      ▼
Connection Pooling
      │
      ├── Query Optimization
      ├── Read Replicas
      ├── Monitoring
      ├── Application Servers
      └── High Availability
```

------------------------------------------------------------------------

# Coming Next

**Part 7 -- Case Study: News Aggregator**

We'll design the database architecture for a large-scale news
aggregation platform using sharding, replication, caching, and read
replicas.
