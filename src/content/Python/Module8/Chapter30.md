# Module 8 — Object-Oriented Programming

# Chapter 30 — SOLID Introduction

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why SOLID Principles Matter
- What is SOLID?
- Single Responsibility Principle (SRP)
- Open/Closed Principle (OCP)
- Liskov Substitution Principle (LSP)
- Interface Segregation Principle (ISP)
- Dependency Inversion Principle (DIP)
- Real-world Examples
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're building a hospital.

Would one person handle

- Surgery
- Pharmacy
- Reception
- Billing
- Security

Of course not.

Each person has **one responsibility**.

Now imagine adding a new department.

Would you demolish the hospital and rebuild it?

Again,

No.

Good systems are designed to be

- Easy to understand
- Easy to modify
- Easy to extend

The same philosophy applies to software.

This philosophy is known as **SOLID**.

---

# Story — LEGO Blocks

Imagine building a castle using LEGO.

Each block has a specific purpose.

If you want a bigger castle,

you simply add more blocks.

You don't rebuild the entire castle.

Good software should work the same way.

Instead of changing existing code repeatedly,

we design it so that it is

- Reusable
- Extendable
- Maintainable

That's exactly what SOLID teaches.

---

# What is SOLID?

SOLID is a collection of **five object-oriented design principles**.

```text
S

Single Responsibility

↓

O

Open / Closed

↓

L

Liskov Substitution

↓

I

Interface Segregation

↓

D

Dependency Inversion
```

These principles help developers build software that is easier to maintain,

test,

and extend.

---

# Why SOLID?

Imagine writing a banking application.

Without SOLID

```text
One Giant Class

↓

Thousands of Lines

↓

Impossible to Maintain
```

With SOLID

```text
Small Classes

↓

Clear Responsibilities

↓

Easy to Extend
```

Large companies like Google,

Microsoft,

Amazon,

and Netflix follow these principles extensively.

---

# 1. Single Responsibility Principle (SRP)

### Definition

> **A class should have only one reason to change.**

In simple words,

one class should do **one job only**.

---

# Story — Restaurant

Imagine a chef.

Should the chef

- Cook
- Clean Tables
- Manage Bills
- Deliver Food

No.

Each employee has one responsibility.

Similarly,

each class should have one responsibility.

---

# Bad Example

```python
class Student:

    def calculate_grade(self):

        ...

    def save_to_database(self):

        ...

    def send_email(self):

        ...
```

One class

doing

three completely different jobs.

---

# Good Example

```text
Student

↓

Stores Student Data

-------------------

GradeCalculator

↓

Calculates Grades

-------------------

EmailService

↓

Sends Emails

-------------------

StudentRepository

↓

Stores Data
```

Each class has one responsibility.

---

# Benefits of SRP

- Easier Testing
- Easier Maintenance
- Easier Debugging
- Better Reusability

---

# 2. Open/Closed Principle (OCP)

### Definition

> **Software should be open for extension but closed for modification.**

Meaning

You should be able to **add new functionality**

without changing existing code.

---

# Story — Mobile Apps

Imagine WhatsApp.

When a new feature arrives,

developers don't rewrite the entire application.

They simply add a new feature.

Software should behave the same way.

---

# Bad Example

```python
class Payment:

    def pay(self, method):

        if method == "UPI":

            ...

        elif method == "Card":

            ...
```

Every new payment method

requires modifying this class.

---

# Good Example

```text
Payment

↓

UPI Payment

↓

Card Payment

↓

PayPal Payment

↓

Crypto Payment
```

Each payment type extends the system,

without modifying existing classes.

---

# Benefits of OCP

- Safer Updates
- Less Risk of Bugs
- Easier Feature Addition
- Better Scalability

---

# 3. Liskov Substitution Principle (LSP)

### Definition

> **A child class should be able to replace its parent without breaking the program.**

---

# Story — Electric Car

Imagine

```text
Vehicle

↓

Car

↓

Electric Car
```

Anywhere a

```text
Vehicle
```

is expected,

an

```text
Electric Car
```

should work correctly.

---

# Good Example

```text
Animal

↓

Dog

↓

Cat
```

Both

```python
dog.speak()

cat.speak()
```

work correctly.

---

# Bad Example

Suppose

```text
Bird

↓

Penguin
```

If

```python
bird.fly()
```

exists,

Penguins cannot fly.

This means

```text
Penguin

is NOT

a good substitute

for Bird
```

The design is flawed.

Instead,

design more appropriate abstractions.

---

# Benefits of LSP

- Reliable Inheritance
- Predictable Behavior
- Better Polymorphism

---

# 4. Interface Segregation Principle (ISP)

### Definition

> **Clients should not be forced to depend on methods they don't use.**

---

# Story — TV Remote

Imagine a TV remote.

Would you include buttons for

```text
Car Engine

Microwave

Washing Machine
```

Of course not.

Each device should expose

only relevant controls.

---

# Bad Example

```python
class Worker:

    def work(self):

        ...

    def eat(self):

        ...

    def fly(self):

        ...
```

Why should every worker

know how to fly?

---

# Good Example

```text
Workable

↓

work()

----------------

Eatable

↓

eat()

----------------

Flyable

↓

fly()
```

Classes implement only the interfaces they need.

---

# Benefits of ISP

- Smaller Interfaces
- Cleaner Design
- Less Unused Code
- Better Flexibility

---

# 5. Dependency Inversion Principle (DIP)

### Definition

> **Depend on abstractions, not concrete implementations.**

---

# Story — Charging Cable

Imagine buying a new phone.

Would you like

every charger

to work only with one phone model?

No.

Instead,

USB-C provides a common interface.

```text
Phone

↓

USB-C

↓

Charger
```

Phones depend on the standard,

not on a specific charger.

---

# Bad Example

```python
class Computer:

    def __init__(self):

        self.keyboard = MechanicalKeyboard()
```

Computer depends on

one specific keyboard.

---

# Good Example

```text
Keyboard Interface

↓

Mechanical Keyboard

↓

Wireless Keyboard

↓

Virtual Keyboard
```

Computer depends only on

```text
Keyboard
```

Any keyboard can be used.

---

# Benefits of DIP

- Easy Testing
- Loose Coupling
- Easy Replacement
- Better Architecture

---

# SOLID Overview

| Principle | Meaning |
|------------|----------|
| SRP | One Responsibility |
| OCP | Extend Without Modifying |
| LSP | Child Should Replace Parent |
| ISP | Small, Focused Interfaces |
| DIP | Depend on Abstractions |

---

# Real-World Example

Imagine an E-commerce Application.

```text
Order

↓

SRP

Only Order Logic

----------------

Payment

↓

OCP

Add New Payment Types

----------------

Product

↓

LSP

Digital Product

Physical Product

----------------

Notifications

↓

ISP

Email

SMS

Push

----------------

Database

↓

DIP

MySQL

PostgreSQL

MongoDB
```

All five principles work together.

---

# Memory Trick

Remember

```text
SOLID
```

Literally remember the word itself.

```text
S

One Job

↓

O

Extend

↓

L

Replace

↓

I

Small Interfaces

↓

D

Depend on Abstractions
```

Or use this sentence:

> **"Some Objects Love Intelligent Design."**

- **S** → Some → Single Responsibility
- **O** → Objects → Open/Closed
- **L** → Love → Liskov Substitution
- **I** → Intelligent → Interface Segregation
- **D** → Design → Dependency Inversion

---

# Common Beginner Mistakes

### Mistake 1

Creating "God Classes."

Classes with

```text
500+

1000+

2000+
```

lines of code

usually violate SRP.

---

### Mistake 2

Using inheritance everywhere.

Sometimes

```text
Composition

↓

Better than

↓

Inheritance
```

Always ask

```text
Is-A ?

↓

Inheritance

----------------

Has-A ?

↓

Composition
```

---

### Mistake 3

Depending on concrete classes.

Instead,

depend on

interfaces,

abstract base classes,

or protocols.

This makes testing and future changes much easier.

---

### Mistake 4

Thinking SOLID is only for large applications.

Even small projects benefit from

- Better organization
- Easier debugging
- Easier extension

Applying SOLID early often prevents technical debt later.

---

# Interview Questions & Answers

## Q1. What is SOLID?

### Answer

SOLID is a collection of five object-oriented design principles that improve

- Maintainability
- Scalability
- Flexibility
- Testability

of software systems.

---

## Q2. What is the Single Responsibility Principle?

### Answer

A class should have only one responsibility,

meaning it should have only one reason to change.

This keeps classes focused and easier to maintain.

---

## Q3. What is the Open/Closed Principle?

### Answer

Software entities should be

- Open for extension
- Closed for modification

New functionality should be added by extending existing code,

rather than changing working code.

---

## Q4. What is the Dependency Inversion Principle?

### Answer

High-level modules should not depend on low-level modules.

Both should depend on abstractions.

This reduces coupling and makes software easier to test and modify.

---

## Q5. Which SOLID principle is violated by a huge class that performs many unrelated tasks?

### Answer

The **Single Responsibility Principle (SRP)**.

A class that performs multiple unrelated tasks has multiple reasons to change,

making it difficult to maintain.

---

## Q6. Is SOLID Python-specific?

### Answer

No.

SOLID is language-independent.

It applies to Java,

Python,

C++,

C#,

JavaScript,

Go,

and virtually every object-oriented programming language.

---

# Chapter Summary / Cheat Sheet

| Principle | Purpose |
|------------|----------|
| SRP | One class → One responsibility |
| OCP | Extend without modifying |
| LSP | Child replaces parent safely |
| ISP | Small, focused interfaces |
| DIP | Depend on abstractions |

---

# Module 8 Complete ✅

You have now mastered Python's Object-Oriented Programming:

- Classes & Objects
- Constructors
- Instance Variables
- Instance Methods
- Class Variables
- Static Methods
- Class Methods
- Encapsulation
- Inheritance
- Polymorphism
- Abstraction
- Magic Methods
- Dataclasses
- Properties
- `__slots__`
- SOLID Principles

These concepts form the foundation of professional Python development and are heavily tested in software engineering interviews.

---

# What's Next?

In **Module 9 — Advanced Python**, you'll move beyond core Python into advanced language features:

- Iterators & Generators
- Decorators
- Context Managers
- Properties & Descriptors
- Type Hinting
- Protocols
- Generics
- `functools`
- `itertools`

These topics distinguish intermediate Python developers from advanced and senior Python engineers.