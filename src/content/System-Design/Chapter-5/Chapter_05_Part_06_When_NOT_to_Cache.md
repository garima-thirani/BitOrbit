# The Ultimate System Design Handbook

# Chapter 5 -- Caching Fundamentals

# Part 6 -- When NOT to Cache

> **Theme:** Caching improves performance, but caching the wrong data
> can introduce stale information, security issues, and
> difficult-to-debug production incidents. Knowing **when not to cache**
> is just as important as knowing when to cache.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Recognize situations where caching is harmful.
-   Understand common cache anti-patterns.
-   Learn failure modes caused by incorrect caching.
-   Choose caching selectively during system design interviews.

------------------------------------------------------------------------

# Story -- The Airport Departure Board

Imagine an airport departure board.

If flight information were cached for one hour, passengers would
constantly see incorrect gate numbers and departure times.

Some information changes too frequently to be cached aggressively.

Freshness is more important than speed.

------------------------------------------------------------------------

# Principle

> **Only cache data when the benefit of faster access outweighs the risk
> of serving stale data.**

The database (or source system) remains the source of truth.

------------------------------------------------------------------------

# Anti-Pattern 1 -- Highly Volatile Data

Examples:

-   Stock prices
-   Live sports scores
-   Taxi driver locations
-   Real-time bidding prices

Why?

The cache expires before it is useful.

Result:

-   Constant invalidation
-   Low hit ratio
-   Wasted memory

------------------------------------------------------------------------

# Anti-Pattern 2 -- Financial Data

Avoid aggressively caching:

-   Account balances
-   Wallet amounts
-   Payment status
-   Banking transactions

Risk:

A stale balance can lead to incorrect business decisions.

Instead:

-   Read from the primary database.
-   Cache only non-critical metadata.

------------------------------------------------------------------------

# Anti-Pattern 3 -- One-Time Tokens

Never cache:

-   OTPs
-   Password reset tokens
-   Short-lived authentication secrets

Reasons:

-   Security
-   Expiration complexity
-   Replay risks

------------------------------------------------------------------------

# Anti-Pattern 4 -- Sensitive Personal Data

Examples:

-   Medical records
-   Government IDs
-   Tax information

If caching is required:

-   Encrypt data.
-   Use short TTLs.
-   Restrict access.
-   Avoid shared caches.

------------------------------------------------------------------------

# Anti-Pattern 5 -- Low Reuse Data

If every request is unique:

``` text
User A

Unique Query

↓

Never Requested Again
```

Caching wastes memory because reuse never occurs.

Examples:

-   Random reports
-   Large exports
-   Ad-hoc analytics

------------------------------------------------------------------------

# Failure Modes

## Cache Pollution

Large amounts of rarely used data replace genuinely hot data.

Result:

Lower hit ratio.

------------------------------------------------------------------------

## Cache Thrashing

The cache constantly evicts and reloads data.

Symptoms:

-   High miss rate
-   Increased database traffic
-   Poor latency

------------------------------------------------------------------------

## Stale Data Bugs

Application:

``` text
Database

Price = ₹100

Cache

Price = ₹90
```

Customers purchase at the wrong price.

------------------------------------------------------------------------

# Cost Considerations

Caching is not free.

Costs include:

-   RAM
-   Redis clusters
-   Operational complexity
-   Monitoring
-   Invalidation logic

Sometimes buying more cache is more expensive than optimizing SQL.

------------------------------------------------------------------------

# Production Example

A ride-sharing platform updates driver locations every second.

Instead of caching locations with long TTLs:

-   Store live positions in an in-memory geospatial store.
-   Push updates continuously.

Traditional caching would provide little benefit.

------------------------------------------------------------------------

# Decision Framework

Ask these questions:

1.  Is the data read frequently?
2.  Does it change slowly?
3.  Is stale data acceptable?
4.  Is the cache hit ratio likely to be high?
5.  Is the cost of inconsistency acceptable?

If the answer is mostly "no," don't cache it.

------------------------------------------------------------------------

# Interview Callout

**Question**

"What data would you avoid caching in a banking application?"

Good answer:

> "Critical financial values such as balances, transactions, and payment
> status should generally come from the authoritative datastore because
> stale values can cause incorrect financial decisions."

------------------------------------------------------------------------

# Common Mistakes

-   Caching everything.
-   Ignoring security.
-   Long TTLs for dynamic data.
-   Measuring cache size instead of hit ratio.
-   Forgetting cache failure scenarios.

------------------------------------------------------------------------

# Memory Trick

**Cache hot.**

**Don't cache volatile.**

**Protect sensitive.**

------------------------------------------------------------------------

# Quick Summary

  Avoid Caching        Reason
  -------------------- -----------------------------
  Live prices          Changes rapidly
  Financial balances   Strong consistency required
  OTPs                 Security
  Sensitive records    Privacy
  One-off queries      Low reuse

------------------------------------------------------------------------

# Dependency Map

``` text
Caching
   │
   ├── Patterns
   ├── Eviction
   ├── Stampede
   ├── Invalidation
   └── Anti-Patterns
          │
          ├── Volatile Data
          ├── Security
          ├── Cost
          └── Consistency
```

------------------------------------------------------------------------

# Coming Next

**Part 7 -- Case Study: Ticketmaster**

Topics:

-   Flash-sale traffic
-   Queueing users
-   Cache strategy
-   Preventing overselling
-   Scaling during peak demand
