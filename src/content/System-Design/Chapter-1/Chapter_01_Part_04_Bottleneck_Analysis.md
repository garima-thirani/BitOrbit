# The Ultimate System Design Handbook

# Chapter 1 -- System Design Thinking & Requirement Analysis

# Part 4 -- Bottleneck Analysis & Identifying System Constraints

> **Theme:** Every scalable architecture begins by finding what will
> break first.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you should be able to:

-   Define a bottleneck from a systems perspective.
-   Understand why every distributed system always has a limiting
    resource.
-   Learn a structured framework for identifying bottlenecks.
-   Predict bottlenecks before they occur.
-   Explain bottleneck analysis in a FAANG interview.

------------------------------------------------------------------------

# Opening Story --- The Fastest Highway in the World

Imagine a six-lane highway that suddenly narrows into a single lane
before a bridge.

Even though six lanes of cars arrive every minute, only one lane can
cross the bridge.

The bridge becomes the **bottleneck**.

Adding more lanes before the bridge doesn't increase throughput.

Adding faster cars doesn't help.

Adding more fuel doesn't help.

The only thing that improves traffic is increasing the bridge's
capacity.

Software systems behave exactly the same way.

------------------------------------------------------------------------

# What Is a Bottleneck?

## Intuition

A bottleneck is **the slowest component in a chain of work**.

Every request in a distributed system travels through multiple
components:

``` text
Client
   │
   ▼
Load Balancer
   │
   ▼
API Service
   │
   ▼
Redis
   │
   ▼
Database
```

If every component can process 10,000 requests/second except the
database, which handles only 1,500 requests/second, then the entire
system is limited to **1,500 requests/second**.

The database is the bottleneck.

------------------------------------------------------------------------

# Formal Definition

> A bottleneck is the component whose limited capacity restricts the
> maximum throughput or performance of the overall system.

The important phrase is **overall system**.

The fastest API server in the world is useless if every request waits on
a slow database.

------------------------------------------------------------------------

# Throughput Is Like Water Flow

Imagine a pipeline:

``` text
100 L/min
   │
   ▼
80 L/min
   │
   ▼
25 L/min
   │
   ▼
90 L/min
```

Maximum output?

**25 L/min**

The narrowest pipe determines the flow.

The same principle applies to software.

------------------------------------------------------------------------

# Where Bottlenecks Usually Occur

## CPU

Symptoms

-   High CPU utilization
-   Long request latency
-   Thread starvation

Common fixes

-   Better algorithms
-   Horizontal scaling
-   Background processing

------------------------------------------------------------------------

## Memory

Symptoms

-   Out of memory errors
-   Garbage collection pauses
-   Process crashes

Common fixes

-   Reduce object allocations
-   Streaming
-   Caching carefully
-   Add memory

------------------------------------------------------------------------

## Disk

Symptoms

-   Slow database writes
-   High I/O wait
-   Backup delays

Common fixes

-   SSDs
-   Better indexing
-   Batch writes

------------------------------------------------------------------------

## Network

Symptoms

-   High latency
-   Packet loss
-   Slow cross-region communication

Common fixes

-   CDN
-   Compression
-   Regional deployments

------------------------------------------------------------------------

## Database

This is one of the most common bottlenecks in interviews.

Why?

Every service eventually wants data.

As traffic grows:

-   More reads
-   More writes
-   More locks
-   Larger indexes
-   Bigger tables

Solutions introduced later in this book:

-   Read replicas
-   Sharding
-   Redis
-   Connection pooling

------------------------------------------------------------------------

# System Constraints

Before designing architecture, identify constraints.

Examples:

  Constraint     Example
  -------------- --------------------------
  Budget         Startup with \$500/month
  Latency        Response \< 100 ms
  Availability   99.99% uptime
  Consistency    Banking system
  Geography      Multi-region users
  Compliance     GDPR / HIPAA

Constraints shape architecture more than technologies do.

------------------------------------------------------------------------

# A Bottleneck Analysis Framework

When interviewing, mentally walk through every request:

1.  Where does the request start?
2.  Which component receives it first?
3.  Does it access the database?
4.  Does it call another service?
5.  Is work synchronous or asynchronous?
6.  Which step is likely to become saturated first?

This habit helps you discover bottlenecks before drawing solutions.

------------------------------------------------------------------------

# Production Example --- URL Shortener

Request Flow

``` text
User
 │
 ▼
Load Balancer
 │
 ▼
API Server
 │
 ▼
Redis Cache
 │
 ├── Cache Hit → Response
 │
 └── Cache Miss
        │
        ▼
    Database
        │
        ▼
      Redis
        │
        ▼
     Response
```

Potential bottlenecks:

-   Database under heavy read traffic
-   Redis memory exhaustion
-   Load balancer connection limits
-   Slow network between regions

Notice that each bottleneck has a different solution.

------------------------------------------------------------------------

# Interview Callout

**Question**

"The database is slow. Should we immediately shard it?"

Good answer:

"No. First identify whether the workload is read-heavy or write-heavy.
Read-heavy systems may benefit from caching or replicas before
introducing the operational complexity of sharding."

Interviewers love this answer because it demonstrates trade-off
thinking.

------------------------------------------------------------------------

# Common Mistakes

-   Optimizing components without measuring.
-   Assuming the database is always the bottleneck.
-   Ignoring network latency.
-   Scaling everything instead of the limiting component.
-   Confusing high latency with low throughput.

------------------------------------------------------------------------

# Memory Trick

Remember **PIPE**:

-   **P** -- Pinpoint the slowest stage
-   **I** -- Inspect why it is slow
-   **P** -- Prioritize fixing that stage
-   **E** -- Evaluate the new bottleneck

Removing one bottleneck often reveals the next one.

------------------------------------------------------------------------

# Dependency Map

``` text
Requirements
      │
      ▼
Capacity Estimation
      │
      ▼
Bottleneck Analysis
      │
      ├── Load Balancing
      ├── Caching
      ├── Database Scaling
      ├── Auto Scaling
      └── Observability
```

------------------------------------------------------------------------

# Coming Next

The next part completes Chapter 1 with:

-   API Contracts
-   Interface Design Principles
-   Client--Server Architecture
-   CAP Introduction
-   Latency vs Consistency
-   Bitly HLD Case Study
-   Chapter Summary
-   Flashcards
-   Interview Questions
-   Design Exercises
