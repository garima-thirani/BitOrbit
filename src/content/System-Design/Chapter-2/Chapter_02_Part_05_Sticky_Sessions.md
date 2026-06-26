# The Ultimate System Design Handbook

# Chapter 2 -- Scalability Fundamentals

# Part 5 -- Sticky Sessions & Session Affinity

> **Theme:** Sticky sessions solve one problem but create several new
> ones. Modern distributed systems try to eliminate the need for them.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand what sticky sessions are.
-   Learn why they were introduced.
-   Identify their advantages and disadvantages.
-   Understand session affinity techniques.
-   Learn modern alternatives such as Redis-backed sessions and JWTs.

------------------------------------------------------------------------

# Story -- Returning to the Same Banker

Imagine you visit a bank every week.

Only one employee knows your paperwork, preferences, and history.

Whenever you arrive, the receptionist always sends you to the same
employee.

Initially, this seems convenient.

Now imagine that employee is sick.

Nobody else knows your case.

Your work stops.

This is exactly how sticky sessions behave.

------------------------------------------------------------------------

# What Is a Sticky Session?

Normally, a load balancer can send any request to any server.

With sticky sessions, once a client is assigned to a server, future
requests from that client continue going to the same server.

``` text
Client A
   │
   ▼
Load Balancer
   │
   └────────► Server A

Future Requests

Client A
   │
   ▼
Load Balancer
   │
   └────────► Server A
```

The server becomes responsible for maintaining that user's session.

------------------------------------------------------------------------

# Why Were Sticky Sessions Introduced?

Early web applications stored login sessions in server memory.

Example:

``` text
Server A

Memory
 └── User Session
```

If the next request reached Server B, the session didn't exist.

The user appeared logged out.

Sticky sessions ensured every request returned to the same machine.

------------------------------------------------------------------------

# Advantages

-   Simple to implement.
-   No shared session store required.
-   Legacy applications work without major changes.
-   Lower latency than querying an external session store.

------------------------------------------------------------------------

# Problems with Sticky Sessions

## 1. Poor Load Distribution

One server may accumulate many active users while others remain
underutilized.

------------------------------------------------------------------------

## 2. Single Point of User State

If the assigned server crashes, the user's session is lost.

------------------------------------------------------------------------

## 3. Difficult Auto Scaling

Adding new servers does not immediately help because existing users
remain tied to old servers.

------------------------------------------------------------------------

## 4. Complicated Deployments

Rolling updates become harder because active sessions cannot easily move
between servers.

------------------------------------------------------------------------

# How Load Balancers Implement Sticky Sessions

Common techniques include:

-   Cookie-based affinity
-   Source IP hashing
-   Session identifiers

Cookie-based affinity is the most common in HTTP applications.

------------------------------------------------------------------------

# Modern Alternatives

## Shared Session Store

Move session data out of the application.

``` text
          Load Balancer
                │
      ┌─────────┼─────────┐
      ▼         ▼         ▼
 Server A   Server B   Server C
      │         │         │
      └─────────┼─────────┘
                ▼
        Redis Session Store
```

Any server can retrieve the user's session.

------------------------------------------------------------------------

## JWT (JSON Web Token)

Instead of storing sessions on the server, encode user identity in a
signed token.

The client sends the token with every request.

Benefits:

-   No server-side session memory.
-   Excellent horizontal scalability.
-   Works well with stateless services.

Trade-off:

JWTs require careful expiration and revocation strategies.

------------------------------------------------------------------------

# Choosing the Right Approach

  Approach          Best For
  ----------------- ----------------------------------
  Sticky Sessions   Legacy applications
  Redis Sessions    Traditional web apps
  JWT               Stateless APIs and microservices

------------------------------------------------------------------------

# Production Perspective

Modern cloud-native systems generally avoid sticky sessions.

Instead they combine:

-   Stateless application servers
-   Redis for shared state (if needed)
-   JWT for authentication
-   Load balancers with free request routing

This makes deployments, failover, and auto scaling significantly easier.

------------------------------------------------------------------------

# Interview Callout

**Question**

"Would you recommend sticky sessions for a new microservice
architecture?"

Good answer:

> "No. I would design stateless services and externalize session state
> using Redis or JWTs. Sticky sessions increase coupling and reduce
> flexibility."

------------------------------------------------------------------------

# Common Mistakes

-   Assuming sticky sessions improve scalability.
-   Keeping critical state only in application memory.
-   Forgetting failure scenarios.
-   Using sticky sessions as a long-term scaling strategy.

------------------------------------------------------------------------

# Memory Trick

Remember:

**Sticky Sessions = Sticky Problems**

Useful for legacy systems.

Avoid for modern distributed architectures whenever possible.

------------------------------------------------------------------------

# Dependency Map

``` text
Load Balancer
      │
      ▼
Sticky Sessions
      │
      ├── Session Stores
      ├── Redis
      ├── JWT
      ├── Stateless Services
      └── Auto Scaling
```

------------------------------------------------------------------------

# Coming Next

**Part 6 -- Auto Scaling**

Topics:

-   Why auto scaling exists
-   Reactive vs predictive scaling
-   Scaling policies
-   Metrics-driven scaling
-   Production examples
-   Interview trade-offs
