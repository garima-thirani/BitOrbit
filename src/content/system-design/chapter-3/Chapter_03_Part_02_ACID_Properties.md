# The Ultimate System Design Handbook

# Chapter 3 -- Database Fundamentals

# Part 2 -- ACID Properties

> **Theme:** ACID is the foundation of reliable transactional databases.
> It ensures that even when hardware fails, networks disconnect, or
> applications crash, your data remains correct.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand why transactions exist.
-   Learn each ACID property in depth.
-   See real-world examples from banking and e-commerce.
-   Identify common misconceptions.
-   Explain ACID confidently in interviews.

------------------------------------------------------------------------

# Story -- The ATM That Lost Money

Imagine you withdraw ₹10,000 from an ATM.

The ATM deducts the amount from your account.

Before dispensing cash, the ATM loses power.

Your account now shows ₹10,000 less.

You never received the money.

Would you trust this bank again?

Probably not.

Databases face this exact problem millions of times every day.

Without guarantees, partial updates would corrupt data permanently.

This is why transactions and ACID properties exist.

------------------------------------------------------------------------

# What is a Transaction?

## Intuition

A transaction is a **group of operations treated as one logical unit**.

Either every operation succeeds...

or none of them do.

Example:

Transfer ₹500 from Alice to Bob.

1.  Deduct ₹500 from Alice.
2.  Add ₹500 to Bob.

These two operations should never be separated.

------------------------------------------------------------------------

# Formal Definition

A transaction is a sequence of database operations executed as a single
unit of work that satisfies the ACID properties.

------------------------------------------------------------------------

# The Four ACID Properties

``` text
A → Atomicity

C → Consistency

I → Isolation

D → Durability
```

Each property solves a different reliability problem.

------------------------------------------------------------------------

# Atomicity

## Intuition

Think of a light switch.

It is either ON or OFF.

There is no valid "half ON" state.

Transactions work the same way.

They either complete fully or roll back completely.

------------------------------------------------------------------------

## Banking Example

``` text
Alice = ₹1000

Bob = ₹500
```

Transfer ₹200.

Correct outcome:

``` text
Alice = ₹800

Bob = ₹700
```

Wrong outcome:

``` text
Alice = ₹800

Bob = ₹500
```

Money disappeared.

Atomicity prevents this.

------------------------------------------------------------------------

## Rollback

If any operation fails:

``` text
Begin Transaction

↓

Deduct Money

↓

Failure

↓

Rollback
```

The database returns to its previous state.

------------------------------------------------------------------------

# Consistency

## Intuition

A transaction should move the database from one **valid state** to
another.

Database rules must always hold.

Example rule:

    Account Balance >= 0

If a transaction violates this rule, it should fail.

Consistency depends on:

-   Constraints
-   Foreign keys
-   Triggers
-   Business rules

------------------------------------------------------------------------

# Isolation

## Intuition

Imagine two people editing the same document simultaneously.

Without coordination:

-   One overwrites the other.
-   Data becomes inconsistent.

Isolation prevents transactions from interfering with one another.

------------------------------------------------------------------------

## Example

Transaction A:

    Withdraw ₹100

Transaction B:

    Check Balance

Isolation determines whether Transaction B sees:

-   Old balance
-   New balance
-   Partial update

Databases provide different isolation levels to balance correctness and
performance.

------------------------------------------------------------------------

# Durability

## Intuition

Suppose a transaction succeeds.

One second later the database server crashes.

Should the committed data disappear?

No.

Durability guarantees that committed transactions survive failures.

Techniques include:

-   Write-Ahead Logging (WAL)
-   Replication
-   Persistent storage
-   Database checkpoints

------------------------------------------------------------------------

# ACID Together

Imagine purchasing a flight ticket.

The system must:

1.  Reserve the seat.
2.  Charge the payment.
3.  Generate the ticket.

If payment fails:

-   Seat reservation should disappear.

If ticket generation fails:

-   Payment should roll back.

All three operations behave as one transaction.

------------------------------------------------------------------------

# Production Example

### E-commerce Checkout

A checkout transaction may:

-   Create order
-   Deduct inventory
-   Reserve payment

These operations are often transactional within a single database.

When multiple services are involved, distributed transaction patterns
(covered later in the book) are needed.

------------------------------------------------------------------------

# Advantages of ACID

-   Reliable financial systems
-   Predictable behavior
-   Data integrity
-   Easier debugging
-   Strong consistency

------------------------------------------------------------------------

# Trade-offs

Strong guarantees have costs.

Potential downsides:

-   Lock contention
-   Reduced throughput
-   Higher latency
-   Harder horizontal scaling

This is one reason why some internet-scale systems choose alternative
consistency models.

------------------------------------------------------------------------

# Interview Callout

**Question**

"Does ACID mean the database can never lose data?"

Good answer:

> "No. ACID defines transactional guarantees. Durability assumes the
> underlying storage and database implementation are functioning
> correctly. Hardware failures, misconfiguration, or missing backups can
> still cause data loss."

------------------------------------------------------------------------

# Common Mistakes

-   Confusing Consistency with CAP consistency.
-   Thinking ACID automatically means distributed transactions.
-   Assuming NoSQL databases never support ACID.
-   Ignoring the performance cost of strict isolation.

------------------------------------------------------------------------

# Memory Trick

Imagine transferring money:

-   **A**ll or Nothing
-   **C**orrect Rules
-   **I**ndependent Transactions
-   **D**on't Lose Data

------------------------------------------------------------------------

# Quick Summary

  Property      One-Line Memory
  ------------- -----------------
  Atomicity     All or Nothing
  Consistency   Valid State
  Isolation     No Interference
  Durability    Survives Crash

------------------------------------------------------------------------

# Dependency Map

``` text
Transactions
      │
      ▼
ACID
      │
      ├── Isolation Levels
      ├── Locking
      ├── Replication
      ├── BASE
      └── Distributed Transactions
```

------------------------------------------------------------------------

# Coming Next

**Part 3 -- BASE Model**

Topics:

-   Why BASE was introduced
-   Eventual Consistency
-   Soft State
-   Basically Available
-   ACID vs BASE
-   Production examples from Amazon, Cassandra, and DynamoDB
