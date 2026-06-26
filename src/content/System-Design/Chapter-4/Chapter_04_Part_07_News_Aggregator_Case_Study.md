# The Ultimate System Design Handbook

# Chapter 4 -- Database Scaling

# Part 7 -- Case Study: Designing a News Aggregator

> **Theme:** News platforms receive enormous read traffic while
> ingesting articles continuously. This case study combines sharding,
> replication, caching, indexing, and read scaling into one practical
> architecture.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Design the database layer for a large-scale news platform.
-   Choose appropriate databases for different workloads.
-   Apply sharding, caching, and replication.
-   Identify bottlenecks and scaling strategies.
-   Present a structured interview solution.

------------------------------------------------------------------------

# Problem Statement

Design a backend similar to Google News or Flipboard where users can:

-   Read articles
-   Search news
-   Follow topics
-   Save bookmarks
-   Receive personalized feeds

The platform serves millions of users globally.

------------------------------------------------------------------------

# Functional Requirements

-   Article ingestion
-   Search
-   Personalized feed
-   Bookmarks
-   Categories
-   Trending stories
-   Publisher management

------------------------------------------------------------------------

# Non-Functional Requirements

-   Low read latency
-   High availability
-   Horizontal scalability
-   Durable storage
-   Fast search
-   Eventual consistency for feeds

------------------------------------------------------------------------

# High-Level Architecture

``` text
             Publishers
                  │
                  ▼
          Ingestion Service
                  │
                  ▼
          Message Queue
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
 Indexing Workers      Feed Workers
        │                   │
        ▼                   ▼
 Search Index         Feed Database

Users
  │
  ▼
Load Balancer
  │
API Servers
  │
 ├──────────────► Redis Cache
 │
 ├──────────────► Read Replicas
 │
 └──────────────► Primary Database
```

------------------------------------------------------------------------

# Data Model

## Relational Database

Tables:

-   Users
-   Publishers
-   Articles (metadata)
-   Bookmarks
-   Topics

## Search Engine

Article body and full-text search are stored in a dedicated search
engine.

Why?

Relational databases are not optimized for large-scale full-text search.

------------------------------------------------------------------------

# Caching Strategy

Cache:

-   Homepage
-   Trending articles
-   Category pages
-   Publisher metadata

Frequently accessed content is served from Redis.

``` text
Client
  │
  ▼
Redis
  │
Miss
  ▼
Database
```

------------------------------------------------------------------------

# Database Scaling

## Primary Database

Handles:

-   Article creation
-   User bookmarks
-   Preferences

## Read Replicas

Serve:

-   Homepage
-   Category pages
-   User profiles

Reads greatly outnumber writes.

------------------------------------------------------------------------

# Sharding

As the article table grows into billions of rows:

Possible shard keys:

-   Article ID
-   Region
-   Publication date

Time-based sharding is useful for archival workloads.

------------------------------------------------------------------------

# Search Pipeline

``` text
Publisher

↓

Queue

↓

Indexer

↓

Search Cluster
```

Indexing becomes asynchronous so article publication is fast.

------------------------------------------------------------------------

# Feed Generation

Instead of computing every user's feed on demand:

-   Precompute trending feeds
-   Cache personalized feeds
-   Refresh asynchronously

This reduces database load dramatically.

------------------------------------------------------------------------

# Bottlenecks

Potential bottlenecks:

-   Search indexing
-   Trending computation
-   Cache misses
-   Replica lag
-   Hot topics during breaking news

------------------------------------------------------------------------

# Scaling Strategy

As traffic grows:

-   Add API servers
-   Add read replicas
-   Expand Redis cluster
-   Shard article metadata
-   Scale search cluster independently

Each layer scales horizontally.

------------------------------------------------------------------------

# Trade-offs

  Decision        Benefit            Cost
  --------------- ------------------ ------------------------
  Redis           Fast reads         Cache invalidation
  Read Replicas   Read scaling       Replication lag
  Search Engine   Excellent search   Extra infrastructure
  Queue           Smooth ingestion   Operational complexity
  Sharding        Unlimited growth   Cross-shard complexity

------------------------------------------------------------------------

# Interview Walkthrough

A strong interview flow:

1.  Clarify requirements.
2.  Estimate read/write ratio.
3.  Design APIs.
4.  Draw HLD.
5.  Explain ingestion.
6.  Explain search.
7.  Explain feed generation.
8.  Discuss scaling.
9.  Identify bottlenecks.
10. Explain trade-offs.

------------------------------------------------------------------------

# Common Mistakes

-   Using SQL for full-text search.
-   Computing every feed synchronously.
-   Ignoring cache strategy.
-   Reading all traffic from the primary.
-   Forgetting asynchronous processing.

------------------------------------------------------------------------

# Memory Trick

Remember:

**Store → Index → Cache → Serve**

------------------------------------------------------------------------

# Dependency Map

``` text
Database Scaling
      │
      ▼
News Aggregator
      │
      ├── Sharding
      ├── Read Replicas
      ├── Redis
      ├── Search Engine
      ├── Queue
      └── Connection Pooling
```

------------------------------------------------------------------------

# Coming Next

**Part 8 -- Chapter 4 Revision**

Includes:

-   Cheat Sheet
-   Flashcards
-   Mind Map
-   Common Mistakes
-   Interview Questions
-   Design Exercises
-   Cross-topic Dependency Map
