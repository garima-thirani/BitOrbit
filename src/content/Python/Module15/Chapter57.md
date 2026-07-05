# Module 15 — Pandas

# Chapter 57 — Merge & Join

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Combine Data?
- Concatenation
- Merge
- Join
- Types of SQL Joins
- Inner Join
- Left Join
- Right Join
- Outer Join
- Merge on Multiple Columns
- Handling Duplicate Columns
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're working in a company.

Employee details are stored in one table.

```text
Employee ID

Name

Department
```

Salary information is stored in another table.

```text
Employee ID

Salary
```

Can you answer

"What is Alice's Salary?"

Not until you combine the two tables.

This is where **Merge** and **Join** become essential.

---

# Story — School Database

Imagine a school.

One file contains

```text
Roll No

Name
```

Another file contains

```text
Roll No

Marks
```

Neither file is complete.

To generate report cards,

both must be combined.

That's exactly what Pandas Merge does.

---

# Why Merge Data?

Real-world data is rarely stored in one file.

Examples

```text
Customers.csv

↓

Orders.csv

↓

Payments.csv

↓

Products.csv
```

To analyze business data,

these datasets must be combined.

---

# Sample Data

### Employee Table

```python
employees = pd.DataFrame({

"ID":[1,2,3],

"Name":["Alice","Bob","John"]

})
```

Output

```text
ID   Name

1    Alice

2    Bob

3    John
```

---

### Salary Table

```python
salary = pd.DataFrame({

"ID":[1,2,3],

"Salary":[50000,65000,70000]

})
```

Output

```text
ID   Salary

1    50000

2    65000

3    70000
```

---

# Merge

The most common function

```python
pd.merge()
```

General syntax

```python
pd.merge(

left,

right,

on="Column"

)
```

---

# Inner Join

Default merge.

Returns

only matching rows.

Example

```python
pd.merge(

employees,

salary,

on="ID"

)
```

Output

```text
ID

Name

Salary

1

Alice

50000

2

Bob

65000

3

John

70000
```

---

# Inner Join Visualization

```text
Employees

● ● ●

Salary

  ● ● ●

↓

Common Records
```

Only common IDs remain.

---

# Left Join

Returns

all rows

from

the left table.

Example

```python
pd.merge(

employees,

salary,

on="ID",

how="left"

)
```

Missing matches become

```text
NaN
```

---

# Left Join Visualization

```text
Employees

● ● ● ●

Salary

  ● ●

↓

All Employees

Missing Salary

↓

NaN
```

---

# Right Join

Returns

all rows

from

the right table.

Example

```python
pd.merge(

employees,

salary,

on="ID",

how="right"

)
```

Every salary record

is preserved.

---

# Right Join Visualization

```text
Employees

  ● ●

Salary

● ● ● ●

↓

All Salary Records
```

---

# Outer Join

Returns

everything

from both tables.

Example

```python
pd.merge(

employees,

salary,

on="ID",

how="outer"

)
```

Missing values become

```text
NaN
```

---

# Outer Join Visualization

```text
Employees

● ● ●

Salary

  ● ● ●

↓

Union

↓

Everything
```

---

# SQL Join Summary

| Join | Keeps |
|------|-------|
| Inner | Matching rows only |
| Left | All left rows |
| Right | All right rows |
| Outer | All rows from both tables |

---

# Join on Multiple Columns

Sometimes

one column

isn't enough.

Example

```python
pd.merge(

df1,

df2,

on=[

"Department",

"Year"

]

)
```

Both columns

must match.

---

# Different Column Names

Suppose

Table A

has

```text
EmployeeID
```

Table B

has

```text
ID
```

Example

```python
pd.merge(

df1,

df2,

left_on="EmployeeID",

right_on="ID"

)
```

---

# Duplicate Column Names

Suppose

both tables contain

```text
Name
```

Pandas automatically creates

```text
Name_x

Name_y
```

You can customize them.

```python
pd.merge(

df1,

df2,

suffixes=(

"_Emp",

"_Mgr"

)

)
```

---

# Join()

DataFrames also provide

```python
join()
```

Example

```python
df1.join(

df2

)
```

It joins

using

indexes.

---

# Merge vs Join

| Merge | Join |
|--------|------|
| Uses Columns | Uses Index |
| Flexible | Simpler |
| SQL-style | Index-based |

---

# Concatenate

Sometimes

we don't want

to merge.

Instead,

we simply stack data.

Example

```python
pd.concat(

[df1,df2]

)
```

Rows

are appended.

---

# Concatenate Columns

Example

```python
pd.concat(

[df1,df2],

axis=1

)
```

Now,

columns

are placed side by side.

---

# Merge Workflow

```text
Load Tables

↓

Identify Common Column

↓

Choose Join Type

↓

Merge

↓

Analyze
```

---

# Real-World Example

Imagine an e-commerce company.

Files

```text
Customers.csv

↓

Orders.csv

↓

Products.csv

↓

Payments.csv
```

Using Merge,

you can answer

- Which customer bought which product?
- Total payment per customer?
- Highest-selling products?
- Revenue by city?

---

# Memory Trick

Remember

```text
MILRO
```

**M**

Merge

↓

**I**

Inner

↓

**L**

Left

↓

**R**

Right

↓

**O**

Outer

These are the five most important concepts in data combination.

---

# Common Beginner Mistakes

### Mistake 1

Using the wrong join type.

Choosing an incorrect join can accidentally remove or duplicate rows.

Always decide whether you need

- Matching rows only
- All rows from one table
- All rows from both tables

---

### Mistake 2

Merging on the wrong column.

Ensure the key column uniquely identifies matching records whenever possible.

---

### Mistake 3

Ignoring duplicate column names.

After merging,

columns with identical names receive suffixes such as

```text
_x

_y
```

Rename them if necessary for clarity.

---

### Mistake 4

Confusing

`merge()`

with

`concat()`.

- `merge()` combines data using keys.
- `concat()` stacks rows or columns.

---

# Interview Questions & Answers

## Q1. What is the difference between Merge and Join?

### Answer

`merge()`

combines DataFrames using one or more columns,

similar to SQL joins.

`join()`

combines DataFrames primarily using their indexes.

---

## Q2. What is the difference between Inner Join and Left Join?

### Answer

**Inner Join**

returns only matching rows from both tables.

**Left Join**

returns all rows from the left table,

filling unmatched rows from the right table with `NaN`.

---

## Q3. What is an Outer Join?

### Answer

An Outer Join returns every row from both DataFrames.

Rows without matches receive `NaN` values for missing columns.

---

## Q4. What is the difference between `merge()` and `concat()`?

### Answer

`merge()`

combines tables based on common columns or keys.

`concat()`

simply appends DataFrames along rows (`axis=0`) or columns (`axis=1`).

---

## Q5. When would you use Merge in a real-world project?

### Answer

Merge is used whenever related information is stored in separate datasets.

Examples include combining

- Customers with Orders
- Employees with Salaries
- Students with Grades
- Products with Sales

using a common key such as an ID.

---

# Chapter Summary / Cheat Sheet

| Function | Purpose |
|----------|----------|
| `pd.merge()` | Combine DataFrames using keys |
| `how="inner"` | Matching rows only |
| `how="left"` | Keep all left rows |
| `how="right"` | Keep all right rows |
| `how="outer"` | Keep all rows |
| `left_on` / `right_on` | Merge using different column names |
| `join()` | Join using indexes |
| `pd.concat()` | Stack rows or columns |
| `suffixes` | Rename duplicate columns after merge |

---

# What's Next?

In **Chapter 58 — DateTime & Window Functions**, you'll learn advanced time-series analysis with Pandas:

- Working with Dates and Times
- `to_datetime()`
- Extracting Year, Month, Day
- Date Filtering
- Rolling Windows
- Expanding Windows
- Cumulative Operations

These features are widely used in finance, business analytics, IoT, forecasting, and machine learning.