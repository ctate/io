# Refer to locales by ID

Angular uses the Unicode locale identifier (Unicode locale ID) to find the correct locale data for internationalization of text strings.

**Unicode locale ID:**

- A locale ID conforms to the Unicode Common Locale Data Repository (CLDR) core specification. For more information about locale IDs, see Unicode Language and Locale Identifiers.
- CLDR and Angular use BCP 47 tags as the base for the locale ID.

A locale ID specifies the language, country, and an optional code for further variants or subdivisions. It consists of the language identifier, a hyphen (`-`), and the locale extension.

```
{language_id}-{locale_extension}
```

To accurately translate your Angular project, decide which languages and locales you are targeting for internationalization. Many countries share the same language but differ in usage, including grammar, punctuation, formats for currency, decimal numbers, dates, etc.

**Example languages and locales:**

| Language | Locale                   | Unicode locale ID |
|:---      |:---                      |:---               |
| English  | Canada                   | `en-CA`           |
| English  | United States of America | `en-US`           |
| French   | Canada                   | `fr-CA`           |
| French   | France                   | `fr-FR`           |

The Angular repository includes common locales.

For a list of language codes, see ISO 639-2.

## Set the source locale ID

Use the Angular CLI to set the source language for your component template and code. By default, Angular uses `en-US` as the source locale of your project.

To change the source locale for the build:

1. Open the `angular.json` workspace build configuration file.
2. Change the source locale in the `sourceLocale` field.

## What's next

For more information, see Format data based on locale.

**References:**

- Angular workspace configuration
- angular/packages/common/locales | GitHub
- BCP 47 | RFC Editor
- Core Specification | Unicode CLDR Project
- Unicode Language and Locale Identifiers - Core Specification | Unicode CLDR Project