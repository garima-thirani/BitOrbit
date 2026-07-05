# Module 8 — Object-Oriented Programming

# Chapter 27 — OOP Principles

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why OOP Principles Matter
- Encapsulation
- Inheritance
- Polymorphism
- Abstraction
- The "Is-A" and "Has-A" Relationships
- Real-world Examples
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're building a car.

A car is made up of

- Engine
- Wheels
- Steering
- Brakes

Each part has a specific responsibility.

The driver doesn't need to know

how fuel burns,

how gears shift,

or how brakes work internally.

They simply

```text
Press Accelerator

↓

Car Moves
```

This is the philosophy of Object-Oriented Programming.

Large software is built by dividing responsibilities among objects.

To achieve this,

OOP follows **four fundamental principles**.

```text
E

Encapsulation

↓

I

Inheritance

↓

P

Polymorphism

↓

A

Abstraction
```

Together,

they form the foundation of professional software design.

---

# Story — Smartphone

Imagine using a smartphone.

You

- Tap icons
- Make calls
- Open apps

But you never think about

- CPU Scheduling
- Memory Allocation
- Radio Signals

The phone hides complexity

and exposes only what you need.

This is exactly what OOP aims to achieve.

---

# The Four Pillars of OOP

```text
Object-Oriented Programming

│

├── Encapsulation

├── Inheritance

├── Polymorphism

└── Abstraction
```

We'll understand each one intuitively.

---

# 1. Encapsulation

Imagine a medicine bottle.

Inside,

there are chemicals.

Can anyone change them?

No.

The bottle protects the medicine.

Only safe operations are allowed.

```text
Medicine

↓

Bottle

↓

Safe Access
```

Encapsulation works the same way.

It protects an object's internal data.

---

# Without Encapsulation

Suppose

```python
class BankAccount:

    def __init__(self):

        self.balance = 1000
```

Anyone can write

```python
account.balance = -50000
```

Now the account becomes invalid.

---

# With Encapsulation

Instead,

allow controlled access.

```python
class BankAccount:

    def __init__(self):

        self._balance = 1000

    def deposit(

        self,

        amount

    ):

        self._balance += amount

    def withdraw(

        self,

        amount

    ):

        if amount <= self._balance:

            self._balance -= amount
```

Users interact through methods,

not by directly changing data.

---

# Public, Protected and Private

Python follows naming conventions.

```python
name
```

Public

Accessible everywhere.

---

```python
_name
```

Protected (by convention)

Intended for internal use.

---

```python
__name
```

Private (name mangling)

Harder to access directly.

---

# Visualization

```text
User

↓

deposit()

↓

Bank Account

↓

Balance Updated
```

The user never touches the balance directly.

---

# Benefits of Encapsulation

- Protects data
- Prevents invalid states
- Easier maintenance
- Better security

---

# 2. Inheritance

Imagine animals.

Every animal

- Eats
- Sleeps
- Breathes

Instead of rewriting these behaviors,

create a common parent.

```text
Animal

↓

Dog

Cat

Bird
```

Each child automatically gets the parent's features.

This is **Inheritance**.

---

# Example

```python
class Animal:

    def speak(self):

        print("Animal Sound")

class Dog(Animal):

    pass

dog = Dog()

dog.speak()
```

Output

```text
Animal Sound
```

Dog inherited

```python
speak()
```

from Animal.

---

# Why Inheritance?

Without inheritance,

code gets repeated.

```text
Dog

↓

eat()

sleep()

------------------

Cat

↓

eat()

sleep()
```

Same code everywhere.

Inheritance removes duplication.

---

# Visualization

```text
Animal

↓

↓

Dog

Cat

↓

↓

Inherited Methods
```

---

# Types of Inheritance

Python supports

```text
Single

Multiple

Multilevel

Hierarchical

Hybrid
```

Most applications primarily use **single inheritance**.

---

# 3. Polymorphism

The word means

```text
Many Forms
```

Imagine a remote control.

The same button

```text
Power
```

works for

- TV
- AC
- Projector

Same interface,

different behavior.

---

# Example

```python
class Dog:

    def speak(self):

        print("Bark")

class Cat:

    def speak(self):

        print("Meow")
```

Now

```python
animals = [

Dog(),

Cat()

]

for animal in animals:

    animal.speak()
```

Output

```text
Bark

Meow
```

Same method

```python
speak()
```

Different implementations.

---

# Why Polymorphism?

Suppose a zoo contains

```text
Dog

Cat

Cow
```

Instead of writing

```python
if animal == Dog

...

if animal == Cat

...
```

simply call

```python
animal.speak()
```

Each object knows what to do.

---

# Types of Polymorphism

Python mainly supports

```text
Method Overriding

↓

Duck Typing
```

Unlike Java,

Python does **not** support traditional method overloading based solely on parameter lists.

---

# Method Overriding

Child classes replace parent behavior.

Example

```python
class Animal:

    def speak(self):

        print("Sound")

class Dog(Animal):

    def speak(self):

        print("Bark")
```

Output

```text
Bark
```

---

# Duck Typing

Python follows

```text
"If it walks like a duck,

and quacks like a duck,

it's a duck."
```

Example

```python
class Dog:

    def speak(self):

        print("Bark")

class Person:

    def speak(self):

        print("Hello")

def talk(obj):

    obj.speak()
```

Both work.

Python cares about **behavior**,

not the object's type.

---

# 4. Abstraction

Imagine driving a car.

You

```text
Press Brake

↓

Car Stops
```

Do you know

how hydraulic pressure works?

No.

The complexity is hidden.

This is **Abstraction**.

---

# Why Abstraction?

Suppose a TV remote.

Users see

```text
Volume

Power

Channel
```

They don't see

```text
Electronic Circuit

Infrared Signals

Firmware
```

Only essential functionality is exposed.

---

# Abstract Classes

Python provides the

```python
abc
```

module.

Example

```python
from abc import ABC, abstractmethod

class Animal(ABC):

    @abstractmethod

    def speak(self):

        pass
```

Every child class **must** implement

```python
speak()
```

---

# Example

```python
class Dog(Animal):

    def speak(self):

        print("Bark")
```

Now

```python
Dog()
```

works.

Trying to create

```python
Animal()
```

raises an error because abstract classes cannot be instantiated directly.

---

# Is-A Relationship

One of the easiest ways to identify inheritance.

Ask

```text
Is A?
```

Example

```text
Dog

↓

Is An

↓

Animal
```

Inheritance is appropriate.

---

# Has-A Relationship

Suppose

```text
Car

↓

Has An

↓

Engine
```

This is **Composition**,

not inheritance.

Composition is often preferred over inheritance because it provides greater flexibility.

---

# Real-World Example

Imagine an online shopping application.

```text
Product

↓

Book

Phone

Laptop
```

All products

- Have Price
- Have Name

Each product calculates shipping differently.

Inheritance

+

Polymorphism

work together beautifully.

---

# OOP Pillars Together

```text
Customer

↓

Bank Account

↓

Encapsulation

↓

Savings Account

↓

Inheritance

↓

withdraw()

↓

Polymorphism

↓

Hidden Logic

↓

Abstraction
```

Professional applications combine all four principles.

---

# Memory Trick

Remember

```text
EIPA
```

Pronounce it

> **"EYE-PAH"**

```text
E

Encapsulation

↓

I

Inheritance

↓

P

Polymorphism

↓

A

Abstraction
```

And remember

```text
Protect

↓

Reuse

↓

Many Forms

↓

Hide Complexity
```

---

# Common Beginner Mistakes

### Mistake 1

Using inheritance when composition is more appropriate.

Ask

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

### Mistake 2

Accessing internal variables directly.

Prefer methods that validate and control changes.

---

### Mistake 3

Creating deep inheritance hierarchies.

Very deep inheritance trees become difficult to understand and maintain.

Favor simpler designs.

---

### Mistake 4

Confusing Polymorphism with Inheritance.

Polymorphism is about **different objects responding to the same interface**.

Inheritance is only one way to achieve it.

---

# Interview Questions & Answers

## Q1. What are the four pillars of OOP?

### Answer

The four pillars are

- Encapsulation
- Inheritance
- Polymorphism
- Abstraction

Together they improve code organization,

reusability,

maintainability,

and scalability.

---

## Q2. What is Encapsulation?

### Answer

Encapsulation is the practice of bundling data and methods together while restricting direct access to internal data.

It protects objects from entering invalid states.

---

## Q3. What is Inheritance?

### Answer

Inheritance allows a child class to reuse the attributes and methods of a parent class.

It promotes code reuse and models **Is-A** relationships.

---

## Q4. What is Polymorphism?

### Answer

Polymorphism allows the same method or interface to behave differently depending on the object.

In Python,

it is commonly achieved through method overriding and duck typing.

---

## Q5. What is Abstraction?

### Answer

Abstraction hides implementation details and exposes only the essential interface.

Users interact with *what* an object does,

without needing to know *how* it works internally.

---

## Q6. What is the difference between Inheritance and Composition?

### Answer

Inheritance models an **Is-A** relationship.

Example

```text
Dog is an Animal
```

Composition models a **Has-A** relationship.

Example

```text
Car has an Engine
```

Modern software often prefers composition because it is more flexible and reduces tight coupling.

---

# Chapter Summary / Cheat Sheet

| Principle | Purpose |
|-----------|----------|
| Encapsulation | Protect data and control access |
| Inheritance | Reuse code through parent-child relationships |
| Polymorphism | Same interface, different behavior |
| Abstraction | Hide complexity and expose essentials |
| Is-A | Inheritance |
| Has-A | Composition |

---

# What's Next?

In **Chapter 28 — Magic Methods**, you'll explore Python's special **dunder (double underscore)** methods:

- `__init__`
- `__str__`
- `__repr__`
- `__len__`
- `__eq__`
- Operator Overloading

These methods make your custom classes behave like Python's built-in types and are a favorite topic in Python interviews.