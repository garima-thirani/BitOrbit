# The Ultimate System Design Handbook

# Chapter 3 -- Database Fundamentals

# Part 7 -- Schema Design & Query Optimization

> **Theme:** A database schema is the blueprint of your data. A good
> schema makes queries simple, fast, and maintainable. A poor schema
> creates bottlenecks that no amount of hardware can fix.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand what database schema design is.
-   Learn normalization and denormalization.
-   Design tables using primary and foreign keys.
-   Write efficient queries.
-   Understand execution plans and the N+1 query problem.
-   Recognize common schema design mistakes.

------------------------------------------------------------------------

# Story -- Organizing a Warehouse

Imagine two warehouses.

The first labels every shelf, groups similar products together, and
keeps an inventory map.

The second throws everything into random boxes.

Finding a product in the first warehouse takes seconds.

Finding it in the second takes hours.

The warehouse layout is like a database schema.

A well-organized schema reduces work for every query.

------------------------------------------------------------------------

# What is a Database Schema?

A schema defines:

-   Tables
-   Columns
-   Data types
-   Relationships
-   Constraints
-   Indexes

It is the structural blueprint of a database.

Example:

``` text
Users
---------
id
name
email

Orders
---------
id
user_id
amount
status
```

------------------------------------------------------------------------

# Primary Keys

A primary key uniquely identifies every row.

Example:

``` sql
Users(id)
```

Properties:

-   Unique
-   Not NULL
-   Stable
-   Frequently indexed

Good primary keys:

-   UUID
-   Auto Increment
-   Snowflake IDs

------------------------------------------------------------------------

# Foreign Keys

A foreign key connects tables.

``` text
Users
  │
  └──────┐
         ▼
Orders.user_id
```

Benefits:

-   Referential integrity
-   Prevent orphan records
-   Clear relationships

------------------------------------------------------------------------

# Normalization

## Intuition

Avoid storing the same information repeatedly.

Bad Design:

``` text
Orders

Customer Name
Customer Address
Customer Phone
```

Repeated thousands of times.

Better Design:

``` text
Customers

id
name
address

Orders

customer_id
amount
```

Store customer information once.

------------------------------------------------------------------------

# Benefits of Normalization

-   Less duplication
-   Smaller storage
-   Easier updates
-   Better consistency

Trade-off:

Queries often require JOINs.

------------------------------------------------------------------------

# Denormalization

Sometimes duplication is intentional.

Example:

Store:

``` text
Customer Name
```

inside an order record.

Why?

Historical accuracy.

If the customer changes their name later, past invoices should remain
unchanged.

Denormalization also improves read performance by reducing joins.

------------------------------------------------------------------------

# When to Normalize vs Denormalize

  Normalize   Denormalize
  ----------- -----------------
  Banking     Analytics
  ERP         Reporting
  Inventory   Product Catalog
  OLTP        Read-heavy APIs

------------------------------------------------------------------------

# Query Optimization

Fast systems are not built with magic.

They are built with efficient queries.

Example:

Bad:

``` sql
SELECT *
FROM Users;
```

Returns unnecessary columns.

Better:

``` sql
SELECT id, name
FROM Users;
```

Only retrieve what you need.

------------------------------------------------------------------------

# Filtering Early

Good:

``` sql
SELECT id
FROM Orders
WHERE status='PAID';
```

Avoid loading unnecessary rows.

------------------------------------------------------------------------

# Avoid SELECT \*

Reasons:

-   More network traffic
-   More memory
-   Poor cache efficiency
-   Unnecessary disk reads

Always request only required columns.

------------------------------------------------------------------------

# Execution Plans

Databases do not execute queries exactly as written.

The optimizer chooses an execution plan.

Possible operations:

-   Index Scan
-   Table Scan
-   Nested Loop Join
-   Hash Join
-   Merge Join

Use tools like:

``` sql
EXPLAIN
```

or

``` sql
EXPLAIN ANALYZE
```

to inspect query performance.

------------------------------------------------------------------------

# The N+1 Query Problem

Suppose you fetch 100 orders.

Then, for each order, you fetch its customer.

``` text
1 query

+

100 queries

=

101 queries
```

This is the N+1 problem.

Solutions:

-   JOIN
-   Batch loading
-   DataLoader pattern
-   ORM eager loading

------------------------------------------------------------------------

# Production Example

An e-commerce application lists 200 products.

Bad implementation:

-   One query for products.
-   One query per product image.
-   One query per product category.

Total:

401 database queries.

Optimized implementation:

Use JOINs or batch fetching.

Total:

2--3 queries.

Huge latency improvement.

------------------------------------------------------------------------

# Best Practices

-   Design around access patterns.
-   Keep rows reasonably small.
-   Index frequently filtered columns.
-   Review slow queries regularly.
-   Benchmark before optimizing.

------------------------------------------------------------------------

# Interview Callout

**Question**

"When would you denormalize a database?"

Good answer:

> "When reducing joins significantly improves read performance and the
> application can tolerate some controlled data duplication."

------------------------------------------------------------------------

# Common Mistakes

-   Over-normalizing everything.
-   Excessive denormalization.
-   Missing foreign keys.
-   Ignoring query patterns.
-   Blindly trusting the ORM.

------------------------------------------------------------------------

# Memory Trick

Remember:

**Normalize for correctness.**

**Denormalize for performance.**

------------------------------------------------------------------------

# Quick Summary

  Concept           Purpose
  ----------------- ----------------------
  Primary Key       Unique row
  Foreign Key       Relationships
  Normalization     Reduce duplication
  Denormalization   Faster reads
  EXPLAIN           Understand execution
  N+1               Too many queries

------------------------------------------------------------------------

# Dependency Map

``` text
Schema Design
      │
      ├── Primary Keys
      ├── Foreign Keys
      ├── Normalization
      ├── Indexes
      ├── Query Optimization
      └── Database Scaling
```

------------------------------------------------------------------------

# Coming Next

**Part 8 -- Database Performance Bottlenecks**

Topics:

-   Slow queries
-   Lock contention
-   Connection limits
-   Disk I/O
-   Memory pressure
-   Monitoring and optimization
