# Module 15 — Pandas

# Chapter 55 — Data Cleaning

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Data Cleaning is Important
- Missing Values
- Detecting Missing Data
- Handling Missing Values
- Removing Missing Data
- Filling Missing Data
- Duplicate Data
- Removing Duplicates
- Changing Data Types
- Renaming Columns
- Replacing Values
- Sorting Data
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you receive a list of customer information.

```text
Name      Age    Salary

Alice     25     50000

Bob       ?      65000

Alice     25     50000

John      30     ?
```

Problems

- Missing Values
- Duplicate Rows
- Incomplete Records

Can we directly build a Machine Learning model?

No.

First,

the data must be cleaned.

---

# Story — Cleaning a Classroom

Imagine entering a classroom.

```text
Broken Chairs

↓

Dust

↓

Scattered Books

↓

Trash
```

Would you start teaching immediately?

No.

First,

you clean the classroom.

Data Cleaning works exactly the same way.

---

# Why Data Cleaning?

Real-world datasets are rarely perfect.

Common problems include

```text
Missing Values

↓

Duplicate Records

↓

Wrong Data Types

↓

Incorrect Values

↓

Inconsistent Formatting
```

Cleaning improves both accuracy and reliability.

---

# Missing Values

Missing values are represented as

```text
NaN

(None in some cases)
```

Example

```python
import pandas as pd

df = pd.DataFrame(

{

"Name":

["Alice","Bob","John"],

"Age":

[20,None,25]

}

)

print(df)
```

Output

```text
Name    Age

Alice   20

Bob     NaN

John    25
```

---

# Detecting Missing Values

Use

```python
df.isnull()
```

Output

```text
False False

False True

False False
```

Each cell indicates whether the value is missing.

---

# Counting Missing Values

```python
df.isnull().sum()
```

Output

```text
Name    0

Age     1
```

Very useful for quickly identifying incomplete columns.

---

# Checking Non-Missing Values

```python
df.notnull()
```

Returns

```text
True

False
```

instead of

```text
False

True
```

---

# Removing Missing Rows

Use

```python
df.dropna()
```

Example

Before

```text
Alice

Bob

John
```

After

```text
Alice

John
```

Rows containing missing values are removed.

---

# Removing Missing Columns

```python
df.dropna(

axis=1

)
```

`axis=1`

means

```text
Columns
```

Entire columns containing missing values are removed.

---

# Filling Missing Values

Sometimes

deleting rows

loses valuable data.

Instead,

fill missing values.

Example

```python
df.fillna(

0

)
```

Every missing value becomes

```text
0
```

---

# Fill Using Mean

Example

```python
df["Age"] = df["Age"].fillna(

df["Age"].mean()

)
```

Missing ages become

the average age.

Common for numerical columns.

---

# Fill Using Median

```python
df["Salary"] = df["Salary"].fillna(

df["Salary"].median()

)
```

Median is often preferred

when outliers exist.

---

# Fill Using Mode

For categorical data

```python
df["City"] = df["City"].fillna(

df["City"].mode()[0]

)
```

Mode

=

Most Frequent Value.

---

# Forward Fill

```python
df.fillna(

method="ffill"

)
```

Missing value

takes

the previous value.

Example

```text
10

NaN

30
```

Becomes

```text
10

10

30
```

---

# Backward Fill

```python
df.fillna(

method="bfill"

)
```

Missing value

takes

the next available value.

---

# Duplicate Data

Sometimes

the same row appears

multiple times.

Example

```text
Alice

Alice

Bob

John
```

Duplicates can distort analysis.

---

# Detecting Duplicates

```python
df.duplicated()
```

Output

```text
False

True

False

False
```

---

# Removing Duplicates

```python
df.drop_duplicates()
```

Removes repeated rows.

---

# Renaming Columns

Example

```python
df.rename(

columns={

"Marks":"Score"

}

)
```

Old

```text
Marks
```

New

```text
Score
```

---

# Changing Data Types

Suppose

Age is stored as

```text
String
```

Convert it.

```python
df["Age"] = df["Age"].astype(

int

)
```

Now,

Age becomes

an integer column.

---

# Replacing Values

Example

```python
df.replace(

"Male",

"M"

)
```

Useful for

standardizing data.

---

# Sorting Data

Ascending

```python
df.sort_values(

"Marks"

)
```

Descending

```python
df.sort_values(

"Marks",

ascending=False

)
```

---

# Cleaning Workflow

```text
Load Data

↓

Inspect Data

↓

Find Missing Values

↓

Remove Duplicates

↓

Correct Data Types

↓

Replace Incorrect Values

↓

Analyze
```

---

# Real-World Example

Imagine an online shopping dataset.

Problems

```text
Missing Prices

↓

Duplicate Orders

↓

Incorrect Dates

↓

Wrong Categories
```

Cleaning the dataset

before analysis

improves

business decisions.

---

# Memory Trick

Remember

```text
MDRRS
```

**M**

Missing Values

↓

**D**

Duplicates

↓

**R**

Replace

↓

**R**

Rename

↓

**S**

Sort

These are the five major data-cleaning tasks.

---

# Common Beginner Mistakes

### Mistake 1

Deleting every row containing missing values.

Large datasets may lose significant information.

Consider filling values instead.

---

### Mistake 2

Ignoring duplicate rows.

Duplicates can produce misleading statistics and incorrect model predictions.

---

### Mistake 3

Working with incorrect data types.

Always verify column types using

```python
df.dtypes
```

before analysis.

---

### Mistake 4

Cleaning data without first inspecting it.

Use

```python
df.info()

df.head()

df.describe()
```

to understand the dataset before making changes.

---

# Interview Questions & Answers

## Q1. Why is Data Cleaning important?

### Answer

Real-world data often contains missing values,

duplicates,

incorrect formats,

and inconsistent entries.

Cleaning improves data quality,

leading to more accurate analysis and machine learning models.

---

## Q2. What is the difference between `dropna()` and `fillna()`?

### Answer

`dropna()`

removes rows or columns containing missing values.

`fillna()`

replaces missing values with specified values,

such as

- 0
- Mean
- Median
- Mode

---

## Q3. How do you detect duplicate rows?

### Answer

Use

```python
df.duplicated()
```

It returns a Boolean Series indicating which rows are duplicates.

---

## Q4. How do you change the data type of a column?

### Answer

Use

```python
astype()
```

Example

```python
df["Age"] = df["Age"].astype(int)
```

This converts the column to integers.

---

## Q5. When should you use Mean, Median, and Mode for missing values?

### Answer

- **Mean** → Numerical data without significant outliers.
- **Median** → Numerical data with outliers.
- **Mode** → Categorical data.

Choosing the appropriate method depends on the nature of the dataset.

---

# Chapter Summary / Cheat Sheet

| Function | Purpose |
|----------|----------|
| `isnull()` | Detect missing values |
| `notnull()` | Detect non-missing values |
| `dropna()` | Remove missing data |
| `fillna()` | Fill missing values |
| `duplicated()` | Detect duplicates |
| `drop_duplicates()` | Remove duplicates |
| `astype()` | Change data type |
| `rename()` | Rename columns |
| `replace()` | Replace values |
| `sort_values()` | Sort rows |

---

# What's Next?

In **Chapter 56 — GroupBy & Aggregation**, you'll learn how to summarize and analyze data efficiently:

- Grouping Data
- Aggregate Functions
- Multiple Aggregations
- Custom Aggregations
- Filtering Groups
- Transform Operations

These techniques are fundamental for exploratory data analysis (EDA), business reporting, and machine learning feature engineering.