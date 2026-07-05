# Module 8 — Object-Oriented Programming

# Chapter 26 — Methods & Attributes

---

# Learning Objectives

By the end of this chapter, you will understand:

- What are Methods?
- Instance Methods
- Instance Variables vs Class Variables
- Class Variables
- Static Methods
- Class Methods
- `self` vs `cls`
- When to Use Each Method
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine a university.

Every student has

- Name
- Age
- Roll Number

But every student also performs actions.

- Study
- Attend Class
- Write Exam

The **data** belongs to the student.

The **actions** belong to the student as well.

In Object-Oriented Programming,

we call these actions **Methods**.

---

# Story — Smartphone

Imagine buying a smartphone.

It has data

```text
Brand

Model

Battery

Storage
```

It also performs actions

```text
Call()

↓

Take Photo()

↓

Play Music()

↓

Charge()
```

The phone isn't useful because of its data alone.

It becomes useful because of its **behavior**.

Methods define that behavior.

---

# What are Methods?

Methods are **functions defined inside a class**.

They describe what an object can do.

Example

```python
class Student:

    def study(self):

        print("Studying...")
```

Here,

```python
study()
```

is a method.

---

# Instance Methods

The most common type of method.

They work with **individual objects**.

Example

```python
class Student:

    def greet(self):

        print(

            "Hello"

        )
```

Creating an object

```python
student = Student()

student.greet()
```

Output

```text
Hello
```

---

# Why self?

Suppose two students exist.

```python
student1

student2
```

When

```python
student1.greet()
```

runs,

Python internally calls

```python
Student.greet(student1)
```

Similarly,

```python
student2.greet()
```

becomes

```python
Student.greet(student2)
```

That's why every instance method needs

```python
self
```

It refers to **the current object**.

---

# Example

```python
class Student:

    def __init__(

        self,

        name

    ):

        self.name = name

    def introduce(self):

        print(

            "I am",

            self.name

        )

student = Student(

"Alice"

)

student.introduce()
```

Output

```text
I am Alice
```

---

# Attributes

An **attribute** is a variable inside a class or object.

Python has two major types:

- Instance Variables
- Class Variables

---

# Instance Variables

Created using

```python
self.variable
```

Each object gets its own copy.

Example

```python
class Student:

    def __init__(

        self,

        name

    ):

        self.name = name
```

Every student has a different name.

Visualization

```text
Student 1

↓

name = Alice

----------------

Student 2

↓

name = Bob
```

---

# Class Variables

Some data is shared by every object.

Example

Every student belongs to

```text
ABC University
```

Instead of storing it inside every object,

store it once in the class.

Example

```python
class Student:

    university = "ABC"

    def __init__(

        self,

        name

    ):

        self.name = name
```

---

# Accessing Class Variables

```python
student = Student(

"Alice"

)

print(

student.university

)
```

Output

```text
ABC
```

You can also access it using the class.

```python
print(

Student.university

)
```

---

# Instance Variables vs Class Variables

| Instance Variable | Class Variable |
|-------------------|----------------|
| Belongs to object | Belongs to class |
| Created using `self` | Defined directly in class |
| Different for every object | Shared by all objects |

---

# Visualization

```text
Student Class

↓

University = ABC

----------------------

Object 1

↓

Name = Alice

----------------------

Object 2

↓

Name = Bob
```

One university.

Many names.

---

# Static Methods

Sometimes,

a method doesn't need

- Object data
- Class data

Example

A calculator.

```python
2 + 3
```

doesn't depend on any object.

Python provides

```python
@staticmethod
```

---

# Example

```python
class Calculator:

    @staticmethod

    def add(a, b):

        return a + b

print(

Calculator.add(

2,

3

)

)
```

Output

```text
5
```

Notice

No

```python
self
```

No

```python
cls
```

---

# Why Static Methods?

Suppose a function logically belongs to a class,

but doesn't use object or class state.

Example

```text
Temperature Conversion

Math Utilities

Validation Functions
```

Static methods help group related functionality together.

---

# Class Methods

Sometimes,

a method works with the **class itself**,

not an individual object.

Python provides

```python
@classmethod
```

---

# cls

Instead of

```python
self
```

class methods receive

```python
cls
```

which refers to the class.

---

# Example

```python
class Student:

    university = "ABC"

    @classmethod

    def show_university(cls):

        print(

            cls.university

        )

Student.show_university()
```

Output

```text
ABC
```

---

# Why Class Methods?

Suppose you want to update a value shared by all students.

```python
class Student:

    university = "ABC"

    @classmethod

    def change_university(

        cls,

        name

    ):

        cls.university = name
```

Now

```python
Student.change_university(

"XYZ"

)
```

Every student automatically sees the new university.

---

# self vs cls

One of the most common interview questions.

| self | cls |
|------|------|
| Current Object | Current Class |
| Instance Method | Class Method |

Visualization

```text
self

↓

Student Object

----------------

cls

↓

Student Class
```

---

# Three Types of Methods

```text
Methods

│

├── Instance Method

│      Uses self

│

├── Class Method

│      Uses cls

│

└── Static Method

       Uses Neither
```

---

# When Should You Use Each?

## Instance Method

Needs object data.

Example

```text
Withdraw Money

Update Marks

Display Student
```

---

## Class Method

Needs shared class data.

Example

```text
Change University

Create Alternate Constructor

Count Objects
```

---

## Static Method

Independent utility function.

Example

```text
Math Functions

Validation

Conversion
```

---

# Real-World Example

Imagine an online banking system.

```text
Account

↓

Balance

↓

Instance Variable

--------------------

Bank Name

↓

Class Variable

--------------------

Interest Calculator

↓

Static Method

--------------------

Change Interest Rate

↓

Class Method
```

Everything has a logical place.

---

# Memory Trick

Remember

```text
ICS
```

**I**

Instance Method

↓

**C**

Class Method

↓

**S**

Static Method

And remember

```text
self

↓

Object

----------------

cls

↓

Class

----------------

Neither

↓

Static
```

---

# Common Beginner Mistakes

### Mistake 1

Using

```python
self
```

inside static methods.

Static methods do not receive an object.

---

### Mistake 2

Using class variables for object-specific data.

Names,

ages,

and balances should be instance variables.

---

### Mistake 3

Changing class variables through objects accidentally.

Example

```python
student.university = "XYZ"
```

This creates an instance variable that shadows the class variable,

rather than changing it for all objects.

Use

```python
Student.university = "XYZ"
```

or a class method instead.

---

### Mistake 4

Confusing

```python
@classmethod
```

and

```python
@staticmethod
```

A class method receives

```python
cls
```

A static method receives neither

```python
self
```

nor

```python
cls
```

---

# Interview Questions & Answers

## Q1. What is an Instance Method?

### Answer

An instance method operates on an individual object.

It receives

```python
self
```

as its first parameter,

allowing it to access and modify instance variables.

---

## Q2. What is a Class Variable?

### Answer

A class variable belongs to the class itself,

not to individual objects.

All instances share the same class variable unless it is shadowed by an instance attribute.

---

## Q3. What is the difference between `@staticmethod` and `@classmethod`?

### Answer

`@staticmethod`

- Does not receive `self` or `cls`
- Acts like a regular function grouped inside a class

`@classmethod`

- Receives `cls`
- Can access and modify class-level data
- Commonly used for alternate constructors

---

## Q4. What is the difference between `self` and `cls`?

### Answer

`self`

refers to the current object.

`cls`

refers to the current class.

Use `self` in instance methods and `cls` in class methods.

---

## Q5. When should you use a Static Method?

### Answer

Use a static method when the function logically belongs to a class,

but doesn't need access to either object-specific or class-specific data.

Examples include utility functions,

calculations,

and validation methods.

---

# Chapter Summary / Cheat Sheet

| Concept | Purpose |
|----------|----------|
| Instance Method | Works with object data |
| Class Method | Works with class data |
| Static Method | Independent utility function |
| Instance Variable | Unique for every object |
| Class Variable | Shared by all objects |
| `self` | Current object |
| `cls` | Current class |
| `@staticmethod` | No `self` or `cls` |
| `@classmethod` | Receives `cls` |

---

# What's Next?

In **Chapter 27 — OOP Principles**, you'll learn the four fundamental pillars of Object-Oriented Programming:

- Encapsulation
- Inheritance
- Polymorphism
- Abstraction

These principles form the foundation of professional software design and are among the most frequently asked topics in Python and system design interviews.