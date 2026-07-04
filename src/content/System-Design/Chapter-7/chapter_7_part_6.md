
# The Ultimate System Design Handbook

# Chapter 7 – Messaging Systems

# Part 6 – RabbitMQ Reliability: ACK, NACK, Durable Queues, Publisher Confirms & Retry Mechanisms

> **"A message broker is only useful if it can reliably deliver messages. Speed is important, but correctness is more important. A payment message lost forever is worse than a payment message delayed by a few milliseconds."**

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why message reliability matters
- What ACK and NACK mean
- Auto ACK vs Manual ACK
- Publisher Confirms
- Durable Queues
- Persistent Messages
- Prefetch Count
- Fair Dispatch
- Retry Mechanisms
- Dead Letter Queues (Introduction)
- RabbitMQ reliability architecture
- Production best practices
- FAANG interview questions with complete solutions

---

# Story – The Courier Company

Imagine you're sending an expensive laptop using a courier service.

There are three possible scenarios.

## Scenario 1

You hand over the package.

The courier says,

> "Don't worry."

No receipt.

No tracking.

No confirmation.

If the package disappears...

Nobody knows.

---

## Scenario 2

The courier gives you a receipt.

Now you know:

✔ Package received.

But...

You still don't know whether it reached the customer.

---

## Scenario 3

The customer signs after receiving it.

Now everyone knows:

✔ Sender shipped.

✔ Courier transported.

✔ Receiver accepted.

RabbitMQ reliability works exactly like this.

---

# Why Reliability Matters

Imagine an online banking system.

Money Transfer Event

```text
Transfer ₹50,000

↓

RabbitMQ

↓

Bank Ledger
```

Suppose RabbitMQ crashes.

What happens?

Did the transfer happen?

Did it fail?

Was it duplicated?

These questions define distributed systems reliability.

---

# Message Delivery Lifecycle

A complete RabbitMQ message journey looks like this.

```text
Producer

↓

RabbitMQ Exchange

↓

Queue

↓

Consumer

↓

Business Logic

↓

ACK

↓

Delete Message
```

Notice something important.

The message is deleted **only after** acknowledgement.

---

# What is an ACK?

ACK means

> **Acknowledgement**

It tells RabbitMQ

> "I have processed this message successfully."

Only then can RabbitMQ safely remove it.

---

# Internal Flow

```text
Consumer Receives Message

↓

Business Logic

↓

ACK

↓

RabbitMQ Deletes Message
```

If ACK never arrives...

RabbitMQ assumes processing failed.

---

# Auto ACK vs Manual ACK

RabbitMQ supports two acknowledgement modes.

---

## Auto ACK

```text
Receive Message

↓

Immediately Remove Message
```

Advantages

- Fast
- Simple

Disadvantages

If consumer crashes...

Message is lost forever.

Example

```text
Receive

↓

Delete

↓

Application Crash ❌
```

The message disappears.

Never use Auto ACK for critical workloads.

---

## Manual ACK

```text
Receive

↓

Process

↓

ACK

↓

Delete
```

Advantages

- Safe
- Reliable
- Recommended

Disadvantages

Slightly slower.

Almost every production system uses Manual ACK.

---

# What is NACK?

Sometimes processing fails.

Example

```text
Payment Processing

↓

Database Timeout
```

Consumer cannot finish.

Instead of ACK

It sends

```text
NACK
```

RabbitMQ now decides:

- Retry
- Requeue
- Dead Letter Queue

depending on configuration.

---

# ACK vs NACK

| ACK | NACK |
|------|------|
| Success | Failure |
| Remove message | Retry or requeue |
| Processing completed | Processing failed |

---

# What Happens If Consumer Crashes?

Imagine

```text
Receive Message

↓

Consumer Crash ❌
```

No ACK.

RabbitMQ notices the connection closes.

Message returns to queue.

Another consumer processes it.

```text
Consumer A ❌

↓

Queue

↓

Consumer B

↓

ACK
```

This is why Manual ACK is so powerful.

---

# Durable Queues

Question:

What happens if RabbitMQ server crashes?

Suppose queue exists only in RAM.

```text
Memory

↓

Power Failure ❌
```

Everything disappears.

---

Instead

RabbitMQ supports

```text
Durable Queue
```

Now queue metadata survives restart.

```text
Disk

↓

Restart

↓

Queue Restored
```

---

# Durable Queue ≠ Persistent Message

One of the most common interview questions.

People think

> Durable Queue means messages survive.

Wrong.

A durable queue only preserves

- Queue definition
- Queue configuration

Messages still disappear unless they are persistent.

---

# Persistent Messages

Producer marks message as

```text
Persistent
```

RabbitMQ writes it to disk.

```text
Producer

↓

RabbitMQ

↓

Disk

↓

Consumer
```

Now crash recovery becomes possible.

---

# Queue Durability Matrix

| Queue | Message | Result |
|---------|----------|--------|
| Durable | Persistent | Survives restart |
| Durable | Non Persistent | Message lost |
| Non Durable | Persistent | Queue disappears |
| Non Durable | Non Persistent | Everything lost |

Interviewers love asking this.

---

# Publisher Confirms

Question:

How does producer know RabbitMQ actually received the message?

Without confirmation

```text
Producer

↓

Network Failure ❌
```

Did RabbitMQ receive it?

Nobody knows.

---

Publisher Confirms solve this.

Flow

```text
Producer

↓

RabbitMQ

↓

Confirm

↓

Producer Continues
```

Now producer knows message safely reached broker.

---

# Why Publisher Confirms Matter

Imagine payment event.

```text
Payment Success

↓

RabbitMQ
```

Network disconnects.

Without confirmation

Producer may incorrectly assume delivery succeeded.

With Publisher Confirm

Producer retries safely.

---

# Prefetch Count

Imagine Consumer A is slow.

Consumer B is fast.

Without limits

RabbitMQ sends

```
1000 messages

↓

Consumer A
```

Consumer B remains idle.

Bad utilization.

---

Instead

Configure

```text
Prefetch = 1
```

RabbitMQ sends

```text
One Message

↓

Wait for ACK

↓

Next Message
```

Now work distributes evenly.

---

# Fair Dispatch

Imagine

```text
Consumer A

1 sec/message

Consumer B

10 ms/message
```

Without Fair Dispatch

Both receive equal work.

Bad.

With Prefetch

RabbitMQ sends more work to faster consumer.

Much better throughput.

---

# Retry Mechanisms

Sometimes failures are temporary.

Example

```text
Database Timeout
```

Retry sequence

```text
Try

↓

Fail

↓

Wait

↓

Retry

↓

Success
```

Best practice

Use

```
Exponential Backoff
```

Instead of retrying immediately.

---

# Exponential Backoff

Example

```
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

Reduces pressure on downstream systems.

---

# Retry Storm

Imagine

100,000 consumers retry simultaneously.

```text
Fail

↓

Retry

↓

Retry

↓

Retry
```

Database crashes.

This is called

> Retry Storm

Always combine retries with

- Backoff
- Jitter

---

# Dead Letter Queue (Introduction)

Eventually

Some messages always fail.

Example

```text
Invalid Email Address
```

Retrying forever makes no sense.

Instead

```text
Main Queue

↓

Retry

↓

Retry

↓

Retry

↓

Dead Letter Queue
```

Operations team investigates later.

We'll study DLQs deeply in the next chapter.

---

# Production Example — Amazon

Checkout publishes

```
OrderCreated
```

RabbitMQ

- Stores persistently
- Waits for Publisher Confirm
- Delivers
- Consumer ACKs
- Removes message

If Warehouse Service crashes

RabbitMQ redelivers later.

Order isn't lost.

---

# Production Example — Uber

Ride Completed

↓

Receipt Service

↓

Database Timeout

↓

NACK

↓

Retry Queue

↓

Success

Customer eventually receives receipt.

---

# Advantages

## Reliable Delivery

Critical business events aren't lost.

---

## Crash Recovery

Durable queues recover automatically.

---

## Controlled Retries

Failures handled gracefully.

---

## Better Load Distribution

Prefetch improves throughput.

---

# Disadvantages

- Slightly higher latency
- Disk I/O
- More configuration
- Monitoring complexity

---

# Common Mistakes

❌ Using Auto ACK in production.

---

❌ Forgetting Publisher Confirms.

---

❌ Durable Queue without Persistent Messages.

---

❌ Infinite retries.

---

❌ Prefetch too large.

---

# Memory Trick

Remember

```text
Producer

↓

Publisher Confirm

↓

Exchange

↓

Queue

↓

Consumer

↓

ACK

↓

Delete
```

Publisher confirms protect producers.

ACK protects consumers.

---

# Reliability Dependency Map

```text
RabbitMQ

│

├── Producer

│      │

│      └── Publisher Confirm

│

├── Queue

│      │

│      ├── Durable

│      └── Persistent Messages

│

├── Consumer

│      │

│      ├── ACK

│      ├── NACK

│      └── Retry

│

└── Dead Letter Queue
```

---

# Cheat Sheet

- ACK = Success
- NACK = Failure
- Publisher Confirm = Broker received message
- Durable Queue = Queue survives restart
- Persistent Message = Message survives restart
- Prefetch = Consumer workload control
- Retry = Temporary failures
- DLQ = Permanent failures

---

# Interview Questions & Solutions

## Question 1

### Question

What's the difference between a Durable Queue and a Persistent Message?

### What the Interviewer is Testing

Whether you understand RabbitMQ persistence.

### Ideal Answer

A Durable Queue ensures the queue definition survives broker restarts, while a Persistent Message ensures the message itself is written to disk. Both must be used together for full durability.

### Common Mistake

Saying durable queues automatically persist messages.

---

## Question 2

### Question

Why is Manual ACK preferred over Auto ACK?

### Ideal Answer

Manual ACK guarantees that RabbitMQ removes a message only after successful processing. If the consumer crashes before sending an ACK, RabbitMQ can redeliver the message.

---

## Question 3

### Question

What problem do Publisher Confirms solve?

### Ideal Answer

They allow the producer to know whether RabbitMQ successfully accepted the message. Without confirms, network failures can create uncertainty about message delivery.

---

## Question 4

### Question

Why do we use Prefetch Count?

### Ideal Answer

Prefetch prevents slow consumers from receiving too many messages. It improves fairness, resource utilization, and overall throughput.

---

## Question 5 (FAANG)

### Question

Design a reliable payment messaging pipeline using RabbitMQ.

### Ideal Answer

- Persistent messages
- Durable queues
- Publisher confirms
- Manual ACKs
- Retry with exponential backoff
- Dead Letter Queue
- Idempotent consumers
- Monitoring for queue depth, ACK failures, and retries

This ensures no payment event is silently lost while maintaining resilience.

---

# Design Exercise

Design a messaging architecture for a banking platform.

Include:

- Reliable payment events
- Retry strategy
- ACK/NACK handling
- Dead Letter Queue
- Monitoring
- Disaster recovery

Explain how your design prevents message loss.

---

# Revision Notes

- ACK confirms successful processing.
- NACK indicates processing failure.
- Durable queues preserve queue definitions.
- Persistent messages survive broker restarts.
- Publisher confirms protect producers.
- Prefetch improves fair dispatch.
- Retries handle transient failures.
- DLQs isolate poison messages.

---

# Next Part

**Chapter 7 – Part 7: RabbitMQ Patterns & Apache Kafka Introduction**

Topics:

- Work Queues
- Publish/Subscribe
- Request–Reply Pattern
- Competing Consumers
- Saga Integration
- Why Kafka Was Created
- RabbitMQ vs Kafka (Introduction)