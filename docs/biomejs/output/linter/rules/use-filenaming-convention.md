# useFilenamingConvention

Enforce naming conventions for JavaScript and TypeScript filenames.

**Diagnostic Category:** `lint/style/useFilenamingConvention`

**Since:** `v1.5.0`

**Sources:** 
- Inspired from: `unicorn/filename-case`

Enforcing naming conventions helps to keep the codebase consistent. A filename consists of a name and a set of consecutive extensions. For instance, `my-filename.test.js` has `my-filename` as the name and two consecutive extensions: `.test` and `.js`.

By default, the rule ensures that the name is either in `camelCase`, `kebab-case`, `snake_case`, or equal to the name of one export in the file. The extensions are also validated against the same cases.

### Exceptions

- The name of the file can start with a dot or a plus sign, and can be prefixed and suffixed by underscores `_`. Examples include `.filename.js`, `+filename.js`, `__filename__.js`, or `.__filename__.js`.
- The rule supports dynamic route syntaxes of frameworks like Next.js, SolidStart, Nuxt, and Astro. Examples include `[...slug].js` and `[[...slug]].js`.

Note: Specifying the `match` option will disable the previous exceptions.

## Ignoring Files

To ignore files, use `overrides`. For example, to ignore all files in the `test` directory:

```json
{
  "overrides": [
    {
       "include": ["test/**/*"],
       "linter": {
         "rules": {
           "style": {
             "useFilenamingConvention": "off"
           }
         }
       }
    }
  ]
}
```

## Options

The rule provides several options:

```json5
{
    "//": "...",
    "options": {
        "strictCase": false,
        "requireAscii": true,
        "match": "%?(.+?)[.](.+)", // Since v2.0.0
        "filenameCases": ["camelCase", "export"]
    }
}
```

### strictCase

When set to `true`, it forbids consecutive uppercase characters in `camelCase` and `PascalCase`. For example, `agentID` will throw an error and should be renamed to `agentId`. Default: `true`.

### requireAscii

When set to `true`, it forbids names that include non-ASCII characters. For example, `café` or `안녕하세요` will throw an error. Default: `false`. This option will be turned on by default in Biome 2.0.

### match (Since v2.0.0)

`match` defines a regular expression that the filename must match. If the regex has capturing groups, the first capture is considered the filename and the second as file extensions. The regular expression supports various syntaxes including greedy and non-greedy quantifiers, character classes, alternations, and capturing groups.

### filenameCases

By default, the rule enforces that the filename is either in `camelCase`, `kebab-case`, `snake_case`, or equal to the name of one export in the file. You can enforce a stricter convention by setting `filenameCases`, which accepts an array of cases: `camelCase`, `kebab-case`, `PascalCase`, `snake_case`, and `export`. Extensions in lowercase are always allowed.

## Related Links

- Disable a rule
- Configure the rule fix
- Rule options