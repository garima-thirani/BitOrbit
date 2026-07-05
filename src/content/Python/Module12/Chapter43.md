# Module 12 — Memory Management

# Chapter 43 — Python Memory Model

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Memory Management Matters
- What is Memory?
- Python Memory Model
- Stack vs Heap Memory
- Variables and References
- Object Identity
- `id()`
- `is` vs `==`
- Mutable vs Immutable Objects
- Memory Allocation
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine a large hotel.

There are two important places.

```text
Reception

↓

Keeps Track of Guests

------------------------

Rooms

↓

Guests Actually Stay
```

The receptionist doesn't store people.

They only know

```text
Guest Name

↓

Room Number
```

Similarly,

Python variables **do not store data**.

They only store **references** to objects stored in memory.

Understanding this idea is the key to mastering Python memory management.

---

# Story — Name Tags

Imagine a classroom.

There are students sitting on chairs.

Each student wears a name tag.

```text
Chair #1

↓

Alice

--------------------

Chair #2

↓

Bob
```

Now imagine changing the name tag.

The student doesn't move.

Only the label changes.

Python variables work exactly like name tags.

Variables point to objects.

They do **not** contain the objects themselves.

---

# Why Memory Management?

Suppose you write

```python
x = 100
```

Where is

```python
100
```

stored?

Inside

```python
x
```

?

No.

Python stores the object somewhere in memory.

The variable

```python
x
```

simply remembers **where** the object is.

---

# Python Memory Model

Python separates

```text
Variables

↓

Objects
```

Visualization

```text
Variable

↓

Reference

↓

Object

↓

Memory
```

This is one of the biggest differences between Python and languages like C.

---

# Stack vs Heap

Memory is broadly divided into

```text
Stack

↓

Function Calls

↓

Local Variables

-------------------------

Heap

↓

Objects

↓

Lists

↓

Strings

↓

Dictionaries

↓

Instances
```

Both work together.

---

# Stack Memory

Stack stores

- Function Calls
- Local References
- Execution Context

Visualization

```text
main()

↓

calculate()

↓

display()
```

Each function call creates a **stack frame**.

When the function finishes,

its frame disappears.

---

# Heap Memory

Heap stores actual Python objects.

Example

```python
numbers = [1,2,3]
```

Visualization

```text
numbers

↓

Reference

↓

[1,2,3]

↓

Heap
```

The list lives in heap memory.

---

# Stack vs Heap

| Stack | Heap |
|--------|------|
| Function Calls | Objects |
| Local References | Lists |
| Faster | Larger |
| Automatic Cleanup | Managed by Python |

---

# Variables are References

Suppose

```python
x = 10
```

Visualization

```text
x

↓

Reference

↓

10
```

Now

```python
y = x
```

Visualization

```text
x

↓

10

↑

y
```

Both variables point to the same object.

---

# Example

```python
x = 100

y = x

print(id(x))

print(id(y))
```

Output

```text
1402345678

1402345678
```

Both have the same memory identity.

---

# What is id()?

Every Python object has a unique identity.

The

```python
id()
```

function returns that identity.

Example

```python
name = "Python"

print(

id(name)

)
```

Think of it as the object's "house address."

---

# Object Identity

Visualization

```text
Object

↓

Memory Address

↓

id()
```

Two variables can point to the same object.

---

# is vs ==

One of the most frequently asked interview questions.

---

## ==

Checks

```text
Values
```

Example

```python
a = [1,2]

b = [1,2]

print(a == b)
```

Output

```text
True
```

Because both lists contain the same values.

---

## is

Checks

```text
Identity
```

Example

```python
a = [1,2]

b = [1,2]

print(a is b)
```

Output

```text
False
```

Because they are two different objects.

---

# Visualization

```text
List A

↓

[1,2]

Address 100

--------------------

List B

↓

[1,2]

Address 250
```

Values

Same

Identity

Different

---

# Mutable Objects

Objects that can change after creation.

Examples

```python
list

dict

set

bytearray
```

Example

```python
numbers = [1,2]

numbers.append(3)
```

The same object changes.

---

# Immutable Objects

Cannot change after creation.

Examples

```python
int

float

tuple

str

frozenset
```

Example

```python
text = "Hello"

text += " World"
```

Python creates a **new object**.

The original string remains unchanged.

---

# Memory Visualization

Mutable

```text
List

↓

Modify

↓

Same Object
```

Immutable

```text
String

↓

Modify

↓

New Object
```

---

# Multiple References

Example

```python
a = [1,2]

b = a
```

Visualization

```text
a

↓

[1,2]

↑

b
```

Changing

```python
a.append(3)
```

also changes

```python
b
```

because both variables reference the same list.

---

# Reassigning Variables

Suppose

```python
x = 10

x = 20
```

Visualization

```text
Old Object

↓

10

(No Reference)

--------------------

New Object

↓

20

↓

x
```

The variable now points to a different object.

---

# Object Lifetime

Every object follows this lifecycle.

```text
Create Object

↓

Referenced

↓

Used

↓

No References

↓

Garbage Collection
```

We'll study Garbage Collection in the next chapter.

---

# Real-World Example

Imagine an employee database.

```text
Employee ID

↓

Reference

↓

Employee Object

↓

Heap Memory
```

Changing the employee ID variable

doesn't move the employee object.

It simply points somewhere else.

---

# Memory Trick

Remember

```text
SRH
```

**S**

Stack

↓

**R**

Reference

↓

**H**

Heap

Or simply

```text
Variables

↓

References

↓

Objects

↓

Heap
```

---

# Common Beginner Mistakes

### Mistake 1

Thinking variables store values.

Variables store **references** to objects,

not the objects themselves.

---

### Mistake 2

Using

```python
is
```

instead of

```python
==
```

Use

```python
==
```

to compare values.

Use

```python
is
```

to compare object identity.

---

### Mistake 3

Assuming immutable objects change in place.

Operations on immutable objects create **new objects**.

---

### Mistake 4

Forgetting that mutable objects are shared.

Example

```python
a = []

b = a
```

Both variables reference the same list.

Changing one affects the other.

---

# Interview Questions & Answers

## Q1. What is the difference between Stack and Heap Memory?

### Answer

The **Stack** stores function calls and local references.

The **Heap** stores the actual Python objects such as lists,

strings,

dictionaries,

and custom class instances.

---

## Q2. Do Python variables store values?

### Answer

No.

Python variables store **references** to objects.

The actual objects live in heap memory.

---

## Q3. What is the difference between `is` and `==`?

### Answer

`==`

compares the values of two objects.

`is`

compares whether both variables reference the **same object**.

Example

```python
a = [1]

b = [1]

a == b

# True

a is b

# False
```

---

## Q4. What does `id()` return?

### Answer

`id()` returns the identity of an object.

It is unique for the object's lifetime and can be thought of as its memory identity.

---

## Q5. What is the difference between Mutable and Immutable objects?

### Answer

Mutable objects can be modified after creation.

Examples:

- List
- Dictionary
- Set

Immutable objects cannot be modified.

Any change creates a new object.

Examples:

- Integer
- String
- Tuple
- Frozenset

---

# Chapter Summary / Cheat Sheet

| Concept | Meaning |
|----------|----------|
| Stack | Function calls & local references |
| Heap | Python objects |
| Variable | Reference to an object |
| `id()` | Object identity |
| `==` | Compare values |
| `is` | Compare identities |
| Mutable | Can change after creation |
| Immutable | Creates new object when modified |

---

# What's Next?

In **Chapter 44 — Garbage Collection**, you'll learn how Python automatically frees unused memory:

- Reference Counting
- Garbage Collector
- Circular References
- `gc` Module

Understanding garbage collection will help you write memory-efficient and production-ready Python applications.