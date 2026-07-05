# Module 6 — File Handling

# Chapter 20 — Files

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why File Handling is Needed
- What is a File?
- Opening Files
- Reading Files
- Writing Files
- File Modes
- File Pointer
- Closing Files
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're writing notes for an exam.

If you keep everything only in your mind,

what happens when you sleep or restart your computer?

Everything disappears.

Instead,

you write your notes in a notebook.

```text
Memory

↓

Temporary

----------------

Notebook

↓

Permanent
```

Programs face the same problem.

Variables exist only while the program is running.

To save information permanently,

we use **Files**.

---

# Story — Whiteboard vs Notebook

Imagine a teacher teaching in a classroom.

On the whiteboard,

everything is temporary.

```text
Write

↓

Erase

↓

Gone
```

But if students write the same content in their notebooks,

```text
Write

↓

Close Notebook

↓

Open Tomorrow

↓

Still There
```

Python variables are like the whiteboard.

Files are like the notebook.

---

# Why File Handling?

Suppose you're building a banking application.

Customers

- Register
- Deposit Money
- Withdraw Money

If everything is stored only in variables,

```python
balance = 5000
```

the moment the program closes,

```text
Balance

↓

Lost
```

Instead,

save the information to a file.

Now,

the data survives even after the program ends.

---

# What is a File?

A **file** is a named location on a storage device used to store data permanently.

Examples

```text
notes.txt

students.csv

config.json

photo.jpg

report.pdf
```

Python can read and write many different file types.

---

# Opening a File

Python uses the built-in

```python
open()
```

function.

Syntax

```python
open(

file_name,

mode

)
```

Example

```python
file = open(

"notes.txt",

"r"

)
```

This opens

```text
notes.txt
```

in

```text
Read Mode
```

---

# File Object

After opening,

Python returns a **file object**.

Visualization

```text
notes.txt

↓

open()

↓

File Object

↓

Read / Write
```

The file object is your connection to the file.

---

# Reading a File

Suppose

```
notes.txt
```

contains

```text
Python

Java

C++
```

Read the entire file.

```python
file = open(

"notes.txt",

"r"

)

content = file.read()

print(content)
```

Output

```text
Python

Java

C++
```

---

# Reading One Line

Use

```python
readline()
```

Example

```python
file = open(

"notes.txt",

"r"

)

print(

file.readline()

)
```

Output

```text
Python
```

Each call reads the next line.

---

# Reading All Lines

Use

```python
readlines()
```

Example

```python
file = open(

"notes.txt",

"r"

)

print(

file.readlines()

)
```

Output

```python
['Python\n',

 'Java\n',

 'C++']
```

Useful when processing files line by line.

---

# Iterating Over a File

Instead of reading everything into memory,

iterate through the file.

```python
file = open(

"notes.txt",

"r"

)

for line in file:

    print(line.strip())
```

This is more memory-efficient for large files.

---

# Writing to a File

Use

```text
Write Mode
```

Example

```python
file = open(

"notes.txt",

"w"

)

file.write(

"Hello Python"

)

file.close()
```

Output

```
notes.txt
```

contains

```text
Hello Python
```

---

# What Happens in Write Mode?

Suppose

```
notes.txt
```

already contains

```text
Java

Python
```

Now

```python
open(

"notes.txt",

"w"

)
```

Result

```text
File Cleared

↓

New Data Written
```

Write mode **overwrites** existing content.

---

# Appending to a File

Suppose you want to keep the existing content.

Use

```text
Append Mode
```

Example

```python
file = open(

"notes.txt",

"a"

)

file.write(

"\nC++"

)
```

Now

```text
Java

Python

C++
```

Nothing is deleted.

---

# File Modes

One of the most important interview topics.

| Mode | Purpose |
|-------|----------|
| `"r"` | Read |
| `"w"` | Write (overwrite) |
| `"a"` | Append |
| `"x"` | Create new file |
| `"r+"` | Read & Write |
| `"w+"` | Read & Write (overwrite) |
| `"a+"` | Read & Append |

---

# Understanding File Modes

### Read

```text
r

↓

Read Only
```

File must already exist.

---

### Write

```text
w

↓

Overwrite

↓

Create if Missing
```

---

### Append

```text
a

↓

Write at End

↓

Keep Existing Data
```

---

### Exclusive Create

```text
x

↓

Create New File

↓

Error if Already Exists
```

Useful when you want to avoid accidentally overwriting an existing file.

---

# File Pointer

Imagine reading a book.

You don't start from page one every time.

You continue from where you stopped.

Files behave the same way.

```text
Start

↓

Read

↓

Pointer Moves

↓

Next Read Starts Here
```

The current reading position is called the **file pointer**.

---

# tell()

Find the current position.

```python
file.tell()
```

Example

```python
file = open(

"notes.txt",

"r"

)

print(

file.tell()

)
```

Output

```text
0
```

After reading

```python
file.read(5)

print(

file.tell()

)
```

Output

```text
5
```

---

# seek()

Move the file pointer.

Example

```python
file.seek(0)
```

Now reading starts from the beginning again.

Visualization

```text
Read

↓

Pointer at 10

↓

seek(0)

↓

Pointer Back to Start
```

---

# Closing a File

Always close files after use.

```python
file.close()
```

Closing a file

- Flushes pending writes
- Releases operating system resources
- Prevents file corruption

---

# Real-World Example

Imagine a student management system.

```text
Student Registers

↓

Program Writes

↓

students.txt

↓

Program Closes

↓

Next Day

↓

Read students.txt

↓

Student Data Available
```

Without files,

every registration would disappear after the program exits.

---

# Memory Trick

Remember

```text
ORWC
```

**O**

Open

↓

**R**

Read

↓

**W**

Write

↓

**C**

Close

And remember the file modes

```text
R

Read

↓

W

Overwrite

↓

A

Append

↓

X

Create
```

---

# Common Beginner Mistakes

### Mistake 1

Opening a file in

```text
w
```

when you meant

```text
a
```

Write mode erases existing content.

Append mode preserves it.

---

### Mistake 2

Forgetting to close the file.

Unclosed files can lead to resource leaks or incomplete writes.

---

### Mistake 3

Trying to read a file opened in write mode.

Example

```python
open(

"notes.txt",

"w"

)
```

This mode is intended for writing,

not reading.

---

### Mistake 4

Reading huge files using

```python
read()
```

This loads the entire file into memory.

For large files,

iterate over the file line by line.

---

# Interview Questions & Answers

## Q1. What is File Handling?

### Answer

File handling is the process of creating, reading, writing, updating, and managing files stored on disk.

It allows programs to store data permanently.

---

## Q2. What is the difference between `"w"` and `"a"` mode?

### Answer

`"w"`

- Overwrites existing content
- Creates the file if it doesn't exist

`"a"`

- Preserves existing content
- Writes new data at the end of the file

---

## Q3. What is the purpose of `read()`, `readline()`, and `readlines()`?

### Answer

- `read()` → Reads the entire file
- `readline()` → Reads one line at a time
- `readlines()` → Returns all lines as a list

---

## Q4. What is the file pointer?

### Answer

The file pointer tracks the current position within an open file.

Functions like

```python
tell()
```

return its position,

while

```python
seek()
```

moves it to a different position.

---

## Q5. Why should files be closed?

### Answer

Closing a file ensures that:

- All buffered data is written to disk
- System resources are released
- Other programs can safely access the file

---

# Chapter Summary / Cheat Sheet

| Function / Mode | Purpose |
|-----------------|----------|
| `open()` | Open a file |
| `read()` | Read entire file |
| `readline()` | Read one line |
| `readlines()` | Read all lines |
| `write()` | Write data |
| `close()` | Close file |
| `"r"` | Read |
| `"w"` | Write (overwrite) |
| `"a"` | Append |
| `"x"` | Create new file |
| `tell()` | Current file pointer |
| `seek()` | Move file pointer |

---

# What's Next?

In **Chapter 21 — Working with Data Files**, you'll learn how Python handles structured data formats:

- CSV Files
- JSON Files
- Pickle Serialization

These formats are widely used for data exchange, configuration files, APIs, and machine learning workflows.