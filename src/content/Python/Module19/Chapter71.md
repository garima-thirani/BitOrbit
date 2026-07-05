# Module 19 — Python Automation

# Chapter 71 — Web Scraping

---

# Learning Objectives

By the end of this chapter, you will understand:

- What is Web Scraping?
- How Websites Work
- HTML Basics
- HTTP Requests
- BeautifulSoup
- Parsing HTML
- Finding Elements
- Extracting Data
- Selenium
- Browser Automation
- Handling Dynamic Websites
- Best Practices
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you want the prices of

```text
1000 Laptops
```

from an online shopping website.

Would you manually

- Open each page
- Copy the price
- Paste into Excel

It would take hours.

Instead,

Python can collect the data automatically.

This is called

```text
Web Scraping
```

---

# Story — Library Assistant

Imagine a huge library.

You ask an assistant

to find every book

written by a specific author.

Instead of searching manually,

the assistant

- Visits every shelf
- Finds matching books
- Creates a list

Web Scraping works exactly the same way.

---

# What is Web Scraping?

Web Scraping is the process of

automatically extracting

information

from websites.

Examples

- Product Prices
- News Headlines
- Sports Scores
- Job Listings
- Weather Data

---

# Web Scraping Workflow

```text
Website

↓

HTTP Request

↓

HTML Page

↓

Python

↓

Extract Data

↓

Save Data
```

---

# How Websites Work

When you visit

```text
https://example.com
```

Your browser sends

```text
HTTP Request
```

The server returns

```text
HTML

↓

CSS

↓

JavaScript
```

Python can also

send requests

and read the HTML.

---

# HTML Basics

Web pages are built using

```text
HTML

(HyperText Markup Language)
```

Example

```html
<html>

<body>

<h1>Welcome</h1>

<p>Hello World</p>

</body>

</html>
```

---

# HTML Elements

Common HTML tags

```text
<h1>

Heading

----------------

<p>

Paragraph

----------------

<a>

Link

----------------

<img>

Image

----------------

<div>

Container

----------------

<table>

Table
```

---

# Installing BeautifulSoup

```bash
pip install beautifulsoup4
```

Import

```python
from bs4 import BeautifulSoup
```

---

# Installing Requests

```bash
pip install requests
```

Import

```python
import requests
```

---

# Downloading a Web Page

```python
import requests

response = requests.get(

"https://example.com"

)

html = response.text
```

Now

`html`

contains

the page source.

---

# Creating BeautifulSoup Object

```python
from bs4 import BeautifulSoup

soup = BeautifulSoup(

html,

"html.parser"

)
```

BeautifulSoup converts

raw HTML

into

an object

that Python can navigate.

---

# Finding One Element

Example

```python
title = soup.find(

"h1"

)

print(title.text)
```

Output

```text
Welcome
```

---

# Finding Multiple Elements

Example

```python
paragraphs = soup.find_all(

"p"

)
```

Returns

a list

of paragraph elements.

---

# Finding by Class

HTML

```html
<div class="price">

$999

</div>
```

Python

```python
price = soup.find(

class_="price"

)
```

---

# Finding by ID

HTML

```html
<h1 id="title">

Python Course

</h1>
```

Python

```python
title = soup.find(

id="title"

)
```

---

# Extracting Text

```python
element.text
```

Returns

only

the visible text.

---

# Extracting Attributes

HTML

```html
<a href="/course">

Learn Python

</a>
```

Python

```python
link["href"]
```

Output

```text
/course
```

---

# CSS Selectors

BeautifulSoup also supports

CSS selectors.

Example

```python
soup.select(

".price"

)
```

Selects

all elements

with

class

```text
price
```

---

# Example Scraper

```python
import requests
from bs4 import BeautifulSoup

response = requests.get(

"https://example.com"

)

soup = BeautifulSoup(

response.text,

"html.parser"

)

for item in soup.find_all("h2"):

    print(item.text)
```

This prints

every

`<h2>`

heading.

---

# Saving Data

Example

```python
titles = []

titles.append(

item.text

)
```

Later,

save

using

CSV

or

Pandas.

---

# Dynamic Websites

Some websites

load data

using

JavaScript.

Example

```text
HTML

↓

JavaScript

↓

New Content
```

BeautifulSoup

cannot see

content generated

after the page loads.

---

# Selenium

Selenium controls

a real web browser.

Install

```bash
pip install selenium
```

---

# Browser Automation

Example

```python
from selenium import webdriver

driver = webdriver.Chrome()

driver.get(

"https://example.com"

)
```

A browser

opens automatically.

---

# Finding Elements

```python
from selenium.webdriver.common.by import By

element = driver.find_element(

By.TAG_NAME,

"h1"

)

print(

element.text

)
```

---

# Clicking Buttons

```python
button.click()
```

Selenium

can interact

with web pages.

---

# Typing into Forms

```python
search.send_keys(

"Python"

)
```

Simulates

keyboard input.

---

# Taking Screenshots

```python
driver.save_screenshot(

"page.png"

)
```

Useful

for testing

and debugging.

---

# BeautifulSoup vs Selenium

| BeautifulSoup | Selenium |
|---------------|-----------|
| Fast | Slower |
| Static HTML | Dynamic Websites |
| Easy to Use | Browser Automation |
| No Browser | Controls Browser |

---

# Web Scraping Workflow

```text
Send Request

↓

Download HTML

↓

Parse HTML

↓

Extract Data

↓

Save Results
```

For JavaScript websites

```text
Launch Browser

↓

Load Page

↓

Extract Data
```

---

# Real-World Applications

Web Scraping is used for

- Price Comparison
- Stock Market Data
- News Aggregation
- Job Portals
- Travel Websites
- Research
- Market Analysis

---

# Legal & Ethical Considerations

Always

✔ Read the website's Terms of Service

✔ Respect `robots.txt` where appropriate

✔ Avoid sending excessive requests

✔ Identify your scraper when appropriate

✔ Do not scrape private or copyrighted data without permission

Web scraping should be performed responsibly and legally.

---

# Memory Trick

Remember

```text
RBPS
```

**R**

Requests

↓

**B**

BeautifulSoup

↓

**P**

Parse

↓

**S**

Selenium

These are the core tools

for Python web scraping.

---

# Best Practices

✔ Respect website rate limits

✔ Use request headers when appropriate

✔ Handle network errors

✔ Save scraped data regularly

✔ Avoid unnecessary repeated requests

✔ Use Selenium only when JavaScript rendering is required

---

# Common Beginner Mistakes

### Mistake 1

Using Selenium

for every website.

If the content is already available in the HTML,

BeautifulSoup is usually faster and simpler.

---

### Mistake 2

Ignoring website rules.

Always ensure your scraping complies with the website's terms and applicable laws.

---

### Mistake 3

Assuming page structure never changes.

HTML layouts may change,

so write resilient scraping logic and handle missing elements.

---

### Mistake 4

Sending requests too quickly.

Rapid repeated requests may overload servers or trigger rate limits.

Introduce reasonable delays when appropriate.

---

# Interview Questions & Answers

## Q1. What is Web Scraping?

### Answer

Web Scraping is the automated process of extracting information from websites using programs instead of manual copying.

---

## Q2. What is BeautifulSoup?

### Answer

BeautifulSoup is a Python library used to parse HTML and XML documents,

making it easy to locate,

navigate,

and extract information from web pages.

---

## Q3. When should Selenium be used instead of BeautifulSoup?

### Answer

Use Selenium when a website relies on JavaScript to load content or when browser interactions such as clicking buttons,

logging in,

or filling forms are required.

---

## Q4. What is the difference between `find()` and `find_all()`?

### Answer

`find()`

returns the first matching element.

`find_all()`

returns a list of all matching elements.

---

## Q5. Why is the `requests` library used in web scraping?

### Answer

The `requests` library sends HTTP requests to web servers and retrieves webpage content,

which can then be parsed using BeautifulSoup or other tools.

---

# Chapter Summary / Cheat Sheet

| Function | Purpose |
|----------|----------|
| `requests.get()` | Download webpage |
| `response.text` | HTML source |
| `BeautifulSoup()` | Parse HTML |
| `find()` | First matching element |
| `find_all()` | All matching elements |
| `select()` | CSS selector search |
| `.text` | Extract visible text |
| `.get()` / `["href"]` | Read attributes |
| `webdriver.Chrome()` | Launch browser |
| `find_element()` | Locate page element |
| `click()` | Click button |
| `send_keys()` | Type into input |
| `save_screenshot()` | Capture page image |

---

# What's Next?

In **Chapter 72 — Automation Workflows**, you'll learn how to combine everything you've learned to build complete automation systems:

- Task Scheduling
- Cron Jobs
- Windows Task Scheduler
- Email Automation
- Report Generation
- File Automation
- End-to-End Automation Pipelines

You'll learn how professionals automate repetitive business and system tasks using Python.