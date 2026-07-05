# Module 21 — Performance Optimization

# Chapter 78 — Profiling

---

# Learning Objectives

By the end of this chapter, you will understand:

- What is Performance Optimization?
- What is Profiling?
- CPU vs Memory Bottlenecks
- Why Profiling Comes First
- The `time` Module
- The `timeit` Module
- `cProfile`
- `pstats`
- Line Profiling
- Memory Profiling
- Benchmarking
- Best Practices
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine your Python application takes

```text
15 Seconds
```

to complete a task.

Where is the problem?

Is it

- Slow loops?
- File operations?
- Database queries?
- Network requests?
- Memory usage?

Instead of guessing,

we measure.

This process is called

```text
Profiling
```

---

# Story — Car Mechanic

Imagine your car is slow.

A mechanic doesn't immediately replace

the engine.

Instead,

they inspect

```text
Engine

↓

Battery

↓

Fuel

↓

Brakes

↓

Tires
```

Only after finding

the real problem

do they repair it.

Profiling works exactly the same way.

---

# What is Profiling?

Profiling is

the process of measuring

how a program uses

```text
Time

↓

CPU

↓

Memory

↓

Function Calls
```

It helps identify

performance bottlenecks.

---

# Why Profile First?

Many beginners

optimize code

without measuring it.

Good workflow

```text
Measure

↓

Find Bottleneck

↓

Optimize

↓

Measure Again
```

Never optimize blindly.

---

# Bottlenecks

A bottleneck

is the slowest part

of your program.

Example

```text
Program

↓

Fast

↓

Fast

↓

Slow

↓

Fast
```

Improving

the slow part

often provides

the biggest performance gain.

---

# CPU vs Memory Bottlenecks

CPU Bottleneck

```text
Too Many Calculations
```

Memory Bottleneck

```text
Too Much Data

↓

Too Many Objects
```

Both require

different optimization strategies.

---

# Measuring Time

Python provides

the

```python
time
```

module.

Example

```python
import time

start = time.time()

sum(range(1_000_000))

end = time.time()

print(end - start)
```

Output

```text
0.05 seconds
```

---

# High Precision Timing

For more accurate measurements,

use

```python
time.perf_counter()
```

Example

```python
import time

start = time.perf_counter()

sum(range(1_000_000))

end = time.perf_counter()

print(end - start)
```

Recommended

for benchmarking.

---

# The `timeit` Module

The

```python
timeit
```

module

runs code

multiple times

to produce

more reliable timing.

Example

```python
import timeit

timeit.timeit(

"sum(range(1000))",

number=1000

)
```

---

# Why `timeit`?

Running code

once

may produce

inconsistent results.

`timeit`

runs

the code repeatedly

and reports

the average execution time.

---

# Benchmarking

Benchmarking means

comparing

different implementations.

Example

```text
Method A

↓

0.25 s

----------------

Method B

↓

0.11 s
```

Choose

the faster approach

only after measurement.

---

# cProfile

Python includes

a built-in profiler.

Example

```bash
python -m cProfile app.py
```

It reports

```text
Function Calls

↓

Execution Time

↓

Call Count
```

---

# Using cProfile

Example

```python
import cProfile

def calculate():
    sum(range(1000000))

cProfile.run(

"calculate()"

)
```

---

# Sample Output

```text
Function

Calls

Time

-------------------

calculate

1

0.04

sum

1

0.03
```

You immediately see

where time

is spent.

---

# pstats

`pstats`

helps

analyze

cProfile results.

Example

```python
import pstats

stats = pstats.Stats(

"profile.out"

)

stats.sort_stats(

"time"

).print_stats()
```

Useful

for large applications.

---

# Line Profiling

Sometimes

a function

is slow,

but

which line?

Line profiling

measures

execution time

line by line.

Example tools

```text
line_profiler

kernprof
```

---

# Memory Profiling

Time

isn't

the only concern.

Programs

also consume memory.

Example tool

```text
memory_profiler
```

Install

```bash
pip install memory_profiler
```

---

# Memory Usage

Example

```python
from memory_profiler import profile

@profile
def example():

    numbers = [

        i

        for i in range(100000)

    ]
```

Displays

memory usage

for each line.

---

# Profiling Workflow

```text
Run Program

↓

Collect Metrics

↓

Identify Bottleneck

↓

Optimize

↓

Measure Again
```

---

# Real-World Example

Imagine

an e-commerce website.

Slow page loading

may be caused by

```text
Database Query

↓

Large Image

↓

Python Loop

↓

Network Call
```

Profiling identifies

the real cause.

---

# Common Profiling Tools

| Tool | Purpose |
|------|----------|
| `time` | Simple timing |
| `timeit` | Benchmark small code |
| `cProfile` | Function profiling |
| `pstats` | Analyze profile results |
| `line_profiler` | Line-by-line timing |
| `memory_profiler` | Memory usage |

---

# Memory Trick

Remember

```text
TMCPM
```

**T**

Time

↓

**M**

Measure

↓

**C**

cProfile

↓

**P**

pstats

↓

**M**

Memory

These are

the essential profiling tools.

---

# Best Practices

✔ Measure before optimizing

✔ Use realistic datasets

✔ Benchmark multiple runs

✔ Profile both CPU and memory

✔ Optimize the biggest bottleneck first

✔ Re-profile after every optimization

---

# Common Beginner Mistakes

### Mistake 1

Optimizing code

without measuring it.

Always profile first.

---

### Mistake 2

Benchmarking

only once.

Use

`timeit`

or repeated runs

for reliable results.

---

### Mistake 3

Ignoring memory usage.

A program can be fast

but consume excessive memory.

---

### Mistake 4

Trying to optimize

every function.

Focus on

the functions

that consume

the most time.

---

# Interview Questions & Answers

## Q1. What is profiling?

### Answer

Profiling is the process of measuring a program's execution,

including CPU time,

memory usage,

and function calls,

to identify performance bottlenecks.

---

## Q2. Why should profiling be done before optimization?

### Answer

Profiling identifies the actual bottlenecks.

Optimizing code without measurement can waste time and may not improve overall performance.

---

## Q3. What is the difference between `time` and `timeit`?

### Answer

The `time` module measures elapsed time for a single execution.

The `timeit` module executes code multiple times,

producing more reliable benchmark results.

---

## Q4. What is `cProfile`?

### Answer

`cProfile` is Python's built-in profiler.

It measures function execution time,

call counts,

and cumulative execution time,

helping developers locate slow functions.

---

## Q5. What is memory profiling?

### Answer

Memory profiling measures how much memory a program or function consumes,

helping identify memory leaks,

large allocations,

and inefficient data structures.

---

# Chapter Summary / Cheat Sheet

| Tool | Purpose |
|------|----------|
| `time.time()` | Basic timing |
| `time.perf_counter()` | High-precision timing |
| `timeit.timeit()` | Benchmark code |
| `cProfile.run()` | Profile functions |
| `pstats` | Analyze profiling results |
| `line_profiler` | Line-by-line profiling |
| `memory_profiler` | Memory profiling |
| Benchmarking | Compare implementations |
| Bottleneck | Slowest part of program |

---

# What's Next?

In **Chapter 79 — Optimization Techniques**, you'll learn practical methods to make Python programs faster, including:

- `functools.lru_cache`
- Memoization
- Vectorization with NumPy
- Efficient Loops
- Generator Expressions
- Choosing Better Data Structures
- Writing Pythonic High-Performance Code

These techniques are used to significantly improve the speed and efficiency of real-world Python applications.