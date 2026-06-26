# The Ultimate System Design Handbook

# Chapter 4 -- Database Scaling

# Part 5 -- Multi-Leader Replication & Conflict Resolution

> **Theme:** A single primary database eventually becomes a bottleneck
> for globally distributed write-heavy applications. Multi-leader
> replication allows multiple databases to accept writes
> simultaneously---but introduces the challenge of conflicting updates.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand why multi-leader replication exists.
-   Compare single-leader and multi-leader architectures.
-   Learn how replication occurs between leaders.
-   Understand write conflicts and conflict resolution strategies.
-   Recognize appropriate production use cases.

------------------------------------------------------------------------

# Story -- Two Bank Branches Accepting Deposits

Imagine a bank with one branch in London and another in Singapore.

If only the London branch can update account balances, every transaction
from Singapore must travel across the world.

Customers experience unnecessary latency.

Instead, suppose both branches can process deposits independently.

Performance improves dramatically.

But what happens if both branches update the same account at the same
time?

Both changes are valid.

Which one should win?

This is the central problem of multi-leader replication.

------------------------------------------------------------------------

# Why Multi-Leader Replication?

Single-primary systems are simple but have limitations:

-   Higher write latency for distant users
-   Primary becomes a bottleneck
-   Regional outages impact writes

Multi-leader replication distributes write traffic across multiple
writable databases.

------------------------------------------------------------------------

# Single-Leader Architecture

``` text
          Clients
             │
      ┌──────┴──────┐
      ▼             ▼
   Writes        Reads
      │             │
      ▼             ▼
    Primary     Replicas
```

Only one database accepts writes.

------------------------------------------------------------------------

# Multi-Leader Architecture

``` text
        Region A            Region B

        Leader A ◄──────► Leader B
            │                  │
         Replica A         Replica B
```

Both leaders accept writes.

Each leader asynchronously replicates changes to the other.

------------------------------------------------------------------------

# Replication Flow

Example:

Customer in Europe updates profile.

``` text
Europe Client

↓

Leader A

↓

Replication

↓

Leader B
```

Customers in Asia update Leader B directly.

Latency is reduced for both regions.

------------------------------------------------------------------------

# The Conflict Problem

Suppose two users edit the same document.

Leader A:

``` text
Name = Alice
```

Leader B:

``` text
Name = Alicia
```

Both updates occur before replication completes.

Now each leader contains different values.

This is a conflict.

------------------------------------------------------------------------

# Conflict Resolution Strategies

## 1. Last Write Wins (LWW)

The newest timestamp wins.

Advantages:

-   Simple
-   Fast

Disadvantages:

-   Earlier updates may be lost.

------------------------------------------------------------------------

## 2. Application-Level Resolution

The application decides.

Example:

Git merge.

Humans resolve conflicts manually.

------------------------------------------------------------------------

## 3. Version Vectors

Each update carries version metadata.

Conflicting versions are detected explicitly.

Applications decide how to merge.

------------------------------------------------------------------------

## 4. CRDTs (Conflict-Free Replicated Data Types)

Specialized data structures that automatically merge concurrent updates.

Common in collaborative editing systems.

------------------------------------------------------------------------

# Where Multi-Leader Works Well

Excellent for:

-   Collaborative editing
-   Global applications
-   Multi-region deployments
-   Offline-first applications
-   Distributed retail systems

------------------------------------------------------------------------

# Where It Is Dangerous

Poor choice for:

-   Banking
-   Stock trading
-   Inventory requiring strict consistency

Incorrect conflict resolution can create financial errors.

------------------------------------------------------------------------

# Production Example

A document collaboration platform allows users in Europe and America to
edit the same file.

Each region writes locally.

Conflicts are detected and merged using operational transforms or
CRDT-like techniques.

Users experience low latency despite global distribution.

------------------------------------------------------------------------

# Advantages

-   Lower global write latency.
-   Better regional availability.
-   Increased write throughput.
-   Regional independence.

------------------------------------------------------------------------

# Disadvantages

-   Conflict detection.
-   Conflict resolution.
-   More operational complexity.
-   Eventual consistency.
-   Harder debugging.

------------------------------------------------------------------------

# Interview Callout

**Question**

"When would you choose multi-leader replication?"

Good answer:

> "When users write from multiple geographic regions and low write
> latency is more important than strict global consistency. I would
> avoid it for financial systems because conflict resolution becomes
> difficult."

------------------------------------------------------------------------

# Common Mistakes

-   Assuming replication is instantaneous.
-   Ignoring write conflicts.
-   Using Last Write Wins for critical financial data.
-   Choosing multi-leader without a conflict strategy.

------------------------------------------------------------------------

# Memory Trick

Remember:

**Multiple Writers = Multiple Conflicts**

Always explain how conflicts are resolved.

------------------------------------------------------------------------

# Quick Summary

  Concept          Purpose
  ---------------- -----------------------------
  Multi-Leader     Multiple writable databases
  Conflict         Concurrent updates
  LWW              Simple conflict resolution
  Version Vector   Detect concurrent writes
  CRDT             Automatic merge

------------------------------------------------------------------------

# Dependency Map

``` text
Database Scaling
      │
      ▼
Multi-Leader
      │
      ├── Replication
      ├── CAP
      ├── PACELC
      ├── Eventual Consistency
      └── Distributed Transactions
```

------------------------------------------------------------------------

# Coming Next

**Part 6 -- Connection Pooling & Database Optimization**

Topics:

-   Why connection pools exist
-   Pool sizing
-   Connection lifecycle
-   Database optimization techniques
-   Production tuning practices
