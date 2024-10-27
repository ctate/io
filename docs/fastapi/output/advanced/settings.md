# Settings and Environment Variables

Your application may require external settings or configurations, such as secret keys, database credentials, and email service credentials. These settings are often variable and can be sensitive, so they are typically provided as environment variables.

## Types and Validation

Environment variables can only handle text strings, as they must be compatible with various programs and operating systems. Any value read from an environment variable in Python will be a `str`, and any type conversion or validation must be handled in code.

## Pydantic Settings

Pydantic offers a utility for managing settings from environment variables.

### Install pydantic-settings

Create and activate your virtual environment, then install the `pydantic-settings` package:

```
$ pip install pydantic-settings
```

It is also included when you install the `all` extras with:

```
$ pip install "fastapi[all]"
```

### Create the Settings Object

Import `BaseSettings` from Pydantic and create a subclass. Declare class attributes with type annotations and default values, using validation features similar to Pydantic models.

#### Example for Pydantic v2

```Python
{!> ../../docs_src/settings/tutorial001.py!}
```

#### Example for Pydantic v1

```Python
{!> ../../docs_src/settings/tutorial001_pv1.py!}
```

When you create an instance of the `Settings` class, Pydantic reads environment variables in a case-insensitive manner, converting and validating the data accordingly.

### Use the Settings

You can use the `settings` object in your application:

```Python
{!../../docs_src/settings/tutorial001.py!}
```

### Run the Server

Run the server with environment variables:

```
$ ADMIN_EMAIL="deadpool@example.com" APP_NAME="ChimichangApp" fastapi run main.py
```

The `admin_email` will be set to `"deadpool@example.com"` and `app_name` to `"ChimichangApp"`.

## Settings in Another Module

You can place settings in a separate module, such as `config.py`:

```Python
{!../../docs_src/settings/app01/config.py!}
```

And use it in `main.py`:

```Python
{!../../docs_src/settings/app01/main.py!}
```

## Settings in a Dependency

You can provide settings from a dependency instead of using a global `settings` object. This is useful for testing, as you can easily override a dependency.

### Config File Example

Your `config.py` file could look like this:

```Python
{!../../docs_src/settings/app02/config.py!}
```

### Main App File Example

Create a dependency that returns a new `config.Settings()`.

#### Example for Python 3.9+

```Python
{!> ../../docs_src/settings/app02_an_py39/main.py!}
```

#### Example for Python 3.8+

```Python
{!> ../../docs_src/settings/app02_an/main.py!}
```

### Settings and Testing

You can provide a different settings object during testing by creating a dependency override for `get_settings`:

```Python
{!../../docs_src/settings/app02/test_main.py!}
```

## Reading a .env File

For many settings that change frequently, you can use a `.env` file to read them as environment variables. This file is commonly referred to as a "dotenv."

### Example .env File

```bash
ADMIN_EMAIL="deadpool@example.com"
APP_NAME="ChimichangApp"
```

### Read Settings from .env

Update your `config.py`:

#### Example for Pydantic v2

```Python
{!> ../../docs_src/settings/app03_an/config.py!}
```

#### Example for Pydantic v1

```Python
{!> ../../docs_src/settings/app03_an/config_pv1.py!}
```

### Creating the Settings Only Once with lru_cache

To avoid reading the `.env` file multiple times, use the `@lru_cache` decorator to create the `Settings` object only once:

#### Example for Python 3.9+

```Python
{!> ../../docs_src/settings/app03_an_py39/main.py!}
```

#### Example for Python 3.8+

```Python
{!> ../../docs_src/settings/app03_an/main.py!}
```

## Recap

Pydantic Settings allows you to manage application settings with the power of Pydantic models. You can simplify testing with dependencies, use `.env` files, and avoid redundant file reads with `@lru_cache`.