# Module 19 — Python Automation

# Chapter 72 — Automation Workflows

---

# Learning Objectives

By the end of this chapter, you will understand:

- What is an Automation Workflow?
- Why Automation Workflows?
- Task Scheduling
- Cron Jobs (Linux/macOS)
- Windows Task Scheduler
- Python Scheduling Library
- Email Automation
- Sending Attachments
- Logging Automated Tasks
- Error Handling
- End-to-End Automation Pipeline
- Best Practices
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you work in a company.

Every day at 9:00 AM,

someone manually performs these tasks.

```text
Download Sales Report

↓

Generate Summary

↓

Create PDF

↓

Email Manager

↓

Backup Files
```

This happens

every single day.

Instead of doing it manually,

Python can perform

the entire process automatically.

This is called

```text
Automation Workflow
```

---

# Story — Factory Assembly Line

Imagine a car factory.

Cars aren't built

by one worker.

Instead,

they pass through

multiple stations.

```text
Parts

↓

Assembly

↓

Painting

↓

Inspection

↓

Delivery
```

Automation workflows work

the same way.

Each step

feeds

the next.

---

# What is an Automation Workflow?

An automation workflow

is a sequence of automated tasks

executed

without manual intervention.

Visualization

```text
Trigger

↓

Task 1

↓

Task 2

↓

Task 3

↓

Finished
```

---

# Why Automation?

Manual

```text
Slow

↓

Repeated

↓

Error-Prone
```

Automation

```text
Fast

↓

Reliable

↓

Repeatable
```

---

# Example Workflow

Imagine

an online store.

Every night

Python performs

```text
Read Orders

↓

Calculate Revenue

↓

Generate Excel Report

↓

Email Report

↓

Backup Database
```

No human interaction required.

---

# Task Scheduling

Automation becomes powerful

when tasks run

automatically

at specific times.

Examples

```text
Every Day

↓

Every Hour

↓

Every Monday

↓

Every Month
```

---

# Cron Jobs (Linux/macOS)

Cron

is a scheduler

built into Unix-based systems.

Example

```bash
0 9 * * * python report.py
```

Meaning

```text
Every Day

↓

9:00 AM

↓

Run report.py
```

---

# Cron Format

```text
Minute

Hour

Day

Month

Weekday
```

Example

```text
0 18 * * 1
```

Means

```text
Every Monday

6:00 PM
```

---

# Windows Task Scheduler

Windows provides

Task Scheduler.

Workflow

```text
Choose Script

↓

Choose Time

↓

Run Automatically
```

No Python code

is required

for scheduling.

---

# Python Scheduling Library

Install

```bash
pip install schedule
```

Import

```python
import schedule
```

---

# Scheduling a Task

Example

```python
import schedule
import time

def job():

    print("Running...")

schedule.every().day.at(

"09:00"

).do(job)

while True:

    schedule.run_pending()

    time.sleep(1)
```

Every day

at

9:00 AM,

`job()`

executes.

---

# Scheduling Every Hour

```python
schedule.every().hour.do(job)
```

---

# Scheduling Every Minute

```python
schedule.every().minute.do(job)
```

Useful

during development

and testing.

---

# Email Automation

Python can send emails

automatically.

Common uses

```text
Daily Reports

↓

Invoices

↓

Notifications

↓

Alerts
```

---

# SMTP

SMTP stands for

```text
Simple Mail Transfer Protocol
```

It is the standard protocol

used for sending emails.

---

# Sending an Email

Example

```python
import smtplib

server = smtplib.SMTP(

"smtp.gmail.com",

587

)
```

This connects

to the email server.

---

# Logging In

```python
server.login(

email,

password

)
```

Use

App Passwords

or

OAuth

instead of

your normal password

when supported.

---

# Sending a Message

```python
server.sendmail(

sender,

receiver,

message

)
```

The email

is delivered

to the recipient.

---

# Email Attachments

Python can attach

```text
PDF

↓

Excel

↓

CSV

↓

Images
```

Useful for

automated reports.

---

# Logging Automation

Every automation

should create logs.

Example

```python
import logging

logging.info(

"Report Generated"

)
```

Logs help

identify

errors

and

track execution.

---

# Error Handling

Automation should

continue safely

even when errors occur.

Example

```python
try:

    generate_report()

except Exception as e:

    logging.error(e)
```

---

# Complete Workflow

Imagine

a daily reporting system.

```text
Read Database

↓

Clean Data

↓

Generate Report

↓

Save PDF

↓

Email Report

↓

Write Log

↓

Finish
```

Everything happens

automatically.

---

# Backup Workflow

Example

```text
Copy Files

↓

Compress Folder

↓

Move Backup

↓

Delete Old Backups

↓

Log Results
```

---

# Monitoring Workflow

Suppose

a website

goes offline.

Automation

```text
Check Website

↓

If Offline

↓

Send Email

↓

Write Log
```

No manual monitoring required.

---

# Real-World Applications

Automation workflows are used for

- Daily Reports
- Email Notifications
- File Backups
- Data Pipelines
- Server Monitoring
- Invoice Generation
- ETL Processes
- Scheduled Data Collection

---

# Workflow Design

A professional automation system

typically follows

```text
Trigger

↓

Collect Data

↓

Process Data

↓

Generate Output

↓

Notify Users

↓

Log Results
```

---

# Memory Trick

Remember

```text
SETLN
```

**S**

Schedule

↓

**E**

Execute

↓

**T**

Task

↓

**L**

Log

↓

**N**

Notify

These are the five stages

of most automation workflows.

---

# Best Practices

✔ Keep automation scripts modular

✔ Log every important action

✔ Handle exceptions gracefully

✔ Test before scheduling

✔ Store credentials securely

✔ Monitor failed jobs

✔ Keep backups

✔ Document workflows

---

# Common Beginner Mistakes

### Mistake 1

Scheduling

untested scripts.

Always verify

the script works correctly

before automating it.

---

### Mistake 2

Ignoring logging.

Without logs,

debugging failed automation becomes difficult.

---

### Mistake 3

Hardcoding email passwords.

Store credentials

using environment variables

or secure secret managers.

---

### Mistake 4

Assuming scheduled tasks

always succeed.

Automation should detect failures,

retry when appropriate,

and notify users if problems occur.

---

# Interview Questions & Answers

## Q1. What is an Automation Workflow?

### Answer

An automation workflow is a sequence of automated tasks executed in a predefined order,

reducing manual work and improving consistency.

---

## Q2. What is Cron?

### Answer

Cron is a scheduling system available on Unix-based operating systems.

It automatically executes commands or scripts at specified dates and times.

---

## Q3. What is the purpose of the `schedule` library?

### Answer

The `schedule` library allows Python programs to run functions at regular intervals,

such as every minute,

every hour,

or at a specific time each day.

---

## Q4. Why is logging important in automation?

### Answer

Logging records what happened during execution,

making it easier to diagnose failures,

monitor performance,

and audit automated processes.

---

## Q5. What are common real-world uses of Python automation?

### Answer

Python automation is widely used for

- Report Generation
- Email Notifications
- File Backups
- Data Collection
- Server Monitoring
- ETL Pipelines
- Scheduled Maintenance Tasks

---

# Chapter Summary / Cheat Sheet

| Concept | Purpose |
|----------|----------|
| Workflow | Sequence of automated tasks |
| Cron | Linux/macOS scheduler |
| Task Scheduler | Windows scheduler |
| `schedule` | Python scheduling library |
| `every().day.at()` | Schedule daily task |
| `SMTP` | Send emails |
| `sendmail()` | Deliver email |
| Logging | Record execution |
| Exception Handling | Handle failures |
| Automation Pipeline | End-to-end workflow |

---

# Module 19 Complete ✅

You have now mastered Python Automation:

- System Automation
- `os`
- `shutil`
- `subprocess`
- Web Scraping
- BeautifulSoup
- Selenium
- Browser Automation
- Task Scheduling
- Cron Jobs
- Windows Task Scheduler
- Email Automation
- Logging
- Automation Workflows

You can now automate repetitive tasks, scrape websites responsibly, manage files, schedule jobs, send reports automatically, and build complete automation pipelines used in real-world businesses.

---

# What's Next?

In **Module 20 — AI & Machine Learning Foundations**, you'll begin your journey into Artificial Intelligence by learning:

- Artificial Intelligence Fundamentals
- Machine Learning Concepts
- Deep Learning Basics
- Neural Networks
- Data Preparation
- Model Training
- Model Evaluation

This module serves as the bridge between traditional Python programming and modern AI development.