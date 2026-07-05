# Module 8 — Object-Oriented Programming

# Chapter 29 — Modern Python Classes

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Modern Python Classes?
- Dataclasses
- Why Dataclasses Exist
- Creating Dataclasses
- Default Values
- Properties (`@property`)
- Getter & Setter Methods
- Data Validation
- `__slots__`
- Memory Optimization
- When to Use Each Feature
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're filling out an online form.

Every customer has

- Name
- Age
- Email
- Address

Without automation,

you would repeatedly write

- Constructor
- String Representation
- Equality Methods

for every class.

That's repetitive.

Modern Python provides features that automatically generate much of this boilerplate.

These include

- Dataclasses
- Properties
- `__slots__`

Together,

they help you write cleaner,

faster,

and more maintainable code.

---

# Story — House Construction

Imagine building houses.

Old approach

```text
Lay Bricks

↓

Build Walls

↓

Install Doors

↓

Install Windows

↓

Paint
```

Every house starts from scratch.

Now imagine using

**prefabricated houses**.

```text
Choose Design

↓

Factory Builds Components

↓

Assemble House
```

Much faster.

Dataclasses work exactly like prefabricated houses.

Python generates repetitive code automatically.

---

# Why Modern Classes?

Suppose you create

```python
class Student:

    def __init__(

        self,

        name,

        age

    ):

        self.name = name

        self.age = age

    def __repr__(self):

        ...

    def __eq__(self):

        ...
```

Every class looks the same.

Lots of repetitive code.

Modern Python eliminates this repetition.

---

# Dataclasses

Python introduced

```python
@dataclass
```

to automatically generate common methods.

Example

```python
from dataclasses import dataclass

@dataclass

class Student:

    name: str

    age: int
```

That's it.

Python automatically creates

- Constructor
- `__repr__()`
- `__eq__()`

and more.

---

# Without Dataclass

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

Many lines of code.

---

# With Dataclass

```python
@dataclass

class Student:

    name: str

    age: int
```

Cleaner.

More readable.

Less error-prone.

---

# Creating Objects

```python
student = Student(

"Alice",

20

)

print(student)
```

Output

```text
Student(

name='Alice',

age=20

)
```

Notice

No

```python
__str__()

or

__repr__()
```

was written.

Python generated them.

---

# Default Values

Dataclasses allow default values.

Example

```python
from dataclasses import dataclass

@dataclass

class Student:

    name: str

    age: int = 18
```

Now

```python
Student("Alice")
```

Output

```text
Student(

name='Alice',

age=18

)
```

---

# Dataclass Benefits

Automatically generates

```text
Constructor

↓

String Representation

↓

Equality

↓

Ordering (optional)

↓

Less Boilerplate
```

---

# What is a Property?

Suppose

```python
student.age
```

works today.

Later,

you want validation.

Without properties,

you must change every place where

```python
student.age
```

is used.

Properties solve this problem.

---

# Story — Smart Door

Imagine a smart office.

Employees simply use

```text
Open Door
```

Internally,

the system checks

- ID Card
- Face Recognition
- Fingerprint

The user never notices.

Properties work the same way.

Access looks like a normal variable,

but hidden logic runs automatically.

---

# @property

Example

```python
class Student:

    def __init__(

        self,

        age

    ):

        self._age = age

    @property

    def age(self):

        return self._age
```

Now

```python
student.age
```

looks like a variable,

but actually calls a method.

---

# Property Getter

Visualization

```text
student.age

↓

@property

↓

Return Value
```

No parentheses needed.

---

# Property Setter

Suppose

age cannot be negative.

```python
class Student:

    def __init__(

        self,

        age

    ):

        self._age = age

    @property

    def age(self):

        return self._age

    @age.setter

    def age(

        self,

        value

    ):

        if value < 0:

            raise ValueError(

                "Invalid Age"

            )

        self._age = value
```

Now

```python
student.age = -5
```

raises

```text
ValueError
```

---

# Why Use Properties?

Without properties,

users directly modify

```python
student.age
```

No validation.

With properties,

you can

- Validate
- Compute
- Log
- Restrict Access

while keeping the same interface.

---

# __slots__

Suppose you create

```text
1 Million Objects
```

Each object stores

its own dictionary

to hold attributes.

That consumes a lot of memory.

Python provides

```python
__slots__
```

to reduce memory usage.

---

# Example

```python
class Student:

    __slots__ = (

        "name",

        "age"

    )

    def __init__(

        self,

        name,

        age

    ):

        self.name = name

        self.age = age
```

Now,

Python stores attributes more efficiently.

---

# Why __slots__?

Normal Object

```text
Object

↓

Dictionary

↓

Attributes
```

Object with

```python
__slots__
```

```text
Object

↓

Fixed Memory Layout
```

Less memory.

Faster attribute access in many cases.

---

# Limitation of __slots__

Suppose

```python
student.city = "Delhi"
```

Output

```text
AttributeError
```

Because

```python
city
```

was not declared.

---

# Dataclass vs Normal Class

| Normal Class | Dataclass |
|---------------|-----------|
| More Code | Less Code |
| Manual Constructor | Auto Constructor |
| Manual `__repr__` | Auto Generated |
| Manual `__eq__` | Auto Generated |

---

# Property vs Variable

| Variable | Property |
|------------|----------|
| Direct Access | Controlled Access |
| No Validation | Validation Possible |
| Simple Storage | Computed Values Possible |

---

# When Should You Use Each?

## Dataclass

Use when

```text
Mostly Stores Data
```

Examples

- Student
- Employee
- Product
- Configuration

---

## Property

Use when

```text
Need Validation

↓

Need Computed Values

↓

Need Backward Compatibility
```

---

## __slots__

Use when

```text
Millions of Objects

↓

Memory Matters
```

Examples

- Game Engines
- Simulations
- Scientific Computing

---

# Real-World Example

Imagine a social media platform.

```text
User

↓

Dataclass

----------------

Age

↓

Property Validation

----------------

Millions of Users

↓

__slots__
```

All three features work together.

---

# Memory Trick

Remember

```text
DPS
```

**D**

Dataclass

↓

**P**

Property

↓

**S**

Slots

And remember

```text
Less Code

↓

Safe Access

↓

Less Memory
```

---

# Common Beginner Mistakes

### Mistake 1

Using dataclasses for every class.

Dataclasses are best suited for classes that primarily store data.

Complex business logic may still be better served by regular classes.

---

### Mistake 2

Accessing private attributes directly.

Instead of

```python
student._age
```

prefer

```python
student.age
```

using a property.

---

### Mistake 3

Using

```python
__slots__
```

without understanding its limitations.

Objects with `__slots__` cannot have arbitrary new attributes unless explicitly allowed.

---

### Mistake 4

Using properties without validation.

Properties become most useful when they enforce rules or compute values,

rather than simply returning an attribute.

---

# Interview Questions & Answers

## Q1. What is a Dataclass?

### Answer

A dataclass is a Python class decorated with

```python
@dataclass
```

that automatically generates common methods such as

- `__init__()`
- `__repr__()`
- `__eq__()`

This significantly reduces boilerplate code.

---

## Q2. What is the purpose of `@property`?

### Answer

`@property` allows methods to be accessed like attributes.

It provides a clean interface while enabling validation,

computed values,

or additional logic behind the scenes.

---

## Q3. Why use `__slots__`?

### Answer

`__slots__` reduces memory usage by preventing Python from creating a per-instance dictionary.

It is especially useful when creating a very large number of objects.

---

## Q4. What is the difference between a Property and a Normal Variable?

### Answer

A normal variable stores data directly.

A property looks like a variable to users,

but internally executes methods,

allowing validation and controlled access.

---

## Q5. When should you use a Dataclass?

### Answer

Use a dataclass when the class primarily stores data.

Examples include:

- Employee
- Product
- Student
- Configuration Objects

For classes with complex behavior,

a regular class may be more appropriate.

---

# Chapter Summary / Cheat Sheet

| Feature | Purpose |
|----------|----------|
| `@dataclass` | Automatically generate common methods |
| Default Values | Simplify object creation |
| `@property` | Controlled attribute access |
| `@property.setter` | Validate or modify assignments |
| `__slots__` | Reduce memory usage and restrict attributes |

---

# What's Next?

In **Chapter 30 — SOLID Introduction**, you'll learn the five design principles that help developers build maintainable and scalable software:

- Single Responsibility Principle (SRP)
- Open/Closed Principle (OCP)
- Liskov Substitution Principle (LSP)
- Interface Segregation Principle (ISP)
- Dependency Inversion Principle (DIP)

These principles are fundamental to professional software engineering and are frequently discussed in senior-level interviews and system design.