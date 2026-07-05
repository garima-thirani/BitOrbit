# Module 13 — Testing & Debugging

# Chapter 47 — Debugging

---

# Learning Objectives

By the end of this chapter, you will understand:

- What is Debugging?
- Types of Bugs
- Reading Tracebacks
- Using `print()` for Debugging
- Python Debugger (`pdb`)
- Assertions
- Logging
- Logging Levels
- Logging to Files
- Best Practices
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're a detective solving a mystery.

A crime has happened.

You don't immediately know

- Who did it
- When it happened
- Why it happened

Instead, you collect clues.

```text
Evidence

↓

Analyze

↓

Find Problem

↓

Solve
```

Debugging works exactly the same way.

When a program behaves unexpectedly,

our job is to investigate,

find the cause,

and fix it.

---

# Story — Car Mechanic

Imagine your car won't start.

You don't replace the engine immediately.

Instead, a mechanic checks

```text
Battery

↓

Fuel

↓

Starter Motor

↓

Engine
```

One component at a time.

Debugging follows the same process.

We isolate the problem before fixing it.

---

# What is Debugging?

Debugging is the process of

- Finding bugs
- Understanding why they occur
- Fixing them

Visualization

```text
Write Code

↓

Bug Appears

↓

Investigate

↓

Fix

↓

Retest
```

---

# What is a Bug?

A bug is an error that causes incorrect behavior.

Examples

```text
Wrong Output

↓

Crash

↓

Slow Performance

↓

Unexpected Exception
```

---

# Types of Bugs

```text
Bugs

│

├── Syntax Errors

├── Runtime Errors

├── Logical Errors

└── Performance Bugs
```

---

# Syntax Error

Python cannot understand the code.

Example

```python
if x > 5

    print(x)
```

Output

```text
SyntaxError
```

The program never starts.

---

# Runtime Error

The program starts,

but crashes during execution.

Example

```python
10 / 0
```

Output

```text
ZeroDivisionError
```

---

# Logical Error

The hardest type.

Program runs successfully,

but produces the wrong result.

Example

```python
def area(length, width):

    return length + width
```

No error.

Wrong answer.

---

# Reading Tracebacks

When an exception occurs,

Python prints a traceback.

Example

```text
Traceback (most recent call last):

File "main.py", line 5

ZeroDivisionError
```

Read it from **bottom to top**.

The last line tells you

what went wrong.

The lines above show

where it happened.

---

# Print Debugging

The simplest debugging technique.

Example

```python
print("Value:", x)
```

Visualization

```text
Code

↓

Print Values

↓

Observe

↓

Find Bug
```

Simple,

but not suitable for large projects.

---

# The Python Debugger (pdb)

Python provides a built-in debugger

```python
pdb
```

It allows you to pause execution,

inspect variables,

and execute code interactively.

---

# Starting pdb

Example

```python
import pdb

pdb.set_trace()
```

When execution reaches this line,

the program pauses.

---

# Example

```python
import pdb

x = 10

pdb.set_trace()

y = 20

print(x + y)
```

Execution stops before

```python
y = 20
```

allowing you to inspect the current state.

---

# Useful pdb Commands

| Command | Purpose |
|----------|----------|
| `n` | Next Line |
| `s` | Step Into Function |
| `c` | Continue Execution |
| `l` | Show Source Code |
| `p variable` | Print Variable |
| `q` | Quit Debugger |

---

# Debugging Flow

```text
Program

↓

Breakpoint

↓

Inspect Variables

↓

Continue

↓

Bug Found
```

This is far more powerful than adding many `print()` statements.

---

# Assertions

Assertions verify assumptions during development.

Example

```python
age = 20

assert age > 0
```

If the condition is true,

nothing happens.

If false,

Python raises

```text
AssertionError
```

---

# Example

```python
age = -5

assert age >= 0
```

Output

```text
AssertionError
```

Assertions help catch programming mistakes early.

---

# When to Use Assertions?

Use assertions for

- Internal consistency checks
- Preconditions
- Postconditions
- Invariants

Avoid using assertions for validating user input,

since assertions can be disabled when Python is run with optimization (`-O`).

---

# Logging

Imagine an airplane.

Pilots don't remember everything that happened.

Instead,

the aircraft records events.

```text
Flight Recorder

↓

Logs

↓

Investigation
```

Applications work the same way.

Instead of printing messages,

they write **logs**.

---

# Why Logging?

Suppose your application crashes

after running for

```text
3 Days
```

There is no terminal output.

Without logs,

finding the cause becomes difficult.

Logging preserves important events.

---

# The logging Module

Python provides

```python
import logging
```

---

# Basic Logging

Example

```python
import logging

logging.warning(

"Low Disk Space"

)
```

Output

```text
WARNING:root:Low Disk Space
```

---

# Logging Levels

```text
DEBUG

↓

INFO

↓

WARNING

↓

ERROR

↓

CRITICAL
```

---

# Meaning of Each Level

| Level | Purpose |
|--------|----------|
| DEBUG | Detailed developer information |
| INFO | General program events |
| WARNING | Potential problems |
| ERROR | Operation failed |
| CRITICAL | Serious system failure |

---

# Example

```python
logging.debug(

"Variable Loaded"

)

logging.info(

"User Logged In"

)

logging.error(

"Database Failed"

)
```

Each level communicates a different level of severity.

---

# Logging to a File

Example

```python
import logging

logging.basicConfig(

filename="app.log",

level=logging.INFO

)

logging.info(

"Application Started"

)
```

Now,

messages are written to

```text
app.log
```

instead of the console.

---

# print() vs Logging

| print() | Logging |
|-----------|----------|
| Temporary | Permanent |
| Console Only | Console or Files |
| No Severity Levels | Multiple Log Levels |
| Not Configurable | Highly Configurable |

Professional applications almost always use logging.

---

# Debugging Workflow

```text
Bug Report

↓

Read Traceback

↓

Reproduce Bug

↓

Use pdb / Logs

↓

Fix Bug

↓

Run Tests
```

This systematic approach avoids guesswork.

---

# Real-World Example

Imagine an online shopping website.

```text
Customer Places Order

↓

INFO Log

↓

Payment Fails

↓

ERROR Log

↓

Server Crash

↓

CRITICAL Log
```

Logs help engineers understand exactly what happened.

---

# Memory Trick

Remember

```text
PLA
```

**P**

Print

↓

**L**

Logging

↓

**A**

Assertions

For serious debugging,

remember

```text
Traceback

↓

pdb

↓

Logs
```

---

# Common Beginner Mistakes

### Mistake 1

Using

```python
print()
```

everywhere.

For production applications,

prefer the

```python
logging
```

module.

---

### Mistake 2

Ignoring tracebacks.

Always read the **last line first**.

It usually tells you the actual error.

---

### Mistake 3

Leaving

```python
pdb.set_trace()
```

inside production code.

It pauses execution and can halt applications unexpectedly.

---

### Mistake 4

Using assertions for user input validation.

Assertions are intended for detecting programming errors,

not handling invalid user input.

---

# Interview Questions & Answers

## Q1. What is Debugging?

### Answer

Debugging is the process of identifying,

analyzing,

and fixing bugs in a program.

It involves reproducing issues,

inspecting program state,

and verifying that the fix works.

---

## Q2. What is the purpose of `pdb`?

### Answer

`pdb` is Python's built-in interactive debugger.

It allows developers to pause execution,

inspect variables,

step through code,

and understand program behavior line by line.

---

## Q3. What is an Assertion?

### Answer

An assertion verifies that a condition is true.

If the condition evaluates to `False`,

Python raises an `AssertionError`.

Assertions are mainly used to catch programming mistakes during development.

---

## Q4. Why is Logging preferred over `print()`?

### Answer

Logging supports

- Multiple severity levels
- Writing to files
- Configurable output
- Better debugging in production

Unlike `print()`,

logs remain available after the program finishes.

---

## Q5. What are the different Logging Levels?

### Answer

Python defines five primary logging levels:

- DEBUG
- INFO
- WARNING
- ERROR
- CRITICAL

Each level represents increasing severity.

---

# Chapter Summary / Cheat Sheet

| Concept | Purpose |
|----------|----------|
| Debugging | Find and fix bugs |
| Traceback | Shows where an error occurred |
| `print()` | Simple debugging |
| `pdb` | Interactive debugger |
| `assert` | Verify assumptions |
| `logging` | Record application events |
| DEBUG | Detailed diagnostics |
| INFO | General events |
| WARNING | Potential issues |
| ERROR | Operation failed |
| CRITICAL | Severe failure |

---

# What's Next?

In **Chapter 48 — Mocking & Code Coverage**, you'll learn advanced testing techniques:

- Mock Objects
- `unittest.mock`
- Mocking APIs and Databases
- Measuring Test Coverage
- Coverage Reports

These tools are essential for testing large applications where real external systems are unavailable or expensive to use.