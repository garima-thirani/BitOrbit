# The Ultimate System Design Handbook

# Chapter 3 -- Database Fundamentals

# Part 6 -- Database Indexing

> **Theme:** Indexes are like the index at the back of a book. Without
> them, the database must read everything. With them, it knows exactly
> where to look.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand why indexes exist.
-   Learn how B-Tree indexes work.
-   Compare B-Tree and Hash indexes.
-   Understand composite indexes.
-   Learn clustered vs non-clustered indexes.
-   Recognize common indexing mistakes.

------------------------------------------------------------------------

# Story -- Finding a Name in a Phone Book

Imagine a phone book with 10 million names.

Without an index, you'd start from page one and read until you found
"John Smith."

Now imagine the names are sorted alphabetically.

You immediately jump near "J" and quickly narrow your search.

That alphabetical organization is exactly what a database index
provides.

------------------------------------------------------------------------

# Why Indexes Exist

When a table is small, scanning every row is acceptable.

As data grows into millions of rows, full table scans become expensive.

Indexes reduce the amount of data the database must inspect.

Without an index:

``` text
Query
  │
  ▼
Read Every Row
```

With an index:

``` text
Query
  │
  ▼
Index
  │
  ▼
Matching Rows
```

------------------------------------------------------------------------

# What is an Index?

An index is an auxiliary data structure that stores searchable
information about one or more columns, allowing the database to locate
matching rows efficiently.

Think of it as a map pointing to where the real data lives.

------------------------------------------------------------------------

# B-Tree Index

## Intuition

Most relational databases use B-Trees because they remain balanced as
data grows.

Instead of searching linearly:

``` text
1
2
3
4
...
1000000
```

The tree repeatedly eliminates large portions of the search space.

Example:

``` text
          50
        /    \
      25      75
     / \     /  \
   10 30   60  90
```

Searching becomes approximately **O(log n)** rather than **O(n)**.

------------------------------------------------------------------------

# Why B-Trees Are Popular

They efficiently support:

-   Equality lookups
-   Range queries
-   Sorting
-   Prefix searches

Examples:

``` sql
WHERE age = 25
WHERE age > 30
ORDER BY age
```

------------------------------------------------------------------------

# Hash Index

A hash index computes a hash from the key and jumps directly to the
bucket.

Excellent for:

``` sql
WHERE id = 42
```

Poor for:

``` sql
WHERE id > 42
ORDER BY id
```

Hash indexes cannot preserve ordering.

------------------------------------------------------------------------

# B-Tree vs Hash

  Feature         B-Tree      Hash
  --------------- ----------- -------------
  Equality        Excellent   Excellent
  Range Queries   Excellent   Poor
  ORDER BY        Yes         No
  Prefix Search   Yes         No
  Most Common     Yes         Less Common

------------------------------------------------------------------------

# Composite Index

Sometimes queries filter on multiple columns.

Example:

``` sql
SELECT *
FROM Orders
WHERE customer_id = 42
AND status = 'PAID';
```

A composite index:

``` text
(customer_id, status)
```

allows both conditions to be evaluated efficiently.

## Leftmost Prefix Rule

Given:

``` text
(customer_id, status, created_at)
```

Efficient queries include:

-   customer_id
-   customer_id + status
-   customer_id + status + created_at

Searching only by **status** usually cannot fully use this index.

------------------------------------------------------------------------

# Clustered vs Non-Clustered Index

## Clustered Index

The table's rows are physically stored in index order.

Advantages:

-   Fast range scans
-   Good locality

Limitation:

A table generally has only one clustered index.

------------------------------------------------------------------------

## Non-Clustered Index

Stores keys separately from table data.

``` text
Index
  │
  ▼
Pointer
  │
  ▼
Actual Row
```

A table can have many non-clustered indexes.

------------------------------------------------------------------------

# How a Query Uses an Index

Example:

``` sql
SELECT *
FROM Users
WHERE email='alice@example.com';
```

Execution:

1.  Optimizer checks available indexes.
2.  Chooses the best index.
3.  Traverses the B-Tree.
4.  Finds matching row pointers.
5.  Reads the required rows.

This is why indexes dramatically reduce query time.

------------------------------------------------------------------------

# Production Example

An e-commerce platform searches products by SKU thousands of times per
second.

Without an index:

-   Every request scans millions of rows.

With an index:

-   Lookup becomes nearly instantaneous.

The application serves more users with the same hardware.

------------------------------------------------------------------------

# Advantages

-   Faster reads
-   Better sorting performance
-   Faster joins
-   Efficient filtering
-   Reduced latency

------------------------------------------------------------------------

# Disadvantages

Indexes are not free.

They consume:

-   Disk space
-   Memory
-   Write performance

Every INSERT, UPDATE, or DELETE may require index maintenance.

Too many indexes can slow write-heavy workloads.

------------------------------------------------------------------------

# Interview Callout

**Question**

"Why not create an index on every column?"

Good answer:

> "Indexes improve reads but increase storage and write costs. Each
> additional index must be maintained whenever data changes."

------------------------------------------------------------------------

# Common Mistakes

-   Indexing every column.
-   Ignoring query patterns.
-   Forgetting composite index ordering.
-   Assuming indexes always improve performance.
-   Never reviewing execution plans.

------------------------------------------------------------------------

# Memory Trick

Remember:

**Indexes speed up reads.**

**Indexes slow down writes.**

Everything is a trade-off.

------------------------------------------------------------------------

# Quick Summary

  Index Type      Best Use
  --------------- -------------------------
  B-Tree          General purpose
  Hash            Equality lookups
  Composite       Multi-column filters
  Clustered       Physical ordering
  Non-Clustered   Additional lookup paths

------------------------------------------------------------------------

# Dependency Map

``` text
Database
    │
    ▼
Indexes
    │
    ├── Query Optimization
    ├── Schema Design
    ├── Performance
    ├── Joins
    └── Database Scaling
```

------------------------------------------------------------------------

# Coming Next

**Part 7 -- Schema Design & Query Optimization**

Topics:

-   Good schema design
-   Normalization vs denormalization
-   Primary & foreign keys
-   Efficient queries
-   Query execution plans
-   N+1 query problem
