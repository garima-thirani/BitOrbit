# The Ultimate System Design Handbook

# Chapter 5 -- Caching Fundamentals

# Part 2 -- Cache-Aside, Read-Through, Write-Through & Write-Behind

> **Theme:** A cache is only useful if the application knows when and
> how to read from it and write to it. Different caching patterns solve
> different consistency and performance problems.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand the four major caching patterns.
-   Learn request flows for reads and writes.
-   Compare advantages and disadvantages.
-   Identify production use cases.
-   Choose the right pattern in interviews.

------------------------------------------------------------------------

# Story -- The Warehouse Assistant

Imagine a warehouse.

Customers ask for products.

There are two ways to operate:

1.  The assistant first checks a nearby shelf before walking to the
    warehouse.
2.  The warehouse manager automatically keeps the nearby shelf updated.

Both approaches work---but responsibilities are different.

Caching patterns define **who manages the cache**.

------------------------------------------------------------------------

# Why Do We Need Different Cache Patterns?

Applications have different priorities:

-   Lowest latency
-   Strong consistency
-   Simplicity
-   High write throughput

No single caching strategy satisfies every requirement.

------------------------------------------------------------------------

# Pattern 1 -- Cache-Aside (Lazy Loading)

The application manages the cache.

## Read Flow

``` text
Client
  │
Application
  │
Cache?
 ├── Hit → Return
 └── Miss
        │
    Database
        │
   Store in Cache
        │
     Return
```

## Write Flow

``` text
Update Database
      │
Invalidate Cache
```

### Advantages

-   Simple
-   Most common
-   Cache stores only popular data

### Disadvantages

-   First request is slow
-   Cache miss logic in application
-   Possible stale data

### Production Use

-   Product catalogs
-   User profiles
-   Configuration

------------------------------------------------------------------------

# Pattern 2 -- Read-Through

The application talks only to the cache.

The cache loads missing data automatically.

``` text
Application
     │
     ▼
 Cache
 ├── Hit
 └── Miss
        │
    Database
        │
 Cache Updates Itself
```

### Advantages

-   Cleaner application code
-   Centralized caching logic

### Disadvantages

-   More sophisticated cache layer
-   Less common outside managed platforms

------------------------------------------------------------------------

# Pattern 3 -- Write-Through

Every write updates both cache and database.

``` text
Application
     │
     ▼
Cache
     │
Database
```

### Advantages

-   Cache stays fresh
-   Reads are very fast

### Disadvantages

-   Higher write latency
-   Unused data may occupy cache

### Production Use

-   Session stores
-   Frequently read configuration

------------------------------------------------------------------------

# Pattern 4 -- Write-Behind (Write-Back)

Writes go to the cache first.

The cache asynchronously persists data.

``` text
Application
     │
     ▼
Cache
     │
 Async Flush
     ▼
Database
```

### Advantages

-   Extremely fast writes
-   Smooths traffic spikes

### Disadvantages

-   Risk of data loss if cache fails
-   More operational complexity

### Production Use

-   Analytics
-   Metrics
-   Logging
-   Telemetry pipelines

------------------------------------------------------------------------

# Pattern Comparison

  Pattern         Read Speed   Write Speed   Consistency   Complexity
  --------------- ------------ ------------- ------------- ------------
  Cache-Aside     High         Medium        Medium        Low
  Read-Through    High         Medium        Medium        Medium
  Write-Through   High         Lower         High          Medium
  Write-Behind    High         Very High     Eventual      High

------------------------------------------------------------------------

# Choosing the Right Pattern

Use **Cache-Aside** when: - Building general web applications -
Simplicity matters

Use **Read-Through** when: - Cache infrastructure supports automatic
loading

Use **Write-Through** when: - Fresh cached data is important

Use **Write-Behind** when: - High write throughput matters more than
immediate persistence

------------------------------------------------------------------------

# Production Example

An e-commerce site:

-   Product pages → Cache-Aside
-   User sessions → Write-Through
-   Analytics events → Write-Behind
-   Managed cache services → Read-Through

Large systems often combine multiple patterns.

------------------------------------------------------------------------

# Interview Callout

**Question**

"Which caching strategy would you recommend for product details?"

Good answer:

> "Cache-Aside is usually the best choice because product data is read
> frequently, changes relatively infrequently, and the pattern is simple
> to implement."

------------------------------------------------------------------------

# Common Mistakes

-   Using Write-Behind for financial transactions.
-   Forgetting cache invalidation with Cache-Aside.
-   Treating cache as the source of truth.
-   Assuming one pattern fits every workload.

------------------------------------------------------------------------

# Memory Trick

Remember:

-   **Cache-Aside → App manages cache**
-   **Read-Through → Cache reads**
-   **Write-Through → Cache + DB together**
-   **Write-Behind → Cache now, DB later**

------------------------------------------------------------------------

# Quick Summary

  Pattern         Best For
  --------------- -----------------------
  Cache-Aside     General web apps
  Read-Through    Managed cache systems
  Write-Through   Fresh cached reads
  Write-Behind    High write throughput

------------------------------------------------------------------------

# Dependency Map

``` text
Caching
   │
   ├── Cache-Aside
   ├── Read-Through
   ├── Write-Through
   ├── Write-Behind
   └── Cache Invalidation
```

------------------------------------------------------------------------

# Coming Next

**Part 3 -- Cache Eviction Policies (LRU, LFU, FIFO)**

Topics:

-   Why caches evict data
-   LRU
-   LFU
-   FIFO
-   Choosing the right eviction policy
