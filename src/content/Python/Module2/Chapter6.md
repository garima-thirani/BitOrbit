# Module 2 — Control Flow

# Chapter 6 — Loops

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why loops are needed
- while Loop
- for Loop
- range()
- enumerate()
- zip()
- Nested Loops
- Common Loop Patterns
- Best Practices
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine your teacher asks you to write:

```text
Welcome to Python
```

100 times.

You have two options.

Option 1

```python
print("Welcome to Python")
print("Welcome to Python")
print("Welcome to Python")
...
```

100 times.

Option 2

```python
for i in range(100):
    print("Welcome to Python")
```

Which one is easier?

Obviously the second one.

Loops exist to perform **repetitive tasks automatically**.

---

# Story — Factory Robot

Imagine a factory.

A robot is assigned to pack boxes.

Without loops,

the robot would need individual instructions for every box.

```text
Pack Box 1

Pack Box 2

Pack Box 3

...

Pack Box 1000
```

Instead,

we simply tell it:

```text
Repeat

1000 Times
```

That's exactly what loops do.

---

# What is a Loop?

A loop repeatedly executes a block of code until a condition becomes false or all items have been processed.

Visualization

```text
Start

↓

Condition

↓

True?

↓

Execute Block

↓

Go Back

↓

False

↓

Exit Loop
```

---

# Types of Loops in Python

Python provides two looping statements.

```text
Loops

│

├── while

└── for
```

Although there are only two,

they are sufficient for almost every programming problem.

---

# The while Loop

A `while` loop executes as long as a condition remains `True`.

Syntax

```python
while condition:
    statement
```

---

# Flow Diagram

```text
Start

↓

Condition

↓

True?

↓

Execute Block

↓

Condition Again

↓

False

↓

Exit
```

---

# Example 1 — Print Numbers

```python
count = 1

while count <= 5:
    print(count)
    count += 1
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

# How It Works

Initially

```text
count = 1
```

Python checks

```text
1 <= 5

↓

True
```

Prints

```text
1
```

Then

```text
count = 2
```

The process repeats.

When

```text
count = 6
```

Condition becomes false.

The loop stops.

---

# Example 2 — Password Validation

```python
password = ""

while password != "python":
    password = input("Enter Password: ")

print("Access Granted")
```

The program continues asking until the correct password is entered.

---

# Infinite Loop

If the condition never becomes false,

the loop never ends.

Example

```python
while True:
    print("Hello")
```

This is called an **infinite loop**.

Sometimes infinite loops are intentional.

Example:

- Game engines
- Web servers
- Chat servers

---

# The for Loop

A `for` loop is used to iterate over a sequence.

Examples:

- Lists
- Strings
- Tuples
- Dictionaries
- Sets
- Files

Syntax

```python
for variable in iterable:
    statement
```

---

# Flow Diagram

```text
Sequence

↓

Next Item

↓

Execute Block

↓

More Items?

↓

Yes

↓

Repeat

↓

No

↓

Exit
```

---

# Example 1 — Iterate Through a List

```python
fruits = ["Apple", "Banana", "Mango"]

for fruit in fruits:
    print(fruit)
```

Output

```text
Apple
Banana
Mango
```

---

# Example 2 — Iterate Through a String

```python
for letter in "Python":
    print(letter)
```

Output

```text
P
y
t
h
o
n
```

Each character is processed one at a time.

---

# Why Prefer for Loops?

Suppose you want to print every student name.

Instead of

```python
i = 0

while i < len(students):
    print(students[i])
    i += 1
```

Python provides

```python
for student in students:
    print(student)
```

Cleaner.

Shorter.

Less error-prone.

---

# range()

`range()` generates a sequence of numbers.

Syntax

```python
range(stop)

range(start, stop)

range(start, stop, step)
```

---

# Example

```python
for i in range(5):
    print(i)
```

Output

```text
0
1
2
3
4
```

Notice that the stop value is **excluded**.

---

# Example

```python
for i in range(2, 8):
    print(i)
```

Output

```text
2
3
4
5
6
7
```

---

# Example

```python
for i in range(2, 11, 2):
    print(i)
```

Output

```text
2
4
6
8
10
```

---

# enumerate()

Suppose we have

```python
students = ["Alice", "Bob", "Charlie"]
```

Without `enumerate()`

```python
for i in range(len(students)):
    print(i, students[i])
```

Pythonic way

```python
for index, student in enumerate(students):
    print(index, student)
```

Output

```text
0 Alice
1 Bob
2 Charlie
```

---

# Why enumerate()?

It returns:

```text
Index

+

Value
```

at the same time.

Much cleaner than using `range(len(...))`.

---

# zip()

Suppose two lists.

```python
names = ["Alice", "Bob"]

marks = [90, 85]
```

Without `zip()`

```python
for i in range(len(names)):
    print(names[i], marks[i])
```

Pythonic

```python
for name, mark in zip(names, marks):
    print(name, mark)
```

Output

```text
Alice 90
Bob 85
```

---

# Why zip()?

It combines multiple iterables.

Visualization

```text
Names

Alice

Bob

↓

Zip

↓

Marks

90

85

↓

(Alice,90)

(Bob,85)
```

---

# Nested Loops

A loop inside another loop.

Syntax

```python
for i in range(3):

    for j in range(2):

        print(i, j)
```

Output

```text
0 0

0 1

1 0

1 1

2 0

2 1
```

---

# Visualization

```text
Outer Loop

↓

Inner Loop

↓

Complete Inner Loop

↓

Outer Loop Continues
```

---

# Practical Example — Multiplication Table

```python
for i in range(1, 4):

    for j in range(1, 6):

        print(i * j, end=" ")

    print()
```

Output

```text
1 2 3 4 5

2 4 6 8 10

3 6 9 12 15
```

---

# Common Loop Patterns

## Counting

```python
for i in range(10):
```

---

## Traversing

```python
for item in items:
```

---

## Parallel Traversal

```python
for x, y in zip(a, b):
```

---

## Indexed Traversal

```python
for index, value in enumerate(data):
```

---

## Nested Traversal

```python
for row in matrix:

    for value in row:
```

---

# Which Loop Should I Use?

| Situation | Loop |
|-----------|------|
| Unknown number of iterations | while |
| Iterate through collection | for |
| Counter loop | for + range() |
| Need index | enumerate() |
| Multiple lists | zip() |
| Matrix | Nested loops |

---

# Memory Trick

Remember

```text
W F R E Z
```

Pronounce it

> **"Wa-Freeze"**

Meaning

```text
W → while

F → for

R → range()

E → enumerate()

Z → zip()
```

These are the five most commonly used looping tools.

---

# Common Beginner Mistakes

### Mistake 1

Infinite Loop

```python
count = 1

while count <= 5:

    print(count)
```

Forgot

```python
count += 1
```

---

### Mistake 2

Using

```python
range(5)
```

Expecting

```text
1 2 3 4 5
```

Actual output

```text
0 1 2 3 4
```

---

### Mistake 3

Using

```python
range(len(list))
```

when

```python
for item in list
```

is sufficient.

---

### Mistake 4

Using indexes when `enumerate()` is clearer.

---

### Mistake 5

Using multiple indexes instead of `zip()`.

---

# Interview Questions & Answers

## Q1. What is the difference between `for` and `while`?

### Answer

A `while` loop continues as long as a condition is true.

A `for` loop iterates over a sequence or iterable.

Use `while` when the number of iterations is unknown.

Use `for` when iterating over a collection.

### Example

```python
while balance > 0:
    withdraw()
```

```python
for student in students:
    print(student)
```

### Interview Tip

> "Choose `for` for iteration and `while` for condition-based repetition."

---

## Q2. Why is `enumerate()` better than `range(len())`?

### Answer

`enumerate()` directly returns both the index and the value, making code simpler and more readable.

### Example

Instead of

```python
for i in range(len(names)):
    print(i, names[i])
```

Write

```python
for index, name in enumerate(names):
    print(index, name)
```

### Interview Tip

Pythonic code prefers `enumerate()` whenever both the index and value are needed.

---

## Q3. What is `zip()`?

### Answer

`zip()` combines multiple iterables element by element.

### Example

```python
names = ["Alice", "Bob"]
scores = [95, 88]

for name, score in zip(names, scores):
    print(name, score)
```

Output

```text
Alice 95
Bob 88
```

### Real-World Use Case

Combining:

- Product names and prices
- Student names and grades
- Cities and temperatures

---

## Q4. What is an infinite loop?

### Answer

An infinite loop is a loop whose termination condition never becomes false.

Example

```python
while True:
    print("Running...")
```

Infinite loops are useful in:

- Servers
- Games
- Event-driven applications

But accidental infinite loops are a common bug.

---

## Q5. What is the difference between `range(5)` and `range(1, 6)`?

### Answer

```python
range(5)
```

Produces

```text
0 1 2 3 4
```

Whereas

```python
range(1, 6)
```

Produces

```text
1 2 3 4 5
```

Remember:

The stop value is **never included**.

---

# Chapter Summary / Cheat Sheet

| Tool | Purpose |
|------|----------|
| `while` | Repeat until condition becomes false |
| `for` | Iterate over an iterable |
| `range()` | Generate number sequences |
| `enumerate()` | Index + Value |
| `zip()` | Combine multiple iterables |
| Nested Loop | Loop inside another loop |

---

# What's Next?

In **Chapter 7 — Loop Control**, you'll learn how to control loop execution using:

- `break`
- `continue`
- `pass`
- `else` with loops
- Practical looping patterns

These statements give you precise control over how and when loops execute.