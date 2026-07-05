# Module 22 — Design Patterns & Clean Python

# Chapter 82 — Design Patterns

---

# Learning Objectives

By the end of this chapter, you will understand:

- What are Design Patterns?
- Why Design Patterns?
- Categories of Design Patterns
- Singleton Pattern
- Factory Pattern
- Builder Pattern
- Strategy Pattern
- Observer Pattern
- When to Use Each Pattern
- Best Practices
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're building

```text
Banking Software

↓

E-Commerce

↓

Game Engine

↓

AI Platform

↓

Operating System
```

Thousands of developers

have already solved

many common software problems.

Instead of reinventing solutions,

we reuse

well-tested designs.

These reusable solutions

are called

```text
Design Patterns
```

---

# Story — Building with LEGO

Imagine building

a large LEGO city.

You don't invent

a new wheel,

door,

or window

every time.

Instead,

you reuse

proven pieces.

Software Design Patterns

are reusable building blocks

for software architecture.

---

# What are Design Patterns?

Design Patterns are

reusable solutions

to recurring software design problems.

They are

not complete programs,

but templates

that help organize code.

---

# Why Use Design Patterns?

They make software

```text
Reusable

↓

Maintainable

↓

Scalable

↓

Flexible

↓

Easy to Understand
```

---

# Categories of Design Patterns

Design patterns are generally grouped into

```text
Creational

↓

Structural

↓

Behavioral
```

---

# Creational Patterns

Focus on

object creation.

Examples

```text
Singleton

↓

Factory

↓

Builder
```

---

# Structural Patterns

Focus on

how classes

and objects

are organized.

Examples

```text
Adapter

↓

Decorator

↓

Facade
```

---

# Behavioral Patterns

Focus on

communication

between objects.

Examples

```text
Strategy

↓

Observer

↓

Command
```

---

# Singleton Pattern

Definition

A Singleton ensures

only

one instance

of a class

exists.

---

# Real-World Example

Imagine

a printer.

If every user

created

their own printer,

chaos would occur.

Instead,

everyone shares

one printer.

---

# Singleton Example

```python
class Database:

    _instance = None

    def __new__(cls):

        if cls._instance is None:

            cls._instance = super().__new__(cls)

        return cls._instance
```

Every object

points

to the same instance.

---

# Singleton Workflow

```text
Request Object

↓

Already Exists?

↓

Yes

↓

Return Existing Object
```

---

# When to Use Singleton

Useful for

```text
Database Connection

↓

Logger

↓

Configuration

↓

Cache
```

---

# Factory Pattern

Definition

A Factory

creates objects

without exposing

their creation logic.

---

# Real-World Example

Imagine

ordering coffee.

You don't make it yourself.

You ask

the coffee machine.

```text
Customer

↓

Coffee Machine

↓

Coffee
```

The machine

is the Factory.

---

# Factory Example

```python
class Dog:

    def speak(self):
        return "Bark"

class Cat:

    def speak(self):
        return "Meow"

class AnimalFactory:

    def create(self, animal):

        if animal == "dog":

            return Dog()

        return Cat()
```

---

# Factory Workflow

```text
Request

↓

Factory

↓

Correct Object

↓

Return
```

The caller

doesn't need

to know

how objects are created.

---

# Builder Pattern

Definition

Builder

constructs

complex objects

step by step.

---

# Real-World Example

Imagine ordering

a custom computer.

```text
Choose CPU

↓

Choose RAM

↓

Choose Storage

↓

Choose GPU

↓

Build PC
```

Each component

is added

one at a time.

---

# Builder Example

```python
class Computer:

    def __init__(self):

        self.parts = []

    def add(self, part):

        self.parts.append(part)
```

Usage

```python
pc = Computer()

pc.add("CPU")

pc.add("RAM")

pc.add("SSD")
```

---

# Builder Workflow

```text
Start Object

↓

Add Parts

↓

Configure

↓

Build
```

---

# Strategy Pattern

Definition

Strategy

allows

multiple algorithms

to be swapped

without changing

the client code.

---

# Real-World Example

Navigation Apps

```text
Fastest Route

↓

Shortest Route

↓

Avoid Highways

↓

Avoid Tolls
```

Different strategies,

same interface.

---

# Strategy Example

```python
class PayPal:

    def pay(self):
        print("PayPal")

class CreditCard:

    def pay(self):
        print("Card")
```

The application

chooses

the payment strategy

at runtime.

---

# Strategy Workflow

```text
Task

↓

Choose Strategy

↓

Execute
```

---

# Observer Pattern

Definition

Observer

creates

a one-to-many relationship.

When one object changes,

all observers

are notified.

---

# Real-World Example

Imagine

YouTube.

```text
New Video

↓

Subscribers

↓

Notification
```

Subscribers

automatically receive updates.

---

# Observer Example

```python
class Observer:

    def update(self):

        print("Notification")
```

When

the subject changes,

every observer

receives

an update.

---

# Observer Workflow

```text
Subject Changes

↓

Notify Observers

↓

Observers Update
```

---

# Pattern Comparison

| Pattern | Purpose |
|----------|----------|
| Singleton | One shared instance |
| Factory | Create objects |
| Builder | Build complex objects |
| Strategy | Switch algorithms |
| Observer | Notify subscribers |

---

# Choosing the Right Pattern

Use

Singleton

```text
One Shared Resource
```

Use

Factory

```text
Unknown Object Type
```

Use

Builder

```text
Complex Object Creation
```

Use

Strategy

```text
Multiple Algorithms
```

Use

Observer

```text
Event Notifications
```

---

# Real-World Applications

Design patterns appear in

- Django
- Flask Extensions
- SQLAlchemy
- TensorFlow
- PyTorch
- Game Engines
- Web Frameworks
- Enterprise Software

---

# Memory Trick

Remember

```text
SFBSO
```

**S**

Singleton

↓

**F**

Factory

↓

**B**

Builder

↓

**S**

Strategy

↓

**O**

Observer

These are five of the most commonly used design patterns.

---

# Best Practices

✔ Choose patterns only when they solve a real problem

✔ Keep implementations simple

✔ Prefer composition over inheritance where appropriate

✔ Follow SOLID principles

✔ Avoid unnecessary complexity

---

# Common Beginner Mistakes

### Mistake 1

Using design patterns

for very small projects

where simple code

would be easier.

---

### Mistake 2

Confusing

Factory

with Builder.

Factory creates objects.

Builder constructs

complex objects

step by step.

---

### Mistake 3

Using Singleton

for global state

without considering

testing

and maintainability.

---

### Mistake 4

Forcing every project

to use design patterns.

Patterns solve recurring problems,

not every problem.

---

# Interview Questions & Answers

## Q1. What are Design Patterns?

### Answer

Design Patterns are reusable software design solutions

that solve common architectural and object-oriented programming problems.

They provide proven templates,

not complete implementations.

---

## Q2. What is the Singleton Pattern?

### Answer

Singleton ensures that only one instance of a class exists

and provides a global access point to that instance.

It is commonly used for configuration,

logging,

and database connections.

---

## Q3. What is the Factory Pattern?

### Answer

The Factory Pattern centralizes object creation,

allowing clients to create objects without depending on their concrete classes.

---

## Q4. What is the Strategy Pattern?

### Answer

The Strategy Pattern allows multiple algorithms to be encapsulated separately

and selected dynamically at runtime,

making behavior interchangeable.

---

## Q5. What is the Observer Pattern?

### Answer

The Observer Pattern establishes a one-to-many relationship

where multiple observers are automatically notified whenever the subject's state changes.

---

# Chapter Summary / Cheat Sheet

| Pattern | Use Case |
|----------|----------|
| Singleton | One shared object |
| Factory | Flexible object creation |
| Builder | Construct complex objects |
| Strategy | Interchangeable algorithms |
| Observer | Event notification system |
| Creational | Object creation |
| Structural | Object relationships |
| Behavioral | Object communication |

---

# What's Next?

In **Chapter 83 — Clean Architecture**, you'll learn how professional software systems are organized using:

- Layered Architecture
- Clean Architecture
- Dependency Injection
- Separation of Concerns
- Project Structure
- Domain-Driven Design Concepts

This chapter teaches you how to structure large Python applications so they remain maintainable, testable, and scalable over time.