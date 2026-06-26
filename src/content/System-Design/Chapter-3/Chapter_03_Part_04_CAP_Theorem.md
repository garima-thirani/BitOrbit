# The Ultimate System Design Handbook

# Chapter 3 -- Database Fundamentals

# Part 4 -- CAP Theorem

> **Theme:** In a distributed system, network failures are inevitable.
> CAP helps us reason about what a system should do when communication
> between machines breaks down.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand the origin of the CAP Theorem.
-   Learn what Consistency, Availability, and Partition Tolerance mean.
-   Distinguish CP and AP systems.
-   Recognize common interview misconceptions.
-   Apply CAP reasoning to real-world systems.

------------------------------------------------------------------------

# Story -- Two Bank Branches

Imagine a bank has branches in Delhi and Mumbai.

Both branches keep a copy of account balances.

Normally they synchronize continuously.

One day, the network cable between the cities is cut.

A customer withdraws ₹5,000 in Delhi while another checks the same
account in Mumbai.

Should Mumbai refuse requests until communication is restored?

Or should it continue serving customers, even if its balance might be
outdated?

This is the exact problem CAP addresses.

------------------------------------------------------------------------

# Why CAP Exists

Single-server databases don't face this problem.

Distributed databases do.

Whenever machines communicate over a network, messages can be:

-   Delayed
-   Lost
-   Duplicated
-   Reordered

A network partition is not hypothetical---it is expected.

------------------------------------------------------------------------

# What is the CAP Theorem?

The CAP Theorem, proposed by Eric Brewer and later formalized by Gilbert
and Lynch, states:

> During a network partition, a distributed system can provide **either
> Consistency or Availability**, but not both simultaneously.

A key point:

**Partition Tolerance is not optional** in modern distributed systems.

The real decision during a partition is between **Consistency** and
**Availability**.

------------------------------------------------------------------------

# C -- Consistency

All clients see the same data after a successful write.

Example:

``` text
Replica A = 10

Write +1

Replica B immediately also shows 11
```

No stale reads are allowed.

------------------------------------------------------------------------

# A -- Availability

Every request receives a response.

The response may not always contain the latest data.

The system continues operating despite failures.

------------------------------------------------------------------------

# P -- Partition Tolerance

The system continues functioning even when nodes cannot communicate.

``` text
Region A

XXXX Network Failure XXXX

Region B
```

The partition may last seconds or minutes.

Good distributed systems are designed to survive it.

------------------------------------------------------------------------

# Visualizing CAP

``` text
             Partition
             Tolerance
                  ▲
                  │
        Consistency ───── Availability

During a partition you must choose
between C and A.
```
------------------------------------------------------------------------

# CP Systems

CP systems prioritize correctness.

Behavior during a partition:

-   Reject or delay requests if consistency cannot be guaranteed.

Examples:

-   ZooKeeper
-   etcd
-   HBase (many operations)

Best for:

-   Configuration management
-   Leader election
-   Financial metadata

------------------------------------------------------------------------

# AP Systems

AP systems prioritize availability.

Behavior during a partition:

-   Continue accepting requests.
-   Synchronize data later.

Examples:

-   Cassandra
-   Riak
-   Dynamo-inspired systems

Best for:

-   Social media
-   Product catalogs
-   User activity feeds

------------------------------------------------------------------------

# Real-World Examples

## Banking

Money transfers generally prefer consistency.

Showing stale balances can lead to financial errors.

## Instagram Likes

Temporary inconsistency is acceptable.

A like count changing from 999 to 1000 a second later rarely impacts
users.

------------------------------------------------------------------------

# CAP vs ACID

These are different concepts.

  -----------------------------------------------------------------------
  ACID                                   CAP
  -------------------------------------- --------------------------------
  Transaction guarantees                 Distributed system trade-offs

  Single or distributed DB               Distributed systems only

  Atomicity, Consistency, Isolation,     Consistency, Availability,
  Durability                             Partition Tolerance
  -----------------------------------------------------------------------

The "Consistency" in ACID is **not the same** as the "Consistency" in
CAP.

------------------------------------------------------------------------

# Common Interview Misconception

❌ "Pick any two."

This is outdated and misleading.

The correct explanation:

-   Partition tolerance is required in distributed systems.
-   When a partition occurs, choose between consistency and
    availability.

------------------------------------------------------------------------

# Trade-offs

Choosing Consistency:

Advantages: - Correct data - Easier reasoning

Disadvantages: - Reduced availability during failures

Choosing Availability:

Advantages: - Better uptime - Better user experience

Disadvantages: - Temporary stale data - Conflict resolution required

------------------------------------------------------------------------

# Interview Callout

**Question**

"Would you choose a CP or AP database for a payment system?"

Good answer:

> "I would generally prioritize consistency because financial
> correctness is more important than serving every request during a
> partition."

------------------------------------------------------------------------

# Common Mistakes

-   Thinking CAP applies to single-node databases.
-   Saying "pick any two."
-   Confusing ACID consistency with CAP consistency.
-   Assuming AP means incorrect forever.

------------------------------------------------------------------------

# Memory Trick

Remember:

**CAP matters only when the network breaks.**

No partition → you often have both consistency and availability.

Partition → choose one.

------------------------------------------------------------------------

# Dependency Map

``` text
Distributed Systems
        │
        ▼
      CAP
        │
 ┌──────┴──────┐
 ▼             ▼
CP            AP
 │             │
 ▼             ▼
ACID        BASE
```

------------------------------------------------------------------------

# Coming Next

**Part 5 -- PACELC Theorem**

Topics:

-   Why CAP is incomplete
-   PACELC intuition
-   Latency vs consistency
-   Real database classifications
-   Interview decision framework
