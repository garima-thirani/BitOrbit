# Module 3 — Functions

# Chapter 11 — Recursion

---

# Learning Objectives

By the end of this chapter, you will understand:

- What is Recursion?
- Why Recursion is Needed
- Base Case
- Recursive Case
- Call Stack
- How Recursion Works Internally
- Tail Recursion
- Recursion vs Iteration
- Common Recursive Problems
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine standing between two mirrors.

What do you see?

```text
You

↓

Mirror

↓

Mirror

↓

Mirror

↓

Mirror

↓

...
```

The image keeps repeating itself.

Recursion works in a similar way.

A function keeps calling **itself** until a stopping condition is reached.

Without that stopping condition,

the function would continue forever.

---

# Story — Russian Dolls (Matryoshka)

Imagine opening a Russian doll.

Inside it,

there's another doll.

Inside that,

another doll.

```text
Big Doll

↓

Medium Doll

↓

Small Doll

↓

Tiny Doll

↓

Nothing
```

How do you know when to stop?

When you reach the smallest doll.

Recursion follows the same idea.

A function keeps calling itself until it reaches the **base case**.

---

# What is Recursion?

A function that calls itself is called a **recursive function**.

Visualization

```text
Function()

↓

Function()

↓

Function()

↓

Function()

↓

Base Case

↓

Return
```

---

# Why Use Recursion?

Some problems naturally have recursive structures.

Examples include:

- File System Traversal
- Binary Trees
- Graphs
- Divide & Conquer Algorithms
- Backtracking
- Dynamic Programming

Instead of solving a large problem directly,

recursion breaks it into smaller versions of the same problem.

---

# The Two Rules of Recursion

Every recursive function must have:

## 1. Base Case

The condition that stops recursion.

Without it,

the recursion never ends.

---

## 2. Recursive Case

The part where the function calls itself.

Without this,

there is no recursion.

Visualization

```text
Problem

↓

Small Problem

↓

Smaller Problem

↓

Base Case

↓

Return Answers
```

---

# First Recursive Function

Suppose we want to count down from 5.

```python
def countdown(n):

    if n == 0:
        return

    print(n)

    countdown(n - 1)

countdown(5)
```

Output

```text
5
4
3
2
1
```

---

# How It Works

```text
countdown(5)

↓

countdown(4)

↓

countdown(3)

↓

countdown(2)

↓

countdown(1)

↓

countdown(0)

↓

Stop
```

Then Python starts returning back.

---

# Factorial Problem

Factorial is a classic recursion example.

Definition

```text
5!

↓

5 × 4 × 3 × 2 × 1

↓

120
```

Notice something.

```text
5!

↓

5 × 4!
```

Similarly,

```text
4!

↓

4 × 3!
```

Every problem depends on a **smaller version of itself**.

Perfect for recursion.

---

# Recursive Factorial

```python
def factorial(n):

    if n == 1:

        return 1

    return n * factorial(n - 1)

print(factorial(5))
```

Output

```text
120
```

---

# Internal Execution

```text
factorial(5)

↓

5 × factorial(4)

↓

5 × 4 × factorial(3)

↓

5 × 4 × 3 × factorial(2)

↓

5 × 4 × 3 × 2 × factorial(1)

↓

1

↓

Multiply While Returning
```

---

# Understanding the Call Stack

Every function call is stored in memory.

Python uses a **Call Stack**.

Visualization

```text
factorial(5)

↓

factorial(4)

↓

factorial(3)

↓

factorial(2)

↓

factorial(1)
```

Once the base case is reached,

Python starts removing stack frames one by one.

```text
factorial(1)

↑

factorial(2)

↑

factorial(3)

↑

factorial(4)

↑

factorial(5)
```

This is called **stack unwinding**.

---

# Fibonacci Numbers

Another famous recursive problem.

Sequence

```text
0

1

1

2

3

5

8

13
```

Rule

```text
F(n)

↓

F(n-1)

+

F(n-2)
```

Recursive implementation

```python
def fibonacci(n):

    if n <= 1:
        return n

    return fibonacci(n - 1) + fibonacci(n - 2)
```

---

# Why Fibonacci is Slow

Consider

```text
F(5)
```

Python computes

```text
F(4)

+

F(3)
```

But

```text
F(3)
```

is computed again inside

```text
F(4)
```

Many calculations repeat.

Visualization

```text
F(5)

├── F(4)

│   ├── F(3)

│   └── F(2)

└── F(3)

    ├── F(2)

    └── F(1)
```

This repeated work makes naive recursion inefficient.

---

# Recursion vs Iteration

Factorial using a loop

```python
result = 1

for i in range(1, 6):

    result *= i
```

Factorial using recursion

```python
def factorial(n):

    if n == 1:
        return 1

    return n * factorial(n - 1)
```

Both produce the same answer.

The difference is in **how** they solve the problem.

---

# Recursion vs Iteration

| Recursion | Iteration |
|------------|-----------|
| Uses function calls | Uses loops |
| Uses Call Stack | Uses loop variables |
| Elegant for recursive problems | Usually faster |
| Can cause Stack Overflow | Memory efficient |

---

# Tail Recursion

A recursive function is **tail recursive** if the recursive call is the last operation.

Example

```python
def countdown(n):

    if n == 0:
        return

    countdown(n - 1)
```

Nothing happens after the recursive call.

---

# Does Python Optimize Tail Recursion?

No.

Unlike some languages,

Python **does not perform Tail Call Optimization (TCO).**

Even tail-recursive functions consume stack memory.

---

# Recursion Limit

Python prevents infinite recursion.

```python
import sys

print(sys.getrecursionlimit())
```

Typical output

```text
1000
```

If recursion exceeds this limit,

Python raises

```text
RecursionError
```

---

# Real-World Applications

Recursion is widely used in:

- Tree Traversal
- Graph Traversal
- File System Navigation
- Backtracking
- Merge Sort
- Quick Sort
- Binary Search (Recursive Version)
- Depth First Search (DFS)

---

# Memory Trick

Remember

```text
BRC
```

**B**

Base Case

↓

**R**

Recursive Call

↓

**C**

Call Stack

Every recursive function must follow this order.

---

# Common Beginner Mistakes

### Mistake 1

Forgetting the Base Case.

```python
def hello():

    hello()
```

This never stops.

Eventually,

Python raises

```text
RecursionError
```

---

### Mistake 2

Recursive call doesn't move toward the base case.

Bad

```python
factorial(n)
```

Good

```python
factorial(n - 1)
```

Each call should make progress.

---

### Mistake 3

Using recursion when a simple loop is better.

Not every problem needs recursion.

---

### Mistake 4

Ignoring stack memory usage.

Deep recursion can consume large amounts of memory.

---

# Interview Questions & Answers

## Q1. What is recursion?

### Answer

Recursion is a programming technique in which a function calls itself to solve a problem by breaking it into smaller subproblems.

Every recursive function must contain:

- A **base case** to stop recursion.
- A **recursive case** that moves toward the base case.

### Example

```python
def countdown(n):
    if n == 0:
        return

    print(n)
    countdown(n - 1)
```

### Interview Tip

A good interview answer always mentions **base case** and **recursive case**.

---

## Q2. What is the base case?

### Answer

The base case is the condition that stops recursive calls.

Without it,

the function would continue calling itself forever, leading to a `RecursionError`.

### Example

```python
if n == 1:
    return 1
```

---

## Q3. What is the call stack?

### Answer

The call stack is a stack data structure used by Python to keep track of active function calls.

Every recursive call creates a new **stack frame**.

When the base case is reached,

the stack starts unwinding.

### Visualization

```text
factorial(3)

↓

factorial(2)

↓

factorial(1)

↓

Return

↑

Return

↑

Return
```

---

## Q4. What is tail recursion?

### Answer

Tail recursion is a form of recursion where the recursive call is the final operation performed by the function.

### Example

```python
def countdown(n):

    if n == 0:
        return

    countdown(n - 1)
```

### Interview Tip

Python **does not optimize tail recursion**, so it offers no memory advantage over normal recursion.

---

## Q5. When should recursion be used?

### Answer

Use recursion when the problem has a recursive structure, such as:

- Trees
- Graphs
- Divide and Conquer Algorithms
- Backtracking
- DFS

Use iteration for simple counting or repetition, as it is generally faster and more memory-efficient.

---

# Chapter Summary / Cheat Sheet

| Concept | Description |
|----------|-------------|
| Recursion | Function calling itself |
| Base Case | Stops recursion |
| Recursive Case | Calls itself with a smaller problem |
| Call Stack | Stores active function calls |
| Tail Recursion | Recursive call is the last operation |
| Recursion Limit | Prevents infinite recursion |

---

# Module 3 Complete ✅

You now understand:

- Function Basics
- Parameters & Arguments
- Return Values
- Variable Scope
- Default & Keyword Arguments
- `*args` and `**kwargs`
- Functional Programming
- Lambda Functions
- `map()`, `filter()`, `reduce()`
- Closures
- Recursion
- Call Stack

You can now write modular, reusable, and expressive Python code—the foundation of professional Python development.

---

# What's Next?

In **Module 4 — Python Collections**, you'll explore Python's most important data structures:

- Lists
- Tuples
- Sets
- Dictionaries
- Frozensets
- `collections` Module

These are the backbone of almost every Python application and are among the most frequently tested topics in coding interviews.