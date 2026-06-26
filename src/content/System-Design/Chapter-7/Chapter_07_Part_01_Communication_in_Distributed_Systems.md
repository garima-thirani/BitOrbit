# The Ultimate System Design Handbook

# Chapter 7 -- Messaging Systems

# Part 1 -- Communication in Distributed Systems: Why Messaging Exists

> **"Distributed systems are not difficult because computers are slow.
> They are difficult because computers must communicate."**

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will understand:

-   Why distributed systems need communication
-   Why local function calls don't scale across machines
-   The challenges introduced by network communication
-   Tight vs loose coupling
-   Why message brokers were invented
-   How modern companies communicate between services

------------------------------------------------------------------------

# Story -- The Growing Restaurant

Imagine a restaurant with one chef and one waiter.

The waiter walks to the chef and gives every order directly.

Everything works perfectly.

Now the restaurant grows to hundreds of waiters and dozens of chefs.

Everyone starts shouting orders.

Some are duplicated. Some are lost. Some chefs stay idle while others
are overwhelmed.

The owner introduces an order queue.

Every waiter drops an order ticket into the queue.

Chefs simply pick the next ticket whenever they are free.

The restaurant becomes organized again.

A **message broker** plays exactly this role inside distributed systems.

------------------------------------------------------------------------

# Why Communication Exists

A single machine eventually reaches limits in CPU, memory, storage and
network.

To support millions of users we split applications into multiple
services.

``` text
Client
  │
  ▼
API Gateway
  │
  ├── User Service
  ├── Order Service
  ├── Payment Service
  ├── Inventory Service
  └── Notification Service
```

Once services are separated, they must communicate reliably.

------------------------------------------------------------------------

# From Function Calls to Network Calls

Inside a monolith:

``` java
paymentService.pay(order);
```

This is a local function call.

Across services the same operation becomes:

``` text
Order Service
      │
   Internet
      │
Payment Service
```

Now engineers must deal with:

-   Serialization
-   DNS
-   TCP
-   TLS
-   Timeouts
-   Retries
-   Authentication
-   Monitoring
-   Partial failures

A simple function call becomes distributed systems engineering.

------------------------------------------------------------------------

# Tight vs Loose Coupling

## Tight Coupling

Two services depend heavily on each other.

If one fails, the other often fails too.

Problems:

-   Cascading failures
-   Difficult deployments
-   Poor scalability

## Loose Coupling

Services communicate through contracts or events.

Each service evolves independently.

Loose coupling is a primary goal of distributed architecture.

------------------------------------------------------------------------

# Why Direct Communication Breaks Down

Imagine an Order Service calling:

-   Payment
-   Inventory
-   Email
-   Shipping
-   Analytics
-   Fraud Detection
-   Recommendations

Every request increases latency and creates more failure points.

Instead, many systems publish an event:

``` text
Order Created
      │
      ▼
 Message Broker
      │
 ├── Inventory
 ├── Email
 ├── Shipping
 ├── Analytics
 ├── Fraud
 └── Recommendations
```

One event powers many workflows.

------------------------------------------------------------------------

# Production Example

Amazon's checkout confirms payment quickly, then asynchronously triggers
inventory updates, shipment creation, customer emails, recommendation
engines and analytics.

Uber confirms ride creation immediately while downstream systems handle
receipts, ML pipelines and reporting independently.

------------------------------------------------------------------------

# Key Takeaways

-   Communication is the foundation of distributed systems.
-   Network calls are fundamentally different from local function calls.
-   Networks introduce latency and failures.
-   Loose coupling improves resilience.
-   Messaging exists to decouple producers from consumers.

------------------------------------------------------------------------

# Memory Trick

``` text
Function Call
      │
      ▼
Network Call
      │
      ▼
Communication Problems
      │
      ▼
Message Broker
```

------------------------------------------------------------------------

# Interview Questions

1.  Why is communication difficult in distributed systems?
2.  Why are network calls less reliable than local function calls?
3.  Explain tight coupling with an example.
4.  Why do message brokers exist?
5.  How does Amazon benefit from asynchronous communication?

------------------------------------------------------------------------

# Next Part

**Chapter 7 -- Part 2: Synchronous Communication**

Topics:

-   Request--Response
-   REST vs gRPC
-   Blocking vs Non-blocking
-   Timeouts
-   Retries
-   Failure propagation
