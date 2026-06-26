# The Ultimate System Design Handbook

# Chapter 1 -- System Design Thinking & Requirement Analysis

# Part 5 -- API Contracts & Client--Server Architecture

> **Theme:** APIs are promises between systems. A well-designed
> architecture starts with clear contracts before code is written.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand what an API contract is.
-   Learn how clients and servers interact.
-   Design interview-quality REST APIs.
-   Understand idempotency, versioning, and error handling.
-   Connect API design to overall system architecture.

------------------------------------------------------------------------

# Story -- Ordering Food at a Restaurant

Imagine walking into a restaurant.

You don't walk into the kitchen and tell the chef how to cook.

Instead, you interact with the **menu**.

The menu is a contract.

It tells you: - What operations are available. - What inputs are
expected. - What outputs you will receive.

The kitchen can completely change how food is prepared without changing
the menu.

APIs work exactly the same way.

The client only knows the contract---not the implementation.

------------------------------------------------------------------------

# What Is an API?

## Intuition

An API (Application Programming Interface) is a communication agreement
between two software systems.

Think of it as a waiter between the customer and the kitchen.

The waiter hides all internal complexity.

------------------------------------------------------------------------

# Formal Definition

> An API is a well-defined interface that allows one software component
> to communicate with another through standardized requests and
> responses.

The important word is **interface**.

Interfaces reduce coupling.

------------------------------------------------------------------------

# What Is an API Contract?

An API contract specifies:

-   Endpoint
-   HTTP Method
-   Request parameters
-   Authentication
-   Validation rules
-   Response schema
-   Error codes

If either side breaks the contract, communication fails.

------------------------------------------------------------------------

# Example REST Contract

## Create Short URL

``` http
POST /v1/urls
```

Request

``` json
{
  "longUrl":"https://example.com/blog/system-design"
}
```

Success Response

``` json
{
  "id":"ab12CD",
  "shortUrl":"https://sho.rt/ab12CD"
}
```

Errors

  Status   Meaning
  -------- ----------------
  400      Bad Request
  401      Unauthorized
  409      Duplicate
  429      Rate Limited
  500      Internal Error

------------------------------------------------------------------------

# Why API Design Comes Before Architecture

Many engineers think architecture comes first.

In practice, APIs define service boundaries.

Example:

``` text
Client

↓

URL Service

↓

Analytics Service

↓

Database
```

Notice that services are discovered through responsibilities exposed by
APIs.

------------------------------------------------------------------------

# Client--Server Architecture

## Mental Model

``` text
Client
   │
   │ Request
   ▼
Server
   │
Business Logic
   │
Database
   │
Response
   ▼
Client
```

The client is responsible for presentation.

The server owns business logic and data.

------------------------------------------------------------------------

# Responsibilities

## Client

-   UI
-   User interaction
-   Input validation (basic)
-   Rendering

## Server

-   Authentication
-   Authorization
-   Business rules
-   Persistence
-   Security
-   Auditing

Never trust the client.

Always validate on the server.

------------------------------------------------------------------------

# Good API Design Principles

## 1. Resource-Oriented

Good

    GET /users/42

Bad

    GET /getUser?id=42

------------------------------------------------------------------------

## 2. Use Correct HTTP Methods

  Method   Purpose
  -------- ----------------
  GET      Read
  POST     Create
  PUT      Replace
  PATCH    Partial Update
  DELETE   Remove

------------------------------------------------------------------------

## 3. Idempotency

Calling the same request multiple times should not create inconsistent
state.

PUT is naturally idempotent.

POST usually is not.

Interviewers often ask:

"How would you prevent duplicate payment requests?"

This leads to idempotency keys.

------------------------------------------------------------------------

# API Versioning

Never break existing clients.

Common approaches:

-   `/v1/users`
-   Header versioning
-   Content negotiation

For interviews, URL versioning is easiest to explain.

------------------------------------------------------------------------

# Production Example -- Amazon Checkout

During checkout:

1.  Client calls Payment API.
2.  Payment Service validates request.
3.  Inventory Service reserves stock.
4.  Order Service creates order.
5.  Notification Service sends confirmation.

Each interaction is governed by API contracts.

Without stable contracts, hundreds of teams cannot develop
independently.

------------------------------------------------------------------------

# Interview Tips

When asked to design a system:

Do not immediately draw databases.

Instead:

1.  Define APIs.
2.  Explain request flow.
3.  Identify services.
4.  Design storage.
5.  Discuss scaling.

This creates a logical narrative interviewers appreciate.

------------------------------------------------------------------------

# Common Mistakes

-   Designing APIs around database tables.
-   Ignoring error responses.
-   Using POST for every endpoint.
-   Forgetting authentication.
-   Breaking backward compatibility.

------------------------------------------------------------------------

# Memory Trick

Remember **CRAFT**:

-   **C**onsistent naming
-   **R**esource oriented
-   **A**uthentication
-   **F**ailure handling
-   **T**yped responses

------------------------------------------------------------------------

# Dependency Map

``` text
Requirements
      │
      ▼
API Contracts
      │
      ├── Client–Server
      ├── REST
      ├── GraphQL
      ├── gRPC
      └── API Gateway
```

------------------------------------------------------------------------

# Coming Next

Part 6 concludes Chapter 1 with:

-   Trade-off Thinking
-   CAP (Introduction)
-   Latency vs Consistency
-   Bitly High-Level Design
-   Chapter Cheat Sheet
-   Flashcards
-   Interview Questions
-   Design Exercises
