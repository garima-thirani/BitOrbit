# Module 4 — Python Collections

# Chapter 12 — Lists

---

# Learning Objectives

By the end of this chapter, you will understand:

- What is a List?
- Why Lists are Needed
- Creating Lists
- Accessing Elements
- Indexing
- Negative Indexing
- Slicing
- Updating Lists
- List Methods
- Nested Lists
- List Comprehensions
- Time Complexity
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you own a grocery store.

Every day you receive hundreds of products.

```text
Milk

Bread

Rice

Sugar

Eggs
```

How would you store them?

Creating a separate variable for every item would be impossible.

```python
item1 = "Milk"
item2 = "Bread"
item3 = "Rice"
item4 = "Sugar"
```

As the number of products grows,

the program becomes difficult to manage.

Instead, Python provides a **List**, which allows us to store multiple values together.

---

# Story — Shopping Basket

Imagine walking through a supermarket.

Instead of carrying every product in your hands,

you place everything into a shopping basket.

```text
Shopping Basket

↓

Milk

Bread

Rice

Eggs

Chocolate
```

A Python list works exactly like this basket.

Instead of storing one value,

it stores an ordered collection of values.

---

# What is a List?

A **List** is an ordered, mutable collection of items.

Let's understand this definition.

### Ordered

Items have positions.

```text
0 → Apple

1 → Banana

2 → Mango
```

The order is preserved.

---

### Mutable

Mutable means **changeable**.

You can:

- Add items
- Remove items
- Replace items

Unlike strings,

lists can be modified after creation.

---

### Collection

A list stores multiple objects inside a single variable.

Example

```python
fruits = ["Apple", "Banana", "Mango"]
```

Instead of three variables,

we now have one collection.

---

# Creating Lists

### Empty List

```python
numbers = []
```

---

### List with Values

```python
numbers = [10, 20, 30, 40]
```

---

### Mixed Data Types

Lists can contain different data types.

```python
data = [10, "Alice", 3.14, True]
```

Output

```text
[10, 'Alice', 3.14, True]
```

Although allowed,

professional code usually stores related data together.

---

# Internal Representation

```text
fruits

↓

+---------------------------+

0 → Apple

1 → Banana

2 → Mango

+---------------------------+
```

Every element has an index.

---

# Indexing

Indexing allows us to access individual elements.

```python
fruits = ["Apple", "Banana", "Mango"]

print(fruits[0])
```

Output

```text
Apple
```

---

# Why Index Starts at Zero?

This is one of the most common beginner questions.

Imagine memory addresses.

```text
Base Address

↓

Element 0

↓

Element 1

↓

Element 2
```

The first element is stored at the **base address**, so its offset is **0**.

Most programming languages follow zero-based indexing because it simplifies memory calculations.

---

# Positive Indexing

```python
fruits = ["Apple", "Banana", "Mango"]
```

Visualization

```text
Index

0   1   2

↓

Apple Banana Mango
```

Examples

```python
print(fruits[1])
```

Output

```text
Banana
```

---

# Negative Indexing

Python also allows indexing from the end.

```text
Apple Banana Mango

-3     -2    -1
```

Example

```python
print(fruits[-1])
```

Output

```text
Mango
```

This is useful when you need the last few elements without knowing the list length.

---

# Accessing Multiple Elements — Slicing

Instead of one element,

we can retrieve a portion of the list.

Syntax

```python
list[start:stop:step]
```

Remember

- Start → Included
- Stop → Excluded
- Step → Optional

---

# Example 1

```python
numbers = [10,20,30,40,50]

print(numbers[1:4])
```

Output

```text
[20,30,40]
```

---

# Example 2

```python
print(numbers[:3])
```

Output

```text
[10,20,30]
```

---

# Example 3

```python
print(numbers[2:])
```

Output

```text
[30,40,50]
```

---

# Example 4

```python
print(numbers[::-1])
```

Output

```text
[50,40,30,20,10]
```

This reverses the list.

---

# Updating Lists

Lists are mutable.

Example

```python
fruits = ["Apple", "Banana", "Mango"]

fruits[1] = "Orange"

print(fruits)
```

Output

```text
['Apple', 'Orange', 'Mango']
```

---

# Adding Elements

### append()

Adds one element at the end.

```python
fruits = ["Apple", "Banana"]

fruits.append("Mango")

print(fruits)
```

Output

```text
['Apple', 'Banana', 'Mango']
```

Time Complexity

```text
O(1)
```

---

### insert()

Adds an element at a specific position.

```python
fruits.insert(1, "Orange")
```

Output

```text
['Apple', 'Orange', 'Banana']
```

Time Complexity

```text
O(n)
```

---

### extend()

Adds multiple elements.

```python
numbers = [1,2]

numbers.extend([3,4,5])

print(numbers)
```

Output

```text
[1,2,3,4,5]
```

---

# Removing Elements

### remove()

Removes by value.

```python
numbers = [10,20,30]

numbers.remove(20)

print(numbers)
```

Output

```text
[10,30]
```

---

### pop()

Removes by index.

```python
numbers.pop(1)
```

Returns the removed element.

---

### clear()

Removes every element.

```python
numbers.clear()
```

Result

```text
[]
```

---

# Searching

### in Operator

```python
if "Apple" in fruits:

    print("Found")
```

---

### index()

Returns the first occurrence.

```python
fruits.index("Banana")
```

---

### count()

Counts occurrences.

```python
numbers.count(5)
```

---

# Sorting

Ascending

```python
numbers.sort()
```

Descending

```python
numbers.sort(reverse=True)
```

Original list changes.

---

# sorted()

Unlike `sort()`,

`sorted()` creates a new list.

```python
numbers = [3,1,2]

new_numbers = sorted(numbers)

print(numbers)
print(new_numbers)
```

Output

```text
[3,1,2]

[1,2,3]
```

---

# Nested Lists

Lists can contain other lists.

```python
matrix = [

    [1,2,3],

    [4,5,6],

    [7,8,9]

]
```

Visualization

```text
Matrix

↓

Row

↓

Column
```

Access

```python
print(matrix[1][2])
```

Output

```text
6
```

---

# List Comprehensions

List comprehensions provide a concise way to create lists.

Traditional

```python
squares = []

for i in range(5):

    squares.append(i * i)
```

Pythonic

```python
squares = [i * i for i in range(5)]
```

Output

```text
[0,1,4,9,16]
```

---

# List Comprehension with Condition

```python
evens = [

    x

    for x in range(10)

    if x % 2 == 0

]
```

Output

```text
[0,2,4,6,8]
```

---

# Time Complexity

| Operation | Complexity |
|-----------|------------|
| Indexing | O(1) |
| Update | O(1) |
| Append | O(1) |
| Insert | O(n) |
| Remove | O(n) |
| Search | O(n) |
| Pop (End) | O(1) |
| Pop (Middle) | O(n) |
| Sort | O(n log n) |

These complexities are frequently asked in coding interviews.

---

# Real-World Example

Imagine an e-commerce website.

```python
cart = [

    "Laptop",

    "Mouse",

    "Keyboard"

]
```

Operations

```python
cart.append("Monitor")

cart.remove("Mouse")

cart.sort()
```

Lists are ideal because the shopping cart changes frequently.

---

# Memory Trick

Remember

```text
CAUR
```

**C**

Create

↓

**A**

Access

↓

**U**

Update

↓

**R**

Remove

These are the four basic operations on every collection.

---

# Common Beginner Mistakes

### Mistake 1

Confusing `append()` and `extend()`.

```python
numbers.append([3,4])
```

Produces

```text
[1,2,[3,4]]
```

Whereas

```python
numbers.extend([3,4])
```

Produces

```text
[1,2,3,4]
```

---

### Mistake 2

Using invalid indexes.

```python
numbers[10]
```

Raises

```text
IndexError
```

---

### Mistake 3

Thinking `sort()` returns a new list.

It modifies the existing list.

---

### Mistake 4

Forgetting that slicing excludes the stop index.

```python
numbers[1:4]
```

Returns indexes

```text
1

2

3
```

Not `4`.

---

# Interview Questions & Answers

## Q1. What is a list?

### Answer

A list is an **ordered, mutable collection** that can store multiple objects, including objects of different data types.

### Example

```python
fruits = ["Apple", "Banana", "Mango"]
```

### Interview Tip

Mention both **ordered** and **mutable**.

---

## Q2. Why does Python use zero-based indexing?

### Answer

Zero-based indexing aligns with memory addressing.

The first element is stored at the base address, so its offset is `0`, making address calculations simpler and more efficient.

---

## Q3. What is the difference between `append()` and `extend()`?

### Answer

`append()` adds a single object to the end of the list.

`extend()` adds each element from another iterable.

### Example

```python
a = [1, 2]

a.append([3, 4])
# [1, 2, [3, 4]]

a = [1, 2]

a.extend([3, 4])
# [1, 2, 3, 4]
```

---

## Q4. What is the difference between `sort()` and `sorted()`?

### Answer

`sort()` modifies the original list.

`sorted()` returns a new sorted list while leaving the original unchanged.

---

## Q5. Why are list comprehensions preferred?

### Answer

List comprehensions are:

- More concise
- More readable
- Often faster than equivalent loops

### Example

```python
squares = [x * x for x in range(5)]
```

instead of

```python
squares = []

for x in range(5):
    squares.append(x * x)
```

---

# Chapter Summary / Cheat Sheet

| Feature | Description |
|----------|-------------|
| Ordered | Yes |
| Mutable | Yes |
| Duplicate Values | Allowed |
| Heterogeneous Data | Allowed |
| Indexing | Supported |
| Negative Indexing | Supported |
| Slicing | Supported |
| Nested Lists | Supported |

### Most Used Methods

| Method | Purpose |
|---------|----------|
| `append()` | Add one element |
| `extend()` | Add multiple elements |
| `insert()` | Insert at index |
| `remove()` | Remove by value |
| `pop()` | Remove by index |
| `sort()` | Sort in place |
| `sorted()` | Return sorted copy |
| `index()` | Find position |
| `count()` | Count occurrences |

---

# What's Next?

In **Chapter 13 — Tuples & Sets**, you'll learn two important collection types:

- **Tuples** — immutable collections used for fixed data.
- **Sets** — unordered collections optimized for uniqueness and fast membership testing.

Understanding when to use a **List**, **Tuple**, or **Set** is a common Python interview topic and an essential programming skill.