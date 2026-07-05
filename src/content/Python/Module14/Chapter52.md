# Module 14 — NumPy

# Chapter 52 — Linear Algebra

---

# Learning Objectives

By the end of this chapter, you will understand:

- What is Linear Algebra?
- Scalars, Vectors & Matrices
- Matrix Operations
- Matrix Multiplication
- Dot Product
- Transpose
- Identity Matrix
- Determinant
- Inverse
- Solving Linear Systems
- Eigenvalues & Eigenvectors
- Real-world Applications
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're navigating with Google Maps.

How does it calculate

- Directions?
- Distance?
- Rotation?
- Position?

Or think about

- Machine Learning
- Computer Graphics
- Robotics
- Computer Vision

What is the common mathematical language behind all of them?

The answer is

```text
Linear Algebra
```

NumPy provides an optimized library called

```python
numpy.linalg
```

to perform these operations efficiently.

---

# Story — GPS Navigation

Imagine you're driving.

Your current location is

```text
(2,3)
```

You move

```text
+ (4,1)
```

Now you're at

```text
(6,4)
```

Notice,

locations are represented using numbers.

Linear Algebra is simply mathematics for working with these numbers.

---

# Why Linear Algebra?

Machine Learning datasets often contain

```text
Millions of Rows

↓

Thousands of Features
```

These are naturally represented as matrices.

Without Linear Algebra,

modern AI wouldn't exist.

---

# Scalars

A scalar is

a single value.

Example

```text
5

3.14

-8
```

Visualization

```text
Scalar

↓

Single Number
```

---

# Vectors

A vector is

a one-dimensional collection of numbers.

Example

```python
v = np.array(

[2,4,6]

)
```

Visualization

```text
2

4

6
```

Vectors represent

- Velocity
- Position
- Features
- Direction

---

# Matrices

A matrix is

a two-dimensional array.

Example

```python
A = np.array(

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

Almost every Machine Learning dataset is represented as a matrix.

---

# Matrix Dimensions

Suppose

```text
1 2 3

4 5 6
```

Rows

```text
2
```

Columns

```text
3
```

Shape

```text
(2,3)
```

---

# Matrix Addition

Two matrices

must have the same dimensions.

Example

```python
A = np.array(

[

[1,2],

[3,4]

]

)

B = np.array(

[

[5,6],

[7,8]

]

)

print(

A + B

)
```

Output

```text
6 8

10 12
```

---

# Matrix Subtraction

```python
A - B
```

Subtracts corresponding elements.

---

# Element-wise Multiplication

```python
A * B
```

Output

```text
5 12

21 32
```

Each element is multiplied independently.

---

# Matrix Multiplication

This is different.

Example

```python
A @ B
```

or

```python
np.matmul(

A,

B

)
```

Visualization

```text
Rows

×

Columns
```

---

# Matrix Multiplication Rule

If

```text
A

↓

(m × n)

B

↓

(n × p)
```

Then

```text
Result

↓

(m × p)
```

The inner dimensions

must match.

---

# Example

```python
A = np.array(

[

[1,2],

[3,4]

]

)

B = np.array(

[

[5,6],

[7,8]

]

)

print(

A @ B

)
```

Output

```text
19 22

43 50
```

---

# Dot Product

The dot product measures

how similar two vectors are.

Example

```python
a = np.array(

[1,2,3]

)

b = np.array(

[4,5,6]

)

print(

np.dot(

a,

b

)

)
```

Output

```text
32
```

Calculation

```text
1×4

+

2×5

+

3×6

=

32
```

---

# Why Dot Product?

Applications include

- Recommendation Systems
- Search Engines
- Machine Learning
- Deep Learning
- Similarity Measurement

---

# Transpose

Transpose

swaps rows and columns.

Example

```python
A.T
```

Visualization

Before

```text
1 2 3

4 5 6
```

After

```text
1 4

2 5

3 6
```

Rows become columns.

---

# Identity Matrix

The identity matrix is

the matrix equivalent of

```text
Number 1
```

Example

```python
np.eye(3)
```

Output

```text
1 0 0

0 1 0

0 0 1
```

Property

```text
A × I

=

A
```

---

# Determinant

The determinant tells us

whether a matrix is

invertible.

Example

```python
np.linalg.det(

A

)
```

If

```text
Determinant = 0
```

The matrix

cannot be inverted.

---

# Inverse

The inverse of a matrix

is similar to

division.

Example

```python
np.linalg.inv(

A

)
```

Property

```text
A

×

A⁻¹

=

I
```

---

# Solving Linear Equations

Instead of manually solving

```text
Ax = b
```

NumPy provides

```python
np.linalg.solve(

A,

b

)
```

Much faster

and numerically stable.

---

# Eigenvalues & Eigenvectors

One of the most important concepts in Machine Learning.

Definition

```text
A × v

=

λ × v
```

Where

```text
λ

↓

Eigenvalue

v

↓

Eigenvector
```

NumPy

```python
np.linalg.eig(

A

)
```

returns

- Eigenvalues
- Eigenvectors

---

# Why Eigenvalues?

Applications

```text
Principal Component Analysis (PCA)

↓

Computer Vision

↓

Google PageRank

↓

Image Compression

↓

Recommendation Systems
```

---

# Linear Algebra Module

Most operations are available in

```python
numpy.linalg
```

Common functions

```python
np.dot()

np.matmul()

np.linalg.det()

np.linalg.inv()

np.linalg.solve()

np.linalg.eig()
```

---

# Real-World Example

Imagine predicting house prices.

Dataset

```text
Rows

↓

Houses

Columns

↓

Features
```

Machine Learning algorithms

represent the dataset

as matrices,

perform matrix multiplication,

and solve equations using Linear Algebra.

---

# Memory Trick

Remember

```text
MDTIDE
```

**M**

Matrix Multiplication

↓

**D**

Dot Product

↓

**T**

Transpose

↓

**I**

Inverse

↓

**D**

Determinant

↓

**E**

Eigenvalues

These are the six most important Linear Algebra operations in NumPy.

---

# Common Beginner Mistakes

### Mistake 1

Confusing

```python
*
```

with

```python
@
```

- `*` → Element-wise multiplication
- `@` → Matrix multiplication

---

### Mistake 2

Ignoring matrix dimensions.

Matrix multiplication only works when

```text
Columns of A

=

Rows of B
```

---

### Mistake 3

Trying to invert a singular matrix.

If

```text
det(A) = 0
```

the matrix has no inverse.

---

### Mistake 4

Using matrix inversion to solve equations.

Prefer

```python
np.linalg.solve()
```

It is faster,

more accurate,

and numerically stable.

---

# Interview Questions & Answers

## Q1. What is the difference between Element-wise Multiplication and Matrix Multiplication?

### Answer

Element-wise multiplication (`*`) multiplies corresponding elements independently.

Matrix multiplication (`@` or `np.matmul()`) follows the rules of linear algebra,

where rows of the first matrix are multiplied with columns of the second matrix.

---

## Q2. What is the Dot Product?

### Answer

The dot product multiplies corresponding elements of two vectors

and sums the results.

It is commonly used to measure similarity,

especially in Machine Learning,

Information Retrieval,

and Recommendation Systems.

---

## Q3. What is a Transpose?

### Answer

The transpose of a matrix swaps its rows and columns.

In NumPy,

it is obtained using

```python
A.T
```

---

## Q4. What is the purpose of a Determinant?

### Answer

The determinant indicates whether a matrix is invertible.

If the determinant is zero,

the matrix is singular and cannot be inverted.

---

## Q5. Why is Linear Algebra important in Machine Learning?

### Answer

Machine Learning algorithms represent datasets,

model parameters,

and computations as vectors and matrices.

Operations such as matrix multiplication,

dot products,

and eigenvalue decomposition are fundamental to algorithms like

- Linear Regression
- PCA
- Neural Networks
- Support Vector Machines

---

# Chapter Summary / Cheat Sheet

| Function | Purpose |
|----------|----------|
| `@` | Matrix Multiplication |
| `np.matmul()` | Matrix Multiplication |
| `np.dot()` | Dot Product |
| `A.T` | Transpose |
| `np.eye()` | Identity Matrix |
| `np.linalg.det()` | Determinant |
| `np.linalg.inv()` | Matrix Inverse |
| `np.linalg.solve()` | Solve Linear Equations |
| `np.linalg.eig()` | Eigenvalues & Eigenvectors |

---

# What's Next?

In **Chapter 53 — Performance Optimization**, you'll learn why NumPy is one of the fastest numerical computing libraries in Python:

- Vectorization
- Memory Efficiency
- Broadcasting Optimization
- Avoiding Python Loops
- Profiling NumPy Code
- Performance Best Practices

These optimization techniques are essential for working with large datasets and high-performance AI/ML applications.