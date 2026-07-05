# Module 7 — Exception Handling

# Chapter 18 — Exception Handling

---

# Learning Objectives

By the end of this chapter, you will understand:

- What are Errors?
- What are Exceptions?
- Why Exception Handling is Needed
- try Statement
- except Statement
- else Statement
- finally Statement
- raise Statement
- Custom Exceptions
- Exception Hierarchy
- Best Practices
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're driving to work.

Normally,

everything goes smoothly.

```text
Start Car

↓

Drive

↓

Reach Office
```

But sometimes,

unexpected events occur.

- Flat Tire
- Heavy Traffic
- Engine Failure

A good driver doesn't abandon the car.

Instead,

they handle the problem and continue safely.

Programs should behave the same way.

Unexpected situations are called **Exceptions**.

Instead of crashing,

a well-written program handles them gracefully.

---

# Story — ATM Machine

Imagine withdrawing money from an ATM.

Everything works until something unexpected happens.

```text
Insert Card

↓

Enter PIN

↓

Withdraw Money
```

Possible problems

```text
Wrong PIN

↓

Insufficient Balance

↓

Network Failure

↓

Card Expired
```

The ATM doesn't crash.

Instead,

it displays meaningful messages.

Python's exception handling works exactly the same way.

---

# What is an Error?

An **error** is any problem that prevents a program from working correctly.

Errors are broadly classified into:

```text
Errors

│

├── Syntax Errors

└── Exceptions
```

---

# Syntax Errors

Syntax errors occur before the program starts running.

Example

```python
if True

    print("Hello")
```

Output

```text
SyntaxError
```

Python cannot understand the code.

The program never starts.

---

# Exceptions

Exceptions occur **during execution**.

Example

```python
print(10 / 0)
```

Output

```text
ZeroDivisionError
```

The program starts,

but crashes while running.

---

# Common Exceptions

| Exception | Cause |
|-----------|-------|
| ZeroDivisionError | Divide by zero |
| ValueError | Invalid value |
| TypeError | Invalid type |
| IndexError | Invalid list index |
| KeyError | Missing dictionary key |
| FileNotFoundError | File doesn't exist |
| AttributeError | Invalid attribute |
| ImportError | Module not found |

These are the exceptions you'll encounter most often.

---

# Why Exception Handling?

Suppose we ask the user for two numbers.

```python
a = int(input())

b = int(input())

print(a / b)
```

If the user enters

```text
0
```

for the second number,

the program crashes.

Instead,

we should handle the situation.

---

# try Statement

The `try` block contains code that **might raise an exception**.

Syntax

```python
try:

    # Risky Code
```

---

# except Statement

The `except` block executes only if an exception occurs.

Example

```python
try:

    number = 10 / 0

except:

    print("Something went wrong")
```

Output

```text
Something went wrong
```

The program continues instead of crashing.

---

# Flow Diagram

```text
Try Block

↓

Exception?

├── No

│

│ Continue

│

└── Yes

↓

except Block

↓

Continue Program
```

---

# Catching Specific Exceptions

Avoid catching every exception blindly.

Better

```python
try:

    number = 10 / 0

except ZeroDivisionError:

    print("Cannot divide by zero")
```

Output

```text
Cannot divide by zero
```

---

# Multiple except Blocks

Different exceptions require different handling.

```python
try:

    value = int(input())

    print(10 / value)

except ValueError:

    print("Invalid Number")

except ZeroDivisionError:

    print("Division by Zero")
```

Python executes the matching `except` block.

---

# Capturing the Exception Object

Sometimes we need the actual error message.

```python
try:

    number = 10 / 0

except ZeroDivisionError as error:

    print(error)
```

Output

```text
division by zero
```

---

# else Statement

The `else` block executes only if **no exception** occurs.

Example

```python
try:

    result = 10 / 2

except ZeroDivisionError:

    print("Error")

else:

    print(result)
```

Output

```text
5
```

---

# Why else?

Keeps successful code separate from error-handling code.

Improves readability.

---

# finally Statement

The `finally` block always executes.

Whether:

- Exception occurs
- No exception occurs
- Function returns
- Exception is re-raised

`finally` always runs.

---

# Example

```python
try:

    file = open("data.txt")

except FileNotFoundError:

    print("Missing File")

finally:

    print("Closing Resources")
```

Output

```text
Closing Resources
```

---

# Why finally?

Useful for cleanup.

Examples

- Closing files
- Closing database connections
- Releasing locks
- Closing network sockets

---

# Complete Flow

```text
try

↓

Exception?

├── No

│

│ else

│

└── Yes

↓

except

↓

finally

↓

Continue
```

---

# raise Statement

Sometimes we intentionally want to raise an exception.

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

# Why raise?

Suppose we're writing a banking application.

Negative balance?

Invalid account?

Incorrect transaction?

Instead of silently continuing,

raise an exception.

---

# Creating Custom Exceptions

Python allows creating your own exception classes.

Example

```python
class InvalidAgeError(Exception):

    pass
```

Using it

```python
age = -1

if age < 0:

    raise InvalidAgeError(

        "Age cannot be negative"

    )
```

---

# Exception Hierarchy

All exceptions inherit from

```text
BaseException

↓

Exception

↓

ValueError

↓

TypeError

↓

IndexError

↓

...
```

Your custom exceptions usually inherit from `Exception`.

---

# Best Practices

✔ Catch specific exceptions.

Instead of

```python
except:
```

Prefer

```python
except FileNotFoundError:
```

---

✔ Use `finally` for cleanup.

---

✔ Don't ignore exceptions.

Bad

```python
except:

    pass
```

Errors disappear silently.

---

✔ Raise meaningful exceptions.

```python
raise ValueError(

"Invalid Email"

)
```

instead of generic messages.

---

# Real-World Example

Imagine a login system.

```python
try:

    username = database.find(user)

except DatabaseConnectionError:

    print("Database Unavailable")

finally:

    database.close()
```

Even if the database fails,

the connection is properly closed.

---

# Memory Trick

Remember

```text
TEEFR
```

Pronounce it

> **"Tea-Eefer"**

Meaning

```text
T

try

↓

E

except

↓

E

else

↓

F

finally

↓

R

raise
```

These are the five pillars of exception handling.

---

# Common Beginner Mistakes

### Mistake 1

Using

```python
except:
```

for everything.

Always catch specific exceptions whenever possible.

---

### Mistake 2

Ignoring exceptions.

```python
except:

    pass
```

This hides bugs.

---

### Mistake 3

Using `finally` instead of `except`.

Remember:

`finally` is for cleanup,

not error handling.

---

### Mistake 4

Using exceptions for normal program flow.

Exceptions should represent **unexpected situations**, not regular logic.

---

# Interview Questions & Answers

## Q1. What is the difference between an Error and an Exception?

### Answer

A **Syntax Error** occurs before execution due to invalid Python syntax.

An **Exception** occurs while the program is running.

Example

```python
print(10 / 0)
```

Raises

```text
ZeroDivisionError
```

---

## Q2. What is the purpose of the `try` block?

### Answer

The `try` block contains code that may raise an exception.

If an exception occurs,

Python immediately jumps to the matching `except` block.

---

## Q3. What is the difference between `else` and `finally`?

### Answer

| else | finally |
|------|----------|
| Executes only if no exception occurs | Executes regardless of exceptions |
| Used for success logic | Used for cleanup |

---

## Q4. Why should specific exceptions be caught?

### Answer

Catching specific exceptions makes debugging easier and prevents unrelated errors from being silently ignored.

Example

```python
except FileNotFoundError:
```

is much better than

```python
except:
```

---

## Q5. What is a Custom Exception?

### Answer

A custom exception is a user-defined exception class that inherits from `Exception`.

Example

```python
class InvalidAgeError(Exception):

    pass
```

Custom exceptions make programs easier to understand and maintain.

---

## Q6. Why is `finally` important?

### Answer

`finally` ensures that cleanup code always runs, even if an exception occurs.

Typical uses include:

- Closing files
- Closing database connections
- Releasing resources

---

# Chapter Summary / Cheat Sheet

| Keyword | Purpose |
|----------|----------|
| `try` | Risky code |
| `except` | Handle exceptions |
| `else` | Runs if no exception |
| `finally` | Always runs |
| `raise` | Raise an exception |

### Common Exceptions

| Exception | Cause |
|-----------|-------|
| ValueError | Invalid value |
| TypeError | Wrong type |
| IndexError | Invalid index |
| KeyError | Missing key |
| ZeroDivisionError | Divide by zero |
| FileNotFoundError | Missing file |

---

# What's Next?

In **Module 8 — Object-Oriented Programming (OOP)**, you'll begin one of the most important modules in Python:

- Classes
- Objects
- Constructors
- Instance & Class Variables
- Methods
- Encapsulation
- Inheritance
- Polymorphism
- Abstraction
- Magic Methods
- Static & Class Methods
- Dataclasses

This is the foundation of professional Python development and one of the most frequently tested topics in technical interviews.