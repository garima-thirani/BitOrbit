# Module 20 — Python for AI & Machine Learning

# Chapter 77 — AI Workflows

---

# Learning Objectives

By the end of this chapter, you will understand:

- What is an AI Workflow?
- Prompt Engineering
- System, User & Assistant Prompts
- Context Windows
- RAG (Retrieval-Augmented Generation)
- Embeddings & Retrieval
- AI Pipelines
- Tool Calling
- AI Agents
- Production AI Architecture
- Best Practices
- Common Mistakes
- Interview Questions & Answers

---

# Introduction

Imagine you're building an AI assistant for a company.

Users ask questions like

```text
Where is our HR Policy?

↓

Summarize this PDF

↓

Generate an Email

↓

Answer Customer Questions
```

A simple LLM alone

is often not enough.

Modern AI applications combine

LLMs,

databases,

retrieval,

and tools.

This complete process is called

```text
AI Workflow
```

---

# Story — Research Assistant

Imagine hiring

a research assistant.

Instead of answering immediately,

the assistant

```text
Receives Question

↓

Searches Library

↓

Reads Documents

↓

Finds Relevant Information

↓

Writes Answer
```

Modern AI systems

follow the same workflow.

---

# What is an AI Workflow?

An AI Workflow

is a sequence of steps

that transforms

user input

into

an intelligent response.

Visualization

```text
User

↓

Prompt

↓

LLM

↓

Tools

↓

Response
```

---

# AI Workflow Overview

Modern AI systems

usually follow

```text
User

↓

Prompt

↓

Retrieve Information

↓

LLM

↓

Generate Response

↓

User
```

---

# Prompt Engineering

A prompt

is the instruction

given to the AI.

Example

```text
Explain Python decorators
for beginners.
```

Better prompts

usually produce

better responses.

---

# Good Prompt Example

Instead of

```text
Explain AI.
```

Use

```text
Explain Artificial Intelligence
to a beginner using simple
examples in under 300 words.
```

Specific prompts

lead to

more useful answers.

---

# Types of Prompts

Most LLM applications

use three prompt types.

```text
System Prompt

↓

User Prompt

↓

Assistant Response
```

---

# System Prompt

The System Prompt

defines

the AI's behavior.

Example

```text
You are a Python tutor.
Explain concepts simply.
```

---

# User Prompt

The User Prompt

contains

the actual question.

Example

```text
What is recursion?
```

---

# Assistant Response

The LLM generates

the final answer

based on

- System Prompt
- User Prompt
- Available Context

---

# Context Window

LLMs have

a limited memory

called the

```text
Context Window
```

It includes

```text
Instructions

↓

Conversation

↓

Documents

↓

Current Prompt
```

If too much information

is provided,

older content

may no longer fit

within the model's context.

---

# What is RAG?

RAG stands for

```text
Retrieval-Augmented Generation
```

Instead of relying

only on

the model's training,

RAG retrieves

relevant documents

before generating an answer.

---

# Why RAG?

Without RAG

```text
Question

↓

LLM

↓

Answer
```

With RAG

```text
Question

↓

Search Documents

↓

Relevant Context

↓

LLM

↓

Answer
```

The answer

is grounded

in retrieved information.

---

# RAG Workflow

```text
User Question

↓

Embedding

↓

Vector Database

↓

Relevant Documents

↓

LLM

↓

Final Response
```

This is one of the most common

AI application architectures today.

---

# Embeddings

Documents

are converted into

embeddings.

Visualization

```text
Document

↓

Embedding

↓

Vector Database
```

Similar meanings

produce

similar vectors.

---

# Retrieval

When the user asks

a question,

the system

finds

the most relevant documents

using similarity search.

Example

```text
Question

↓

Embedding

↓

Vector Search

↓

Top Documents
```

---

# AI Pipelines

An AI pipeline

connects

multiple components.

Example

```text
User Input

↓

Validation

↓

Retrieval

↓

LLM

↓

Post-processing

↓

Response
```

Each stage

performs

a specific task.

---

# Tool Calling

Modern LLMs

can use external tools.

Examples

```text
Calculator

↓

Weather API

↓

Database

↓

Email Service

↓

Search Engine
```

Instead of guessing,

the AI

calls a tool

to obtain accurate information.

---

# AI Agent

An AI Agent

can

reason,

plan,

and use tools

to accomplish goals.

Example

```text
User

↓

Plan

↓

Search

↓

Calculate

↓

Write Report

↓

Return Result
```

Unlike a simple chatbot,

an agent

can perform

multiple actions.

---

# Production AI Architecture

A typical production AI system

looks like this.

```text
Frontend

↓

API

↓

Authentication

↓

LLM

↓

Vector Database

↓

Business Database

↓

External Tools
```

Every component

works together

to provide

accurate,

secure,

and scalable AI services.

---

# Example Workflow

Imagine

an HR assistant.

```text
Employee

↓

Ask Question

↓

Search HR Documents

↓

Retrieve Policies

↓

LLM Summarizes

↓

Answer Returned
```

This is

a Retrieval-Augmented Generation system.

---

# AI Workflow Lifecycle

```text
Collect Data

↓

Prepare Documents

↓

Generate Embeddings

↓

Store in Vector Database

↓

Retrieve

↓

Generate Response

↓

Evaluate
```

---

# Real-World Applications

AI Workflows power

- Customer Support Bots
- AI Search Engines
- Coding Assistants
- Legal Research
- Medical Assistants
- Enterprise Knowledge Bases
- Document Summarization
- Intelligent Automation

---

# Memory Trick

Remember

```text
PRRGT
```

**P**

Prompt

↓

**R**

Retrieve

↓

**R**

Reason

↓

**G**

Generate

↓

**T**

Tool

This represents

the core stages

of modern AI workflows.

---

# Best Practices

✔ Write clear system prompts

✔ Keep prompts specific

✔ Use RAG for company knowledge

✔ Validate AI-generated responses

✔ Protect sensitive data

✔ Log AI interactions when appropriate

✔ Evaluate outputs regularly

✔ Use tool calling instead of guessing when external data is needed

---

# Common Beginner Mistakes

### Mistake 1

Assuming

LLMs know

current company information.

Use RAG

or other retrieval mechanisms

to provide up-to-date knowledge.

---

### Mistake 2

Writing vague prompts.

Specific instructions

usually produce

higher-quality responses.

---

### Mistake 3

Trusting every AI response

without verification.

LLMs can make mistakes,

especially in high-stakes domains.

---

### Mistake 4

Using AI without access controls.

Sensitive information

should be protected

through authentication,

authorization,

and careful data handling.

---

# Interview Questions & Answers

## Q1. What is Prompt Engineering?

### Answer

Prompt Engineering is the practice of designing clear,

specific,

and effective instructions that guide an LLM to produce useful and accurate responses.

---

## Q2. What is RAG?

### Answer

RAG (Retrieval-Augmented Generation)

combines information retrieval with language generation.

Relevant documents are retrieved first,

then provided to the LLM,

allowing responses to be grounded in external knowledge.

---

## Q3. Why are embeddings used in AI systems?

### Answer

Embeddings convert text into numerical vectors that capture semantic meaning.

They enable similarity search,

recommendations,

and document retrieval in vector databases.

---

## Q4. What is an AI Agent?

### Answer

An AI Agent is an AI system that can plan,

reason,

use tools,

and perform multiple actions to accomplish a user's goal rather than simply generating text.

---

## Q5. What is the difference between a simple chatbot and a RAG system?

### Answer

A simple chatbot generates answers using only the model's knowledge and provided context.

A RAG system first retrieves relevant documents from an external knowledge base,

then uses those documents to generate more grounded and up-to-date responses.

---

# Chapter Summary / Cheat Sheet

| Concept | Purpose |
|----------|----------|
| Prompt | Instruction to the AI |
| System Prompt | Define AI behavior |
| User Prompt | User request |
| Context Window | Information available to the model |
| RAG | Retrieve documents before generation |
| Embedding | Numerical representation of text |
| Vector Database | Store embeddings |
| Retrieval | Find relevant documents |
| AI Pipeline | End-to-end AI process |
| Tool Calling | Use external services |
| AI Agent | Plan and perform multiple actions |

---

# Module 20 Complete ✅

You have now mastered Python for AI & Machine Learning:

- Scientific Computing
- Jupyter Notebook
- NumPy Ecosystem
- Machine Learning Workflow
- Feature Engineering
- Model Training
- Model Evaluation
- Deep Learning
- Neural Networks
- TensorFlow
- PyTorch
- LLM Ecosystem
- Hugging Face
- OpenAI APIs
- LangChain
- Prompt Engineering
- RAG
- AI Pipelines
- AI Workflows

You now have the foundational knowledge required to build modern AI applications, from traditional machine learning models to retrieval-based LLM systems and production-ready AI workflows.

---
