# Next CLI

Learn how to run and build your application with the Next.js CLI.

The Next.js CLI allows you to develop, build, start your application, and more.

## Basic Usage

```bash
npx next [command] [options]
```

## Reference

### Options

| Options             | Description                        |
| ------------------- | ---------------------------------- |
| `-h` or `--help`    | Shows all available options        |
| `-v` or `--version` | Outputs the Next.js version number |

### Commands

| Command                                | Description                                                                                                                                                                                                                        |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dev`                                  | Starts Next.js in development mode with Hot Module Reloading, error reporting, and more.                                                                                                                                           |
| `build`                                | Creates an optimized production build of your application, displaying information about each route.                                                                                                                                |
| `start`                                | Starts Next.js in production mode. The application should be compiled with `next build` first.                                                                                                                                     |
| `info`                                 | Prints relevant details about the current system which can be used to report Next.js bugs.                                                                                                                                         |
| `lint`                                 | Runs ESLint for all files in the `/src`, `/app`, `/pages`, `/components`, and `/lib` directories, providing a guided setup to install any required dependencies if ESLint is not already configured. |
| `telemetry`                            | Allows you to enable or disable Next.js' completely anonymous telemetry collection.                                                                                                                                                |

> **Good to know**: Running `next` without a command is an alias for `next dev`.

### `next dev` Options

`next dev` starts the application in development mode with Hot Module Reloading (HMR), error reporting, and more.

| Option                                   | Description                                                                                                                                          |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-h, --help`                             | Show all available options.                                                                                                                          |
| `[directory]`                            | A directory in which to build the application. If not provided, current directory is used.                                                           |
| `--turbopack`                            | Starts development mode using Turbopack.                                                                                                           |
| `-p` or `--port <port>`                  | Specify a port number on which to start the application. Default: 3000, env: PORT                                                                    |
| `-H` or `--hostname <hostname>`          | Specify a hostname on which to start the application. Default: 0.0.0.0                                                                             |
| `--experimental-https`                   | Starts the server with HTTPS and generates a self-signed certificate.                                                                                |
| `--experimental-https-key <path>`        | Path to a HTTPS key file.                                                                                                                            |
| `--experimental-https-cert <path>`       | Path to a HTTPS certificate file.                                                                                                                    |
| `--experimental-https-ca <path>`         | Path to a HTTPS certificate authority file.                                                                                                          |
| `--experimental-upload-trace <traceUrl>` | Reports a subset of the debugging trace to a remote HTTP URL.                                                                                        |

### `next build` Options

`next build` creates an optimized production build of your application, displaying information about each route.

| Option                             | Description                                                                                                                                   |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `-h, --help`                       | Show all available options.                                                                                                                   |
| `[directory]`                      | A directory on which to build the application. If not provided, the current directory will be used.                                           |
| `-d` or `--debug`                  | Enables a more verbose build output.                                                                                                          |
| `--profile`                        | Enables production profiling for React.                                                                                                       |
| `--no-lint`                        | Disables linting.                                                                                                                             |
| `--no-mangling`                    | Disables name mangling. This may affect performance and should only be used for debugging purposes.                                           |
| `--experimental-app-only`          | Builds only App Router routes.                                                                                                                |
| `--experimental-build-mode [mode]` | Uses an experimental build mode. (choices: "compile", "generate", default: "default")                                                         |

### `next start` Options

`next start` starts the application in production mode. The application should be compiled with `next build` first.

| Option                                  | Description                                                                                                     |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `-h` or `--help`                        | Show all available options.                                                                                     |
| `[directory]`                           | A directory on which to start the application. If no directory is provided, the current directory will be used. |
| `-p` or `--port <port>`                 | Specify a port number on which to start the application. (default: 3000, env: PORT)                             |
| `-H` or `--hostname <hostname>`         | Specify a hostname on which to start the application (default: 0.0.0.0).                                        |
| `--keepAliveTimeout <keepAliveTimeout>` | Specify the maximum amount of milliseconds to wait before closing the inactive connections.                     |

### `next info` Options

`next info` prints relevant details about the current system which can be used to report Next.js bugs.

| Option           | Description                                    |
| ---------------- | ---------------------------------------------- |
| `-h` or `--help` | Show all available options                     |
| `--verbose`      | Collects additional information for debugging. |

### `next lint` Options

`next lint` runs ESLint for all files in the `pages/`, `app/`, `components/`, `lib/`, and `src/` directories.

| Option                                                | Description                                                                                                   |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `[directory]`                                         | A base directory on which to lint the application. If not provided, the current directory will be used.       |
| `-d, --dir, <dirs...>`                                | Include directory, or directories, to run ESLint.                                                             |
| `--file, <files...>`                                  | Include file, or files, to run ESLint.                                                                        |
| `--ext, [exts...]`                                    | Specify JavaScript file extensions. (default: [".js", ".mjs", ".cjs", ".jsx", ".ts", ".mts", ".cts", ".tsx"]) |
| `-c, --config, <config>`                              | Uses this configuration file, overriding all other configuration options.                                     |
| `--resolve-plugins-relative-to, <rprt>`               | Specify a directory where plugins should be resolved from.                                                    |
| `--strict`                                            | Creates a `.eslintrc.json` file using the Next.js strict configuration.                                       |
| `--rulesdir, <rulesdir...>`                           | Uses additional rules from this directory(s).                                                                 |
| `--fix`                                               | Automatically fix linting issues.                                                                             |
| `--fix-type <fixType>`                                | Specify the types of fixes to apply (e.g., problem, suggestion, layout).                                      |
| `--ignore-path <path>`                                | Specify a file to ignore.                                                                                     |
| `--no-ignore <path>`                                  | Disables the `--ignore-path` option.                                                                          |
| `--quiet`                                             | Reports errors only.                                                                                          |
| `--max-warnings [maxWarnings]`                        | Specify the number of warnings before triggering a non-zero exit code. (default: -1)                          |
| `-o, --output-file, <outputFile>`                     | Specify a file to write report to.                                                                            |
| `-f, --format, <format>`                              | Uses a specific output format.                                                                                |
| `--no-inline-config`                                  | Prevents comments from changing config or rules.                                                              |
| `--report-unused-disable-directives-severity <level>` | Specify severity level for unused eslint-disable directives. (choices: "error", "off", "warn")                |
| `--no-cache`                                          | Disables caching.                                                                                             |
| `--cache-location, <cacheLocation>`                   | Specify a location for cache.                                                                                 |
| `--cache-strategy, [cacheStrategy]`                   | Specify a strategy to use for detecting changed files in the cache. (default: "metadata")                     |
| `--error-on-unmatched-pattern`                        | Reports errors when any file patterns are unmatched.                                                          |
| `-h, --help`                                          | Displays this message.                                                                                        |

### `next telemetry` Options

Next.js collects completely anonymous telemetry data about general usage. Participation in this anonymous program is optional.

| Option       | Description                             |
| ------------ | --------------------------------------- |
| `-h, --help` | Show all available options.             |
| `--enable`   | Enables Next.js' telemetry collection.  |
| `--disable`  | Disables Next.js' telemetry collection. |

## Examples

### Changing the Default Port

By default, Next.js uses `http://localhost:3000` during development and with `next start`. The default port can be changed with the `-p` option:

```bash
next dev -p 4000
```

Or using the `PORT` environment variable:

```bash
PORT=4000 next dev
```

> **Good to know**: `PORT` cannot be set in `.env` as booting up the HTTP server happens before any other code is initialized.

### Using HTTPS During Development

Next.js can generate a self-signed certificate with `next dev` using the `--experimental-https` flag:

```bash
next dev --experimental-https
```

With the generated certificate, the Next.js development server will exist at `https://localhost:3000`. You can also provide a custom certificate and key.

```bash
next dev --experimental-https --experimental-https-key ./certificates/localhost-key.pem --experimental-https-cert ./certificates/localhost.pem
```

> **Good to know**: When deploying to Vercel, HTTPS is automatically configured for your Next.js application.

### Configuring a Timeout for Downstream Proxies

To configure the timeout values for the production Next.js server, pass `--keepAliveTimeout` (in milliseconds) to `next start`:

```bash
next start --keepAliveTimeout 70000
```

### Passing Node.js Arguments

You can pass any Node.js arguments to `next` commands:

```bash
NODE_OPTIONS='--throw-deprecation' next
NODE_OPTIONS='-r esm' next
NODE_OPTIONS='--inspect' next
```