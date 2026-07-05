# Module 22 — Design Patterns & Clean Python

# Chapter 81 — SOLID Principles

---

# Learning Objectives

By the end of this chapter, you will understand:

- What are SOLID Principles?
- Why SOLID Matters
- Single Responsibility Principle (SRP)
- Open/Closed Principle (OCP)
- Liskov Substitution Principle (LSP)
- Interface Segregation Principle (ISP)
- Dependency Inversion Principle (DIP)
- SOLID in Python
- Real-World Examples
- Best Practices
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're building

an e-commerce application.

Initially,

it has

```text
100 Lines

of Code
```

After one year,

it grows to

```text
100,000 Lines

of Code
```

Many developers

work on it.

Without proper design,

the application becomes

```text
Hard to Understand

↓

Hard to Test

↓

Hard to Maintain

↓

Hard to Extend
```

SOLID Principles

help prevent

these problems.

---

# Story — Building a House

Imagine constructing a house.

Would one person

do everything?

```text
Design

↓

Electrical

↓

Plumbing

↓

Painting

↓

Furniture
```

No.

Each worker

has one responsibility.

Software should be designed

the same way.

---

# What is SOLID?

SOLID is a collection

of five design principles

that make software

```text
Maintainable

↓

Flexible

↓

Reusable

↓

Scalable

↓

Testable
```

---

# The Five Principles

```text
S

↓

Single Responsibility

--------------------

O

↓

Open/Closed

--------------------

L

↓

Liskov Substitution

--------------------

I

↓

Interface Segregation

--------------------

D

↓

Dependency Inversion
```

---

# Why SOLID?

Applications become

```text
Easy to Modify

↓

Easy to Test

↓

Easy to Extend

↓

Lower Bugs

↓

Better Teamwork
```

---

# S — Single Responsibility Principle (SRP)

Definition

> A class should have only one reason to change.

One class

should perform

one job.

---

# Bad Example

```python
class Employee:

    def calculate_salary(self):
        ...

    def save_database(self):
        ...

    def send_email(self):
        ...
```

This class

has multiple responsibilities.

---

# Better Design

```python
class SalaryCalculator:
    ...

class EmployeeRepository:
    ...

class EmailService:
    ...
```

Each class

has one responsibility.

---

# O — Open/Closed Principle (OCP)

Definition

> Software should be open for extension but closed for modification.

Instead of changing

existing code,

extend it.

---

# Example

Bad

```python
if shape == "circle":
    ...

elif shape == "square":
    ...
```

Better

```python
class Shape:
    def area(self):
        ...

class Circle(Shape):
    ...

class Square(Shape):
    ...
```

Adding

a new shape

doesn't require

changing existing classes.

---

# L — Liskov Substitution Principle (LSP)

Definition

> A subclass should be usable wherever its parent class is expected.

Example

```text
Bird

↓

Sparrow

✓

----------------

Bird

↓

Penguin

✗ (if Bird requires flying)
```

Inheritance

should preserve

expected behavior.

---

# Python Example

Good

```python
class Animal:

    def speak(self):
        ...

class Dog(Animal):

    def speak(self):
        return "Bark"
```

Anywhere

an `Animal`

is expected,

a `Dog`

works correctly.

---

# I — Interface Segregation Principle (ISP)

Definition

> Clients should not be forced to depend on methods they do not use.

Instead of

one large interface,

create

small,

focused interfaces.

---

# Bad Design

```python
class Machine:

    def print(self):
        ...

    def scan(self):
        ...

    def fax(self):
        ...
```

Not every machine

supports all functions.

---

# Better Design

```python
class Printer:
    ...

class Scanner:
    ...

class Fax:
    ...
```

Each interface

contains

only relevant methods.

---

# D — Dependency Inversion Principle (DIP)

Definition

> High-level modules should depend on abstractions, not concrete implementations.

---

# Bad Example

```python
class MySQLDatabase:
    ...

class UserService:

    db = MySQLDatabase()
```

Changing

the database

requires modifying

the service.

---

# Better Example

```python
class Database:
    ...

class MySQL(Database):
    ...

class PostgreSQL(Database):
    ...

class UserService:

    def __init__(self, db):

        self.db = db
```

Now

any database

can be injected.

---

# SOLID Workflow

```text
One Responsibility

↓

Easy Extension

↓

Correct Inheritance

↓

Small Interfaces

↓

Loose Coupling
```

---

# Real-World Example

Imagine

an online shopping platform.

Separate classes

for

```text
Orders

↓

Payments

↓

Inventory

↓

Notifications

↓

Shipping
```

Each module

has a clear responsibility,

making the system easier

to maintain and extend.

---

# Benefits of SOLID

```text
Less Bugs

↓

Better Testing

↓

Easy Maintenance

↓

Reusable Code

↓

Scalable Applications
```

---

# Memory Trick

Remember

```text
SOLID
```

**S**

Single Responsibility

↓

**O**

Open/Closed

↓

**L**

Liskov Substitution

↓

**I**

Interface Segregation

↓

**D**

Dependency Inversion

---

# Best Practices

✔ Give each class one responsibility

✔ Extend behavior instead of modifying existing code

✔ Design proper inheritance hierarchies

✔ Keep interfaces focused

✔ Depend on abstractions rather than concrete classes

✔ Write modular code

---

# Common Beginner Mistakes

### Mistake 1

Creating

"God Classes"

that handle

many unrelated responsibilities.

---

### Mistake 2

Using inheritance

where composition

would be a better fit.

---

### Mistake 3

Modifying existing classes

whenever new functionality

is required,

instead of extending them.

---

### Mistake 4

Tightly coupling

business logic

to specific databases,

frameworks,

or external services.

---

# Interview Questions & Answers

## Q1. What does SOLID stand for?

### Answer

SOLID represents five object-oriented design principles:

- Single Responsibility
- Open/Closed
- Liskov Substitution
- Interface Segregation
- Dependency Inversion

These principles improve maintainability,

flexibility,

and scalability.

---

## Q2. What is the Single Responsibility Principle?

### Answer

A class should have only one reason to change,

meaning it should focus on one responsibility or concern.

---

## Q3. What is the Open/Closed Principle?

### Answer

Software entities should be open for extension

but closed for modification,

allowing new functionality without changing existing code.

---

## Q4. What is Dependency Inversion?

### Answer

High-level modules should depend on abstractions rather than concrete implementations,

making systems more flexible,

testable,

and easier to maintain.

---

## Q5. Why are SOLID principles important?

### Answer

SOLID principles produce software that is easier to understand,

test,

maintain,

extend,

and scale,

especially in large team-based projects.

---

# Chapter Summary / Cheat Sheet

| Principle | Meaning |
|-----------|---------|
| SRP | One responsibility per class |
| OCP | Extend without modifying |
| LSP | Subclasses should be substitutable |
| ISP | Small, focused interfaces |
| DIP | Depend on abstractions |
| SOLID | Foundation of maintainable OOP |

---

# What's Next?

In **Chapter 82 — Design Patterns**, you'll learn reusable software design solutions used by professional developers, including:

- Singleton Pattern
- Factory Pattern
- Builder Pattern
- Strategy Pattern
- Observer Pattern

These patterns solve common software design problems and are frequently discussed in technical interviews and used in production applications.