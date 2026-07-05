# Module 7 — Exception Handling

# Chapter 24 — Advanced Exception Handling

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Advanced Exception Handling?
- The `raise` Statement
- Re-raising Exceptions
- Creating Custom Exceptions
- Exception Hierarchy
- Built-in Exception Classes
- Exception Chaining
- Best Practices
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're driving a car.

Sometimes,

something goes wrong.

```text
Low Fuel

↓

Warning

----------------

Engine Overheating

↓

Warning

----------------

Brake Failure

↓

Emergency Stop
```

Not every problem is equally serious.

Similarly,

Python has different kinds of exceptions.

Sometimes,

Python raises them automatically.

Sometimes,

**you** need to raise them yourself.

This chapter teaches you how.

---

# Story — Airport Security

Imagine you're entering an airport.

The security officer checks

- Passport
- Ticket
- Visa

If everything is valid,

you enter.

If something is wrong,

security immediately stops you.

```text
Passport Missing

↓

Stop

----------------

Ticket Invalid

↓

Stop

----------------

Banned Item

↓

Emergency
```

Python's

```python
raise
```

statement works exactly like this.

Whenever your program detects an invalid situation,

it can stop execution immediately.

---

# Why Raise Exceptions?

Suppose you're building a banking application.

A customer tries to withdraw

```text
₹10,000
```

Current balance

```text
₹5,000
```

Should the program continue?

No.

It should immediately report the problem.

This is exactly what

```python
raise
```

is used for.

---

# The raise Statement

Syntax

```python
raise Exception("Message")
```

Example

```python
age = -5

if age < 0:

    raise ValueError(

        "Age cannot be negative"

    )
```

Output

```text
ValueError:

Age cannot be negative
```

---

# Why Not Just Print?

Instead of

```python
print("Invalid Age")
```

why use

```python
raise
```

Because

```text
print()

↓

Shows Message

↓

Program Continues
```

Whereas

```text
raise

↓

Stops Program

↓

Reports Error
```

This prevents incorrect data from spreading through the application.

---

# Raising Different Exceptions

Python provides many built-in exception types.

Example

```python
raise TypeError(

"Wrong Type"

)
```

---

```python
raise ValueError(

"Invalid Value"

)
```

---

```python
raise FileNotFoundError(

"File Missing"

)
```

Choose the exception that best describes the problem.

---

# Re-raising Exceptions

Suppose you catch an exception,

perform some cleanup,

and then want the exception to continue upward.

Example

```python
try:

    10 / 0

except ZeroDivisionError:

    print(

        "Logging Error"

    )

    raise
```

Output

```text
Logging Error

ZeroDivisionError
```

The same exception is raised again.

---

# Why Re-raise?

Imagine

```text
Database Error

↓

Log It

↓

Close Connection

↓

Raise Again
```

Higher-level code can still decide how to handle it.

---

# Creating Custom Exceptions

Sometimes,

built-in exceptions are not descriptive enough.

Suppose you're building a banking application.

Instead of

```python
ValueError
```

create

```python
InsufficientBalanceError
```

Much clearer.

---

# Creating Your First Custom Exception

Every custom exception should inherit from

```python
Exception
```

Example

```python
class InvalidAgeError(

Exception

):

    pass
```

Now

```python
raise InvalidAgeError(

"Age cannot be negative"

)
```

Output

```text
InvalidAgeError:

Age cannot be negative
```

---

# Why Custom Exceptions?

Imagine reading logs.

Which is better?

```text
ValueError
```

or

```text
PaymentDeclinedError
```

The second immediately explains the problem.

Custom exceptions improve readability and debugging.

---

# Another Example

```python
class InsufficientBalanceError(

Exception

):

    pass

balance = 500

withdraw = 1000

if withdraw > balance:

    raise InsufficientBalanceError(

        "Not enough balance"

    )
```

Output

```text
InsufficientBalanceError

Not enough balance
```

---

# Exception Hierarchy

Python exceptions are organized like a family tree.

Visualization

```text
BaseException

│

├── SystemExit

├── KeyboardInterrupt

└── Exception

      │

      ├── ArithmeticError

      │      └── ZeroDivisionError

      │

      ├── LookupError

      │      ├── IndexError

      │      └── KeyError

      │

      ├── TypeError

      ├── ValueError

      ├── FileNotFoundError

      ├── RuntimeError

      └── ...
```

Every exception ultimately inherits from

```text
BaseException
```

---

# Why a Hierarchy?

Suppose you write

```python
except Exception:
```

Python catches

```text
ValueError

TypeError

IndexError

KeyError

ZeroDivisionError
```

because they all inherit from

```text
Exception
```

---

# Catching Specific Exceptions

Better

```python
try:

    ...

except ValueError:

    ...
```

instead of

```python
except Exception:

    ...
```

Catch the most specific exception possible.

---

# Exception Chaining

Sometimes one exception causes another.

Example

```python
try:

    int("abc")

except ValueError as e:

    raise RuntimeError(

        "Conversion Failed"

    ) from e
```

Output

```text
RuntimeError

↓

Caused By

↓

ValueError
```

This is called **Exception Chaining**.

It preserves the original cause,

making debugging much easier.

---

# Why Exception Chaining?

Imagine

```text
Database Error

↓

API Error

↓

User Error
```

Without chaining,

you only see the final error.

With chaining,

you can trace the complete history.

---

# Raising Exceptions in Functions

Example

```python
def divide(a, b):

    if b == 0:

        raise ValueError(

            "Cannot divide by zero"

        )

    return a / b
```

The caller decides how to handle the exception.

---

# Real-World Example

Imagine an online shopping website.

```text
Payment Failed

↓

PaymentDeclinedError

----------------

Invalid Coupon

↓

InvalidCouponError

----------------

Out of Stock

↓

OutOfStockError
```

Custom exceptions make large applications easier to understand.

---

# Memory Trick

Remember

```text
RCH
```

**R**

Raise

↓

**C**

Custom Exception

↓

**H**

Hierarchy

And remember

```text
Specific

↓

Better

↓

Generic

↓

Last Option
```

---

# Common Beginner Mistakes

### Mistake 1

Using

```python
raise Exception(...)
```

for everything.

Prefer more specific exceptions like

```python
ValueError

TypeError

FileNotFoundError
```

or create your own.

---

### Mistake 2

Creating custom exceptions without inheriting from

```python
Exception
```

Always inherit from

```python
Exception
```

or one of its subclasses.

---

### Mistake 3

Catching

```python
except Exception:
```

everywhere.

This hides bugs and makes debugging difficult.

Catch only the exceptions you expect.

---

### Mistake 4

Ignoring exception messages.

A good exception message should explain

- What went wrong
- Why it happened
- Sometimes how to fix it

Example

Bad

```text
Error
```

Better

```text
File 'students.csv' not found
```

---

# Interview Questions & Answers

## Q1. What is the purpose of the `raise` statement?

### Answer

The `raise` statement allows programmers to generate exceptions manually.

It is used when the program detects an invalid condition that should stop normal execution.

---

## Q2. Why create Custom Exceptions?

### Answer

Custom exceptions make programs more readable and expressive.

Instead of a generic

```text
ValueError
```

you can use

```text
InvalidAgeError

PaymentDeclinedError
```

making debugging much easier.

---

## Q3. What is the Exception Hierarchy?

### Answer

Python organizes exceptions into an inheritance hierarchy.

Most application exceptions inherit from

```text
Exception
```

which itself inherits from

```text
BaseException
```

This allows related exceptions to be handled together.

---

## Q4. What is Exception Chaining?

### Answer

Exception chaining links one exception to another using

```python
raise NewException(...) from old_exception
```

It preserves the original cause of the error,

making debugging easier.

---

## Q5. Why should you catch specific exceptions instead of `Exception`?

### Answer

Specific exceptions make error handling more precise.

Catching every exception can hide programming mistakes and make applications difficult to debug.

Always catch the most specific exception possible.

---

# Chapter Summary / Cheat Sheet

| Concept | Purpose |
|----------|----------|
| `raise` | Manually raise an exception |
| `raise ... from ...` | Chain exceptions |
| Custom Exception | Application-specific errors |
| `Exception` | Base class for most errors |
| `BaseException` | Root of Python exception hierarchy |
| Specific Exceptions | Preferred over generic ones |

---

# Module 7 Complete ✅

You have now mastered Python Exception Handling:

- Errors vs Exceptions
- `try`
- `except`
- `else`
- `finally`
- `raise`
- Custom Exceptions
- Exception Hierarchy
- Exception Chaining

You can now build Python applications that fail gracefully, provide meaningful error messages, and are easier to debug and maintain.

---

# What's Next?

In **Module 8 — Object-Oriented Programming**, you'll begin learning one of the most important paradigms in software development:

- Classes & Objects
- Constructors
- Methods
- Inheritance
- Encapsulation
- Polymorphism
- Abstraction
- SOLID Principles

These concepts form the foundation of professional Python development and are heavily tested in technical interviews.