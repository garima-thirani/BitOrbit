# The Ultimate System Design Handbook

# Chapter 3 -- Database Fundamentals

# Part 5 -- PACELC Theorem

> **Theme:** CAP explains what happens during a network partition.
> PACELC explains the trade-offs even when the network is perfectly
> healthy.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand why PACELC was proposed.
-   Learn the meaning of the PACELC theorem.
-   Compare latency and consistency trade-offs.
-   Relate PACELC to modern distributed databases.
-   Explain PACELC in interviews with practical examples.

------------------------------------------------------------------------

# Story -- Two Hospitals

Imagine two hospitals in different cities sharing patient records.

Normally, the network is healthy.

A doctor updates a patient's allergy information.

Should the second hospital wait until the update reaches every replica
before responding?

Waiting ensures correctness but delays treatment.

Responding immediately improves speed but risks showing stale data.

Even **without a network failure**, engineers face a trade-off.

This is what PACELC explains.

------------------------------------------------------------------------

# Why CAP Wasn't Enough

CAP only discusses systems **during a partition**.

But partitions are relatively rare.

Most of the time, networks are healthy.

Engineers still need to choose between:

-   Lower latency
-   Stronger consistency

PACELC extends CAP by describing this everyday trade-off.

------------------------------------------------------------------------

# What is PACELC?

PACELC stands for:

``` text
If there is a
P = Partition

choose between

A = Availability

or

C = Consistency

Else (E)

choose between

L = Latency

or

C = Consistency
```

In short:

**During failures → Availability vs Consistency**

**During normal operation → Latency vs Consistency**

------------------------------------------------------------------------

# Understanding the "ELC" Part

Suppose a write reaches Region A.

Should Region A:

### Option 1

Wait until Region B confirms the write.

Pros: - Strong consistency

Cons: - Higher latency

------------------------------------------------------------------------

### Option 2

Respond immediately.

Pros: - Fast response

Cons: - Region B may temporarily be behind.

------------------------------------------------------------------------

# Visual Model

``` text
                Partition?
                     │
          ┌──────────┴──────────┐
          │                     │
         Yes                   No
          │                     │
          ▼                     ▼
 Availability vs          Latency vs
 Consistency              Consistency
```

------------------------------------------------------------------------

# Database Examples

  Database                   Typical PACELC Preference
  -------------------------- --------------------------------------
  Cassandra                  PA / EL
  DynamoDB                   PA / EL
  MongoDB (configurable)     Depends on write concern
  PostgreSQL (single node)   Not typically discussed using PACELC

Remember that many modern databases allow tuning these behaviors.

------------------------------------------------------------------------

# Real-World Examples

## WhatsApp

Message delivery should feel instant.

A tiny delay in synchronization is acceptable.

Latency is prioritized for many interactions.

------------------------------------------------------------------------

## Banking

Updating an account balance usually waits for durable confirmation.

Correctness outweighs raw speed.

Consistency is prioritized.

------------------------------------------------------------------------

# Why Latency Matters

Users notice latency quickly.

Approximate human perception:

-   \<100 ms → Instant

-   100--300 ms → Responsive

-   1 s → Noticeable delay

-   5 s → Frustrating

Reducing latency often improves user satisfaction more than adding new
features.

------------------------------------------------------------------------

# Trade-off Framework

Before choosing a database, ask:

1.  Is stale data acceptable?
2.  How much latency is acceptable?
3.  What happens during network partitions?
4.  What is the business impact of inconsistency?

Business requirements determine the answer.

------------------------------------------------------------------------

# CAP vs PACELC

  CAP                      PACELC
  ------------------------ ----------------------------------------
  Focuses on partitions    Covers partitions and normal operation
  C vs A during failures   L vs C when healthy
  Simpler model            More practical for modern systems

------------------------------------------------------------------------

# Interview Callout

**Question**

"Why was PACELC introduced if CAP already exists?"

Good answer:

> "CAP explains behavior during network partitions, but most systems
> spend most of their time operating normally. PACELC adds the everyday
> trade-off between latency and consistency."

------------------------------------------------------------------------

# Common Mistakes

-   Treating PACELC as a replacement for CAP.
-   Ignoring latency when discussing distributed systems.
-   Assuming all databases make the same trade-offs.
-   Forgetting that many systems allow configurable consistency.

------------------------------------------------------------------------

# Memory Trick

Remember:

**CAP = Failure Mode**

**PACELC = Everyday Design Decisions**

------------------------------------------------------------------------

# Quick Summary

``` text
Partition?

Yes
 ↓
Availability or Consistency

No
 ↓
Latency or Consistency
```

------------------------------------------------------------------------

# Dependency Map

``` text
ACID
  │
  ├── BASE
  │
  └── CAP
        │
        ▼
     PACELC
        │
        ├── Replication
        ├── Global Databases
        ├── Multi-Region Systems
        └── Distributed Transactions
```

------------------------------------------------------------------------

# Coming Next

**Part 6 -- Database Indexing**

Topics:

-   Why indexes exist
-   B-Tree indexes
-   Hash indexes
-   Composite indexes
-   Clustered vs Non-clustered indexes
-   Query execution basics
