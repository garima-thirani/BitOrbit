# Module 18 — API Development

# Chapter 69 — Authentication & Deployment

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Authentication?
- Authentication vs Authorization
- API Keys
- Sessions
- JWT (JSON Web Tokens)
- OAuth2 Basics
- Password Hashing
- Environment Variables
- Docker Basics
- Deploying APIs
- Production Best Practices
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're building an online banking application.

Can anyone access

```text
Transfer Money

↓

View Balance

↓

Transaction History
```

without logging in?

Of course not.

Applications must verify

who the user is

before allowing access.

This process is called

```text
Authentication
```

---

# Story — Airport Security

Imagine arriving at an airport.

Before boarding,

security checks

```text
Passport

↓

Identity

↓

Boarding Pass
```

Only verified passengers

can enter the aircraft.

APIs work the same way.

Only authenticated users

can access protected resources.

---

# Why Authentication?

Imagine an API

for online shopping.

Without authentication,

anyone could

- View private data
- Delete products
- Modify orders
- Steal information

Authentication protects

your application.

---

# Authentication vs Authorization

Many beginners confuse these.

Authentication

answers

```text
Who are you?
```

Authorization

answers

```text
What are you allowed to do?
```

Visualization

```text
Login

↓

Authentication

↓

Permissions

↓

Authorization
```

---

# Example

Alice logs in.

Authentication

```text
Alice

✓ Verified
```

Authorization

```text
Can Edit Products?

↓

Yes

Can Delete Users?

↓

No
```

---

# API Keys

Some APIs use

API Keys.

Example

```text
X-API-Key:

abc123xyz
```

The server checks

whether

the key is valid.

Commonly used for

- Weather APIs
- Maps APIs
- Payment APIs

---

# Sessions

Traditional websites

often use sessions.

Workflow

```text
Login

↓

Server Creates Session

↓

Session ID Stored

↓

Browser Sends Session ID

↓

User Remains Logged In
```

---

# Cookies

Sessions

usually rely on

cookies.

Browser stores

```text
Session ID
```

and sends it

with every request.

---

# JWT (JSON Web Token)

Modern APIs

usually use

JWT.

Workflow

```text
Login

↓

Server Generates Token

↓

Client Stores Token

↓

Token Sent

With Every Request

↓

Server Verifies Token
```

---

# JWT Structure

A JWT has

three parts.

```text
Header

.

Payload

.

Signature
```

Example

```text
xxxxx.yyyyy.zzzzz
```

---

# Why JWT?

JWT is

- Stateless
- Fast
- Easy to Scale
- Widely Used

Popular in

- REST APIs
- Mobile Apps
- SPAs
- Microservices

---

# Sending JWT

Clients usually send

the token

inside

the Authorization header.

```http
Authorization:

Bearer eyJhbGci...
```

The server verifies

the token

before processing the request.

---

# Password Hashing

Never store

plain passwords.

Bad

```text
password123
```

Good

```text
$2b$12$9cM...
```

Passwords should be

hashed.

Popular libraries

```text
bcrypt

passlib
```

---

# Hashing Example

```python
from passlib.hash import bcrypt

hashed = bcrypt.hash(

"password123"

)
```

Verify

```python
bcrypt.verify(

"password123",

hashed

)
```

---

# OAuth2 Basics

OAuth2 allows users

to log in

using

```text
Google

GitHub

Facebook

Microsoft
```

without sharing

their passwords

with your application.

---

# OAuth2 Workflow

```text
User

↓

Google Login

↓

Authorization

↓

Access Token

↓

Application
```

OAuth2 is widely used

for

Single Sign-On (SSO).

---

# Environment Variables

Never hardcode

```text
Passwords

↓

API Keys

↓

JWT Secrets
```

Instead,

store them in

environment variables.

Example

```python
import os

secret = os.getenv(

"SECRET_KEY"

)
```

---

# Why Environment Variables?

Suppose

you upload your code

to GitHub.

Hardcoded secrets

become public.

Environment variables

keep sensitive data

outside your source code.

---

# Docker Basics

Docker packages

your application

with everything it needs.

Visualization

```text
Application

↓

Dependencies

↓

Docker Image

↓

Container
```

The application behaves

the same

on every machine.

---

# Simple Dockerfile

Example

```dockerfile
FROM python:3.12

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

CMD ["uvicorn","main:app"]
```

Docker builds

a portable environment.

---

# Deployment

Once your API is ready,

deploy it

to a server.

Popular platforms

```text
Render

↓

Railway

↓

Fly.io

↓

AWS

↓

Google Cloud

↓

Azure
```

---

# Production Checklist

Before deployment,

ensure

✔ Debug Mode Disabled

✔ HTTPS Enabled

✔ Environment Variables Used

✔ Database Backups

✔ Logging Enabled

✔ Authentication Configured

✔ Rate Limiting Enabled

✔ Error Handling Added

---

# API Security

Protect APIs by using

```text
Authentication

↓

Authorization

↓

HTTPS

↓

Rate Limiting

↓

Input Validation

↓

Password Hashing
```

Security

should be considered

from the beginning,

not added later.

---

# Complete Workflow

```text
User Login

↓

Password Verification

↓

JWT Generated

↓

Client Stores Token

↓

Authenticated Requests

↓

Protected API
```

---

# Real-World Example

Imagine an online banking system.

User

```text
Login

↓

Receive JWT

↓

Transfer Money

↓

View Transactions

↓

Logout
```

Every protected request

requires

a valid token.

---

# Memory Trick

Remember

```text
AJODE
```

**A**

Authentication

↓

**J**

JWT

↓

**O**

OAuth2

↓

**D**

Docker

↓

**E**

Environment Variables

These are the key concepts

for secure API deployment.

---

# Best Practices

✔ Hash passwords

✔ Use HTTPS

✔ Use JWT or OAuth2

✔ Store secrets in environment variables

✔ Enable logging

✔ Validate all user input

✔ Apply rate limiting

✔ Keep dependencies updated

---

# Common Beginner Mistakes

### Mistake 1

Storing passwords

in plain text.

Always hash passwords

before storing them.

---

### Mistake 2

Hardcoding

API keys

inside source code.

Use

environment variables

instead.

---

### Mistake 3

Running production servers

with

```text
Debug Mode

Enabled
```

Debug mode

may expose

sensitive information.

---

### Mistake 4

Assuming

authentication

is the same as

authorization.

Authentication verifies identity.

Authorization determines permissions.

---

# Interview Questions & Answers

## Q1. What is the difference between Authentication and Authorization?

### Answer

Authentication verifies **who the user is**.

Authorization determines **what the authenticated user is allowed to do**.

Authentication always occurs before authorization.

---

## Q2. Why should passwords be hashed?

### Answer

Hashing prevents passwords from being stored in plain text.

Even if the database is compromised,

attackers cannot directly read users' passwords.

Algorithms such as **bcrypt** and **Argon2** are commonly used.

---

## Q3. What is JWT?

### Answer

JWT (JSON Web Token)

is a compact,

signed token used for authentication.

After a successful login,

the server issues a JWT,

which the client includes in future requests to access protected resources.

---

## Q4. Why use Environment Variables?

### Answer

Environment variables securely store sensitive information such as

- API Keys
- Database Passwords
- Secret Keys

They keep secrets out of source code and version control systems.

---

## Q5. Why is Docker useful for deployment?

### Answer

Docker packages the application,

its dependencies,

and runtime environment into a portable container.

This ensures the application behaves consistently across development,

testing,

and production environments.

---

# Chapter Summary / Cheat Sheet

| Concept | Purpose |
|----------|----------|
| Authentication | Verify user identity |
| Authorization | Control user permissions |
| API Key | Simple API authentication |
| Session | Server-side login tracking |
| JWT | Stateless authentication token |
| OAuth2 | Third-party authentication |
| Password Hashing | Secure password storage |
| Environment Variables | Store secrets securely |
| Docker | Package application |
| Deployment | Publish application to production |

---

# Module 18 Complete ✅

You have now mastered API Development:

- HTTP Protocol
- REST APIs
- Python `requests`
- Flask
- FastAPI
- Routing
- Request & Response Handling
- JSON APIs
- Pydantic
- Authentication
- Authorization
- JWT
- OAuth2 Basics
- Password Hashing
- Docker
- Deployment

You can now build, secure, and deploy modern backend APIs suitable for web applications, mobile apps, AI services, and microservices.

---
