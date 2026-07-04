# The Ultimate System Design Handbook

# Chapter 7 – Messaging Systems

# Part 12 – Case Study: Designing a Global Messaging Platform (WhatsApp / Tinder / Messenger)

> **"Messaging systems look deceptively simple. A user types a message, presses Send, and another user receives it. In reality, every message travels through dozens of distributed components before appearing on the recipient's screen."**

---

# Learning Objectives

By the end of this chapter you will be able to:

- Design a global messaging platform
- Understand one-to-one messaging architecture
- Design group chat systems
- Handle offline users
- Design message ordering
- Understand read receipts
- Understand typing indicators
- Design presence service
- Scale WebSocket infrastructure
- Design push notification flow
- Understand message synchronization
- Discuss interview trade-offs

---

# Story – Designing WhatsApp

Imagine you're an engineer at WhatsApp.

Day 1:

You have

```
100 users
```

Messages flow like this.

```text
Alice

↓

Server

↓

Bob
```

Everything works.

---

Three years later.

Now you have

```
2 Billion Users
```

Every second:

- Millions of messages
- Millions of typing events
- Millions of read receipts
- Millions of presence updates
- Millions of image uploads

Now every design decision matters.

---

# Functional Requirements

Users should be able to:

- Send messages
- Receive messages
- Receive messages instantly
- View delivery status
- View read receipts
- Create group chats
- Receive push notifications
- View online status
- Send media
- Synchronize messages across devices

---

# Non-Functional Requirements

The system should provide:

- Low latency (<100 ms message delivery)
- High availability
- Horizontal scalability
- Fault tolerance
- Message durability
- Eventual consistency where acceptable
- End-to-end encryption support

---

# High-Level Architecture

```text
                Mobile Apps

                     │

             Load Balancer

                     │

             API Gateway

                     │

        ┌────────────┼────────────┐

        ▼            ▼            ▼

 Messaging     Presence      Notification

   Service      Service         Service

        │            │            │

        └────────────┼────────────┘

                     ▼

             Kafka / RabbitMQ

                     │

         Storage + WebSocket Cluster
```

---

# Why WebSockets?

HTTP works like this.

```text
Client

↓

Request

↓

Response

↓

Connection Closed
```

Good for APIs.

Terrible for chat.

---

Instead we use

```
WebSockets
```

```text
Client

⇅

Persistent Connection

⇅

Messaging Server
```

Connection stays open.

Server can push messages immediately.

---

# Message Flow

Alice sends

```
Hello Bob
```

Flow:

```text
Alice

↓

WebSocket

↓

Messaging Server

↓

Kafka

↓

Bob's Connection

↓

Bob
```

Latency

Typically

```
30–80 ms
```

---

# What If Bob Is Offline?

Bob disconnects.

Should Alice lose the message?

No.

Instead

```text
Alice

↓

Messaging Server

↓

Kafka

↓

Database

↓

Bob Offline

↓

Store Message
```

Later

Bob reconnects.

Server loads pending messages.

---

# Offline Synchronization

When Bob reconnects

```text
Client

↓

Last Seen Offset = 950

↓

Server

↓

Messages

951

952

953

954
```

Only missing messages are transmitted.

Very efficient.

---

# Message IDs

Every message gets

```
Global Unique ID
```

Example

```
msg_874629192
```

Used for

- Ordering
- Deduplication
- Delivery tracking

---

# Message Status

Most chat applications show

```text
✓

Sent

✓✓

Delivered

✓✓ Blue

Read
```

Internally

```text
Created

↓

Stored

↓

Delivered

↓

Read
```

Each transition is an event.

---

# Read Receipts

Bob opens chat.

Client sends

```
Read

↓

Message ID
```

Server publishes

```
MessageRead
```

Alice receives

```
✓✓ Blue
```

Notice

Read receipts themselves are messages.

---

# Typing Indicator

Typing indicators are **not persisted**.

They are ephemeral events.

Flow

```text
Alice Typing

↓

WebSocket

↓

Server

↓

Bob
```

If dropped

Nothing bad happens.

Never store typing events.

---

# Presence Service

Users constantly switch between

- Online
- Offline
- Away

Dedicated Presence Service tracks this.

```text
Alice Connected

↓

Presence Server

↓

Redis

↓

Friends Query Status
```

Redis is ideal because presence changes constantly.

---

# Why Redis?

Presence information

- Frequently updated
- Frequently read
- Doesn't require permanent storage

Perfect cache workload.

---

# Group Chat

Suppose

```
100 members
```

Alice sends

```
Hi Everyone
```

Flow

```text
Alice

↓

Messaging Service

↓

Fan-out

↓

Member 1

Member 2

Member 3

...

Member 100
```

---

# Group Fan-Out Problem

Imagine

```
10 Million Member Group
```

Naive fan-out becomes impossible.

Solutions

- Hierarchical fan-out
- Batch processing
- Kafka partitions
- Regional distribution

Large public channels require different architectures.

---

# Message Ordering

Suppose

Alice sends

```
A

B

C
```

Bob receives

```
A

C

B
```

Bad.

Ordering matters.

Solution

Per-conversation sequence numbers.

```text
Conversation

↓

Seq 101

Seq 102

Seq 103
```

Clients reorder if necessary.

---

# Duplicate Messages

Network timeout.

Client retries.

Server receives twice.

Solution

Every message includes

```
Message ID
```

Already exists?

Ignore duplicate.

---

# Push Notifications

Bob offline.

Server stores message.

Then

```text
Notification Service

↓

Apple APNS

↓

Google FCM

↓

Bob Phone
```

Push notification

```
New Message
```

When Bob opens app

Full synchronization occurs.

---

# Media Messages

Never send videos through Kafka.

Instead

```text
Image

↓

Object Storage

↓

URL

↓

Message Contains URL
```

Examples

- Amazon S3
- Google Cloud Storage
- Azure Blob Storage

Chat carries metadata.

Storage handles media.

---

# Database Design

Messages

```text
ConversationID

MessageID

SenderID

Timestamp

Content

Status
```

Indexes

```
ConversationID

Timestamp
```

Enable efficient history retrieval.

---

# Scaling Strategy

Scale independently.

```text
Messaging Service

↓

100 Servers

----------------

Presence Service

↓

50 Servers

----------------

Notification

↓

30 Servers
```

Microservices scale independently.

---

# Partition Strategy

Kafka

Partition Key

```
ConversationID
```

All messages of one conversation stay together.

Ordering preserved.

---

# Failure Scenario

Messaging Server crashes.

WebSocket disconnects.

Client reconnects.

```text
Reconnect

↓

Last Offset

↓

Replay Missing Messages
```

No message loss.

---

# Monitoring

Track

- Active WebSockets
- Consumer Lag
- Queue Depth
- Message Latency
- Delivery Rate
- Failed Notifications
- Presence Accuracy

---

# Security

Authentication

JWT

↓

API Gateway

↓

Messaging

Messages encrypted

TLS

Sensitive messages

End-to-End Encryption

---

# Production Architecture

```text
Users

↓

Load Balancer

↓

WebSocket Cluster

↓

Messaging Service

↓

Kafka

↓

Storage

↓

Notification Service

↓

APNS / FCM
```

---

# Amazon Chime Example

Uses

- WebSockets
- Distributed messaging
- Push notifications
- Persistent storage
- Multi-region replication

---

# WhatsApp

Uses

- Persistent TCP/WebSocket connections
- Message acknowledgements
- Offline synchronization
- End-to-end encryption
- Efficient fan-out

---

# Tinder

Chat architecture

- WebSockets
- Kafka
- Push notifications
- Read receipts
- Presence
- Media stored separately

---

# Advantages

✅ Low latency

✅ Horizontal scalability

✅ Offline support

✅ Durable messaging

✅ Reliable delivery

---

# Challenges

❌ Message ordering

❌ Global latency

❌ Fan-out

❌ Multi-device synchronization

❌ Presence scaling

❌ Billions of WebSocket connections

---

# Common Interview Mistakes

❌ Using HTTP polling for chat.

---

❌ Storing media inside Kafka.

---

❌ Ignoring offline users.

---

❌ Forgetting message ordering.

---

❌ No deduplication strategy.

---

# Memory Trick

Remember

```
Connect

↓

Send

↓

Store

↓

Deliver

↓

ACK

↓

Read

↓

Sync
```

This is the complete lifecycle of a chat message.

---

# Dependency Map

```text
Messaging Platform

│

├── WebSockets

├── Kafka

├── RabbitMQ

├── Redis

├── Notifications

├── Object Storage

├── Database

├── Presence

├── Ordering

└── Synchronization
```

---

# Cheat Sheet

| Component | Responsibility |
|------------|----------------|
| WebSocket | Real-time communication |
| Kafka | Event streaming |
| RabbitMQ | Background jobs |
| Redis | Presence |
| Database | Chat history |
| Object Storage | Images & Videos |
| APNS/FCM | Push notifications |

---

# Interview Questions & Solutions

## Question 1

### Question

Why are WebSockets preferred over HTTP polling for messaging systems?

### Ideal Answer

WebSockets maintain a persistent bidirectional connection, allowing the server to push new messages instantly without repeated client polling. This reduces latency, network overhead, and server load while providing a much better user experience for real-time messaging.

---

## Question 2

### Question

How would you support offline users?

### Ideal Answer

Persist messages in a durable database or event log. When a user reconnects, the client sends its last synchronized message or offset, and the server returns only the missing messages. Push notifications can alert the user that new messages are available.

---

## Question 3

### Question

Why shouldn't images and videos be stored inside Kafka?

### Ideal Answer

Kafka is optimized for streaming events, not storing large binary objects. Media should be uploaded to object storage such as Amazon S3, and chat messages should contain only metadata or URLs pointing to the media.

---

## Question 4

### Question

How do you preserve message ordering?

### Ideal Answer

Assign sequence numbers per conversation and partition Kafka topics by Conversation ID so that all messages for a conversation are processed in the same partition. Clients can use sequence numbers to reorder messages if necessary.

---

## Question 5 (FAANG)

### Question

Design WhatsApp for two billion users.

### Ideal Answer

Use WebSockets for real-time delivery, Kafka for event streaming, Redis for presence, durable storage for message history, object storage for media, push notification services (APNS/FCM) for offline users, and horizontal scaling of messaging, presence, and notification services. Partition by Conversation ID to preserve ordering and use message IDs for deduplication.

---

# Design Exercise

Design a messaging platform supporting:

- One-to-one chat
- Group chat
- Read receipts
- Typing indicators
- Presence
- Offline synchronization
- Media sharing
- End-to-end encryption

Justify every architectural component and discuss the trade-offs.

---

# Revision Notes

- WebSockets provide low-latency real-time communication.
- Kafka enables scalable event streaming.
- Redis is ideal for presence tracking.
- Object storage is the correct place for media.
- Conversation IDs preserve ordering.
- Message IDs enable deduplication.
- Push notifications bridge the gap for offline users.
- Multi-device synchronization relies on offsets or sequence numbers.

---

# Next Part

**Chapter 7 – Part 13: Advanced Messaging Patterns**

Topics:

- Saga Pattern
- Transactional Outbox
- Inbox Pattern
- Change Data Capture (CDC)
- Debezium
- Kafka Connect
- Choreography vs Orchestration
- Event Sourcing (Introduction)
- CQRS Integration
- Distributed Transactions
- Production Architectures from Uber, Amazon, and Netflix