# Module 9 — Advanced Python

# Chapter 22 — Iterators & Generators

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Iterators are Needed
- Iterable vs Iterator
- Iterator Protocol
- `iter()` and `next()`
- Custom Iterators
- What are Generators?
- `yield` Keyword
- Generator Expressions
- Iterator vs Generator
- Lazy Evaluation
- Memory Optimization
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine Netflix.

Does Netflix download every movie to your device before you start watching?

No.

Instead,

it streams one small portion at a time.

```text
Movie

↓

Chunk

↓

Chunk

↓

Chunk

↓

Watch
```

Python works similarly.

Instead of loading all data into memory,

it can generate data **only when needed**.

This idea forms the basis of **Iterators** and **Generators**.

---

# Story — Book Library

Imagine a library with one million books.

Option 1

```text
Bring Every Book

↓

Read One

↓

Waste Memory
```

Option 2

```text
Ask Librarian

↓

Receive One Book

↓

Read

↓

Request Next
```

Which is smarter?

Obviously the second.

Python Iterators work exactly like the librarian.

---

# Why Iterators?

Suppose we have

```python
numbers = [1,2,3,4,5]
```

When we write

```python
for number in numbers:

    print(number)
```

How does Python know

which number comes next?

Internally,

Python converts the list into an **Iterator**.

---

# What is an Iterable?

An **Iterable** is any object that can be traversed one element at a time.

Examples

```python
list

tuple

set

dictionary

string

range
```

Visualization

```text
Iterable

↓

Can Create Iterator
```

---

# What is an Iterator?

An **Iterator** is an object that remembers:

- Current Position
- Next Element

Visualization

```text
Iterator

↓

Current Position

↓

Next Element

↓

Next Element

↓

...
```

Unlike a list,

an iterator doesn't expose all elements at once.

---

# Iterable vs Iterator

| Iterable | Iterator |
|-----------|----------|
| Collection of data | Object that traverses data |
| Can create an iterator | Produces one value at a time |
| Example: List | Example: `list_iterator` |

---

# Creating an Iterator

Python provides

```python
iter()
```

Example

```python
numbers = [10,20,30]

iterator = iter(numbers)
```

Now

```python
print(next(iterator))
```

Output

```text
10
```

Calling again

```python
print(next(iterator))
```

Output

```text
20
```

---

# next()

Every call to

```python
next()
```

moves the iterator forward.

Visualization

```text
Iterator

↓

10

↓

20

↓

30

↓

Stop
```

---

# What Happens at the End?

Example

```python
numbers = [1]

iterator = iter(numbers)

print(next(iterator))

print(next(iterator))
```

Output

```text
1

StopIteration
```

The iterator signals that no more values exist.

---

# Iterator Protocol

For an object to behave like an iterator,

it must implement two methods.

```python
__iter__()

__next__()
```

These methods define the **Iterator Protocol**.

---

# Custom Iterator

Example

```python
class Counter:

    def __init__(self):

        self.value = 1

    def __iter__(self):

        return self

    def __next__(self):

        if self.value > 5:

            raise StopIteration

        number = self.value

        self.value += 1

        return number
```

Using

```python
counter = Counter()

for number in counter:

    print(number)
```

Output

```text
1

2

3

4

5
```

---

# Why Custom Iterators?

Useful for

- Reading Huge Files
- Database Records
- Network Streams
- Infinite Sequences

Instead of loading everything,

generate one item at a time.

---

# Generators

Writing custom iterators requires implementing

```python
__iter__()

__next__()
```

Python provides an easier solution.

Generators.

---

# What is a Generator?

A **Generator** is a special function that produces values one at a time using

```python
yield
```

instead of

```python
return
```

---

# return vs yield

Normal Function

```python
def numbers():

    return [1,2,3]
```

Everything is returned together.

---

Generator

```python
def numbers():

    yield 1

    yield 2

    yield 3
```

Values are produced one by one.

---

# First Generator

```python
def count():

    yield 1

    yield 2

    yield 3
```

Calling

```python
g = count()

print(next(g))

print(next(g))

print(next(g))
```

Output

```text
1

2

3
```

---

# How yield Works

Unlike

```python
return
```

which ends the function,

```python
yield
```

pauses execution.

Visualization

```text
yield 1

↓

Pause

↓

Resume

↓

yield 2

↓

Pause

↓

Resume
```

The function remembers its previous state.

---

# Internal Flow

```text
Generator

↓

yield

↓

Pause

↓

next()

↓

Resume

↓

yield

↓

Pause
```

---

# Generator Example

Suppose we need squares.

```python
def squares():

    for i in range(5):

        yield i*i
```

Using

```python
for number in squares():

    print(number)
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

# Generator Expressions

Just like list comprehensions,

Python provides generator expressions.

List

```python
numbers = [

x*x

for x in range(5)

]
```

Generator

```python
numbers = (

x*x

for x in range(5)

)
```

Notice

```text
[]

↓

List

----------------

()

↓

Generator
```

---

# Memory Difference

List

```python
numbers = [

x

for x in range(1000000)

]
```

Python stores **every element**.

Generator

```python
numbers = (

x

for x in range(1000000)

)
```

Python generates values only when requested.

Huge memory savings.

---

# Lazy Evaluation

Generators follow **Lazy Evaluation**.

Meaning

```text
Generate

↓

Only When Needed
```

Example

```python
def infinite():

    n = 1

    while True:

        yield n

        n += 1
```

Python doesn't generate infinite numbers immediately.

It generates only the next requested value.

---

# Iterator vs Generator

| Iterator | Generator |
|-----------|-----------|
| Implements `__iter__()` and `__next__()` | Uses `yield` |
| More code | Less code |
| Manual state management | Automatic state management |
| More flexible | Easier to write |

---

# Real-World Examples

## Reading Large Files

Instead of

```python
file.readlines()
```

Use

```python
for line in file:
```

Only one line stays in memory.

---

## Streaming Data

```text
Sensor

↓

Value

↓

Value

↓

Value
```

Generators efficiently process continuous streams.

---

## Infinite Sequences

```python
def even_numbers():

    n = 0

    while True:

        yield n

        n += 2
```

Useful for simulations and pipelines.

---

# Memory Trick

Remember

```text
IGN
```

**I**

Iterator

↓

**G**

Generator

↓

**N**

next()

And remember

```text
yield

↓

Pause

↓

Resume
```

---

# Common Beginner Mistakes

### Mistake 1

Confusing

```python
return
```

with

```python
yield
```

`return`

↓

Ends Function

`yield`

↓

Pauses Function

---

### Mistake 2

Trying to reuse an exhausted generator.

Once consumed,

a generator cannot be restarted.

Create a new generator object.

---

### Mistake 3

Using lists for huge datasets.

Prefer generators whenever data can be processed one item at a time.

---

### Mistake 4

Calling

```python
next()
```

after exhaustion.

Raises

```text
StopIteration
```

---

# Interview Questions & Answers

## Q1. What is the difference between an Iterable and an Iterator?

### Answer

An **Iterable** is a collection that can produce an iterator.

An **Iterator** is an object that produces one value at a time and remembers its current position.

Examples

- List → Iterable
- `list_iterator` → Iterator

---

## Q2. What is a Generator?

### Answer

A generator is a special function that uses the `yield` keyword to produce values one at a time.

It supports lazy evaluation and is memory efficient.

---

## Q3. What is the difference between `return` and `yield`?

### Answer

`return`

- Ends the function
- Returns one final value

`yield`

- Pauses the function
- Preserves its state
- Produces multiple values over time

---

## Q4. Why are generators memory efficient?

### Answer

Generators do not store all values in memory.

They generate values only when requested.

This makes them ideal for processing large files, streams, or infinite sequences.

---

## Q5. When should you use a Generator instead of a List?

### Answer

Use a generator when:

- Processing large datasets
- Reading files line by line
- Streaming data
- Producing infinite sequences
- Memory efficiency is important

Use a list when you need random access or repeated traversal.

---

# Chapter Summary / Cheat Sheet

| Concept | Purpose |
|----------|----------|
| Iterable | Can produce an iterator |
| Iterator | Produces one value at a time |
| `iter()` | Creates an iterator |
| `next()` | Retrieves the next value |
| Generator | Function using `yield` |
| `yield` | Pause and resume execution |
| Generator Expression | Lazy version of list comprehension |

---

# What's Next?

In **Chapter 23 — Decorators & Context Managers**, you'll learn two of Python's most powerful features used extensively in frameworks like **Flask, FastAPI, Django, and PyTorch**:

- Decorators
- First-Class Functions (Revisited)
- Closures (Deep Dive)
- Function Wrapping
- Context Managers
- `with` Statement Internals
- Creating Custom Context Managers

These concepts are considered **advanced Python** and are frequently asked in senior Python interviews.