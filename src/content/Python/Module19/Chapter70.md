# Module 19 — Python Automation

# Chapter 70 — System Automation

---

# Learning Objectives

By the end of this chapter, you will understand:

- What is Automation?
- Why Automate Tasks?
- The `os` Module
- Working with Directories
- Environment Variables
- The `shutil` Module
- Copying Files
- Moving Files
- Deleting Files
- The `subprocess` Module
- Running System Commands
- Automating Daily Tasks
- Best Practices
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you work in an office.

Every morning you perform the same tasks.

```text
Create Folder

↓

Copy Files

↓

Rename Reports

↓

Move Files

↓

Run Backup
```

Doing this manually every day wastes time.

Instead,

you can let Python perform these tasks automatically.

This is called

```text
System Automation
```

---

# Story — Office Assistant

Imagine you hire an assistant.

Instead of asking every day,

```text
Copy today's reports

↓

Create a backup

↓

Delete temporary files
```

you simply give the assistant instructions once.

Every day,

the assistant performs them automatically.

Python can become your digital assistant.

---

# What is Automation?

Automation is

using software

to perform repetitive tasks

without manual intervention.

Examples

- File Management
- Backups
- Report Generation
- Email Sending
- System Monitoring

---

# Why Automate?

Manual Work

```text
Slow

↓

Repetitive

↓

Error-Prone
```

Automation

```text
Fast

↓

Accurate

↓

Repeatable
```

---

# The `os` Module

Python's built-in

```python
os
```

module

allows interaction

with the operating system.

Import

```python
import os
```

---

# Current Working Directory

Example

```python
import os

print(

os.getcwd()

)
```

Output

```text
C:\Projects

or

/home/user/projects
```

Returns

the current directory.

---

# Changing Directory

```python
os.chdir(

"Documents"

)
```

Changes

the current working directory.

---

# Listing Files

Example

```python
os.listdir()
```

Output

```text
report.pdf

notes.txt

images/
```

Lists

all files

and folders.

---

# Creating a Directory

```python
os.mkdir(

"Reports"

)
```

Creates

a new folder.

---

# Creating Nested Directories

```python
os.makedirs(

"2025/July/Reports"

)
```

Creates

multiple directories

at once.

---

# Removing Directories

```python
os.rmdir(

"Reports"

)
```

Removes

an empty directory.

---

# Environment Variables

Read

an environment variable.

```python
import os

print(

os.getenv(

"HOME"

)

)
```

Useful for

- API Keys
- Passwords
- Configuration

---

# Path Operations

Instead of writing

paths manually,

use

```python
os.path
```

Example

```python
os.path.exists(

"report.txt"

)
```

Returns

```python
True

False
```

---

# Joining Paths

```python
os.path.join(

"Reports",

"sales.csv"

)
```

Automatically creates

the correct path

for Windows,

Linux,

or macOS.

---

# The `shutil` Module

`shutil`

is used

for high-level

file operations.

Import

```python
import shutil
```

---

# Copying Files

```python
shutil.copy(

"report.txt",

"backup.txt"

)
```

Creates

a copy

of the file.

---

# Copying Entire Directories

```python
shutil.copytree(

"Reports",

"Backup"

)
```

Copies

an entire folder

including its contents.

---

# Moving Files

```python
shutil.move(

"report.txt",

"Archive/"

)
```

Moves

a file

to another folder.

---

# Renaming Files

```python
os.rename(

"old.txt",

"new.txt"

)
```

Changes

the file name.

---

# Deleting Files

```python
os.remove(

"temp.txt"

)
```

Deletes

a file permanently.

---

# Removing Directories

```python
shutil.rmtree(

"Backup"

)
```

Deletes

an entire directory

including all files.

Use carefully.

---

# The `subprocess` Module

Python can execute

system commands.

Import

```python
import subprocess
```

---

# Running Commands

Example

```python
subprocess.run(

["python","--version"]

)
```

Output

```text
Python 3.12
```

---

# Capturing Output

```python
result = subprocess.run(

["python","--version"],

capture_output=True,

text=True

)

print(

result.stdout

)
```

Useful

when you need

command output.

---

# Running Shell Commands

Example

```python
subprocess.run(

"dir",

shell=True

)
```

Windows

uses

```text
dir
```

Linux/macOS

use

```text
ls
```

---

# Automation Workflow

```text
Read Files

↓

Process Files

↓

Move Files

↓

Create Backup

↓

Generate Report
```

---

# Practical Example

Suppose

every day

you receive

100 PDF files.

Python can

```text
Create Folder

↓

Copy PDFs

↓

Rename Files

↓

Archive Old Files

↓

Generate Log
```

All automatically.

---

# Real-World Applications

System automation is used for

- Daily Backups
- Log File Cleanup
- File Organization
- Software Installation
- Scheduled Reports
- Server Maintenance

---

# Memory Trick

Remember

```text
OCSM
```

**O**

OS Module

↓

**C**

Copy (shutil)

↓

**S**

Subprocess

↓

**M**

Move Files

These are the core tools for Python system automation.

---

# Best Practices

✔ Use `os.path.join()` for portable paths

✔ Verify file existence before deleting

✔ Handle exceptions during file operations

✔ Keep backups before destructive actions

✔ Avoid `shell=True` unless necessary

✔ Log automation tasks

---

# Common Beginner Mistakes

### Mistake 1

Hardcoding file paths.

Instead,

use

```python
os.path.join()
```

for cross-platform compatibility.

---

### Mistake 2

Deleting files

without checking

if they exist.

Use

```python
os.path.exists()
```

before removal.

---

### Mistake 3

Using

```python
shell=True
```

with untrusted user input.

This can introduce security vulnerabilities.

---

### Mistake 4

Ignoring exceptions.

File operations can fail because of

- Missing files
- Permission errors
- Locked files

Always handle errors appropriately.

---

# Interview Questions & Answers

## Q1. What is the purpose of the `os` module?

### Answer

The `os` module provides functions for interacting with the operating system,

including file management,

directory operations,

environment variables,

and path manipulation.

---

## Q2. What is the difference between `os` and `shutil`?

### Answer

`os`

handles low-level operating system tasks,

such as creating directories and reading environment variables.

`shutil`

provides higher-level file operations,

such as copying,

moving,

and deleting directories.

---

## Q3. What is the purpose of the `subprocess` module?

### Answer

The `subprocess` module allows Python programs to execute external commands,

run other programs,

and capture their output.

It is commonly used for automation and system administration.

---

## Q4. Why should `os.path.join()` be used?

### Answer

`os.path.join()`

creates file paths that work correctly across different operating systems,

avoiding platform-specific path separator issues.

---

## Q5. Why should `shell=True` be used carefully?

### Answer

Using `shell=True`

with untrusted input can expose applications to command injection attacks.

Whenever possible,

pass commands as a list instead of using the shell.

---

# Chapter Summary / Cheat Sheet

| Function | Purpose |
|----------|----------|
| `os.getcwd()` | Current directory |
| `os.chdir()` | Change directory |
| `os.listdir()` | List files |
| `os.mkdir()` | Create folder |
| `os.makedirs()` | Create nested folders |
| `os.remove()` | Delete file |
| `os.rename()` | Rename file |
| `os.path.exists()` | Check existence |
| `os.path.join()` | Build file paths |
| `shutil.copy()` | Copy file |
| `shutil.copytree()` | Copy directory |
| `shutil.move()` | Move file/folder |
| `shutil.rmtree()` | Delete directory |
| `subprocess.run()` | Execute system command |

---

# What's Next?

In **Chapter 71 — Web Scraping**, you'll learn how to automatically collect information from websites using Python:

- HTML Basics
- BeautifulSoup
- Parsing Web Pages
- Extracting Data
- Selenium
- Browser Automation
- Handling Dynamic Websites

These techniques are widely used for data collection, price monitoring, market research, and web automation.