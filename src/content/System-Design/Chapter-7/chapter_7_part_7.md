# The Ultimate System Design Handbook

# Chapter 7 – Messaging Systems

# Part 7 – Messaging Patterns & Why Kafka Was Created

> **"RabbitMQ solved reliable message delivery. Kafka was invented to solve a different problem—processing massive streams of events at internet scale."**

---

# Learning Objectives

By the end of this chapter, you will understand:

- Common messaging patterns
- Work Queue Pattern
- Publish-Subscribe Pattern
- Competing Consumers Pattern
- Request-Reply Pattern
- Event Notification Pattern
- Event-Carried State Transfer
- Why RabbitMQ wasn't enough
- Why LinkedIn created Kafka
- Evolution of messaging systems
- Interview questions with detailed solutions

---

# Story – The Growing City

Imagine a small town.

Every shop owner personally calls every supplier.

Everything works.

Now imagine the town grows into New York City.

Millions of deliveries happen every day.

If every shop owner called every truck driver directly...

Chaos.

Instead, distribution centers appear.

Packages move through hubs.

Drivers pick deliveries whenever available.

This is RabbitMQ.

---

A few years later...

The city wants to analyze:

- Every package
- Every delivery
- Every driver
- Every customer
- Every payment
- Every traffic signal

Forever.

Now the distribution center is no longer enough.

It was built to deliver packages.

Not store years of history.

This is exactly what happened at LinkedIn.

RabbitMQ-like systems were great for messaging.

They weren't designed to become massive event storage systems.

Kafka was born.

---

# Why Messaging Patterns Exist

Different applications have different communication requirements.

Example:

A banking application.

Money transfer.

Only one processor should execute it.

Work Queue.

---

A stock market.

Price updates.

Everyone should receive them.

Publish Subscribe.

---

A chatbot.

Request.

Response.

Request Reply.

---

One broker.

Many communication styles.

---

# Pattern 1 – Work Queue

The oldest messaging pattern.

Imagine a restaurant.

Ten waiters.

Five chefs.

Orders enter one queue.

```text
Orders

↓

Queue

↓

Chef 1

Chef 2

Chef 3

Chef 4

Chef 5
```

Each order should be cooked exactly once.

---

# Characteristics

Only one worker processes each message.

```text
Task

↓

Queue

↓

Worker A

✔

Worker B

✖

Worker C

✖
```

---

# Production Example

Amazon image processing.

User uploads:

```
100,000 images
```

Workers resize images.

Each image processed once.

Perfect Work Queue.

---

# Advantages

- Load balancing
- Simple scaling
- Fault tolerance
- Independent workers

---

# Disadvantages

- Ordering becomes difficult
- Slow workers delay processing
- Queue monitoring required

---

# Pattern 2 – Publish Subscribe

Imagine TV broadcasting.

One signal.

Millions of televisions.

```text
TV Station

↓

Broadcast

↓

TV A

TV B

TV C

TV D
```

Everyone receives the same content.

---

RabbitMQ Fanout Exchange behaves exactly like this.

---

# Production Example

User changes profile picture.

Consumers include:

- Feed Service
- Recommendation Engine
- Analytics
- Notifications
- CDN

Every consumer receives the event.

---

# Advantages

- Loose coupling
- Easy extensibility
- Independent services

---

# Disadvantages

- Duplicate processing
- Difficult debugging
- Eventual consistency

---

# Pattern 3 – Competing Consumers

Suppose one queue contains

```
1 Million Messages
```

One worker cannot keep up.

Instead:

```text
Queue

↓

Worker A

Worker B

Worker C

Worker D
```

Workers compete.

RabbitMQ distributes work.

---

# Why It's Useful

Processing becomes parallel.

Throughput increases.

Latency decreases.

---

# Production Example

Food delivery platform.

Every order:

```
Queue

↓

Available Delivery Workers
```

Only one worker accepts.

Exactly like competing consumers.

---

# Pattern 4 – Request Reply

Sometimes asynchronous systems still require responses.

Example:

Inventory Service.

```text
Order Service

↓

Inventory Queue

↓

Inventory Service

↓

Reply Queue

↓

Order Service
```

Looks asynchronous.

Behaves synchronously.

Useful when direct APIs aren't possible.

---

# Advantages

- Decoupling
- Reliability
- Works across slow networks

---

# Disadvantages

- Increased complexity
- Correlation IDs required
- Timeout management

---

# Pattern 5 – Event Notification

Instead of saying

```
ReserveInventory()
```

Publish

```
InventoryReserved
```

Huge difference.

Command:

```
Do something.
```

Event:

```
Something happened.
```

Commands expect action.

Events describe facts.

---

# Pattern 6 – Event-Carried State Transfer

Sometimes sending only an ID isn't enough.

Instead

```json
{
  "orderId":123,
  "amount":499,
  "customer":"John",
  "items":[...]
}
```

Consumer doesn't need another API call.

Everything already exists.

Used extensively in Event Driven Architectures.

---

# Why RabbitMQ Eventually Hits Limits

RabbitMQ excels at

- Routing
- Reliability
- Flexible messaging

But imagine LinkedIn.

Every click.

Every profile view.

Every search.

Every message.

Every like.

Every connection.

Every notification.

Every advertisement click.

Every event.

Forever.

RabbitMQ wasn't designed for this workload.

---

# The LinkedIn Problem

LinkedIn wanted

```
Millions of Events

↓

Store Forever

↓

Replay Anytime

↓

Stream Processing

↓

Multiple Consumers

↓

High Throughput
```

RabbitMQ wasn't optimized for replay.

Consumers remove messages.

History disappears.

---

# Why Kafka Was Invented

Kafka changed the philosophy.

RabbitMQ says

```
Deliver message.

Delete message.
```

Kafka says

```
Store event.

Never delete immediately.

Everyone reads independently.
```

This single idea changed distributed systems forever.

---

# RabbitMQ vs Kafka (High-Level)

RabbitMQ

```text
Producer

↓

Queue

↓

Consumer

↓

ACK

↓

Delete
```

Kafka

```text
Producer

↓

Topic

↓

Store

↓

Consumer A

Consumer B

Consumer C

```

Notice.

Consumers don't remove events.

They simply move their own offsets.

We'll study this deeply in the next chapter.

---

# Evolution of Messaging

```text
Function Calls

↓

REST APIs

↓

RabbitMQ

↓

Kafka

↓

Event Streaming

↓

Real-Time Analytics

↓

Event Sourcing
```

Each technology solved limitations of the previous one.

---

# Production Example — Netflix

Viewing Event

↓

Kafka

↓

Recommendations

↓

Trending

↓

Billing

↓

Analytics

↓

Machine Learning

Every consumer independently reads the same event stream.

---

# Production Example — Uber

Ride Completed

↓

Kafka

↓

Pricing

↓

Receipts

↓

Analytics

↓

Fraud

↓

ML Models

↓

Heat Maps

Again.

Nobody removes events.

Everyone consumes independently.

---

# Production Example — LinkedIn

Every profile view.

↓

Kafka

↓

Search Ranking

↓

Recommendations

↓

Ads

↓

Analytics

↓

Notification Systems

LinkedIn originally built Kafka for exactly this scale.

---

# Advantages of Messaging Patterns

- Better scalability
- Loose coupling
- Independent deployment
- Better fault tolerance
- Easier feature addition

---

# Common Mistakes

❌ Using Work Queue when everyone needs the message.

❌ Using Pub/Sub when only one worker should process.

❌ Confusing Commands with Events.

❌ Assuming RabbitMQ and Kafka solve identical problems.

---

# Memory Trick

Remember

```
One Worker?

↓

Work Queue

Everyone?

↓

Publish Subscribe

Need Response?

↓

Request Reply

Need History?

↓

Kafka
```

---

# Dependency Map

```text
Messaging

│

├── Work Queue

├── Pub/Sub

├── Competing Consumers

├── Request Reply

├── Event Notification

└── Event Streaming

        │

        ▼

      Kafka
```

---

# Cheat Sheet

| Pattern | Best Use |
|----------|-----------|
| Work Queue | Background jobs |
| Pub/Sub | Broadcast events |
| Competing Consumers | Parallel processing |
| Request Reply | Async request-response |
| Event Notification | Domain events |
| Event Streaming | Kafka |

---

# Interview Questions & Solutions

## Question 1

### Question

When should Work Queues be used?

### Ideal Answer

When exactly one worker should process each task, such as image processing, payment reconciliation, or document generation.

---

## Question 2

### Question

What's the difference between Work Queue and Publish Subscribe?

### Ideal Answer

In a Work Queue, one consumer processes each message. In Publish Subscribe, every interested consumer receives a copy of the message.

---

## Question 3

### Question

Why wasn't RabbitMQ sufficient for LinkedIn?

### Ideal Answer

RabbitMQ is optimized for reliable message delivery and routing. LinkedIn needed a distributed event log capable of storing billions of events, replaying them later, and allowing multiple consumers to read independently. Kafka was designed specifically for these requirements.

---

## Question 4

### Question

What is Event-Carried State Transfer?

### Ideal Answer

Instead of sending only an entity ID, the event contains all relevant data needed by consumers. This reduces additional service calls and improves decoupling.

---

## Question 5 (FAANG)

### Question

Design a messaging architecture for an e-commerce platform processing millions of orders daily.

### Ideal Answer

- Use RabbitMQ Work Queues for background jobs like emails and image processing.
- Use Pub/Sub for notifications.
- Introduce Kafka for analytics, recommendation pipelines, audit logs, and event replay.
- Keep payment authorization synchronous.
- Ensure idempotent consumers and monitoring for queue depth and consumer lag.

---

# Design Exercise

Design the messaging architecture for a ride-sharing platform.

Identify:

- Work Queue components
- Pub/Sub components
- Kafka event streams
- RabbitMQ queues
- Synchronous APIs
- Asynchronous workflows

Justify every design choice.

---

# Revision Notes

- Work Queue → One consumer.
- Pub/Sub → Many consumers.
- Competing Consumers → Parallel processing.
- Request Reply → Async with responses.
- RabbitMQ → Routing and reliable delivery.
- Kafka → Event storage and streaming.
- Kafka was created because large-scale event streaming required a different architecture than traditional message queues.

---

# Next Part

**Chapter 7 – Part 8: Apache Kafka Deep Dive – Architecture, Topics, Partitions, Offsets & Consumer Groups**

Topics:

- Kafka Architecture
- Brokers
- Topics
- Partitions
- Offsets
- Consumer Groups
- Leader & Followers
- ISR
- ZooKeeper vs KRaft
- Log Segments
- Event Streaming
- High Throughput Design