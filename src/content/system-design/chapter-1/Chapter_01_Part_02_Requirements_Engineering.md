# Chapter 1 -- Part 2: Requirements Engineering

Learning Objectives

In this part you'll learn how to identify functional and non-functional
requirements, ask clarifying questions during interviews, and use PEDALS
and RESHADED to avoid missing critical constraints.

Story

Imagine your manager says, 'Build Uber.' A junior engineer immediately
opens a drawing tool. A senior engineer opens a notebook and starts
asking questions: Who are the users? Is ride tracking required? Do
drivers accept rides? How many users? Which countries? The quality of
these questions determines the quality of the architecture.

Functional Requirements

Functional requirements describe WHAT the system must do. They define
user-visible behavior and business capabilities.

Examples: • Users register and login • Drivers accept rides • Customers
shorten URLs • Videos can be uploaded • Users receive notifications

These requirements eventually become APIs, services, and database
entities.

Non-Functional Requirements

Non-functional requirements describe HOW WELL the system should perform.

Common categories: • Scalability • Availability • Reliability • Latency
• Durability • Security • Maintainability • Cost

Example: A URL shortener for 1,000 employees and Bitly serving millions
have identical features but radically different non-functional
requirements.

Why Non-Functional Requirements Matter

Many interview candidates identify all features correctly but ignore
performance goals. Interviewers expect you to ask about traffic,
latency, availability, consistency, regional deployment, compliance, and
disaster recovery before proposing architecture.

Interview Clarification Checklist

Always begin with questions: 1. Who are the users? 2. Core use cases? 3.
Daily active users? 4. Peak QPS? 5. Read-heavy or write-heavy? 6.
Latency target? 7. Availability target? 8. Data retention? 9. Budget
constraints? 10. Security or compliance requirements?

PEDALS Framework

A simple way to remember common non-functional concerns:

P -- Performance E -- Extensibility D -- Durability A -- Availability L
-- Latency S -- Security / Scalability

Use it as a mental checklist while gathering requirements.

RESHADED Framework

Another interview framework to avoid missing architectural constraints:

R -- Reliability E -- Efficiency S -- Scalability H -- High Availability
A -- Availability / Auditability D -- Durability E -- Extensibility D --
Disaster Recovery

Different organizations expand the acronym slightly differently, but the
goal is the same: systematically evaluate quality attributes before
designing.

ASCII Mental Model

Business Problem │ ▼ Requirements (Functional + Non-functional) │ ▼
Constraints │ ▼ Architecture │ ▼ Technology Choices

Production Insight

Amazon's design reviews frequently spend more time validating
assumptions than discussing technology. Incorrect assumptions lead to
expensive redesigns; correct requirements naturally narrow the
architectural choices.

Key Takeaways

• Requirements always come before architecture. • Functional
requirements describe features. • Non-functional requirements describe
quality attributes. • Use structured frameworks like PEDALS and RESHADED
to avoid missing important constraints.

Coming Next

Part 3 covers Capacity Estimation, DAU, MAU, QPS, storage calculations,
and back-of-the-envelope estimation with interview examples.
