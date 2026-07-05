# Module 13 — Testing & Debugging

# Chapter 46 — Testing

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Testing Matters
- Types of Testing
- Unit Testing
- The `unittest` Module
- Test Cases
- Assertions
- Test Fixtures
- `pytest`
- Parametrized Tests
- Best Practices
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine building a bridge.

Would engineers simply build it and hope it doesn't collapse?

Of course not.

They test

- Materials
- Weight Capacity
- Stability
- Safety

before allowing people to use it.

Software should be treated the same way.

Every function you write should be tested before users depend on it.

Testing gives confidence that your code works correctly—even after changes.

---

# Story — Factory Quality Check

Imagine a factory manufacturing light bulbs.

```text
Manufacture

↓

Quality Check

↓

Pack

↓

Sell
```

Suppose one defective bulb reaches a customer.

The company's reputation suffers.

Software testing works exactly the same way.

Every function is checked before being delivered.

---

# Why Testing?

Suppose you write

```python
def add(a, b):

    return a + b
```

Looks correct.

But what about

```python
add(-5, 3)

add(0, 0)

add(1.5, 2.3)
```

Testing verifies your assumptions.

---

# What is Testing?

Testing is the process of verifying that software behaves as expected.

Visualization

```text
Write Code

↓

Run Tests

↓

Pass?

↓

Yes

↓

Deploy

↓

No

↓

Fix Bugs
```

---

# Types of Testing

```text
Testing

│

├── Unit Testing

├── Integration Testing

├── System Testing

├── Performance Testing

└── Acceptance Testing
```

In this chapter,

we focus on **Unit Testing**.

---

# Unit Testing

A **Unit** is the smallest testable piece of code,

usually a function or method.

Example

```python
def square(x):

    return x * x
```

Testing

```python
square(5)

↓

25
```

If it works,

the unit passes.

---

# Why Unit Testing?

Benefits

- Finds bugs early
- Prevents regressions
- Makes refactoring safer
- Improves confidence
- Documents expected behavior

---

# The unittest Module

Python provides a built-in testing framework

```python
unittest
```

Every test is organized inside a class.

Example

```python
import unittest
```

---

# Writing Your First Test

```python
import unittest

def add(a, b):

    return a + b

class TestMath(unittest.TestCase):

    def test_add(self):

        self.assertEqual(

            add(2, 3),

            5

        )
```

Run the tests

```python
unittest.main()
```

Output

```text
.

OK
```

The dot (`.`) indicates one successful test.

---

# Test Cases

A test case is simply a method whose name starts with

```python
test_
```

Example

```python
def test_square():

    ...
```

Python automatically discovers these methods.

---

# Assertions

Assertions compare

**Expected**

with

**Actual**

results.

---

# Common Assertions

| Assertion | Purpose |
|------------|----------|
| `assertEqual()` | Equality |
| `assertTrue()` | True |
| `assertFalse()` | False |
| `assertIsNone()` | None |
| `assertIn()` | Membership |
| `assertRaises()` | Exception |

---

# Example

```python
self.assertEqual(

5,

5

)
```

Passes.

---

# Testing Exceptions

Suppose

```python
def divide(a, b):

    return a / b
```

Test

```python
with self.assertRaises(

ZeroDivisionError

):

    divide(

        10,

        0

    )
```

The test passes only if the expected exception occurs.

---

# Test Fixtures

Sometimes every test needs the same setup.

Example

```python
class TestStudent(unittest.TestCase):

    def setUp(self):

        self.value = 100
```

`setUp()` runs **before every test**.

---

# Tear Down

Cleanup happens inside

```python
tearDown()
```

Example

```python
def tearDown(self):

    ...
```

Runs after every test.

Useful for

- Closing files
- Disconnecting databases
- Cleaning temporary resources

---

# pytest

`pytest` is a popular third-party testing framework.

Many developers prefer it because it is

- Simpler
- More readable
- More powerful

---

# Example

```python
def add(a, b):

    return a + b

def test_add():

    assert add(2,3) == 5
```

Notice

No classes.

No inheritance.

Much shorter.

---

# Running pytest

Simply execute

```bash
pytest
```

It automatically discovers tests.

---

# Parametrized Tests

Instead of writing

```python
test1()

test2()

test3()
```

use one test with multiple inputs.

Example

```python
import pytest

@pytest.mark.parametrize(

"a,b,result",

[

(2,3,5),

(5,5,10),

(1,2,3)

]

)

def test_add(

a,

b,

result

):

    assert add(a,b) == result
```

Cleaner.

Less repetition.

---

# unittest vs pytest

| unittest | pytest |
|------------|---------|
| Built into Python | Third-party |
| More Boilerplate | Simpler Syntax |
| Class-Based | Function-Based |
| Enterprise Standard | Community Favorite |

---

# Real-World Example

Imagine an online banking system.

```text
Deposit()

↓

Unit Test

----------------

Withdraw()

↓

Unit Test

----------------

Transfer()

↓

Unit Test
```

Every important function is tested independently.

---

# Testing Workflow

```text
Write Code

↓

Write Test

↓

Run Tests

↓

Fix Errors

↓

Deploy
```

Professional development follows this cycle continuously.

---

# Memory Trick

Remember

```text
AAA
```

**A**

Arrange

↓

**A**

Act

↓

**A**

Assert

Every test follows these three steps.

---

# Common Beginner Mistakes

### Mistake 1

Testing only the "happy path."

Always test

- Invalid input
- Edge cases
- Empty values
- Exceptions

---

### Mistake 2

Writing tests that depend on each other.

Every test should run independently.

---

### Mistake 3

Ignoring failed tests.

Never skip failing tests just to make the test suite green.

Fix the underlying problem.

---

### Mistake 4

Not automating tests.

Tests should run automatically during development and deployment.

---

# Interview Questions & Answers

## Q1. What is Unit Testing?

### Answer

Unit testing verifies the correctness of the smallest testable units of code,

typically individual functions or methods.

---

## Q2. What is the difference between `unittest` and `pytest`?

### Answer

`unittest` is Python's built-in testing framework and follows a class-based approach.

`pytest` is a third-party framework with simpler syntax,

automatic test discovery,

and advanced features such as fixtures and parameterized testing.

---

## Q3. What is an Assertion?

### Answer

An assertion checks whether the actual output matches the expected output.

If they differ,

the test fails.

---

## Q4. What are `setUp()` and `tearDown()`?

### Answer

`setUp()` runs before every test and prepares the test environment.

`tearDown()` runs after every test and cleans up resources.

---

## Q5. Why is Testing important?

### Answer

Testing improves software quality by detecting bugs early,

preventing regressions,

making refactoring safer,

and increasing confidence that the code behaves correctly.

---

# Chapter Summary / Cheat Sheet

| Concept | Purpose |
|----------|----------|
| Unit Testing | Test individual functions |
| `unittest` | Built-in testing framework |
| `pytest` | Modern testing framework |
| Assertion | Compare expected vs actual |
| `setUp()` | Prepare test environment |
| `tearDown()` | Cleanup after tests |
| `assertRaises()` | Verify exceptions |
| Parametrized Tests | Test multiple inputs efficiently |

---

# What's Next?

In **Chapter 47 — Debugging**, you'll learn how to find and fix bugs using:

- `pdb`
- Assertions
- Logging

These tools help you diagnose problems quickly and are indispensable in real-world software development.