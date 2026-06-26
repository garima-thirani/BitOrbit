# The Ultimate System Design Handbook

# Chapter 5 -- Caching Fundamentals

# Part 5 -- Cache Invalidation Strategies

> **Theme:** There are only two hard things in Computer Science: cache
> invalidation and naming things. A fast cache is useless if it returns
> outdated data. Cache invalidation keeps performance high without
> sacrificing correctness.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand why cache invalidation is difficult.
-   Learn TTL, event-based, tag-based, and versioned invalidation.
-   Compare invalidation strategies.
-   Understand production trade-offs.
-   Answer cache consistency interview questions.

------------------------------------------------------------------------

# Story -- The Restaurant Menu

A restaurant prints menus every morning.

At noon, the chef changes the price of a pizza.

Customers still see the old price because the printed menus were never
updated.

The menu is the cache.

The kitchen database has the correct value.

The challenge is deciding **when and how to refresh the menu**.

------------------------------------------------------------------------

# Why Cache Invalidation Matters

Without invalidation:

-   Users see stale prices.
-   Inventory appears incorrect.
-   Deleted content continues to exist.
-   Application behavior becomes inconsistent.

The cache must stay reasonably synchronized with the source of truth.

------------------------------------------------------------------------

# Strategy 1 -- Time-To-Live (TTL)

Every cache entry expires automatically after a fixed duration.

``` text
Cache Entry
     │
 TTL = 5 Minutes
     │
Expired
     │
Reload
```

### Advantages

-   Very simple
-   No application events required

### Disadvantages

-   Data may be stale until expiry.
-   Too-small TTL increases database traffic.
-   Too-large TTL increases staleness.

Best for:

-   Product pages
-   News
-   Configuration

------------------------------------------------------------------------

# Strategy 2 -- Event-Based Invalidation

Whenever data changes, explicitly remove or update the cache.

``` text
Update Database
      │
Publish Event
      │
Invalidate Cache
```

Advantages:

-   Fresh data
-   Immediate consistency (from application perspective)

Challenges:

-   Requires reliable event delivery.

Common with message queues.

------------------------------------------------------------------------

# Strategy 3 -- Tag-Based Invalidation

Associate cache entries with tags.

Example:

``` text
Product:123

Tags

product
electronics
summer-sale
```

When the sale ends:

``` text
Invalidate

summer-sale
```

Every related cache entry disappears together.

Very useful for CMS platforms.

------------------------------------------------------------------------

# Strategy 4 -- Versioned Keys

Instead of deleting keys:

``` text
user:42:v1
```

Create:

``` text
user:42:v2
```

Applications begin using the new key.

Old entries naturally expire.

Benefits:

-   Avoid race conditions.
-   Easy rollback.

Often used by CDNs and distributed caches.

------------------------------------------------------------------------

# Cache Consistency Patterns

## Write Then Invalidate

``` text
Write DB

↓

Delete Cache

↓

Next Read Rebuilds Cache
```

This is the most common Cache-Aside approach.

------------------------------------------------------------------------

## Write Through

``` text
Write Cache

↓

Write Database
```

Cache always contains the newest value.

Higher write latency.

------------------------------------------------------------------------

## Refresh Ahead

Frequently accessed keys are refreshed before expiry.

Benefits:

-   Fewer cache misses.
-   Better user experience.

Useful for hot keys.

------------------------------------------------------------------------

# Production Example

An e-commerce platform updates product prices.

Workflow:

1.  Price changes in PostgreSQL.
2.  Product update event is published.
3.  Redis key is invalidated.
4.  Next request rebuilds the cache.

Users quickly receive updated prices while the database avoids
unnecessary load.

------------------------------------------------------------------------

# Choosing the Right Strategy

  Strategy         Best For                   Trade-off
  ---------------- -------------------------- ----------------------
  TTL              Simple systems             Temporary stale data
  Event-Based      Dynamic applications       More infrastructure
  Tag-Based        CMS & content              Tag management
  Versioned Keys   Large distributed caches   Extra key storage
  Refresh Ahead    Hot data                   Background work

------------------------------------------------------------------------

# Interview Callout

**Question**

"How would you ensure product prices stay fresh in Redis?"

Good answer:

> "I would use a cache-aside pattern with event-based invalidation.
> Whenever a price changes in the database, an event invalidates the
> corresponding Redis key. The next request repopulates the cache."

------------------------------------------------------------------------

# Common Mistakes

-   Depending only on long TTLs.
-   Forgetting to invalidate related objects.
-   Updating the database but not the cache.
-   Deleting large cache regions unnecessarily.

------------------------------------------------------------------------

# Memory Trick

**TTL waits.**

**Events react.**

**Tags group.**

**Versions replace.**

------------------------------------------------------------------------

# Quick Summary

  Strategy        Core Idea
  --------------- -----------------------
  TTL             Expire later
  Event           Invalidate on change
  Tag             Remove groups
  Version         Create new keys
  Refresh Ahead   Refresh before expiry

------------------------------------------------------------------------

# Dependency Map

``` text
Caching
   │
   ├── Cache Patterns
   ├── Stampede
   ├── Invalidation
   │      ├── TTL
   │      ├── Events
   │      ├── Tags
   │      ├── Versions
   │      └── Refresh Ahead
   └── Distributed Cache
```

------------------------------------------------------------------------

# Coming Next

**Part 6 -- When NOT to Cache**

Topics:

-   Anti-patterns
-   Failure modes
-   Frequently changing data
-   Security concerns
-   Financial workloads
