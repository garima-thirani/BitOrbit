# Module 23 — Production Projects

# Chapter 86 — REST API

---

# Learning Objectives

By the end of this chapter, you will understand:

- Project Overview
- REST API Architecture
- Project Structure
- FastAPI Setup
- CRUD Operations
- Database Integration
- SQLAlchemy ORM
- Pydantic Validation
- Authentication (JWT)
- Error Handling
- API Documentation
- Deployment
- Best Practices
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're building

```text
Amazon

↓

Netflix

↓

Instagram

↓

Banking App

↓

Hospital System
```

All of these applications

communicate

using

```text
REST APIs
```

In this chapter,

you'll build

a production-ready

REST API

using Python.

---

# Project Goal

We will build

a

```text
Task Management API
```

Features

```text
Create Task

↓

Read Tasks

↓

Update Task

↓

Delete Task

↓

User Authentication

↓

Database Storage
```

---

# Technology Stack

```text
Python

↓

FastAPI

↓

SQLAlchemy

↓

SQLite

↓

JWT Authentication

↓

Pydantic
```

This stack

is commonly used

in production systems.

---

# REST API Architecture

```text
Client

↓

HTTP Request

↓

FastAPI

↓

Business Logic

↓

Database

↓

HTTP Response
```

Each layer

has

a clear responsibility.

---

# Project Structure

```text
task_api/

│

├── app/

│   ├── main.py

│   ├── database.py

│   ├── models.py

│   ├── schemas.py

│   ├── auth.py

│   ├── routers/

│   ├── services/

│   └── utils/

│

├── requirements.txt

├── .env

└── README.md
```

Professional projects

separate

application components.

---

# Installing Dependencies

```bash
pip install fastapi

pip install uvicorn

pip install sqlalchemy

pip install pydantic

pip install python-jose

pip install passlib[bcrypt]
```

---

# Creating the Application

```python
from fastapi import FastAPI

app = FastAPI()
```

Run

```bash
uvicorn app.main:app --reload
```

---

# API Endpoints

Our API

will expose

```text
GET /tasks

↓

GET /tasks/{id}

↓

POST /tasks

↓

PUT /tasks/{id}

↓

DELETE /tasks/{id}
```

These implement

CRUD operations.

---

# GET Endpoint

```python
@app.get("/tasks")
def get_tasks():

    return tasks
```

Returns

all tasks.

---

# POST Endpoint

```python
@app.post("/tasks")
def create_task(

task: TaskCreate

):

    ...
```

Creates

a new task.

---

# PUT Endpoint

```python
@app.put("/tasks/{id}")
def update_task(

id: int

):
    ...
```

Updates

an existing task.

---

# DELETE Endpoint

```python
@app.delete("/tasks/{id}")
def delete_task(

id: int

):
    ...
```

Deletes

the selected task.

---

# Database Integration

Instead of storing

tasks in memory,

save them

inside

```text
SQLite
```

using

```text
SQLAlchemy ORM
```

---

# SQLAlchemy Model

Example

```python
class Task(Base):

    __tablename__ = "tasks"

    id = Column(

        Integer,

        primary_key=True

    )

    title = Column(String)
```

Models represent

database tables.

---

# Pydantic Schemas

Separate

database models

from

API models.

Example

```python
class TaskCreate(

BaseModel

):

    title: str
```

Schemas validate

incoming requests.

---

# Validation

FastAPI automatically validates

incoming JSON.

Example

```json
{
    "title":"Learn Python"
}
```

Missing

required fields

produces

a validation error.

---

# Authentication

Users should

log in

before modifying data.

Workflow

```text
Login

↓

JWT Token

↓

Authenticated Request

↓

Protected Endpoint
```

---

# Password Hashing

Never store

plain passwords.

Example

```python
bcrypt.hash(

password

)
```

Passwords

should always

be hashed.

---

# Protected Routes

Example

```python
@app.get(

"/profile"

)
```

Only authenticated users

can access

protected endpoints.

---

# Error Handling

Example

```python
raise HTTPException(

status_code=404,

detail="Task not found"

)
```

Return

meaningful

HTTP errors.

---

# Automatic Documentation

FastAPI automatically provides

```text
/docs

↓

Swagger UI

----------------

/redoc

↓

ReDoc
```

Developers

can test

the API

directly

from the browser.

---

# Deployment

Typical deployment

```text
FastAPI

↓

Gunicorn/Uvicorn

↓

Docker

↓

Cloud Platform
```

Examples

```text
Render

↓

Railway

↓

AWS

↓

Azure
```

---

# API Workflow

```text
Client Request

↓

Validation

↓

Authentication

↓

Business Logic

↓

Database

↓

Response
```

---

# Real-World Example

Imagine

a To-Do application.

```text
User

↓

Login

↓

Create Task

↓

Store Database

↓

View Tasks

↓

Update Task

↓

Delete Task
```

Every action

is performed

through the REST API.

---

# Security Checklist

✔ Validate input

✔ Hash passwords

✔ Use JWT

✔ Protect routes

✔ Use HTTPS

✔ Store secrets

in environment variables

---

# Memory Trick

Remember

```text
CAVAD
```

**C**

CRUD

↓

**A**

Authentication

↓

**V**

Validation

↓

**A**

API Docs

↓

**D**

Database

These are

the five pillars

of a production REST API.

---

# Best Practices

✔ Organize routes into modules

✔ Validate every request

✔ Use Pydantic schemas

✔ Separate business logic

✔ Return proper HTTP status codes

✔ Log important events

✔ Protect sensitive endpoints

✔ Document your API

---

# Common Beginner Mistakes

### Mistake 1

Putting

database logic

inside API routes.

Instead,

use

services

or repositories.

---

### Mistake 2

Returning

database models

directly.

Use

Pydantic schemas

for API responses.

---

### Mistake 3

Storing passwords

without hashing.

Always use

secure hashing algorithms

such as bcrypt.

---

### Mistake 4

Leaving

protected routes

accessible

without authentication.

Always verify

the user's identity.

---

# Interview Questions & Answers

## Q1. What is a REST API?

### Answer

A REST API is an architectural style that allows applications to communicate using HTTP methods such as GET,

POST,

PUT,

and DELETE to manage resources.

---

## Q2. Why use Pydantic in FastAPI?

### Answer

Pydantic validates incoming and outgoing data,

ensuring requests match expected schemas and reducing runtime errors.

---

## Q3. Why separate SQLAlchemy models from Pydantic schemas?

### Answer

SQLAlchemy models represent database tables,

while Pydantic schemas define API request and response formats.

Separating them improves security,

validation,

and maintainability.

---

## Q4. Why is JWT commonly used?

### Answer

JWT provides stateless authentication,

allowing clients to securely authenticate with APIs without maintaining server-side sessions.

---

## Q5. Why is FastAPI popular for production APIs?

### Answer

FastAPI offers high performance,

automatic validation,

interactive documentation,

async support,

and excellent developer productivity,

making it ideal for modern production services.

---

# Chapter Summary / Cheat Sheet

| Component | Purpose |
|-----------|---------|
| FastAPI | API framework |
| CRUD | Create, Read, Update, Delete |
| SQLAlchemy | ORM |
| SQLite | Database |
| Pydantic | Validation |
| JWT | Authentication |
| bcrypt | Password hashing |
| HTTPException | Error responses |
| Swagger UI | Interactive API docs |
| Docker | Deployment |

---

# What's Next?

In **Chapter 87 — Automation Tool**, you'll build a real-world automation application that combines:

- File Automation
- Scheduling
- Logging
- Email Notifications
- Configuration Management
- Error Recovery
- Production Deployment

You'll create a practical tool similar to those used by system administrators and DevOps engineers to automate repetitive business tasks.