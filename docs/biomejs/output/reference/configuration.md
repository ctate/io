# Configuration

How to customize and configure Biome with biome.json.

## `$schema`

Allows passing a path to a JSON schema file. A JSON schema file for `biome.json` is published. You can specify a relative path to the schema of the `@biomejs/biome` npm package if installed in the `node_modules` folder:

```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json"
}
```

If you have problems resolving the physical file, you can use the one published on the site:

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json"
}
```

## `extends`

A list of paths to other JSON files. Biome resolves and applies the options of the files contained in the `extends` list, and eventually applies the options contained in the `biome.json` file.

## `files`

### `files.maxSize`

The maximum allowed size for source code files in bytes. Files above this limit will be ignored for performance reasons.

> Default: `1048576` (1MB)

### `files.ignore`

A list of Unix shell style patterns. Biome ignores files and folders that match these patterns.

```json
{
  "files": {
    "ignore": ["scripts/*.js"]
  }
}
```

### `files.include`

A list of Unix shell style patterns. Biome handles only the files and folders that match these patterns.

```json
{
  "files": {
    "include": ["scripts/*.js"]
  }
}
```

**Caution:** When both `include` and `ignore` are specified, `ignore` takes precedence over `include`.

Given the following example:

```json
{
  "files": {
    "include": ["scripts/**/*.js", "src/**/*.js"],
    "ignore": ["scripts/**/*.js"]
  }
}
```

Only the files that match the pattern `src/**/*.js` will be handled, while the files that match the pattern `scripts/**/*.js` will be ignored.

### `files.ignoreUnknown`

Biome won't emit diagnostics if it encounters files that can't handle.

```json
{
  "files": {
    "ignoreUnknown": true
  }
}
```

> Default: `false`

## `vcs`

Set of properties to integrate Biome with a VCS software.

### `vcs.enabled`

Whether Biome should integrate itself with the VCS client.

> Default: `false`

### `vcs.clientKind`

The kind of client.

Values:
- `"git"`

### `vcs.useIgnoreFile`

Whether Biome should use the VCS ignore file. When `true`, Biome will ignore the files specified in the ignore file.

### `vcs.root`

The folder where Biome should check for VCS files. By default, Biome will use the same folder where `biome.json` was found. If Biome can't find the configuration, it will attempt to use the current working directory. If no current working directory can be found, Biome won't use the VCS integration, and a diagnostic will be emitted.

### `vcs.defaultBranch`

The main branch of the project. Biome will use this branch when evaluating the changed files.

## `linter`

### `linter.enabled`

Enables Biome's linter.

> Default: `true`

### `linter.ignore`

An array of Unix shell style patterns.

```json
{
  "linter": {
    "ignore": ["scripts/*.js"]
  }
}
```

### `linter.include`

A list of Unix shell style patterns. Biome handles only the files and folders that match these patterns.

```json
{
  "linter": {
    "include": ["scripts/*.js"]
  }
}
```

**Caution:** When both `include` and `ignore` are specified, `ignore` takes precedence over `include`.

Given the following example:

```json
{
  "linter": {
    "include": ["scripts/**/*.js", "src/**/*.js"],
    "ignore": ["scripts/**/*.js"]
  }
}
```

Only the files that match the pattern `src/**/*.js` will be linted, while the files that match the pattern `scripts/**/*.js` will be ignored.

### `linter.rules.recommended`

Enables the recommended rules for all groups.

> Default: `true`

### `linter.rules.all`

Enable or disable all rules for all groups. If `recommended` and `all` are both `true`, Biome will emit a diagnostic and fallback to its defaults.

```json
{
  "linter": {
    "enabled": true,
    "rules": {
      "all": true
    }
  }
}
```

It's also possible to combine this flag to enable/disable different rule groups:

```json
{
  "linter": {
    "enabled": true,
    "rules": {
      "all": true,
      "style": {
        "all": false
      },
      "complexity": {
        "all": false
      }
    }
  }
}
```

In the previous example, Biome will enable all rules, except for rules that belong to the `style` and `complexity` groups.

### `linter.rules.[group]`

Options that influence the rules of a single group. Biome supports various groups.

### `linter.rules.[group].recommended`

Enables the recommended rules for a single group.

Example:

```json
{
  "linter": {
    "enabled": true,
    "rules": {
      "nursery": {
        "recommended": true
      }
    }
  }
}
```

### `linter.rules.[group].all`

Enables all rules for a single group.

Example:

```json
{
  "linter": {
    "enabled": true,
    "rules": {
      "nursery": {
        "all": true
      }
    }
  }
}
```

## `formatter`

These options apply to all languages. There are additional language-specific formatting options below.

### `formatter.enabled`

Enables Biome's formatter.

> Default: `true`

### `formatter.ignore`

An array of Unix shell style patterns.

```json
{
  "formatter": {
    "ignore": ["scripts/*.js"]
  }
}
```

### `formatter.include`

A list of Unix shell style patterns. Biome handles only the files and folders that match these patterns.

```json
{
  "formatter": {
    "include": ["scripts/*.js"]
  }
}
```

**Caution:** When both `include` and `ignore` are specified, `ignore` takes precedence over `include`.

Given the following example:

```json
{
  "formatter": {
    "include": ["scripts/**/*.js", "src/**/*.js"],
    "ignore": ["scripts/**/*.js"]
  }
}
```

Only the files that match the pattern `src/**/*.js` will be formatted, while the files that match the pattern `scripts/**/*.js` will be ignored.

### `formatter.formatWithErrors`

Allows formatting a document that has syntax errors.

```json
{
  "formatter": {
    "formatWithErrors": true
  }
}
```

> Default: `false`

### `formatter.indentStyle`

The style of the indentation. It can be `"tab"` or `"space"`.

> Default: `"tab"`

### `formatter.indentSize`

This option is deprecated; please use `formatter.indentWidth` instead.

<details>
<summary>Deprecated</summary>

How big the indentation should be.

> Default: `2`

</details>

### `formatter.indentWidth`

How big the indentation should be.

> Default: `2`

### `formatter.lineEnding`

The type of line ending.
- `"lf"`: Line Feed only (`\n`), common on Linux and macOS as well as inside git repos.
- `"crlf"`: Carriage Return + Line Feed characters (`\r\n`), common on Windows.
- `"cr"`: Carriage Return character only (`\r`), used very rarely.

> Default: `"lf"`

### `formatter.lineWidth`

How many characters can be written on a single line.

> Default: `80`

### `formatter.attributePosition`

The attribute position style in HTMLish languages.
- `"auto"`: Attributes are automatically formatted, collapsing into multiple lines only when they hit certain criteria.
- `"multiline"`: Attributes are always formatted on multiple lines.

> Default: `"auto"`

### `formatter.useEditorconfig`

Whether Biome should use the `.editorconfig` file to determine the formatting options. If `true`, the applicable options in the `.editorconfig` file will be used, but any configuration in the `biome.json` file will still take precedence.

When migrating from Prettier with `biome migrate`, this option is set to `true` to match the behavior of Prettier.

> Default: `false`

## `organizeImports`

### `organizeImports.enabled`

Enables Biome's sort imports.

> Default: `true`

### `organizeImports.ignore`

A list of Unix shell style patterns. Biome ignores files and folders that match these patterns.

```json
{
  "organizeImports": {
    "ignore": ["scripts/*.js"]
  }
}
```

### `organizeImports.include`

A list of Unix shell style patterns. Biome handles only the files and folders that match these patterns.

```json
{
  "organizeImports": {
    "include": ["scripts/*.js"]
  }
}
```

**Caution:** When both `include` and `ignore` are specified, `ignore` takes precedence over `include`.

Given the following example:

```json
{
  "organizeImports": {
    "include": ["scripts/**/*.js", "src/**/*.js"],
    "ignore": ["scripts/**/*.js"]
  }
}
```

Only the files that match the pattern `src/**/*.js` will have their imports sorted, while the files that match the pattern `scripts/**/*.js` will be ignored.

## `javascript`

These options apply only to JavaScript (and TypeScript) files.

### `javascript.parser.unsafeParameterDecoratorsEnabled`

Allows support for unsafe/experimental parameter decorators.

```json
{
  "javascript": {
    "parser": {
      "unsafeParameterDecoratorsEnabled": true
    }
  }
}
```

> Default: `false`

### `javascript.formatter.quoteStyle`

The type of quote used when representing string literals. It can be `"single"` or `"double"`.

> Default: `"double"`

### `javascript.formatter.jsxQuoteStyle`

The type of quote used when representing JSX string literals. It can be `"single"` or `"double"`.

> Default: `"double"`

### `javascript.formatter.quoteProperties`

When properties inside objects should be quoted. It can be `"asNeeded"` or `"preserve"`.

> Default: `"asNeeded"`

### `javascript.formatter.trailingComma`

This option is deprecated; please use `javascript.formatter.trailingCommas` instead.

<details>
<summary>Deprecated</summary>

Print trailing commas wherever possible in multi-line comma-separated syntactic structures. Possible values:
- `"all"`: The trailing comma is always added.
- `"es5"`: The trailing comma is added only in places where it's supported by older versions of JavaScript.
- `"none"`: Trailing commas are never added.

> Default: `"all"`

</details>

### `javascript.formatter.trailingCommas`

Print trailing commas wherever possible in multi-line comma-separated syntactic structures. Possible values:
- `"all"`: The trailing comma is always added.
- `"es5"`: The trailing comma is added only in places where it's supported by older versions of JavaScript.
- `"none"`: Trailing commas are never added.

> Default: `"all"`

### `javascript.formatter.semicolons`

Configures where the formatter prints semicolons:
- `"always"`: Semicolons are always added at the end of each statement.
- `"asNeeded"`: Semicolons are added only in places where they are needed, to protect from Automatic Semicolon Insertion (ASI).

> Default: `"always"`

Example:

```json
{
  "javascript": {
    "formatter": {
      "semicolons": "asNeeded"
    }
  }
}
```

### `javascript.formatter.arrowParentheses`

Whether to add non-necessary parentheses to arrow functions:
- `"always"`: The parentheses are always added.
- `"asNeeded"`: The parentheses are added only when they are needed.

> Default: `"always"`

### `javascript.formatter.enabled`

Enables Biome's formatter for JavaScript (and its super languages) files.

> Default: `true`

### `javascript.formatter.indentStyle`

The style of the indentation for JavaScript (and its super languages) files. It can be `"tab"` or `"space"`.

> Default: `"tab"`

### `javascript.formatter.indentSize`

This option is deprecated; please use `javascript.formatter.indentWidth` instead.

<details>
<summary>Deprecated</summary>

How big the indentation should be for JavaScript (and its super languages) files.

> Default: `2`

</details>

### `javascript.formatter.indentWidth`

How big the indentation should be for JavaScript (and its super languages) files.

> Default: `2`

### `javascript.formatter.lineEnding`

The type of line ending for JavaScript (and its super languages) files.
- `"lf"`: Line Feed only (`\n`), common on Linux and macOS as well as inside git repos.
- `"crlf"`: Carriage Return + Line Feed characters (`\r\n`), common on Windows.
- `"cr"`: Carriage Return character only (`\r`), used very rarely.

> Default: `"lf"`

### `javascript.formatter.lineWidth`

How many characters can be written on a single line in JavaScript (and its super languages) files.

> Default: `80`

### `javascript.formatter.bracketSameLine`

Choose whether the ending `>` of a multi-line JSX element should be on the last attribute line or not.

> Default: `false`

### `javascript.formatter.bracketSpacing`

Choose whether spaces should be added between brackets and inner values.

> Default: `true`

### `javascript.formatter.attributePosition`

The attribute position style in JSX elements.
- `"auto"`: Attributes are automatically formatted, collapsing into multiple lines only when they hit certain criteria.
- `"multiline"`: Attributes are always formatted on multiple lines.

> Default: `"auto"`

### `javascript.globals`

A list of global names that Biome should ignore (analyzer, linter, etc.).

```json
{
  "javascript": {
    "globals": ["$", "_", "externalVariable"]
  }
}
```

### `javascript.jsxRuntime`

Indicates the type of runtime or transformation used for interpreting JSX.
- `"transparent"`: Indicates a modern or native JSX environment that doesn't require special handling by Biome.
- `"reactClassic"`: Indicates a classic React environment that requires the `React` import.

```json
{
  "javascript": {
    "jsxRuntime": "reactClassic"
  }
}
```

For more information about the old vs. new JSX runtime, please see the React documentation.

> Default: `"transparent"`

### `javascript.linter.enabled`

Enables Biome's linter for JavaScript (and its super languages) files.

> Default: `true`

## `json`

Options applied to the JSON files.

### `json.parser.allowComments`

Enables the parsing of comments in JSON files.

```json
{
  "json": {
    "parser": {
      "allowComments": true
    }
  }
}
```

### `json.parser.allowTrailingCommas`

Enables the parsing of trailing commas in JSON files.

```json
{
  "json": {
    "parser": {
      "allowTrailingCommas": true
    }
  }
}
```

### `json.formatter.enabled`

Enables Biome's formatter for JSON (and its super languages) files.

> Default: `true`

### `json.formatter.indentStyle`

The style of the indentation for JSON (and its super languages) files. It can be `"tab"` or `"space"`.

> Default: `"tab"`

### `json.formatter.indentSize`

This option is deprecated; please use `json.formatter.indentWidth` instead.

<details>
<summary>Deprecated</summary>

How big the indentation should be for JSON (and its super languages) files.

> Default: `2`

</details>

### `json.formatter.indentWidth`

How big the indentation should be for JSON (and its super languages) files.

> Default: `2`

### `json.formatter.lineEnding`

The type of line ending for JSON (and its super languages) files.
- `"lf"`: Line Feed only (`\n`), common on Linux and macOS as well as inside git repos.
- `"crlf"`: Carriage Return + Line Feed characters (`\r\n`), common on Windows.
- `"cr"`: Carriage Return character only (`\r`), used very rarely.

> Default: `"lf"`

### `json.formatter.lineWidth`

How many characters can be written on a single line in JSON (and its super languages) files.

> Default: `80`

### `json.formatter.trailingCommas`

Print trailing commas wherever possible in multi-line comma-separated syntactic structures.

Allowed values:
- `"none"`: The trailing comma is removed.
- `"all"`: The trailing comma is kept and preferred.

> Default: `"none"`

### `json.linter.enabled`

Enables Biome's linter for JSON (and its super languages) files.

> Default: `true`

## `css`

Options applied to the CSS files.

### `css.parser.cssModules`

Enables parsing of CSS modules.

> Default: `false`

### `css.formatter.enabled`

Enables Biome's formatter for CSS (and its super languages) files.

> Default: `false`

### `css.formatter.indentStyle`

The style of the indentation for CSS (and its super languages) files. It can be `"tab"` or `"space"`.

> Default: `"tab"`

### `css.formatter.indentWidth`

How big the indentation should be for CSS (and its super languages) files.

> Default: `2`

### `css.formatter.lineEnding`

The type of line ending for CSS (and its super languages) files.
- `"lf"`: Line Feed only (`\n`), common on Linux and macOS as well as inside git repos.
- `"crlf"`: Carriage Return + Line Feed characters (`\r\n`), common on Windows.
- `"cr"`: Carriage Return character only (`\r`), used very rarely.

> Default: `"lf"`

### `css.formatter.lineWidth`

How many characters can be written on a single line in CSS files.

> Default: `80`

### `css.formatter.quoteStyle`

The type of quote used when representing string literals. It can be `"single"` or `"double"`.

> Default: `"double"`

### `css.linter.enabled`

Enables Biome's linter for CSS (and its super languages) files.

> Default: `false`

## `overrides`

A list of patterns. Use this configuration to change the behavior of the tools for certain files. When a file is matched against an override pattern, the configuration specified in that pattern will override the top-level configuration. The order of the patterns matters. If a file can match three patterns, only the first one is used.

### `overrides.<ITEM>.ignore`

A list of Unix shell style patterns. Biome will not apply the override to files that match the pattern.

```json
{
  "overrides": [{
    "ignore": ["scripts/*.js"]
  }]
}
```

### `overrides.<ITEM>.include`

A list of Unix shell style patterns. Biome will apply the override only to files that match the pattern.

```json
{
  "overrides": [{
    "include": ["scripts/*.js"]
  }]
}
```

### `overrides.<ITEM>.formatter`

Includes the options of top-level formatter configuration, minus `ignore` and `include`.

#### Examples

For example, it's possible to modify the formatter `lineWidth`, `indentStyle` for certain files that are included in the glob path `generated/**`:

```json
{
  "formatter": {
    "lineWidth": 100
  },
  "overrides": [
    {
      "include": ["generated/**"],
      "formatter": {
        "lineWidth": 160,
        "indentStyle": "space"
      }
    }
  ]
}
```

### `overrides.<ITEM>.linter`

Includes the options of top-level linter configuration, minus `ignore` and `include`.

#### Examples

You can disable certain rules for certain glob paths, and disable the linter for other glob paths:

```json
{
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "overrides": [
    {
      "include": ["lib/**"],
      "linter": {
        "rules": {
          "suspicious": {
            "noDebugger": "off"
          }
        }
      }
    },
    {
      "include": ["shims/**"],
      "linter": {
        "enabled": false
      }
    }
  ]
}
```

### `overrides.<ITEM>.organizeImports`

Includes the options of top-level organize imports configuration, minus `ignore` and `include`.

### `overrides.<ITEM>.javascript`

Includes the options of top-level JavaScript configuration.

#### Examples

You can change the formatting behavior of JavaScript files in certain folders:

```json
{
  "formatter": {
    "lineWidth": 120
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single"
    }
  },
  "overrides": [
    {
      "include": ["lib/**"],
      "javascript": {
        "formatter": {
          "quoteStyle": "double"
        }
      }
    }
  ]
}
```

### `overrides.<ITEM>.json`

Includes the options of top-level JSON configuration.

#### Examples

You can enable parsing features for certain JSON files:

```json
{
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "overrides": [
    {
      "include": [".vscode/**"],
      "json": {
        "parser": {
          "allowComments": true,
          "allowTrailingCommas": true
        }
      }
    }
  ]
}
```