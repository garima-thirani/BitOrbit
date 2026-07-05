# Module 2 — Control Flow

# Chapter 5 — Decision Making

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why programs need decision making
- Boolean Expressions
- if Statement
- if-else Statement
- if-elif-else Ladder
- Nested if Statements
- match-case Statement (Python 3.10+)
- Conditional Expressions (Ternary Operator)
- Best Practices
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're driving a car.

You constantly make decisions.

```text
Traffic Light

↓

Green?

↓

Yes → Drive

↓

No

↓

Stop
```

Or

```text
Is it raining?

↓

Yes → Carry Umbrella

↓

No → Go Normally
```

Life is full of decisions.

Programs work exactly the same way.

Without decision-making,

every program would execute every line from top to bottom, regardless of the situation.

Decision-making allows programs to become **smart**.

---

# Story — ATM Machine

Imagine you're withdrawing money from an ATM.

The ATM doesn't immediately give you cash.

Instead, it asks several questions.

```text
Insert Card

↓

Is Card Valid?

↓

Yes

↓

Enter PIN

↓

Correct PIN?

↓

Yes

↓

Enough Balance?

↓

Yes

↓

Dispense Cash
```

If any answer is **No**,

the process stops.

Python's decision-making works exactly like this.

---

# What is Decision Making?

Decision making allows a program to choose between multiple paths.

Instead of executing everything,

the program evaluates a condition.

```text
Condition

↓

True

↓

Execute Block A

----------------

False

↓

Execute Block B
```

---

# Boolean Expressions

Every decision is based on a Boolean expression.

A Boolean expression always evaluates to:

```python
True

or

False
```

Example

```python
age = 20

print(age >= 18)
```

Output

```text
True
```

Python evaluates the expression before deciding what to do next.

---

# The if Statement

The simplest decision-making statement is `if`.

Syntax

```python
if condition:
    statement
```

If the condition is `True`,

the block executes.

If it is `False`,

Python skips it.

---

# Flow Diagram

```text
Condition

↓

True?

├── Yes

│      ↓

│ Execute Block

│

└── No

↓

Skip Block
```

---

# Example 1 — Age Check

```python
age = 20

if age >= 18:
    print("You can vote.")
```

Output

```text
You can vote.
```

---

# Example 2 — Temperature

```python
temperature = 38

if temperature > 35:
    print("It's a hot day.")
```

Output

```text
It's a hot day.
```

---

# What Happens Internally?

Consider

```python
age = 20

if age >= 18:
    print("Adult")
```

Execution Flow

```text
age = 20

↓

age >= 18 ?

↓

True

↓

Execute print()
```

Python first evaluates the condition.

Only then does it decide whether to execute the block.

---

# Indentation Matters

Unlike many programming languages,

Python uses indentation to define blocks.

Correct

```python
if age >= 18:
    print("Adult")
```

Incorrect

```python
if age >= 18:
print("Adult")
```

Python raises an `IndentationError`.

---

# if-else Statement

Sometimes we want to execute one block if the condition is true,

and another block if it's false.

Syntax

```python
if condition:
    statement1
else:
    statement2
```

---

# Flow Diagram

```text
Condition

↓

True?

├── Yes

│      ↓

│ Block A

│

└── No

↓

Block B
```

---

# Example — Even or Odd

```python
number = 7

if number % 2 == 0:
    print("Even")
else:
    print("Odd")
```

Output

```text
Odd
```

---

# Example — Login

```python
password = "python123"

if password == "python123":
    print("Login Successful")
else:
    print("Invalid Password")
```

---

# if-elif-else Ladder

Suppose there are more than two choices.

Example

Grades.

```text
Marks

↓

90+

↓

A

80+

↓

B

70+

↓

C

Below

↓

Fail
```

Python provides `elif`.

Syntax

```python
if condition1:
    ...

elif condition2:
    ...

elif condition3:
    ...

else:
    ...
```

---

# Example — Student Grades

```python
marks = 82

if marks >= 90:
    print("Grade A")

elif marks >= 80:
    print("Grade B")

elif marks >= 70:
    print("Grade C")

else:
    print("Fail")
```

Output

```text
Grade B
```

---

# Execution Flow

Python checks conditions from top to bottom.

```text
Condition 1

↓

False

↓

Condition 2

↓

True

↓

Execute

↓

Stop
```

Once one condition becomes true,

the remaining conditions are ignored.

---

# Nested if

An `if` statement can contain another `if`.

Example

```python
age = 22
citizen = True

if age >= 18:
    if citizen:
        print("Eligible to Vote")
```

---

# Flow Diagram

```text
Age >=18 ?

↓

Yes

↓

Citizen?

↓

Yes

↓

Eligible
```

---

# When Should You Use Nested if?

Use nested `if` only when one decision naturally depends on another.

Avoid deep nesting because it makes code harder to read.

---

# match-case Statement (Python 3.10+)

Python introduced `match-case` as an alternative to long `if-elif` chains.

Syntax

```python
match value:

    case option1:
        ...

    case option2:
        ...

    case _:
        ...
```

The `_` acts as the default case.

---

# Example

```python
day = 3

match day:

    case 1:
        print("Monday")

    case 2:
        print("Tuesday")

    case 3:
        print("Wednesday")

    case _:
        print("Invalid Day")
```

Output

```text
Wednesday
```

---

# When to Use match-case?

Good for:

- Menus
- Commands
- State Machines
- Fixed Choices

Avoid using it for complex Boolean conditions.

---

# Conditional Expression (Ternary Operator)

Sometimes an `if-else` is very small.

Instead of

```python
if age >= 18:
    status = "Adult"
else:
    status = "Minor"
```

Write

```python
status = "Adult" if age >= 18 else "Minor"
```

Short.

Readable.

Pythonic.

---

# Real-World Example

Imagine an e-commerce website.

```text
Order Placed

↓

Payment Successful?

↓

Yes

↓

Ship Order

----------------

No

↓

Cancel Order
```

Every online application contains thousands of decision points like these.

---

# Memory Trick

Remember

```text
IFEM
```

**I**

if

↓

**F**

if-else

↓

**E**

elif

↓

**M**

match-case

These are the four major decision-making constructs in Python.

---

# Common Beginner Mistakes

### Mistake 1

Using `=` instead of `==`

❌

```python
if age = 18:
```

✔

```python
if age == 18:
```

---

### Mistake 2

Incorrect indentation

Python requires indentation after every `if`.

---

### Mistake 3

Checking multiple conditions using separate `if` statements when `elif` is more appropriate.

❌

```python
if marks >= 90:
    print("A")

if marks >= 80:
    print("B")
```

The second condition is also true.

Use `elif` instead.

---

### Mistake 4

Writing deeply nested `if` statements.

Prefer combining conditions using `and` or `or` when appropriate.

---

# Interview Questions & Answers

## Q1. What is the difference between `if` and `if-else`?

### Answer

An `if` statement executes a block only when the condition is true.

An `if-else` statement always executes exactly one block.

### Example

```python
age = 15

if age >= 18:
    print("Adult")
else:
    print("Minor")
```

### Interview Tip

> Use `if` when no action is needed for the false case.
>
> Use `if-else` when both outcomes require different actions.

---

## Q2. What is the difference between `if-elif-else` and nested `if`?

### Answer

`if-elif-else` is used when checking **multiple mutually exclusive conditions**.

Nested `if` is used when one condition depends on another.

### Example

**if-elif**

```python
marks = 85

if marks >= 90:
    print("A")
elif marks >= 80:
    print("B")
```

**Nested if**

```python
if age >= 18:
    if citizen:
        print("Eligible")
```

### Interview Tip

If the conditions are independent levels, use `elif`.

If the second condition should only be checked after the first succeeds, use nested `if`.

---

## Q3. What is `match-case`?

### Answer

`match-case` is Python's pattern matching statement introduced in Python 3.10.

It provides a cleaner alternative to long `if-elif` chains when matching fixed values.

### Example

```python
match command:

    case "start":
        print("Starting")

    case "stop":
        print("Stopping")

    case _:
        print("Unknown Command")
```

---

## Q4. What is the ternary operator?

### Answer

A ternary operator allows writing a simple `if-else` expression in one line.

Example

```python
status = "Pass" if marks >= 40 else "Fail"
```

It should be used only when it improves readability.

---

# Chapter Summary / Cheat Sheet

| Statement | Purpose |
|-----------|----------|
| `if` | Execute when condition is true |
| `if-else` | Choose between two paths |
| `if-elif-else` | Choose among multiple conditions |
| Nested `if` | Decision inside another decision |
| `match-case` | Match fixed values |
| Ternary | One-line conditional expression |

---

# What's Next?

In **Chapter 6 — Loops**, you'll learn how to make programs repeat tasks efficiently using:

- `while`
- `for`
- `range()`
- `enumerate()`
- `zip()`
- Nested loops
- Practical looping patterns

Instead of writing the same code repeatedly, you'll learn how Python automates repetition.