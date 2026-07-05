# Module 6 — File Handling

# Chapter 22 — Modern File Handling

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Modern File Handling?
- What is `pathlib`?
- Creating and Managing Paths
- File & Directory Operations
- Context Managers (`with`)
- Why Context Managers are Better
- Logging
- Logging Levels
- Logging to Files
- Best Practices
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're working in a large office.

Every day you need to

- Open files
- Save reports
- Close cabinets
- Record important events

If you forget to close a cabinet,

documents may get lost.

If you don't record important events,

finding problems later becomes difficult.

Modern Python provides elegant tools to solve these problems:

- **pathlib** → Better file and directory handling
- **Context Managers** → Automatic resource management
- **Logging** → Recording application events

These tools are used in almost every production Python application.

---

# Story — A Modern Office

Imagine an employee.

Old way

```text
Open Cabinet

↓

Take File

↓

Remember to Close Cabinet
```

Sometimes,

people forget.

Modern office

```text
Swipe Card

↓

Cabinet Opens

↓

Take File

↓

Cabinet Closes Automatically
```

That's exactly how **Context Managers** work.

---

# Why Modern File Handling?

Earlier we learned

```python
file = open("notes.txt")

...

file.close()
```

What happens if an exception occurs before

```python
file.close()
```

?

The file remains open.

Resources are wasted.

Modern Python provides safer solutions.

---

# What is pathlib?

Earlier,

file paths were written as strings.

Example

```python
"C:\\Users\\Alice\\notes.txt"
```

This becomes difficult,

especially across different operating systems.

Python introduced

```python
pathlib
```

to work with paths as objects.

---

# Creating a Path

```python
from pathlib import Path

path = Path("notes.txt")
```

Instead of working with strings,

you work with a **Path object**.

---

# Why pathlib?

Traditional approach

```python
import os

os.path.join(

"folder",

"file.txt"

)
```

Modern approach

```python
from pathlib import Path

Path("folder") / "file.txt"
```

Cleaner.

More readable.

Cross-platform.

---

# Checking if a File Exists

```python
from pathlib import Path

path = Path("notes.txt")

print(

path.exists()

)
```

Output

```text
True
```

or

```text
False
```

---

# Checking File or Directory

```python
path.is_file()
```

Checks whether the path is a file.

---

```python
path.is_dir()
```

Checks whether the path is a directory.

---

# File Name

```python
path.name
```

Output

```text
notes.txt
```

---

# File Extension

```python
path.suffix
```

Output

```text
.txt
```

---

# Parent Directory

```python
path.parent
```

Example

```text
Documents

↓

notes.txt
```

Returns

```text
Documents
```

---

# Creating Directories

```python
Path("Projects").mkdir()
```

Creates

```text
Projects/
```

directory.

---

# Creating Nested Directories

```python
Path(

"A/B/C"

).mkdir(

parents=True,

exist_ok=True

)
```

Python creates all missing folders automatically.

---

# Listing Files

```python
from pathlib import Path

for file in Path(".").iterdir():

    print(file)
```

Output

```text
notes.txt

report.pdf

data.csv
```

---

# Finding Files

```python
Path(".").glob("*.txt")
```

Matches

```text
notes.txt

todo.txt
```

Useful for searching files.

---

# Context Managers

Suppose

```python
file = open(

"notes.txt"

)

...

file.close()
```

If an exception occurs,

the file may never close.

Context Managers solve this.

---

# Using with

Example

```python
with open(

"notes.txt",

"r"

) as file:

    content = file.read()
```

Notice

there is **no**

```python
file.close()
```

Python closes the file automatically.

---

# Internal Working

Visualization

```text
Open File

↓

Run Block

↓

Exception?

↓

Yes / No

↓

Close File
```

The file is always closed.

---

# Why Use Context Managers?

Benefits

- Automatic Cleanup
- Safer Code
- Less Boilerplate
- Exception Safe

This is the recommended way to work with files.

---

# Context Managers Beyond Files

Context Managers are used for

- Database Connections
- Network Connections
- Thread Locks
- Temporary Files

Example

```python
with lock:

    ...
```

The same idea applies everywhere.

---

# What is Logging?

Imagine a pilot.

Every flight records

```text
Takeoff

↓

Altitude

↓

Warnings

↓

Landing
```

This record helps investigate problems later.

Software does the same thing.

Instead of printing everything,

we write important events to a **log**.

---

# Why Not Use print()?

Suppose your application crashes.

```python
print("Connected")

print("Processing")

print("Done")
```

These messages disappear after the program exits.

Logging stores them permanently.

---

# Logging Module

Python provides

```python
logging
```

Example

```python
import logging

logging.warning(

"Low Disk Space"

)
```

Output

```text
WARNING:

Low Disk Space
```

---

# Logging Levels

Different messages have different importance.

| Level | Purpose |
|---------|----------|
| DEBUG | Detailed debugging |
| INFO | General information |
| WARNING | Something unexpected |
| ERROR | Operation failed |
| CRITICAL | Serious failure |

---

# Example

```python
import logging

logging.basicConfig(

level=logging.INFO

)

logging.info(

"Application Started"

)

logging.warning(

"Memory Almost Full"

)

logging.error(

"Database Failed"
)
```

---

# Logging to a File

Instead of displaying logs on the screen,

store them.

```python
import logging

logging.basicConfig(

filename="app.log",

level=logging.INFO

)

logging.info(

"User Logged In"
)
```

Output

```text
app.log
```

contains

```text
INFO:

User Logged In
```

---

# Why Logging Matters

Imagine an online banking system.

A customer says

> "Money disappeared."

Without logs,

there is no history.

With logs,

you can trace

```text
Login

↓

Transfer

↓

Database

↓

Logout
```

Logging is one of the most important debugging tools in production.

---

# pathlib vs os.path

| pathlib | os.path |
|----------|----------|
| Object-Oriented | Function-Based |
| Cleaner Syntax | More Verbose |
| Modern | Legacy |
| Recommended | Still Supported |

Today,

`pathlib` is generally preferred for new Python code.

---

# Real-World Example

Imagine a web application.

```text
Upload Image

↓

pathlib

↓

Locate Folder

------------------

Read Image

↓

with open()

↓

Automatically Close

------------------

Upload Success

↓

logging.info()
```

All three concepts work together.

---

# Memory Trick

Remember

```text
PCL
```

**P**

Pathlib

↓

**C**

Context Manager

↓

**L**

Logging

And remember

```text
Open

↓

with

↓

Automatic Close
```

---

# Common Beginner Mistakes

### Mistake 1

Using

```python
open()

...

close()
```

instead of

```python
with open(...)
```

Always prefer Context Managers.

---

### Mistake 2

Using

```python
print()
```

for debugging production applications.

Use

```python
logging
```

instead.

---

### Mistake 3

Hardcoding file paths.

Avoid

```python
"C:\\Users\\Alice\\Desktop\\file.txt"
```

Prefer

```python
Path(...)
```

for portable code.

---

### Mistake 4

Logging sensitive information.

Never log

- Passwords
- API Keys
- Credit Card Numbers
- Authentication Tokens

Logs may be accessible to administrators or attackers.

---

# Interview Questions & Answers

## Q1. What is `pathlib`?

### Answer

`pathlib` is Python's modern, object-oriented library for working with file system paths.

It replaces many functions from `os.path` with a cleaner and more intuitive API.

---

## Q2. Why should we use Context Managers?

### Answer

Context Managers automatically release resources such as files, database connections, or locks,

even if an exception occurs.

They make code safer and more readable.

---

## Q3. What is Logging?

### Answer

Logging is the process of recording important events during program execution.

Unlike `print()`, logs can be stored in files and categorized by severity levels.

---

## Q4. What are the different logging levels?

### Answer

| Level | Purpose |
|---------|----------|
| DEBUG | Detailed diagnostic information |
| INFO | General application events |
| WARNING | Potential issues |
| ERROR | Failures that affect an operation |
| CRITICAL | Severe failures requiring immediate attention |

---

## Q5. Why is `pathlib` preferred over `os.path`?

### Answer

Because it provides

- Object-oriented design
- Cleaner syntax
- Better readability
- Cross-platform compatibility

It is the recommended approach for modern Python applications.

---

# Chapter Summary / Cheat Sheet

| Concept | Purpose |
|----------|----------|
| `Path()` | Create path object |
| `exists()` | Check existence |
| `is_file()` | Check file |
| `is_dir()` | Check directory |
| `mkdir()` | Create directory |
| `glob()` | Find matching files |
| `with open()` | Automatic file management |
| `logging.info()` | Informational log |
| `logging.warning()` | Warning message |
| `logging.error()` | Error message |

---

# Module 6 Complete ✅

You have now mastered Python File Handling:

- Reading Files
- Writing Files
- File Modes
- CSV Files
- JSON Files
- Pickle Serialization
- `pathlib`
- Context Managers
- Logging

These concepts are used extensively in backend development, data engineering, automation, scripting, machine learning, and production Python applications.

---

# What's Next?

In **Module 7 — Exception Handling**, you'll learn how professional Python programs handle errors gracefully:

- Errors vs Exceptions
- `try`
- `except`
- `else`
- `finally`
- Raising Exceptions
- Custom Exceptions
- Exception Hierarchy

Mastering exception handling will help you write robust, fault-tolerant Python applications.