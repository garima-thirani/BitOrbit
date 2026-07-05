# Module 18 — API Development

# Chapter 67 — Flask

---

# Learning Objectives

By the end of this chapter, you will understand:

- What is Flask?
- Why Flask?
- Installing Flask
- Creating Your First Flask App
- Routing
- URL Parameters
- HTTP Methods
- Returning JSON
- Templates (Jinja2)
- Forms
- Static Files
- Flask Project Structure
- Best Practices
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you create an amazing Python program.

It works perfectly on your computer.

But how can users access it through a browser?

Instead of

```text
python app.py
```

you want users to visit

```text
http://example.com
```

This is where

```text
Flask
```

comes in.

Flask turns Python programs into web applications.

---

# Story — Opening a Shop

Imagine you own a bakery.

Making cakes is one skill.

Selling cakes requires

- A shop
- Customers
- Cash Counter

Your Python code is

the cake.

Flask is

the shop

where people can access your application.

---

# What is Flask?

Flask is a

lightweight Python web framework.

It helps developers build

- Websites
- REST APIs
- Dashboards
- Backend Services
- Microservices

using Python.

---

# Why Flask?

Flask is

- Lightweight
- Easy to Learn
- Flexible
- Minimal
- Highly Extensible

It is perfect for

- Beginners
- Small Projects
- REST APIs
- Prototypes

---

# Installing Flask

```bash
pip install flask
```

Import

```python
from flask import Flask
```

---

# Creating a Flask App

Example

```python
from flask import Flask

app = Flask(__name__)
```

Here,

`app`

represents

your web application.

---

# First Flask Application

```python
from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, Flask!"

app.run()
```

Visit

```text
http://127.0.0.1:5000
```

Output

```text
Hello, Flask!
```

---

# Understanding `__name__`

```python
app = Flask(__name__)
```

`__name__`

helps Flask

locate resources like

- Templates
- Static Files

It is almost always written exactly like this.

---

# Running the Server

```python
app.run()
```

Starts

the local development server.

Default

```text
Host : 127.0.0.1

Port : 5000
```

---

# Routing

A route

maps

a URL

to

a Python function.

Visualization

```text
URL

↓

Route

↓

Function

↓

Response
```

---

# Example Route

```python
@app.route("/about")
def about():
    return "About Page"
```

Visiting

```text
/about
```

calls

```python
about()
```

---

# Multiple Routes

```python
@app.route("/")
def home():
    return "Home"

@app.route("/contact")
def contact():
    return "Contact"
```

Each URL

maps to

a different function.

---

# URL Parameters

Dynamic routes

accept values.

Example

```python
@app.route("/user/<name>")
def user(name):
    return f"Hello {name}"
```

Visiting

```text
/user/Alice
```

returns

```text
Hello Alice
```

---

# Integer Parameters

```python
@app.route("/square/<int:num>")
def square(num):
    return str(num * num)
```

Visiting

```text
/square/5
```

returns

```text
25
```

---

# HTTP Methods

By default,

routes accept

```text
GET
```

To allow POST,

```python
@app.route(

"/login",

methods=["GET","POST"]

)
```

---

# Request Object

Import

```python
from flask import request
```

Read form data

```python
username = request.form["username"]
```

Read query parameters

```python
page = request.args.get("page")
```

---

# Returning JSON

Flask can return

JSON directly.

```python
from flask import jsonify

@app.route("/api")
def api():
    return jsonify({
        "name":"Alice",
        "age":20
    })
```

Output

```json
{
  "name":"Alice",
  "age":20
}
```

---

# Templates

Instead of returning text,

Flask can return HTML pages.

Example

```python
from flask import render_template

@app.route("/")
def home():
    return render_template("index.html")
```

Templates are stored inside

```text
templates/
```

---

# Jinja2 Templates

Example

```html
<h1>Hello {{ name }}</h1>
```

Python

```python
return render_template(

"index.html",

name="Alice"

)
```

Output

```text
Hello Alice
```

---

# Forms

HTML Form

```html
<form method="POST">
```

Flask

```python
request.form
```

Processes

submitted data.

---

# Static Files

Images

CSS

JavaScript

are stored inside

```text
static/
```

Example

```text
static/

↓

style.css

↓

logo.png

↓

script.js
```

---

# Flask Project Structure

```text
project/

│

├── app.py

├── templates/

│      index.html

├── static/

│      style.css

├── requirements.txt

└── README.md
```

A clean structure

makes projects easier to maintain.

---

# Debug Mode

Example

```python
app.run(

debug=True

)
```

Benefits

- Automatic Reload
- Better Error Messages

Never use

debug mode

in production.

---

# Flask Workflow

```text
User

↓

Browser

↓

Route

↓

Python Function

↓

Response

↓

Browser
```

---

# Real-World Example

Imagine an online bookstore.

Routes

```text
/

↓

Books

↓

Book Details

↓

Cart

↓

Checkout
```

Each page

is handled

by a Flask route.

---

# Flask vs Django

| Flask | Django |
|--------|---------|
| Lightweight | Full Framework |
| Flexible | Batteries Included |
| Easy to Learn | More Features |
| Small Projects | Large Applications |

---

# Memory Trick

Remember

```text
RRTJ
```

**R**

Route

↓

**R**

Request

↓

**T**

Template

↓

**J**

JSON

These are the four building blocks of Flask.

---

# Best Practices

✔ Organize routes logically

✔ Use templates for HTML

✔ Keep business logic outside routes

✔ Validate user input

✔ Use virtual environments

✔ Store secrets in environment variables

---

# Common Beginner Mistakes

### Mistake 1

Putting all code

inside

```text
app.py
```

Large projects should separate

- Routes
- Models
- Services
- Configuration

---

### Mistake 2

Using

```python
debug=True
```

in production.

Debug mode exposes sensitive information.

---

### Mistake 3

Returning plain strings

instead of JSON

for API endpoints.

REST APIs should usually return JSON.

---

### Mistake 4

Trusting user input.

Always validate

and sanitize

data received from forms or requests.

---

# Interview Questions & Answers

## Q1. What is Flask?

### Answer

Flask is a lightweight Python web framework used to build web applications,

REST APIs,

and backend services.

It emphasizes simplicity and flexibility.

---

## Q2. What is Routing?

### Answer

Routing maps a URL to a Python function.

When a client requests a specific URL,

Flask executes the associated function and returns a response.

---

## Q3. What is Jinja2?

### Answer

Jinja2 is Flask's template engine.

It allows developers to generate dynamic HTML pages by embedding Python variables and expressions into templates.

---

## Q4. What is `jsonify()`?

### Answer

`jsonify()`

converts Python dictionaries or lists into JSON responses with the correct HTTP headers,

making it ideal for REST APIs.

---

## Q5. Why should debug mode not be used in production?

### Answer

Debug mode displays detailed error information and allows automatic code reloading.

Exposing these details in production can create serious security risks.

---

# Chapter Summary / Cheat Sheet

| Concept | Purpose |
|----------|----------|
| `Flask()` | Create Flask application |
| `@app.route()` | Map URL to function |
| `app.run()` | Start development server |
| `request` | Access incoming request data |
| `jsonify()` | Return JSON response |
| `render_template()` | Render HTML template |
| `request.form` | Read form data |
| `request.args` | Read query parameters |
| `templates/` | Store HTML templates |
| `static/` | Store CSS, JS, Images |

---

# What's Next?

In **Chapter 68 — FastAPI**, you'll learn the modern Python framework for building high-performance APIs:

- FastAPI Basics
- Path Parameters
- Query Parameters
- Request & Response Models
- Pydantic
- Automatic API Documentation
- Async Endpoints
- Dependency Injection

FastAPI is one of the fastest-growing Python frameworks and is widely used for production APIs, AI services, and microservices.