# Module 12 — Memory Management

# Chapter 45 — Memory Optimization

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Memory Optimization Matters
- Assignment vs Copy
- Shallow Copy
- Deep Copy
- Mutable Object Pitfalls
- Memory Profiling
- Measuring Object Size
- Efficient Memory Usage
- Optimization Techniques
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're moving to a new house.

You have two choices.

Option 1

Borrow your friend's house keys.

```text
Friend's House

↓

You Use Same House
```

Option 2

Build an entirely new house.

```text
Friend's House

↓

Build New House

↓

Independent Houses
```

Python copying works exactly like this.

Sometimes,

you only copy the **reference**.

Sometimes,

you copy the **entire object**.

Understanding the difference is one of the most important Python interview topics.

---

# Story — Photocopy

Imagine a book.

You have three choices.

```text
Original Book

↓

Share Same Book

--------------------

Photocopy Cover Only

--------------------

Photocopy Entire Book
```

These correspond to

```text
Assignment

↓

Shallow Copy

↓

Deep Copy
```

---

# Why Memory Optimization?

Suppose you're processing

```text
10 Million Rows
```

If every unnecessary object occupies memory,

your program becomes

- Slower
- Larger
- Less Efficient

Memory optimization helps applications

- Run Faster
- Consume Less RAM
- Scale Better

---

# Assignment

Example

```python
a = [1,2,3]

b = a
```

Visualization

```text
a

↓

List

↑

b
```

Only one list exists.

Both variables point to it.

---

# Problem

```python
a = [1,2]

b = a

b.append(3)

print(a)
```

Output

```text
[1,2,3]
```

Why?

Because

```text
a

↓

Same List

↑

b
```

No copy was created.

---

# Copying Objects

Python provides

```python
copy
```

module.

```python
import copy
```

It supports

```text
Shallow Copy

↓

Deep Copy
```

---

# Shallow Copy

A shallow copy creates

```text
New Outer Object

↓

Same Inner Objects
```

Example

```python
import copy

a = [

    [1,2],

    [3,4]

]

b = copy.copy(a)
```

Visualization

```text
a

↓

Outer List

↓

Inner List

---------------------

b

↓

New Outer List

↓

Same Inner List
```

---

# Example

```python
import copy

a = [

    [1],

    [2]

]

b = copy.copy(a)

b[0].append(100)

print(a)
```

Output

```text
[[1,100],[2]]
```

The inner list is shared.

---

# Deep Copy

Deep Copy duplicates

everything.

```text
Outer Object

↓

Inner Objects

↓

Nested Objects
```

Everything becomes independent.

---

# Example

```python
import copy

a = [

    [1],

    [2]

]

b = copy.deepcopy(a)

b[0].append(100)

print(a)
```

Output

```text
[[1],[2]]
```

The original remains unchanged.

---

# Visualization

Assignment

```text
a

↓

Object

↑

b
```

---

Shallow Copy

```text
a

↓

Outer List

↓

Shared Inner List

----------------

b

↓

New Outer List

↓

Shared Inner List
```

---

Deep Copy

```text
a

↓

Outer

↓

Inner

-----------------

b

↓

New Outer

↓

New Inner
```

Everything is copied.

---

# When to Use Each?

## Assignment

Use when

```text
Sharing

is

Desired
```

---

## Shallow Copy

Use when

```text
Nested Objects

Need NOT

Be Copied
```

---

## Deep Copy

Use when

```text
Complete Independence

is Required
```

---

# Measuring Memory

Python provides

```python
sys.getsizeof()
```

Example

```python
import sys

numbers = [1,2,3]

print(

sys.getsizeof(numbers)

)
```

Output

```text
88
```

(Size depends on Python version.)

---

# Important Note

`sys.getsizeof()`

only measures

the outer object.

It does **not**

include the memory used by nested objects.

---

# Memory Profiling

Memory profiling helps answer questions like

```text
Which Object

Uses

Most Memory?
```

Useful tools include

```text
memory_profiler

↓

tracemalloc

↓

objgraph
```

These are commonly used in production debugging.

---

# tracemalloc

Python provides a built-in module.

```python
import tracemalloc

tracemalloc.start()
```

It tracks memory allocations.

Useful for finding memory leaks.

---

# Memory-Efficient Coding

Instead of

```python
numbers = []

for i in range(1000000):

    numbers.append(i)
```

Use

```python
numbers = range(1000000)
```

or generators whenever possible.

Lazy evaluation saves memory.

---

# Use Generators

Instead of

```python
[x*x for x in range(1000000)]
```

Use

```python
(x*x for x in range(1000000))
```

Lists store everything.

Generators produce values one at a time.

---

# Use Appropriate Data Structures

Choose the right collection.

```text
Need Fast Lookup

↓

Set

----------------

Need Key-Value

↓

Dictionary

----------------

Need Ordered Data

↓

List
```

Good choices reduce both memory usage and execution time.

---

# __slots__ Revisited

Earlier,

you learned

```python
__slots__
```

Instead of

```text
Object

↓

Dictionary

↓

Attributes
```

Python stores

```text
Fixed Attributes
```

saving memory for millions of objects.

---

# Avoid Unnecessary Copies

Bad

```python
new_list = old_list[:]
```

when

sharing

is sufficient.

Every unnecessary copy consumes memory.

---

# Real-World Example

Imagine an image processing application.

```text
Original Image

↓

Deep Copy

↓

Edit Image

↓

Original Safe
```

Whereas

```text
Assignment

↓

Edit

↓

Original Also Changes
```

Choosing the wrong copy type can introduce subtle bugs.

---

# Memory Optimization Checklist

```text
✓ Use Generators

✓ Avoid Large Temporary Lists

✓ Choose Correct Data Structures

✓ Use __slots__

✓ Avoid Unnecessary Copies

✓ Profile Before Optimizing
```

---

# Memory Trick

Remember

```text
ASD
```

**A**

Assignment

↓

**S**

Shallow Copy

↓

**D**

Deep Copy

And remember

```text
Same

↓

Outer

↓

Everything
```

Assignment → Same Object

Shallow → New Outer Object

Deep → Everything New

---

# Common Beginner Mistakes

### Mistake 1

Assuming

```python
b = a
```

creates a copy.

It only creates another reference.

---

### Mistake 2

Using shallow copy for nested objects.

Nested mutable objects remain shared,

which can lead to unexpected modifications.

---

### Mistake 3

Using deep copy everywhere.

Deep copying large object graphs is expensive in both time and memory.

Only use it when complete independence is required.

---

### Mistake 4

Optimizing without measuring.

Always profile memory before making optimizations.

Premature optimization often complicates code without meaningful benefits.

---

# Interview Questions & Answers

## Q1. What is the difference between Assignment, Shallow Copy, and Deep Copy?

### Answer

**Assignment**

creates another reference to the same object.

**Shallow Copy**

creates a new outer object,

but nested objects are shared.

**Deep Copy**

creates completely independent copies of the object and all nested objects.

---

## Q2. When should you use Deep Copy?

### Answer

Use deep copy when nested mutable objects must be completely independent,

such as when modifying complex data structures without affecting the original.

---

## Q3. What does `sys.getsizeof()` do?

### Answer

It returns the memory size of an object in bytes.

However,

it measures only the object itself,

not the memory consumed by nested objects.

---

## Q4. How can you optimize memory usage in Python?

### Answer

Common techniques include:

- Using generators instead of large lists
- Choosing appropriate data structures
- Avoiding unnecessary copies
- Using `__slots__` for many objects
- Profiling memory usage before optimizing

---

## Q5. What tools can be used for memory profiling?

### Answer

Popular tools include:

- `tracemalloc` (built into Python)
- `memory_profiler`
- `objgraph`

These tools help identify memory leaks and large allocations.

---

# Chapter Summary / Cheat Sheet

| Concept | Meaning |
|----------|----------|
| Assignment | New reference to same object |
| Shallow Copy | New outer object, shared inner objects |
| Deep Copy | Complete independent copy |
| `copy.copy()` | Shallow copy |
| `copy.deepcopy()` | Deep copy |
| `sys.getsizeof()` | Size of an object |
| `tracemalloc` | Track memory allocations |
| Generators | Memory-efficient iteration |
| `__slots__` | Reduce object memory usage |

---

# Module 12 Complete ✅

You have now mastered Python Memory Management:

- Python Memory Model
- Stack vs Heap
- References
- Object Identity
- Mutable vs Immutable Objects
- Reference Counting
- Garbage Collection
- Circular References
- `gc` Module
- Assignment vs Copy
- Shallow Copy
- Deep Copy
- Memory Profiling
- Memory Optimization Techniques

These concepts are essential for writing efficient Python programs, debugging memory-related issues, and succeeding in advanced Python interviews.

---

# What's Next?

In **Module 13 — Testing & Debugging**, you'll learn how professional Python developers ensure software quality:

- Unit Testing with `unittest`
- Testing with `pytest`
- Debugging using `pdb`
- Assertions
- Logging
- Mocking
- Code Coverage

Testing is a fundamental skill for production software development and is widely used in industry.