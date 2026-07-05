# Module 13 — Testing & Debugging

# Chapter 48 — Mocking & Code Coverage

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Mocking is Needed
- What is a Mock Object?
- `unittest.mock`
- Mock
- MagicMock
- patch()
- Mocking APIs
- Mocking Databases
- Code Coverage
- Measuring Test Coverage
- Coverage Reports
- Best Practices
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're learning to fly an airplane.

Would your first flight be

with

```text
100 Passengers?
```

Of course not.

Instead,

pilots train using

```text
Flight Simulators
```

The simulator behaves like a real airplane,

without the risks.

Mocking works exactly the same way.

Instead of using

- Real Databases
- Real APIs
- Real Email Servers
- Real Payment Gateways

we use **fake versions** during testing.

---

# Story — Movie Shooting

Imagine filming an action movie.

The actor doesn't actually jump off a building.

Instead,

they use

```text
Stunt Double

↓

Looks Real

↓

Safe

↓

Controlled
```

A **Mock Object** is the stunt double for your code.

It behaves like the real object,

but nothing actually happens.

---

# Why Mocking?

Suppose your application calls

```text
Payment Gateway

↓

Bank API

↓

Email Server
```

Should every test

- Send real money?
- Send real emails?
- Modify real databases?

Absolutely not.

Testing should be

- Fast
- Safe
- Independent

---

# The Problem

Imagine testing

```python
def send_email():

    ...
```

Every test

actually sends

an email.

Problems

```text
Slow

↓

Internet Required

↓

Spam Users

↓

Expensive
```

Instead,

replace the email service with a fake object.

---

# What is a Mock?

A **Mock** is a fake object that replaces a real object during testing.

Visualization

```text
Application

↓

Mock

↓

Pretends

↓

Real Service
```

---

# unittest.mock

Python provides

```python
from unittest.mock import Mock
```

This module allows us to create fake objects easily.

---

# Creating a Mock

Example

```python
from unittest.mock import Mock

database = Mock()

database.connect()

database.save()
```

Nothing actually happens.

Python simply records

that these methods were called.

---

# Return Values

Mocks can return fake values.

Example

```python
api = Mock()

api.fetch.return_value = {

    "name": "Alice"

}

print(

api.fetch()

)
```

Output

```python
{'name': 'Alice'}
```

No API request was made.

---

# Verifying Calls

Suppose

```python
api.fetch()
```

was expected.

Test

```python
api.fetch.assert_called_once()
```

The test passes only if

the method was called exactly once.

---

# MagicMock

Python also provides

```python
MagicMock
```

It behaves like

```python
Mock
```

but automatically supports Python's magic methods.

Example

```python
from unittest.mock import MagicMock

obj = MagicMock()

len(obj)
```

Works immediately.

Useful when mocking objects that implement

```python
__len__()

__iter__()

__getitem__()
```

and other dunder methods.

---

# patch()

One of the most important testing tools.

Suppose

```python
import requests
```

Instead of calling the real internet,

replace it temporarily.

Example

```python
from unittest.mock import patch
```

---

# Example

```python
with patch(

"requests.get"

) as mock_get:

    mock_get.return_value.status_code = 200
```

Now

every call to

```python
requests.get()
```

returns

```text
200
```

without making an actual network request.

---

# Mocking APIs

Real World

```text
Program

↓

Internet

↓

API
```

Testing

```text
Program

↓

Mock API

↓

Fake Response
```

Tests become

- Faster
- Reliable
- Offline

---

# Mocking Databases

Instead of

```text
Application

↓

Real Database
```

Use

```text
Application

↓

Mock Database
```

Benefits

- No Database Setup
- Faster Tests
- No Risk of Data Loss

---

# Mocking File Operations

Example

```python
from unittest.mock import mock_open

from unittest.mock import patch

with patch(

"builtins.open",

mock_open(

read_data="Hello"

)

):

    ...
```

The program thinks

it opened a real file.

No file actually exists.

---

# Why Mocking Matters

Large applications depend on

```text
Database

↓

Redis

↓

Email

↓

Cloud APIs

↓

Payment Systems
```

Tests should not depend on

external systems.

Mocking isolates

your code.

---

# Code Coverage

Imagine writing

100 functions.

You only test

20.

Question

How much of your code

has actually been tested?

Answer

```text
20%
```

This measurement is called

**Code Coverage**.

---

# What is Code Coverage?

Code Coverage measures

how much of your code

is executed

while running tests.

Visualization

```text
Application

↓

Tests

↓

Executed Lines

↓

Coverage %
```

---

# Example

Suppose

```text
100 Lines

↓

80 Tested
```

Coverage

```text
80%
```

---

# Why Coverage Matters?

High coverage

usually means

better confidence.

However,

```text
100%

Coverage

≠

Bug-Free Software
```

Coverage measures execution,

not correctness.

---

# coverage.py

Python's most popular coverage tool.

Install

```bash
pip install coverage
```

Run tests

```bash
coverage run -m pytest
```

Generate report

```bash
coverage report
```

Generate HTML

```bash
coverage html
```

Open

```text
htmlcov/index.html
```

to view a visual report.

---

# Coverage Visualization

```text
Green

↓

Tested

-------------------

Red

↓

Not Tested
```

Untested lines become easy to identify.

---

# Good Coverage Goals

Typical industry targets

```text
80%

↓

Good

----------------

90%

↓

Excellent

----------------

100%

↓

Not Always Necessary
```

Quality matters more than the percentage.

---

# Mocking Workflow

```text
Real Object

↓

Replace

↓

Mock Object

↓

Run Tests

↓

Verify Calls
```

---

# Testing Workflow

```text
Write Code

↓

Write Tests

↓

Mock Dependencies

↓

Run Tests

↓

Check Coverage

↓

Deploy
```

This is the workflow followed by most professional software teams.

---

# Real-World Example

Imagine testing an online banking system.

```text
Transfer Money

↓

Mock Payment Gateway

↓

Mock Database

↓

Mock SMS Service

↓

Verify Business Logic
```

No actual money is transferred,

yet the application's logic is fully tested.

---

# Memory Trick

Remember

```text
MPC
```

**M**

Mock

↓

**P**

Patch

↓

**C**

Coverage

Or simply

```text
Fake Objects

↓

Test Code

↓

Measure Coverage
```

---

# Common Beginner Mistakes

### Mistake 1

Mocking everything.

Mock only external dependencies,

not the function you're trying to test.

---

### Mistake 2

Assuming high coverage means bug-free code.

Coverage measures

execution,

not correctness.

Poorly written tests can still achieve high coverage.

---

### Mistake 3

Testing real APIs in unit tests.

Unit tests should be

fast,

repeatable,

and independent of external services.

---

### Mistake 4

Ignoring failed mock assertions.

Methods like

```python
assert_called_once()
```

verify interactions.

If they fail,

your application may not be behaving as expected.

---

# Interview Questions & Answers

## Q1. What is Mocking?

### Answer

Mocking is the practice of replacing real objects or external dependencies with fake objects during testing.

This allows tests to run quickly,

safely,

and independently of services such as databases,

APIs,

or email servers.

---

## Q2. What is `patch()` used for?

### Answer

`patch()` temporarily replaces an object,

function,

or method with a mock during a test.

Once the test finishes,

the original object is automatically restored.

---

## Q3. What is the difference between `Mock` and `MagicMock`?

### Answer

`Mock`

provides basic mocking functionality.

`MagicMock`

extends `Mock` by automatically supporting Python's magic methods,

such as

```python
__len__()

__iter__()

__getitem__()
```

making it useful for mocking container-like objects.

---

## Q4. What is Code Coverage?

### Answer

Code Coverage measures how much of the application's code is executed while running tests.

It helps identify untested areas,

but it does **not** guarantee the absence of bugs.

---

## Q5. Why should APIs and Databases be mocked?

### Answer

Mocking external systems makes unit tests

- Faster
- Deterministic
- Independent of network or database availability
- Safer, since no real data is modified

It allows developers to focus on testing application logic.

---

# Chapter Summary / Cheat Sheet

| Concept | Purpose |
|----------|----------|
| Mock | Fake object used during testing |
| MagicMock | Mock with built-in support for magic methods |
| `patch()` | Temporarily replace an object |
| `mock_open()` | Mock file operations |
| `assert_called_once()` | Verify method invocation |
| Code Coverage | Percentage of executed code |
| `coverage.py` | Measure test coverage |
| HTML Report | Visual coverage analysis |

---

# Module 13 Complete ✅

You have now mastered Testing & Debugging:

- Unit Testing
- `unittest`
- `pytest`
- Assertions
- Test Fixtures
- Debugging
- `pdb`
- Logging
- Mocking
- `Mock`
- `MagicMock`
- `patch()`
- Code Coverage
- Coverage Reports

These skills are essential for writing reliable, maintainable, and production-ready Python applications. They are also widely tested in Python developer interviews and are standard practices in professional software engineering.

---

# What's Next?

In **Module 14 — NumPy**, you'll begin scientific computing with Python by learning:

- `ndarray`
- Array Creation
- Indexing & Slicing
- Broadcasting
- Universal Functions
- Linear Algebra
- Performance Optimization

NumPy is the foundation of the entire Python data science, machine learning, and AI ecosystem.