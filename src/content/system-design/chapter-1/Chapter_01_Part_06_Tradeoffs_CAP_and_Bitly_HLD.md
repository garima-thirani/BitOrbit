# The Ultimate System Design Handbook

# Chapter 1 -- System Design Thinking & Requirement Analysis

# Part 6 -- Trade-offs, CAP Thinking & Bitly High-Level Design

> **Theme:** There is no perfect architecture. Every design is a
> compromise.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Think in trade-offs instead of technologies.
-   Understand why CAP exists.
-   Learn latency vs consistency decisions.
-   Walk through a complete Bitly HLD.
-   Learn how to explain your design in an interview.

------------------------------------------------------------------------

# Story -- Choosing a Backpack

Suppose you need a backpack for a Himalayan trek.

You want it to be:

-   Extremely light
-   Extremely cheap
-   Extremely durable

Unfortunately, you rarely get all three.

If it is light and durable, it is expensive.

If it is cheap and durable, it is heavy.

If it is cheap and light, it may not last.

Software architecture works exactly the same way.

Every engineering decision optimizes one thing while sacrificing
another.

------------------------------------------------------------------------

# Thinking in Trade-offs

Junior engineers ask:

> Which database should I use?

Senior engineers ask:

> What problem am I optimizing for?

Architects never ask "What is the best technology?"

They ask:

-   What matters most?
-   What can I sacrifice?
-   What are my constraints?

------------------------------------------------------------------------

# The CAP Mindset

CAP stands for:

-   **Consistency**
-   **Availability**
-   **Partition Tolerance**

Imagine two data centers connected by a network.

``` text
Region A  ===== Network =====  Region B
```

If the network breaks (a partition), you must choose:

1.  Reject requests until both sides agree (**Consistency**)
2.  Continue serving requests even if data temporarily differs
    (**Availability**)

Modern distributed systems assume network partitions **will happen**, so
the practical decision is usually between consistency and availability
during failures.

------------------------------------------------------------------------

# Latency vs Consistency

Consider an online banking system.

A user transfers ₹10,000.

Would you rather:

-   Return the result instantly but risk showing stale data?
-   Wait slightly longer to guarantee the correct balance?

For banking, correctness is usually more important.

Now think about Instagram likes.

If your like count updates one second later, most users won't notice.

Here, lower latency often matters more than immediate consistency.

------------------------------------------------------------------------

# Trade-off Examples

  System              Prioritizes
  ------------------- ------------------------
  Banking             Strong consistency
  Stock Exchange      Correctness & ordering
  WhatsApp Presence   Low latency
  News Feed           Availability
  DNS                 Availability
  Analytics           Throughput

------------------------------------------------------------------------

# Bitly High-Level Design

## Functional Requirements

-   Shorten long URLs
-   Redirect short URLs
-   Basic analytics

## Non-Functional Requirements

-   Very low redirect latency
-   High availability
-   Billions of redirects
-   Unique short IDs

------------------------------------------------------------------------

# High-Level Architecture

``` text
                Client
                   │
                   ▼
            Load Balancer
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
 URL Creation API      Redirect API
        │                     │
        ▼                     ▼
 ID Generator            Redis Cache
        │                     │
        ▼             Cache Miss?
 PostgreSQL                 │
        │                   ▼
        └────────────► Database
                             │
                             ▼
                          Analytics Queue
```

------------------------------------------------------------------------

# Why Each Component Exists

## Load Balancer

Distributes traffic across API servers.

## URL Creation Service

Validates requests and generates short IDs.

## ID Generator

Ensures uniqueness.

Possible strategies:

-   Auto Increment
-   Base62 Encoding
-   Snowflake IDs
-   Random IDs with collision detection

## Redis

Stores frequently accessed mappings.

Most redirects become cache hits.

## Database

Persistent storage for URL mappings.

## Analytics Queue

Redirects should remain fast.

Analytics can be processed asynchronously.

------------------------------------------------------------------------

# Request Flow

### URL Creation

``` text
Client
   │
POST /urls
   │
API
   │
Generate ID
   │
Store Mapping
   │
Return Short URL
```

------------------------------------------------------------------------

### Redirect

``` text
Client
   │
GET /abc123
   │
Redis
   │
Cache Hit?
   │
Yes ─────────► Redirect
   │
No
   ▼
Database
   │
Update Cache
   │
Redirect
```

------------------------------------------------------------------------

# Why This Architecture Scales

-   Reads dominate writes.
-   Redis absorbs hot traffic.
-   API servers remain stateless.
-   Analytics is asynchronous.
-   Components can scale independently.

------------------------------------------------------------------------

# Interview Walkthrough

A good answer flows like this:

1.  Clarify requirements.
2.  Estimate traffic.
3.  Define APIs.
4.  Draw HLD.
5.  Explain storage.
6.  Add caching.
7.  Identify bottlenecks.
8.  Discuss scaling.
9.  Mention monitoring.
10. Explain trade-offs.

Notice that technology names are introduced only after the reasoning.

------------------------------------------------------------------------

# Common Mistakes

-   Saying "I'll use microservices" without justification.
-   Ignoring failure scenarios.
-   Forgetting cache invalidation.
-   Designing for billions of users without traffic estimates.
-   Treating CAP as "pick any two" in all situations.

------------------------------------------------------------------------

# Chapter 1 Summary

You learned:

-   System Design thinking
-   HLD
-   Requirements
-   Capacity estimation
-   Bottleneck analysis
-   API contracts
-   Client-server architecture
-   Trade-off thinking
-   CAP intuition
-   Bitly HLD

These concepts form the foundation for every remaining chapter.

------------------------------------------------------------------------

# Preview of Chapter 2

Next we begin **Scalability Fundamentals**:

-   Vertical vs Horizontal Scaling
-   Stateless Architecture
-   Load Balancers
-   Sticky Sessions
-   Auto Scaling
-   Geographic Distribution
-   Dropbox Case Study
