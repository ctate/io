# Debugging

You can connect the debugger in your editor, such as Visual Studio Code or PyCharm.

## Call `uvicorn`

In your FastAPI application, import and run `uvicorn` directly:

```Python
{!../../docs_src/debugging/tutorial001.py!}
```

### About `__name__ == "__main__"`

The purpose of `__name__ == "__main__"` is to execute code when your file is called directly, for example:

```console
$ python myapp.py
```

This code will not run if the file is imported, like in:

```Python
from myapp import app
```

#### More details

If your file is named `myapp.py` and you run it with:

```console
$ python myapp.py
```

the internal variable `__name__` will be `"__main__"`, allowing the line:

```Python
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

to execute.

If you import that module in another file, such as `importer.py`:

```Python
from myapp import app

# Some more code
```

the variable `__name__` will not be `"__main__"`, and the line:

```Python
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

will not execute.

For more information, check the official Python docs on `__main__`.

## Run your code with your debugger

You can run the Uvicorn server directly from your code using the debugger.

In Visual Studio Code:

- Go to the "Debug" panel.
- Select "Add configuration...".
- Choose "Python".
- Run the debugger with the option "Python: Current File (Integrated Terminal)".

In PyCharm:

- Open the "Run" menu.
- Select "Debug...".
- Choose the file to debug (e.g., `main.py`).

The server will start with your FastAPI code, stopping at your breakpoints.