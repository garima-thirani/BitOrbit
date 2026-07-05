# Module 10 — Modules & Packages

# Chapter 36 — Modules

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Modules are Needed
- What is a Module?
- Creating Modules
- The Python Import System
- `import`
- `from ... import`
- `import as`
- `__name__`
- `__main__`
- Module Search Path (`sys.path`)
- Absolute vs Relative Imports
- Common Pitfalls
- Interview Questions & Answers

---

# Introduction

Imagine you're writing a book.

Would you write the entire book in one chapter?

```text
Book

↓

1000 Pages

↓

One Chapter
```

Almost impossible to read.

Instead,

books are divided into chapters.

```text
Book

↓

Chapter 1

↓

Chapter 2

↓

Chapter 3
```

Programming follows the same philosophy.

Instead of writing everything inside one Python file,

we divide our code into **Modules**.

---

# Story — LEGO Blocks

Imagine building a city using LEGO.

Instead of creating everything from scratch,

you already have ready-made blocks.

```text
House Block

Road Block

Bridge Block

Car Block
```

You simply combine them.

Python modules work the same way.

```text
Authentication Module

↓

Database Module

↓

Email Module

↓

Payment Module
```

Each module solves one problem.

Together,

they build a complete application.

---

# Why Modules?

Suppose you're building an E-commerce application.

Without modules,

everything goes into one file.

```python
login()

logout()

add_to_cart()

payment()

email()

database()

inventory()

analytics()

notifications()
```

Soon,

the file becomes

```text
20,000+ lines
```

Finding bugs becomes difficult.

Updating one feature may accidentally break another.

Modules solve this by separating responsibilities.

---

# What is a Module?

A **Module** is simply a Python file (`.py`) containing related code.

Example

```text
calculator.py
```

Inside

```python
def add(a, b):

    return a + b

def subtract(a, b):

    return a - b
```

The entire file is called a **module**.

---

# Creating Your First Module

Create a file

```text
calculator.py
```

```python
def add(a, b):

    return a + b

def multiply(a, b):

    return a * b
```

Now create another file

```text
main.py
```

```python
import calculator

print(

calculator.add(5, 10)

)
```

Output

```text
15
```

Congratulations!

You've just created and imported your own module.

---

# The Import System

Whenever Python sees

```python
import calculator
```

it performs these steps.

```text
Find Module

↓

Load Module

↓

Execute Module

↓

Create Module Object

↓

Store in Memory

↓

Return Reference
```

The module is executed **only once**.

Future imports reuse the already-loaded module.

---

# How Imports Work Internally

Suppose

```python
import math

import math

import math
```

Does Python load it three times?

No.

Visualization

```text
Import

↓

Memory Cache?

↓

Yes

↓

Reuse Existing Module
```

Loaded modules are stored in

```python
sys.modules
```

This makes repeated imports extremely fast.

---

# Different Ways to Import

## Import Entire Module

```python
import math

print(math.sqrt(25))
```

Output

```text
5.0
```

---

## Import Specific Function

```python
from math import sqrt

print(sqrt(49))
```

Output

```text
7.0
```

---

## Import Multiple Functions

```python
from math import sqrt, factorial
```

---

## Import with Alias

Sometimes module names are long.

```python
import numpy as np

import pandas as pd
```

This is the standard convention used throughout the Python ecosystem.

---

# Which Import Style Should You Use?

| Style | Recommended? |
|---------|--------------|
| `import math` | ✅ Best |
| `from math import sqrt` | ✅ Good |
| `import numpy as np` | ✅ Standard |
| `from math import *` | ❌ Avoid |

Why avoid

```python
from math import *
```

Because you don't know where functions come from.

Example

```python
sqrt()
```

Did it come from

- math?
- numpy?
- another module?

Explicit imports make code easier to understand.

---

# Module Execution

Consider

```python
# hello.py

print("Hello")
```

Another file

```python
import hello
```

Output

```text
Hello
```

Why?

Because importing a module executes its top-level code **once**.

---

# The `__name__` Variable

Every Python module automatically gets a special variable.

```python
__name__
```

If you run

```python
print(__name__)
```

directly

```bash
python demo.py
```

Output

```text
__main__
```

But when imported

```python
import demo
```

Output

```text
demo
```

---

# Why `__name__` Matters

Suppose your module contains test code.

```python
def add(a, b):

    return a + b

print(add(2,3))
```

Importing this module would execute the test.

Not desirable.

Instead,

write

```python
if __name__ == "__main__":

    print(add(2,3))
```

Now,

the test only runs when the file is executed directly.

---

# Understanding `__main__`

Visualization

```text
Run File

↓

__name__

↓

__main__

--------------------

Import File

↓

__name__

↓

Module Name
```

This is one of the most frequently asked Python interview topics.

---

# Module Search Path

How does Python know where to find a module?

Suppose

```python
import math
```

Python searches locations in order.

```text
Current Folder

↓

Installed Packages

↓

Python Standard Library

↓

Other Directories in sys.path
```

---

# Viewing the Search Path

```python
import sys

print(sys.path)
```

Output

```text
[
Current Directory,

Python Library,

Site Packages,

...
]
```

If Python cannot find a module,

it raises

```text
ModuleNotFoundError
```

---

# Absolute vs Relative Imports

Imagine this project.

```text
project/

    app/

        main.py

    utils/

        helper.py
```

Absolute Import

```python
from utils.helper import greet
```

Relative Import

```python
from ..utils.helper import greet
```

### Which is Better?

For most production projects,

prefer **absolute imports**.

They're easier to understand,

especially in large codebases.

---

# Real-World Example

Imagine Instagram.

```text
Instagram

↓

authentication.py

↓

database.py

↓

notifications.py

↓

analytics.py

↓

payments.py
```

Every module focuses on one responsibility.

Teams can work independently,

and bugs stay isolated.

This is one of the biggest reasons large software projects scale successfully.

---

# Memory Trick

Remember

```text
MII
```

**M**

Module

↓

**I**

Import

↓

**I**

Import Cache (`sys.modules`)

And remember

```text
Run Directly

↓

__main__

Import

↓

Module Name
```

---

# Common Beginner Mistakes

### Mistake 1

Using

```python
from module import *
```

Avoid namespace pollution.

Always import explicitly.

---

### Mistake 2

Naming your own file

```text
random.py

math.py

json.py
```

Python imports your file instead of the standard library module.

This is called **module shadowing**.

---

### Mistake 3

Writing executable code outside

```python
if __name__ == "__main__":
```

Keep test/demo code inside this block.

---

### Mistake 4

Thinking imports reload modules every time.

Python imports a module only once per interpreter session and caches it in `sys.modules`.

---

# Interview Questions & Answers

## Q1. What is a Module?

### Answer

A module is a single Python file (`.py`) containing related functions, classes, and variables.

Modules improve:

- Organization
- Reusability
- Maintainability

---

## Q2. How does Python's import system work?

### Answer

When Python imports a module, it:

1. Checks if it's already loaded in `sys.modules`.
2. If not, searches directories in `sys.path`.
3. Loads and executes the module.
4. Stores it in `sys.modules` for future imports.

Subsequent imports reuse the cached module.

---

## Q3. What is the purpose of `if __name__ == "__main__":`?

### Answer

It allows a Python file to act both as:

- A reusable module
- A standalone executable script

Code inside this block executes only when the file is run directly.

---

## Q4. What is the difference between `import module` and `from module import function`?

### Answer

```python
import math
```

Requires

```python
math.sqrt(16)
```

Whereas

```python
from math import sqrt
```

Allows

```python
sqrt(16)
```

The first is more explicit.

The second is more concise.

---

## Q5. Why should `from module import *` be avoided?

### Answer

Because it:

- Pollutes the global namespace
- Can overwrite existing names
- Makes code difficult to read and debug

Explicit imports are considered best practice.

---

# Chapter Summary / Cheat Sheet

| Concept | Purpose |
|----------|----------|
| Module | Single `.py` file |
| `import` | Import a module |
| `from ... import` | Import selected names |
| `import ... as` | Create an alias |
| `__name__` | Current module's name |
| `__main__` | Entry point for direct execution |
| `sys.path` | Search locations for modules |
| `sys.modules` | Cache of imported modules |

---

# What's Next?

In **Chapter 37 — Package Management**, you'll learn how professional Python developers manage external libraries and project dependencies:

- `pip`
- Virtual Environments (`venv`)
- `requirements.txt`
- Poetry
- Dependency Management
- Version Pinning

These tools are essential for building reproducible, production-ready Python projects.