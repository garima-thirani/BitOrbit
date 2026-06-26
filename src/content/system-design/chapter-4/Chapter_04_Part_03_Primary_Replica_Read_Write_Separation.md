# The Ultimate System Design Handbook

# Chapter 4 -- Database Scaling

# Part 3 -- Read/Write Separation (Primary--Replica Pattern)

> **Theme:** Most production systems receive far more reads than writes.
> Read/Write Separation distributes this workload so the primary
> database handles writes while replicas serve reads.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand why read/write separation exists.
-   Learn the Primary--Replica architecture.
-   Understand replication flow.
-   Learn about replication lag.
-   Recognize appropriate use cases and trade-offs.

------------------------------------------------------------------------

# Story -- The Famous Restaurant

Imagine a famous restaurant.

There is only one head chef who prepares every dish.

Customers don't just place orders---they also constantly ask:

-   "Can I see the menu?"
-   "What are today's specials?"
-   "How many desserts do you have?"

Soon, the chef spends more time answering questions than cooking.

The owner hires several assistants.

The assistants answer customer questions while the chef focuses only on
cooking.

The restaurant becomes much more efficient.

This is exactly how read/write separation works.

------------------------------------------------------------------------

# Why Read/Write Separation?

In many applications:

-   90--99% of operations are **reads**
-   Only 1--10% are **writes**

Examples:

-   Social media feeds
-   E-commerce product browsing
-   News websites
-   Blogs
-   Video platforms

Sending every request to one database wastes resources.

------------------------------------------------------------------------

# What is the Primary--Replica Pattern?

A **Primary (Leader)** database accepts all write operations.

One or more **Replicas (Followers)** continuously copy data from the
primary.

Applications send:

-   Writes → Primary
-   Reads → Replicas

------------------------------------------------------------------------

# Basic Architecture

``` text
                 Application
                      │
        ┌─────────────┴─────────────┐
        │                           │
   Write Requests              Read Requests
        │                           │
        ▼                           ▼
     Primary DB               Read Replica 1
        │                           │
        ├──────────────► Read Replica 2
        │
        └──────────────► Read Replica 3
```

------------------------------------------------------------------------

# Write Flow

Suppose a customer places an order.

``` text
Client

↓

Primary Database

↓

Write Successful

↓

Replication

↓

Replicas Updated
```

Only the primary accepts writes.

------------------------------------------------------------------------

# Read Flow

Suppose another customer browses products.

``` text
Client

↓

Application

↓

Replica Database

↓

Result Returned
```

The primary remains free to process writes.

------------------------------------------------------------------------

# Why This Improves Scalability

Imagine:

    Writes/sec = 500

    Reads/sec = 15,000

Without replicas:

    Primary handles

    15,500 requests/sec

With three replicas:

    Primary

    500 writes

    Replica A

    5,000 reads

    Replica B

    5,000 reads

    Replica C

    5,000 reads

Load is distributed efficiently.

------------------------------------------------------------------------

# Replication

The primary records changes.

Replicas replay those changes.

Replication may be:

-   Synchronous
-   Asynchronous
-   Semi-synchronous

We'll study replication strategies later.

------------------------------------------------------------------------

# Replication Lag

Replication is rarely instantaneous.

Example:

    Primary

    Balance = ₹500

    ↓

    User Reads Replica

    Balance = ₹600

The replica has not yet processed the latest update.

This delay is called **replication lag**.

------------------------------------------------------------------------

# Handling Replication Lag

Common approaches:

### Read Your Own Writes

After updating data, temporarily read from the primary.

------------------------------------------------------------------------

### Critical Reads

Important operations (payments, profile updates) often read directly
from the primary.

------------------------------------------------------------------------

### Eventual Consistency

Accept temporary stale data for non-critical information.

Example:

-   View counts
-   Product ratings
-   Like counts

------------------------------------------------------------------------

# Production Example

An online shopping platform:

``` text
          Users
             │
             ▼
      Application Servers
             │
      ┌──────┴──────┐
      ▼             ▼
Primary DB     Replica Router
                   │
          ┌────────┴────────┐
          ▼                 ▼
      Replica A         Replica B
```

Product browsing goes to replicas.

Checkout always goes to the primary.

------------------------------------------------------------------------

# Advantages

-   Scale read traffic
-   Reduce primary load
-   Improve availability
-   Better reporting performance
-   Easier maintenance

------------------------------------------------------------------------

# Disadvantages

-   Replication lag
-   More infrastructure
-   Operational complexity
-   Replica monitoring
-   Failover management

------------------------------------------------------------------------

# When to Use

Excellent for:

-   E-commerce
-   News websites
-   Social media
-   SaaS dashboards
-   Reporting

Less suitable when every read requires the absolute latest data.

------------------------------------------------------------------------

# Interview Callout

**Question**

"A user updates their profile but immediately sees the old value. Why?"

Good answer:

> "The application probably read from a replica before replication
> completed. This is a classic replication lag issue."

------------------------------------------------------------------------

# Common Mistakes

-   Sending writes to replicas.
-   Ignoring replication lag.
-   Assuming replicas improve write throughput.
-   Forgetting failover planning.

------------------------------------------------------------------------

# Memory Trick

Remember:

**Primary Writes.**

**Replicas Read.**

------------------------------------------------------------------------

# Quick Summary

  Component     Responsibility
  ------------- --------------------------------
  Primary       Reads + Writes (authoritative)
  Replica       Reads only
  Replication   Copies changes
  Lag           Delay before replicas update

------------------------------------------------------------------------

# Dependency Map

``` text
Database Scaling
      │
      ▼
Primary–Replica
      │
      ├── Replication
      ├── Read Scaling
      ├── Failover
      ├── Consistency
      └── Multi-Region Systems
```

------------------------------------------------------------------------

# Coming Next

**Part 4 -- Read Replicas & Scaling Read-Heavy Workloads**

Topics:

-   Replica routing
-   Load balancing reads
-   Read-after-write consistency
-   Reporting databases
-   Production architectures
