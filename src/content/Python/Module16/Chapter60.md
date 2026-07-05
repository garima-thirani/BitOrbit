# Module 16 — Data Visualization

# Chapter 60 — Matplotlib

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Data Visualization?
- What is Matplotlib?
- Installing Matplotlib
- Creating Your First Plot
- Figure & Axes
- Line Charts
- Bar Charts
- Scatter Plots
- Histograms
- Pie Charts
- Customizing Charts
- Saving Figures
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine your manager gives you this data.

```text
January   12000

February  18000

March     25000

April     21000

May       28000
```

Can you immediately identify

- The trend?
- The highest month?
- Growth rate?

Not easily.

Now imagine the same data as a graph.

```text
Sales

^

|

|        *

|      *   *

|   *

| *

+-------------------->

Jan Feb Mar Apr May
```

Within seconds,

the trend becomes obvious.

This is the power of **Data Visualization**.

---

# Story — Weather Forecast

Imagine a weather report.

Instead of saying

```text
Monday : 25°C

Tuesday : 28°C

Wednesday : 31°C
```

television shows

a temperature graph.

Humans understand visuals

much faster than tables.

Matplotlib helps Python do exactly that.

---

# Why Visualization?

Raw data

```text
100

120

130

150

170
```

Graph

```text
*

 * 

  *

    *

      *
```

Visualization reveals

- Trends
- Patterns
- Outliers
- Relationships

that are difficult to notice in tables.

---

# What is Matplotlib?

Matplotlib is Python's most popular plotting library.

It is used for

- Data Science
- Machine Learning
- Scientific Computing
- Research
- Business Reports

Many other libraries,

such as **Seaborn**,

are built on top of Matplotlib.

---

# Installing Matplotlib

```bash
pip install matplotlib
```

Import

```python
import matplotlib.pyplot as plt
```

`plt`

is the standard alias.

---

# Your First Plot

```python
import matplotlib.pyplot as plt

x = [1,2,3,4]

y = [2,4,6,8]

plt.plot(x,y)

plt.show()
```

Output

A simple line chart.

---

# How Matplotlib Works

Visualization

```text
Data

↓

Plot

↓

Customize

↓

Show
```

The workflow is always similar.

---

# Figure and Axes

Every chart has

```text
Figure

↓

Entire Canvas

----------------

Axes

↓

Actual Plot Area
```

Think of

the **Figure**

as the paper,

and

the **Axes**

as the graph drawn on it.

---

# Creating a Figure

```python
plt.figure(

figsize=(8,5)

)
```

This creates

an 8 × 5 inch figure.

---

# Line Chart

The most common chart.

Example

```python
months = [

"Jan",

"Feb",

"Mar",

"Apr"

]

sales = [

10,

15,

12,

20

]

plt.plot(

months,

sales

)

plt.show()
```

Best for

showing trends over time.

---

# Adding Labels

```python
plt.xlabel(

"Month"

)

plt.ylabel(

"Sales"

)

plt.title(

"Monthly Sales"

)
```

Every professional graph

should include

labels and a title.

---

# Adding a Grid

```python
plt.grid(True)
```

Improves readability.

---

# Changing Line Style

Example

```python
plt.plot(

x,

y,

linestyle="--",

marker="o"

)
```

Popular line styles

```text
-

--

:

-.
```

Popular markers

```text
o

s

^

*

+
```

---

# Bar Chart

Used for

category comparison.

Example

```python
products = [

"A",

"B",

"C"

]

sales = [

40,

55,

30

]

plt.bar(

products,

sales

)

plt.show()
```

---

# When to Use Bar Charts?

Good for

```text
Sales by Product

↓

Students by Class

↓

Population by Country
```

Comparing categories.

---

# Scatter Plot

Used to show

relationships

between variables.

Example

```python
height = [

150,

160,

170,

180

]

weight = [

50,

60,

72,

82

]

plt.scatter(

height,

weight

)

plt.show()
```

Useful in

Machine Learning

to identify correlations.

---

# Histogram

Shows

distribution

of data.

Example

```python
plt.hist(

marks

)
```

Useful for

- Exam Scores
- Salaries
- Age Distribution

---

# Pie Chart

Shows

parts of a whole.

Example

```python
sizes = [

40,

35,

25

]

labels = [

"A",

"B",

"C"

]

plt.pie(

sizes,

labels=labels,

autopct="%1.1f%%"

)

plt.show()
```

Best when

the total equals

100%.

---

# Customizing Colors

Example

```python
plt.bar(

products,

sales,

color="green"

)
```

Popular colors

```text
red

blue

green

orange

purple
```

---

# Figure Size

```python
plt.figure(

figsize=(10,6)

)
```

Useful for

large datasets

and presentations.

---

# Legend

Suppose

multiple lines exist.

```python
plt.legend()
```

Helps identify

each line.

---

# Saving Charts

Instead of

displaying

the graph,

save it.

```python
plt.savefig(

"sales.png"

)
```

Common formats

```text
PNG

PDF

SVG

JPEG
```

---

# Closing Figures

```python
plt.close()
```

Useful when

creating

many plots

inside loops.

---

# Choosing the Right Chart

| Chart | Best For |
|--------|----------|
| Line | Trends over time |
| Bar | Category comparison |
| Scatter | Relationships |
| Histogram | Distribution |
| Pie | Part-to-whole |

---

# Real-World Example

Imagine an e-commerce company.

Questions

```text
Monthly Sales

↓

Line Chart

------------------

Sales by Category

↓

Bar Chart

------------------

Customer Ages

↓

Histogram

------------------

Product Share

↓

Pie Chart
```

Choosing the correct chart

helps communicate insights effectively.

---

# Plotting Workflow

```text
Load Data

↓

Prepare Data

↓

Choose Chart

↓

Customize

↓

Display

↓

Save
```

---

# Memory Trick

Remember

```text
LBSHP
```

**L**

Line

↓

**B**

Bar

↓

**S**

Scatter

↓

**H**

Histogram

↓

**P**

Pie

These are the five most commonly used Matplotlib charts.

---

# Common Beginner Mistakes

### Mistake 1

Forgetting

```python
plt.show()
```

Without it,

the graph may not appear in standard Python scripts.

---

### Mistake 2

Using the wrong chart type.

For example,

using a pie chart to show trends over time.

Choose charts based on the nature of the data.

---

### Mistake 3

Creating charts without labels.

Always include

- Title
- X-axis label
- Y-axis label

to make the graph understandable.

---

### Mistake 4

Overloading a chart with too much information.

Keep visualizations simple,

clear,

and focused on one message.

---

# Interview Questions & Answers

## Q1. What is Matplotlib?

### Answer

Matplotlib is Python's primary plotting library.

It provides tools for creating static,

interactive,

and publication-quality visualizations,

including line,

bar,

scatter,

histogram,

and pie charts.

---

## Q2. What is the difference between a Figure and Axes?

### Answer

A **Figure** is the entire drawing canvas.

An **Axes** is the actual plotting area where charts are drawn.

A single Figure can contain multiple Axes (subplots).

---

## Q3. When should you use a Scatter Plot?

### Answer

Scatter plots are used to visualize relationships between two numerical variables,

such as

- Height vs Weight
- Advertising Spend vs Revenue
- Study Hours vs Exam Scores

They help identify trends,

clusters,

and correlations.

---

## Q4. What is a Histogram used for?

### Answer

A Histogram shows the distribution of numerical data.

It helps understand

- Frequency
- Spread
- Skewness
- Outliers

within a dataset.

---

## Q5. How do you save a Matplotlib figure?

### Answer

Use

```python
plt.savefig("figure.png")
```

This saves the current figure to a file.

Supported formats include PNG,

PDF,

SVG,

and JPEG.

---

# Chapter Summary / Cheat Sheet

| Function | Purpose |
|----------|----------|
| `plt.plot()` | Line Chart |
| `plt.bar()` | Bar Chart |
| `plt.scatter()` | Scatter Plot |
| `plt.hist()` | Histogram |
| `plt.pie()` | Pie Chart |
| `plt.xlabel()` | X-axis Label |
| `plt.ylabel()` | Y-axis Label |
| `plt.title()` | Chart Title |
| `plt.grid()` | Show Grid |
| `plt.legend()` | Display Legend |
| `plt.savefig()` | Save Figure |
| `plt.show()` | Display Chart |

---

# What's Next?

In **Chapter 61 — Seaborn**, you'll learn how to create beautiful statistical visualizations with minimal code:

- Seaborn Basics
- Statistical Charts
- Distribution Plots
- Box Plots
- Heatmaps
- Pair Plots
- Correlation Analysis

Seaborn builds on Matplotlib and is widely used for exploratory data analysis (EDA) and machine learning visualization.