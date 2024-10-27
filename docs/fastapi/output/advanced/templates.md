# Templates

You can use any template engine with FastAPI. A common choice is Jinja2, which is also used by Flask and other tools. Utilities are available to configure it easily in your FastAPI application (provided by Starlette).

## Install dependencies

Create a virtual environment, activate it, and install `jinja2`:

```
$ pip install jinja2
```

## Using Jinja2Templates

1. Import `Jinja2Templates`.
2. Create a `templates` object for reuse.
3. Declare a `Request` parameter in the path operation that returns a template.
4. Use the `templates` object to render and return a `TemplateResponse`, passing the template name, request object, and a context dictionary with key-value pairs for the Jinja2 template.

```Python
{!../../docs_src/templates/tutorial001.py!}
```

**Note:** Before FastAPI 0.108.0 and Starlette 0.29.0, the `name` was the first parameter, and the `request` object was included in the context dictionary.

**Tip:** By declaring `response_class=HTMLResponse`, the docs UI will recognize that the response will be HTML.

**Technical Details:** You can also use `from starlette.templating import Jinja2Templates`. FastAPI provides `starlette.templating` as `fastapi.templating` for convenience, but most responses come from Starlette.

## Writing templates

Create a template at `templates/item.html`:

```jinja
{!../../docs_src/templates/templates/item.html!}
```

### Template Context Values

In the HTML:

```jinja
Item ID: {{ id }}
```

This will display the `id` from the context dictionary:

```Python
{"id": id}
```

For example, with an ID of `42`, it renders:

```html
Item ID: 42
```

### Template url_for Arguments

You can use `url_for()` in the template, which takes the same arguments as your path operation function. For example:

```jinja
<a href="{{ url_for('read_item', id=id) }}">
```

With an ID of `42`, this renders:

```html
<a href="/items/42">
```

## Templates and static files

You can also use `url_for()` for static files mounted with `name="static"`:

```jinja
{!../../docs_src/templates/templates/item.html!}
```

This links to a CSS file at `static/styles.css`:

```CSS
{!../../docs_src/templates/static/styles.css!}
```

The CSS file will be served automatically by your FastAPI application at the URL `/static/styles.css`.

## More details

For more details, including how to test templates, check Starlette's documentation on templates.