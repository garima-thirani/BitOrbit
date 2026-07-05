# Module 8 — Object-Oriented Programming

# Chapter 28 — Magic Methods

---

# Learning Objectives

By the end of this chapter, you will understand:

- What are Magic (Dunder) Methods?
- Why Magic Methods Exist
- Common Magic Methods
- Object Representation
- Operator Overloading
- Comparison Operators
- Arithmetic Operators
- Container Magic Methods
- Best Practices
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine buying a new smartphone.

You press

```text
Power Button

↓

Phone Turns On
```

You never think about

- CPU
- Battery Circuit
- Boot Loader

A hidden mechanism performs all the work.

Python objects behave the same way.

When you write

```python
len(my_list)
```

Python secretly calls

```python
my_list.__len__()
```

These hidden methods are called **Magic Methods** (or **Dunder Methods**, short for **Double UNDERscore** methods).

---

# Story — Automatic Doors

Imagine entering a shopping mall.

You don't manually open the door.

Instead,

```text
Walk Near Door

↓

Sensor Detects You

↓

Door Opens
```

You never call

```text
Open Door()
```

The system does it automatically.

Magic methods work exactly the same way.

Python automatically calls them when needed.

---

# What are Magic Methods?

Magic methods are **special methods** that begin and end with double underscores.

Example

```python
__init__

__str__

__len__

__add__

__eq__
```

Python invokes them automatically during built-in operations.

---

# Why are they called "Magic"?

Because they are rarely called directly.

Instead,

Python calls them behind the scenes.

Example

```python
print(obj)
```

Internally,

Python executes

```python
obj.__str__()
```

---

# Common Magic Methods

| Method | Purpose |
|----------|----------|
| `__init__` | Constructor |
| `__str__` | User-friendly string |
| `__repr__` | Developer representation |
| `__len__` | Length |
| `__eq__` | Equality |
| `__lt__` | Less Than |
| `__add__` | Addition |
| `__getitem__` | Indexing |

---

# __init__()

You already know this one.

It runs automatically whenever an object is created.

Example

```python
class Student:

    def __init__(

        self,

        name

    ):

        self.name = name
```

---

# __str__()

Suppose

```python
class Student:

    def __init__(

        self,

        name

    ):

        self.name = name

student = Student(

"Alice"

)

print(student)
```

Output

```text
<__main__.Student object at 0x...>
```

Not very useful.

---

# Using __str__()

```python
class Student:

    def __init__(

        self,

        name

    ):

        self.name = name

    def __str__(self):

        return f"Student({self.name})"
```

Now

```python
print(student)
```

Output

```text
Student(Alice)
```

Much better.

---

# __repr__()

Imagine you're debugging.

Python often displays

```python
repr(obj)
```

instead of

```python
str(obj)
```

Example

```python
class Student:

    def __repr__(self):

        return "Student('Alice')"
```

Output

```python
Student('Alice')
```

---

# __str__ vs __repr__

| `__str__` | `__repr__` |
|------------|------------|
| For Users | For Developers |
| Readable | Unambiguous |
| Used by `print()` | Used by `repr()` and interactive console |

A common recommendation is:

- `__str__` → Friendly output
- `__repr__` → Detailed/debugging output

---

# __len__()

Suppose

```python
len(my_object)
```

How does Python know the length?

Internally,

```python
my_object.__len__()
```

---

# Example

```python
class Team:

    def __len__(self):

        return 11

team = Team()

print(

len(team)

)
```

Output

```text
11
```

---

# Operator Overloading

One of Python's coolest features.

Suppose

```python
5 + 3
```

Python actually executes

```python
5.__add__(3)
```

The

```text
+
```

operator itself is implemented using a magic method.

---

# Why Operator Overloading?

Suppose you create a

```text
Vector
```

class.

Wouldn't it be nice if

```python
v1 + v2
```

worked naturally?

Magic methods make this possible.

---

# __add__()

Example

```python
class Vector:

    def __init__(

        self,

        value

    ):

        self.value = value

    def __add__(

        self,

        other

    ):

        return Vector(

            self.value + other.value

        )

v1 = Vector(5)

v2 = Vector(10)

v3 = v1 + v2

print(v3.value)
```

Output

```text
15
```

---

# Comparison Operators

Python allows objects to define comparison behavior.

---

## Equality

```python
__eq__()
```

Supports

```python
==
```

---

## Not Equal

```python
__ne__()
```

Supports

```python
!=
```

---

## Less Than

```python
__lt__()
```

Supports

```python
<
```

---

## Greater Than

```python
__gt__()
```

Supports

```python
>
```

---

# Example

```python
class Student:

    def __init__(

        self,

        marks

    ):

        self.marks = marks

    def __eq__(

        self,

        other

    ):

        return self.marks == other.marks
```

Now

```python
Student(90)

==

Student(90)
```

returns

```text
True
```

---

# Container Magic Methods

Python containers use magic methods too.

---

## __getitem__()

Supports

```python
obj[index]
```

Example

```python
class Numbers:

    def __getitem__(

        self,

        index

    ):

        return index * 10

numbers = Numbers()

print(

numbers[5]

)
```

Output

```text
50
```

---

## __setitem__()

Supports

```python
obj[index] = value
```

---

## __contains__()

Supports

```python
x in obj
```

---

# Commonly Used Magic Methods

```text
Object Creation

↓

__init__

----------------

Printing

↓

__str__

↓

__repr__

----------------

Length

↓

__len__

----------------

Addition

↓

__add__

----------------

Comparison

↓

__eq__

↓

__lt__

↓

__gt__

----------------

Indexing

↓

__getitem__
```

---

# Real-World Example

Imagine building an e-commerce application.

```python
cart1 + cart2
```

could combine two shopping carts.

Or

```python
order1 == order2
```

could compare orders.

Magic methods make custom objects behave like built-in Python types.

---

# Memory Trick

Remember

```text
SLAC
```

**S**

String

↓

`__str__`

↓

**L**

Length

↓

`__len__`

↓

**A**

Addition

↓

`__add__`

↓

**C**

Comparison

↓

`__eq__`

---

# Common Beginner Mistakes

### Mistake 1

Calling magic methods directly.

Instead of

```python
obj.__len__()
```

prefer

```python
len(obj)
```

The built-in function is clearer and more idiomatic.

---

### Mistake 2

Returning non-string values from

```python
__str__()
```

`__str__()` **must return a string**.

---

### Mistake 3

Implementing

```python
__eq__()
```

without thinking about object equality.

Two objects should compare equal only when it makes logical sense.

---

### Mistake 4

Overloading operators in surprising ways.

For example,

making

```python
+
```

perform subtraction would confuse anyone reading your code.

Operator behavior should remain intuitive.

---

# Interview Questions & Answers

## Q1. What are Magic Methods?

### Answer

Magic methods (also called **dunder methods**) are special methods surrounded by double underscores.

Python automatically invokes them to implement built-in behaviors such as object creation,

printing,

comparison,

indexing,

and arithmetic operations.

---

## Q2. What is the difference between `__str__()` and `__repr__()`?

### Answer

`__str__()`

returns a human-friendly representation of an object.

It is used by

```python
print()
```

`__repr__()`

returns a detailed representation intended for developers and debugging.

It is used by

```python
repr()
```

and the interactive interpreter.

---

## Q3. What is Operator Overloading?

### Answer

Operator overloading allows custom classes to define the behavior of operators such as

```python
+

-

==

<
```

using magic methods like

```python
__add__()

__eq__()
```

This lets custom objects behave naturally.

---

## Q4. Which magic method is used by `len()`?

### Answer

Python internally calls

```python
__len__()
```

when

```python
len(obj)
```

is executed.

---

## Q5. Why are Magic Methods important?

### Answer

They allow user-defined objects to integrate seamlessly with Python's syntax and built-in functions,

making classes behave like native types such as lists,

strings,

and dictionaries.

---

# Chapter Summary / Cheat Sheet

| Magic Method | Purpose |
|---------------|----------|
| `__init__` | Constructor |
| `__str__` | User-friendly string |
| `__repr__` | Developer representation |
| `__len__` | Length |
| `__eq__` | Equality |
| `__lt__` | Less than |
| `__gt__` | Greater than |
| `__add__` | Addition |
| `__getitem__` | Indexing |
| `__setitem__` | Assignment by index |
| `__contains__` | Membership (`in`) |

---

# What's Next?

In **Chapter 29 — Modern Python Classes**, you'll learn modern Python features that simplify class design:

- `@dataclass`
- `@property`
- `__slots__`

These tools reduce boilerplate, improve readability, optimize memory usage, and are commonly used in production Python code.