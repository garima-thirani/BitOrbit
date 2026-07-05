# Module 5 — Strings

# Chapter 15 — Strings

---

# Learning Objectives

By the end of this chapter, you will understand:

- What is a String?
- Why Strings are Important
- Creating Strings
- Indexing
- Negative Indexing
- Slicing
- String Immutability
- String Methods
- String Formatting
- f-Strings
- Escape Characters
- String Interning
- Unicode & Encoding
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're chatting on WhatsApp.

Everything you type is text.

```text
Hello

Good Morning

Python

OpenAI

123 Main Street
```

Computers don't understand text the way humans do.

Internally,

every character is represented using numbers.

Python provides the **String** data type to make working with text simple and intuitive.

Strings are one of the most frequently used data types in programming.

They appear in:

- User Names
- Passwords
- URLs
- Email Addresses
- File Names
- JSON
- APIs
- Database Records

If you've ever worked with text,

you've worked with strings.

---

# Story — Train Coaches

Imagine a train.

```text
Engine

↓

Coach 1

↓

Coach 2

↓

Coach 3

↓

Coach 4
```

Each coach has a number.

Similarly,

a string is simply a sequence of characters.

```text
Python

↓

P

y

t

h

o

n
```

Each character has its own position called an **index**.

---

# What is a String?

A string is an **ordered, immutable sequence of Unicode characters**.

Let's understand each word.

---

## Ordered

Characters appear in a fixed order.

```text
Python

↓

P

↓

y

↓

t

↓

h

↓

o

↓

n
```

Changing the order changes the meaning.

---

## Immutable

Once created,

a string cannot be modified.

Example

```python
name = "Alice"
```

You cannot directly change

```text
A

↓

B
```

Instead,

Python creates a completely new string.

---

## Unicode Characters

A string can contain

- English
- Hindi
- Japanese
- Emojis
- Mathematical Symbols

Example

```python
"Hello"

"नमस्ते"

"こんにちは"

"😊"
```

Python stores all of them as Unicode.

---

# Creating Strings

Using double quotes

```python
name = "Python"
```

---

Using single quotes

```python
name = 'Python'
```

Both are identical.

---

Multi-line Strings

```python
message = """

Welcome

to

Python

"""
```

Useful for documentation and long text.

---

# Indexing

Every character has an index.

```text
Python

0 1 2 3 4 5
```

Example

```python
word = "Python"

print(word[0])
```

Output

```text
P
```

---

# Negative Indexing

Python allows indexing from the end.

```text
Python

-6 -5 -4 -3 -2 -1
```

Example

```python
print(word[-1])
```

Output

```text
n
```

---

# Slicing

Retrieve part of a string.

Syntax

```python
string[start:stop:step]
```

---

Example

```python
word = "Programming"

print(word[0:7])
```

Output

```text
Program
```

---

Example

```python
print(word[:7])
```

Output

```text
Program
```

---

Example

```python
print(word[3:])
```

Output

```text
gramming
```

---

Reverse a String

```python
print(word[::-1])
```

Output

```text
gnimmargorP
```

---

# String Immutability

This surprises almost every beginner.

```python
name = "Alice"

name[0] = "B"
```

Output

```text
TypeError
```

Why?

Because strings are immutable.

Instead,

create a new string.

```python
name = "B" + name[1:]

print(name)
```

Output

```text
Blice
```

---

# Common String Methods

## upper()

```python
"python".upper()
```

Output

```text
PYTHON
```

---

## lower()

```python
"PYTHON".lower()
```

Output

```text
python
```

---

## capitalize()

```python
"python".capitalize()
```

Output

```text
Python
```

---

## title()

```python
"machine learning".title()
```

Output

```text
Machine Learning
```

---

## strip()

Removes whitespace.

```python
text = "  Python  "

print(text.strip())
```

Output

```text
Python
```

---

## replace()

```python
text = "I like Java"

print(text.replace("Java","Python"))
```

Output

```text
I like Python
```

---

## split()

Converts a string into a list.

```python
sentence = "Python is awesome"

print(sentence.split())
```

Output

```text
['Python','is','awesome']
```

---

## join()

Performs the opposite of `split()`.

```python
words = ["Python","is","awesome"]

print(" ".join(words))
```

Output

```text
Python is awesome
```

---

## find()

Returns the first occurrence.

```python
text = "Programming"

print(text.find("gram"))
```

Output

```text
3
```

Returns `-1` if not found.

---

## count()

```python
text = "banana"

print(text.count("a"))
```

Output

```text
3
```

---

## startswith()

```python
filename = "report.pdf"

print(filename.startswith("report"))
```

Output

```text
True
```

---

## endswith()

```python
print(filename.endswith(".pdf"))
```

Output

```text
True
```

---

# String Formatting

Before Python 3.6,

formatting was commonly done using `format()`.

```python
name = "Alice"

age = 20

print(

"Name: {} Age: {}".format(name, age)

)
```

Output

```text
Name: Alice Age: 20
```

---

# f-Strings (Recommended)

Python 3.6 introduced **formatted string literals**, commonly called **f-Strings**.

```python
name = "Alice"

age = 20

print(f"{name} is {age} years old.")
```

Output

```text
Alice is 20 years old.
```

---

# Why f-Strings?

They are:

- Faster
- More readable
- Easier to write

You can even evaluate expressions.

```python
a = 10

b = 20

print(f"Sum = {a+b}")
```

Output

```text
Sum = 30
```

---

# Escape Characters

Sometimes we need special characters inside strings.

| Escape | Meaning |
|---------|----------|
| `\n` | New Line |
| `\t` | Tab |
| `\\` | Backslash |
| `\"` | Double Quote |
| `\'` | Single Quote |

Example

```python
print("Hello\nWorld")
```

Output

```text
Hello

World
```

---

# Raw Strings

Useful for file paths and regular expressions.

```python
path = r"C:\Users\Admin"
```

Without raw strings,

backslashes are treated as escape characters.

---

# String Interning

One of the most commonly asked Python interview topics.

Python optimizes memory by storing identical immutable strings only once.

Example

```python
a = "Python"

b = "Python"

print(a is b)
```

Output

```text
True
```

Both variables may point to the same memory location.

This optimization is called **String Interning**.

---

# Unicode & Encoding

Computers store everything as bytes.

Encoding converts characters into bytes.

```text
Character

↓

Encoding

↓

Bytes
```

Decoding performs the reverse process.

```text
Bytes

↓

Decoding

↓

Character
```

Python commonly uses UTF-8.

Example

```python
text = "Python"

encoded = text.encode("utf-8")

print(encoded)
```

Output

```text
b'Python'
```

Decoding

```python
print(encoded.decode("utf-8"))
```

Output

```text
Python
```

---

# Real-World Example

Suppose you're validating email addresses.

```python
email = "alice@example.com"

if email.endswith(".com"):

    print("Valid Domain")
```

Or cleaning user input.

```python
name = " Alice "

print(name.strip().title())
```

Output

```text
Alice
```

Strings are everywhere in real-world applications.

---

# Memory Trick

Remember

```text
SIFS
```

**S**

Strings

↓

**I**

Immutable

↓

**F**

Formatted (f-Strings)

↓

**S**

Slicing

These are the four most important concepts.

---

# Common Beginner Mistakes

### Mistake 1

Trying to modify a string.

```python
name[0] = "B"
```

Strings are immutable.

---

### Mistake 2

Using `+` repeatedly inside loops.

Prefer

```python
"".join(list_of_strings)
```

for better performance.

---

### Mistake 3

Confusing `find()` and `index()`.

- `find()` returns `-1` if not found.
- `index()` raises `ValueError`.

---

### Mistake 4

Forgetting that slicing excludes the stop index.

```python
text[1:4]
```

Returns indices

```text
1

2

3
```

---

# Interview Questions & Answers

## Q1. Why are strings immutable?

### Answer

Strings are immutable to improve:

- Memory efficiency
- Performance
- Security
- Hashability

Since they cannot change, Python can safely reuse them through string interning.

---

## Q2. What is the difference between `find()` and `index()`?

### Answer

`find()` returns `-1` when the substring is absent.

`index()` raises a `ValueError`.

Use `find()` when the substring may not exist.

---

## Q3. Why are f-Strings preferred?

### Answer

f-Strings are:

- More readable
- Faster than `format()`
- Allow inline expressions

Example

```python
name = "Alice"

print(f"Hello {name}")
```

---

## Q4. What is String Interning?

### Answer

String interning is Python's optimization where identical immutable strings may share the same memory location.

This reduces memory usage and speeds up comparisons.

---

## Q5. What is the difference between `split()` and `join()`?

### Answer

`split()` converts a string into a list.

`join()` combines a list of strings into a single string.

Example

```python
text = "Python is fun"

words = text.split()

result = "-".join(words)

print(result)
```

Output

```text
Python-is-fun
```

---

# Chapter Summary / Cheat Sheet

| Feature | Strings |
|----------|----------|
| Ordered | ✅ |
| Mutable | ❌ |
| Indexed | ✅ |
| Supports Slicing | ✅ |
| Unicode | ✅ |

### Most Used Methods

| Method | Purpose |
|---------|----------|
| `upper()` | Uppercase |
| `lower()` | Lowercase |
| `strip()` | Remove whitespace |
| `replace()` | Replace text |
| `split()` | String → List |
| `join()` | List → String |
| `find()` | Find substring |
| `count()` | Count occurrences |
| `startswith()` | Prefix check |
| `endswith()` | Suffix check |

---

# What's Next?

In **Chapter 16 — Regular Expressions (Regex)**, you'll learn one of Python's most powerful text-processing tools:

- Pattern Matching
- Searching
- Validation
- Extraction
- Substitution

Regex is heavily used in data cleaning, web scraping, log analysis, and technical interviews.