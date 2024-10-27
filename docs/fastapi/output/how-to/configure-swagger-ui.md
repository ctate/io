# Configure Swagger UI

You can configure additional Swagger UI parameters.

To configure them, pass the `swagger_ui_parameters` argument when creating the `FastAPI()` app object or to the `get_swagger_ui_html()` function.

`swagger_ui_parameters` receives a dictionary with the configurations passed to Swagger UI directly. FastAPI converts the configurations to JSON for compatibility with JavaScript.

## Disable Syntax Highlighting

By default, syntax highlighting is enabled. To disable it, set `syntaxHighlight` to `False`. This will prevent Swagger UI from showing syntax highlighting.

## Change the Theme

You can set the syntax highlighting theme using the key `"syntaxHighlight.theme"`.

This configuration changes the syntax highlighting color theme.

## Change Default Swagger UI Parameters

FastAPI includes default configuration parameters suitable for most use cases. You can override any of them by setting a different value in the `swagger_ui_parameters` argument. For example, to disable `deepLinking`, pass the appropriate settings to `swagger_ui_parameters`.

## Other Swagger UI Parameters

To see all possible configurations, refer to the official documentation for Swagger UI parameters.

## JavaScript-only Settings

Swagger UI allows configurations as JavaScript-only objects (e.g., JavaScript functions). FastAPI includes these JavaScript-only `presets` settings:

```JavaScript
presets: [
    SwaggerUIBundle.presets.apis,
    SwaggerUIBundle.SwaggerUIStandalonePreset
]
```

These are JavaScript objects, not strings, so they cannot be passed from Python code directly. To use JavaScript-only configurations, override all the Swagger UI path operations and manually write any necessary JavaScript.