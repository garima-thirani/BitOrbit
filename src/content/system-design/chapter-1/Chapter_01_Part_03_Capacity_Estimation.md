# The Ultimate System Design Handbook

# Chapter 1 -- System Design Thinking & Requirement Analysis

## Part 3 -- Capacity Estimation & Back-of-the-Envelope Calculations

> **Estimated Length:** \~8--12 pages (Part 3 of 4)

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will be able to:

-   Estimate Daily Active Users (DAU), Monthly Active Users (MAU),
    Queries Per Second (QPS), and storage requirements.
-   Perform interview-grade back-of-the-envelope calculations.
-   Explain why capacity estimation matters before designing an
    architecture.
-   Identify common estimation mistakes.

------------------------------------------------------------------------

# Story -- Designing Before Measuring

Imagine you are asked to design Bitly.

A junior engineer immediately says:

> "Let's use PostgreSQL, Redis, Kafka, Kubernetes..."

A senior engineer asks one question:

> "How many URLs are we shortening every day?"

That single answer changes almost every architectural decision.

If the answer is **100 URLs/day**, a single VM is enough.

If the answer is **500 million URLs/day**, you'll need distributed
databases, caching, replication, and global traffic routing.

Capacity estimation is the bridge between requirements and architecture.

------------------------------------------------------------------------

# Why Capacity Estimation Matters

Capacity estimation answers:

-   How much traffic will the system receive?
-   How much data will we store?
-   How many servers are required?
-   What are the bandwidth requirements?
-   Where are the bottlenecks?

Think of it as estimating the size of a building before buying
materials.

------------------------------------------------------------------------

# Rule of Thumb

Interview estimates do **not** need to be exact.

Interviewers care about:

-   Your assumptions
-   Your reasoning
-   Your math
-   Your ability to communicate

Always state assumptions first.

------------------------------------------------------------------------

# Common Metrics

  Metric      Meaning
  ----------- -----------------------------
  DAU         Daily Active Users
  MAU         Monthly Active Users
  QPS         Queries Per Second
  RPS         Requests Per Second
  TPS         Transactions Per Second
  Storage     Total data retained
  Bandwidth   Data transferred per second

------------------------------------------------------------------------

# DAU and MAU

DAU measures unique users active in one day.

MAU measures unique users active in one month.

Example:

-   MAU = 30 million
-   DAU = 6 million

Daily engagement = 20%.

------------------------------------------------------------------------

# Queries Per Second (QPS)

Formula:

``` text
QPS = Total Requests Per Day / 86,400
```

Example:

100 million requests/day

    100,000,000 / 86,400

    ≈1157 QPS

Always estimate peak traffic.

A common interview assumption:

Peak QPS ≈ Average QPS × 3--5

------------------------------------------------------------------------

# Storage Estimation

Assume:

-   20 million new URLs/day
-   500 bytes per record

Daily storage:

    20M × 500 bytes

    ≈10 GB/day

Yearly:

    10 × 365

    ≈3.65 TB/year

Now ask:

Should everything stay in one database?

Probably not.

------------------------------------------------------------------------

# Bandwidth Estimation

Suppose:

Average response = 2 KB

Peak QPS = 5000

Bandwidth

    5000 × 2 KB

    ≈10 MB/sec

These calculations help estimate network requirements.

------------------------------------------------------------------------

# Mental Model

``` text
Users
  │
  ▼
Traffic
  │
  ▼
QPS
  │
  ▼
Servers
  │
  ▼
Storage
  │
  ▼
Cost
```

Every architecture starts with numbers.

------------------------------------------------------------------------

# Interview Walkthrough

Question:

Design a URL Shortener.

Step 1

Assume:

-   50M DAU

Step 2

Average URLs shortened/user/day

= 2

Total writes/day

=100M

Step 3

Average redirects/day

=500M

Read-heavy system.

Step 4

Average QPS

    Writes

    100M/86400

    ≈1157

    Reads

    500M/86400

    ≈5787

Peak read traffic

≈25,000--30,000 QPS

Now the architecture begins to emerge:

-   Read replicas
-   Redis cache
-   CDN (for static assets)
-   Load balancer

------------------------------------------------------------------------

# Production Insight

At Amazon and Netflix, early design reviews often begin with traffic
estimates before any component diagrams. Numbers justify architectural
choices and prevent over-engineering or under-sizing.

------------------------------------------------------------------------

# Common Mistakes

-   Forgetting to state assumptions.
-   Designing before estimating.
-   Using average QPS instead of peak.
-   Ignoring storage growth.
-   Assuming infinite hardware.

------------------------------------------------------------------------

# Memory Trick

**Numbers → Architecture**

Remember:

    Requirements

    ↓

    Capacity

    ↓

    Architecture

    ↓

    Technology

Never reverse this order.

------------------------------------------------------------------------

# Quick Cheat Sheet

-   DAU = Daily Active Users
-   MAU = Monthly Active Users
-   QPS = Requests/day ÷ 86,400
-   Peak QPS ≈ 3--5 × Average
-   Estimate storage before choosing a database.
-   State assumptions first.

------------------------------------------------------------------------

# Dependency Map

``` text
Requirements
      │
      ▼
Capacity Estimation
      │
      ├── Load Balancing
      ├── Database Scaling
      ├── Caching
      ├── CDN
      └── Auto Scaling
```

------------------------------------------------------------------------

# What's Next

Part 4 concludes Chapter 1 with:

-   Bottleneck Analysis
-   API Contracts
-   Client--Server Architecture
-   Trade-off Thinking (CAP, Latency vs Consistency)
-   Bitly Case Study
-   Chapter Summary
-   Flashcards
-   Interview Questions
-   Design Exercises
