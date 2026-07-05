# Module 2 — Control Flow

# Chapter 7 — Loop Control Statements

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Loop Control Statements are Needed
- break Statement
- continue Statement
- pass Statement
- else with Loops
- Practical Loop Patterns
- Choosing the Right Loop Control
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're driving from Delhi to Mumbai.

During the journey, different situations arise.

Sometimes you need to:

```text
Stop the Journey

↓

break
```

Sometimes you need to:

```text
Skip One Toll Plaza

↓

continue
```

Sometimes you reserve a place for something you'll implement later.

```text
Empty Space

↓

pass
```

Python provides three statements to control how loops behave.

Instead of blindly repeating instructions,

you can decide:

- When to stop
- When to skip
- When to do nothing

---

# Story — Security Guard

Imagine a security guard checking visitors entering a building.

```text
Visitor

↓

ID Valid?

↓

Yes

↓

Enter Building
```

But suppose:

A visitor is carrying prohibited items.

The guard immediately stops checking everyone.

```text
break
```

Another visitor forgot an ID card.

The guard skips that visitor and checks the next one.

```text
continue
```

The manager says:

> "We'll implement VIP checking later."

For now,

the guard leaves that section empty.

```text
pass
```

Python's loop control statements work exactly like this.

---

# Why Do We Need Loop Control?

Without loop control,

every iteration executes completely.

Sometimes this isn't desirable.

Example:

Searching for a student.

Once found,

there's no reason to keep searching.

Similarly,

sometimes we want to skip invalid data instead of stopping the program.

---

# break Statement

The `break` statement immediately terminates the nearest enclosing loop.

Execution continues with the first statement after the loop.

---

## Flow Diagram

```text
Loop

↓

Condition

↓

break?

↓

Yes

↓

Exit Loop

↓

Next Statement
```

---

## Example 1 — Stop at 5

```python
for number in range(1, 11):

    if number == 5:
        break

    print(number)
```

Output

```text
1
2
3
4
```

The loop stops when it reaches `5`.

---

## Internal Working

Iteration

```text
1

↓

Print
```

Iteration

```text
2

↓

Print
```

Iteration

```text
5

↓

break

↓

Loop Ends
```

The remaining numbers are never processed.

---

## Real-World Example

Searching for a customer.

```python
customers = ["Alice", "Bob", "Charlie"]

for customer in customers:

    if customer == "Bob":
        print("Customer Found")
        break
```

Once Bob is found,

continuing the search wastes time.

---

# continue Statement

Unlike `break`,

`continue` does **not** stop the loop.

Instead,

it skips the current iteration and immediately moves to the next one.

---

## Flow Diagram

```text
Loop

↓

Condition

↓

continue?

↓

Yes

↓

Skip Remaining Statements

↓

Next Iteration
```

---

## Example 1 — Skip Number 5

```python
for number in range(1, 8):

    if number == 5:
        continue

    print(number)
```

Output

```text
1
2
3
4
6
7
```

Notice that only `5` is skipped.

The loop continues normally afterward.

---

## Real-World Example

Suppose a website is processing uploaded files.

One file is corrupted.

Instead of stopping the entire upload,

we skip that file.

```python
files = ["a.txt", "b.txt", "corrupt.txt", "d.txt"]

for file in files:

    if file == "corrupt.txt":
        continue

    print("Processing", file)
```

Output

```text
Processing a.txt

Processing b.txt

Processing d.txt
```

---

# break vs continue

This is one of the most common interview questions.

| break | continue |
|--------|-----------|
| Stops entire loop | Skips current iteration |
| Loop ends | Loop continues |
| Used when work is finished | Used to ignore unwanted cases |

Visualization

```text
break

Loop

↓

STOP

------------------

continue

Loop

↓

Skip

↓

Continue
```

---

# pass Statement

Sometimes Python requires a block,

but we haven't written the implementation yet.

Python doesn't allow empty blocks.

Incorrect

```python
if True:
```

This raises an error.

Instead,

use

```python
pass
```

---

## Example

```python
if True:
    pass
```

Program runs successfully.

Nothing happens.

---

# Why pass?

Imagine designing software.

You know you'll implement a function later.

```python
def login():

    pass
```

Now the rest of the program can continue to be developed.

---

## Real-World Example

A software team may create the project structure first.

```python
class PaymentGateway:

    pass
```

Implementation can be added later.

---

# else with Loops

Many Python beginners don't know this feature exists.

A loop can have an `else` block.

The `else` executes **only if the loop finishes normally**.

If the loop exits using `break`,

the `else` block is skipped.

---

# Example 1 — Loop Completes Normally

```python
for i in range(3):

    print(i)

else:

    print("Loop Finished")
```

Output

```text
0
1
2
Loop Finished
```

---

# Example 2 — Loop Ends with break

```python
for i in range(5):

    if i == 3:
        break

    print(i)

else:

    print("Finished")
```

Output

```text
0
1
2
```

The `else` block is never executed.

---

# Why Does Loop else Exist?

Suppose you're searching for a product.

```python
products = ["TV", "Laptop", "Phone"]

search = "Tablet"

for product in products:

    if product == search:
        print("Found")
        break

else:

    print("Not Found")
```

Output

```text
Not Found
```

Notice how elegant this is.

No extra Boolean variable is required.

---

# Practical Loop Patterns

## Pattern 1 — Search

```python
for item in items:

    if item == target:

        print("Found")
        break
```

---

## Pattern 2 — Validation

```python
for password in passwords:

    if len(password) < 8:
        continue

    print(password)
```

---

## Pattern 3 — Infinite Server

```python
while True:

    request = receive_request()

    process(request)
```

Used in:

- Web Servers
- Chat Servers
- Games

---

## Pattern 4 — Retry

```python
attempt = 1

while attempt <= 3:

    if login():
        break

    attempt += 1
```

---

# Choosing the Right Statement

| Situation | Statement |
|-----------|-----------|
| Stop loop immediately | break |
| Skip current iteration | continue |
| Placeholder | pass |
| Execute after normal completion | else |

---

# Memory Trick

Remember

```text
BCPE
```

Pronounce it

> **"Bee-See-Pee"**

Meaning

```text
B

break

↓

C

continue

↓

P

pass

↓

E

else
```

---

# Common Beginner Mistakes

### Mistake 1

Confusing `break` and `continue`.

```text
break

↓

Entire Loop Stops

----------------

continue

↓

Current Iteration Stops
```

---

### Mistake 2

Using `pass` instead of `continue`.

Remember:

`pass` does nothing.

`continue` skips the iteration.

---

### Mistake 3

Expecting `else` to execute after `break`.

It won't.

The `else` block runs only if the loop completes normally.

---

### Mistake 4

Creating unnecessary Boolean variables.

Instead of

```python
found = False
```

Use

```python
for ...

else ...
```

where appropriate.

---

# Interview Questions & Answers

## Q1. What is the difference between `break` and `continue`?

### Answer

`break` immediately exits the loop.

`continue` skips only the current iteration and proceeds to the next one.

### Example

```python
for i in range(5):

    if i == 2:
        break

    print(i)
```

Output

```text
0
1
```

Now

```python
for i in range(5):

    if i == 2:
        continue

    print(i)
```

Output

```text
0
1
3
4
```

### Interview Tip

A common interview phrase:

> **break terminates the loop, while continue skips the current iteration.**

---

## Q2. What is the purpose of `pass`?

### Answer

`pass` is a placeholder statement.

It tells Python:

> "Do nothing here."

It is commonly used during development when the implementation is not yet complete.

### Example

```python
def process_payment():

    pass
```

---

## Q3. How does `else` work with loops?

### Answer

The `else` block executes only if the loop completes normally.

If the loop exits using `break`,

the `else` block is skipped.

### Example

```python
for i in range(3):
    print(i)
else:
    print("Done")
```

Output

```text
0
1
2
Done
```

---

## Q4. When should you use `break`?

### Answer

Use `break` when continuing the loop serves no purpose.

Examples:

- Searching
- Menu Exit
- Login Success
- Game Over
- Retry Mechanisms

Stopping early improves performance.

---

## Q5. Can `continue` be used in a `while` loop?

### Answer

Yes.

It skips the remaining statements of the current iteration and evaluates the loop condition again.

Example

```python
count = 0

while count < 5:

    count += 1

    if count == 3:
        continue

    print(count)
```

Output

```text
1
2
4
5
```

---

# Chapter Summary / Cheat Sheet

| Statement | Purpose |
|-----------|----------|
| `break` | Exit the loop immediately |
| `continue` | Skip the current iteration |
| `pass` | Placeholder that does nothing |
| `else` | Executes if loop finishes without `break` |

---

# Module 2 Complete ✅

You now understand:

- Decision Making
- Boolean Expressions
- `if`, `if-else`, `elif`
- Nested `if`
- `match-case`
- Ternary Expressions
- `while`
- `for`
- `range()`
- `enumerate()`
- `zip()`
- Nested Loops
- `break`
- `continue`
- `pass`
- `else` with loops

You can now build programs that make decisions, repeat tasks efficiently, and control execution flow like professional Python developers.

---

# What's Next?

In **Module 3 — Functions**, you'll learn one of the most important concepts in programming:

- Why functions exist
- How to create reusable code
- Parameters and return values
- Scope
- Recursion
- Advanced function features

This is where you'll transition from writing scripts to designing modular, reusable programs.