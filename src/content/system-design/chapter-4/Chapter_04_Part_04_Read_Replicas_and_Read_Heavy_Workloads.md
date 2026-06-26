# The Ultimate System Design Handbook

# Chapter 4 -- Database Scaling

# Part 4 -- Read Replicas & Scaling Read-Heavy Workloads

> **Theme:** In most production systems, reads vastly outnumber writes.
> Read replicas allow applications to scale without overwhelming the
> primary database.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand what read replicas are.
-   Learn how applications route read traffic.
-   Understand replica load balancing.
-   Learn about read-after-write consistency.
-   Explore production architectures for read-heavy systems.

------------------------------------------------------------------------

# Story -- The Popular Library

Imagine a library with a single copy of a bestselling book.

Thousands of readers want to borrow it.

Only one person can read it at a time.

The solution?

Create multiple copies of the same book.

Now many readers can read simultaneously while the original master copy
remains safe.

Read replicas work exactly the same way.

------------------------------------------------------------------------

# Why Read Replicas?

Typical production traffic:

``` text
Reads  = 95%

Writes = 5%
```

Examples:

-   Product browsing
-   Social media feeds
-   News websites
-   Video platforms
-   Documentation portals

Scaling writes is difficult.

Scaling reads is much easier.

------------------------------------------------------------------------

# What is a Read Replica?

A read replica is a copy of the primary database that continuously
receives updates from the primary but serves only read requests.

``` text
             Primary
                │
      ┌─────────┴─────────┐
      ▼                   ▼
 Replica A           Replica B
```

Applications never write directly to replicas.

------------------------------------------------------------------------

# Read Routing

Applications determine where queries should go.

Example:

``` text
SELECT

↓

Replica
```

``` text
INSERT

↓

Primary
```

This routing can happen in:

-   Application code
-   Database proxy
-   Service mesh
-   ORM configuration

------------------------------------------------------------------------

# Replica Load Balancing

Suppose there are three replicas.

``` text
            Read Router
                │
      ┌─────────┼─────────┐
      ▼         ▼         ▼
 Replica1  Replica2  Replica3
```

Common algorithms:

-   Round Robin
-   Least Connections
-   Weighted Routing

This prevents one replica from becoming overloaded.

------------------------------------------------------------------------

# Read-After-Write Consistency

Consider this sequence:

1.  User updates profile.
2.  Update reaches Primary.
3.  User refreshes page.
4.  Request goes to Replica.
5.  Replica has not caught up.

The user sees stale data.

This is a common production issue.

------------------------------------------------------------------------

# Strategies to Handle Stale Reads

## Read from Primary Temporarily

After a write, route the next few reads to the primary.

Useful for:

-   Profile updates
-   Settings pages
-   Payment confirmation

------------------------------------------------------------------------

## Sticky Reads

Temporarily pin the user's reads to the primary until replication
catches up.

------------------------------------------------------------------------

## Accept Eventual Consistency

For non-critical data:

-   Like counts
-   Product views
-   Analytics

Small delays are acceptable.

------------------------------------------------------------------------

# Reporting Databases

Large reporting queries should not impact production traffic.

Instead:

``` text
Primary

↓

Replica

↓

Analytics Queries
```

Examples:

-   Daily sales reports
-   Dashboard generation
-   BI tools

Production latency remains low.

------------------------------------------------------------------------

# Scaling Example

Without replicas:

``` text
20,000 Reads

↓

Primary
```

With four replicas:

``` text
20,000 Reads

↓

Read Router

↓

5,000 per Replica
```

The primary focuses on writes.

------------------------------------------------------------------------

# Production Example

A streaming platform stores:

-   User accounts
-   Watch history
-   Preferences

Writes:

-   Viewing progress
-   New subscriptions

Reads:

-   Homepage
-   Recommendations
-   Search results

Homepage requests are served from replicas while subscription updates go
to the primary.

------------------------------------------------------------------------

# Advantages

-   Scale reads independently.
-   Reduce primary load.
-   Improve response times.
-   Support reporting.
-   Better fault tolerance.

------------------------------------------------------------------------

# Limitations

-   Replication lag.
-   Additional infrastructure.
-   Replica synchronization.
-   Failover complexity.
-   No improvement to write throughput.

------------------------------------------------------------------------

# Interview Callout

**Question**

"Can read replicas increase write capacity?"

Good answer:

> "No. Replicas only help distribute read traffic. All writes still go
> through the primary unless another replication strategy such as
> multi-leader replication is used."

------------------------------------------------------------------------

# Common Mistakes

-   Reading critical data from lagging replicas.
-   Sending writes to replicas.
-   Ignoring replication lag.
-   Assuming replicas eliminate the need for caching.

------------------------------------------------------------------------

# Memory Trick

Remember:

**One Writer. Many Readers.**

------------------------------------------------------------------------

# Quick Summary

  Component           Responsibility
  ------------------- -----------------------------
  Primary             Writes + authoritative data
  Replica             Read-only copy
  Read Router         Load balances read traffic
  Reporting Replica   Heavy analytical queries

------------------------------------------------------------------------

# Dependency Map

``` text
Database Scaling
      │
      ▼
Read Replicas
      │
      ├── Primary–Replica
      ├── Replication
      ├── Load Balancing
      ├── Caching
      └── High Availability
```

------------------------------------------------------------------------

# Coming Next

**Part 5 -- Multi-Leader Replication & Conflict Resolution**

Topics:

-   Multiple writable databases
-   Conflict detection
-   Conflict resolution strategies
-   Active-active deployments
-   Real-world production examples
