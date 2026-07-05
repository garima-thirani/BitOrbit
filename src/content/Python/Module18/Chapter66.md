# Module 18 — API Development

# Chapter 66 — HTTP & requests

---

# Learning Objectives

By the end of this chapter, you will understand:

- What is an API?
- What is HTTP?
- Client-Server Architecture
- HTTP Request & Response
- HTTP Methods
- Status Codes
- Headers
- JSON
- Python `requests` Library
- Sending GET & POST Requests
- Handling Responses
- Error Handling
- Best Practices
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine ordering food using Swiggy or Uber Eats.

You

```text
Open App

↓

Choose Food

↓

Place Order

↓

Restaurant Receives Order

↓

Food Delivered
```

You never talk directly to the restaurant.

The app communicates for you.

This communication happens using an

```text
API
```

---

# Story — Waiter in a Restaurant

Imagine you're at a restaurant.

You don't enter the kitchen.

Instead,

you tell the waiter

what you want.

```text
Customer

↓

Waiter

↓

Kitchen

↓

Waiter

↓

Customer
```

The waiter is the

```text
API
```

The kitchen is

the

```text
Server
```

You are

the

```text
Client
```

---

# What is an API?

API stands for

```text
Application Programming Interface
```

It allows

two applications

to communicate.

Examples

```text
Weather API

↓

Google Maps API

↓

GitHub API

↓

OpenAI API

↓

Payment API
```

---

# What is HTTP?

HTTP stands for

```text
HyperText Transfer Protocol
```

It is the communication protocol

used between

```text
Client

↓

Server
```

Almost every website

uses HTTP.

---

# Client-Server Architecture

Visualization

```text
Browser

↓

HTTP Request

↓

Server

↓

HTTP Response

↓

Browser
```

The client asks.

The server responds.

---

# Example

Suppose

you visit

```text
https://example.com
```

Browser sends

```text
GET Request
```

Server replies

```text
HTML

CSS

JavaScript
```

The browser displays

the webpage.

---

# HTTP Request

An HTTP request contains

```text
Method

↓

URL

↓

Headers

↓

Body
```

---

# HTTP Response

The server sends

```text
Status Code

↓

Headers

↓

Body
```

The body

contains

HTML,

JSON,

images,

or files.

---

# HTTP Methods

The most common methods are

```text
GET

↓

POST

↓

PUT

↓

PATCH

↓

DELETE
```

These correspond

to CRUD operations.

---

# GET

Used to

retrieve data.

Example

```text
GET /users
```

Returns

the list of users.

---

# POST

Used to

create data.

Example

```text
POST /users
```

Creates

a new user.

---

# PUT

Used to

replace

an existing resource.

Example

```text
PUT /users/1
```

Updates

all user information.

---

# PATCH

Updates

only selected fields.

Example

```text
PATCH /users/1
```

Updates

only

the email.

---

# DELETE

Removes

a resource.

Example

```text
DELETE /users/1
```

Deletes

user 1.

---

# HTTP Methods vs CRUD

| HTTP | CRUD |
|-------|------|
| GET | Read |
| POST | Create |
| PUT | Update |
| PATCH | Partial Update |
| DELETE | Delete |

---

# Status Codes

Every response contains

a status code.

```text
200

↓

Success

------------------

201

↓

Created

------------------

400

↓

Bad Request

------------------

401

↓

Unauthorized

------------------

403

↓

Forbidden

------------------

404

↓

Not Found

------------------

500

↓

Server Error
```

---

# Status Code Categories

```text
1xx

Information

---------------

2xx

Success

---------------

3xx

Redirection

---------------

4xx

Client Error

---------------

5xx

Server Error
```

---

# Headers

Headers contain

extra information.

Example

```text
Content-Type

↓

application/json
```

Common headers

```text
Authorization

Content-Type

Accept

User-Agent
```

---

# JSON

Most APIs exchange data

using

```text
JSON

(JavaScript Object Notation)
```

Example

```json
{
  "name": "Alice",
  "age": 20
}
```

Python converts

JSON

into dictionaries.

---

# Installing requests

```bash
pip install requests
```

Import

```python
import requests
```

---

# GET Request

Example

```python
import requests

response = requests.get(

"https://api.github.com"

)
```

---

# Reading Response

Status Code

```python
response.status_code
```

Text

```python
response.text
```

JSON

```python
response.json()
```

---

# POST Request

Example

```python
data = {

"name":"Alice",

"age":20

}

response = requests.post(

"https://example.com/api",

json=data

)
```

The

```python
json=
```

parameter

automatically converts

Python dictionaries

to JSON.

---

# Sending Query Parameters

Example

```python
requests.get(

"https://example.com",

params={

"page":2

}

)
```

Generates

```text
?page=2
```

---

# Sending Headers

Example

```python
headers = {

"Authorization":

"Bearer TOKEN"

}

requests.get(

url,

headers=headers

)
```

Commonly used

for authentication.

---

# Error Handling

Example

```python
response.raise_for_status()
```

Raises an exception

if the request fails.

---

# Timeout

Never wait forever.

```python
requests.get(

url,

timeout=5

)
```

If the server

doesn't respond

within

5 seconds,

an exception is raised.

---

# Workflow

```text
Create Request

↓

Send Request

↓

Receive Response

↓

Check Status

↓

Read JSON

↓

Use Data
```

---

# Real-World Example

Imagine a weather application.

```text
User

↓

Weather API

↓

Temperature

Humidity

Wind Speed

↓

Display Weather
```

The application

never stores

weather information itself.

It retrieves it

through an API.

---

# Memory Trick

Remember

```text
GPPD
```

**G**

GET

↓

**P**

POST

↓

**P**

PUT/PATCH

↓

**D**

DELETE

These are

the four major API operations.

---

# Common Beginner Mistakes

### Mistake 1

Ignoring

status codes.

Always check

```python
response.status_code
```

before processing data.

---

### Mistake 2

Using

```python
response.text
```

when

the API returns JSON.

Use

```python
response.json()
```

instead.

---

### Mistake 3

Not setting

timeouts.

A request without

a timeout

can hang indefinitely.

---

### Mistake 4

Hardcoding API keys

inside source code.

Store secrets

using

environment variables

or secure configuration.

---

# Interview Questions & Answers

## Q1. What is an API?

### Answer

An API (Application Programming Interface)

allows different software applications

to communicate

by sending requests

and receiving responses.

---

## Q2. What is HTTP?

### Answer

HTTP (HyperText Transfer Protocol)

is the communication protocol

used between clients

and servers

to exchange web resources.

---

## Q3. What is the difference between GET and POST?

### Answer

GET retrieves data

without modifying server resources.

POST sends data

to create

or process

a new resource.

---

## Q4. What is the purpose of `response.json()`?

### Answer

`response.json()`

parses a JSON response

and converts it

into Python objects,

usually dictionaries or lists.

---

## Q5. Why should timeouts be used with `requests`?

### Answer

Timeouts prevent applications

from waiting indefinitely

if a server is slow

or unavailable,

making programs

more reliable.

---

# Chapter Summary / Cheat Sheet

| Concept | Purpose |
|----------|----------|
| API | Communication between applications |
| HTTP | Client-server communication protocol |
| GET | Retrieve data |
| POST | Create data |
| PUT | Replace resource |
| PATCH | Partial update |
| DELETE | Remove resource |
| Status Code | Server response result |
| Headers | Additional request/response metadata |
| JSON | Data exchange format |
| `requests.get()` | Send GET request |
| `requests.post()` | Send POST request |
| `response.json()` | Convert JSON to Python object |
| `raise_for_status()` | Raise exception on HTTP errors |

---

# What's Next?

In **Chapter 67 — Flask**, you'll build your first web application using Python by learning:

- Flask Basics
- Routing
- URL Parameters
- Templates (Jinja2)
- Forms
- Returning JSON
- Building REST APIs

Flask is one of the most popular lightweight Python web frameworks and is widely used for web development and backend APIs.