# Module 15 — Pandas

# Chapter 54 — Series & DataFrame

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Pandas?
- Installing Pandas
- What is Pandas?
- What is a Series?
- Creating Series
- Series Attributes
- What is a DataFrame?
- Creating DataFrames
- Reading Data
- Selecting Rows & Columns
- DataFrame Attributes
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're managing a school.

You have information like

```text
Student Name

Age

Marks

City
```

Would you store this data in separate Python lists?

```python
names = [...]

ages = [...]

marks = [...]
```

Soon,

keeping them synchronized becomes difficult.

Instead,

you organize everything into a table.

```text
Name    Age   Marks

Alice   20     95

Bob     21     88

John    19     91
```

This is exactly what **Pandas** is designed for.

---

# Story — Excel Spreadsheet

Imagine opening Microsoft Excel.

Rows

↓

Students

Columns

↓

Information

```text
+-----------------------------+

| Name | Age | Marks | City |

+-----------------------------+

| Alice| 20  | 95    | NY   |

| Bob  | 22  | 88    | LA   |

+-----------------------------+
```

Pandas is essentially a programmable version of Excel.

Instead of clicking,

you write Python code.

---

# Why Pandas?

Python Lists are useful,

but they become difficult to manage when working with tables.

Problems

- Multiple Lists
- Missing Values
- Filtering
- Sorting
- Aggregation

Pandas solves these problems efficiently.

---

# What is Pandas?

Pandas is a Python library for

- Data Analysis
- Data Manipulation
- Data Cleaning
- Data Exploration

It is one of the most important libraries in

- Data Science
- Machine Learning
- Business Analytics
- Finance

---

# Installing Pandas

```bash
pip install pandas
```

Import

```python
import pandas as pd
```

The alias

```python
pd
```

is the standard convention.

---

# Core Data Structures

Pandas has two primary data structures.

```text
Series

↓

1-D Data

------------------

DataFrame

↓

2-D Tabular Data
```

Almost everything in Pandas revolves around these two.

---

# What is a Series?

A Series is a

```text
One-Dimensional

Labeled Array
```

Think of it as

```text
Python List

+

Index
```

---

# Creating a Series

```python
import pandas as pd

marks = pd.Series(

[90,85,95,80]

)

print(marks)
```

Output

```text
0    90

1    85

2    95

3    80
```

Notice

Each value has an

```text
Index
```

---

# Custom Index

```python
marks = pd.Series(

[90,85,95],

index=[

"Alice",

"Bob",

"John"

]

)
```

Output

```text
Alice    90

Bob      85

John     95
```

Indexes don't have to be numbers.

---

# Series Attributes

Useful attributes

```python
series.index

series.values

series.dtype

series.shape

series.size
```

---

# Accessing Values

By Position

```python
marks[0]
```

By Label

```python
marks["Alice"]
```

Pandas supports both.

---

# What is a DataFrame?

A DataFrame is

```text
Two-Dimensional

Labeled Data
```

Visualization

```text
Rows

↓

Columns

↓

Cells
```

It is the most commonly used Pandas object.

---

# Creating a DataFrame

```python
students = {

"Name":

["Alice","Bob"],

"Age":

[20,21],

"Marks":

[95,88]

}

df = pd.DataFrame(

students

)

print(df)
```

Output

```text
Name    Age   Marks

Alice   20    95

Bob     21    88
```

---

# DataFrame Structure

Visualization

```text
        Columns

          ↓

      Name Age Marks

Rows

↓

0     Alice 20 95

1     Bob   21 88
```

Every DataFrame has

- Rows
- Columns
- Index

---

# Reading CSV Files

One of the most common operations.

```python
df = pd.read_csv(

"students.csv"

)
```

This loads a CSV file into a DataFrame.

---

# Viewing Data

```python
df.head()
```

Shows

first

5 rows.

---

```python
df.tail()
```

Shows

last

5 rows.

---

# DataFrame Information

```python
df.info()
```

Displays

- Columns
- Data Types
- Missing Values
- Memory Usage

Extremely useful when exploring new datasets.

---

# Statistical Summary

```python
df.describe()
```

Output includes

- Mean
- Standard Deviation
- Minimum
- Maximum
- Quartiles

Useful for numerical columns.

---

# Shape

```python
df.shape
```

Output

```text
(rows,

columns)
```

Example

```text
(1000,5)
```

Means

```text
1000 Rows

5 Columns
```

---

# Column Names

```python
df.columns
```

Returns

all column names.

---

# Data Types

```python
df.dtypes
```

Displays

the data type

of each column.

---

# Selecting Columns

```python
df["Marks"]
```

Returns

a Series.

---

Multiple Columns

```python
df[

["Name",

"Marks"]

]
```

Returns

a DataFrame.

---

# Selecting Rows

Using

```python
iloc
```

(Position)

```python
df.iloc[0]
```

Returns

the first row.

---

Using

```python
loc
```

(Label)

```python
df.loc[0]
```

If custom indexes exist,

labels become more meaningful.

---

# Selecting Specific Cell

```python
df.loc[

0,

"Marks"

]
```

Output

```text
95
```

---

# Filtering Data

Example

```python
df[

df["Marks"] > 90

]
```

Returns

students

scoring above

90.

---

# Adding a Column

```python
df["Grade"] = [

"A",

"B"

]
```

A new column is added.

---

# Removing a Column

```python
df.drop(

"Age",

axis=1

)
```

`axis=1`

means

column.

---

# DataFrame vs Series

| Series | DataFrame |
|----------|-----------|
| One Column | Multiple Columns |
| 1-D | 2-D |
| Single Data Type | Multiple Column Types |
| Like List | Like Table |

---

# Real-World Example

Imagine an employee database.

```text
Employee ID

↓

Name

↓

Department

↓

Salary

↓

Experience
```

This naturally becomes

a DataFrame.

Every data science project

starts here.

---

# Memory Trick

Remember

```text
SDC
```

**S**

Series

↓

**D**

DataFrame

↓

**C**

Columns

Or remember

```text
Series

↓

One Column

↓

DataFrame

↓

Entire Table
```

---

# Common Beginner Mistakes

### Mistake 1

Confusing

Series

with

DataFrames.

A Series represents

one column.

A DataFrame represents

an entire table.

---

### Mistake 2

Using

```python
iloc
```

and

```python
loc
```

interchangeably.

- `iloc` → Position-based
- `loc` → Label-based

---

### Mistake 3

Forgetting that

```python
df["Marks"]
```

returns a Series,

while

```python
df[["Marks"]]
```

returns a DataFrame.

---

### Mistake 4

Ignoring

```python
df.info()
```

before analysis.

Always inspect the dataset before performing operations.

---

# Interview Questions & Answers

## Q1. What is the difference between a Series and a DataFrame?

### Answer

A Series is a one-dimensional labeled array.

A DataFrame is a two-dimensional labeled table consisting of multiple Series sharing the same index.

---

## Q2. Why is Pandas widely used in Data Science?

### Answer

Pandas simplifies data loading,

cleaning,

filtering,

aggregation,

and transformation.

It integrates seamlessly with NumPy,

Matplotlib,

Scikit-Learn,

and other data science libraries.

---

## Q3. What is the difference between `loc` and `iloc`?

### Answer

`loc`

selects data using labels.

Example

```python
df.loc[0,"Marks"]
```

`iloc`

selects data using integer positions.

Example

```python
df.iloc[0,2]
```

---

## Q4. What is the purpose of `df.info()`?

### Answer

`df.info()`

provides a quick summary of a DataFrame,

including

- Column Names
- Data Types
- Missing Values
- Memory Usage

It is one of the first functions used during data exploration.

---

## Q5. What does `df.describe()` return?

### Answer

It generates descriptive statistics for numerical columns,

including

- Count
- Mean
- Standard Deviation
- Minimum
- Quartiles
- Maximum

This helps understand the distribution of the data.

---

# Chapter Summary / Cheat Sheet

| Function | Purpose |
|----------|----------|
| `pd.Series()` | Create Series |
| `pd.DataFrame()` | Create DataFrame |
| `pd.read_csv()` | Read CSV File |
| `df.head()` | First 5 Rows |
| `df.tail()` | Last 5 Rows |
| `df.info()` | Dataset Summary |
| `df.describe()` | Statistical Summary |
| `df.shape` | Rows & Columns |
| `df.columns` | Column Names |
| `df.dtypes` | Data Types |
| `df.loc[]` | Label-based Selection |
| `df.iloc[]` | Position-based Selection |

---

# What's Next?

In **Chapter 55 — Data Cleaning**, you'll learn one of the most important skills in Data Science:

- Missing Values
- Duplicate Data
- Incorrect Data Types
- Handling Outliers
- Data Transformation
- Cleaning Real-world Datasets

Real-world datasets are rarely perfect, and mastering data cleaning is often the most time-consuming yet valuable part of a data scientist's workflow.