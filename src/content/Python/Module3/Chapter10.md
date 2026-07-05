# Module 3 — Functions

# Chapter 10 — Functional Programming

---

# Learning Objectives

By the end of this chapter, you will understand:

- What is Functional Programming?
- First-Class Functions
- Higher-Order Functions
- Lambda Functions
- map()
- filter()
- reduce()
- Closures
- When to Use Functional Programming
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

So far, we've treated functions as reusable blocks of code.

But in Python, functions are much more powerful.

Functions are **objects**.

This means they can:

- Be stored in variables
- Be passed as arguments
- Be returned from other functions
- Be created dynamically

This style of programming is called **Functional Programming**.

It encourages writing programs by combining small, reusable functions.

---

# Story — Factory Assembly Line

Imagine a car factory.

Each station performs exactly one job.

```text
Raw Material

↓

Cutting

↓

Painting

↓

Quality Check

↓

Packaging

↓

Finished Product
```

Each station doesn't know about the others.

It simply receives an input,

processes it,

and passes the result forward.

Functional programming follows the same idea.

Instead of writing one huge function,

we build many small functions and connect them together.

---

# What is Functional Programming?

Functional Programming (FP) is a programming style where computation is performed using **functions**.

Instead of modifying data,

functions receive inputs,

produce outputs,

and avoid unnecessary side effects.

Think of it as:

```text
Input

↓

Function

↓

Output
```

---

# First-Class Functions

In Python,

functions are **first-class objects**.

That means they behave like any other object.

They can be:

- Assigned to variables
- Passed to functions
- Returned from functions
- Stored in data structures

---

# Example

```python
def greet():
    return "Hello"

message = greet

print(message())
```

Output

```text
Hello
```

Notice

We didn't execute `greet`.

We stored the function itself inside another variable.

---

# Functions as Arguments

A function can receive another function.

Example

```python
def greet(name):
    return f"Hello {name}"

def display(func):

    print(func("Alice"))

display(greet)
```

Output

```text
Hello Alice
```

---

# Functions Returning Functions

Functions can also return other functions.

Example

```python
def outer():

    def inner():

        print("Inside Inner Function")

    return inner

func = outer()

func()
```

Output

```text
Inside Inner Function
```

---

# Higher-Order Functions

A **Higher-Order Function** is a function that:

- Accepts another function as an argument, or
- Returns another function.

Visualization

```text
Function

↓

Receives Function

↓

Processes

↓

Returns Result
```

Examples in Python

- map()
- filter()
- sorted()
- reduce()

---

# Lambda Functions

Sometimes writing a full function is unnecessary.

Instead,

Python provides anonymous functions called **lambda functions**.

Syntax

```python
lambda arguments: expression
```

---

# Example

Normal Function

```python
def square(x):

    return x * x
```

Lambda

```python
square = lambda x: x * x
```

Output

```python
print(square(5))
```

```text
25
```

---

# Why Lambda?

Useful when:

- The function is small
- Used only once
- Passed to another function

---

# Multiple Arguments

```python
add = lambda a, b: a + b

print(add(10, 20))
```

Output

```text
30
```

---

# map()

Suppose we have

```python
numbers = [1,2,3,4]
```

We want squares.

Traditional approach

```python
result = []

for number in numbers:

    result.append(number * number)
```

Functional approach

```python
result = map(lambda x: x * x, numbers)

print(list(result))
```

Output

```text
[1,4,9,16]
```

---

# Internal Working

```text
1

↓

Square

↓

1

----------------

2

↓

Square

↓

4

----------------

3

↓

Square

↓

9
```

Every element passes through the function.

---

# When to Use map()

Use `map()` when you want to **transform every element** of an iterable.

Examples:

- Convert temperatures
- Square numbers
- Convert strings to uppercase
- Format data

---

# filter()

Suppose

```python
numbers = [1,2,3,4,5,6]
```

We want only even numbers.

Traditional approach

```python
result = []

for number in numbers:

    if number % 2 == 0:

        result.append(number)
```

Functional approach

```python
result = filter(

lambda x: x % 2 == 0,

numbers

)

print(list(result))
```

Output

```text
[2,4,6]
```

---

# Internal Working

```text
1

↓

False

↓

Discard

----------------

2

↓

True

↓

Keep
```

---

# When to Use filter()

Whenever you want to remove unwanted elements.

Examples

- Valid Users
- Positive Numbers
- Active Customers
- Passed Students

---

# reduce()

Sometimes we want one final value.

Example

```text
[1,2,3,4]

↓

10
```

Python provides

```python
reduce()
```

It is available in

```python
functools
```

---

# Example

```python
from functools import reduce

numbers = [1,2,3,4]

result = reduce(

lambda a,b: a+b,

numbers

)

print(result)
```

Output

```text
10
```

---

# Internal Working

```text
1 + 2

↓

3

↓

3 + 3

↓

6

↓

6 + 4

↓

10
```

---

# map vs filter vs reduce

| Function | Purpose |
|----------|----------|
| map() | Transform data |
| filter() | Remove unwanted data |
| reduce() | Produce one final result |

---

# Closures

A closure is a function that remembers variables from its enclosing scope,

even after the outer function has finished executing.

---

# Example

```python
def multiplier(x):

    def multiply(y):

        return x * y

    return multiply

double = multiplier(2)

print(double(5))
```

Output

```text
10
```

Even though `multiplier()` has finished,

the inner function still remembers `x`.

---

# Closure Visualization

```text
Outer Function

↓

x = 2

↓

Inner Function

↓

Remembers x

↓

Returns Function
```

---

# Why Closures?

Closures are useful for:

- Function factories
- Data hiding
- Callbacks
- Decorators (coming next module)

---

# Real-World Example

Suppose we build a discount calculator.

```python
def discount(percent):

    def apply(price):

        return price - price * percent

    return apply

student_discount = discount(0.20)

print(student_discount(1000))
```

Output

```text
800
```

Different discount functions can be created without rewriting logic.

---

# Functional Programming vs Traditional Programming

| Traditional | Functional |
|--------------|------------|
| Loops | map(), filter() |
| Variables change | Prefer immutable data |
| Large functions | Small reusable functions |
| Explicit iteration | Function composition |

---

# Memory Trick

Remember

```text
LMFC
```

Pronounce it

> **"Lem-Fick"**

Meaning

```text
L → Lambda

M → map()

F → filter()

C → Closures
```

And remember:

```text
reduce()

↓

One Final Value
```

---

# Common Beginner Mistakes

### Mistake 1

Using lambda for large logic.

Lambda functions should be short and simple.

---

### Mistake 2

Forgetting that `map()` returns an iterator.

Convert it when needed.

```python
list(map(...))
```

---

### Mistake 3

Using `filter()` when list comprehensions are clearer.

Sometimes

```python
[x for x in numbers if x % 2 == 0]
```

is more readable.

---

### Mistake 4

Forgetting to import `reduce`.

```python
from functools import reduce
```

---

### Mistake 5

Thinking closures copy variables.

Closures keep references to variables from the enclosing scope.

---

# Interview Questions & Answers

## Q1. What are first-class functions?

### Answer

First-class functions are functions that can be treated like any other object.

They can be:

- Assigned to variables
- Passed as arguments
- Returned from functions

### Example

```python
def greet():
    return "Hello"

x = greet

print(x())
```

---

## Q2. What is a Higher-Order Function?

### Answer

A higher-order function either:

- Accepts another function as an argument, or
- Returns another function.

Examples include:

- `map()`
- `filter()`
- `sorted()`
- `reduce()`

---

## Q3. What is a lambda function?

### Answer

A lambda function is a small anonymous function written in a single expression.

Example

```python
square = lambda x: x * x
```

### Interview Tip

Use lambda only for short operations.

Complex logic should use `def`.

---

## Q4. Explain `map()`, `filter()`, and `reduce()`.

### Answer

- `map()` transforms every element.
- `filter()` selects elements based on a condition.
- `reduce()` combines all elements into one value.

### Example

```python
numbers = [1,2,3]

map(lambda x:x*2,numbers)

filter(lambda x:x>1,numbers)

reduce(lambda a,b:a+b,numbers)
```

---

## Q5. What is a closure?

### Answer

A closure is an inner function that remembers variables from its outer function even after the outer function has returned.

### Example

```python
def outer():

    x = 10

    def inner():

        return x

    return inner
```

### Interview Tip

Closures form the foundation for **decorators**, one of Python's most powerful features.

---

# Chapter Summary / Cheat Sheet

| Concept | Purpose |
|----------|----------|
| First-Class Function | Functions behave like objects |
| Higher-Order Function | Takes or returns functions |
| Lambda | Anonymous one-line function |
| map() | Transform each element |
| filter() | Select matching elements |
| reduce() | Combine elements into one |
| Closure | Function remembers outer variables |

---

# What's Next?

In **Chapter 11 — Recursion**, you'll learn how functions can **call themselves** to solve problems such as:

- Factorials
- Fibonacci Numbers
- Tree Traversals
- Divide and Conquer Algorithms

Recursion is a fundamental concept in algorithms, data structures, and technical interviews.