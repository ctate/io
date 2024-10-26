# Language Support

Legend:
- ✅: Supported
- 🚫: Not in progress
- ⌛️: In progress
- ⚠️: Partially supported (with some caveats)

### Language Support Table

| Language | Parsing | Formatting | Linting |
| -------- | ------- | ---------- | ------- |
| JavaScript | ✅ | ✅ | ✅ |
| TypeScript | ✅ | ✅ | ✅ |
| JSX | ✅ | ✅ | ✅ |
| TSX | ✅ | ✅ | ✅ |
| JSON | ✅ | ✅ | ✅ |
| JSONC | ✅ | ✅ | ✅ |
| HTML | ⌛️ | ⌛️ | 🚫 |
| Vue | ⚠️ | ⚠️ | ⚠️ |
| Svelte | ⚠️ | ⚠️ | ⚠️ |
| Astro | ⚠️ | ⚠️ | ⚠️ |
| CSS | ✅ | ✅ | ✅ |
| YAML | ⌛️ | 🚫 | 🚫 |
| GraphQL | ✅ | ✅ | ✅ |
| Markdown | ⌛️ | 🚫 | 🚫 |

### JavaScript Support

Biome supports the ES2024 version of the language.

Biome supports only the official syntax. The team starts development of the new syntax when a proposal reaches [Stage 3](https://github.com/tc39/proposals#stage-3).

### TypeScript Support

Biome supports TypeScript version 5.6.

### JSONC Support

JSONC stands for "JSON with Comments." This format is widely used by various tools like [VS Code](https://code.visualstudio.com/docs/languages/json#_json-with-comments), [TypeScript](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html), [Babel](https://babeljs.io/docs/config-files), etc. because it lets users add comments to configuration files. However, since JSONC isn't a strictly defined standard, there's some variation in how different tools handle trailing commas in JSONC files. To accommodate this, Biome doesn't provide a dedicated language configuration for JSONC. Instead, we've enhanced our JSON parsing and formatting capabilities with options like `json.parser.allowComments`, `json.parser.allowTrailingCommas`, and `json.formatter.trailingCommas`. This approach allows Biome to effectively support different variants of JSON files.

For files with an extension name of `.jsonc` or those identified as `jsonc` according to the [language identifier](https://code.visualstudio.com/docs/languages/identifiers), Biome automatically applies the following default settings for parsing and formatting them:

- `json.parser.allowComments`: `true`
- `json.parser.allowTrailingCommas`: `true`
- `json.formatter.trailingCommas`: `none`

Please note, some well-known files like `tsconfig.json` and `.babelrc` don't use the `.jsonc` extension but still allow comments and trailing commas. While others, such as `.eslintrc.json`, only allow comments. Biome is able to identify these files and adjusts the `json.parser.allowTrailingCommas` option accordingly to ensure they are correctly parsed.

### HTML Super Languages Support

As of version `1.6.0`, these languages are **partially** supported. Biome will get better over time, and it will provide more options to tweak your project. As for today, there are some expectations and limitations to take in consideration:

- For `.astro` files, **only** the **frontmatter** portion of the file is supported.
- For `.vue` and `.svelte` files, **only** the **\<script\>** tags portion of the file is supported.
- Diagnostics will only show code frames that belong to the portions mentioned above.
- When **formatting** `.vue` and `.svelte` files, the indentation of the JavaScript/TypeScript code will start from the beginning.

```vue title="file.vue" del={2} ins={3}
<script>
  import Component from "./Component.vue";
  import Component from "./Component.vue";
</script>
```

- When **linting** `.svelte`, `.astro` or `.vue` files, it's advised to turn off few additional rules to prevent compiler errors. Use the option `overrides` for that:

```json
{
  "overrides": [
    {
      "include": ["*.svelte", "*.astro", "*.vue"],
      "linter": {
        "rules": {
          "style": {
            "useConst": "off",
            "useImportType": "off"
          }
        }
      }
    }
  ]
}
```