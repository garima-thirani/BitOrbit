# Module 21 — Performance Optimization

# Chapter 79 — Optimization Techniques

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Optimization?
- When to Optimize
- Algorithmic Optimization
- Efficient Data Structures
- `functools.lru_cache`
- Memoization
- Vectorization with NumPy
- Generator Expressions
- Efficient Loops
- Built-in Functions
- Writing Pythonic Code
- Best Practices
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine your Python program

takes

```text
10 Minutes
```

to complete.

After applying

a few optimization techniques,

the same program finishes in

```text
20 Seconds
```

without changing

the final result.

This is the power of

```text
Performance Optimization
```

---

# Story — Faster Route

Imagine driving to work.

Route A

```text
20 km

↓

Heavy Traffic

↓

45 Minutes
```

Route B

```text
25 km

↓

Highway

↓

20 Minutes
```

The second route is longer,

but much faster.

Optimization works the same way—

choosing a better approach,

not just working harder.

---

# Why Optimize?

Optimization helps

```text
Reduce Execution Time

↓

Reduce Memory Usage

↓

Handle Large Data

↓

Improve User Experience
```

---

# When Should You Optimize?

Golden Rule

```text
Make It Work

↓

Measure

↓

Optimize
```

Never optimize code

before profiling it.

---

# Optimization Levels

Performance improvements can come from

```text
Better Algorithm

↓

Better Data Structure

↓

Better Python Code

↓

Better Libraries
```

The biggest gains usually come from

better algorithms,

not micro-optimizations.

---

# Algorithm Matters Most

Example

Searching a list

```text
Linear Search

↓

O(n)
```

Searching a dictionary

```text
Hash Lookup

↓

O(1)
```

Choosing the right algorithm

often provides

the greatest speed improvement.

---

# Efficient Data Structures

Choose the correct collection.

| Task | Best Structure |
|------|----------------|
| Ordered Collection | List |
| Unique Values | Set |
| Key-Value Lookup | Dictionary |
| Queue | deque |

A good data structure

can dramatically improve performance.

---

# Memoization

Suppose

a function

is called

with

the same input

many times.

Instead of recalculating,

store

the result.

This technique is called

```text
Memoization
```

---

# `functools.lru_cache`

Python provides

automatic memoization.

Example

```python
from functools import lru_cache

@lru_cache
def fibonacci(n):

    if n < 2:

        return n

    return (

        fibonacci(n-1)

        +

        fibonacci(n-2)

    )
```

Repeated calls

become much faster.

---

# How `lru_cache` Works

Without cache

```text
Function

↓

Compute

↓

Return
```

With cache

```text
Function

↓

Already Computed?

↓

Yes

↓

Return Cached Result
```

---

# Cache Size

Example

```python
@lru_cache(maxsize=128)
```

Stores

up to

128 recent results.

Use

```python
maxsize=None
```

for

an unlimited cache

when appropriate.

---

# Vectorization

Instead of

looping

through data,

let NumPy

perform operations

on the entire array.

---

# Traditional Loop

```python
result = []

for x in numbers:

    result.append(

        x * 2

    )
```

---

# Vectorized Version

```python
import numpy as np

numbers = np.array(

numbers

)

result = numbers * 2
```

NumPy executes

the operation

in optimized C code,

making it significantly faster

for large numerical datasets.

---

# Why Vectorization?

Instead of

```text
Python Loop

↓

1 Item

↓

Next Item

↓

Next Item
```

NumPy performs

many operations

efficiently

using optimized native code.

---

# Generator Expressions

Suppose

you only need

one value

at a time.

Instead of

creating

a large list,

use

a generator.

---

# List Comprehension

```python
numbers = [

x*x

for x in range(

1000000

)

]
```

Consumes

memory

for every value.

---

# Generator Expression

```python
numbers = (

x*x

for x in range(

1000000

)

)
```

Values

are generated

only when needed,

reducing memory usage.

---

# Built-in Functions

Built-in functions

are often faster

than manually written loops.

Example

Instead of

```python
total = 0

for x in numbers:

    total += x
```

Use

```python
sum(numbers)
```

Other optimized functions

```text
max()

↓

min()

↓

sorted()

↓

any()

↓

all()
```

---

# Efficient String Concatenation

Bad

```python
text = ""

for word in words:

    text += word
```

Good

```python
text = "".join(words)
```

`join()`

is much faster

for combining many strings.

---

# Local Variables

Accessing

local variables

is generally faster

than repeatedly accessing

global variables

inside tight loops.

---

# Avoid Repeated Work

Bad

```python
for item in data:

    len(data)
```

Good

```python
size = len(data)

for item in data:
    ...
```

Compute

expensive values

once,

then reuse them.

---

# Efficient Membership Tests

Instead of

```python
if item in list_data:
```

Use

```python
if item in set_data:
```

Sets provide

average

O(1)

lookup time.

---

# Pythonic Code

Readable,

Pythonic code

is often

both cleaner

and faster.

Example

```python
squares = [

x*x

for x in range(10)

]
```

instead of

manually appending

inside a loop.

---

# Complete Optimization Workflow

```text
Profile

↓

Find Bottleneck

↓

Choose Better Algorithm

↓

Optimize Code

↓

Benchmark Again
```

---

# Real-World Example

Imagine

processing

10 million records.

Instead of

```text
Nested Loops

↓

Slow
```

Use

```text
NumPy

↓

Vectorization

↓

Fast
```

or

replace repeated lookups

with dictionaries or sets.

---

# Memory Trick

Remember

```text
AMCVG
```

**A**

Algorithm

↓

**M**

Memoization

↓

**C**

Cache

↓

**V**

Vectorization

↓

**G**

Generators

These are five of the most effective optimization techniques in Python.

---

# Best Practices

✔ Profile before optimizing

✔ Choose efficient algorithms

✔ Use appropriate data structures

✔ Cache repeated computations

✔ Prefer built-in functions

✔ Vectorize numerical operations

✔ Use generators for large datasets

✔ Keep code readable

---

# Common Beginner Mistakes

### Mistake 1

Optimizing

before profiling.

Always identify

the real bottleneck first.

---

### Mistake 2

Using

`lru_cache`

for functions

that depend on mutable inputs

or side effects.

Caching works best

for pure functions.

---

### Mistake 3

Replacing

readable code

with overly complex optimizations.

Maintainability

is important.

---

### Mistake 4

Using Python loops

for large numerical computations

when NumPy vectorization

would be much faster.

---

# Interview Questions & Answers

## Q1. What is memoization?

### Answer

Memoization is an optimization technique that stores the results of expensive function calls and reuses them when the same inputs occur again.

---

## Q2. What does `functools.lru_cache` do?

### Answer

`lru_cache` automatically caches function results,

avoiding repeated computations and improving performance for repeated calls with the same arguments.

---

## Q3. Why is NumPy vectorization faster than Python loops?

### Answer

NumPy performs operations using highly optimized compiled code,

reducing Python interpreter overhead and processing entire arrays efficiently.

---

## Q4. Why are generators memory efficient?

### Answer

Generators produce values one at a time instead of storing the entire sequence in memory,

making them ideal for processing large datasets.

---

## Q5. Which optimization usually provides the greatest improvement?

### Answer

Improving the algorithm or selecting a better data structure generally provides much larger performance gains than small syntax-level optimizations.

---

# Chapter Summary / Cheat Sheet

| Technique | Benefit |
|-----------|---------|
| Better Algorithm | Biggest speed improvement |
| Better Data Structure | Faster operations |
| `@lru_cache` | Memoization |
| NumPy Vectorization | Fast numerical computation |
| Generator Expressions | Lower memory usage |
| `sum()` | Optimized aggregation |
| `"".join()` | Efficient string concatenation |
| Set Lookup | Fast membership testing |
| Dictionary Lookup | O(1) average access |
| Built-in Functions | Optimized implementations |

---

# What's Next?

In **Chapter 80 — Production Performance**, you'll learn how professional Python applications achieve high performance in production by exploring:

- Scalability
- Concurrency
- Caching Strategies
- Database Optimization
- API Performance
- Monitoring
- Load Testing
- Production Best Practices

These concepts are essential for building high-performance applications that can serve thousands or even millions of users.