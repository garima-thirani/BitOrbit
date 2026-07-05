# Module 5 — Strings

# Chapter 19 — Regular Expressions

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Regular Expressions (Regex) are Needed
- What is Regex?
- Pattern Matching
- Regex Syntax
- Character Classes
- Quantifiers
- Anchors
- Groups
- Special Sequences
- Common Regex Patterns
- Python `re` Module
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're a security guard checking visitors.

You don't know everyone's name,

but you know the **pattern**.

For example,

every employee ID looks like

```text
EMP-1234
```

Instead of remembering every employee,

you simply check whether the ID follows the pattern.

Regular Expressions work exactly like this.

They don't search for exact words.

They search for **patterns**.

---

# Story — Airport Passport Check

Imagine immigration officers.

They don't memorize millions of passport numbers.

Instead,

they verify that every passport follows a valid format.

```text
AB123456

✓ Valid

-------------------

123ABC

✗ Invalid
```

Regex works in the same way.

It validates whether text matches a predefined pattern.

---

# Why Regular Expressions?

Suppose you want to find

```text
gmail.com
```

inside

10 million email addresses.

Without Regex,

you write lots of loops and conditions.

With Regex,

one pattern solves the problem.

Example

```text
.*@gmail\.com
```

---

# What is Regex?

A **Regular Expression (Regex)** is a sequence of characters that defines a search pattern.

Instead of searching for

```text
Alice
```

you can search for

```text
Any Capital Letter

↓

Followed by lowercase letters
```

Regex is like a language for describing text.

---

# Python re Module

Python provides the built-in

```python
re
```

module.

```python
import re
```

Almost every regex operation starts with this module.

---

# First Regex Example

```python
import re

text = "Python is awesome"

match = re.search(

"Python",

text

)

print(match.group())
```

Output

```text
Python
```

---

# Pattern Matching

Regex scans text looking for a pattern.

Visualization

```text
Python is Awesome

↓

Search

↓

Python

↓

Found
```

If no match exists,

Python returns

```text
None
```

---

# Common Regex Functions

| Function | Purpose |
|-----------|----------|
| `search()` | First match |
| `match()` | Match from beginning |
| `fullmatch()` | Entire string must match |
| `findall()` | All matches |
| `finditer()` | Iterator over matches |
| `sub()` | Replace text |
| `split()` | Split using regex |

---

# Character Classes

Character classes match categories of characters.

---

## Digits

```text
\d
```

Matches

```text
0-9
```

Example

```python
re.findall(

r"\d",

"A1B2C3"

)
```

Output

```text
['1','2','3']
```

---

## Non-Digits

```text
\D
```

Matches everything except digits.

---

## Alphabets

```text
[a-z]
```

Lowercase letters.

```text
[A-Z]
```

Uppercase letters.

```text
[a-zA-Z]
```

Both.

---

## Word Characters

```text
\w
```

Matches

```text
Letters

Digits

_
```

---

## Non-word Characters

```text
\W
```

Matches

```text
@

#

$

Space

.
```

---

## Whitespace

```text
\s
```

Matches

```text
Space

Tab

Newline
```

---

## Non-whitespace

```text
\S
```

Everything except whitespace.

---

# Quantifiers

Quantifiers specify

**how many times**

a character may appear.

---

## *

```text
Zero or More
```

Example

```text
ab*
```

Matches

```text
a

ab

abb

abbbb
```

---

## +

```text
One or More
```

Example

```text
ab+
```

Matches

```text
ab

abb

abbb
```

Not

```text
a
```

---

## ?

```text
Zero or One
```

Example

```text
colou?r
```

Matches

```text
color

colour
```

---

## {n}

Exactly

```text
n
```

times.

Example

```text
\d{4}
```

Matches

```text
2025
```

---

## {m,n}

Between

```text
m

↓

n
```

times.

Example

```text
\d{2,4}
```

Matches

```text
12

123

1234
```

---

# Anchors

Anchors specify **position**.

---

## Beginning

```text
^
```

Example

```text
^Hello
```

Matches

```text
Hello World
```

Not

```text
Say Hello
```

---

## End

```text
$
```

Example

```text
world$
```

Matches

```text
Hello world
```

---

# Groups

Parentheses create groups.

Example

```text
(\d{3})-(\d{4})
```

Matches

```text
555-1234
```

Each group can be accessed separately.

---

# Alternation

```text
|
```

Means

```text
OR
```

Example

```text
cat|dog
```

Matches

```text
cat

dog
```

---

# Escaping Special Characters

Suppose you need

```text
.
```

Normally,

dot means

```text
Any Character
```

To search for an actual dot,

escape it.

```text
\.
```

---

# Common Regex Patterns

---

## Email

```text
^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$
```

Matches

```text
john@gmail.com
```

---

## Phone Number

```text
^\d{10}$
```

Matches

```text
9876543210
```

---

## ZIP Code

```text
^\d{5}$
```

Matches

```text
560001
```

(Adjust length for your country's postal code format.)

---

## Date

```text
^\d{2}/\d{2}/\d{4}$
```

Matches

```text
15/08/2025
```

---

## Password

Example rule

```text
Minimum 8 Characters
```

Simple pattern

```text
^.{8,}$
```

Real-world password validation is usually more complex.

---

# Practical Examples

## Find All Numbers

```python
text = "Age 25, Score 98"

print(

re.findall(

r"\d+",

text

)

)
```

Output

```text
['25','98']
```

---

## Replace Digits

```python
text = "Room 101"

print(

re.sub(

r"\d",

"*",

text

)

)
```

Output

```text
Room ***
```

---

## Split Text

```python
text = "apple,banana;orange"

print(

re.split(

r"[,;]",

text

)

)
```

Output

```text
['apple',

'banana',

'orange']
```

---

# Real-World Applications

Regex is heavily used in

```text
Email Validation

↓

Log Analysis

↓

Search Engines

↓

Syntax Highlighting

↓

Compilers

↓

Web Scraping

↓

Data Cleaning
```

Almost every programming language supports Regex.

---

# Memory Trick

Remember

```text
DQAG
```

**D**

Digits (`\d`)

↓

**Q**

Quantifiers (`* + ? {}`)

↓

**A**

Anchors (`^ $`)

↓

**G**

Groups (`()`)

---

# Common Beginner Mistakes

### Mistake 1

Forgetting raw strings.

Wrong

```python
"\d"
```

Correct

```python
r"\d"
```

Raw strings prevent Python from interpreting backslashes as escape sequences.

---

### Mistake 2

Confusing

```python
match()
```

and

```python
search()
```

- `match()` checks only the beginning of the string.
- `search()` looks anywhere in the string.

---

### Mistake 3

Using Regex for everything.

Regex is powerful,

but for simple operations,

methods like

```python
split()

replace()

startswith()
```

are often simpler and more readable.

---

### Mistake 4

Writing unreadable regex.

Complex regex should include comments or be broken into smaller parts for maintainability.

---

# Interview Questions & Answers

## Q1. What is a Regular Expression?

### Answer

A Regular Expression is a sequence of characters that defines a search pattern.

It is commonly used for

- Searching
- Validation
- Extraction
- Text Replacement

---

## Q2. What is the difference between `search()` and `match()`?

### Answer

`search()`

Searches the entire string.

`match()`

Matches only from the beginning of the string.

Example

```python
re.search("cat", "my cat")
```

Works.

```python
re.match("cat", "my cat")
```

Returns `None`.

---

## Q3. Why use raw strings (`r""`) in Regex?

### Answer

Regex uses many backslashes.

Raw strings prevent Python from treating them as escape characters.

Example

```python
r"\d+"
```

instead of

```python
"\\d+"
```

---

## Q4. What does `\d+` mean?

### Answer

- `\d` → Any digit
- `+` → One or more occurrences

So

```text
\d+
```

matches numbers like

```text
7

42

2025
```

---

## Q5. Name some common real-world uses of Regex.

### Answer

- Email Validation
- Phone Number Validation
- Password Rules
- Log File Parsing
- Search Engines
- Data Cleaning
- Web Scraping

---

# Chapter Summary / Cheat Sheet

| Pattern | Meaning |
|----------|----------|
| `\d` | Digit |
| `\D` | Non-digit |
| `\w` | Word character |
| `\W` | Non-word character |
| `\s` | Whitespace |
| `\S` | Non-whitespace |
| `*` | Zero or more |
| `+` | One or more |
| `?` | Zero or one |
| `{n}` | Exactly n |
| `^` | Start of string |
| `$` | End of string |
| `()` | Group |
| `|` | OR |

---

# Module 5 Complete ✅

You have now mastered Python Strings:

- String Basics
- Indexing & Slicing
- String Methods
- Formatting
- f-Strings
- Unicode & Encoding
- Regular Expressions

These concepts form the foundation for text processing, automation, web development, data analysis, and interview coding problems.

---

# What's Next?

In **Module 6 — File Handling**, you'll learn how Python interacts with the file system:

- Reading Files
- Writing Files
- File Modes
- CSV
- JSON
- Pickle
- `pathlib`
- Context Managers
- Logging

These topics are essential for building real-world Python applications.