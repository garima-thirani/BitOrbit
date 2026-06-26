# The Ultimate System Design Handbook

# Chapter 6 -- Distributed Caching & CDN Deep Dive

# Part 4 -- Edge Caching & Latency Optimization

> **Theme:** A CDN is not just a cache. Modern edge networks execute
> logic close to users, reduce round trips, protect origin servers, and
> make global applications feel local.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand edge caching and Points of Presence (PoPs).
-   Learn Anycast routing.
-   Explore origin shielding and dynamic acceleration.
-   Understand latency optimization techniques.
-   Explain edge architectures in interviews.

------------------------------------------------------------------------

# Story -- Neighborhood Kitchens

A food delivery company originally cooks every meal in one central
kitchen.

Customers across the country wait hours.

Instead, it opens neighborhood kitchens.

Orders are prepared closer to customers, reducing delivery time
dramatically.

Edge servers play the same role for internet traffic.

------------------------------------------------------------------------

# Why Edge Caching?

Without an edge:

``` text
User (Tokyo)
    │
    ▼
Origin (Virginia)
```

Every request crosses continents.

With edge caching:

``` text
User
 │
 ▼
Nearest Edge
 │
Hit → Response
Miss → Origin
```

Most requests never reach the origin.

------------------------------------------------------------------------

# Points of Presence (PoPs)

A **Point of Presence** is a physical edge location.

``` text
        Origin
          │
 ┌────────┼────────┐
 ▼        ▼        ▼
NYC      London   Singapore
 PoP       PoP       PoP
```

Each PoP caches popular content for nearby users.

------------------------------------------------------------------------

# Anycast Routing

Instead of choosing one fixed server, the Internet routes users to the
**nearest healthy edge** using Anycast.

``` text
Client

↓

Nearest PoP Selected Automatically
```

Benefits:

-   Lower latency
-   Automatic failover
-   Better resilience

------------------------------------------------------------------------

# Dynamic Content Acceleration

Not everything can be cached.

Examples:

-   Checkout
-   Login
-   Payments

CDNs optimize these requests by:

-   Persistent origin connections
-   Optimized routing
-   TCP/TLS reuse
-   HTTP/2 or HTTP/3

Even uncached traffic becomes faster.

------------------------------------------------------------------------

# Origin Shield

Large CDNs introduce an extra cache layer.

``` text
Users
  │
Edge PoPs
  │
Origin Shield
  │
Origin
```

If multiple PoPs miss simultaneously, only the shield contacts the
origin.

Benefits:

-   Reduced origin load
-   Better cache efficiency
-   Fewer duplicate requests

------------------------------------------------------------------------

# Static vs Dynamic Content

  Content           Edge Cache?
  ----------------- -------------
  Images            ✅
  CSS               ✅
  JS                ✅
  Videos            ✅
  Product Catalog   Often
  Login Response    Usually No
  Payment           No

------------------------------------------------------------------------

# Latency Optimization Techniques

-   Compression (Brotli/Gzip)
-   HTTP Keep-Alive
-   HTTP/2 Multiplexing
-   HTTP/3 (QUIC)
-   DNS optimization
-   Image optimization
-   Edge redirects
-   Prefetching

Each saves milliseconds that add up globally.

------------------------------------------------------------------------

# Production Example

A global streaming service serves:

-   Thumbnails
-   Video manifests
-   JavaScript bundles
-   Subtitle files

These are cached at hundreds of PoPs.

Only personalized recommendations reach origin services.

------------------------------------------------------------------------

# Best Practices

-   Cache immutable assets aggressively.
-   Use versioned asset names.
-   Enable compression.
-   Configure origin shielding.
-   Separate static and dynamic paths.
-   Monitor cache hit ratio by region.

------------------------------------------------------------------------

# Interview Callout

**Question**

"Why is origin shielding useful?"

Good answer:

> It prevents multiple edge locations from simultaneously requesting the
> same uncached object, reducing origin traffic and improving cache
> efficiency.

------------------------------------------------------------------------

# Common Mistakes

-   Treating every API as cacheable.
-   Ignoring regional latency.
-   Forgetting cache invalidation.
-   No cache-busting strategy.
-   Sending all traffic directly to origin.

------------------------------------------------------------------------

# Memory Trick

**Edge = Near Users**

**Origin = Truth**

**Shield = Protector**

------------------------------------------------------------------------

# Quick Summary

  Concept                Purpose
  ---------------------- -------------------------
  PoP                    Local edge location
  Anycast                Route to nearest edge
  Origin Shield          Protect origin
  Dynamic Acceleration   Faster uncached traffic

------------------------------------------------------------------------

# Dependency Map

``` text
CDN
 │
 ├── PoPs
 ├── Anycast
 ├── Edge Cache
 ├── Origin Shield
 └── Dynamic Acceleration
```

------------------------------------------------------------------------

# Coming Next

**Part 5 -- Multi-Tier Caching (L1/L2/L3) & Geo-Distributed
Replication**

Topics:

-   L1/L2/L3 caches
-   Cache hierarchy
-   Geo-replication
-   Regional consistency
-   Multi-layer performance optimization
