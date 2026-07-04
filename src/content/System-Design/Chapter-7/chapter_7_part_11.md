# The Ultimate System Design Handbook

# Chapter 7 – Messaging Systems

# Part 11 – Delivery Guarantees, Idempotency & Exactly-Once Processing

> **"In distributed systems, the hardest question isn't 'Can I send the message?' It's 'What happens if I send it twice?'"**

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why delivery guarantees matter
- At-Most-Once Delivery
- At-Least-Once Delivery
- Exactly-Once Delivery
- Idempotency
- Producer Retries
- Consumer Retries
- Duplicate Messages
- Poison Messages
- Retry Strategies
- Designing Reliable Distributed Systems
- Production examples from Amazon, Uber, Netflix and Stripe
- FAANG interview questions with detailed solutions

---

# Story – The Online Banking Disaster

Imagine you're transferring **₹1,00,000** to your friend.

You click **Transfer**.

The bank processes the payment.

Unfortunately...

Your internet disconnects just before you receive the confirmation.

Now you don't know what happened.

You click **Transfer** again.

Which of these happened?

### Case 1

The first request never reached the bank.

Second request succeeds.

Everything is fine.

---

### Case 2

The first request succeeded.

Second request also succeeds.

Now ₹2,00,000 has been transferred.

Disaster.

---

### Case 3

The first request succeeded.

The second request is detected as a duplicate.

Only one transfer occurs.

Perfect.

Distributed systems are built around solving this exact uncertainty.

---

# The Two Generals Problem

Before discussing delivery guarantees, understand one fundamental truth.

Imagine two army generals on opposite hills.

They communicate using messengers.

General A sends:

> Attack at dawn.

How does he know the message arrived?

General B sends back:

> Received.

How does General B know the acknowledgement arrived?

General A acknowledges the acknowledgement.

Now General B doesn't know if that acknowledgement arrived.

This never ends.

Distributed systems have the same problem.

**Absolute certainty is impossible.**

Instead...

We build practical guarantees.

---

# Why Delivery Guarantees Exist

Suppose a producer sends:

```text
Payment Completed
```

Network failure occurs.

Did Kafka receive it?

Nobody knows.

Producer retries.

Now the message may exist:

- Zero times
- One time
- Two times

Every distributed messaging system must define what happens.

---

# Three Delivery Guarantees

Distributed messaging systems generally provide three delivery semantics.

```text
Message

↓

At-Most-Once

At-Least-Once

Exactly-Once
```

Each has different trade-offs.

---

# At-Most-Once Delivery

Rule:

> A message is delivered **zero or one time**.

Never duplicated.

Possible loss.

---

## Example

```text
Producer

↓

Network Failure

↓

Message Lost
```

No retry.

No duplicate.

Message disappears forever.

---

# Advantages

- Very low latency
- High throughput
- No duplicate processing

---

# Disadvantages

Message loss.

Not suitable for:

- Banking
- Payments
- Orders

---

# Production Examples

Suitable for:

- Metrics
- Monitoring
- CPU statistics
- Memory usage
- Temporary cache updates

If one metric is lost...

Nobody notices.

---

# At-Least-Once Delivery

Rule:

> Every message will eventually arrive.

Duplicates are possible.

---

## Example

```text
Producer

↓

Broker

↓

Consumer

↓

ACK Lost

↓

Retry

↓

Duplicate
```

The broker doesn't know the consumer already processed the message.

It sends it again.

---

# Advantages

- No message loss
- Reliable
- Most commonly used

---

# Disadvantages

Consumers must handle duplicates.

---

# Production Examples

Used by:

- RabbitMQ
- Kafka
- Amazon SQS
- Google Pub/Sub

This is the industry default.

---

# Exactly-Once Delivery

Rule:

Every message is processed exactly once.

No duplicates.

No loss.

Sounds perfect.

Reality is complicated.

---

# The Myth of Exactly Once

Many engineers believe:

> Kafka guarantees exactly-once delivery.

Not entirely.

Kafka guarantees exactly-once **inside Kafka transactions**.

Your database does not magically become exactly-once.

Consider:

```text
Consumer

↓

Insert into Database

↓

Crash

↓

No ACK
```

Broker retries.

Database inserts again.

Duplicate.

Exactly-once disappeared.

---

# End-to-End Exactly Once

True exactly-once requires:

- Idempotent producer
- Transactional broker
- Idempotent consumer
- Transactional database

One weak link breaks everything.

---

# Understanding Duplicates

Suppose this happens.

```text
Producer

↓

RabbitMQ

↓

Consumer

↓

Database

↓

ACK Lost
```

Broker retries.

Consumer processes again.

Database now contains duplicates.

How do we prevent this?

---

# Idempotency

One of the most important concepts in distributed systems.

Definition:

> Performing the same operation multiple times produces the same final result.

Example:

```text
Set User Status = Active
```

Run once.

Active.

Run 100 times.

Still Active.

Idempotent.

---

Non-idempotent example:

```text
Balance += 100
```

Run once:

₹100

Run twice:

₹200

Different result.

Dangerous.

---

# Idempotency Key

Modern payment systems solve duplicates using an Idempotency Key.

Example:

```text
POST /payments

Idempotency-Key:

a8d91c21
```

Server stores:

```text
Key

↓

Result
```

Duplicate request?

Same key.

Return previous response.

Don't execute again.

---

# Stripe Example

Stripe popularized this approach.

Client sends:

```http
POST /payment

Idempotency-Key:

xyz123
```

Network fails.

Client retries.

Stripe checks:

```text
xyz123 exists?
```

Yes.

Return previous payment.

No duplicate charge.

---

# Idempotent Consumer

Consumers should also detect duplicates.

Suppose every event contains:

```text
Event ID
```

Database:

```text
Processed Events

1001

1002

1003
```

New message arrives:

```text
1002
```

Already processed.

Ignore it.

---

# Deduplication Table

Many systems maintain:

```sql
ProcessedEvents

event_id

processed_at
```

Every consumer checks this table first.

If present:

Skip processing.

Otherwise:

Execute business logic.

Store event ID.

---

# Retry Mechanisms

Retries solve temporary failures.

Examples:

- Database unavailable
- Network timeout
- API unavailable

Never retry immediately.

---

# Exponential Backoff

Retry intervals:

```text
1 second

↓

2 seconds

↓

4 seconds

↓

8 seconds

↓

16 seconds
```

Benefits:

- Reduces server load
- Prevents retry storms
- Improves stability

---

# Jitter

Imagine:

1 million clients retry after exactly 5 seconds.

Server crashes again.

Instead:

Randomize retry intervals.

```text
5.1 sec

5.8 sec

4.7 sec

6.3 sec
```

This is called **jitter**.

Always combine:

Exponential Backoff + Jitter.

---

# Poison Messages

Some messages will **never** succeed.

Example:

```json
Email:

abc@@gmail..
```

Retrying forever wastes resources.

Instead:

```text
Main Queue

↓

Retry Queue

↓

Retry Queue

↓

Dead Letter Queue
```

Operations team investigates later.

---

# Dead Letter Queue (DLQ)

A Dead Letter Queue stores permanently failed messages.

Benefits:

- No infinite retries
- Easier debugging
- Manual replay possible

Production teams monitor DLQs closely.

---

# Retry Architecture

```text
Producer

↓

Main Queue

↓

Consumer

↓

Success

↓

ACK

-------------------

Failure

↓

Retry Queue

↓

Retry Queue

↓

Retry Queue

↓

Dead Letter Queue
```

---

# Delivery Guarantee Comparison

| Guarantee | Loss | Duplicate | Typical Use |
|------------|------|-----------|-------------|
| At-Most-Once | Possible | Never | Metrics |
| At-Least-Once | Never | Possible | Messaging |
| Exactly-Once | No | No | Financial systems |

---

# Amazon Example

Checkout Service

↓

RabbitMQ

↓

Warehouse

↓

ACK Lost

↓

Retry

Warehouse uses

Order ID

to ignore duplicate shipment creation.

---

# Uber Example

Ride Completed

↓

Kafka

↓

Billing

↓

Retry

↓

Duplicate Event

Billing uses

Ride ID

to ensure invoice generated once.

---

# Netflix Example

Viewing Event

↓

Kafka

↓

Analytics

Duplicate analytics acceptable.

Exactly-once unnecessary.

---

# Banking Example

Money Transfer

↓

Kafka

↓

Ledger

↓

Database Transaction

↓

Idempotency Key

↓

Exactly-once behavior

---

# Common Mistakes

❌ Assuming retries are harmless.

---

❌ Forgetting idempotency.

---

❌ Infinite retries.

---

❌ No Dead Letter Queue.

---

❌ Believing Kafka magically solves duplicates.

---

# Memory Trick

Remember:

```text
Lose?

↓

At-Most-Once

Duplicate?

↓

At-Least-Once

Need Both?

↓

Exactly-Once

Requires Idempotency
```

---

# Dependency Map

```text
Delivery Guarantees

│

├── At-Most-Once

├── At-Least-Once

├── Exactly-Once

│

├── Idempotency

├── Retry

├── Jitter

├── Exponential Backoff

├── DLQ

└── Deduplication
```

---

# Cheat Sheet

| Concept | Purpose |
|----------|----------|
| At-Most-Once | Fast, may lose messages |
| At-Least-Once | Reliable, duplicates possible |
| Exactly-Once | No loss, no duplicates |
| Idempotency | Safe retries |
| Jitter | Prevent retry storms |
| DLQ | Store failed messages |
| Retry Queue | Temporary failures |
| Event ID | Duplicate detection |

---

# Interview Questions & Solutions

---

## Question 1

### Question

Why is At-Least-Once Delivery more common than Exactly-Once?

### What Interviewer Tests

Understanding of distributed systems trade-offs.

### Ideal Answer

Exactly-once semantics are extremely expensive and difficult to achieve across multiple systems. At-least-once delivery provides high reliability while keeping implementation simpler. Duplicates are handled through idempotent consumers, making it the preferred choice for most production systems.

---

## Question 2

### Question

What is idempotency?

### Ideal Answer

Idempotency means performing the same operation multiple times results in the same final state. It enables safe retries in distributed systems where duplicate messages are common.

---

## Question 3

### Question

How would you prevent duplicate payment processing?

### Ideal Answer

Use an idempotency key or unique transaction ID. Store processed IDs in persistent storage. Before executing a payment, check whether the transaction has already been processed. If it has, return the previous result instead of processing again.

---

## Question 4

### Question

Why are Dead Letter Queues important?

### Ideal Answer

DLQs isolate permanently failing messages so they do not block normal processing or consume resources through endless retries. They also provide visibility for operators to inspect and replay failed events.

---

## Question 5 (FAANG)

### Question

Design a reliable payment system using Kafka or RabbitMQ.

### Ideal Answer

- Use at-least-once delivery.
- Generate a unique idempotency key per payment.
- Use durable queues or replicated Kafka topics.
- Store processed transaction IDs.
- Enable retries with exponential backoff and jitter.
- Route permanently failing messages to a DLQ.
- Monitor retry counts, queue depth, and DLQ size.
- Wrap database updates in transactions where appropriate.

This architecture provides practical exactly-once behavior from the user's perspective while remaining scalable and fault tolerant.

---

# Design Exercise

Design the messaging layer for a digital wallet.

Requirements:

- No duplicate payments
- Retry temporary failures
- Recover from crashes
- Prevent retry storms
- Handle poison messages
- Support millions of daily transactions

Explain your retry strategy, idempotency design, monitoring, and recovery process.

---

# Revision Notes

- At-most-once favors speed over reliability.
- At-least-once is the industry standard.
- Exactly-once requires coordination across producers, brokers, consumers, and storage.
- Idempotency is the foundation of reliable retries.
- DLQs isolate poison messages.
- Exponential backoff with jitter prevents retry storms.
- Practical distributed systems prioritize resilience over theoretical perfection.

---

# Next Part

**Chapter 7 – Part 12: Case Study – Designing a Global Messaging Platform (WhatsApp/Tinder Style)**

Topics:

- Functional Requirements
- Non-Functional Requirements
- One-to-One Messaging
- Group Messaging
- Message Ordering
- Read Receipts
- Presence
- Offline Delivery
- Push Notifications
- End-to-End Encryption (High Level)
- Scaling to Hundreds of Millions of Users
- Production Architecture
- Trade-offs
- Interview Walkthrough