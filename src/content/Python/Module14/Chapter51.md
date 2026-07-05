# Module 14 — NumPy

# Chapter 51 — Universal Functions (ufuncs)

---

# Learning Objectives

By the end of this chapter, you will understand:

- What are Universal Functions (ufuncs)?
- Why Vectorization Matters
- Element-wise Operations
- Arithmetic Functions
- Mathematical Functions
- Trigonometric Functions
- Statistical Functions
- Aggregation Functions
- Comparison Functions
- Performance Benefits
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you are a teacher grading exams for **10,000 students**.

Option 1

Check every paper one by one.

```text
Student 1

↓

Student 2

↓

Student 3

...

↓

Student 10000
```

Very slow.

Option 2

Use a machine that grades all papers simultaneously.

Much faster.

NumPy's **Universal Functions (ufuncs)** work like that machine.

Instead of processing one element at a time,

they perform operations on the **entire array**.

---

# Story — Factory Assembly Line

Imagine assembling cars.

Without automation

```text
Worker

↓

One Car

↓

Next Car

↓

Next Car
```

With automation

```text
Assembly Line

↓

Hundreds of Cars

↓

Together
```

Universal Functions automate mathematical operations on arrays.

---

# What is a Universal Function?

A Universal Function (ufunc)

is a function that performs an operation

**element by element**

on NumPy arrays.

Visualization

```text
Array

↓

Universal Function

↓

New Array
```

No explicit loops are required.

---

# Why Universal Functions?

Suppose

```python
arr = np.array(

[1,2,3]

)
```

Without NumPy

```python
result = []

for x in arr:

    result.append(

        x * 2

    )
```

With NumPy

```python
result = arr * 2
```

Cleaner.

Shorter.

Much faster.

---

# Vectorization

This ability to operate on entire arrays

is called

```text
Vectorization
```

Instead of writing loops,

NumPy performs optimized operations internally.

---

# Element-wise Operations

Example

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

Each element is processed independently.

---

# Arithmetic Operations

NumPy supports

```text
+

-

*

/

//

%

**
```

Example

```python
a = np.array(

[1,2,3]

)

b = np.array(

[4,5,6]

)

print(

a + b

)
```

Output

```text
[5 7 9]
```

---

# Multiplication

```python
print(

a * b

)
```

Output

```text
[4 10 18]
```

Notice

This is **element-wise multiplication**,

not matrix multiplication.

---

# Power

```python
np.power(

a,

2

)
```

Output

```text
[1 4 9]
```

Equivalent to

```python
a ** 2
```

---

# Square Root

```python
np.sqrt(

a

)
```

Output

```text
[1.0

1.41

1.73]
```

---

# Absolute Value

```python
arr = np.array(

[-2,-5,7]

)

print(

np.abs(arr)

)
```

Output

```text
[2 5 7]
```

---

# Exponential

```python
np.exp(

a

)
```

Computes

```text
e^x
```

for every element.

Widely used in Machine Learning.

---

# Logarithm

```python
np.log(

a

)
```

Computes the natural logarithm.

Useful in

- Statistics
- Data Science
- AI

---

# Trigonometric Functions

NumPy supports

```python
np.sin()

np.cos()

np.tan()
```

Example

```python
angles = np.array(

[0,

np.pi/2]

)

print(

np.sin(

angles

)

)
```

Output

```text
[0.0

1.0]
```

---

# Rounding Functions

```python
np.floor()

np.ceil()

np.round()
```

Example

```python
arr = np.array(

[2.3,

4.8]

)

print(

np.floor(arr)

)
```

Output

```text
[2. 4.]
```

---

# Comparison Functions

Example

```python
a = np.array(

[1,2,3]

)

print(

a > 2

)
```

Output

```text
[False False True]
```

Useful for Boolean Indexing.

---

# Statistical Functions

Suppose

```python
marks = np.array(

[80,

90,

75,

95]

)
```

NumPy provides

```python
np.mean()

np.median()

np.std()

np.var()
```

---

# Mean

```python
np.mean(

marks

)
```

Output

```text
85
```

---

# Median

```python
np.median(

marks

)
```

Returns the middle value.

Useful when outliers exist.

---

# Standard Deviation

```python
np.std(

marks

)
```

Measures

how spread out

the values are.

---

# Variance

```python
np.var(

marks

)
```

Measures

the average squared deviation

from the mean.

---

# Aggregation Functions

Aggregation combines

many values

into one value.

---

# Sum

```python
np.sum(

marks

)
```

Output

```text
340
```

---

# Maximum

```python
np.max(

marks

)
```

Output

```text
95
```

---

# Minimum

```python
np.min(

marks

)
```

Output

```text
75
```

---

# Average

```python
np.mean(

marks

)
```

Output

```text
85
```

---

# Axis Parameter

Suppose

```python
matrix = np.array(

[

[1,2],

[3,4]

]

)
```

---

# Sum by Columns

```python
np.sum(

matrix,

axis=0

)
```

Output

```text
[4 6]
```

Visualization

```text
1 2

3 4

↓

↓

4 6
```

---

# Sum by Rows

```python
np.sum(

matrix,

axis=1

)
```

Output

```text
[3 7]
```

Visualization

```text
1+2

↓

3

-------------

3+4

↓

7
```

---

# Why Vectorization is Fast?

Python Loop

```text
Python

↓

One Element

↓

Next Element
```

NumPy

```text
Optimized C Code

↓

Entire Array

↓

CPU Optimization
```

Much faster.

---

# Real-World Example

Imagine processing

one million salaries.

Without NumPy

```python
for salary in salaries:

    salary *= 1.1
```

With NumPy

```python
salaries *= 1.1
```

One line.

Highly optimized.

---

# Memory Trick

Remember

```text
MAST
```

**M**

Math Functions

↓

**A**

Aggregation

↓

**S**

Statistics

↓

**T**

Trigonometry

These are the four major categories of ufuncs.

---

# Common Beginner Mistakes

### Mistake 1

Using Python loops instead of vectorized operations.

NumPy is designed to eliminate explicit loops.

---

### Mistake 2

Confusing

element-wise multiplication

with

matrix multiplication.

Use

```python
a * b
```

for element-wise multiplication.

Use

```python
a @ b
```

or

```python
np.dot()
```

for matrix multiplication.

---

### Mistake 3

Ignoring the

```python
axis
```

parameter.

Aggregation functions behave differently depending on the chosen axis.

---

### Mistake 4

Using Python's

```python
sum()

max()

min()
```

instead of NumPy equivalents.

Prefer

```python
np.sum()

np.max()

np.min()
```

for better performance.

---

# Interview Questions & Answers

## Q1. What is a Universal Function (ufunc)?

### Answer

A Universal Function (ufunc) is a NumPy function that performs element-wise operations on arrays.

They are implemented in optimized C code,

making them significantly faster than Python loops.

---

## Q2. What is Vectorization?

### Answer

Vectorization is the process of applying operations to entire arrays instead of individual elements.

It eliminates explicit loops,

improves readability,

and provides substantial performance improvements.

---

## Q3. What is the difference between `*` and `@` in NumPy?

### Answer

`*`

performs **element-wise multiplication**.

Example

```python
[1,2] * [3,4]

↓

[3,8]
```

`@`

performs **matrix multiplication**.

Example

```python
A @ B
```

This follows the rules of linear algebra.

---

## Q4. What is the purpose of the `axis` parameter?

### Answer

The `axis` parameter specifies the dimension along which an operation is performed.

- `axis=0` → Operate down columns.
- `axis=1` → Operate across rows.

---

## Q5. Why are NumPy ufuncs faster than Python loops?

### Answer

NumPy ufuncs execute optimized C code internally,

operate on contiguous memory,

and take advantage of CPU-level optimizations,

making them much faster than interpreted Python loops.

---

# Chapter Summary / Cheat Sheet

| Function | Purpose |
|----------|----------|
| `+ - * /` | Element-wise arithmetic |
| `np.power()` | Exponentiation |
| `np.sqrt()` | Square root |
| `np.abs()` | Absolute value |
| `np.exp()` | Exponential |
| `np.log()` | Natural logarithm |
| `np.sin()` | Sine |
| `np.cos()` | Cosine |
| `np.mean()` | Average |
| `np.median()` | Median |
| `np.std()` | Standard deviation |
| `np.var()` | Variance |
| `np.sum()` | Sum |
| `np.max()` | Maximum |
| `np.min()` | Minimum |
| `axis=0` | Column-wise operation |
| `axis=1` | Row-wise operation |

---

# What's Next?

In **Chapter 52 — Linear Algebra**, you'll explore one of NumPy's most powerful capabilities:

- Vectors
- Matrices
- Matrix Multiplication
- Dot Product
- Transpose
- Inverse
- Determinant
- Eigenvalues & Eigenvectors

These concepts form the mathematical foundation of Machine Learning, Deep Learning, Computer Graphics, Robotics, and Scientific Computing.