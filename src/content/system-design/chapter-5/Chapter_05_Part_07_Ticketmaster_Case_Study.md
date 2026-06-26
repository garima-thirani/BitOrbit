# The Ultimate System Design Handbook

# Chapter 5 -- Caching Fundamentals

# Part 7 -- Case Study: Ticketmaster

> **Theme:** Ticket booking systems experience some of the highest
> traffic spikes on the internet. Millions of users compete for a
> limited number of seats within seconds. This case study shows how
> caching, queues, and distributed system design work together to
> survive flash sales.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Design a scalable ticket booking architecture.
-   Apply caching correctly.
-   Prevent overselling.
-   Handle flash-sale traffic.
-   Explain trade-offs in a system design interview.

------------------------------------------------------------------------

# Problem Statement

Design a backend similar to Ticketmaster or BookMyShow where users can:

-   Browse events
-   View seat maps
-   Reserve seats
-   Complete payment
-   Receive digital tickets

Peak traffic occurs when a popular concert goes live.

------------------------------------------------------------------------

# Functional Requirements

-   Event discovery
-   Seat availability
-   Reservation
-   Payment
-   Booking confirmation
-   Ticket delivery

------------------------------------------------------------------------

# Non-Functional Requirements

-   High availability
-   Low latency
-   Strong consistency for seat inventory
-   Fault tolerance
-   Burst traffic handling

------------------------------------------------------------------------

# High-Level Architecture

``` text
          Users
            │
      CDN / Load Balancer
            │
       API Servers
      ┌─────┼─────┐
      ▼     ▼     ▼
   Redis  Queue  Search
      │
Primary Database
      │
 Read Replicas
```

------------------------------------------------------------------------

# What Should Be Cached?

Cache aggressively:

-   Event details
-   Venue information
-   Artist pages
-   Frequently viewed seat maps (read-only)
-   Trending events

Avoid caching:

-   Final seat availability
-   Reservation state
-   Payment status

These require fresh data.

------------------------------------------------------------------------

# Booking Flow

``` text
Browse Event
      │
Redis Cache
      │
Select Seat
      │
Reservation Service
      │
Primary Database
      │
Payment
      │
Ticket Issued
```

Only the reservation service modifies inventory.

------------------------------------------------------------------------

# Preventing Overselling

Never trust only the cache.

Reservation flow:

1.  Check cached event metadata.
2.  Lock seat in database.
3.  Start reservation timer.
4.  Complete payment.
5.  Confirm booking.
6.  Release seat if payment fails or times out.

Inventory is always controlled by the authoritative datastore.

------------------------------------------------------------------------

# Flash Sale Protection

## Waiting Room

Users enter a virtual queue.

``` text
1,000,000 Users
       │
 Waiting Queue
       │
 10,000 Active Users
```

This protects downstream systems.

------------------------------------------------------------------------

## Queue-Based Booking

Booking requests are processed asynchronously.

Benefits:

-   Smooth traffic spikes
-   Prevent database overload
-   Better fairness

------------------------------------------------------------------------

## Caching Strategy

Redis stores:

-   Event metadata
-   Popular searches
-   Venue details
-   Artist information

Database stores:

-   Seat inventory
-   Reservations
-   Payments

------------------------------------------------------------------------

# Scaling Strategy

As traffic increases:

-   Add API servers
-   Scale Redis cluster
-   Add read replicas
-   Partition reservations
-   Increase queue consumers

Each layer scales independently.

------------------------------------------------------------------------

# Bottlenecks

Potential bottlenecks:

-   Hot events
-   Seat locking
-   Payment gateway latency
-   Cache stampede
-   Database lock contention

Monitor each independently.

------------------------------------------------------------------------

# Trade-offs

  Decision        Benefit             Cost
  --------------- ------------------- ----------------------
  Redis           Fast reads          Cache invalidation
  Queue           Handles bursts      Increased complexity
  DB Locking      Prevents oversell   Lower concurrency
  Read Replicas   Read scaling        Replication lag

------------------------------------------------------------------------

# Interview Walkthrough

A strong answer should:

1.  Clarify traffic expectations.
2.  Separate browse and booking paths.
3.  Cache read-heavy metadata.
4.  Protect inventory with strong consistency.
5.  Introduce queues for flash sales.
6.  Discuss locking and timeouts.
7.  Explain scaling and bottlenecks.
8.  Cover failure handling.

------------------------------------------------------------------------

# Common Mistakes

-   Caching live inventory.
-   Allowing multiple writers to reserve the same seat.
-   Ignoring payment failures.
-   No reservation timeout.
-   No queue during flash sales.

------------------------------------------------------------------------

# Memory Trick

**Cache the catalog.**

**Lock the inventory.**

**Queue the crowd.**

------------------------------------------------------------------------

# Dependency Map

``` text
Caching
   │
   ▼
Ticketmaster
   │
   ├── Redis
   ├── Queue
   ├── DB Locks
   ├── Read Replicas
   └── Rate Limiting
```

------------------------------------------------------------------------

# Coming Next

**Part 8 -- Chapter 5 Revision**

Includes:

-   Cheat Sheet
-   Flashcards
-   Mind Map
-   Common Mistakes
-   Interview Questions
-   Design Exercises
-   Cross-topic Dependency Map
