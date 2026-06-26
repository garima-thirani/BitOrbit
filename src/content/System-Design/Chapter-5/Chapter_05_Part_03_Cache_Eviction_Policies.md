# The Ultimate System Design Handbook

# Chapter 5 -- Caching Fundamentals

# Part 3 -- Cache Eviction Policies (LRU, LFU, FIFO)

> **Theme:** Cache memory is finite. When the cache becomes full, it
> must decide which data to remove. A good eviction policy maximizes
> cache hit ratio while minimizing unnecessary database access.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand why cache eviction is necessary.
-   Learn LRU, LFU, and FIFO in depth.
-   Compare their trade-offs.
-   Choose the right eviction policy for different workloads.
-   Explain eviction strategies in interviews.

------------------------------------------------------------------------

# Story -- The Refrigerator

Imagine a refrigerator with room for only 20 items.

When it becomes full, something has to be removed.

Should you throw away:

-   The oldest food?
-   The food you haven't touched in weeks?
-   The food used least often?

Different answers lead to different eviction strategies.

Caches face the exact same problem.

------------------------------------------------------------------------

# Why Eviction Exists

Caches are usually stored in RAM.

RAM is expensive and limited.

Eventually every cache reaches capacity.

``` text
Cache Full

↓

Need Space

↓

Evict Existing Data

↓

Store New Data
```

The eviction policy determines which item leaves.

------------------------------------------------------------------------

# What Makes a Good Eviction Policy?

A good policy should:

-   Maximize cache hits
-   Minimize database reads
-   Be inexpensive to maintain
-   Adapt to changing access patterns

No single policy is perfect.

------------------------------------------------------------------------

# LRU -- Least Recently Used

## Intuition

Recently accessed data is likely to be accessed again soon.

Remove the item that has not been used for the longest time.

``` text
Most Recent

A → B → C → D

Least Recent
```

When E arrives:

``` text
Remove A
```

------------------------------------------------------------------------

## How LRU Works

Every access updates the item's position.

Typical implementation:

-   Hash Map
-   Doubly Linked List

Lookup: **O(1)**

Update: **O(1)**

------------------------------------------------------------------------

## Best Use Cases

-   Product pages
-   User profiles
-   API responses
-   Session data

LRU is the default policy in many caching systems.

------------------------------------------------------------------------

# LFU -- Least Frequently Used

## Intuition

Popularity matters more than recency.

Each item maintains an access counter.

Example:

``` text
A = 200 accesses

B = 5 accesses

C = 40 accesses
```

Evict B.

------------------------------------------------------------------------

## Advantages

Excellent when popular items remain popular for long periods.

Examples:

-   Trending videos
-   Popular news
-   Frequently accessed configuration

------------------------------------------------------------------------

## Disadvantages

Old popular entries may remain forever.

Modern LFU implementations often decay counters over time.

------------------------------------------------------------------------

# FIFO -- First In, First Out

## Intuition

Remove the oldest inserted item.

No consideration of:

-   Popularity
-   Recent usage

``` text
A

↓

B

↓

C

↓

D

Remove A
```

------------------------------------------------------------------------

## Advantages

-   Very simple
-   Low overhead

## Disadvantages

May remove heavily used items.

Rarely the best choice for application caches.

------------------------------------------------------------------------

# LRU vs LFU vs FIFO

  -------------------------------------------------------------------------
  Policy           Decision           Best For           Weakness
  ---------------- ------------------ ------------------ ------------------
  LRU              Least recently     General workloads  Doesn't track
                   used                                  popularity

  LFU              Least frequently   Stable hot data    Counter
                   used                                  maintenance

  FIFO             Oldest inserted    Simple queues      Ignores usage
  -------------------------------------------------------------------------

------------------------------------------------------------------------

# Choosing the Right Policy

Choose **LRU** when:

-   Access patterns change frequently.
-   Recent requests predict future requests.

Choose **LFU** when:

-   Popularity remains stable.
-   A few hot items dominate traffic.

Choose **FIFO** when:

-   Simplicity is more important than hit ratio.

------------------------------------------------------------------------

# Production Example

An e-commerce platform caches product pages.

Morning:

``` text
Phone
Laptop
Shoes
```

Evening sale:

``` text
Gaming Console
```

LRU naturally adapts because recently viewed products stay in cache.

LFU may retain long-term popular products.

The choice depends on business behavior.

------------------------------------------------------------------------

# Interview Callout

**Question**

"Why is LRU the most common eviction policy?"

Good answer:

> "Because many real-world workloads exhibit temporal locality---data
> accessed recently is likely to be accessed again soon. LRU balances
> simplicity with strong practical performance."

------------------------------------------------------------------------

# Common Mistakes

-   Assuming one policy fits every workload.
-   Ignoring memory overhead.
-   Forgetting LFU counter aging.
-   Using FIFO for highly dynamic applications.

------------------------------------------------------------------------

# Memory Trick

-   **LRU → Recent**
-   **LFU → Popular**
-   **FIFO → Oldest**

------------------------------------------------------------------------

# Quick Summary

  Policy   Memory Cue
  -------- -----------------------------------
  LRU      Remove the oldest unused item
  LFU      Remove the least popular item
  FIFO     Remove the earliest inserted item

------------------------------------------------------------------------

# Dependency Map

``` text
Caching
   │
   ├── Cache Patterns
   ├── Eviction Policies
   │      ├── LRU
   │      ├── LFU
   │      └── FIFO
   ├── Cache Stampede
   └── Cache Invalidation
```

------------------------------------------------------------------------

# Coming Next

**Part 4 -- Cache Stampede & Thundering Herd**

Topics:

-   What is a cache stampede?
-   Dogpile effect
-   Request coalescing
-   Mutex locking
-   Probabilistic early expiration
-   Stale-while-revalidate
