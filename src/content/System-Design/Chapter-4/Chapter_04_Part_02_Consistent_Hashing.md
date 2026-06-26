# The Ultimate System Design Handbook

# Chapter 4 -- Database Scaling

# Part 2 -- Consistent Hashing

> **Theme:** Traditional hashing works well until the number of servers
> changes. Consistent hashing was invented to minimize data movement
> when nodes are added or removed.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand why modulo hashing fails.
-   Learn how consistent hashing works.
-   Understand the hash ring.
-   Learn about virtual nodes.
-   See production use cases in caching, databases, and CDNs.

------------------------------------------------------------------------

# Story -- Lockers in a Train Station

Imagine 1,000 passengers storing luggage in 10 lockers.

Each passenger uses:

``` text
Locker = Ticket Number % 10
```

Now the station adds one more locker.

The rule becomes:

``` text
Ticket Number % 11
```

Almost every passenger must move luggage to a different locker.

This creates chaos.

Traditional hashing behaves exactly like this.

------------------------------------------------------------------------

# The Problem with Modulo Hashing

Suppose we distribute users across 4 servers:

``` text
Server = hash(user_id) % 4
```

Adding a fifth server changes the formula:

``` text
Server = hash(user_id) % 5
```

Result:

-   Most keys move.
-   Cache misses increase.
-   Massive data migration occurs.

For large systems, this is unacceptable.

------------------------------------------------------------------------

# What is Consistent Hashing?

Consistent hashing places both **servers** and **keys** on the same
logical hash ring.

Instead of recalculating every key when servers change, only keys near
the affected server move.

------------------------------------------------------------------------

# The Hash Ring

Imagine hash values arranged in a circle.

``` text
          0
     /         \
 900             100
 |                 |
 800             200
 |                 |
 700             300
     \         /
         500
```

Servers are placed on the ring using their hash values.

Keys are also hashed onto the ring.

Each key belongs to the **next server clockwise**.

------------------------------------------------------------------------

# Example

``` text
Ring

A -------- B -------- C

Key X

↓

Next clockwise server

↓

B
```

If Server B is removed:

``` text
Key X

↓

Server C
```

Only keys owned by B move.

Everything else remains unchanged.

------------------------------------------------------------------------

# Why It Scales Better

Traditional modulo hashing:

``` text
+1 Server

↓

Most keys move
```

Consistent hashing:

``` text
+1 Server

↓

Only nearby keys move
```

This dramatically reduces rebalancing.

------------------------------------------------------------------------

# Virtual Nodes (vNodes)

Real servers rarely have identical capacity.

Instead of placing one point per server on the ring, each physical
server owns multiple **virtual nodes**.

``` text
Server A

↓

A1
A2
A3

Server B

↓

B1
B2
B3
```

Advantages:

-   Better load distribution
-   Easier balancing
-   Smoother scaling
-   Less hotspot formation

Modern systems almost always use virtual nodes.

------------------------------------------------------------------------

# Adding a New Server

Before:

``` text
A ---- B ---- C
```

After adding D:

``` text
A ---- B ---- D ---- C
```

Only keys between B and C move to D.

No global reshuffling is required.

------------------------------------------------------------------------

# Removing a Server

If Server C fails:

``` text
A ---- B ---- C ---- D

↓

A ---- B ---- D
```

Only C's keys move to D.

This enables graceful recovery from failures.

------------------------------------------------------------------------

# Production Use Cases

## Distributed Caches

Redis Cluster and Memcached-based systems use consistent hashing to
distribute keys.

## Distributed Databases

Some distributed databases use consistent hashing to partition data
across nodes.

## CDNs

Edge servers can use consistent hashing to route content efficiently
while minimizing cache invalidation.

------------------------------------------------------------------------

# Advantages

-   Minimal data movement
-   Easy horizontal scaling
-   Better fault tolerance
-   Improved cache hit ratios
-   Reduced operational cost during expansion

------------------------------------------------------------------------

# Disadvantages

-   More complex than modulo hashing
-   Requires metadata about the ring
-   Poor implementation can still create hotspots

------------------------------------------------------------------------

# Interview Callout

**Question**

"Why is consistent hashing preferred over `hash(key) % N`?"

Good answer:

> "Because adding or removing a server only redistributes a small subset
> of keys instead of forcing nearly all keys to move."

------------------------------------------------------------------------

# Common Mistakes

-   Forgetting the clockwise lookup rule.
-   Ignoring virtual nodes.
-   Assuming consistent hashing guarantees perfect balance.
-   Confusing replication with consistent hashing.

------------------------------------------------------------------------

# Memory Trick

Remember:

**Modulo Hashing = Move Almost Everything**

**Consistent Hashing = Move Only What's Necessary**

------------------------------------------------------------------------

# Quick Summary

  Concept            Purpose
  ------------------ ---------------------------------------
  Hash Ring          Logical placement of keys and servers
  Clockwise Lookup   Finds owning server
  Virtual Nodes      Improve balance
  Rebalancing        Minimal key movement

------------------------------------------------------------------------

# Dependency Map

``` text
Database Scaling
      │
      ▼
Consistent Hashing
      │
      ├── Sharding
      ├── Redis Cluster
      ├── Distributed Cache
      ├── CDN
      └── Fault Tolerance
```

------------------------------------------------------------------------

# Coming Next

**Part 3 -- Read/Write Separation (Primary--Replica Pattern)**

Topics:

-   Primary database
-   Read replicas
-   Write routing
-   Replication lag
-   Scaling read-heavy systems
