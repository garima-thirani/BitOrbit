# The Ultimate System Design Handbook

# Chapter 7 – Messaging Systems

# Part 13 – Advanced Messaging Patterns: Saga, Transactional Outbox, CDC, Event Sourcing & CQRS

> **"The hardest problems in distributed systems are not sending messages—they are keeping data consistent across dozens of independent services without using distributed transactions."**

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why distributed transactions are difficult
- The Saga Pattern
- Choreography vs Orchestration
- Transactional Outbox Pattern
- Inbox Pattern
- Change Data Capture (CDC)
- Debezium
- Kafka Connect
- Event Sourcing (Introduction)
- CQRS (Introduction)
- Production architectures
- FAANG interview questions with complete solutions

---

# Story – Ordering a Laptop on Amazon

Suppose you purchase a laptop.

Immediately several independent systems become involved.

```
Order Service

↓

Payment Service

↓

Inventory Service

↓

Shipping Service

↓

Notification Service

↓

Loyalty Service
```

Everything looks simple.

Until...

Inventory fails.

Now ask yourself.

Should the payment remain successful?

Should shipping continue?

Should loyalty points still be awarded?

Should confirmation emails already sent be revoked?

Distributed systems become complicated very quickly.

---

# The Distributed Transaction Problem

Imagine one giant database.

```text
BEGIN

↓

Update Order

↓

Update Inventory

↓

Update Payment

↓

COMMIT
```

Easy.

Everything succeeds.

Or everything rolls back.

---

Now imagine microservices.

```text
Order Service

↓

Payment Service

↓

Inventory Service

↓

Shipping Service
```

Each owns its own database.

Now there is no single transaction.

---

# Why Not Use Two-Phase Commit?

Historically, distributed databases used

```
2PC

(Two Phase Commit)
```

Flow

```text
Coordinator

↓

Prepare

↓

Commit
```

Problems:

- Slow
- Blocking
- Coordinator becomes bottleneck
- Poor availability
- Difficult to scale globally

Modern internet companies rarely use 2PC for business workflows.

Instead...

They embrace eventual consistency.

---

# The Saga Pattern

Saga solves distributed transactions using a sequence of local transactions.

Each service commits independently.

If something fails...

Previously completed work is compensated.

---

# Example

Order Processing

```text
Order Created

↓

Payment Completed

↓

Inventory Reserved

↓

Shipping Started
```

Now Inventory fails.

Instead of rolling back the database...

Saga executes

```text
Refund Payment

↓

Cancel Order
```

These are called

**Compensating Transactions**.

---

# Why Compensation Instead of Rollback?

You cannot "rollback" an email.

You cannot "rollback" an SMS.

You cannot "rollback" a shipment already handed to a courier.

Instead

You compensate.

Example

```
Email Sent

↓

Send Cancellation Email
```

---

# Local Transactions

Each service owns its database.

```text
Order DB

Payment DB

Inventory DB

Shipping DB
```

Every service performs

```
Local Commit
```

Never global commit.

---

# Saga Flow

```text
Order

↓

Payment

↓

Inventory

↓

Shipping

↓

Notification
```

Failure

```text
Shipping Failed

↓

Release Inventory

↓

Refund Payment

↓

Cancel Order
```

Notice

Rollback is implemented using business actions.

---

# Choreography Saga

No central coordinator.

Each service reacts to events.

```text
Order Created

↓

Payment Service

↓

Payment Completed

↓

Inventory Service

↓

Inventory Reserved

↓

Shipping Service
```

Every service publishes events.

Others subscribe.

---

# Advantages

- Highly scalable
- No central bottleneck
- Easy to extend

---

# Disadvantages

As systems grow...

Events become difficult to track.

Example

```
OrderCreated

↓

PaymentCompleted

↓

InventoryReserved

↓

ShipmentStarted

↓

EmailSent

↓

AnalyticsUpdated
```

Finding failures becomes challenging.

---

# Orchestration Saga

Instead of events controlling everything...

Introduce

```
Saga Orchestrator
```

Architecture

```text
Orchestrator

↓

Payment

↓

Inventory

↓

Shipping

↓

Notification
```

The orchestrator decides what happens next.

---

# Comparison

| Choreography | Orchestration |
|--------------|---------------|
| Event-driven | Central controller |
| Loose coupling | Easier monitoring |
| Hard debugging | Simpler workflows |
| Better scalability | Easier business logic |

---

# Transactional Outbox Pattern

One of the most important production patterns.

Suppose

Order Service

writes

```
Order Database
```

Then publishes

```
Kafka Event
```

Problem.

Database commit succeeds.

Kafka publish fails.

Now data becomes inconsistent.

---

# Incorrect Flow

```text
Database Commit ✔

↓

Kafka Publish ❌
```

Other services never know the order exists.

---

# Transactional Outbox Solution

Instead

Within one database transaction

```text
BEGIN

↓

Save Order

↓

Save Event

↓

COMMIT
```

The event is written into an

```
Outbox Table
```

Later

An Outbox Publisher reads that table.

```text
Outbox

↓

Kafka

↓

Delete Outbox Entry
```

No events lost.

---

# Outbox Architecture

```text
Application

↓

Database

├── Orders

└── Outbox

↓

Outbox Publisher

↓

Kafka
```

This pattern is extremely common in production.

---

# Inbox Pattern

Outbox protects producers.

Inbox protects consumers.

Consumer stores

```text
Processed Event IDs
```

Before processing

Check

```
Already Processed?
```

If yes

Ignore.

---

# Inbox Flow

```text
Kafka Event

↓

Inbox Table

↓

Business Logic

↓

Commit
```

Duplicate event?

Already in Inbox.

Ignore safely.

---

# Outbox + Inbox

Together they provide

Near Exactly Once Processing.

```text
Producer

↓

Outbox

↓

Kafka

↓

Inbox

↓

Business Logic
```

One of the most common interview discussions.

---

# Change Data Capture (CDC)

Suppose

Database updates

```text
Orders Table
```

How do other systems know?

Polling?

Terrible.

Instead

Capture database changes automatically.

---

# CDC Architecture

```text
Database

↓

Transaction Log

↓

CDC Tool

↓

Kafka
```

Applications don't publish anything.

Database changes automatically become events.

---

# Debezium

Debezium is the industry's most popular CDC platform.

It reads

- MySQL Binlog
- PostgreSQL WAL
- MongoDB Oplog

and publishes changes into Kafka.

Example

```
UPDATE Orders

↓

Debezium

↓

Kafka

↓

Consumers
```

Applications remain unchanged.

---

# Kafka Connect

Writing connectors manually is difficult.

Kafka Connect provides reusable connectors.

Examples

```
MySQL

↓

Kafka

↓

ElasticSearch

↓

Snowflake

↓

S3

↓

MongoDB
```

No custom integration code required.

---

# Event Sourcing

Traditional systems store

Current State

Example

```
Balance

₹5000
```

How did it become ₹5000?

Unknown.

---

Event Sourcing stores

Every event.

```text
Account Created

↓

Deposit ₹500

↓

Withdraw ₹100

↓

Deposit ₹4600
```

Current balance computed from history.

---

# Benefits

- Complete audit trail
- Replay history
- Debugging
- Time travel
- Regulatory compliance

---

# Challenges

- Complex implementation
- Event versioning
- Large event streams
- Snapshot management

Entire books are written on Event Sourcing.

We will dedicate a future chapter to it.

---

# CQRS (Introduction)

CQRS means

```
Command Query Responsibility Segregation
```

Commands

```
Write Data
```

Queries

```
Read Data
```

Separate models.

---

Example

Write

```text
Order Service

↓

Database
```

Read

```text
ElasticSearch

↓

Search API
```

Optimized independently.

CQRS pairs naturally with Kafka.

---

# Production Architecture

```text
Order Service

↓

Outbox

↓

Kafka

↓

Consumers

↓

CQRS Read Models

↓

Search

Analytics

Recommendations

Fraud
```

---

# Uber Example

Ride Completed

↓

Outbox

↓

Kafka

↓

Pricing

↓

Receipts

↓

ML

↓

Fraud

Every consumer updates independently.

---

# Amazon Example

Checkout

↓

Transactional Outbox

↓

Kafka

↓

Warehouse

↓

Inventory

↓

Recommendations

↓

Analytics

No events lost.

---

# Netflix Example

Playback

↓

Debezium

↓

Kafka

↓

Recommendation Engine

↓

Trending

↓

Analytics

↓

Data Lake

---

# Advantages

✅ Loose coupling

✅ Reliable event publishing

✅ High scalability

✅ Auditability

✅ Event replay

---

# Disadvantages

❌ Higher complexity

❌ More infrastructure

❌ Eventual consistency

❌ Operational overhead

---

# Common Mistakes

❌ Publishing Kafka events before committing the database.

---

❌ Assuming Outbox guarantees consumer safety.

Need Inbox too.

---

❌ Using Saga when a simple synchronous workflow is enough.

---

❌ Ignoring compensating transactions.

---

❌ Treating Event Sourcing as a replacement for every database.

---

# Memory Trick

Remember

```text
Database

↓

Outbox

↓

Kafka

↓

Inbox

↓

Business Logic
```

This pipeline appears in many large-scale production systems.

---

# Dependency Map

```text
Advanced Messaging

│

├── Saga

│     ├── Choreography

│     └── Orchestration

│

├── Transactional Outbox

├── Inbox Pattern

├── CDC

│     └── Debezium

├── Kafka Connect

├── Event Sourcing

└── CQRS
```

---

# Cheat Sheet

| Pattern | Purpose |
|----------|----------|
| Saga | Distributed transactions |
| Outbox | Reliable event publishing |
| Inbox | Duplicate protection |
| CDC | Database change streaming |
| Debezium | CDC implementation |
| Kafka Connect | Data integration |
| Event Sourcing | Store history |
| CQRS | Separate read/write models |

---

# Interview Questions & Solutions

## Question 1

### Question

Why is the Transactional Outbox Pattern necessary?

### Ideal Answer

Without an Outbox, a database commit can succeed while Kafka publishing fails, leading to inconsistent systems. The Outbox stores both the business data and event within the same transaction. A background publisher later delivers events reliably.

---

## Question 2

### Question

Why isn't Two-Phase Commit commonly used in microservices?

### Ideal Answer

2PC introduces blocking behavior, poor scalability, coordinator failures, and high latency. Modern microservices prefer eventual consistency using patterns such as Saga and Transactional Outbox.

---

## Question 3

### Question

What problem does the Inbox Pattern solve?

### Ideal Answer

The Inbox Pattern prevents duplicate event processing by recording processed event IDs before executing business logic, making consumers idempotent.

---

## Question 4

### Question

When would you use Choreography over Orchestration?

### Ideal Answer

Choreography works well for loosely coupled systems with simple workflows. Orchestration is preferred when workflows are complex, require centralized monitoring, or involve many compensating actions.

---

## Question 5 (FAANG)

### Question

Design Amazon's checkout pipeline so that no order event is lost.

### Ideal Answer

Use a Transactional Outbox inside the Order Service to atomically store both the order and the corresponding event. Publish events asynchronously to Kafka, use Saga to coordinate downstream services, implement Inbox tables for idempotent consumers, and monitor failed events using retries and Dead Letter Queues. This provides reliable event delivery without relying on distributed transactions.

---

# Design Exercise

Design an e-commerce checkout system using:

- Saga Pattern
- Transactional Outbox
- Inbox Pattern
- Kafka
- CQRS Read Models
- Debezium
- Retry Strategy
- Dead Letter Queues

Explain how your architecture maintains consistency across independent services while avoiding distributed transactions.

---

# Revision Notes

- Distributed transactions do not scale well.
- Saga replaces rollback with compensating actions.
- Transactional Outbox guarantees reliable event publishing.
- Inbox ensures idempotent consumption.
- CDC automatically converts database changes into events.
- Debezium is the most popular CDC platform.
- Kafka Connect simplifies integrations.
- Event Sourcing stores every state change.
- CQRS separates read and write workloads.
- These patterns form the foundation of modern event-driven architectures.

---

# Next Part

**Chapter 7 – Final Revision Chapter**

Topics:

- Complete Chapter Summary
- End-to-End Messaging Flow
- RabbitMQ vs Kafka Mind Map
- 100+ Rapid Interview Questions
- Common FAANG Scenarios
- Architecture Decision Matrix
- Flashcards
- Revision Tables
- One-Page Cheat Sheet
- Cross-Chapter Connections
- What to Revise Before an Interview