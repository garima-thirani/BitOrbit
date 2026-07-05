# Module 15 — Pandas

# Chapter 56 — GroupBy & Aggregation

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Grouping Data?
- What is GroupBy?
- Split-Apply-Combine
- Aggregate Functions
- Multiple Aggregations
- Grouping by Multiple Columns
- Custom Aggregations
- Filtering Groups
- Transform vs Aggregate
- Practical Examples
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you are the manager of a company.

You have employee data.

```text
Employee

Department

Salary
```

Instead of looking at every employee individually,

you want answers like

- Average salary in each department
- Highest salary
- Number of employees
- Total salary expense

This is where **GroupBy** becomes powerful.

---

# Story — School Report Card

Imagine a school.

Students belong to different classes.

```text
Class A

↓

Students

↓

Marks

--------------------

Class B

↓

Students

↓

Marks
```

Instead of calculating marks for every student manually,

the school prepares

```text
Average Marks

Highest Marks

Lowest Marks
```

for each class.

That's exactly what **GroupBy** does.

---

# Why GroupBy?

Suppose you have

```text
100,000 Employees
```

Finding statistics manually would be difficult.

GroupBy allows you to summarize data efficiently.

---

# What is GroupBy?

GroupBy divides data into groups

and performs calculations on each group.

Visualization

```text
Dataset

↓

Split

↓

Groups

↓

Apply Function

↓

Combine Results
```

This process is called

```text
Split

↓

Apply

↓

Combine
```

---

# Sample Data

```python
import pandas as pd

data = {

"Department":

["HR",

"IT",

"IT",

"HR",

"Sales"],

"Salary":

[50000,

70000,

75000,

55000,

65000]

}

df = pd.DataFrame(data)
```

---

# GroupBy Example

```python
df.groupby(

"Department"

).mean()
```

Output

```text
Department

HR       52500

IT       72500

Sales    65000
```

Average salary

per department.

---

# GroupBy Object

When you write

```python
group = df.groupby(

"Department"

)
```

Pandas creates a

```text
GroupBy Object
```

It doesn't calculate anything

until an aggregation function is applied.

---

# Aggregate Functions

Common aggregation functions

```python
sum()

mean()

count()

max()

min()

median()

std()
```

---

# Sum

```python
df.groupby(

"Department"

)["Salary"].sum()
```

Output

```text
HR       105000

IT       145000

Sales     65000
```

---

# Count

```python
df.groupby(

"Department"

).count()
```

Counts

rows

in each department.

---

# Maximum

```python
df.groupby(

"Department"

)["Salary"].max()
```

Returns

highest salary

per department.

---

# Minimum

```python
df.groupby(

"Department"

)["Salary"].min()
```

Returns

lowest salary.

---

# Multiple Aggregations

Suppose

you want

```text
Average

Maximum

Minimum
```

simultaneously.

Example

```python
df.groupby(

"Department"

).agg(

["mean",

"max",

"min"]

)
```

Output

```text
Department

Mean

Max

Min
```

One operation,

multiple statistics.

---

# Named Aggregations

Example

```python
df.groupby(

"Department"

).agg(

AverageSalary=("Salary","mean"),

HighestSalary=("Salary","max")

)
```

Creates

meaningful column names.

---

# Grouping Multiple Columns

Example

```python
df.groupby(

["Department",

"Gender"]

).mean()
```

Visualization

```text
HR

↓

Male

↓

Female

----------------

IT

↓

Male

↓

Female
```

Creates

nested groups.

---

# Iterating Through Groups

Example

```python
groups = df.groupby(

"Department"

)

for name, group in groups:

    print(name)

    print(group)
```

Each group

can be processed independently.

---

# Filtering Groups

Suppose

keep only departments

having

more than

2 employees.

Example

```python
df.groupby(

"Department"

).filter(

lambda x:

len(x) > 2

)
```

Groups failing the condition

are removed.

---

# Transform

Aggregation

returns

one value

per group.

Transform

returns

one value

for every row.

Example

```python
df["Average"] =

df.groupby(

"Department"

)["Salary"].transform(

"mean"

)
```

Every employee

receives

their department's average salary.

---

# Aggregate vs Transform

Aggregation

```text
Many Rows

↓

One Result
```

Transform

```text
Many Rows

↓

Same Number of Rows
```

This distinction is commonly tested in interviews.

---

# Size vs Count

Example

```python
group.size()
```

Counts

all rows.

Example

```python
group.count()
```

Counts

non-missing values.

Difference

appears

when missing values exist.

---

# Sorting Groups

Example

```python
df.groupby(

"Department"

).mean().sort_values(

"Salary",

ascending=False

)
```

Departments

sorted

by average salary.

---

# Real-World Example

Imagine an e-commerce company.

Dataset

```text
Customer

City

Order Value
```

Using GroupBy,

you can calculate

- Average order value per city
- Total sales
- Number of customers
- Highest purchase

All in a few lines of code.

---

# GroupBy Workflow

```text
Load Data

↓

Choose Column

↓

Group Data

↓

Apply Aggregation

↓

Analyze Results
```

---

# Memory Trick

Remember

```text
SGA
```

**S**

Split

↓

**G**

Group

↓

**A**

Aggregate

Or remember

```text
Split

↓

Apply

↓

Combine
```

This is the foundation of GroupBy.

---

# Common Beginner Mistakes

### Mistake 1

Calling

```python
groupby()
```

without an aggregation function.

A GroupBy object stores grouping information

but does not compute results until a function like

`mean()`

or

`sum()`

is applied.

---

### Mistake 2

Confusing

`count()`

with

`size()`.

`count()`

ignores missing values,

while

`size()`

counts every row.

---

### Mistake 3

Using

`agg()`

when

`transform()`

is required.

Remember

Aggregation reduces rows.

Transform preserves the original number of rows.

---

### Mistake 4

Grouping by too many columns unnecessarily.

This may produce a large number of tiny groups,

making analysis difficult.

---

# Interview Questions & Answers

## Q1. What is GroupBy in Pandas?

### Answer

GroupBy is used to split data into groups,

apply computations to each group,

and combine the results.

It follows the

Split → Apply → Combine

paradigm.

---

## Q2. What is the difference between `agg()` and `transform()`?

### Answer

`agg()`

returns one aggregated value per group,

reducing the number of rows.

`transform()`

returns one value for every original row,

keeping the DataFrame size unchanged.

---

## Q3. What is the difference between `count()` and `size()`?

### Answer

`count()`

counts only non-missing values.

`size()`

counts every row,

including those containing missing values.

---

## Q4. Can GroupBy use multiple columns?

### Answer

Yes.

Example

```python
df.groupby(["Department","Gender"])
```

creates hierarchical groups based on both columns.

---

## Q5. Why is GroupBy important in Data Analysis?

### Answer

GroupBy simplifies summarizing large datasets.

It enables quick calculations such as

- Average
- Total
- Maximum
- Minimum
- Count

for each category,

making it essential for reporting,

business intelligence,

and exploratory data analysis.

---

# Chapter Summary / Cheat Sheet

| Function | Purpose |
|----------|----------|
| `groupby()` | Split data into groups |
| `mean()` | Average |
| `sum()` | Total |
| `count()` | Count non-missing values |
| `size()` | Count all rows |
| `max()` | Maximum |
| `min()` | Minimum |
| `median()` | Median |
| `agg()` | Multiple aggregations |
| `transform()` | Preserve row count |
| `filter()` | Remove groups by condition |

---

# What's Next?

In **Chapter 57 — Merge & Join**, you'll learn how to combine multiple datasets:

- Merge
- Join
- Concatenate
- Inner Join
- Left Join
- Right Join
- Outer Join

These operations are fundamental when working with relational data, SQL-like workflows, and real-world datasets spread across multiple files or tables.