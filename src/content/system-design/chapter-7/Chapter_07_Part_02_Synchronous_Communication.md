# The Ultimate System Design Handbook

# Chapter 7 -- Messaging Systems

# Part 2 -- Synchronous Communication

> **Theme:** Synchronous communication is the foundation of almost every
> backend system. Before learning queues and Kafka, you must understand
> why services call each other directly, why this model is simple, and
> where it begins to fail at scale.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand synchronous communication
-   Learn request-response architecture
-   Compare REST, RPC and gRPC at a high level
-   Understand blocking vs non-blocking
-   Learn timeouts and retries
-   Recognize cascading failures
-   Answer synchronous communication interview questions confidently

------------------------------------------------------------------------

# Story -- Calling Your Friend

Imagine you call your friend.

You dial the number and wait.

You cannot continue the conversation until they answer.

There are only a few possibilities:

-   They answer.
-   They reject the call.
-   They don't answer.
-   The network drops.

Your phone is occupied while waiting.

That is **synchronous communication**.

Computers behave the same way.

------------------------------------------------------------------------

# Definition

Synchronous communication is a communication model where the caller
sends a request and **waits** until the receiver finishes processing and
returns a response.

``` text
Client
   │
Request
   │
Service
   │
Processing
   │
Response
   │
Client Continues
```

The caller is blocked until a response or timeout occurs.

------------------------------------------------------------------------

# Why It Exists

Many business operations require an immediate answer.

Examples:

-   Login
-   Payment authorization
-   Password validation
-   Fetching a user profile
-   Checking account balance

The user cannot continue until the operation completes.

------------------------------------------------------------------------

# Internal Working

A typical synchronous HTTP request involves:

1.  DNS lookup
2.  TCP connection (or reuse)
3.  TLS handshake (HTTPS)
4.  HTTP request
5.  Business logic execution
6.  Database/cache calls
7.  HTTP response
8.  Client resumes

Even a "simple API call" performs many network operations.

------------------------------------------------------------------------

# REST vs RPC vs gRPC

  Technology   Transport            Best For           Notes
  ------------ -------------------- ------------------ -----------------------
  REST         HTTP/1.1 or HTTP/2   Public APIs        Human-readable JSON
  RPC          Various              Internal systems   Procedure-style calls
  gRPC         HTTP/2 + Protobuf    Microservices      Fast, strongly typed

REST is usually preferred for public APIs.

gRPC is common for low-latency internal service communication.

------------------------------------------------------------------------

# Blocking vs Non-Blocking

## Blocking

``` text
Send Request
     │
 Wait...
     │
 Receive Response
```

The thread cannot perform other work.

## Non-Blocking

``` text
Send Request
     │
Continue Other Work
     │
Handle Response Later
```

Non-blocking improves resource utilization but increases programming
complexity.

------------------------------------------------------------------------

# Failure Propagation

Consider this chain:

``` text
Client
  │
Order Service
  │
Payment Service
  │
Inventory Service
```

If the Payment Service slows down:

-   Order Service waits.
-   Client waits.
-   Threads become occupied.
-   Request queues grow.
-   Eventually the entire chain slows.

This is called **cascading failure**.

------------------------------------------------------------------------

# Timeouts

Never wait forever.

Every synchronous request should have a timeout.

Example:

``` text
Timeout = 2 seconds
```

If the service doesn't respond:

-   Fail fast
-   Retry (when safe)
-   Return an error
-   Fall back gracefully

------------------------------------------------------------------------

# Retries

Retries handle temporary failures.

Example:

``` text
Attempt 1 ❌

↓

Wait 100 ms

↓

Attempt 2 ✅
```

Use exponential backoff with jitter to avoid retry storms.

------------------------------------------------------------------------

# Advantages

-   Simple mental model
-   Easy debugging
-   Immediate feedback
-   Strong request-response semantics
-   Great for CRUD APIs

------------------------------------------------------------------------

# Disadvantages

-   Temporal coupling
-   Higher latency across chains
-   Cascading failures
-   Limited throughput
-   Blocking threads

------------------------------------------------------------------------

# Production Examples

## Amazon

Checkout calls payment synchronously because the customer needs an
immediate answer.

After payment succeeds, inventory updates and email notifications happen
asynchronously.

## Netflix

Playback authorization is synchronous.

Viewing analytics are asynchronous.

## Uber

Ride matching is synchronous.

Trip analytics and receipts are asynchronous.

------------------------------------------------------------------------

# Trade-offs

  Requirement     Synchronous?
  --------------- --------------
  Login           ✅
  Payment         ✅
  Email           ❌
  Analytics       ❌
  Notifications   ❌

------------------------------------------------------------------------

# Common Mistakes

-   Waiting indefinitely.
-   Calling too many downstream services in one request.
-   Missing timeout configuration.
-   Retrying non-idempotent operations.
-   Assuming synchronous APIs always scale.

------------------------------------------------------------------------

# Memory Trick

**Need an immediate answer?**

Use synchronous communication.

**Can it happen later?**

Consider asynchronous messaging.

------------------------------------------------------------------------

# Dependency Map

``` text
Communication
      │
      ├── Synchronous
      │      ├── REST
      │      ├── gRPC
      │      ├── Timeouts
      │      └── Retries
      │
      └── Asynchronous (Next Part)
```

------------------------------------------------------------------------

# Cheat Sheet

-   Caller waits for response.
-   Best for immediate user actions.
-   Configure timeouts.
-   Retry carefully.
-   Avoid long dependency chains.

------------------------------------------------------------------------

# Interview Questions & Solutions

## Question 1

### Question

When should you use synchronous communication?

### Interviewer is Testing

Whether you understand when immediate responses are required.

### Ideal Answer

Use synchronous communication when the client cannot proceed without an
immediate result, such as login, payment authorization, profile
retrieval, or account verification. It provides a simple
request-response model but should be avoided for long-running background
tasks.

------------------------------------------------------------------------

## Question 2

### Question

Why can synchronous systems experience cascading failures?

### Ideal Answer

Each service waits for downstream services. If one dependency becomes
slow or unavailable, upstream services accumulate waiting requests,
consuming threads and resources. This propagates latency and failures
throughout the system unless mitigated with timeouts, retries, and
circuit breakers.

------------------------------------------------------------------------

## Question 3

### Question

Why not make every operation synchronous?

### Ideal Answer

Many operations such as emails, analytics, notifications, and
recommendation updates do not require an immediate response. Making them
synchronous increases latency, reduces throughput, and tightly couples
services. These tasks are better handled asynchronously.

------------------------------------------------------------------------

# Design Exercise

Design the checkout flow for an e-commerce application.

Identify which operations should be synchronous and which should be
asynchronous. Justify every decision.

------------------------------------------------------------------------

# Next Part

**Chapter 7 -- Part 3: Asynchronous Communication**

Topics:

-   Event-driven systems
-   Producers & consumers
-   Queues
-   Fire-and-forget
-   Temporal decoupling
-   Throughput advantages
