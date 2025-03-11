// The key difference between SQL (Structured Query Language) databases and NoSQL (Not Only SQL) databases lies in how they store, retrieve, and manage data.

// 1. SQL Databases (Relational Databases)
// These are structured databases that store data in tables with predefined schemas and use SQL for querying.

// Characteristics:
        // Structured & Relational: Data is organized in tables with rows and columns.
        // Schema-Dependent: Requires a predefined schema, meaning structure changes require migrations.
        // ACID Compliance: Ensures Atomicity, Consistency, Isolation, and Durability, making it reliable for transactions.
        // Vertical Scaling: Typically scales by upgrading hardware (CPU, RAM, etc.).

// Examples:
        // MySQL
        // PostgreSQL
        // Microsoft SQL Server
        // Oracle Database

// Best for:
        // Banking and financial systems
        // Enterprise applications
        // Applications with structured data and strong consistency requirements


// 2. NoSQL Databases (Non-Relational Databases)
// These are more flexible databases designed to handle unstructured, semi-structured, or structured data in different formats.

// Characteristics:
    //1> Flexible Schema: No fixed structure, allowing changes without migrations.
    //2> Scalable & High Performance: Typically horizontally scalable (adding more servers).
    //3> BASE Compliance: Uses Basically Available, Soft state, Eventually consistent approach.
    //4> Supports Various Data Models:  
        //1> Document-based (e.g., MongoDB)
        //2> Key-Value stores (e.g., Redis)
        //3> Column-based (e.g., Cassandra)
        //4> Graph-based (e.g., Neo4j)

// Examples:
        // MongoDB (Document)
        // Cassandra (Column-oriented)
        // Redis (Key-Value)
        // Neo4j (Graph)

// Best for:
        // Big Data and Real-time analytics
        // Social Media, IoT applications
        // Applications with high scalability and flexibility needs

//                                    SQL vs NoSQL: A Quick Comparison

                    // Feature	                    SQL (Relational)               	    NoSQL (Non-Relational)
                    // Structure	               Tables with columns & rows		    JSON, Key-Value, Graph, etc.
                    // Query Language	           SQL	                                Varies (JSON, key-value, graph, etc.)
                    // Scalability	               Vertical (Scale-up)	                Horizontal (Scale-out)
                    // Transactions	               ACID compliant	                    BASE (Eventual consistency)
                    // Use Case	                   Structured data, strict consistency	Large-scale, flexible, high-speed apps


// When to Choose SQL?
       // When data integrity and transactions are a priority (e.g., banking, ERP systems).
      // When relationships between data are complex.
    
//   When to Choose NoSQL?
    //   When handling massive amounts of unstructured or semi-structured data.
    //   When scaling quickly across multiple servers is needed (e.g., social networks, big data).