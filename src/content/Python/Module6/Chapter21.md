# Module 6 — File Handling

# Chapter 21 — Working with Data Files

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Structured Data Files are Needed
- What is CSV?
- Reading CSV Files
- Writing CSV Files
- What is JSON?
- Reading JSON Files
- Writing JSON Files
- JSON vs Python Objects
- What is Pickle?
- Serialization & Deserialization
- When to Use CSV, JSON, and Pickle
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine three companies sharing information.

Company A sends

```text
John,25,Engineer
```

Company B sends

```json
{
    "name":"John",
    "age":25
}
```

Company C sends

```text
(Binary Data)
```

All three store the same information,

but in different formats.

Programming works the same way.

Depending on the situation,

we use different file formats.

The three most common formats in Python are

- CSV
- JSON
- Pickle

---

# Story — Shipping Packages

Imagine sending a gift.

If you're sending

```text
A Spreadsheet
```

you use an envelope.

If you're sending

```text
A Fragile Item
```

you use bubble wrap.

If you're sending

```text
Furniture
```

you use a wooden crate.

Different packages,

different purposes.

Similarly,

Python uses different file formats depending on the type of data.

---

# Why Data Files?

Suppose you have

```text
1000 Students
```

Each student has

- Name
- Age
- Marks

Saving this as plain text is difficult to process.

Instead,

use structured formats.

```text
CSV

↓

Rows & Columns

----------------

JSON

↓

Objects

----------------

Pickle

↓

Python Objects
```

---

# CSV (Comma Separated Values)

CSV is one of the simplest and most common data formats.

Example

```csv
Name,Age,Marks
Alice,21,95
Bob,22,88
Charlie,20,91
```

Each row represents one record.

Each column represents one field.

---

# Why CSV?

CSV is widely used because it is

- Simple
- Lightweight
- Human-readable
- Supported by Excel
- Supported by Databases

Almost every spreadsheet application can open CSV files.

---

# Reading CSV Files

Python provides the

```python
csv
```

module.

Example

```python
import csv

with open("students.csv", "r") as file:

    reader = csv.reader(file)

    for row in reader:

        print(row)
```

Output

```python
['Name', 'Age', 'Marks']

['Alice', '21', '95']

['Bob', '22', '88']
```

Notice

everything is read as **strings**.

---

# Reading as Dictionaries

Instead of numeric indexes,

use column names.

```python
import csv

with open("students.csv") as file:

    reader = csv.DictReader(file)

    for row in reader:

        print(row["Name"])
```

Output

```text
Alice

Bob
```

Much easier to read.

---

# Writing CSV Files

Example

```python
import csv

with open(

"students.csv",

"w",

newline=""

) as file:

    writer = csv.writer(file)

    writer.writerow(

        ["Name", "Age", "Marks"]

    )

    writer.writerow(

        ["Alice", 21, 95]

    )
```

Output

```csv
Name,Age,Marks
Alice,21,95
```

---

# CSV Visualization

```text
Spreadsheet

↓

Rows

↓

Columns

↓

CSV File
```

Best for tabular data.

---

# What is JSON?

JSON stands for

```text
JavaScript Object Notation
```

Although it originated with JavaScript,

today it is the **most widely used data exchange format**.

Example

```json
{
    "name":"Alice",
    "age":21,
    "marks":95
}
```

---

# Why JSON?

JSON is

- Human-readable
- Lightweight
- Language-independent
- Used by APIs
- Used by Web Applications

Most REST APIs communicate using JSON.

---

# Python Objects vs JSON

Python

```python
student = {

"name":"Alice",

"age":21

}
```

JSON

```json
{
    "name":"Alice",
    "age":21
}
```

Very similar,

but not identical.

---

# Reading JSON

Python provides the

```python
json
```

module.

Example

```python
import json

with open("student.json") as file:

    data = json.load(file)

print(data["name"])
```

Output

```text
Alice
```

---

# Writing JSON

Example

```python
import json

student = {

"name":"Alice",

"age":21

}

with open(

"student.json",

"w"

) as file:

    json.dump(

        student,

        file,

        indent=4

    )
```

Output

```json
{
    "name": "Alice",
    "age": 21
}
```

The

```python
indent=4
```

parameter makes the file easier to read.

---

# JSON Serialization

Suppose you have

```python
student = {

"name":"Alice"
}
```

Python converts it into

```json
{
    "name":"Alice"
}
```

This conversion is called

```text
Serialization
```

---

# JSON Deserialization

Reading the JSON back into Python

```python
data = json.load(file)
```

is called

```text
Deserialization
```

Visualization

```text
Python Object

↓

Serialize

↓

JSON File

↓

Deserialize

↓

Python Object
```

---

# What is Pickle?

Pickle is Python's own binary serialization format.

Unlike JSON,

Pickle can store almost any Python object.

Examples

- Lists
- Dictionaries
- Tuples
- Custom Classes
- Machine Learning Models

---

# Why Pickle?

Suppose you trained a Machine Learning model.

Training took

```text
10 Hours
```

Instead of training again,

save it using Pickle.

Next time,

simply load it.

---

# Writing Pickle Files

Example

```python
import pickle

student = {

"name":"Alice",

"marks":95

}

with open(

"student.pkl",

"wb"

) as file:

    pickle.dump(

        student,

        file

    )
```

Notice

```text
wb

↓

Write Binary
```

---

# Reading Pickle Files

Example

```python
import pickle

with open(

"student.pkl",

"rb"

) as file:

    data = pickle.load(file)

print(data)
```

Output

```python
{

'name':'Alice',

'marks':95

}
```

---

# Serialization vs Deserialization

```text
Python Object

↓

Save

↓

Serialization

----------------

Load

↓

Deserialization

↓

Python Object
```

---

# CSV vs JSON vs Pickle

| Feature | CSV | JSON | Pickle |
|----------|------|-------|---------|
| Human Readable | ✅ | ✅ | ❌ |
| Stores Tables | ✅ | ❌ | ✅ |
| Stores Nested Data | ❌ | ✅ | ✅ |
| Stores Python Objects | ❌ | ❌ | ✅ |
| Cross-language | ✅ | ✅ | ❌ |

---

# When Should You Use Which?

### CSV

Use when

```text
Rows

↓

Columns
```

Examples

- Sales Reports
- Student Marks
- Excel Data

---

### JSON

Use when

```text
Nested Data

↓

APIs

↓

Configuration Files
```

Examples

- REST APIs
- Web Applications
- Configuration

---

### Pickle

Use when

```text
Python Objects

↓

Need to Save

↓

Load Later
```

Examples

- Machine Learning Models
- Cached Data
- Game State
- Python Applications

---

# Real-World Example

Imagine an online shopping platform.

```text
Sales Report

↓

CSV

----------------

REST API

↓

JSON

----------------

Recommendation Model

↓

Pickle
```

Each format serves a different purpose.

---

# Memory Trick

Remember

```text
CJP
```

**C**

CSV

↓

**J**

JSON

↓

**P**

Pickle

And remember

```text
Table

↓

CSV

----------------

API

↓

JSON

----------------

Python Object

↓

Pickle
```

---

# Common Beginner Mistakes

### Mistake 1

Using CSV for nested data.

CSV is designed for rows and columns,

not hierarchical structures.

---

### Mistake 2

Using Pickle to exchange data between programming languages.

Pickle is Python-specific.

Use JSON instead.

---

### Mistake 3

Loading Pickle files from untrusted sources.

Pickle can execute arbitrary code during loading.

Only unpickle data you trust.

---

### Mistake 4

Forgetting that CSV values are read as strings.

Convert numeric fields manually.

Example

```python
age = int(row["Age"])
```

---

# Interview Questions & Answers

## Q1. What is CSV?

### Answer

CSV (Comma Separated Values) is a simple text format used to store tabular data.

Each row represents one record,

and columns are separated by commas.

---

## Q2. What is JSON?

### Answer

JSON (JavaScript Object Notation) is a lightweight data-interchange format.

It is widely used for

- REST APIs
- Configuration Files
- Data Exchange

because it is language-independent and human-readable.

---

## Q3. What is Pickle?

### Answer

Pickle is Python's built-in serialization module.

It converts Python objects into a binary format and reconstructs them later.

It is useful for saving Python-specific objects such as trained machine learning models.

---

## Q4. What is the difference between Serialization and Deserialization?

### Answer

Serialization converts an object into a storable or transferable format.

Deserialization reconstructs the original object from that stored representation.

Examples:

- JSON → `dump()` / `load()`
- Pickle → `dump()` / `load()`

---

## Q5. Which format should you use?

### Answer

| Requirement | Best Choice |
|-------------|-------------|
| Tabular Data | CSV |
| API Communication | JSON |
| Save Python Objects | Pickle |

Choose the format based on the type of data and how it will be used.

---

# Chapter Summary / Cheat Sheet

| Format | Best Use |
|----------|----------|
| CSV | Tabular Data |
| JSON | APIs & Configuration |
| Pickle | Python Object Serialization |
| `csv.reader()` | Read CSV |
| `csv.writer()` | Write CSV |
| `json.load()` | Read JSON |
| `json.dump()` | Write JSON |
| `pickle.load()` | Read Pickle |
| `pickle.dump()` | Write Pickle |

---

# What's Next?

In **Chapter 22 — Modern File Handling**, you'll learn modern Python techniques for working with files:

- `pathlib`
- Context Managers (`with`)
- Logging
- Best Practices for File Operations

These tools make file handling cleaner, safer, and more Pythonic.