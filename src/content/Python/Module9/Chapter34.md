# Module 9 — Advanced Python

# Chapter 34 — Properties & Descriptors

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Descriptors Exist
- Revisiting Properties
- The Descriptor Protocol
- `__get__()`
- `__set__()`
- `__delete__()`
- Data Descriptors vs Non-Data Descriptors
- How Python Uses Descriptors Internally
- Real-world Applications
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine living in a smart home.

When you switch on the lights,

you don't directly connect electricity.

Instead,

a smart controller decides

- Should the light turn on?
- Is there enough power?
- Should brightness change?

```text
Switch

↓

Controller

↓

Electricity

↓

Light
```

The controller sits **between**

you

and

the light.

Descriptors work exactly the same way.

They sit between

your code

and

an object's attributes.

---

# Story — Bank Locker

Imagine a bank locker.

Can customers directly access the locker?

No.

They first visit the bank officer.

```text
Customer

↓

Bank Officer

↓

Locker

↓

Money
```

The officer decides

- Can you access it?
- Can you modify it?
- Can you delete it?

Descriptors act like the bank officer.

They control attribute access.

---

# Why Descriptors?

Suppose

```python
student.age = -10
```

Should Python allow this?

Probably not.

We need a mechanism that controls

- Reading
- Writing
- Deleting

attributes.

That's exactly why descriptors exist.

---

# Revisiting Properties

Earlier,

we learned

```python
@property
```

Example

```python
class Student:

    def __init__(self):

        self._age = 18

    @property

    def age(self):

        return self._age
```

Question:

How does

```python
student.age
```

call a method?

The answer is

**Descriptors.**

---

# What is a Descriptor?

A descriptor is an object that controls attribute access.

It defines one or more of these methods

```python
__get__()

__set__()

__delete__()
```

Together,

these methods form the **Descriptor Protocol**.

---

# Descriptor Protocol

```text
Read Attribute

↓

__get__()

----------------

Write Attribute

↓

__set__()

----------------

Delete Attribute

↓

__delete__()
```

Whenever you access an attribute,

Python checks

whether it's a descriptor.

If yes,

it calls these methods automatically.

---

# __get__()

Runs when an attribute is read.

Example

```python
class Demo:

    def __get__(

        self,

        instance,

        owner

    ):

        print("Reading")

        return 100
```

Usage

```python
class Student:

    age = Demo()

student = Student()

print(student.age)
```

Output

```text
Reading

100
```

Notice

Reading the attribute automatically called

```python
__get__()
```

---

# __set__()

Runs when assigning a value.

Example

```python
class Demo:

    def __set__(

        self,

        instance,

        value

    ):

        print(

            "Setting",

            value

        )
```

Now

```python
student.age = 20
```

Output

```text
Setting 20
```

---

# __delete__()

Runs when deleting an attribute.

Example

```python
class Demo:

    def __delete__(

        self,

        instance

    ):

        print("Deleted")
```

Now

```python
del student.age
```

Output

```text
Deleted
```

---

# Complete Descriptor Example

```python
class Age:

    def __get__(

        self,

        instance,

        owner

    ):

        return instance._age

    def __set__(

        self,

        instance,

        value

    ):

        if value < 0:

            raise ValueError(

                "Invalid Age"

            )

        instance._age = value

class Student:

    age = Age()

    def __init__(

        self,

        age

    ):

        self.age = age
```

Now

```python
student.age = -5
```

raises

```text
ValueError
```

The descriptor enforces validation automatically.

---

# Data Descriptors

A descriptor implementing

```python
__get__()

+

__set__()
```

or

```python
__delete__()
```

is called a

**Data Descriptor**.

These have the highest priority during attribute lookup.

---

# Non-Data Descriptors

A descriptor implementing only

```python
__get__()
```

is called a

**Non-Data Descriptor**.

Functions inside classes are examples of non-data descriptors.

---

# Descriptor Lookup Order

One of the favorite interview questions.

When Python evaluates

```python
obj.attribute
```

it searches in this order:

```text
1

Data Descriptor

↓

2

Instance Dictionary

↓

3

Non-Data Descriptor

↓

4

Class Variable

↓

5

Parent Classes
```

This lookup order explains why properties override normal attributes.

---

# How Methods Work

Suppose

```python
class Student:

    def greet(self):

        ...
```

Question

Why does

```python
student.greet()
```

automatically receive

```python
self
```

Answer

Because functions are

**Non-Data Descriptors.**

Python automatically binds

the object

to the method.

---

# How @property Works

When you write

```python
@property

def age(...):
```

Python internally creates

a descriptor object.

Visualization

```text
student.age

↓

Descriptor

↓

Getter

↓

Value
```

Properties are descriptors.

---

# Real-World Applications

Descriptors are used internally by

```text
@property

↓

Functions

↓

Methods

↓

ORMs

↓

Django Models

↓

SQLAlchemy

↓

Validation Libraries
```

Many advanced Python frameworks rely heavily on descriptors.

---

# Properties vs Descriptors

| Property | Descriptor |
|------------|------------|
| Built-in | Low-Level Mechanism |
| Easier to Use | More Powerful |
| Common | Advanced |
| Uses Descriptors Internally | Foundation of Attribute Access |

Think of it like this:

```text
Descriptors

↓

Build

↓

Properties
```

---

# When Should You Use Descriptors?

Most Python developers rarely need custom descriptors.

Use them when

- Multiple attributes require the same validation
- You are building frameworks or libraries
- You need reusable attribute behavior

For everyday classes,

`@property` is usually enough.

---

# Real-World Example

Imagine a school management system.

```text
Student Marks

↓

Descriptor

↓

Validation

↓

Marks Stored

----------------

Teacher Salary

↓

Descriptor

↓

Validation

↓

Salary Stored
```

Instead of repeating validation everywhere,

one descriptor handles it.

---

# Memory Trick

Remember

```text
GSD
```

**G**

`__get__()`

↓

**S**

`__set__()`

↓

**D**

`__delete__()`

Or remember

```text
Read

↓

Write

↓

Delete
```

Every descriptor controls one or more of these operations.

---

# Common Beginner Mistakes

### Mistake 1

Using descriptors when a property is sufficient.

For most applications,

`@property` is simpler and more readable.

---

### Mistake 2

Confusing descriptors with decorators.

Decorators modify functions.

Descriptors manage attribute access.

They solve different problems.

---

### Mistake 3

Forgetting that descriptors are shared across instances.

Descriptor objects belong to the class,

not individual objects.

Any per-object data should be stored inside the instance.

---

### Mistake 4

Ignoring the attribute lookup order.

Understanding descriptor precedence helps explain many seemingly "magic" Python behaviors.

---

# Interview Questions & Answers

## Q1. What is a Descriptor?

### Answer

A descriptor is an object that controls how attributes are accessed.

It implements one or more of

- `__get__()`
- `__set__()`
- `__delete__()`

and follows the Descriptor Protocol.

---

## Q2. What is the Descriptor Protocol?

### Answer

The Descriptor Protocol consists of three special methods:

- `__get__()` → Called when reading an attribute.
- `__set__()` → Called when assigning an attribute.
- `__delete__()` → Called when deleting an attribute.

Python automatically invokes these methods during attribute access.

---

## Q3. What is the difference between a Property and a Descriptor?

### Answer

A property is a **built-in implementation** of the descriptor protocol.

Properties are easier to use,

while descriptors provide more flexibility and power.

In fact,

`@property` itself is implemented using descriptors.

---

## Q4. What is the difference between Data and Non-Data Descriptors?

### Answer

A **Data Descriptor** implements

```python
__get__()
```

and either

```python
__set__()
```

or

```python
__delete__()
```

A **Non-Data Descriptor** implements only

```python
__get__()
```

Methods in Python are non-data descriptors.

---

## Q5. Why are Descriptors important?

### Answer

Descriptors power many of Python's core features,

including

- Methods
- Properties
- Static Methods
- Class Methods
- ORM Fields

They provide reusable logic for attribute access and form one of the foundations of Python's object model.

---

# Chapter Summary / Cheat Sheet

| Descriptor Method | Purpose |
|-------------------|----------|
| `__get__()` | Read attribute |
| `__set__()` | Assign attribute |
| `__delete__()` | Delete attribute |
| Data Descriptor | `__get__` + `__set__`/`__delete__` |
| Non-Data Descriptor | Only `__get__` |
| `@property` | Built on descriptors |

---

# What's Next?

In **Chapter 35 — Modern Python**, you'll explore advanced language features used in modern Python development:

- Type Hinting
- Protocols
- Generics
- `functools`
- `itertools`

These features are widely used in production code, static analysis tools, large-scale software projects, and advanced Python interviews.