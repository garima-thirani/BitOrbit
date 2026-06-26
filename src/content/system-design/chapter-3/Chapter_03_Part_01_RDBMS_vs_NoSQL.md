# The Ultimate System Design Handbook

# Chapter 3 -- Database Fundamentals

# Part 1 -- RDBMS vs NoSQL

> **Theme:** There is no universally "best" database. Every database is
> optimized for a particular class of problems.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand why different database models exist.
-   Learn the differences between RDBMS and NoSQL.
-   Choose the right database based on application requirements.
-   Explain database choices confidently in system design interviews.

------------------------------------------------------------------------

# Story -- The Library and the Warehouse

Imagine two businesses.

The first is a **library**. Every book has a catalog number, author,
genre, shelf, and borrowing history. Everything is organized and
relationships matter.

The second is a **warehouse**. Millions of boxes arrive daily, each
containing different items. Some boxes have clothes, some have
electronics, others have books. The structure changes constantly.

Trying to run the warehouse like the library would slow everything down.

Trying to run the library like the warehouse would create chaos.

Databases face the same challenge.

------------------------------------------------------------------------

# Why Different Databases Exist

In the early days, relational databases solved most business problems.

As the web grew, companies like Google, Amazon, Facebook, and Netflix
faced new challenges:

-   Billions of users
-   Massive write traffic
-   Rapid schema evolution
-   Global distribution

Traditional databases struggled in some of these scenarios, leading to
NoSQL systems.

------------------------------------------------------------------------

# What is an RDBMS?

## Intuition

A Relational Database stores data in **tables** connected through
relationships.

Example:

``` text
Users
+----+--------+
| ID | Name   |
+----+--------+

Orders
+----+---------+--------+
| ID | User ID | Amount |
+----+---------+--------+
```

The relationship between tables allows complex queries.

------------------------------------------------------------------------

# Characteristics of RDBMS

-   Fixed schema
-   SQL support
-   Strong consistency
-   ACID transactions
-   Rich joins
-   Referential integrity

Examples:

-   PostgreSQL
-   MySQL
-   Oracle
-   SQL Server

------------------------------------------------------------------------

# What is NoSQL?

## Intuition

NoSQL databases relax some relational constraints to improve
scalability, flexibility, or performance.

"NoSQL" means **Not Only SQL**, not "No SQL".

Common categories:

-   Document
-   Key-Value
-   Column Family
-   Graph

------------------------------------------------------------------------

# Document Databases

Data is stored as JSON-like documents.

Example:

``` json
{
  "user":"Alice",
  "orders":[
    {"item":"Laptop"},
    {"item":"Mouse"}
  ]
}
```

Popular:

-   MongoDB
-   Couchbase

------------------------------------------------------------------------

# Key-Value Stores

Every value is retrieved using a unique key.

``` text
user:42  -> Profile

cart:42  -> Shopping Cart
```

Popular:

-   Redis
-   DynamoDB (key-value mode)

Excellent for caching and session storage.

------------------------------------------------------------------------

# Wide Column Databases

Optimized for enormous datasets and distributed writes.

Popular:

-   Cassandra
-   HBase

Often used for analytics, IoT, and time-series workloads.

------------------------------------------------------------------------

# Graph Databases

Optimized for relationships.

Example:

``` text
Alice
  │
Friend
  │
Bob
```

Popular:

-   Neo4j
-   Amazon Neptune

Ideal for recommendation engines and social networks.

------------------------------------------------------------------------

# RDBMS vs NoSQL

  Feature              RDBMS       NoSQL
  -------------------- ----------- -----------------
  Schema               Fixed       Flexible
  Transactions         Strong      Varies
  Joins                Excellent   Limited
  Horizontal Scaling   Harder      Easier
  Consistency          Strong      Often Tunable
  Query Language       SQL         Vendor Specific

------------------------------------------------------------------------

# When to Choose RDBMS

Use when:

-   Financial systems
-   Inventory
-   ERP
-   Banking
-   Strong consistency required
-   Complex relationships

------------------------------------------------------------------------

# When to Choose NoSQL

Use when:

-   Rapid schema evolution
-   Massive horizontal scale
-   High write throughput
-   Large semi-structured datasets
-   Global distribution

------------------------------------------------------------------------

# Production Examples

**Amazon** - Product catalog: often document-oriented patterns - Orders
& payments: relational databases

**Netflix** - Mix of relational databases, Cassandra, Elasticsearch,
Redis depending on workload.

Modern architectures often use **polyglot persistence**---different
databases for different services.

------------------------------------------------------------------------

# Interview Callout

**Question**

"Which database would you choose?"

Avoid answering with a product name.

Instead explain:

1.  Data model
2.  Access patterns
3.  Consistency needs
4.  Scale
5.  Operational constraints

Then justify the database.

------------------------------------------------------------------------

# Common Mistakes

-   Assuming NoSQL replaces SQL.
-   Choosing MongoDB because "it scales."
-   Ignoring query patterns.
-   Designing around technology instead of requirements.

------------------------------------------------------------------------

# Memory Trick

Remember:

**Relationships → SQL**

**Flexibility & Scale → NoSQL**

------------------------------------------------------------------------

# Dependency Map

``` text
Database Selection
      │
      ├── ACID
      ├── BASE
      ├── CAP
      ├── Indexing
      ├── Sharding
      └── Replication
```

------------------------------------------------------------------------

# Coming Next

**Part 2 -- ACID Properties**

Topics:

-   Atomicity
-   Consistency
-   Isolation
-   Durability
-   Transaction examples
-   Real production failures
