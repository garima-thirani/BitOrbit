# Module 12 — Memory Management

# Chapter 44 — Garbage Collection

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Garbage Collection is Needed
- What is Garbage?
- Reference Counting
- Reference Count Changes
- Circular References
- Python Garbage Collector
- The `gc` Module
- Manual Garbage Collection
- Weak References (Introduction)
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're cleaning your bedroom.

Every day,

you buy new things.

```text
Books

↓

Pens

↓

Bottles

↓

Boxes
```

After a few weeks,

your room becomes crowded.

Some items are no longer useful.

What do you do?

```text
Throw Them Away
```

Computers have the same problem.

Programs continuously create objects.

If unused objects are never removed,

memory eventually becomes full.

Python solves this automatically using **Garbage Collection**.

---

# Story — Library Books

Imagine a library.

Books are borrowed every day.

```text
Borrow

↓

Read

↓

Return

↓

Shelf
```

Suppose someone loses interest in a book.

Nobody is using it anymore.

The librarian puts it back on the shelf.

Python's Garbage Collector works like that librarian.

Unused objects are automatically cleaned.

---

# Why Garbage Collection?

Suppose you write

```python
numbers = [1,2,3]
```

Python creates

```text
List Object

↓

Heap Memory
```

Later,

```python
numbers = None
```

Now,

no variable points to the list.

The list has become

```text
Garbage
```

It should be removed.

---

# What is Garbage?

Garbage is

> **An object that is no longer reachable by the program.**

Visualization

```text
Object

↓

No References

↓

Garbage

↓

Memory Reclaimed
```

---

# Reference Counting

Python's primary memory management technique is

```text
Reference Counting
```

Every object stores

```text
Reference Count
```

Whenever a variable points to an object,

its count increases.

Whenever a reference disappears,

its count decreases.

---

# Example

```python
x = [1,2]
```

Visualization

```text
x

↓

List

Reference Count = 1
```

---

# Adding Another Reference

```python
x = [1,2]

y = x
```

Visualization

```text
x

↓

List

↑

y

Reference Count = 2
```

Now,

two variables point to the same object.

---

# Removing a Reference

```python
x = [1,2]

y = x

x = None
```

Visualization

```text
y

↓

List

Reference Count = 1
```

The object still exists,

because

```python
y
```

references it.

---

# Object Deletion

Suppose

```python
x = [1,2]

y = x

x = None

y = None
```

Visualization

```text
Reference Count

↓

0

↓

Object Deleted
```

Python immediately frees the memory.

---

# Reference Count Lifecycle

```text
Create Object

↓

Count = 1

↓

More References

↓

Count++

↓

References Removed

↓

Count--

↓

Count = 0

↓

Object Destroyed
```

---

# Checking Reference Count

Python provides

```python
sys.getrefcount()
```

Example

```python
import sys

numbers = [1,2]

print(

sys.getrefcount(numbers)

)
```

This shows the current reference count.

> **Note:** The returned value is usually **one higher** than expected because `getrefcount()` temporarily creates its own reference while checking.

---

# The Problem

Reference Counting is fast.

But it has one weakness.

```text
Circular References
```

---

# Circular References

Imagine two friends.

```text
Alice

↓

Bob

↑
```

Each one points to the other.

Now,

everyone else forgets them.

They still reference each other.

Reference Count never becomes zero.

---

# Example

```python
class Node:

    pass

a = Node()

b = Node()

a.next = b

b.next = a
```

Visualization

```text
a

↓

Node A

↓

Node B

↑
```

Even if

```python
a = None

b = None
```

the objects still reference each other internally.

Reference Counting alone cannot remove them.

---

# Python Garbage Collector

To solve this,

Python includes a second system.

```text
Garbage Collector
```

It periodically searches for

```text
Circular References
```

and removes them.

---

# Two Memory Systems

Python actually uses

```text
Reference Counting

+

Garbage Collector
```

Visualization

```text
Reference Count

↓

Normal Objects

-------------------

Garbage Collector

↓

Circular Objects
```

Both work together.

---

# The gc Module

Python provides

```python
gc
```

to interact with the Garbage Collector.

Example

```python
import gc
```

---

# Collect Garbage Manually

```python
import gc

gc.collect()
```

Python immediately searches for garbage.

Usually,

manual collection is unnecessary.

Python performs it automatically.

---

# Disable Garbage Collection

Example

```python
gc.disable()
```

Useful only in specialized performance scenarios.

---

# Enable Garbage Collection

```python
gc.enable()
```

Turns automatic garbage collection back on.

---

# Check GC Status

```python
gc.isenabled()
```

Returns

```text
True

or

False
```

---

# Weak References (Introduction)

Suppose you want to reference an object

without increasing its reference count.

Python provides

```python
weakref
```

Visualization

```text
Normal Reference

↓

Count++

----------------------

Weak Reference

↓

Count Unchanged
```

Weak references are useful for caches,

observers,

and memory-sensitive applications.

We'll explore them in more advanced system design topics.

---

# Real-World Example

Imagine a web browser.

```text
Open Tab

↓

Create Objects

↓

Close Tab

↓

Unused Objects

↓

Garbage Collector
```

Without garbage collection,

opening and closing many tabs would continuously consume memory.

---

# Memory Visualization

```text
Program Starts

↓

Create Objects

↓

Reference Counting

↓

Reference = 0 ?

↓

Yes

↓

Delete

-----------------------

No

↓

Garbage Collector

↓

Check Circular References

↓

Delete
```

---

# Memory Trick

Remember

```text
RCG
```

**R**

Reference Counting

↓

**C**

Circular References

↓

**G**

Garbage Collector

Or simply remember

```text
Count

↓

Zero?

↓

Delete

↓

Else

↓

GC Checks Later
```

---

# Common Beginner Mistakes

### Mistake 1

Thinking Garbage Collection removes every object.

Most objects are actually deleted immediately through **reference counting**.

The Garbage Collector mainly handles circular references.

---

### Mistake 2

Calling

```python
gc.collect()
```

frequently.

Manual garbage collection is rarely needed.

Python's automatic collector is usually sufficient.

---

### Mistake 3

Ignoring circular references.

Large object graphs with circular references can increase memory usage until the garbage collector runs.

---

### Mistake 4

Confusing

```python
del
```

with object deletion.

Example

```python
del x
```

removes the variable,

not necessarily the object.

If other references still exist,

the object remains alive.

---

# Interview Questions & Answers

## Q1. How does Python manage memory?

### Answer

Python primarily uses **reference counting**.

When an object's reference count becomes zero,

its memory is immediately reclaimed.

To handle objects involved in circular references,

Python also uses a cyclic **Garbage Collector**.

---

## Q2. What is Reference Counting?

### Answer

Reference counting tracks how many variables reference an object.

Each new reference increases the count,

and removing a reference decreases it.

When the count reaches zero,

the object is destroyed.

---

## Q3. Why does Python need a Garbage Collector if it already has Reference Counting?

### Answer

Reference counting cannot detect circular references.

If two or more objects reference each other,

their reference counts never become zero.

The Garbage Collector identifies and removes these unreachable cycles.

---

## Q4. What is the `gc` module?

### Answer

The `gc` module provides functions to inspect and control Python's cyclic garbage collector.

Common functions include

- `gc.collect()`
- `gc.enable()`
- `gc.disable()`
- `gc.isenabled()`

---

## Q5. What is the difference between `del` and Garbage Collection?

### Answer

`del`

removes a reference (such as a variable).

Garbage Collection removes the actual object,

but only when it is no longer reachable.

Deleting a variable does **not** guarantee the object is immediately destroyed if other references still exist.

---

# Chapter Summary / Cheat Sheet

| Concept | Purpose |
|----------|----------|
| Garbage | Unreachable object |
| Reference Count | Number of references to an object |
| Count = 0 | Object immediately destroyed |
| Circular Reference | Objects referencing each other |
| Garbage Collector | Removes unreachable cycles |
| `gc.collect()` | Run garbage collection manually |
| `gc.enable()` | Enable GC |
| `gc.disable()` | Disable GC |
| `del` | Remove a reference, not necessarily the object |

---

# What's Next?

In **Chapter 45 — Memory Optimization**, you'll learn practical techniques for writing memory-efficient Python programs:

- Shallow Copy vs Deep Copy
- Memory Profiling
- Object Size Analysis
- Efficient Data Structures
- Optimization Techniques

These concepts are especially important for handling large datasets, high-performance applications, and production systems.