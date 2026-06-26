# The Ultimate System Design Handbook

# Chapter 2 -- Scalability Fundamentals

# Part 7 -- Geographic Distribution & Multi-Region Deployments

> **Theme:** The internet has no borders. Your users may be thousands of
> kilometers away, but they still expect your application to feel local.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand why applications are deployed across multiple regions.
-   Learn the difference between Regions and Availability Zones.
-   Understand Active-Active and Active-Passive deployments.
-   Learn how global traffic routing works.
-   Discuss disaster recovery and latency trade-offs.

------------------------------------------------------------------------

# Story -- One Restaurant for the Entire World

Imagine opening a single restaurant in New York.

Customers from New York are happy.

Customers from London wait hours.

Customers from Tokyo receive cold food.

The restaurant is excellent.

The location is the problem.

Software behaves the same way.

If your only server is in Virginia, users in India, Australia, and
Europe experience higher latency because every request must travel
across continents.

------------------------------------------------------------------------

# Why Geographic Distribution Matters

As applications grow globally, distance becomes a performance problem.

Reasons to deploy globally:

-   Reduce latency
-   Improve availability
-   Survive regional outages
-   Meet compliance requirements
-   Serve customers closer to where they live

------------------------------------------------------------------------

# Region vs Availability Zone

## Region

A Region is a separate geographic area.

Examples:

-   US East
-   Europe West
-   Asia Pacific

Each region contains independent infrastructure.

------------------------------------------------------------------------

## Availability Zone (AZ)

An Availability Zone is an isolated data center (or group of data
centers) within a Region.

``` text
Region: us-east

 ├── AZ-1
 ├── AZ-2
 └── AZ-3
```

Applications often deploy across multiple AZs first, then across
multiple Regions.

------------------------------------------------------------------------

# Latency

Latency is the time required for data to travel from client to server
and back.

Example:

``` text
User (India)
      │
      ▼
US Server

≈250 ms
```

If a server exists in Mumbai:

``` text
User
 │
 ▼
Mumbai Server

≈20 ms
```

Geographic proximity improves user experience.

------------------------------------------------------------------------

# Active-Passive Deployment

One Region serves traffic.

Another waits for failure.

``` text
Users
  │
  ▼
Primary Region

↓

Failure

↓

Secondary Region Takes Over
```

Advantages:

-   Simpler
-   Lower operational complexity

Disadvantages:

-   Backup resources are mostly idle.
-   Failover takes time.

------------------------------------------------------------------------

# Active-Active Deployment

Both regions serve production traffic simultaneously.

``` text
           Users
             │
      ┌──────┴──────┐
      ▼             ▼
 Region A       Region B
```

Advantages:

-   Better latency
-   Better availability
-   Improved capacity

Challenges:

-   Data replication
-   Conflict resolution
-   Higher cost

------------------------------------------------------------------------

# Global Traffic Routing

Users should ideally connect to the nearest healthy region.

Typical routing methods:

-   Geo-based routing
-   Latency-based routing
-   Anycast
-   DNS-based routing

Example:

``` text
India Users

↓

Mumbai Region

Europe Users

↓

Frankfurt Region
```

------------------------------------------------------------------------

# Disaster Recovery

Regions can fail.

Examples include:

-   Power outages
-   Natural disasters
-   Network failures
-   Human error

A disaster recovery strategy ensures business continuity.

Key terms:

-   **RTO (Recovery Time Objective):** How quickly must service recover?
-   **RPO (Recovery Point Objective):** How much data loss is
    acceptable?

Lower RTO and RPO generally increase cost.

------------------------------------------------------------------------

# Production Example

Netflix deploys services across multiple AWS regions.

Benefits:

-   Regional resilience
-   Lower latency
-   Better availability
-   Controlled failovers during maintenance

Many services also span multiple Availability Zones within a region for
additional resilience.

------------------------------------------------------------------------

# Trade-offs

  Single Region                      Multi-Region
  ---------------------------------- ----------------------
  Lower cost                         Higher cost
  Simpler                            More complex
  Higher latency for distant users   Lower global latency
  Larger blast radius                Better resilience

------------------------------------------------------------------------

# Interview Callout

**Question**

"When would you recommend moving from a single-region deployment to a
multi-region architecture?"

Good answer:

> "When latency, availability, regulatory requirements, or disaster
> recovery objectives justify the added operational complexity and
> cost."

------------------------------------------------------------------------

# Common Mistakes

-   Assuming multi-region is always necessary.
-   Forgetting data replication challenges.
-   Ignoring compliance requirements.
-   Underestimating operational complexity.

------------------------------------------------------------------------

# Memory Trick

Remember:

**Multi-AZ protects against data center failures.**

**Multi-Region protects against regional failures.**

------------------------------------------------------------------------

# Dependency Map

``` text
Scalability
      │
      ▼
Geographic Distribution
      │
      ├── CDN
      ├── DNS
      ├── Disaster Recovery
      ├── Replication
      └── Global Load Balancing
```

------------------------------------------------------------------------

# Coming Next

**Part 8 -- Cost vs Performance Trade-offs**

Topics:

-   Scaling economics
-   When optimization is worth it
-   Cloud cost considerations
-   Performance vs budget
-   Engineering trade-offs
