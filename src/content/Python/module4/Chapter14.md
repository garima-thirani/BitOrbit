# Module 4 — Python Collections

# Chapter 14 — Dictionaries

---

# Learning Objectives

By the end of this chapter, you will understand:

- What is a Dictionary?
- Why Dictionaries are Needed
- Creating Dictionaries
- Accessing Values
- Adding & Updating Items
- Removing Items
- Dictionary Methods
- Dictionary Comprehensions
- Nested Dictionaries
- Hash Tables
- Time Complexity
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're looking for a friend's phone number.

One approach is to keep a list.

```text
Alice  → 9876543210

Bob    → 9123456780

Charlie→ 9988776655
```

To find Bob's number,

you read every name until you reach Bob.

Now imagine a phone book.

You simply search for

```text
Bob
```

and immediately get

```text
9123456780
```

Python dictionaries work exactly like this.

Instead of searching through an entire collection,

you directly access data using a **key**.

---

# Story — Library Catalog

Imagine a huge library.

Without a catalog,

finding one book would require checking every shelf.

```text
Shelf 1

↓

Shelf 2

↓

Shelf 3

↓

...
```

Very slow.

Instead,

libraries maintain a catalog.

```text
Book Name

↓

Shelf Number

↓

Book
```

Python dictionaries follow the same principle.

Instead of positions,

they use **keys**.

---

# What is a Dictionary?

A dictionary is a **mutable collection of key-value pairs**.

Visualization

```text
Key

↓

Value
```

Example

```python
student = {

    "name": "Alice",

    "age": 20,

    "city": "Delhi"

}
```

Each key uniquely identifies a value.

---

# Why Dictionaries?

Suppose we store student information in a list.

```python
student = [

    "Alice",

    20,

    "Delhi"
]
```

What does

```python
student[1]
```

represent?

Age?

Marks?

Roll Number?

The meaning depends entirely on memory.

Now compare.

```python
student = {

    "name": "Alice",

    "age": 20,

    "city": "Delhi"
}
```

Now the data explains itself.

---

# Creating Dictionaries

Empty Dictionary

```python
student = {}
```

---

Dictionary with Values

```python
student = {

    "name": "Alice",

    "age": 20,

    "city": "Delhi"

}
```

---

Using dict()

```python
student = dict(

    name="Alice",

    age=20

)
```

---

# Internal Representation

A dictionary is implemented using a **Hash Table**.

Visualization

```text
Hash Function

↓

Hash Value

↓

Bucket

↓

Stored Value
```

Unlike lists,

items are not stored by position.

They are stored using a computed hash of the key.

This is why lookups are extremely fast.

---

# Accessing Values

Using square brackets

```python
student = {

    "name": "Alice",

    "age": 20

}

print(student["name"])
```

Output

```text
Alice
```

---

# get()

Suppose a key might not exist.

Using

```python
student["marks"]
```

raises

```text
KeyError
```

Safer approach

```python
print(student.get("marks"))
```

Output

```text
None
```

Or provide a default value.

```python
student.get("marks", 0)
```

Output

```text
0
```

---

# Adding Items

Simply assign a new key.

```python
student = {

    "name": "Alice"
}

student["age"] = 20
```

Output

```python
{

'name':'Alice',

'age':20

}
```

---

# Updating Items

```python
student["age"] = 21
```

The old value is replaced.

---

# Removing Items

## pop()

```python
student.pop("age")
```

Returns the removed value.

---

## del

```python
del student["city"]
```

Deletes the key-value pair.

---

## popitem()

Removes the last inserted key-value pair.

```python
student.popitem()
```

---

## clear()

Removes everything.

```python
student.clear()
```

---

# Dictionary Methods

## keys()

```python
student.keys()
```

Returns

```text
dict_keys(['name','age'])
```

---

## values()

```python
student.values()
```

Returns

```text
dict_values(['Alice',20])
```

---

## items()

Returns both keys and values.

```python
for key, value in student.items():

    print(key, value)
```

Output

```text
name Alice

age 20
```

---

# Iterating Through Dictionaries

Loop through keys

```python
for key in student:

    print(key)
```

---

Loop through values

```python
for value in student.values():

    print(value)
```

---

Loop through both

```python
for key, value in student.items():

    print(key, value)
```

---

# Nested Dictionaries

Dictionaries can contain other dictionaries.

```python
students = {

    "101": {

        "name": "Alice",

        "age": 20

    },

    "102": {

        "name": "Bob",

        "age": 21

    }

}
```

Access

```python
print(students["101"]["name"])
```

Output

```text
Alice
```

---

# Dictionary Comprehensions

Like list comprehensions,

Python provides dictionary comprehensions.

Traditional

```python
squares = {}

for i in range(5):

    squares[i] = i * i
```

Pythonic

```python
squares = {

    x: x*x

    for x in range(5)

}
```

Output

```python
{

0:0,

1:1,

2:4,

3:9,

4:16

}
```

---

# Dictionary with Condition

```python
even_squares = {

    x: x*x

    for x in range(10)

    if x % 2 == 0

}
```

---

# Hash Tables

This is one of the most important interview concepts.

A dictionary uses

```text
Hash Function

↓

Integer

↓

Bucket

↓

Value
```

Instead of searching every element,

Python calculates the hash of the key.

This allows average lookup in

```text
O(1)
```

time.

---

# Which Types Can Be Keys?

Keys must be **hashable**.

Allowed

```python
String

Integer

Float

Tuple
```

Not Allowed

```python
List

Dictionary

Set
```

Because mutable objects can change,

their hash values would also change.

---

# Time Complexity

| Operation | Complexity |
|------------|------------|
| Lookup | O(1) Avg |
| Insert | O(1) Avg |
| Update | O(1) Avg |
| Delete | O(1) Avg |
| Search by Key | O(1) Avg |

This makes dictionaries one of Python's fastest data structures.

---

# Real-World Example

Imagine an online shopping website.

```python
product = {

    "id":101,

    "name":"Laptop",

    "price":70000,

    "stock":12

}
```

Accessing

```python
product["price"]
```

is immediate.

No searching required.

---

# Memory Trick

Remember

```text
KVH
```

**K**

Key

↓

**V**

Value

↓

**H**

Hash Table

Every dictionary follows this structure.

---

# Common Beginner Mistakes

### Mistake 1

Using mutable objects as keys.

Wrong

```python
{

[1,2] : "Value"

}
```

Raises

```text
TypeError
```

---

### Mistake 2

Accessing missing keys.

Wrong

```python
student["marks"]
```

Safer

```python
student.get("marks")
```

---

### Mistake 3

Assuming duplicate keys are allowed.

```python
{

"name":"Alice",

"name":"Bob"

}
```

Output

```python
{

'name':'Bob'

}
```

The later value overwrites the earlier one.

---

### Mistake 4

Thinking dictionaries are sorted by key.

Modern Python preserves **insertion order**, but dictionaries are optimized for lookup, not sorting.

---

# Interview Questions & Answers

## Q1. What is a dictionary?

### Answer

A dictionary is a mutable collection of **key-value pairs** that provides fast lookup using hash tables.

Example

```python
student = {

"name":"Alice",

"age":20

}
```

---

## Q2. Why are dictionaries faster than lists for searching?

### Answer

Lists search sequentially.

Time Complexity

```text
O(n)
```

Dictionaries use hash tables.

Time Complexity

```text
O(1) Average
```

The key is converted into a hash, allowing direct access to the value.

---

## Q3. What is the difference between `get()` and square brackets (`[]`)?

### Answer

Using `[]` raises a `KeyError` if the key does not exist.

Using `get()` returns `None` or a default value instead.

Example

```python
student.get("marks", 0)
```

---

## Q4. Why must dictionary keys be immutable?

### Answer

Dictionary keys are stored using their hash values.

If a key could change after insertion, Python would no longer know where to find the associated value.

Therefore, keys must be immutable and hashable.

---

## Q5. What is Dictionary Comprehension?

### Answer

Dictionary comprehension is a concise way to create dictionaries.

Example

```python
squares = {

x: x*x

for x in range(5)

}
```

It is similar to list comprehension but produces a dictionary.

---

# Chapter Summary / Cheat Sheet

| Feature | Dictionary |
|----------|------------|
| Ordered (Insertion Order) | ✅ |
| Mutable | ✅ |
| Duplicate Keys | ❌ |
| Duplicate Values | ✅ |
| Indexed | ❌ |
| Key Lookup | O(1) Average |

### Common Methods

| Method | Purpose |
|----------|---------|
| `get()` | Safe lookup |
| `keys()` | All keys |
| `values()` | All values |
| `items()` | Key-value pairs |
| `pop()` | Remove by key |
| `popitem()` | Remove last inserted item |
| `update()` | Merge dictionaries |
| `clear()` | Remove all items |

---

# Module 4 Complete ✅

You now understand Python's four core collection types:

- **Lists** → Ordered, mutable sequences
- **Tuples** → Ordered, immutable sequences
- **Sets** → Unordered collections of unique values
- **Dictionaries** → Fast key-value mappings

These data structures form the backbone of nearly every Python application, from web development to machine learning.

