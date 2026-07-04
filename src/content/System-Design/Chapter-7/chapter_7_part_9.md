# The Ultimate System Design Handbook

# Chapter 7 – Messaging Systems

# Part 9 – Kafka Internals: Replication, Log Segments, Retention, Compaction & Delivery Guarantees

> **"Kafka isn't fast because it has better hardware. Kafka is fast because of the way it stores data."**

---

# Learning Objectives

By the end of this chapter, you will understand:

- Kafka's internal storage architecture
- Log Segments
- Replication protocol
- Leader election
- In-Sync Replicas (ISR)
- High Watermark
- Retention policies
- Log Compaction
- Exactly-once semantics
- Idempotent producers
- Transactions
- High availability
- Interview questions with complete solutions

---

# Story – The Library That Never Throws Away Books

Imagine a huge national library.

Every book that enters the library is placed on a shelf.

Books are **never modified**.

They are **never moved**.

They are simply added to the end of the shelf.

Readers remember the page they last read.

If they return tomorrow, they continue from there.

This is exactly how Kafka stores events.

Unlike databases that constantly update rows...

Kafka **never updates existing events**.

It only appends new events.

This design decision is the secret behind Kafka's incredible performance.

---

# Recap

From the previous chapter:

```text
Producer

↓

Topic

↓

Partition

↓

Consumer Group

↓

Consumers
```

But...

Where exactly are events stored?

How do replicas stay synchronized?

How does Kafka recover after failures?

Let's look inside.

---

# Kafka is an Append-Only Log

Every partition is simply a log file.

```text
+----------------------------------+

Offset 0

Offset 1

Offset 2

Offset 3

Offset 4

Offset 5

+----------------------------------+
```

New events are always appended.

Nothing is inserted in the middle.

Nothing is updated.

Nothing is deleted immediately.

---

# Why Append-Only?

Imagine writing inside a notebook.

Random Updates

```text
Page 20

↓

Erase

↓

Rewrite

↓

Move
```

Slow.

Now imagine:

```text
Page 200

↓

Write New Line
```

Very fast.

Hard disks and SSDs perform much better with sequential writes.

Kafka exploits this.

---

# Log Segments

A partition is not one giant file.

Instead...

Kafka divides it into multiple log segments.

```text
Partition

│

├── Segment 1

├── Segment 2

├── Segment 3

├── Segment 4
```

Each segment stores a fixed amount of data.

For example:

```
1 GB
```

When one segment fills...

Kafka creates another.

---

# Why Segments?

Suppose your topic contains:

```
20 TB
```

Would you want one giant file?

No.

Managing:

- backups
- deletion
- indexing

would become impossible.

Segments solve this problem.

---

# Inside a Segment

Each segment contains

```text
Offset

↓

Event

↓

Timestamp

↓

Metadata
```

Example

```text
Offset 100

↓

Order Created

↓

12:30 PM

↓

CRC
```

---

# Segment Lifecycle

```text
Segment Created

↓

Append Events

↓

Full

↓

Read Only

↓

New Segment
```

Consumers continue reading.

Nothing breaks.

---

# Index Files

Suppose a consumer wants:

```
Offset 8,521,992
```

Should Kafka scan millions of events?

No.

Each segment has an index.

```text
Offset

↓

Position

↓

File Pointer
```

Like a book index.

Jump directly.

Very fast.

---

# Kafka Replication

Suppose one broker fails.

Without replication:

```text
Broker

↓

Crash

↓

Everything Lost
```

Not acceptable.

Instead...

Kafka replicates partitions.

---

# Replication Architecture

```text
Partition 0

↓

Leader

↓

Follower 1

↓

Follower 2
```

Only one broker accepts writes.

Followers continuously copy data.

---

# Leader

Leader responsibilities

- Accept writes
- Accept reads (usually)
- Coordinate replication

Every partition has exactly one leader.

---

# Followers

Followers continuously pull data.

```text
Leader

↓

Follower

↓

Follower

↓

Follower
```

Notice:

Leader doesn't push.

Followers pull.

This simplifies replication.

---

# Why Pull Instead of Push?

Imagine students copying notes.

Teacher writing.

Students copy at their own pace.

Teacher doesn't need to know everyone's speed.

Kafka uses exactly this model.

Followers request new data.

---

# In-Sync Replicas (ISR)

Not every follower is healthy.

Example

```text
Leader

↓

Follower A

↓

Follower B

↓

Follower C (Slow)
```

Follower C falls behind.

Kafka removes it from ISR.

```text
ISR

Leader

Follower A

Follower B
```

Only ISR members participate in elections.

---

# High Watermark

One of Kafka's most misunderstood concepts.

Question:

When is a message considered committed?

Answer:

When every ISR replica has received it.

The High Watermark marks this boundary.

```text
Offset

0

1

2

3

4

5

6

^

High Watermark
```

Consumers only read committed messages.

---

# Why High Watermark?

Suppose Leader crashes.

Message existed only on Leader.

Followers never received it.

Without High Watermark

Consumers may read data that disappears later.

High Watermark prevents this.

---

# Leader Election

Suppose

Leader crashes.

```text
Leader ❌

↓

Follower promoted

↓

New Leader
```

Only ISR members qualify.

This avoids stale replicas becoming leaders.

---

# Log Retention

Should Kafka store events forever?

Not necessarily.

Retention policies decide.

Example

```
7 days

30 days

365 days

Forever
```

Older events are deleted automatically.

---

# Retention by Size

Example

```
Maximum Topic Size

2 TB
```

When exceeded

Oldest segments disappear.

---

# Retention by Time

Example

```
7 Days
```

Kafka automatically removes older segments.

---

# Why Keep Old Events?

Imagine

Machine Learning.

Today

New algorithm.

Need data from

Last year.

Kafka replay makes this possible.

---

# Log Compaction

Some events never become obsolete.

Example

User Profile.

Without compaction

```text
User A

Name = John

Name = Johnny

Name = Jonathan
```

Three records.

Only latest matters.

Log Compaction keeps

```text
User A

↓

Jonathan
```

Older versions disappear.

Useful for state restoration.

---

# Log Compaction vs Retention

Retention

Deletes based on

- Time
- Size

Compaction

Deletes obsolete versions.

Very different.

---

# Delivery Guarantees

Distributed systems cannot guarantee perfection.

Kafka provides three models.

---

# At Most Once

```text
Send

↓

Failure

↓

Lost
```

No duplicates.

Possible loss.

---

# At Least Once

```text
Send

↓

Failure

↓

Retry

↓

Duplicate Possible
```

Most common.

---

# Exactly Once

Very difficult.

Kafka supports it using

- Idempotent Producers
- Transactions

We'll explore this shortly.

---

# Idempotent Producer

Imagine

Network failure.

Producer retries.

Without idempotence

```text
Payment

Payment
```

Duplicate.

Bad.

With Idempotence

Kafka detects duplicate producer sequence numbers.

Stores only one.

---

# Transactions

Suppose

Producer writes

```text
Order

↓

Inventory

↓

Payment
```

Payment fails.

Should first two remain?

No.

Kafka Transactions guarantee

Either

Everything

Or

Nothing.

Exactly like databases.

---

# High Availability

Kafka combines

- Replication
- Leader Election
- ISR
- High Watermark

to provide continuous availability.

Failures become routine.

Users rarely notice.

---

# Production Example – Netflix

Every playback event

↓

Kafka

↓

Replicated

↓

Committed

↓

Consumed

↓

Stored for weeks

↓

Replayed by new ML models

---

# Production Example – Uber

Ride events

↓

Replicated

↓

Analytics

↓

Billing

↓

Fraud

↓

Replay for investigations

---

# Production Example – LinkedIn

Profile Views

↓

Kafka

↓

Stored

↓

Reprocessed months later

↓

New recommendation algorithms

No data lost.

---

# Performance Optimizations

Kafka becomes fast because of

- Sequential Writes
- Batching
- Compression
- Zero Copy
- Append Only Log
- Partitioning

These six ideas explain most of Kafka's performance.

---

# Advantages

✅ High throughput

✅ Fault tolerant

✅ Replay support

✅ Horizontal scaling

✅ Event history

---

# Disadvantages

❌ Operational complexity

❌ Ordering only inside partitions

❌ Storage management

❌ Learning curve

---

# Common Mistakes

❌ Thinking replication means backup.

Replication improves availability.

Backups solve different problems.

---

❌ Confusing Retention with Compaction.

---

❌ Ignoring partition keys.

---

❌ Using one partition.

---

❌ Forgetting ISR health.

---

# Memory Trick

Remember

```text
Append

↓

Replicate

↓

Commit

↓

Consume

↓

Retain

↓

Replay
```

That is Kafka's lifecycle.

---

# Dependency Map

```text
Kafka

│

├── Broker

├── Topic

├── Partition

│

├── Log Segments

├── Index Files

├── Leader

├── Followers

├── ISR

├── High Watermark

├── Retention

├── Compaction

├── Transactions

└── Replay
```

---

# Cheat Sheet

| Concept | Purpose |
|----------|----------|
| Log Segment | Storage file |
| Leader | Accept writes |
| Follower | Replicate |
| ISR | Healthy replicas |
| High Watermark | Commit boundary |
| Retention | Delete old logs |
| Compaction | Keep latest state |
| Idempotence | Prevent duplicates |
| Transactions | Exactly once |

---

# Interview Questions & Solutions

## Question 1

### Question

Why is Kafka append-only?

### What Interviewer Tests

Understanding of storage optimization.

### Ideal Answer

Append-only logs avoid random disk writes, allowing Kafka to use highly efficient sequential I/O. This dramatically increases throughput and simplifies replication.

---

## Question 2

### Question

What is the purpose of Log Segments?

### Ideal Answer

Log Segments divide large partitions into manageable files, making indexing, deletion, and retention efficient without requiring a single enormous log file.

---

## Question 3

### Question

What is the High Watermark?

### Ideal Answer

The High Watermark is the highest offset that has been successfully replicated to all In-Sync Replicas. Consumers only read committed events up to this offset, preventing them from seeing unreplicated data that could be lost during leader failure.

---

## Question 4

### Question

Difference between Retention and Compaction?

### Ideal Answer

Retention removes events based on time or size limits. Log Compaction removes obsolete versions of records while preserving the latest value for each key.

---

## Question 5

### Question

How does Kafka implement Exactly-Once Semantics?

### Ideal Answer

Kafka combines idempotent producers, transactions, and careful offset management. Idempotent producers prevent duplicate writes, while transactions ensure multiple writes either all succeed or all fail atomically.

---

## Question 6 (FAANG)

### Question

Design a Kafka cluster for processing 100 million events per hour.

### Ideal Answer

- Multiple brokers distributed across availability zones
- Partition topics based on workload
- Replication factor of 3
- Idempotent producers
- Consumer Groups for independent processing
- Monitoring for ISR health, broker load, consumer lag, and partition balance
- Retention configured according to business requirements
- Log compaction for state topics
- Automated leader election and rolling upgrades

---

# Design Exercise

Design the event streaming platform for a global banking system.

Your design should include:

- Topic strategy
- Partitioning
- Replication
- ISR configuration
- Retention policy
- Disaster recovery
- Exactly-once payment processing
- Monitoring strategy

Explain every architectural decision.

---

# Revision Notes

- Kafka is an append-only distributed log.
- Partitions are divided into log segments.
- Leaders accept writes.
- Followers replicate data.
- ISR contains healthy replicas.
- High Watermark defines committed data.
- Retention removes old data.
- Compaction preserves latest state.
- Idempotent producers prevent duplicates.
- Transactions enable exactly-once semantics.

---

# Next Part

**Chapter 7 – Part 10: Kafka vs RabbitMQ – Complete Comparison & Decision Framework**

Topics:

- Feature-by-feature comparison
- Performance benchmarks
- Routing vs Streaming
- Ordering guarantees
- Latency
- Throughput
- Durability
- Scaling
- When to choose RabbitMQ
- When to choose Kafka
- Hybrid architectures
- Real production architectures (Netflix, Uber, Amazon, LinkedIn)