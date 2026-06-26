# The Ultimate System Design Handbook

# Chapter 2 -- Scalability Fundamentals

# Part 8 -- Cost vs Performance Trade-offs

> **Theme:** Every architecture decision has a price tag. Great
> engineers maximize business value---not just technical elegance.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand why performance improvements cost money.
-   Learn how to evaluate engineering trade-offs.
-   Balance scalability, latency, reliability, and cost.
-   Recognize over-engineering and under-engineering.
-   Make interview-ready architecture decisions.

------------------------------------------------------------------------

# Story -- Buying a Car

Imagine you need a car for your daily commute.

You have three options:

-   Economy car
-   Luxury sedan
-   Formula 1 race car

The Formula 1 car is the fastest.

Does that make it the best choice?

No.

It is expensive, difficult to maintain, uncomfortable, and unnecessary
for city traffic.

Software architecture is similar.

The most scalable architecture is not always the right architecture.

------------------------------------------------------------------------

# Why Cost Matters

Every component in your architecture has a cost:

-   Servers
-   Databases
-   Load Balancers
-   Storage
-   Network bandwidth
-   Monitoring
-   Engineering effort
-   Operational complexity

As architects, we optimize for **business value**, not just technical
excellence.

------------------------------------------------------------------------

# Performance vs Cost

Improving performance usually requires additional resources.

``` text
Lower Latency
      │
      ▼
More Servers
      │
      ▼
Higher Cost
```

Similarly:

``` text
Higher Availability
      │
      ▼
Multi-Region Deployment
      │
      ▼
Higher Infrastructure Cost
```

------------------------------------------------------------------------

# The Law of Diminishing Returns

The first optimization often provides huge benefits.

Example:

Adding a Redis cache may reduce latency from **500 ms to 50 ms**.

A second optimization might reduce it to **40 ms**.

A third optimization may cost thousands of dollars to reach **35 ms**.

Eventually, each improvement costs more while delivering less value.

------------------------------------------------------------------------

# Common Trade-offs

  Goal                  Typical Cost
  --------------------- ------------------------------
  Lower latency         More memory, caching, CDN
  Higher availability   Replication, redundancy
  Better durability     Backups, replication
  Faster queries        Better hardware, indexes
  Horizontal scaling    Operational complexity
  Multi-region          Infrastructure + replication

------------------------------------------------------------------------

# Over-Engineering

Over-engineering occurs when a solution is significantly more complex
than the problem requires.

Example:

A startup with 500 daily users deploys:

-   Kubernetes
-   Kafka
-   Cassandra
-   Service Mesh
-   Multi-region architecture

The monthly infrastructure bill exceeds the application's revenue.

The architecture solved tomorrow's problem while creating today's
problem.

------------------------------------------------------------------------

# Under-Engineering

The opposite is also dangerous.

Imagine storing all customer data in a single SQLite file while serving
millions of users.

The application cannot grow.

Good architecture finds the balance.

------------------------------------------------------------------------

# A Decision Framework

Before introducing a new component, ask:

1.  What problem does it solve?
2.  Is the problem real today?
3.  What is the operational cost?
4.  Can a simpler solution work?
5.  How difficult will maintenance become?

If you cannot justify a component, remove it.

------------------------------------------------------------------------

# Production Examples

## Startup

Traffic:

-   2,000 users/day

Architecture:

-   Single VM
-   PostgreSQL
-   NGINX

Cheap, simple, maintainable.

------------------------------------------------------------------------

## Growing SaaS

Traffic:

-   500,000 users/day

Architecture:

-   Load Balancer
-   Multiple API Servers
-   Redis
-   PostgreSQL Read Replica

Balanced cost and scalability.

------------------------------------------------------------------------

## Global Streaming Platform

Traffic:

-   Hundreds of millions of users

Architecture:

-   Multi-region
-   CDN
-   Distributed cache
-   Thousands of servers
-   Global traffic routing

High cost---but justified by business scale.

------------------------------------------------------------------------

# Interview Callout

**Question**

"Would you recommend Kubernetes for a small startup?"

Good answer:

> "Only if operational requirements justify it. Otherwise, a simpler
> deployment model reduces cost and complexity while still meeting
> business needs."

------------------------------------------------------------------------

# Common Mistakes

-   Assuming expensive means better.
-   Designing for hypothetical traffic.
-   Ignoring operational cost.
-   Forgetting engineering maintenance costs.
-   Optimizing without measuring.

------------------------------------------------------------------------

# Memory Trick

Remember:

**Simple until necessary. Complex only when justified.**

------------------------------------------------------------------------

# Dependency Map

``` text
Requirements
      │
      ▼
Capacity
      │
      ▼
Architecture
      │
      ├── Performance
      ├── Cost
      ├── Reliability
      ├── Scalability
      └── Maintainability
```

------------------------------------------------------------------------

# Chapter 2 Remaining Sections

Next:

-   Part 9 -- Dropbox Case Study (End-to-End HLD)
-   Part 10 -- Chapter Revision
    -   Cheat Sheet
    -   Flashcards
    -   Mind Map
    -   Common Mistakes
    -   Interview Questions
    -   Design Exercises
