# Linter

Biome's linter statically analyzes your code to find and fix common errors and to help you write better, modern code.
It supports multiple languages and provides a total of [**rules**](https://github.com/biomejs/biome/blob/main/docs/linter/rules.md).

## Rules

The linter is organized into rules.
A rule emits a diagnostic when it encounters a code that doesn't meet its requirements.
For example, the [noDebugger](https://github.com/biomejs/biome/blob/main/docs/linter/rules/no-debugger.md) rule reports the use of the `debugger` instruction in JavaScript code.

A rule emits diagnostics with a `info`, `warn` or `error` severity.
Diagnostics with an `error` severity cause the command to exit with a non-zero code,
While diagnostics with a `info` or a `warn` severity don't cause the command to fail.

You can cause a command that emits `warn` diagnostics to fail by using the `--error-on-warnings` option:

```shell
biome lint --error-on-warnings ./src
```

By default, the Biome linter only runs the [**recommended rules**](https://github.com/biomejs/biome/blob/main/docs/linter/rules.md#recommended-rules).
To disable _all rules_, you can disable the recommended rules in your Biome configuration file.
This may be useful in cases when you only want to enable a few rules.
The recommended rules emit diagnostics with the `error` severity.

The rules are divided into groups.
For example, the `noDebugger` rule is part of the [`suspicious` group](https://github.com/biomejs/biome/blob/main/docs/linter/rules.md#suspicious).
Rules from this group detect code that is likely to be incorrect or useless.
The description of each group can be found on the [rules page](https://github.com/biomejs/biome/blob/main/docs/linter/rules.md).

Unlike other linters, we don't provide any rules that check for code formatting.
This kind of checking is covered by our [code formatter](https://github.com/biomejs/biome/blob/main/docs/formatter.md).

Many rules provide a **code fix** that can be automatically applied.
Biome distinguishes between **safe** and **unsafe** code fixes.

### Safe fixes

Safe fixes are guaranteed to not change the semantic of your code.
They can be applied without explicit review.

To apply _safe fixes_, use `--write`:

```shell
biome lint --write ./src
```

### Unsafe fixes

Unsafe fixes may change the semantic of your program.
Therefore, it's advised to manually review the changes.

To apply both _safe fixes_ and _unsafe fixes_, use `--write --unsafe`:

```shell
biome lint --write --unsafe ./src
```

### Rule pillars

We believe that rules should be informative and explain to the user why a rule is triggered and tell the user what they should to do fix the error.
A rule should follow these **pillars**:

1. Explain to the user the error. Generally, this is the message of the diagnostic.
2. Explain to the user **why** the error is triggered. Generally, this is implemented with an additional node.
3. Tell the user what they should do. Generally, this is implemented using a code action.
If a code action is not applicable a note should tell the user what they should do to fix the error.

If you think a rule doesn't follow these pillars,
please [open an issue](https://github.com/biomejs/biome/issues/new?assignees=&labels=S-To+triage&projects=&template=01_bug.yml&title=%F0%9F%90%9B+%3CTITLE%3E).

## CLI

The following command runs the linter on all files in the `src` directory:

```shell
biome lint ./src
```

The command accepts a list of files and directories.

:::caution
If you pass a glob as a parameter, your shell will expand it.
The result of the expansion depends on your shell.
For example, some shells don't support the recursive glob `**` or the alternation `{}` in the following command:

```shell
biome lint ./src/**/*.test.{js,ts}
```

Shell expansion has a performance cost and a limit on the number of files you can pass to the command.
:::

For more information about all the available options, check the [CLI reference](https://github.com/biomejs/biome/blob/main/docs/reference/cli.md#biome-lint).

### Skip a rule or a group

Since version **v1.8.0**, the command `biome lint` accepts an option `--skip` that allows to disable a rule or rules that belong to a group.

For example, the following command skips all the rules that belong to the `style` group and the `suspicious/noExplicitAny` rule:

```shell
biome lint --skip=style --skip=suspicious/noExplicitAny
```

### Run a rule or a group

Since version **v1.8.0**, the command `biome lint` accepts an option `--only` that allows you to run a single rule or the rules that belong to a group.

For example, the following command runs only the rule`style/useNamingConvention`, the rule `style/noInferrableTypes` and the rules that belong to `a11y`. If the rule is disabled in the configuration, then its severity level is set to `error` for a recommended rule or `warn` otherwise.

```shell
biome lint --only=style/useNamingConvention --only=style/noInferrableTypes --only=a11y
```

## Configuration

A rule can be configured based on your needs.

### Disable a rule

A rule is enabled whether its severity is `error`, `warn` or `info`. You can turn off a rule with `off`.

The following configuration disables the recommended `noDebugger` rule and enables the `noShoutyConstants` and `useNamingConvention` rules.

The `warn` severity is useful in cases where there's a refactor going on and there's a need to make the CI pass. The diagnostic message is yellow. You can use `--error-on-warnings` to exit with an error code when a rule configured with `warn` is triggered.

The `info` severity won't affect the exit status code of the CLI, even when `--error-on-warnings` is passed. The diagnostic message color is blue.

```json
{
  "linter": {
    "rules": {
      "suspicious": {
        "noDebugger": "off",
        "noConsoleLog": "info"
      },
      "style": {
        "noShoutyConstants": "warn",
        "useNamingConvention": "error"
      }
    }
  }
}
```

### Configure the rule fix

Since version **v1.8.0**, it's possible to configure the entity of a fix, using the option `fix`.
There are three options:

- `none`: the rule won't emit a code fix;
- `safe`: the rule will emit a [safe fix](#safe-fixes);
- `unsafe`: the rule will emit an [unsafe fix](#unsafe-fixes);

```json
{
  "linter": {
    "rules": {
      "correctness": {
        "noUnusedVariables": {
          "level": "error",
          "fix": "none"
        }
      },
      "style": {
        "useConst": {
          "level": "warn",
          "fix": "unsafe"
        },
        "useTemplate": {
          "level": "warn",
          "fix": "safe"
        }
      }
    }
  }
}
```

### Rule options

A few rules have options.
You can set them by shaping the value of the rule differently.

- `level` will indicate the severity of the diagnostic;
- `options` will change based on the rule.

```json
{
  "linter": {
    "rules": {
      "style": {
        "useNamingConvention": {
          "level": "error",
          "options": {
            "strictCase": false
          }
        }
      }
    }
  }
}
```

## Ignore code

There are times when a developer wants to ignore a lint rule for a specific line of the code.
You can achieve this by adding a suppression comment above the line that emits the lint diagnostic.

Suppression comments have the following format:

```js
// biome-ignore lint: <explanation>
// biome-ignore lint/suspicious/noDebugger: <explanation>
```

Where

- `biome-ignore` is the start of a suppression comment;
- `lint` suppresses the linter;
- `/suspicious/noDebugger`: **optional**, group and name of the rule you want to suppress;
- `<explanation>` explanation why the rule is disabled

Here's an example:

```ts
// biome-ignore lint: reason
debugger;
// biome-ignore lint/suspicious/noDebugger: reason
debugger;
```

Biome doesn't provide ignore comments that ignore an entire file.
However, you can [ignore a file using the Biome configuration file](https://github.com/biomejs/biome/blob/main/docs/guides/configure-biome.md#ignore-files).
Note that you can also [ignore the files ignored by your VCS](https://github.com/biomejs/biome/blob/main/docs/guides/integrate-in-vcs.md#use-the-ignore-file).

## Migrate from other linters

Many of Biome lint rules are inspired from other linters.
If you want to migrate from other linters such as ESLint or `typescript-eslint`,
check the [rules sources page](https://github.com/biomejs/biome/blob/main/docs/linter/rules-sources.md)
If you are migrating from ESLint,
we have a dedicated [migration guide](https://github.com/biomejs/biome/blob/main/docs/guides/migrate-eslint-prettier.md#migrate-from-eslint).