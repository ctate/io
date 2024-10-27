# Virtual Environments

When working on Python projects, it is advisable to use a **virtual environment** to isolate the packages installed for each project.

## Create a Project

1. Create a directory for your project:
   ```console
   $ cd
   $ mkdir code
   $ cd code
   $ mkdir awesome-project
   $ cd awesome-project
   ```

## Create a Virtual Environment

Create a virtual environment **inside your project**:
```console
$ python -m venv .venv
```

### Alternative with `uv`
If you have `uv` installed:
```console
$ uv venv
```

## Activate the Virtual Environment

Activate the virtual environment to ensure any Python command or package installation uses it.

### Linux, macOS
```console
$ source .venv/bin/activate
```

### Windows PowerShell
```console
$ .venv\Scripts\Activate.ps1
```

### Windows Bash
```console
$ source .venv/Scripts/activate
```

## Check the Virtual Environment is Active

To verify the virtual environment is active:

### Linux, macOS, Windows Bash
```console
$ which python
```

### Windows PowerShell
```console
$ Get-Command python
```

## Upgrade `pip`

To upgrade `pip`:
```console
$ python -m pip install --upgrade pip
```

## Add `.gitignore`

To exclude the `.venv` directory from Git:
```console
$ echo "*" > .venv/.gitignore
```

## Install Packages

After activating the environment, install packages as needed.

### Install Packages Directly
Using `pip`:
```console
$ pip install "fastapi[standard]"
```

Using `uv`:
```console
$ uv pip install "fastapi[standard]"
```

### Install from `requirements.txt`
Using `pip`:
```console
$ pip install -r requirements.txt
```

Using `uv`:
```console
$ uv pip install -r requirements.txt
```

## Run Your Program

Run your program using the Python from the virtual environment:
```console
$ python main.py
```

## Configure Your Editor

Configure your editor to use the virtual environment for features like autocompletion and inline errors.

## Deactivate the Virtual Environment

To deactivate the virtual environment:
```console
$ deactivate
```

## Why Virtual Environments

Virtual environments prevent conflicts between package versions across different projects. Each project can maintain its own dependencies without affecting others.

## What are Virtual Environments

A virtual environment is a directory where you can install packages specific to a project, avoiding global environment conflicts.

## What Does Activating a Virtual Environment Mean

Activating a virtual environment modifies the `PATH` variable, prioritizing the virtual environment's Python interpreter.

## Checking a Virtual Environment

To check if a virtual environment is active, use:
```console
$ which python
```
or
```console
$ Get-Command python
```

## Why Deactivate a Virtual Environment

Deactivate the virtual environment when switching projects to avoid using the wrong Python interpreter.

## Alternatives

For managing virtual environments and dependencies, consider using `uv`, which simplifies the process of managing projects.

## Conclusion

Understanding virtual environments enhances your ability to manage dependencies effectively, leading to fewer conflicts and smoother development experiences.