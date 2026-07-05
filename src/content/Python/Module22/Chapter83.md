# Module 22 — Design Patterns & Clean Python

# Chapter 83 — Clean Architecture

---

# Learning Objectives

By the end of this chapter, you will understand:

- What is Software Architecture?
- What is Clean Architecture?
- Why Clean Architecture?
- Separation of Concerns
- Layers of Clean Architecture
- Dependency Rule
- Dependency Injection
- Inversion of Control (IoC)
- Project Structure
- Benefits of Clean Architecture
- Best Practices
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're building

```text
Amazon

↓

Netflix

↓

Instagram

↓

Banking Software

↓

Hospital Management System
```

These applications contain

millions of lines of code.

If everything were placed

inside one file,

the project would become

```text
Impossible to Maintain

↓

Impossible to Test

↓

Impossible to Scale
```

Professional developers

organize software

using

```text
Clean Architecture
```

---

# Story — Building a Hospital

Imagine a hospital.

Would doctors,

pharmacists,

receptionists,

and accountants

all work

inside one room?

No.

The hospital is divided

into departments.

```text
Reception

↓

Doctors

↓

Laboratory

↓

Pharmacy

↓

Billing
```

Each department

has one responsibility.

Software architecture

follows the same idea.

---

# What is Software Architecture?

Software Architecture

is the high-level structure

of an application.

It defines

```text
Components

↓

Responsibilities

↓

Communication

↓

Dependencies
```

---

# What is Clean Architecture?

Clean Architecture

is an architectural style

that separates

business logic

from external technologies

such as

```text
Database

↓

Framework

↓

UI

↓

API
```

The business rules

remain independent.

---

# Why Clean Architecture?

It makes applications

```text
Easy to Maintain

↓

Easy to Test

↓

Easy to Extend

↓

Framework Independent

↓

Scalable
```

---

# Separation of Concerns

Every layer

should have

one responsibility.

Instead of

```text
Everything

↓

One File
```

use

```text
UI

↓

Business Logic

↓

Database
```

Each layer

focuses

on its own job.

---

# Clean Architecture Layers

A simplified structure

looks like

```text
Presentation

↓

Application

↓

Domain

↓

Infrastructure
```

---

# Presentation Layer

Responsible for

user interaction.

Examples

```text
Web API

↓

CLI

↓

GUI

↓

Mobile App
```

This layer

accepts input

and returns output.

---

# Application Layer

Contains

application-specific logic.

Examples

```text
Use Cases

↓

Services

↓

Workflows
```

It coordinates

the business rules.

---

# Domain Layer

The most important layer.

Contains

```text
Business Rules

↓

Entities

↓

Interfaces

↓

Core Logic
```

This layer

should not depend

on frameworks,

databases,

or web APIs.

---

# Infrastructure Layer

Responsible for

external systems.

Examples

```text
Database

↓

Email

↓

Redis

↓

External APIs

↓

File System
```

These are implementation details.

---

# Layer Communication

Dependencies always point

toward the center.

```text
Presentation

↓

Application

↓

Domain

↑

Infrastructure
```

The Domain

does not depend

on outer layers.

---

# Dependency Rule

The central rule

of Clean Architecture

is

```text
Dependencies

Point

Inward
```

Business logic

should never depend on

frameworks

or databases.

---

# Example

Bad Design

```text
Business Logic

↓

SQL Database
```

Good Design

```text
Business Logic

↓

Database Interface

↓

MySQL

or

PostgreSQL
```

Business logic

remains unchanged

when databases change.

---

# Dependency Injection

Instead of

creating dependencies

inside classes,

they are provided

from outside.

Example

```python
class UserService:

    def __init__(self, repository):

        self.repository = repository
```

Now

any repository

can be used.

---

# Benefits of Dependency Injection

```text
Loose Coupling

↓

Easy Testing

↓

Easy Replacement

↓

Flexible Design
```

---

# Inversion of Control (IoC)

Normally

objects create

their dependencies.

With IoC,

dependencies

are supplied

from outside.

Visualization

```text
Without IoC

↓

Class Creates Objects

-------------------

With IoC

↓

Objects Are Injected
```

---

# Typical Project Structure

```text
project/

│

├── app/

│   ├── domain/

│   ├── application/

│   ├── infrastructure/

│   └── presentation/

│

├── tests/

├── requirements.txt

├── README.md

└── main.py
```

This organization

keeps projects

clean

and scalable.

---

# Example Flow

Imagine

an online shopping app.

```text
User

↓

API

↓

Order Service

↓

Business Rules

↓

Database

↓

Response
```

Each layer

has a single responsibility.

---

# Testing Advantage

Because

business logic

is independent,

you can test it

without

```text
Database

↓

Web Server

↓

Framework
```

This makes

unit testing

much easier.

---

# Framework Independence

Suppose

today

you use

```text
Flask
```

Tomorrow

you switch to

```text
FastAPI
```

Only

the Presentation Layer

changes.

The business logic

remains the same.

---

# Real-World Example

Imagine

an online banking system.

```text
Mobile App

↓

REST API

↓

Transfer Service

↓

Banking Rules

↓

Database
```

If the mobile app changes,

the banking rules

do not.

---

# Clean Architecture Workflow

```text
User Request

↓

Presentation

↓

Application

↓

Domain

↓

Infrastructure

↓

Database

↓

Response
```

---

# Memory Trick

Remember

```text
PADI
```

**P**

Presentation

↓

**A**

Application

↓

**D**

Domain

↓

**I**

Infrastructure

These are

the four primary layers

of Clean Architecture.

---

# Best Practices

✔ Keep business logic independent

✔ Use Dependency Injection

✔ Separate responsibilities

✔ Organize projects into layers

✔ Depend on abstractions

✔ Write testable code

✔ Keep modules small

---

# Common Beginner Mistakes

### Mistake 1

Putting

business logic

inside

API routes

or controllers.

---

### Mistake 2

Allowing

domain classes

to directly access

the database.

---

### Mistake 3

Creating

tightly coupled modules

that cannot be tested

independently.

---

### Mistake 4

Using

framework-specific code

inside

core business logic.

This makes

future migrations difficult.

---

# Interview Questions & Answers

## Q1. What is Clean Architecture?

### Answer

Clean Architecture is a software design approach that separates business logic from external frameworks,

databases,

and user interfaces,

making applications easier to maintain,

test,

and extend.

---

## Q2. What is the Dependency Rule?

### Answer

The Dependency Rule states that dependencies should always point inward.

Inner layers should never depend on outer layers such as databases,

frameworks,

or user interfaces.

---

## Q3. What is Dependency Injection?

### Answer

Dependency Injection is a technique where objects receive their dependencies from external sources instead of creating them internally,

reducing coupling and improving testability.

---

## Q4. Why is the Domain Layer important?

### Answer

The Domain Layer contains the core business rules of the application.

It should remain independent of frameworks,

databases,

and external technologies.

---

## Q5. What are the benefits of Clean Architecture?

### Answer

Clean Architecture provides

- Better maintainability
- Easier testing
- Scalability
- Flexibility
- Separation of concerns
- Framework independence

---

# Chapter Summary / Cheat Sheet

| Layer | Responsibility |
|--------|----------------|
| Presentation | User interaction |
| Application | Use cases & workflows |
| Domain | Business rules |
| Infrastructure | Database & external systems |
| Dependency Injection | Inject dependencies |
| IoC | External object creation |
| Separation of Concerns | One responsibility per layer |
| Dependency Rule | Dependencies point inward |

---

# What's Next?

In **Chapter 84 — Production Python**, you'll learn how professional developers write Python code that is ready for real-world production systems, including:

- Writing Maintainable Code
- Code Reviews
- Logging & Monitoring
- Configuration Management
- Documentation
- Error Handling
- Deployment Best Practices
- Production Checklists

This final chapter will bring together everything you've learned throughout the Python handbook into professional software engineering practices.