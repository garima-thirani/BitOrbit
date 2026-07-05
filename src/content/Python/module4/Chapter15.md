# Module 4 — Python Collections

# Chapter 15 — Collections Module

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why the `collections` module exists
- What problems it solves
- Counter
- defaultdict
- deque
- OrderedDict
- namedtuple
- When to use each data structure
- Common mistakes
- Interview Questions & Answers

---

# Introduction

Python already provides powerful collections like

- List
- Tuple
- Set
- Dictionary

But what if you need something more specialized?

Imagine you own a supermarket.

Instead of keeping every item in one big basket,

you organize them into special containers.

```text
Coins

↓

Coin Tray

-----------------

Vegetables

↓

Vegetable Rack

-----------------

Frozen Food

↓

Freezer
```

Each container is optimized for a specific purpose.

Python's **collections** module provides these specialized containers.

---

# Story — A Modern Toolbox

Imagine a carpenter.

He owns

```text
Hammer

Screwdriver

Saw

Drill
```

Technically,

he could build everything using only a hammer.

But that would be inefficient.

Instead,

he chooses the right tool.

Python's `collections` module follows the same philosophy.

Instead of forcing everything into a list or dictionary,

it provides specialized data structures for specialized tasks.

---

# Why collections?

Suppose you're counting words.

Without Counter

```python
words = [

    "apple",

    "banana",

    "apple",

    "orange",

    "banana",

    "apple"

]

frequency = {}

for word in words:

    if word in frequency:

        frequency[word] += 1

    else:

        frequency[word] = 1
```

Lots of code.

Python provides a much easier solution.

---

# Overview of collections

```text
collections

│

├── Counter

├── defaultdict

├── deque

├── OrderedDict

└── namedtuple
```

Each solves a specific problem.

---

# Counter

A **Counter** counts how many times each element appears.

Think of it as an automatic frequency table.

---

## Example

```python
from collections import Counter

fruits = [

    "apple",

    "banana",

    "apple",

    "orange",

    "apple"

]

counter = Counter(fruits)

print(counter)
```

Output

```text
Counter({

'apple': 3,

'banana': 1,

'orange': 1

})
```

---

# Internal Visualization

```text
apple

↓

Count = 3

----------------

banana

↓

Count = 1

----------------

orange

↓

Count = 1
```

---

# Most Common Elements

```python
counter.most_common(2)
```

Output

```text
[('apple', 3),

 ('banana', 1)]
```

Very useful in interviews.

---

# Real-World Uses of Counter

- Word Frequency
- Log Analysis
- Voting Systems
- Inventory Count
- Character Frequency

---

# defaultdict

Suppose you write

```python
marks = {}

marks["Alice"].append(95)
```

Output

```text
KeyError
```

The key doesn't exist.

---

# Solution

```python
from collections import defaultdict

marks = defaultdict(list)

marks["Alice"].append(95)

print(marks)
```

Output

```text
defaultdict(

list,

{'Alice': [95]}

)
```

No KeyError.

---

# How defaultdict Works

Whenever a missing key is accessed,

it automatically creates a default value.

Visualization

```text
Missing Key

↓

Create Empty List

↓

Append Value
```

---

# Common Default Factories

```python
defaultdict(int)

↓

0

----------------

defaultdict(list)

↓

[]

----------------

defaultdict(set)

↓

set()
```

---

# deque

Pronounced

```text
Deck
```

It stands for

```text
Double Ended Queue
```

Unlike lists,

you can efficiently add or remove elements from both ends.

---

# Example

```python
from collections import deque

queue = deque()

queue.append(1)

queue.append(2)

queue.appendleft(0)

print(queue)
```

Output

```text
deque([0,1,2])
```

---

# Removing Elements

Right side

```python
queue.pop()
```

Left side

```python
queue.popleft()
```

---

# Visualization

```text
Front

↓

0

1

2

↓

Back
```

Operations are fast at both ends.

---

# Why Not Use a List?

Suppose

```python
numbers.pop(0)
```

Python shifts every remaining element.

Time Complexity

```text
O(n)
```

deque

```python
queue.popleft()
```

Time Complexity

```text
O(1)
```

Much faster.

---

# Real-World Uses of deque

- Browser History
- Undo/Redo
- BFS Algorithm
- Task Scheduling
- Sliding Window Problems

---

# OrderedDict

Before Python 3.7,

normal dictionaries did **not guarantee insertion order**.

OrderedDict solved this.

Example

```python
from collections import OrderedDict

data = OrderedDict()

data["A"] = 1

data["B"] = 2
```

Items remained in insertion order.

---

# Is OrderedDict Still Needed?

Since Python 3.7,

regular dictionaries preserve insertion order.

So today,

OrderedDict is mainly useful when you need

special ordering operations like

```python
move_to_end()
```

or compatibility with older code.

---

# namedtuple

Suppose we store

```python
student = (

"Alice",

21,

95
)
```

Which value represents age?

Hard to remember.

Instead,

give names.

---

# Example

```python
from collections import namedtuple

Student = namedtuple(

"Student",

["name",

 "age",

 "marks"]

)

s = Student(

"Alice",

21,

95

)

print(s.name)
```

Output

```text
Alice
```

Much more readable.

---

# Tuple vs namedtuple

Tuple

```python
student[2]
```

namedtuple

```python
student.marks
```

Clearly better.

---

# Comparison

| Collection | Best Use |
|------------|----------|
| Counter | Counting |
| defaultdict | Missing keys |
| deque | Fast queue |
| OrderedDict | Ordered dictionary operations |
| namedtuple | Lightweight objects |

---

# Real-World Example

Imagine YouTube Analytics.

```text
Video Views

↓

Counter

------------------

User Queues

↓

deque

------------------

Grouped Comments

↓

defaultdict

------------------

User Record

↓

namedtuple
```

Different tools solve different problems.

---

# Memory Trick

Remember

```text
CDDON
```

Pronounce it

> **"See-Don"**

```text
C

Counter

↓

D

defaultdict

↓

D

deque

↓

O

OrderedDict

↓

N

namedtuple
```

---

# Common Beginner Mistakes

### Mistake 1

Using Counter for sorting.

Counter counts elements.

It is **not** a sorting structure.

---

### Mistake 2

Using a list as a queue.

Prefer

```python
deque
```

because front operations are O(1).

---

### Mistake 3

Thinking defaultdict stores default values permanently.

A default value is created **only when a missing key is accessed**.

---

### Mistake 4

Using OrderedDict unnecessarily.

Modern dictionaries already preserve insertion order.

---

# Interview Questions & Answers

## Q1. What is Counter?

### Answer

Counter is a dictionary subclass used to count the frequency of hashable objects.

Example

```python
Counter("banana")
```

Output

```text
{

'b':1,

'a':3,

'n':2

}
```

---

## Q2. Why use defaultdict?

### Answer

defaultdict automatically creates a default value for missing keys,

eliminating the need for manual checks.

This simplifies grouping and counting operations.

---

## Q3. Why is deque faster than a list for queues?

### Answer

Removing from the front of a list requires shifting all remaining elements,

which is **O(n)**.

deque performs insertion and deletion at both ends in **O(1)** time.

---

## Q4. Is OrderedDict still useful?

### Answer

Yes,

although normal dictionaries preserve insertion order in Python 3.7+,

OrderedDict provides additional ordering methods such as

```python
move_to_end()
```

and is useful when those features are required.

---

## Q5. Why use namedtuple instead of a tuple?

### Answer

namedtuple gives meaningful field names.

Instead of

```python
student[2]
```

you can write

```python
student.marks
```

This improves readability while remaining lightweight and immutable.

---

# Chapter Summary / Cheat Sheet

| Collection | Purpose |
|------------|----------|
| Counter | Count frequencies |
| defaultdict | Automatic default values |
| deque | Fast queue/deque |
| OrderedDict | Ordered dictionary operations |
| namedtuple | Named immutable tuple |

---

# What's Next?

In **Chapter 16 — Choosing the Right Collection**, you'll learn how to choose between Python's built-in collections using:

- List vs Tuple
- Set vs Dictionary
- Time Complexities
- Memory Usage
- Real-world Decision Making
- Interview Questions

This chapter will tie together everything you've learned in **Module 4**.