# The Ultimate System Design Handbook

# Chapter 6 -- Distributed Caching & CDN Deep Dive

# Part 3 -- CDN Fundamentals & Cache-Control Headers

> **Theme:** Users should download data from the nearest server---not
> necessarily your origin server. A Content Delivery Network (CDN)
> brings content physically closer to users, reducing latency, bandwidth
> costs, and origin load.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand what a CDN is.
-   Learn how CDN edge servers work.
-   Understand Cache-Control, ETag, and Vary headers.
-   Learn browser vs CDN caching.
-   Design CDN architectures for production systems.

------------------------------------------------------------------------

# Story -- Local Bookstores

Imagine a publisher with one warehouse in New York.

Customers from Tokyo, London, Sydney, and São Paulo all order books.

Shipping every book from New York is slow and expensive.

Instead, the publisher stocks copies in local bookstores around the
world.

Customers visit the nearest bookstore instead of the central warehouse.

A CDN works exactly like those local bookstores.

------------------------------------------------------------------------

# Why CDNs Exist

Without a CDN:

``` text
User (India)
      │
      ▼
Origin Server (USA)
```

Every request crosses oceans.

With a CDN:

``` text
User
 │
 ▼
Nearest Edge Server
 │
 ├── Cache Hit → Return
 └── Cache Miss → Origin
```

Latency decreases dramatically.

------------------------------------------------------------------------

# What is a CDN?

A CDN is a globally distributed network of edge servers that cache and
serve static or cacheable content closer to end users.

Typical content includes:

-   Images
-   CSS
-   JavaScript
-   Videos
-   Fonts
-   Software downloads
-   API responses (when cacheable)

------------------------------------------------------------------------

# CDN Architecture

``` text
                Origin
                   │
        ┌──────────┼──────────┐
        ▼          ▼          ▼
     Edge US    Edge EU    Edge APAC
        │          │          │
      Users      Users      Users
```

Each edge caches popular content independently.

------------------------------------------------------------------------

# Cache-Control Header

`Cache-Control` tells browsers and CDNs how content should be cached.

Example:

``` http
Cache-Control: public, max-age=3600
```

Meaning:

-   Publicly cacheable
-   Valid for one hour

Common directives:

  Directive   Meaning
  ----------- -------------------------
  max-age     Freshness lifetime
  public      Shared caches may store
  private     Browser only
  no-cache    Revalidate before use
  no-store    Never cache
  immutable   Content will not change

------------------------------------------------------------------------

# ETag

An **ETag** is a unique identifier representing a specific version of a
resource.

Example:

``` http
ETag: "a83f9d2"
```

Browser request:

``` http
If-None-Match: "a83f9d2"
```

If unchanged:

``` http
304 Not Modified
```

No file download is required.

Benefits:

-   Saves bandwidth
-   Faster page loads
-   Reduces origin traffic

------------------------------------------------------------------------

# Last-Modified

Another validation mechanism:

``` http
Last-Modified:
Tue, 15 Jul 2025 10:00 GMT
```

Browser:

``` http
If-Modified-Since:
Tue, 15 Jul 2025 10:00 GMT
```

If unchanged:

    304 Not Modified

ETags are generally more precise than timestamps.

------------------------------------------------------------------------

# Vary Header

Different users may receive different responses.

Example:

``` http
Vary: Accept-Encoding
```

Meaning:

-   Store separate cache entries for gzip and brotli.

Other examples:

-   Accept-Language
-   User-Agent (used carefully)
-   Origin

Incorrect `Vary` usage can destroy cache hit ratios.

------------------------------------------------------------------------

# Browser Cache vs CDN Cache

``` text
Browser
   │
   ▼
CDN Edge
   │
   ▼
Origin
```

Browser cache reduces repeat downloads for one user.

CDN cache reduces origin traffic for many users.

------------------------------------------------------------------------

# Cache Hit Flow

``` text
Client
   │
   ▼
CDN Edge
   │
Hit
   │
Return Response
```

Origin is never contacted.

------------------------------------------------------------------------

# Cache Miss Flow

``` text
Client
   │
   ▼
CDN Edge
   │
Miss
   ▼
Origin
   │
Edge Stores Copy
   │
Return Response
```

Future requests become cache hits.

------------------------------------------------------------------------

# Production Example

A streaming platform serves:

-   Images
-   Thumbnails
-   Video manifests
-   JavaScript bundles

Static assets are cached at edge locations worldwide.

Only personalized API calls reach origin servers.

------------------------------------------------------------------------

# Best Practices

-   Cache immutable assets aggressively.
-   Use versioned filenames.
-   Compress content.
-   Configure appropriate TTLs.
-   Avoid caching authenticated responses unless designed carefully.

------------------------------------------------------------------------

# Interview Callout

**Question**

"Why use both browser caching and a CDN?"

Good answer:

> Browser caching prevents repeat downloads for a single user, while a
> CDN reduces latency and origin load for all users globally.

------------------------------------------------------------------------

# Common Mistakes

-   Forgetting Cache-Control headers.
-   Caching personalized responses.
-   Overusing `Vary`.
-   Very short TTLs for static assets.
-   No cache-busting strategy.

------------------------------------------------------------------------

# Memory Trick

**Browser = Me**

**CDN = Everyone Nearby**

**Origin = Source of Truth**

------------------------------------------------------------------------

# Quick Summary

  Header          Purpose
  --------------- -------------------------
  Cache-Control   Caching policy
  ETag            Version validation
  Last-Modified   Timestamp validation
  Vary            Multiple cache variants

------------------------------------------------------------------------

# Dependency Map

``` text
Distributed Caching
        │
        ▼
CDN
 │
 ├── Browser Cache
 ├── Edge Cache
 ├── Origin
 ├── Cache-Control
 ├── ETag
 └── Vary
```

------------------------------------------------------------------------

# Coming Next

**Part 4 -- Edge Caching & Latency Optimization**

Topics:

-   Points of Presence (PoPs)
-   Anycast routing
-   Dynamic content acceleration
-   Origin shielding
-   Global latency optimization
