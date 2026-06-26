# The Ultimate System Design Handbook

# Chapter 2 -- Scalability Fundamentals

# Part 3 -- Stateless Architecture

> **Theme:** A system that remembers every user on one machine is
> difficult to scale. A stateless system treats every request as a new
> conversation.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand what application state is.
-   Differentiate stateful and stateless services.
-   Explain why stateless services scale horizontally.
-   Understand sessions, shared state, and external session stores.
-   Answer interview questions about stateless architectures.

------------------------------------------------------------------------

# Story -- The Reception Desk

Imagine a hotel with a single receptionist.

Every guest always speaks to the same receptionist because only that
person remembers their room number, preferences, and payment status.

Everything works until the hotel becomes popular.

Now five receptionists are hired.

A guest walks to a different receptionist.

The new receptionist knows nothing.

The guest has to repeat everything.

The hotel has a problem.

Software applications face the same issue.

If one server stores user-specific information in its own memory,
another server cannot continue that user's request.

------------------------------------------------------------------------

# What Is State?

State is any information remembered between requests.

Examples:

-   Logged-in user session
-   Shopping cart
-   Authentication token stored in memory
-   User preferences
-   Temporary workflow progress

If this information exists only inside one server, that server becomes
special.

Special servers are difficult to scale.

------------------------------------------------------------------------

# Stateless vs Stateful

## Stateful Service

A stateful service remembers previous interactions.

``` text
User
  │
  ▼
Server A
(Session Stored Here)
```

If Server A fails, the session is lost.

------------------------------------------------------------------------

## Stateless Service

Every request contains everything needed.

``` text
User
  │
  ▼
Load Balancer
  │
 ┌──────┬──────┐
 ▼      ▼      ▼
A      B      C

All servers can process the request.
```

No server owns the user.

------------------------------------------------------------------------

# Formal Definition

A **stateless service** does not store client-specific session
information locally between requests.

Each request is self-contained and can be processed by any healthy
server.

------------------------------------------------------------------------

# Why Stateless Systems Scale

Imagine ten API servers.

If every request can go to any server:

-   Traffic is evenly distributed.
-   Failed servers are easily replaced.
-   Auto scaling becomes simple.
-   Deployments become safer.

This is why most modern REST APIs are designed to be stateless.

------------------------------------------------------------------------

# Where Does the State Go?

The state does not disappear.

It moves to shared infrastructure.

Common approaches:

-   Redis
-   Database
-   Distributed cache
-   JWT tokens

Example:

``` text
Client
   │
   ▼
API Server
   │
   ▼
Redis Session Store
```

Now every server reads the same session.

------------------------------------------------------------------------

# Sessions

Traditional web applications often store sessions in server memory.

Problem:

``` text
User
  │
  ▼
Server A

Session Exists

User
  │
  ▼
Server B

Session Missing
```

This causes login failures after load balancing.

Solutions:

-   Shared session store
-   Sticky sessions (temporary)
-   Token-based authentication (JWT)

------------------------------------------------------------------------

# Production Example

Netflix runs thousands of application instances.

Requests can reach any instance.

User-specific state is stored externally rather than inside individual
servers, allowing failed instances to be replaced without affecting
active users.

------------------------------------------------------------------------

# Advantages

-   Easy horizontal scaling
-   Better fault tolerance
-   Simpler deployments
-   Easier auto scaling
-   Better resource utilization

------------------------------------------------------------------------

# Disadvantages

-   Additional network calls to shared storage
-   External session store becomes critical
-   Slightly higher latency

------------------------------------------------------------------------

# Interview Callout

**Question**

"Why are REST APIs generally stateless?"

Good answer:

"Stateless APIs allow any request to be served by any instance,
simplifying load balancing, failover, deployment, and horizontal
scaling."

------------------------------------------------------------------------

# Common Mistakes

-   Keeping user sessions in local memory.
-   Assuming stateless means no data exists.
-   Forgetting external session storage.
-   Confusing database persistence with application state.

------------------------------------------------------------------------

# Memory Trick

Remember:

**State belongs to the data layer, not the application layer.**

------------------------------------------------------------------------

# Dependency Map

``` text
Horizontal Scaling
        │
        ▼
 Stateless Services
        │
        ├── Load Balancer
        ├── Auto Scaling
        ├── Redis
        ├── JWT
        └── Session Management
```

------------------------------------------------------------------------

# Coming Next

**Part 4 -- Load Balancers**

We'll learn:

-   Why load balancers exist
-   Layer 4 vs Layer 7
-   Round Robin
-   Least Connections
-   IP Hash
-   Health Checks
-   Real production architectures
