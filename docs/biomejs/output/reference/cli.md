# Introduction

Available commands and arguments in the Biome CLI.

## Command summary

- biome
- biome version
- biome rage
- biome start
- biome stop
- biome check
- biome lint
- biome format
- biome ci
- biome init
- biome lsp-proxy
- biome migrate
- biome migrate prettier
- biome migrate eslint
- biome search
- biome explain
- biome clean

## biome

Biome official CLI. Use it to check the health of your project or run it to check single files.

**Usage**: biome COMMAND ...

**Available options:**
- -h, --help — Prints help information
- -V, --version — Prints version information

**Available commands:**
- version — Shows the Biome version information and quit.
- rage — Prints information for debugging.
- start — Starts the Biome daemon server process.
- stop — Stops the Biome daemon server process.
- check — Runs formatter, linter and import sorting to the requested files.
- lint — Run various checks on a set of files.
- format — Run the formatter on a set of files.
- ci — Command to use in CI environments. Runs formatter, linter and import sorting to the requested files.
- init — Bootstraps a new biome project. Creates a configuration file with some defaults.
- lsp-proxy — Acts as a server for the Language Server Protocol over stdin/stdout.
- migrate — Updates the configuration when there are breaking changes.
- search — EXPERIMENTAL: Searches for Grit patterns across a project.
- explain — Shows documentation of various aspects of the CLI.
- clean — Cleans the logs emitted by the daemon.

## biome version

Shows the Biome version information and quit.

**Usage**: biome version 

**Global options applied to all commands**
- --colors=<off|force> — Set the formatting mode for markup: "off" prints everything as plain text, "force" forces the formatting of markup using ANSI even if the console output is determined to be incompatible
- --use-server — Connect to a running instance of the Biome daemon server.
- --verbose — Print additional diagnostics, and some diagnostics show more information. Also, print out what files were processed and which ones were modified.
- --config-path=PATH — Set the file path to the configuration file, or the directory path to find biome.json or biome.jsonc. If used, it disables the default configuration file resolution.
- --max-diagnostics=<none|<NUMBER>> — Cap the amount of diagnostics displayed. When none is provided, the limit is lifted. [default: 20]
- --skip-errors — Skip over files containing syntax errors instead of emitting an error diagnostic.
- --no-errors-on-unmatched — Silence errors that would be emitted in case no files were processed during the execution of the command.
- --error-on-warnings — Tell Biome to exit with an error code if some diagnostics emit warnings.
- --reporter=<json|json-pretty|github|junit|summary|gitlab> — Allows to change how diagnostics and summary are reported.
- --log-level=<none|debug|info|warn|error> — The level of logging. In order, from the most verbose to the least verbose: debug, info, warn, error. The value none won't show any logging. [default: none]
- --log-kind=<pretty|compact|json> — How the log should look like. [default: pretty]
- --diagnostic-level=<info|warn|error> — The level of diagnostics to show. In order, from the lowest to the most important: info, warn, error. Passing --diagnostic-level=error will cause Biome to print only diagnostics that contain only errors. [default: info]

**Available options:**
- -h, --help — Prints help information

## biome rage

Prints information for debugging.

**Usage**: biome rage [--daemon-logs] [--formatter] [--linter]

**Global options applied to all commands**
- --colors=<off|force> — Set the formatting mode for markup: "off" prints everything as plain text, "force" forces the formatting of markup using ANSI even if the console output is determined to be incompatible
- --use-server — Connect to a running instance of the Biome daemon server.
- --verbose — Print additional diagnostics, and some diagnostics show more information. Also, print out what files were processed and which ones were modified.
- --config-path=PATH — Set the file path to the configuration file, or the directory path to find biome.json or biome.jsonc. If used, it disables the default configuration file resolution.
- --max-diagnostics=<none|<NUMBER>> — Cap the amount of diagnostics displayed. When none is provided, the limit is lifted. [default: 20]
- --skip-errors — Skip over files containing syntax errors instead of emitting an error diagnostic.
- --no-errors-on-unmatched — Silence errors that would be emitted in case no files were processed during the execution of the command.
- --error-on-warnings — Tell Biome to exit with an error code if some diagnostics emit warnings.
- --reporter=<json|json-pretty|github|junit|summary|gitlab> — Allows to change how diagnostics and summary are reported.
- --log-level=<none|debug|info|warn|error> — The level of logging. In order, from the most verbose to the least verbose: debug, info, warn, error. The value none won't show any logging. [default: none]
- --log-kind=<pretty|compact|json> — How the log should look like. [default: pretty]
- --diagnostic-level=<info|warn|error> — The level of diagnostics to show. In order, from the lowest to the most important: info, warn, error. Passing --diagnostic-level=error will cause Biome to print only diagnostics that contain only errors. [default: info]

**Available options:**
- --daemon-logs — Prints the Biome daemon server logs
- --formatter — Prints the formatter options applied
- --linter — Prints the linter options applied
- -h, --help — Prints help information

## biome start

Starts the Biome daemon server process.

**Usage**: biome start [--config-path=PATH]

**Available options:**
- --log-prefix-name=STRING — Allows to change the prefix applied to the file name of the logs. Uses environment variable BIOME_LOG_PREFIX_NAME [default: server.log]
- --log-path=PATH — Allows to change the folder where logs are stored. Uses environment variable BIOME_LOG_PATH
- --config-path=PATH — Allows to set a custom file path to the configuration file, or a custom directory path to find biome.json or biome.jsonc. Uses environment variable BIOME_CONFIG_PATH
- -h, --help — Prints help information

## biome stop

Stops the Biome daemon server process.

**Usage**: biome stop 

**Available options:**
- -h, --help — Prints help information

## biome check

Runs formatter, linter and import sorting to the requested files.

**Usage**: biome check [--write] [--unsafe] [--assists-enabled=<true|false>] [--staged] [--changed] [--since=REF] [PATH]...

**The configuration that is contained inside the file biome.json**
- --vcs-enabled=<true|false> — Whether Biome should integrate itself with the VCS client
- --vcs-client-kind=<git> — The kind of client.
- --vcs-use-ignore-file=<true|false> — Whether Biome should use the VCS ignore file. When [true], Biome will ignore the files specified in the ignore file.
- --vcs-root=PATH — The folder where Biome should check for VCS files. By default, Biome will use the same folder where biome.json was found. If Biome can't find the configuration, it will attempt to use the current working directory. If no current working directory can't be found, Biome won't use the VCS integration, and a diagnostic will be emitted
- --vcs-default-branch=BRANCH — The main branch of the project
- --files-max-size=NUMBER — The maximum allowed size for source code files in bytes. Files above this limit will be ignored for performance reasons. Defaults to 1 MiB
- --files-ignore-unknown=<true|false> — Tells Biome to not emit diagnostics when handling files that doesn't know
- --use-editorconfig=<true|false> — Use any .editorconfig files to configure the formatter. Configuration in biome.json will override .editorconfig configuration. Default: false.
- --indent-style=<tab|space> — The indent style.
- --indent-size=NUMBER — The size of the indentation, 2 by default (deprecated, use indent-width)
- --indent-width=NUMBER — The size of the indentation, 2 by default
- --line-ending=<lf|crlf|cr> — The type of line ending.
- --line-width=NUMBER — What's the max width of a line. Defaults to 80.
- --attribute-position=<multiline|auto> — The attribute position style in HTMLish languages. By default auto.
- --bracket-spacing=<true|false> — Whether to insert spaces around brackets in object literals. Defaults to true.
- --jsx-quote-style=<double|single> — The type of quotes used in JSX. Defaults to double.
- --quote-properties=<preserve|as-needed> — When properties in objects are quoted. Defaults to asNeeded.
- --trailing-comma=<all|es5|none> — Print trailing commas wherever possible in multi-line comma-separated syntactic structures. Defaults to "all".
- --trailing-commas=<all|es5|none> — Print trailing commas wherever possible in multi-line comma-separated syntactic structures. Defaults to "all".
- --semicolons=<always|as-needed> — Whether the formatter prints semicolons for all statements or only in for statements where it is necessary because of ASI.
- --arrow-parentheses=<always|as-needed> — Whether to add non-necessary parentheses to arrow functions. Defaults to "always".
- --bracket-same-line=<true|false> — Whether to hug the closing bracket of multiline HTML/JSX tags to the end of the last line, rather than being alone on the following line. Defaults to false.
- --javascript-formatter-enabled=<true|false> — Control the formatter for JavaScript (and its super languages) files.
- --javascript-formatter-indent-style=<tab|space> — The indent style applied to JavaScript (and its super languages) files.
- --javascript-formatter-indent-size=NUMBER — The size of the indentation applied to JavaScript (and its super languages) files. Default to 2.
- --javascript-formatter-indent-width=NUMBER — The size of the indentation applied to JavaScript (and its super languages) files. Default to 2.
- --javascript-formatter-line-ending=<lf|crlf|cr> — The type of line ending applied to JavaScript (and its super languages) files.
- --javascript-formatter-line-width=NUMBER — What's the max width of a line applied to JavaScript (and its super languages) files. Defaults to 80.
- --quote-style=<double|single> — The type of quotes used in JavaScript code. Defaults to double.
- --javascript-attribute-position=<multiline|auto> — The attribute position style in jsx elements. Defaults to auto.
- --javascript-linter-enabled=<true|false> — Control the linter for JavaScript (and its super languages) files.
- --javascript-assists-enabled=<true|false> — Control the linter for JavaScript (and its super languages) files.
- --json-formatter-enabled=<true|false> — Control the formatter for JSON (and its super languages) files.
- --json-formatter-indent-style=<tab|space> — The indent style applied to JSON (and its super languages) files.
- --json-formatter-indent-width=NUMBER — The size of the indentation applied to JSON (and its super languages) files. Default to 2.
- --json-formatter-indent-size=NUMBER — The size of the indentation applied to JSON (and its super languages) files. Default to 2.
- --json-formatter-line-ending=<lf|crlf|cr> — The type of line ending applied to JSON (and its super languages) files.
- --json-formatter-line-width=NUMBER — What's the max width of a line applied to JSON (and its super languages) files. Defaults to 80.
- --json-formatter-trailing-commas=<none|all> — Print trailing commas wherever possible in multi-line comma-separated syntactic structures. Defaults to "none".
- --json-linter-enabled=<true|false> — Control the linter for JSON (and its super languages) files.
- --json-assists-enabled=<true|false> — Control the linter for JSON (and its super languages) files.
- --css-formatter-enabled=<true|false> — Control the formatter for CSS (and its super languages) files.
- --css-formatter-indent-style=<tab|space> — The indent style applied to CSS (and its super languages) files.
- --css-formatter-indent-width=NUMBER — The size of the indentation applied to CSS (and its super languages) files. Default to 2.
- --css-formatter-line-ending=<lf|crlf|cr> — The type of line ending applied to CSS (and its super languages) files.
- --css-formatter-line-width=NUMBER — What's the max width of a line applied to CSS (and its super languages) files. Defaults to 80.
- --css-formatter-quote-style=<double|single> — The type of quotes used in CSS code. Defaults to double.
- --css-linter-enabled=<true|false> — Control the linter for CSS files.
- --css-assists-enabled=<true|false> — Control the assists for CSS files.
- --graphql-formatter-enabled=<true|false> — Control the formatter for GraphQL files.
- --graphql-formatter-indent-style=<tab|space> — The indent style applied to GraphQL files.
- --graphql-formatter-indent-width=NUMBER — The size of the indentation applied to GraphQL files. Default to 2.
- --graphql-formatter-line-ending=<lf|crlf|cr> — The type of line ending applied to GraphQL files.
- --graphql-formatter-line-width=NUMBER — What's the max width of a line applied to GraphQL files. Defaults to 80.
- --graphql-formatter-quote-style=<double|single> — The type of quotes used in GraphQL code. Defaults to double.
- --graphql-linter-enabled=<true|false> — Control the formatter for GraphQL files.
- --assists-enabled=<true|false> — Whether Biome should enable assists via LSP.

**Global options applied to all commands**
- --colors=<off|force> — Set the formatting mode for markup: "off" prints everything as plain text, "force" forces the formatting of markup using ANSI even if the console output is determined to be incompatible
- --use-server — Connect to a running instance of the Biome daemon server.
- --verbose — Print additional diagnostics, and some diagnostics show more information. Also, print out what files were processed and which ones were modified.
- --config-path=PATH — Set the file path to the configuration file, or the directory path to find biome.json or biome.jsonc. If used, it disables the default configuration file resolution.
- --max-diagnostics=<none|<NUMBER>> — Cap the amount of diagnostics displayed. When none is provided, the limit is lifted. [default: 20]
- --skip-errors — Skip over files containing syntax errors instead of emitting an error diagnostic.
- --no-errors-on-unmatched — Silence errors that would be emitted in case no files were processed during the execution of the command.
- --error-on-warnings — Tell Biome to exit with an error code if some diagnostics emit warnings.
- --reporter=<json|json-pretty|github|junit|summary|gitlab> — Allows to change how diagnostics and summary are reported.
- --log-level=<none|debug|info|warn|error> — The level of logging. In order, from the most verbose to the least verbose: debug, info, warn, error. The value none won't show any logging. [default: none]
- --log-kind=<pretty|compact|json> — How the log should look like. [default: pretty]
- --diagnostic-level=<info|warn|error> — The level of diagnostics to show. In order, from the lowest to the most important: info, warn, error. Passing --diagnostic-level=error will cause Biome to print only diagnostics that contain only errors. [default: info]

**Available positional items:**
- PATH — Single file, single path or list of paths

**Available options:**
- --write — Writes safe fixes, formatting and import sorting
- --unsafe — Allow to do unsafe fixes, should be used with --write or --fix
- --fix — Alias for --write, writes safe fixes, formatting and import sorting
- --apply — Alias for --write, writes safe fixes, formatting and import sorting (deprecated, use --write)
- --apply-unsafe — Alias for --write --unsafe, writes safe and unsafe fixes, formatting and import sorting (deprecated, use --write --unsafe)
- --formatter-enabled=<true|false> — Allow to enable or disable the formatter check.
- --linter-enabled=<true|false> — Allow to enable or disable the linter check.
- --organize-imports-enabled=<true|false> — Allow to enable or disable the organize imports.
- --assists-enabled=<true|false> — Allow to enable or disable the assists.
- --stdin-file-path=PATH — Use this option when you want to format code piped from stdin, and print the output to stdout. The file doesn't need to exist on disk, what matters is the extension of the file. Based on the extension, Biome knows how to check the code. Example: echo 'let a;' | biome check --stdin-file-path=file.js
- --staged — When set to true, only the files that have been staged (the ones prepared to be committed) will be linted. This option should be used when working locally.
- --changed — When set to true, only the files that have been changed compared to your defaultBranch configuration will be linted. This option should be used in CI environments.
- --since=REF — Use this to specify the base branch to compare against when you're using the --changed flag and the defaultBranch is not set in your biome.json
- -h, --help — Prints help information

## biome lint

Run various checks on a set of files.

**Usage**: biome lint [--write] [--unsafe] [--only=<GROUP|RULE>]... [--skip=<GROUP|RULE>]... [--staged] [--changed] [--since=REF] [PATH]...

**Set of properties to integrate Biome with a VCS software.**
- --vcs-enabled=<true|false> — Whether Biome should integrate itself with the VCS client
- --vcs-client-kind=<git> — The kind of client.
- --vcs-use-ignore-file=<true|false> — Whether Biome should use the VCS ignore file. When [true], Biome will ignore the files specified in the ignore file.
- --vcs-root=PATH — The folder where Biome should check for VCS files. By default, Biome will use the same folder where biome.json was found. If Biome can't find the configuration, it will attempt to use the current working directory. If no current working directory can't be found, Biome won't use the VCS integration, and a diagnostic will be emitted
- --vcs-default-branch=BRANCH — The main branch of the project

**The configuration of the filesystem**
- --files-max-size=NUMBER — The maximum allowed size for source code files in bytes. Files above this limit will be ignored for performance reasons. Defaults to 1 MiB
- --files-ignore-unknown=<true|false> — Tells Biome to not emit diagnostics when handling files that doesn't know

**Linter options specific to the JavaScript linter**
- --javascript-linter-enabled=<true|false> — Control the linter for JavaScript (and its super languages) files.

**Linter options specific to the JSON linter**
- --json-linter-enabled=<true|false> — Control the linter for JSON (and its super languages) files.

**Global options applied to all commands**
- --colors=<off|force> — Set the formatting mode for markup: "off" prints everything as plain text, "force" forces the formatting of markup using ANSI even if the console output is determined to be incompatible
- --use-server — Connect to a running instance of the Biome daemon server.
- --verbose — Print additional diagnostics, and some diagnostics show more information. Also, print out what files were processed and which ones were modified.
- --config-path=PATH — Set the file path to the configuration file, or the directory path to find biome.json or biome.jsonc. If used, it disables the default configuration file resolution.
- --max-diagnostics=<none|<NUMBER>> — Cap the amount of diagnostics displayed. When none is provided, the limit is lifted. [default: 20]
- --skip-errors — Skip over files containing syntax errors instead of emitting an error diagnostic.
- --no-errors-on-unmatched — Silence errors that would be emitted in case no files were processed during the execution of the command.
- --error-on-warnings — Tell Biome to exit with an error code if some diagnostics emit warnings.
- --reporter=<json|json-pretty|github|junit|summary|gitlab> — Allows to change how diagnostics and summary are reported.
- --log-level=<none|debug|info|warn|error> — The level of logging. In order, from the most verbose to the least verbose: debug, info, warn, error. The value none won't show any logging. [default: none]
- --log-kind=<pretty|compact|json> — How the log should look like. [default: pretty]
- --diagnostic-level=<info|warn|error> — The level of diagnostics to show. In order, from the lowest to the most important: info, warn, error. Passing --diagnostic-level=error will cause Biome to print only diagnostics that contain only errors. [default: info]

**Available positional items:**
- PATH — Single file, single path or list of paths

**Available options:**
- --write — Writes safe fixes
- --unsafe — Allow to do unsafe fixes, should be used with --write or --fix
- --fix — Alias for --write, writes safe fixes
- --apply — Alias for --write, writes safe fixes (deprecated, use --write)
- --apply-unsafe — Alias for --write --unsafe, writes safe and unsafe fixes (deprecated, use --write --unsafe)
- --only=<GROUP|RULE> — Run only the given rule or group of rules. If the severity level of a rule is off, then the severity level of the rule is set to error if it is a recommended rule or warn otherwise. Example: biome lint --only=correctness/noUnusedVariables --only=suspicious
- --skip=<GROUP|RULE> — Skip the given rule or group of rules by setting the severity level of the rules to off. This option takes precedence over --only. Example: biome lint --skip=correctness/noUnusedVariables --skip=suspicious
- --stdin-file-path=PATH — Use this option when you want to format code piped from stdin, and print the output to stdout. The file doesn't need to exist on disk, what matters is the extension of the file. Based on the extension, Biome knows how to lint the code. Example: echo 'let a;' | biome lint --stdin-file-path=file.js
- --staged — When set to true, only the files that have been staged (the ones prepared to be committed) will be linted.
- --changed — When set to true, only the files that have been changed compared to your defaultBranch configuration will be linted.
- --since=REF — Use this to specify the base branch to compare against when you're using the --changed flag and the defaultBranch is not set in your biome.json
- -h, --help — Prints help information

## biome format

Run the formatter on a set of files.

**Usage**: biome format [--write] [--staged] [--changed] [--since=REF] [PATH]...

**Generic options applied to all files**
- --use-editorconfig=<true|false> — Use any .editorconfig files to configure the formatter. Configuration in biome.json will override .editorconfig configuration. Default: false.
- --indent-style=<tab|space> — The indent style.
- --indent-size=NUMBER — The size of the indentation, 2 by default (deprecated, use indent-width)
- --indent-width=NUMBER — The size of the indentation, 2 by default
- --line-ending=<lf|crlf|cr> — The type of line ending.
- --line-width=NUMBER — What's the max width of a line. Defaults to 80.
- --attribute-position=<multiline|auto> — The attribute position style in HTMLish languages. By default auto.
- --bracket-spacing=<true|false> — Whether to insert spaces around brackets in object literals. Defaults to true.

**Formatting options specific to the JavaScript files**
- --jsx-quote-style=<double|single> — The type of quotes used in JSX. Defaults to double.
- --quote-properties=<preserve|as-needed> — When properties in objects are quoted. Defaults to asNeeded.
- --trailing-comma=<all|es5|none> — Print trailing commas wherever possible in multi-line comma-separated syntactic structures. Defaults to "all".
- --trailing-commas=<all|es5|none> — Print trailing commas wherever possible in multi-line comma-separated syntactic structures. Defaults to "all".
- --semicolons=<always|as-needed> — Whether the formatter prints semicolons for all statements or only in for statements where it is necessary because of ASI.
- --arrow-parentheses=<always|as-needed> — Whether to add non-necessary parentheses to arrow functions. Defaults to "always".
- --bracket-same-line=<true|false> — Whether to hug the closing bracket of multiline HTML/JSX tags to the end of the last line, rather than being alone on the following line. Defaults to false.
- --javascript-formatter-enabled=<true|false> — Control the formatter for JavaScript (and its super languages) files.
- --javascript-formatter-indent-style=<tab|space> — The indent style applied to JavaScript (and its super languages) files.
- --javascript-formatter-indent-size=NUMBER — The size of the indentation applied to JavaScript (and its super languages) files. Default to 2.
- --javascript-formatter-indent-width=NUMBER — The size of the indentation applied to JavaScript (and its super languages) files. Default to 2.
- --javascript-formatter-line-ending=<lf|crlf|cr> — The type of line ending applied to JavaScript (and its super languages) files.
- --javascript-formatter-line-width=NUMBER — What's the max width of a line applied to JavaScript (and its super languages) files. Defaults to 80.
- --quote-style=<double|single> — The type of quotes used in JavaScript code. Defaults to double.
- --javascript-attribute-position=<multiline|auto> — The attribute position style in jsx elements. Defaults to auto.
- --bracket-spacing=<true|false> — Whether to insert spaces around brackets in object literals. Defaults to true.

**Set of properties to integrate Biome with a VCS software.**
- --vcs-enabled=<true|false> — Whether Biome should integrate itself with the VCS client
- --vcs-client-kind=<git> — The kind of client.
- --vcs-use-ignore-file=<true|false> — Whether Biome should use the VCS ignore file. When [true], Biome will ignore the files specified in the ignore file.
- --vcs-root=PATH — The folder where Biome should check for VCS files. By default, Biome will use the same folder where biome.json was found. If Biome can't find the configuration, it will attempt to use the current working directory. If no current working directory can't be found, Biome won't use the VCS integration, and a diagnostic will be emitted
- --vcs-default-branch=BRANCH — The main branch of the project

**The configuration of the filesystem**
- --files-max-size=NUMBER — The maximum allowed size for source code files in bytes. Files above this limit will be ignored for performance reasons. Defaults to 1 MiB
- --files-ignore-unknown=<true|false> — Tells Biome to not emit diagnostics when handling files that doesn't know

**Global options applied to all commands**
- --colors=<off|force> — Set the formatting mode for markup: "off" prints everything as plain text, "force" forces the formatting of markup using ANSI even if the console output is determined to be incompatible
- --use-server — Connect to a running instance of the Biome daemon server.
- --verbose — Print additional diagnostics, and some diagnostics show more information. Also, print out what files were processed and which ones were modified.
- --config-path=PATH — Set the file path to the configuration file, or the directory path to find biome.json or biome.jsonc. If used, it disables the default configuration file resolution.
- --max-diagnostics=<none|<NUMBER>> — Cap the amount of diagnostics displayed. When none is provided, the limit is lifted. [default: 20]
- --skip-errors — Skip over files containing syntax errors instead of emitting an error diagnostic.
- --no-errors-on-unmatched — Silence errors that would be emitted in case no files were processed during the execution of the command.
- --error-on-warnings — Tell Biome to exit with an error code if some diagnostics emit warnings.
- --reporter=<json|json-pretty|github|junit|summary|gitlab> — Allows to change how diagnostics and summary are reported.
- --log-level=<none|debug|info|warn|error> — The level of logging. In order, from the most verbose to the least verbose: debug, info, warn, error. The value none won't show any logging. [default: none]
- --log-kind=<pretty|compact|json> — How the log should look like. [default: pretty]
- --diagnostic-level=<info|warn|error> — The level of diagnostics to show. In order, from the lowest to the most important: info, warn, error. Passing --diagnostic-level=error will cause Biome to print only diagnostics that contain only errors. [default: info]

**Available positional items:**
- PATH — Single file, single path or list of paths.

**Available options:**
- --json-formatter-enabled=<true|false> — Control the formatter for JSON (and its super languages) files.
- --json-formatter-indent-style=<tab|space> — The indent style applied to JSON (and its super languages) files.
- --json-formatter-indent-width=NUMBER — The size of the indentation applied to JSON (and its super languages) files. Default to 2.
- --json-formatter-indent-size=NUMBER — The size of the indentation applied to JSON (and its super languages) files. Default to 2.
- --json-formatter-line-ending=<lf|crlf|cr> — The type of line ending applied to JSON (and its super languages) files.
- --json-formatter-line-width=NUMBER — What's the max width of a line applied to JSON (and its super languages) files. Defaults to 80.
- --json-formatter-trailing-commas=<none|all> — Print trailing commas wherever possible in multi-line comma-separated syntactic structures. Defaults to "none".
- --stdin-file-path=PATH — Use this option when you want to format code piped from stdin, and print the output to stdout. The file doesn't need to exist on disk, what matters is the extension of the file. Based on the extension, Biome knows how to format the code. Example: echo 'let a;' | biome format --stdin-file-path=file.js
- --write — Writes formatted files to file system.
- --fix — Alias of --write, writes formatted files to file system.
- --staged — When set to true, only the files that have been staged (the ones prepared to be committed) will be linted.
- --changed — When set to true, only the files that have been changed compared to your defaultBranch configuration will be linted.
- --since=REF — Use this to specify the base branch to compare against when you're using the --changed flag and the defaultBranch is not set in your biome.json
- -h, --help — Prints help information

## biome ci

Command to use in CI environments. Runs formatter, linter and import sorting to the requested files.

Files won't be modified, the command is a read-only operation.

**Usage**: biome ci [--formatter-enabled=<true|false>] [--linter-enabled=<true|false>] [--organize-imports-enabled=<true|false>] [--assists-enabled=<true|false>] [--changed] [--since=REF] [PATH]...

**The configuration that is contained inside the file biome.json**
- --vcs-enabled=<true|false> — Whether Biome should integrate itself with the VCS client
- --vcs-client-kind=<git> — The kind of client.
- --vcs-use-ignore-file=<true|false> — Whether Biome should use the VCS ignore file. When [true], Biome will ignore the files specified in the ignore file.
- --vcs-root=PATH — The folder where Biome should check for VCS files. By default, Biome will use the same folder where biome.json was found. If Biome can't find the configuration, it will attempt to use the current working directory. If no current working directory can't be found, Biome won't use the VCS integration, and a diagnostic will be emitted
- --vcs-default-branch=BRANCH — The main branch of the project
- --files-max-size=NUMBER — The maximum allowed size for source code files in bytes. Files above this limit will be ignored for performance reasons. Defaults to 1 MiB
- --files-ignore-unknown=<true|false> — Tells Biome to not emit diagnostics when handling files that doesn't know
- --use-editorconfig=<true|false> — Use any .editorconfig files to configure the formatter. Configuration in biome.json will override .editorconfig configuration. Default: false.
- --indent-style=<tab|space> — The indent style.
- --indent-size=NUMBER — The size of the indentation, 2 by default (deprecated, use indent-width)
- --indent-width=NUMBER — The size of the indentation, 2 by default
- --line-ending=<lf|crlf|cr> — The type of line ending.
- --line-width=NUMBER — What's the max width of a line. Defaults to 80.
- --attribute-position=<multiline|auto> — The attribute position style in HTMLish languages. By default auto.
- --bracket-spacing=<true|false> — Whether to insert spaces around brackets in object literals. Defaults to true.
- --jsx-quote-style=<double|single> — The type of quotes used in JSX. Defaults to double.
- --quote-properties=<preserve|as-needed> — When properties in objects are quoted. Defaults to asNeeded.
- --trailing-comma=<all|es5|none> — Print trailing commas wherever possible in multi-line comma-separated syntactic structures. Defaults to "all".
- --trailing-commas=<all|es5|none> — Print trailing commas wherever possible in multi-line comma-separated syntactic structures. Defaults to "all".
- --semicolons=<always|as-needed> — Whether the formatter prints semicolons for all statements or only in for statements where it is necessary because of ASI.
- --arrow-parentheses=<always|as-needed> — Whether to add non-necessary parentheses to arrow functions. Defaults to "always".
- --bracket-same-line=<true|false> — Whether to hug the closing bracket of multiline HTML/JSX tags to the end of the last line, rather than being alone on the following line. Defaults to false.
- --javascript-formatter-enabled=<true|false> — Control the formatter for JavaScript (and its super languages) files.
- --javascript-formatter-indent-style=<tab|space> — The indent style applied to JavaScript (and its super languages) files.
- --javascript-formatter-indent-size=NUMBER — The size of the indentation applied to JavaScript (and its super languages) files. Default to 2.
- --javascript-formatter-indent-width=NUMBER — The size of the indentation applied to JavaScript (and its super languages) files. Default to 2.
- --javascript-formatter-line-ending=<lf|crlf|cr> — The type of line ending applied to JavaScript (and its super languages) files.
- --javascript-formatter-line-width=NUMBER — What's the max width of a line applied to JavaScript (and its super languages) files. Defaults to 80.
- --quote-style=<double|single> — The type of quotes used in JavaScript code. Defaults to double.
- --javascript-attribute-position=<multiline|auto> — The attribute position style in jsx elements. Defaults to auto.
- --javascript-linter-enabled=<true|false> — Control the linter for JavaScript (and its super languages) files.
- --javascript-assists-enabled=<true|false> — Control the linter for JavaScript (and its super languages) files.
- --json-formatter-enabled=<true|false> — Control the formatter for JSON (and its super languages) files.
- --json-formatter-indent-style=<tab|space> — The indent style applied to JSON (and its super languages) files.
- --json-formatter-indent-width=NUMBER — The size of the indentation applied to JSON (and its super languages) files. Default to 2.
- --json-formatter-indent-size=NUMBER — The size of the indentation applied to JSON (and its super languages) files. Default to 2.
- --json-formatter-line-ending=<lf|crlf|cr> — The type of line ending applied to JSON (and its super languages) files.
- --json-formatter-line-width=NUMBER — What's the max width of a line applied to JSON (and its super languages) files. Defaults to 80.
- --json-formatter-trailing-commas=<none|all> — Print trailing commas wherever possible in multi-line comma-separated syntactic structures. Defaults to "none".
- --json-linter-enabled=<true|false> — Control the linter for JSON (and its super languages) files.
- --json-assists-enabled=<true|false> — Control the linter for JSON (and its super languages) files.
- --css-formatter-enabled=<true|false> — Control the formatter for CSS (and its super languages) files.
- --css-formatter-indent-style=<tab|space> — The indent style applied to CSS (and its super languages) files.
- --css-formatter-indent-width=NUMBER — The size of the indentation applied to CSS (and its super languages) files. Default to 2.
- --css-formatter-line-ending=<lf|crlf|cr> — The type of line ending applied to CSS (and its super languages) files.
- --css-formatter-line-width=NUMBER — What's the max width of a line applied to CSS (and its super languages) files. Defaults to 80.
- --css-formatter-quote-style=<double|single> — The type of quotes used in CSS code. Defaults to double.
- --css-linter-enabled=<true|false> — Control the linter for CSS files.
- --css-assists-enabled=<true|false> — Control the assists for CSS files.
- --graphql-formatter-enabled=<true|false> — Control the formatter for GraphQL files.
- --graphql-formatter-indent-style=<tab|space> — The indent style applied to GraphQL files.
- --graphql-formatter-indent-width=NUMBER — The size of the indentation applied to GraphQL files. Default to 2.
- --graphql-formatter-line-ending=<lf|crlf|cr> — The type of line ending applied to GraphQL files.
- --graphql-formatter-line-width=NUMBER — What's the max width of a line applied to GraphQL files. Defaults to 80.
- --graphql-formatter-quote-style=<double|single> — The type of quotes used in GraphQL code. Defaults to double.
- --graphql-linter-enabled=<true|false> — Control the formatter for GraphQL files.
- --assists-enabled=<true|false> — Whether Biome should enable assists via LSP.

**Global options applied to all commands**
- --colors=<off|force> — Set the formatting mode for markup: "off" prints everything as plain text, "force" forces the formatting of markup using ANSI even if the console output is determined to be incompatible
- --use-server — Connect to a running instance of the Biome daemon server.
- --verbose — Print additional diagnostics, and some diagnostics show more information. Also, print out what files were processed and which ones were modified.
- --config-path=PATH — Set the file path to the configuration file, or the directory path to find biome.json or biome.jsonc. If used, it disables the default configuration file resolution.
- --max-diagnostics=<none|<NUMBER>> — Cap the amount of diagnostics displayed. When none is provided, the limit is lifted. [default: 20]
- --skip-errors — Skip over files containing syntax errors instead of emitting an error diagnostic.
- --no-errors-on-unmatched — Silence errors that would be emitted in case no files were processed during the execution of the command.
- --error-on-warnings — Tell Biome to exit with an error code if some diagnostics emit warnings.
- --reporter=<json|json-pretty|github|junit|summary|gitlab> — Allows to change how diagnostics and summary are reported.
- --log-level=<none|debug|info|warn|error> — The level of logging. In order, from the most verbose to the least verbose: debug, info, warn, error. The value none won't show any logging. [default: none]
- --log-kind=<pretty|compact|json> — How the log should look like. [default: pretty]
- --diagnostic-level=<info|warn|error> — The level of diagnostics to show. In order, from the lowest to the most important: info, warn, error. Passing --diagnostic-level=error will cause Biome to print only diagnostics that contain only errors. [default: info]

**Available positional items:**
- PATH — Single file, single path or list of paths.

**Available options:**
- --formatter-enabled=<true|false> — Allow to enable or disable the formatter check.
- --linter-enabled=<true|false> — Allow to enable or disable the linter check.
- --organize-imports-enabled=<true|false> — Allow to enable or disable the organize imports.
- --assists-enabled=<true|false> — Allow to enable or disable the assists.
- --changed — When set to true, only the files that have been changed compared to your defaultBranch configuration will be linted.
- --since=REF — Use this to specify the base branch to compare against when you're using the --changed flag and the defaultBranch is not set in your biome.json
- -h, --help — Prints help information

## biome init

Bootstraps a new biome project. Creates a configuration file with some defaults.

**Usage**: biome init [--jsonc]

**Available options:**
- --jsonc — Tells Biome to emit a biome.jsonc file.
- -h, --help — Prints help information

## biome lsp-proxy

Acts as a server for the Language Server Protocol over stdin/stdout.

**Usage**: biome lsp-proxy [--config-path=PATH]

**Available options:**
- --log-prefix-name=STRING — Allows to change the prefix applied to the file name of the logs. Uses environment variable BIOME_LOG_PREFIX_NAME [default: server.log]
- --log-path=PATH — Allows to change the folder where logs are stored. Uses environment variable BIOME_LOG_PATH
- --config-path=PATH — Allows to set a custom file path to the configuration file, or a custom directory path to find biome.json or biome.jsonc. Uses environment variable BIOME_CONFIG_PATH
- -h, --help — Prints help information

## biome migrate

Updates the configuration when there are breaking changes.

**Usage**: biome migrate [--write] [COMMAND ...]

**Global options applied to all commands**
- --colors=<off|force> — Set the formatting mode for markup: "off" prints everything as plain text, "force" forces the formatting of markup using ANSI even if the console output is determined to be incompatible
- --use-server — Connect to a running instance of the Biome daemon server.
- --verbose — Print additional diagnostics, and some diagnostics show more information. Also, print out what files were processed and which ones were modified.
- --config-path=PATH — Set the file path to the configuration file, or the directory path to find biome.json or biome.jsonc. If used, it disables the default configuration file resolution.
- --max-diagnostics=<none|<NUMBER>> — Cap the amount of diagnostics displayed. When none is provided, the limit is lifted. [default: 20]
- --skip-errors — Skip over files containing syntax errors instead of emitting an error diagnostic.
- --no-errors-on-unmatched — Silence errors that would be emitted in case no files were processed during the execution of the command.
- --error-on-warnings — Tell Biome to exit with an error code if some diagnostics emit warnings.
- --reporter=<json|json-pretty|github|junit|summary|gitlab> — Allows to change how diagnostics and summary are reported.
- --log-level=<none|debug|info|warn|error> — The level of logging. In order, from the most verbose to the least verbose: debug, info, warn, error. The value none won't show any logging. [default: none]
- --log-kind=<pretty|compact|json> — How the log should look like. [default: pretty]
- --diagnostic-level=<info|warn|error> — The level of diagnostics to show. In order, from the lowest to the most important: info, warn, error. Passing --diagnostic-level=error will cause Biome to print only diagnostics that contain only errors. [default: info]

**Available options:**
- --write — Writes the new configuration file to disk
- --fix — Alias of --write, writes the new configuration file to disk
- -h, --help — Prints help information

**Available commands:**
- prettier — It attempts to find the files .prettierrc/prettier.json and .prettierignore, and map the Prettier's configuration into Biome's configuration file.
- eslint — It attempts to find the ESLint configuration file in the working directory, and update the Biome's configuration file as a result.

## biome migrate prettier

It attempts to find the files .prettierrc/prettier.json and .prettierignore, and map the Prettier's configuration into Biome's configuration file.

**Usage**: biome migrate prettier 

**Available options:**
- -h, --help — Prints help information

## biome migrate eslint

It attempts to find the ESLint configuration file in the working directory, and update the Biome's configuration file as a result.

**Usage**: biome migrate eslint [--include-inspired] [--include-nursery]

**Available options:**
- --include-inspired — Includes rules inspired from an eslint rule in the migration
- --include-nursery — Includes nursery rules in the migration
- -h, --help — Prints help information

## biome search

EXPERIMENTAL: Searches for Grit patterns across a project.

Note: GritQL escapes code snippets using backticks, but most shells interpret backticks as command invocations. To avoid this, it's best to put single quotes around your Grit queries.

## Example

```shell
biome search '`console.log($message)`' # find all `console.log` invocations
```

**Usage**: biome search PATTERN [PATH]...

**Global options applied to all commands**
- --colors=<off|force> — Set the formatting mode for markup: "off" prints everything as plain text, "force" forces the formatting of markup using ANSI even if the console output is determined to be incompatible
- --use-server — Connect to a running instance of the Biome daemon server.
- --verbose — Print additional diagnostics, and some diagnostics show more information. Also, print out what files were processed and which ones were modified.
- --config-path=PATH — Set the file path to the configuration file, or the directory path to find biome.json or biome.jsonc. If used, it disables the default configuration file resolution.
- --max-diagnostics=<none|<NUMBER>> — Cap the amount of diagnostics displayed. When none is provided, the limit is lifted. [default: 20]
- --skip-errors — Skip over files containing syntax errors instead of emitting an error diagnostic.
- --no-errors-on-unmatched — Silence errors that would be emitted in case no files were processed during the execution of the command.
- --error-on-warnings — Tell Biome to exit with an error code if some diagnostics emit warnings.
- --reporter=<json|json-pretty|github|junit|summary|gitlab> — Allows to change how diagnostics and summary are reported.
- --log-level=<none|debug|info|warn|error> — The level of logging. In order, from the most verbose to the least verbose: debug, info, warn, error. The value none won't show any logging. [default: none]
- --log-kind=<pretty|compact|json> — How the log should look like. [default: pretty]
- --diagnostic-level=<info|warn|error> — The level of diagnostics to show. In order, from the lowest to the most important: info, warn, error. Passing --diagnostic-level=error will cause Biome to print only diagnostics that contain only errors. [default: info]

**The configuration of the filesystem**
- --files-max-size=NUMBER — The maximum allowed size for source code files in bytes. Files above this limit will be ignored for performance reasons. Defaults to 1 MiB
- --files-ignore-unknown=<true|false> — Tells Biome to not emit diagnostics when handling files that doesn't know

**Set of properties to integrate Biome with a VCS software.**
- --vcs-enabled=<true|false> — Whether Biome should integrate itself with the VCS client
- --vcs-client-kind=<git> — The kind of client.
- --vcs-use-ignore-file=<true|false> — Whether Biome should use the VCS ignore file. When [true], Biome will ignore the files specified in the ignore file.
- --vcs-root=PATH — The folder where Biome should check for VCS files. By default, Biome will use the same folder where biome.json was found. If Biome can't find the configuration, it will attempt to use the current working directory. If no current working directory can't be found, Biome won't use the VCS integration, and a diagnostic will be emitted
- --vcs-default-branch=BRANCH — The main branch of the project

**Available positional items:**
- PATTERN — The GritQL pattern to search for. Note that the search command (currently) does not support rewrites.
- PATH — Single file, single path or list of paths.

**Available options:**
- --stdin-file-path=PATH — Use this option when you want to search through code piped from stdin, and print the output to stdout. The file doesn't need to exist on disk, what matters is the extension of the file. Based on the extension, Biome knows how to parse the code. Example: echo 'let a;' | biome search '`let $var`' --stdin-file-path=file.js
- -h, --help — Prints help information

## biome explain

Shows documentation of various aspects of the CLI.

## Examples

```shell
biome explain noDebugger
```

```shell
biome explain daemon-logs
```

**Usage**: biome explain NAME

**Available positional items:**
- NAME — Single name to display documentation for.

**Available options:**
- -h, --help — Prints help information

## biome clean

Cleans the logs emitted by the daemon.

**Usage**: biome clean 

**Available options:**
- -h, --help — Prints help information

## Useful information

- When encountering symbolic links, the CLI will expand them until three levels deep. Deeper levels will result in an error diagnostic.