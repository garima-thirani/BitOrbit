# Module 17 — Database Programming

# Chapter 63 — SQLite

---

# Learning Objectives

By the end of this chapter, you will understand:

- What is a Database?
- Why SQLite?
- Relational Databases
- Installing SQLite
- SQLite with Python
- Creating Databases
- Creating Tables
- CRUD Operations
- Transactions
- Parameterized Queries
- Best Practices
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're building an online shopping website.

Every day thousands of customers

- Register
- Login
- Place Orders
- Make Payments

Where should all this information be stored?

Certainly not in Python variables.

Variables disappear when the program ends.

Instead,

we store information permanently inside a

```text
Database
```

---

# Story — School Office

Imagine a school office.

Student records are stored inside

```text
Cabinets

↓

Files

↓

Student Records
```

Whenever someone asks for

Alice's marks,

the office searches

the records.

A database works exactly the same way,

except everything is digital.

---

# What is a Database?

A database is an organized collection of data

that allows us to

- Store Data
- Retrieve Data
- Update Data
- Delete Data

efficiently.

---

# What is SQLite?

SQLite is

a lightweight,

serverless,

relational database.

Unlike MySQL or PostgreSQL,

it does not require a separate database server.

Everything is stored inside a single file.

Example

```text
students.db
```

---

# Why SQLite?

SQLite is

- Free
- Lightweight
- Easy to Learn
- Built into Python
- Excellent for Small Applications

It is widely used in

- Desktop Applications
- Mobile Apps
- Embedded Systems
- Learning SQL

---

# SQLite in Python

Python provides

the built-in

```python
sqlite3
```

module.

No installation is required.

Import

```python
import sqlite3
```

---

# Creating a Database

Example

```python
import sqlite3

conn = sqlite3.connect(

"students.db"

)
```

If the database doesn't exist,

Python creates it automatically.

---

# Connection Object

```python
conn
```

represents

the connection

between Python

and the SQLite database.

Visualization

```text
Python

↓

Connection

↓

SQLite Database
```

---

# Cursor Object

Before executing SQL,

create a cursor.

```python
cursor = conn.cursor()
```

The cursor sends SQL commands

to the database.

---

# Creating a Table

Example

```python
cursor.execute("""

CREATE TABLE students(

id INTEGER PRIMARY KEY,

name TEXT,

age INTEGER

)

""")
```

This creates

a table named

```text
students
```

---

# SQL Structure

Every table contains

```text
Rows

↓

Records

----------------

Columns

↓

Fields
```

Example

```text
ID

Name

Age
```

---

# Inserting Data

```python
cursor.execute(

"""

INSERT INTO students

(name, age)

VALUES (?,?)

""",

("Alice",20)

)
```

Notice

the

```text
?
```

placeholders.

These prevent SQL Injection.

---

# Saving Changes

After inserting data,

commit the transaction.

```python
conn.commit()
```

Without

```python
commit()
```

changes are not permanently saved.

---

# Reading Data

Example

```python
cursor.execute(

"SELECT * FROM students"

)

rows = cursor.fetchall()

print(rows)
```

Output

```text
[(1,'Alice',20)]
```

---

# Reading One Row

```python
cursor.fetchone()
```

Returns

only

one row.

---

# Updating Data

Example

```python
cursor.execute(

"""

UPDATE students

SET age=21

WHERE id=1

"""

)

conn.commit()
```

---

# Deleting Data

Example

```python
cursor.execute(

"""

DELETE FROM students

WHERE id=1

"""

)

conn.commit()
```

---

# CRUD Operations

Every database supports

```text
Create

↓

Read

↓

Update

↓

Delete
```

Remember

```text
CRUD
```

These are

the four fundamental database operations.

---

# Parameterized Queries

Bad

```python
query =

"SELECT * FROM students WHERE name='"

+ name + "'"
```

This is vulnerable

to SQL Injection.

Good

```python
cursor.execute(

"SELECT * FROM students WHERE name=?",

(name,)

)
```

Always use parameterized queries.

---

# Transactions

Suppose

you transfer money.

```text
Withdraw

↓

Deposit
```

Both operations

must succeed together.

A transaction ensures

either

everything succeeds

or

everything fails.

---

# Rollback

Suppose

an error occurs.

```python
conn.rollback()
```

Undo all changes

made during the current transaction.

---

# Closing Connection

Always close

the database connection.

```python
conn.close()
```

This releases system resources.

---

# Complete Workflow

```text
Connect

↓

Cursor

↓

Execute SQL

↓

Commit

↓

Close
```

This is the standard SQLite workflow.

---

# Real-World Example

Imagine a Library Management System.

Database

```text
Books

↓

Members

↓

Borrow Records
```

Operations

```text
Insert Book

↓

Issue Book

↓

Return Book

↓

Search Book
```

SQLite efficiently stores

all this information.

---

# Memory Trick

Remember

```text
CECCC
```

**C**

Connect

↓

**E**

Execute

↓

**C**

Commit

↓

**C**

Close

Or simply

```text
CRUD

+

Commit
```

---

# Common Beginner Mistakes

### Mistake 1

Forgetting

```python
conn.commit()
```

Without committing,

changes are lost.

---

### Mistake 2

Not closing the connection.

Always call

```python
conn.close()
```

when finished.

---

### Mistake 3

Building SQL queries

using string concatenation.

Always use

parameterized queries

to prevent SQL Injection.

---

### Mistake 4

Confusing

```python
fetchone()
```

and

```python
fetchall()
```

- `fetchone()` returns one record.
- `fetchall()` returns all matching records.

---

# Interview Questions & Answers

## Q1. What is SQLite?

### Answer

SQLite is a lightweight,

serverless,

relational database management system.

It stores the entire database in a single file,

making it ideal for small applications,

mobile apps,

and learning SQL.

---

## Q2. Why is SQLite called serverless?

### Answer

SQLite does not require a separate database server.

Applications interact directly with the database file,

unlike MySQL or PostgreSQL,

which require dedicated database server processes.

---

## Q3. What are CRUD operations?

### Answer

CRUD stands for

- Create → Insert new records
- Read → Retrieve records
- Update → Modify existing records
- Delete → Remove records

These are the four fundamental database operations.

---

## Q4. Why should parameterized queries be used?

### Answer

Parameterized queries separate SQL commands from user input,

preventing SQL Injection attacks and improving security.

Example

```python
cursor.execute(
    "SELECT * FROM students WHERE name=?",
    (name,)
)
```

---

## Q5. Why is `commit()` necessary?

### Answer

`commit()` permanently saves changes made to the database.

Without calling `commit()`,

insert,

update,

and delete operations may be lost when the connection closes.

---

# Chapter Summary / Cheat Sheet

| Function | Purpose |
|----------|----------|
| `sqlite3.connect()` | Connect/Create Database |
| `cursor()` | Create Cursor |
| `execute()` | Execute SQL |
| `fetchone()` | Read One Record |
| `fetchall()` | Read All Records |
| `commit()` | Save Changes |
| `rollback()` | Undo Transaction |
| `close()` | Close Connection |
| CRUD | Create, Read, Update, Delete |

---

# What's Next?

In **Chapter 64 — PostgreSQL & MySQL**, you'll learn about enterprise-grade database systems:

- PostgreSQL
- MySQL
- Client-Server Architecture
- Connecting from Python
- Executing SQL Queries
- Transactions
- Differences Between SQLite, MySQL, and PostgreSQL

These databases power most modern web applications and enterprise software.