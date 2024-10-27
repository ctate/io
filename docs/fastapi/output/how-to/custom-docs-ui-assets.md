# Custom Docs UI Static Assets (Self-Hosting)

The API docs utilize Swagger UI and ReDoc, which require JavaScript and CSS files. By default, these files are served from a CDN. However, customization is possible by setting a specific CDN or serving the files locally.

## Custom CDN for JavaScript and CSS

To use a different CDN, such as `https://unpkg.com/`, follow these steps:

### Disable Automatic Docs

Disable the automatic docs by setting their URLs to `None` when creating your FastAPI app:

```Python
{!../../docs_src/custom_docs_ui/tutorial001.py!}
```

### Include Custom Docs

Create path operations for the custom docs using FastAPI's internal functions:

- `openapi_url`: URL for the OpenAPI schema.
- `title`: Title of your API.
- `oauth2_redirect_url`: Use `app.swagger_ui_oauth2_redirect_url` for the default.
- `swagger_js_url`: Custom CDN URL for JavaScript.
- `swagger_css_url`: Custom CDN URL for CSS.

```Python
{!../../docs_src/custom_docs_ui/tutorial001.py!}
```

### Create Path Operation to Test

Create a path operation to test the setup:

```Python
{!../../docs_src/custom_docs_ui/tutorial001.py!}
```

### Test It

Access your docs at http://127.0.0.1:8000/docs. Reload the page to load assets from the new CDN.

## Self-Hosting JavaScript and CSS for Docs

Self-hosting is useful for offline access or local networks. Follow these steps to serve files locally.

### Project File Structure

Create a directory for static files:

```
.
├── app
│   ├── __init__.py
│   ├── main.py
└── static/
```

### Download the Files

Download the necessary static files and place them in the `static/` directory:

- Swagger UI:
  - `swagger-ui-bundle.js`
  - `swagger-ui.css`
- ReDoc:
  - `redoc.standalone.js`

Your file structure should look like this:

```
.
├── app
│   ├── __init__.py
│   ├── main.py
└── static
    ├── redoc.standalone.js
    ├── swagger-ui-bundle.js
    └── swagger-ui.css
```

### Serve the Static Files

Import `StaticFiles` and mount it in your FastAPI app:

```Python
{!../../docs_src/custom_docs_ui/tutorial002.py!}
```

### Test the Static Files

Start your application and access http://127.0.0.1:8000/static/redoc.standalone.js. You should see the JavaScript file for ReDoc.

### Disable Automatic Docs for Static Files

Disable automatic docs by setting their URLs to `None`:

```Python
{!../../docs_src/custom_docs_ui/tutorial002.py!}
```

### Include Custom Docs for Static Files

Create path operations for the custom docs, similar to the custom CDN setup:

```Python
{!../../docs_src/custom_docs_ui/tutorial002.py!}
```

### Create Path Operation to Test Static Files

Create a path operation to test the static files:

```Python
{!../../docs_src/custom_docs_ui/tutorial002.py!}
```

### Test Static Files UI

Disconnect your WiFi and access http://127.0.0.1:8000/docs. You should be able to view and interact with the API docs without Internet access.