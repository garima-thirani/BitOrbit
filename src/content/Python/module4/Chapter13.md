# Module 4 — Python Collections

# Chapter 13 — Tuples & Sets

---

# Learning Objectives

By the end of this chapter, you will understand:

## Tuples

- What is a Tuple?
- Why Tuples are Needed
- Creating Tuples
- Accessing Elements
- Tuple Methods
- Packing & Unpacking
- Named Tuples

## Sets

- What is a Set?
- Why Sets are Needed
- Creating Sets
- Set Operations
- Set Methods
- Mathematical Set Operations
- Frozen Sets
- Time Complexity
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine organizing your belongings.

Some things should **never change**.

For example:

- Your Date of Birth
- Passport Number
- GPS Coordinates

These are fixed values.

Python provides **Tuples** for such data.

Now imagine another situation.

You're maintaining a list of students attending a seminar.

```text
Alice

Bob

Alice

John

Bob
```

Notice the duplicates.

You only want unique names.

Python provides **Sets** for this purpose.

Both Tuples and Sets solve different problems than Lists.

---

# Story — Locker vs Basket

Imagine two storage systems.

## Basket

```text
Apple

Banana

Orange

Apple
```

A basket allows duplicates.

You can remove or add fruits.

This is similar to a **List**.

---

## Locker

A locker stores fixed documents.

```text
Passport

Driving License

Birth Certificate
```

You don't frequently modify them.

This is like a **Tuple**.

---

## Attendance Register

```text
Alice

Bob

Alice

Bob

Charlie
```

Duplicates are meaningless.

You only care about unique names.

This is exactly what a **Set** provides.

---

# Part 1 — Tuples

---

# What is a Tuple?

A tuple is an **ordered, immutable collection**.

Let's understand the definition.

## Ordered

Every element has an index.

```text
0

↓

Alice

1

↓

Bob

2

↓

Charlie
```

---

## Immutable

Once created,

a tuple **cannot be modified**.

You cannot

- Add
- Remove
- Replace

elements.

---

# Why Tuples?

Suppose we store GPS coordinates.

```python
location = (28.6139, 77.2090)
```

Should these coordinates accidentally change?

No.

Immutability protects data from accidental modification.

---

# Creating Tuples

Single Element

```python
number = (5,)
```

Notice the comma.

Without it,

```python
number = (5)
```

is just an integer.

---

Multiple Elements

```python
fruits = ("Apple", "Banana", "Mango")
```

---

Mixed Data Types

```python
data = (10, "Alice", True, 3.14)
```

---

# Accessing Tuple Elements

Indexing works exactly like lists.

```python
fruits = ("Apple", "Banana", "Mango")

print(fruits[1])
```

Output

```text
Banana
```

---

Negative Indexing

```python
print(fruits[-1])
```

Output

```text
Mango
```

---

Slicing

```python
numbers = (10,20,30,40,50)

print(numbers[1:4])
```

Output

```text
(20,30,40)
```

Tuples support the same slicing syntax as lists.

---

# Why Can't Tuples Be Modified?

Suppose

```python
coordinates = (28.61, 77.20)
```

Changing coordinates accidentally could cause serious problems.

Immutability provides:

- Safety
- Predictability
- Faster internal optimizations

---

# Tuple Packing

Packing means placing multiple values into a tuple automatically.

Example

```python
student = "Alice", 21, "Delhi"
```

Python automatically creates

```python
("Alice", 21, "Delhi")
```

---

# Tuple Unpacking

The reverse process.

```python
name, age, city = student
```

Now

```text
name

↓

Alice

age

↓

21

city

↓

Delhi
```

---

# Practical Example

```python
point = (10, 20)

x, y = point

print(x)
print(y)
```

Output

```text
10

20
```

---

# Tuple Methods

Since tuples are immutable,

they have very few methods.

### count()

```python
numbers = (1,2,2,3)

print(numbers.count(2))
```

Output

```text
2
```

---

### index()

```python
numbers = (10,20,30)

print(numbers.index(20))
```

Output

```text
1
```

---

# Named Tuples

Sometimes indexes reduce readability.

Instead of

```python
student[0]
```

Use

```python
student.name
```

Python provides

```python
namedtuple
```

Example

```python
from collections import namedtuple

Student = namedtuple(

    "Student",

    ["name", "age"]

)

s = Student("Alice", 20)

print(s.name)
```

Output

```text
Alice
```

---

# Part 2 — Sets

---

# What is a Set?

A set is an **unordered collection of unique elements**.

Definition

```text
Unordered

+

Unique

+

Mutable
```

---

# Why Sets?

Suppose

```python
numbers = [1,2,2,3,4,4]
```

Duplicates exist.

Convert to a set.

```python
unique = set(numbers)

print(unique)
```

Output

```text
{1,2,3,4}
```

Duplicates disappear automatically.

---

# Creating Sets

```python
numbers = {1,2,3}
```

---

Empty Set

Wrong

```python
numbers = {}
```

This creates a dictionary.

Correct

```python
numbers = set()
```

---

# Internal Representation

Unlike lists,

sets do **not** store elements by index.

Instead,

they use a **Hash Table**.

Visualization

```text
Hash

↓

Bucket

↓

Element
```

This makes searching extremely fast.

---

# Adding Elements

```python
numbers = {1,2}

numbers.add(3)

print(numbers)
```

Output

```text
{1,2,3}
```

---

# Removing Elements

### remove()

```python
numbers.remove(2)
```

Raises an error if the element doesn't exist.

---

### discard()

```python
numbers.discard(5)
```

No error if the element is missing.

---

### pop()

Removes an arbitrary element.

Since sets are unordered,

you cannot predict which element will be removed.

---

# Membership Testing

This is where sets shine.

```python
if 50 in numbers:

    print("Found")
```

Average complexity

```text
O(1)
```

Compared to lists

```text
O(n)
```

---

# Mathematical Set Operations

Suppose

```python
A = {1,2,3}

B = {3,4,5}
```

---

Union

```python
A | B
```

Output

```text
{1,2,3,4,5}
```

---

Intersection

```python
A & B
```

Output

```text
{3}
```

---

Difference

```python
A - B
```

Output

```text
{1,2}
```

---

Symmetric Difference

```python
A ^ B
```

Output

```text
{1,2,4,5}
```

---

Visualization

```text
A ∪ B

↓

Everything

------------------

A ∩ B

↓

Common Elements

------------------

A − B

↓

Only in A

------------------

A △ B

↓

Not Common
```

---

# Frozen Sets

A **frozenset** is an immutable version of a set.

Example

```python
numbers = frozenset([1,2,3])
```

Cannot

- Add
- Remove
- Modify

elements.

Useful when unique values should remain constant.

---

# List vs Tuple vs Set

| Feature | List | Tuple | Set |
|----------|------|--------|-----|
| Ordered | ✅ | ✅ | ❌ |
| Mutable | ✅ | ❌ | ✅ |
| Duplicates | ✅ | ✅ | ❌ |
| Indexing | ✅ | ✅ | ❌ |
| Hash Based | ❌ | ❌ | ✅ |

---

# Time Complexity

| Operation | List | Tuple | Set |
|-----------|------|--------|-----|
| Indexing | O(1) | O(1) | ❌ |
| Search | O(n) | O(n) | O(1) Avg |
| Insert | O(n) | ❌ | O(1) Avg |
| Remove | O(n) | ❌ | O(1) Avg |

---

# Real-World Examples

## Tuple

GPS Coordinates

```python
location = (28.61, 77.20)
```

Never changes.

---

## Set

Unique Visitors

```python
visited_users = {

"Alice",

"Bob",

"Charlie"

}
```

Duplicates are automatically ignored.

---

# Memory Trick

Remember

```text
LTS
```

**L**

List

↓

Mutable

↓

Ordered

↓

Duplicates

---

**T**

Tuple

↓

Immutable

↓

Ordered

↓

Duplicates

---

**S**

Set

↓

Mutable

↓

Unordered

↓

Unique

---

# Common Beginner Mistakes

### Mistake 1

Creating an empty set.

Wrong

```python
{}
```

Correct

```python
set()
```

---

### Mistake 2

Trying to modify tuples.

```python
coordinates[0] = 10
```

Raises

```text
TypeError
```

---

### Mistake 3

Expecting sets to preserve order.

Sets are unordered.

---

### Mistake 4

Using `remove()` when the element may not exist.

Prefer

```python
discard()
```

---

# Interview Questions & Answers

## Q1. What is the difference between a List and a Tuple?

### Answer

Lists are mutable, meaning they can be modified after creation.

Tuples are immutable, meaning their contents cannot be changed.

Use lists for changing data and tuples for fixed data.

---

## Q2. Why are tuples immutable?

### Answer

Immutability protects data from accidental modification and allows Python to optimize memory usage and performance.

Tuples are commonly used for fixed values such as coordinates and configuration data.

---

## Q3. Why are sets faster than lists for searching?

### Answer

Sets are implemented using **hash tables**.

This allows average-case lookup in **O(1)** time.

Lists require sequential searching, which takes **O(n)** time.

---

## Q4. What is the difference between `remove()` and `discard()`?

### Answer

`remove()` raises a `KeyError` if the element doesn't exist.

`discard()` silently does nothing if the element is missing.

---

## Q5. When should you use a Tuple instead of a List?

### Answer

Use tuples when:

- Data should not change
- Fixed records are required
- Returning multiple values from a function
- Using objects as dictionary keys (if hashable)

---

## Q6. What is a Frozenset?

### Answer

A `frozenset` is an immutable version of a set.

Once created, its elements cannot be added, removed, or modified.

It is useful when unique values should remain constant.

---

# Chapter Summary / Cheat Sheet

| Collection | Ordered | Mutable | Duplicates | Indexed |
|------------|---------|---------|------------|----------|
| List | ✅ | ✅ | ✅ | ✅ |
| Tuple | ✅ | ❌ | ✅ | ✅ |
| Set | ❌ | ✅ | ❌ | ❌ |
| Frozen Set | ❌ | ❌ | ❌ | ❌ |

### Most Used Set Operations

| Operation | Symbol |
|-----------|--------|
| Union | `|` |
| Intersection | `&` |
| Difference | `-` |
| Symmetric Difference | `^` |

---

# What's Next?

In **Chapter 14 — Dictionaries**, you'll learn Python's most powerful built-in data structure:

- Key-Value Pairs
- Hash Tables
- Dictionary Methods
- Dictionary Comprehensions
- Real-world Use Cases

Dictionaries are the backbone of JSON, APIs, databases, caching, and countless Python applications.