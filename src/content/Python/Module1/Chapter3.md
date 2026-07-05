# Module 1 — Python Fundamentals

# Chapter 3 — Python Operators

---

# Learning Objectives

By the end of this chapter, you will understand:

- What operators are
- Arithmetic Operators
- Assignment Operators
- Comparison Operators
- Logical Operators
- Bitwise Operators
- Identity Operators
- Membership Operators
- Operator Precedence
- Short-Circuit Evaluation

---

# Introduction

Imagine you're in primary school.

You already know symbols like:

```text
+

-

×

÷

>

<

=
```

These symbols perform operations on numbers.

Programming languages also have similar symbols.

They are called **Operators**.

Operators allow us to:

- Add numbers
- Compare values
- Make decisions
- Manipulate bits
- Assign values
- Check membership

Without operators, programming would be almost impossible.

---

# Story — The Calculator

Imagine a calculator.

It has buttons.

```text
7

+

3

=

10
```

Notice something.

The calculator isn't smart because of the numbers.

It's smart because of the **operations**.

Python operators are the buttons that tell Python **what operation to perform**.

---

# What is an Operator?

An **operator** is a symbol that performs an operation on one or more values.

Example

```python
5 + 3
```

Here

```text
+
```

is the operator.

The numbers

```text
5

3
```

are operands.

Visualization

```text
Operand

↓

5

↓

+

↓

3

↓

Operand

↓

Result

↓

8
```

---

# Types of Operators

Python provides several categories.

```text
Python Operators

│

├── Arithmetic

├── Assignment

├── Comparison

├── Logical

├── Bitwise

├── Identity

├── Membership
```

Let's understand each one.

---

# Arithmetic Operators

These are the most common operators.

They perform mathematical calculations.

| Operator | Meaning | Example |
|----------|---------|----------|
| + | Addition | 5 + 3 |
| - | Subtraction | 5 - 3 |
| * | Multiplication | 5 * 3 |
| / | Division | 10 / 2 |
| // | Floor Division | 10 // 3 |
| % | Modulus | 10 % 3 |
| ** | Exponent | 2 ** 3 |

---

## Addition

```python
print(5 + 3)
```

Output

```text
8
```

---

## Subtraction

```python
print(10 - 4)
```

Output

```text
6
```

---

## Multiplication

```python
print(6 * 5)
```

Output

```text
30
```

---

## Division

```python
print(10 / 2)
```

Output

```text
5.0
```

Notice that Python returns a **float**, even when the result is a whole number.

---

## Floor Division

Suppose you divide:

```text
10

÷

3
```

Actual answer

```text
3.333
```

Floor division removes the decimal part.

```python
print(10 // 3)
```

Output

```text
3
```

---

## Modulus

Returns the remainder.

```python
print(10 % 3)
```

Output

```text
1
```

Useful for:

- Even/Odd checking
- Circular indexing
- Hashing

---

## Exponent

```python
print(2 ** 5)
```

Output

```text
32
```

Meaning

```text
2 × 2 × 2 × 2 × 2
```

---

# Arithmetic Operator Diagram

```text
10

↓

÷

↓

3

↓

10 / 3

↓

3.333

----------------

10 // 3

↓

3

----------------

10 % 3

↓

1
```

---

# Assignment Operators

Assignment operators store values.

Basic assignment

```python
x = 10
```

Python also supports shorthand operators.

| Operator | Example |
|----------|----------|
| = | x = 5 |
| += | x += 2 |
| -= | x -= 2 |
| *= | x *= 2 |
| /= | x /= 2 |
| //= | x //= 2 |
| %= | x %= 2 |
| **= | x **= 2 |

---

## Example

Instead of

```python
x = x + 5
```

write

```python
x += 5
```

Cleaner

Shorter

More readable

---

# Comparison Operators

Comparison operators compare values.

The result is always:

```python
True

or

False
```

| Operator | Meaning |
|----------|---------|
| == | Equal |
| != | Not Equal |
| > | Greater Than |
| < | Less Than |
| >= | Greater or Equal |
| <= | Less or Equal |

---

Example

```python
print(10 > 5)
```

Output

```text
True
```

---

Example

```python
print(5 == 10)
```

Output

```text
False
```

---

# Logical Operators

Used to combine conditions.

| Operator | Meaning |
|----------|---------|
| and | Both must be True |
| or | At least one True |
| not | Reverse Boolean |

---

## AND

```python
age = 25

salary = 50000

print(age > 18 and salary > 40000)
```

Output

```text
True
```

---

## OR

```python
print(10 > 5 or 5 > 20)
```

Output

```text
True
```

---

## NOT

```python
print(not True)
```

Output

```text
False
```

---

# Logical Operator Diagram

```text
Condition A

AND

Condition B

↓

Both True

↓

True
```

---

# Bitwise Operators

Bitwise operators work directly on binary numbers.

| Operator | Meaning |
|----------|---------|
| & | AND |
| \| | OR |
| ^ | XOR |
| ~ | NOT |
| << | Left Shift |
| >> | Right Shift |

Example

```python
5 & 3
```

Binary

```text
5

101

3

011

--------

001

↓

1
```

Bitwise operators are mainly used in:

- System Programming
- Networking
- Embedded Systems
- Performance Optimization

---

# Identity Operators

Identity operators compare **objects**, not values.

| Operator | Meaning |
|----------|---------|
| is | Same Object |
| is not | Different Object |

Example

```python
a = [1,2]

b = a

print(a is b)
```

Output

```text
True
```

Both variables point to the same object.

---

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

The values are equal,

but the objects are different.

---

# Equality vs Identity

```python
a = [1,2]

b = [1,2]
```

```python
a == b
```

↓

```text
True
```

Same values.

```python
a is b
```

↓

```text
False
```

Different objects.

Visualization

```text
a

↓

Object A

[1,2]

----------------

b

↓

Object B

[1,2]
```

---

# Membership Operators

Used to check whether an element exists.

| Operator | Meaning |
|----------|---------|
| in | Exists |
| not in | Doesn't Exist |

Example

```python
numbers = [1,2,3]

print(2 in numbers)
```

Output

```text
True
```

---

Example

```python
print(5 not in numbers)
```

Output

```text
True
```

Very useful with:

- Lists
- Tuples
- Sets
- Dictionaries
- Strings

---

# Operator Precedence

Suppose we write

```python
2 + 3 * 4
```

Should Python compute

```text
(2+3)

×

4
```

or

```text
2

+

(3×4)
```

Python follows precedence rules.

Higher precedence executes first.

---

## Common Precedence

Highest →

```text
()

↓

**

↓

* / // %

↓

+ -

↓

Comparisons

↓

not

↓

and

↓

or
```

---

Example

```python
print(2 + 3 * 4)
```

Output

```text
14
```

because

```text
3 × 4

↓

12

↓

2 + 12

↓

14
```

---

# Short-Circuit Evaluation

Python avoids unnecessary work.

Example

```python
x = 10

print(x > 5 or x / 0)
```

Will Python divide by zero?

No.

Why?

Because

```text
True

OR

Anything

↓

Always True
```

Python stops immediately.

This is called **Short-Circuit Evaluation**.

---

# Short-Circuit Diagram

```text
Condition 1

↓

True

↓

Stop

↓

Condition 2

Never Evaluated
```

This improves performance and avoids unnecessary errors.

---

# Memory Trick

Remember

```text
AACLBIM
```

Pronounce it:

> **"Ackle-Bim"**

It stands for:

```text
A

Arithmetic

↓

A

Assignment

↓

C

Comparison

↓

L

Logical

↓

B

Bitwise

↓

I

Identity

↓

M

Membership
```

These are the seven major categories of Python operators.

---

# Common Mistakes

### Mistake 1

Confusing

```python
=
```

with

```python
==
```

```text
=

Assignment

==

Comparison
```

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

to compare values.

Use

```python
==
```

for value comparison.

Use

```python
is
```

for object identity.

---

### Mistake 3

Forgetting operator precedence.

Wrong expectation

```python
2 + 3 * 4
```

Correct result

```text
14
```

not

```text
20
```

---

### Mistake 4

Misunderstanding floor division.

```python
10 // 3
```

Result

```text
3
```

not

```text
3.333
```

---

# Interview Questions

- What is the difference between `=` and `==`?
- Explain the difference between `==` and `is`.
- What is floor division?
- What is short-circuit evaluation?
- Why is `%` useful?
- Explain operator precedence.
- When are bitwise operators used?

---

# Chapter Summary / Cheat Sheet

| Category | Operators |
|----------|-----------|
| Arithmetic | `+ - * / // % **` |
| Assignment | `= += -= *= /= //= %= **=` |
| Comparison | `== != > < >= <=` |
| Logical | `and or not` |
| Bitwise | `& \| ^ ~ << >>` |
| Identity | `is`, `is not` |
| Membership | `in`, `not in` |

### Operator Precedence (High → Low)

```text
()

↓

**

↓

* / // %

↓

+ -

↓

Comparisons

↓

not

↓

and

↓

or
```

---

# What's Next?

In **Chapter 4 — Writing Better Python**, we'll learn how to write code that is:

- Clean
- Readable
- Pythonic
- Maintainable

We'll cover PEP 8, naming conventions, code readability, and common beginner mistakes that distinguish professional Python developers from beginners.