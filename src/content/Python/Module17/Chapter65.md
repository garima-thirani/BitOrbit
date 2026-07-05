# Module 17 — Database Programming

# Chapter 65 — SQLAlchemy ORM

---

# Learning Objectives

By the end of this chapter, you will understand:

- What is an ORM?
- Why SQLAlchemy?
- Installing SQLAlchemy
- Database Engine
- Declarative Base
- Models
- Columns & Data Types
- Sessions
- CRUD Operations
- Querying Data
- Relationships
- Best Practices
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you want to insert a new student into a database.

Without an ORM,

you write SQL.

```sql
INSERT INTO students(name, age)
VALUES('Alice',20);
```

With an ORM,

you simply create a Python object.

```python
student = Student(
    name="Alice",
    age=20
)
```

No SQL required.

This is the power of an

```text
ORM
```

---

# Story — Translator

Imagine two people.

One speaks

```text
English
```

The other speaks

```text
Japanese
```

They cannot communicate directly.

A translator stands between them.

```text
English

↓

Translator

↓

Japanese
```

SQLAlchemy acts as a translator.

Python speaks

Objects.

Databases speak

SQL.

SQLAlchemy converts one into the other.

---

# What is ORM?

ORM stands for

```text
Object Relational Mapping
```

It maps

```text
Python Objects

↓

Database Tables
```

Instead of writing SQL,

you work with

Python classes

and objects.

---

# Why ORM?

Without ORM

```text
Python

↓

SQL Queries

↓

Database
```

With ORM

```text
Python Objects

↓

ORM

↓

SQL

↓

Database
```

ORM automatically generates SQL.

---

# What is SQLAlchemy?

SQLAlchemy is

Python's most popular ORM.

It supports

- SQLite
- PostgreSQL
- MySQL
- Oracle
- SQL Server

Used in

- Flask
- FastAPI
- Enterprise Applications

---

# Installing SQLAlchemy

```bash
pip install sqlalchemy
```

Import

```python
from sqlalchemy import create_engine
```

---

# Database Engine

The engine connects

Python

to

the database.

Example

```python
from sqlalchemy import create_engine

engine = create_engine(

"sqlite:///students.db"

)
```

Visualization

```text
Python

↓

Engine

↓

Database
```

---

# Declarative Base

Models inherit

from a common base.

```python
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass
```

The Base class stores metadata

about all models.

---

# Creating a Model

Example

```python
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

class Student(Base):

    __tablename__ = "students"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True
    )

    name: Mapped[str] = mapped_column(
        String(100)
    )

    age: Mapped[int] = mapped_column(
        Integer
    )
```

This class

represents

the

```text
students
```

table.

---

# Model Mapping

```text
Python Class

↓

Database Table

-------------------

Python Attribute

↓

Database Column
```

Example

```text
Student.name

↓

name column
```

---

# Creating Tables

```python
Base.metadata.create_all(engine)
```

SQLAlchemy creates

all tables

defined by your models.

---

# Creating a Session

A Session communicates

with the database.

```python
from sqlalchemy.orm import Session

session = Session(engine)
```

Visualization

```text
Python

↓

Session

↓

Database
```

---

# Insert Data

Example

```python
student = Student(

name="Alice",

age=20

)

session.add(student)

session.commit()
```

No SQL written.

---

# Reading Data

Example

```python
students = session.query(

Student

).all()
```

Returns

all Student objects.

---

# Reading One Object

```python
student = session.query(

Student

).first()
```

Returns

the first matching object.

---

# Filtering

Example

```python
student = session.query(

Student

).filter(

Student.age > 18

).all()
```

SQLAlchemy converts

this into SQL automatically.

---

# Updating Data

Example

```python
student = session.get(Student, 1)

student.age = 21

session.commit()
```

The ORM detects

the change

and generates

the appropriate SQL

automatically.

---

# Deleting Data

```python
student = session.get(Student, 1)

session.delete(student)

session.commit()
```

The corresponding database row

is removed.

---

# CRUD Operations

```text
Create

↓

Read

↓

Update

↓

Delete
```

The same CRUD operations

exist in SQLAlchemy,

but they are performed using objects

instead of SQL statements.

---

# Relationships

Suppose

one customer

has many orders.

Visualization

```text
Customer

↓

Order

↓

Order

↓

Order
```

This is called

```text
One-to-Many
```

SQLAlchemy

supports

relationships

between models.

---

# Example Relationship

```python
from sqlalchemy.orm import relationship

orders = relationship(

"Order",

back_populates="customer"

)
```

Relationships make

navigating related data

easy.

---

# Session Workflow

```text
Create Object

↓

Add

↓

Commit

↓

Query

↓

Update

↓

Delete
```

---

# ORM vs Raw SQL

| Raw SQL | SQLAlchemy ORM |
|----------|----------------|
| Write SQL | Write Python |
| Manual Queries | Automatic SQL |
| More Control | More Productivity |
| Harder to Maintain | Easier to Maintain |

---

# Real-World Example

Imagine an online shopping system.

Models

```text
Customer

↓

Orders

↓

Products

↓

Payments
```

Each table

becomes

a Python class.

Developers interact

with objects,

not SQL.

---

# Memory Trick

Remember

```text
EMSCQ
```

**E**

Engine

↓

**M**

Model

↓

**S**

Session

↓

**C**

Commit

↓

**Q**

Query

This is the basic SQLAlchemy workflow.

---

# Best Practices

✔ One model per table

✔ Use relationships instead of manual joins

✔ Commit only when necessary

✔ Close sessions after use

✔ Use parameterized ORM queries

✔ Keep business logic outside models

---

# Common Beginner Mistakes

### Mistake 1

Forgetting

```python
session.commit()
```

Objects remain only in memory

until committed.

---

### Mistake 2

Confusing

Model

with

Table.

A model is

a Python class.

A table exists

inside the database.

---

### Mistake 3

Leaving sessions open.

Always close

or properly manage sessions

to release database resources.

---

### Mistake 4

Mixing raw SQL

and ORM

without understanding both approaches.

ORM improves productivity,

but understanding SQL remains essential.

---

# Interview Questions & Answers

## Q1. What is an ORM?

### Answer

An ORM (Object Relational Mapping)

maps database tables to Python classes.

It allows developers to work with Python objects instead of writing raw SQL for most operations.

---

## Q2. What is SQLAlchemy?

### Answer

SQLAlchemy is Python's most popular ORM.

It supports multiple databases,

generates SQL automatically,

and provides tools for database modeling,

querying,

and transaction management.

---

## Q3. What is a Session in SQLAlchemy?

### Answer

A Session manages communication between Python objects and the database.

It tracks changes,

handles transactions,

and commits or rolls back modifications.

---

## Q4. What is the purpose of `create_engine()`?

### Answer

`create_engine()`

creates a connection interface between the Python application and the database.

It is the first step in using SQLAlchemy.

---

## Q5. Why use an ORM instead of raw SQL?

### Answer

An ORM increases developer productivity by allowing database operations through Python objects.

It improves code readability,

reduces repetitive SQL,

supports multiple databases,

and simplifies maintenance.

However,

knowing SQL is still important because ORMs generate SQL behind the scenes.

---

# Chapter Summary / Cheat Sheet

| Concept | Purpose |
|----------|----------|
| ORM | Map Python objects to database tables |
| SQLAlchemy | Python ORM library |
| `create_engine()` | Connect to database |
| `DeclarativeBase` | Base class for models |
| Model | Python representation of a table |
| `Session()` | Database session |
| `add()` | Insert object |
| `query()` | Read data |
| `commit()` | Save changes |
| `delete()` | Remove object |
| `relationship()` | Connect related models |

---

# Module 17 Complete ✅

You have now mastered Database Programming:

- SQLite
- MySQL
- PostgreSQL
- Client-Server Databases
- Database Connections
- CRUD Operations
- Transactions
- Parameterized Queries
- SQLAlchemy ORM
- Models
- Sessions
- Relationships
- Object Relational Mapping

These skills form the foundation of backend development and are essential for frameworks like **Flask**, **Django**, and **FastAPI**.

---

# What's Next?

In **Module 18 — Web Development with Flask & FastAPI**, you'll learn how to build complete web applications and REST APIs using Python, including:

- Flask Basics
- Routing
- Templates
- FastAPI
- REST APIs
- Request & Response
- JSON APIs
- Authentication
- Database Integration

This module will take you from writing Python programs to building real-world backend applications.