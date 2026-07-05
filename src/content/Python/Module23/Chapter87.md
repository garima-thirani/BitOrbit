# Module 23 — Production Projects

# Chapter 87 — Automation Tool

---

# Learning Objectives

By the end of this chapter, you will understand:

- Project Overview
- Automation Tool Architecture
- Project Structure
- Configuration Management
- File Automation
- Scheduling
- Logging
- Email Notifications
- Error Recovery
- Deployment
- Best Practices
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine working in a company where every morning someone manually performs

```text
Download Reports

↓

Rename Files

↓

Move Files

↓

Generate Summary

↓

Email Manager

↓

Backup Data
```

Doing this manually every day

is repetitive,

time-consuming,

and prone to mistakes.

Instead,

we can build

a Python Automation Tool

that performs everything automatically.

---

# Project Goal

We will build

a

```text
Daily Automation Tool
```

Features

```text
Monitor Folder

↓

Process Files

↓

Generate Reports

↓

Email Results

↓

Backup Files

↓

Write Logs
```

---

# Technology Stack

```text
Python

↓

pathlib

↓

shutil

↓

schedule

↓

logging

↓

smtplib

↓

JSON Configuration
```

---

# System Architecture

```text
Scheduler

↓

Automation Engine

↓

File Processing

↓

Logging

↓

Email Service

↓

Backup
```

Each module

has a specific responsibility.

---

# Project Structure

```text
automation_tool/

│

├── main.py

├── config.py

├── scheduler.py

├── file_processor.py

├── email_service.py

├── logger.py

├── backup.py

├── config.json

├── logs/

└── README.md
```

A modular structure

makes the project

easy to maintain.

---

# Configuration File

Instead of

hardcoding values,

store them in

```json
{
    "watch_folder": "Documents",
    "backup_folder": "Backup",
    "email": "admin@example.com"
}
```

Load configuration

at startup.

---

# Reading Configuration

```python
import json

with open(

"config.json"

) as file:

    config = json.load(file)
```

Now

settings

can change

without modifying code.

---

# Monitoring a Folder

Workflow

```text
Watch Folder

↓

New File?

↓

Yes

↓

Process File
```

Example

```python
from pathlib import Path

folder = Path("Documents")

for file in folder.iterdir():

    print(file.name)
```

---

# File Processing

Suppose

a CSV file arrives.

Automation

```text
Read File

↓

Validate

↓

Transform

↓

Save Output
```

The same pipeline

works for

JSON,

Excel,

or PDF files.

---

# Backup

Before processing,

create

a backup.

Example

```python
import shutil

shutil.copy(

source,

destination

)
```

This protects

against accidental data loss.

---

# Scheduling Tasks

Install

```bash
pip install schedule
```

Example

```python
import schedule

schedule.every().day.at(

"09:00"

).do(run_job)
```

The task

runs automatically

every day.

---

# Logging

Every action

should be logged.

Example

```python
import logging

logging.info(

"File Processed"

)
```

Example log

```text
09:00

Report Generated

09:01

Email Sent

09:02

Backup Completed
```

---

# Email Notification

After processing,

send

a notification.

Workflow

```text
Generate Report

↓

Attach File

↓

Send Email

↓

Done
```

Example

```python
server.sendmail(

sender,

receiver,

message

)
```

---

# Error Recovery

Automation

should never stop

because of

one failed file.

Example

```python
try:

    process_file()

except Exception as e:

    logging.error(e)
```

The next file

continues processing.

---

# Retry Logic

Sometimes

errors are temporary.

Example

```text
Network Error

↓

Wait

↓

Retry

↓

Success
```

Retrying

can improve reliability.

---

# End-to-End Workflow

```text
Scheduler

↓

Check Folder

↓

Read Files

↓

Process Data

↓

Create Backup

↓

Generate Report

↓

Send Email

↓

Write Logs

↓

Finish
```

---

# Deployment

Run

the automation tool

on

```text
Windows Server

↓

Linux Server

↓

Cloud VM

↓

Docker Container
```

The tool

can operate

24/7.

---

# Real-World Example

Imagine

an accounting department.

Every night

the automation tool

```text
Downloads Sales Data

↓

Processes CSV

↓

Generates Excel Report

↓

Emails Finance Team

↓

Archives Files
```

No manual work

is required.

---

# Production Features

A professional automation tool

should include

```text
Configuration

↓

Logging

↓

Scheduling

↓

Backup

↓

Notifications

↓

Error Recovery
```

---

# Memory Trick

Remember

```text
SPFBEL
```

**S**

Schedule

↓

**P**

Process

↓

**F**

Files

↓

**B**

Backup

↓

**E**

Email

↓

**L**

Logs

These represent

the complete automation pipeline.

---

# Best Practices

✔ Separate configuration from code

✔ Log every important action

✔ Validate input files

✔ Create backups before modifying data

✔ Retry temporary failures

✔ Keep modules independent

✔ Test scheduled tasks

✔ Notify users of failures

---

# Common Beginner Mistakes

### Mistake 1

Hardcoding

file paths

inside source code.

Use configuration files

instead.

---

### Mistake 2

Skipping backups.

Always preserve

original files

before processing.

---

### Mistake 3

Stopping

the entire workflow

because

one file fails.

Handle errors

gracefully.

---

### Mistake 4

Ignoring logs.

Without logs,

production failures

are difficult to investigate.

---

# Interview Questions & Answers

## Q1. Why should automation tools use configuration files?

### Answer

Configuration files separate settings from source code,

allowing applications to be modified without changing program logic.

---

## Q2. Why is logging essential in automation?

### Answer

Logging records execution details,

errors,

and completed tasks,

making troubleshooting and monitoring much easier.

---

## Q3. Why create backups before processing files?

### Answer

Backups protect original data,

allowing recovery if processing fails or produces incorrect results.

---

## Q4. What is the purpose of task scheduling?

### Answer

Scheduling automatically executes tasks at predefined times,

eliminating the need for manual execution.

---

## Q5. How should automation tools handle errors?

### Answer

Automation tools should catch exceptions,

log failures,

retry temporary errors when appropriate,

and continue processing other tasks whenever possible.

---

# Chapter Summary / Cheat Sheet

| Component | Purpose |
|-----------|---------|
| Configuration | Store settings |
| Scheduler | Execute tasks automatically |
| File Processor | Process input files |
| Backup | Protect original files |
| Logging | Record execution |
| Email Service | Notify users |
| Error Handling | Recover from failures |
| Retry Logic | Handle temporary errors |
| Deployment | Run automation continuously |

---

# What's Next?

In **Chapter 88 — Data Analytics Project**, you'll build a complete end-to-end data analytics application using:

- Pandas
- NumPy
- Matplotlib
- Seaborn
- Data Cleaning
- Exploratory Data Analysis (EDA)
- Dashboard Creation
- Business Insights

This project demonstrates how professional data analysts transform raw data into actionable insights.