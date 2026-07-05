# Module 11 — Concurrency & Parallelism

# Chapter 39 — Threads

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Concurrency is Needed
- Process vs Thread
- What is a Thread?
- Creating Threads
- Thread Lifecycle
- Main Thread
- Joining Threads
- Thread Synchronization
- Lock
- RLock
- Semaphore
- Deadlocks
- Global Interpreter Lock (GIL)
- CPU-bound vs IO-bound
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine a restaurant.

One chef has to

- Cook Food
- Wash Dishes
- Pack Orders
- Answer Phone Calls

```text
Chef

↓

Cook

↓

Wash

↓

Pack

↓

Answer Calls
```

Customers wait for everything.

Now imagine four chefs.

```text
Chef 1 → Cooking

Chef 2 → Washing

Chef 3 → Packing

Chef 4 → Phone
```

Everything happens simultaneously.

Programs face the same problem.

Can one program perform multiple tasks at the same time?

Yes.

This is called **Concurrency**.

---

# Story — Airport Check-in

Imagine checking in at an airport.

One employee handles

```text
Passenger 1

↓

Passenger 2

↓

Passenger 3

↓

Passenger 4
```

Very slow.

Instead,

the airport opens multiple counters.

```text
Counter 1

Counter 2

Counter 3

Counter 4
```

Passengers are processed simultaneously.

Threads work exactly like these counters.

---

# Why Concurrency?

Suppose you're downloading a file.

Without concurrency,

your application freezes.

```text
Download

↓

Wait...

↓

Wait...

↓

Wait...

↓

Finished
```

The user can't do anything.

With concurrency,

```text
Download

↓

Background Thread

↓

User Can Continue Working
```

This is why browsers,

games,

and IDEs remain responsive.

---

# Process vs Thread

Imagine a company.

The company is a **Process**.

Employees inside the company are **Threads**.

Visualization

```text
Company

↓

Employee

Employee

Employee
```

Similarly,

```text
Process

↓

Thread

Thread

Thread
```

---

# What is a Process?

A process is an **independent running program**.

Each process has its own

- Memory
- Resources
- Address Space

Example

```text
Chrome

Spotify

VS Code
```

Each is a separate process.

---

# What is a Thread?

A thread is the **smallest unit of execution** inside a process.

Threads

- Share Memory
- Share Resources
- Execute independently

Visualization

```text
Process

↓

Shared Memory

↓

Thread 1

Thread 2

Thread 3
```

---

# Why Threads?

Imagine a web browser.

Simultaneously it can

```text
Download Images

↓

Play Video

↓

Accept User Input

↓

Run JavaScript
```

Without threads,

everything would happen one after another.

---

# Creating a Thread

Python provides the

```python
threading
```

module.

Example

```python
import threading

def task():

    print("Running...")

thread = threading.Thread(

    target=task

)

thread.start()
```

Output

```text
Running...
```

---

# Main Thread

Every Python program starts with one thread.

Visualization

```text
Program Starts

↓

Main Thread

↓

Creates Worker Threads
```

The main thread is automatically created by Python.

---

# Thread Lifecycle

Every thread follows the same lifecycle.

```text
Created

↓

Runnable

↓

Running

↓

Completed
```

---

# start()

Creates a new thread.

```python
thread.start()
```

Never call

```python
thread.run()
```

directly.

`start()` creates a separate thread.

`run()` executes in the current thread.

---

# join()

Suppose

```python
thread.start()

print("Done")
```

Output might be

```text
Done

Running...
```

Why?

The main thread doesn't wait.

Instead,

use

```python
thread.join()
```

Example

```python
thread.start()

thread.join()

print("Done")
```

Now

```text
Running...

Done
```

---

# Multiple Threads

Example

```python
import threading

def task():

    print("Working")

for _ in range(3):

    t = threading.Thread(

        target=task

    )

    t.start()
```

Three threads execute independently.

---

# Shared Memory Problem

Suppose two threads update

```python
balance = 100
```

Both execute

```python
balance += 10
```

Expected

```text
120
```

Sometimes

```text
110
```

Why?

Both threads modify the same memory simultaneously.

This is called a

**Race Condition**.

---

# Race Condition

Visualization

```text
Thread A

↓

Reads 100

----------------

Thread B

↓

Reads 100

----------------

Both Write

↓

110
```

One update is lost.

---

# Synchronization

To avoid race conditions,

threads must coordinate.

Python provides synchronization primitives.

Most important:

```text
Lock
```

---

# Lock

A lock allows only one thread to access a critical section.

Visualization

```text
Thread 1

↓

Lock Acquired

↓

Critical Section

↓

Release Lock

↓

Thread 2
```

---

# Example

```python
import threading

lock = threading.Lock()

def task():

    with lock:

        print("Working")
```

Only one thread enters the protected block at a time.

---

# Why Lock?

Without Lock

```text
Thread A

↓

Modify Data

↓

Thread B

↓

Modify Same Data
```

Unexpected results.

With Lock

```text
Thread A

↓

Finish

↓

Thread B
```

Safe execution.

---

# RLock (Reentrant Lock)

Sometimes the same thread needs to acquire the lock multiple times.

A normal lock would deadlock.

Use

```python
threading.RLock()
```

A thread can safely acquire the same lock repeatedly.

---

# Semaphore

A semaphore allows **multiple threads** to enter simultaneously.

Example

```python
Semaphore(3)
```

Only

```text
3 Threads
```

may execute concurrently.

Useful for

- Database Connections
- API Rate Limits
- Resource Pools

---

# Deadlock

Imagine

Thread A holds

```text
Lock 1
```

and waits for

```text
Lock 2
```

Thread B holds

```text
Lock 2
```

and waits for

```text
Lock 1
```

Visualization

```text
Thread A

↓

Lock 1

↓

Waiting Lock 2

--------------------

Thread B

↓

Lock 2

↓

Waiting Lock 1
```

Neither thread can continue.

This is a **Deadlock**.

---

# The Global Interpreter Lock (GIL)

This is one of the most famous Python interview topics.

The GIL allows **only one thread to execute Python bytecode at a time** in CPython.

Visualization

```text
Multiple Threads

↓

GIL

↓

One Executes

↓

Next Executes
```

Even on a multi-core CPU,

only one thread runs Python bytecode at a given instant.

---

# Does GIL Make Threads Useless?

No.

Threads are excellent for

- File I/O
- Network Requests
- Database Operations
- Waiting Tasks

While one thread waits,

another thread can run.

---

# CPU-bound vs IO-bound

## CPU-bound

Examples

```text
Image Processing

Machine Learning

Encryption

Large Calculations
```

Threads perform poorly due to the GIL.

Prefer

```text
Multiprocessing
```

---

## IO-bound

Examples

```text
Downloading Files

Reading Files

Database Queries

API Calls
```

Threads work very well because much of the time is spent waiting for external resources.

---

# Real-World Example

Imagine a web server.

For each incoming request,

it creates a worker thread.

```text
User 1

↓

Thread 1

----------------

User 2

↓

Thread 2

----------------

User 3

↓

Thread 3
```

While one request waits for a database,

another thread processes a different request.

---

# Memory Trick

Remember

```text
TLS
```

**T**

Thread

↓

**L**

Lock

↓

**S**

Semaphore

And remember

```text
CPU

↓

Multiprocessing

----------------

IO

↓

Threads
```

---

# Common Beginner Mistakes

### Mistake 1

Calling

```python
thread.run()
```

instead of

```python
thread.start()
```

`run()` executes normally.

`start()` creates a new thread.

---

### Mistake 2

Forgetting

```python
join()
```

The main thread may finish before worker threads.

---

### Mistake 3

Ignoring shared data.

Whenever multiple threads modify shared state,

protect it using a lock.

---

### Mistake 4

Thinking threads speed up CPU-intensive tasks.

Because of the GIL,

threads are mainly beneficial for IO-bound workloads.

Use multiprocessing for CPU-heavy tasks.

---

# Interview Questions & Answers

## Q1. What is the difference between a Process and a Thread?

### Answer

A **Process** is an independent program with its own memory.

A **Thread** is a lightweight execution unit inside a process that shares memory with other threads in the same process.

---

## Q2. What is the Global Interpreter Lock (GIL)?

### Answer

The GIL is a mutex in CPython that allows only one thread to execute Python bytecode at a time.

It simplifies memory management but limits parallel execution of CPU-bound Python code.

---

## Q3. What is a Race Condition?

### Answer

A race condition occurs when multiple threads access and modify shared data simultaneously, leading to unpredictable results.

Locks are commonly used to prevent race conditions.

---

## Q4. What is the difference between Lock and RLock?

### Answer

A **Lock** can be acquired only once by a thread.

An **RLock (Reentrant Lock)** allows the same thread to acquire the lock multiple times before releasing it.

---

## Q5. When should you use Threads?

### Answer

Threads are ideal for **IO-bound** tasks such as:

- File operations
- Network requests
- Database queries
- API calls

For CPU-intensive work,

prefer multiprocessing.

---

# Chapter Summary / Cheat Sheet

| Concept | Purpose |
|----------|----------|
| Process | Independent program |
| Thread | Lightweight execution unit |
| `start()` | Start a new thread |
| `join()` | Wait for thread completion |
| Lock | Mutual exclusion |
| RLock | Reentrant lock |
| Semaphore | Limit concurrent access |
| Race Condition | Unsafe shared access |
| GIL | One thread executes Python bytecode at a time |

---

# What's Next?

In **Chapter 40 — Multiprocessing**, you'll learn how Python bypasses the GIL by running multiple processes:

- Process Creation
- Process Pools
- Queues
- Pipes
- Shared Memory
- CPU-bound Parallelism

This chapter explains how Python fully utilizes multi-core processors for computationally intensive tasks.