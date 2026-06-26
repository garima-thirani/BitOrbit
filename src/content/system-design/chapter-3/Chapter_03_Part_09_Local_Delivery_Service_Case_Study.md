# The Ultimate System Design Handbook

# Chapter 3 -- Database Fundamentals

# Part 9 -- Case Study: Designing the Database for a Local Delivery Service

> **Theme:** A good database design is not about creating tables---it is
> about modeling a business. In this case study, we'll design the
> database for a food and grocery delivery platform similar to Uber
> Eats, DoorDash, Swiggy, or Zomato.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Convert business requirements into a database design.
-   Identify entities and relationships.
-   Choose between SQL and NoSQL for different workloads.
-   Understand indexing and scaling decisions.
-   Explain database trade-offs in a system design interview.

------------------------------------------------------------------------

# Problem Statement

Design the backend database for a local delivery platform where users
can:

-   Browse restaurants and stores
-   Search for food or products
-   Place orders
-   Track delivery partners
-   Make payments
-   View order history

The platform should support millions of users and thousands of
concurrent orders.

------------------------------------------------------------------------

# Step 1 -- Functional Requirements

The system should support:

-   Customer registration
-   Restaurant onboarding
-   Menu management
-   Product search
-   Cart management
-   Order placement
-   Payment processing
-   Delivery partner assignment
-   Live order tracking
-   Ratings & reviews

------------------------------------------------------------------------

# Step 2 -- Non-Functional Requirements

The system should be:

-   Highly available
-   Fault tolerant
-   Horizontally scalable
-   Low latency
-   Durable
-   Secure
-   Able to process large traffic spikes during meal times

------------------------------------------------------------------------

# Step 3 -- Identify Core Entities

The primary entities are:

``` text
Customer
Restaurant
Menu Item
Cart
Order
Payment
Delivery Partner
Location
Review
```

These entities become the foundation of the schema.

------------------------------------------------------------------------

# Step 4 -- Relational Schema

``` text
Customers
-----------
customer_id (PK)
name
phone
email

Restaurants
-------------
restaurant_id (PK)
name
address
rating

Menu_Items
-------------
item_id (PK)
restaurant_id (FK)
name
price
category

Orders
-------------
order_id (PK)
customer_id (FK)
restaurant_id (FK)
status
total_price
created_at

Order_Items
--------------
order_item_id (PK)
order_id (FK)
item_id (FK)
quantity

Payments
--------------
payment_id (PK)
order_id (FK)
status
amount

Delivery_Partners
-------------------
partner_id (PK)
name
vehicle
status

Reviews
----------
review_id (PK)
customer_id (FK)
restaurant_id (FK)
rating
comment
```

------------------------------------------------------------------------

# Why SQL?

Core transactional data requires:

-   ACID guarantees
-   Foreign keys
-   Referential integrity
-   Complex joins

Examples:

-   Orders
-   Payments
-   Customers
-   Restaurants

A relational database like PostgreSQL is an excellent fit.

------------------------------------------------------------------------

# Where NoSQL Fits

Some workloads benefit from NoSQL.

Examples:

## Live Driver Locations

``` json
{
  "driver":"D42",
  "lat":12.97,
  "lon":77.59,
  "updated":"2026-01-15T12:30:10Z"
}
```

Frequent location updates are better suited to a distributed NoSQL store
or an in-memory data store.

## Search

Restaurant and menu search is often powered by a dedicated search engine
(e.g., Elasticsearch/OpenSearch) rather than the primary database.

------------------------------------------------------------------------

# Step 5 -- Relationships

``` text
Customer
    │
    ▼
 Orders
    │
    ├────────► Payments
    │
    ├────────► Order Items
    │
    ▼
Restaurant
    │
    ▼
Menu Items

Order
    │
    ▼
Delivery Partner
```

------------------------------------------------------------------------

# Step 6 -- Indexing Strategy

Indexes should match access patterns.

Examples:

  Table               Index
  ------------------- ---------------
  Customers           email
  Orders              customer_id
  Orders              restaurant_id
  Orders              created_at
  Menu_Items          restaurant_id
  Delivery_Partners   status

Avoid indexing rarely queried columns.

------------------------------------------------------------------------

# Step 7 -- Typical Queries

### Customer Order History

``` sql
SELECT *
FROM Orders
WHERE customer_id = ?
ORDER BY created_at DESC;
```

### Restaurant Orders

``` sql
SELECT *
FROM Orders
WHERE restaurant_id = ?
AND status='PREPARING';
```

### Popular Menu Items

Aggregate queries may be served from analytics pipelines instead of the
OLTP database.

------------------------------------------------------------------------

# Scaling Considerations

As the platform grows:

-   Read replicas handle reporting queries.
-   Redis caches restaurant and menu data.
-   Search moves to Elasticsearch/OpenSearch.
-   Driver locations move to a geospatial store.
-   Orders may eventually be partitioned by region or time.

Different workloads evolve independently.

------------------------------------------------------------------------

# Potential Bottlenecks

-   Order table growth
-   Hot restaurants during promotions
-   Payment transaction spikes
-   Restaurant search
-   Delivery partner location updates

Monitoring should identify which component becomes the bottleneck before
scaling.

------------------------------------------------------------------------

# Trade-offs

  Decision        Benefit              Cost
  --------------- -------------------- -------------------------------
  PostgreSQL      Strong consistency   Harder horizontal scaling
  Redis Cache     Faster reads         Cache invalidation complexity
  Search Engine   Fast text search     Additional infrastructure
  Read Replicas   Scale reads          Replication lag

------------------------------------------------------------------------

# Interview Walkthrough

A strong interview answer:

1.  Clarify requirements.
2.  Identify entities.
3.  Design schema.
4.  Define relationships.
5.  Explain indexes.
6.  Discuss SQL vs NoSQL.
7.  Add caching.
8.  Discuss scaling.
9.  Identify bottlenecks.
10. Explain trade-offs.

------------------------------------------------------------------------

# Common Mistakes

-   Storing everything in one table.
-   Using NoSQL without justification.
-   Forgetting indexes.
-   Mixing transactional and analytical workloads.
-   Ignoring future growth.

------------------------------------------------------------------------

# Memory Trick

Remember:

**Transactions → SQL**

**Search → Search Engine**

**Cache → Redis**

**Live Locations → NoSQL/In-memory**

------------------------------------------------------------------------

# Dependency Map

``` text
Requirements
      │
      ▼
Schema Design
      │
      ├── SQL
      ├── NoSQL
      ├── Indexes
      ├── Query Optimization
      ├── Caching
      └── Database Scaling
```

------------------------------------------------------------------------

# Coming Next

**Part 10 -- Chapter 3 Revision**

Includes:

-   Cheat Sheet
-   Flashcards
-   Mind Map
-   Common Mistakes
-   Interview Questions
-   Design Exercises
-   Cross-topic Dependency Map
