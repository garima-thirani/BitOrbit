# Module 5 — Strings

# Chapter 16 — Regular Expressions (Regex)

---

# Learning Objectives

By the end of this chapter, you will understand:

- What are Regular Expressions?
- Why Regex is Needed
- The `re` Module
- Pattern Matching
- Character Classes
- Special Characters
- Quantifiers
- Groups
- Common Regex Functions
- Practical Examples
- Performance Tips
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Suppose you're building a website.

Thousands of users enter their email addresses.

Some users enter

```text
alice@gmail.com
```

Others enter

```text
alicegmail.com
```

or

```text
alice@
```

or

```text
123@@gmail
```

How do you determine whether an email is valid?

You certainly cannot compare every possible email address.

Instead,

you define a **pattern**.

This is exactly what **Regular Expressions (Regex)** do.

Regex allows us to search, validate, extract, and replace text using patterns.

---

# Story — Airport Security

Imagine airport security.

Instead of remembering every passenger,

security officers look for specific patterns.

```text
Passport?

↓

Valid?

↓

Board Flight
```

Or

```text
Ticket Format

↓

Correct?

↓

Proceed
```

Regex works the same way.

Instead of checking every possible string,

it checks whether a string follows a **pattern**.

---

# What is Regex?

A **Regular Expression** is a sequence of characters that defines a search pattern.

Think of it as a template.

```text
Pattern

↓

Compare Text

↓

Match?

↓

Yes / No
```

Instead of searching exact words,

Regex searches **patterns**.

---

# The re Module

Python provides built-in support for Regex through the

```python
re
```

module.

```python
import re
```

Almost every Regex operation starts with importing this module.

---

# Your First Regex

```python
import re

text = "Python is awesome"

result = re.search("Python", text)

print(result)
```

Output

```text
<re.Match object>
```

A match object means the pattern was found.

---

# search()

Searches for the **first occurrence**.

```python
import re

text = "Python Programming"

result = re.search("Program", text)

print(result.group())
```

Output

```text
Program
```

If nothing is found,

```python
None
```

is returned.

---

# match()

`match()` checks only the **beginning** of the string.

Example

```python
import re

text = "Python"

print(re.match("Py", text))
```

Output

```text
Match
```

But

```python
re.match("thon", text)
```

returns

```text
None
```

because `"thon"` is not at the beginning.

---

# fullmatch()

Checks whether the **entire string** matches.

Example

```python
re.fullmatch(r"\d{4}", "1234")
```

Match

```text
Yes
```

But

```python
re.fullmatch(r"\d{4}", "12345")
```

returns

```text
None
```

---

# Character Classes

Regex provides shortcuts.

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
re.findall(r"\d", "A1B2C3")
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

## Alphabets & Numbers

```text
\w
```

Matches

```text
A-Z

a-z

0-9

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

!
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

## Non-Whitespace

```text
\S
```

Matches every non-space character.

---

# Special Characters

## Dot (.)

Matches any character except newline.

Example

```python
re.findall(r"a.c", "abc axc a9c")
```

Output

```text
['abc','axc','a9c']
```

---

## Caret (^)

Beginning of string.

```python
re.match("^Python", "Python Programming")
```

Matches.

---

## Dollar ($)

End of string.

```python
re.search("ing$", "Programming")
```

Matches.

---

# Quantifiers

Quantifiers tell Regex **how many times** something should appear.

---

## *

Zero or more times.

Pattern

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

One or more times.

```text
ab+
```

Matches

```text
ab

abb

abbbb
```

Not

```text
a
```

---

## ?

Zero or one time.

Useful for optional characters.

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

## {}

Specify exact repetitions.

Example

```text
\d{4}
```

Exactly four digits.

Example

```text
\d{10}
```

Ten digits.

Useful for phone numbers.

---

# Character Sets

```text
[abc]
```

Matches

```text
a

b

c
```

---

Range

```text
[a-z]
```

Lowercase letters.

---

Uppercase

```text
[A-Z]
```

---

Digits

```text
[0-9]
```

---

# findall()

Returns **all matches**.

Example

```python
text = "Python Java C++"

print(re.findall(r"\w+", text))
```

Output

```text
['Python','Java','C']
```

---

# split()

Splits using a Regex pattern.

Example

```python
re.split(r",", "A,B,C,D")
```

Output

```text
['A','B','C','D']
```

---

# sub()

Replace matching text.

Example

```python
text = "Python is fun"

print(re.sub("fun", "awesome", text))
```

Output

```text
Python is awesome
```

---

# Groups

Groups allow us to capture parts of a pattern.

Example

```python
text = "Date: 25-12-2025"

match = re.search(

r"(\d{2})-(\d{2})-(\d{4})",

text

)

print(match.group(1))
```

Output

```text
25
```

Group 2

```text
12
```

Group 3

```text
2025
```

---

# Common Regex Patterns

### Email

```text
^[\w\.-]+@[\w\.-]+\.\w+$
```

---

### Phone Number (10 Digits)

```text
^\d{10}$
```

---

### PIN Code

```text
^\d{6}$
```

---

### Username

```text
^[A-Za-z0-9_]{3,20}$
```

---

### Password (Simple Example)

```text
^(?=.*[A-Z])(?=.*\d).{8,}$
```

---

# Real-World Examples

## Email Validation

```python
email = "alice@gmail.com"

pattern = r"^[\w\.-]+@[\w\.-]+\.\w+$"

print(bool(re.fullmatch(pattern, email)))
```

---

## Extract Phone Numbers

```python
text = "Call 9876543210 or 9123456789"

print(re.findall(r"\d{10}", text))
```

Output

```text
['9876543210', '9123456789']
```

---

## Replace Multiple Spaces

```python
text = "Python     is     awesome"

print(re.sub(r"\s+", " ", text))
```

Output

```text
Python is awesome
```

---

# Performance Tips

If a pattern is used repeatedly,

compile it.

```python
pattern = re.compile(r"\d+")

pattern.findall(text)
```

Compiled patterns are faster for repeated use.

---

# Memory Trick

Remember

```text
MSFS
```

**M**

Match

↓

**S**

Search

↓

**F**

Findall

↓

**S**

Sub

These are the four Regex functions used most often.

---

# Common Beginner Mistakes

### Mistake 1

Using

```python
match()
```

instead of

```python
search()
```

Remember:

- `match()` → Beginning only
- `search()` → Anywhere

---

### Mistake 2

Forgetting raw strings.

Wrong

```python
"\d+"
```

Better

```python
r"\d+"
```

---

### Mistake 3

Using Regex for simple string operations.

Example

Instead of

```python
re.search("Python", text)
```

Sometimes

```python
"Python" in text
```

is simpler.

---

### Mistake 4

Writing overly complicated Regex.

Prefer readable patterns whenever possible.

---

# Interview Questions & Answers

## Q1. What is Regex?

### Answer

Regex (Regular Expression) is a pattern used to search, validate, extract, or replace text.

It allows matching text based on rules rather than exact strings.

---

## Q2. What is the difference between `match()` and `search()`?

### Answer

`match()` checks only the beginning of the string.

`search()` looks for the first occurrence anywhere in the string.

### Example

```python
re.match("Py", "Python")      # Match

re.search("thon", "Python")   # Match

re.match("thon", "Python")    # None
```

---

## Q3. What is the difference between `search()` and `findall()`?

### Answer

`search()` returns the first match.

`findall()` returns all matches as a list.

---

## Q4. Why should raw strings (`r""`) be used with Regex?

### Answer

Raw strings prevent Python from interpreting backslashes as escape characters.

For example,

```python
r"\d+"
```

is easier to read and avoids accidental escaping.

---

## Q5. What is `re.compile()`?

### Answer

`re.compile()` creates a reusable Regex object.

It improves performance when the same pattern is used repeatedly.

---

# Chapter Summary / Cheat Sheet

| Function | Purpose |
|----------|----------|
| `match()` | Match at beginning |
| `search()` | First occurrence |
| `findall()` | All matches |
| `split()` | Split string |
| `sub()` | Replace text |
| `compile()` | Reusable pattern |

### Most Important Symbols

| Symbol | Meaning |
|---------|---------|
| `.` | Any character |
| `\d` | Digit |
| `\w` | Word character |
| `\s` | Whitespace |
| `^` | Start |
| `$` | End |
| `*` | Zero or more |
| `+` | One or more |
| `?` | Optional |
| `{n}` | Exactly n times |

---

# Module 5 Complete ✅

You now understand:

- Strings
- Indexing & Slicing
- String Methods
- Formatting
- f-Strings
- Unicode & Encoding
- String Interning
- Regular Expressions

These concepts are essential for text processing, data validation, web development, automation, and interview coding problems.

---

# What's Next?

In **Module 6 — File Handling**, you'll learn how Python interacts with files on your computer:

- Reading Files
- Writing Files
- CSV Files
- JSON Files
- Pickle
- Context Managers (`with`)
- `pathlib`
- Logging

These skills are fundamental for building real-world Python applications.