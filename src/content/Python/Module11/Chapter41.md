# Module 11 — Concurrency & Parallelism

# Chapter 41 — Asyncio

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Async Programming?
- Synchronous vs Concurrent vs Asynchronous
- What is Asyncio?
- Event Loop
- Coroutines
- `async`
- `await`
- Tasks
- `asyncio.gather()`
- Async Generators
- Async Context Managers
- When to Use Asyncio
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're ordering food at a restaurant.

### Option 1 — Traditional Way

You place your order.

Then...

```text
Wait

↓

Wait

↓

Wait

↓

Food Arrives
```

You do absolutely nothing while waiting.

---

Now imagine another scenario.

You order food.

While the chef is cooking,

you

- Read a book
- Reply to messages
- Drink coffee

When the food is ready,

you continue eating.

```text
Order Food

↓

Do Other Work

↓

Food Ready

↓

Eat
```

This is the philosophy behind **Asynchronous Programming**.

Instead of waiting,

your program performs other useful work.

---

# Story — Pizza Shop

Suppose one pizza takes

```text
10 minutes
```

Three customers arrive.

### Synchronous

```text
Pizza 1

↓

10 min

↓

Pizza 2

↓

10 min

↓

Pizza 3

↓

10 min
```

Total

```text
30 minutes
```

---

### Asynchronous

```text
Start Pizza 1

↓

Start Pizza 2

↓

Start Pizza 3

↓

Wait Together

↓

Serve All
```

Total

```text
≈10 minutes
```

Nobody waits unnecessarily.

---

# Why Async Programming?

Imagine downloading three files.

Each download takes

```text
5 seconds
```

Synchronous execution

```text
Download 1

↓

5 sec

↓

Download 2

↓

5 sec

↓

Download 3

↓

5 sec
```

Total

```text
15 seconds
```

---

Async execution

```text
Start All Downloads

↓

Wait

↓

All Finish
```

Total

```text
≈5 seconds
```

Huge improvement.

---

# Synchronous vs Concurrent vs Asynchronous

### Synchronous

One task at a time.

```text
Task A

↓

Task B

↓

Task C
```

---

### Concurrent

Multiple tasks make progress.

```text
Task A

↓

Task B

↓

Task A

↓

Task C

↓

Task B
```

---

### Asynchronous

Tasks voluntarily pause while waiting,

allowing other tasks to continue.

```text
Task A Waiting

↓

Task B Runs

↓

Task C Runs

↓

Task A Resumes
```

---

# What is Asyncio?

`asyncio` is Python's built-in framework for asynchronous programming.

It is designed primarily for

- Network Applications
- APIs
- Web Servers
- Chat Applications
- Web Crawlers

Instead of creating multiple threads,

it usually runs everything inside **one thread** using an **Event Loop**.

---

# The Event Loop

Imagine a receptionist.

People arrive.

Instead of waiting for one customer to finish,

the receptionist quickly switches between customers.

Visualization

```text
Task A Waiting

↓

Task B Runs

↓

Task C Runs

↓

Task A Ready

↓

Task A Continues
```

The receptionist is the **Event Loop**.

---

# Event Loop Diagram

```text
Task Queue

↓

Event Loop

↓

Run Ready Task

↓

Waiting?

↓

Yes

↓

Run Another Task

↓

Repeat
```

This switching happens extremely fast.

---

# What is a Coroutine?

A coroutine is a special function that can pause and resume.

Instead of

```python
def
```

it uses

```python
async def
```

Example

```python
async def greet():

    print("Hello")
```

Notice

```python
async
```

before

```python
def
```

---

# Why Coroutines?

Normal functions

```text
Start

↓

Finish
```

Coroutines

```text
Start

↓

Pause

↓

Resume

↓

Finish
```

---

# await

Suppose

```python
async def task():

    await something()
```

What does

```python
await
```

mean?

It means

> "Pause here until this operation finishes."

While waiting,

the Event Loop runs another coroutine.

---

# Example

```python
import asyncio

async def greet():

    print("Hello")

asyncio.run(greet())
```

Output

```text
Hello
```

---

# Sleeping Asynchronously

Normal sleep

```python
time.sleep(3)
```

Blocks everything.

Async sleep

```python
await asyncio.sleep(3)
```

Allows other coroutines to continue.

This is one of the biggest differences.

---

# Multiple Coroutines

Example

```python
import asyncio

async def task(name):

    print(name)

async def main():

    await asyncio.gather(

        task("A"),

        task("B"),

        task("C")

    )

asyncio.run(main())
```

All tasks execute concurrently.

---

# asyncio.gather()

Suppose you need

- Download User Data
- Download Profile
- Download Messages

Instead of waiting one by one,

use

```python
asyncio.gather()
```

Visualization

```text
Task A

Task B

Task C

↓

Run Together

↓

Wait for All
```

---

# Tasks

A coroutine doesn't start automatically.

The Event Loop schedules it as a **Task**.

Example

```python
task = asyncio.create_task(

    fetch_data()

)
```

Now the Event Loop manages it.

---

# Internal Flow

```text
Coroutine

↓

Task

↓

Event Loop

↓

Execution
```

---

# Async Generators

Earlier,

we learned generators.

```python
yield
```

Async generators combine

```python
async

+

yield
```

Example

```python
async def numbers():

    for i in range(3):

        yield i
```

Useful for asynchronous data streams.

---

# Async Context Managers

Earlier,

we learned

```python
with
```

Async code uses

```python
async with
```

Example

```python
async with database:

    ...
```

Internally,

Python calls

```python
__aenter__()

↓

__aexit__()
```

instead of

```python
__enter__()

↓

__exit__()
```

---

# Asyncio vs Threads

| Asyncio | Threads |
|----------|----------|
| Single Thread | Multiple Threads |
| Event Loop | OS Scheduler |
| No GIL Issues | Limited by GIL |
| Excellent for IO | Good for IO |

---

# Asyncio vs Multiprocessing

| Asyncio | Multiprocessing |
|----------|----------------|
| IO-bound | CPU-bound |
| Lightweight | Heavyweight |
| Single Process | Multiple Processes |
| Event Loop | Multiple CPU Cores |

---

# When Should You Use Asyncio?

Ideal for

- API Servers
- Web Crawlers
- Chat Servers
- Microservices
- Real-time Applications
- Thousands of Network Connections

Not ideal for

- Image Processing
- Machine Learning Training
- Scientific Computing

Those are CPU-bound.

Use multiprocessing instead.

---

# Real-World Example

Suppose a web server receives

```text
10,000 Requests
```

Each request waits for

- Database
- Network
- Cache

Instead of creating

```text
10,000 Threads
```

FastAPI uses

```text
Event Loop

↓

Coroutine

↓

await Database

↓

Serve Next Request
```

This allows one process to efficiently manage thousands of concurrent connections.

---

# Memory Trick

Remember

```text
CAE
```

**C**

Coroutine

↓

**A**

await

↓

**E**

Event Loop

And remember

```text
IO

↓

Asyncio

----------------

CPU

↓

Multiprocessing
```

---

# Common Beginner Mistakes

### Mistake 1

Using

```python
time.sleep()
```

inside async code.

Always use

```python
await asyncio.sleep()
```

Otherwise,

the Event Loop blocks.

---

### Mistake 2

Calling an async function directly.

Wrong

```python
greet()
```

Correct

```python
await greet()
```

or

```python
asyncio.run(greet())
```

---

### Mistake 3

Thinking Asyncio creates multiple threads.

It usually runs inside a **single thread**.

Concurrency comes from cooperative scheduling,

not parallel execution.

---

### Mistake 4

Using Asyncio for CPU-heavy work.

Asyncio shines when tasks spend time waiting.

For computation-heavy work,

use multiprocessing.

---

# Interview Questions & Answers

## Q1. What is Asyncio?

### Answer

Asyncio is Python's built-in framework for asynchronous programming.

It enables many IO-bound tasks to run concurrently using an Event Loop instead of multiple threads.

---

## Q2. What is the Event Loop?

### Answer

The Event Loop is the core of Asyncio.

It continuously checks for coroutines that are ready to run,

executes them,

and switches to other coroutines whenever one is waiting.

---

## Q3. What is the difference between `async` and `await`?

### Answer

- `async` defines a coroutine.
- `await` pauses the coroutine until an awaited operation completes.

While waiting,

the Event Loop executes other ready coroutines.

---

## Q4. When should you use Asyncio instead of Threads?

### Answer

Use Asyncio when handling many **IO-bound** operations such as:

- HTTP requests
- Database queries
- File operations
- WebSockets

It uses fewer system resources than creating thousands of threads.

---

## Q5. Can Asyncio speed up CPU-intensive programs?

### Answer

No.

Asyncio improves concurrency for waiting tasks,

not computation.

CPU-intensive workloads should use multiprocessing.

---

# Chapter Summary / Cheat Sheet

| Concept | Purpose |
|----------|----------|
| `async` | Define a coroutine |
| `await` | Pause until completion |
| Event Loop | Schedule coroutines |
| Coroutine | Pause & resume function |
| `asyncio.run()` | Start async program |
| `create_task()` | Schedule coroutine |
| `asyncio.gather()` | Run multiple coroutines concurrently |
| `async with` | Async context manager |
| Asyncio | Best for IO-bound concurrency |

---

# What's Next?

In **Chapter 42 — Futures & Executors**, you'll learn how Python bridges synchronous and asynchronous programming:

- Future Objects
- ThreadPoolExecutor
- ProcessPoolExecutor
- `submit()`
- `map()`
- `as_completed()`
- Choosing Threads vs Processes vs Asyncio

This chapter ties together all concurrency models and helps you choose the right one for real-world applications.