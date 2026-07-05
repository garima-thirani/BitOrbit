# Module 8 — Object-Oriented Programming

# Chapter 25 — Classes & Objects

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Object-Oriented Programming (OOP)?
- What is a Class?
- What is an Object?
- Creating Classes
- Creating Objects
- Constructors (`__init__`)
- Instance Variables
- The `self` Keyword
- Object Lifecycle
- Real-world Modeling
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're an architect designing houses.

You don't build every house from scratch.

Instead,

you first create a **blueprint**.

```text
Blueprint

↓

House 1

House 2

House 3
```

Every house is built using the same blueprint,

but each house has its own

- Owner
- Color
- Address

Object-Oriented Programming works exactly the same way.

A **Class** is the blueprint.

An **Object** is a real house built from that blueprint.

---

# Story — Car Factory

Imagine Toyota designs a new car.

First,

engineers create the design.

```text
Car Design

↓

Manufacturing

↓

Thousands of Cars
```

The design is never driven.

The cars are.

Similarly,

a class is only a design.

Objects are the real usable entities.

---

# Why OOP?

Suppose you're writing software for a university.

Without OOP,

you may write

```python
student1_name = "Alice"

student1_age = 20

student1_marks = 95

student2_name = "Bob"

student2_age = 21

student2_marks = 88
```

Imagine doing this for

```text
10,000 Students
```

Impossible to manage.

Instead,

create one **Student** class.

```text
Student Class

↓

Student Object 1

↓

Student Object 2

↓

Student Object 3
```

Cleaner,

Reusable,

Scalable.

---

# What is a Class?

A **Class** is a blueprint that defines

- Attributes (Data)
- Methods (Behavior)

Think of it as a template.

Visualization

```text
Blueprint

↓

Defines

↓

Properties

+

Actions
```

---

# What is an Object?

An **Object** is an instance of a class.

If

```text
Class

↓

Blueprint
```

then

```text
Object

↓

Real Product
```

Example

```text
Blueprint

↓

Honda City

↓

Car 1

Car 2

Car 3
```

Every car is an object.

---

# Creating Your First Class

Syntax

```python
class Student:

    pass
```

Nothing happens yet.

You've only created the blueprint.

---

# Creating an Object

```python
class Student:

    pass

student1 = Student()
```

Visualization

```text
Student Class

↓

Student()

↓

Object Created
```

Now,

`student1`

is an object.

---

# Class vs Object

| Class | Object |
|--------|---------|
| Blueprint | Instance |
| Defines structure | Holds actual data |
| Created once | Can have many |
| No memory for instance data | Occupies memory |

---

# Constructors

Suppose every student should have

- Name
- Age

Instead of assigning them later,

initialize them when the object is created.

Python provides

```python
__init__()
```

called the **constructor**.

---

# What is a Constructor?

A constructor is a special method that runs **automatically** when an object is created.

Example

```python
class Student:

    def __init__(self):

        print("Student Created")
```

Now

```python
student = Student()
```

Output

```text
Student Created
```

---

# Why Constructors?

Without constructor

```python
student = Student()

student.name = "Alice"

student.age = 20
```

With constructor

```python
student = Student(

"Alice",

20
)
```

Cleaner.

Safer.

---

# Constructor with Parameters

```python
class Student:

    def __init__(

        self,

        name,

        age

    ):

        self.name = name

        self.age = age
```

Creating an object

```python
student = Student(

"Alice",

20

)
```

---

# Understanding self

This is one of the most important Python interview topics.

Many beginners think

```python
self
```

is a keyword.

It is **not**.

It is simply the convention used to refer to the current object.

---

# Story — "I" vs "You"

Imagine Alice says

> "My name is Alice."

Bob says

> "My name is Bob."

The word

```text
My
```

changes depending on who is speaking.

Similarly,

```python
self
```

always refers to

**the current object**.

---

# Visualization of self

Suppose

```python
student1 = Student(

"Alice",

20

)

student2 = Student(

"Bob",

21

)
```

Memory

```text
Student 1

↓

self

↓

name = Alice

age = 20

--------------------

Student 2

↓

self

↓

name = Bob

age = 21
```

Each object has its own data.

---

# Instance Variables

Variables that belong to an object are called

**Instance Variables**.

Example

```python
self.name

self.age
```

Each object gets its own copy.

---

# Example

```python
class Student:

    def __init__(

        self,

        name,

        age

    ):

        self.name = name

        self.age = age

student1 = Student(

"Alice",

20

)

student2 = Student(

"Bob",

21

)

print(student1.name)

print(student2.name)
```

Output

```text
Alice

Bob
```

Notice

each object stores different values.

---

# Object Lifecycle

Every object follows this lifecycle.

```text
Create Object

↓

Constructor Runs

↓

Object Used

↓

Object Destroyed
```

Python automatically destroys objects when they are no longer needed.

We'll study memory management in detail later.

---

# Multiple Objects

One class

can create

thousands of objects.

```text
Student Class

↓

Alice

↓

Bob

↓

Charlie

↓

David
```

Each object is independent.

---

# Real-World Example

Imagine a banking application.

```text
Account Class

↓

Account 1

↓

Balance = ₹10,000

--------------------

Account 2

↓

Balance = ₹25,000
```

One class.

Many accounts.

Each account stores its own information.

---

# Why OOP is Powerful?

Without OOP

```text
Data

↓

Functions

↓

Mixed Together
```

With OOP

```text
Object

↓

Own Data

+

Own Behavior
```

Everything related stays together.

This makes large applications easier to build and maintain.

---

# Memory Trick

Remember

```text
COCI
```

**C**

Class

↓

**O**

Object

↓

**C**

Constructor

↓

**I**

Instance Variable

And remember

```text
Blueprint

↓

Class

↓

Object

↓

Real Thing
```

---

# Common Beginner Mistakes

### Mistake 1

Thinking a class stores data.

A class defines the structure.

Objects store the actual data.

---

### Mistake 2

Forgetting

```python
self
```

inside instance methods.

Without `self`,

Python doesn't know which object's data you're referring to.

---

### Mistake 3

Confusing class creation with object creation.

```python
class Student:
```

creates the blueprint.

```python
Student()
```

creates an object.

---

### Mistake 4

Creating instance variables outside the constructor without a good reason.

Initialize object state inside

```python
__init__()
```

to keep objects consistent.

---

# Interview Questions & Answers

## Q1. What is the difference between a Class and an Object?

### Answer

A **Class** is a blueprint that defines attributes and methods.

An **Object** is an instance of that class containing actual data.

One class can create many objects.

---

## Q2. What is a Constructor?

### Answer

A constructor is the special method

```python
__init__()
```

It is called automatically whenever an object is created.

Its primary purpose is to initialize the object's state.

---

## Q3. What is `self`?

### Answer

`self` is a reference to the current object.

It allows instance methods to access and modify that object's variables.

It is not a reserved keyword,

but using the name `self` is the accepted Python convention.

---

## Q4. What are Instance Variables?

### Answer

Instance variables belong to individual objects.

They are usually created inside the constructor using

```python
self.variable_name
```

Each object maintains its own copy of these variables.

---

## Q5. Why use Object-Oriented Programming?

### Answer

OOP helps organize code by combining data and behavior into objects.

Its major benefits include:

- Code Reusability
- Better Organization
- Easier Maintenance
- Scalability
- Real-world Modeling

---

# Chapter Summary / Cheat Sheet

| Concept | Purpose |
|----------|----------|
| Class | Blueprint for objects |
| Object | Instance of a class |
| `__init__()` | Constructor |
| `self` | Reference to current object |
| Instance Variable | Data unique to each object |
| `ClassName()` | Create an object |

---

# What's Next?

In **Chapter 26 — Methods & Attributes**, you'll learn how objects behave:

- Instance Methods
- Class Variables
- Static Methods
- Class Methods

These concepts explain how Python objects share data, define behavior, and interact with each other.