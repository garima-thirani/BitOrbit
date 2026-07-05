# Module 18 — API Development

# Chapter 68 — FastAPI

---

# Learning Objectives

By the end of this chapter, you will understand:

- What is FastAPI?
- Why FastAPI?
- Installing FastAPI
- Creating Your First API
- Path Parameters
- Query Parameters
- Request Body
- Pydantic Models
- Response Models
- Automatic API Documentation
- Async Endpoints
- Dependency Injection
- Best Practices
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're building an API for

- Amazon
- Netflix
- ChatGPT
- Uber

Thousands of users send requests every second.

The API must be

- Fast
- Reliable
- Easy to Develop
- Easy to Document

This is exactly what

```text
FastAPI
```

was designed for.

---

# Story — Highway vs City Road

Imagine two roads.

City Road

```text
Traffic Lights

↓

Slow

↓

Congestion
```

Highway

```text
Multiple Lanes

↓

Fast

↓

Optimized
```

Flask is like a city road.

FastAPI is like a modern highway.

Both reach the destination,

but FastAPI is optimized for speed and scalability.

---

# What is FastAPI?

FastAPI is a modern,

high-performance Python web framework

used for building

- REST APIs
- AI Services
- Microservices
- Backend Applications

It is built on

```text
Starlette

+

Pydantic
```

---

# Why FastAPI?

FastAPI provides

- High Performance
- Automatic Validation
- Automatic Documentation
- Type Safety
- Async Support

It is widely used in

- AI Applications
- Machine Learning APIs
- Cloud Services
- Enterprise Backends

---

# Installing FastAPI

```bash
pip install fastapi uvicorn
```

Import

```python
from fastapi import FastAPI
```

---

# Creating an Application

```python
from fastapi import FastAPI

app = FastAPI()
```

`app`

represents

your API application.

---

# First API

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {
        "message": "Hello FastAPI"
    }
```

Run

```bash
uvicorn main:app --reload
```

Visit

```text
http://127.0.0.1:8000
```

Output

```json
{
    "message": "Hello FastAPI"
}
```

---

# Running the Server

```bash
uvicorn main:app --reload
```

Meaning

```text
main

↓

Python File

----------------

app

↓

FastAPI Object
```

`--reload`

automatically reloads

when code changes.

---

# Path Operations

Routes are called

Path Operations.

Example

```python
@app.get("/")
```

```python
@app.post("/users")
```

```python
@app.put("/users/{id}")
```

```python
@app.delete("/users/{id}")
```

---

# Path Parameters

Example

```python
@app.get("/users/{id}")
def get_user(id: int):
    return {
        "id": id
    }
```

Request

```text
/users/5
```

Response

```json
{
    "id":5
}
```

Notice

```python
id: int
```

FastAPI automatically validates

the type.

---

# Query Parameters

Example

```python
@app.get("/search")
def search(
    q: str,
    page: int = 1
):
    return {
        "query": q,
        "page": page
    }
```

Request

```text
/search?q=python&page=2
```

---

# Request Body

Suppose

the client sends

JSON.

Example

```json
{
    "name":"Alice",
    "age":20
}
```

FastAPI converts

the JSON

into Python objects.

---

# Pydantic Models

Define request data

using classes.

```python
from pydantic import BaseModel

class Student(BaseModel):

    name: str

    age: int
```

Now

FastAPI validates

incoming data automatically.

---

# POST Request

Example

```python
@app.post("/students")
def create_student(

student: Student

):

    return student
```

Incoming JSON

becomes

a Python object.

---

# Automatic Validation

Suppose

the client sends

```json
{
    "name":123,
    "age":"abc"
}
```

FastAPI responds

with

```text
422

Validation Error
```

No extra code required.

---

# Response Models

You can define

the expected output.

```python
@app.get(

"/student",

response_model=Student

)
```

FastAPI ensures

the response

matches

the model.

---

# Automatic API Documentation

One of FastAPI's best features.

Swagger UI

```text
/docs
```

ReDoc

```text
/redoc
```

Visit

```text
http://127.0.0.1:8000/docs
```

Interactive API documentation

appears automatically.

---

# Async Endpoints

Example

```python
@app.get("/hello")
async def hello():
    return {
        "message":"Hello"
    }
```

`async`

allows

the server

to handle many requests efficiently.

---

# Dependency Injection

Reusable components

can be injected.

Example

```python
from fastapi import Depends

def get_db():
    ...

@app.get("/users")
def users(

db = Depends(get_db)

):
    ...
```

Useful for

- Database Connections
- Authentication
- Configuration

---

# Project Structure

```text
project/

│

├── main.py

├── models.py

├── database.py

├── routers/

├── schemas.py

├── services.py

├── requirements.txt

└── README.md
```

Large FastAPI projects

are usually modular.

---

# FastAPI Workflow

```text
Request

↓

Validation

↓

Route

↓

Business Logic

↓

Response Model

↓

JSON Response
```

---

# Flask vs FastAPI

| Flask | FastAPI |
|--------|----------|
| Lightweight | Lightweight |
| Manual Validation | Automatic Validation |
| Slower | Very Fast |
| Minimal Docs | Automatic Docs |
| Sync by Default | Async Support |

---

# Real-World Example

Imagine an AI chatbot.

Workflow

```text
User

↓

FastAPI

↓

Machine Learning Model

↓

Prediction

↓

JSON Response
```

Most modern AI APIs

follow this architecture.

---

# Memory Trick

Remember

```text
PARA
```

**P**

Pydantic

↓

**A**

Async

↓

**R**

Response Models

↓

**A**

Automatic Docs

These are FastAPI's biggest strengths.

---

# Best Practices

✔ Use type hints everywhere

✔ Validate input using Pydantic

✔ Separate routers and business logic

✔ Use dependency injection

✔ Return consistent JSON responses

✔ Use async for I/O-bound tasks

---

# Common Beginner Mistakes

### Mistake 1

Ignoring type hints.

FastAPI relies heavily on Python type annotations for validation and documentation.

---

### Mistake 2

Putting all endpoints in

```text
main.py
```

Large applications should organize code into routers,

services,

and models.

---

### Mistake 3

Using async unnecessarily.

Only use `async`

when performing asynchronous operations,

such as database queries or HTTP requests.

---

### Mistake 4

Not using Pydantic models.

Accepting raw dictionaries loses automatic validation and documentation benefits.

---

# Interview Questions & Answers

## Q1. What is FastAPI?

### Answer

FastAPI is a modern Python framework for building high-performance APIs.

It provides automatic validation,

interactive documentation,

and excellent performance through asynchronous programming.

---

## Q2. What is Pydantic?

### Answer

Pydantic is a data validation library used by FastAPI.

It validates request and response data using Python type hints,

reducing boilerplate code and improving reliability.

---

## Q3. What is the purpose of `async` in FastAPI?

### Answer

`async`

allows FastAPI to efficiently handle many concurrent requests,

especially for I/O-bound tasks such as database operations,

network calls,

and file access.

---

## Q4. What are `/docs` and `/redoc`?

### Answer

FastAPI automatically generates interactive API documentation.

- `/docs` provides Swagger UI.
- `/redoc` provides ReDoc documentation.

Both allow developers to test endpoints directly from the browser.

---

## Q5. Why is FastAPI popular for AI applications?

### Answer

FastAPI offers

- High performance
- Automatic validation
- JSON support
- Async programming
- Excellent API documentation

These features make it ideal for serving machine learning models and AI services.

---

# Chapter Summary / Cheat Sheet

| Concept | Purpose |
|----------|----------|
| `FastAPI()` | Create API application |
| `@app.get()` | GET endpoint |
| `@app.post()` | POST endpoint |
| Path Parameters | Dynamic URLs |
| Query Parameters | URL query values |
| `BaseModel` | Pydantic model |
| `response_model` | Validate responses |
| `Depends()` | Dependency Injection |
| `async def` | Asynchronous endpoint |
| `/docs` | Swagger UI |
| `/redoc` | ReDoc Documentation |
| `uvicorn` | ASGI server |

---

# What's Next?

In **Chapter 69 — Authentication & Deployment**, you'll learn how to secure and deploy production-ready APIs:

- Authentication
- Authorization
- JWT Tokens
- OAuth2 Basics
- Environment Variables
- Docker
- Deployment
- API Security
- Production Best Practices

This chapter will prepare you to build secure, scalable APIs that can be deployed to cloud platforms and used in real-world applications.