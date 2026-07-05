# Module 14 — NumPy

# Chapter 49 — ndarray

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why NumPy?
- Installing NumPy
- What is an ndarray?
- Creating Arrays
- Array Dimensions
- Shape
- Size
- Data Types (dtype)
- Array Attributes
- Creating Special Arrays
- Lists vs NumPy Arrays
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're managing a library.

You have two choices.

Option 1

Keep books scattered everywhere.

Finding one becomes slow.

Option 2

Arrange books neatly on shelves.

Finding any book becomes easy and fast.

NumPy does the same thing for numbers.

Instead of storing numbers randomly,

it stores them in a highly optimized structure called an **ndarray**.

This makes mathematical operations incredibly fast.

---

# Story — Warehouse Organization

Imagine a warehouse.

Boxes are arranged in rows and columns.

```text
📦 📦 📦

📦 📦 📦

📦 📦 📦
```

Finding any box is easy.

Now imagine boxes scattered randomly.

Finding one takes much longer.

NumPy organizes data like the warehouse.

Python Lists are more like scattered boxes.

---

# Why NumPy?

Python Lists are flexible,

but flexibility comes with a cost.

Problems with lists

- Slower Computation
- More Memory Usage
- No Vectorized Operations
- Poor Numerical Performance

NumPy solves all these problems.

---

# What is NumPy?

NumPy stands for

```text
Numerical Python
```

It is the foundation of

- Data Science
- Machine Learning
- Artificial Intelligence
- Scientific Computing
- Computer Vision
- Deep Learning

Libraries like

```text
Pandas

↓

Scikit-Learn

↓

TensorFlow

↓

PyTorch
```

all depend heavily on NumPy.

---

# Installing NumPy

```bash
pip install numpy
```

Import

```python
import numpy as np
```

Using

```python
np
```

is the standard convention.

---

# What is an ndarray?

The core object of NumPy is

```text
ndarray

↓

N-dimensional Array
```

It stores

- Same Data Type
- Contiguous Memory
- Fast Mathematical Operations

---

# Why "N-Dimensional"?

Arrays can have

```text
0D

↓

Scalar

----------------

1D

↓

Vector

----------------

2D

↓

Matrix

----------------

3D+

↓

Tensor
```

NumPy supports all of them.

---

# Creating Your First Array

```python
import numpy as np

arr = np.array(

[1,2,3,4]

)

print(arr)
```

Output

```text
[1 2 3 4]
```

---

# 2D Array

```python
matrix = np.array(

[

[1,2],

[3,4]

]

)
```

Visualization

```text
1 2

3 4
```

This is a matrix.

---

# 3D Array

```python
tensor = np.array(

[

[

[1,2],

[3,4]

],

[

[5,6],

[7,8]

]

]

)
```

Think of it as

```text
Stack of Matrices
```

---

# Array Attributes

NumPy arrays have useful attributes.

```python
arr.shape

arr.ndim

arr.size

arr.dtype
```

Let's understand each one.

---

# Shape

Shape tells us

how many rows and columns exist.

Example

```python
matrix = np.array(

[

[1,2],

[3,4]

]

)

print(matrix.shape)
```

Output

```text
(2,2)
```

Meaning

```text
2 Rows

↓

2 Columns
```

---

# ndim

Number of Dimensions.

Example

```python
arr.ndim
```

Examples

```text
[1,2]

↓

1

----------------

[[1,2],[3,4]]

↓

2

----------------

3D Tensor

↓

3
```

---

# Size

Number of total elements.

Example

```python
matrix.size
```

Output

```text
4
```

Because

```text
1

2

3

4
```

Total = 4 elements.

---

# dtype

Shows the type of every element.

Example

```python
arr.dtype
```

Output

```text
int64
```

Unlike Python Lists,

every element inside an ndarray

must have the same type.

---

# Why Same Data Type?

Suppose

```text
1

2

3

4
```

All Integers.

Python stores them efficiently.

If mixed types existed,

performance would decrease.

This is one reason NumPy is so fast.

---

# Creating Arrays

Using Lists

```python
np.array(

[1,2,3]

)
```

---

# Creating Zeros

```python
np.zeros(

(3,3)

)
```

Output

```text
0 0 0

0 0 0

0 0 0
```

---

# Creating Ones

```python
np.ones(

(2,4)

)
```

Output

```text
1 1 1 1

1 1 1 1
```

---

# Identity Matrix

```python
np.eye(3)
```

Output

```text
1 0 0

0 1 0

0 0 1
```

Very useful in Linear Algebra.

---

# Range

```python
np.arange(

0,

10,

2

)
```

Output

```text
[0 2 4 6 8]
```

Similar to Python's

```python
range()
```

but returns an ndarray.

---

# Evenly Spaced Numbers

```python
np.linspace(

0,

1,

5

)
```

Output

```text
[0.00

0.25

0.50

0.75

1.00]
```

Unlike

```python
arange()
```

it creates a fixed number of equally spaced values.

---

# Random Arrays

```python
np.random.rand(

3,

3

)
```

Creates

```text
3 × 3

Random Numbers
```

Useful in simulations and Machine Learning.

---

# List vs ndarray

| Python List | NumPy ndarray |
|--------------|---------------|
| Different Types Allowed | Single Data Type |
| Slower | Faster |
| Higher Memory Usage | Lower Memory Usage |
| No Vectorization | Vectorized Operations |
| General Purpose | Numerical Computing |

---

# Memory Layout

Python List

```text
Pointer

↓

Pointer

↓

Pointer

↓

Pointer
```

NumPy Array

```text
1 2 3 4 5 6

Stored Continuously
```

Continuous memory improves CPU cache usage,

making operations significantly faster.

---

# Real-World Example

Imagine storing temperatures.

Python List

```text
[25,26,27,28,...]
```

NumPy Array

```text
Optimized Continuous Memory

↓

Fast Statistics

↓

Fast Visualization

↓

Machine Learning
```

---

# Memory Trick

Remember

```text
SSDN
```

**S**

Shape

↓

**S**

Size

↓

**D**

dtype

↓

**N**

ndim

These are the four most important ndarray attributes.

---

# Common Beginner Mistakes

### Mistake 1

Using Python Lists for numerical computing.

Whenever you're performing mathematical computations on large datasets,

prefer NumPy arrays.

---

### Mistake 2

Confusing

```python
shape
```

with

```python
size
```

- `shape` → Dimensions of the array.
- `size` → Total number of elements.

---

### Mistake 3

Assuming arrays can contain arbitrary mixed data types efficiently.

NumPy arrays are optimized when all elements share the same data type.

---

### Mistake 4

Forgetting to import NumPy as

```python
np
```

Using

```python
import numpy as np
```

is the universally accepted convention.

---

# Interview Questions & Answers

## Q1. What is an ndarray?

### Answer

An `ndarray` (N-dimensional array) is NumPy's core data structure.

It stores homogeneous data in contiguous memory,

allowing fast numerical computations and efficient memory usage.

---

## Q2. Why is NumPy faster than Python Lists?

### Answer

NumPy arrays store elements of the same type in contiguous memory.

This reduces memory overhead,

improves CPU cache efficiency,

and enables vectorized operations implemented in optimized C code.

---

## Q3. What is the difference between `shape` and `size`?

### Answer

- `shape` returns the dimensions of an array.
- `size` returns the total number of elements.

Example

```python
arr = np.array([[1,2],[3,4]])

arr.shape

# (2,2)

arr.size

# 4
```

---

## Q4. What does `dtype` represent?

### Answer

`dtype` specifies the data type of elements stored in the array,

such as

- `int32`
- `int64`
- `float64`
- `bool`

All elements in an ndarray share the same data type.

---

## Q5. What is the difference between `arange()` and `linspace()`?

### Answer

`arange()`

creates values using a fixed step size.

Example

```python
np.arange(0,10,2)

# [0 2 4 6 8]
```

`linspace()`

creates a specified number of equally spaced values.

Example

```python
np.linspace(0,1,5)

# [0.00 0.25 0.50 0.75 1.00]
```

---

# Chapter Summary / Cheat Sheet

| Concept | Purpose |
|----------|----------|
| `ndarray` | Core NumPy data structure |
| `np.array()` | Create an array |
| `shape` | Dimensions |
| `size` | Total elements |
| `ndim` | Number of dimensions |
| `dtype` | Data type of elements |
| `np.zeros()` | Array of zeros |
| `np.ones()` | Array of ones |
| `np.eye()` | Identity matrix |
| `np.arange()` | Sequence with step size |
| `np.linspace()` | Equally spaced values |
| `np.random.rand()` | Random numbers |

---

# What's Next?

In **Chapter 50 — Indexing & Broadcasting**, you'll learn the two most powerful NumPy concepts:

- Array Indexing
- Slicing
- Boolean Indexing
- Fancy Indexing
- Broadcasting Rules
- Vectorized Operations

These concepts are the key to writing concise, high-performance numerical code and are used extensively in data science and machine learning.