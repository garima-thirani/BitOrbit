# Module 15 — Pandas

# Chapter 59 — Real-world Data Analysis

---

# Learning Objectives

By the end of this chapter, you will understand:

- The Data Analysis Workflow
- Loading Real-world Datasets
- Exploring Data
- Cleaning Data
- Filtering Data
- Feature Engineering
- GroupBy Analysis
- Merging Data
- Basic Visualization
- Exporting Results
- Best Practices
- Interview Questions & Answers

---

# Introduction

Imagine you are hired as a Data Analyst for an e-commerce company.

The company gives you a CSV file containing

```text
500,000 Orders
```

Your manager asks questions like

- Which products sell the most?
- Which city generates the highest revenue?
- Who are the top customers?
- Which month had the highest sales?
- Which products should be discontinued?

Can you answer these questions by reading the CSV manually?

Of course not.

This is where **Pandas** becomes one of the most powerful libraries in Python.

---

# Story — Supermarket Manager

Imagine you manage a supermarket.

Every day thousands of transactions occur.

```text
Customer

↓

Product

↓

Price

↓

Quantity

↓

Date
```

Your goal is to convert raw data into business insights.

That's exactly what Data Analysis is.

---

# What is Data Analysis?

Data Analysis is the process of

```text
Collect Data

↓

Clean Data

↓

Transform Data

↓

Analyze Data

↓

Visualize Data

↓

Make Decisions
```

This workflow is followed in almost every data science project.

---

# Step 1 — Load Data

Most datasets are stored as CSV files.

Example

```python
import pandas as pd

df = pd.read_csv(

"sales.csv"

)
```

Now the entire dataset is loaded into a DataFrame.

---

# Step 2 — Explore the Dataset

Before analysis,

understand the data.

Useful functions

```python
df.head()

df.tail()

df.info()

df.describe()

df.shape

df.columns
```

These functions provide a quick overview of the dataset.

---

# Step 3 — Check Missing Values

```python
df.isnull().sum()
```

Output

```text
Product      0

Price        3

Quantity     2
```

Always identify missing values before analysis.

---

# Step 4 — Clean the Data

Example

```python
df["Price"] =

df["Price"].fillna(

df["Price"].mean()

)
```

Remove duplicates

```python
df = df.drop_duplicates()
```

Convert dates

```python
df["Date"] =

pd.to_datetime(

df["Date"]

)
```

---

# Step 5 — Filter Data

Suppose

we only want expensive products.

```python
expensive = df[

df["Price"] > 1000

]
```

Filtering helps focus analysis on relevant records.

---

# Step 6 — Create New Columns

Suppose

we want the total amount for each order.

```python
df["Total"] =

df["Price"] *

df["Quantity"]
```

This process is called

```text
Feature Engineering
```

Creating useful new information from existing data.

---

# Step 7 — Group Data

Example

```python
df.groupby(

"City"

)["Total"].sum()
```

Output

```text
New York

250000

Chicago

180000

Boston

90000
```

Now we know

revenue by city.

---

# Step 8 — Sort Results

```python
city_sales =

df.groupby(

"City"

)["Total"].sum()

.sort_values(

ascending=False

)
```

The highest-performing cities appear first.

---

# Step 9 — Analyze Dates

Suppose

we want monthly sales.

```python
df["Month"] =

df["Date"].dt.month
```

Then

```python
df.groupby(

"Month"

)["Total"].sum()
```

This reveals seasonal trends.

---

# Step 10 — Merge Datasets

Suppose

products are stored separately.

```python
orders.csv

↓

products.csv
```

Merge

```python
pd.merge(

orders,

products,

on="ProductID"

)
```

Now all information is available in one DataFrame.

---

# Step 11 — Visualize

Simple chart

```python
city_sales.plot(

kind="bar"

)
```

Visualization makes patterns easier to understand.

---

# Step 12 — Export Results

Save the cleaned dataset.

```python
df.to_csv(

"cleaned_sales.csv",

index=False

)
```

Save Excel

```python
df.to_excel(

"sales.xlsx",

index=False

)
```

---

# Complete Workflow

```text
CSV File

↓

Load

↓

Explore

↓

Clean

↓

Filter

↓

Create Features

↓

Group

↓

Analyze

↓

Visualize

↓

Export
```

This is the standard workflow followed by data analysts.

---

# Case Study

Suppose we have

```text
OrderID

Product

Category

Price

Quantity

City

Date
```

Questions

```text
Which Product Sold Most?

↓

Highest Revenue City?

↓

Average Order Value?

↓

Monthly Sales?

↓

Best Category?
```

Using Pandas,

all these questions can be answered in just a few lines of code.

---

# Example Analysis

Top Products

```python
df.groupby(

"Product"

)["Quantity"].sum()

.sort_values(

ascending=False

)
```

---

Top Cities

```python
df.groupby(

"City"

)["Total"].sum()

.sort_values(

ascending=False

)
```

---

Average Product Price

```python
df["Price"].mean()
```

---

Largest Order

```python
df["Total"].max()
```

---

Monthly Revenue

```python
df.groupby(

df["Date"].dt.month

)["Total"].sum()
```

---

# Real-world Applications

Pandas is used in

```text
Finance

↓

Healthcare

↓

Retail

↓

Banking

↓

Insurance

↓

Marketing

↓

Sports Analytics

↓

Machine Learning
```

Almost every data-driven company relies on Pandas.

---

# Best Practices

✔ Inspect data before analysis

✔ Clean missing values

✔ Remove duplicates

✔ Use meaningful column names

✔ Create calculated columns when needed

✔ Use GroupBy instead of manual loops

✔ Save cleaned data separately

✔ Document every transformation

---

# End-to-End Workflow

```text
Read CSV

↓

Inspect

↓

Clean

↓

Transform

↓

Analyze

↓

Visualize

↓

Report

↓

Business Decision
```

This is the complete lifecycle of a data analysis project.

---

# Memory Trick

Remember

```text
LECFGMVE
```

**L**

Load

↓

**E**

Explore

↓

**C**

Clean

↓

**F**

Filter

↓

**G**

Group

↓

**M**

Merge

↓

**V**

Visualize

↓

**E**

Export

This sequence represents a complete real-world Pandas workflow.

---

# Common Beginner Mistakes

### Mistake 1

Jumping directly into analysis.

Always inspect the dataset first using

```python
head()

info()

describe()
```

---

### Mistake 2

Ignoring missing values.

Missing data can produce incorrect statistics and poor machine learning models.

---

### Mistake 3

Using loops instead of Pandas operations.

Prefer

- Vectorized operations
- GroupBy
- Merge
- Apply

These are faster and more readable.

---

### Mistake 4

Modifying the original dataset without keeping a backup.

Always preserve the raw data and save cleaned versions separately.

---

# Interview Questions & Answers

## Q1. What is the typical Data Analysis workflow?

### Answer

A common workflow is:

1. Load the data
2. Explore the dataset
3. Clean missing and duplicate values
4. Transform or engineer features
5. Analyze using filtering and grouping
6. Visualize insights
7. Export results

---

## Q2. Why is feature engineering important?

### Answer

Feature engineering creates new variables from existing data,

such as calculating

```python
Total = Price × Quantity
```

These new features often improve analysis and machine learning model performance.

---

## Q3. Why should you inspect a dataset before cleaning it?

### Answer

Inspecting the dataset helps identify

- Missing values
- Incorrect data types
- Duplicate records
- Outliers
- Column meanings

This ensures appropriate cleaning strategies.

---

## Q4. Why is Pandas preferred for real-world data analysis?

### Answer

Pandas provides powerful tools for

- Loading data
- Cleaning data
- Filtering
- Grouping
- Merging
- Time-series analysis

allowing analysts to process large datasets efficiently.

---

## Q5. What are the most commonly used Pandas functions in data analysis?

### Answer

Some of the most frequently used functions include:

- `read_csv()`
- `head()`
- `info()`
- `describe()`
- `groupby()`
- `merge()`
- `fillna()`
- `drop_duplicates()`
- `sort_values()`
- `to_csv()`

These functions form the foundation of most Pandas workflows.

---

# Chapter Summary / Cheat Sheet

| Task | Function |
|------|----------|
| Load Data | `pd.read_csv()` |
| Explore | `head()`, `info()`, `describe()` |
| Clean | `fillna()`, `drop_duplicates()` |
| Filter | Boolean Indexing |
| Create Features | New Columns |
| Group | `groupby()` |
| Merge | `merge()` |
| Sort | `sort_values()` |
| Visualize | `plot()` |
| Export | `to_csv()`, `to_excel()` |

---

# Module 15 Complete ✅

You have now mastered Pandas:

- Series
- DataFrame
- Reading Data
- Data Cleaning
- Missing Values
- Duplicate Handling
- GroupBy
- Aggregation
- Merge & Join
- DateTime Operations
- Window Functions
- Feature Engineering
- Real-world Data Analysis

Pandas is one of the most important libraries in Python and is the standard tool for data analysis in industries such as finance, healthcare, marketing, e-commerce, and machine learning.

---

# What's Next?

In **Module 16 — Data Visualization**, you'll learn how to present data visually using:

- **Matplotlib** for creating fundamental charts
- **Seaborn** for statistical visualizations
- **Plotly** for interactive dashboards and web-based visualizations

Data visualization transforms raw numbers into meaningful insights, making it an essential skill for every data analyst and data scientist.