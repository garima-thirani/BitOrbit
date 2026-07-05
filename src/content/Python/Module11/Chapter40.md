# Module 11 — Concurrency & Parallelism

# Chapter 40 — Multiprocessing

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Multiprocessing is Needed
- Threads vs Processes
- CPU-bound vs IO-bound Tasks
- Creating Processes
- Process Lifecycle
- Process Pool
- Inter-Process Communication (IPC)
- Queue
- Pipe
- Shared Memory
- Process Synchronization
- When to Use Multiprocessing
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you own a bakery.

One chef is making

- Bread
- Cake
- Cookies
- Pizza

```text
Chef

↓

Bread

↓

Cake

↓

Cookies

↓

Pizza
```

Even with multiple hands,

one chef can only work so fast.

Now imagine hiring four chefs.

```text
Chef 1 → Bread

Chef 2 → Cake

Chef 3 → Cookies

Chef 4 → Pizza
```

The bakery finishes much faster.

This is the idea behind **Multiprocessing**.

Instead of using multiple threads inside one process,

Python creates **multiple independent processes**.

---

# Story — Construction Workers

Suppose you're building four houses.

Option 1

One worker builds all four.

```text
House 1

↓

House 2

↓

House 3

↓

House 4
```

Very slow.

Option 2

Hire four workers.

```text
Worker 1 → House 1

Worker 2 → House 2

Worker 3 → House 3

Worker 4 → House 4
```

All houses are built simultaneously.

Each worker has their own tools and workspace.

Processes work exactly like these workers.

---

# Why Multiprocessing?

In the previous chapter,

we learned about the **Global Interpreter Lock (GIL)**.

```text
Multiple Threads

↓

GIL

↓

One Executes Python Bytecode
```

Threads cannot fully utilize multiple CPU cores for CPU-intensive tasks.

Multiprocessing solves this problem.

---

# Threads vs Processes

| Threads | Processes |
|----------|-----------|
| Share memory | Separate memory |
| Lightweight | Heavier |
| Faster to create | Slower to create |
| Best for IO | Best for CPU |

---

# Process Memory

Unlike threads,

each process has its own memory.

Visualization

```text
Process A

↓

Own Memory

------------------

Process B

↓

Own Memory

------------------

Process C

↓

Own Memory
```

One process cannot directly modify another process's memory.

This improves safety.

---

# Creating a Process

Python provides

```python
multiprocessing
```

Example

```python
from multiprocessing import Process

def task():

    print("Running")

process = Process(

    target=task

)

process.start()

process.join()
```

Output

```text
Running
```

---

# Process Lifecycle

Every process follows the same lifecycle.

```text
Created

↓

Ready

↓

Running

↓

Completed
```

Very similar to threads,

but each process has its own interpreter and memory space.

---

# Main Process

Every Python program begins with one process.

```text
Main Process

↓

Creates Child Processes

↓

Waits for Completion
```

The main process can create many child processes.

---

# Why join()?

Suppose

```python
process.start()

print("Done")
```

Output may be

```text
Done

Running
```

The main process continues immediately.

Using

```python
process.join()
```

ensures the parent waits for the child process to finish.

---

# Multiple Processes

Example

```python
from multiprocessing import Process

def task():

    print("Working")

for _ in range(4):

    p = Process(

        target=task

    )

    p.start()
```

Four independent processes execute simultaneously.

---

# Process Pool

Suppose you have

```text
10,000 Tasks
```

Creating

```text
10,000 Processes
```

is inefficient.

Instead,

reuse a fixed number of worker processes.

Visualization

```text
Tasks

↓

Pool

↓

Worker 1

Worker 2

Worker 3

Worker 4
```

---

# ProcessPool Example

```python
from multiprocessing import Pool

def square(x):

    return x*x

with Pool(4) as pool:

    result = pool.map(

        square,

        [1,2,3,4]

    )

print(result)
```

Output

```text
[1,4,9,16]
```

---

# Why Process Pools?

Benefits

- Reuse worker processes
- Lower overhead
- Better CPU utilization
- Simpler code

Widely used in data processing applications.

---

# Inter-Process Communication (IPC)

Processes do **not** share memory.

How do they communicate?

Python provides

```text
Queue

Pipe

Shared Memory
```

---

# Queue

A Queue allows safe communication between processes.

Visualization

```text
Process A

↓

Queue

↓

Process B
```

---

# Queue Example

```python
from multiprocessing import Process, Queue

def producer(q):

    q.put("Hello")

q = Queue()

p = Process(

    target=producer,

    args=(q,)

)

p.start()

print(q.get())

p.join()
```

Output

```text
Hello
```

---

# Pipe

A Pipe connects two processes directly.

Visualization

```text
Process A

⇄

Pipe

⇄

Process B
```

Useful for two-way communication.

---

# Shared Memory

Normally,

processes have separate memory.

Sometimes,

sharing data improves performance.

Python supports

```python
Value

Array

shared_memory
```

for controlled shared memory.

Use carefully,

since synchronization is required.

---

# Process Synchronization

Even with separate memory,

shared resources (like shared memory or files) need protection.

Python provides

```text
Lock

Semaphore

Event

Condition
```

These work similarly to thread synchronization.

---

# CPU-bound vs IO-bound

## CPU-bound

Examples

```text
Video Encoding

Image Processing

Scientific Simulation

Machine Learning Training
```

Use

```text
Multiprocessing
```

to utilize multiple CPU cores.

---

## IO-bound

Examples

```text
Downloading Files

Reading Files

Database Queries

API Calls
```

Threads or Asyncio are usually better.

---

# Multiprocessing vs Threading

| Multiprocessing | Threading |
|-----------------|-----------|
| Separate memory | Shared memory |
| Multiple CPU cores | Limited by GIL |
| Higher overhead | Lower overhead |
| CPU-intensive tasks | IO-intensive tasks |

---

# Real-World Example

Imagine a video editing application.

Each video frame is processed independently.

```text
Video

↓

Frame 1 → Process 1

Frame 2 → Process 2

Frame 3 → Process 3

Frame 4 → Process 4
```

All CPU cores work simultaneously,

dramatically reducing rendering time.

---

# Memory Trick

Remember

```text
PQP
```

**P**

Process

↓

**Q**

Queue

↓

**P**

Pool

Also remember

```text
CPU

↓

Multiprocessing

----------------

IO

↓

Threads / Asyncio
```

---

# Common Beginner Mistakes

### Mistake 1

Using threads for CPU-intensive work.

Because of the GIL,

threads won't fully utilize multiple CPU cores.

---

### Mistake 2

Creating too many processes.

Process creation is expensive.

Prefer

```python
Pool()
```

for many tasks.

---

### Mistake 3

Assuming processes share variables.

Each process has its own memory.

Use

- Queue
- Pipe
- Shared Memory

to exchange data.

---

### Mistake 4

Forgetting

```python
if __name__ == "__main__":
```

When using multiprocessing,

especially on Windows,

the entry point should be protected.

Example

```python
if __name__ == "__main__":

    main()
```

Without this,

child processes may repeatedly create new processes.

---

# Interview Questions & Answers

## Q1. What is Multiprocessing?

### Answer

Multiprocessing is the execution of multiple independent processes simultaneously.

Each process has its own Python interpreter and memory space.

It is ideal for CPU-intensive tasks.

---

## Q2. Why is Multiprocessing faster than Threading for CPU-bound tasks?

### Answer

Threads are limited by Python's Global Interpreter Lock (GIL).

Processes bypass the GIL because each process has its own interpreter.

Therefore,

multiple CPU cores can execute Python code simultaneously.

---

## Q3. What is the difference between a Queue and a Pipe?

### Answer

**Queue**

- Supports multiple producers and consumers.
- Easier to use.
- Thread/process safe.

**Pipe**

- Connects exactly two processes.
- Slightly lower overhead.
- Good for direct communication.

---

## Q4. What is a Process Pool?

### Answer

A Process Pool maintains a fixed number of worker processes and reuses them for multiple tasks.

Benefits include:

- Lower creation overhead
- Better CPU utilization
- Simpler task distribution

---

## Q5. When should you use Multiprocessing?

### Answer

Use multiprocessing for CPU-intensive workloads such as:

- Image Processing
- Machine Learning
- Scientific Computing
- Data Compression
- Encryption

For IO-bound workloads,

prefer Threads or Asyncio.

---

# Chapter Summary / Cheat Sheet

| Concept | Purpose |
|----------|----------|
| Process | Independent execution unit |
| `Process()` | Create a process |
| `start()` | Start process |
| `join()` | Wait for completion |
| Pool | Reuse worker processes |
| Queue | Process communication |
| Pipe | Two-way communication |
| Shared Memory | Share data between processes |
| Multiprocessing | Best for CPU-bound tasks |

---

# What's Next?

In **Chapter 41 — Asyncio**, you'll learn Python's modern asynchronous programming model:

- Event Loop
- Coroutines
- `async`
- `await`
- Tasks
- `asyncio.gather()`
- Async Generators
- Async Context Managers

This is the foundation of modern frameworks like **FastAPI**, **aiohttp**, and high-performance network applications.