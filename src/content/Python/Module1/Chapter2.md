# Module 1 — Python Fundamentals

# Chapter 2 — Python Basics

---

# Learning Objectives

By the end of this chapter, you will understand:

- Variables
- Objects
- Dynamic Typing
- Python Data Types
- Comments
- Input & Output
- Type Casting
- Keywords
- The Zen of Python

---

# Introduction

Imagine you're working in an office.

You have:

- Files
- Cabinets
- Labels

Every file has a label so that anyone can easily find it.

Python variables work in exactly the same way.

Instead of storing papers,

they store **objects**.

Understanding variables is the first major step toward becoming a Python programmer.

---

# Story — The Warehouse

Imagine a warehouse.

There are thousands of boxes.

Each box contains something.

Instead of remembering where every box is,

we simply attach labels.

```text
Label

↓

Box

↓

Contents
```

Example

```text
Age

↓

Box

↓

25
```

Python variables behave exactly like these labels.

---

# What is a Variable?

A variable is simply a **name (label)** given to an object.

Example

```python
age = 25
```

Here,

```text
age
```

is **not** the integer.

It is merely a name pointing to the integer object.

---

# Variable Visualization

```text
age

│

▼

+------+

|  25  |

+------+
```

Notice carefully:

The variable stores a **reference**, not the value itself.

---

# Variables are References

Many beginners think

```python
age = 25
```

means

```text
Variable

contains

25
```

That's not exactly true.

Python actually creates an object.

Then the variable points to it.

```text
age

│

▼

Integer Object

25
```

This idea is extremely important.

It explains:

- Assignment
- Copying
- Mutable Objects
- Memory Management

which we'll study later.

---

# Creating Variables

Variables are created automatically.

```python
name = "Alice"

age = 22

salary = 55000
```

No declaration is required.

Unlike Java,

you don't write

```java
int age = 22;
```

Python figures it out automatically.

---

# Why No Type Declaration?

Python uses

```text
Dynamic Typing
```

instead of

```text
Static Typing
```

The interpreter determines the data type during execution.

---

# Dynamic Typing

Consider

```python
x = 10
```

Later,

```python
x = "Python"
```

Is this allowed?

Yes.

The variable now points to another object.

---

# Dynamic Typing Visualization

Initially

```text
x

↓

10
```

Later

```text
x

↓

"Python"
```

The previous integer object is no longer referenced by `x`.

---

# Why Dynamic Typing?

Advantages

- Less code
- Faster development
- Flexible

Disadvantages

- Errors found at runtime
- Easier to make mistakes

---

# Objects

Everything in Python is an object.

Examples

```python
10

3.14

"Python"

True

[1,2,3]

{"name":"Alice"}
```

Everything is an object.

Even functions are objects.

Even classes are objects.

---

# Object Visualization

```text
Object

+----------------+

Type

Value

Methods

Memory Address

+----------------+
```

Every Python object contains:

- Value
- Type
- Identity

---

# Identity

Each object has a unique identity.

We can check it using

```python
id()
```

Example

```python
x = 10

print(id(x))
```

Output

```text
140248756...
```

This represents the object's memory identity.

---

# Type

Use

```python
type()
```

Example

```python
age = 25

print(type(age))
```

Output

```python
<class 'int'>
```

---

# Built-in Data Types

Python provides many built-in types.

They can be grouped into categories.

```text
Data Types

│

├── Numeric

├── Boolean

├── String

├── Sequence

├── Set

├── Mapping

└── None
```

---

# Numeric Types

Examples

```python
10

3.14

2 + 5j
```

Python supports

```text
int

float

complex
```

---

# Boolean

Boolean values represent truth.

```python
True

False
```

Useful in conditions.

```python
is_logged_in = True
```

---

# Strings

A string stores text.

```python
name = "Alice"
```

Strings are immutable.

We'll study them in detail later.

---

# Sequence Types

Python provides

```text
List

Tuple

Range
```

Examples

```python
numbers = [1,2,3]

coordinates = (10,20)

range(5)
```

---

# Set Types

Sets store unique values.

```python
colors = {"red","blue","green"}
```

Duplicates are automatically removed.

---

# Mapping Type

Dictionary

```python
student = {

"name":"Alice",

"age":21

}
```

Stores

```text
Key

↓

Value
```

pairs.

---

# None Type

Sometimes a variable has no value.

Python uses

```python
None
```

Example

```python
result = None
```

Think of it as

```text
Nothing Yet
```

---

# Complete Data Type Overview

```text
Python Data Types

├── int

├── float

├── complex

├── bool

├── str

├── list

├── tuple

├── range

├── set

├── frozenset

├── dict

├── bytes

├── bytearray

└── NoneType
```

---

# Comments

Comments explain code.

Python ignores them.

Single-line comment

```python
# Calculate age
```

Multi-line

```python
"""

Employee Module

"""

```

Use comments to explain **why** something is done,

not what obvious code already says.

---

# Input

Programs become useful when users can provide data.

Python provides

```python
input()
```

Example

```python
name = input("Enter your name: ")
```

Whatever the user types is returned as a string.

---

# Output

Python displays output using

```python
print()
```

Example

```python
print("Hello")
```

Multiple values

```python
age = 22

print("Age:", age)
```

---

# Formatted Output

Modern Python prefers

```python
f-strings
```

Example

```python
name = "Alice"

age = 22

print(f"{name} is {age} years old")
```

We'll explore formatting in the Strings module.

---

# Type Casting

Suppose

```python
age = input()
```

User enters

```text
25
```

Python stores

```text
"25"
```

not

```text
25
```

Why?

Because input() always returns a string.

---

# Converting Types

Python provides constructors.

```python
int()

float()

str()

bool()
```

Example

```python
age = int(input())
```

Now

```text
"25"

↓

25
```

---

# Type Casting Diagram

```text
"100"

↓

int()

↓

100
```

---

# Implicit Conversion

Sometimes Python converts automatically.

Example

```python
5 + 2.5
```

Python converts

```text
5

↓

5.0
```

Result

```python
7.5
```

---

# Explicit Conversion

Sometimes we convert manually.

Example

```python
price = "500"

price = int(price)
```

---

# Keywords

Keywords are reserved words.

Examples

```text
if

else

for

while

class

return

try

except

import

def
```

They have predefined meanings.

You cannot use them as variable names.

Incorrect

```python
class = 10
```

Correct

```python
class_name = "Python"
```

---

# The Zen of Python

Python has a guiding philosophy.

You can read it by typing

```python
import this
```

Some famous principles

> Beautiful is better than ugly.

> Simple is better than complex.

> Readability counts.

These ideas influence every Python feature.

---

# Memory Trick

Remember

```text
VOT
```

Variables

↓

Objects

↓

Types

Whenever you see

```python
x = 10
```

think

```text
Variable

↓

Object

↓

Type
```

Not

```text
Variable

contains

Value
```

---

# Common Mistakes

### Mistake 1

Thinking variables store values.

Actually,

they store references.

---

### Mistake 2

Forgetting that

```python
input()
```

always returns

```python
str
```

---

### Mistake 3

Using keywords as variables.

Wrong

```python
if = 10
```

---

### Mistake 4

Confusing

```python
=
```

with

```python
==
```

Assignment and comparison are different operations.

---

# Interview Questions

### What is dynamic typing?

### Are variables objects in Python?

### Does Python have primitive data types?

### What does input() return?

### Difference between implicit and explicit type casting?

### What is None?

### What are Python keywords?

### What happens internally when you write

```python
x = 10
```

---

# Chapter Summary / Cheat Sheet

| Topic | Summary |
|--------|---------|
| Variable | Name that refers to an object |
| Object | Every value in Python is an object |
| Dynamic Typing | Variable type decided at runtime |
| Data Types | int, float, bool, str, list, tuple, dict, set, etc. |
| Comments | Ignored by Python, used for documentation |
| Input | `input()` always returns a string |
| Output | `print()` displays values |
| Type Casting | `int()`, `float()`, `str()`, `bool()` |
| Keywords | Reserved words like `if`, `for`, `class` |
| Zen of Python | Python's design philosophy (`import this`) |

---

# What's Next?

In **Chapter 3 — Operators**, we'll learn how Python performs:

- Arithmetic calculations
- Comparisons
- Logical operations
- Bitwise operations
- Identity and membership tests
- Operator precedence
- Short-circuit evaluation

These operators are the building blocks of expressions and decision-making in Python.