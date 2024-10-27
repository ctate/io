# Deployments Concepts

When deploying a FastAPI application or any web API, several concepts are crucial for finding the most appropriate deployment method. Key concepts include:

- Security - HTTPS
- Running on startup
- Restarts
- Replication (number of processes running)
- Memory
- Previous steps before starting

The ultimate goal is to serve API clients securely, avoid disruptions, and utilize compute resources efficiently.

## Security - HTTPS

HTTPS provides encryption for your API, typically managed by an external component known as a TLS Termination Proxy. This component is responsible for renewing HTTPS certificates.

### Example Tools for HTTPS

- Traefik: Automatically handles certificate renewals
- Caddy: Automatically handles certificate renewals
- Nginx: Requires an external component like Certbot for certificate renewals
- HAProxy: Requires an external component like Certbot for certificate renewals
- Kubernetes with an Ingress Controller like Nginx: Requires an external component like cert-manager for certificate renewals
- Handled internally by a cloud provider

Alternatively, you can use a cloud service that simplifies HTTPS setup, though it may come with restrictions or additional costs.

## Program and Process

Understanding the difference between a "program" and a "process" is essential.

### What is a Program

A program refers to:

- The code you write (Python files)
- An executable file (e.g., python, uvicorn)
- A program while it is running on the operating system (known as a process)

### What is a Process

A process is:

- A program currently running on the operating system
- Managed by the operating system, executing code and using CPU and memory
- Capable of being terminated, stopping execution

Multiple processes of the same program can run simultaneously.

## Running on Startup

Web APIs should ideally run continuously to ensure client access. 

### In a Remote Server

Using `fastapi run` (with Uvicorn) manually works during development but may fail if the connection to the server is lost or if the server restarts.

### Run Automatically on Startup

To ensure the server program starts automatically, a separate program is typically used to manage this.

### Example Tools to Run at Startup

- Docker
- Kubernetes
- Docker Compose
- Systemd
- Supervisor
- Handled internally by a cloud provider

## Restarts

Ensuring your application restarts after failures is crucial.

### We Make Mistakes

Software often contains bugs, and developers continuously improve code, which may introduce new bugs.

### Small Errors Automatically Handled

FastAPI typically contains errors to the request that triggered them, allowing the application to continue functioning.

### Bigger Errors - Crashes

Severe errors may crash the entire application. An external component should be responsible for restarting the process after such crashes.

### Example Tools to Restart Automatically

- Docker
- Kubernetes
- Docker Compose
- Systemd
- Supervisor
- Handled internally by a cloud provider

## Replication - Processes and Memory

Running a FastAPI application in a single process can serve multiple clients, but multiple worker processes are often necessary.

### Multiple Processes - Workers

If a single process cannot handle the client load, multiple processes (workers) can be run concurrently, distributing requests among them.

### Worker Processes and Ports

Only one process can listen on a specific port and IP address. A single process must manage communication to multiple worker processes.

### Memory per Process

Each process consumes its own memory. For example, if a machine learning model uses 1 GB of RAM, four worker processes will consume 4 GB total.

### Multiple Processes - An Example

A Manager Process listens on the port and communicates with Worker Processes that handle requests and computations.

### Examples of Replication Tools and Strategies

- Uvicorn with `--workers`
- Kubernetes and other distributed container systems
- Cloud services that manage replication

## Previous Steps Before Starting

Certain steps, like database migrations, may need to be performed before starting the application, ideally by a single process to avoid duplication.

### Examples of Previous Steps Strategies

- An "Init Container" in Kubernetes
- A bash script that runs the previous steps before starting the application

## Resource Utilization

Maximizing resource utilization is essential. Aim for a balance between using available resources and avoiding crashes.

## Recap

Key concepts for deploying your application include:

- Security - HTTPS
- Running on startup
- Restarts
- Replication (number of processes running)
- Memory
- Previous steps before starting

Understanding these concepts will help you make informed decisions when configuring and optimizing your deployments.