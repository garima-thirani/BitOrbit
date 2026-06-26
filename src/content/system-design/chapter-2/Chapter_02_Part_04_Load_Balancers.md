# The Ultimate System Design Handbook

# Chapter 2 -- Scalability Fundamentals

# Part 4 -- Load Balancers

> **Theme:** A load balancer is the traffic police of distributed
> systems. It ensures that no single server becomes overwhelmed while
> others sit idle.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand why load balancers exist.
-   Learn Layer 4 vs Layer 7 load balancing.
-   Compare Round Robin, Least Connections, and IP Hash.
-   Understand health checks and failover.
-   Explain load balancing in interviews with confidence.

------------------------------------------------------------------------

# Story -- The Supermarket Checkout

Imagine a supermarket with six checkout counters.

If every customer joins Counter 1, while Counters 2--6 remain empty, the
queue becomes enormous.

Instead, a staff member directs each customer to an appropriate counter.

That person is acting as a **load balancer**.

The same idea applies to servers.

Without a load balancer, thousands of users may accidentally hit the
same server while others remain idle.

------------------------------------------------------------------------

# What Is a Load Balancer?

## Intuition

A load balancer sits between clients and servers.

Instead of clients choosing a server, they send requests to the load
balancer.

The load balancer decides **which server should handle each request**.

------------------------------------------------------------------------

# Formal Definition

A load balancer is a networking component that distributes incoming
requests across multiple backend servers to improve scalability,
availability, and fault tolerance.

------------------------------------------------------------------------

# Basic Architecture

``` text
              Users
                │
                ▼
        +----------------+
        | Load Balancer  |
        +----------------+
          │     │      │
      ┌───┘     │      └───┐
      ▼         ▼          ▼
  Server A   Server B   Server C
```

If Server B fails, requests are automatically routed to the remaining
healthy servers.

------------------------------------------------------------------------

# Why Do We Need Load Balancers?

Without a load balancer:

``` text
Users
  │
  ▼
Server A  ❌ Overloaded

Server B  😴 Idle

Server C  😴 Idle
```

With a load balancer:

``` text
Users
  │
  ▼
Load Balancer
  │
  ├──► Server A
  ├──► Server B
  └──► Server C
```

Traffic is spread evenly.

------------------------------------------------------------------------

# Layer 4 vs Layer 7

## Layer 4 (Transport Layer)

Works using IP addresses and TCP/UDP ports.

Advantages:

-   Faster
-   Lower latency
-   Less processing

Use when application content is irrelevant.

Examples:

-   AWS Network Load Balancer
-   HAProxy (TCP mode)

------------------------------------------------------------------------

## Layer 7 (Application Layer)

Understands HTTP.

Can inspect:

-   URL
-   Headers
-   Cookies
-   Hostnames
-   HTTP Methods

Allows intelligent routing.

Examples:

    /images  → Image Service

    /api     → API Service

    /admin   → Admin Service

Examples:

-   AWS Application Load Balancer
-   NGINX
-   Envoy

------------------------------------------------------------------------

# Load Balancing Algorithms

## 1. Round Robin

Requests rotate sequentially.

``` text
1 → A

2 → B

3 → C

4 → A

5 → B
```

Advantages:

-   Simple
-   Fair (if servers are equal)

Disadvantages:

-   Ignores server load.

------------------------------------------------------------------------

## 2. Least Connections

Send traffic to the server with the fewest active connections.

Example:

    A = 120 connections

    B = 20 connections

    C = 5 connections

    Next request → C

Better when requests have varying durations.

------------------------------------------------------------------------

## 3. IP Hash

The client's IP determines the backend server.

Useful when some session affinity is desired.

Example:

    192.168.x.x

    ↓

    Always Server B

Be careful: uneven IP distributions can create hotspots.

------------------------------------------------------------------------

# Health Checks

A load balancer continuously verifies backend health.

Typical checks:

-   HTTP 200 on /health
-   TCP connection
-   Custom health endpoint

If a server fails:

``` text
Server B ❌

↓

Removed from rotation

↓

Traffic → A and C
```

This enables automatic failover.

------------------------------------------------------------------------

# Production Example

A typical web application:

``` text
           Internet
               │
               ▼
      Application Load Balancer
               │
      ┌────────┼────────┐
      ▼        ▼        ▼
 API-1      API-2     API-3
      │        │        │
      └────────┼────────┘
               ▼
           Redis / DB
```

API servers remain stateless, allowing the load balancer to freely
distribute traffic.

------------------------------------------------------------------------

# Interview Callout

**Question**

"Why can't clients connect directly to servers?"

Good answer:

"A load balancer provides a single entry point, distributes requests,
removes failed servers automatically, and enables horizontal scaling
without clients knowing backend topology."

------------------------------------------------------------------------

# Common Mistakes

-   Assuming load balancers improve application logic.
-   Ignoring health checks.
-   Using Round Robin when workloads are highly uneven.
-   Forgetting that stateless services work best behind load balancers.

------------------------------------------------------------------------

# Memory Trick

Think:

**One Door → Many Rooms**

The load balancer is the front door.

Users don't choose the room.

The receptionist does.

------------------------------------------------------------------------

# Dependency Map

``` text
Horizontal Scaling
        │
        ▼
 Load Balancer
        │
        ├── Stateless Services
        ├── Auto Scaling
        ├── Health Checks
        ├── Session Management
        └── Traffic Routing
```

------------------------------------------------------------------------

# Coming Next

**Part 5 -- Sticky Sessions**

Topics:

-   Session Affinity
-   Why Sticky Sessions Exist
-   Problems They Introduce
-   Alternatives
-   JWT vs Server Sessions
-   Production Trade-offs

## Interactive Illustration

```illustration
loadbalancer
```

Above is an interactive Round-Robin load balancer simulation.
