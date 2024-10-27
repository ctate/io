# Extra Data Types

You can use complex data types in addition to common ones like `int`, `float`, `str`, and `bool`. Features include:

- Great editor support
- Data conversion from incoming requests
- Data conversion for response data
- Data validation
- Automatic annotation and documentation

## Other Data Types

Additional data types include:

- **UUID**: A standard "Universally Unique Identifier". Represented as a `str` in requests and responses.
  
- **datetime.datetime**: A Python `datetime.datetime`. Represented as a `str` in ISO 8601 format (e.g., `2008-09-15T15:53:00+05:00`).
  
- **datetime.date**: A Python `datetime.date`. Represented as a `str` in ISO 8601 format (e.g., `2008-09-15`).
  
- **datetime.time**: A Python `datetime.time`. Represented as a `str` in ISO 8601 format (e.g., `14:23:55.003`).
  
- **datetime.timedelta**: A Python `datetime.timedelta`. Represented as a `float` of total seconds. Can also be represented as "ISO 8601 time diff encoding".
  
- **frozenset**: Treated as a `set` in requests and responses. In requests, a list is read, duplicates are eliminated, and it is converted to a `set`. In responses, the `set` is converted to a `list`. The schema specifies unique values using JSON Schema's `uniqueItems`.
  
- **bytes**: Standard Python `bytes`. Treated as `str` in requests and responses. The schema specifies it as a `str` with `binary` format.
  
- **Decimal**: Standard Python `Decimal`. Handled the same as a `float` in requests and responses.

## Example

Example path operation with parameters using some of the above types:

```Python
# Python 3.10+
{!> ../../docs_src/extra_data_types/tutorial001_an_py310.py!}
```

```Python
# Python 3.9+
{!> ../../docs_src/extra_data_types/tutorial001_an_py39.py!}
```

```Python
# Python 3.8+
{!> ../../docs_src/extra_data_types/tutorial001_an.py!}
```

```Python
# Python 3.10+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/extra_data_types/tutorial001_py310.py!}
```

```Python
# Python 3.8+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/extra_data_types/tutorial001.py!}
```

Parameters inside the function have their natural data type, allowing for normal date manipulations:

```Python
# Python 3.10+
{!> ../../docs_src/extra_data_types/tutorial001_an_py310.py!}
```

```Python
# Python 3.9+
{!> ../../docs_src/extra_data_types/tutorial001_an_py39.py!}
```

```Python
# Python 3.8+
{!> ../../docs_src/extra_data_types/tutorial001_an.py!}
```

```Python
# Python 3.10+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/extra_data_types/tutorial001_py310.py!}
```

```Python
# Python 3.8+ non-Annotated
# Prefer to use the Annotated version if possible.
{!> ../../docs_src/extra_data_types/tutorial001.py!}
```