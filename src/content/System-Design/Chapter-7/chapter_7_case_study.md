# The Ultimate System Design Handbook

# Chapter 7 – Part 14

# Comprehensive Case Study – Designing Amazon's Order Processing & Messaging Platform

> "This chapter brings together everything we've learned in Chapter 7. Instead of studying RabbitMQ, Kafka, Saga, and Outbox separately, we'll build a production-scale e-commerce system where each technology solves a specific problem."

---

# Learning Objectives

After completing this case study, you will understand

- End-to-end order processing
- Combining REST, RabbitMQ and Kafka
- Synchronous vs Asynchronous workflows
- Transactional Outbox
- Saga Pattern
- Idempotency
- Kafka Streaming
- CQRS
- Monitoring
- Failure Recovery
- Interview Discussion

---

# Problem Statement

Design Amazon's checkout system.

Requirements

- Millions of users
- Millions of orders/day
- No duplicate orders
- No duplicate payments
- Inventory consistency
- Shipping integration
- Recommendation engine
- Analytics
- Notifications
- Fault tolerance
- Event replay

---

# Functional Requirements

Customer should be able to

- Browse products
- Add to cart
- Checkout
- Pay
- Track order
- Cancel order

Admin should be able to

- View orders
- Update inventory
- Process refunds

---

# Non Functional Requirements

- 99.99% Availability
- Horizontal scalability
- No duplicate payments
- Eventual consistency
- Low latency checkout
- Durable messaging
- Event replay
- High throughput

---

# Step 1 — Customer Places Order

Customer clicks

Buy Now

```
Customer

↓

API Gateway

↓

Order Service
```

The Order Service validates

- User
- Cart
- Coupons
- Inventory

Inventory check is synchronous because we need an immediate answer.

---

# Step 2 — Payment

```
Order Service

↓

Payment Service
```

Payment Authorization

REST/gRPC

Why synchronous?

Customer must know whether payment succeeded.

Waiting is acceptable here.

---

# Step 3 — Database Transaction

Inside Order Service

```
BEGIN

↓

Save Order

↓

Save Order Items

↓

Save Outbox Event

↓

COMMIT
```

Notice

We never publish Kafka directly.

Instead

Transactional Outbox.

---

# Step 4 — Outbox Publisher

Background Worker

```
Orders DB

↓

Outbox Table

↓

Kafka
```

Publishes

```
OrderCreated
```

Event

---

# Step 5 — Kafka Consumers

OrderCreated

↓

Inventory Service

↓

Shipping Service

↓

Recommendation Service

↓

Analytics Service

↓

Fraud Detection

↓

Customer History

↓

ML Pipeline

Notice

Nobody calls anybody.

Everyone simply subscribes.

---

# Step 6 — RabbitMQ

Some work doesn't require streaming.

Instead

RabbitMQ

Processes

- Email
- SMS
- Invoice PDF
- Loyalty Points
- Cache Invalidation

RabbitMQ is chosen because

- Low latency
- Reliable delivery
- Work Queue model

---

# Architecture

```text
                 Customer

                     │

              API Gateway

                     │

             Order Service

                     │

         Transactional Outbox

                     │

                  Kafka

                     │

 ─────────────────────────────────────

 Inventory

 Shipping

 Analytics

 Fraud

 Recommendations

 ML

 Customer History

─────────────────────────────────────

 RabbitMQ

↓

Email

↓

SMS

↓

Invoice

↓

Notification
```

---

# Why Kafka?

Analytics wants

Every order

Forever.

Recommendation engine wants

Every order.

ML wants

Every order.

Fraud wants

Every order.

Kafka lets everyone consume independently.

---

# Why RabbitMQ?

Invoice generation

Must happen once.

Email

Must happen once.

SMS

Must happen once.

Perfect RabbitMQ workloads.

---

# Payment Failure

Suppose

Inventory succeeds.

Payment fails.

Now what?

Saga begins.

```
Payment Failed

↓

Release Inventory

↓

Cancel Order

↓

Notify Customer
```

Compensating transactions.

---

# Shipping Failure

Suppose

Payment succeeded.

Inventory reserved.

Shipping unavailable.

Saga executes

```
Refund Payment

↓

Release Inventory

↓

Cancel Order
```

---

# Idempotency

Customer refreshes browser.

Clicks

Pay

Again.

Payment request contains

```
Idempotency-Key

UUID
```

Server checks

Already processed?

Yes.

Return previous response.

No duplicate payment.

---

# Consumer Idempotency

Inventory receives

OrderCreated

Twice.

Checks

ProcessedEvents

Table.

Already exists.

Ignore.

---

# Dead Letter Queue

Shipping Service

Keeps failing.

```
Retry

↓

Retry

↓

Retry

↓

DLQ
```

Operations investigates later.

---

# Retry Strategy

Never

Retry Immediately.

Instead

```
1

↓

2

↓

4

↓

8

↓

16 Seconds
```

With

Random Jitter.

---

# Monitoring

Dashboard

Shows

- Kafka Lag
- RabbitMQ Queue Depth
- DLQ Size
- Retry Count
- Consumer Health
- Broker CPU
- Broker Disk
- WebSocket Connections
- Event Throughput

---

# Failure Scenarios

## Kafka Broker Crash

Leader election.

ISR promotes follower.

No data loss.

---

## RabbitMQ Crash

Durable Queue

Persistent Messages

Broker restarts.

Consumers continue.

---

## Database Crash

Outbox preserved.

Publisher resumes.

No missing events.

---

## Consumer Crash

No ACK.

Broker redelivers.

Idempotent consumer ignores duplicates.

---

# Scaling

Order Service

100 instances

↓

Kafka

50 brokers

↓

Inventory

200 consumers

↓

Analytics

500 consumers

↓

ML

100 consumers

Everything scales independently.

---

# Interview Discussion

Interviewer

Why Kafka?

Answer

Multiple downstream consumers need replay, analytics, ML and audit history.

---

Interviewer

Why RabbitMQ?

Answer

Background jobs requiring reliable one-time execution.

---

Interviewer

Why not Kafka for Emails?

Answer

Kafka can do it, but RabbitMQ provides lower operational complexity, sophisticated routing, and work queue semantics that better match background task processing.

---

Interviewer

How do you prevent duplicate payments?

Answer

Idempotency Keys + Transactional Outbox + Inbox Pattern.

---

Interviewer

How do you recover after a crash?

Answer

Kafka replay, RabbitMQ redelivery, Saga compensation, Outbox recovery.

---

# Complete Technology Stack

| Component | Technology |
|------------|------------|
| API | REST / gRPC |
| Messaging | RabbitMQ |
| Event Streaming | Kafka |
| Presence | Redis |
| Search | Elasticsearch |
| Database | PostgreSQL |
| Media | Amazon S3 |
| Monitoring | Prometheus + Grafana |
| Tracing | OpenTelemetry |
| CDC | Debezium |
| Workflow | Saga |
| Reliable Publishing | Transactional Outbox |
| Duplicate Protection | Inbox Pattern |

---

# Final Interview Takeaway

This architecture combines:

- REST for synchronous operations
- RabbitMQ for operational messaging
- Kafka for event streaming
- Saga for distributed transactions
- Transactional Outbox for reliable publishing
- Inbox for idempotent consumers
- DLQs for poison messages
- Retries with exponential backoff
- Monitoring for operational visibility

This is very close to the messaging architecture used by modern large-scale e-commerce platforms and incorporates nearly every concept covered in Chapter 7.