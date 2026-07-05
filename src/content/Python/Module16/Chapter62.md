# Module 16 — Data Visualization

# Chapter 62 — Plotly & Dashboards

---

# Learning Objectives

By the end of this chapter, you will understand:

- Why Plotly?
- Installing Plotly
- Plotly Express
- Interactive Charts
- Line Charts
- Bar Charts
- Scatter Plots
- Pie Charts
- 3D Charts
- Hover Information
- Dashboards
- Dash Framework
- Building a Simple Dashboard
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're presenting a sales report.

Using a normal chart,

you can only look at the graph.

But imagine a chart where you can

- Zoom
- Pan
- Hover over points
- Hide categories
- Download the graph

This is called an **Interactive Visualization**.

Plotly makes this possible.

---

# Story — Paper Map vs Google Maps

Imagine traveling to a new city.

Option 1

Paper Map

```text
Static

↓

Cannot Zoom

↓

Cannot Search
```

Option 2

Google Maps

```text
Interactive

↓

Zoom

↓

Pan

↓

Live Updates
```

Matplotlib is like a paper map.

Plotly is like Google Maps.

---

# Why Plotly?

Traditional charts are static.

Plotly provides

- Interactive graphs
- Zooming
- Hover information
- Animations
- Web-ready visualizations

Widely used in

- Data Science
- Business Intelligence
- Dashboards
- Web Applications

---

# Installing Plotly

```bash
pip install plotly
```

Import

```python
import plotly.express as px
```

The alias

```python
px
```

is the standard convention.

---

# Plotly Express

Plotly Express is

the simplest interface

for creating interactive charts.

Example

```python
fig = px.line(

x=[1,2,3],

y=[2,4,6]

)

fig.show()
```

Instead of

```python
plt.show()
```

Plotly uses

```python
fig.show()
```

---

# Interactive Features

Every Plotly graph automatically supports

```text
Zoom

↓

Pan

↓

Hover

↓

Download

↓

Reset View
```

No extra coding required.

---

# Line Chart

Example

```python
import plotly.express as px

df = px.data.gapminder()

fig = px.line(

df,

x="year",

y="lifeExp",

color="country"

)

fig.show()
```

Useful for

showing trends over time.

---

# Bar Chart

Example

```python
fig = px.bar(

df,

x="country",

y="pop"

)

fig.show()
```

Best for

comparing categories.

---

# Scatter Plot

Example

```python
fig = px.scatter(

df,

x="gdpPercap",

y="lifeExp",

color="continent"

)

fig.show()
```

Useful for

finding relationships

between variables.

---

# Pie Chart

Example

```python
fig = px.pie(

df,

names="continent",

values="pop"

)

fig.show()
```

Displays

parts of a whole.

---

# Histogram

Example

```python
fig = px.histogram(

df,

x="lifeExp"

)

fig.show()
```

Shows

the distribution

of numerical values.

---

# Box Plot

Example

```python
fig = px.box(

df,

x="continent",

y="lifeExp"

)

fig.show()
```

Useful for

finding

outliers

and comparing distributions.

---

# 3D Scatter Plot

One of Plotly's unique strengths.

Example

```python
fig = px.scatter_3d(

df,

x="gdpPercap",

y="lifeExp",

z="pop",

color="continent"

)

fig.show()
```

The graph can be rotated

using the mouse.

---

# Hover Information

Move the mouse

over a point.

You'll see

```text
Country

↓

Population

↓

GDP

↓

Life Expectancy
```

No additional coding is required.

---

# Animations

Plotly supports

animated charts.

Example

```python
fig = px.scatter(

df,

x="gdpPercap",

y="lifeExp",

animation_frame="year"

)
```

The graph changes

as the year changes.

Very useful

for presentations.

---

# Dashboards

A dashboard combines

multiple charts

into

one application.

Example

```text
Sales Chart

↓

Revenue Chart

↓

Customer Chart

↓

Filters
```

Everything appears

on one screen.

---

# What is Dash?

Dash is a Python framework

built on top of

```text
Plotly

+

Flask

+

React
```

It allows you to build

interactive web dashboards

using only Python.

---

# Installing Dash

```bash
pip install dash
```

Import

```python
from dash import Dash
```

---

# Simple Dashboard

Example

```python
from dash import Dash

app = Dash(__name__)

app.run()
```

This starts

a local web application.

---

# Dashboard Components

A dashboard usually contains

```text
Charts

↓

Tables

↓

Dropdowns

↓

Buttons

↓

Filters

↓

KPIs
```

Users can interact

with the dashboard.

---

# Typical Dashboard Workflow

```text
Load Data

↓

Analyze Data

↓

Create Charts

↓

Build Dashboard

↓

Deploy
```

---

# Plotly vs Matplotlib

| Matplotlib | Plotly |
|-------------|---------|
| Static | Interactive |
| Research Papers | Dashboards |
| High Customization | Built-in Interactivity |
| Desktop Focus | Web Focus |

---

# Plotly vs Seaborn

| Seaborn | Plotly |
|----------|---------|
| Statistical Charts | Interactive Charts |
| Static | Interactive |
| Exploratory Analysis | Dashboards |
| Publication Graphics | Business Intelligence |

---

# Real-World Example

Imagine an online shopping company.

Dashboard

```text
Revenue

↓

Monthly Sales

↓

Top Products

↓

Customer Locations

↓

Profit Trends
```

Managers can

click,

zoom,

filter,

and explore

the data interactively.

---

# Memory Trick

Remember

```text
CHART
```

**C**

Charts

↓

**H**

Hover

↓

**A**

Animation

↓

**R**

Reports

↓

**T**

Dashboards

These are Plotly's major strengths.

---

# Common Beginner Mistakes

### Mistake 1

Using Plotly for simple static images.

If only a basic static graph is needed,

Matplotlib is often sufficient.

---

### Mistake 2

Building dashboards before cleaning the data.

Always prepare and validate the dataset before visualization.

---

### Mistake 3

Adding too many interactive elements.

Too many filters,

charts,

or animations can overwhelm users.

Keep dashboards simple and focused.

---

### Mistake 4

Choosing the wrong chart type.

Interactive features improve usability,

but selecting an inappropriate visualization can still mislead users.

---

# Interview Questions & Answers

## Q1. What is Plotly?

### Answer

Plotly is a Python visualization library used to create interactive charts.

It supports zooming,

hover information,

animations,

and 3D visualizations,

making it ideal for business dashboards and web applications.

---

## Q2. What is Plotly Express?

### Answer

Plotly Express is the high-level interface of Plotly.

It allows developers to create interactive charts with minimal code,

similar to how Seaborn simplifies Matplotlib.

---

## Q3. What is Dash?

### Answer

Dash is a Python framework for building interactive web dashboards.

It is built on top of Plotly,

Flask,

and React,

allowing developers to create full-featured analytical web applications without writing JavaScript.

---

## Q4. When should you use Plotly instead of Matplotlib?

### Answer

Use Plotly when users need interactive features such as

- Zooming
- Hover information
- Filtering
- Animations
- Dashboards

Use Matplotlib when creating static charts for reports,

research papers,

or publications.

---

## Q5. What are the main components of a dashboard?

### Answer

A dashboard typically includes

- Charts
- Tables
- KPIs (Key Performance Indicators)
- Filters
- Dropdowns
- Interactive controls

These components help users explore and analyze data efficiently.

---

# Chapter Summary / Cheat Sheet

| Function | Purpose |
|----------|----------|
| `px.line()` | Interactive Line Chart |
| `px.bar()` | Interactive Bar Chart |
| `px.scatter()` | Interactive Scatter Plot |
| `px.pie()` | Interactive Pie Chart |
| `px.histogram()` | Interactive Histogram |
| `px.box()` | Interactive Box Plot |
| `px.scatter_3d()` | 3D Scatter Plot |
| `fig.show()` | Display Interactive Chart |
| `Dash()` | Create Dashboard Application |
| `app.run()` | Start Dashboard Server |

---

# Module 16 Complete ✅

You have now mastered Data Visualization:

- Matplotlib
- Figures & Axes
- Line Charts
- Bar Charts
- Scatter Plots
- Histograms
- Pie Charts
- Seaborn
- Statistical Visualizations
- Heatmaps
- Pair Plots
- Box Plots
- Plotly
- Interactive Charts
- 3D Visualizations
- Dashboards
- Dash Framework

You can now create professional-quality visualizations for reports, dashboards, data science projects, and machine learning applications.

---

# What's Next?

In **Module 17 — Machine Learning with Scikit-learn**, you'll begin practical machine learning by learning:

- Scikit-learn Basics
- Data Preprocessing
- Train/Test Split
- Supervised Learning
- Classification
- Regression
- Model Evaluation
- Pipelines

This module marks the transition from **data analysis** to **building intelligent predictive models**.