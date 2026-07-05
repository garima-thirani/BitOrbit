# Module 17 — Database Programming

# Chapter 64 — PostgreSQL & MySQL

---

# Learning Objectives

By the end of this chapter, you will understand:

- What are PostgreSQL & MySQL?
- Why Use Client-Server Databases?
- SQLite vs MySQL vs PostgreSQL
- Installing Database Servers
- Connecting Python to Databases
- Executing SQL Queries
- Transactions
- Connection Pooling
- Best Practices
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine your college stores

```text
50 Student Records
```

SQLite works perfectly.

Now imagine

Amazon,

Netflix,

or Instagram.

They store

```text
Millions of Users

↓

Billions of Records

↓

Thousands of Requests

Every Second
```

A simple SQLite database isn't enough.

Large applications need powerful database servers like

```text
MySQL

PostgreSQL
```

---

# Story — Small Shop vs Supermarket

Imagine two businesses.

Small Shop

```text
One Owner

↓

One Cashier

↓

Few Customers
```

SQLite works well.

Now imagine

a supermarket.

```text
100 Employees

↓

Thousands of Customers

↓

Many Cash Counters
```

A professional management system is required.

That's what MySQL and PostgreSQL provide.

---

# What is MySQL?

MySQL is an

open-source

Relational Database Management System (RDBMS).

It is widely used in

- Websites
- Web Applications
- E-commerce
- Content Management Systems

Popular companies using MySQL include

- Facebook (historically)
- WordPress
- Shopify

---

# What is PostgreSQL?

PostgreSQL (often called **Postgres**) is an advanced

open-source

Relational Database Management System.

It supports

- Complex Queries
- JSON Data
- Full-text Search
- Advanced Indexing
- Extensions

Widely used in

- Banking
- GIS Applications
- Enterprise Systems
- Data Analytics

---

# Client-Server Architecture

Unlike SQLite,

MySQL and PostgreSQL use

```text
Python Application

↓

Database Driver

↓

Database Server

↓

Database Files
```

The database runs

as a separate server process.

Many applications

can connect simultaneously.

---

# SQLite vs MySQL vs PostgreSQL

| Feature | SQLite | MySQL | PostgreSQL |
|----------|---------|--------|------------|
| Server Required | ❌ No | ✅ Yes | ✅ Yes |
| Database File | Single File | Server | Server |
| Concurrent Users | Limited | Excellent | Excellent |
| Best For | Small Apps | Web Apps | Enterprise Apps |

---

# Installing MySQL

Download and install

```text
MySQL Community Server
```

After installation,

start the database server

and create a database.

---

# Installing PostgreSQL

Download

```text
PostgreSQL
```

During installation,

set

- Username
- Password
- Port

The default port is

```text
5432
```

---

# Python Database Drivers

Python communicates with databases

using drivers.

MySQL

```bash
pip install mysql-connector-python
```

PostgreSQL

```bash
pip install psycopg2-binary
```

---

# Connecting to MySQL

Example

```python
import mysql.connector

conn = mysql.connector.connect(

host="localhost",

user="root",

password="password",

database="school"

)
```

---

# Connecting to PostgreSQL

Example

```python
import psycopg2

conn = psycopg2.connect(

host="localhost",

database="school",

user="postgres",

password="password"

)
```

---

# Creating a Cursor

After connecting,

create a cursor.

```python
cursor = conn.cursor()
```

The cursor executes SQL statements.

---

# Executing SQL

Example

```python
cursor.execute(

"SELECT * FROM students"

)
```

---

# Reading Results

One row

```python
cursor.fetchone()
```

All rows

```python
cursor.fetchall()
```

---

# Inserting Data

Example

```python
cursor.execute(

"""

INSERT INTO students

(name, age)

VALUES (%s,%s)

""",

("Alice",20)

)

conn.commit()
```

Notice

MySQL and PostgreSQL use

```text
%s
```

as placeholders.

(SQLite commonly uses `?`.)

---

# Updating Data

```python
cursor.execute(

"""

UPDATE students

SET age=%s

WHERE id=%s

""",

(21,1)

)

conn.commit()
```

---

# Deleting Data

```python
cursor.execute(

"""

DELETE FROM students

WHERE id=%s

""",

(1,)

)

conn.commit()
```

---

# Transactions

A transaction groups

multiple SQL operations

into

one logical unit.

Example

```text
Withdraw Money

↓

Deposit Money

↓

Commit
```

If an error occurs,

rollback the transaction.

---

# Rollback

```python
conn.rollback()
```

All changes

since the last commit

are undone.

---

# Connection Pooling

Suppose

1000 users

connect

at the same time.

Creating

1000 new connections

is slow.

Instead,

reuse existing connections.

Visualization

```text
Application

↓

Connection Pool

↓

Database Server
```

This improves performance.

---

# Security Best Practices

Always

✔ Use parameterized queries

✔ Store passwords securely

✔ Close connections

✔ Use transactions

✔ Limit database permissions

---

# Complete Workflow

```text
Connect

↓

Create Cursor

↓

Execute Query

↓

Fetch Results

↓

Commit

↓

Close Connection
```

---

# Real-World Example

Imagine an online banking application.

Database

```text
Customers

↓

Accounts

↓

Transactions

↓

Loans
```

Thousands of users

access the database

simultaneously.

This requires

PostgreSQL

or

MySQL,

not SQLite.

---

# Choosing the Right Database

| Use Case | Database |
|-----------|----------|
| Learning SQL | SQLite |
| Personal Projects | SQLite |
| Small Websites | MySQL |
| Enterprise Systems | PostgreSQL |
| Banking Applications | PostgreSQL |
| Analytics | PostgreSQL |

---

# Memory Trick

Remember

```text
CCEFCC
```

**C**

Connect

↓

**C**

Cursor

↓

**E**

Execute

↓

**F**

Fetch

↓

**C**

Commit

↓

**C**

Close

This is the workflow

for almost every database application.

---

# Common Beginner Mistakes

### Mistake 1

Building SQL queries

using string concatenation.

Always use

parameterized queries

to prevent SQL Injection.

---

### Mistake 2

Forgetting

```python
conn.commit()
```

Changes won't be saved.

---

### Mistake 3

Leaving database connections open.

Always close connections

after use.

---

### Mistake 4

Using SQLite

for applications requiring

hundreds of concurrent users.

Choose

MySQL

or

PostgreSQL

for multi-user production systems.

---

# Interview Questions & Answers

## Q1. What is the difference between SQLite and MySQL?

### Answer

SQLite is

serverless

and stores the database in a single file.

MySQL is a client-server database designed for multi-user applications,

offering better scalability and concurrency.

---

## Q2. Why is PostgreSQL preferred for enterprise applications?

### Answer

PostgreSQL supports advanced SQL features,

complex queries,

JSON,

window functions,

extensions,

and strong ACID compliance,

making it suitable for enterprise systems.

---

## Q3. What is a database driver?

### Answer

A database driver is a Python library that enables communication between a Python application and a database server.

Examples include

- `mysql-connector-python`
- `psycopg2`

---

## Q4. Why are transactions important?

### Answer

Transactions ensure data consistency.

Either all operations succeed and are committed,

or if an error occurs,

all changes are rolled back,

preventing partial updates.

---

## Q5. What is Connection Pooling?

### Answer

Connection pooling maintains a pool of reusable database connections.

Instead of creating a new connection for every request,

applications reuse existing connections,

improving performance and scalability.

---

# Chapter Summary / Cheat Sheet

| Concept | Purpose |
|----------|----------|
| MySQL | Popular web database |
| PostgreSQL | Enterprise-grade database |
| Database Driver | Connect Python to DB |
| `connect()` | Open connection |
| `cursor()` | Execute SQL |
| `execute()` | Run SQL query |
| `fetchone()` | Read one row |
| `fetchall()` | Read all rows |
| `commit()` | Save transaction |
| `rollback()` | Undo transaction |
| Connection Pool | Reuse database connections |

---

# What's Next?

In **Chapter 65 — SQLAlchemy ORM**, you'll learn how to work with databases using Python objects instead of writing raw SQL:

- What is an ORM?
- SQLAlchemy Basics
- Models
- Sessions
- CRUD Operations
- Relationships
- Querying Data

SQLAlchemy is the most widely used ORM in Python and is the standard choice for modern frameworks such as Flask and FastAPI.