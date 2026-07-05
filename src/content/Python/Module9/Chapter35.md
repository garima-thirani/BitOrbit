# Module 9 — Advanced Python

# Chapter 35 — Modern Python

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Modern Python?
- Type Hinting
- Static Type Checking
- Protocols
- Duck Typing vs Protocols
- Generics
- TypeVar
- `functools`
- `itertools`
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're constructing a skyscraper.

The architect doesn't simply say

```text
Build It.
```

Instead,

every blueprint specifies

- Material
- Dimensions
- Weight Capacity
- Safety Standards

The clearer the blueprint,

the fewer the mistakes.

Modern Python follows the same philosophy.

Earlier Python focused mainly on flexibility.

Modern Python also emphasizes

- Readability
- Maintainability
- Type Safety
- Developer Productivity

To achieve this,

Python introduced

- Type Hinting
- Protocols
- Generics

and powerful utility modules like

- functools
- itertools

---

# Story — GPS Navigation

Imagine driving without GPS.

You eventually reach your destination,

but mistakes are common.

Now imagine using GPS.

```text
Destination

↓

Route

↓

Warnings

↓

Arrival
```

The GPS doesn't drive the car.

It simply helps you avoid mistakes.

Type Hinting works exactly the same way.

Python still runs dynamically,

but developers receive guidance before mistakes happen.

---

# Why Modern Python?

Large applications often contain

```text
100

↓

1000

↓

100000
```

lines of code.

Without clear information,

understanding code becomes difficult.

Modern Python helps by making code

- Easier to read
- Easier to maintain
- Easier to debug

---

# Type Hinting

Type Hinting allows us to specify

what type of data is expected.

Example

```python
def add(

    a: int,

    b: int

) -> int:

    return a + b
```

Here,

Python understands

```text
a

↓

Integer

----------------

b

↓

Integer

----------------

Returns

↓

Integer
```

---

# Does Python Enforce Types?

No.

Example

```python
def add(

    a: int,

    b: int

) -> int:

    return a + b

print(

add(

"5",

"6"

)

)
```

Output

```text
56
```

Python still executes the code.

Type hints are **not enforced at runtime**.

They help

- Developers
- IDEs
- Static Type Checkers

---

# Why Type Hinting?

Imagine reading

```python
process(data)
```

Question

What is

```python
data
```

A list?

Dictionary?

String?

No idea.

Now

```python
def process(

    data: list[str]

)
```

Everything becomes clear.

---

# Common Type Hints

| Type | Example |
|--------|----------|
| `int` | Whole Numbers |
| `float` | Decimal Numbers |
| `str` | Text |
| `bool` | True / False |
| `list[int]` | List of Integers |
| `dict[str, int]` | Dictionary |
| `tuple[int, int]` | Tuple |
| `set[str]` | Set |

---

# Static Type Checking

Python itself ignores type hints.

External tools like

```text
mypy

Pyright

PyCharm

VS Code
```

analyze your code

before execution.

Example

```python
def square(

    x: int

) -> int:

    return x * x

square("Hello")
```

A type checker reports this as an error before the program runs.

---

# Duck Typing

Python traditionally follows

```text
"If it walks like a duck,

and quacks like a duck,

it's a duck."
```

Meaning

behavior matters,

not inheritance.

Example

```python
class Dog:

    def speak(self):

        print("Bark")

class Human:

    def speak(self):

        print("Hello")
```

Both work with

```python
obj.speak()
```

---

# The Problem with Duck Typing

Imagine

```python
class Rock:

    pass
```

Calling

```python
rock.speak()
```

fails only at runtime.

Large applications benefit from earlier error detection.

---

# Protocols

Protocols describe

**what an object can do**

instead of

**what it inherits from**.

They support structural typing.

---

# Example

```python
from typing import Protocol

class Speaker(Protocol):

    def speak(self) -> None:

        ...
```

Now,

any class implementing

```python
speak()
```

matches the protocol,

even without inheritance.

---

# Why Protocols?

Instead of asking

```text
Is it a Dog?
```

Protocols ask

```text
Can it Speak?
```

Behavior becomes more important than inheritance.

---

# Generics

Suppose you write

```python
class Box:
```

Should it store

- Integers?
- Strings?
- Students?

Instead of creating

```text
IntBox

StringBox

StudentBox
```

Generics allow one reusable class.

---

# TypeVar

Python provides

```python
TypeVar
```

for creating generic code.

Example

```python
from typing import TypeVar

T = TypeVar("T")
```

Now

```python
T
```

can represent any type.

---

# Generic Function

```python
from typing import TypeVar

T = TypeVar("T")

def first(

    items: list[T]

) -> T:

    return items[0]
```

This function works for

```python
list[int]

list[str]

list[Student]
```

without rewriting it.

---

# Generic Class

```python
from typing import Generic, TypeVar

T = TypeVar("T")

class Box(Generic[T]):

    def __init__(

        self,

        value: T

    ):

        self.value = value
```

Usage

```python
Box[int]

Box[str]
```

One class.

Many data types.

---

# functools

The

```python
functools
```

module provides utilities for working with functions.

Some of the most useful ones are

- `lru_cache`
- `partial`
- `reduce`
- `wraps`

---

# lru_cache

Imagine calculating

```text
Fibonacci(40)
```

again and again.

Instead of recalculating,

store previous results.

Example

```python
from functools import lru_cache

@lru_cache

def fibonacci(n):

    ...
```

This is called **Memoization**.

Performance improves dramatically.

---

# wraps

Suppose you write a decorator.

Without

```python
@wraps
```

the decorated function loses its original name and documentation.

Example

```python
from functools import wraps
```

This preserves

- Function Name
- Docstring
- Metadata

A best practice for writing decorators.

---

# partial

Suppose

```python
power(base, exponent)
```

You frequently call

```python
power(x, 2)
```

Create a specialized function.

```python
from functools import partial

square = partial(

power,

exponent=2
)
```

Now

```python
square(5)
```

is easier to use.

---

# itertools

Imagine generating

```text
1

2

3

...

1 Billion
```

Should Python create

one billion numbers immediately?

No.

Instead,

generate them one at a time.

That's the philosophy behind

```python
itertools
```

---

# Common itertools Functions

| Function | Purpose |
|-----------|----------|
| `count()` | Infinite Counting |
| `cycle()` | Infinite Repetition |
| `repeat()` | Repeat Value |
| `chain()` | Combine Iterables |
| `product()` | Cartesian Product |
| `permutations()` | All Permutations |
| `combinations()` | All Combinations |

---

# Example

```python
from itertools import count

counter = count(1)

print(next(counter))

print(next(counter))
```

Output

```text
1

2
```

The numbers are generated only when needed.

---

# chain()

Example

```python
from itertools import chain

numbers = chain(

[1,2],

[3,4]

)

print(list(numbers))
```

Output

```text
[1,2,3,4]
```

---

# combinations()

Example

```python
from itertools import combinations

items = [1,2,3]

print(

list(

combinations(

items,

2

)

)

)
```

Output

```text
[(1,2),

(1,3),

(2,3)]
```

Widely used in interview problems.

---

# Real-World Example

Imagine an AI application.

```text
Function Parameters

↓

Type Hints

----------------

Plugin System

↓

Protocols

----------------

Reusable Models

↓

Generics

----------------

Caching

↓

lru_cache

----------------

Data Pipelines

↓

itertools
```

These features are commonly used together in production systems.

---

# Memory Trick

Remember

```text
TPGFI
```

**T**

Type Hinting

↓

**P**

Protocols

↓

**G**

Generics

↓

**F**

functools

↓

**I**

itertools

Or remember

```text
Readable

↓

Flexible

↓

Reusable

↓

Efficient
```

---

# Common Beginner Mistakes

### Mistake 1

Thinking type hints change Python into a statically typed language.

They do not.

They provide documentation and enable static analysis,

but Python remains dynamically typed.

---

### Mistake 2

Using inheritance when a protocol is sufficient.

If only behavior matters,

Protocols often provide a cleaner solution.

---

### Mistake 3

Ignoring

```python
@wraps
```

inside decorators.

Without it,

function metadata is lost,

making debugging harder.

---

### Mistake 4

Converting every iterator into a list immediately.

Example

```python
list(counter)
```

This defeats the lazy evaluation benefits of iterators.

---

# Interview Questions & Answers

## Q1. What are Type Hints?

### Answer

Type hints are annotations that describe the expected types of variables,

parameters,

and return values.

They improve readability and enable static type checking,

but are not enforced at runtime.

---

## Q2. What is a Protocol?

### Answer

A Protocol defines a required set of methods or attributes.

Any class that satisfies those requirements matches the protocol,

even without inheritance.

This is known as **structural typing**.

---

## Q3. What are Generics?

### Answer

Generics allow classes and functions to work with multiple data types while preserving type information.

They reduce code duplication and improve type safety.

---

## Q4. What is `functools.lru_cache`?

### Answer

`lru_cache` caches the results of function calls.

When the same arguments are used again,

the cached result is returned instead of recomputing it.

This significantly improves performance for expensive computations.

---

## Q5. What is `itertools`?

### Answer

`itertools` is a standard Python module that provides efficient iterator-building tools.

It enables lazy evaluation,

reduces memory usage,

and simplifies complex iteration patterns.

---

# Chapter Summary / Cheat Sheet

| Feature | Purpose |
|----------|----------|
| Type Hinting | Improve readability & static analysis |
| Protocol | Structural typing |
| Generic | Reusable typed classes/functions |
| TypeVar | Generic placeholder type |
| `lru_cache` | Memoization |
| `wraps` | Preserve decorator metadata |
| `partial` | Create specialized functions |
| `count()` | Infinite iterator |
| `chain()` | Combine iterables |
| `combinations()` | Generate combinations |

---

# Module 9 Complete ✅

You have now mastered Advanced Python:

- Iterators & Generators
- Decorators
- Context Managers
- Properties & Descriptors
- Type Hinting
- Protocols
- Generics
- `functools`
- `itertools`

These topics are widely used in production-grade Python applications, open-source libraries, frameworks such as FastAPI and Django, and are common in senior Python interviews.

---

# What's Next?

In **Module 10 — Modules & Packages**, you'll learn how Python projects are organized and distributed:

- Modules
- Import System
- Creating Modules
- Packages
- Virtual Environments
- `pip`
- Poetry
- `requirements.txt`
- Project Structure
- Publishing Packages

These concepts are essential for building scalable Python applications and collaborating on real-world projects.