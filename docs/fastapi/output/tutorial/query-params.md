# Query Parameters

When you declare function parameters that are not part of the path parameters, they are interpreted as query parameters.

The query consists of key-value pairs after the `?` in a URL, separated by `&`. For example, in the URL:

```
http://127.0.0.1:8000/items/?skip=0&limit=10
```

The query parameters are:

- `skip`: value `0`
- `limit`: value `10`

These parameters are strings by default but can be converted to specified Python types (e.g., `int`).

The same processes for path parameters apply to query parameters:

- Editor support
- Data parsing
- Data validation
- Automatic documentation

## Defaults

Query parameters can be optional and have default values. For example, `skip=0` and `limit=10` are defaults. Accessing:

```
http://127.0.0.1:8000/items/
```

is equivalent to:

```
http://127.0.0.1:8000/items/?skip=0&limit=10
```

If you access:

```
http://127.0.0.1:8000/items/?skip=20
```

The parameter values will be:

- `skip=20`
- `limit=10`

## Optional Parameters

You can declare optional query parameters by setting their default to `None`. 

In this case, the function parameter `q` will be optional and default to `None`.

FastAPI recognizes `item_id` as a path parameter and `q` as a query parameter.

## Query Parameter Type Conversion

You can declare `bool` types, which will be converted. For example, accessing:

```
http://127.0.0.1:8000/items/foo?short=1
```

or variations like `short=True`, `short=true`, `short=on`, or `short=yes` will result in `short` being `True`. Any other value will result in `False`.

## Multiple Path and Query Parameters

You can declare multiple path and query parameters simultaneously. FastAPI identifies them by name, and the order of declaration does not matter.

## Required Query Parameters

To make a query parameter required, do not declare a default value. For example:

```Python
needy: str
```

If you access:

```
http://127.0.0.1:8000/items/foo-item
```

without the required `needy` parameter, you will receive an error indicating that the field is required.

To successfully access the endpoint, include the required parameter:

```
http://127.0.0.1:8000/items/foo-item?needy=sooooneedy
```

This will return:

```JSON
{
    "item_id": "foo-item",
    "needy": "sooooneedy"
}
```

You can define parameters as required, with default values, or optional. 

In this case, there are three query parameters:

- `needy`: required `str`
- `skip`: optional `int` with a default value of `0`
- `limit`: optional `int`

You can also use `Enum`s similarly to path parameters.