# The Ultimate System Design Handbook

# Chapter 2 -- Scalability Fundamentals

# Part 9 -- Case Study: Designing Dropbox (High-Level Design)

> **Theme:** Learn how scalability concepts come together in a real
> system by designing a simplified version of Dropbox.

------------------------------------------------------------------------

# Learning Objectives

By the end of this part you will:

-   Apply scalability fundamentals to a practical system.
-   Identify functional and non-functional requirements.
-   Design a high-level architecture for cloud file storage.
-   Explain design decisions and trade-offs in an interview.

------------------------------------------------------------------------

# Problem Statement

Design a cloud storage system similar to Dropbox where users can:

-   Upload files
-   Download files
-   Synchronize files across devices
-   Share files using links

The service should support millions of users and large files.

------------------------------------------------------------------------

# Step 1 -- Clarify Requirements

## Functional Requirements

-   User authentication
-   File upload
-   File download
-   File synchronization
-   Folder management
-   Shareable links
-   File version history (optional)

## Non-Functional Requirements

-   High availability
-   Durable storage
-   Low download latency
-   Horizontal scalability
-   Secure file access

------------------------------------------------------------------------

# Step 2 -- Capacity Estimation

Assumptions:

-   20 million DAU
-   Average file uploaded/day = 50 MB
-   Total uploads/day ≈ 1 PB
-   Read traffic is much higher than write traffic

Observations:

-   Storage dominates infrastructure cost.
-   Uploads require bandwidth.
-   Metadata is much smaller than file content.

------------------------------------------------------------------------

# Step 3 -- High-Level Architecture

``` text
                 Users
                   │
                   ▼
            Global DNS/CDN
                   │
                   ▼
            Load Balancer
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
  API Servers          Upload Service
        │                     │
        ▼                     ▼
 Metadata DB          Object Storage
        │                     │
        └──────────┬──────────┘
                   ▼
          Sync / Notification Queue
                   │
                   ▼
             Worker Services
```

------------------------------------------------------------------------

# Why These Components Exist

## API Servers

Handle authentication, metadata, sharing, and file operations.

## Upload Service

Streams large files directly to object storage instead of keeping them
in application memory.

## Metadata Database

Stores:

-   File names
-   Owners
-   Permissions
-   Folder hierarchy
-   Object storage references

Never store large binary files inside the relational database.

## Object Storage

Stores the actual file content.

Examples:

-   Amazon S3
-   Google Cloud Storage
-   Azure Blob Storage

Object storage is optimized for durability and massive scale.

## Queue

Background processing:

-   Thumbnail generation
-   Virus scanning
-   Notifications
-   File indexing

Keeping these asynchronous improves upload latency.

------------------------------------------------------------------------

# File Upload Flow

``` text
Client
  │
  ▼
API Server
  │
Authenticate User
  │
Generate Upload Token
  │
Client Uploads File
  │
Object Storage
  │
Metadata Saved
  │
Queue Event Published
```

------------------------------------------------------------------------

# File Download Flow

``` text
Client
   │
   ▼
API Server
   │
Permission Check
   │
Generate Secure URL
   │
Client Downloads
   │
Object Storage / CDN
```

Large files should bypass the application server whenever possible.

------------------------------------------------------------------------

# Synchronization

Each device periodically asks:

"What changed since my last sync?"

The server returns only incremental updates.

Benefits:

-   Less bandwidth
-   Faster synchronization
-   Better battery usage

------------------------------------------------------------------------

# Scaling Considerations

As traffic grows:

-   Add more API servers.
-   Scale upload services independently.
-   Partition metadata database.
-   Use CDN for downloads.
-   Cache frequently accessed metadata.

------------------------------------------------------------------------

# Bottlenecks

Possible bottlenecks include:

-   Metadata database
-   Upload bandwidth
-   Object storage throughput
-   Queue backlog
-   CDN cache misses

Always monitor before optimizing.

------------------------------------------------------------------------

# Trade-offs

  Decision         Benefit            Cost
  ---------------- ------------------ ------------------------
  CDN              Faster downloads   Extra infrastructure
  Queue            Lower latency      Operational complexity
  Object Storage   Durable            Additional network hop
  Metadata DB      Simple queries     Requires scaling later

------------------------------------------------------------------------

# Interview Walkthrough

A strong interview answer should follow this order:

1.  Clarify requirements.
2.  Estimate scale.
3.  Design APIs.
4.  Draw HLD.
5.  Explain upload flow.
6.  Explain download flow.
7.  Discuss scaling.
8.  Identify bottlenecks.
9.  Explain trade-offs.

------------------------------------------------------------------------

# Common Mistakes

-   Storing files inside relational databases.
-   Sending every download through application servers.
-   Forgetting synchronization.
-   Ignoring background processing.
-   Not separating metadata from file content.

------------------------------------------------------------------------

# Memory Trick

Remember:

**Metadata is small.**

**Files are huge.**

Treat them differently.

------------------------------------------------------------------------

# Dependency Map

``` text
Scalability
     │
     ▼
Dropbox
     │
     ├── Load Balancer
     ├── Stateless Services
     ├── Object Storage
     ├── Queue
     ├── CDN
     └── Metadata Database
```

------------------------------------------------------------------------

# Coming Next

**Chapter 2 -- Part 10: Revision Chapter**

Includes:

-   Complete Cheat Sheet
-   Flashcards
-   Mind Map
-   Common Mistakes
-   Five Progressive Interview Questions
-   Design Exercises
-   Quick Revision Notes
