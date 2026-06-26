# The Ultimate System Design Handbook

# Chapter 6 -- Distributed Caching & CDN Deep Dive

# Part 7 -- Case Study: Facebook News Feed

> **Theme:** A social media feed is one of the most read-heavy systems
> on the internet. Every user expects their feed to load in
> milliseconds, even while millions of new posts are created every
> minute. This case study combines distributed caching, Redis, CDNs,
> fan-out strategies, and feed generation into one production-grade
> architecture.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Design a large-scale news feed architecture.
-   Understand fan-out strategies.
-   Apply Redis and multi-tier caching.
-   Handle celebrity users and hot keys.
-   Discuss scaling trade-offs in interviews.

------------------------------------------------------------------------

# Problem Statement

Design the backend for a social media news feed where users can:

-   Create posts
-   Follow other users
-   View personalized feeds
-   Like and comment on posts
-   Load media efficiently

The platform serves hundreds of millions of users globally.

------------------------------------------------------------------------

# Functional Requirements

-   Post creation
-   Feed generation
-   Follow/unfollow
-   Likes & comments
-   Image/video loading
-   Infinite scrolling

------------------------------------------------------------------------

# Non-Functional Requirements

-   Feed loads under 200 ms
-   High availability
-   Massive read scalability
-   Eventual consistency is acceptable
-   Efficient global media delivery

------------------------------------------------------------------------

# High-Level Architecture

``` text
              Mobile / Web Clients
                     │
               CDN (Media)
                     │
              Load Balancer
                     │
              API Gateway
                     │
      ┌──────────────┴──────────────┐
      ▼                             ▼
 Feed Service                 Post Service
      │                             │
      ▼                             ▼
 Redis Cluster                 Primary Database
      │                             │
      ▼                             ▼
 Read Replicas             Kafka / Message Queue
      │                             │
      └──────────────┬──────────────┘
                     ▼
               Feed Workers
```

------------------------------------------------------------------------

# Feed Generation

There are two primary approaches.

## Fan-Out on Write

When a user creates a post:

1.  Store the post.
2.  Push the post ID into followers' feeds.

``` text
Create Post
      │
      ▼
Feed Workers
      │
Push to Followers
```

### Advantages

-   Extremely fast reads
-   Precomputed feeds

### Disadvantages

-   Expensive for celebrities with millions of followers

------------------------------------------------------------------------

## Fan-Out on Read

Posts are stored once.

When a user opens the app:

1.  Fetch followed users.
2.  Query recent posts.
3.  Merge and rank results.

### Advantages

-   Cheap writes
-   Good for celebrity accounts

### Disadvantages

-   Higher read latency

------------------------------------------------------------------------

# Hybrid Strategy

Most real systems combine both.

``` text
Normal Users
    │
Fan-Out on Write

Celebrity Users
    │
Fan-Out on Read
```

This balances write amplification and read latency.

------------------------------------------------------------------------

# Multi-Tier Caching

``` text
Client
   │
CDN (Images/Videos)
   │
L1 Application Cache
   │
Redis Cluster
   │
Database
```

Media is served from the CDN.

Feed metadata is cached in Redis.

------------------------------------------------------------------------

# Redis Usage

Redis stores:

-   User timelines
-   Session tokens
-   Like counts
-   Trending topics
-   Hot feed fragments

Using Sorted Sets (ZSETs), feeds can be ordered by score or timestamp.

------------------------------------------------------------------------

# Handling Celebrity Users

A celebrity with 100 million followers creates a post.

Naively pushing the post to every follower would overload the system.

Solution:

-   Store the post once.
-   Generate timelines dynamically for celebrity content.

This avoids massive write amplification.

------------------------------------------------------------------------

# Hot Keys

Trending posts may become "hot keys."

Mitigation techniques:

-   Replicate hot keys
-   Local application cache
-   CDN for media
-   Shard Redis
-   Cache warming

------------------------------------------------------------------------

# Feed Ranking

A feed is more than chronological order.

Ranking may consider:

-   Recency
-   Likes
-   Comments
-   Relationship strength
-   Machine learning score

The ranking service often runs independently of storage.

------------------------------------------------------------------------

# Bottlenecks

Potential bottlenecks include:

-   Celebrity fan-out
-   Redis memory pressure
-   Feed recomputation
-   Cache stampedes
-   Media origin traffic

Each requires independent scaling.

------------------------------------------------------------------------

# Trade-offs

  Decision           Benefit           Cost
  ------------------ ----------------- --------------------
  Fan-Out on Write   Fast reads        Expensive writes
  Fan-Out on Read    Cheap writes      Slower reads
  Redis              Low latency       Memory cost
  CDN                Global delivery   Cache invalidation
  Hybrid Strategy    Balanced          Higher complexity

------------------------------------------------------------------------

# Interview Walkthrough

A strong answer should:

1.  Clarify read/write ratio.
2.  Separate feed metadata from media.
3.  Introduce Redis.
4.  Discuss fan-out strategies.
5.  Explain celebrity optimization.
6.  Use CDN for media.
7.  Identify bottlenecks.
8.  Discuss trade-offs and consistency.

------------------------------------------------------------------------

# Common Mistakes

-   Using only fan-out on write.
-   Ignoring celebrity users.
-   Serving images from origin.
-   Ranking inside the database.
-   Keeping entire feeds permanently in Redis.

------------------------------------------------------------------------

# Memory Trick

**Posts are created once.**

**Feeds are read millions of times.**

Optimize for reads.

------------------------------------------------------------------------

# Dependency Map

``` text
Distributed Caching
        │
        ▼
Facebook News Feed
        │
        ├── Redis
        ├── CDN
        ├── Feed Workers
        ├── Kafka
        ├── Ranking
        └── Fan-Out
```

------------------------------------------------------------------------

# Coming Next

**Part 8 -- Chapter 6 Revision**

Includes:

-   Cheat Sheet
-   Flashcards
-   Mind Map
-   Common Mistakes
-   Interview Questions
-   Design Exercises
-   Cross-topic Dependency Map
