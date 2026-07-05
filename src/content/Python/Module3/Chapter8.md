# Module 3 — Functions

# Chapter 8 — Functions

---

# Learning Objectives

By the end of this chapter, you will understand:

- What is a Function?
- Why Functions are Needed
- Function Syntax
- Calling Functions
- Parameters
- Arguments
- Return Values
- Variable Scope
- Local vs Global Variables
- Docstrings
- Best Practices
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're building a house.

To build it, you repeatedly perform certain tasks.

- Mix Cement
- Lay Bricks
- Paint Walls
- Install Doors

Now imagine if every time you wanted to paint a room, you had to explain the entire painting process from scratch.

That would be inefficient.

Instead, you simply tell the workers:

> "Paint the room."

The workers already know **how** to paint.

Programming works the same way.

A **function** is simply a named block of code that performs a specific task.

Instead of writing the same code again and again,

you write it once,

give it a name,

and reuse it whenever needed.

---

# Story — Pizza Restaurant

Imagine a pizza restaurant.

Customers order different pizzas.

```text
Customer

↓

Order Pizza

↓

Kitchen

↓

Prepare Pizza

↓

Serve Pizza
```

The customer doesn't care how the pizza is made.

They only need to place an order.

Functions work exactly like this.

```text
Program

↓

Call Function

↓

Function Executes

↓

Returns Result
```

The caller doesn't need to know the internal implementation.

---

# Why Do We Need Functions?

Suppose we want to greet three users.

Without functions,

```python
print("Welcome Alice")

print("Welcome Bob")

print("Welcome Charlie")
```

Now imagine greeting **1,000 users**.

The code becomes repetitive.

Instead,

```python
def greet(name):
    print(f"Welcome {name}")

greet("Alice")
greet("Bob")
greet("Charlie")
```

One function.

Unlimited reuse.

---

# Problems Without Functions

Programs become:

- Long
- Repetitive
- Difficult to debug
- Hard to maintain
- Hard to reuse

Functions solve all these problems.

---

# What is a Function?

A function is a reusable block of code designed to perform a specific task.

Think of it like a machine.

```text
Input

↓

Function

↓

Processing

↓

Output
```

Example

```python
def square(number):
    return number * number
```

Input

```text
5
```

Output

```text
25
```

---

# Function Syntax

```python
def function_name(parameters):
    # Function Body
    return value
```

Every function has four parts.

```text
def

↓

Function Name

↓

Parameters

↓

Body

↓

Return
```

---

# Defining a Function

Example

```python
def greet():

    print("Welcome to Python")
```

Notice something.

Nothing happens.

Why?

Because defining a function **does not execute it**.

It only tells Python that the function exists.

---

# Calling a Function

To execute a function,

call it using its name.

```python
def greet():
    print("Welcome")

greet()
```

Output

```text
Welcome
```

Execution Flow

```text
Program

↓

greet()

↓

Jump to Function

↓

Execute

↓

Return Back
```

---

# Function Lifecycle

Every function follows the same lifecycle.

```text
Define Function

↓

Call Function

↓

Execute Body

↓

Return

↓

Continue Program
```

---

# Parameters

A parameter is a variable defined in the function declaration.

Example

```python
def greet(name):

    print(f"Hello {name}")
```

Here,

```text
name
```

is a **parameter**.

---

# Arguments

An argument is the actual value passed to a function.

Example

```python
greet("Alice")
```

Here,

```text
Alice
```

is the **argument**.

Visualization

```text
Function

↓

Parameter

↓

Argument

↓

Output
```

---

# Example

```python
def square(number):

    print(number * number)

square(5)
```

Output

```text
25
```

---

# Multiple Parameters

Functions can accept multiple inputs.

```python
def add(a, b):

    print(a + b)

add(10, 20)
```

Output

```text
30
```

---

# Return Values

Many beginners confuse

```python
print()
```

with

```python
return
```

They are completely different.

---

# print()

```python
def add(a, b):

    print(a + b)
```

Output appears on the screen.

But nothing is returned.

---

# return

```python
def add(a, b):

    return a + b
```

Now

```python
result = add(10, 20)

print(result)
```

Output

```text
30
```

The value can now be stored,

used in calculations,

or passed to another function.

---

# print() vs return()

| print() | return |
|----------|---------|
| Displays output | Sends value back |
| Cannot reuse output | Can reuse output |
| Mainly for debugging | Used in real programs |

---

# Example

Bad

```python
def multiply(a, b):

    print(a * b)
```

Good

```python
def multiply(a, b):

    return a * b

result = multiply(5, 8)

print(result + 10)
```

Because the function returns a value,

we can use it anywhere.

---

# Variable Scope

Variables don't exist everywhere.

Their visibility depends on **scope**.

Python mainly has two scopes.

```text
Variables

│

├── Local

└── Global
```

---

# Local Variables

Variables created inside a function.

```python
def demo():

    x = 100

    print(x)
```

Outside the function,

```python
print(x)
```

Produces

```text
NameError
```

Because `x` only exists inside the function.

---

# Global Variables

Variables defined outside every function.

```python
message = "Hello"

def show():

    print(message)

show()
```

Output

```text
Hello
```

Global variables are accessible inside functions (unless shadowed).

---

# Local vs Global

```python
x = 100

def demo():

    x = 50

    print(x)

demo()

print(x)
```

Output

```text
50

100
```

The local variable hides the global one inside the function.

---

# Scope Visualization

```text
Global Scope

↓

message

↓

Function

↓

Local Scope

↓

name
```

Local variables disappear after the function finishes.

---

# Docstrings

Functions should explain themselves.

Example

```python
def square(number):
    """
    Returns the square of a number.
    """
    return number * number
```

Docstrings improve documentation and IDE support.

---

# Why Functions Matter

Functions provide:

- Reusability
- Modularity
- Readability
- Easier Testing
- Easier Debugging
- Better Team Collaboration

Large software systems are simply thousands of functions working together.

---

# Real-World Example

Imagine an online shopping application.

Instead of writing payment logic everywhere,

create functions.

```python
calculate_total()

validate_coupon()

process_payment()

send_email()

generate_invoice()
```

Each function performs one responsibility.

This is how real software is built.

---

# Memory Trick

Remember

```text
DPCR
```

**D**

Define

↓

**P**

Pass Arguments

↓

**C**

Call Function

↓

**R**

Return Result

Every function follows this cycle.

---

# Common Beginner Mistakes

### Mistake 1

Defining a function but forgetting to call it.

```python
def greet():
    print("Hello")
```

Nothing happens until

```python
greet()
```

---

### Mistake 2

Confusing parameters and arguments.

```python
def greet(name):
```

`name` → Parameter

```python
greet("Alice")
```

`"Alice"` → Argument

---

### Mistake 3

Using `print()` instead of `return`.

Use `return` when another part of the program needs the result.

---

### Mistake 4

Trying to access local variables outside the function.

---

### Mistake 5

Using too many global variables.

Functions should be as independent as possible.

---

# Interview Questions & Answers

## Q1. What is a function?

### Answer

A function is a reusable block of code that performs a specific task. It helps reduce code duplication and improves modularity.

### Example

```python
def greet():
    print("Hello")

greet()
```

### Interview Tip

Mention **reusability**, **modularity**, and **maintainability**.

---

## Q2. What is the difference between a parameter and an argument?

### Answer

A **parameter** is a variable in the function definition.

An **argument** is the actual value passed during the function call.

### Example

```python
def greet(name):   # name → Parameter
    print(name)

greet("Alice")     # Alice → Argument
```

### One-Line Revision

> Parameters receive values; arguments supply values.

---

## Q3. What is the difference between `print()` and `return`?

### Answer

`print()` displays a value on the screen.

`return` sends a value back to the caller.

### Example

```python
def add(a, b):
    return a + b

result = add(2, 3)

print(result)
```

### Interview Tip

Always prefer `return` when the result needs to be reused.

---

## Q4. What is variable scope?

### Answer

Scope defines where a variable is accessible.

Python mainly has:

- Local Scope
- Global Scope

Variables created inside a function are local and cannot be accessed outside it.

---

## Q5. Why are functions important?

### Answer

Functions:

- Reduce code duplication
- Improve readability
- Simplify testing
- Improve maintainability
- Encourage modular design

They are one of the fundamental building blocks of software engineering.

---

# Chapter Summary / Cheat Sheet

| Concept | Description |
|----------|-------------|
| Function | Reusable block of code |
| `def` | Defines a function |
| Parameter | Variable in function definition |
| Argument | Value passed during function call |
| `return` | Sends value back to caller |
| Local Variable | Exists only inside a function |
| Global Variable | Exists throughout the program |
| Docstring | Documentation for a function |

---

# What's Next?

In **Chapter 9 — Advanced Functions**, you'll learn how to write more flexible and powerful functions using:

- Default Parameters
- Keyword Arguments
- Positional Arguments
- `*args`
- `**kwargs`

These features are widely used in professional Python libraries and frameworks.