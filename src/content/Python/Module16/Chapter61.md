# Module 16 — Data Visualization

# Chapter 61 — Seaborn

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Seaborn?
- Installing Seaborn
- Relationship with Matplotlib
- Built-in Datasets
- Line Plot
- Bar Plot
- Scatter Plot
- Histogram
- Box Plot
- Violin Plot
- Heatmaps
- Pair Plots
- Customizing Charts
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you create a chart using Matplotlib.

It looks like this.

```text
Simple Line

Simple Colors

Basic Style
```

Now imagine the same chart with

- Better colors
- Professional styling
- Improved readability
- Statistical visualization

without writing much extra code.

That is exactly what **Seaborn** provides.

---

# Story — Decorating a House

Imagine building a house.

Matplotlib builds

the structure.

```text
Walls

↓

Roof

↓

Windows
```

Seaborn decorates it.

```text
Paint

↓

Furniture

↓

Lighting

↓

Beautiful Design
```

Both are useful,

but Seaborn makes visualizations more attractive.

---

# Why Seaborn?

Matplotlib is powerful,

but requires more customization.

Seaborn provides

- Better default themes
- Statistical charts
- Less code
- Better integration with Pandas

---

# What is Seaborn?

Seaborn is

a Python visualization library

built on top of

```text
Matplotlib
```

It specializes in

- Statistical Visualization
- Exploratory Data Analysis (EDA)
- Correlation Analysis

---

# Installing Seaborn

```bash
pip install seaborn
```

Import

```python
import seaborn as sns
```

Standard alias

```python
sns
```

---

# Relationship

```text
Matplotlib

↓

Foundation

-------------------

Seaborn

↓

Beautiful Statistical Graphs
```

Seaborn internally uses Matplotlib.

---

# Built-in Datasets

Seaborn provides sample datasets.

Example

```python
tips = sns.load_dataset(

"tips"

)
```

Other datasets

```text
iris

penguins

titanic

diamonds

flights
```

Excellent for learning.

---

# Viewing Data

```python
tips.head()
```

Just like Pandas.

---

# Line Plot

Example

```python
sns.lineplot(

data=tips,

x="size",

y="total_bill"

)
```

Best for

showing trends.

---

# Scatter Plot

Example

```python
sns.scatterplot(

data=tips,

x="total_bill",

y="tip"

)
```

Useful for

finding relationships.

---

# Bar Plot

Example

```python
sns.barplot(

data=tips,

x="day",

y="total_bill"

)
```

Displays

average values

by category.

---

# Histogram

Example

```python
sns.histplot(

data=tips,

x="total_bill"

)
```

Shows

distribution

of values.

---

# KDE Plot

Kernel Density Estimation

Example

```python
sns.kdeplot(

data=tips,

x="total_bill"

)
```

Produces

a smooth distribution curve

instead of bars.

---

# Box Plot

One of the most important plots

for Data Science.

Example

```python
sns.boxplot(

data=tips,

x="day",

y="total_bill"

)
```

Shows

- Median
- Quartiles
- Outliers

---

# Box Plot Visualization

```text
|

|------

| Box |

|------

|

*

```

The star

represents

an outlier.

---

# Violin Plot

Example

```python
sns.violinplot(

data=tips,

x="day",

y="total_bill"

)
```

Shows

distribution

plus

density.

Think of it as

```text
Box Plot

+

Density Plot
```

---

# Count Plot

Counts

occurrences

of categories.

Example

```python
sns.countplot(

data=tips,

x="day"

)
```

Useful for

categorical variables.

---

# Heatmap

One of the most popular plots.

Example

```python
corr = tips.corr(

numeric_only=True

)

sns.heatmap(

corr,

annot=True

)
```

Displays

correlation

between variables.

---

# Heatmap Visualization

```text
High Correlation

↓

Dark Color

----------------

Low Correlation

↓

Light Color
```

Quickly identifies

relationships.

---

# Pair Plot

One command

creates

multiple scatter plots.

Example

```python
sns.pairplot(

tips

)
```

Shows

every numerical column

against every other numerical column.

Very useful during

Exploratory Data Analysis.

---

# Hue Parameter

One of Seaborn's best features.

Example

```python
sns.scatterplot(

data=tips,

x="total_bill",

y="tip",

hue="sex"

)
```

Different colors

represent

different categories.

---

# Style Parameter

Example

```python
sns.scatterplot(

data=tips,

x="total_bill",

y="tip",

style="smoker"

)
```

Different markers

represent

different groups.

---

# Figure Size

Since Seaborn uses Matplotlib,

you can write

```python
import matplotlib.pyplot as plt

plt.figure(

figsize=(8,5)

)
```

before creating the plot.

---

# Themes

Example

```python
sns.set_theme(

style="darkgrid"

)
```

Popular themes

```text
darkgrid

whitegrid

dark

white

ticks
```

---

# Real-World Example

Suppose

you are analyzing

customer spending.

Questions

```text
Distribution of Bills

↓

Histogram

--------------------

Outliers

↓

Box Plot

--------------------

Relationship

↓

Scatter Plot

--------------------

Correlation

↓

Heatmap
```

Each chart answers

a different business question.

---

# Choosing the Right Plot

| Plot | Best For |
|------|----------|
| Line Plot | Trends |
| Scatter Plot | Relationships |
| Bar Plot | Category Comparison |
| Histogram | Distribution |
| Box Plot | Outliers |
| Violin Plot | Distribution + Density |
| Heatmap | Correlation |
| Pair Plot | Exploratory Data Analysis |

---

# Memory Trick

Remember

```text
LSHBVP
```

**L**

Line Plot

↓

**S**

Scatter Plot

↓

**H**

Heatmap

↓

**B**

Box Plot

↓

**V**

Violin Plot

↓

**P**

Pair Plot

These are the most commonly used Seaborn visualizations.

---

# Common Beginner Mistakes

### Mistake 1

Using Seaborn without Pandas.

Seaborn works best with DataFrames.

---

### Mistake 2

Interpreting correlation as causation.

A strong correlation shown in a heatmap

does not necessarily imply that one variable causes the other.

---

### Mistake 3

Ignoring outliers.

Box plots help detect unusual observations that may affect analysis.

---

### Mistake 4

Using Pair Plots on very large datasets.

Pair plots generate many graphs,

which can become slow and cluttered with high-dimensional data.

---

# Interview Questions & Answers

## Q1. What is Seaborn?

### Answer

Seaborn is a statistical visualization library built on top of Matplotlib.

It provides attractive default styles,

works seamlessly with Pandas,

and simplifies the creation of statistical charts.

---

## Q2. Why use Seaborn instead of Matplotlib?

### Answer

Seaborn offers

- Better default themes
- Simpler syntax
- Statistical visualizations
- Direct support for Pandas DataFrames

Matplotlib provides more low-level customization,

while Seaborn focuses on easier statistical plotting.

---

## Q3. What is a Heatmap?

### Answer

A Heatmap visualizes data using colors.

It is commonly used to display correlation matrices,

where stronger correlations are represented with different color intensities.

---

## Q4. What is the purpose of a Box Plot?

### Answer

A Box Plot summarizes the distribution of numerical data.

It displays

- Median
- Quartiles
- Spread
- Outliers

making it useful for detecting unusual values.

---

## Q5. What is a Pair Plot?

### Answer

A Pair Plot creates scatter plots for every pair of numerical variables

and histograms (or KDE plots) along the diagonal.

It is widely used during exploratory data analysis to identify relationships and patterns.

---

# Chapter Summary / Cheat Sheet

| Function | Purpose |
|----------|----------|
| `sns.lineplot()` | Line Chart |
| `sns.scatterplot()` | Scatter Plot |
| `sns.barplot()` | Bar Chart |
| `sns.histplot()` | Histogram |
| `sns.boxplot()` | Box Plot |
| `sns.violinplot()` | Violin Plot |
| `sns.countplot()` | Count Categories |
| `sns.heatmap()` | Correlation Matrix |
| `sns.pairplot()` | Pairwise Relationships |
| `sns.set_theme()` | Change Theme |

---

# What's Next?

In **Chapter 62 — Plotly & Dashboards**, you'll learn how to build interactive visualizations and dashboards using:

- Plotly Express
- Interactive Charts
- Hover Information
- Zoom & Pan
- Dash Framework
- Building Interactive Dashboards

These tools are widely used in business intelligence, analytics dashboards, and web-based data visualization.