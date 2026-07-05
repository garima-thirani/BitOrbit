# Module 1 — Python Fundamentals

# Chapter 4 — Writing Better Python

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why writing clean code matters
- Python Naming Conventions
- PEP 8 Style Guide
- Code Readability
- Writing Pythonic Code
- Comments & Docstrings
- Useful Built-in Functions
- Common Beginner Mistakes
- Interview Questions & Answers

---

# Introduction

Writing code that **works** is only the beginning.

Professional software developers write code that is:

- Easy to read
- Easy to debug
- Easy to maintain
- Easy to extend

Imagine joining a company where the application contains **5 million lines of Python code**.

Would you rather read this?

```python
a = 100
b = 20
c = a - b
print(c)
```

Or this?

```python
total_price = 100
discount = 20

final_price = total_price - discount

print(final_price)
```

Both programs produce the same output.

The second one is significantly easier to understand.

That's what writing good Python is about.

---

# Story — Building a House

Imagine two construction teams.

The first team builds a house quickly.

The second team spends extra time:

- Labeling every wire
- Organizing every pipe
- Drawing proper blueprints
- Keeping everything clean

Both houses work.

But ten years later,

which house will be easier to repair?

Obviously,

the second one.

Programming is exactly the same.

Writing code is easy.

Maintaining it for years is difficult.

---

# Why Code Quality Matters

Professional developers spend much more time reading code than writing it.

A common estimate is:

```text
Software Development

Writing Code

≈ 20%

Reading & Maintaining Code

≈ 80%
```

This means your future teammates—and even your future self—will spend far more time reading your code than you spent writing it.

Good code saves time.

Bad code creates bugs.

---

# The Golden Rule

> **Code is written once but read hundreds of times.**

Always optimize your code for readability.

---

# Naming Conventions

Naming is one of the hardest and most important parts of programming.

A good name explains **what something represents**.

A poor name forces readers to guess.

---

## Variable Naming

Use meaningful names.

❌ Poor

```python
x = 100
```

✔ Better

```python
salary = 100
```

---

Instead of

```python
a = "John"
```

write

```python
student_name = "John"
```

The purpose becomes immediately obvious.

---

## Snake Case

Python follows **snake_case** for variables and functions.

Example

```python
student_name

employee_salary

total_marks

is_logged_in
```

Words are separated using underscores.

---

## Function Naming

Functions perform actions.

Their names should usually begin with verbs.

Good examples

```python
calculate_salary()

read_file()

send_email()

validate_password()

download_image()
```

Poor examples

```python
salary()

abc()

data()

function1()
```

The function name should explain what it does.

---

## Class Naming

Classes represent objects or concepts.

Python uses **PascalCase**.

Examples

```python
Student

Employee

BankAccount

ShoppingCart

DatabaseConnection
```

Each word starts with a capital letter.

---

## Constants

Python doesn't have true constants.

Instead,

developers follow a naming convention.

```python
PI = 3.14159

MAX_USERS = 1000

DATABASE_URL = "localhost"
```

Uppercase names indicate:

> "This value should not change."

---

## Boolean Variables

Boolean variables should answer a question.

Good

```python
is_logged_in

has_permission

can_vote

is_admin
```

Poor

```python
login

permission

vote
```

Example

```python
if is_logged_in:
    print("Welcome")
```

This reads almost like English.

---

# PEP 8 — Python Style Guide

PEP stands for

```text
Python Enhancement Proposal
```

PEP 8 is the official style guide for Python code.

It defines standards for:

- Naming
- Indentation
- Spacing
- Imports
- Blank lines
- Comments
- Line length

PEP 8 doesn't affect how Python executes your code.

It affects how humans read it.

---

## Indentation

Unlike many languages,

Python uses indentation to define blocks.

Correct

```python
if age >= 18:
    print("Adult")
```

Incorrect

```python
if age >= 18:
print("Adult")
```

Use **4 spaces** for each indentation level.

---

## Spacing Around Operators

✔ Good

```python
total = price + tax
```

❌ Poor

```python
total=price+tax
```

Spaces improve readability.

---

## Blank Lines

Separate logical sections using blank lines.

Instead of

```python
name = "Alice"
age = 21
print(name)
print(age)
```

Write

```python
name = "Alice"
age = 21

print(name)
print(age)
```

Small improvements greatly increase readability.

---

## Imports

Always place imports at the top of the file.

```python
import math
import random

print(math.sqrt(25))
```

Avoid importing modules in the middle of your program unless necessary.

---

## Line Length

PEP 8 recommends keeping lines around **79 characters**.

Long statements should be broken across multiple lines.

This improves readability on all screen sizes.

---

# Writing Pythonic Code

Python has its own programming style.

Code that follows this style is called **Pythonic**.

---

## Multiple Assignment

Instead of

```python
x = 10
y = 20
```

Write

```python
x, y = 10, 20
```

Cleaner and shorter.

---

## Swapping Variables

Most languages require a temporary variable.

```python
temp = a
a = b
b = temp
```

Python

```python
a, b = b, a
```

Simple and elegant.

---

## Membership Testing

Instead of

```python
if color == "red" or color == "blue":
```

Write

```python
if color in ("red", "blue"):
```

Cleaner and easier to maintain.

---

## enumerate()

Instead of

```python
for i in range(len(names)):
    print(i, names[i])
```

Write

```python
for index, name in enumerate(names):
    print(index, name)
```

Much more readable.

---

## zip()

Suppose two lists.

```python
names = ["Alice", "Bob"]
marks = [95, 88]
```

Instead of using indexes,

write

```python
for name, mark in zip(names, marks):
    print(name, mark)
```

Python handles pairing automatically.

---

## Truthy and Falsy

Instead of

```python
if len(items) == 0:
```

Write

```python
if not items:
```

Both work.

The second is more Pythonic.

---

# Comments

Comments explain **why**, not **what**.

❌ Poor

```python
# Print the name

print(name)
```

The code already says that.

✔ Better

```python
# Retry after temporary network failure

retry_connection()
```

Explain the reason,

not the obvious.

---

# Docstrings

Functions and classes should describe themselves.

Example

```python
def add(a, b):
    """
    Returns the sum of two numbers.
    """
    return a + b
```

Docstrings become part of your documentation.

---

# Useful Built-in Functions

| Function | Purpose |
|----------|----------|
| print() | Display output |
| input() | Read user input |
| len() | Count elements |
| type() | Get data type |
| id() | Object identity |
| range() | Generate sequence |
| enumerate() | Index + Value |
| zip() | Combine iterables |
| sorted() | Sort data |
| sum() | Sum of values |
| min() | Minimum value |
| max() | Maximum value |
| abs() | Absolute value |
| round() | Round numbers |
| any() | At least one True |
| all() | All True |

---

# Memory Tricks

## Variable Naming

Remember

```text
NAME

N → Natural

A → Accurate

M → Meaningful

E → Easy to Read
```

---

## PEP 8

Think of it as

```text
Grammar Book

↓

Python Code
```

---

## DRY

```text
Don't Repeat Yourself
```

Avoid writing the same logic multiple times.

---

## KISS

```text
Keep It Simple, Stupid
```

Simple solutions are usually the best.

---

# Common Beginner Mistakes

### Mistake 1

Meaningless variables.

❌

```python
x = 10
```

✔

```python
age = 10
```

---

### Mistake 2

Ignoring indentation.

Python depends on indentation.

---

### Mistake 3

Using camelCase for variables.

❌

```python
studentName
```

✔

```python
student_name
```

---

### Mistake 4

Writing comments for obvious code.

Avoid

```python
# Add one

x += 1
```

---

### Mistake 5

Trying to write clever code.

Readable code is almost always better.

---

# Interview Questions & Answers

## Q1. What is PEP 8?

### Answer

PEP 8 (Python Enhancement Proposal 8) is the official coding style guide for Python.

It provides conventions for:

- Naming
- Indentation
- Spacing
- Imports
- Comments
- Line length

Following PEP 8 makes code consistent and easier to maintain.

### Example

❌

```python
StudentName="John"
```

✔

```python
student_name = "John"
```

### Interview Tip

Say:

> "PEP 8 improves readability and consistency across Python projects."

### Follow-up Questions

- Is PEP 8 mandatory?
- Which tools check PEP 8? (Flake8, Ruff)
- Which tool automatically formats code? (Black)

---

## Q2. What is Pythonic Code?

### Answer

Pythonic code uses Python's features to write code that is simple, readable, and expressive.

Instead of writing code like other languages,

it embraces Python's strengths.

### Example

Instead of

```python
if len(items) == 0:
```

Write

```python
if not items:
```

Another example

Instead of

```python
temp = a
a = b
b = temp
```

Write

```python
a, b = b, a
```

### Interview Tip

Pythonic code focuses on **clarity over cleverness**.

---

## Q3. Why should variable names be meaningful?

### Answer

Meaningful variable names make code self-documenting.

Readers can understand the program without relying heavily on comments.

### Example

❌

```python
x = 500
```

✔

```python
monthly_salary = 500
```

### Interview Tip

Good names reduce cognitive load and simplify maintenance.

---

## Q4. Why are Boolean variables named like questions?

### Answer

Boolean variables represent `True` or `False`.

Naming them like questions makes conditions read naturally.

Example

```python
if is_admin:
```

is easier to understand than

```python
if admin:
```

### One-Line Revision

Boolean names should answer **Yes/No** questions.

---

## Q5. What is the difference between comments and docstrings?

### Answer

Comments explain parts of the code to developers and are ignored by Python.

Docstrings document functions, classes, or modules and can be accessed programmatically using the `help()` function.

### Example

```python
# This is a comment

def greet():
    """Returns a greeting message."""
    return "Hello"
```

### Interview Tip

Use comments sparingly, but write meaningful docstrings for public functions and classes.

---

# Chapter Summary / Cheat Sheet

| Topic | Recommendation |
|--------|---------------|
| Variables | `snake_case` |
| Functions | `snake_case` + Verb |
| Classes | `PascalCase` |
| Constants | `UPPER_CASE` |
| Booleans | `is_`, `has_`, `can_` |
| Indentation | 4 Spaces |
| Comments | Explain **why**, not **what** |
| Docstrings | Document functions and classes |
| Pythonic Code | Prefer readability and simplicity |
| DRY | Don't Repeat Yourself |
| KISS | Keep It Simple |

---

# Module 1 Complete ✅

You now understand:

- Python Fundamentals
- Variables & Objects
- Data Types
- Input & Output
- Type Casting
- Operators
- Clean Coding Practices
- Professional Python Style

You have built a strong foundation for everything that follows in this handbook.

---

# What's Next?

In **Module 2 — Control Flow**, you'll learn how to make programs **think, decide, and repeat actions** using conditions and loops. These concepts transform static scripts into interactive and intelligent programs.