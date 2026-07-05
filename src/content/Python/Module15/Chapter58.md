# Module 15 — Pandas

# Chapter 58 — DateTime & Window Functions

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why DateTime Matters
- Pandas DateTime Objects
- `to_datetime()`
- Extracting Date Components
- Date Filtering
- Date Arithmetic
- Date Offsets
- Window Functions
- Rolling Windows
- Expanding Windows
- Cumulative Functions
- Practical Examples
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you work at a bank.

Every transaction has

```text
Date

↓

Time

↓

Amount
```

Questions like

- Sales this month?
- Revenue last year?
- Average sales over the last 7 days?
- Highest stock price in the previous 30 days?

all depend on **DateTime Analysis**.

Pandas provides powerful tools for working with dates and time-series data.

---

# Story — Weather Station

Imagine a weather station recording temperatures.

```text
Monday

↓

Tuesday

↓

Wednesday

↓

Thursday
```

A scientist wants answers like

- Average temperature this week
- Rainfall last month
- Hottest day

Instead of calculating manually,

Pandas performs these calculations automatically.

---

# Why DateTime?

Most real-world datasets contain dates.

Examples

```text
Orders

↓

Payments

↓

Sensor Data

↓

Stock Prices

↓

Hospital Records
```

Without proper DateTime handling,

analysis becomes difficult.

---

# Creating DateTime

Suppose

```python
date = "2025-01-15"
```

This is just a string.

Convert it into a DateTime object.

```python
import pandas as pd

date = pd.to_datetime(

"2025-01-15"

)

print(date)
```

Output

```text
2025-01-15 00:00:00
```

---

# Why Convert?

Strings cannot answer questions like

```text
Next Month

↓

Previous Year

↓

Week Number
```

DateTime objects can.

---

# Converting a Column

Example

```python
df["Date"] = pd.to_datetime(

df["Date"]

)
```

Always convert date columns before analysis.

---

# Current Date & Time

```python
pd.Timestamp.now()
```

Output

```text
2025-06-20 10:45:15
```

Useful for timestamps,

logging,

and real-time applications.

---

# Date Components

Once converted,

individual components become available.

Example

```python
df["Date"].dt.year
```

Returns

```text
2024

2025

2026
```

---

# Month

```python
df["Date"].dt.month
```

Output

```text
1

2

3
```

---

# Day

```python
df["Date"].dt.day
```

---

# Weekday

```python
df["Date"].dt.day_name()
```

Output

```text
Monday

Tuesday

Friday
```

---

# Hour

```python
df["Date"].dt.hour
```

Useful

for log files,

IoT,

and sensor analysis.

---

# Date Filtering

Suppose

you only want

orders after

January 1, 2025.

```python
df[

df["Date"] >

"2025-01-01"

]
```

Returns

only matching rows.

---

# Date Range

```python
pd.date_range(

start="2025-01-01",

end="2025-01-10"

)
```

Output

```text
10 Consecutive Dates
```

Useful for

time-series generation.

---

# Date Arithmetic

Example

```python
date = pd.Timestamp(

"2025-01-01"

)

print(

date +

pd.Timedelta(

days=5

)

)
```

Output

```text
2025-01-06
```

---

# Timedelta

Represents

time differences.

Example

```python
pd.Timedelta(

days=10

)
```

Can also use

```text
Hours

Minutes

Seconds
```

---

# Date Offsets

Example

```python
from pandas.tseries.offsets import MonthEnd

date + MonthEnd(1)
```

Moves

to the end

of the month.

Useful in

financial analysis.

---

# Window Functions

Imagine

daily sales.

```text
100

120

150

130

180
```

Instead of analyzing

one day,

analyze

the previous

3 days together.

This is called

a

```text
Rolling Window
```

---

# Rolling Window

Example

```python
df["Sales"].rolling(

3

).mean()
```

Output

```text
NaN

NaN

123

133

153
```

Each value

is the average

of the previous

3 rows.

---

# Rolling Sum

```python
df["Sales"].rolling(

7

).sum()
```

Calculates

7-day total sales.

---

# Rolling Maximum

```python
rolling().max()
```

Returns

the maximum value

within each window.

---

# Expanding Window

Unlike rolling,

expanding

includes

all previous rows.

Example

```python
df["Sales"].expanding().mean()
```

Visualization

```text
100

↓

100

----------------

100,120

↓

110

----------------

100,120,150

↓

123
```

Every calculation

uses all previous data.

---

# Cumulative Sum

```python
df["Sales"].cumsum()
```

Example

```text
100

220

370

500
```

Each value

includes

everything before it.

---

# Cumulative Maximum

```python
cummax()
```

Tracks

the highest value

seen so far.

---

# Cumulative Minimum

```python
cummin()
```

Tracks

the smallest value

encountered.

---

# Rolling vs Expanding

| Rolling | Expanding |
|----------|-----------|
| Fixed Window | Growing Window |
| Previous N Rows | All Previous Rows |
| Moving Average | Running Average |

---

# Real-World Example

Imagine stock prices.

```text
Daily Prices

↓

7-Day Average

↓

30-Day Average

↓

Highest Price

↓

Growth Trend
```

Financial analysts

use rolling windows

every day.

---

# Workflow

```text
Load Dataset

↓

Convert Date

↓

Extract Components

↓

Filter Dates

↓

Apply Window Functions

↓

Analyze Trends
```

---

# Memory Trick

Remember

```text
DERC
```

**D**

DateTime

↓

**E**

Extract

↓

**R**

Rolling

↓

**C**

Cumulative

These are the four major concepts of time-series analysis in Pandas.

---

# Common Beginner Mistakes

### Mistake 1

Treating dates as strings.

Always convert date columns using

```python
pd.to_datetime()
```

before performing date operations.

---

### Mistake 2

Using rolling windows without understanding window size.

A window of

```python
rolling(7)
```

means

the previous seven rows,

not necessarily seven calendar days unless the data is daily.

---

### Mistake 3

Confusing rolling and expanding windows.

Rolling uses a fixed-size window.

Expanding includes all previous observations.

---

### Mistake 4

Ignoring missing values at the beginning of rolling calculations.

The first

`window - 1`

rows often produce

```text
NaN
```

because insufficient observations exist.

---

# Interview Questions & Answers

## Q1. Why should you use `pd.to_datetime()`?

### Answer

`pd.to_datetime()`

converts strings into Pandas DateTime objects,

enabling date arithmetic,

filtering,

sorting,

and extraction of components such as year,

month,

and weekday.

---

## Q2. What is the difference between Rolling and Expanding windows?

### Answer

A Rolling window considers a fixed number of recent observations.

An Expanding window includes all observations from the beginning of the dataset up to the current row.

---

## Q3. What is a Timedelta?

### Answer

A Timedelta represents the difference between two dates or times.

It can be used to add or subtract days,

hours,

minutes,

or seconds from DateTime objects.

---

## Q4. What is the purpose of `cumsum()`?

### Answer

`cumsum()`

calculates the cumulative total of a column.

Each row contains the sum of all previous values,

including the current one.

---

## Q5. Where are Window Functions used?

### Answer

Window functions are widely used in

- Finance
- Sales Analysis
- Time-Series Forecasting
- Sensor Data
- Business Intelligence

They help identify trends,

moving averages,

and cumulative statistics.

---

# Chapter Summary / Cheat Sheet

| Function | Purpose |
|----------|----------|
| `pd.to_datetime()` | Convert to DateTime |
| `.dt.year` | Extract year |
| `.dt.month` | Extract month |
| `.dt.day` | Extract day |
| `.dt.day_name()` | Weekday name |
| `pd.date_range()` | Generate dates |
| `pd.Timedelta()` | Time difference |
| `rolling()` | Moving window calculations |
| `expanding()` | Running window calculations |
| `cumsum()` | Cumulative sum |
| `cummax()` | Running maximum |
| `cummin()` | Running minimum |

---

# What's Next?

In **Chapter 59 — Real-world Data Analysis**, you'll combine everything you've learned in Pandas to perform a complete data analysis workflow:

- Loading Large Datasets
- Exploring Data
- Cleaning Data
- Filtering & Grouping
- Merging Data
- Visualizing Insights
- Building an End-to-End Analysis Pipeline

This chapter will demonstrate how professional data analysts and data scientists work with real-world datasets from start to finish.