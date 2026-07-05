# Module 14 — NumPy

# Chapter 50 — Indexing & Broadcasting

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Indexing Matters
- Basic Indexing
- Negative Indexing
- Slicing
- Multi-dimensional Indexing
- Boolean Indexing
- Fancy Indexing
- Views vs Copies
- Broadcasting
- Broadcasting Rules
- Practical Examples
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine entering a huge library.

There are millions of books.

Would you search every shelf one by one?

No.

Instead,

you use

```text
Floor

↓

Rack

↓

Shelf

↓

Book
```

This is exactly what indexing does.

It helps us access exactly the data we want.

NumPy extends Python indexing with powerful techniques like

- Boolean Indexing
- Fancy Indexing
- Broadcasting

which make data manipulation extremely efficient.

---

# Story — Chess Board

Imagine a chess board.

```text
♜ ♞ ♝ ♛

♟ ♟ ♟ ♟

...

```

To access a specific piece,

you use

```text
Row

↓

Column
```

NumPy arrays work the same way.

---

# Why Indexing?

Suppose you have

```python
arr = np.array(

[10,20,30,40,50]

)
```

How do you access

```text
30
```

Indexing provides the answer.

---

# Basic Indexing

```python
arr = np.array(

[10,20,30]

)

print(arr[0])
```

Output

```text
10
```

Indexes start from

```text
0
```

---

# Negative Indexing

Python allows indexing from the end.

Example

```python
print(

arr[-1]

)
```

Output

```text
30
```

Visualization

```text
10   20   30

0    1    2

-3  -2  -1
```

---

# Slicing

General syntax

```python
array[start:stop:step]
```

Example

```python
arr = np.array(

[10,20,30,40,50]

)

print(

arr[1:4]

)
```

Output

```text
[20 30 40]
```

---

# Slice Rules

```text
Start

Included

----------------

Stop

Excluded
```

Always remember

```text
Start Included

Stop Excluded
```

---

# Step Size

```python
print(

arr[::2]

)
```

Output

```text
[10 30 50]
```

Every second element.

---

# Reversing an Array

```python
print(

arr[::-1]

)
```

Output

```text
[50 40 30 20 10]
```

A negative step traverses the array backwards.

---

# 2D Indexing

Example

```python
matrix = np.array(

[

[1,2,3],

[4,5,6]

]

)

print(

matrix[1,2]

)
```

Output

```text
6
```

Visualization

```text
1 2 3

4 5 6
```

Row 1,

Column 2.

---

# 2D Slicing

```python
matrix[:,1]
```

Output

```text
[2 5]
```

Meaning

```text
All Rows

↓

Column 1
```

---

# Selecting Rows

```python
matrix[0,:]
```

Output

```text
[1 2 3]
```

Meaning

```text
Row 0

↓

All Columns
```

---

# Boolean Indexing

One of NumPy's most powerful features.

Example

```python
arr = np.array(

[10,20,30,40]

)

print(

arr > 20

)
```

Output

```text
[False False True True]
```

Now use it as an index.

```python
print(

arr[arr > 20]

)
```

Output

```text
[30 40]
```

---

# Visualization

```text
10

20

30

40

↓

Condition

↓

False

False

True

True

↓

Result

↓

30

40
```

---

# Multiple Conditions

Example

```python
arr[

(arr > 10)

&

(arr < 40)

]
```

Output

```text
[20 30]
```

Notice

NumPy uses

```python
&

|

~
```

instead of

```python
and

or

not
```

for element-wise logical operations.

---

# Fancy Indexing

Fancy Indexing means

using arrays of indexes.

Example

```python
arr = np.array(

[10,20,30,40]

)

print(

arr[[0,2]]

)
```

Output

```text
[10 30]
```

You can retrieve elements in any order.

---

# Example

```python
arr[[3,1,0]]
```

Output

```text
[40 20 10]
```

---

# Views vs Copies

One of the most important interview topics.

Example

```python
a = np.array(

[1,2,3]

)

b = a[0:2]
```

Did NumPy create

a new array?

No.

It created a

```text
View
```

Both share the same data.

---

# Example

```python
b[0] = 100

print(a)
```

Output

```text
[100 2 3]
```

The original array changes.

---

# Creating a Copy

Use

```python
copy()
```

```python
b = a.copy()
```

Now,

changes in

```python
b
```

do not affect

```python
a
```

---

# Broadcasting

One of NumPy's greatest superpowers.

Imagine

```text
Array

↓

+ 5
```

Should Python

add

5

manually

to every element?

NumPy does this automatically.

---

# Example

```python
arr = np.array(

[1,2,3]

)

print(

arr + 5

)
```

Output

```text
[6 7 8]
```

No loop required.

---

# Broadcasting Visualization

```text
1 2 3

+

5

↓

5 5 5

↓

6 7 8
```

NumPy conceptually "stretches" the scalar across the array.

---

# Broadcasting with Arrays

Example

```python
a = np.array(

[1,2,3]

)

b = np.array(

[10,20,30]

)

print(

a + b

)
```

Output

```text
[11 22 33]
```

---

# Broadcasting Different Shapes

Suppose

```python
[[1]

[2]

[3]]

+

[10 20 30]
```

Visualization

```text
1

2

3

↓

+

↓

10 20 30

↓

Result

↓

11 21 31

12 22 32

13 23 33
```

Broadcasting automatically expands compatible dimensions.

---

# Broadcasting Rules

Two dimensions are compatible if

```text
They Are Equal

OR

One of Them Is 1
```

Otherwise,

NumPy raises an error.

---

# Example

Compatible

```text
(3,1)

+

(1,4)

↓

(3,4)
```

Not Compatible

```text
(3,2)

+

(4,2)

↓

Error
```

---

# Why Broadcasting?

Without broadcasting

```python
for i in range(...):

    ...

```

With broadcasting

```python
array + value
```

Much shorter.

Much faster.

Much more readable.

---

# Real-World Example

Suppose every student's marks receive

5 bonus marks.

Instead of

```python
for
```

loops,

simply write

```python
marks + 5
```

NumPy updates every element automatically.

---

# Memory Trick

Remember

```text
IBB
```

**I**

Indexing

↓

**B**

Boolean Indexing

↓

**B**

Broadcasting

Or remember

```text
Select

↓

Filter

↓

Operate
```

---

# Common Beginner Mistakes

### Mistake 1

Forgetting that slicing creates a **view**.

Changing the slice changes the original array.

Use

```python
copy()
```

when an independent array is required.

---

### Mistake 2

Using

```python
and

or
```

with NumPy arrays.

Use

```python
&

|

~
```

instead.

---

### Mistake 3

Misunderstanding slice boundaries.

Remember

```text
Start Included

Stop Excluded
```

---

### Mistake 4

Ignoring broadcasting rules.

Arrays can only broadcast when dimensions are equal

or one of the dimensions is

```text
1
```

---

# Interview Questions & Answers

## Q1. What is Broadcasting in NumPy?

### Answer

Broadcasting is NumPy's mechanism for performing operations on arrays of different shapes.

Instead of copying data,

NumPy conceptually stretches compatible dimensions,

allowing efficient element-wise operations.

---

## Q2. What is the difference between a View and a Copy?

### Answer

A **View** shares memory with the original array.

Changes made to the view affect the original.

A **Copy** owns separate memory,

so changes do not affect the original array.

---

## Q3. What is Boolean Indexing?

### Answer

Boolean indexing filters array elements based on a condition.

Example

```python
arr[arr > 10]
```

returns only elements greater than 10.

---

## Q4. What is Fancy Indexing?

### Answer

Fancy indexing selects elements using arrays or lists of indices.

Example

```python
arr[[0,2,4]]
```

returns the first,

third,

and fifth elements.

---

## Q5. What are the rules for Broadcasting?

### Answer

Two dimensions are compatible if

- They are equal, or
- One of them is 1.

If neither condition is satisfied,

NumPy raises a broadcasting error.

---

# Chapter Summary / Cheat Sheet

| Concept | Purpose |
|----------|----------|
| Basic Indexing | Access single elements |
| Negative Indexing | Access from the end |
| Slicing | Access ranges |
| Boolean Indexing | Filter by condition |
| Fancy Indexing | Select using index arrays |
| View | Shared memory |
| Copy | Independent memory |
| Broadcasting | Automatic shape expansion |
| `copy()` | Create independent array |

---

# What's Next?

In **Chapter 51 — Universal Functions**, you'll learn how NumPy performs mathematical operations efficiently using:

- Universal Functions (ufuncs)
- Vectorization
- Mathematical Functions
- Statistical Functions
- Aggregation Functions
- Element-wise Operations

These features eliminate explicit loops and are one of the main reasons NumPy is significantly faster than pure Python.