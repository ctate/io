# Environment Variables

An environment variable (also known as "env var") is a variable that exists outside of the Python code, in the operating system, and can be read by Python code or other programs. Environment variables are useful for handling application settings and as part of the installation of Python.

## Create and Use Env Vars

You can create and use environment variables in the shell (terminal) without needing Python.

### Linux, macOS, Windows Bash

```console
// Create an env var MY_NAME
$ export MY_NAME="Wade Wilson"

// Use it with other programs
$ echo "Hello $MY_NAME"

Hello Wade Wilson
```

### Windows PowerShell

```console
// Create an env var MY_NAME
$ $Env:MY_NAME = "Wade Wilson"

// Use it with other programs
$ echo "Hello $Env:MY_NAME"

Hello Wade Wilson
```

## Read env vars in Python

You can create environment variables outside of Python and read them in Python. For example, in a file `main.py`:

```Python
import os

name = os.getenv("MY_NAME", "World")
print(f"Hello {name} from Python")
```

### Linux, macOS, Windows Bash

```console
// Without setting the env var
$ python main.py

Hello World from Python

// Set the env var and call again
$ export MY_NAME="Wade Wilson"
$ python main.py

Hello Wade Wilson from Python
```

### Windows PowerShell

```console
// Without setting the env var
$ python main.py

Hello World from Python

// Set the env var and call again
$ $Env:MY_NAME = "Wade Wilson"
$ python main.py

Hello Wade Wilson from Python
```

Environment variables can be set for a specific program invocation:

```console
// Create an env var MY_NAME in line for this program call
$ MY_NAME="Wade Wilson" python main.py

Hello Wade Wilson from Python

// The env var no longer exists afterwards
$ python main.py

Hello World from Python
```

## Types and Validation

Environment variables can only handle text strings. Any value read in Python from an environment variable will be a `str`, and any conversion or validation must be done in code.

## `PATH` Environment Variable

The `PATH` environment variable is used by operating systems to find programs to run. It consists of directories separated by a colon `:` on Linux and macOS, and by a semicolon `;` on Windows.

### Example `PATH` Values

#### Linux, macOS

```plaintext
/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
```

#### Windows

```plaintext
C:\Program Files\Python312\Scripts;C:\Program Files\Python312;C:\Windows\System32
```

When you type a command in the terminal, the operating system looks for the program in each directory listed in the `PATH`.

### Installing Python and Updating the `PATH`

When installing Python, you may be asked to update the `PATH` environment variable.

#### Linux, macOS

If Python is installed in `/opt/custompython/bin`, the `PATH` may look like this:

```plaintext
/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/custompython/bin
```

#### Windows

If Python is installed in `C:\opt\custompython\bin`, the `PATH` may look like this:

```plaintext
C:\Program Files\Python312\Scripts;C:\Program Files\Python312;C:\Windows\System32;C:\opt\custompython\bin
```

### Command Execution

When you type:

```console
$ python
```

#### Linux, macOS

The system finds the `python` program in `/opt/custompython/bin` and runs it.

#### Windows

The system finds the `python` program in `C:\opt\custompython\bin\python` and runs it.

## Conclusion

This documentation provides a basic understanding of environment variables and their usage in Python. They are applicable in various development scenarios, including the next section on Virtual Environments.