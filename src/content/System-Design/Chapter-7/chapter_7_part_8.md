# The Ultimate System Design Handbook

# Chapter 7 – Messaging Systems

# Part 8 – Apache Kafka Deep Dive: Architecture, Topics, Partitions, Offsets & Consumer Groups

> **"RabbitMQ is a smart post office. Kafka is a distributed commit log. This single architectural difference is why Kafka became the backbone of modern data platforms."**

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Kafka was invented
- Kafka architecture
- Brokers
- Topics
- Partitions
- Offsets
- Consumer Groups
- Leader & Followers
- In-Sync Replicas (ISR)
- ZooKeeper vs KRaft
- Why Kafka is so fast
- Production architectures at LinkedIn, Netflix, Uber and Amazon
- Interview questions with complete solutions

---

# Story – LinkedIn's Growing Data Problem

Imagine you're an engineer at LinkedIn in 2010.

Every second, users perform thousands of actions:

- Open the homepage
- Search for jobs
- Send connection requests
- Like posts
- Share articles
- Watch videos
- Update profiles
- Send messages

Every action generates valuable information.

Initially, these events are sent using traditional messaging systems.

Everything works.

Then LinkedIn reaches hundreds of millions of users.

Now every second generates millions of events.

Different teams need these events:

- Search
- Recommendations
- Ads
- Analytics
- Fraud Detection
- Machine Learning
- Notifications

RabbitMQ can deliver messages.

But once a consumer acknowledges a message...

It's gone.

LinkedIn wanted something fundamentally different.

They wanted to keep every event.

Forever.

Thus Kafka was born.

---

# Why Kafka Was Created

Traditional brokers answer this question:

> "How do I deliver messages reliably?"

Kafka answers a different question:

> "How do I store an endless stream of events so that many systems can independently read them?"

This philosophical difference is the key to understanding Kafka.

---

# RabbitMQ Thinking

```text
Producer

↓

Queue

↓

Consumer

↓

ACK

↓

Delete Message
```

Messages disappear after processing.

---

# Kafka Thinking

```text
Producer

↓

Topic

↓

Distributed Log

↓

Consumer A

Consumer B

Consumer C
```

Messages remain available even after they are read.

Consumers decide how far they have progressed.

---

# What is Apache Kafka?

Apache Kafka is a **distributed event streaming platform**.

It is designed for:

- High throughput
- Fault tolerance
- Horizontal scalability
- Durable event storage
- Real-time stream processing

Kafka is **not just a message broker**.

It is an append-only distributed log.

---

# The Library Analogy

Imagine a library.

RabbitMQ is like borrowing a book.

Once you take it, others cannot.

Kafka is like a reference library.

Everyone can read the same book independently.

Nobody removes it after reading.

This is exactly how Kafka topics behave.

---

# Kafka Architecture

A simplified Kafka cluster looks like this:

```text
                Producer

                    │

                    ▼

              Kafka Broker

                    │

        ┌───────────┼────────────┐

        ▼           ▼            ▼

     Topic A     Topic B     Topic C

                    │

             Consumer Groups

        ┌───────────┼────────────┐

        ▼           ▼            ▼

 Analytics    Recommendations   Billing
```

---

# Core Components

Kafka consists of several building blocks.

```text
Producer

↓

Broker

↓

Topic

↓

Partition

↓

Consumer Group

↓

Consumers
```

Each plays a specific role.

---

# Broker

A Broker is simply a Kafka server.

A Kafka cluster consists of many brokers.

```text
Broker 1

Broker 2

Broker 3

Broker 4
```

Each broker stores part of the data.

Unlike traditional databases, no single broker stores everything.

---

# Topic

A Topic is a logical category of events.

Examples:

```
orders

payments

rides

page_views

notifications

transactions
```

Think of Topics as folders.

Every event of the same type goes into the same folder.

---

# Why Topics?

Instead of mixing everything together:

```text
Orders

Payments

Users

Analytics

Inventory
```

Kafka separates them into dedicated streams.

```text
orders

payments

inventory

analytics
```

This improves organization and scalability.

---

# Partition

This is Kafka's most important concept.

Every topic is divided into partitions.

```text
Topic

↓

+----------+

Partition 0

+----------+

Partition 1

+----------+

Partition 2

+----------+

Partition 3
```

Partitions enable parallelism.

---

# Why Partitions Exist

Imagine one topic receives:

```
2 Million Events / Second
```

One machine cannot handle that load.

Instead:

```text
Topic

↓

Partition 0

↓

Broker 1

----------------

Partition 1

↓

Broker 2

----------------

Partition 2

↓

Broker 3
```

Traffic is distributed.

---

# Ordering

Kafka guarantees ordering **inside a partition**, not across partitions.

Example:

Partition 0

```text
Order Created

↓

Order Paid

↓

Order Shipped
```

Correct order.

Another partition has its own independent sequence.

---

# Offset

Every event inside a partition receives a unique number.

```text
Offset 0

Offset 1

Offset 2

Offset 3

Offset 4
```

Offsets are like page numbers in a book.

Consumers remember the last page they read.

---

# Consumer

Consumers read events.

Unlike RabbitMQ:

Reading does **not** delete events.

Consumers simply move their offset.

```text
Events

↓

Offset = 450

↓

Consumer continues from 451
```

This enables replay.

---

# Replay

Suppose a bug exists.

Analytics processed incorrect data.

With Kafka:

```text
Offset = 0

↓

Replay Everything
```

No data loss.

This is impossible with traditional queues.

---

# Consumer Groups

Suppose Analytics has four servers.

```text
Analytics

↓

Server A

Server B

Server C

Server D
```

Kafka creates a Consumer Group.

Each partition goes to one consumer.

```text
Partition 0 → A

Partition 1 → B

Partition 2 → C

Partition 3 → D
```

Load distributes automatically.

---

# Why Consumer Groups Matter

Now another team wants the same events.

Recommendations.

Instead of sharing consumers...

Kafka creates another group.

```text
Orders Topic

↓

Consumer Group A

Analytics

↓

Consumer Group B

Recommendations

↓

Consumer Group C

Fraud
```

Everyone independently reads the same data.

No duplication.

---

# Leader and Followers

Each partition has:

- One Leader
- Multiple Followers

```text
Partition

↓

Leader

↓

Follower

↓

Follower
```

All writes go to the Leader.

Followers replicate data.

---

# Failure Recovery

Suppose Leader crashes.

```text
Leader ❌

↓

Follower becomes Leader
```

System continues.

Minimal downtime.

---

# In-Sync Replicas (ISR)

Not every replica is equally up to date.

Kafka tracks replicas that are fully synchronized.

These replicas form the ISR.

```text
Leader

↓

Follower 1 ✅

Follower 2 ✅

Follower 3 ❌
```

Only synchronized replicas participate in leader election.

---

# ZooKeeper vs KRaft

Older Kafka versions required ZooKeeper.

Responsibilities:

- Cluster metadata
- Leader election
- Configuration

Modern Kafka uses **KRaft**.

Benefits:

- Simpler architecture
- Better scalability
- Easier operations

ZooKeeper is gradually being phased out.

---

# Why Kafka Is Fast

Several design decisions make Kafka extremely fast.

## Sequential Writes

Instead of random disk writes:

```text
Write

Write

Write

Write
```

Kafka appends data sequentially.

Hard disks and SSDs love sequential writes.

---

## Zero Copy

Kafka minimizes unnecessary copying between kernel and user space.

Less CPU.

Higher throughput.

---

## Batching

Instead of sending:

```
1 Event

1 Event

1 Event
```

Kafka sends:

```
1000 Events Together
```

Network overhead decreases dramatically.

---

## Compression

Kafka compresses batches.

Less bandwidth.

More throughput.

---

# Message Flow

```text
Producer

↓

Topic

↓

Partition

↓

Leader

↓

Followers

↓

Consumer Group

↓

Consumers
```

---

# Production Example — Netflix

Every playback generates:

```
PlaybackStarted
```

Kafka streams it to:

- Recommendations
- Billing
- Analytics
- Trending
- Machine Learning

Each service has its own Consumer Group.

---

# Production Example — Uber

RideCompleted

↓

Kafka

↓

Fraud Detection

↓

Pricing

↓

Analytics

↓

Heat Maps

↓

Machine Learning

Every consumer processes independently.

---

# Production Example — LinkedIn

LinkedIn's original Kafka pipeline processed:

- Profile Views
- Search Events
- Messages
- Job Applications
- Advertisement Clicks

Millions of events every second.

---

# Advantages

## Massive Throughput

Millions of events per second.

---

## Event Replay

Consumers can reread old events.

---

## Independent Consumer Groups

Every application processes data independently.

---

## Horizontal Scaling

Add brokers.

Add partitions.

Scale linearly.

---

## Durable Storage

Events remain available for configurable retention periods.

---

# Disadvantages

- More operational complexity
- Ordering only inside partitions
- Requires careful partition design
- Higher learning curve than RabbitMQ

---

# RabbitMQ vs Kafka

| RabbitMQ | Kafka |
|-----------|--------|
| Queue | Distributed Log |
| Smart Routing | High Throughput |
| Deletes after ACK | Retains Events |
| Complex Routing | Event Streaming |
| Work Queues | Data Pipelines |
| Low Latency Messaging | Massive Scale Streaming |

---

# Common Mistakes

❌ Thinking Kafka is just another queue.

---

❌ Assuming events disappear after reading.

---

❌ Ignoring partition strategy.

---

❌ Using a single partition for huge workloads.

---

❌ Forgetting consumer offsets.

---

# Memory Trick

Remember:

```
RabbitMQ

Deliver

↓

Delete

Kafka

Store

↓

Read

↓

Replay
```

---

# Dependency Map

```text
Kafka

│

├── Broker

├── Topic

├── Partition

├── Offset

├── Consumer

├── Consumer Group

├── Leader

├── ISR

└── KRaft
```

---

# Cheat Sheet

- Broker = Kafka server
- Topic = Category of events
- Partition = Parallelism
- Offset = Position inside partition
- Consumer Group = Load balancing
- Leader = Handles writes
- ISR = Healthy replicas
- Replay = Reprocess old events

---

# Interview Questions & Solutions

## Question 1

### Question

Why did LinkedIn create Kafka?

### What the Interviewer is Testing

Whether you understand Kafka's original motivation.

### Ideal Answer

LinkedIn needed a platform capable of storing billions of events, replaying historical data, and allowing multiple independent consumers to process the same event stream. Traditional message brokers focused on message delivery, whereas Kafka was designed as a distributed event log optimized for high-throughput streaming.

---

## Question 2

### Question

Why are partitions important in Kafka?

### Ideal Answer

Partitions allow Kafka to distribute data across multiple brokers, enabling parallel reads and writes. They improve scalability and throughput while preserving ordering within each partition.

---

## Question 3

### Question

What is an offset?

### Ideal Answer

An offset is a unique sequential identifier assigned to each event within a partition. Consumers use offsets to track their progress and replay data when necessary.

---

## Question 4

### Question

Why do Consumer Groups exist?

### Ideal Answer

Consumer Groups allow multiple consumers to share the processing load while ensuring each partition is processed by only one consumer within the same group. Different consumer groups can independently read the same data.

---

## Question 5 (FAANG)

### Question

Design an event streaming platform for processing 10 million user actions per second.

### Ideal Answer

- Multiple Kafka brokers
- Partition topics by user or region
- Replication factor of at least 3
- Consumer Groups for analytics, ML, billing, and fraud detection
- Monitor partition lag and broker health
- Use batching, compression, and appropriate retention policies
- Ensure producers use idempotence and consumers handle retries gracefully

---

# Design Exercise

Design a Kafka-based event platform for a global social media application.

Include:

- Topic design
- Partition strategy
- Replication
- Consumer Groups
- Retention policies
- Replay strategy
- Disaster recovery

Explain every architectural decision.

---

# Revision Notes

- Kafka is a distributed event streaming platform.
- Topics organize events.
- Partitions provide scalability.
- Offsets track consumer progress.
- Consumer Groups enable parallel processing.
- Leaders handle writes.
- ISR improves fault tolerance.
- Kafka stores events for replay rather than deleting them after consumption.

---

# Next Part

**Chapter 7 – Part 9: Kafka Internals – Replication, ISR, Log Segments, Retention, Compaction & Delivery Guarantees**

Topics:

- Log Segments
- Replication Protocol
- Leader Election
- In-SSync Replicas (Deep Dive)
- Retention Policies
- Log Compaction
- Exactly-Once Semantics
- Idempotent Producers
- Transactions
- High Availability