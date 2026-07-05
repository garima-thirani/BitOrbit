# Module 10 — Modules & Packages

# Chapter 38 — Project Structure

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Project Structure Matters
- What are Packages?
- `__init__.py`
- Recommended Project Layout
- `src/` Layout vs Flat Layout
- Configuration Files
- Publishing Packages
- Semantic Versioning
- Common Folder Structure
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine constructing a skyscraper.

Would engineers randomly place

- Bedrooms
- Parking
- Elevators
- Electrical Rooms
- Water Tanks

wherever they wanted?

Of course not.

Everything follows a carefully designed blueprint.

```text
Foundation

↓

Floors

↓

Electrical

↓

Plumbing

↓

Roof
```

Large software projects follow the same principle.

A good folder structure makes projects easier to

- Understand
- Maintain
- Scale
- Test

---

# Story — A Hospital

Imagine entering a hospital.

Would all departments sit in one room?

```text
Doctor

↓

Reception

↓

Pharmacy

↓

Laboratory

↓

Emergency
```

No.

Every department has its own place.

Software projects work exactly the same way.

Instead of placing everything inside one folder,

we organize related code together.

---

# Why Project Structure Matters?

Suppose your project looks like this.

```text
project/

    app.py

    login.py

    user.py

    payment.py

    email.py

    report.py

    config.py

    utils.py

    database.py

    test.py

    helper.py

    analytics.py

    ...
```

After one year,

there are

```text
150 Files
```

Finding anything becomes difficult.

Professional developers organize projects from day one.

---

# What is a Package?

A **Package** is a directory containing related Python modules.

Example

```text
bank/

    account.py

    payment.py

    customer.py
```

Here,

```text
bank
```

is a package.

Each `.py` file inside is a module.

---

# __init__.py

Traditionally,

every package contains

```text
__init__.py
```

Example

```text
bank/

    __init__.py

    account.py

    payment.py
```

Historically,

this file told Python

> "This folder is a package."

Today,

its additional responsibilities include:

- Package initialization
- Exporting public APIs
- Running setup code

---

# Why Use __init__.py?

Suppose

```text
bank/

    account.py

    payment.py
```

Inside

```python
# __init__.py

from .account import Account

from .payment import Payment
```

Now users can write

```python
from bank import Account
```

instead of

```python
from bank.account import Account
```

Cleaner APIs.

---

# Recommended Project Structure

Small Project

```text
project/

│

├── main.py

├── utils.py

└── config.py
```

Simple and sufficient.

---

Medium Project

```text
project/

│

├── app/

│     __init__.py

│     routes.py

│     services.py

│     models.py

│

├── tests/

│

├── requirements.txt

│

└── README.md
```

Better organization.

---

Large Production Project

```text
project/

│

├── src/

│     app/

│

├── tests/

│

├── docs/

│

├── scripts/

│

├── pyproject.toml

│

├── README.md

│

└── .gitignore
```

This is similar to structures used in production systems.

---

# Why Separate Tests?

Imagine mixing exam papers with textbooks.

Confusing.

Instead,

```text
Project

↓

Source Code

↓

Tests
```

Every feature has corresponding tests.

Professional projects always separate production code and tests.

---

# The src Layout

Many modern Python projects use

```text
src/

    my_project/
```

instead of placing code directly at the root.

Example

```text
project/

│

├── src/

│     calculator/

│         __init__.py

│         math.py

│

├── tests/

└── pyproject.toml
```

---

# Why src Layout?

Without `src/`

Python may accidentally import source files directly from the project root.

With

```text
src/
```

imports behave exactly like installed packages.

This helps detect import issues early.

Large open-source projects often prefer this layout.

---

# Flat Layout vs src Layout

Flat Layout

```text
project/

    app.py

    utils.py
```

Best for

- Small scripts
- Learning
- Quick prototypes

---

src Layout

```text
project/

    src/

        app/
```

Best for

- Libraries
- Production applications
- Large teams

---

# Configuration Files

Professional projects usually include configuration files.

Common ones include

```text
README.md

↓

Project Documentation
```

---

```text
.gitignore

↓

Files Git Should Ignore
```

---

```text
pyproject.toml

↓

Dependencies

Build Configuration

Tool Settings
```

---

```text
requirements.txt

↓

Project Dependencies
```

---

# Publishing Packages

Suppose you've written a useful library.

You want other developers to install it.

Instead of sending ZIP files,

publish it.

Workflow

```text
Write Package

↓

Package It

↓

Upload to PyPI

↓

Others Install

↓

pip install your_package
```

That's how libraries like

```text
requests

numpy

pandas
```

are distributed.

---

# Semantic Versioning

Professional packages follow a standard version format.

```text
MAJOR.MINOR.PATCH
```

Example

```text
2.5.3
```

Meaning

```text
2

Major Changes

↓

5

New Features

↓

3

Bug Fixes
```

---

# Example

Version

```text
1.0.0
```

↓

Bug Fix

```text
1.0.1
```

↓

New Feature

```text
1.1.0
```

↓

Breaking Change

```text
2.0.0
```

This is called **Semantic Versioning (SemVer)**.

---

# A Typical Python Project

```text
my_project/

│

├── src/

│     my_project/

│         __init__.py

│         models.py

│         services.py

│         database.py

│         api.py

│

├── tests/

│     test_models.py

│     test_api.py

│

├── docs/

│

├── scripts/

│

├── pyproject.toml

├── requirements.txt

├── README.md

├── LICENSE

└── .gitignore
```

This is close to what you'll find in professional GitHub repositories.

---

# Real-World Example

Imagine you're building an online shopping application.

```text
ecommerce/

│

├── src/

│     ecommerce/

│

│     auth/

│

│     orders/

│

│     payments/

│

│     inventory/

│

│     users/

│

├── tests/

├── docs/

└── pyproject.toml
```

Different teams can work independently on each package.

The project remains organized even as it grows.

---

# Memory Trick

Remember

```text
SPT
```

**S**

src/

↓

**P**

Package

↓

**T**

tests/

And remember

```text
README

↓

Explain Project

----------------

.gitignore

↓

Ignore Files

----------------

pyproject.toml

↓

Project Configuration
```

---

# Common Beginner Mistakes

### Mistake 1

Keeping everything in one folder.

Organize code into packages as the project grows.

---

### Mistake 2

Mixing test files with production code.

Always keep tests inside a dedicated

```text
tests/
```

directory.

---

### Mistake 3

Ignoring documentation.

A good

```text
README.md
```

is essential for collaborators and open-source users.

---

### Mistake 4

Not using semantic versioning.

Changing behavior without updating version numbers makes package maintenance difficult.

---

# Interview Questions & Answers

## Q1. What is a Package?

### Answer

A package is a directory containing related Python modules.

It helps organize code into logical components.

---

## Q2. What is the purpose of `__init__.py`?

### Answer

Traditionally, it marks a directory as a package.

It can also:

- Initialize package-level variables
- Re-export modules
- Simplify imports

---

## Q3. What is the difference between Flat Layout and `src/` Layout?

### Answer

**Flat Layout**

```text
project/

    app.py
```

Suitable for:

- Small projects
- Scripts

**src Layout**

```text
project/

    src/

        app/
```

Suitable for:

- Libraries
- Production systems
- Large applications

It prevents accidental imports from the project root.

---

## Q4. Why should tests be placed in a separate folder?

### Answer

Separating tests from source code improves organization and makes automated testing easier.

Most testing tools expect a dedicated

```text
tests/
```

directory.

---

## Q5. What is Semantic Versioning?

### Answer

Semantic Versioning follows the format

```text
MAJOR.MINOR.PATCH
```

- **MAJOR** → Breaking changes
- **MINOR** → New backward-compatible features
- **PATCH** → Bug fixes

It helps developers understand compatibility between versions.

---

# Chapter Summary / Cheat Sheet

| Concept | Purpose |
|----------|----------|
| Package | Folder of related modules |
| `__init__.py` | Package initialization |
| `src/` | Production source code |
| `tests/` | Automated tests |
| `README.md` | Project documentation |
| `.gitignore` | Ignore unnecessary files |
| `pyproject.toml` | Project configuration |
| Semantic Versioning | Version management (`MAJOR.MINOR.PATCH`) |

---

# Module 10 Complete ✅

You now understand how professional Python projects are organized:

- Modules
- Imports
- Packages
- `pip`
- Virtual Environments
- `requirements.txt`
- Poetry
- Project Structure
- `src/` Layout
- Package Publishing
- Semantic Versioning

You now have the knowledge required to build and maintain production-quality Python projects.

---

# What's Next?

In **Module 11 — Concurrency & Parallelism**, you'll learn how Python performs multiple tasks simultaneously:

- Threads
- Multiprocessing
- Asyncio
- Futures & Executors

This module is one of the most important for backend development, distributed systems, and Python interview preparation.