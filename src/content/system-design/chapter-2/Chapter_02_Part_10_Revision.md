# The Ultimate System Design Handbook

# Chapter 2 -- Scalability Fundamentals

# Part 10 -- Revision Chapter

> **Purpose:** Consolidate everything learned in Chapter 2 into a single
> revision guide for interviews.

------------------------------------------------------------------------

# Quick Revision

## Scalability

-   Scalability is the ability of a system to handle increasing workload
    while maintaining acceptable performance.
-   Scaling is different from optimization. Optimization improves the
    current system, while scaling prepares it for future growth.

------------------------------------------------------------------------

## Vertical vs Horizontal Scaling

### Vertical Scaling

-   Upgrade CPU, RAM, or storage of one machine.
-   Simple but has hardware limits.

### Horizontal Scaling

-   Add more machines.
-   Requires load balancing and stateless services.
-   Preferred for internet-scale systems.

------------------------------------------------------------------------

## Stateless Architecture

A stateless service stores no client-specific state in local memory.

Benefits: - Easy horizontal scaling - Easy failover - Easier deployments

State is externalized to: - Redis - Database - JWT

------------------------------------------------------------------------

## Load Balancers

Responsibilities: - Distribute traffic - Remove unhealthy instances -
Improve availability - Enable horizontal scaling

Algorithms: - Round Robin - Least Connections - IP Hash

------------------------------------------------------------------------

## Sticky Sessions

Use only when required for legacy systems.

Modern alternatives: - Redis Session Store - JWT - Stateless APIs

------------------------------------------------------------------------

## Auto Scaling

Scaling can be:

-   Reactive
-   Predictive

Typical metrics: - CPU - Memory - Request rate - Queue length - Latency

Remember cooldown periods.

------------------------------------------------------------------------

## Geographic Distribution

Deploy across:

-   Multiple Availability Zones
-   Multiple Regions

Reasons: - Lower latency - Disaster recovery - Higher availability

------------------------------------------------------------------------

## Cost vs Performance

Good architects optimize for business value.

Avoid:

-   Over-engineering
-   Under-engineering

Always justify complexity.

------------------------------------------------------------------------

## Dropbox Case Study

Key architectural components:

-   Load Balancer
-   Stateless APIs
-   Metadata Database
-   Object Storage
-   Queue
-   CDN

------------------------------------------------------------------------

# Chapter Cheat Sheet

  Topic                Key Idea
  -------------------- --------------------------------
  Vertical Scaling     Bigger machine
  Horizontal Scaling   More machines
  Stateless            Any server can handle requests
  Load Balancer        Distributes traffic
  Sticky Sessions      Avoid for modern systems
  Auto Scaling         Dynamic resource allocation
  Multi-Region         Global availability
  CDN                  Reduce latency
  Cost Trade-offs      Simplicity first

------------------------------------------------------------------------

# Flashcards

### Q

What is scalability?

**A** Ability to maintain acceptable performance as demand increases.

------------------------------------------------------------------------

### Q

Difference between vertical and horizontal scaling?

**A** Vertical = bigger server. Horizontal = more servers.

------------------------------------------------------------------------

### Q

Why are stateless services preferred?

**A** They simplify load balancing, failover, and auto scaling.

------------------------------------------------------------------------

### Q

What does a load balancer do?

**A** Distributes incoming traffic across healthy backend servers.

------------------------------------------------------------------------

### Q

Why avoid sticky sessions?

**A** They tightly couple users to servers and reduce scalability.

------------------------------------------------------------------------

### Q

Reactive vs Predictive Scaling?

**A** Reactive responds after load increases. Predictive anticipates
future demand.

------------------------------------------------------------------------

### Q

Difference between Region and Availability Zone?

**A** AZ = isolated data center. Region = geographic location containing
multiple AZs.

------------------------------------------------------------------------

# Mind Map

``` text
Scalability
│
├── Scale Up
├── Scale Out
│
├── Stateless
│     ├── JWT
│     └── Redis
│
├── Load Balancer
│     ├── Round Robin
│     ├── Least Connections
│     └── Health Checks
│
├── Auto Scaling
│
├── Multi Region
│
└── Cost Trade-offs
```

------------------------------------------------------------------------

# Common Mistakes

-   Choosing distributed systems too early.
-   Forgetting statelessness.
-   Ignoring bottlenecks.
-   Assuming more servers always solve the problem.
-   Designing for billions without traffic estimates.
-   Ignoring operational costs.

------------------------------------------------------------------------

# Interview Questions (No Answers)

## Level 1

1.  What is scalability, and why is it important?

## Level 2

2.  When would you choose vertical scaling over horizontal scaling?

## Level 3

3.  Why are stateless services easier to scale than stateful services?

## Level 4

4.  Design the frontend infrastructure for a globally distributed web
    application. Explain your load balancing strategy.

## Level 5

5.  Design Dropbox for 100 million users. Explain scaling, storage,
    synchronization, bottlenecks, and disaster recovery.

------------------------------------------------------------------------

# Design Exercises

1.  Design a scalable URL Redirect Service.
2.  Design an image hosting platform.
3.  Design a food delivery backend.
4.  Modify the Dropbox architecture for multi-region deployment.
5.  Identify bottlenecks in a single-server architecture and propose
    scaling improvements.

------------------------------------------------------------------------

# Cross-Topic Dependency Map

``` text
System Design Thinking
        │
        ▼
Capacity Estimation
        │
        ▼
Scalability
        │
        ├── Stateless Services
        ├── Load Balancer
        ├── Auto Scaling
        ├── Multi Region
        └── Cost Trade-offs
                │
                ▼
Database Scaling (Next Chapter)
```

------------------------------------------------------------------------

# Next Chapter Preview

**Chapter 3 -- Database Fundamentals**

Topics:

-   RDBMS vs NoSQL
-   ACID vs BASE
-   CAP & PACELC
-   Indexing
-   Schema Design
-   Query Optimization
-   Database Bottlenecks
-   Local Delivery Service Case Study
