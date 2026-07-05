# Module 9 — Advanced Python

# Chapter 32 — Decorators

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Decorators Exist
- Functions are First-Class Objects
- Higher-Order Functions
- What is a Decorator?
- How Decorators Work
- `@` Syntax
- Function Wrapping
- Multiple Decorators
- Decorators with Arguments
- Built-in Decorators
- Practical Use Cases
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're ordering a pizza.

You start with

```text
Pizza
```

Now you can add

```text
Cheese

↓

Olives

↓

Mushrooms

↓

Extra Toppings
```

Notice something interesting.

The pizza is still the same pizza.

You're simply **adding extra features** around it.

Decorators work exactly the same way.

Instead of changing a function,

they **add extra behavior** to it.

---

# Story — Gift Wrapping

Imagine buying a gift.

The gift is already complete.

But you can decorate it.

```text
Gift

↓

Gift Wrap

↓

Ribbon

↓

Greeting Card
```

The gift hasn't changed.

You've only added extra layers.

Decorators wrap functions exactly like gift wrapping.

---

# Why Decorators?

Suppose you have

100 functions.

Before each function,

you want to

- Check Login
- Measure Execution Time
- Log Function Calls

Without decorators,

you would write

```python
print("Checking Login")

...

print("Checking Login")

...

print("Checking Login")
```

hundreds of times.

This violates the

**DRY Principle (Don't Repeat Yourself).**

Decorators solve this problem.

---

# Functions are First-Class Objects

In Python,

functions are objects.

This means they can

- Be assigned to variables
- Be passed as arguments
- Be returned from functions
- Be stored inside collections

Example

```python
def greet():

    print("Hello")

say_hello = greet

say_hello()
```

Output

```text
Hello
```

The variable now refers to the function.

---

# Functions as Arguments

Example

```python
def greet():

    print("Hello")

def execute(func):

    func()

execute(greet)
```

Output

```text
Hello
```

Functions behave just like integers,

lists,

or strings.

---

# Higher-Order Functions

A **Higher-Order Function** is a function that

- Takes another function as an argument

or

- Returns another function.

Example

```python
def calculator(operation):

    return operation
```

Decorators are built using Higher-Order Functions.

---

# What is a Decorator?

A decorator is a function that

- Takes another function
- Adds new functionality
- Returns the modified function

Visualization

```text
Original Function

↓

Decorator

↓

Enhanced Function
```

---

# Building Your First Decorator

Example

```python
def decorator(func):

    def wrapper():

        print("Before Function")

        func()

        print("After Function")

    return wrapper
```

---

# Decorating a Function

```python
def greet():

    print("Hello")

greet = decorator(greet)

greet()
```

Output

```text
Before Function

Hello

After Function
```

Notice

The original

```python
greet()
```

function was never modified.

---

# The @ Syntax

Python provides cleaner syntax.

Instead of

```python
greet = decorator(greet)
```

write

```python
@decorator

def greet():

    print("Hello")
```

This is exactly the same.

Output

```text
Before Function

Hello

After Function
```

---

# Understanding the Flow

```text
Call greet()

↓

Decorator Receives greet()

↓

Creates Wrapper

↓

Wrapper Executes

↓

Original Function Runs

↓

Wrapper Finishes
```

This is the internal working of every decorator.

---

# Decorators with Parameters

Suppose your function has arguments.

Example

```python
def add(a, b):

    return a + b
```

The wrapper should accept them too.

```python
def decorator(func):

    def wrapper(*args, **kwargs):

        print("Running...")

        return func(

            *args,

            **kwargs

        )

    return wrapper
```

Now,

it works for any function.

---

# Why *args and **kwargs?

Imagine decorating

```python
add(a, b)
```

and later

```python
multiply(a, b, c)
```

Instead of rewriting wrappers,

use

```python
*args

**kwargs
```

to support any number of arguments.

---

# Multiple Decorators

You can stack decorators.

Example

```python
@decorator1

@decorator2

def greet():

    print("Hello")
```

Execution Order

```text
decorator1

↓

decorator2

↓

Original Function
```

Think of it like multiple gift wrappers.

---

# Built-in Decorators

Python already provides many decorators.

Examples

```python
@property

@staticmethod

@classmethod

@dataclass
```

You've already used several of them in previous chapters.

---

# Example — Measuring Time

```python
import time

def timer(func):

    def wrapper(*args, **kwargs):

        start = time.time()

        result = func(

            *args,

            **kwargs

        )

        end = time.time()

        print(

            end - start

        )

        return result

    return wrapper
```

Usage

```python
@timer

def work():

    ...
```

Every function call is automatically timed.

---

# Example — Logging

```python
def logger(func):

    def wrapper(*args, **kwargs):

        print(

            "Function Started"

        )

        result = func(

            *args,

            **kwargs

        )

        print(

            "Function Finished"

        )

        return result

    return wrapper
```

Perfect for debugging applications.

---

# Example — Authentication

Imagine a website.

Before executing

```python
delete_account()
```

verify that the user is logged in.

```text
Request

↓

Decorator

↓

Authentication

↓

Original Function
```

The business logic remains clean.

---

# Real-World Uses

Decorators are heavily used in

```text
Authentication

↓

Logging

↓

Performance Monitoring

↓

Caching

↓

Input Validation

↓

Flask

↓

FastAPI

↓

Django
```

Nearly every Python web framework relies on decorators.

---

# Decorator Visualization

```text
Function

↓

Decorator

↓

Wrapper

↓

Extra Logic

↓

Original Function

↓

Return Result
```

---

# Memory Trick

Remember

```text
WAR
```

**W**

Wrap Function

↓

**A**

Add Behavior

↓

**R**

Return Wrapper

Or remember

```text
Function

↓

Gift Wrap

↓

Enhanced Function
```

---

# Common Beginner Mistakes

### Mistake 1

Forgetting to return the wrapper.

Wrong

```python
def decorator(func):

    def wrapper():

        ...

```

Correct

```python
return wrapper
```

---

### Mistake 2

Not returning the original function's result.

Wrong

```python
func()
```

Correct

```python
return func()
```

Otherwise,

functions that return values stop working correctly.

---

### Mistake 3

Ignoring

```python
*args

**kwargs
```

Without them,

the decorator works only for functions with a fixed signature.

---

### Mistake 4

Writing business logic inside decorators.

Decorators should provide **cross-cutting concerns** like

- Logging
- Authentication
- Timing
- Validation

They shouldn't replace the core function logic.

---

# Interview Questions & Answers

## Q1. What is a Decorator?

### Answer

A decorator is a function that takes another function,

adds additional functionality,

and returns a new function without modifying the original one.

---

## Q2. Why are Decorators useful?

### Answer

Decorators help avoid duplicate code.

They are commonly used for

- Logging
- Authentication
- Caching
- Timing
- Validation

while keeping business logic clean.

---

## Q3. Why do decorators use nested functions?

### Answer

The inner wrapper function captures the original function using a **closure**.

This allows it to execute additional logic before and after calling the original function.

---

## Q4. Why do we use `*args` and `**kwargs` in decorators?

### Answer

They allow the decorator to work with functions having any number of positional and keyword arguments,

making the decorator reusable.

---

## Q5. Name some built-in decorators in Python.

### Answer

Some commonly used built-in decorators are

- `@property`
- `@staticmethod`
- `@classmethod`
- `@dataclass`

Frameworks like Flask and FastAPI also rely heavily on decorators for routing and dependency injection.

---

# Chapter Summary / Cheat Sheet

| Concept | Purpose |
|----------|----------|
| Decorator | Add behavior without modifying a function |
| Higher-Order Function | Takes or returns a function |
| Wrapper Function | Adds extra logic |
| `@decorator` | Cleaner decorator syntax |
| `*args` | Variable positional arguments |
| `**kwargs` | Variable keyword arguments |
| Built-in Decorators | `@property`, `@staticmethod`, `@classmethod`, `@dataclass` |

---

# What's Next?

In **Chapter 33 — Context Managers**, you'll learn how Python automatically manages resources such as files, database connections, and locks using:

- `with` Statement
- Context Manager Protocol
- `__enter__()` and `__exit__()`
- Custom Context Managers

These concepts are widely used in production Python applications and are a common interview topic.