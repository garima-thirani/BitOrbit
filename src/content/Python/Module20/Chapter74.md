# Module 20 — Python for AI & Machine Learning

# Chapter 74 — Machine Learning

---

# Learning Objectives

By the end of this chapter, you will understand:

- What is Machine Learning?
- Machine Learning Workflow
- Scikit-learn Overview
- Feature Engineering
- Feature Scaling
- Train/Test Split
- Model Training
- Model Prediction
- Model Evaluation
- Classification vs Regression
- Cross Validation
- Best Practices
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're building a system that predicts

```text
House Prices

↓

Spam Emails

↓

Customer Churn

↓

Medical Diagnosis
```

Instead of writing thousands of rules,

the computer learns

from historical data.

This is called

```text
Machine Learning
```

---

# Story — Learning to Ride a Bicycle

Imagine teaching a child

to ride a bicycle.

You don't explain

every balance equation.

Instead,

the child practices,

makes mistakes,

learns,

and improves.

Machine Learning models

learn from examples

in the same way.

---

# What is Machine Learning?

Machine Learning (ML)

is a branch of Artificial Intelligence

where computers learn patterns

from data

to make predictions

or decisions

without being explicitly programmed.

---

# Machine Learning Workflow

Every ML project follows

approximately

the same pipeline.

```text
Collect Data

↓

Clean Data

↓

Feature Engineering

↓

Split Data

↓

Train Model

↓

Evaluate Model

↓

Deploy
```

---

# Scikit-learn

Scikit-learn

is Python's most popular

Machine Learning library.

It provides

- Classification
- Regression
- Clustering
- Preprocessing
- Model Evaluation

Install

```bash
pip install scikit-learn
```

---

# Dataset

A dataset consists of

```text
Rows

↓

Samples

----------------

Columns

↓

Features
```

Example

| Area | Bedrooms | Price |
|------|-----------|------|
|1200|2|150000|
|1800|3|240000|

---

# Features and Target

Features

```text
Area

Bedrooms
```

Target

```text
Price
```

In Scikit-learn

```python
X = data[["Area","Bedrooms"]]

y = data["Price"]
```

Convention

```text
X

↓

Input

----------------

y

↓

Output
```

---

# Feature Engineering

Feature Engineering

means creating

better input features

for the model.

Example

Original

```text
Date
```

Create

```text
Year

↓

Month

↓

Weekday
```

These new features

may improve predictions.

---

# Handling Categorical Data

Suppose

a column contains

```text
Red

Blue

Green
```

Computers

cannot understand text directly.

Convert categories

to numbers

using

```text
One-Hot Encoding

↓

Label Encoding
```

---

# Feature Scaling

Different features

may have

different ranges.

Example

```text
Age

25

----------------

Salary

90000
```

Large values

can dominate

smaller values.

Scaling solves this problem.

---

# Standardization

Formula

```text
Mean = 0

Standard Deviation = 1
```

Used by algorithms like

- Logistic Regression
- SVM
- Neural Networks

---

# Normalization

Transforms values

into

```text
0

↓

1
```

Useful when

features

have very different ranges.

---

# Train/Test Split

Never evaluate

a model

using

the same data

used for training.

Instead

split the dataset.

```text
Training Data

80%

----------------

Testing Data

20%
```

Example

```python
from sklearn.model_selection import train_test_split

X_train,

X_test,

y_train,

y_test = train_test_split(

X,

y,

test_size=0.2,

random_state=42

)
```

---

# Model Training

Example

```python
from sklearn.linear_model import LinearRegression

model = LinearRegression()

model.fit(

X_train,

y_train

)
```

The model

learns patterns

from the training data.

---

# Making Predictions

```python
predictions = model.predict(

X_test

)
```

The model predicts

values

for unseen data.

---

# Classification

Classification predicts

categories.

Examples

```text
Spam

↓

Not Spam

----------------

Disease

↓

Healthy

----------------

Cat

↓

Dog
```

---

# Regression

Regression predicts

continuous values.

Examples

```text
House Price

↓

Salary

↓

Temperature

↓

Stock Price
```

---

# Classification vs Regression

| Classification | Regression |
|---------------|------------|
| Predict Category | Predict Number |
| Spam Detection | House Price |
| Disease Prediction | Salary Prediction |
| Fraud Detection | Temperature |

---

# Model Evaluation

After training,

measure performance.

Workflow

```text
Predictions

↓

Compare

↓

Actual Values

↓

Accuracy
```

---

# Accuracy

Used mainly

for classification.

Formula

```text
Correct Predictions

/

Total Predictions
```

Example

95%

means

95 out of 100

predictions

were correct.

---

# Mean Squared Error (MSE)

Used for regression.

Formula

```text
Prediction Error²

↓

Average
```

Smaller

is better.

---

# Cross Validation

Instead of

one train/test split,

train

multiple times

using different splits.

Visualization

```text
Split 1

↓

Split 2

↓

Split 3

↓

Average Score
```

Produces

more reliable results.

---

# Overfitting

Suppose

a student memorizes

every answer

instead of understanding.

Excellent

on old questions.

Poor

on new questions.

This is

```text
Overfitting
```

---

# Underfitting

Suppose

a student

barely studies.

Poor performance

everywhere.

This is

```text
Underfitting
```

---

# Good Model

Ideal model

```text
Learns Patterns

↓

Generalizes Well

↓

Predicts New Data
```

---

# Complete Workflow

```text
Dataset

↓

Clean

↓

Engineer Features

↓

Scale

↓

Split

↓

Train

↓

Predict

↓

Evaluate
```

---

# Real-World Example

Imagine

a bank

predicting

loan approval.

Features

```text
Age

↓

Income

↓

Credit Score

↓

Employment
```

Target

```text
Approve

or

Reject
```

The model

learns

from previous applicants.

---

# Memory Trick

Remember

```text
CFSTPE
```

**C**

Collect Data

↓

**F**

Feature Engineering

↓

**S**

Split

↓

**T**

Train

↓

**P**

Predict

↓

**E**

Evaluate

This represents

the complete ML pipeline.

---

# Best Practices

✔ Collect quality data

✔ Clean missing values

✔ Engineer meaningful features

✔ Scale features when required

✔ Keep training and testing data separate

✔ Evaluate using multiple metrics

✔ Avoid overfitting

---

# Common Beginner Mistakes

### Mistake 1

Training

and testing

on the same dataset.

This gives

unrealistically high accuracy.

---

### Mistake 2

Ignoring feature scaling.

Some algorithms

perform poorly

without standardized features.

---

### Mistake 3

Using accuracy

for every problem.

Different tasks require

different evaluation metrics.

---

### Mistake 4

Believing

more features

always improve performance.

Irrelevant features

can reduce model quality.

---

# Interview Questions & Answers

## Q1. What is Feature Engineering?

### Answer

Feature Engineering is the process of creating,

transforming,

or selecting meaningful input variables

that improve machine learning model performance.

---

## Q2. Why do we split data into training and testing sets?

### Answer

The training set teaches the model,

while the testing set evaluates how well the model performs on unseen data,

helping measure its ability to generalize.

---

## Q3. What is the difference between Classification and Regression?

### Answer

Classification predicts discrete categories,

such as Spam or Not Spam.

Regression predicts continuous numerical values,

such as house prices or temperatures.

---

## Q4. What is Overfitting?

### Answer

Overfitting occurs when a model memorizes the training data

instead of learning general patterns,

leading to poor performance on new data.

---

## Q5. What is Cross Validation?

### Answer

Cross Validation repeatedly splits the dataset into different training and testing sets,

producing a more reliable estimate of model performance than a single train/test split.

---

# Chapter Summary / Cheat Sheet

| Concept | Purpose |
|----------|----------|
| Feature Engineering | Improve input features |
| Feature Scaling | Normalize feature ranges |
| Train/Test Split | Evaluate generalization |
| `model.fit()` | Train model |
| `model.predict()` | Make predictions |
| Classification | Predict categories |
| Regression | Predict numbers |
| Accuracy | Classification metric |
| MSE | Regression metric |
| Cross Validation | Reliable evaluation |
| Overfitting | Memorizes training data |
| Underfitting | Learns too little |

---

# What's Next?

In **Chapter 75 — Deep Learning**, you'll move beyond traditional machine learning and explore neural networks using:

- Artificial Neural Networks (ANNs)
- TensorFlow
- PyTorch
- Forward Propagation
- Backpropagation
- GPUs
- Training Deep Learning Models

This chapter introduces the technology behind modern AI systems such as ChatGPT, image recognition, and speech recognition.