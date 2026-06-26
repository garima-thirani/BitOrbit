# The Ultimate System Design Handbook

# Chapter 2 -- Scalability Fundamentals

# Part 6 -- Auto Scaling Fundamentals

> **Theme:** A scalable system should be able to grow when traffic
> increases and shrink when demand decreases---automatically.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Understand why auto scaling exists.
-   Differentiate manual scaling from auto scaling.
-   Learn reactive vs predictive scaling.
-   Understand scaling metrics and policies.
-   Explore production examples from AWS and Kubernetes.
-   Discuss interview trade-offs.

------------------------------------------------------------------------

# Story -- Hiring Staff for a Festival

Imagine you own a restaurant.

On weekdays, you have 20 customers.

During a city festival, 2,000 customers arrive.

If you hire 50 chefs permanently:

-   Most of them sit idle on normal days.
-   You waste money.

If you never hire extra staff:

-   Customers wait for hours.
-   Revenue is lost.

The ideal solution?

Hire temporary chefs only when demand increases.

When the festival ends, reduce the staff.

Auto scaling follows exactly the same principle.

------------------------------------------------------------------------

# What Is Auto Scaling?

## Intuition

Auto scaling automatically increases or decreases computing resources
based on workload.

Instead of an engineer manually adding servers, the infrastructure
responds to changing demand.

------------------------------------------------------------------------

# Formal Definition

Auto scaling is the process of automatically adjusting the number or
size of computing resources based on predefined metrics, schedules, or
predictions to maintain performance while optimizing cost.

------------------------------------------------------------------------

# Why Do We Need Auto Scaling?

Traffic on the internet is rarely constant.

Examples:

-   Amazon receives huge traffic during Prime Day.
-   Food delivery apps spike during lunch and dinner.
-   Ticket booking systems spike when concerts go live.
-   Streaming services surge during major sporting events.

Keeping maximum capacity online all the time is expensive.

Auto scaling provides elasticity.

------------------------------------------------------------------------

# Manual Scaling vs Auto Scaling

## Manual Scaling

``` text
Traffic ↑

↓

Engineer receives alert

↓

Logs into cloud console

↓

Adds servers

↓

Traffic stabilizes
```

Problems:

-   Slow
-   Human error
-   Doesn't work well at 3 AM

------------------------------------------------------------------------

## Auto Scaling

``` text
Traffic ↑

↓

Metric crosses threshold

↓

Scaling policy triggered

↓

New instances launched
```

Fast.

Consistent.

Automatic.

------------------------------------------------------------------------

# Reactive vs Predictive Scaling

## Reactive Scaling

Responds after metrics cross a threshold.

Example:

    CPU > 70%

    ↓

    Add two servers

Advantages:

-   Simple
-   Easy to configure

Disadvantages:

-   Brief performance degradation before scaling completes.

------------------------------------------------------------------------

## Predictive Scaling

Uses historical traffic patterns.

Example:

Every weekday at 9 AM:

-   Traffic increases.
-   Launch servers at 8:50 AM.

Advantages:

-   Better user experience.
-   Reduced latency spikes.

Disadvantages:

-   Requires historical data.
-   Less effective for unpredictable workloads.

------------------------------------------------------------------------

# Common Scaling Metrics

  Metric            Typical Threshold
  ----------------- -------------------
  CPU Utilization   60--70%
  Memory Usage      70--80%
  Request Rate      Requests/sec
  Queue Length      Pending jobs
  Response Time     Latency target
  Custom Metrics    Business-specific

The right metric depends on the application.

------------------------------------------------------------------------

# Scaling Policies

## Scale Up

Example:

    CPU > 70%

    ↓

    Add 2 instances

------------------------------------------------------------------------

## Scale Down

Example:

    CPU < 30%

    ↓

    Remove 1 instance

Scaling down should happen slowly to avoid oscillation.

------------------------------------------------------------------------

# Cooldown Period

Suppose a new server is launched.

It needs time to:

-   Boot
-   Join the cluster
-   Receive traffic

If scaling decisions are made too quickly, the system may keep adding
and removing servers unnecessarily.

A cooldown period prevents this.

------------------------------------------------------------------------

# Production Example -- AWS Auto Scaling

``` text
        Users
          │
          ▼
   Load Balancer
          │
   ┌──────┼──────┐
   ▼      ▼      ▼
EC2-1  EC2-2  EC2-3
          │
          ▼
 CloudWatch Metrics
          │
          ▼
 Auto Scaling Group
```

CloudWatch monitors metrics.

The Auto Scaling Group launches or terminates EC2 instances
automatically.

------------------------------------------------------------------------

# Kubernetes Example

``` text
Users
  │
  ▼
Service
  │
  ▼
Pods
  │
  ▼
Horizontal Pod Autoscaler
```

The Horizontal Pod Autoscaler (HPA) increases or decreases the number of
Pods based on resource utilization or custom metrics.

------------------------------------------------------------------------

# Benefits

-   Cost optimization.
-   Improved availability.
-   Handles sudden traffic spikes.
-   Reduces manual intervention.
-   Supports elastic workloads.

------------------------------------------------------------------------

# Limitations

-   New instances require startup time.
-   Poor thresholds can cause instability.
-   Stateful applications are harder to scale automatically.
-   Database scaling is more difficult than application scaling.

------------------------------------------------------------------------

# Interview Callout

**Question**

"Can we auto scale a database the same way we scale API servers?"

Good answer:

> "Not usually. Stateless application servers scale easily, but
> databases involve replication, consistency, storage, and data
> synchronization challenges."

------------------------------------------------------------------------

# Common Mistakes

-   Scaling based only on CPU.
-   Ignoring request latency.
-   Scaling too aggressively.
-   Forgetting cooldown periods.
-   Assuming auto scaling solves database bottlenecks.

------------------------------------------------------------------------

# Memory Trick

Remember:

**Measure → Decide → Scale → Stabilize**

Never scale blindly.

------------------------------------------------------------------------

# Dependency Map

``` text
Horizontal Scaling
        │
        ▼
 Auto Scaling
        │
        ├── Load Balancer
        ├── Stateless Services
        ├── Cloud Monitoring
        ├── Kubernetes HPA
        └── Metrics
```

------------------------------------------------------------------------

# Coming Next

**Part 7 -- Geographic Distribution & Multi-Region Deployments**

Topics:

-   Why deploy globally
-   Regions and Availability Zones
-   Latency reduction
-   Disaster recovery
-   Active-Active vs Active-Passive
-   Global traffic routing
-   Production examples
