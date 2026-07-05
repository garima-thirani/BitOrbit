# Module 23 — Production Projects

# Chapter 85 — CLI Application

---

# Learning Objectives

By the end of this chapter, you will understand:

- What is a CLI Application?
- Why Build CLI Applications?
- Project Planning
- Parsing Command-Line Arguments
- Using `argparse`
- Organizing a CLI Project
- Reading & Writing Files
- Configuration Files
- Logging
- Packaging CLI Applications
- Best Practices
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine creating an application that users can run directly from the terminal.

Instead of opening

```text
Browser

↓

Website
```

users simply type

```bash
todo add "Buy groceries"
```

or

```bash
backup Documents
```

This type of software is called a

```text
CLI Application

(Command-Line Interface)
```

---

# Story — Personal Assistant

Imagine having an assistant.

Instead of clicking buttons,

you simply give commands.

```text
Create Backup

↓

Find File

↓

Generate Report

↓

Send Email
```

The assistant immediately performs the task.

A CLI application behaves the same way.

---

# What is a CLI Application?

A CLI (Command-Line Interface)

allows users to interact with a program

by typing commands

instead of clicking graphical buttons.

Examples

- Git
- Docker
- pip
- npm
- Python

---

# Why Build CLI Applications?

CLI applications are

```text
Fast

↓

Lightweight

↓

Easy to Automate

↓

Scriptable

↓

Developer Friendly
```

---

# Examples of CLI Tools

```text
git

↓

python

↓

docker

↓

pip

↓

ffmpeg
```

Almost every professional developer

uses CLI tools daily.

---

# Project Idea

In this chapter,

we will design

a simple

```text
Task Manager CLI
```

Features

```text
Add Task

↓

View Tasks

↓

Complete Task

↓

Delete Task

↓

Save Tasks
```

---

# Project Structure

```text
task_manager/

│

├── main.py

├── tasks.py

├── storage.py

├── config.py

├── data.json

├── requirements.txt

└── README.md
```

This structure keeps

the project modular

and maintainable.

---

# Command-Line Arguments

When running

a Python script,

users can provide

arguments.

Example

```bash
python app.py hello
```

Argument

```text
hello
```

can be processed

inside Python.

---

# The `argparse` Module

Python provides

```python
argparse
```

to build

professional CLI applications.

Example

```python
import argparse

parser = argparse.ArgumentParser()

parser.add_argument(

"name"

)

args = parser.parse_args()

print(

args.name

)
```

---

# Running the Program

Command

```bash
python app.py Alice
```

Output

```text
Alice
```

---

# Optional Arguments

Example

```python
parser.add_argument(

"--verbose",

action="store_true"

)
```

Run

```bash
python app.py --verbose
```

Useful for

debugging

and logging.

---

# Subcommands

Professional CLI tools

often use

subcommands.

Example

```text
git commit

git push

git pull
```

Similarly,

our Task Manager

can use

```text
task add

↓

task list

↓

task remove
```

---

# Reading Data

Tasks can be stored

inside

a JSON file.

Workflow

```text
Read File

↓

Load Tasks

↓

Modify

↓

Save File
```

---

# Writing Data

After adding

or deleting a task,

save changes.

```text
Task Added

↓

Update List

↓

Write JSON
```

Persistent storage

ensures tasks remain

after restarting the application.

---

# Configuration

Settings such as

```text
Data File

↓

Log File

↓

Default Folder
```

should be stored

in configuration,

not hardcoded.

---

# Logging

CLI applications

should log

important events.

Example

```python
import logging

logging.info(

"Task Added"

)
```

Logs help diagnose

unexpected issues.

---

# Error Handling

Example

```python
try:

    load_tasks()

except FileNotFoundError:

    print(

        "Task file not found."

    )
```

Handle errors

gracefully

instead of crashing.

---

# Packaging the CLI

To distribute

your application,

package it

as a Python project.

Example

```bash
pip install .
```

Users can then run

your CLI

from anywhere.

---

# CLI Workflow

```text
User Command

↓

Argument Parsing

↓

Business Logic

↓

Read/Write Data

↓

Output
```

---

# Real-World Example

Imagine

a backup utility.

Command

```bash
backup Documents
```

Workflow

```text
Read Folder

↓

Compress Files

↓

Copy Backup

↓

Write Log

↓

Finish
```

Everything happens

from one command.

---

# Memory Trick

Remember

```text
PALS
```

**P**

Parse Arguments

↓

**A**

Action

↓

**L**

Log

↓

**S**

Save

These are the four stages

of most CLI applications.

---

# Best Practices

✔ Use `argparse`

✔ Keep commands simple

✔ Handle invalid input

✔ Log important events

✔ Store configuration separately

✔ Organize code into modules

✔ Provide helpful `--help` messages

---

# Common Beginner Mistakes

### Mistake 1

Writing all logic

inside

`main.py`.

Separate

business logic

into modules.

---

### Mistake 2

Ignoring invalid input.

Always validate

user-provided arguments.

---

### Mistake 3

Hardcoding file paths

or configuration values.

Use configuration files

or environment variables.

---

### Mistake 4

Not providing

usage information.

Good CLI tools

include

clear help messages

and documentation.

---

# Interview Questions & Answers

## Q1. What is a CLI Application?

### Answer

A CLI (Command-Line Interface) application allows users to interact with software by typing commands into a terminal instead of using a graphical interface.

---

## Q2. What is the purpose of the `argparse` module?

### Answer

`argparse` simplifies command-line argument parsing by automatically handling options,

flags,

help messages,

and input validation.

---

## Q3. Why should CLI applications use logging?

### Answer

Logging records important events,

errors,

and execution details,

making debugging and maintenance easier.

---

## Q4. Why organize CLI projects into multiple modules?

### Answer

Separating argument parsing,

business logic,

data storage,

and configuration improves readability,

maintainability,

and testing.

---

## Q5. What are common use cases for CLI applications?

### Answer

CLI applications are commonly used for automation,

system administration,

developer tools,

file management,

data processing,

and deployment utilities.

---

# Chapter Summary / Cheat Sheet

| Concept | Purpose |
|----------|----------|
| CLI | Command-line application |
| `argparse` | Parse command-line arguments |
| Positional Argument | Required input |
| Optional Argument | Flag or option |
| Subcommand | Multiple CLI actions |
| Logging | Record application events |
| Configuration | Store settings |
| JSON Storage | Persist data |
| Packaging | Distribute CLI application |

---

# What's Next?

In **Chapter 86 — REST API**, you'll build a complete production-ready REST API using **FastAPI** by implementing:

- CRUD Operations
- Authentication
- Database Integration
- Validation
- Error Handling
- API Documentation
- Deployment

This project combines many concepts from earlier modules into a real-world backend application.