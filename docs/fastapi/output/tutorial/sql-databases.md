# SQL (Relational) Databases

FastAPI does not require a SQL (relational) database, but you can use any database you prefer. This example uses SQLModel.

SQLModel is built on top of SQLAlchemy and Pydantic, created by the same author of FastAPI, making it ideal for FastAPI applications that require SQL databases.

You can use any SQL or NoSQL database library you want; FastAPI does not enforce any specific choice.

SQLModel supports any database compatible with SQLAlchemy, including:

- PostgreSQL
- MySQL
- SQLite
- Oracle
- Microsoft SQL Server, etc.

This example uses SQLite for its simplicity, as it operates with a single file and has built-in Python support. For production, consider using a database server like PostgreSQL.

There is an official project generator for FastAPI and PostgreSQL, including a frontend and additional tools: https://github.com/fastapi/full-stack-fastapi-template.

For more comprehensive learning about databases or SQL, refer to the SQLModel documentation.

## Install SQLModel

Create and activate your virtual environment, then install SQLModel:

```console
$ pip install sqlmodel
```

## Create the App with a Single Model

We will create a basic version of the app with a single SQLModel model, which will be enhanced later for security and versatility.

### Create Models

Import SQLModel and create a database model:

The `Hero` class resembles a Pydantic model but has some differences:

- `table=True` indicates this is a table model, representing a table in the SQL database.
- `Field(primary_key=True)` designates `id` as the primary key in the SQL database.
- `Field(index=True)` creates a SQL index for faster lookups.

### Create an Engine

A SQLModel engine holds connections to the database. You will have one engine object for all code connecting to the same database.

Using `check_same_thread=False` allows FastAPI to use the same SQLite database across different threads, ensuring a single SQLModel session per request.

### Create the Tables

Add a function to create tables for all table models using `SQLModel.metadata.create_all(engine)`.

### Create a Session Dependency

A Session stores objects in memory and tracks changes, using the engine to communicate with the database. Create a FastAPI dependency with `yield` to provide a new Session for each request.

### Create Database Tables on Startup

Create the database tables when the application starts. For production, consider using a migration script.

SQLModel will have migration utilities wrapping Alembic, but for now, you can use Alembic directly.

### Create a Hero

Each SQLModel model is also a Pydantic model, allowing it to be used in type annotations. Declare a parameter of type `Hero` to read from the JSON body and return it.

Use the SessionDep dependency to add the new Hero to the Session, commit changes, refresh the data, and return it.

### Read Heroes

Read Heroes from the database using `select()`, with options for pagination.

### Read One Hero

Read a single Hero from the database.

### Delete a Hero

Delete a Hero from the database.

### Run the App

Run the app:

```console
$ fastapi dev main.py

INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

Access the `/docs` UI to see FastAPI using these models to document the API and validate data.

## Update the App with Multiple Models

Refactor the app to enhance security and versatility. The previous version allowed clients to set the `id` of the Hero, which should be managed by the backend or database.

### Create Multiple Models

In SQLModel, any model class with `table=True` is a table model, while those without it are data models (Pydantic models).

#### HeroBase - the base class

Create a `HeroBase` model with shared fields:

- `name`
- `age`

#### Hero - the table model

Create `Hero`, the actual table model, with additional fields:

- `id`
- `secret_name`

#### HeroPublic - the public data model

Create a `HeroPublic` model to be returned to API clients, excluding `secret_name`.

#### HeroCreate - the data model to create a hero

Create a `HeroCreate` model to validate data from clients, including `secret_name`.

#### HeroUpdate - the data model to update a hero

Create a `HeroUpdate` model with optional fields for updating a hero.

### Create with HeroCreate and return a HeroPublic

Receive a `HeroCreate` data model in the request, create a `Hero` table model, and return it as a `HeroPublic` response model.

### Read Heroes with HeroPublic

Read Heroes using `response_model=list[HeroPublic]` for validation and serialization.

### Read One Hero with HeroPublic

Read a single hero using the HeroPublic model.

### Update a Hero with HeroUpdate

Update a hero using an HTTP PATCH operation, excluding unset values.

### Delete a Hero Again

Deleting a hero remains similar to previous implementations.

### Run the App Again

Run the app again:

```console
$ fastapi dev main.py

INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

Access the updated `/docs` API UI.

## Recap

Use SQLModel to interact with a SQL database, simplifying code with data models and table models. For more information, refer to the SQLModel documentation and the longer tutorial on using SQLModel with FastAPI.