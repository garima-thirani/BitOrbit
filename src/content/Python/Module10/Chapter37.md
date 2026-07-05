# Module 10 — Modules & Packages

# Chapter 37 — Package Management

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Package Management is Needed
- What is pip?
- Installing Packages
- Upgrading Packages
- Uninstalling Packages
- Virtual Environments (`venv`)
- Why Virtual Environments Matter
- `requirements.txt`
- Poetry
- Dependency Management
- Version Pinning
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're building a house.

You need

- Cement
- Steel
- Paint
- Bricks
- Glass

Do you manufacture all of these yourself?

No.

You purchase them from suppliers.

Programming works the same way.

Instead of writing everything from scratch,

we use libraries written by other developers.

Examples

```text
NumPy

Pandas

Requests

Flask

FastAPI

Django
```

Managing these libraries is called **Package Management**.

---

# Story — Mobile App Store

Think about your smartphone.

When you need a calculator,

you don't build one.

You simply open

```text
Play Store

↓

Search

↓

Install

↓

Use
```

Python has its own app store.

It is called

```text
PyPI

(Python Package Index)
```

And the tool used to install packages is

```text
pip
```

---

# Why Package Management?

Suppose you need to send HTTP requests.

Option 1

Write your own HTTP library.

```text
Thousands of Lines

↓

Weeks of Work
```

Option 2

Install

```text
requests
```

One command.

```bash
pip install requests
```

Done.

---

# What is pip?

**pip** is Python's package manager.

It downloads and installs packages from **PyPI (Python Package Index)**.

Visualization

```text
Developer

↓

pip

↓

PyPI

↓

Package Installed
```

---

# Installing a Package

Syntax

```bash
pip install package_name
```

Example

```bash
pip install requests
```

Python downloads

- Package
- Dependencies

and installs them automatically.

---

# Installing Specific Versions

Sometimes projects require an exact version.

Example

```bash
pip install pandas==2.2.0
```

This installs only version

```text
2.2.0
```

---

# Upgrading Packages

To install the latest version,

use

```bash
pip install --upgrade requests
```

or

```bash
pip install -U requests
```

---

# Uninstalling Packages

Remove packages using

```bash
pip uninstall requests
```

pip asks for confirmation before removing it.

---

# Listing Installed Packages

See everything installed in your environment.

```bash
pip list
```

Output

```text
numpy

pandas

requests

flask
```

---

# Viewing Package Information

```bash
pip show requests
```

Useful information

- Version
- Location
- Dependencies
- Author

---

# What is PyPI?

PyPI stands for

```text
Python Package Index
```

It is the official repository for Python packages.

Visualization

```text
Developer

↓

Upload Package

↓

PyPI

↓

Millions of Developers Download
```

Most Python libraries are distributed through PyPI.

---

# The Dependency Problem

Suppose

Project A needs

```text
Django 4.2
```

Project B needs

```text
Django 5.0
```

If both projects use the same Python installation,

conflicts occur.

```text
Project A

↓

Django 4.2

❌

Project B

↓

Django 5.0
```

How do we solve this?

Virtual Environments.

---

# Virtual Environments

A **Virtual Environment** is an isolated Python environment.

Each project gets its own

- Python interpreter
- Installed packages
- Dependencies

Visualization

```text
Computer

│

├── Project A

│     Django 4.2

│

└── Project B

      Django 5.0
```

No conflicts.

---

# Creating a Virtual Environment

Python provides

```bash
python -m venv venv
```

This creates

```text
venv/
```

inside your project.

---

# Activating Virtual Environments

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

After activation,

the terminal changes.

Example

```text
(venv)
```

showing the environment is active.

---

# Deactivating

Simply run

```bash
deactivate
```

This returns you to the global Python environment.

---

# Why Virtual Environments?

Without them

```text
One Python

↓

All Projects

↓

Version Conflicts
```

With them

```text
Each Project

↓

Own Packages

↓

No Conflicts
```

Every professional Python project uses virtual environments.

---

# requirements.txt

Suppose your project depends on

- Flask
- Requests
- NumPy

How do teammates install the exact same packages?

Create

```text
requirements.txt
```

Example

```text
flask==3.0.0

requests==2.32.0

numpy==2.0.1
```

Install everything using

```bash
pip install -r requirements.txt
```

---

# Creating requirements.txt

Automatically generate it.

```bash
pip freeze > requirements.txt
```

Output

```text
numpy==2.0.1

requests==2.32.0

pandas==2.2.2
```

---

# What is Poetry?

Managing packages with only

```text
pip

requirements.txt
```

can become difficult for large projects.

Poetry is a modern dependency management tool.

It combines

- Dependency Management
- Virtual Environments
- Packaging

into one tool.

---

# Installing Poetry

```bash
pip install poetry
```

---

# Creating a Poetry Project

```bash
poetry new my_project
```

Project structure

```text
my_project/

    pyproject.toml

    my_project/

    tests/
```

---

# Installing Dependencies

Instead of

```bash
pip install requests
```

use

```bash
poetry add requests
```

Poetry automatically updates

```text
pyproject.toml
```

---

# Dependency Management

Suppose your project uses

```text
FastAPI

↓

Depends on

↓

Starlette

↓

Depends on

↓

AnyIO
```

These are called **dependencies**.

Package managers automatically install them.

Visualization

```text
Your Project

↓

FastAPI

↓

Starlette

↓

AnyIO
```

You install one package,

pip installs everything required.

---

# Version Pinning

Suppose your project works with

```text
NumPy 2.0
```

A new version

```text
NumPy 3.0
```

introduces breaking changes.

To avoid unexpected failures,

pin versions.

Example

```text
numpy==2.0.1
```

This ensures every developer uses the same version.

---

# Real-World Example

Imagine a Machine Learning project.

Dependencies

```text
Python

↓

NumPy

↓

Pandas

↓

Scikit-Learn

↓

Matplotlib

↓

TensorFlow
```

A new developer joins the team.

They simply run

```bash
python -m venv venv

pip install -r requirements.txt
```

Within minutes,

their environment matches everyone else's.

---

# Memory Trick

Remember

```text
PVR
```

**P**

pip

↓

**V**

Virtual Environment

↓

**R**

requirements.txt

Modern projects often replace `requirements.txt` with

```text
Poetry

↓

pyproject.toml
```

---

# Common Beginner Mistakes

### Mistake 1

Installing packages globally.

Always use a virtual environment for project-specific dependencies.

---

### Mistake 2

Forgetting to activate the virtual environment.

Packages may be installed into the wrong Python installation.

---

### Mistake 3

Not committing

```text
requirements.txt
```

or

```text
pyproject.toml
```

Other developers won't know which dependencies to install.

---

### Mistake 4

Committing the

```text
venv/
```

folder to Git.

Never commit virtual environments.

Instead,

recreate them from the dependency file.

---

# Interview Questions & Answers

## Q1. What is pip?

### Answer

`pip` is Python's official package manager.

It installs, upgrades, and removes packages from the Python Package Index (PyPI).

---

## Q2. Why do we need Virtual Environments?

### Answer

Virtual environments isolate dependencies for each project.

This prevents version conflicts between different projects.

Without them,

all projects would share the same installed packages.

---

## Q3. What is `requirements.txt`?

### Answer

`requirements.txt` is a file listing all project dependencies and their versions.

It allows anyone to recreate the same environment using

```bash
pip install -r requirements.txt
```

---

## Q4. What is Poetry?

### Answer

Poetry is a modern Python dependency and package management tool.

It manages:

- Dependencies
- Virtual Environments
- Packaging
- Version Resolution

using a single configuration file called

```text
pyproject.toml
```

---

## Q5. Why should package versions be pinned?

### Answer

Version pinning ensures that every developer and deployment environment uses exactly the same library versions.

This avoids unexpected bugs caused by package updates.

Example

```text
requests==2.32.0
```

---

# Chapter Summary / Cheat Sheet

| Concept | Purpose |
|----------|----------|
| `pip install` | Install packages |
| `pip uninstall` | Remove packages |
| `pip list` | Show installed packages |
| `pip freeze` | Export dependencies |
| `venv` | Isolated Python environment |
| `requirements.txt` | Dependency list |
| `Poetry` | Modern dependency manager |
| `pyproject.toml` | Poetry project configuration |

---

# What's Next?

In **Chapter 38 — Project Structure**, you'll learn how professional Python applications are organized:

- Packages
- `__init__.py`
- Recommended Folder Layout
- `src/` Layout vs Flat Layout
- Configuration Files
- Publishing Packages
- Semantic Versioning

This chapter ties together everything you've learned so far into a production-ready project structure.