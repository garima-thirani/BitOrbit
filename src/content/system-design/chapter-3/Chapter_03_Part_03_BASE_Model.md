# The Ultimate System Design Handbook

# Chapter 3 -- Database Fundamentals

# Part 3 -- BASE Model

> **Theme:** ACID prioritizes correctness. BASE prioritizes scalability
> and availability. Modern distributed systems often choose BASE when
> perfect consistency is too expensive.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand why the BASE model was introduced.
-   Learn the meaning of Basically Available, Soft State, and Eventual
    Consistency.
-   Compare BASE with ACID.
-   Recognize systems where BASE is a better fit.
-   Explain BASE confidently in interviews.

------------------------------------------------------------------------

# Story -- The Global Inventory Problem

Imagine an e-commerce company with warehouses in New York, London, and
Tokyo.

A customer in London buys the last gaming console.

At the exact same time, another customer in Tokyo also buys it.

Should the Tokyo customer wait until London confirms the purchase?

If every warehouse waits for every other warehouse before accepting
orders, the website becomes slow or unavailable whenever networks have
problems.

Instead, many distributed systems accept temporary inconsistency and
synchronize later.

This philosophy is the foundation of BASE.

------------------------------------------------------------------------

# Why BASE Exists

Relational databases excel at strong consistency, but internet-scale
systems introduced new challenges:

-   Millions of concurrent users
-   Multiple regions
-   Network partitions
-   Massive write traffic

Companies such as Amazon needed systems that remained available even
when communication between regions became unreliable.

The answer was to relax some guarantees provided by ACID.

------------------------------------------------------------------------

# What is BASE?

BASE stands for:

``` text
B → Basically Available

A → Soft State

S → Eventual Consistency
```

Unlike ACID, BASE is not a strict transaction model.

It is a design philosophy for distributed systems.

------------------------------------------------------------------------

# Basically Available

## Intuition

The system should continue serving requests even during failures.

Example:

A social media application may continue loading posts even if the "Like
Count" service is temporarily unavailable.

The application is degraded---but still usable.

Availability is prioritized.

------------------------------------------------------------------------

# Soft State

Traditional databases assume committed data remains immediately stable.

Distributed systems often do not.

Data may temporarily differ between replicas while synchronization
occurs.

Example:

``` text
Region A

Likes = 100

Region B

Likes = 98
```

For a short period, both values may exist simultaneously.

This temporary inconsistency is acceptable.

------------------------------------------------------------------------

# Eventual Consistency

## Intuition

Given enough time---and no new updates---all replicas eventually
converge to the same value.

``` text
Time T0

Replica A = 100

Replica B = 98

↓

Replication

↓

Time T1

Replica A = 100

Replica B = 100
```

The system is temporarily inconsistent but eventually becomes
consistent.

------------------------------------------------------------------------

# Real-World Examples

## Social Media Likes

If a post displays:

-   1,000 likes in New York
-   998 likes in Singapore

Most users will never notice.

Eventual consistency is perfectly acceptable.

------------------------------------------------------------------------

## Banking

Would eventual consistency be acceptable for your account balance?

Absolutely not.

Financial systems usually require stronger guarantees.

------------------------------------------------------------------------

# ACID vs BASE

  ACID                    BASE
  ----------------------- -----------------------------------
  Strong consistency      Eventual consistency
  Transactions            High availability
  Immediate correctness   Temporary inconsistency allowed
  Easier reasoning        Better horizontal scalability
  Banking                 Social media, analytics, catalogs

------------------------------------------------------------------------

# Where BASE Works Well

Use BASE when:

-   Small delays are acceptable.
-   Availability is more important than immediate consistency.
-   Global replication is required.
-   Massive write throughput is expected.

Examples:

-   Product catalogs
-   User activity feeds
-   Recommendation systems
-   Metrics collection
-   DNS

------------------------------------------------------------------------

# Where BASE Is a Poor Choice

Avoid BASE when:

-   Financial transactions
-   Inventory with strict guarantees
-   Medical records
-   Airline seat booking (without additional safeguards)

These systems usually require stronger consistency.

------------------------------------------------------------------------

# Production Example -- Amazon Shopping Cart

Amazon has historically favored availability for some shopping cart
operations.

If a cart update briefly appears on one device before another, the user
experience remains acceptable.

The cart eventually converges.

Losing the ability to add items entirely would be a worse experience.

------------------------------------------------------------------------

# Trade-offs

Choosing BASE provides:

-   Better scalability
-   Better fault tolerance
-   Higher availability

But introduces:

-   Temporary inconsistency
-   Conflict resolution
-   More complex application logic

------------------------------------------------------------------------

# Interview Callout

**Question**

"Should every distributed system use eventual consistency?"

Good answer:

> "No. It depends on business requirements. Systems handling payments or
> banking often require stronger consistency, while social feeds and
> analytics can tolerate temporary inconsistency."

------------------------------------------------------------------------

# Common Mistakes

-   Assuming BASE means "inconsistent forever."
-   Thinking NoSQL databases cannot provide strong consistency.
-   Using eventual consistency for financial transactions.
-   Confusing availability with correctness.

------------------------------------------------------------------------

# Memory Trick

Remember:

**BASE = Available Now, Consistent Eventually.**

------------------------------------------------------------------------

# Quick Summary

  Letter   Meaning
  -------- ----------------------
  B        Basically Available
  A        Soft State
  S        Eventual Consistency

------------------------------------------------------------------------

# Dependency Map

``` text
Transactions
      │
      ├── ACID
      │
      └── BASE
             │
             ├── CAP Theorem
             ├── Replication
             ├── Distributed Databases
             └── Conflict Resolution
```

------------------------------------------------------------------------

# Coming Next

**Part 4 -- CAP Theorem**

Topics:

-   Brewer's CAP Theorem
-   Consistency
-   Availability
-   Partition Tolerance
-   CP, AP systems
-   Real-world database examples
