# Module 11 — Concurrency & Parallelism

# Chapter 42 — Futures & Executors

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Futures are Needed
- What is a Future?
- Executors
- ThreadPoolExecutor
- ProcessPoolExecutor
- `submit()`
- `map()`
- `as_completed()`
- Choosing Threads vs Processes vs Asyncio
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're at a restaurant.

You order food.

The waiter gives you a **token**.

```text
Order Pizza

↓

Token #42

↓

Wait

↓

Collect Pizza
```

The token isn't the pizza.

It is a **promise** that the pizza will be ready later.

Python has the exact same concept.

It is called a **Future**.

A Future represents a result that **will become available in the future**.

---

# Story — Courier Delivery

Suppose you order a laptop online.

Immediately after ordering,

you receive

```text
Tracking ID
```

The laptop isn't with you yet.

But the tracking ID represents

> "Your package will arrive later."

A **Future** works exactly like this tracking ID.

It represents work that has started,

but hasn't finished yet.

---

# Why Futures?

Without Futures,

you must wait.

```text
Task

↓

Finish

↓

Next Task
```

With Futures,

you submit the work,

continue doing other things,

and collect the result later.

```text
Submit Task

↓

Continue Working

↓

Collect Result
```

Much more efficient.

---

# What is a Future?

A **Future** is an object representing the result of an asynchronous computation.

Visualization

```text
Submit Task

↓

Future Created

↓

Task Running

↓

Task Finished

↓

Future Contains Result
```

---

# Executors

Managing threads and processes manually becomes difficult.

Instead,

Python provides **Executors**.

Think of an Executor as a **manager**.

Visualization

```text
Tasks

↓

Executor

↓

Worker 1

Worker 2

Worker 3
```

You submit work.

The executor decides which worker executes it.

---

# Types of Executors

Python provides two major executors.

```text
Executor

│

├── ThreadPoolExecutor

└── ProcessPoolExecutor
```

---

# ThreadPoolExecutor

Used for

```text
IO-bound Tasks
```

Examples

- API Calls
- Database Queries
- File Downloads

Instead of creating threads manually,

the executor maintains a reusable thread pool.

---

# Example

```python
from concurrent.futures import ThreadPoolExecutor

def square(x):

    return x*x

with ThreadPoolExecutor() as executor:

    future = executor.submit(

        square,

        5

    )

    print(

        future.result()

    )
```

Output

```text
25
```

---

# What Happens Internally?

```text
Submit Task

↓

Executor

↓

Worker Thread

↓

Runs Function

↓

Stores Result

↓

Future
```

---

# submit()

The most common executor method.

```python
future = executor.submit(

    function,

    argument
)
```

Returns

```text
Future Object
```

The function executes in the background.

---

# Getting the Result

To retrieve the result,

use

```python
future.result()
```

If the task isn't complete,

Python waits until it finishes.

---

# Running Multiple Tasks

Example

```python
from concurrent.futures import ThreadPoolExecutor

def square(x):

    return x*x

with ThreadPoolExecutor() as executor:

    futures = [

        executor.submit(square, i)

        for i in range(5)

    ]

    for future in futures:

        print(

            future.result()

        )
```

Output

```text
0

1

4

9

16
```

---

# map()

Suppose every task performs the same function.

Instead of calling

```python
submit()

submit()

submit()
```

use

```python
map()
```

Example

```python
with ThreadPoolExecutor() as executor:

    results = executor.map(

        square,

        [1,2,3,4]

    )

    print(

        list(results)

    )
```

Output

```text
[1,4,9,16]
```

---

# submit() vs map()

| submit() | map() |
|-----------|--------|
| Individual tasks | Same function over many inputs |
| Returns Future | Returns iterator |
| More flexible | Simpler |

---

# as_completed()

Suppose tasks finish at different times.

Instead of waiting in submission order,

retrieve results as soon as they finish.

Example

```python
from concurrent.futures import as_completed
```

Visualization

```text
Task A

↓

3 sec

Task B

↓

1 sec

Task C

↓

2 sec
```

Output order

```text
Task B

↓

Task C

↓

Task A
```

Not submission order.

Completion order.

---

# Example

```python
from concurrent.futures import (

ThreadPoolExecutor,

as_completed

)

def square(x):

    return x*x

with ThreadPoolExecutor() as executor:

    futures = [

        executor.submit(square, i)

        for i in range(5)

    ]

    for future in as_completed(futures):

        print(

            future.result()

        )
```

---

# ProcessPoolExecutor

Suppose the work is CPU-intensive.

Instead of threads,

use processes.

Example

```python
from concurrent.futures import ProcessPoolExecutor
```

Everything else remains almost identical.

Only the workers change.

Visualization

```text
Executor

↓

Process 1

Process 2

Process 3
```

---

# ThreadPoolExecutor vs ProcessPoolExecutor

| ThreadPoolExecutor | ProcessPoolExecutor |
|---------------------|---------------------|
| Uses Threads | Uses Processes |
| IO-bound | CPU-bound |
| Shared Memory | Separate Memory |
| Affected by GIL | Bypasses GIL |

---

# Choosing the Right Tool

One of the most common interview questions.

---

## Threads

Use when tasks spend most of their time waiting.

Examples

```text
Database

Network

File I/O

API Calls
```

---

## Multiprocessing

Use when tasks spend most of their time computing.

Examples

```text
Machine Learning

Video Rendering

Compression

Scientific Computing
```

---

## Asyncio

Use when managing **thousands** of waiting operations.

Examples

```text
FastAPI

Chat Server

WebSockets

Crawler
```

---

# Complete Decision Flow

```text
Need Concurrency?

↓

CPU Intensive?

├── Yes

│

│ Multiprocessing

│

└── No

↓

Waiting for IO?

├── Small Number

│

│ Threads

│

└── Thousands

↓

Asyncio
```

This decision tree is extremely useful in interviews.

---

# Real-World Example

Imagine an e-commerce website.

```text
Incoming Request

↓

Read Product

↓

Check Inventory

↓

Process Payment

↓

Send Email
```

Possible choices

```text
Database

↓

Asyncio

-----------------

Payment API

↓

Threads / Asyncio

-----------------

Invoice PDF

↓

Multiprocessing
```

Real systems often combine multiple concurrency models.

---

# Memory Trick

Remember

```text
FEM
```

**F**

Future

↓

**E**

Executor

↓

**M**

map()

And remember

```text
Thread Pool

↓

IO

----------------

Process Pool

↓

CPU
```

---

# Common Beginner Mistakes

### Mistake 1

Using

```python
future.result()
```

immediately after

```python
submit()
```

Doing so blocks the current thread,

eliminating much of the benefit of concurrency.

---

### Mistake 2

Using

```text
ThreadPoolExecutor
```

for CPU-intensive work.

Use

```text
ProcessPoolExecutor
```

instead.

---

### Mistake 3

Creating hundreds of threads manually.

Executors efficiently reuse worker threads.

Always prefer executors unless you need low-level control.

---

### Mistake 4

Confusing Futures with Threads.

A Future is **not** a thread.

It is simply an object representing the eventual result of asynchronous work.

---

# Interview Questions & Answers

## Q1. What is a Future?

### Answer

A Future represents the result of a task that may not have completed yet.

It acts as a placeholder for a value that will become available later.

---

## Q2. What is an Executor?

### Answer

An Executor manages a pool of worker threads or processes.

Instead of manually creating workers,

you submit tasks to the executor,

which schedules and executes them efficiently.

---

## Q3. What is the difference between `submit()` and `map()`?

### Answer

`submit()`

- Submits one task at a time
- Returns a Future
- Suitable for different functions or arguments

`map()`

- Applies the same function to multiple inputs
- Returns an iterator of results
- Simpler for batch processing

---

## Q4. When should you use ThreadPoolExecutor?

### Answer

For **IO-bound** workloads such as:

- File operations
- Database queries
- API requests
- Network communication

---

## Q5. When should you use ProcessPoolExecutor?

### Answer

For **CPU-bound** workloads such as:

- Image Processing
- Scientific Computing
- Encryption
- Machine Learning

Each worker runs in a separate process,

allowing true parallel execution.

---

## Q6. How do you choose between Threads, Multiprocessing, and Asyncio?

### Answer

Use this rule:

| Workload | Best Choice |
|----------|-------------|
| IO-bound (few concurrent tasks) | Threads |
| IO-bound (thousands of concurrent tasks) | Asyncio |
| CPU-bound | Multiprocessing |

Choosing the right model depends on whether the program spends most of its time **waiting** or **computing**.

---

# Chapter Summary / Cheat Sheet

| Concept | Purpose |
|----------|----------|
| Future | Result available later |
| Executor | Manages worker threads/processes |
| ThreadPoolExecutor | Thread pool for IO-bound tasks |
| ProcessPoolExecutor | Process pool for CPU-bound tasks |
| `submit()` | Submit a single task |
| `map()` | Apply one function to many inputs |
| `as_completed()` | Process tasks as they finish |

---

# Module 11 Complete ✅

You now understand Python's complete concurrency ecosystem:

- Threads
- Locks
- RLocks
- Semaphores
- GIL
- Multiprocessing
- Process Pools
- IPC (Queue & Pipe)
- Asyncio
- Event Loop
- Coroutines
- Futures
- Executors

You can now confidently choose the right concurrency model for real-world applications and answer one of the most frequently tested areas in Python interviews.

---

# What's Next?

In **Module 12 — Memory Management**, you'll learn what happens behind the scenes when Python creates, stores, and destroys objects:

- Python Memory Model
- Stack vs Heap
- References
- Garbage Collection
- Reference Counting
- Memory Optimization
- Copy vs Deep Copy
- Memory Profiling

This module explains why some Python programs are memory-efficient while others consume far more memory than expected.