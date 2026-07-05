# Module 3 — Functions

# Chapter 9 — Advanced Functions

---

# Learning Objectives

By the end of this chapter, you will understand:

- Default Parameters
- Positional Arguments
- Keyword Arguments
- Positional-only Arguments
- Keyword-only Arguments
- Variable-Length Arguments (`*args`)
- Keyword Variable-Length Arguments (`**kwargs`)
- Argument Unpacking
- Best Practices
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

In the previous chapter, we learned how to create and call functions.

However, real-world functions are much more flexible.

Imagine ordering a pizza.

Sometimes you specify:

- Size
- Cheese
- Toppings
- Extra Sauce

Sometimes you specify only:

- Size

The restaurant still prepares your pizza because some values have **defaults**.

Functions work exactly the same way.

Python allows functions to accept arguments in many different ways.

---

# Story — Online Food Ordering

Imagine ordering food online.

The app asks for:

```text
Pizza Size

↓

Large

-------------------

Cheese

↓

(Default: Yes)

-------------------

Extra Sauce

↓

(Default: No)

-------------------

Toppings

↓

Optional
```

You don't have to provide every detail.

Python functions also support optional values.

---

# Default Parameters

A default parameter has a predefined value.

If the caller doesn't provide one,

Python uses the default.

Syntax

```python
def function(parameter=value):
```

---

# Example

```python
def greet(name="Guest"):

    print(f"Welcome {name}")
```

Calling

```python
greet()
```

Output

```text
Welcome Guest
```

Calling

```python
greet("Alice")
```

Output

```text
Welcome Alice
```

---

# Internal Working

```text
Did Caller Pass Value?

↓

Yes

↓

Use Given Value

----------------

No

↓

Use Default Value
```

---

# Why Use Default Parameters?

Suppose every user lives in India unless specified.

Instead of

```python
create_user(name, country)
```

Write

```python
def create_user(name, country="India"):
```

Cleaner.

Less repetitive.

---

# Positional Arguments

Normally,

arguments are matched based on **position**.

Example

```python
def introduce(name, age):

    print(name, age)

introduce("Alice", 22)
```

Python matches

```text
name

↓

Alice

age

↓

22
```

---

# Incorrect Order

```python
introduce(22, "Alice")
```

Output

```text
22 Alice
```

Python doesn't know the values are reversed.

It only follows position.

---

# Keyword Arguments

Instead of relying on position,

we can specify parameter names.

Example

```python
introduce(age=22, name="Alice")
```

Output

```text
Alice 22
```

Order no longer matters.

---

# Why Keyword Arguments?

Consider

```python
create_account("Alice", 25, "India", True)
```

Can you immediately tell what each value means?

Probably not.

Now compare.

```python
create_account(

    name="Alice",

    age=25,

    country="India",

    is_verified=True

)
```

Much clearer.

---

# Mixing Positional and Keyword Arguments

This is allowed.

```python
introduce("Alice", age=22)
```

But

all positional arguments must come first.

Incorrect

```python
introduce(age=22, "Alice")
```

Python raises a `SyntaxError`.

---

# Positional-only Parameters

Python allows parameters that **must** be passed positionally.

Syntax

```python
def divide(a, b, /):
```

Example

```python
divide(10, 2)
```

Allowed.

```python
divide(a=10, b=2)
```

Not allowed.

---

# Why Positional-only?

Useful when parameter names are implementation details.

Python's own built-in functions use this feature.

---

# Keyword-only Parameters

Sometimes we want parameters that **must** be named.

Syntax

```python
def display(name, *, age):
```

Calling

```python
display("Alice", age=22)
```

Works.

Calling

```python
display("Alice", 22)
```

Raises an error.

---

# Why Keyword-only?

Improves readability,

especially when functions have many optional parameters.

---

# Variable-Length Arguments (*args)

Sometimes we don't know how many arguments users will provide.

Example

```python
sum_numbers(5)

sum_numbers(5, 10)

sum_numbers(5, 10, 20)
```

Python provides

```python
*args
```

---

# Example

```python
def add(*numbers):

    print(numbers)

add(10, 20, 30)
```

Output

```text
(10, 20, 30)
```

Notice

`args` is stored as a tuple.

---

# Practical Example

```python
def total(*numbers):

    return sum(numbers)

print(total(10, 20))

print(total(5, 6, 7, 8))
```

Output

```text
30

26
```

---

# Internal Working

Calling

```python
add(1,2,3,4)
```

Python internally creates

```python
numbers = (1,2,3,4)
```

---

# Keyword Variable-Length Arguments (**kwargs)

Suppose we don't know how many named arguments users will send.

Example

```python
create_user(

name="Alice",

age=22,

city="Delhi"

)
```

Python provides

```python
**kwargs
```

---

# Example

```python
def profile(**details):

    print(details)
```

Calling

```python
profile(

name="Alice",

age=22

)
```

Output

```python
{'name':'Alice',

'age':22}
```

Python stores them as a dictionary.

---

# Practical Example

```python
def student(**data):

    for key, value in data.items():

        print(key, value)
```

Calling

```python
student(

name="John",

age=20,

city="Mumbai"
)
```

Output

```text
name John

age 20

city Mumbai
```

---

# args vs kwargs

| Feature | *args | **kwargs |
|----------|--------|-----------|
| Stores | Tuple | Dictionary |
| Accepts | Positional Arguments | Keyword Arguments |
| Prefix | * | ** |

---

# Argument Unpacking

Suppose

```python
numbers = [10,20]
```

Instead of

```python
add(numbers[0], numbers[1])
```

Write

```python
add(*numbers)
```

Python unpacks the list.

---

# Dictionary Unpacking

```python
student = {

"name":"Alice",

"age":22

}
```

Call

```python
introduce(**student)
```

Equivalent to

```python
introduce(

name="Alice",

age=22

)
```

---

# Parameter Order

Professional Python functions usually follow this order.

```python
def function(

positional,

default,

*args,

keyword_only,

**kwargs

):
```

Remembering this order avoids many syntax errors.

---

# Real-World Example

Imagine a web framework.

```python
create_user(

"John",

country="India",

is_admin=False,

department="IT"

)
```

Frameworks like Django and FastAPI rely heavily on default values, keyword arguments, and `**kwargs` to create flexible APIs.

---

# Memory Trick

Remember

```text
PDKAK
```

Pronounce it

> **"Pee-Dee-Kack"**

Meaning

```text
P → Positional

D → Default

K → Keyword

A → *args

K → **kwargs
```

These are the five most common ways to pass arguments.

---

# Common Beginner Mistakes

### Mistake 1

Placing default parameters before required parameters.

❌

```python
def greet(name="Guest", age):
```

✔

```python
def greet(age, name="Guest"):
```

---

### Mistake 2

Thinking `*args` is a list.

It is actually a **tuple**.

---

### Mistake 3

Thinking `**kwargs` is a list.

It is actually a **dictionary**.

---

### Mistake 4

Mixing positional and keyword arguments incorrectly.

❌

```python
func(age=20, "Alice")
```

✔

```python
func("Alice", age=20)
```

---

### Mistake 5

Using mutable objects as default parameters.

❌

```python
def add_item(item, items=[]):
```

This can lead to unexpected behavior because the same list is reused across calls.

✔

```python
def add_item(item, items=None):
    if items is None:
        items = []
```

---

# Interview Questions & Answers

## Q1. What is the difference between parameters and arguments?

### Answer

A **parameter** is a variable defined in the function declaration.

An **argument** is the actual value passed when calling the function.

### Example

```python
def greet(name):      # Parameter
    print(name)

greet("Alice")        # Argument
```

---

## Q2. What are default parameters?

### Answer

Default parameters provide predefined values.

If the caller doesn't supply a value,

Python automatically uses the default.

### Example

```python
def greet(name="Guest"):
    print(name)
```

---

## Q3. What is the difference between `*args` and `**kwargs`?

### Answer

`*args` collects extra positional arguments into a tuple.

`**kwargs` collects extra keyword arguments into a dictionary.

### Example

```python
def demo(*args, **kwargs):
    print(args)
    print(kwargs)

demo(1, 2, name="Alice")
```

Output

```text
(1, 2)

{'name': 'Alice'}
```

### Interview Tip

Remember:

- `*args` → Tuple
- `**kwargs` → Dictionary

---

## Q4. Why use keyword arguments?

### Answer

Keyword arguments improve readability and allow arguments to be passed in any order.

Example

```python
create_user(

name="Alice",

age=25
)
```

This is much clearer than:

```python
create_user("Alice", 25)
```

---

## Q5. Why should mutable objects not be used as default parameters?

### Answer

Default parameter values are evaluated only once when the function is defined.

If a mutable object (like a list or dictionary) is modified, the changes persist across future function calls.

### Bad Example

```python
def add_item(item, items=[]):
    items.append(item)
    return items

print(add_item("A"))   # ['A']
print(add_item("B"))   # ['A', 'B'] ❌
```

### Correct Example

```python
def add_item(item, items=None):
    if items is None:
        items = []

    items.append(item)
    return items
```

### Interview Tip

This is one of the **most frequently asked Python interview questions**.

---

# Chapter Summary / Cheat Sheet

| Concept | Description |
|----------|-------------|
| Default Parameter | Optional value with a default |
| Positional Argument | Matched by position |
| Keyword Argument | Matched by parameter name |
| `*args` | Variable-length positional arguments (Tuple) |
| `**kwargs` | Variable-length keyword arguments (Dictionary) |
| Argument Unpacking | Use `*` for iterables and `**` for dictionaries |

---

# What's Next?

In **Chapter 10 — Functional Programming**, you'll explore powerful concepts that make Python expressive and concise:

- Lambda Functions
- `map()`
- `filter()`
- `reduce()`
- Higher-Order Functions
- Closures

These concepts are widely used in data processing, automation, and modern Python libraries.