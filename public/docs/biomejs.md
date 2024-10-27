# Imports Sorting

Biome allows sorting import statements using [natural ordering](https://en.wikipedia.org/wiki/Natural_sort_order).

This feature is enabled by default but can be opted-out via configuration:

```json
{
  "organizeImports": {
    "enabled": false
  }
}
```

The import sorter doesn't remove unused imports. We provide the linter rule [noUnusedImports](https://en.wikipedia.org/wiki/Natural_sort_order) with a safe fix that removes unused imports.

## How imports are sorted

Import statements are sorted by "distance". Modules that are "farther" from the user are put on the top, modules "closer" to the user are put on the bottom:

1. modules imported via `bun:` protocol. This is applicable when writing code run by Bun;
1. built-in Node.js modules that are explicitly imported using the `node:` protocol and common Node built-ins such as `assert`;
1. modules imported via `npm:` protocol. This is applicable when writing code run by Deno;
1. modules that contain the protocol `:`. These are usually considered "virtual modules", modules that are injected by your working environment, e.g. `vite`;
1. modules imported via URL;
1. modules imported from libraries;
1. modules imported via absolute imports;
1. modules imported from a name prefixed by `#`. This is applicable when using [Node's subpath imports](https://nodejs.org/api/packages.html#subpath-imports);
1. modules imported via relative imports;
1. modules that couldn't be identified by the previous criteria;

For example, given the following code:

```ts
import uncle from "../uncle";
import sibling from "./sibling";
import express from "npm:express";
import imageUrl from "url:./image.png";
import { sortBy } from "virtual:utils";
import assert from "node:assert";
import aunt from "../aunt";
import { VERSION } from "https://deno.land/std/version.ts";
import { mock, test } from "node:test";
import { expect } from "bun:test";
import { internal } from "#internal";
import { secret } from "/absolute/path";
import React from "react";
```

They will be sorted like this:

```ts
import { expect } from "bun:test";
import assert from "node:assert";
import { mock, test } from "node:test";
import express from "npm:express";
import { sortBy } from "virtual:utils";
import { VERSION } from "https://deno.land/std/version.ts";
import React from "react";
import { secret } from "/absolute/path";
import { internal } from "#internal";
import aunt from "../aunt";
import uncle from "../uncle";
import sibling from "./sibling";
import imageUrl from "url:./image.png";
```

## Grouped imports

It's widespread to have import statements in a certain order, primarily when you work on a frontend project, and you import CSS files:

```js
import "../styles/reset.css";
import "../styles/layout.css";
import { Grid } from "../components/Grid.jsx";
```

Another common case is import polyfills or shim files, that needs to stay at the top file:

```js
import "../polyfills/array/flatMap";
import { functionThatUsesFlatMap } from "./utils.js";
```

In these cases, Biome will sort all these three imports, and it might happen that the order will **break** your application.

To avoid this, create a "group" of imports. You create a "group" by adding a **new line** to separate the groups.

By doing so, Biome will limit the sorting only to the import statements that belong to the same group:

```js
// group 1, only these two files will be sorted
import "../styles/reset.css";
import "../styles/layout.css";

// group 2, only this one is sorted
import { Grid } from "../components/Grid.jsx";
```

```js
// group 1, the polyfill/shim
import "../polyfills/array/flatMap";

// group 2, the files that require the polyfill/shim
import { functionThatUsesFlatMap } from "./utils.js";
```

## Side effect imports

[Side effect imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#forms_of_import_declarations) are import statements that usually don't import any name:

```js
import "./global.js"
```

Since it is difficult to determine which side effects a module triggers, the import sorter assumes that each side effect import forms its own import group.

For example, the following imports form 4 import groups.

```js
import sibling from "./sibling";       // Import group 1
import { internal } from "#internal";  // Import group 1
import "z";  // Import group 2
import "a";  // Import group 3
import React from "react";         // Import group 4
import assert from "node:assert";  // Import group 4
```

Each group is independently sorted as follows:

```js
import { internal } from "#internal";  // Import group 1
import sibling from "./sibling";      // Import group 1
import "z";  // Import group 2
import "a";  // Import group 3
import assert from "node:assert";  // Import group 4
import React from "react";         // Import group 4
```

## Import sorting via CLI

Using the command `check`, with the option `--write`. If you want only order the imports, you can use check like so:

```shell
biome check \
    --formatter-enabled=false\
    --linter-enabled=false \
    --organize-imports-enabled=true \
    --write \
    ./path/to/src
```

## Import sorting via VSCode extension

The Biome VS Code extension supports imports sorting through the "Organize Imports" code action.
By default, this action can be run using the <kbd title="Shift">⇧</kbd>+<kbd>Alt</kbd>+<kbd>O</kbd> keyboard shortcut, or is accessible through the _Command Palette_ (<kbd>Ctrl</kbd>/<kbd title="Cmd">⌘</kbd>+<kbd title="Shift">⇧</kbd>+<kbd>P</kbd>) by selecting _Organize Imports_.

You can add the following to your editor configuration if you want the action to run automatically on save instead of calling it manually:

```json
{
	"editor.codeActionsOnSave":{
		"source.organizeImports.biome": "explicit"
	}
}
```

# Analyzer

Biome's analyzer intends to provide a series of features that users can leverage.

For now, it only provides import sorting that sorts import statements in JavaScript-like files.

# Differences with Prettier

In some cases, Biome has intentionally decided to format code in a way that doesn't match Prettier's output. These divergences are explained below.

## Prettier doesn't unquote some object properties that are valid JavaScript identifiers.

Prettier and Biome unquote object and class properties that are valid JavaScript identifiers. Prettier [unquotes only valid ES5 identifiers](https://github.com/prettier/prettier/blob/a5d502513e5de4819a41fd90b9be7247146effc7/src/language-js/utils/index.js#L646).

This is a legacy restriction in an ecosystem where ES2015 is now widespread. Thus, we decided to diverge here by un-quoting all valid JavaScript identifiers in ES2015+.

A possible workaround would be to introduce a configuration to set the ECMAScript version a project uses. We could then adjust the un-quoting behaviour based on that version. Setting the ECMAScript version to `ES5` could match Prettier's behaviour.

```javascript
const obj = {
  'a': true,
  b: true,
  "𐊧": true,
}
```

Diff

```javascript
const obj = {
  a: true,
  b: true,
  "𐊧": true,
  𐊧: true,
};
```

## Prettier has an inconsistent behavior for assignment in computed keys.

Prettier and Biome enclose some assignment expressions between parentheses, particularly in conditionals. This allows Biome to identify an expression that should be a comparison.

Prettier has inconsistent behaviour because it adds parentheses for an assignment in a computed key of an object property and doesn't for a computed key of a class property, as demonstrated by the following example:

Input

```javascript
a = {
  [x = 0]: 1,
}

class C {
  [x = 0] = 1
}
```

Diff

```javascript
a = {
  [(x = 0)]: 1,
  [x = 0]: 1,
};

class C {
  [x = 0] = 1;
}
```

To be consistent, we decided to diverge and omit the parentheses. Alternatively, we could enclose any assignment in a computed key of an object or of a class.

## Prettier adds a trailing comma to type parameters of arrow functions even when it is not required.

In some specific cases, a type parameter list of an arrow function requires a trailing comma to distinguish it from a JSX element. When a default type is provided, this trailing comma is not required. Here, we diverge from Prettier because we think it better respects the original intent of Prettier, which was to add a trailing comma only when required.

Input

```typescript
<T = unknown>() => {};
```

Diff

```typescript
<T = unknown,>() => {};
<T = unknown>() => {};
```

## Prettier has an inconsistent behavior for parenthesized non-null-asserted optional chains

In _TypeScript_, the non-null assertion operator `!` allows asserting that a value is non-null. When applied on an optional chain, the assertion applies to the entire chain regardless of the presence of parentheses, making equivalent `(a.?.b)!` and `a.?.b!`.

The previous code examples are already well-formatted, according to Prettier. Prettier is used to enforce the presence or the absence of parentheses. This looks like a missed opportunity to normalize the code.

Moreover, Prettier doesn't remove the parentheses even when they enclose the non-null assertion. Instead, it moves the operator outside the parentheses.

Input:

```typescript
a.?.b!
(a.?.b)!
(a.?.b!)
```

Diff

```typescript
a.?.b!
(a.?.b)!
a.?.b!
(a.?.b!)
a.?.b!
```

## Prettier formats invalid syntaxes

Prettier's Babel-based parsing for JavaScript and TypeScript is very loose and [allows multiple errors](https://github.com/prettier/prettier/blob/e4a74c05f4502dd4ec70495c3130ff08ab088e05/src/language-js/parse/babel.js#L177-L218) to be ignored. Biome's parser is intentionally stricter than the Prettier parser. It correctly identifies the following syntax errors:

- A function cannot have duplicate modifiers
- invalid order of properties' modifiers
- Function declarations are not allowed to have bodies
- non-abstract classes cannot have abstract properties
- An optional chain cannot be assigned
- The `const` modifier cannot be set on a type parameter of an interface
- top-level return
- etc.

In Prettier, these errors aren't considered parse errors, and the AST is still built "correctly" with the appropriate nodes. When formatting, Prettier treats these nodes as normal and formats them accordingly.

In Biome, the parsing errors result in `Bogus` nodes, which may contain any number of valid nodes, invalid nodes, and/or raw characters. When formatting, Biome treats bogus nodes as effectively plain text, printing them out verbatim into the resulting code without any formatting since attempting to format them could be incorrect and cause semantic changes.

For class properties, Prettier's current parsing strategy also uses boolean fields for modifiers, meaning only one of each kind of modifier can ever be present (accessibility modifiers are stored as a single string). When printing, Prettier looks at the list of booleans and decides which modifiers to print out again. Biome instead keeps a list of modifiers, meaning duplicates are kept around and can be analyzed (hence the parsing error messages about duplicate modifiers and ordering). When printing out the bogus nodes, this list is kept intact, and printing out the unformatted text results in those modifiers continuing to exist.

There are ways that Biome can address this. One possibility is to try to interpret the Bogus nodes when formatting and construct valid nodes out of them. If a valid node can be built, then it would just format that node like normal, otherwise, it prints the bogus text verbatim as it does currently. However, this is messy and introduces a form of parsing logic into the formatter that is not meaningful.

Another option is to introduce some form of "syntactically-valid bogus node" into the parser, which accepts these kinds of purely semantic errors (duplicate modifiers, abstract properties in non-abstract classes).

It would continue to build the nodes like normal (effectively matching the behavior in Prettier) but store them inside of a new kind of bogus node, including the diagnostics along with it. When formatting, these particular bogus nodes would just attempt to format the inner node and then fallback if there's an error (the existing `format_or_verbatim` utility would do this already). This keeps the parsing and formatting logic separate from each other but introduces more complexity to the parser, allowing invalid states to be considered semi-valid.

### Duplicate modifiers on class properties

Input

```typescript
// Multiple accessibility modifiers
class Foo {
  private public a  = 1;
}

// Declare function with body
declare function foo ( ) {  }

// Invalid use of abstract
class Bar {
  abstract  foo  ;
}

// Duplicate Readonly
class Read {
  readonly readonly   x: number;
}
```

Diff

```typescript
// Multiple accessibility modifiers
class Foo {
  private public a  = 1;
  private a = 1;
}

// Declare function with body
declare function foo ( ) {  }
declare function foo() {};

// Invalid use of abstract
class Bar {
  abstract  foo  ;
  abstract foo;
}

// Duplicate Readonly
class Read {
  readonly readonly   x: number;
  readonly x: number;
}
```

### Assignment to an optional chain

Input

```javascript
(a?.b) = c;
```

Diff

```javascript
a?.b = c;
(a?.b) = c;
```

### Incorrect modifier for the type parameters of an interface

Input

```typescript
interface L<in const T> {}
```

Diff

```typescript
interface L<const in T> {}
interface L<in const T> {}
```

### Top-level return

```javascript
return someVeryLongStringA && someVeryLongStringB && someVeryLongStringC && someVeryLongStringD
```

```javascript
return someVeryLongStringA && someVeryLongStringB && someVeryLongStringC && someVeryLongStringD
return (
  someVeryLongStringA &&
  someVeryLongStringB &&
  someVeryLongStringC &&
  someVeryLongStringD
);
```

### Erroneous self-increment and self-decrement

Input

```javascript
(1)++;
```

```javascript
1++;
(1)++;
```

### Use of `abstract` modifier in non-abstract classes

Input

```typescript
class C {
  abstract f() : number;
}
```

Diff


```typescript
class C {
  abstract f(): number;
  abstract f() : number;
}
```

## Prettier has inconsistencies between TypeScript and Babel parsing

Prettier supports a number of different parsers for JavaScript and TypeScript code, all of which are meant to be compatible with the [`estree` spec](https://github.com/estree/estree). Most of the time, Prettier uses Babel as the default parser for JavaScript code, but when parsing TypeScript, it will try to use TypeScript's own parser first and only fall back to Babel with TypeScript enabled afterward. While the TypeScript parser is generally compatible with `estree`, it's not exact, and [this can lead to some inconsistencies](https://github.com/prettier/prettier/issues/15785) that affect the output that Prettier creates. In general, these are considered bugs in Prettier itself, since the output should be the same regardless of which parser is used.

Biome implements its own parsing that handles all forms of JavaScript and TypeScript code, meaning there should not be any inconsistencies between the two. However, when migrating a TypeScript codebase from Prettier to Biome, it's possible that some formatting will appear to have changed because of those discrepancies between parsers from Prettier.

These cases are not considered bugs or incompatibilities in Biome. If formatted code only appears different using the `typescript` parser setting in Prettier, but matches when using `babel` and/or `babel-ts`, then Biome considers the output to be compatible.

As an example, consider this case, formatted using Biome and Prettier 3.1.0 with the `typescript` parser:

Input

```typescript
function someFunctionName(
  someLongBreakingParameterName,
  anotherLongParameterName,
) {
  return isEqual(a?.map(([t, _]) => t?.id), b?.map(([t, _]) => t?.id));
}
```

Diff


```typescript
function someFunctionName(
  someLongBreakingParameterName,
  anotherLongParameterName,
) {
  return isEqual(a?.map(([t, _]) => t?.id), b?.map(([t, _]) => t?.id));
  return isEqual(
    a?.map(([t, _]) => t?.id),
    b?.map(([t, _]) => t?.id),
  );
}
```

Prettier with the TypeScript parser chooses to write the `isEqual` call on a single line, while Biome matches the output of Prettier with the `babel` and `babel-ts` parsers. As such, this is _not_ considered an incompatibility with Biome and is instead considered a bug in Prettier.

# Formatter

Biome is an opinionated formatter that [supports multiple languages](https://github.com/biome-sh/biome).
It follows a similar [philosophy to Prettier](https://prettier.io/docs/en/option-philosophy.html),
only supporting a few options to avoid debates over styles, turning into debates over Biome options.
It deliberately [resists the urge to add new options](https://github.com/prettier/prettier/issues/40) to prevent [bike-shed discussions](https://en.wikipedia.org/wiki/Law_of_triviality) in teams so they can focus on what really matters instead.

## CLI

The following command checks the formatting of the files in the `src` directory.
It emits text differences if it finds code that is not formatted.

```shell
biome format ./src
```

If you want to **apply** the new formatting, pass the `--write` option:

```shell
biome format --write ./src
```

The command accepts a list of files and directories.

### Caution

If you pass a glob as a parameter, your shell will expand it.
The result of the expansion depends on your shell.
For example, some shells don't support the recursive glob `**` or the alternation `{}` in the following command:

```shell
biome format ./src/**/*.test.{js,ts}
```

Shell expansion has a performance cost and a limit on the number of files you can pass to the command.

## Options

Biome provides some options to tune the behavior of its formatter.
Differently from other tools, Biome separates language-agnostic options from language-specific options.

The formatter options can be set on the CLI or via a Biome configuration file.
As of v1.9, Biome supports loading `.editorconfig` files.

It's recommended to use a Biome configuration file to ensure that both the Biome CLI and the Biome LSP apply the same options.
The following defaults are applied:

```json
{
  "formatter": {
    "enabled": true,
    "formatWithErrors": false,
    "ignore": [],
    "attributePosition": "auto",
    "indentStyle": "tab",
    "indentWidth": 2,
    "lineWidth": 80,
    "lineEnding": "lf"
  },
  "javascript": {
    "formatter": {
      "arrowParentheses":"always",
      "bracketSameLine": false,
      "bracketSpacing": true,
      "jsxQuoteStyle": "double",
      "quoteProperties": "asNeeded",
      "semicolons": "always",
      "trailingCommas": "all"
    }
  },
  "json": {
    "formatter": {
      "trailingCommas": "none"
    }
  }
}
```

The main language-agnostic options supported by the Biome formatter are:

- indent style (default: `tab`): Use spaces or tabs for indention;
- indent width (default: `2`): The number of spaces per indention level.
- line width (default: `80`): The column width at which Biome wraps code;

## Ignore Code

There are times when the formatted code isn't ideal.

For these cases, you can use a format suppression comment:

```js
// biome-ignore format: <explanation>
```

Example:

```js
const expr =
  // biome-ignore format: the array should not be formatted
  [
    (2 * n) / (r - l),
    0,
    (r + l) / (r - l),
    0,
    0,
    (2 * n) / (t - b),
    (t + b) / (t - b),
    0,
    0,
    0,
    -(f + n) / (f - n),
    -(2 * f * n) / (f - n),
    0,
    0,
    -1,
    0,
  ];
```

# Formatter Option Philosophy

Biome follows the same [Option Philosophy as Prettier](https://prettier.io/docs/en/option-philosophy). The existing set of options for formatting is considered stable, and new options are not likely to be considered.

Biome is an opinionated formatter. In an ideal world, that means Biome assumes there is only one correct way to format things and will enforce that style at all times. No matter the project, no matter the setup, code formatted by Biome will always look the same. From another perspective, Biome is its own automatic style guide, not a tool for implementing other style guides.

Having such a strong opinion on formatting may seem heavy-handed, but the benefits quickly become clear after adoption. All of the discussions about where spaces should go, whether a line should be broken out, whether a line should be indented, and so many more simply vanish. [Trivial, bike-shedding discussions](https://en.wikipedia.org/wiki/Law_of_triviality) no longer distract from focusing on what matters. Code reviews become free of re-formatting requests and cyclical debates. All it takes is trust that Biome does its best to format code cleanly, legibly, and consistently.

Beyond the benefits within individual teams and organizations, the adoption of consistent formatters across the whole web ecosystem benefits everyone, making it easier to retain familiarity when moving between projects and helping newcomers learn and recognize patterns more intuitively without distractions.

In the web ecosystem today, Prettier is by far the most popular code formatter, and it is also strongly opinionated, with a [strict philosophy on adding options](https://prettier.io/docs/en/option-philosophy). Biome aims to be largely compatible with Prettier, and as such, has adopted many of the opinions that Prettier implements, and configuration is no exception to that.

Biome is proud to have reached such high compatibility with Prettier and make the migration path for users as painless as possible, but this also comes with similar caveats.

## Existing Options

Biome started out with a strict subset of configuration options, targeting the most common and contentious style guidelines in the JavaScript ecosystem: indent styles (tabs vs spaces), indent widths (2 spaces to equal a tab, or 4?), and enforced semicolons. Adding options for these points was considered sufficient enough to address most people’s needs, and there was no strong consideration for adding any others.

Leaning on the [Prettier Option Philosophy](https://prettier.io/docs/en/option-philosophy), Biome had the chance to start fresh and avoid the pitfalls that Prettier had fallen into with its other existing options, like `--bracket-same-line` and `--arrow-parens`:

…[these] are not the type of options we’re happy to have. They cause a lot of bike-shedding in teams, and we’re sorry for that. Difficult to remove now, these options exist as a historical artifact and should not motivate adding more options (“If *those* options exist, why can’t this one?”).

However, when the [Prettier Challenge was announced](https://twitter.com/Vjeux/status/1722733472522142022), Biome decided to accept the challenge, which required implementing all of the configuration options that Prettier had to achieve full compatibility.

Biome still shares Prettier's philosophy about these options and considers them a legacy feature for compatibility rather than a baseline feature set. Their existence does not indicate that more options will be added, nor should they be used as a rationale to support the existence of other options in the future.

## New Options

Much like Prettier, Biome believes the current set of options is stable, sufficient, and not open for additions or other changes. Requests for additional configuration options are not likely to be considered and may be closed without discussion.

That said, even as Biome has established itself as a capable and robust formatting tool, it is also still relatively new, meaning there is plenty of opportunity to pave the way for new advancements and ideas that may not seem feasible otherwise.

The formatting style of Biome is also considered relatively stable, continuing to match Prettier as much as possible, with [few intentional deviations](https://github.com/biomejs/biome/issues/739). Changes to the style of Biome may be considered and implemented. Still, these are also unlikely to become configurable options and would instead be applied universally for all future versions of Biome.

# Use Biome in Big Projects

Biome can provide some tools that can help you to use it properly in big projects, such as monorepo or workspaces that contain multiple projects.

## Use Multiple Configuration Files

When you use Biome's features - either with the CLI or LSP - the tool looks for the nearest configuration file using the current working directory.

If Biome doesn't find the configuration file there, it **starts walking upwards** the directories of the file system, until it finds one.

You can leverage this feature to apply different settings based on the project/folder.

Let's suppose we have a project that contains a backend app and new frontend app.

```
- app
  - backend
    - biome.json
    - package.json
  - frontend
    - biome.json
    - legacy-app
      - package.json
    - new-app
      - package.json
```

This means that when you run a script from the file `app/backend/package.json`, Biome will use the configuration file `app/backend/biome.json`.

When you run a script from `app/frontend/legacy-app/package.json` or `app/frontend/new-app/package.json`, Biome will use the configuration file `app/frontend/biome.json`.

## Share the Configuration

It's possible to use the `extends` configuration option to breakdown options across files.

Let's assume that we have these requirements:
- `legacy-app` have to format using spaces;
- `backend` and `new-app` have to format using tabs;
- all apps have to format using line width 120;
- `backend` app needs some extra linting;

We start by creating a new configuration file at `app/biome.json`, and put there the shared options:

```json
{
  "formatter": {
    "enabled": true,
    "lineWidth": 120
  }
}
```

Now let's **move** `app/frontend/biome.json` to `app/frontend/legacy-app/`, because that's where we need to use a different formatting.

```json
{
  "extends": ["../../biome.json"],
  "formatter": {
    "indentStyle": "space"
  }
}
```

Then, we tell Biome to inherit all the options from the main `app/biome.json` file, using the `extends` property.

Let's jump to `app/backend/biome.json`, where we need to enable the linting:

```json
{
  "extends": ["../biome.json"],
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  }
}
```

## Monorepos

Monorepos are particular repositories where multiple libraries are stored and maintained in one big repository. Each library represents a self-contained project, which can contain different configurations.

Biome doesn't support monorepos very well due to some limitations in resolving nested configuration files, you can [help and follow the relative issue](https://github.com/biomejs/biome/issues/2228).

In order to have the best developer experience despite the current limitation, it's advised to have a `biome.json` at the root of the monorepo, and use the `overrides` configuration to change the behaviour of Biome in certain packages.

In the following example we disable the rule `suspicious/noConsoleLog` inside the package `packages/logger`.

```json
{
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "overrides": [{
      "include": ["packages/logger/**"],
      "linter": {
        "rules": {
          "suspicious": {
            "noConsoleLog": "off"
          }
        }
      }
  }]
}
```

# Configure Biome

## Introduction

This guide will help you understand how to configure Biome. It explains the structure of a Biome configuration file and how Biome resolves its configuration.

## Configuration File Structure

A Biome configuration file is named `biome.json` or `biome.jsonc`. It is usually placed in your project's root directory, next to your project's `package.json`.

Biome's configuration is organized around the tools it provides. At the moment, Biome provides three tools: the formatter, the linter, and the import sorter (also called the import organizer). All of these tools are enabled by default. You can disable one or several of them using the `<tool>.enabled` field:

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "formatter": {
    "enabled": false
  },
  "linter": {
    "enabled": false
  },
  "organizeImports": {
    "enabled": false
  }
}
```

Options that apply to more than one language are placed in the corresponding tool field. Language-specific options of a tool are placed under a `<language>.<tool>` field. This also allows overriding general options for a given language. You can also enable or disable a tool based on the language.

```json5
{
  "formatter": {
    "indentStyle": "space", // default is `tab`
    "lineWidth": 100 // default is `80`
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single", // default is `double`
      "lineWidth": 120 // override `formatter.lineWidth`
    }
  },
  "json": {
    "formatter": {
      "enabled": false
    }
  }
}
```

Note: Biome refers to all variants of the JavaScript language as `javascript`. This includes TypeScript, JSX, and TSX.

## Configuration File Resolution

Biome uses auto-discovery to find the nearest configuration file. It looks in the working directory and in the parent directories until it finds a `biome.json` or a `biome.jsonc` file. If no configuration is found, then it applies Biome's defaults. If both `biome.json` and `biome.jsonc` are present in the same folder, the priority will be given to `biome.json`.

Here's an example:

- Biome commands that run in `app/backend/package.json` will use the configuration file `app/backend/biome.json`;
- Biome commands that run in `app/frontend/legacy/package.json` and `app/frontend/new/package.json` will use the configuration file `app/frontend/biome.json`;

Note: Biome doesn't support nested `biome.json` files, neither in CLI nor in LSP. [Follow and help the support in the related issue](https://github.com/biomejs/biome/issues/2228)

Note: Biome commands support using the `--config-path` option and the `BIOME_CONFIG_PATH` environment variable. This allows you to specify a custom configuration file or a directory where Biome can look for a `biome.json` or `biome.jsonc` file. When you use `--config-path` or `BIOME_CONFIG_PATH`, the standard configuration file resolution process is **disabled**.

If `--config-path` or `BIOME_CONFIG_PATH` points directly to a file, you can use names other than `biome.json` or `biome.jsonc`. Biome will read a `.json` file using a standard JSON parser. For files with other extensions, Biome will treat them as `.jsonc` files, using a more flexible JSON parser that allows comments and trailing commas.

## Share a Configuration File

The `extends` field allows you to split your configuration across multiple files. This way, you can share common settings across different projects or folders.

Here's an example of how you might set up your configuration to extend a `common.json` configuration file:

```json
{
  "extends": ["./common.json"]
}
```

The entries defined in `extends` are resolved from the path where the `biome.json` file is defined. They are processed in the order they are listed, with settings in later files overriding earlier ones.

Biome is able to resolve configuration files from the `node_modules/` directory. So you can export your configuration file from a package, and import it in multiple projects.

In order to do so, the first thing to do is to set up your "shared" Biome configuration in a certain way. Let's suppose that you want to share a configuration from a package called `@org/shared-configs`, using the specifier `@org/shared-configs/biome`. You have to create an `exports` entry in the `package.json` of this package:

```json
{
  "name": "@org/shared-configs",
  "type": "module",
  "exports": {
    "./biome": "./biome.json"
  }
}
```

Make sure that `@org/shared-configs` is correctly installed in your project, and update the `biome.json` file to look like the following snippet:

```json
{
  "extends": ["@org/shared-configs/biome"]
}
```

Biome will attempt to **resolve** your library `@org/shared-configs/` from your working directory. The working directory is:

- when using the CLI, the directory where you execute your scripts from. Usually, it matches the location of your `package.json` file;
- when using the LSP, the root directory of your project.

Note: To avoid a breaking change with how the existing resolution works, paths starting with a dot `.` or ending with `.json` or `.jsonc` **won't** be resolved from `node_modules/`.

For more information about the resolution algorithm, refer to the [Node.js documentation](https://nodejs.org/api/esm.html#resolution-and-loading-algorithm).

## Ignore Files

The first way to control which files and directories are processed by Biome is to list them in the CLI. In the following command, we format only `file1.js` and all the files in the `src` directory. The directories are recursively traversed.

```shell
biome format file1.js src/
```

Note: Glob patterns used on the command line are not interpreted by Biome. They are expanded by your shell. Some shells don't support the recursive glob `**`.

The Biome configuration file can be used to refine which files are processed. You can explicitly list the files to be processed using `include` and the files not to be processed using `ignore`. `include` and `ignore` accept globs patterns such as `src/**/*.js`. See the [related section](#glob-syntax-explained) for which glob syntaxes are supported. `include` is always applied first before applying `ignore`. This allows you to include some files and to ignore some of the file you included.

Note: `include` and `ignore` have a slightly different semantics:
- for `ignore`: if a file matches the globs, **_don't_ apply** the configuration inside this override, and keep apply the next overrides;
- for `include`: if a file matches the globs, **apply** the configuration inside this override, and keep apply the next overrides;

Biome provides global `files.include` and `files.ignore` fields that apply to all tools. You can also include and ignore files at tool level using `<tool>.include` and `<tool>.ignore`. Note that they don't override the global `files.include` and `files.ignore`. `files.include` and `files.ignore` are applied first before a tool's `include` and `ignore`.

Let's take the following configuration:

```json
{
  "files": {
    "include": ["src/**/*.js", "test/**/*.js"],
    "ignore": ["**/*.min.js"],
  },
  "linter": {
    "ignore": ["test"]
  }
}
```

And run the following command:

```shell
biome format test/
```

The command will format the files that end with the `.js` extension and doesn't end with the `.min.js` extension from the `test` directory. The files in `src` are not formatted because the directory is not listed in the CLI.

If we run the following command, no files are linted because the `test` directory is explicitly ignored for the linter.

```shell
biome lint test/
```

Biome resolves the globs relatively from the working directory. The working directory is the directory where you usually run a CLI command. This means that you have to place **particular attention** when the configuration file is placed in a different directory from where you execute your command. In the case of an editor (LSP) the working directory is the root directory of your project.

Let's take a project that contains two directories `backend/` and `frontend/`, and the Biome configuration file that we introduced earlier. Inside the `frontend/` directory, a `package.json` specifies a `format` script that runs the Biome formatter.

```json
{
  "name": "frontend-project",
  "scripts": {
    "format": "biome format --write ./"
  }
}
```

When you run the script `format` from `frontend/package.json`, the working directory resolved by that script will be `frontend/`. The globs `src/**/*.js` and `test/**/*.js` will have as "base" directory `frontend/`. Thus, only the files from `frontend/src/` and `frontend/test/` will be formatted.

```json
{
  "files": {
    "include": ["src/**/*.js", "src/**/*.ts"],
    "ignore": ["test"]
  },
  "formatter": {
    "indentStyle": "space"
  }
}
```

Note: `ignore` and `include` inside `overrides` have a **different** semantics:
- for `ignore`: if a file matches the globs, **_don't_ apply** the configuration inside this override, and keep apply the next overrides;
- for `include`: if a file matches the globs, **apply** the configuration inside this override, and keep apply the next overrides;

Note: By default, Biome always ignores some files that are said to be **protected files**. This means that no diagnostics will be ever emitted by Biome for those files. At the moment, the following files are protected:

- `composer.lock`
- `npm-shrinkwrap.json`
- `package-lock.json`
- `yarn.lock`

Note: You can also [ignore files ignored by your VCS](/guides/integrate-in-vcs#use-the-ignore-file).

## Well-known Files

Here are some well-known files that we specifically treat based on their file names, rather than their extensions. Currently, the well-known files are JSON-like files only, but we may broaden the list to include other types when we support new parsers.

The following files are parsed as `JSON` files with both the options `json.parser.allowComments` and `json.parser.allowTrailingCommas` set to `false`.

- `.all-contributorsrc`
- `.arcconfig`
- `.auto-changelog`
- `.bowerrc`
- `.c8rc`
- `.htmlhintrc`
- `.imgbotconfig`
- `.jslintrc`
- `.nycrc`
- `.tern-config`
- `.tern-project`
- `.vuerc`
- `.watchmanconfig`
- `mcmod.info`

The following files are parsed as `JSON` files with the options `json.parser.allowComments` set to `true` but `json.parser.allowTrailingCommas` set to `false`. This is because the tools consuming these files can only strip comments.

- `.ember-cli`
- `.eslintrc.json`
- `.jscsrc`
- `.jshintrc`
- `tslint.json`
- `turbo.json`

The following files are parsed as `JSON` files with the options `json.parser.allowComments` and `json.parser.allowTrailingCommas` set to `true`. This is because the tools consuming these files are designed to accommodate such settings.

- `.babelrc`
- `.babelrc.json`
- `.devcontainer.json`
- `.hintrc`
- `.hintrc.json`
- `.swcrc`
- `api-documenter.json`
- `api-extractor.json`
- `babel.config.json`
- `deno.json`
- `devcontainer.json`
- `dprint.json`
- `jsconfig.json`
- `jsr.json`
- `language-configuration.json`
- `tsconfig.json`
- `typedoc.json`
- `typescript.json`

## Glob Syntax Explained

A glob pattern specifies a set of filenames. Biome supports the following globs:

- `*` matches zero or more characters. It cannot match the path separator `/`.
- `**` recursively matches directories and files. This sequence **must** form a single path component, so both `**a` and `b**` are invalid and will result in an error. A sequence of more than two consecutive `*` characters is also invalid.
- `[...]` matches any character inside the brackets. Ranges of characters can also be specified, as ordered by Unicode, so e.g. `[0-9]` specifies any character between 0 and 9 inclusive.
- `[!...]` is the negation of `[...]`, i.e. it matches any characters **not** in the brackets.

Some examples:

- `dist/**` matches the dist directory and all files in this directory.
- `**/test/**` matches all files under any directory named `test`, regardless of where they are. E.g. `dist/test`, `src/test`.
- `**/*.js` matches all files ending with the extension `.js` in all directories.

Biome uses a glob library that treats all globs as having a `**/` prefix. This means that `src/**/*.js` and `**/src/**/*.js` are treated as identical. They match both `src/file.js` and `test/src/file.js`.

Note: These patterns can be used in a Biome configuration file. Glob patterns used on the command line are not interpreted by Biome. They are expanded by your shell. Some shells don't support the recursive glob `**`.

# Integrate Biome in an editor extension

Biome has [LSP](https://microsoft.github.io/language-server-protocol/) first-class support. If your editor does implement LSP, then the integration of Biome should be seamless.

## Use the LSP proxy

Biome has a command called `lsp-proxy`. When executed, Biome will spawn two processes:
- a daemon that does execute the requested operations;
- a server that functions as a proxy between the requests of the client - the editor - and the server - the daemon;

If your editor is able to interact with a server and send [JSON-RPC](https://www.jsonrpc.org/) request, you only need to configure the editor run that command.

You can check how the [neo-vim biome extension](https://github.com/neovim/nvim-lspconfig/blob/master/lua/lspconfig/server_configurations/biome.lua) does it.

## Use `stdin`

If your editor doesn't support LSP, you use directly the binary `biome` and call it using [standard input](https://en.wikipedia.org/wiki/Standard_streams#Standard_input_(stdin)).

The following commands can be called via standard input:
- `format`
- `lint`
- `check`

Biome will return the new output (or the original output if changes haven't occurred) to [standard output](https://en.wikipedia.org/wiki/Standard_streams#Standard_output_(stdout)) and the diagnostics to [standard error](https://en.wikipedia.org/wiki/Standard_streams#Standard_error_(stderr)).

When you use `stdin`, you must pass the `--stdin-file-path` option. The file `path` **doesn't need to exist** in your file system, it can be any name. **What's important** is to provide the correct file extension, so Biome knows **how to treat** your file.

It's the editor's responsibility to locate the resolve the path of the binary and then call it when it's needed. The binaries are shipped to npm based on the architectures and OS that we support:
- `@biomejs/cli-darwin-arm64`
- `@biomejs/cli-darwin-x64`
- `@biomejs/cli-linux-arm64`
- `@biomejs/cli-linux-x64`
- `@biomejs/cli-win32-arm64`
- `@biomejs/cli-win32-x64`

The binary name is `biome` or `biome.exe`, and it can be found in the root directory of the library, e.g.: `@biomejs/cli-darwin-arm64/biome`, `@biomejs/cli-win32-x64/biome.exe`.

## Use the daemon with the binary

Using the binary via CLI is very efficient, although you won't be able to provide logs to your users. The CLI allows you to bootstrap a daemon and then use the CLI commands through the daemon itself.

If order to do so, you first need to start a daemon process with the `start` command:

```shell
biome start
```
Then, every command needs to add the `--use-server` options, e.g.:

```shell
echo "console.log('')" | biome format --use-server --stdin-file-path=dummy.js
```

### Note
If you decide to use the daemon, you're also responsible to restart/kill the process with the `stop` command, to avoid having ghost processes.

### Caution
Operations via the daemon are significantly slower than the CLI itself, so it's advised to run operations only on single files.

## Daemon logs

The Biome daemon saves logs in your file system. Logs are stored in a folder called `biome-logs`. The path of  this folder changes based on your operative system:
-  Linux: `~/.cache/biome`;
-  Windows: `C:\Users\<UserName>\AppData\Local\biomejs\biome\cache`
-  macOS: `/Users/<UserName>/Library/Caches/dev.biomejs.biome`

For other operative systems, you can find the folder in the system's temporary directory.

To obtain the precise path, execute the following command:
```shell
biome explain daemon-logs
```

The log files are rotated on an hourly basis.

# First-party extensions

These are extensions that are maintained by the Biome team and part of the [Biome organization](https://github.com/biomejs).

## VS Code

The Biome editor integration allows you to:

* Format files on save or when issuing the _Format_ command.
* Lint files and apply code fixes

Install our official [Biome VS Code extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome) from the Visual Studio Marketplace.

To make Biome the default formatter open a supported file and:

1. Open the *Command Palette* (View or <kbd>Ctrl</kbd>/<kbd title="Cmd">⌘</kbd>+<kbd title="Shift">⇧</kbd>+<kbd>P</kbd>)
2. Select *Format Document With...*
3. Select *Configure Default Formatter*
4. Select *Biome*.

## IntelliJ

To install the Biome IntelliJ extension, head over to [official extension page](https://extensions.jetbrains.com/extension/22761-biome) or follow these steps:

### From JetBrains IDEs:

1. Open IntelliJ IDEA.
2. Go to **Settings/Preferences**.
3. Select **extensions** from the left-hand menu.
4. Click on the **Marketplace** tab.
5. Search for "Biome" and click **Install**.
6. Restart the IDE to activate the extension.

### From disk:

1. Download the extension .zip from releases tab.
2. Press `⌘Сmd,` to open the IDE settings and then select extensions.
3. On the extensions page, click The Settings button and then click Install extension from Disk….

## Zed

1. Open the *Command Palette* (View or <kbd>Ctrl</kbd>/<kbd title="Cmd">⌘</kbd>+<kbd title="Shift">⇧</kbd>+<kbd>P</kbd>)
2. Select **zed: extensions**
3. Search **Biome**
4. Select **Install**

# Third-party extensions

These are extensions maintained by other communities, that you install in your editor:

### Supported Editors

- **Vim**: [ALE](https://github.com/dense-analysis/ale) supports Biome, just follow the installation instructions.
- **Neovim**: You'll have to install [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig/), and follow the [instructions](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#biome). [ALE](https://github.com/dense-analysis/ale) also supports Biome.
- **Helix**: Follow the instructions below.
- **Coc.nvim**: [coc-biome](https://github.com/fannheyward/coc-biome) is a Biome extension for [coc.nvim](https://github.com/neoclide/coc.nvim).
- **Sublime Text**: Follow the [LSP-biome](https://github.com/sublimelsp/LSP-biome) installation instructions.
- **Emacs**: Ensure you have [lsp-mode](https://github.com/emacs-lsp/lsp-mode) installed, follow the [lsp-biome](https://github.com/cxa/lsp-biome) installation instructions to enable Biome support in `lsp-mode`.

### Helix

Biome supports the following file extensions: `js`, `jsx`, `ts`, `tsx`, `d.ts`, `json`, and `jsonc`.

Biome has an `lsp-proxy` command that acts as a server for the Language Server Protocol over stdin/stdout.

#### Helix 23.10

Helix 23.10 has [support for multiple language servers](https://github.com/helix-editor/helix/pull/2507). Now you can use Biome alongside `typescript-language-server`.

```toml
[language-server]
biome = { command = "biome", args = ["lsp-proxy"] }

[[language]]
name = "javascript"
language-servers = [ { name = "typescript-language-server", except-features = [ "format" ] }, "biome" ]
auto-format = true

[[language]]
name = "typescript"
language-servers = [ { name = "typescript-language-server", except-features = [ "format" ] }, "biome" ]
auto-format = true

[[language]]
name = "tsx"
auto-format = true
language-servers = [ { name = "typescript-language-server", except-features = [ "format" ] }, "biome" ]

[[language]]
name = "jsx"
auto-format = true
language-servers = [ { name = "typescript-language-server", except-features = [ "format" ] }, "biome" ]

[[language]]
name = "json"
language-servers = [ { name = "vscode-json-language-server", except-features = [ "format" ] }, "biome" ]
```

### Video Record

#### Code Action

<video src="https://user-images.githubusercontent.com/17974631/190205045-aeb86f87-1915-4d8b-8aad-2c046443ba83.mp4" width="720" controls></video>

#### Formatting

<video src="https://user-images.githubusercontent.com/17974631/190205065-ddfde866-5f7c-4f53-8a62-b6cbb577982f.mp4" width="720" controls></video>

### Note

Is there an extension for an editor that isn't listed here? Please file a PR and we will be happy to add it to the list.

# Getting Started

## Installation

The fastest way to download Biome is to use a package manager such as `npm`. This requires Node.js v14.18 or newer. The CLI is also available as a [standalone executable](https://biomejs.dev/guides/manual-installation) if you want to use Biome without installing Node.js.

To install Biome, run the following commands in a directory containing a `package.json` file.

### Using npm
```bash
npm install --save-dev --save-exact @biomejs/biome
```

### Using pnpm
```bash
pnpm add --save-dev --save-exact @biomejs/biome
```

### Using yarn
```bash
yarn add --dev --exact @biomejs/biome
```

### Using bun
```bash
bun add --dev --exact @biomejs/biome
```

### Using deno
```bash
deno add --dev npm:@biomejs/biome
```

We instruct the package manager to pin an exact version of Biome. This ensures that everyone within a project has exactly the same version of Biome. Even a patch release can result in slightly different behavior. See the [versioning page](https://biomejs.dev/internals/versioning/) for more information.

## Configuration

We recommend that you create a `biome.json` or a `biome.jsonc` configuration file for each project. This eliminates the need to repeat the CLI options each time you run a command, and ensures that Biome uses the same configuration in your editor. Some options are also only available from a configuration file. If you are happy with Biome's defaults, you don't need to create a configuration file.

To create the `biome.json` file, run the `init` command in the root folder of your project:
```bash
biome init
```

Pass the `--jsonc` option to emit a `biome.jsonc` file instead.

After running the `init` command, you'll have a new `biome.json` file in your directory:
```json
{
  "$schema": "https://biomejs.dev/schema.json",
  "extends": ["biome:recommended"],
  "formatter": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  }
}
```

The `linter.enabled: true` enables the linter and `rules.recommended: true` enables the [recommended rules](https://biomejs.dev/linter/rules/). This corresponds to the default settings.

Formatting is enabled **by default**, but you can [disable](https://biomejs.dev/reference/configuration/#formatterenabled) it by explicitly using `formatter.enabled: false`.

## Usage

The Biome CLI comes with many commands and options, so you can use only what you need.

You can format files and directories using the `format` command with the `--write` option:
```bash
biome format --write <files>
```

You can lint and apply [safe fixes](https://biomejs.dev/linter#safe-fixes) to files and directories using the `lint` command with the `--write` option:
```bash
biome lint --write <files>
```

You can run **both** of them by leveraging the `check` command:
```bash
biome check --write <files>
```

The `check` command runs multiple tools at once. It formats, lints, and organizes imports.

## Install an editor plugin

We recommend installing an editor plugin to get the most out of Biome. Check out the [editor page](https://biomejs.dev/guides/integrate-in-editor) to know which editors support Biome.

## CI Setup

If you're using Node.js, the recommended way to run Biome in CI is to use [your preferred package manager](https://biomejs.dev/guides/getting-started#installation). This ensures that your CI pipeline uses the same version of Biome as you do inside the editor or when running local CLI commands. Alternatively, you can use a dedicated [CI Action](https://biomejs.dev/recipes/continuous-integration).

## Next Steps

Success! You're now ready to use Biome. 

- [Migrate from ESLint and Prettier](https://biomejs.dev/guides/migrate-eslint-prettier)
- Learn more about how to [configure Biome](https://biomejs.dev/guides/configure-biome)
- Learn more about how to use and configure the [formatter](https://biomejs.dev/formatter)
- Learn more about how to use and configure the [linter](https://biomejs.dev/linter)
- Get familiar with the [CLI options](https://biomejs.dev/reference/cli)
- Get familiar with the [configuration options](https://biomejs.dev/reference/configuration)
- Join our [community on Discord](https://biomejs.dev/chat)

# Integrate Biome in your editor

Biome has [LSP](https://microsoft.github.io/language-server-protocol/) first-class support. If your editor implements LSP, then the integration of Biome should be seamless.

## Use the LSP proxy

Biome has a command called `lsp-proxy`. When executed, Biome will spawn two processes:
- a daemon that executes the requested operations;
- a server that functions as a proxy between the requests of the client - the editor - and the server - the daemon;

If your editor is able to interact with a server and send [JSON-RPC](https://www.jsonrpc.org/) request, you only need to configure the editor run that command.

You can check how the [neo-vim biome plugin](https://github.com/neovim/nvim-lspconfig/blob/master/lua/lspconfig/configs/biome.lua) does it.

## Use `stdin`

If your editor doesn't support LSP, you can use the `biome` binary directly and call it using [standard input](https://en.wikipedia.org/wiki/Standard_streams#Standard_input_(stdin)).

The following commands can be called via standard input:
- `format`
- `lint`
- `check`

Biome will return the new output (or the original output if changes haven't occurred) to [standard output](https://en.wikipedia.org/wiki/Standard_streams#Standard_output_(stdout)) and the diagnostics to [standard error](https://en.wikipedia.org/wiki/Standard_streams#Standard_error_(stderr)).

When you use `stdin`, you must pass the `--stdin-file-path` option. The file `path` **doesn't need to exist** in your file system, it can be any name. **What's important** is to provide the correct file extension, so Biome knows **how to treat** your file.

It's the editor's responsibility to locate the resolve the path of the binary and then call it when it's needed. The binaries are shipped to npm based on the architectures and OS that we support:
- `@biomejs/cli-darwin-arm64`
- `@biomejs/cli-darwin-x64`
- `@biomejs/cli-linux-arm64`
- `@biomejs/cli-linux-x64`
- `@biomejs/cli-win32-arm64`
- `@biomejs/cli-win32-x64`

The binary name is `biome` or `biome.exe`, and it can be found in the root directory of the library, e.g.: `@biomejs/cli-darwin-arm64/biome`, `@biomejs/cli-win32-x64/biome.exe`.

## Use the daemon with the binary

Using the binary via CLI is very efficient, although you won't be able to provide logs to your users. The CLI allows you to bootstrap a daemon and then use the CLI commands through the daemon itself.

If order to do so, you first need to start a daemon process with the `start` command:

```shell
biome start
```
Then, every command needs to add the `--use-server` options, e.g.:

```shell
echo "console.log('')" | biome format --use-server --stdin-file-path=dummy.js
```

**Note:** If you decide to use the daemon, you're also responsible to restart/kill the process with the `stop` command, to avoid having ghost processes.

**Caution:** Operations via the daemon are significantly slower than the CLI itself, so it's advised to run operations only on single files.

## Daemon logs

The Biome daemon saves logs in your file system.
They are stored in a folder called `biome-logs`.
The path to this folder will vary depending on your operating system:
- Linux: `~/.cache/biome`;
- Windows: `C:\Users\<UserName>\AppData\Local\biomejs\biome\cache`
- macOS: `/Users/<UserName>/Library/Caches/dev.biomejs.biome`

For other operative systems, you can find the folder in the system's temporary directory.

To obtain the precise path, execute the following command:

```shell
biome explain daemon-logs
```

The log files are rotated on an hourly basis.
You can remove the logs using the `clean` command:

```shell
biome clean
```

# Integrate Biome with your VCS

The VCS (Version Control System) integration is meant to take advantage of additional features that only a VCS can provide. At the moment, Biome only supports Git. The integration is opt-in. You have to enable `vcs.enabled` and set `vcs.clientKind` in the Biome configuration file:

```json
{
  "vcs": {
    "enabled": true,
    "clientKind": "git"
  }
}
```

This configuration doesn't do anything per se. You need to opt-in the features you want.

### Use the ignore file

Enable `vcs.useIgnoreFile`, to allow Biome to ignore all the files and directories listed in your VCS ignore file. For now, Biome only takes the ignore file in the working directory into account.

```json
{
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  }
}
```

### Process only changed files

This is a feature that is available only via CLI, and allows processing only the files that have changed from one revision to another.

First, you have to update your configuration file and tell Biome what's the default branch via the `vcs.defaultBranch` field:

```json
{
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true,
    "defaultBranch": "main"
  }
}
```

Then, add the `--changed` option to your command, to process only those files that your VCS acknowledged as "changed". Biome, with the help of the VCS, will determine the changed file from the branch `main` and your current revision:

```shell
biome check --changed
```

**Note:** Biome doesn't check what's changed, this means that even adding spaces or newlines to a file, will mark this file as "changed".

Alternatively, you can use the option `--since` to specify an arbitrary branch. This option takes precedence over the option `vcs.defaultBranch`. For example, you might want to check your changes against the `next` branch:

```shell
biome check --changed --since=next
```

### Process only staged files

Before committing your changes, you may want to check the formatting and lints files that have been added to the _index_, also known as _staged files_. Add the `--staged` option to your command, to process only those files:

```shell
biome check --staged
```

**Note:** The `--staged` option is not available on the `ci` command because you are not expected to commit changes in a CI environment.

# Manual Installation

## Overview

Using Biome's standalone CLI binary can be a great choice if you aren't already using Node.js or `npm` (or any other package manager). Or in other words, Biome shouldn't be the only reason for you to have a `package.json`.

## Supported Platforms

You have to pick the correct binary for your platform for Biome to work. The following table should help you do so.

| CPU Architecture | Windows       | macOS                        | Linux         | Linux (musl)       |
| ---------------- | ------------- | ---------------------------- | ------------- | ------------------ |
| `arm64`          | `win32-arm64` | `darwin-arm64` (M1 or newer) | `linux-arm64` | `linux-arm64-musl` |
| `x64`            | `win32-x64`   | `darwin-x64`                 | `linux-x64`   | `linux-x64-musl`   |

## Homebrew

Biome is available as a [Homebrew formula](https://formulae.brew.sh/formula/biome) for macOS and Linux users.

```shell
brew install biome
```

## Using a Published Binary

To install Biome, grab the executable for your platform from the [latest CLI release](https://github.com/biomejs/biome/releases) on GitHub and give it execution permission.

### macOS (arm, M1 or newer)

```shell
curl -L https://github.com/biomejs/biome/releases/download/cli%2Fv<version>/biome-darwin-arm64 -o biome
chmod +x biome
```

### Linux (x86_64)

```shell
curl -L https://github.com/biomejs/biome/releases/download/cli%2Fv<version>/biome-linux-x64 -o biome
chmod +x biome
```

### Windows (x86_64, Powershell)

```shell
Invoke-WebRequest -Uri "https://github.com/biomejs/biome/releases/download/cli%2Fv<version>/biome-win32-x64.exe" -OutFile "biome.exe"
```

Note: Make sure to replace `<version>` with the Biome version you want to install.

## Next Steps

Now you can use Biome by simply running `./biome`. Follow our [Getting Started guide](https://github.com/biomejs/biome/blob/main/docs/guides/getting-started.md) for more information.

# Migrate from ESLint and Prettier

Biome provides dedicated commands to ease the migration from ESLint and Prettier.

## Quick Start

If you don't want to know the details, just run the following commands:

```shell
biome migrate eslint --write
biome migrate prettier --write
```

## Migrate from ESLint

Many Biome linter rules are inspired by or identical to the ESLint rules or the rules of an ESLint plugin.
We handle some ESLint plugins such as [TypeScript ESLint](https://typescript-eslint.io/), [ESLint JSX A11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y), [ESLint React](https://github.com/jsx-eslint/eslint-plugin-react), and [ESLint Unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn).
However, Biome has its own naming convention for its rules.
Biome uses `camelCaseRuleName` while ESLint uses `kebab-case-rule-name`.
Moreover, Biome has often chosen to use different names to better convey the intent of its rules.
The source of a rule can be found on the page describing the rule.
You can also find the equivalent Biome rule from an ESLint rule using the [dedicated page](https://typescript-eslint.io/).

To ease the migration, Biome provides the `biome migrate eslint` subcommand.
This subcommand will read your ESLint configuration and attempt to port its settings to Biome.
The subcommand is able to handle both the legacy and the flat configuration files.
It supports the `extends` field of the legacy configuration and loads both shared and plugin configurations.
The subcommand also migrates `.eslintignore`.

Given the following ESLint configuration:

```json
{
  "extends": ["plugin:unicorn/recommended"],
  "plugins": ["unicorn"],
  "ignore_patterns": ["dist/**"],
  "globals": {
    "Global1": "readonly"
  },
  "rules": {
    "eqeqeq": "error"
  },
  "overrides": [
    {
      "files": ["tests/**"],
      "rules": {
        "eqeqeq": "off"
      }
    }
  ]
}
```

And the following Biome configuration:

```json
{
	"linter": {
		"enabled": true,
		"rules": {
			"recommended": true
		}
	}
}
```

Run the following command to migrate your ESLint configuration to Biome.

```shell
biome migrate eslint --write
```

The subcommand overwrites your initial Biome configuration.
For example, it disables `recommended`.
This results in the following Biome configuration:

```json
{
	"organizeImports": { "enabled": true },
	"linter": {
		"enabled": true,
		"rules": {
			"recommended": false,
			"complexity": {
				"noForEach": "error",
				"noStaticOnlyClass": "error",
				"noUselessSwitchCase": "error",
				"useFlatMap": "error"
			},
			"style": {
				"noNegationElse": "off",
				"useForOf": "error",
				"useNodejsImportProtocol": "error",
				"useNumberNamespace": "error"
			},
			"suspicious": {
				"noDoubleEquals": "error",
				"noThenProperty": "error",
				"useIsArray": "error"
			}
		}
	},
	"javascript": { "globals": ["Global1"] },
	"overrides": [
		{
			"include": ["tests/**"],
			"linter": { "rules": { "suspicious": { "noDoubleEquals": "off" } } }
		}
	]
}
```

The subcommand needs Node.js to load and resolve all the plugins and `extends` configured in the ESLint configuration file.
For now, `biome migrate eslint` doesn't support configuration written in YAML.

By default, Biome doesn't migrate inspired rules.
You can use the CLI flag `--include-inspired` to migrate them.

```shell
biome migrate eslint --write --include-inspired
```

Note that you are unlikely to get exactly the same behavior as ESLint because Biome has chosen not to implement some rule options or to deviate slightly from the original implementation.

Since ESLint takes VCS ignore files into account,
we recommend that you enable Biome's [VCS integration](https://typescript-eslint.io/).

Some plugins or shared configurations may export an object with a cyclic reference.
Biome may fail to load such a configuration.

## Migrate from Prettier

Biome tries to match the Prettier formatter as closely as possible.
However, Biome uses different defaults for its formatter.
For example, it uses tabs for indentation instead of spaces.
You can easily migrate to Biome by running `biome migrate prettier --write`.

Given the following Prettier configuration:

```json
{
	"useTabs": false,
	"singleQuote": true,
	"overrides": [
		{
      		"files": ["*.json"],
      		"options": { "tabWidth": 2 }
    	}
	]
}
```

Run the following command to migrate your Prettier configuration to Biome.

```shell
biome migrate prettier --write
```

This results in the following Biome configuration:

```json
{
	"formatter": {
		"enabled": true,
		"formatWithErrors": false,
		"indentStyle": "space",
		"indentWidth": 2,
		"lineEnding": "lf",
		"lineWidth": 80,
		"attributePosition": "auto"
	},
	"organizeImports": { "enabled": true },
	"linter": { "enabled": true, "rules": { "recommended": true } },
	"javascript": {
		"formatter": {
			"jsxQuoteStyle": "double",
			"quoteProperties": "asNeeded",
			"trailingCommas": "all",
			"semicolons": "asNeeded",
			"arrowParentheses": "always",
			"bracketSpacing": true,
			"bracketSameLine": false,
			"quoteStyle": "single",
			"attributePosition": "auto"
		}
	},
	"overrides": [
		{
			"include": ["*.json"],
			"formatter": {
				"indentWidth": 2
			}
		}
	]
}
```

The subcommand needs Node.js to load JavaScript configurations such as `.prettierrc.js`.
`biome migrate prettier` doesn't support configuration written in JSON5, TOML, or YAML.

Since Prettier takes VCS ignore files into account,
we recommend that you enable Biome's [VCS integration](https://typescript-eslint.io/).

# Biome
Biome, toolchain of the web

## One toolchain for your web project
Format, lint, and more in a fraction of a second.

### Get started
* [Get started](https://github.com/biomejs/biome)
* [View on GitHub](https://github.com/biomejs/biome)

## Format code like Prettier, save time
Biome is a [fast formatter](https://github.com/biomejs/biome/tree/main/benchmark#formatting) for _JavaScript_, _TypeScript_, _JSX_, _TSX_, _JSON_, _CSS_ and _GraphQL_ that scores **[97% compatibility with _Prettier_](https://console.algora.io/challenges/prettier)**, **saving CI and developer time**.

Biome can even **format malformed code** as you write it in [your favorite editor](https://github.com/biomejs/biome).

### Example
* **CODE**
  * [Input](#)
* **OUTPUT**
  * [Output](#)
* **PERFORMANCE**
  * ~35x faster than Prettier when formatting 171,127 lines of code in 2,104 files with an Intel Core i7 1270P.

### Try the Biome formatter
```shell
npm i -D --save-exact @biomejs/biome
npx @biomejs/biome format --write ./src
```

## Fix problems, learn best practice
Biome is a [performant linter](https://github.com/biomejs/biome/tree/main/benchmark#linting) for _JavaScript_, _TypeScript_, _JSX_, _CSS_ and _GraphQL_ that features **[<NumberOfRules/> rules](https://github.com/biomejs/biome)** from ESLint, TypeScript ESLint, and [other sources](https://github.com/biomejs/biome).

**Biome outputs detailed and contextualized diagnostics** that help you to improve your code and become a better programmer!

### Try the Biome linter
```shell
npm i -D --save-exact @biomejs/biome
npx @biomejs/biome lint --write ./src
```

## Everything all at once
Not only can you format and lint your code separately, you can do it **all at once with a single command**!

Every tool integrates seamlessly with others to create **a cohesive toolchain** for web projects.

### Try the Biome toolchain
```shell
npm i -D --save-exact @biomejs/biome
npx @biomejs/biome check --write ./src
```

## Features
* **Fast**: Built with Rust and an innovative architecture inspired by rust-analyzer.
* **Simple**: Zero configuration needed to get started. Extensive options available for when you need them.
* **Scalable**: Designed to handle codebases of any size. Focus on growing product instead of your tools.
* **Optimized**: With tight internal integration we are able to reuse previous work and any improvement to one tool improves them all.
* **Actionable & Informative**: Avoid obscure error messages, when we tell you something is wrong, we tell you exactly where the problem is and how to fix it.
* **Batteries Included**: Out of the box support for all the language features you use today. First class support for TypeScript and JSX.

## Try Biome
* [Install with package manager](https://github.com/biomejs/biome)
* [Integrate Biome in your editor](https://github.com/biomejs/biome)

## Community
* [Discord](https://biomejs.dev/chat)
* [GitHub](https://github.com/biomejs/biome)
* [Twitter](https://twitter.com/biomejs)
* [Mastodon](https://fosstodon.org/@biomejs)

## Sponsors
* [Sponsors](https://github.com/biomejs/biome)

# Architecture
This document covers some of the internals of Biome, and how they are used inside the project.

## Parser and CST

The architecture of the parser is bumped by an internal fork of [rowan], a library that implements the [Green and Red tree] pattern.

The CST (Concrete Syntax Tree) is a data structure very similar to an AST (Abstract Syntax Tree) that keeps track of all the information of a program, trivia included.

**Trivia** is represented by all that information that is important to a program to run:
- spaces
- tabs
- comments

Trivia is attached to a node. A node can have leading trivia and trailing trivia. If you read code from left to right, leading trivia appears before a keyword, and trailing trivia appears after a keyword.

Leading trivia and trailing trivia are categorized as follows:
- Every trivia up to the token/keyword (including line breaks) will be the **leading trivia**;
- Everything until the next linebreak (but not including it) will be the **trailing trivia**;

Given the following JavaScript snippet, `// comment 1` is a trailing trivia of the token `;`, and `// comment 2` is a leading trivia to the keyword `const`. Below is a minimized version of the CST represented by Biome:

```js
const a = "foo"; // comment 1
// comment 2
const b = "bar";
```

```
0: JS_MODULE@0..55
    ...
      1: SEMICOLON@15..27 ";" [] [Whitespace(" "), Comments("// comment 1")]
    1: JS_VARIABLE_STATEMENT@27..55
        ...
        1: CONST_KW@27..45 "const" [Newline("\n"), Comments("// comment 2"), Newline("\n")] [Whitespace(" ")]
  3: EOF@55..55 "" [] []
```

The CST is never directly accessible by design; a developer can read its information using the Red tree, using a number of APIs that are autogenerated from the grammar of the language.

### Resilient and recoverable parser

In order to construct a CST, a parser needs to be error-resilient and recoverable:
- resilient: a parser that is able to resume parsing after encountering syntax errors that belong to the language;
- recoverable: a parser that is able to **understand** where an error occurred and being able to resume the parsing by creating **correct** information;

The recoverable part of the parser is not a science, and no rules are set in stone. This means that depending on what the parser was parsing and where an error occurred, the parser might be able to recover itself in an expected way.

The parser also uses 'Bogus' nodes to protect the consumers from consuming incorrect syntax. These nodes are used to decorate the broken code caused by a syntax error.

In the following example, the parentheses in the `while` are missing, although the parser can recover itself in a good manner and can represent the code with a decent CST. The parenthesis and condition of the loop are marked as missing, and the code block is correctly parsed:

```js
while {}
```

```
JsModule {
  interpreter_token: missing (optional),
  directives: JsDirectiveList [],
  items: JsModuleItemList [
    JsWhileStatement {
      while_token: WHILE_KW@0..6 "while" [] [Whitespace(" ")],
      l_paren_token: missing (required),
      test: missing (required),
      r_paren_token: missing (required),
      body: JsBlockStatement {
        l_curly_token: L_CURLY@6..7 "{" [] [],
        statements: JsStatementList [],
        r_curly_token: R_CURLY@7..8 "}" [] [],
      },
    },
  ],
  eof_token: EOF@8..8 "" [] [],
}
```

This is an error emitted during parsing:

```
main.tsx:1:7 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  expected `(` but instead found `{`

  > 1 │ while {}
      │       ^

  Remove {
```

The same can't be said for the following snippet. The parser can't properly understand the syntax during the recovery phase, so it needs to rely on the bogus nodes to mark some syntax as erroneous. Notice the `JsBogusStatement`:

```js
function}
```

```
JsModule {
  interpreter_token: missing (optional),
  directives: JsDirectiveList [],
  items: JsModuleItemList [
    TsDeclareFunctionDeclaration {
      async_token: missing (optional),
      function_token: FUNCTION_KW@0..8 "function" [] [],
      id: missing (required),
      type_parameters: missing (optional),
      parameters: missing (required),
      return_type_annotation: missing (optional),
      semicolon_token: missing (optional),
    },
    JsBogusStatement {
      items: [
        R_CURLY@8..9 "}" [] [],
      ],
    },
  ],
  eof_token: EOF@9..9 "" [] [],
}
```

This is the error we get from the parsing phase:

```
main.tsx:1:9 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  expected a name for the function in a function declaration, but found none

  > 1 │ function}
      │         ^
```

## Formatter (WIP)

## Linter (WIP)

## Daemon (WIP)

Biome uses a server-client architecture to run its tasks.

A [daemon] is a long-running server that Biome spawns in the background and uses to process requests from the editor and CLI.

[rowan]: https://github.com/rust-analyzer/rowan
[Green and Red tree]: https://learn.microsoft.com/en-us/archive/blogs/ericlippert/persistence-facades-and-roslyns-red-green-trees
[daemon]: https://en.wikipedia.org/wiki/Daemon_(computing)

# Credits

## Logo

<div class="logo-creator">
  <a href="https://github.com/ugudango">
    <img width="250" height="250" src="https://avatars.githubusercontent.com/u/33418415?v=4" alt="Alexandru-Ștefan Gârleanu" />
    <span>Alexandru-Ștefan Gârleanu</span>
  </a>
</div>

## Acknowledgements

Biome contains code that is heavily inspired from other projects. They have been adapted to Biome's language/infrastructure.

- [Prettier](https://github.com/prettier/prettier/)
  - [LICENSE](https://github.com/biomejs/biome/blob/main/crates/biome_js_formatter/LICENSE)

## Forks

Biome is a community fork of [Rome Tools](https://github.com/biomejs/biome/).
_Rome Tools_ and _Biome_ are licensed under The MIT license.

Biome contains code forked from other projects.
They have been transformed in some way, sometimes substantially rewritten.

- [crates/biome_diagnostics](https://github.com/biomejs/biome/tree/main/crates/biome_diagnostics)
  - **Original**: [rslint/rslint_errors](https://github.com/rslint/rslint/tree/master/crates/rslint_errors)
  - **License**: MIT

- [crates/biome_console/src/codespan](https://github.com/biomejs/biome/tree/main/crates/biome_console)
  - **Original**: [brendanzab/codespan](https://github.com/brendanzab/codespan)
  - **License**: Apache License, Version 2.0

- [crates/biome_js_parser](https://github.com/biomejs/biome/tree/main/crates/biome_js_parser)
  - **Original**: [rslint/rslint_parser](https://github.com/rslint/rslint/tree/master/crates/rslint_parser)
  - **License**: MIT

- [crates/biome_js_parser/lexer](https://github.com/biomejs/biome/tree/main/crates/biome_js_parser/src/lexer)
  - **Original**: [rslint/rslint_lexer](https://github.com/rslint/rslint/tree/master/crates/rslint_lexer)
  - **License**: MIT

- [crates/biome_js_syntax](https://github.com/biomejs/biome/tree/main/crates/biome_js_syntax)
  - **Original**: [rslint/rslint_syntax](https://github.com/rslint/rslint/tree/master/crates/rslint_syntax)
  - **License**: MIT

- [crates/biome_text_edit](https://github.com/biomejs/biome/tree/main/crates/biome_text_edit)
  - **Original**: [rslint/rslint_text_edit](https://github.com/rslint/rslint/tree/master/crates/rslint_text_edit)
  - **License**: MIT

- [crates/biome_rowan](https://github.com/biomejs/biome/tree/main/crates/biome_rowan)
  - **Original**: [rust-analyzer/rowan](https://github.com/rust-analyzer/rowan)
  - **License**: Apache License, Version 2.0

- [crates/biome_text_size](https://github.com/biomejs/biome/tree/main/crates/biome_text_size)
  - **Original**: [rust-analyzer/text-size](https://github.com/rust-analyzer/text-size)
  - **License**: Apache License, Version 2.0 or MIT

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

# Philosophy

This list includes general ethos that the project should abide by. This list is not comprehensive. Some of these are obvious but are stated for completeness.

## Project Management

### Set Clear Expectations
Make project intent and decisions known well in advance. Nothing should be a surprise.

### Clear Messaging of Decisions
The team might evaluate options and make decisions using private channels. Team will try to keep discussions using public channels like [GitHub discussions](https://github.com/biomejs/biome/discussions) or [Discord](https://biomejs.dev/chat). Frequent private check-ins might happen. When decisions occur via private channels, the team has to commit to communicate these decisions using the public channels.

## Technical

### Error Handling
- **Suggest Fixes and Hints**: Errors should suggest fixes and hints where possible. These should be inferred and filtered from usage to reduce surfacing irrelevant and unhelpful messages.
- **Unique and Specific Error Messages**: No generic error messages. This helps users understand what went wrong and should provide maintainers with a unique call site and the necessary information to debug.

### Code Quality
- **Optimise API**: Question the existence of all options and flags. Are they necessary? Can they be combined? How can we reduce code branching?
- **Document Code**: Strive to document the code as much as possible, especially the "hard-to-read" code, or for special logic that requires explanation. A well documented code helps its maintainability, especially when multiple people work on it. The developer after you will benefit from your knowledge, share it.

### Terminology and Naming
- **Reduce Jargon**: Don't assume that users will understand specific terminology. Strive to provide precise meaning for experts and beginners. For example, use "character" where you would traditionally use "token" when producing parser errors.
- **Use Inclusive Terminology**: Use gender-neutral pronouns. No ableist slurs. No usage of terms that could be considered insensitive.
- **Verbose Naming**: Utilize verbosity when naming commands and flags. No unnecessary and confusing abbreviations.

### Output and Compatibility
- **Build for Generic Clients**: Don't assume that a terminal will only consume output using ANSI codes. Use abstractions that could be generalized for viewing in an IDE, browser, or other environments.
- **Unambiguous Terminal Output**: When designing terminal output, don't rely purely on formatting cues like color. Always use a combination of formatting, symbols, and spacing. If all ANSI codes are stripped, all the output should still be understood.

# Versioning

Fixes to lint rules, formatting layouts, etc. might prevent your scripts from passing. Due to the nature of these changes, it's **highly recommended** to save the _exact_ version in your `package.json`, instead of using range operators.

This methodology will make sure that your script won't fail unexpectedly.

## Semantic Versioning

Biome follows [semantic versioning](https://semver.org/). Due to the nature of Biome as a toolchain, it can be unclear what changes are considered major, minor, or patch. That's why Biome uses the following versioning guide:

### Patch Release

* Fixing a lint rule that raises lint errors for valid code (false positives)
* Fixing incorrect code suggestions
* Fixing the formatting of a syntax that results in invalid code or changes the semantics of the program
* Improvements to the documentation
* Internal changes that don't change Biome's functionality:
  * Refactors
  * Performance improvements
  * Increase or change in test coverage
* Improving the wording of diagnostics or fixing the rendering of diagnostics
* Re-releases after a failed release
* Changing the formatting of established syntax

### Minor Release

* Adding a new rule or promoting an existing lint rule to a stable group that is not recommended by default
* Adding linting and formatting support for a recently introduced language feature, even if that results in more reported linting errors
* Removal of recommended rules
* Deprecation of existing rules
* Adding new configuration optional configuration options that do not change the formatting or report more lint errors
* Adding a new recommended lint rule or promoting an existing lint rule from the nursery group to a recommended lint rule in a stable group
* Removal of a non-*nursery* rule or demoting a rule to the *nursery* group

### Major Release

* Changes to the configuration that result in different formatting or more reported lint errors (adding/removing options, changing the default value)
* Changes to Biome's public API
* Promotion of new features or tools that require some spotlight

## Visual Studio Code Extension

Visual Studio Code [doesn't support pre-release tags](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#prerelease-extensions) for extensions. That's why Biome uses the following version schema to distinguish stable and previews:

* Stable releases use even version numbers: 10, 12, 14, 16, ...
* Previews use odd version numbers: 11, 13, 15, 17, ...

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

# Introduction

## Accessibility

Rules focused on preventing accessibility problems.
| Rule name | Description | Properties |
| --- | --- | --- |
| noAccessKey | Enforce that the `accessKey` attribute is not used on any HTML element. | Recommended, Unsafe fix, JSX rule |
| noAriaHiddenOnFocusable | Enforce that aria-hidden="true" is not set on focusable elements. | Recommended, Unsafe fix, JSX rule |
| noAriaUnsupportedElements | Enforce that elements that do not support ARIA roles, states, and properties do not have those attributes. | Recommended, Unsafe fix, JSX rule |
| noAutofocus | Enforce that autoFocus prop is not used on elements. | Recommended, Unsafe fix, JSX rule |
| noBlankTarget | Disallow `target="_blank"` attribute without `rel="noreferrer"` | Recommended, Safe fix, JSX rule |
| noDistractingElements | Enforces that no distracting elements are used. | Recommended, Unsafe fix, JSX rule |
| noHeaderScope | The scope prop should be used only on `<th>` elements. | Recommended, Unsafe fix, JSX rule |
| noInteractiveElementToNoninteractiveRole | Enforce that non-interactive ARIA roles are not assigned to interactive HTML elements. | Recommended, Unsafe fix, JSX rule |
| noLabelWithoutControl | Enforce that a label element or component has a text label and an associated input. | Recommended, JSX rule |
| noNoninteractiveElementToInteractiveRole | Enforce that interactive ARIA roles are not assigned to non-interactive HTML elements. | Recommended, Unsafe fix, JSX rule |
| noNoninteractiveTabindex | Enforce that `tabIndex` is not assigned to non-interactive HTML elements. | Recommended, Unsafe fix, JSX rule |
| noPositiveTabindex | Prevent the usage of positive integers on `tabIndex` property | Recommended, Unsafe fix, JSX rule |
| noRedundantAlt | Enforce `img` alt prop does not contain the word "image", "picture", or "photo". | Recommended, JSX rule |
| noRedundantRoles | Enforce explicit `role` property is not the same as implicit/default role property on an element. | Recommended, Unsafe fix, JSX rule |
| noSvgWithoutTitle | Enforces the usage of the `title` element for the `svg` element. | Recommended, JSX rule |
| useAltText | Enforce that all elements that require alternative text have meaningful information to relay back to the end user. | Recommended, JSX rule |
| useAnchorContent | Enforce that anchors have content and that the content is accessible to screen readers. | Recommended, Unsafe fix, JSX rule |
| useAriaActivedescendantWithTabindex | Enforce that `tabIndex` is assigned to non-interactive HTML elements with `aria-activedescendant`. | Recommended, Unsafe fix, JSX rule |
| useAriaPropsForRole | Enforce that elements with ARIA roles must have all required ARIA attributes for that role. | Recommended, JSX rule |
| useButtonType | Enforces the usage of the attribute `type` for the element `button` | Recommended, JSX rule |
| useFocusableInteractive | Elements with an interactive role and interaction handlers must be focusable. | Recommended, JSX rule |
| useGenericFontNames | Disallow a missing generic family keyword within font families. | Recommended, CSS rule |
| useHeadingContent | Enforce that heading elements (h1, h2, etc.) have content and that the content is accessible to screen readers. | Recommended, JSX rule |
| useHtmlLang | Enforce that `html` element has `lang` attribute. | Recommended, JSX rule |
| useIframeTitle | Enforces the usage of the attribute `title` for the element `iframe`. | Recommended, JSX rule |
| useKeyWithClickEvents | Enforce onClick is accompanied by at least one of the following: `onKeyUp`, `onKeyDown`, `onKeyPress`. | Recommended, JSX rule |
| useKeyWithMouseEvents | Enforce `onMouseOver` / `onMouseOut` are accompanied by `onFocus` / `onBlur`. | Recommended, JSX rule |
| useMediaCaption | Enforces that `audio` and `video` elements must have a `track` for captions. | Recommended, JSX rule |
| useSemanticElements | It detects the use of `role` attributes in JSX elements and suggests using semantic elements instead. | Recommended, JSX rule |
| useValidAnchor | Enforce that all anchors are valid, and they are navigable elements. | Recommended, JSX rule |
| useValidAriaProps | Ensures that ARIA properties `aria-*` are all valid. | Recommended, Unsafe fix, JSX rule |
| useValidAriaRole | Elements with ARIA roles must use a valid, non-abstract ARIA role. | Recommended, Unsafe fix, JSX rule |
| useValidAriaValues | Enforce that ARIA state and property values are valid. | Recommended, JSX rule |
| useValidLang | Ensure that the attribute passed to the `lang` attribute is a correct ISO language and/or country. | Recommended, JSX rule |

## Complexity

Rules that focus on inspecting complex code that could be simplified.
| Rule name | Description | Properties |
| --- | --- | --- |
| noBannedTypes | Disallow primitive type aliases and misleading types. | Recommended, Safe fix, TypeScript rule |
| noEmptyTypeParameters | Disallow empty type parameters in type aliases and interfaces. | Recommended, TypeScript rule |
| noExcessiveCognitiveComplexity | Disallow functions that exceed a given Cognitive Complexity score. | JavaScript and super languages rule |
| noExcessiveNestedTestSuites | This rule enforces a maximum depth to nested `describe()` in test files. | Recommended, JavaScript and super languages rule |
| noExtraBooleanCast | Disallow unnecessary boolean casts | Recommended, Unsafe fix, JavaScript and super languages rule |
| noForEach | Prefer `for...of` statement instead of `Array.forEach`. | Recommended, JavaScript and super languages rule |
| noMultipleSpacesInRegularExpressionLiterals | Disallow unclear usage of consecutive space characters in regular expression literals | Recommended, Safe fix, JavaScript and super languages rule |
| noStaticOnlyClass | This rule reports when a class has no non-static members, such as for a class used exclusively as a static namespace. | Recommended, JavaScript and super languages rule |
| noThisInStatic | Disallow `this` and `super` in `static` contexts. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noUselessCatch | Disallow unnecessary `catch` clauses. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noUselessConstructor | Disallow unnecessary constructors. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noUselessEmptyExport | Disallow empty exports that don't change anything in a module file. | Recommended, Safe fix, TypeScript rule |
| noUselessFragments | Disallow unnecessary fragments | Recommended, Unsafe fix, JSX rule |
| noUselessLabel | Disallow unnecessary labels. | Recommended, Safe fix, JavaScript and super languages rule |
| noUselessLoneBlockStatements | Disallow unnecessary nested block statements. | Recommended, Safe fix, JavaScript and super languages rule |
| noUselessRename | Disallow renaming import, export, and destructured assignments to the same name. | Recommended, Safe fix, JavaScript and super languages rule |
| noUselessStringConcat | Disallow unnecessary concatenation of string or template literals. | Unsafe fix, JavaScript and super languages rule |
| noUselessSwitchCase | Disallow useless `case` in `switch` statements. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noUselessTernary | Disallow ternary operators when simpler alternatives exist. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noUselessThisAlias | Disallow useless `this` aliasing. | Recommended, Safe fix, JavaScript and super languages rule |
| noUselessTypeConstraint | Disallow using `any` or `unknown` as type constraint. | Recommended, Safe fix, TypeScript rule |
| noUselessUndefinedInitialization | Disallow initializing variables to `undefined`. | Safe fix, JavaScript and super languages rule |
| noVoid | Disallow the use of `void` operators, which is not a familiar operator. | JavaScript and super languages rule |
| noWith | Disallow `with` statements in non-strict contexts. | Recommended, JavaScript and super languages rule |
| useArrowFunction | Use arrow functions over function expressions. | Recommended, Safe fix, JavaScript and super languages rule |
| useDateNow | Use `Date.now()` to get the number of milliseconds since the Unix Epoch. | Unsafe fix, JavaScript and super languages rule |
| useFlatMap | Promotes the use of `.flatMap()` when `map().flat()` are used together. | Recommended, Safe fix, JavaScript and super languages rule |
| useLiteralKeys | Enforce the usage of a literal access to properties over computed property access. | Recommended, Unsafe fix, JavaScript and super languages rule |
| useOptionalChain | Enforce using concise optional chain instead of chained logical expressions. | Recommended, Unsafe fix, JavaScript and super languages rule |
| useRegexLiterals | Enforce the use of the regular expression literals instead of the RegExp constructor if possible. | Recommended, Safe fix, JavaScript and super languages rule |
| useSimpleNumberKeys | Disallow number literal object member names which are not base10 or uses underscore as separator | Recommended, Safe fix, JavaScript and super languages rule |
| useSimplifiedLogicExpression | Discard redundant terms from logical expressions. | Unsafe fix, JavaScript and super languages rule |

## Correctness

Rules that detect code that is guaranteed to be incorrect or useless.
| Rule name | Description | Properties |
| --- | --- | --- |
| noChildrenProp | Prevent passing of children as props. | Recommended, JSX rule |
| noConstAssign | Prevents from having `const` variables being re-assigned. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noConstantCondition | Disallow constant expressions in conditions | Recommended, JavaScript and super languages rule |
| noConstantMathMinMaxClamp | Disallow the use of `Math.min` and `Math.max` to clamp a value where the result itself is constant. | Unsafe fix, JavaScript and super languages rule |
| noConstructorReturn | Disallow returning a value from a `constructor`. | Recommended, JavaScript and super languages rule |
| noEmptyCharacterClassInRegex | Disallow empty character classes in regular expression literals. | Recommended, JavaScript and super languages rule |
| noEmptyPattern | Disallows empty destructuring patterns. | Recommended, JavaScript and super languages rule |
| noFlatMapIdentity | Disallow to use unnecessary callback on `flatMap`. | Recommended, Safe fix, JavaScript and super languages rule |
| noGlobalObjectCalls | Disallow calling global object properties as functions | Recommended, JavaScript and super languages rule |
| noInnerDeclarations | Disallow `function` and `var` declarations that are accessible outside their block. | Recommended, JavaScript and super languages rule |
| noInvalidBuiltinInstantiation | Ensure that builtins are correctly instantiated. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noInvalidConstructorSuper | Prevents the incorrect use of `super()` inside classes. It also checks whether a call `super()` is missing from classes that extends other constructors. | Recommended, JavaScript and super languages rule |
| noInvalidDirectionInLinearGradient | Disallow non-standard direction values for linear gradient functions. | Recommended, CSS rule |
| noInvalidGridAreas | Disallows invalid named grid areas in CSS Grid Layouts. | Recommended, CSS rule |
| noInvalidNewBuiltin | Disallow `new` operators with global non-constructor functions. | Unsafe fix, JavaScript and super languages rule |
| noInvalidPositionAtImportRule | Disallow the use of `@import` at-rules in invalid positions. | Recommended, CSS rule |
| noInvalidUseBeforeDeclaration | Disallow the use of variables and function parameters before their declaration | Recommended, JavaScript and super languages rule |
| noNewSymbol | Disallow `new` operators with the `Symbol` object. | Unsafe fix, JavaScript and super languages rule |
| noNodejsModules | Forbid the use of Node.js builtin modules. | JavaScript and super languages rule |
| noNonoctalDecimalEscape | Disallow `\8` and `\9` escape sequences in string literals. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noPrecisionLoss | Disallow literal numbers that lose precision | Recommended, JavaScript and super languages rule |
| noRenderReturnValue | Prevent the usage of the return value of `React.render`. | Recommended, JSX rule |
| noSelfAssign | Disallow assignments where both sides are exactly the same. | Recommended, JavaScript and super languages rule |
| noSetterReturn | Disallow returning a value from a setter | Recommended, JavaScript and super languages rule |
| noStringCaseMismatch | Disallow comparison of expressions modifying the string case with non-compliant value. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noSwitchDeclarations | Disallow lexical declarations in `switch` clauses. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noUndeclaredDependencies | Disallow the use of dependencies that aren't specified in the `package.json`. | JavaScript and super languages rule |
| noUndeclaredVariables | Prevents the usage of variables that haven't been declared inside the document. | JavaScript and super languages rule |
| noUnknownFunction | Disallow unknown CSS value functions. | Recommended, CSS rule |
| noUnknownMediaFeatureName | Disallow unknown media feature names. | Recommended, CSS rule |
| noUnknownProperty | Disallow unknown properties. | Recommended, CSS rule |
| noUnknownUnit | Disallow unknown CSS units. | Recommended, CSS rule |
| noUnmatchableAnbSelector | Disallow unmatchable An+B selectors. | Recommended, CSS rule |
| noUnnecessaryContinue | Avoid using unnecessary `continue`. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noUnreachable | Disallow unreachable code | Recommended, JavaScript and super languages rule |
| noUnreachableSuper | Ensures the `super()` constructor is called exactly once on every code path in a class constructor before `this` is accessed if the class has a superclass | Recommended, JavaScript and super languages rule |
| noUnsafeFinally | Disallow control flow statements in finally blocks. | Recommended, JavaScript and super languages rule |
| noUnsafeOptionalChaining | Disallow the use of optional chaining in contexts where the undefined value is not allowed. | Recommended, JavaScript and super languages rule |
| noUnusedFunctionParameters | Disallow unused function parameters. | Unsafe fix, JavaScript and super languages rule |
| noUnusedImports | Disallow unused imports. | Safe fix, JavaScript and super languages rule |
| noUnusedLabels | Disallow unused labels. | Recommended, Safe fix, JavaScript and super languages rule |
| noUnusedPrivateClassMembers | Disallow unused private class members | Unsafe fix, JavaScript and super languages rule |
| noUnusedVariables | Disallow unused variables. | Unsafe fix, JavaScript and super languages rule |
| noVoidElementsWithChildren | This rules prevents void elements (AKA self-closing elements) from having children. | Recommended, Unsafe fix, JSX rule |
| noVoidTypeReturn | Disallow returning a value from a function with the return type 'void' | Recommended, TypeScript rule |
| useArrayLiterals | Disallow Array constructors. | Unsafe fix, JavaScript and super languages rule |
| useExhaustiveDependencies | Enforce all dependencies are correctly specified in a React hook. | Recommended, JSX rule |
| useHookAtTopLevel | Enforce that all React hooks are being called from the Top Level component functions. | JSX rule |
| useImportExtensions | Enforce file extensions for relative imports. | Unsafe fix, JavaScript and super languages rule |
| useIsNan | Require calls to `isNaN()` when checking for `NaN`. | Recommended, Unsafe fix, JavaScript and super languages rule |
| useJsxKeyInIterable | Disallow missing key props in iterators/collection literals. | Recommended, JSX rule |
| useValidForDirection | Enforce "for" loop update clause moving the counter in the right direction. | Recommended, JavaScript and super languages rule |
| useYield | Require generator functions to contain `yield`. | Recommended, JavaScript and super languages rule |

## Nursery

New rules that are still under development.  
Nursery rules require explicit opt-in via configuration on stable versions because they may still have bugs or performance problems.  
They are enabled by default on nightly builds, but as they are unstable their diagnostic severity may be set to either error or warning, depending on whether we intend for the rule to be recommended or not when it eventually gets stabilized.  
Nursery rules get promoted to other groups once they become stable or may be removed.  
Rules that belong to this group **are not subject to semantic version**.
| Rule name | Description | Properties |
| --- | --- | --- |
| noCommonJs | Disallow use of CommonJs module system in favor of ESM style imports. | JavaScript and super languages rule |
| noDescendingSpecificity | Disallow a lower specificity selector from coming after a higher specificity selector. | CSS rule |
| noDocumentCookie | Disallow direct assignments to `document.cookie`. | JavaScript and super languages rule |
| noDocumentImportInPage | Prevents importing `next/document` outside of `pages/_document.jsx` in Next.js projects. | JSX rule |
| noDuplicateCustomProperties | Disallow duplicate custom properties within declaration blocks. | CSS rule |
| noDuplicateElseIf | Disallow duplicate conditions in if-else-if chains | JavaScript and super languages rule |
| noDuplicateProperties | Disallow duplicate properties within declaration blocks. | CSS rule |
| noDuplicatedFields | No duplicated fields in GraphQL operations. | GraphQL rule |
| noDynamicNamespaceImportAccess | Disallow accessing namespace imports dynamically. | JavaScript and super languages rule |
| noEnum | Disallow TypeScript enum. | TypeScript rule |
| noExportedImports | Disallow exporting an imported variable. | JavaScript and super languages rule |
| noHeadElement | Prevent usage of `<head>` element in a Next.js project. | JSX rule |
| noHeadImportInDocument | Prevent using the `next/head` module in `pages/_document.js` on Next.js projects. | JSX rule |
| noImgElement | Prevent usage of `<img>` element in a Next.js project. | JSX rule |
| noIrregularWhitespace | Disallows the use of irregular whitespace characters. | CSS rule |
| noMissingVarFunction | Disallow missing var function for css variables. | CSS rule |
| noNestedTernary | Disallow nested ternary expressions. | JavaScript and super languages rule |
| noOctalEscape | Disallow octal escape sequences in string literals | JavaScript and super languages rule |
| noProcessEnv | Disallow the use of `process.env`. | JavaScript and super languages rule |
| noRestrictedImports | Disallow specified modules when loaded by import or require. | JavaScript and super languages rule |
| noRestrictedTypes | Disallow user defined types. | Safe fix, TypeScript rule |
| noSecrets | Disallow usage of sensitive data such as API keys and tokens. | JavaScript and super languages rule |
| noStaticElementInteractions | Enforce that static, visible elements (such as `<div>`) that have click handlers use the valid role attribute. | JavaScript and super languages rule |
| noSubstr | Enforce the use of `String.slice()` over `String.substr()` and `String.substring()`. | Unsafe fix, JavaScript and super languages rule |

## Performance

Rules catching ways your code could be written to run faster, or generally be more efficient.
| Rule name | Description | Properties |
| --- | --- | --- |
| noAccumulatingSpread | Disallow the use of spread (`...`) syntax on accumulators. | Recommended, JavaScript and super languages rule |
| noBarrelFile | Disallow the use of barrel file. | JavaScript and super languages rule |
| noDelete | Disallow the use of the `delete` operator. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noReExportAll | Avoid re-export all. | JavaScript and super languages rule |
| useTopLevelRegex | Require regex literals to be declared at the top level. | JavaScript and super languages rule |

## Security

Rules that detect potential security flaws.
| Rule name | Description | Properties |
| --- | --- | --- |
| noDangerouslySetInnerHtml | Prevent the usage of dangerous JSX props | Recommended, JSX rule |
| noDangerouslySetInnerHtmlWithChildren | Report when a DOM element or a component uses both `children` and `dangerouslySetInnerHTML` prop. | Recommended, JSX rule |
| noGlobalEval | Disallow the use of global `eval()`. | Recommended, JavaScript and super languages rule |

## Style

Rules enforcing a consistent and idiomatic way of writing your code.
| Rule name | Description | Properties |
| --- | --- | --- |
| noArguments | Disallow the use of `arguments`. | Recommended, JavaScript and super languages rule |
| noCommaOperator | Disallow comma operator. | Recommended, JavaScript and super languages rule |
| noDefaultExport | Disallow default exports. | JavaScript and super languages rule |
| noDoneCallback | Disallow using a callback in asynchronous tests and hooks. | JavaScript and super languages rule |
| noImplicitBoolean | Disallow implicit `true` values on JSX boolean attributes | Safe fix, JSX rule |
| noInferrableTypes | Disallow type annotations for variables, parameters, and class properties initialized with a literal expression. | Recommended, Safe fix, TypeScript rule |
| noNamespace | Disallow the use of TypeScript's `namespace`s. | TypeScript rule |
| noNamespaceImport | Disallow the use of namespace imports. | JavaScript and super languages rule |
| noNegationElse | Disallow negation in the condition of an `if` statement if it has an `else` clause. | Safe fix, JavaScript and super languages rule |
| noNonNullAssertion | Disallow non-null assertions using the `!` postfix operator. | Recommended, Unsafe fix, TypeScript rule |
| noParameterAssign | Disallow reassigning `function` parameters. | Recommended, JavaScript and super languages rule |
| noParameterProperties | Disallow the use of parameter properties in class constructors. | TypeScript rule |
| noRestrictedGlobals | This rule allows you to specify global variable names that you don’t want to use in your application. | JavaScript and super languages rule |
| noShoutyConstants | Disallow the use of constants which its value is the upper-case version of its name. | Unsafe fix, JavaScript and super languages rule |
| noUnusedTemplateLiteral | Disallow template literals if interpolation and special-character handling are not needed | Recommended, Unsafe fix, TypeScript rule |
| noUselessElse | Disallow `else` block when the `if` block breaks early. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noVar | Disallow the use of `var` | Recommended, Unsafe fix, JavaScript and super languages rule |
| noYodaExpression | Disallow the use of yoda expressions. | Safe fix, JavaScript and super languages rule |
| useAsConstAssertion | Enforce the use of `as const` over literal type and type annotation. | Recommended, Safe fix, TypeScript rule |
| useBlockStatements | Requires following curly brace conventions. | Unsafe fix, JavaScript and super languages rule |
| useCollapsedElseIf | Enforce using `else if` instead of nested `if` in `else` clauses. | Safe fix, JavaScript and super languages rule |
| useConsistentArrayType | Require consistently using either `T[]` or `Array<T>` | Unsafe fix, TypeScript rule |
| useConsistentBuiltinInstantiation | Enforce the use of `new` for all builtins, except `String`, `Number` and `Boolean`. | Unsafe fix, JavaScript and super languages rule |
| useConst | Require `const` declarations for variables that are only assigned once. | Recommended, Safe fix, JavaScript and super languages rule |
| useDefaultParameterLast | Enforce default function parameters and optional function parameters to be last. | Recommended, Unsafe fix, JavaScript and super languages rule |
| useDefaultSwitchClause | Require the default clause in switch statements. | JavaScript and super languages rule |
| useEnumInitializers | Require that each enum member value be explicitly initialized. | Recommended, Safe fix, TypeScript rule |
| useExplicitLengthCheck | Enforce explicitly comparing the `length`, `size`, `byteLength` or `byteOffset` property of a value. | Unsafe fix, JavaScript and super languages rule |
| useExponentiationOperator | Disallow the use of `Math.pow` in favor of the `**` operator. | Recommended, Unsafe fix, JavaScript and super languages rule |
| useExportType | Promotes the use of `export type` for types. | Recommended, Safe fix, TypeScript rule |
| useFilenamingConvention | Enforce naming conventions for JavaScript and TypeScript filenames. | JavaScript and super languages rule |
| useForOf | This rule recommends a `for-of` loop when in a `for` loop, the index used to extract an item from the iterated array. | JavaScript and super languages rule |
| useFragmentSyntax | This rule enforces the use of `<>...</>` over `<Fragment>...</Fragment>`. | Unsafe fix, JSX rule |
| useImportType | Promotes the use of `import type` for types. | Recommended, Safe fix, TypeScript rule |
| useLiteralEnumMembers | Require all enum members to be literal values. | Recommended, TypeScript rule |
| useNamingConvention | Enforce naming conventions for everything across a codebase. | Safe fix, TypeScript rule |
| useNodeAssertStrict | Promotes the usage of `node:assert/strict` over `node:assert`. | Safe fix, JavaScript and super languages rule |
| useNodejsImportProtocol | Enforces using the `node:` protocol for Node.js builtin modules. | Recommended, Unsafe fix, JavaScript and super languages rule |
| useNumberNamespace | Use the `Number` properties instead of global ones. | Recommended, Safe fix, JavaScript and super languages rule |
| useNumericLiterals | Disallow `parseInt()` and `Number.parseInt()` in favor of binary, octal, and hexadecimal literals | Recommended, Unsafe fix, JavaScript and super languages rule |
| useSelfClosingElements | Prevent extra closing tags for components without children | Recommended, Unsafe fix, JavaScript and super languages rule |
| useShorthandArrayType | When expressing array types, this rule promotes the usage of `T[]` shorthand instead of `Array<T>`. | Unsafe fix, TypeScript rule |
| useShorthandAssign | Require assignment operator shorthand where possible. | Unsafe fix, JavaScript and super languages rule |
| useShorthandFunctionType | Enforce using function types instead of object type with call signatures. | Recommended, Safe fix, TypeScript rule |
| useSingleCaseStatement | Enforces switch clauses have a single statement, emits a quick fix wrapping the statements in a block. | Unsafe fix, JavaScript and super languages rule |
| useSingleVarDeclarator | Disallow multiple variable declarations in the same variable statement | Recommended, Unsafe fix, JavaScript and super languages rule |
| useTemplate | Prefer template literals over string concatenation. | Recommended, Unsafe fix, JavaScript and super languages rule |
| useThrowNewError | Require `new` when throwing an error. | Unsafe fix, JavaScript and super languages rule |
| useWhile | Enforce the use of `while` loops instead of `for` loops when the initializer and update expressions are not needed. | Recommended, Safe fix, JavaScript and super languages rule |

## Suspicious

Rules that detect code that is likely to be incorrect or useless.
| Rule name | Description | Properties |
| --- | --- | --- |
| noApproximativeNumericConstant | Use standard constants instead of approximated literals. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noArrayIndexKey | Discourage the usage of Array index in keys. | Recommended, JSX rule |
| noAssignInExpressions | Disallow assignments in expressions. | Recommended, JavaScript and super languages rule |
| noAsyncPromiseExecutor | Disallows using an async function as a Promise executor. | Recommended, JavaScript and super languages rule |
| noCatchAssign | Disallow reassigning exceptions in catch clauses. | Recommended, JavaScript and super languages rule |
| noClassAssign | Disallow reassigning class members. | Recommended, JavaScript and super languages rule |
| noCommentText | Prevent comments from being inserted as text nodes | Recommended, Unsafe fix, JSX rule |
| noCompareNegZero | Disallow comparing against `-0` | Recommended, Safe fix, JavaScript and super languages rule |
| noConfusingLabels | Disallow labeled statements that are not loops. | Recommended, JavaScript and super languages rule |
| noConfusingVoidType | Disallow `void` type outside of generic or return types. | Recommended, Unsafe fix, TypeScript rule |
| noConsole | Disallow the use of `console`. | Unsafe fix, JavaScript and super languages rule |
| noConsoleLog | Disallow the use of `console.log` | Unsafe fix, JavaScript and super languages rule |
| noConstEnum | Disallow TypeScript `const enum` | Recommended, Safe fix, TypeScript rule |
| noControlCharactersInRegex | Prevents from having control characters and some escape sequences that match control characters in regular expressions. | Recommended, JavaScript and super languages rule |
| noDebugger | Disallow the use of `debugger` | Recommended, Unsafe fix, JavaScript and super languages rule |
| noDoubleEquals | Require the use of `===` and `!==`. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noDuplicateAtImportRules | Disallow duplicate `@import` rules. | Recommended, CSS rule |
| noDuplicateCase | Disallow duplicate case labels. | Recommended, JavaScript and super languages rule |
| noDuplicateClassMembers | Disallow duplicate class members. | Recommended, JavaScript and super languages rule |
| noDuplicateFontNames | Disallow duplicate names within font families. | Recommended, CSS rule |
| noDuplicateJsxProps | Prevents JSX properties to be assigned multiple times. | Recommended, JSX rule |
| noDuplicateObjectKeys | Disallow two keys with the same name inside objects. | Recommended, JSON rule |
| noDuplicateParameters | Disallow duplicate function parameter name. | Recommended, JavaScript and super languages rule |
| noDuplicateSelectorsKeyframeBlock | Disallow duplicate selectors within keyframe blocks. | Recommended, CSS rule |
| noDuplicateTestHooks | A `describe` block should not contain duplicate hooks. | Recommended, JavaScript and super languages rule |
| noEmptyBlock | Disallow CSS empty blocks. | Recommended, CSS rule |
| noEmptyBlockStatements | Disallow empty block statements and static blocks. | JavaScript and super languages rule |
| noEmptyInterface | Disallow the declaration of empty interfaces. | Recommended, Safe fix, TypeScript rule |
| noEvolvingTypes | Disallow variables from evolving into `any` type through reassignments. | TypeScript rule |
| noExplicitAny | Disallow the `any` type usage. | Recommended, Safe fix, TypeScript rule |
| noExportsInTest | Disallow using `export` or `module.exports` in files containing tests | Recommended, JavaScript and super languages rule |
| noExtraNonNullAssertion | Prevents the wrong usage of the non-null assertion operator (`!`) in TypeScript files. | Recommended, Safe fix, TypeScript rule |
| noFallthroughSwitchClause | Disallow fallthrough of `switch` clauses. | Recommended, JavaScript and super languages rule |
| noFocusedTests | Disallow focused tests. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noFunctionAssign | Disallow reassigning function declarations. | Recommended, JavaScript and super languages rule |
| noGlobalAssign | Disallow assignments to native objects and read-only global variables. | Recommended, JavaScript and super languages rule |
| noGlobalIsFinite | Use `Number.isFinite` instead of global `isFinite`. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noGlobalIsNan | Use `Number.isNaN` instead of global `isNaN`. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noImplicitAnyLet | Disallow use of implicit `any` type on variable declarations. | Recommended, TypeScript rule |
| noImportAssign | Disallow assigning to imported bindings | Recommended, JavaScript and super languages rule |
| noImportantInKeyframe | Disallow invalid `!important` within keyframe declarations | Recommended, CSS rule |
| noLabelVar | Disallow labels that share a name with a variable | Recommended, JavaScript and super languages rule |
| noMisleadingCharacterClass | Disallow characters made with multiple code points in character class syntax. | Recommended, Safe fix, JavaScript and super languages rule |
| noMisleadingInstantiator | Enforce proper usage of `new` and `constructor`. | Recommended, TypeScript rule |
| noMisplacedAssertion | Checks that the assertion function, for example `expect`, is placed inside an `it()` function call. | JavaScript and super languages rule |
| noMisrefactoredShorthandAssign | Disallow shorthand assign when variable appears on both sides. | Recommended, Unsafe fix, JavaScript and super languages rule |
| noPrototypeBuiltins | Disallow direct use of `Object.prototype` builtins. | Recommended, Safe fix, JavaScript and super languages rule |
| noReactSpecificProps | Prevents React-specific JSX properties from being used. | Safe fix, JavaScript and super languages rule |
| noRedeclare | Disallow variable, function, class, and type redeclarations in the same scope. | Recommended, JavaScript and super languages rule |
| noRedundantUseStrict | Prevents from having redundant `"use strict"`. | Recommended, Safe fix, JavaScript and super languages rule |
| noSelfCompare | Disallow comparisons where both sides are exactly the same. | Recommended, JavaScript and super languages rule |
| noShadowRestrictedNames | Disallow identifiers from shadowing restricted names. | Recommended, JavaScript and super languages rule |
| noShorthandPropertyOverrides | Disallow shorthand properties that override related longhand properties. | Recommended, CSS rule |
| noSkippedTests | Disallow disabled tests. | Unsafe fix, JavaScript and super languages rule |
| noSparseArray | Disallow sparse arrays | Recommended, Unsafe fix, JavaScript and super languages rule |
| noSuspiciousSemicolonInJsx | It detects possible "wrong" semicolons inside JSX elements. | Recommended, JavaScript and super languages rule |
| noThenProperty | Disallow `then` property. | Recommended, JavaScript and super languages rule |
| noUnsafeDeclarationMerging | Disallow unsafe declaration merging between interfaces and classes. | Recommended, TypeScript rule |
| noUnsafeNegation | Disallow using unsafe negation. | Recommended, Unsafe fix, JavaScript and super languages rule |
| useAwait | Ensure `async` functions utilize `await`. | JavaScript and super languages rule |
| useDefaultSwitchClauseLast | Enforce default clauses in switch statements to be last | Recommended, JavaScript and super languages rule |
| useErrorMessage | Enforce passing a message value when creating a built-in error. | JavaScript and super languages rule |
| useGetterReturn | Enforce `get` methods to always return a value. | Recommended, JavaScript and super languages rule |
| useIsArray | Use `Array.isArray()` instead of `instanceof Array`. | Recommended, Unsafe fix, JavaScript and super languages rule |
| useNamespaceKeyword | Require using the `namespace` keyword over the `module` keyword to declare TypeScript namespaces. | Recommended, Safe fix, TypeScript rule |
| useNumberToFixedDigitsArgument | Enforce using the digits argument with `Number#toFixed()`. | Unsafe fix, JavaScript and super languages rule |
| useValidTypeof | This rule verifies the result of `typeof $expr` unary expressions is being compared to valid values, either string literals containing valid type names or other `typeof` expressions | Recommended, Unsafe fix, JavaScript and super languages rule |

## Recommended rules

The recommended rules are:

<RecommendedRules />

# noAccessKey

## Diagnostic Category: `lint/a11y/noAccessKey`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: jsx-a11y/no-access-key

Enforce that the `accessKey` attribute is not used on any HTML element.

The `accessKey` assigns a keyboard shortcut to the current element. However, the `accessKey` value
can conflict with keyboard commands used by screen readers and keyboard-only users, which leads to
inconsistent keyboard actions across applications. To avoid accessibility complications,
this rule suggests users remove the `accessKey` attribute on elements.

### Examples

#### Invalid

```jsx
<input type="submit" accessKey="s" value="Submit" />
```

```jsx
<a href="https://webaim.org/" accessKey="w">WebAIM.org</a>
```

```jsx
<button accessKey="n">Next</button>
```

### Resources

- WebAIM: Keyboard Accessibility - Accesskey
- MDN `accesskey` documentation

### Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noAccumulatingSpread

**Diagnostic Category: `lint/performance/noAccumulatingSpread`**

**Since**: `v1.0.0`

Disallow the use of spread (`...`) syntax on accumulators.

Spread syntax allows an iterable to be expanded into its individual elements.

Spread syntax should be avoided on accumulators (like those in `.reduce`) because it causes a time complexity of `O(n^2)` instead of `O(n)`.

Source: prateeksurana.me/blog/why-using-object-spread-with-reduce-bad-idea/

## Examples

### Invalid

```js
var a = ['a', 'b', 'c'];
a.reduce((acc, val) => [...acc, val], []);
```

```js
var a = ['a', 'b', 'c'];
a.reduce((acc, val) => {return [...acc, val];}, []);
```

```js
var a = ['a', 'b', 'c'];
a.reduce((acc, val) => ({...acc, [val]: val}), {});
```

### Valid

```js
var a = ['a', 'b', 'c'];
a.reduce((acc, val) => {acc.push(val); return acc}, []);
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noApproximativeNumericConstant

**Diagnostic Category: `lint/suspicious/noApproximativeNumericConstant`**

**Since**: `v1.3.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: `approx_constant`

Use standard constants instead of approximated literals.

Usually, the definition in the standard library is more precise than
what people come up with or the used constant exceeds the maximum precision of the number type.

## Examples

### Invalid

```javascript
let x = 3.141;
```

```javascript
let x = 2.302;
```

### Valid

```javascript
let x = Math.PI;
let y = 3.14;
```

```javascript
let x = Math.LN10;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noArguments
Disallow the use of `arguments`.

**Diagnostic Category: `lint/style/noArguments`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: prefer-rest-params

## Examples

### Invalid

```javascript
function f() {
   console.log(arguments);
}
```

code-block.js:2:16 lint/style/noArguments ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 ✖ Use the rest parameters instead of arguments.
 
  1 │ function f() {
 2 │   console.log(arguments);
  │               ^^^^^^^^^
 3 │ }
 
 ℹ arguments does not have Array.prototype methods and can be inconvenient to use.

### Valid

```javascript
function f() {
    let arguments = 1;
    console.log(arguments);
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noAriaHiddenOnFocusable

**Diagnostic Category: `lint/a11y/noAriaHiddenOnFocusable`**

**Since**: `v1.4.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: jsx-a11y/no-aria-hidden-on-focusable

Enforce that aria-hidden="true" is not set on focusable elements.

`aria-hidden="true"` can be used to hide purely decorative content from screen reader users.
A focusable element with `aria-hidden="true"` can be reached by keyboard.
This can lead to confusion or unexpected behavior for screen reader users.

## Example

### Invalid

```jsx
<div aria-hidden="true" tabIndex="0" />
```

```jsx
<a href="/" aria-hidden="true" />
```

### Valid

```jsx
<button aria-hidden="true" tabIndex="-1" />
```

```jsx
<button aria-hidden="true" tabIndex={-1} />
```

```jsx
<div aria-hidden="true"><a href="#"></a></div>
```

## Resources

- aria-hidden elements do not contain focusable elements
- Element with aria-hidden has no content in sequential focus navigation
- MDN aria-hidden

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noAriaUnsupportedElements

**Diagnostic Category: `lint/a11y/noAriaUnsupportedElements`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: jsx-a11y/aria-unsupported-elements

Enforce that elements that do not support ARIA roles, states, and properties do not have those attributes.

## Examples

### Invalid

```jsx
<meta charset="UTF-8" role="meta" />
```

```jsx
<html aria-required="true" />
```

### Valid

```jsx
<meta charset="UTF-8" />
```

```jsx
<html></html>
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noArrayIndexKey

## Diagnostic Category: `lint/suspicious/noArrayIndexKey`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

### Sources

- Same as: react/no-array-index-key

Discourage the usage of Array index in keys.

We don’t recommend using indexes for keys if the order of items may change.
This can negatively impact performance and may cause issues with component state.
Check out Robin Pokorny’s article for an in-depth explanation on the negative impacts of using an index as a key: https://robinpokorny.com/blog/index-as-a-key-is-an-anti-pattern/
If you choose not to assign an explicit key to list items then React will default to using indexes as keys.

Source: React documentation https://reactjs.org/docs/lists-and-keys.html#keys

## Examples

### Invalid

```jsx
something.forEach((Element, index) => {
    <Component key={index} >foo</Component>
});
```

```jsx
React.Children.map(this.props.children, (child, index) => (
    React.cloneElement(child, { key: index })
))
```

```jsx
something.forEach((Element, index) => {
    <Component key={`test-key-${index}`} >foo</Component>
});
```

```jsx
something.forEach((Element, index) => {
    <Component key={"test" + index} >foo</Component>
});
```

### Valid

```jsx
something.forEach((item) => {
    <Component key={item.id} >foo</Component>
});
```

```jsx
something.forEach((item) => {
    <Component key={item.baz.foo} >foo</Component>
});
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noAssignInExpressions

## Diagnostic Category: `lint/suspicious/noAssignInExpressions`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Inspired from: no-cond-assign

Disallow assignments in expressions.

In expressions, it is common to mistype a comparison operator (such as `==`) as an assignment operator (such as `=`).
Moreover, the use of assignments in expressions is confusing.
Indeed, expressions are often considered as side-effect free.

## Examples

### Invalid

```ts
let a, b;
a = (b = 1) + 1;
```

```text
code-block.ts:2:6 lint/suspicious/noAssignInExpressions 
 The assignment should not be in an expression.
  1 │ let a, b;
> 2 │ a = (b = 1) + 1;
  │     ^^^^
 3 │ 
 The use of assignments in expressions is confusing.
Expressions are often considered as side-effect free.
```

```ts
let a;
if (a = 1) {
}
```

```text
code-block.ts:2:5 lint/suspicious/noAssignInExpressions 
 The assignment should not be in an expression.
  1 │ let a;
> 2 │ if (a = 1) {
  │     ^^^
 3 │ }
 4 │ 
 The use of assignments in expressions is confusing.
Expressions are often considered as side-effect free.
```

```ts
function f(a) {
    return a = 1;
}
```

```text
code-block.ts:2:12 lint/suspicious/noAssignInExpressions 
 The assignment should not be in an expression.
  1 │ function f(a) {
> 2 │     return a = 1;
  │           ^^^
 3 │ }
 4 │ 
 The use of assignments in expressions is confusing.
Expressions are often considered as side-effect free.
```

### Valid

```ts
let a;
a = 1;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noAsyncPromiseExecutor

Disallows using an async function as a Promise executor.

**Diagnostic Category: `lint/suspicious/noAsyncPromiseExecutor`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `no-async-promise-executor`

The executor function can also be an async function. However, this is usually a mistake, for a few reasons:

1. If an async executor function throws an error, the error will be lost and won't cause the newly-constructed `Promise` to reject. This could make it difficult to debug and handle some errors.
2. If a Promise executor function is using `await`, this is usually a sign that it is not actually necessary to use the `new Promise` constructor, or the scope of the `new Promise` constructor can be reduced.

## Examples

### Invalid

```javascript
new Promise(async function foo(resolve, reject) {})
```

```javascript
new Promise(async (resolve, reject) => {})
```

```javascript
new Promise(((((async () => {})))))
```

### Valid

```javascript
new Promise((resolve, reject) => {})
new Promise((resolve, reject) => {}, async function unrelated() {})
new Foo(async (resolve, reject) => {})
new Foo((( (resolve, reject) => {} )))
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noAutofocus

**Diagnostic Category: `lint/a11y/noAutofocus`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: jsx-a11y/no-autofocus

Enforce that autoFocus prop is not used on elements.

Autofocusing elements can cause usability issues for sighted and non-sighted users, alike.

## Examples

### Invalid

```jsx
<input autoFocus />
```

```jsx
<input autoFocus="true" />
```

```jsx
<input autoFocus={"false"} />
```

```jsx
<input autoFocus={undefined} />
```

### Valid

```jsx
<input />
```

```jsx
<div />
```

```jsx
<button />
```

```jsx
// `autoFocus` prop in user created component is valid
<MyComponent autoFocus={true} />
```

## Resources

- WHATWG HTML Standard, The autofocus attribute
- The accessibility of HTML 5 autofocus

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noBannedTypes

Disallow primitive type aliases and misleading types.

## Diagnostic Category: `lint/complexity/noBannedTypes`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has a **safe** fix.

Sources: 
- Same as: `@typescript-eslint/ban-types`

Disallow primitive type aliases and misleading types.

### Enforce consistent names for primitive types

Primitive types have aliases.
For example, `Number` is an alias of `number`.
The rule recommends the lowercase primitive type names.

### Disallow the `Function` type

The `Function` type is loosely typed and is thus considered dangerous or harmful.
`Function` is equivalent to the type `(...rest: any[]) => any` that uses the unsafe `any` type.

### Disallow the misleading non-nullable type `{}`

In TypeScript, the type `{}` doesn't represent an empty object.
It represents any value except `null` and `undefined`.
The following TypeScript example is perfectly valid:

```ts
const n: {} = 0
```

To represent an empty object, you should use `{ [k: string]: never }` or `Record<string, never>`.

To avoid any confusion, the rule forbids the use of the type `{}`, except in two situations:

1. In type constraints to restrict a generic type to non-nullable types:

```ts
function f<T extends {}>(x: T) {
    assert(x != null);
}
```

2. In a type intersection to narrow a type to its non-nullable equivalent type:

```ts
type NonNullableMyType = MyType & {};
```

In this last case, you can also use the `NonNullable` utility type:

```ts
type NonNullableMyType = NonNullable<MyType>;
```

## Examples

### Invalid

```ts
let foo: String = "bar";
```

```ts
let bool = true as Boolean;
```

```ts
let invalidTuple: [string, Boolean] = ["foo", false];
```

### Valid

```ts
let foo: string = "bar";
```

```ts
let tuple: [boolean, string] = [false, "foo"];
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noBarrelFile

## Diagnostic Category: `lint/performance/noBarrelFile`

**Since**: `v1.6.0`

Sources: 
- Inspired from: barrel-files/avoid-barrel-files

Disallow the use of barrel file.

A barrel file is a file that re-exports all of the exports from other files in a directory.
This structure results in the unnecessary loading of many modules, significantly impacting performance in large-scale applications.
Additionally, it complicates the codebase, making it difficult to navigate and understand the project's dependency graph.
This rule ignores .d.ts files and type-only exports.

For a more detailed explanation, check out https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-7/

## Examples

### Invalid

```js
export * from "foo";
export * from "bar";
```

```js
export { foo } from "foo";
export { bar } from "bar";
```

```js
export { default as module1 } from "./module1";
```

### Valid

```ts
export type * from "foo";
export type { foo } from "foo";
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noBlankTarget

Disallow `target="_blank"` attribute without `rel="noreferrer"`

## Diagnostic Category: `lint/a11y/noBlankTarget`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has a **safe** fix.

Sources: 
- Same as: react/jsx-no-target-blank

When creating anchor `a` element, there are times when its link has to be opened in a new browser tab
via `target="_blank"` attribute. This attribute has to paired with `rel="noreferrer"` or you're incur
in a security issue.

Refer to the noreferrer documentation and the noopener documentation

## Examples

### Invalid

```jsx
<a href='http://external.link' target='_blank'>child</a>
```

```jsx
<a href='http://external.link' target='_blank' rel="noopener">child</a>
```

```jsx
<a {...props} href='http://external.link' target='_blank' rel="noopener">child</a>
```

### Valid

```jsx
<a href='http://external.link' rel='noreferrer' target='_blank'>child</a>
```

```jsx
<a href='http://external.link' target='_blank' rel="noopener" {...props}>child</a>
```

## Options

The option `allowDomains` allows specific domains to use `target="_blank"` without `rel="noreferrer"`.
In the following configuration, it's allowed to use the domains `https://example.com` and `example.org`:

```json
{
    "//": "...",
    "options": {
        "allowDomains": ["https://example.com", "example.org"]
    }
}
```

```jsx
<>
  <a target="_blank" href="https://example.com"></a>
  <a target="_blank" href="example.org"></a>
</>
```

Biome doesn't check if the list contains valid URLs.

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noCatchAssign
Disallow reassigning exceptions in catch clauses.

## Diagnostic Category
lint/suspicious/noCatchAssign

## Since
v1.0.0

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

## Sources
- Same as: no-ex-assign

Assignment to a `catch` parameter can be misleading and confusing. It is often unintended and indicative of a programmer error.

## Examples

### Invalid

```javascript
try {
} catch (e) {
  e;
  e = 10;
}
```

### Error Message
lint/suspicious/noCatchAssign
Reassigning a catch parameter is confusing.
The catch parameter is declared here:
Use a local variable instead.

### Valid

```javascript
try {
} catch (e) {
  let e = 10;
  e = 100;
}
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options

# noChildrenProp

Prevent passing of children as props.

## Diagnostic Category: `lint/correctness/noChildrenProp`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: react/no-children-prop

Prevent passing of **children** as props.

When using JSX, the children should be nested between the opening and closing tags.
When not using JSX, the children should be passed as additional arguments to `React.createElement`.

## Examples

### Invalid

```jsx
<FirstComponent children={'foo'} />
```

```text
code-block.jsx:1:17 lint/correctness/noChildrenProp ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✖ Avoid passing children using a prop
  1 │ <FirstComponent children={'foo'} />
    │                ^^^^^^^^^^^^^^^
  ℹ The canonical way to pass children in React is to use JSX elements
```

```js
React.createElement('div', { children: 'foo' });
```

```text
code-block.js:1:30 lint/correctness/noChildrenProp ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✖ Avoid passing children using a prop
  1 │ React.createElement('div', { children: 'foo' });
    │                             ^^^^^^^^^^^^^^^
  ℹ The canonical way to pass children in React is to use additional arguments to React.createElement
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noClassAssign
Disallow reassigning class members.

## Diagnostic Category
lint/suspicious/noClassAssign

## Since
v1.0.0

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

## Sources
- Same as: no-class-assign

## Description
A class declaration creates a variable that we can modify, however, the modification is a mistake in most cases.

## Examples

### Invalid

```javascript
class A {}
A = 0;
```

```javascript
A = 0;
class A {}
```

```javascript
class A {
	b() {
		A = 0;
	}
}
```

```javascript
let A = class A {
	b() {
		A = 0;
		// `let A` is shadowed by the class name.
	}
}
```

### Valid

```javascript
let A = class A {}
A = 0; // A is a variable.
```

```javascript
let A = class {
    b() {
        A = 0; // A is a variable.
    }
}
```

```javascript
class A {
	b(A) {
		A = 0; // A is a parameter.
	}
}
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options

# noCommaOperator

Disallow comma operator.

## Diagnostic Category: `lint/style/noCommaOperator`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: no-sequences

The comma operator includes multiple expressions where only one is expected.
It evaluates every operand from left to right and returns the value of the last operand.
It frequently obscures side effects, and its use is often an accident.

The use of the comma operator in the initialization and update parts of a `for` is still allowed.

## Examples

### Invalid

```js
const foo = (doSomething(), 0);
```

```js
for (; doSomething(), !!test; ) {}
```

```js
// Use a semicolon instead.
let a, b;
a = 1, b = 2;
```

### Valid

```js
for(a = 0, b = 0; (a + b) < 10; a++, b += 2) {}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noCommentText

**Diagnostic Category: `lint/suspicious/noCommentText`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: react/jsx-no-comment-textnodes

Prevent comments from being inserted as text nodes

## Examples

### Invalid

```jsx
<div>// comment</div>;
```

```jsx
<div>/* comment */</div>;
```

```jsx
<div>/** comment */</div>;
```

```jsx
<div>text /* comment */</div>;
```

```jsx
<div>/* comment */ text</div>;
```

```jsx
<div>
    text
    // comment
</div>;
```

```jsx
<div>
    // comment
   text
</div>;
```

```jsx
<div>
    /* comment */
    text
</div>;
```

### Valid

```jsx
<>
   <div>{/* comment */}</div>;
   <div>{/** comment */}</div>;
   <div className={"cls" /* comment */}></div>;
   <div>text {/* comment */}</div>;
   <div>{/* comment */} text</div>;
</>
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noCommonJs
Disallow use of CommonJs module system in favor of ESM style imports.

**Diagnostic Category: `lint/nursery/noCommonJs`**

**Since**: `v1.9.0`

This rule is part of the nursery group.

Sources: 
- Same as: @typescript-eslint/no-require-imports
- Same as: import/no-commonjs

Disallow use of CommonJs module system in favor of ESM style imports.

ESM-style `import`s are modern alternative to CommonJS `require` imports. Supported by all modern browsers and Node.js versions.
Tooling can more easily statically analyze and tree-shake ESM `import`s compared to CommonJs.

## Examples

### Invalid

```js
require('node:fs');
```

```js
module.exports = { a: 'b' }
```

```js
exports.a = 'b';
```

### Valid

```js
import fs from 'node:fs';
```

```js
import('node:fs')
```

```js
export const a = 'b';
```

```js
export default { a: 'b' };
```

## Caveats

Rule is automatically disabled inside `.cjs` and `.cts` files, because they are explicitly CommonJs files.

This rule could be helpful if you are migrating from CommonJs to ESM,
but if you wish to continue using CommonJs, you can safely disable it.

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noCompareNegZero
Disallow comparing against `-0`

## Diagnostic Category
`lint/suspicious/noCompareNegZero`

## Since
`v1.0.0`

### Note
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

### Sources
- Same as: `no-compare-neg-zero`

## Examples

### Invalid
```js
(1 >= -0)
```

### Error Message
Do not use the >= operator to compare against -0.

### Safe Fix
Replace -0 with 0

### Valid
```js
(1 >= 0)
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options

# noConfusingLabels

Disallow labeled statements that are not loops.

## Diagnostic Category
lint/suspicious/noConfusingLabels

## Since
v1.0.0

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

## Sources
- Inspired from: no-labels

Labeled statements in JavaScript are used in conjunction with `break` and `continue` to control flow around multiple loops. Their use for other statements is suspicious and unfamiliar.

The rule ignores reactive Svelte statements in Svelte components.

## Examples

### Invalid

```js
label: f();
```

```js
label: {
    f();
    break label;
}
```

```js
label: if (a) {
    f()
    break label;
}
```

```js
label: switch (a) {
    case 0:
        break label;
}
```

### Valid

```js
outer: while (a) {
    while(b) {
        break outer;
    }
}
```

```svelte
<script>
$: { /* reactive block */ }
</script>
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options

# noConfusingVoidType

Disallow `void` type outside of generic or return types.

## Diagnostic Category: `lint/suspicious/noConfusingVoidType`

### Since: `v1.2.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: `@typescript-eslint/no-invalid-void-type`

`void` in TypeScript refers to a function return that is meant to be ignored.
Attempting to use a void type outside of a return type or a type parameter is often a sign of programmer error.
`void` can also be misleading for other developers even if used correctly.

The `void` type means cannot be mixed with any other types, other than `never`, which accepts all types.
If you think you need this then you probably want the `undefined` type instead.

The code action suggests using `undefined` instead of `void`.
It is unsafe because a variable with the `void` type cannot be assigned to a variable with the `undefined` type.

## Examples

### Invalid

```ts
let foo: void;
```

```ts
function logSomething(thing: void) {}
```

```ts
interface Interface {
    prop: void;
}
```

```ts
type PossibleValues = number | void;
```

### Valid

```ts
function foo(): void {};
```

```ts
function doSomething(this: void) {}
```

```ts
function printArg<T = void>(arg: T) {}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noConsoleLog

Disallow the use of `console.log`

**Diagnostic Category: `lint/suspicious/noConsoleLog`**

This rule is deprecated and will be removed in the next major release.
**Reason**: Use the rule noConsole instead.
**Since**: `v1.0.0`

This rule has an **unsafe** fix.

Disallow the use of `console.log`

## Examples

### Invalid

```js
console.log()
```

code-block.js:1:1 lint/suspicious/noConsoleLog  FIXABLE 
 Don't use console.log 
 1 │ console.log()
   │ ^^^^^^^^^^^
 console.log is usually a tool for debugging and you don't want to have that in production.
 If it is not for debugging purpose then using console.info might be more appropriate.
 Unsafe fix: Remove console.log
 1 │ console.log()

### Valid

```js
console.info("info");
console.warn("warn");
console.error("error");
console.assert(true);
console.table(["foo", "bar"]);
const console = { log() {} };
console.log();
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noConsole

Disallow the use of `console`.

## Diagnostic Category
lint/suspicious/noConsole

## Since
v1.6.0

### Note
- This rule has an **unsafe** fix.

## Sources
- Same as: no-console

## Description
In a browser environment, it’s considered a best practice to log messages using `console`.
Such messages are considered to be for debugging purposes and therefore not suitable to ship to the client.
In general, calls using `console` should be stripped before being pushed to production.

## Examples

### Invalid
```js
console.error('hello world')
```

## Error Message
```
code-block.js:1:1 lint/suspicious/noConsole  FIXABLE 
 Don't use console.
 
 1 │ console.error('hello world')
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^
 
 The use of console is often reserved for debugging.
 
 Unsafe fix: Remove console.
 
  1 │ console.error('hello world')
   │ -console.error('hello world')
```

## Options
Use the options to specify the allowed `console` methods.

```json
{
  "options": {
    "allow": ["assert", "error", "info", "warn"]
  }
}
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options

# noConstAssign

**Diagnostic Category: `lint/correctness/noConstAssign`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: no-const-assign

Prevents from having `const` variables being re-assigned.

Trying to assign a value to a `const` will cause an `TypeError` when the code is executed.

## Examples

### Invalid

```js
const a = 1;
a = 4;
```

```js
const a = 2;
a += 1;
```

```js
const a = 1;
++a;
```

```js
const a = 1, b = 2;

a = 2;
```

### Valid

```js
const a = 10;
let b = 10;
b = 20;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noConstEnum

Disallow TypeScript `const enum`

Const enums are enums that should be inlined at use sites.
Const enums are not supported by bundlers and are incompatible with the `isolatedModules` mode.
Their use can lead to import nonexistent values (because const enums are erased).

Thus, library authors and bundler users should not use const enums.

## Examples

### Invalid

```ts
const enum Status {
  Open,
  Close,
}
```

### Error Message

lint/suspicious/noConstEnum 
 FIXABLE 
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 ✖ The enum declaration should not be const
  1 │ const enum Status {
   │               ^
  ℹ Const enums are not supported by bundlers and are incompatible with the 'isolatedModules' mode. Their use can lead to import inexistent values.
  ℹ See TypeScript Docs for more details.
  ℹ Safe fix: Turn the const enum into a regular enum.

### Valid

```ts
enum Status {
  Open,
  Close,
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noConstantCondition
Disallow constant expressions in conditions

**Diagnostic Category: `lint/correctness/noConstantCondition`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: no-constant-condition

## Examples

### Invalid

```js
if (false) {
    doSomethingUnfinished();
}
```

```text
code-block.js:1:5 lint/correctness/noConstantCondition ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✖ Unexpected constant condition.
  1 │ if (false) {
  │     ^
  2 │     doSomethingUnfinished();
  3 │ }
```

```js
if (Boolean(1)) {
    doSomethingAlways();
}
```

```text
code-block.js:1:5 lint/correctness/noConstantCondition ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✖ Unexpected constant condition.
  1 │ if (Boolean(1)) {
  │     ^^^^^^^^^^^
  2 │     doSomethingAlways();
  3 │ }
```

```js
if (undefined) {
    doSomethingUnfinished();
}
```

```text
code-block.js:1:5 lint/correctness/noConstantCondition ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✖ Unexpected constant condition.
  1 │ if (undefined) {
  │     ^
  2 │     doSomethingUnfinished();
  3 │ }
```

```js
for (;-2;) {
    doSomethingForever();
}
```

```text
code-block.js:1:7 lint/correctness/noConstantCondition ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✖ Unexpected constant condition.
  1 │ for (;-2;) {
  │       ^
  2 │     doSomethingForever();
  3 │ }
```

```js
while (typeof x) {
    doSomethingForever();
}
```

```text
code-block.js:1:8 lint/correctness/noConstantCondition ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✖ Unexpected constant condition.
  1 │ while (typeof x) {
  │        ^
  2 │     doSomethingForever();
  3 │ }
```

```js
var result = 0 ? a : b;
```

```text
code-block.js:1:14 lint/correctness/noConstantCondition ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✖ Unexpected constant condition.
  1 │ var result = 0 ? a : b;
  │              ^
  2 │
```

### Valid

```js
if (x === 0) {
    doSomething();
}

for (;;) {
    doSomethingForever();
}

while (typeof x === "undefined") {
    doSomething();
}

do {
    doSomething();
} while (x);

var result = x !== 0 ? a : b;

// Exception
while (true) {
    if (x) { break; }
    x = f();
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noConstantMathMinMaxClamp

Disallow the use of `Math.min` and `Math.max` to clamp a value where the result itself is constant.

## Diagnostic Category
lint/correctness/noConstantMathMinMaxClamp

## Since
v1.7.0

## Note
- This rule has an **unsafe** fix.

## Sources
- Same as: min_max

## Examples

### Invalid

```js
Math.min(0, Math.max(100, x));
```

```js
Math.max(100, Math.min(0, x));
```

### Valid

```js
Math.min(100, Math.max(0, x));
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options

# noConstructorReturn

Disallow returning a value from a `constructor`.

## Diagnostic Category: `lint/correctness/noConstructorReturn`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: no-constructor-return

Returning a value from a `constructor` of a class is a possible error.
Forbidding this pattern prevents errors resulting from unfamiliarity with JavaScript or a copy-paste error.

Only returning without a value is allowed, as it’s a control flow statement.

## Examples

### Invalid

```js
class A {
    constructor() {
        return 0;
    }
}
```

### Valid

```js
class A {
    constructor() {}
}
```

```js
class B {
    constructor(x) {
        return;
    }
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noControlCharactersInRegex

**Diagnostic Category: `lint/suspicious/noControlCharactersInRegex`**

**Since**: `v1.0.0`

:::note
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
:::

Sources: 
- Same as: no-control-regex

Prevents from having control characters and some escape sequences that match control characters in regular expressions.

Control characters are hidden special characters that are numbered from 0 to 31 in the ASCII system.
They're not commonly used in JavaScript text. So, if you see them in a pattern (called a regular expression), it's probably a mistake.

The following elements of regular expression patterns are considered possible errors in typing and are therefore disallowed by this rule:

- Hexadecimal character escapes from `\x00` to `\x1F`
- Unicode character escapes from `\u0000` to `\u001F`
- Unicode code point escapes from `\u{0}` to `\u{1F}`
- Unescaped raw characters from U+0000 to U+001F

Control escapes such as `\t` and `\n` are allowed by this rule.

## Examples

### Invalid

```js
var pattern1 = /\x00/;
```

```text
code-block.js:1:18 lint/suspicious/noControlCharactersInRegex 
 Unexpected control character in a regular expression.
 1 │  var pattern1 = /\x00/;
   │                 ^^^^
 2 │ 
 Control characters are unusual and potentially incorrect inputs, so they are disallowed.
```

```js
var pattern2 = /\x0C/;
```

```text
code-block.js:1:18 lint/suspicious/noControlCharactersInRegex 
 Unexpected control character in a regular expression.
 1 │  var pattern2 = /\x0C/;
   │                 ^^^^
 2 │ 
 Control characters are unusual and potentially incorrect inputs, so they are disallowed.
```

```js
var pattern3 = /\x1F/;
```

```text
code-block.js:1:18 lint/suspicious/noControlCharactersInRegex 
 Unexpected control character in a regular expression.
 1 │  var pattern3 = /\x1F/;
   │                 ^^^^
 2 │ 
 Control characters are unusual and potentially incorrect inputs, so they are disallowed.
```

```js
var pattern4 = /\u000C/;
```

```text
code-block.js:1:18 lint/suspicious/noControlCharactersInRegex 
 Unexpected control character in a regular expression.
 1 │  var pattern4 = /\u000C/;
   │                 ^^^^^^
 2 │ 
 Control characters are unusual and potentially incorrect inputs, so they are disallowed.
```

```js
var pattern5 = /\u{C}/u;
```

```text
code-block.js:1:18 lint/suspicious/noControlCharactersInRegex 
 Unexpected control character in a regular expression.
 1 │  var pattern5 = /\u{C}/u;
   │                 ^^^^^
 2 │ 
 Control characters are unusual and potentially incorrect inputs, so they are disallowed.
```

```js
var pattern7 = new RegExp("\x0C");
```

```text
code-block.js:1:29 lint/suspicious/noControlCharactersInRegex 
 Unexpected control character in a regular expression.
 1 │  var pattern7 = new RegExp("\x0C");
   │                            ^^^^
 2 │ 
 Control characters are unusual and potentially incorrect inputs, so they are disallowed.
```

```js
var pattern7 = new RegExp("\\x0C");
```

```text
code-block.js:1:29 lint/suspicious/noControlCharactersInRegex 
 Unexpected control character in a regular expression.
 1 │  var pattern7 = new RegExp("\\x0C");
   │                            ^^^^^
 2 │ 
 Control characters are unusual and potentially incorrect inputs, so they are disallowed.
```

### Valid

```js
var pattern1 = /\x20/;
var pattern2 = /\u0020/;
var pattern3 = /\u{20}/u;
var pattern4 = /\t/;
var pattern5 = /\n/;
var pattern6 = new RegExp("\x20");
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noDangerouslySetInnerHtmlWithChildren

**Diagnostic Category: `lint/security/noDangerouslySetInnerHtmlWithChildren`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: react/no-danger-with-children

Report when a DOM element or a component uses both `children` and `dangerouslySetInnerHTML` prop.

## Examples

### Invalid

```jsx
function createMarkup() {
    return { __html: 'child' }
}
<Component dangerouslySetInnerHTML={createMarkup()}>"child1"</Component>
```

```jsx
function createMarkup() {
    return { __html: 'child' }
}
<Component dangerouslySetInnerHTML={createMarkup()} children="child1" />
```

```js
React.createElement('div', { dangerouslySetInnerHTML: { __html: 'HTML' } }, 'children')
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noDangerouslySetInnerHtml

**Diagnostic Category: `lint/security/noDangerouslySetInnerHtml`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: react/no-danger

Prevent the usage of dangerous JSX props

## Examples

### Invalid

```jsx
function createMarkup() {
    return { __html: 'child' }
}
<div dangerouslySetInnerHTML={createMarkup()}></div>
```

```js
React.createElement('div', {
    dangerouslySetInnerHTML: { __html: 'child' }
});
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noDebugger

Disallow the use of `debugger`

## Diagnostic Category: `lint/suspicious/noDebugger`

### JavaScript (and super languages)

**Since**: `v1.0.0`

* This rule is recommended by Biome. A diagnostic error will appear when linting your code.
* This rule has an **unsafe** fix.

Sources: 
- Same as: `no-debugger` eslint.org/docs/latest/rules/no-debugger

## Examples

### Invalid

```js
debugger;
```

```
code-block.js:1:1 lint/suspicious/noDebugger  FIXABLE 
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 ✖ This is an unexpected use of the debugger statement.
 
> 1 │ debugger;
 │ ^^^^^^^^^
 
 ℹ Unsafe fix: Remove debugger statement
 1 │ debugger;
 │ - - - - - - - - - - -
```

### Valid

```js
const test = { debugger: 1 };
test.debugger;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noDefaultExport

Disallow default exports.

## Diagnostic Category: `lint/style/noDefaultExport`

### Since: `v1.4.0`

Sources: 
- Same as: import/no-default-export

Disallow default exports.

Default exports cannot be easily discovered inside an editor:
They cannot be suggested by the editor when the user tries to import a name.

Also, default exports don't encourage consistency over a code base:
the module that imports the default export must choose a name.
It is likely that different modules use different names.

Moreover, default exports encourage exporting an object that acts as a namespace.
This is a legacy pattern used to mimic CommonJS modules.

For all these reasons, a team may want to disallow default exports.

Note that this rule disallows only default exports in EcmaScript Module.
It ignores CommonJS default exports.

## Examples

### Invalid

```js
export default function f() {};
```

```js
export default class C {};
```

```js
export default {
    f() {},
    g() {},
};
```

```js
export { X as default };
```

### Valid

```js
export function f () {};
export class C {};
export { default as X } from "mod";
```

```cjs
module.exports = class {};
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noDelete

Disallow the use of the `delete` operator.

## Diagnostic Category: `lint/performance/noDelete`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

The `delete` operator enables the removal of a property from an object.

The `delete` operator should be avoided because it [can prevent some optimizations of _JavaScript_ engines](https://webkit.org/blog/10298/inline-caching-delete/).
Moreover, it can lead to unexpected results.
For instance, deleting an array element [does not change the length of the array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete#deleting_array_elements).

The only legitimate use of `delete` is on an object that behaves like a _map_.
To allow this pattern, this rule does not report `delete` on computed properties that are not literal values.
Consider using [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) instead of an object.

## Examples

### Invalid

```js
const arr = [1, 2, 3];
delete arr[0];
```

```js
const obj = {a: {b: {c: 123}}};
delete obj.a.b.c;
```

### Valid

```js
const foo = new Set([1,2,3]);
foo.delete(1);
```

```js
const map = Object.create(null);
const key = "key"
map[key] = "value"
delete map[key];
```

```js
let x = 5;
delete f(); // uncovered by this rule.
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noDescendingSpecificity

Disallow a lower specificity selector from coming after a higher specificity selector.

## Diagnostic Category: `lint/nursery/noDescendingSpecificity`

### Since: `v1.9.3`

This rule is part of the nursery group.

Sources: 
- Same as: stylelint/no-descending-specificity

Disallow a lower specificity selector from coming after a higher specificity selector.

This rule prohibits placing selectors with lower specificity after selectors with higher specificity.
By maintaining the order of the source and specificity as consistently as possible, it enhances readability.

## Examples

### Invalid

```css
b a { color: red; }
a { color: red; }
```

```css
a {
  & > b { color: red; }
}
b { color: red; }
```

```css
:root input {
    color: red;
}
html input {
    color: red;
}
```

### Valid

```css
a { color: red; }
b a { color: red; }
```

```css
b { color: red; }
a {
  & > b { color: red; }
}
```

```css
a:hover { color: red; }
a { color: red; }
```

```css
a b {
    color: red;
}
/* This selector is overwritten by the one above it, but this is not an error because the rule only evaluates it as a compound selector */
:where(a) :is(b) {
    color: blue;
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noDistractingElements

## Diagnostic Category: `lint/a11y/noDistractingElements`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: jsx-a11y/no-distracting-elements

Enforces that no distracting elements are used.

Elements that can be visually distracting can cause accessibility issues with visually impaired users.
Such elements are most likely deprecated, and should be avoided.
By default, the following elements are visually distracting: `<marquee>` and `<blink>`.

## Examples

### Invalid

```jsx
<marquee />
```

```jsx
<blink />
```

### Valid

```jsx
<div />
```

## Accessibility guidelines

- WCAG 2.2.2

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noDocumentCookie
Disallow direct assignments to `document.cookie`.

## Diagnostic Category
`lint/nursery/noDocumentCookie`

## Since
`v1.9.4`

This rule is part of the nursery group.

## Sources
- Same as: unicorn/no-document-cookie
- https://developer.mozilla.org/en-US/docs/Web/API/CookieStore

## Description
Disallow direct assignments to `document.cookie`.

It's not recommended to use document.cookie directly as it's easy to get the string wrong.
Instead, you should use the Cookie Store API.

## Examples

### Invalid

```javascript
document.cookie = "foo=bar";
```

```javascript
document.cookie += "; foo=bar";
```

### Valid

```javascript
const array = document.cookie.split("; ");
```

```javascript
await cookieStore
  .set({
    name: "foo",
    value: "bar",
    expires: Date.now() + 24 * 60 * 60,
    domain: "example.com",
})
```

```javascript
import Cookies from 'js-cookie';

Cookies.set('foo', 'bar');
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options

# noDocumentImportInPage

**Diagnostic Category: lint/nursery/noDocumentImportInPage**

## Overview

Prevents importing `next/document` outside of `pages/_document.jsx` in Next.js projects.

## Details

The `next/document` module is intended for customizing the document structure globally in Next.js. Importing it outside of `pages/_document.js` can cause unexpected behavior and break certain features of the framework.

## Sources

- Same as: @next/no-document-import-in-page

## Examples

### Valid

```jsx
import { Document, Html } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        {/* */}
      </Html>
    )
  }
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noDoneCallback

Disallow using a callback in asynchronous tests and hooks.

## Diagnostic Category: `lint/style/noDoneCallback`

### Since: `v1.6.1`

Sources: 
- Same as: jest/no-done-callback

Disallow using a callback in asynchronous tests and hooks.

This rule checks the function parameter of hooks and tests for use of the `done` argument, suggesting you return a promise instead.

## Examples

### Invalid

```js
beforeEach((done) => {
    // ...
});
```

```text
code-block.js:1:13 lint/style/noDoneCallback ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 ⚠ Disallow using a callback in asynchronous tests and hooks.
 
 1 │ beforeEach((done) => { 
 │            ^^^^
 2 │     // ...
 3 │ });
 
 ℹ Return a Promise instead of relying on callback parameter.
```

```js
test('tets-name', (done) => {
    // ...
});
```

```text
code-block.js:1:20 lint/style/noDoneCallback ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 ⚠ Disallow using a callback in asynchronous tests and hooks.
 
 1 │ test('tets-name', (done) => { 
 │                   ^^^^
 2 │     // ...
 3 │ });
 
 ℹ Return a Promise instead of relying on callback parameter.
```

### Valid

```js
beforeEach(async () => {
    // ...
});
```

```js
test('test-name', () => {
    expect(myFunction()).toBeTruthy();
});
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noDoubleEquals

Require the use of `===` and `!==`.

## Diagnostic Category: `lint/suspicious/noDoubleEquals`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: eqeqeq

Require the use of `===` and `!==`.

It is generally bad practice to use `==` for comparison instead of
`===`. Double operators will trigger implicit type coercion
and are thus not preferred. Using strict equality operators is almost
always best practice.

For ergonomic reasons, this rule makes by default an exception for `== null` for
comparing to both `null` and `undefined`.

## Examples

### Invalid

```js
foo == bar
```

### Valid

```js
foo == null
```

```js
foo != null
```

```js
null == foo
```

```js
null != foo
```

## Options

The rule provides the option described below.

```json
{
    "//":"...",
    "options": {
        "ignoreNull": true
    }
}
```

### ignoreNull

When this option is set to `true`, an exception will be made for checking against `null`,
as relying on the double equals operator to compare with `null` is frequently used to check
equality with either `null` or `undefined`.

When the option is set to `false`, all double equal operators will be forbidden without
exceptions.

Default: `true`

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noDuplicateAtImportRules

Disallow duplicate `@import` rules.

## Diagnostic Category
lint/suspicious/noDuplicateAtImportRules

## Since
v1.8.0

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

## Sources
- Same as: stylelint/no-duplicate-at-import-rules

This rule checks if the file urls of the @import rules are duplicates.

This rule also checks the imported media queries and alerts of duplicates.

## Examples

### Invalid

```css
@import 'a.css';
@import 'a.css';
```

```css
@import "a.css";
@import 'a.css';
```

```css
@import url('a.css');
@import url('a.css');
```

### Valid

```css
@import 'a.css';
@import 'b.css';
```

```css
@import url('a.css') tv;
@import url('a.css') projection;
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options

# noDuplicateCase

Disallow duplicate case labels.

If a switch statement has duplicate test expressions in case clauses, it is likely that a programmer copied a case clause but forgot to change the test expression.

## Diagnostic Category
lint/suspicious/noDuplicateCase

## Since
v1.0.0

## Sources
- Same as: no-duplicate-case

## Examples

### Invalid

```javascript
switch (a) {
    case 1:
        break;
    case 1:
        break;
    default:
        break;
}
```

```javascript
switch (a) {
    case one:
        break;
    case one:
        break;
    default:
        break;
}
```

```javascript
switch (a) {
    case "1":
        break;
    case "1":
        break;
    default:
        break;
}
```

### Valid

```javascript
switch (a) {
    case 1:
        break;
    case 2:
        break;
    default:
        break;
}
```

```javascript
switch (a) {
    case one:
        break;
    case two:
        break;
    default:
        break;
}
```

```javascript
switch (a) {
    case "1":
        break;
    case "2":
        break;
    default:
        break;
}
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options

# noDuplicateClassMembers

Disallow duplicate class members.

If there are declarations of the same name among class members,
the last declaration overwrites other declarations silently.
It can cause unexpected behaviours.

## Diagnostic Category
lint/suspicious/noDuplicateClassMembers

## Since
v1.0.0

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

## Sources
- Same as: no-dupe-class-members
- Same as: @typescript-eslint/no-dupe-class-members

## Examples

### Invalid

```js
class Foo {
  bar() { }
  bar() { }
}
```

```js
class Foo {
  bar() { }
  get bar() { }
}
```

```js
class Foo {
  bar;
  bar() { }
}
```

```js
class Foo {
  static bar() { }
  static bar() { }
}
```

### Valid

```js
class Foo {
  bar() { }
  qux() { }
}
```

```js
class Foo {
  set bar(value) { }
  get bar() { }
}
```

```js
class Foo {
  bar;
  qux;
}
```

```js
class Foo {
  bar;
  qux() { }
}
```

```js
class Foo {
  static bar() { }
  bar() { }
}
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options

# noDuplicateCustomProperties

Disallow duplicate custom properties within declaration blocks.

## Diagnostic Category
lint/nursery/noDuplicateCustomProperties

## Since
v1.9.0

This rule is part of the nursery group.

## Sources
- Same as: stylelint/declaration-block-no-duplicate-custom-properties

## Description
Disallow duplicate custom properties within declaration blocks.

This rule checks the declaration blocks for duplicate custom properties.

## Examples

### Invalid

```css
a { --custom-property: pink; --custom-property: orange;  }
```

```css
a { --custom-property: pink; background: orange; --custom-property: orange }
```

### Valid

```css
a { --custom-property: pink; }
```

```css
a { --custom-property: pink; --cUstOm-prOpErtY: orange; }
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options

# noDuplicateElseIf
Disallow duplicate conditions in if-else-if chains

**Diagnostic Category: lint/nursery/noDuplicateElseIf**

**Since:** v1.6.2

This rule is part of the nursery group.

Sources: 
- Same as: no-dupe-else-if

Disallow duplicate conditions in if-else-if chains

if-else-if chains are commonly used when there is a need to execute only one branch (or at most one branch) out of several possible branches, based on certain conditions.

Two identical test conditions in the same chain are almost always a mistake in the code. Unless there are side effects in the expressions, a duplicate will evaluate to the same true or false value as the identical expression earlier in the chain, meaning that its branch can never execute.

Please note that this rule does not compare conditions from the chain with conditions inside statements.

## Examples

### Invalid

```javascript
if (a) {
    foo();
} else if (b) {
    bar();
} else if (b) {
    baz();
}
```

This branch can never execute. Its condition is a duplicate or covered by previous conditions in the if-else-if chain.

### Valid

```javascript
if (a) {
    foo();
} else if (b) {
    bar();
} else if (c) {
    baz();
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noDuplicateFontNames

Disallow duplicate names within font families.

## Diagnostic Category: `lint/suspicious/noDuplicateFontNames`

### Since: `v1.8.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: stylelint/font-family-no-duplicate-names

This rule checks the `font` and `font-family` properties for duplicate font names.

This rule ignores var(--custom-property) variable syntaxes now.

## Examples

### Invalid

```css
a { font-family: "Lucida Grande", 'Arial', sans-serif, sans-serif; }
```

```css
a { font-family: 'Arial', "Lucida Grande", Arial, sans-serif; }
```

```css
a { FONT: italic 300 16px/30px Arial, " Arial", serif; }
```

### Valid

```css
a { font-family: "Lucida Grande", "Arial", sans-serif; }
```

```css
b { font: normal 14px/32px -apple-system, BlinkMacSystemFont, sans-serif; }
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noDuplicateJsxProps

Prevents JSX properties to be assigned multiple times.

**Diagnostic Category: `lint/suspicious/noDuplicateJsxProps`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: react/jsx-no-duplicate-props

## Examples

### Invalid

```jsx
<Hello name="John" name="John" />
```

```jsx
<label xml:lang="en-US" xml:lang="en-US"></label>
```

### Valid

```jsx
<Hello firstname="John" lastname="Doe" />
```

```jsx
<label xml:lang="en-US" lang="en-US"></label>
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noDuplicateObjectKeys

Disallow two keys with the same name inside objects.

## Diagnostic Category: `lint/suspicious/noDuplicateObjectKeys`

### JavaScript (and super languages)

**Since**: `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

Sources: 
- Same as: no-dupe-keys

Disallow two keys with the same name inside objects.

If an object property with the same name is defined multiple times (except when combining a getter with a setter), only the last definition makes it into the object and previous definitions are ignored, which is likely a mistake.

### Examples

#### Invalid

```js
const obj = {
   	a: 1,
   	a: 2,
}
```

```js
const obj = {
   	set a(v) {},
   	a: 2,
}
```

#### Valid

```js
const obj = {
   	a: 1,
   	b: 2,
}
```

```js
const obj = {
   	get a() { return 1; },
   	set a(v) {},
}
```

### Related links

- Disable a rule
- Configure the rule fix
- Rule options

### JSON (and super languages)

**Since**: `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Disallow two keys with the same name inside objects.

### Examples

#### Invalid

```json
{
  "title": "New title",
  "title": "Second title"
}
```

#### Valid

```json
{
  "title": "New title",
  "secondTitle": "Second title"
}
```

### Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noDuplicateParameters

Disallow duplicate function parameter name.

## Diagnostic Category: `lint/suspicious/noDuplicateParameters`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: no-dupe-args

Disallow duplicate function parameter name.

If more than one parameter has the same name in a function definition,
the last occurrence overrides the preceding occurrences.
A duplicated name might be a typing error.

## Examples

### Invalid

```js
var f = function(a, b, b) {}
```

```js
function b(a, b, b) {}
```

### Valid

```js
function i(i, b, c) {}
var j = function (j, b, c) {};
function k({ k, b }, { c, d }) {}
function l([, l]) {}
function foo([[a, b], [c, d]]) {}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noDuplicateProperties

Disallow duplicate properties within declaration blocks.

## Diagnostic Category
`lint/nursery/noDuplicateProperties`

## Since
`v1.9.4`

This rule is part of the nursery group.

Sources: 
- Same as: stylelint/declaration-block-no-duplicate-properties

## Examples

### Invalid

```css
a {
  color: pink;
  color: orange;
}
```

Duplicate properties can lead to unexpected behavior and may override previous declarations unintentionally.

1 │ a {
2 │   color: pink;
> 3 │   color: orange;
   │   ^^^^^^^^^^^^^^^
4 │ }
5 │

ℹ color is already defined here.

1 │ a {
> 2 │   color: pink;
   │   ^^^^^^^^^^^
3 │   color: orange;
4 │ }

ℹ Remove or rename the duplicate property to ensure consistent styling.

### Valid

```css
a {
  color: pink;
  background: orange;
}
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options

# noDuplicateSelectorsKeyframeBlock

Disallow duplicate selectors within keyframe blocks.

## Diagnostic Category
lint/suspicious/noDuplicateSelectorsKeyframeBlock

## Since
v1.8.0

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

## Sources
- Same as: stylelint/keyframe-block-no-duplicate-selectors

## Examples

### Invalid

```css
@keyframes foo { from {} from {} }
```

```css
@keyframes foo { from {} FROM {} }
```

```css
@keyframes foo { 0% {} 0% {} }
```

### Valid

```css
@keyframes foo { 0% {} 100% {} }
```

```css
@keyframes foo { from {} to {} }
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options

# noDuplicateTestHooks

A `describe` block should not contain duplicate hooks.

## Diagnostic Category: `lint/suspicious/noDuplicateTestHooks`

### Since: `v1.6.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

### Sources

- Inspired from: jest/no-duplicate-hooks

## Examples

### Invalid

```javascript
describe('foo', () => {
  beforeEach(() => {
    // some setup
  });
  beforeEach(() => {
    // some setup
  });
  test('foo_test', () => {
   // some test
  });
});
```

```javascript
describe('foo', () => {
  beforeEach(() => {
    // some setup
  });
  test('foo_test', () => {
    afterAll(() => {
      // some teardown
    });
   afterAll(() => {
     // some teardown
   });
  });
});
```

### Valid

```javascript
describe('foo', () => {
  beforeEach(() => {
    // some setup
  });
  test('foo_test', () => {
    // some test
  });
});
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# No Duplicated Fields

**Diagnostic Category: `lint/nursery/noDuplicatedFields`**

## GraphQL
**Since**: `v1.9.0`

This rule is part of the nursery group.

Sources: 
- Same as: graphql/no-duplicate-fields

No duplicated fields in GraphQL operations.

Checks for duplicate fields in selection set, variables in operation definition, or in arguments set of a field.

### Examples

#### Invalid
```graphql
query test($v: String, $t: String, $v: String) {
  id
}
```

#### Valid
```graphql
query {
  user {
    id
  }
}
```

### Related links
- Disable a rule
- Configure the rule fix
- Rule options

# noDynamicNamespaceImportAccess

Disallow accessing namespace imports dynamically.

Accessing namespace imports dynamically can prevent efficient tree shaking and increase bundle size.
This happens because the bundler cannot determine which parts of the namespace are used at compile time,
so it must include the entire namespace in the bundle.

Instead, consider using named imports or if that is not possible
access the namespaced import properties statically.

If you want to completely disallow namespace imports, consider using the noNamespaceImport rule.

## Examples

### Invalid

```javascript
import * as foo from "foo"
foo["bar"]
```

```javascript
import * as foo from "foo"
const key = "bar"
foo[key]
```

### Valid

```javascript
import * as foo from "foo"
foo.bar
```

```javascript
import { bar } from "foo"
bar
```

```javascript
import messages from "i18n"
const knownMessagesMap = {
  hello: messages.hello,
  goodbye: messages.goodbye
}

const dynamicKey = "hello"
knownMessagesMap[dynamicKey]
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noEmptyBlockStatements
Disallow empty block statements and static blocks.

**Diagnostic Category: `lint/suspicious/noEmptyBlockStatements`**

**Since**: `v1.3.0`

Sources: 
- Same as: `no-empty`
- Same as: `no-empty-static-block`
- Same as: `no-empty-function`
- Same as: `@typescript-eslint/no-empty-function`

Disallow empty block statements and static blocks.

Empty static blocks and block statements, while not technically errors, usually occur due to refactoring that wasn’t completed. They can cause confusion when reading code.

This rule disallows empty block statements and static blocks.
This rule ignores block statements or static blocks which contain a comment (for example, in an empty catch or finally block of a try statement to indicate that execution should continue regardless of errors).

## Examples

### Invalid

```js
function emptyFunctionBody () {}
```

```js
try {
    doSomething();
} catch(ex) {

}
```

```js
class Foo {
  static {}
}
```

### Valid

```js
function foo () {
    doSomething();
}
```

```js
try {
  doSomething();
} catch (ex) {
  // continue regardless of error
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noEmptyBlock

Disallow CSS empty blocks.

## Diagnostic Category: `lint/suspicious/noEmptyBlock`

### Since: `v1.8.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: stylelint/block-no-empty

## Examples

### Invalid

```css
p {}
```

```css
.b {}
```

```css
@media print { a {} }
```

### Valid

```css
p {
  color: red;
}
```

```css
p { /* foo */ }
```

```css
@media print { a { color: pink; } }
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noEmptyCharacterClassInRegex

Disallow empty character classes in regular expression literals.

## Diagnostic Category: `lint/correctness/noEmptyCharacterClassInRegex`

### Since: `v1.3.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: no-empty-character-class

Disallow empty character classes in regular expression literals.

Empty character classes don't match anything.
In contrast, negated empty classes match any character.
They are often the result of a typing mistake.

## Examples

### Invalid

```js
/^a[]/.test("a"); // false
```

The regular expression includes this empty character class.
Empty character classes don't match anything.
If you want to match against [, escape it \[.
Otherwise, remove the character class or fill it.

```js
/^a[^]/.test("ax"); // true
```

The regular expression includes this negated empty character class.
Negated empty character classes match anything.
If you want to match against [, escape it \[.
Otherwise, remove the character class or fill it.

### Valid

```js
/^a[xy]/.test("ay"); // true
```

```js
/^a[^xy]/.test("ab"); // true
```

```js
/^a\[]/.test("a[]"); // true
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noEmptyInterface

Disallow the declaration of empty interfaces.

## Diagnostic Category: `lint/suspicious/noEmptyInterface`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has a **safe** fix.

Sources: 
- Inspired from: `@typescript-eslint/no-empty-interface`

Disallow the declaration of empty interfaces.

An empty interface in TypeScript does very little: any non-nullable value is assignable to `{}`.
Using an empty interface is often a sign of programmer error, such as misunderstanding the concept of `{}` or forgetting to fill in fields.

The rule ignores empty interfaces that `extends` one or multiple types.

## Examples

### Invalid

```ts
interface A {}
```

```text
code-block.ts:1:1 lint/suspicious/noEmptyInterface  FIXABLE 
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 ✖ An empty interface is equivalent to {}.
 
 > 1 │ interface A {}
   │   ^^^^^^^^^^^^
   │   ^^^^^^^^^^^^
   │   ^^^^^^^^^^^^
   │   ^^^^^^^^^^^^
   │   ^^^^^^^^^^^^
   │   ^^^^^^^^^^^^
   │   ^^^^^^^^^^^^
   │   ^^^^^^^^^^^^
   │   ^^^^^^^^^^^^
   │   ^^^^^^^^^^^^
   │   ^^^^^^^^^^^^
   │   ^^^^^^^^^^^^
   │   ^^^^^^^^^^^^
   │   ^^^^^^^^^^^^
 2 │ 
 ℹ Safe fix: Use a type alias instead.
 
 1 │ - interface A {}
 1 │ + type A = {}
 2 │ 
```

### Valid

```ts
interface A {
  prop: string;
}

// Allow empty interfaces that extend a type.
interface B extends A {}

// Allow empty interfaces in ambient modules
declare module "mod" {
  interface C {}
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noEmptyPattern

Disallows empty destructuring patterns.

## Diagnostic Category
lint/correctness/noEmptyPattern

## Since
v1.0.0

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

## Sources
- Same as: no-empty-pattern

## Examples

### Invalid

```js
var {} = foo;
```

```js
var {a: {}} = foo;
```

```js
function foo({}) {}
```

### Valid

The following cases are valid because they create new bindings.

```js
var {a = {}} = foo;
var {a, b = {}} = foo;
var {a = []} = foo;
function foo({a = {}}) {}
function foo({a = []}) {}
var [a] = foo;
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options

# noEmptyTypeParameters

Disallow empty type parameters in type aliases and interfaces.

## Diagnostic Category
lint/complexity/noEmptyTypeParameters

## Since
v1.5.0

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

TypeScript permits the use of empty type parameter lists in type alias and interface declarations; however, this practice is generally discouraged.
Allowing empty type parameter lists can lead to unclear or ambiguous code, where the intention of the generic type is not self-evident.
This rule disallows empty type parameter lists in type alias and interface declarations.

## Examples

### Invalid

```ts
interface Foo<> {}
```

```text
code-block.ts:1:14 lint/complexity/noEmptyTypeParameters 
  ✖ Using an empty type parameter list is confusing.
  1 │ interface Foo<> {}
    │             ^^
  ℹ Remove the empty type parameter list or add a type parameter.
```

```ts
type Bar<> = {};
```

```text
code-block.ts:1:9 lint/complexity/noEmptyTypeParameters 
  ✖ Using an empty type parameter list is confusing.
  1 │ type Bar<> = {};
    │        ^^
  ℹ Remove the empty type parameter list or add a type parameter.
```

### Valid

```ts
interface Foo {}
```

```ts
type Foo<T> = {
 bar: T;
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noEnum

Disallow TypeScript enum.

## Diagnostic Category: `lint/nursery/noEnum`

### Since: `v1.9.0`

This rule is part of the nursery group.

TypeScript enums are not a type-level extension to JavaScript like type annotations or definitions. Users may wish to disable non-type-level extensions to use bundlers or compilers that only strip types.

Const enums are not covered by this rule since `noConstEnum` already handles them. Enums within the ambient context, including declaration files, are ignored as well.

## Examples

### Invalid

```ts
enum Foo {
    BAR = 'bar',
    BAZ = 'baz',
}
```

### Valid

```ts
const Foo = {
    BAR: 'bar',
    BAZ: 'baz',
} as const
```

```ts
type Foo = 'bar' | 'baz'
```

```ts
const enum Foo {
    BAR = 'bar',
    BAZ = 'baz',
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noEvolvingTypes

Disallow variables from evolving into `any` type through reassignments.

## Diagnostic Category: `lint/suspicious/noEvolvingTypes`

### Since: `v1.6.3`

Disallow variables from evolving into `any` type through reassignments.

In TypeScript, variables without explicit type annotations can evolve their types based on subsequent assignments.

When TypeScript's noImplicitAny is disabled, variables without explicit type annotations have implicitly the type `any`.
Just like the `any` type, evolved `any` types disable many type-checking rules and should be avoided to maintain strong type safety.
This rule prevents such cases by ensuring variables do not evolve into `any` type, encouraging explicit type annotations and controlled type evolutions.

If you enabled TypeScript's noImplicitAny and want to benefit of evolving types, then we recommend to disable this rule.

## Examples

### Invalid

```ts
let a;
```

The type of this variable may evolve implicitly to any type, including the `any` type.
Add an explicit type or initialization to avoid implicit type evolution.

```ts
const b = [];
```

The type of this variable may evolve implicitly to any type, including the `any` type.
Add an explicit type or initialization to avoid implicit type evolution.

```ts
let c = null;
```

The type of this variable may evolve implicitly to any type, including the `any` type.
Add an explicit type or initialization to avoid implicit type evolution.

### Valid

```ts
let a: number;
let b = 1;
var c : string;
var d = "abn";
const e: never[] = [];
const f = [null];
const g = ['1'];
const h = [1];
let workspace: Workspace | null = null;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noExcessiveCognitiveComplexity

Disallow functions that exceed a given Cognitive Complexity score.

## Diagnostic Category
lint/complexity/noExcessiveCognitiveComplexity

## Since
v1.0.0

## Sources
- Same as: sonarjs/cognitive-complexity

## Description
The more complexity a function contains, the harder it is to understand later on. Reducing complexity helps to make code more maintainable, both by making it easier to understand as well as by reducing chances of accidental side-effects when making changes.

This rule calculates a complexity score for every function and disallows those that exceed a configured complexity threshold (default: 15).

The complexity score is calculated based on the Cognitive Complexity algorithm: https://redirect.sonarsource.com/doc/cognitive-complexity.html

## Examples

### Invalid

```javascript
function tooComplex() {
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            for (let z = 0; z < 10; z++) {
                if (x % 2 === 0) {
                    if (y % 2 === 0) {
                        console.log(x > y ? `${x} > ${y}` : `${y} > ${x}`);
                    }
                }
            }
        }
    }
}
```

### Error Message

code-block.js:1:10 lint/complexity/noExcessiveCognitiveComplexity 
 Excessive complexity of 21 detected (max: 15).
 
 1 │ function tooComplex() {
   │         ^
 2 │     for (let x = 0; x < 10; x++) {
 3 │         for (let y = 0; y < 10; y++) {
 
 Please refactor this function to reduce its complexity score from 21 to the max allowed complexity 15.

## Options

Allows to specify the maximum allowed complexity.

```json
{
    "//": "...",
    "options": {
        "maxAllowedComplexity": 15
    }
}
```

The allowed values range from 1 through 254. The default is 15.

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noExcessiveNestedTestSuites

**Diagnostic Category: `lint/complexity/noExcessiveNestedTestSuites`**

**Since**: `v1.6.0`

This rule enforces a maximum depth to nested `describe()` in test files.

To improve code clarity in your tests, the rule limits nested `describe` to 5.

## Examples

### Invalid

```js
describe('foo', () => {
  describe('bar', () => {
    describe('baz', () => {
      describe('qux', () => {
        describe('quxx', () => {
          describe('too many', () => {
            it('should get something', () => {
              expect(getSomething()).toBe('Something');
            });
          });
        });
      });
    });
  });
});
```

Excessive `describe()` nesting detected.

### Valid

```js
describe('foo', () => {
  describe('bar', () => {
    it('should get something', () => {
      expect(getSomething()).toBe('Something');
    });
  });
  describe('qux', () => {
    it('should get something', () => {
      expect(getSomething()).toBe('Something');
    });
  });
});
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options
- jest/max-nested-describe

# noExplicitAny

Disallow the `any` type usage.

## Diagnostic Category: `lint/suspicious/noExplicitAny`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `@typescript-eslint/no-explicit-any`

The `any` type in TypeScript is a dangerous "escape hatch" from the type system.
Using `any` disables many type checking rules and is generally best used only as a last resort or when prototyping code.

TypeScript's `--noImplicitAny` compiler option prevents an implied `any`,
but doesn't prevent `any` from being explicitly used the way this rule does.

Sometimes you can use the type `unknown` instead of the type `any`.
It also accepts any value, however it requires to check that a property exists before calling it.

## Examples

### Invalid

```ts
let variable: any = 1;
```

```text
code-block.ts:1:15 lint/suspicious/noExplicitAny 
 Unexpected any. Specify a different type.
> 1 │ let variable: any = 1;
   │              ^^^
 2 │ 
 ℹ any disables many type checking rules. Its use should be avoided.
```

```ts
class SomeClass {
   message: Array<Array<any>>;
}
```

```text
code-block.ts:2:25 lint/suspicious/noExplicitAny 
 Unexpected any. Specify a different type.
  1 │ class SomeClass {
> 2 │   message: Array<Array<any>>;
   │                        ^^^
  3 │ }
 4 │ 
 ℹ any disables many type checking rules. Its use should be avoided.
```

```ts
function fn(param: Array<any>): void {}
```

```text
code-block.ts:1:26 lint/suspicious/noExplicitAny 
 Unexpected any. Specify a different type.
> 1 │ function fn(param: Array<any>): void {}
   │                         ^^^
 2 │ 
 ℹ any disables many type checking rules. Its use should be avoided.
```

### Valid

```ts
let variable: number = 1;
let variable2 = 1;
```

```ts
class SomeClass<T extends any> {
   message: Array<Array<unknown>>;
}
```

```ts
function fn(param: Array<Array<unknown>>): Array<unknown> {}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noExportedImports

Disallow exporting an imported variable.

## Diagnostic Category: `lint/nursery/noExportedImports`

### Since: `v1.9.0`

This rule is part of the nursery group.

Disallow exporting an imported variable.

In JavaScript, you can re-export a variable either by using `export from` or by first importing the variable and then exporting it with a regular `export`.

You may prefer to use the first approach, as it clearly communicates the intention to re-export an import, and can make static analysis easier.

## Examples

### Invalid

```js
import { A } from "mod";
export { A };
```

An import should not be exported. Use `export from` instead.

```js
import * as ns from "mod";
export { ns };
```

An import should not be exported. Use `export from` instead.

```js
import D from "mod";
export { D };
```

An import should not be exported. Use `export from` instead.

### Valid

```js
export { A } from "mod";
export * as ns from "mod";
export { default as D } from "mod";
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noExportsInTest

Disallow using `export` or `module.exports` in files containing tests

## Diagnostic Category: `lint/suspicious/noExportsInTest`

### Since: `v1.6.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Inspired from: jest/no-export

Disallow using `export` or `module.exports` in files containing tests

This rule aims to eliminate duplicate runs of tests by exporting things from test files.
If you import from a test file, then all the tests in that file will be run in each imported instance,
so bottom line, don't export from a test, but instead move helper functions into a separate file when they need to be shared across tests.

## Examples

### Invalid

```js
export function myHelper() {}
describe('a test', () => {
    expect(1).toBe(1);
});
```

```text
code-block.js:1:1 lint/suspicious/noExportsInTest 
  ✖ Do not export from a test file.
  > 1 │ export function myHelper() {}
    │   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
```

### Valid

```js
function myHelper() {}
describe('a test', () => {
    expect(1).toBe(1);
});
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noExtraBooleanCast

Disallow unnecessary boolean casts

## Diagnostic Category: `lint/complexity/noExtraBooleanCast`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: no-extra-boolean-cast

## Examples

### Invalid

```javascript
if (!Boolean(foo)) {
}
```

```javascript
while (!!foo) {}
```

```javascript
let x = 1;
do {
1 + 1;
} while (Boolean(x));
```

```javascript
for (; !!foo; ) {}
```

```javascript
new Boolean(!!x);
```

### Valid

```javascript
Boolean(!x);
!x;
!!x;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noExtraNonNullAssertion

Prevents the wrong usage of the non-null assertion operator (`!`) in TypeScript files.

**Diagnostic Category: `lint/suspicious/noExtraNonNullAssertion`**

**Since**: `v1.0.0`

* This rule is recommended by Biome. A diagnostic error will appear when linting your code.
* This rule has a **safe** fix.

Sources: 
- Same as: `@typescript-eslint/no-extra-non-null-assertion`

Prevents the wrong usage of the non-null assertion operator (`!`) in TypeScript files.

The `!` non-null assertion operator in TypeScript is used to assert that a value's type does not include `null` or `undefined`. Using the operator any more than once on a single value does nothing.

## Examples

### Invalid

```ts
const bar = foo!!.bar;
```

```ts
function fn(bar?: { n: number }) {
  return bar!?.n;
}
```

```ts
function fn(bar?: { n: number }) {
  return ((bar!))?.();
}
```

### Valid

```ts
const bar = foo!.bar;

obj?.string!.trim();

function fn(key: string | null) {
  const obj = {};
  return obj?.[key!];
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noFallthroughSwitchClause

Disallow fallthrough of `switch` clauses.

## Diagnostic Category
lint/suspicious/noFallthroughSwitchClause

## Since
v1.0.0

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

## Sources
- Same as: no-fallthrough

Switch clauses in `switch` statements fall through by default. This can lead to unexpected behavior when forgotten.

The rule doesn't take `process.exit()` in consideration.

## Examples

### Invalid

```js
switch (bar) {
	case 0:
		a();
	case 1:
		b();
}
```

### Error Message
This case is falling through to the next case. Add a `break` or `return` statement to the end of this case to prevent fallthrough.

### Valid

```js
switch (foo) {
	case 1:
    case 2:
		doSomething();
		break;
    case 3: {
        if (cond) {
            break;
        } else {
            break;
        }
    }
	case 4:
		doSomething();
}
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options

# noFlatMapIdentity

Disallow to use unnecessary callback on `flatMap`.

To achieve the same result (flattening an array) more concisely and efficiently, you should use `flat` instead.

## Examples

### Invalid

```js
array.flatMap((arr) => arr);
```

```js
array.flatMap((arr) => {return arr});
```

### Valid

```js
array.flatMap((arr) => arr * 2);
```

## Diagnostic Category
lint/correctness/noFlatMapIdentity

## Since
v1.7.0

## Sources
- Same as: flat_map_identity

## Related links
- Disable a rule
- Configure the rule fix
- Rule options

# noFocusedTests
Disallow focused tests.

**Diagnostic Category: `lint/suspicious/noFocusedTests`**

**Since**: `v1.6.0`

* This rule is recommended by Biome. A diagnostic error will appear when linting your code.
* This rule has an **unsafe** fix.

Sources: 
- Inspired from: jest/no-focused-tests

Disallow focused tests.

Disabled test are useful when developing and debugging, because it forces the test suite to run only certain tests.

However, in pull/merge request, you usually want to run all the test suite.

## Examples

### Invalid

```js
describe.only("foo", () => {});
```

```js
test.only("foo", () => {});
```

### Valid

```js
test("foo", () => {});
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noForEach

**Diagnostic Category: `lint/complexity/noForEach`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: unicorn/no-array-for-each
- Same as: needless_for_each

Prefer `for...of` statement instead of `Array.forEach`.

Here's a summary of why `forEach` may be disallowed, and why `for...of` is preferred for almost any use-case of `forEach`:

- Performance: Using `forEach` can lead to performance issues, especially when working with large arrays.
When more requirements are added on, `forEach` typically gets chained with other methods like `filter` or `map`, causing multiple iterations over the same Array.
Encouraging for loops discourages chaining and encourages single-iteration logic (e.g. using a continue instead of `filter`).


- Readability: While `forEach` is a simple and concise way to iterate over an array, it can make the code less readable, especially when the callback function is complex.
In contrast, using a for loop or a `for...of` loop can make the code more explicit and easier to read.


- Debugging: `forEach` can make debugging more difficult, because it hides the iteration process.



## Caveat

We consider all objects with a method named `forEach` to be iterable.
This way, this rule applies to all objects with a method called `forEach`, not just `Array` instances.

## Exception for Index Usage

When the index is explicitly used in the `forEach` callback, it is acceptable to use `forEach`. This is because:

- The index is directly available as the second argument in `forEach`, making it convenient for scenarios where the index is necessary.
- In sparse arrays, `forEach` will skip undefined entries, which differs from the behavior of `for...of` with `Object.entries` that includes these entries.
This can be important for certain array operations, particularly in TypeScript environments with strict type checking.

## Examples

### Invalid

```javascript
els.forEach((el) => {
  f(el);
})
```

```javascript
els["forEach"](el => {
  f(el);
})
```

### Valid

```javascript
els.forEach((el, i) => {
  f(el, i)
})
```

```javascript
for (const el of els) {
  f(el);
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noFunctionAssign

Disallow reassigning function declarations.

## Diagnostic Category: `lint/suspicious/noFunctionAssign`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

### Sources

- Same as: no-func-assign

## Examples

### Invalid

```js
function foo() { };
foo = bar;
```

```js
function foo() {
    foo = bar;
 }
```

```js
foo = bar;
function foo() { };
```

```js
[foo] = bar;
function foo() { };
```

```js
({ x: foo = 0 } = bar);
function foo() { };
```

```js
function foo() {
    [foo] = bar;
 }
```

```js
(function () {
    ({ x: foo = 0 } = bar);
    function foo() { };
 })();
```

### Valid

```js
function foo() {
    var foo = bar;
 }
```

```js
function foo(foo) {
    foo = bar;
 }
```

```js
function foo() {
    var foo;
    foo = bar;
 }
```

```js
var foo = () => {};
foo = bar;
```

```js
var foo = function() {};
foo = bar;
```

```js
var foo = function() {
    foo = bar;
 };
```

```js
import bar from 'bar';
function foo() {
    var foo = bar;
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noGlobalAssign

Disallow assignments to native objects and read-only global variables.

**Diagnostic Category: `lint/suspicious/noGlobalAssign`**

**Since**: `v1.5.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `no-global-assign`

JavaScript's environments contain numerous built-in global variables, such as `window` in browsers and `process` in Node.js.
Assigning values to these global variables can be problematic as it can override essential functionality.

## Examples

### Invalid

```js
Object = null;
```

```js
window = {};
```

```js
undefined = true;
```

### Valid

```js
a = 0;
```

```js
let window;
window = {};
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noGlobalEval

Disallow the use of global `eval()`.

## Diagnostic Category: `lint/security/noGlobalEval`

### Since: `v1.5.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `no-eval`

The `eval()` function evaluates the passed string as a _JavaScript_ code.
The executed code can access and mutate variables in the scope where the function is called.

The use of `eval()` exposes to [security risks and performance issues](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval!).
If the executed code is somehow affected by a malicious party,
then you may end up executing malicious code with the privileges of the caller.
Moreover, changing variables in the caller's scope is expensive in modern _JavaScript_ interpreters.

## Examples

### Invalid

```js
eval("var a = 0");
```

```js
(0, globalThis.eval)("var a = 0")
```

```js
f(eval);
```

```js
const aliasedEval = eval;
```

### Valid

```cjs
function f(eval) {
    eval("let a = 0;");
}
```

The rule is not able to detect cases where the global object is aliased:

```js
let foo = globalThis;
foo.eval("let a = 0;");
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noGlobalIsFinite

## Diagnostic Category: `lint/suspicious/noGlobalIsFinite`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Use `Number.isFinite` instead of global `isFinite`.

`Number.isFinite()` and `isFinite()` do not have the same behavior. 
When the argument to `isFinite()` is not a number, the value is first coerced to a number.
`Number.isFinite()` does not perform this coercion.
Therefore, it is a more reliable way to test whether a number is finite.

### Examples

#### Invalid

```js
isFinite(false); // true
```

#### Valid

```js
Number.isFinite(false); // false
```

### Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noGlobalIsNan

## Diagnostic Category: `lint/suspicious/noGlobalIsNan`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Use `Number.isNaN` instead of global `isNaN`.

`Number.isNaN()` and `isNaN()` do not have the same behavior.
When the argument to `isNaN()` is not a number, the value is first coerced to a number.
`Number.isNaN()` does not perform this coercion.
Therefore, it is a more reliable way to test whether a value is `NaN`.

## Examples

### Invalid

```js
isNaN({}); // true
```

### Error Message

code-block.js:1:1 lint/suspicious/noGlobalIsNan  FIXABLE 
✖ isNaN is unsafe. It attempts a type coercion. Use Number.isNaN instead.
> 1 │ isNaN({}); // true
│   ^^^^
ℹ See the MDN documentation for more details.
ℹ Unsafe fix: Use Number.isNaN instead.
- isNaN({}); // true
+ Number.isNaN({}); // true

### Valid

```js
Number.isNaN({}); // false
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noGlobalObjectCalls

Disallow calling global object properties as functions

ECMAScript provides several global objects that are intended to be used as-is.
Some of these objects look as if they could be constructors due their capitalization (such as Math and JSON) but will throw an error if you try to execute them as functions.

The ECMAScript 5 specification makes it clear that both Math and JSON cannot be invoked:
The Math object does not have a [[Call]] internal property; it is not possible to invoke the Math object as a function.

The ECMAScript 2015 specification makes it clear that Reflect cannot be invoked:
The Reflect object also does not have a [[Call]] internal method; it is not possible to invoke the Reflect object as a function.

The ECMAScript 2017 specification makes it clear that Atomics cannot be invoked:
The Atomics object does not have a [[Call]] internal method; it is not possible to invoke the Atomics object as a function.

And the ECMAScript Internationalization API Specification makes it clear that Intl cannot be invoked:
The Intl object does not have a [[Call]] internal method; it is not possible to invoke the Intl object as a function.

## Examples

### Invalid

```javascript
var math = Math();
```

```javascript
var newMath = new Math();
```

```javascript
var json = JSON();
```

```javascript
var newJSON = new JSON();
```

```javascript
var reflect = Reflect();
```

```javascript
var newReflect = new Reflect();
```

```javascript
var atomics = Atomics();
```

```javascript
var newAtomics = new Atomics();
```

```javascript
var intl = Intl();
```

```javascript
var newIntl = new Intl();
```

### Valid

```javascript
function area(r) {
    return Math.PI * r * r;
}

var object = JSON.parse("{}");

var value = Reflect.get({ x: 1, y: 2 }, "x");

var first = Atomics.load(foo, 0);

var segmenterFr = new Intl.Segmenter("fr", { granularity: "word" });
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options
- no-obj-calls

# noHeadElement

Prevent usage of `<head>` element in a Next.js project.

**Diagnostic Category: `lint/nursery/noHeadElement`**

**Since**: `v1.9.4`

This rule is part of the nursery group.

Sources: 
- Same as: `@next/no-head-element`

Next.js provides a specialized `<Head />` component from `next/head` that manages
the `<head>` tag for optimal server-side rendering, client-side navigation, and
automatic deduplication of tags such as `<meta>` and `<title>`.

This rule only checks files that are outside of the `app/` directory, as it's typically
handled differently in Next.js.

## Examples

### Invalid

```jsx
function Index() {
  return (
    <head>
      <title>Invalid</title>
    </head>
  )
}
```

```text
code-block.jsx:2:11 lint/nursery/noHeadElement 
 Don't use <head> element.
 
1 │ function Index() {
2 │   return (
 │          ^
 │          ^
 │          ^
 │          ^
 │          ^
3 │     <head>
 │     <title>Invalid</title>
4 │     </head>
 
 Using the <head> element can cause unexpected behavior in a Next.js application. Use <Head /> from next/head instead.
```

### Valid

```jsx
import Head from 'next/head'

function Index() {
  return (
    <Head>
      <title>All good!</title>
    </Head>
  )
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noHeadImportInDocument

**Diagnostic Category: `lint/nursery/noHeadImportInDocument`**

## Overview

Prevent using the `next/head` module in `pages/_document.js` on Next.js projects.

## Description

Importing `next/head` within the custom `pages/_document.js` file can cause unexpected behavior in your application. The `next/head` component is designed to be used at the page level, and when used in the custom document it can interfere with the global document structure, which leads to issues with rendering and SEO.

To modify `<head>` elements across all pages, you should use the `<Head />` component from the `next/document` module.

## Since
v1.9.4

## Sources
- Same as: `@next/no-head-import-in-document`

## Examples

### Valid

```jsx
// pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    //...
  }

  render() {
    return (
      <Html>
        <Head></Head>
      </Html>
    );
  }
}

export default MyDocument;
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options

# noHeaderScope

**Diagnostic Category: `lint/a11y/noHeaderScope`**

**Since**: `v1.0.0`

:::note
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.
:::

Sources: 
- Same as: jsx-a11y/scope

The scope prop should be used only on `<th>` elements.

## Examples

### Invalid

```jsx
<div scope={scope} />
```

```jsx
<div scope="col" />
```

### Valid

```jsx
<th scope={scope}></th>
```

```jsx
<th scope="col"></th>
```

## Accessibility guidelines

- WCAG 1.3.1
- WCAG 4.1.1

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noImgElement

Prevent usage of `<img>` element in a Next.js project.

**Diagnostic Category: `lint/nursery/noImgElement`**

**Since**: `v1.9.4`

This rule is part of the nursery group.

Sources: 
- Same as: `@next/no-img-element`

Using the `<img>` element can result in slower Largest Contentful Paint (LCP)
and higher bandwidth usage, as it lacks the optimizations provided by the `<Image />`
component from `next/image`. Next.js's `<Image />` automatically optimizes images
by serving responsive sizes and using modern formats, improving performance and reducing bandwidth.

If your project is self-hosted, ensure that you have sufficient storage and have
installed the `sharp` package to support optimized images. When deploying to managed
hosting providers, be aware of potential additional costs or usage.

## Examples

### Invalid

```jsx
<img alt="Foo" />
```

```jsx
<div>
  <img alt="Foo" />
</div>
```

### Valid

```jsx
<img />
```

```jsx
<Image src="https://example.com/hero.jpg" />
```

```jsx
<picture>
  <source srcSet="https://example.com/hero.avif" type="image/avif" />
  <source srcSet="https://example.com/hero.webp" type="image/webp" />
  <img src="https://example.com/hero.jpg" />
</picture>
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noImplicitAnyLet

Disallow use of implicit `any` type on variable declarations.

## Diagnostic Category
lint/suspicious/noImplicitAnyLet

## Since
v1.4.0

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

TypeScript variable declaration without any type annotation and initialization have the `any` type. The any type in TypeScript is a dangerous “escape hatch” from the type system. Using any disables many type checking rules and is generally best used only as a last resort or when prototyping code. TypeScript’s `--noImplicitAny` compiler option doesn't report this case.

## Examples

### Invalid

```ts
var a;
a = 2;
```

```ts
let b;
b = 1
```

### Valid

```ts
var a = 1;
let a:number;
var b: number
var b =10;
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options
- https://www.typescriptlang.org/tsconfig#noImplicitAny

# noImplicitBoolean

Disallow implicit `true` values on JSX boolean attributes

## Diagnostic Category: `lint/style/noImplicitBoolean`

### Since: `v1.0.0`

This rule has a **safe** fix.

Sources: 
- Inspired from: react/jsx-boolean-value

## Examples

### Invalid

```jsx
<input disabled />
```

### Valid

```jsx
<input disabled={false} />
```

```jsx
<input disabled={''} />
```

```jsx
<input disabled={0} />
```

```jsx
<input disabled={undefined} />
```

```jsx
<input disabled='false' />
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noImportAssign

Disallow assigning to imported bindings

## Diagnostic Category: `lint/suspicious/noImportAssign`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: no-import-assign

Disallow assigning to imported bindings

## Examples

### Invalid

```js
import x from "y";
x = 1;
```

```js
import y from "y";
[y] = 1;
```

```js
import z from "y";
({ z } = 1);
```

```js
import a from "y";
[...a] = 1;
```

```js
import b from "y";
({ ...b } = 1);
```

```js
import c from "y";
for (c in y) {};
```

```js
import d from "y";
d += 1;
```

```js
import * as e from "y";
e = 1;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noImportantInKeyframe

Disallow invalid `!important` within keyframe declarations

## Diagnostic Category: `lint/suspicious/noImportantInKeyframe`

### Since: `v1.8.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: stylelint/keyframe-declaration-no-important

Disallow invalid `!important` within keyframe declarations

Using `!important` within keyframes declarations is completely ignored in some browsers.

## Examples

### Invalid

```css
@keyframes foo {
    from {
      opacity: 0;
    }
    to {
      opacity: 1 !important;
    }
}
```

```text
code-block.css:6:18 lint/suspicious/no-important-in-keyframe ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✖ Using !important within keyframes declaration is completely ignored in some browsers.
    4 │    }
    5 │    to {
  > 6 │      opacity: 1 !important;
    │                 ^^^^^^^^^
    7 │    }
    8 │  }
  ℹ Consider removing useless !important declaration.
```

### Valid

```css
@keyframes foo {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noInferrableTypes

Disallow type annotations for variables, parameters, and class properties initialized with a literal expression.

## Diagnostic Category: `lint/style/noInferrableTypes`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has a **safe** fix.

Sources: 
- Same as: `@typescript-eslint/no-inferrable-types`

TypeScript is able to infer the types of parameters, properties, and variables from their default or initial values.
There is no need to use an explicit `:` type annotation for trivially inferred types (boolean, bigint, number, regex, string).
Doing so adds unnecessary verbosity to code making it harder to read.

In contrast to ESLint's rule, this rule allows to use a wide type for `const` declarations.
Moreover, the rule does not recognize `undefined` values, primitive type constructors (String, Number, ...), and `RegExp` type.
These global variables could be shadowed by local ones.

## Examples

### Invalid

```ts
const variable: 1 = 1;
```

```ts
let variable: number = 1;
```

```ts
class SomeClass {
  readonly field: 1 = 1;
}
```

```ts
class SomeClass {
  field: number = 1;
}
```

```ts
function f(param: number = 1): void {}
```

### Valid

```ts
const variable: number = 1;
```

```ts
let variable: 1 | 2 = 1;
```

```ts
class SomeClass {
  readonly field: number = 1;
}
```

```ts
// `undefined` could be shadowed
const variable: undefined = undefined;
```

```ts
// `RegExp` could be shadowed
const variable: RegExp = /a/;
```

```ts
// `String` could be shadowed
let variable: string = String(5);
```

```ts
class SomeClass {
  field: 1 | 2 = 1;
}
```

```ts
function f(param: 1 | 2 = 1): void {}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noInnerDeclarations

Disallow `function` and `var` declarations that are accessible outside their block.

## Diagnostic Category: `lint/correctness/noInnerDeclarations`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: no-inner-declarations

Disallow `function` and `var` declarations that are accessible outside their block.

A `var` is accessible in the whole body of the nearest root (function, module, script, static block).
To avoid confusion, they should be declared to the nearest root.

Prior to ES2015, `function` declarations were only allowed in the nearest root,
though parsers sometimes erroneously accept them elsewhere.
In ES2015, inside an _ES module_, a `function` declaration is always block-scoped.

Note that `const` and `let` declarations are block-scoped,
and therefore they are not affected by this rule.
Moreover, `function` declarations in nested blocks are allowed inside _ES modules_.

## Examples

### Invalid

```cjs
if (test) {
    function f() {}
}
```

```js
if (test) {
    var x = 1;
}
```

```cjs
function f() {
    if (test) {
        function g() {}
    }
}
```

```js
function f() {
    if (test) {
        var x = 1;
    }
}
```

### Valid

```js
// inside a module, function declarations are block-scoped and thus allowed.
if (test) {
    function f() {}
}
export {}
```

```js
function f() { }
```

```js
function f() {
    function g() {}
}
```

```js
function f() {
    var x = 1;
}
```

```js
function f() {
    if (test) {
        const g = function() {};
    }
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noInteractiveElementToNoninteractiveRole

**Diagnostic Category: `lint/a11y/noInteractiveElementToNoninteractiveRole`**

**Since**: `v1.3.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: jsx-a11y/no-interactive-element-to-noninteractive-role

Enforce that non-interactive ARIA roles are not assigned to interactive HTML elements.

Interactive HTML elements indicate controls in the user interface.
Interactive elements include `<a href>`, `<button>`, `<input>`, `<select>`, `<textarea>`.
Non-interactive HTML elements and non-interactive ARIA roles indicate content and containers in the user interface.
Non-interactive elements include `<main>`, `<area>`, `<h1>` (,`<h2>`, etc), `<img>`, `<li>`, `<ul>` and `<ol>`.

WAI-ARIA roles should not be used to convert an interactive element to a non-interactive element.
Non-interactive ARIA roles include `article`, `banner`, `complementary`, `img`, `listitem`, `main`, `region` and `tooltip`.

## Examples

### Invalid

```jsx
<input role="img" />;
```

### Valid

```jsx
<input role="button" />;
```

```jsx
<canvas role="img" />;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noInvalidBuiltinInstantiation

**Diagnostic Category: `lint/correctness/noInvalidBuiltinInstantiation`**

**Since**: `v1.7.2`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: unicorn/new-for-builtins
- Same as: eslint/no-new-native-nonconstructor

Ensure that builtins are correctly instantiated.

The following builtins require `new` to be instantiated:

- ArrayBuffer
- BigInt64Array
- BigUint64Array
- DataView
- FinalizationRegistry
- Float32Array
- Float64Array
- Int16Array
- Int32Array
- Int8Array
- Map
- Promise
- Proxy
- Set
- SharedArrayBuffer
- Uint16Array
- Uint32Array
- Uint8Array
- Uint8ClampedArray
- WeakMap
- WeakRef
- WeakSet

Conversely, the following builtins cannot be instantiated with `new`:

- BigInt
- Symbol

## Examples

### Invalid

```js
const text = new BigInt(1);
```

```js
const map = Map([
  ['foo', 'bar']
]);
```

### Valid

```js
const text = BigInt(1);
```

```js
const map = new Map([
 ['foo', 'bar']
]);
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noInvalidConstructorSuper

Prevents the incorrect use of `super()` inside classes. It also checks whether a call `super()` is missing from classes that extends other constructors.

**Diagnostic Category: `lint/correctness/noInvalidConstructorSuper`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `constructor-super`

## Examples

### Invalid

```js
class A {
    constructor() {
        super();
    }
}
```

```text
code-block.js:3:9 lint/correctness/noInvalidConstructorSuper 
 This class should not have a super() call. You should remove it.
  1 │ class A {
  2 │     constructor() {
> 3 │         super();
  │         ^^^^
  4 │     }
  5 │ }
```

```js
class A extends undefined {
    constructor() {
        super();
    }
}
```

```text
code-block.js:3:9 lint/correctness/noInvalidConstructorSuper 
 This class calls super(), but the class extends from a non-constructor.
  1 │ class A extends undefined {
  2 │     constructor() {
> 3 │         super();
  │         ^^^^
  4 │     }
  5 │ }
 
 This is where the non-constructor is used.
 
> 1 │ class A extends undefined {
  │                 ^^^^^^^^^
  2 │     constructor() {
  3 │         super();
```

### Valid

```js
export default class A extends B {
    constructor() {
        super();
    }
}
```

```js
export class A {
    constructor() {}
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noInvalidDirectionInLinearGradient

Disallow non-standard direction values for linear gradient functions.

## Diagnostic Category
lint/correctness/noInvalidDirectionInLinearGradient

## Since
v1.9.9

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

## Sources
- Same as: stylelint/function-linear-gradient-no-nonstandard-direction

## Description
Disallow non-standard direction values for linear gradient functions.

A valid and standard direction value is one of the following:

- an angle
- to plus a side-or-corner (to top, to bottom, to left, to right; to top right, to right top, to bottom left, etc.)

A common mistake (matching outdated non-standard syntax) is to use just a side-or-corner without the preceding to.

## Examples

### Invalid

```css
.foo { background: linear-gradient(top, #fff, #000); }
```

```css
.foo { background: linear-gradient(45, #fff, #000); }
```

### Valid

```css
.foo { background: linear-gradient(to top, #fff, #000); }
```

```css
.foo { background: linear-gradient(45deg, #fff, #000); }
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noInvalidGridAreas

## Diagnostic Category: `lint/correctness/noInvalidGridAreas`

**Since**: `v1.9.9`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: stylelint/named-grid-areas-no-invalid

Disallows invalid named grid areas in CSS Grid Layouts.

For a named grid area to be valid, all strings must define:

- the same number of cell tokens
- at least one cell token

And all named grid areas that spans multiple grid cells must form a single filled-in rectangle.

## Examples

### Invalid

```css
a { grid-template-areas: "a a"
                         "b b b"; }
```

```text
code-block.css:1:26 lint/correctness/noInvalidGridAreas ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ✖ Inconsistent cell count in grid areas are not allowed.

  > 1 │ a { grid-template-areas: "a a"
  │                         ^
  > 2 │                         "b b b"; }
  ℹ Consider adding the same number of cell tokens in each string.
```

```css
a { grid-template-areas: "b b b"
                         ""; }
```

```text
code-block.css:1:33 lint/correctness/noInvalidGridAreas ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ✖ Empty grid areas are not allowed.

  > 1 │ a { grid-template-areas: "b b b"
  │
  > 2 │                         ""; }
  │                         ^
  ℹ Consider adding the cell token within string.
```

```css
a { grid-template-areas: "a a a"
                         "b b a"; }
```

```text
code-block.css:1:33 lint/correctness/noInvalidGridAreas ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ✖ Duplicate filled in rectangle are not allowed.

  > 1 │ a { grid-template-areas: "a a a"
  │
  > 2 │                         "b b a"; }
  │                         ^^^^^^^
  ℹ Consider removing the duplicated filled-in rectangle: a
```

### Valid

```css
a { grid-template-areas: "a a a"
                         "b b b"; }
```

```css
a { grid-template-areas: "a a a"
                         "a a a"; }
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noInvalidNewBuiltin

Disallow `new` operators with global non-constructor functions.

**Diagnostic Category: `lint/correctness/noInvalidNewBuiltin`**

This rule is deprecated and will be removed in the next major release.
**Reason**: Use the rule noInvalidBuiltinInstantiation instead.
**Since**: `v1.3.0`

This rule has an **unsafe** fix.

Disallow `new` operators with global non-constructor functions.

Some global functions cannot be called using the new operator and will throw a `TypeError` if you attempt to do so. These functions are:

- `Symbol` https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Symbol/Symbol
- `BigInt` https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/BigInt/BigInt

## Examples

### Invalid

```js
let foo = new Symbol('foo');
```

```js
let bar = new BigInt(9007199254740991);
```

### Valid

```js
let foo = Symbol('foo');

function baz(Symbol) {
    const qux = new Symbol("baz");
}
```

```js
let bar = BigInt(9007199254740991);

function quux(BigInt) {
    const corge = new BigInt(9007199254740991);
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noInvalidPositionAtImportRule

Disallow the use of `@import` at-rules in invalid positions.

## Diagnostic Category
lint/correctness/noInvalidPositionAtImportRule

## Since
v1.8.0

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

## Sources
- Same as: stylelint/no-invalid-position-at-import-rule

## Description
Any `@import` rules must precede all other valid at-rules and style rules in a stylesheet (ignoring `@charset` and `@layer`), or else the `@import` rule is invalid.

## Examples

### Invalid
```css
a {}
@import 'foo.css';
```

### Error Message
```
code-block.css:2:2 lint/correctness/noInvalidPositionAtImportRule 
This @import is in the wrong position.
 
 1 │ a {}
> 2 │ @import 'foo.css';
 │   ^^^^^^^^^^^^^^^^^^^
 
ℹ Any @import rules must precede all other valid at-rules and style rules in a stylesheet (ignoring @charset and @layer), or else the @import rule is invalid.
 
ℹ Consider moving import position.
```

### Valid
```css
@import 'foo.css';
a {}
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options

# noInvalidUseBeforeDeclaration

Disallow the use of variables and function parameters before their declaration

## Diagnostic Category: `lint/correctness/noInvalidUseBeforeDeclaration`

### Since: `v1.5.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: no-use-before-define
- Same as: @typescript-eslint/no-use-before-define

Disallow the use of variables and function parameters before their declaration

JavaScript doesn't allow the use of block-scoped variables (`let`, `const`) and function parameters before their declaration.
A `ReferenceError` will be thrown with any attempt to access the variable or the parameter before its declaration.

The rule also reports the use of variables declared with `var` before their declarations.

## Examples

### Invalid

```js
function f() {
    console.log(x);
    const x;
}
```

```js
function f() {
    console.log(x);
    var x = 0;
}
```

```js
function f(a = b, b = 0) {}
```

### Valid

```js
f();
function f() {}

new C();
class C {}
```

```js
// An export can reference a variable before its declaration.
export { CONSTANT };
const CONSTANT = 0;
```

```js
function f() { return CONSTANT; }
const CONSTANT = 0;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noIrregularWhitespace

**Diagnostic Category: `lint/nursery/noIrregularWhitespace`**

## JavaScript (and super languages)

**Since**: `v1.9.0`

This rule is part of the nursery group.

Sources: 
- Same as: no-irregular-whitespace

Disallows the use of irregular whitespace characters.

Invalid or irregular whitespace causes issues with various parsers and also makes code harder to debug.

### Examples

#### Invalid

```js
letcount;
```

```js
let foo;
```

#### Valid

```js
const count = 1;
```

```js
const foo = '';
```

## CSS

**Since**: `v1.9.9`

This rule is part of the nursery group.

Sources: 
- Same as: stylelint/no-irregular-whitespace

Disallows the use of irregular whitespace characters.

Using irregular whitespace would lead to the failure of selecting the correct target.

### Examples

#### Invalid

```css
.firstClass.secondClass {
  color: red;
}
```

```css
.firstClass .secondClass {
  color:red;
}
```

#### Valid

```css
.firstClass .secondClass {
  color: red;
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noLabelVar
Disallow labels that share a name with a variable

## Diagnostic Category: `lint/suspicious/noLabelVar`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `no-label-var`

## Examples

### Invalid

```js
const x1 = "test";
x1: expr;
```

```
code-block.js:2:1 lint/suspicious/noLabelVar 
  Do not use the x1 variable name as a label
  1 │ const x1 = "test";
> 2 │ x1: expr;
  │   ^ ^
  3 │ 
  The variable is declared here
> 1 │ const x1 = "test";
  │       ^ ^
  2 │ x1: expr;
  3 │ 
  Creating a label with the same name as an in-scope variable leads to confusion.
```

### Valid

```js
const x = "test";
z: expr;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noLabelWithoutControl

## Diagnostic Category: `lint/a11y/noLabelWithoutControl`

### Since: `v1.8.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: jsx-a11y/label-has-associated-control

Enforce that a label element or component has a text label and an associated input.

An "input" is considered one of the following elements: `input`, `meter`, `output`, `progress`, `select` or `textarea`.

There are two supported ways to associate a label with an input:

- Wrapping an input in a label element.
- Adding a `for` attribute (or `htmlFor` in React) to a label and assigning it a DOM ID string associated with an input on the page.

This rule checks that any `label` element (or an indicated custom component that will output a `label` element) meets one of these conditions:

- Wraps an `input` element (or an indicated custom component that will output an `input` element)
- Has a `for` or `htmlFor` attribute and that the `label` element/component has accessible text content.

## Examples

### Invalid

```jsx
<label for="js_id" />;
```

```jsx
<label for="js_id"><input /></label>;
```

```jsx
<label htmlFor="js_id" />;
```

```jsx
<label htmlFor="js_id"><input /></label>;
```

```jsx
<label>A label</label>;
```

```jsx
<div><label /><input /></div>;
```

### Valid

```jsx
<label for="js_id" aria-label="A label" />;
<label for="js_id" aria-labelledby="A label" />;
<label htmlFor="js_id" aria-label="A label" />;
<label htmlFor="js_id" aria-labelledby="A label" />;
<label>A label<input /></label>;
<label>A label<textarea /></label>;
<label><img alt="A label" /><input /></label>;
```

## Options

The rule supports the following options:

- `inputComponents` - An array of component names that should be considered the same as an `input` element.
- `labelAttributes` - An array of attributes that should be treated as the `label` accessible text content.
- `labelComponents` - An array of component names that should be considered the same as a `label` element.

Both options `inputComponents` and `labelComponents` don't have support for namespace components (e.g. `<Control.Input>`).

```json
{
    "//": "...",
    "options": {
        "inputComponents": ["CustomInput"],
        "labelAttributes": ["label"],
        "labelComponents": ["CustomLabel"]
    }
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noMisleadingCharacterClass

Disallow characters made with multiple code points in character class syntax.

## Diagnostic Category: `lint/suspicious/noMisleadingCharacterClass`

### Since: `v1.5.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has a **safe** fix.

Sources: 
- Same as: no-misleading-character-class

Disallow characters made with multiple code points in character class syntax.

Unicode includes the characters which are made with multiple code points. e.g. Á, 🇯🇵, 👨‍👩‍👦.
A RegExp character class `/[abc]/` cannot handle characters with multiple code points.
For example, the character `❇️` consists of two code points: `❇` (U+2747) and `VARIATION SELECTOR-16` (U+FE0F).
If this character is in a RegExp character class, it will match to either `❇` or `VARIATION SELECTOR-16` rather than `❇️`.
This rule reports the regular expressions which include multiple code point characters in character class syntax.

## Examples

### Invalid

```js
/^[Á]$/u;
```

```js
/^[❇️]$/u;
```

```js
/^[👶🏻]$/u;
```

```js
/^[🇯🇵]$/u;
```

```js
/^[👨‍👩‍👦]$/u;
```

```js
/^[👍]$/; // surrogate pair without u flag
```

### Valid

```js
/^[abc]$/;
/^[👍]$/u;
/^[\q{👶🏻}]$/v;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noMisleadingInstantiator

**Diagnostic Category: `lint/suspicious/noMisleadingInstantiator`**

**Since**: `v1.3.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `@typescript-eslint/no-misused-new`

Enforce proper usage of `new` and `constructor`.

In JavaScript, classes utilize the `constructor` method to initialize a new instance. On the other hand, TypeScript interfaces can describe a class type with a `new()` method signature, though this pattern is not commonly seen in real-world code. Developers, especially those new to JavaScript or TypeScript, might occasionally confuse the use of `constructor` with `new`.

This rule triggers warnings in the following scenarios:

- When a class has a method named `new`.
- When an interface defines a method named `constructor` or `new` that returns the interface type.
- When a type alias has a `constructor` method.

You should not use this rule if you intentionally want a class with a `new` method, and you're confident nobody working in your code will mistake it with an `constructor`.

## Examples

### Invalid

```ts
interface I {
  new (): I;
  constructor(): void;
}
```

```text
code-block.ts:2:3 lint/suspicious/noMisleadingInstantiator 
 Don't use the new method in interfaces.
  1 │ interface I {
> 2 │   new (): I;
 │   ^^^^^^^^^^^
  3 │   constructor(): void;
 4 │ }
 
 new in an interface suggests it's instantiable, which is incorrect. The returned type should different from the constructor's type.
```

```ts
class C {
  new(): C;
}
```

```text
code-block.ts:2:3 lint/suspicious/noMisleadingInstantiator 
 Don't use the new method in classes.
  1 │ class C {
> 2 │   new(): C;
 │   ^^^^^^^
  3 │ }
 
 new is typically used to instantiate objects. In classes, its usage can be misleading.
```

### Valid

```ts
declare class C {
  constructor();
}

interface I {
  new (): C;
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noMisplacedAssertion

**Diagnostic Category: `lint/suspicious/noMisplacedAssertion`**

**Since**: `v1.8.0`
Sources: 
- Inspired from: jest/no-standalone-expect

Checks that the assertion function, for example `expect`, is placed inside an `it()` function call.

Placing (and using) the `expect` assertion function can result in unexpected behaviors when executing your testing suite.

The rule will check for the following assertion calls:

- `expect`
- `assert`
- `assertEquals`

However, the rule will ignore the following assertion calls:

- `expect.any`
- `expect.anything`
- `expect.closeTo`
- `expect.arrayContaining`
- `expect.objectContaining`
- `expect.stringContaining`
- `expect.stringMatching`
- `expect.extend`
- `expect.addEqualityTesters`
- `expect.addSnapshotSerializer`

If the assertion function is imported, the rule will check if they are imported from:

- `"chai"`
- `"node:assert"`
- `"node:assert/strict"`
- `"bun:test"`
- `"vitest"`
- Deno assertion module URL

Check the [options](#options) if you need to change the defaults.

## Examples

### Invalid

```js
describe("describe", () => {
    expect()
})
```

```js
import assert from "node:assert";
describe("describe", () => {
    assert.equal()
})
```

```js
import {test, expect} from "bun:test";
expect(1, 2)
```

```js
import {assertEquals} from "https://deno.land/std@0.220.0/assert/mod.ts";

assertEquals(url.href, "https://deno.land/foo.js");
Deno.test("url test", () => {
    const url = new URL("./foo.js", "https://deno.land/");
});
```

### Valid

```js
import assert from "node:assert";
describe("describe", () => {
    it("it", () => {
        assert.equal()
    })
})
```

```js
describe("describe", () => {
    it("it", () => {
        expect()
    })
})
```

```js
test.each([1, 2, 3])('test', (a, b, expected) => {
    expect(a + b).toBe(expected)
})
```

```js
import { waitFor } from '@testing-library/react';
await waitFor(() => {
  expect(111).toBe(222);
});
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noMisrefactoredShorthandAssign

**Diagnostic Category: `lint/suspicious/noMisrefactoredShorthandAssign`**

**Since**: `v1.3.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: misrefactored_assign_op

Disallow shorthand assign when variable appears on both sides.

This rule helps to avoid potential bugs related to incorrect assignments or unintended side effects that may occur during refactoring.

## Examples

### Invalid

```js
a += a + b
```

```js
a -= a - b
```

```js
a *= a * b
```

### Valid

```js
a += b
```

```js
a = a + b
```

```js
a = a - b
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noMissingVarFunction

Disallow missing var function for css variables.

**Diagnostic Category: `lint/nursery/noMissingVarFunction`**

**Since**: `v1.9.2`

This rule is part of the nursery group.

Sources: 
- Same as: stylelint/custom-property-no-missing-var-function

This rule has the following limitations:

- It only reports custom properties that are defined and accesible within the same source.
- It does not check properties that can contain author-defined identifiers.
- It ignores the following properties:
  - animation
  - animation-name
  - counter-increment
  - counter-reset
  - counter-set
  - grid-column
  - grid-column-end
  - grid-column-start
  - grid-row
  - grid-row-end
  - grid-row-start
  - list-style
  - list-style-type
  - transition
  - transition-property
  - view-transition-name
  - will-change

## Examples

### Invalid

```css
a {
  --foo: red;
  color: --foo;
}
```

CSS variables '--foo' is used without the 'var()' function

```css
.parent {
  --foo: red;
  .child {
    color: --foo;
  }
}
```

CSS variables '--foo' is used without the 'var()' function

```css
@property --bar {}

a {
  color: --bar;
}
```

CSS variables '--bar' is used without the 'var()' function

```css
:root {
  --baz: 0;
}

a {
  --foo: --baz;
}
```

CSS variables '--baz' is used without the 'var()' function

### Valid

```css
p {
  color: var(--foo);
}
```

```css
p {
  --foo: red;
  color: var(--foo);
}
```

```css
p {
  color: --foo;
}
```

```css
*:root {
--global: red;
}

a {
    color: var(--global);
}
```

```css
@property --global-value {}
a {
  color: var(--global-value);
}
```

```css
a {
  view-transition-name: --bbb;
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noMultipleSpacesInRegularExpressionLiterals

**Diagnostic Category: `lint/complexity/noMultipleSpacesInRegularExpressionLiterals`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has a **safe** fix.

Sources: 
- Same as: no-regex-spaces

Disallow unclear usage of consecutive space characters in regular expression literals

## Examples

### Invalid

```js
/   /
```

This regular expression contains unclear uses of consecutive spaces.
It's hard to visually count the amount of spaces.
Safe fix: Use a quantifier instead.
```js
/   / -> /   {3}/
```

```js
/foo  */
```

This regular expression contains unclear uses of consecutive spaces.
It's hard to visually count the amount of spaces.
Safe fix: Use a quantifier instead.
```js
/foo  * -> /foo +/
```

```js
/foo  {2,}bar   {3,5}baz/
```

This regular expression contains unclear uses of consecutive spaces.
It's hard to visually count the amount of spaces.
Safe fix: Use a quantifier instead.
```js
/foo  {2,}bar   {3,5}baz/ -> /foo {3,}bar {5,7}baz/
```

```js
/foo [ba]r  b(a|z)/
```

This regular expression contains unclear uses of consecutive spaces.
It's hard to visually count the amount of spaces.
Safe fix: Use a quantifier instead.
```js
/foo [ba]r  b(a|z)/ -> /foo [ba]r {2}b(a|z)/
```

### Valid

```js
/foo {2}bar/
```

```js
/ foo bar baz /
```

```js
/foo bar	baz/
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noNamespaceImport

Disallow the use of namespace imports.

## Diagnostic Category: `lint/style/noNamespaceImport`

### Since: `v1.6.0`

Sources: 
- Same as: barrel-files/avoid-namespace-import

Namespace imports might impact the efficiency of tree shaking, a process that removes unused code from bundles.
The effectiveness of tree shaking largely depends on the bundler (e.g., Webpack, Rollup) and its configuration.
Modern bundlers are generally capable of handling namespace imports effectively, but using named imports is recommended for optimal tree shaking and minimizing bundle size.

## Examples

### Invalid

```js
import * as foo from "foo";
```

### Error Message

Avoid namespace imports, it can prevent efficient tree shaking and increase bundle size.

### Valid

```ts
import { foo } from "foo"
import type { bar } from "bar"
import type * as baz from "baz"
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noNamespace

Disallow the use of TypeScript's `namespace`s.

Namespaces are an old way to organize your code in TypeScript.
They are not recommended anymore and should be replaced by ES6 modules
(the `import`/`export` syntax).

## Diagnostic Category: `lint/style/noNamespace`

### Since: `v1.0.0`

Sources: 
- Same as: `@typescript-eslint/no-namespace`

## Examples

### Invalid

```ts
module foo {}
```

```text
code-block.ts:1:1 lint/style/noNamespace 
TypeScript's namespaces are an outdated way to organize code.
> 1 │ module foo {}
   │ ^^^^^^^^^^^
ℹ Prefer the ES6 modules (import/export) over namespaces.
```

```ts
declare module foo {}
```

```text
code-block.ts:1:9 lint/style/noNamespace 
TypeScript's namespaces are an outdated way to organize code.
> 1 │ declare module foo {}
   │         ^^^^^^^^^^^
ℹ Prefer the ES6 modules (import/export) over namespaces.
```

```ts
namespace foo {}
```

```text
code-block.ts:1:1 lint/style/noNamespace 
TypeScript's namespaces are an outdated way to organize code.
> 1 │ namespace foo {}
   │ ^^^^^^^^^^^^^^^
ℹ Prefer the ES6 modules (import/export) over namespaces.
```

```ts
declare namespace foo {}
```

```text
code-block.ts:1:9 lint/style/noNamespace 
TypeScript's namespaces are an outdated way to organize code.
> 1 │ declare namespace foo {}
   │         ^^^^^^^^^^^^^^^
ℹ Prefer the ES6 modules (import/export) over namespaces.
```

### Valid

```ts
import foo from 'foo';
export { bar };
```

```ts
declare global {}
```

```ts
declare module 'foo' {}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noNegationElse
Disallow negation in the condition of an `if` statement if it has an `else` clause.

## Diagnostic Category: `lint/style/noNegationElse`

### Since: `v1.0.0`

This rule has a **safe** fix.

Sources: 
- Same as: no-negated-condition
- Same as: if_not_else

## Examples

### Invalid

```js
if (!cond) { f();} else { g();}
```

```js
!cond ? 0 : 1
```

### Valid

```js
if (!cond) { f(); }
```

```js
cond ? 1 : 0
```

```js
if (!cond) { f(); }
```

```js
if (!!val) { f(); } else { g(); }
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noNestedTernary
Disallow nested ternary expressions.

## Diagnostic Category
lint/nursery/noNestedTernary

## Since
v1.9.3

This rule is part of the nursery group.

## Sources
- Same as: no-nested-ternary

## Description
Nesting ternary expressions can make code more difficult to understand.

## Examples

### Invalid

```javascript
const thing = foo ? bar : baz === qux ? quxx : foobar;
```

```javascript
foo ? baz === qux ? quxx() : foobar() : bar();
```

### Valid

```javascript
const thing = foo ? bar : foobar;
```

```javascript
let thing;

if (foo) {
    thing = bar;
} else if (baz === qux) {
    thing = quxx;
} else {
    thing = foobar;
}
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options

# noNewSymbol

Disallow `new` operators with the `Symbol` object.

## Diagnostic Category
lint/correctness/noNewSymbol

### Note
- This rule has an **unsafe** fix.

### Since
v1.0.0

### Sources
- Same as: no-new-symbol

## Description
`Symbol` cannot be instantiated. This results in throwing a `TypeError`.

## Examples

### Invalid
```javascript
var foo = new Symbol('foo');
```

### Valid
```javascript
var bar = Symbol('bar');
function baz() {
    function Symbol() { }
    new Symbol();
}
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options

# noNodejsModules

Forbid the use of Node.js builtin modules.

## Diagnostic Category: `lint/correctness/noNodejsModules`

### Since: `v1.5.0`

Sources: 
- Same as: import/no-nodejs-modules

This can be useful for client-side web projects that don't have access to those modules.

The rule also isn't triggered if there are dependencies declared in the `package.json` that match
the name of a built-in Node.js module.

Type-only imports are ignored.

## Examples

### Invalid

```js
import fs from "fs";
```

```js
import path from "node:path";
```

### Valid

```js
import fs from "fs-custom";
```

```ts
import type path from "node:path";
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noNonNullAssertion

Disallow non-null assertions using the `!` postfix operator.

## Diagnostic Category: `lint/style/noNonNullAssertion`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: `@typescript-eslint/no-non-null-assertion`

TypeScript's `!` non-null assertion operator asserts to the type system that an expression is non-nullable, as
in not `null` or `undefined`. Using assertions to tell the type system new information is often a sign that
code is not fully type-safe. It's generally better to structure program logic so that TypeScript understands
when values may be nullable.

## Examples

### Invalid

```ts
interface Example {
  property?: string;
}
declare const foo: Example;
const includesBaz = foo.property!.includes('baz');
```

```ts
(b!! as number) = "test";
```

### Valid

```ts
interface Example {
  property?: string;
}

declare const foo: Example;
const includesBaz = foo.property?.includes('baz') ?? false;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noNoninteractiveElementToInteractiveRole

**Diagnostic Category: `lint/a11y/noNoninteractiveElementToInteractiveRole`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: jsx-a11y/no-noninteractive-element-to-interactive-role

Enforce that interactive ARIA roles are not assigned to non-interactive HTML elements.

Non-interactive HTML elements indicate _content_ and _containers_ in the user interface.
Non-interactive elements include `<main>`, `<area>`, `<h1>` (,`<h2>`, etc), `<img>`, `<li>`, `<ul>` and `<ol>`.

Interactive HTML elements indicate _controls_ in the user interface.
Interactive elements include `<a href>`, `<button>`, `<input>`, `<select>`, `<textarea>`.

[WAI-ARIA roles](https://www.w3.org/TR/wai-aria-1.1/#usage_intro) should not be used to convert a non-interactive element to an interactive element.
Interactive ARIA roles include `button`, `link`, `checkbox`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `option`, `radio`, `searchbox`, `switch` and `textbox`.

## Examples

### Invalid

```jsx
<h1 role="button">Some text</h1>
```

### Valid

```jsx
<span role="button">Some text</span>
```

## Accessibility guidelines

- WCAG 4.1.2

### Resources

- WAI-ARIA roles
- WAI-ARIA Authoring Practices Guide - Design Patterns and Widgets
- Fundamental Keyboard Navigation Conventions
- Mozilla Developer Network - ARIA Techniques

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noNoninteractiveTabindex

## Diagnostic Category: `lint/a11y/noNoninteractiveTabindex`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: jsx-a11y/no-noninteractive-tabindex

Enforce that `tabIndex` is not assigned to non-interactive HTML elements.

When using the tab key to navigate a webpage, limit it to interactive elements.
You don't need to add tabindex to items in an unordered list as assistive technology can navigate through the HTML.
Keep the tab ring small, which is the order of elements when tabbing, for a more efficient and accessible browsing experience.

## Examples

### Invalid

```jsx
<div tabIndex="0" />
```

```jsx
<div role="article" tabIndex="0" />
```

```jsx
<article tabIndex="0" />
```

### Valid

```jsx
<div />
```

```jsx
<MyButton tabIndex={0} />
```

```jsx
<article tabIndex="-1" />
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noNonoctalDecimalEscape

**Diagnostic Category: `lint/correctness/noNonoctalDecimalEscape`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: no-nonoctal-decimal-escape

Disallow `\8` and `\9` escape sequences in string literals.

Since ECMAScript 2021, the escape sequences \8 and \9 have been defined as non-octal decimal escape sequences.
However, most JavaScript engines consider them to be "useless" escapes. For example:

```js
"\8" === "8"; // true
"\9" === "9"; // true
```

Although this syntax is deprecated, it is still supported for compatibility reasons.
If the ECMAScript host is not a web browser, this syntax is optional.
However, web browsers are still required to support it, but only in non-strict mode.
Regardless of your targeted environment, it is recommended to avoid using these escape sequences in new code.

## Examples

### Invalid

```js
const x = "\8";
```

```js
const x = "Don't use \8 escape.";
```

```js
const x = "Don't use \9 escape.";
```

### Valid

```js
const x = "8";
```

```js
const x = "Don't use \\8 and \\9 escapes.";
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noOctalEscape
Disallow octal escape sequences in string literals

**Diagnostic Category: `lint/nursery/noOctalEscape`**

**Since**: `v1.9.3`

This rule is part of the nursery group.

Sources: 
- Same as: no-octal-escape

Disallow octal escape sequences in string literals

As of the ECMAScript 5 specification, octal escape sequences in string literals are deprecated and should not be used.
Unicode escape sequences should be used instead.

### Examples

### Invalid

```js
var foo = "Copyright \251";
```

```text
code-block.js:1:11 lint/nursery/noOctalEscape ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 
 ⚠ Don't use octal
 
 > 1 │ var foo = "Copyright \251";
   │          ^^^^^^^^^^^^^^^
 
 ℹ Don't use octal escape sequences: "Copyright \251"
 ℹ Use unicode or hexidecimal escape sequences instead.
```

### Valid

```js
var foo = "Copyright \u00A9";   // unicode

var foo = "Copyright \xA9";     // hexadecimal
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noParameterAssign
Disallow reassigning `function` parameters.

## Diagnostic Category: `lint/style/noParameterAssign`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: no-param-reassign

Assignment to a `function` parameters can be misleading and confusing,
as modifying parameters will also mutate the `arguments` object.
It is often unintended and indicative of a programmer error.

In contrast to the _ESLint_ rule, this rule cannot be configured to report
assignments to a property of a parameter.

## Examples

### Invalid

```js
function f(param) {
    param = 13;
}
```

```js
function f(param) {
    param++;
}
```

```js
function f(param) {
    for (param of arr) {}
}
```

```ts
class C {
    constructor(readonly prop: number) {
        prop++
    }
}
```

### Valid

```js
function f(param) {
    let local = param;
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noParameterProperties

Disallow the use of parameter properties in class constructors.

## Diagnostic Category
lint/style/noParameterProperties

## Since
v1.0.0

## Sources
Inspired from: @typescript-eslint/parameter-properties

TypeScript includes a "parameter properties" shorthand for declaring a class constructor parameter and class property in one location.
Parameter properties can confuse those new to TypeScript as they are less explicit than other ways of declaring and initializing class members.
Moreover, private class properties, starting with #, cannot be turned into "parameter properties".
This questions the future of this feature.

## Examples

### Invalid

```ts
class A {
    constructor(readonly name: string) {}
}
```

### Error Message
Use a more explicit class property instead of a parameter property.

### Valid

```ts
class A {
    constructor(name: string) {}
}
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options

# noPositiveTabindex

**Diagnostic Category: `lint/a11y/noPositiveTabindex`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: jsx-a11y/tabindex-no-positive

Prevent the usage of positive integers on `tabIndex` property

Avoid positive `tabIndex` property values to synchronize the flow of the page with keyboard tab order.

## Accessibility guidelines

WCAG 2.4.3

## Examples

### Invalid

```jsx
<div tabIndex={1}>foo</div>
```

```jsx
<div tabIndex={"1"} />
```

```js
React.createElement("div", { tabIndex: 1 })
```

### Valid

```jsx
<div tabIndex="0" />
```

```js
React.createElement("div", { tabIndex: -1 })
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noPrecisionLoss
Disallow literal numbers that lose precision

**Diagnostic Category: `lint/correctness/noPrecisionLoss`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: no-loss-of-precision
- Same as: @typescript-eslint/no-loss-of-precision
- Same as: lossy_float_literal

## Examples

### Invalid

```js
const x = 9007199254740993
```

This number literal will lose precision at runtime.
The value at runtime will be 9007199254740992

```js
const x = 5.123000000000000000000000000001
```

This number literal will lose precision at runtime.
The value at runtime will be 5.123

```js
const x = 0x20000000000001
```

This number literal will lose precision at runtime.
The value at runtime will be 9007199254740992

```js
const x = 0x2_000000000_0001;
```

This number literal will lose precision at runtime.
The value at runtime will be 9007199254740992

### Valid

```js
const x = 12345
const x = 123.456
const x = 123e34
const x = 12300000000000000000000000
const x = 0x1FFFFFFFFFFFFF
const x = 9007199254740991
const x = 9007_1992547409_91
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noProcessEnv
Disallow the use of `process.env`.

## Diagnostic Category: `lint/nursery/noProcessEnv`

### Since: `v1.9.1`

This rule is part of the nursery group.

Sources: 
- Same as: n/no-process-env

Disallow the use of `process.env`.

The `process.env` object in Node.js stores configuration settings. Using it directly throughout a project can cause problems:

1. It's harder to maintain
2. It can lead to conflicts in team development
3. It complicates deployment across multiple servers

A better practice is to keep all settings in one configuration file and reference it throughout the project.

## Examples

### Invalid

```js
if (process.env.NODE_ENV === 'development') {
  // ...
}
```

### Error Message

Don't use `process.env`.
Use a centralized configuration file instead for better maintainability and deployment consistency.

### Valid

```js
const config = require('./config');
if (config.NODE_ENV === 'development') {
  // ...
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noPrototypeBuiltins

Disallow direct use of `Object.prototype` builtins.

## Diagnostic Category: `lint/suspicious/noPrototypeBuiltins`

### Since: `v1.1.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has a **safe** fix.

Sources: 
- Same as: no-prototype-builtins
- Same as: prefer-object-has-own

Disallow direct use of `Object.prototype` builtins.

ECMAScript 5.1 added `Object.create` which allows the creation of an object with a custom prototype.
This pattern is often used for objects used as Maps. However, this pattern can lead to errors
if something else relies on prototype properties/methods.
Moreover, the methods could be shadowed, this can lead to random bugs and denial of service
vulnerabilities. For example, calling `hasOwnProperty` directly on parsed JSON like `{"hasOwnProperty": 1}` could lead to vulnerabilities.
To avoid subtle bugs like this, you should call these methods from `Object.prototype`.
For example, `foo.isPrototypeOf(bar)` should be replaced with `Object.prototype.isPrototypeOf.call(foo, "bar")`
As for the `hasOwn` method, `foo.hasOwn("bar")` should be replaced with `Object.hasOwn(foo, "bar")`.

## Examples

### Invalid

```js
var invalid = foo.hasOwnProperty("bar");
```

```js
var invalid = foo.isPrototypeOf(bar);
```

```js
var invalid = foo.propertyIsEnumerable("bar");
```

```js
Object.hasOwnProperty.call(foo, "bar");
```

### Valid

```js
var valid = Object.hasOwn(foo, "bar");
var valid = Object.prototype.isPrototypeOf.call(foo, bar);
var valid = {}.propertyIsEnumerable.call(foo, "bar");
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noReExportAll

**Diagnostic Category: `lint/performance/noReExportAll`**

**Since**: `v1.6.0`
Sources: 
- Same as: barrel-files/avoid-re-export-all

Avoid re-export all.

Deeply nested import chains in modular projects, where a barrel file imports another barrel file, can lead to increased load times and complexity.
This structure results in the unnecessary loading of many modules, significantly impacting performance in large-scale applications.
Additionally, it complicates the codebase, making it difficult to navigate and understand the project's dependency graph.

## Examples

### Invalid

```js
export * from "foo";
```

Do not use export all ( `export * from ...` ). 
Use named export instead.

```js
export * as foo from "foo";
```

Do not use export all ( `export * from ...` ). 
Use named export instead.

### Valid

```js
export { foo } from "foo";
```

```ts
export type * from "foo";
export type * as bar from "bar";
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noReactSpecificProps

Prevents React-specific JSX properties from being used.

## Diagnostic Category
lint/suspicious/noReactSpecificProps

## Since
v1.7.2

This rule has a safe fix.

## Sources
- Same as: solidjs/no-react-specific-props

This rule is intended for use in JSX-based frameworks (mainly Solid.js) that do not use React-style prop names.

## Examples

### Invalid

```jsx
<Hello className="John" />
```

This JSX attribute is specific to React.

This attribute may not be supported by non-React frameworks, as it is not native to HTML.

Safe fix: Replace this attribute name with "class"

```diff
- <Hello className="John" />
+ <Hello class="John" />
```

### Valid

```jsx
<Hello class="Doe" />
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options

# noRedeclare

Disallow variable, function, class, and type redeclarations in the same scope.

## Diagnostic Category: `lint/suspicious/noRedeclare`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

### Sources

- Same as: no-redeclare
- Same as: @typescript-eslint/no-redeclare

Disallow variable, function, class, and type redeclarations in the same scope.

## Examples

### Invalid

```javascript
var a = 3;
var a = 10;
```

```javascript
let a = 3;
let a = 10;
```

```javascript
function f() {}
function f() {}
```

```javascript
class C {
    static {
        var c = 3;
        var c = 10;
    }
}
```

```typescript
type Person = { name: string; }
class Person { name: string; }
```

### Valid

```javascript
var a = 3;
a = 10;
```

```typescript
class Foo {
    bar(a: A);
    bar(a: A, b: B);
    bar(a: A, b: B) {}
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noRedundantAlt

**Diagnostic Category: `lint/a11y/noRedundantAlt`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: jsx-a11y/img-redundant-alt

Enforce `img` alt prop does not contain the word "image", "picture", or "photo".

The rule will first check if `aria-hidden` is truthy to determine whether to enforce the rule. If the image is hidden, then the rule will always succeed.

## Examples

### Invalid

```jsx
<img src="src" alt="photo content" />;
```

```jsx
<img alt={`picture doing ${things}`} {...this.props} />;
```

```jsx
<img alt="picture of cool person" aria-hidden={false} />;
```

### Valid

```jsx
<>
	<img src="src" alt="alt" />
	<img src="src" alt={photo} />
	<img src="bar" aria-hidden alt="Picture of me taking a photo of an image" />
</>
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noRedundantRoles

**Diagnostic Category: `lint/a11y/noRedundantRoles`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: jsx-a11y/no-redundant-roles

Enforce explicit `role` property is not the same as implicit/default role property on an element.

## Examples

### Invalid

```jsx
<article role='article'></article>
```

```jsx
<button role='button'></button>
```

```jsx
<h1 role='heading' aria-level='1'>title</h1>
```

### Valid

```jsx
<article role='presentation'></article>
```

```jsx
<Button role='button'></Button>
```

```jsx
<span></span>
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noRedundantUseStrict

**Diagnostic Category: `lint/suspicious/noRedundantUseStrict`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has a **safe** fix.

Prevents from having redundant `"use strict"`.

The directive `"use strict"` **isn't** needed in `.mjs` files, or in `.js` files inside projects where the `package.json` defines library as module:

```json
{
   "type": "module"
}
```

Instead, `.cjs` files are considered "scripts" and the directive `"use strict"` is accepted and advised.

Note that the leading trivia, e.g., comments or newlines preceding
the redundant `"use strict"` will also be removed. So that comment
directives won't be transferred to a wrong place.

## Examples

### Invalid

```cjs
"use strict";
function foo() {
 	"use strict";
}
```

```cjs
"use strict";
"use strict";

function foo() {

}
```

```cjs
function foo() {
"use strict";
"use strict";
}
```

```cjs
class C1 {
	test() {
		"use strict";
	}
};
```

```cjs
const C2 = class {
	test() {
		"use strict";
	}
};
```

### Valid

```cjs
function foo() {

}
```

```cjs
 function foo() {
    "use strict";
}
function bar() {
    "use strict";
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noRenderReturnValue

Diagnostic Category: `lint/correctness/noRenderReturnValue`

**Since**: `v1.0.0`

Prevent the usage of the return value of `React.render`.

`ReactDOM.render()` currently returns a reference to the root `ReactComponent` instance. However, using this return value is legacy and should be avoided because future versions of React may render components asynchronously in some cases. If you need a reference to the root `ReactComponent` instance, the preferred solution is to attach a callback ref to the root element.

Source: ReactDOM documentation https://facebook.github.io/react/docs/react-dom.html#render

## Examples

### Invalid

```jsx
const foo = ReactDOM.render(<div />, document.body);
```

### Error Message

Do not depend on the value returned by the function `ReactDOM.render()`. The returned value is legacy and future versions of React might return that value asynchronously. Check the React documentation for more information.

### Valid

```jsx
ReactDOM.render(<div />, document.body);
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noRestrictedGlobals

This rule allows you to specify global variable names that you don’t want to use in your application.

## Diagnostic Category
lint/style/noRestrictedGlobals

## Since
v1.0.0

## Sources
- Same as: no-restricted-globals

This rule allows you to specify global variable names that you don’t want to use in your application.

Disallowing usage of specific global variables can be useful if you want to allow a set of global variables by enabling an environment, but still want to disallow some of those.

## Examples

### Invalid
```js
console.log(event)
```

### Diagnostic
Do not use the global variable event.
Use a local variable instead.

### Valid
```js
function f(event) {
    console.log(event)
}
```

## Options
Use the options to specify additional globals that you want to restrict in your source code.

```json
{
    "options": {
        "deniedGlobals": ["$", "MooTools"]
    }
}
```

In the example above, the rule will emit a diagnostics if tried to use `$` or `MooTools` without creating a local variable.

## Related links
- Disable a rule
- Configure the rule fix
- Rule options

# noRestrictedImports

Disallow specified modules when loaded by import or require.

## Diagnostic Category
lint/nursery/noRestrictedImports

## Since
v1.6.0

This rule is part of the nursery group.

## Sources
- Same as: no-restricted-imports
- Same as: @typescript-eslint/no-restricted-imports

## Options
```json
{
    "noRestrictedImports": {
        "options": {
            "paths": {
                "lodash": "Using lodash is not encouraged",
                "underscore": "Using underscore is not encouraged"
            }
        }
    }
}
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options

# noRestrictedTypes

**Diagnostic Category: `lint/nursery/noRestrictedTypes`**

**Since**: `v1.9.0`

:::note
- This rule has a **safe** fix.
:::

:::caution
This rule is part of the nursery group.
:::

Sources: 
- Same as: @typescript-eslint/no-restricted-types

Disallow user defined types. This rule allows you to specify type names that you don’t want to use in your application. To prevent the use of commonly misleading types, refer to noBannedTypes.

## Options

Use the options to specify additional types that you want to restrict in your source code.

```json
{
    "//": "...",
    "options": {
        "types": {
           "Foo": {
              "message": "Only bar is allowed",
              "use": "bar"
            },
            "OldAPI": "Use NewAPI instead"
        }
    }
}
```

In the example above, the rule will emit diagnostics if `Foo` or `OldAPI` are used.

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noSecrets

**Description**: Disallow usage of sensitive data such as API keys and tokens.

**Diagnostic Category**: `lint/nursery/noSecrets`

**Since**: `v1.9.0`

**Caution**: This rule is part of the nursery group.

**Sources**: Inspired from: no-secrets/no-secrets

This rule checks for high-entropy strings and matches common patterns for secrets, including AWS keys, Slack tokens, and private keys. It helps users identify potential secret leaks in their codebase.

## Detected Secrets

Patterns detected include:

- **JSON Web Token (JWT)**: Tokens in the format of `ey...`
- **Base64-encoded JWT**: Base64-encoded JWT tokens
- **Slack Token**: Tokens like `xox[baprs]-...`
- **Slack Webhook URL**: URLs like `https://hooks.slack.com/services/...`
- **GitHub Token**: Tokens with lengths between 35-40 characters
- **Twitter OAuth Token**: Tokens with lengths between 35-44 characters
- **Facebook OAuth Token**: Tokens up to 42 characters
- **Google OAuth Token**: Tokens in the format `ya29...`
- **AWS API Key**: Keys starting with `AKIA` followed by 16 alphanumeric characters
- **Passwords in URLs**: Passwords in URL credentials
- **Google Service Account**: JSON structure with service-account identifier
- **Twilio API Key**: Keys starting with `SK...` followed by 32 characters
- **RSA Private Key**: Key blocks starting with `-----BEGIN RSA PRIVATE KEY-----`
- **OpenSSH Private Key**: Key blocks starting with `-----BEGIN OPENSSH PRIVATE KEY-----`
- **DSA Private Key**: Key blocks starting with `-----BEGIN DSA PRIVATE KEY-----`
- **EC Private Key**: Key blocks starting with `-----BEGIN EC PRIVATE KEY-----`
- **PGP Private Key Block**: Key blocks starting with `-----BEGIN PGP PRIVATE KEY BLOCK-----`

## Entropy Check

A string entropy checker is used to catch potential secrets based on their randomness. The entropy checker is configurable through the Options.

## Disclaimer

This rule helps with common cases but is not exhaustive. Always review your code and consider additional security measures, such as automated secret scanning in your CI/CD and git pipeline.

## Recommendations

Recommended tools for comprehensive secret detection:

- SonarQube: Clean Code scanning solution with a secret scanner (Community version).
- Gitleaks: A mature secret scanning tool.
- Trufflehog: A tool for finding secrets in git history.
- Sensleak: A Rust-based solution for secret detection.

## Examples

### Invalid

```js
const secret = "AKIA1234567890EXAMPLE";
```

Potential secret found. Type of secret detected: AWS API Key. Storing secrets in source code is a security risk. Consider the following steps:
1. Remove the secret from your code.
2. Use environment variables or a secure secret management system.
3. If this is a false positive, consider adding an inline disable comment or tweaking the entropy threshold.

### Valid

```js
const nonSecret = "hello world";
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noSelfAssign

**Description:** Disallow assignments where both sides are exactly the same.

**Diagnostic Category:** `lint/correctness/noSelfAssign`

**Since:** `v1.0.0`

**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:**
- Same as: no-self-assign (https://eslint.org/docs/latest/rules/no-self-assign)
- Same as: self_assignment (https://rust-lang.github.io/rust-clippy/master/#/self_assignment)

Self assignments have no effect and are likely errors due to incomplete refactoring.

## Examples

### Invalid

```js
a = a;
```
code-block.js:1:5 lint/correctness/noSelfAssign ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ a is assigned to itself.  
1 │ a = a;  
  │    ^  
2 │  

ℹ This is where is assigned.  
1 │ a = a;  
  │    ^  
2 │  

```js
[a] = [a];
```
code-block.js:1:8 lint/correctness/noSelfAssign ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ a is assigned to itself.  
1 │ [a] = [a];  
  │       ^  
2 │  

ℹ This is where is assigned.  
1 │ [a] = [a];  
  │       ^  
2 │  

```js
({a: b} = {a: b});
```
code-block.js:1:15 lint/correctness/noSelfAssign ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ b is assigned to itself.  
1 │ ({a: b} = {a: b});  
  │              ^  
2 │  

ℹ This is where is assigned.  
1 │ ({a: b} = {a: b});  
  │              ^  
2 │  

```js
a.b = a.b;
```
code-block.js:1:9 lint/correctness/noSelfAssign ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ b is assigned to itself.  
1 │ a.b = a.b;  
  │        ^  
2 │  

ℹ This is where is assigned.  
1 │ a.b = a.b;  
  │      ^  
2 │  

```js
a[b] = a[b];
```
code-block.js:1:10 lint/correctness/noSelfAssign ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ b is assigned to itself.  
1 │ a[b] = a[b];  
  │         ^  
2 │  

ℹ This is where is assigned.  
1 │ a[b] = a[b];  
  │      ^  
2 │  

```js
a[b].foo = a[b].foo;
```
code-block.js:1:17 lint/correctness/noSelfAssign ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ foo is assigned to itself.  
1 │ a[b].foo = a[b].foo;  
  │                ^  
2 │  

ℹ This is where is assigned.  
1 │ a[b].foo = a[b].foo;  
  │      ^  
2 │  

```js
a['b'].foo = a['b'].foo;
```
code-block.js:1:21 lint/correctness/noSelfAssign ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ foo is assigned to itself.  
1 │ a['b'].foo = a['b'].foo;  
  │                    ^  
2 │  

ℹ This is where is assigned.  
1 │ a['b'].foo = a['b'].foo;  
  │       ^  
2 │  

### Valid

```js
a &= a;
var a = a;
let a = a;
const a = a;
[a, b] = [b, a];
```

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)

# noSelfCompare

**Description:** Disallow comparisons where both sides are exactly the same.

**Diagnostic Category:** `lint/suspicious/noSelfCompare`

**Since:** `v1.0.0`

**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:**
- Same as: no-self-compare (https://eslint.org/docs/latest/rules/no-self-compare)
- Same as: eq_op (https://rust-lang.github.io/rust-clippy/master/#/eq_op)

Disallow comparisons where both sides are exactly the same. Comparing a variable against itself is usually an error, either a typo or refactoring error. It is confusing to the reader and may potentially introduce a runtime error.

The only time you would compare a variable against itself is when testing for `NaN`. However, it is more appropriate to use `typeof x === 'number' && Number.isNaN(x)` for that use case.

## Examples

### Invalid

```js
if (x === x) {}
```
code-block.js:1:5 lint/suspicious/noSelfCompare ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ Comparing to itself is potentially pointless.  
> 1 │ if (x === x) {}  
> 2 │  

```js
if (a.b.c() !== a.b.c()) {}
```
code-block.js:1:5 lint/suspicious/noSelfCompare ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ Comparing to itself is potentially pointless.  
> 1 │ if (a.b.c() !== a.b.c()) {}  
> 2 │  

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)

# noSetterReturn

**Description:** Disallow returning a value from a setter.

**Diagnostic Category:** `lint/correctness/noSetterReturn`

**Since:** `v1.0.0`

**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:** Same as: no-setter-return (https://eslint.org/docs/latest/rules/no-setter-return)

Returning a value from a setter is unnecessary or a possible error, as the returned value is ignored. Only returning without a value is allowed.

## Examples

### Invalid

```js
class A {
    set foo(x) {
        return x;
    }
}
```
**Error:** The setter should not return a value.

```js
const b = {
    set foo(x) {
        return x;
    },
};
```
**Error:** The setter should not return a value.

```js
const c = {
    set foo(x) {
        if (x) {
            return x;
        }
    },
};
```
**Error:** The setter should not return a value.

### Valid

```js
// early-return
class A {
    set foo(x) {
        if (x) {
            return;
        }
    }
}
```

```js
// not a setter
class B {
  set(x) {
    return x;
  }
}
```

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)

# noShadowRestrictedNames

**Disallow identifiers from shadowing restricted names.**

**Diagnostic Category:** `lint/suspicious/noShadowRestrictedNames`

**Since:** `v1.0.0`

**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:** Same as: no-shadow-restricted-names (https://eslint.org/docs/latest/rules/no-shadow-restricted-names)

## Examples

### Invalid

```js
function NaN() {}
```
```
code-block.js:1:10 lint/suspicious/noShadowRestrictedNames ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Do not shadow the global "NaN" property.
1 │ function NaN() {}
  │         ^^^
2 │
ℹ Consider renaming this variable. It's easy to confuse the origin of variables when they're named after a known global.
```

```js
let Set;
```
```
code-block.js:1:5 lint/suspicious/noShadowRestrictedNames ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Do not shadow the global "Set" property.
1 │ let Set;
  │     ^^
2 │
ℹ Consider renaming this variable. It's easy to confuse the origin of variables when they're named after a known global.
```

```js
try {} catch(Object) {}
```
```
code-block.js:1:15 lint/suspicious/noShadowRestrictedNames ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Do not shadow the global "Object" property.
1 │ try {} catch(Object) {}
  │            ^^^^^
2 │
ℹ Consider renaming this variable. It's easy to confuse the origin of variables when they're named after a known global.
```

```js
function Array() {}
```
```
code-block.js:1:10 lint/suspicious/noShadowRestrictedNames ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Do not shadow the global "Array" property.
1 │ function Array() {}
  │         ^^^
2 │
ℹ Consider renaming this variable. It's easy to confuse the origin of variables when they're named after a known global.
```

```js
function test(JSON) {console.log(JSON)}
```
```
code-block.js:1:15 lint/suspicious/noShadowRestrictedNames ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Do not shadow the global "JSON" property.
1 │ function test(JSON) {console.log(JSON)}
  │              ^^^
2 │
ℹ Consider renaming this variable. It's easy to confuse the origin of variables when they're named after a known global.
```

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)

# noShorthandPropertyOverrides

**Description:** Disallow shorthand properties that override related longhand properties.

**Diagnostic Category:** `lint/suspicious/noShorthandPropertyOverrides`

**Since:** `v1.8.2`

**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:** Same as: stylelint/declaration-block-no-shorthand-property-overrides

Disallow shorthand properties that override related longhand properties. For details on shorthand properties, see the MDN web docs: developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties.

## Examples

### Invalid

```css
a { padding-left: 10px; padding: 20px; }
```

**Error Message:**
code-block.css:1:25 lint/suspicious/noShorthandPropertyOverrides ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ Unexpected shorthand property **padding** after **padding-left**  
> 1 │ a { padding-left: 10px; padding: 20px; }  
>   │                        ^^^^^^^^  
> 2 │  

### Valid

```css
a { padding: 10px; padding-left: 20px; }
```

```css
a { transition-property: opacity; } a { transition: opacity 1s linear; }
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noShoutyConstants

**Description:** Disallow the use of constants which its value is the upper-case version of its name.

**Diagnostic Category:** `lint/style/noShoutyConstants`

**Since:** `v1.0.0`

:::note
- This rule has an **unsafe** fix.
:::

## Examples

### Invalid

```js
const FOO = "FOO";
console.log(FOO);
```

**Error Message:**
code-block.js:1:7 lint/style/noShoutyConstants FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Redundant constant declaration.

1 │ const FOO = "FOO";
2 │ console.log(FOO);

ℹ Used here.

1 │ const FOO = "FOO";
2 │ console.log(FOO);

ℹ You should avoid declaring constants with a string that's the same value as the variable name. It introduces a level of unnecessary indirection when it's only two additional characters to inline.

ℹ Unsafe fix: Use the constant value directly

1 │ - const FOO = "FOO";
2 │ - console.log(FOO);
3 │ + console.log("FOO");

### Valid

```js
let FOO = "FOO";
console.log(FOO);
```

```js
export const FOO = "FOO";
console.log(FOO);
```

```js
function f(FOO = "FOO") {
    return FOO;
}
```

## Related links

- Disable a rule: biomesjs.dev/linter/#disable-a-lint-rule
- Configure the rule fix: biomesjs.dev/linter#configure-the-rule-fix
- Rule options: biomesjs.dev/linter/#rule-options

# noSkippedTests

**Diagnostic Category: `lint/suspicious/noSkippedTests`**

**Since**: `v1.6.0`

:::note
- This rule has an **unsafe** fix.
:::

Sources: 
- Inspired from: jest/no-disabled-tests documentation

Disallow disabled tests. Disabled tests are useful for development and debugging but should not be committed in production.

## Examples

### Invalid

```js
describe.skip("test", () => {});
```
```
code-block.js:1:10 lint/suspicious/noSkippedTests FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Don't disable tests.

> 1 │ describe.skip("test", () => {});
   │         ^^^^
2 │ 

ℹ Disabling tests is useful when debugging or creating placeholders while working.

ℹ If this is intentional, and you want to commit a disabled test, add a suppression comment.

ℹ Unsafe fix: Enable the test.

1 │ describe("test", () => {});
   │        -----
```

```js
test.skip("test", () => {});
```
```
code-block.js:1:6 lint/suspicious/noSkippedTests FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Don't disable tests.

> 1 │ test.skip("test", () => {});
   │     ^^^^
2 │ 

ℹ Disabling tests is useful when debugging or creating placeholders while working.

ℹ If this is intentional, and you want to commit a disabled test, add a suppression comment.

ℹ Unsafe fix: Enable the test.

1 │ test("test", () => {});
   │    -----
```

## Valid

```js
test.only("test", () => {});
test("test", () => {});
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noSparseArray

**Description:** Disallow sparse arrays

**Diagnostic Category:** `lint/suspicious/noSparseArray`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:** 
- Same as: no-sparse-arrays documentation

## Disallow sparse arrays

### Examples

#### Invalid

```js
[1,,2]
```

**Error Message:**
code-block.js:1:1 lint/suspicious/noSparseArray FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ This array contains an empty slot.

> 1 │ [1,,2]  
  │ ^^^^^  
  2 │  

ℹ Unsafe fix: Replace hole with undefined

> 1 │ [1, undefined,2]  
  │ ++++++++++  

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noStaticElementInteractions

**Diagnostic Category: `lint/nursery/noStaticElementInteractions`**

**Since**: `v1.9.0`

:::caution
This rule is part of the nursery group.
:::

Sources: 
- Same as: jsx-a11y/no-static-element-interactions

Enforce that static, visible elements (such as `<div>`) with click handlers use a valid role attribute. Static HTML elements lack semantic meaning, evident in `<div>` and `<span>`, and also in elements like `<a>` without an href attribute, `<meta>`, `<script>`, `<picture>`, `<section>`, and `<colgroup>`. 

The WAI-ARIA role attribute provides semantic mapping to an element, which can be conveyed to users via assistive technology. To add interactivity to a static element, it must have a role value.

## Examples

### Invalid

```jsx
<div onClick={() => {}}></div>;
```
```
code-block.jsx:1:1 lint/nursery/noStaticElementInteractions ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Static Elements should not be interactive.

> 1 │ <div onClick={() => {}}></div>;
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ To add interactivity such as a mouse or key event listener to a static element, give the element an appropriate role value.
```

```jsx
<span onClick={() => {}}></span>;
```
```
code-block.jsx:1:1 lint/nursery/noStaticElementInteractions ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Static Elements should not be interactive.

> 1 │ <span onClick={() => {}}></span>;
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ To add interactivity such as a mouse or key event listener to a static element, give the element an appropriate role value.
```

When `<a>` lacks the "href" attribute, it is non-interactive.

```jsx
<a onClick={() => {}}></a>
```
```
code-block.jsx:1:1 lint/nursery/noStaticElementInteractions ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Static Elements should not be interactive.

> 1 │ <a onClick={() => {}}></a>
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ To add interactivity such as a mouse or key event listener to a static element, give the element an appropriate role value.
```

### Valid

```jsx
<>
    <div role="button" onClick={() => {}}></div>
    <span role="scrollbar" onClick={() => {}}></span>
    <a href="http://example.com" onClick={() => {}}></a>
</>
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noStaticOnlyClass

**Description:** This rule reports when a class has no non-static members, such as for a class used exclusively as a static namespace.

**Diagnostic Category:** `lint/complexity/noStaticOnlyClass`

**Since:** `v1.0.0`

**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:**
- Same as: @typescript-eslint/no-extraneous-class
- Same as: unicorn/no-static-only-class

Users coming from an OOP paradigm may wrap utility functions in a class instead of placing them at the top level of an ECMAScript module. This is generally unnecessary in JavaScript and TypeScript projects.

- Wrapper classes add cognitive complexity without structural improvements.
- IDEs provide poorer suggestions for static class or namespace imported properties.
- Static analysis for unused variables is more difficult when they are all on the class.

## Examples

### Invalid

```js
class X {
  static foo = false;
  static bar() {};
}
```

**Error:**
code-block.js:1:1 lint/complexity/noStaticOnlyClass ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ Avoid classes that contain only static members.  
ℹ Prefer using simple functions instead of classes with only static members.

```js
class StaticConstants {
  static readonly version = 42;

  static isProduction() {
    return process.env.NODE_ENV === 'production';
  }
}
```

**Error:**
code-block.js:2:10 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ 'readonly' modifier can only be used in TypeScript files.

### Valid

```js
const X = {
  foo: false,
  bar() {}
};
```

```js
export const version = 42;

export function isProduction() {
  return process.env.NODE_ENV === 'production';
}

function logHelloWorld() {
  console.log('Hello, world!');
}
```

```js
class Empty {}
```

## Notes on Mutating Variables

Be cautious with exporting mutable variables. Class properties can be mutated externally, while exported variables are constant. Writing to an exported variable is rare and often considered a code smell. Use getter and setter functions if necessary:

```js
export class Utilities {
  static mutableCount = 1;
  static incrementCount() {
    Utilities.mutableCount += 1;
  }
}
```

**Error:**
code-block.js:1:8 lint/complexity/noStaticOnlyClass ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ Avoid classes that contain only static members.  
ℹ Prefer using simple functions instead of classes with only static members.

Instead, do this:

```js
let mutableCount = 1;

export function getMutableCount() {
  return mutableCount;
}

export function incrementCount() {
  mutableCount += 1;
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noStringCaseMismatch

**Description:** Disallow comparison of expressions modifying the string case with non-compliant value.

**Diagnostic Category:** `lint/correctness/noStringCaseMismatch`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:** 
- Same as: match_str_case_mismatch (https://rust-lang.github.io/rust-clippy/master/#/match_str_case_mismatch)

## Examples

### Invalid

```js
if (s.toUpperCase() === "Abc") {}
```
**Error:** This expression always returns false.

```js
while (s.toLowerCase() === "Abc") {}
```
**Error:** This expression always returns false.

### Valid

```js
if (s.toUpperCase() === "ABC") {}
while (s.toLowerCase() === "abc") {}
for (;s.toLocaleLowerCase() === "ABC";) {}
while (s.toLocaleUpperCase() === "abc") {}
for (let s = "abc"; s === "abc"; s = s.toUpperCase()) {}
```

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)

# noSubstr

**Description:** Enforce the use of `String.slice()` over `String.substr()` and `String.substring()`.

**Diagnostic Category:** `lint/nursery/noSubstr`

**Since:** `v1.8.2`

:::note
- This rule has an **unsafe** fix.
:::

:::caution
This rule is part of the nursery group.
:::

**Sources:** 
- Same as: unicorn/prefer-string-slice (https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-slice.md)

`String.slice()` is preferred over `String.substr()` and `String.substring()` due to its clearer behavior and consistent counterpart in arrays. 

Note that `String.substr`, `String.substring`, and `String.slice` behave differently with arguments. For detailed differences, refer to the MDN documentation:

- The difference between substring() and substr (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring#the_difference_between_substring_and_substr)
- Differences between substring() and slice (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring#differences_between_substring_and_slice)

## Examples

### Invalid

```js
foo.substr();
```
```
code-block.js:1:5 lint/nursery/noSubstr FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Avoid using substr and consider using slice instead.

> 1 │ foo.substr();
   │    ^^^^^^
2 │ 

ℹ slice is more commonly used and has a less surprising behavior.

ℹ See MDN web docs for more details.

ℹ Unsafe fix: Use .slice() instead.

1 │ -foo.substr();
   │ +foo.slice();
2 │ 
```

```js
foo.substring();
```
```
code-block.js:1:5 lint/nursery/noSubstr FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Avoid using substring and consider using slice instead.

> 1 │ foo.substring();
   │    ^^^^^^^^^^
2 │ 

ℹ slice is more commonly used and has a less surprising behavior.

ℹ See MDN web docs for more details.

ℹ Unsafe fix: Use .slice() instead.

1 │ -foo.substring();
   │ +foo.slice();
2 │ 
```

### Valid

```js
foo.slice(beginIndex, endIndex);
```

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)

# noSuspiciousSemicolonInJsx

**Diagnostic Category: `lint/suspicious/noSuspiciousSemicolonInJsx`**

**Since**: `v1.6.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code. It detects possible "wrong" semicolons inside JSX elements. Semicolons that appear after a self-closing element or a closing element are usually the result of a typo or a refactor gone wrong.

## Examples

### Invalid

```jsx
const Component = () => {
  return (
    <div>
      <div />;
    </div>
 );
}
```

**Error Message:**
code-block.jsx:4:14 lint/suspicious/noSuspiciousSemicolonInJsx ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ There is a suspicious semicolon in the JSX element.  
2 │ return (  
3 │ <div>  
4 │ <div />;  
   │ ^  
5 │ </div>  
6 │ );  
7 │ }  

ℹ This is usually the result of a typo or some refactor gone wrong.  
ℹ Remove the semicolon, or move it inside a JSX element.  

### Valid

```jsx
const Component = () => {
  return (
    <div>
      <div />
      ;
    </div>
  );
}
const Component2 = () => {
  return (
    <div>
      <span>;</span>
    </div>
  );
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# Introduction

**Diagnostic Category: `lint/a11y/noSvgWithoutTitle`**

**Since**: `v1.0.0`

This rule enforces the usage of the `title` element for the `svg` element. A diagnostic error will appear when linting your code.

To make SVG accessible, you can:

- Provide the `title` element as the first child of `svg`.
- Use `role="img"` and `aria-label` or `aria-labelledby` on `svg`.

## Examples

### Invalid

```jsx
<svg>foo</svg>
```
Error: Alternative text title element cannot be empty.

```jsx
<svg>
    <title></title>
    <circle />
</svg>
```
Error: Alternative text title element cannot be empty.

```jsx
<svg role="img" aria-label="">
    <span id="">Pass</span>
</svg>
```

```jsx
<svg role="presentation">foo</svg>
```

### Valid

```jsx
<svg>
    <rect />
    <rect />
    <g>
        <circle />
        <circle />
        <g>
            <title>Pass</title>
            <circle />
            <circle />
        </g>
    </g>
</svg>
```

```jsx
<svg>
    <title>Pass</title>
    <circle />
</svg>
```

```jsx
<svg role="img" aria-labelledby="title">
    <span id="title">Pass</span>
</svg>
```

```jsx
<svg role="img" aria-label="title">
    <span id="title">Pass</span>
</svg>
```

```jsx
<svg role="graphics-symbol"><rect /></svg>
```

```jsx
<svg role="graphics-symbol img"><rect /></svg>
```

```jsx
<svg aria-hidden="true"><rect /></svg>
```

## Accessibility guidelines

- Document Structure – SVG 1.1 (Second Edition) https://www.w3.org/TR/SVG11/struct.html#DescriptionAndTitleElements
- ARIA: img role - Accessibility | MDN https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/img_role
- Accessible SVGs | CSS-Tricks https://css-tricks.com/accessible-svgs/
- Contextually Marking up accessible images and SVGs | scottohara.me https://www.scottohara.me/blog/2019/05/22/contextual-images-svgs-and-a11y.html
- Accessible SVGs https://www.unimelb.edu.au/accessibility/techniques/accessible-svgs

## Related links

- Disable a rule https://biomejs.dev/linter/#disable-a-lint-rule
- Configure the rule fix https://biomejs.dev/linter#configure-the-rule-fix
- Rule options https://biomejs.dev/linter/#rule-options

# noSwitchDeclarations

**Description:** Disallow lexical declarations in `switch` clauses.

**Diagnostic Category:** `lint/correctness/noSwitchDeclarations`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:** Same as: no-case-declarations (https://eslint.org/docs/latest/rules/no-case-declarations)

Lexical declarations in `switch` clauses are accessible in the entire `switch`. However, they are only initialized when assigned, which occurs only if the `switch` clause where they are defined is reached. To ensure that lexical declarations apply only to the current `switch` clause, wrap your declarations in a block.

## Examples

### Invalid

```js
switch (foo) {
    case 0:
        const x = 1;
        break;
    case 2:
        x; // `x` can be used while it is not initialized
        break;
}
```

**Error:**
Other switch clauses can erroneously access this declaration. Wrap the declaration in a block to restrict its access to the switch clause.

### Invalid

```js
switch (foo) {
    case 0:
        function f() {}
        break;
    case 2:
        f(); // `f` can be called here
        break;
}
```

**Error:**
Other switch clauses can erroneously access this declaration. Wrap the declaration in a block to restrict its access to the switch clause.

### Invalid

```js
switch (foo) {
    case 0:
        class A {}
        break;
    default:
        new A(); // `A` can be instantiated here
        break;
}
```

**Error:**
Other switch clauses can erroneously access this declaration. Wrap the declaration in a block to restrict its access to the switch clause.

### Valid

```js
switch (foo) {
    case 0: {
        const x = 1;
        break;
    }
    case 1:
        // `x` is not visible here
        break;
}
```

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)

# noTemplateCurlyInString

**Description:** Disallow template literal placeholder syntax in regular strings.

**Diagnostic Category:** `lint/nursery/noTemplateCurlyInString`

**Since:** `v1.9.3`

**Caution:** This rule is part of the nursery group.

**Sources:** Same as: no-template-curly-in-string (https://eslint.org/docs/latest/rules/no-template-curly-in-string)

## Overview

ECMAScript 6 allows the creation of strings containing variables or expressions using template literals. Incorrect usage of quotes can lead to unintended literal values instead of evaluated expressions.

## Examples

### Invalid

```js
const a = "Hello ${name}!";
```
```
code-block.js:1:18 lint/nursery/noTemplateCurlyInString ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠ Unexpected template string placeholder.
> 1 │ const a = "Hello ${name}!";
   │                 ^^^^^^^^
ℹ Turn the string into a template string.
```

```js
const a = 'Hello ${name}!';
```
```
code-block.js:1:18 lint/nursery/noTemplateCurlyInString ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠ Unexpected template string placeholder.
> 1 │ const a = 'Hello ${name}!';
   │                 ^^^^^^^^
ℹ Turn the string into a template string.
```

```js
const a = "Time: ${12 * 60 * 60 * 1000}";
```
```
code-block.js:1:18 lint/nursery/noTemplateCurlyInString ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠ Unexpected template string placeholder.
> 1 │ const a = "Time: ${12 * 60 * 60 * 1000}";
   │                 ^^^^^^^^^^^^^^^^^^^
ℹ Turn the string into a template string.
```

### Valid

```js
const a = `Hello ${name}!`;
const a = `Time: ${12 * 60 * 60 * 1000}`;
const a = templateFunction`Hello ${name}`;
```

## Related Links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)

# noThenProperty

**Description:** Disallow `then` property.

**Diagnostic Category:** `lint/suspicious/noThenProperty`

**Since:** `v1.5.0`

**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:** Same as: unicorn/no-thenable (https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-thenable.md)

## Disallow `then` property

When combining objects with a `then` method (thenable objects) with await expressions or dynamic imports, caution is necessary. These syntaxes interpret the object's then method as intended for the resolution or rejection of a promise, which can lead to unexpected behavior or errors.

## Examples

### Invalid

```js
export {then};
```
```
code-block.js:1:9 lint/suspicious/noThenProperty ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Do not export then.
1 │ export {then};
```

```js
const foo = {
    then() {}
};
```
```
code-block.js:2:5 lint/suspicious/noThenProperty ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Do not add then to an object.
1 │ const foo = {
2 │     then() {}
```

```js
const foo = {
    get then() {}
};
```
```
code-block.js:2:9 lint/suspicious/noThenProperty ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Do not add then to an object.
1 │ const foo = {
2 │     get then() {}
```

```js
foo.then = function () {}
```
```
code-block.js:1:1 lint/suspicious/noThenProperty ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Do not add then to an object.
1 │ foo.then = function () {}
```

```js
class Foo {
    then() {}
}
```
```
code-block.js:2:5 lint/suspicious/noThenProperty ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Do not add then to a class.
1 │ class Foo {
2 │     then() {}
```

```js
class Foo {
    static then() {}
}
```
```
code-block.js:2:12 lint/suspicious/noThenProperty ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Do not add then to a class.
1 │ class Foo {
2 │     static then() {}
```

### Valid

```js
export {then as success};
```

```js
const foo = {
    success() {}
};
```

```js
class Foo {
    success() {}
}
```

```js
const foo = bar.then;
```

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)

# Introduction

**Diagnostic Category: `lint/complexity/noThisInStatic`**

**Since**: `v1.3.1`

**Note**:
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

Sources: 
- Same as: @mysticatea/no-this-in-static (https://github.com/mysticatea/eslint-plugin/blob/master/docs/rules/no-this-in-static.md)

Disallow `this` and `super` in `static` contexts.

In JavaScript, `this` in static contexts refers to the class instance, not an instance of the class. This can confuse developers from other languages. Similarly, `super` in static contexts refers to the parent class, not an instance of the class. This rule enforces using the class name to access static methods, making the code clearer and less prone to errors.

## Example

### Invalid

```js
class A {
    static CONSTANT = 0;

    static foo() {
        this.CONSTANT;
    }
}
```

Diagnostic:
```
code-block.js:5:9 lint/complexity/noThisInStatic FIXABLE
✖ Using this in a static context can be confusing.
4 │ static foo() {
> 5 │ this.CONSTANT;
   │ ^^^^
6 │ }
7 │ }
ℹ this refers to the class.
ℹ Unsafe fix: Use the class name instead.
3 │
4 │ static foo() {
5 │ A.CONSTANT;
6 │ }
7 │ }
```

```js
class B extends A {
    static bar() {
        super.CONSTANT;
    }
}
```

Diagnostic:
```
code-block.js:3:9 lint/complexity/noThisInStatic FIXABLE
✖ Using super in a static context can be confusing.
1 │ class B extends A {
2 │ static bar() {
> 3 │ super.CONSTANT;
   │ ^^^^^
4 │ }
5 │ }
ℹ super refers to a parent class.
ℹ Unsafe fix: Use the class name instead.
1 │ class B extends A {
2 │ static bar() {
3 │ A.CONSTANT;
4 │ }
5 │ }
```

### Valid

```js
class B extends A {
    static ANOTHER_CONSTANT = A.CONSTANT + 1;

    static foo() {
        A.CONSTANT;
        B.ANOTHER_CONSTANT;
    }

    bar() {
        this.property;
    }
}
```

```js
class A {
   static foo() {
       doSomething()
   }

   bar() {
     A.foo()
   }
}
```

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)

# noUndeclaredDependencies

**Diagnostic Category: `lint/correctness/noUndeclaredDependencies`**

**Since**: `v1.6.0`  
Disallow the use of dependencies that aren't specified in the `package.json`. Indirect dependencies will trigger the rule if they aren't declared in the `package.json`. For example, if `@org/foo` depends on `lodash` and you use `import "lodash"`, the rule will trigger a diagnostic.

The rule ignores imports that are not valid package names, including internal imports starting with `#` or `@/`, and imports with protocols like `node:`, `bun:`, `jsr:`, or `https:`.

To ensure Visual Studio Code uses relative imports automatically, set `javascript.preferences.importModuleSpecifier` and `typescript.preferences.importModuleSpecifier` to `relative`.

## Examples

### Invalid

```js
import "vite";
```

### Valid

```js
import { A } from "./local.js";
```

```js
import assert from "node:assert";
```

## Related links

- Disable a rule: plain text
- Configure the rule fix: plain text
- Rule options: plain text

# noUndeclaredVariables

Prevents the usage of variables that haven't been declared inside the document.

**Diagnostic Category:** `lint/correctness/noUndeclaredVariables`

**Since:** `v1.0.0`  
**Sources:** Same as: no-undef (https://eslint.org/docs/latest/rules/no-undef)

If you need to allow-list some global bindings, you can use the `javascript.globals` configuration (https://biomejs.dev/reference/configuration/#javascriptglobals).

## Examples

### Invalid

```js
foobar;
```
Diagnostic: 
- code-block.js:1:1 lint/correctness/noUndeclaredVariables
- ⚠ The foobar variable is undeclared.
- ℹ By default, Biome recognizes browser and Node.js globals. You can ignore more globals using the javascript.globals configuration (https://biomejs.dev/reference/configuration/#javascriptglobals).

```js
// throw diagnostic for JavaScript files
PromiseLike;
```
Diagnostic: 
- code-block.js:2:1 lint/correctness/noUndeclaredVariables
- ⚠ The PromiseLike variable is undeclared.
- ℹ By default, Biome recognizes browser and Node.js globals. You can ignore more globals using the javascript.globals configuration (https://biomejs.dev/reference/configuration/#javascriptglobals).

### Valid

```ts
type B<T> = PromiseLike<T>
```

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)

# noUnknownFunction

**Description:** Disallow unknown CSS value functions.

**Diagnostic Category:** `lint/correctness/noUnknownFunction`

**Since:** `v1.8.0`

**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:** 
- Same as: stylelint/function-no-unknown

This rule disallows unknown CSS value functions, ignoring double-dashed custom functions (e.g., `--custom-function()`).

**Data sources of known CSS value functions:**
- MDN reference on CSS value functions: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Functions
- MDN reference on CSS reference: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference
- MDN browser compatibility data for CSS value functions: https://github.com/mdn/browser-compat-data/tree/main/css/types

## Examples

### Invalid

```css
a { transform: unknown(1); }
```

**Error Message:**
code-block.css:1:16 lint/correctness/noUnknownFunction ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ Unexpected unknown function: **unknown**  
> 1 │ a { transform: unknown(1); }  
>   │               ^^^^^^^^  
ℹ Use a known function instead.  
ℹ See MDN web docs for more details.

### Valid

```css
a { transform: scale(1); }
```

## Related links

- Disable a rule: /linter/#disable-a-lint-rule
- Configure the rule fix: /linter#configure-the-rule-fix
- Rule options: /linter/#rule-options

# noUnknownMediaFeatureName

**Diagnostic Category: `lint/correctness/noUnknownMediaFeatureName`**

**Since**: `v1.8.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources**: 
- Same as: stylelint/media-feature-name-no-unknown

Disallow unknown media feature names. This rule considers media feature names defined in the CSS Specifications, including Editor's Drafts, as known. It also checks vendor-prefixed media feature names.

**Data sources of known CSS media features**:
- MDN reference on CSS media feature
- W3C reference on Media Queries Level 3
- W3C reference on Media Queries Level 4
- W3C reference on Media Queries Level 5

## Examples

### Invalid

```css
@media screen and (unknown > 320px) {}
```
```
code-block.css:1:8 lint/correctness/noUnknownMediaFeatureName ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Don't use unknown media feature names.
1 │ @media screen and (unknown > 320px) {}
   │         ^^^^^^^^^^
ℹ Unexpected unknown media feature name.
ℹ You should use media feature names defined in the CSS Specifications.
```

```css
@media only screen and (min-width: 320px) and (max-width: 480px) and (unknown: 150dpi) {}
```
```
code-block.css:1:8 lint/correctness/noUnknownMediaFeatureName ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Don't use unknown media feature names.
1 │ @media only screen and (min-width: 320px) and (max-width: 480px) and (unknown: 150dpi) {}
   │         ^^^^^^^^^^
ℹ Unexpected unknown media feature name.
ℹ You should use media feature names defined in the CSS Specifications.
```

```css
@media (not(unknown < 320px)) and (max-width > 640px) {}
```
```
code-block.css:1:8 lint/correctness/noUnknownMediaFeatureName ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Don't use unknown media feature names.
1 │ @media (not(unknown < 320px)) and (max-width > 640px) {}
   │         ^^^^^^^^^^
ℹ Unexpected unknown media feature name.
ℹ You should use media feature names defined in the CSS Specifications.
```

```css
@media (400px <= unknown <= 700px) {}
```
```
code-block.css:1:8 lint/correctness/noUnknownMediaFeatureName ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Don't use unknown media feature names.
1 │ @media (400px <= unknown <= 700px) {}
   │         ^^^^^^^^^^
ℹ Unexpected unknown media feature name.
ℹ You should use media feature names defined in the CSS Specifications.
```

### Valid

```css
@media screen and (width > 320px) {}
```

```css
@media only screen and (min-width: 320px) and (max-width: 480px) and (resolution: 150dpi) {}
```

```css
@media (not(min-width < 320px)) and (max-width > 640px) {}
```

```css
@media (400px <= width <= 700px) {}
```

```css
@media screen and (-webkit-width > 320px) {}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noUnknownProperty

**Diagnostic Category: `lint/correctness/noUnknownProperty`**

**Since**: `v1.8.0`

**Note**: This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources**: Same as: stylelint/property-no-unknown

Disallow unknown properties. This rule considers properties defined in the CSS Specifications and browser-specific properties to be known. For more information, visit known-css-properties#source.

**This rule ignores**:
- Custom variables (e.g., `--custom-property`)
- Vendor-prefixed properties (e.g., `-moz-align-self`, `-webkit-align-self`)

## Examples

### Invalid

```css
a {
  colr: blue;
}
```
```
code-block.css:2:3 lint/correctness/noUnknownProperty ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unknown property is not allowed.

1 │ a {
2 │   colr: blue;
   │  ^^^^^^^^^^
3 │ }
4 │

ℹ See CSS Specifications and browser specific properties for more details.
ℹ To resolve this issue, replace the unknown property with a valid CSS property.
```

```css
a {
  my-property: 1;
}
```
```
code-block.css:2:3 lint/correctness/noUnknownProperty ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unknown property is not allowed.

1 │ a {
2 │   my-property: 1;
   │  ^^^^^^^^^^^^^^
3 │ }
4 │

ℹ See CSS Specifications and browser specific properties for more details.
ℹ To resolve this issue, replace the unknown property with a valid CSS property.
```

### Valid

```css
a {
  color: green;
}
```

```css
a {
  fill: black;
}
```

```css
a {
  -moz-align-self: center;
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noUnknownPseudoClass

This rule disallows unknown pseudo-class selectors in CSS.

**Diagnostic Category:** `lint/nursery/noUnknownPseudoClass`

**Since:** v1.8.0

**Note:** This rule is part of the nursery group.

**Sources:** `stylelint/selector-pseudo-class-no-unknown`

**Description:**

Disallows unknown pseudo-class selectors.  Refer to the MDN web docs for a list of valid pseudo-classes.

This rule ignores vendor-prefixed pseudo-class selectors.


## Examples

### Invalid

```css
a:unknown {}
```

```css
a:UNKNOWN {}
```

```css
a:hoverr {}
```

### Valid

```css
a:hover {}
```

```css
a:focus {}
```

```css
:not(p) {}
```

```css
input:-moz-placeholder {}
```

## Related Links

- Disable a rule
- Configure the rule fix
- Rule options


# noUnknownPseudoElement

**Description:** Disallow unknown pseudo-element selectors.

**Diagnostic Category:** `lint/nursery/noUnknownPseudoElement`

**Since:** `v1.8.0`

**Caution:** This rule is part of the nursery group.

**Sources:** Same as: stylelint/selector-pseudo-element-no-unknown

Disallow unknown pseudo-element selectors. This rule ignores vendor-prefixed pseudo-element selectors. For details on known CSS pseudo-elements, see the MDN web docs.

## Examples

### Invalid

```css
a::pseudo {}
```
```
code-block.css:1:4 lint/nursery/noUnknownPseudoElement ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Unexpected unknown pseudo-elements: pseudo
> 1 │ a::pseudo {}
  │ ^^^^^^
2 │ 
ℹ See MDN web docs for more details.
ℹ Use a known pseudo-element instead, such as:
- after
- backdrop
- before
- etc.
```

```css
a::PSEUDO {}
```
```
code-block.css:1:4 lint/nursery/noUnknownPseudoElement ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Unexpected unknown pseudo-elements: PSEUDO
> 1 │ a::PSEUDO {}
  │ ^^^^^^
2 │ 
ℹ See MDN web docs for more details.
ℹ Use a known pseudo-element instead, such as:
- after
- backdrop
- before
- etc.
```

```css
a::element {}
```
```
code-block.css:1:4 lint/nursery/noUnknownPseudoElement ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Unexpected unknown pseudo-elements: element
> 1 │ a::element {}
  │ ^^^^^^
2 │ 
ℹ See MDN web docs for more details.
ℹ Use a known pseudo-element instead, such as:
- after
- backdrop
- before
- etc.
```

### Valid

```css
a:before {}
```

```css
a::before {}
```

```css
::selection {}
```

```css
input::-moz-placeholder {}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noUnknownTypeSelector

**Description:** Disallow unknown type selectors.

**Diagnostic Category:** `lint/nursery/noUnknownTypeSelector`

**Since:** `v1.9.4`

**Caution:** This rule is part of the nursery group.

**Sources:** Same as: stylelint/selector-type-no-unknown

This rule disallows unknown type selectors, considering tags defined in the HTML, SVG, and MathML specifications as known. 

For details on known CSS type selectors, see the following resources:
- developer.mozilla.org/en-US/docs/Web/CSS/Type_selectors
- developer.mozilla.org/ja/docs/Web/HTML/Element
- developer.mozilla.org/ja/docs/Web/SVG/Element
- developer.mozilla.org/ja/docs/Web/MathML/Element

This rule allows custom elements.

## Examples

### Invalid

```css
unknown {}
```
```
code-block.css:1:1 lint/nursery/noUnknownTypeSelector ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unknown type selector is not allowed.

> 1 │ unknown {}
  │ ^^^^^^^^^^
2 │ 

ℹ See MDN web docs for more details.

ℹ Consider replacing the unknown type selector with valid one.
```

```css
unknown > ul {}
```
```
code-block.css:1:1 lint/nursery/noUnknownTypeSelector ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unknown type selector is not allowed.

> 1 │ unknown > ul {}
  │ ^^^^^^^^^^
2 │ 

ℹ See MDN web docs for more details.

ℹ Consider replacing the unknown type selector with valid one.
```

```css
x-Foo {}
```
```
code-block.css:1:1 lint/nursery/noUnknownTypeSelector ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unknown type selector is not allowed.

> 1 │ x-Foo {}
  │ ^^^^^
2 │ 

ℹ See MDN web docs for more details.

ℹ Consider replacing the unknown type selector with valid one.
```

### Valid

```css
input {}
```

```css
ul > li {}
```

```css
x-foo {}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noUnknownUnit

**Description:** Disallow unknown CSS units.

**Diagnostic Category:** `lint/correctness/noUnknownUnit`

**Since:** `v1.8.0`

**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:** Same as: stylelint/unit-no-unknown

Disallow unknown CSS units. For details on known CSS units, see the MDN web docs.

## Examples

### Invalid

```css
a {
  width: 10pixels;
}
```

```
code-block.css:2:12 lint/correctness/noUnknownUnit ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unexpected unknown unit: pixels

  1 │ a {
  2 │   width: 10pixels;
   │           ^^^^^^
  3 │ }
  4 │

ℹ See MDN web docs for more details.

ℹ Use a known unit instead, such as:

- px
- em
- rem
- etc.
```

```css
a {
  width: calc(10px + 10pixels);
}
```

```
code-block.css:2:24 lint/correctness/noUnknownUnit ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unexpected unknown unit: pixels

  1 │ a {
  2 │   width: calc(10px + 10pixels);
   │                       ^^^^^^
  3 │ }
  4 │

ℹ See MDN web docs for more details.

ℹ Use a known unit instead, such as:

- px
- em
- rem
- etc.
```

### Valid

```css
a {
  width: 10px;
}
```

```css
a {
  width: 10Px;
}
```

```css
a {
  width: 10pX;
}
```

```css
a {
  width: calc(10px + 10px);
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noUnmatchableAnbSelector

Disallow unmatchable An+B selectors.

**Diagnostic Category:** `lint/correctness/noUnmatchableAnbSelector`  
**Since:** `v1.8.0`  
This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: stylelint/selector-anb-no-unmatchable

Selectors that always evaluate to 0 will not match any elements. For more details about the An+B syntax, see: w3.org/TR/css-syntax-3/#anb-microsyntax

## Examples

### Invalid

```css
a:nth-child(0) {}
```
code-block.css:1:13 lint/correctness/noUnmatchableAnbSelector ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ This selector will never match any elements.  
1 │ a:nth-child(0) {}  
   │            ^  
2 │  
ℹ Avoid using An+B selectors that always evaluate to 0.  
ℹ For more details, see the official spec for An+B selectors.

```css
a:nth-last-child(0n) {}
```
code-block.css:1:18 lint/correctness/noUnmatchableAnbSelector ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ This selector will never match any elements.  
1 │ a:nth-last-child(0n) {}  
   │                 ^^  
2 │  
ℹ Avoid using An+B selectors that always evaluate to 0.  
ℹ For more details, see the official spec for An+B selectors.

```css
a:nth-of-type(0n+0) {}
```
code-block.css:1:15 lint/correctness/noUnmatchableAnbSelector ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ This selector will never match any elements.  
1 │ a:nth-of-type(0n+0) {}  
   │              ^^^^  
2 │  
ℹ Avoid using An+B selectors that always evaluate to 0.  
ℹ For more details, see the official spec for An+B selectors.

```css
a:nth-last-of-type(0 of a) {}
```
code-block.css:1:20 lint/correctness/noUnmatchableAnbSelector ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ This selector will never match any elements.  
1 │ a:nth-last-of-type(0 of a) {}  
   │                   ^^^^^^  
2 │  
ℹ Avoid using An+B selectors that always evaluate to 0.  
ℹ For more details, see the official spec for An+B selectors.

### Valid

```css
a:nth-child(1) {}
```

```css
a:nth-last-child(1n) {}
```

```css
a:nth-of-type(1n+0) {}
```

```css
a:nth-last-of-type(1 of a) {}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noUnnecessaryContinue

**Description:** Avoid using unnecessary `continue`.

**Diagnostic Category:** `lint/correctness/noUnnecessaryContinue`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

## Examples

### Invalid

```js
loop: for (let i = 0; i < 5; i++) {
  continue loop;
}
```
code-block.js:2:3 lint/correctness/noUnnecessaryContinue FIXABLE 
✖ Unnecessary continue statement
1 │ loop: for (let i = 0; i < 5; i++) {
2 │   continue loop;
3 │ }
ℹ Unsafe fix: Delete the unnecessary continue statement

```js
while (i--) {
  continue;
}
```
code-block.js:2:3 lint/correctness/noUnnecessaryContinue FIXABLE 
✖ Unnecessary continue statement
1 │ while (i--) {
2 │   continue;
3 │ }
ℹ Unsafe fix: Delete the unnecessary continue statement

```js
while (1) {
  continue;
}
```
code-block.js:2:3 lint/correctness/noUnnecessaryContinue FIXABLE 
✖ Unnecessary continue statement
1 │ while (1) {
2 │   continue;
3 │ }
ℹ Unsafe fix: Delete the unnecessary continue statement

```js
for (let i = 0; i < 10; i++) {
  if (i > 5) {
    console.log("foo");
    continue;
  } else if (i >= 5 && i < 8) {
    console.log("test");
  } else {
    console.log("test");
  }
}
```
code-block.js:4:5 lint/correctness/noUnnecessaryContinue FIXABLE 
✖ Unnecessary continue statement
2 │ if (i > 5) {
3 │   console.log("foo");
4 │   continue;
5 │ } else if (i >= 5 && i < 8) {
6 │   console.log("test");
ℹ Unsafe fix: Delete the unnecessary continue statement

```js
for (let i = 0; i < 9; i++) {
  continue;
}
```
code-block.js:2:3 lint/correctness/noUnnecessaryContinue FIXABLE 
✖ Unnecessary continue statement
1 │ for (let i = 0; i < 9; i++) {
2 │   continue;
3 │ }
ℹ Unsafe fix: Delete the unnecessary continue statement

```js
test2: do {
  continue test2;
} while (true);
```
code-block.js:2:2 lint/correctness/noUnnecessaryContinue FIXABLE 
✖ Unnecessary continue statement
1 │ test2: do {
2 │   continue test2;
3 │ } while (true);
ℹ Unsafe fix: Delete the unnecessary continue statement

### Valid

```js
while (i) {
  if (i > 5) {
    continue;
  }
  console.log(i);
  i--;
}

loop: while (1) {
  forLoop: for (let i = 0; i < 5; i++) {
    if (someCondition) {
      continue loop;
    }
  }
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noUnreachableSuper

**Description:**  
Ensures the `super()` constructor is called exactly once on every code path in a class constructor before `this` is accessed if the class has a superclass.

**Diagnostic Category:** `lint/correctness/noUnreachableSuper`  
**Since:** `v1.0.0`  
**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:**  
Same as: `no-this-before-super` (ESLint documentation)

## Examples

### Invalid

```js
class A extends B {
    constructor() {}
}
```
Diagnostic:  
This constructor has code paths that return without calling `super()`.

```js
class A extends B {
    constructor(value) {
        this.prop = value;
        super();
    }
}
```
Diagnostic:  
This constructor has code paths accessing `this` without calling `super()` first.

```js
class A extends B {
    constructor(cond) {
        if(cond) {
            super();
        }
    }
}
```
Diagnostic:  
This constructor has code paths that return without calling `super()`.

### Valid

```js
export default class A extends B {
    constructor() {
        super();
    }
}
```

```js
export class A {
    constructor() {}
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noUnreachable

**Description:** Disallow unreachable code

**Diagnostic Category:** `lint/correctness/noUnreachable`

**Since:** `v1.0.0`

**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:** Same as: no-unreachable

## Examples

### Invalid

```js
function example() {
    return;
    neverCalled();
}
```

Diagnostic:
```
code-block.js:3:5 lint/correctness/noUnreachable ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ This code will never be reached ...
1 │ function example() {
2 │     return;
> 3 │     neverCalled();
4 │ }
ℹ ... because this statement will return from the function beforehand
1 │ function example() {
> 2 │     return;
^
3 │     neverCalled();
4 │ }
```

```js
function example() {
    for(let i = 0; i < 10; ++i) {
        break;
    }
}
```

Diagnostic:
```
code-block.js:2:28 lint/correctness/noUnreachable ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ This code will never be reached ...
1 │ function example() {
> 2 │     for(let i = 0; i < 10; ++i) {
                           ^
3 │         break;
4 │     }
ℹ ... because this statement will break the flow of the code beforehand
1 │ function example() {
2 │     for(let i = 0; i < 10; ++i) {
> 3 │         break;
^
4 │     }
}
```

```js
function example() {
    for(const key in value) {
        continue;
        neverCalled();
    }
}
```

Diagnostic:
```
code-block.js:4:9 lint/correctness/noUnreachable ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ This code will never be reached ...
2 │     for(const key in value) {
3 │         continue;
> 4 │         neverCalled();
5 │     }
ℹ ... because this statement will continue the loop beforehand
1 │ function example() {
2 │     for(const key in value) {
> 3 │         continue;
^
4 │         neverCalled();
5 │     }
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noUnsafeDeclarationMerging

Disallow unsafe declaration merging between interfaces and classes.

**Diagnostic Category:** `lint/suspicious/noUnsafeDeclarationMerging`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `@typescript-eslint/no-unsafe-declaration-merging`

Disallow unsafe declaration merging between interfaces and classes.

TypeScript's declaration merging supports merging separate declarations with the same name. Declaration merging between classes and interfaces is unsafe. The TypeScript Compiler doesn't check whether properties defined in the interface are initialized in the class. This can lead to TypeScript not detecting code that will cause runtime errors.

## Examples

### Invalid

```ts
interface Foo {
    f(): void
}

class Foo {}

const foo = new Foo();
foo.f(); // Runtime Error: Cannot read properties of undefined.
```

code-block.ts:5:7 lint/suspicious/noUnsafeDeclarationMerging ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ This class is unsafely merged with an interface.  
3 │ }  
4 │  
> 5 │ class Foo {}  
   │      ^^^  
6 │  
7 │ const foo = new Foo();  

ℹ The interface is declared here.  
> 1 │ interface Foo {  
   │          ^^^  
2 │     f(): void  
3 │ }  

ℹ The TypeScript compiler doesn't check whether properties defined in the interface are initialized in the class.

### Valid

```ts
interface Foo {}
class Bar implements Foo {}
```

```ts
namespace Baz {}
namespace Baz {}
enum Baz {}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noUnsafeFinally

Disallow control flow statements in finally blocks.

**Diagnostic Category:** `lint/correctness/noUnsafeFinally`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:** 
- Same as: no-unsafe-finally

JavaScript suspends the control flow statements of `try` and `catch` blocks until the execution of the finally block finishes. When `return`, `throw`, `break`, or `continue` is used in finally, control flow statements inside `try` and `catch` are overwritten, which is considered unexpected behavior.

## Examples

### Invalid

```js
(() => {
    try {
        return 1; // 1 is returned but suspended until finally block ends
    } catch(err) {
        return 2;
    } finally {
        return 3; // 3 is returned before 1, which we did not expect
    }
})();
```

code-block.js:7:9 lint/correctness/noUnsafeFinally ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unsafe usage of 'return'.

5 │ return 2;
6 │ }
7 │ return 3; // 3 is returned before 1, which we did not expect
8 │ }
9 │ })();

ℹ 'return' in 'finally' overwrites the control flow statements inside 'try' and 'catch'.

```js
(() => {
    try {
        throw new Error("Try"); // error is thrown but suspended until finally block ends
    } finally {
        return 3; // 3 is returned before the error is thrown, which we did not expect
    }
})();
```

code-block.js:5:9 lint/correctness/noUnsafeFinally ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unsafe usage of 'return'.

3 │ throw new Error("Try"); // error is thrown but suspended until finally block ends
4 │ }
5 │ return 3; // 3 is returned before the error is thrown, which we did not expect
6 │ }
7 │ })();

ℹ 'return' in 'finally' overwrites the control flow statements inside 'try' and 'catch'.

```js
(() => {
    try {
        throw new Error("Try")
    } catch(err) {
        throw err; // The error thrown from try block is caught and re-thrown
    } finally {
        throw new Error("Finally"); // Finally(...) is thrown, which we did not expect
    }
})();
```

code-block.js:7:9 lint/correctness/noUnsafeFinally ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unsafe usage of 'throw'.

5 │ throw err; // The error thrown from try block is caught and re-thrown
6 │ }
7 │ throw new Error("Finally"); // Finally(...) is thrown, which we did not expect
8 │ }
9 │ })();

ℹ 'throw' in 'finally' overwrites the control flow statements inside 'try' and 'catch'.

```js
(() => {
    label: try {
      return 0; // 0 is returned but suspended until finally block ends
    } finally {
      break label; // It breaks out the try-finally block, before 0 is returned.
    }
    return 1;
})();
```

code-block.js:5:7 lint/correctness/noUnsafeFinally ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unsafe usage of 'break'.

3 │ return 0; // 0 is returned but suspended until finally block ends
4 │ }
5 │ break label; // It breaks out the try-finally block, before 0 is returned.
6 │ return 1;

ℹ 'break' in 'finally' overwrites the control flow statements inside 'try' and 'catch'.

```js
function a() {
  switch (condition) {
    case 'a': {
      try {
        console.log('a');
        return;
      } finally {
        break;
      }
    }
    case 'b': {
      console.log('b');
    }
  }
}
```

code-block.js:8:9 lint/correctness/noUnsafeFinally ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unsafe usage of 'break'.

6 │ return;
7 │ }
8 │ break;

ℹ 'break' in 'finally' overwrites the control flow statements inside 'try' and 'catch'.

### Valid

```js
let foo = function() {
    try {
        return 1;
    } catch(err) {
        return 2;
    } finally {
        console.log("hola!");
    }
};
```

```js
let foo = function() {
    try {
        return 1;
    } catch(err) {
        return 2;
    } finally {
        let a = function() {
            return "hola!";
        }
    }
};
```

```js
let foo = function(a) {
    try {
        return 1;
    } catch(err) {
        return 2;
    } finally {
        switch(a) {
            case 1: {
                console.log("hola!")
                break;
            }
        }
    }
};
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noUnsafeNegation

**Description:** Disallow using unsafe negation.

**Diagnostic Category:** `lint/suspicious/noUnsafeNegation`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:** Same as: `no-unsafe-negation` from eslint.org/docs/latest/rules/no-unsafe-negation

## Disallow using unsafe negation.

### Examples

#### Invalid

```js
!1 in [1,2];
```
```
code-block.js:1:1 lint/suspicious/noUnsafeNegation FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ The negation operator is used unsafely on the left side of this binary expression.

> 1 │ !1 in [1,2];
  │ ^^^^^^^^^^^
  
ℹ Unsafe fix: Wrap the expression with a parenthesis

1 │ !(1 in [1,2]);
  │ ++
```

```js
/**test*/!/** test*/1 instanceof [1,2];
```
```
code-block.js:1:10 lint/suspicious/noUnsafeNegation FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ The negation operator is used unsafely on the left side of this binary expression.

> 1 │ /**test*/!/** test*/1 instanceof [1,2];
  │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  
ℹ Unsafe fix: Wrap the expression with a parenthesis

1 │ /**test*/!/** test*/(1 instanceof [1,2]);
  │ ++
```

### Valid

```js
-1 in [1,2];
~1 in [1,2];
typeof 1 in [1,2];
void 1 in [1,2];
delete 1 in [1,2];
+1 instanceof [1,2];
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noUnsafeOptionalChaining

Disallow the use of optional chaining in contexts where the undefined value is not allowed.

**Diagnostic Category:** `lint/correctness/noUnsafeOptionalChaining`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `no-unsafe-optional-chaining` documentation

The optional chaining (?.) expression can short-circuit with a return value of undefined. Therefore, treating an evaluated optional chaining expression as a function, object, number, etc., can cause TypeError or unexpected results. Also, parentheses limit the scope of short-circuiting in chains.

## Examples

### Invalid

```js
1 in obj?.foo;
```
```
code-block.js:1:9 lint/correctness/noUnsafeOptionalChaining ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Unsafe usage of optional chaining.
1 │ 1 in obj?.foo;
  │        ^^
2 │ 
ℹ If it short-circuits with 'undefined' the evaluation will throw TypeError here:
1 │ 1 in obj?.foo;
  │        ^^^^^^^^^
2 │ 
```

```cjs
with (obj?.foo);
```
```
code-block.cjs:1:10 lint/correctness/noUnsafeOptionalChaining ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Unsafe usage of optional chaining.
1 │ with (obj?.foo);
  │         ^^
2 │ 
ℹ If it short-circuits with 'undefined' the evaluation will throw TypeError here:
1 │ with (obj?.foo);
  │         ^^^^^^^^^
2 │ 
```

```js
for (bar of obj?.foo);
```
```
code-block.js:1:16 lint/correctness/noUnsafeOptionalChaining ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Unsafe usage of optional chaining.
1 │ for (bar of obj?.foo);
  │                ^^
2 │ 
ℹ If it short-circuits with 'undefined' the evaluation will throw TypeError here:
1 │ for (bar of obj?.foo);
  │                ^^^^^^^^^
2 │ 
```

```js
bar instanceof obj?.foo;
```
```
code-block.js:1:19 lint/correctness/noUnsafeOptionalChaining ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Unsafe usage of optional chaining.
1 │ bar instanceof obj?.foo;
  │                   ^^
2 │ 
ℹ If it short-circuits with 'undefined' the evaluation will throw TypeError here:
1 │ bar instanceof obj?.foo;
  │                   ^^^^^^^^^
2 │ 
```

```js
const { bar } = obj?.foo;
```
```
code-block.js:1:20 lint/correctness/noUnsafeOptionalChaining ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Unsafe usage of optional chaining.
1 │ const { bar } = obj?.foo;
  │                    ^^
2 │ 
ℹ If it short-circuits with 'undefined' the evaluation will throw TypeError here:
1 │ const { bar } = obj?.foo;
  │                    ^^^^^^^^^
2 │ 
```

```js
(obj?.foo)();
```
```
code-block.js:1:5 lint/correctness/noUnsafeOptionalChaining ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Unsafe usage of optional chaining.
1 │ (obj?.foo)();
  │     ^^
2 │ 
ℹ If it short-circuits with 'undefined' the evaluation will throw TypeError here:
1 │ (obj?.foo)();
  │          ^^^^
2 │ 
```

```js
(baz?.bar).foo;
```
```
code-block.js:1:5 lint/correctness/noUnsafeOptionalChaining ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Unsafe usage of optional chaining.
1 │ (baz?.bar).foo;
  │     ^^
2 │ 
ℹ If it short-circuits with 'undefined' the evaluation will throw TypeError here:
1 │ (baz?.bar).foo;
  │          ^^^^^
2 │ 
```

### Valid

```js
(obj?.foo)?.();
obj?.foo();
(obj?.foo ?? bar)();
obj?.foo.bar;
obj.foo?.bar;
foo?.()?.bar;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noUnusedFunctionParameters

Disallow unused function parameters.

**Diagnostic Category:** `lint/correctness/noUnusedFunctionParameters`  
**Since:** `v1.8.0`  
**Note:** This rule has an **unsafe** fix.

There is an exception to this rule: parameters that start with an underscore, e.g. `function foo(_a, _b) {}`.

## Examples

### Invalid

```js
function foo(myVar) {
    console.log('foo');
}
```

code-block.js:1:14 lint/correctness/noUnusedFunctionParameters FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ This parameter is unused.  
ℹ Unused parameters might be the result of an incomplete refactoring.  
ℹ Unsafe fix: If this is intentional, prepend myVar with an underscore.

```js
new Promise((accept, reject) => {
    window.setTimeout(accept, 1000);
});
```

code-block.js:1:22 lint/correctness/noUnusedFunctionParameters FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ This parameter is unused.  
ℹ Unused parameters might be the result of an incomplete refactoring.  
ℹ Unsafe fix: If this is intentional, prepend reject with an underscore.

```js
const squares = [[1, 1], [2, 4], [3, 9], [4, 16]];
squares.filter(([k, v]) => v > 5);
```

code-block.js:2:18 lint/correctness/noUnusedFunctionParameters FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ This parameter is unused.  
ℹ Unused parameters might be the result of an incomplete refactoring.  
ℹ Unsafe fix: If this is intentional, prepend k with an underscore.

### Valid

```js
function foo(myVar) {
    console.log(myVar);
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noUnusedImports

Disallow unused imports.

**Diagnostic Category:** `lint/correctness/noUnusedImports`

**Since:** `v1.3.0`

- This rule has a **safe** fix.

Sources: 
- Same as: unused-imports/no-unused-imports

Unused imports might be the result of an incomplete refactoring. The code fix can remove comments associated with an `import`. Note that the leading trivia, e.g., comments or newlines preceding the unused imports will also be removed. So that comment directives like `@ts-expect-error` won't be transferred to a wrong place.

## Options

This rule respects the `jsxRuntime` setting and will make an exception for React globals if it is set to `"reactClassic"`.

## Examples

### Invalid

```js
import A from 'mod';
```

code-block.js:1:8 lint/correctness/noUnusedImports FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ This import is unused.

1 │ import A from 'mod';
   │       ^

2 │ 

ℹ Unused imports might be the result of an incomplete refactoring.

ℹ Safe fix: Remove the unused import.

```js
import * as A from 'mod';
```

code-block.js:1:13 lint/correctness/noUnusedImports FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ This import is unused.

1 │ import * as A from 'mod';
   │            ^

2 │ 

ℹ Unused imports might be the result of an incomplete refactoring.

ℹ Safe fix: Remove the unused import.

```ts
import { type A, B } from 'mod';

export { B }
```

code-block.ts:1:15 lint/correctness/noUnusedImports FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ This import is unused.

1 │ import { type A, B } from 'mod';
   │              ^

2 │ 
3 │ export { B }

ℹ Unused imports might be the result of an incomplete refactoring.

ℹ Safe fix: Remove the unused import.

```js
// Header comment
import /*inner comment */ A from 'mod'; // Associated comment

// Another header comment
import {
    // A's header comment
    type A, // A's comment
    // B's header comment
    B,
} from 'mod';

export { B }
```

code-block.js:7:5 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ 'import { type x ident }' are a TypeScript only feature. Convert your file to a TypeScript file or remove the syntax.

5 │ import {
6 │     // A's header comment
7 │     type A, // A's comment
   │     ^^^^^^
8 │     // B's header comment
9 │     B,

ℹ TypeScript only syntax

### Valid

```ts
import { A, type B } from 'mod';

function f(arg: B): A {
    return new A(arg);
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noUnusedLabels

**Description:** Disallow unused labels.

**Diagnostic Category:** `lint/correctness/noUnusedLabels`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

**Sources:** Same as: no-unused-labels

Disallow unused labels. Labels that are declared and never used are most likely an error due to incomplete refactoring. The rule ignores reactive Svelte statements in Svelte components.

## Examples

### Invalid

```js
LOOP: for (const x of xs) {
    if (x > 0) {
        break;
    }
    f(x);
}
```

```
code-block.js:1:1 lint/correctness/noUnusedLabels FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unused label.

> 1 │ LOOP: for (const x of xs) {
   │ ^^^^
  2 │     if (x > 0) {
  3 │         break;

ℹ The label is not used by any break statement and continue statement.

ℹ Safe fix: Remove the unused label.
```

### Valid

```js
LOOP: for (const x of xs) {
    if (x > 0) {
        break LOOP;
    }
    f(x);
}
```

```js
function nonNegative(n) {
    DEV: assert(n >= 0);
    return n;
}
```

```svelte
<script>
$: { /* reactive block */ }
</script>
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noUnusedPrivateClassMembers

Disallow unused private class members.

**Diagnostic Category:** `lint/correctness/noUnusedPrivateClassMembers`

**Since:** `v1.3.3`

**Note:** This rule has an **unsafe** fix.

Sources: Same as: `no-unused-private-class-members` (https://eslint.org/docs/latest/rules/no-unused-private-class-members)

Private class members that are declared and not used anywhere in the code are most likely an error due to incomplete refactoring. Such class members take up space in the code and can lead to confusion by readers.

## Examples

### Invalid

```js
class OnlyWrite {
  #usedOnlyInWrite = 5;

  method() {
       this.#usedOnlyInWrite = 212;
  }
}
```

code-block.js:2:3 lint/correctness/noUnusedPrivateClassMembers FIXABLE 
⚠ This private class member is defined but never used.

1 │ class OnlyWrite {
2 │   #usedOnlyInWrite = 5;
   │  ^^^^^^^^^^^^^^^^^^
3 │ 
4 │   method() {
ℹ Unsafe fix: Remove unused declaration.

1 │ class OnlyWrite {
2 │   -
3 │ 
4 │   method() {
```

```ts
class TsBioo {
  private unusedProperty = 5;
}
```

code-block.ts:2:12 lint/correctness/noUnusedPrivateClassMembers FIXABLE 
⚠ This private class member is defined but never used.

1 │ class TsBioo {
2 │   private unusedProperty = 5;
   │            ^^^^^^^^^^^^^^^^
3 │ }
ℹ Unsafe fix: Remove unused declaration.

1 │ class TsBioo {
2 │   -
3 │ }
```

```ts
class TsBioo {
  private unusedMethod() {}
}
```

code-block.ts:2:12 lint/correctness/noUnusedPrivateClassMembers FIXABLE 
⚠ This private class member is defined but never used.

1 │ class TsBioo {
2 │   private unusedMethod() {}
   │            ^^^^^^^^^^^^^^^^
3 │ }
ℹ Unsafe fix: Remove unused declaration.

1 │ class TsBioo {
2 │   -
3 │ }
```

### Valid

```js
class UsedMember {
  #usedMember = 42;

  method() {
       return this.#usedMember;
  }
}
```

## Related links

- Disable a rule (link)
- Configure the rule fix (link)
- Rule options (link)

# noUnusedTemplateLiteral

Disallow template literals if interpolation and special-character handling are not needed.

**Diagnostic Category:** `lint/style/noUnusedTemplateLiteral`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

## Examples

### Invalid

```js
const foo = `bar`
```
code-block.js:1:13 lint/style/noUnusedTemplateLiteral FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ Do not use template literals if interpolation and special-character handling are not needed.  
> 1 │ const foo = `bar`  
  │ ^^^^^  
ℹ Unsafe fix: Replace with string literal  
1 │ const foo = "bar"  

```js
const foo = `bar `
```
code-block.js:1:13 lint/style/noUnusedTemplateLiteral FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ Do not use template literals if interpolation and special-character handling are not needed.  
> 1 │ const foo = `bar `  
  │ ^^^^^^  
ℹ Unsafe fix: Replace with string literal  
1 │ const foo = "bar "  

### Valid

```js
const foo = `bar
has newline`;
```

```js
const foo = `"bar"`
```

```js
const foo = `'bar'`
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noUnusedVariables

**Description:** Disallow unused variables.

**Diagnostic Category:** `lint/correctness/noUnusedVariables`

**Since:** `v1.0.0`

**Note:** This rule has an **unsafe** fix.

**Sources:**
- Same as: `no-unused-vars` (ESLint)
- Same as: `@typescript-eslint/no-unused-vars` (TypeScript ESLint)
- Same as: `unused-imports/no-unused-vars` (sweepline ESLint plugin)

Disallow unused variables. There is an exception for variables that start with an underscore (e.g., `let _something;`). This pattern is common among programmers, and Biome follows it.

This rule won't report unused imports. To report unused imports, enable `noUnusedImports`.

From `v1.9.0`, the rule won't check unused function parameters. To report unused function parameters, enable `noUnusedFunctionParameters`.

## Examples

### Invalid

```js
let a = 4;
a++;
```
**Warning:** This variable is unused.

```js
function foo() {}
```
**Warning:** This function is unused.

```js
export function foo(myVar) {
    console.log('foo');
}
```
**Warning:** This parameter is unused.

```js
function foo() {
    foo();
}
```
**Warning:** This function is unused.

```js
const foo = () => {
    foo();
};
```
**Warning:** This variable is unused.

```ts
export function f<T>() {}
```
**Warning:** This type parameter is unused.

### Valid

```js
function foo(b) {
    console.log(b);
}
foo();
```

```js
export function foo(_unused) {}
```

```ts
function used_overloaded(): number;
function used_overloaded(s: string): string;
function used_overloaded(s?: string) {
    return s;
}
used_overloaded();
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noUselessCatch

Disallow unnecessary `catch` clauses.

**Diagnostic Category:** `lint/complexity/noUselessCatch`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

Sources: 
- Same as: no-useless-catch

A `catch` clause that only rethrows the original error is redundant and has no effect on the runtime behavior of the program. These redundant clauses can be a source of confusion and code bloat, so it’s better to disallow these unnecessary `catch` clauses.

## Examples

### Invalid

```js
try {
    doSomething();
} catch(e) {
    throw e;
}
```

code-block.js:4:5 lint/complexity/noUselessCatch ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ The catch clause that only rethrows the original error is useless.  
2 │ doSomething();  
3 │ } catch(e) {  
4 │ throw e;  
5 │ }  

ℹ An unnecessary catch clause can be confusing.

```js
try {
    doSomething();
} catch(e) {
    throw e;
} finally {
    doCleanUp();
}
```

code-block.js:4:5 lint/complexity/noUselessCatch FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ The catch clause that only rethrows the original error is useless.  
2 │ doSomething();  
3 │ } catch(e) {  
4 │ throw e;  
5 │ } finally {  
6 │ doCleanUp();  

ℹ An unnecessary catch clause can be confusing.  
ℹ Unsafe fix: Remove the catch clause.  

1 │ try {  
2 │ doSomething();  
3 │ }  
4 │ - catch(e) {  
5 │ - throw e;  
6 │ finally {  
7 │ doCleanUp();  
}

### Valid

```js
try {
    doSomething();
} catch(e) {
    doSomethingWhenCatch();
    throw e;
}
```

```js
try {
    doSomething();
} catch(e) {
    handleError(e);
}
```

```js
try {
    doSomething();
} finally {
    doCleanUp();
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noUselessConstructor

Disallow unnecessary constructors.

**Diagnostic Category:** `lint/complexity/noUselessConstructor`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

Sources: 
- Same as: `no-useless-constructor` (ESLint)
- Same as: `@typescript-eslint/no-useless-constructor` (TypeScript ESLint)

ES2015 provides a default class constructor if one is not specified. As such, providing an empty constructor or one that delegates into its parent is unnecessary.

The rule ignores:
- Decorated classes
- Constructors with at least one parameter property
- `private` and `protected` constructors

## Caveat

This rule reports on constructors whose sole purpose is to make a parent constructor public.

## Examples

### Invalid

```js
class A {
    constructor (a) {}
}
```
Diagnostic: This constructor is unnecessary.  
Unsafe fix: Remove the unnecessary constructor.

```ts
class B extends A {
    constructor (a) {
        super(a);
    }
}
```
Diagnostic: This constructor is unnecessary.  
Unsafe fix: Remove the unnecessary constructor.

```js
class C {
    /**
     * Documented constructor.
     */
    constructor () {}
}
```
Diagnostic: This constructor is unnecessary.  
Unsafe fix: Remove the unnecessary constructor.

```js
class A {
    protected constructor() {
        this.prop = 1;
    }
}

class B extends A {
    constructor () {
        super();
    }
}
```
Diagnostic: 'protected' modifier can only be used in TypeScript files.

### Valid

```js
class A {
    constructor (prop) {
        this.prop = prop;
    }
}
```

```js
class B extends A {
    constructor () {
        super(5);
    }
}
```

```ts
class C {
    constructor (private prop: number) {}
}
```

```ts
class D {
  constructor(public arg: number){}
}

class F extends D {
  constructor(arg = 4) {
    super(arg)
  }
}
```

```ts
@Decorator
class C {
    constructor (prop: number) {}
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noUselessElse

Disallow `else` block when the `if` block breaks early.

**Diagnostic Category:** `lint/style/noUselessElse`

**Since:** `v1.3.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:**
- Inspired from: no-else-return documentation
- Inspired from: redundant_else documentation

Disallow `else` block when the `if` block breaks early.

If an `if` block breaks early using a breaking statement (`return`, `break`, `continue`, or `throw`), then the `else` block becomes useless. Its contents can be placed outside of the block.

### Examples

**Invalid**

```js
while (x > 0) {
    if (f(x)) {
        break;
    } else {
        x++;
    }
}
```

code-block.js:4:7 lint/style/noUselessElse FIXABLE 
✖ This else clause can be omitted because previous branches break early.

```js
function f(x) {
    if (x < 0) {
        return 0;
    } else {
        return x;
    }
}
```

code-block.js:4:7 lint/style/noUselessElse FIXABLE 
✖ This else clause can be omitted because previous branches break early.

```js
function f(x) {
    if (x < 0) {
        throw new RangeError();
    } else {
        return x;
    }
}
```

code-block.js:4:7 lint/style/noUselessElse FIXABLE 
✖ This else clause can be omitted because previous branches break early.

**Valid**

```js
function f(x) {
    if (x < 0) {
        return 0;
    }
    return x;
}
```

```js
function f(x) {
    if (x < 0) {
        console.info("negative number");
    } else if (x > 0) {
        return x;
    } else {
        console.info("number 0");
    }
}
```

**Related links**
- Disable a rule
- Configure the rule fix
- Rule options

# noUselessEmptyExport

Disallow empty exports that don't change anything in a module file.

**Diagnostic Category:** `lint/complexity/noUselessEmptyExport`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

Sources: 
- Same as: `@typescript-eslint/no-useless-empty-export`

An empty `export {}` is sometimes useful to turn a file that would otherwise be a script into a module. According to the TypeScript Handbook Modules page:

> In TypeScript, just as in ECMAScript 2015, any file containing a top-level import or export is considered a module. Conversely, a file without any top-level import or export declarations is treated as a script whose contents are available in the global scope.

However, an `export {}` statement does nothing if there are any other top-level import or export in the file.

## Examples

### Invalid

```js
import { A } from "module";
export {};
```

Diagnostic:
```
code-block.js:2:1 lint/complexity/noUselessEmptyExport FIXABLE
✖ This empty export is useless because there's another export or import.
1 │ import { A } from "module";
> 2 │ export {};
3 │
ℹ This import makes useless the empty export.
> 1 │ import { A } from "module";
   │ ^^^^^^^^^^
2 │ export {};
3 │
ℹ Safe fix: Remove this useless empty export.
1 │ import { A } from "module";
2 │ - export {};
3 │
```

```js
export const A = 0;
export {};
```

Diagnostic:
```
code-block.js:2:1 lint/complexity/noUselessEmptyExport FIXABLE
✖ This empty export is useless because there's another export or import.
1 │ export const A = 0;
> 2 │ export {};
3 │
ℹ This export makes useless the empty export.
> 1 │ export const A = 0;
   │ ^^^^^^^^^^
2 │ export {};
3 │
ℹ Safe fix: Remove this useless empty export.
1 │ export const A = 0;
2 │ - export {};
3 │
```

### Valid

```js
export {};
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noUselessEscapeInRegex

Disallow unnecessary escape sequence in regular expression literals.

**Diagnostic Category:** `lint/nursery/noUselessEscapeInRegex`

**Since:** `v1.9.0`

**Note:** This rule has a **safe** fix.

**Caution:** This rule is part of the nursery group.

**Sources:** Same as: no-useless-escape

Escaping non-special characters in regular expression literals doesn't have any effect, which may confuse a reader.

## Examples

### Invalid

```js
/\a/;
```
code-block.js:1:2 lint/nursery/noUselessEscapeInRegex FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ The character doesn't need to be escaped.  
1 │ /\a/;  
  │ ^  
2 │  
ℹ Safe fix: Unescape the character.  
1 │ /a/;  
  │ -  

```js
/[\-]/;
```
code-block.js:1:3 lint/nursery/noUselessEscapeInRegex FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ The character doesn't need to be escaped.  
1 │ /[\-]/;  
  │ ^^  
2 │  
ℹ The character should only be escaped if it appears in the middle of the character class or under the v flag.  
ℹ Safe fix: Unescape the character.  
1 │ /[-]/;  
  │  

```js
/[\&]/v;
```
code-block.js:1:3 lint/nursery/noUselessEscapeInRegex FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ The character doesn't need to be escaped.  
1 │ /[\&]/v;  
  │ ^^  
2 │  
ℹ Safe fix: Unescape the character.  
1 │ /[&]/v;  
  │  

### Valid

```js
/\^\d\b/
```

```js
/[\b]/
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noUselessFragments

**Description:** Disallow unnecessary fragments

**Diagnostic Category:** `lint/complexity/noUselessFragments`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:** Same as: `react/jsx-no-useless-fragment`

## Examples

### Invalid

```jsx
<>
foo
</>
```
```
code-block.jsx:1:1 lint/complexity/noUselessFragments FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Avoid using unnecessary Fragment.

> 1 │ <>
   │ ^^
> 2 │ foo
> 3 │ </>
   │ ^^^
  
ℹ A fragment is redundant if it contains only one child, or if it is the child of a html element, and is not a keyed fragment.

ℹ Unsafe fix: Remove the Fragment

1 │ -
2 │ foo
3 │ -
```

```jsx
<React.Fragment>
foo
</React.Fragment>
```
```
code-block.jsx:1:1 lint/complexity/noUselessFragments FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Avoid using unnecessary Fragment.

> 1 │ <React.Fragment>
   │ ^^^^^^^^^^^^^^^^
> 2 │ foo
> 3 │ </React.Fragment>
   │ ^^^^^^^^^^^^^^^^
  
ℹ A fragment is redundant if it contains only one child, or if it is the child of a html element, and is not a keyed fragment.

ℹ Unsafe fix: Remove the Fragment

1 │ -
2 │ foo
3 │ -
```

```jsx
<>
    <>foo</>
    <SomeComponent />
</>
```
```
code-block.jsx:2:5 lint/complexity/noUselessFragments FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Avoid using unnecessary Fragment.

1 │ <>
> 2 │     <>foo</>
   │    ^^^^^^
3 │     <SomeComponent />
4 │ </>
  
ℹ A fragment is redundant if it contains only one child, or if it is the child of a html element, and is not a keyed fragment.

ℹ Unsafe fix: Remove the Fragment
```

```jsx
<></>
```
```
code-block.jsx:1:1 lint/complexity/noUselessFragments ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Avoid using unnecessary Fragment.

> 1 │ <></>
   │ ^^^^
  
ℹ A fragment is redundant if it contains only one child, or if it is the child of a html element, and is not a keyed fragment.
```

### Valid

```jsx
<>
    <Foo />
    <Bar />
</>
```

```jsx
<>foo {bar}</>
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noUselessLabel

Disallow unnecessary labels.

**Diagnostic Category: `lint/complexity/noUselessLabel`**

**Since**: `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

Sources: 
- Same as: no-extra-label

Disallow unnecessary labels. If a loop contains no nested loops or switches, labeling the loop is unnecessary.

## Examples

### Invalid

```js
loop: while(a) {
    break loop;
}
```

code-block.js:2:11 lint/complexity/noUselessLabel FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unnecessary label.

1 │ loop: while(a) {
2 │     break loop;
   │          ^^^^
3 │ }
4 │ 

ℹ Safe fix: Remove the unnecessary label. You can achieve the same result without the label.

2 │ break loop;

### Valid

```js
outer: while(a) {
    while(b) {
        break outer;
    }
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noUselessLoneBlockStatements

Disallow unnecessary nested block statements.

**Diagnostic Category:** `lint/complexity/noUselessLoneBlockStatements`

**Since:** `v1.3.3`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

Sources: 
- Same as: no-lone-blocks (https://eslint.org/docs/latest/rules/no-lone-blocks)

Disallow unnecessary nested block statements.

In JavaScript, prior to ES6, standalone code blocks delimited by curly braces do not create a new scope and have no use. In ES6, code blocks may create a new scope if a block-level binding (let and const), a class declaration, or a function declaration (in strict mode) are present. A block is not considered redundant in these cases.

## Examples

### Invalid

```js
{}
```

code-block.js:1:1 lint/complexity/noUselessLoneBlockStatements ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ This block statement doesn't serve any purpose and can be safely removed.  
1 │ {}  
  │ ^  
2 │  

ℹ Standalone block statements without any block-level declarations are redundant in JavaScript and can be removed to simplify the code.

```js
if (foo) {
  bar();
  {
    baz();
  }
}
```

code-block.js:3:3 lint/complexity/noUselessLoneBlockStatements FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ This block statement doesn't serve any purpose and can be safely removed.  
1 │ if (foo) {  
2 │   bar();  
> 3 │   {  
  │ ^  
> 4 │     baz();  
> 5 │   }  
  │ ^  
6 │ }  
7 │  

ℹ Standalone block statements without any block-level declarations are redundant in JavaScript and can be removed to simplify the code.  
ℹ Safe fix: Remove redundant block.

1 │ if (foo) {  
2 │   bar();  
- ·  
- ·  
{  
3 │     baz();  
4 │   }  
5 │ }  

### Valid

```js
while (foo) {
  bar();
}
```

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)

# noUselessRename

Disallow renaming import, export, and destructured assignments to the same name.

**Diagnostic Category:** `lint/complexity/noUselessRename`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

**Sources:** 
- Same as: `no-useless-rename` (see ESLint documentation)

ES2015 allows for the renaming of references in import and export statements as well as destructuring assignments. This gives programmers a concise syntax for performing these operations while renaming these references:

```js
import { foo as bar } from "baz";
export { foo as bar };
let { foo: bar } = baz;
```

With this syntax, it is possible to rename a reference to the same name. This is a completely redundant operation, as this is the same as not renaming at all.

## Examples

### Invalid

```js
import { foo as foo } from "bar";
```

```
code-block.js:1:10 lint/complexity/noUselessRename FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Useless rename.
> 1 │ import { foo as foo } from "bar";
   │         ^^^^^^^^^^^
2 │ 
ℹ Safe fix: Remove the renaming.
1 │ import { foo } from "bar";
   │             ---------
```

```js
export { foo as foo };
```

```
code-block.js:1:10 lint/complexity/noUselessRename FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Useless rename.
> 1 │ export { foo as foo };
   │         ^^^^^^^^^^^
2 │ 
ℹ Safe fix: Remove the renaming.
1 │ export { foo };
   │             ----
```

```js
let { foo: foo } = bar;
```

```
code-block.js:1:7 lint/complexity/noUselessRename FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ Useless rename.
> 1 │ let { foo: foo } = bar;
   │       ^^^^^^^^^
2 │ 
ℹ Safe fix: Remove the renaming.
1 │ let { foo } = bar;
   │         ---------
```

### Valid

```js
import { foo as bar } from "baz";
```

```js
export { foo as bar };
```

```js
let { foo: bar } = baz;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noUselessStringConcat

Disallow unnecessary concatenation of string or template literals.

**Diagnostic Category:** `lint/complexity/noUselessStringConcat`

**Since:** `v1.8.0`

**Note:** This rule has an **unsafe** fix.

**Sources:** Same as: no-useless-concat

This rule aims to flag the concatenation of 2 literals when they could be combined into a single literal. Literals can be strings or template literals. Concatenation of multiple strings is allowed when the strings are spread over multiple lines to prevent exceeding the maximum line width.

## Examples

### Invalid

```js
const a = "a" + "b";
```

code-block.js:1:11 lint/complexity/noUselessStringConcat FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Useless string concatenation.

> 1 │ const a = "a" + "b";
>   │          ^^^^^^^^^^
> 2 │ 

ℹ Consider turning the expression into a single string to improve readability and runtime performance.

ℹ Unsafe fix: Remove the useless concatenation

```js
const a = "a" + "b" + "c";
```

code-block.js:1:11 lint/complexity/noUselessStringConcat FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Useless string concatenation.

> 1 │ const a = "a" + "b" + "c";
>   │          ^^^^^^^^^^^^^^^^^
> 2 │ 

ℹ Consider turning the expression into a single string to improve readability and runtime performance.

ℹ Unsafe fix: Remove the useless concatenation

```js
const a = (foo + "a") + ("b" + "c");
```

code-block.js:1:26 lint/complexity/noUselessStringConcat FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Useless string concatenation.

> 1 │ const a = (foo + "a") + ("b" + "c");
>   │                         ^^^^^^^^^^^^
> 2 │ 

ℹ Consider turning the expression into a single string to improve readability and runtime performance.

ℹ Unsafe fix: Remove the useless concatenation

### Valid

```js
const a = 1 + 1;
```

```js
const a = 1 * '2';
```

```js
const a = 1 - 2;
```

```js
const a = foo + bar;
```

```js
const a = 'foo' + bar;
```

```js
const a = 'foo' +
          'bar';
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noUselessStringRaw

Disallow unnecessary `String.raw` function in template string literals without any escape sequence.

**Diagnostic Category:** `lint/nursery/noUselessStringRaw`  
**Since:** `v1.9.4`  
**Caution:** This rule is part of the nursery group.

`String.raw` is useless when it contains a raw string without any escape-like sequence.

## Examples

### Invalid

```js
String.raw`a`;
```
code-block.js:1:1 lint/nursery/noUselessStringRaw ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ String.raw is useless when the raw string doesn't contain any escape sequence.  
> 1 │ String.raw`a`;  
> 2 │  
ℹ Remove the String.raw call because it's useless here, String.raw can deal with strings that contain escape sequences like \n, \t, \r, \\, \", \'.

```js
String.raw`a ${v}`;
```
code-block.js:1:1 lint/nursery/noUselessStringRaw ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ String.raw is useless when the raw string doesn't contain any escape sequence.  
> 1 │ String.raw`a ${v}`;  
> 2 │  
ℹ Remove the String.raw call because it's useless here, String.raw can deal with strings that contain escape sequences like \n, \t, \r, \\, \", \'.

### Valid

```js
String.raw`\n ${a}`;
```

```js
String.raw`\n`;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noUselessSwitchCase

Disallow useless `case` in `switch` statements.

**Diagnostic Category:** `lint/complexity/noUselessSwitchCase`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

Sources: 
- Same as: `unicorn/no-useless-switch-case`

A `switch` statement can optionally have a `default` clause. The `default` clause will be executed only if there is no match in the `case` clauses. An empty `case` clause that precedes the `default` clause is thus useless.

## Examples

### Invalid

```js
switch (foo) {
    case 0:
    default:
        break;
    case 1:
        break;
}
```

**Error:**
code-block.js:2:5 lint/complexity/noUselessSwitchCase FIXABLE 
✖ Useless case clause.

**Unsafe fix:** Remove the useless case.

```js
switch (foo) {
    default:
    case 0:
        break;
    case 1:
        break;
}
```

**Error:**
code-block.js:3:5 lint/complexity/noUselessSwitchCase FIXABLE 
✖ Useless case clause.

**Unsafe fix:** Remove the useless case.

### Valid

```js
switch (foo) {
    case 0:
        break;
    default:
        break;
}
```

```js
switch (foo) {
    case 0:
        break;
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noUselessTernary

Disallow ternary operators when simpler alternatives exist.

**Diagnostic Category:** `lint/complexity/noUselessTernary`

**Since:** `v1.5.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

Sources: 
- Same as: `no-unneeded-ternary`

Disallow ternary operators when simpler alternatives exist.

It’s a common mistake in JavaScript to use a conditional expression to select between two boolean values instead of using the logical NOT (`!`) or double NOT (`!!`) to convert the test to a boolean.

## Examples

### Invalid

```js
var a = x ? true : true;
```
code-block.js:1:9 lint/complexity/noUselessTernary FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unnecessary use of boolean literals in conditional expression.

> 1 │ var a = x ? true : true;
   │        ^^^^^^^^^^^^^^^^^^
  
ℹ Simplify your code by directly assigning the result without using a ternary operator.

ℹ If your goal is negation, you may use the logical NOT (!) or double NOT (!!) operator for clearer and concise code. Check for more details about NOT operator.

ℹ Unsafe fix: Remove the conditional expression with

```js
var a = x;
```

```js
var a = foo === 1 ? false : true;
```
code-block.js:1:9 lint/complexity/noUselessTernary FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unnecessary use of boolean literals in conditional expression.

> 1 │ var a = foo === 1 ? false : true;
   │        ^^^^^^^^^^^^^^^^^^^^^^^^^^
  
ℹ Simplify your code by directly assigning the result without using a ternary operator.

ℹ If your goal is negation, you may use the logical NOT (!) or double NOT (!!) operator for clearer and concise code. Check for more details about NOT operator.

ℹ Unsafe fix: Remove the conditional expression with

```js
var a = foo !== 1;
```

```js
var a = foo + 1 ? false : true;
```
code-block.js:1:9 lint/complexity/noUselessTernary FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unnecessary use of boolean literals in conditional expression.

> 1 │ var a = foo + 1 ? false : true;
   │        ^^^^^^^^^^^^^^^^^^^^^^^^^
  
ℹ Simplify your code by directly assigning the result without using a ternary operator.

ℹ If your goal is negation, you may use the logical NOT (!) or double NOT (!!) operator for clearer and concise code. Check for more details about NOT operator.

ℹ Unsafe fix: Remove the conditional expression with

```js
var a = !(foo + 1);
```

```js
var a = foo + 1 ? true : false;
```
code-block.js:1:9 lint/complexity/noUselessTernary FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unnecessary use of boolean literals in conditional expression.

> 1 │ var a = foo + 1 ? true : false;
   │        ^^^^^^^^^^^^^^^^^^^^^^^^^
  
ℹ Simplify your code by directly assigning the result without using a ternary operator.

ℹ If your goal is negation, you may use the logical NOT (!) or double NOT (!!) operator for clearer and concise code. Check for more details about NOT operator.

ℹ Unsafe fix: Remove the conditional expression with

```js
var a = !!(foo + 1);
```

### Valid

```js
var a = x === 2 ? 'Yes' : 'No';
```

```js
var a = x === 2 ? 'Yes' : false;
```

## Resources

Logical NOT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noUselessThisAlias

Disallow useless `this` aliasing.

**Diagnostic Category:** `lint/complexity/noUselessThisAlias`  
**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

**Sources:**  
- Inspired from: @typescript-eslint/no-this-alias

Disallow useless `this` aliasing. Arrow functions inherit `this` from their enclosing scope; this makes `this` aliasing useless in this situation.

## Examples

### Invalid

```js
class A {
    method() {
        const self = this;
        return () => {
            return self;
        }
    }
}
```

**Error:**  
code-block.js:3:15 lint/complexity/noUselessThisAlias FIXABLE  
✖ This aliasing of this is unnecessary.

**Safe fix:** Use `this` instead of an alias.

```js
class A {
    method() {
        return () => {
            return this;
        }
    }
}
```

### Valid

```js
class A {
    method() {
        const self = this;
        return function() {
            this.g();
            return self;
        }
    }
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noUselessTypeConstraint

Disallow using `any` or `unknown` as type constraint.

**Diagnostic Category:** `lint/complexity/noUselessTypeConstraint`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

Sources: 
- Same as: @typescript-eslint/no-unnecessary-type-constraint

Generic type parameters (`<T>`) in TypeScript may be **constrained** with `extends`. A supplied type must then be a subtype of the supplied constraint. All types are subtypes of `any` and `unknown`. It is thus useless to extend from `any` or `unknown`.

## Examples

### Invalid

```ts
interface FooAny<T extends any> {}
```
Diagnostic: Constraining a type parameter to `any` or `unknown` is useless.  
Safe fix: Remove the constraint.

```ts
type BarAny<T extends any> = {};
```
Diagnostic: Constraining a type parameter to `any` or `unknown` is useless.  
Safe fix: Remove the constraint.

```ts
class BazAny<T extends any> {}
```
Diagnostic: Constraining a type parameter to `any` or `unknown` is useless.  
Safe fix: Remove the constraint.

```ts
class BazAny {
  quxAny<U extends any>() {}
}
```
Diagnostic: Constraining a type parameter to `any` or `unknown` is useless.  
Safe fix: Remove the constraint.

```ts
const QuuxAny = <T extends any>() => {};
```
Diagnostic: Constraining a type parameter to `any` or `unknown` is useless.  
Safe fix: Remove the constraint.

```ts
function QuuzAny<T extends any>() {}
```
Diagnostic: Constraining a type parameter to `any` or `unknown` is useless.  
Safe fix: Remove the constraint.

```ts
interface FooUnknown<T extends unknown> {}
```
Diagnostic: Constraining a type parameter to `any` or `unknown` is useless.  
Safe fix: Remove the constraint.

```ts
type BarUnknown<T extends unknown> = {};
```
Diagnostic: Constraining a type parameter to `any` or `unknown` is useless.  
Safe fix: Remove the constraint.

```ts
class BazUnknown<T extends unknown> {}
```
```ts
class BazUnknown {
  quxUnknown<U extends unknown>() {}
}
```
Diagnostic: unterminated template literal.

```ts
const QuuxUnknown = <T extends unknown>() => {};
```
Diagnostic: Constraining a type parameter to `any` or `unknown` is useless.  
Safe fix: Remove the constraint.

```ts
function QuuzUnknown<T extends unknown>() {}
```
Diagnostic: Constraining a type parameter to `any` or `unknown` is useless.  
Safe fix: Remove the constraint.

### Valid

```ts
interface Foo<T> {}

type Bar<T> = {};
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noUselessUndefinedInitialization

**Description:** Disallow initializing variables to `undefined`.

**Diagnostic Category:** `lint/complexity/noUselessUndefinedInitialization`

**Since:** `v1.7.2`

**Note:** This rule has a safe fix.

**Sources:** Same as: `no-undef-init` (https://eslint.org/docs/latest/rules/no-undef-init)

A variable that is declared and not initialized to any value automatically gets the value of `undefined`. It’s considered a best practice to avoid initializing variables to `undefined`. Any inline comments attached to the initialization value or variable will be moved to the end of the variable declaration on auto-fix. This differs from Eslint's behavior.

## Examples

### Invalid

```js
var a = undefined;
```

**Warning:** It's not necessary to initialize `a` to undefined.

```js
let b = undefined, c = 1, d = 2;
```

**Warning:** It's not necessary to initialize `b` to undefined.

```js
for (let i = 0; i < 100; i++) {
	let i = undefined;
}
```

**Warning:** It's not necessary to initialize `i` to undefined.

```js
let f = /**/undefined/**/ ;
```

**Warning:** It's not necessary to initialize `f` to undefined.

### Valid

```js
var a = 1;
```

```js
class Foo {
	bar = undefined;
}
```

## Related links

- Disable a rule (link)
- Configure the rule fix (link)
- Rule options (link)

# noUselessUndefined

Disallow the use of useless `undefined`.

**Diagnostic Category:** `lint/nursery/noUselessUndefined`

**Since:** `vnext`

- This rule has a **safe** fix.

**Caution:** This rule is part of the nursery group.

**Sources:** Same as: `unicorn/no-useless-undefined`

`undefined` is the default value for new variables, parameters, return statements, etc., so specifying it doesn't make any difference.

## Examples

### Invalid

```js
let foo = undefined;
```
```
code-block.js:1:11 lint/nursery/noUselessUndefined FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠ Don't use unnecessary undefined.
1 │ let foo = undefined;
   │          ^^^^^^^^^^
2 │
ℹ undefined is the default value for new variables, parameters, return statements, etc… so specifying it doesn't make any difference.
ℹ Safe fix: Remove the undefined.
```

```js
const {foo = undefined} = bar;
```
```
code-block.js:1:14 lint/nursery/noUselessUndefined FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠ Don't use unnecessary undefined.
1 │ const {foo = undefined} = bar;
   │             ^^^^^^^^^^
2 │
ℹ undefined is the default value for new variables, parameters, return statements, etc… so specifying it doesn't make any difference.
ℹ Safe fix: Remove the undefined.
```

```js
const noop = () => undefined;
```
```
code-block.js:1:20 lint/nursery/noUselessUndefined FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠ Don't use unnecessary undefined.
1 │ const noop = () => undefined;
   │                   ^^^^^^^^^^
2 │
ℹ undefined is the default value for new variables, parameters, return statements, etc… so specifying it doesn't make any difference.
ℹ Safe fix: Remove the undefined.
```

```js
function foo() {
   return undefined;
}
```
```
code-block.js:2:11 lint/nursery/noUselessUndefined FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠ Don't use unnecessary undefined.
1 │ function foo() {
2 │    return undefined;
   │          ^^^^^^^^^^
3 │ }
ℹ undefined is the default value for new variables, parameters, return statements, etc… so specifying it doesn't make any difference.
ℹ Safe fix: Remove the undefined.
```

```js
function* foo() {
  yield undefined;
}
```
```
code-block.js:2:9 lint/nursery/noUselessUndefined FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠ Don't use unnecessary undefined.
1 │ function* foo() {
2 │   yield undefined;
   │         ^^^^^^^^^^
3 │ }
ℹ undefined is the default value for new variables, parameters, return statements, etc… so specifying it doesn't make any difference.
ℹ Safe fix: Remove the undefined.
```

```js
function foo(bar = undefined) {}
```
```
code-block.js:1:20 lint/nursery/noUselessUndefined FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠ Don't use unnecessary undefined.
1 │ function foo(bar = undefined) {}
   │                   ^^^^^^^^^^
2 │
ℹ undefined is the default value for new variables, parameters, return statements, etc… so specifying it doesn't make any difference.
ℹ Safe fix: Remove the undefined.
```

```js
function foo({bar = undefined}) {}
```
```
code-block.js:1:21 lint/nursery/noUselessUndefined FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠ Don't use unnecessary undefined.
1 │ function foo({bar = undefined}) {}
   │                     ^^^^^^^^^^
2 │
ℹ undefined is the default value for new variables, parameters, return statements, etc… so specifying it doesn't make any difference.
ℹ Safe fix: Remove the undefined.
```

### Valid

```js
let foo;
const {foo} = bar;
function foo() {
  return;
}
function* foo() {
  yield;
}
function foo(bar) {}
function foo({bar}) {}
foo();
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noValueAtRule

Disallow use of `@value` rule in CSS modules.

**Diagnostic Category:** `lint/nursery/noValueAtRule`  
**Since:** `v1.8.0`  
**Caution:** This rule is part of the nursery group.

Use of CSS variables is recommended instead of `@value` rule.

## Examples

### Invalid

```css
@value red: #FF0000;
```

code-block.css:1:2 parse  
✖ @value at-rule is not a standard CSS feature.  
> 1 │ @value red: #FF0000;  
  │ ^^^^^  
2 │  

ℹ You can enable @value at-rule parsing by setting the `css.parser.cssModules` option to `true` in your configuration file.

### Valid

```css
:root {
  --red: #FF0000;
}

p {
  background-color: var(--red);
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noVar

**Description:** Disallow the use of `var`

**Diagnostic Category:** `lint/style/noVar`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:** 
- Same as: no-var

Disallow the use of `var`

ECMAScript 6 allows programmers to create variables with block scope instead of function scope using the let and const keywords. Block scope is common in many other programming languages and helps programmers avoid mistakes.

## Examples

### Invalid

```js
var foo = 1;
```

code-block.js:1:1 lint/style/noVar FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Use let or const instead of var.

> 1 │ var foo = 1;
>   │ ^^^^^^^^^^^
> 2 │ 

ℹ A variable declared with var is accessible in the whole module. Thus, the variable can be accessed before its initialization and outside the block where it is declared.

ℹ See MDN web docs for more details.

ℹ Unsafe fix: Use 'const' instead.

### Valid

```js
const foo = 1;
let bar = 1;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noVoidElementsWithChildren

This rule prevents void elements (AKA self-closing elements) from having children.

**Diagnostic Category:** `lint/correctness/noVoidElementsWithChildren`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:**
- Same as: `react/void-dom-elements-no-children`

## Examples

### Invalid

```jsx
<br>invalid child</br>
```

```
code-block.jsx:1:1 lint/correctness/noVoidElementsWithChildren FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ br is a void element tag and must not have children.
> 1 │ <br>invalid child</br>
   │ ^^^^^^^^^^^
2 │ 

ℹ Unsafe fix: Remove the children.
1 │ <br> 
```

```jsx
<img alt="some text" children={"some child"} />
```

```
code-block.jsx:1:1 lint/correctness/noVoidElementsWithChildren FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ img is a void element tag and must not have children.
> 1 │ <img alt="some text" children={"some child"} />
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Unsafe fix: Remove the children.
1 │ <img alt="some text" />
```

```js
React.createElement('img', {}, 'child')
```

```
code-block.js:1:1 lint/correctness/noVoidElementsWithChildren FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ img is a void element tag and must not have children.
> 1 │ React.createElement('img', {}, 'child')
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Unsafe fix: Remove the children.
1 │ React.createElement('img', {});
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noVoidTypeReturn

**Description:** Disallow returning a value from a function with the return type 'void'.

**Diagnostic Category:** `lint/correctness/noVoidTypeReturn`

**Since:** `v1.0.0`

**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Returning a value when the return type of a function is 'void' is an error, as 'void' indicates the absence of a value. Only returning without a value is allowed, as it’s a control flow statement.

## Examples

### Invalid

```ts
class A {
    f(): void {
        return undefined;
    }
}
```
Diagnostic: The function should not return a value because its return type is void.

```ts
const a = {
    f(): void {
        return undefined;
    }
}
```
Diagnostic: The function should not return a value because its return type is void.

```ts
function f(): void {
    return undefined;
}
```
Diagnostic: The function should not return a value because its return type is void.

```ts
export default function(): void {
    return undefined;
}
```
Diagnostic: The function should not return a value because its return type is void.

```ts
const g = (): void => {
    return undefined;
};
```
Diagnostic: The function should not return a value because its return type is void.

```ts
const h = function(): void {
    return undefined;
};
```
Diagnostic: The function should not return a value because its return type is void.

### Valid

```js
class A {
    f() {
        return undefined;
    }
}
```

```ts
class B {
    f(): void {}
}
```

```ts
function f(): void {
    return;
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noVoid

Disallow the use of `void` operators, which is not a familiar operator.

**Diagnostic Category: `lint/complexity/noVoid`**

**Since**: `v1.0.0`  
Sources: Same as: no-void (see ESLint documentation)

The `void` operator is often used merely to obtain the undefined primitive value, usually using `void(0)` (which is equivalent to `void 0`). In these cases, the global variable `undefined` can be used.

## Examples

### Invalid

```js
void 0;
```

code-block.js:1:1 lint/complexity/noVoid ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ The use of void is not allowed.  
> 1 │ void 0;  
>   │ ^^^^^^  
> 2 │  

ℹ If you use void to alter the return type of a function or return `undefined`, use the global `undefined` instead.

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# noWith

**Description:** Disallow `with` statements in non-strict contexts.

**Diagnostic Category:** `lint/complexity/noWith`

**Since:** `v1.0.0`

**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:** Same as: no-with (https://eslint.org/docs/latest/rules/no-with)

Disallow `with` statements in non-strict contexts. The `with` statement is potentially problematic because it adds members of an object to the current scope, making it impossible to tell what a variable inside the block actually refers to.

## Examples

### Invalid

```cjs
function f() {
  with (point) {
    r = Math.sqrt(x * x + y * y); // is r a member of point?
  }
}
```

**Error Message:**
code-block.cjs:2:3 lint/complexity/noWith ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unexpected use of with statement.

1 │ function f() {
2 │   with (point) {
3 │     r = Math.sqrt(x * x + y * y); // is r a member of point?
4 │   }
5 │ }

ℹ The with statement is potentially problematic because it adds members of an object to the current scope, making it impossible to tell what a variable inside the block actually refers to.

## Related links

- Disable a rule (link)
- Configure the rule fix (link)
- Rule options (link)

# noYodaExpression

**Description:** Disallow the use of yoda expressions.

**Diagnostic Category:** `lint/style/noYodaExpression`

**Since:** `v1.8.0`

**Note:** This rule has a **safe** fix.

**Sources:** Same as: `yoda` (ESLint documentation)

Disallow the use of yoda expressions. A Yoda expression is a programming style where the "static" part of the binary operation is placed on the left-hand side. This rule **forbids** the use of Yoda expressions and enforces placing the "static" part of the binary operations on the right-hand side.

## Exceptions

Range expressions like `0 < value && value < 1` or `value <= 0 || 1 < value` are allowed.

## Examples

### Invalid

```js
if ("red" == value) {}
```

**Warning:** Avoid the use of yoda expressions.  
**Fixable:** Yes  
**Safe fix:** Flip the operators of the expression.

```js
if (true === value) {}
```

**Warning:** Avoid the use of yoda expressions.  
**Fixable:** Yes  
**Safe fix:** Flip the operators of the expression.

```js
if (5 != value) {}
```

**Warning:** Avoid the use of yoda expressions.  
**Fixable:** Yes  
**Safe fix:** Flip the operators of the expression.

### Valid

```js
if (value === "red") {}
```

```js
if (value === value) {}
```

```js
if (value != 5) {}
```

```js
if (0 < value && value < 1) {}
```

## Resources

- Wikipedia definition of Yoda conditions

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useAdjacentOverloadSignatures

**Description**: Disallow the use of overload signatures that are not next to each other.

**Diagnostic Category**: `lint/nursery/useAdjacentOverloadSignatures`

**Since**: `v1.9.0`

**Caution**: This rule is part of the nursery group.

**Sources**: Same as: `@typescript-eslint/adjacent-overload-signatures`

Overload signatures must be adjacent. If a key is defined multiple times, only the last definition takes effect. Previous definitions are ignored. This rule is useful for preventing accidental overloads that are not adjacent. It is recommended to keep the overload signatures adjacent to make the code easier to read and maintain.

## Examples

### Invalid

```ts
type Foo = {
  foo_type(s: string): void;
  foo_type(n: number): void;
  bar_type(): void;
  foo_type(sn: string | number): void;
};
```
Diagnostic: 
code-block.ts:5:3 lint/nursery/useAdjacentOverloadSignatures ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ All foo_type signatures must be adjacent.  
3 │  foo_type(n: number): void;  
4 │  bar_type(): void;  
5 │  foo_type(sn: string | number): void;  
6 │ };

```ts
interface Foo {
  foo_interface(s: string): void;
  foo_interface(n: number): void;
  bar_interface(): void;
  foo_interface(sn: string | number): void;
}
```
Diagnostic: 
code-block.ts:5:3 lint/nursery/useAdjacentOverloadSignatures ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ All foo_interface signatures must be adjacent.  
3 │  foo_interface(n: number): void;  
4 │  bar_interface(): void;  
5 │  foo_interface(sn: string | number): void;  
6 │ };

```ts
class A {
  fooA(s: string): void;
  fooA(n: number): void;
  barA(): void {};
  fooA(sn: string | number): void {};
}
```

### Valid

```ts
declare namespace Foo {
  export function foo_declare(s: string): void;
  export function foo_declare(n: number): void;
  export function foo_declare(sn: string | number): void;
  export function bar_declare(): void;
}
```

```ts
type Foo = {
  foo_type(s: string): void;
  foo_type(n: number): void;
  foo_type(sn: string | number): void;
  bar_type(): void;
};
```

```ts
interface Foo {
  foo_interface(s: string): void;
  foo_interface(n: number): void;
  foo_interface(sn: string | number): void;
  bar_interface(): void;
}
```

```ts
class A {
  fooA(s: string): void;
  fooA(n: number): void;
  fooA(sn: string | number): void {}
  barA(): void {}
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useAltText

Enforce that all elements that require alternative text have meaningful information to relay back to the end user.

**Diagnostic Category:** `lint/a11y/useAltText`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `jsx-a11y/alt-text`

This is a critical component of accessibility for screen reader users in order for them to understand the content's purpose on the page. By default, this rule checks for alternative text on the following elements: `<img>`, `<area>`, `<input type="image">`, and `<object>`.

## Examples

### Invalid

```jsx
<img src="image.png" />
```

```
code-block.jsx:1:1 lint/a11y/useAltText ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a text alternative through the alt, aria-label or aria-labelledby attribute

> 1 │ <img src="image.png" />
   │ ^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Meaningful alternative text on elements helps users relying on screen readers to understand content's purpose within a page.

ℹ If the content is decorative, redundant, or obscured, consider hiding it from assistive technologies with the aria-hidden attribute.
```

```jsx
<input type="image" src="image.png" />
```

```
code-block.jsx:1:1 lint/a11y/useAltText ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a text alternative through the alt, aria-label or aria-labelledby attribute

> 1 │ <input type="image" src="image.png" />
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Meaningful alternative text on elements helps users relying on screen readers to understand content's purpose within a page.

ℹ If the content is decorative, redundant, or obscured, consider hiding it from assistive technologies with the aria-hidden attribute.
```

### Valid

```jsx
<img src="image.png" alt="image alt" />
```

```jsx
<input type="image" src="image.png" alt="alt text" />
```

```jsx
<input type="image" src="image.png" aria-label="alt text" />
```

```jsx
<input type="image" src="image.png" aria-labelledby="someId" />
```

## Accessibility guidelines

- WCAG 1.1.1

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useAnchorContent

Enforce that anchors have content and that the content is accessible to screen readers.

**Diagnostic Category:** `lint/a11y/useAnchorContent`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

Sources: 
- Same as: `jsx-a11y/anchor-has-content`

Accessible means the content is not hidden using the `aria-hidden` attribute. Refer to the references to learn about why this is important.

## Examples

### Invalid

```jsx
<a />
```

```
code-block.jsx:1:1 lint/a11y/useAnchorContent ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide screen reader accessible content when using `a` elements.

> 1 │ <a />
   │ ^^^^^^^^^
2 │ 

ℹ All links on a page should have content that is accessible to screen readers.

ℹ Accessible content refers to digital content that is designed and structured in a way that makes it easy for people with disabilities to access, understand, and interact with using assistive technologies.

ℹ Follow these links for more information,
WCAG 2.4.4
WCAG 4.1.2
```

```jsx
<a></a>
```

```
code-block.jsx:1:1 lint/a11y/useAnchorContent ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide screen reader accessible content when using `a` elements.

> 1 │ <a></a>
   │ ^^^^^^^^
2 │ 

ℹ All links on a page should have content that is accessible to screen readers.

ℹ Accessible content refers to digital content that is designed and structured in a way that makes it easy for people with disabilities to access, understand, and interact with using assistive technologies.

ℹ Follow these links for more information,
WCAG 2.4.4
WCAG 4.1.2
```

```jsx
<a>    </a>
```

```
code-block.jsx:1:1 lint/a11y/useAnchorContent ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide screen reader accessible content when using `a` elements.

> 1 │ <a>    </a>
   │ ^^^^^^^^^^
2 │ 

ℹ All links on a page should have content that is accessible to screen readers.

ℹ Accessible content refers to digital content that is designed and structured in a way that makes it easy for people with disabilities to access, understand, and interact with using assistive technologies.

ℹ Follow these links for more information,
WCAG 2.4.4
WCAG 4.1.2
```

```jsx
<a aria-hidden>content</a>
```

```
code-block.jsx:1:1 lint/a11y/useAnchorContent FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide screen reader accessible content when using `a` elements.

> 1 │ <a aria-hidden>content</a>
   │ ^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ All links on a page should have content that is accessible to screen readers.

ℹ Accessible content refers to digital content that is designed and structured in a way that makes it easy for people with disabilities to access, understand, and interact with using assistive technologies.

ℹ Follow these links for more information,
WCAG 2.4.4
WCAG 4.1.2

ℹ Unsafe fix: Remove the `aria-hidden` attribute to allow the anchor element and its content visible to assistive technologies.
```

```jsx
<a><span aria-hidden="true">content</span></a>
```

```
code-block.jsx:1:1 lint/a11y/useAnchorContent ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide screen reader accessible content when using `a` elements.

> 1 │ <a><span aria-hidden="true">content</span></a>
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ All links on a page should have content that is accessible to screen readers.

ℹ Accessible content refers to digital content that is designed and structured in a way that makes it easy for people with disabilities to access, understand, and interact with using assistive technologies.

ℹ Follow these links for more information,
WCAG 2.4.4
WCAG 4.1.2
```

### Valid

```jsx
<a>content</a>
```

```jsx
function html() {
    return { __html: "foo" }
}
<a dangerouslySetInnerHTML={html()} />
```

```jsx
<a><TextWrapper aria-hidden={true} />content</a>
```

```jsx
<a><div aria-hidden="true"></div>content</a>
```

## Accessibility guidelines

- WCAG 2.4.4
- WCAG 4.1.2

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useAriaActivedescendantWithTabindex

Enforce that `tabIndex` is assigned to non-interactive HTML elements with `aria-activedescendant`.

**Diagnostic Category: `lint/a11y/useAriaActivedescendantWithTabindex`**

**Since**: `v1.3.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

Sources: 
- Same as: `jsx-a11y/aria-activedescendant-has-tabindex`

`aria-activedescendant` is used to manage focus within a composite widget. The element with the attribute `aria-activedescendant` retains the active document focus. It indicates which of its child elements has a secondary focus by assigning the ID of that element to the value of `aria-activedescendant`. This pattern is used to build a widget like a search typeahead select list. The search input box retains document focus so that the user can type in the input. If the down arrow key is pressed and a search suggestion is highlighted, the ID of the suggestion element will be applied as the value of `aria-activedescendant` on the input element.

Because an element with `aria-activedescendant` must be tabbable, it must either have an inherent tabIndex of zero or declare a tabIndex attribute.

## Examples

### Invalid

```jsx
<div aria-activedescendant={someID} />
```

Diagnostic message:
```
code-block.jsx:1:1 lint/a11y/useAriaActivedescendantWithTabindex FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Enforce elements with aria-activedescendant are tabbable.

> 1 │ <div aria-activedescendant={someID} />
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ aria-activedescendant is used to manage focus within a composite widget.
The element with the attribute aria-activedescendant retains the active document focus.

ℹ Add the tabIndex attribute to the element with a value greater than or equal to -1.

ℹ Unsafe fix: Add the tabIndex attribute.

1 │ <div aria-activedescendant={someID} tabIndex="0" />
   │ ++++++++++++++++
```

### Valid

```jsx
<div aria-activedescendant={someID} tabIndex={0} />
```

```jsx
<input aria-activedescendant={someID} />
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useAriaPropsForRole

Enforce that elements with ARIA roles must have all required ARIA attributes for that role.

**Diagnostic Category:** `lint/a11y/useAriaPropsForRole`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `jsx-a11y/role-has-required-aria-props`

## Examples

### Invalid

```jsx
<span role="checkbox"></span>
```

code-block.jsx:1:7 lint/a11y/useAriaPropsForRole ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ The element with the checkbox ARIA role does not have the required ARIA attributes.  
> 1 │ <span role="checkbox"></span>  
   │      ^^^^^^^^^^^^^^^^^^^^^  
2 │  

ℹ Missing ARIA prop(s):  
- aria-checked  

```jsx
<span role="heading"></span>
```

code-block.jsx:1:7 lint/a11y/useAriaPropsForRole ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ The element with the heading ARIA role does not have the required ARIA attributes.  
> 1 │ <span role="heading"></span>  
   │      ^^^^^^^^^^^^^^^^^^^^^  
2 │  

ℹ Missing ARIA prop(s):  
- aria-level  

### Valid

```jsx
<span role="checkbox" aria-checked="true"></span>
```

```jsx
<span role="heading" aria-level="1"></span>
```

## Accessibility guidelines

- WCAG 4.1.2

### Resources

- ARIA Spec, Roles
- Chrome Audit Rules, AX_ARIA_03

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useAriaPropsSupportedByRole

Enforce that ARIA properties are valid for the roles that are supported by the element.

**Diagnostic Category:** `lint/nursery/useAriaPropsSupportedByRole`

**Since:** `v1.9.0`

**Caution:** This rule is part of the nursery group.

**Sources:** Same as: `jsx-a11y/role-supports-aria-props`

Invalid ARIA properties can make it difficult for users of assistive technologies to understand the purpose of the element.

## Examples

### Invalid

```jsx
<a href="#" aria-checked />
```
```
code-block.jsx:1:1 lint/nursery/useAriaPropsSupportedByRole ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ The ARIA attribute 'aria-checked' is not supported by this element.

1 │ <a href="#" aria-checked />
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Ensure that ARIA attributes are valid for the role of the element.
```

```jsx
<img alt="foobar" aria-checked />
```
```
code-block.jsx:1:1 lint/nursery/useAriaPropsSupportedByRole ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ The ARIA attribute 'aria-checked' is not supported by this element.

1 │ <img alt="foobar" aria-checked />
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Ensure that ARIA attributes are valid for the role of the element.
```

### Valid

```js
<>
    <a href="#" aria-expanded />
    <img alt="foobar" aria-hidden />
    <div role="heading" aria-level="1" />
</>
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useArrayLiterals

**Description:** Disallow Array constructors.

**Diagnostic Category:** `lint/correctness/useArrayLiterals`

**Since:** `v1.7.2`

:::note
- This rule has an **unsafe** fix.
:::

**Sources:** Same as: no-array-constructor

Disallow Array constructors. Use of the Array constructor to construct a new array is generally discouraged in favor of array literal notation because of the single-argument pitfall and because the Array global may be redefined. The exception is when the Array constructor intentionally creates sparse arrays of a specified size by giving the constructor a single numeric argument.

## Examples

### Invalid

```js
Array();
```
Diagnostic: Don't use Array constructors. Use of the Array constructor is not allowed except creating sparse arrays of a specified size by giving a single numeric argument. The array literal notation [] is preferable.

```js
Array(0, 1, 2);
```
Diagnostic: Don't use Array constructors. Use of the Array constructor is not allowed except creating sparse arrays of a specified size by giving a single numeric argument. The array literal notation [] is preferable.

```js
new Array(0, 1, 2);
```
Diagnostic: Don't use Array constructors. Use of the Array constructor is not allowed except creating sparse arrays of a specified size by giving a single numeric argument. The array literal notation [] is preferable.

```js
Array(...args);
```
Diagnostic: Don't use Array constructors. Use of the Array constructor is not allowed except creating sparse arrays of a specified size by giving a single numeric argument. The array literal notation [] is preferable.

### Valid

```js
Array(500);
```

```js
[0, 1, 2];
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useArrowFunction

Use arrow functions over function expressions.

**Diagnostic Category:** `lint/complexity/useArrowFunction`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

**Sources:**
- Inspired from: prefer-arrow-callback

Use arrow functions over function expressions. An arrow function expression is a compact alternative to a regular function expression, with an important distinction: `this` is not bound to the arrow function. It inherits `this` from its parent scope.

This rule proposes turning all function expressions that are not generators (`function*`) and don't use `this` into arrow functions.

## Examples

### Invalid

```js
const z = function() {
    return 0;
}
```

Diagnostic:
- This function expression can be turned into an arrow function.

```js
const delegatedFetch = async function(url) {
    return await fetch(url);
}
```

Diagnostic:
- This function expression can be turned into an arrow function.

### Valid

```js
const f = function() {
    return this.prop;
}
```

Named function expressions are ignored:

```js
const z = function z() {
    return 0;
}
```

Function expressions that declare the type of `this` are also ignored:

```ts
const z = function(this: A): number {
    return 0;
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useAsConstAssertion

Enforce the use of `as const` over literal type and type annotation.

**Diagnostic Category:** `lint/style/useAsConstAssertion`

**Since:** `v1.3.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

**Sources:** Same as: `@typescript-eslint/prefer-as-const`

In TypeScript, there are three common ways to specify that a value is of a specific type such as `2` and not a general type such as `number`:

1. `as const`: telling TypeScript to infer the literal type automatically
2. `as <literal>`: explicitly telling the literal type to TypeScript
3. type annotation: explicitly telling the literal type to TypeScript when declaring variables

The rule suggests using `as const` when you're using `as` with a literal type or type annotation, since `as const` is simpler and doesn't require retyping the value.

## Examples

### Invalid

```ts
let bar: 2 = 2;
```
Diagnostic: 
```
code-block.ts:1:10 lint/style/useAsConstAssertion FIXABLE 
✖ Use as const instead of type annotation.
> 1 │ let bar: 2 = 2;
  │         ^
2 │ 
ℹ as const doesn't require any update when the value is changed.
ℹ Safe fix: Replace with as const.
```

```ts
let foo = { bar: 'baz' as 'baz' };
```
Diagnostic: 
```
code-block.ts:1:27 lint/style/useAsConstAssertion FIXABLE 
✖ Use as const instead of as with a literal type.
> 1 │ let foo = { bar: 'baz' as 'baz' };
  │                          ^^^^^
2 │ 
ℹ as const doesn't require any update when the asserted value is changed.
ℹ Safe fix: Replace with as const.
```

### Valid

```ts
let foo = 'bar';
let foo = 'bar' as const;
let foo: 'bar' = 'bar' as const;
let bar = 'bar' as string;
let foo = { bar: 'baz' };
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useAtIndex

Use `at()` instead of integer index access.

**Diagnostic Category:** `lint/nursery/useAtIndex`

**Since:** `v1.9.4`

**Note:** This rule has an **unsafe** fix.

**Caution:** This rule is part of the nursery group.

**Sources:** Inspired from: `unicorn/prefer-at`

Use `at()` instead of integer index access.

Accessing an element at the end of an array or a string is inconvenient because you have to subtract the length of the array or the string from the backward 1-based index of the element to access. For example, to access the last element of an array or a string, you would have to write `array[array.length - 1]`. A more convenient way to achieve the same thing is to use the `at()` method with a negative index. To access the last element of an array or a string just write `array.at(-1)`.

This rule enforces the usage of `at()` over index access, `charAt()`, and `slice()[0]` when `at()` is more convenient.

## Examples

### Invalid

```js
const foo = array[array.length - 1];
```

**Warning:** Prefer `X.at(-Y)` over `X[X.length - Y]`.

```js
const foo = array[array.length - 5];
```

**Warning:** Prefer `X.at(-Y)` over `X[X.length - Y]`.

```js
const foo = array.slice(-1)[0];
```

**Warning:** Prefer `X.at(Y)` over `X.slice(Y)[0]`.

```js
const foo = array.slice(-1).pop();
```

**Warning:** Prefer `X.at(-1)` over `X.slice(-a).pop()`.

```js
const foo = array.slice(-5).shift();
```

**Warning:** Prefer `X.at(Y)` over `X.slice(Y).shift()`.

```js
const foo = string.charAt(string.length - 5);
```

**Warning:** Prefer `X.at(-Y)` over `X.charAt(X.length - Y)`.

### Valid

```js
const foo = array.at(-1);
```

```js
const foo = array.at(-5);
```

```js
const foo = array[100];
```

```js
const foo = array.at(array.length - 1);
```

```js
array[array.length - 1] = foo;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useAwait

**Description:** Ensure `async` functions utilize `await`.

**Diagnostic Category:** `lint/suspicious/useAwait`

**Since:** `v1.4.0`

**Sources:**
- Same as: require-await documentation
- Same as: @typescript-eslint/require-await documentation

This rule reports `async` functions that lack an `await` expression. As `async` functions return a promise, the use of `await` is often necessary to capture the resolved value and handle the asynchronous operation appropriately. Without `await`, the function operates synchronously and might not leverage the advantages of async functions.

## Examples

### Invalid

```js
async function fetchData() {
  // Missing `await` for the promise returned by `fetch`
  return fetch('/data');
}
```

**Warning:**
This async function lacks an await expression.

**Suggestion:**
Remove this async modifier, or add an await expression in the function.

### Valid

```js
async function fetchData() {
  const response = await fetch('/data');
  const data = await response.json();
  return data;
}

// This rule does not warn about non-async functions
function processData() {
  return compute(data);
}

// Nor does it warn about empty async functions
async function noop() { }
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useBlockStatements

**Description:** Requires following curly brace conventions.

**Diagnostic Category:** `lint/style/useBlockStatements`

**Since:** `v1.0.0`

**Note:** This rule has an **unsafe** fix.

**Sources:** Same as: `curly` (https://eslint.org/docs/latest/rules/curly)

JavaScript allows the omission of curly braces when a block contains only one statement. However, it is considered best practice to never omit curly braces around blocks, even when they are optional, as it can lead to bugs and reduces code clarity.

## Examples

### Invalid

```js
if (x) x;
```
**Error:** Block statements are preferred in this position.  
**Fix:** Wrap the statement with a `JsBlockStatement`.

```js
if (x) {
  x;
} else y;
```
**Error:** Block statements are preferred in this position.  
**Fix:** Wrap the statement with a `JsBlockStatement`.

```js
if (x) {
  x;
} else if (y) y;
```
**Error:** Block statements are preferred in this position.  
**Fix:** Wrap the statement with a `JsBlockStatement`.

```js
for (;;);
```
**Error:** Block statements are preferred in this position.  
**Fix:** Wrap the statement with a `JsBlockStatement`.

```js
for (p in obj);
```
**Error:** Block statements are preferred in this position.  
**Fix:** Wrap the statement with a `JsBlockStatement`.

```js
for (x of xs);
```
**Error:** Block statements are preferred in this position.  
**Fix:** Wrap the statement with a `JsBlockStatement`.

```js
do;
while (x);
```
**Error:** Block statements are preferred in this position.  
**Fix:** Wrap the statement with a `JsBlockStatement`.

```js
while (x);
```
**Error:** Block statements are preferred in this position.  
**Fix:** Wrap the statement with a `JsBlockStatement`.

```js
with (x);
```
**Error:** `with` statements are not allowed in strict mode.

## Related links

- Disable a rule (link)
- Configure the rule fix (link)
- Rule options (link)

# useButtonType

Enforces the usage of the attribute `type` for the element `button`.

**Diagnostic Category:** `lint/a11y/useButtonType`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: react/button-has-type

## Examples

### Invalid

```jsx
<button>Do something</button>
```

```
code-block.jsx:1:1 lint/a11y/useButtonType ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide an explicit type prop for the button element.

> 1 │ <button>Do something</button>
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   
ℹ The default type of a button is submit, which causes the submission of a form when placed inside a `form` element. This is likely not the behaviour that you want inside a React application.

ℹ Allowed button types are: submit, button or reset
```

```jsx
<button type="incorrectType">Do something</button>
```

```
code-block.jsx:1:14 lint/a11y/useButtonType ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a valid type prop for the button element.

> 1 │ <button type="incorrectType">Do something</button>
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   
ℹ The default type of a button is submit, which causes the submission of a form when placed inside a `form` element. This is likely not the behaviour that you want inside a React application.

ℹ Allowed button types are: submit, button or reset
```

```js
React.createElement('button');
```

```
code-block.js:1:21 lint/a11y/useButtonType ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide an explicit type prop for the button element.

> 1 │ React.createElement('button');
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   
ℹ The default type of a button is submit, which causes the submission of a form when placed inside a `form` element. This is likely not the behaviour that you want inside a React application.

ℹ Allowed button types are: submit, button or reset
```

### Valid

```jsx
<>
    <button type="button">Do something</button>
    <button type={buttonType}>Do something</button>
</>
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useCollapsedElseIf

Enforce using `else if` instead of nested `if` in `else` clauses.

**Diagnostic Category:** `lint/style/useCollapsedElseIf`

**Since:** `v1.1.0`

**Note:** This rule has a **safe** fix.

**Sources:**
- Same as: `no-lonely-if` (https://eslint.org/docs/latest/rules/no-lonely-if)
- Same as: `collapsible_else_if` (https://rust-lang.github.io/rust-clippy/master/#/collapsible_else_if)

If an `if` statement is the only statement in the `else` block, it is often clearer to use an `else if` form.

## Examples

### Invalid

```js
if (condition) {
    // ...
} else {
    if (anotherCondition) {
        // ...
    }
}
```

**Warning:** This `if` statement can be collapsed into an `else if` statement.

```js
if (condition) {
    // ...
} else {
    if (anotherCondition) {
        // ...
    } else {
        // ...
    }
}
```

**Warning:** This `if` statement can be collapsed into an `else if` statement.

```js
if (condition) {
    // ...
} else {
    // Comment
    if (anotherCondition) {
        // ...
    }
}
```

### Valid

```js
if (condition) {
    // ...
} else if (anotherCondition) {
    // ...
}
```

```js
if (condition) {
    // ...
} else if (anotherCondition) {
    // ...
} else {
    // ...
}
```

```js
if (condition) {
    // ...
} else {
    if (anotherCondition) {
        // ...
    }
    doSomething();
}
```

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)

# useCollapsedIf

Enforce using single `if` instead of nested `if` clauses.

**Diagnostic Category:** `lint/nursery/useCollapsedIf`

**Since:** `v1.9.4`

**Note:** This rule has a **safe** fix.

**Caution:** This rule is part of the nursery group.

**Sources:**
- Same as: `unicorn/no-lonely-if`
- Same as: `collapsible_if`

Enforce using single `if` instead of nested `if` clauses.

If an `if (b)` statement is the only statement in an `if (a)` block, it is often clearer to use an `if (a && b)` form.

## Examples

### Invalid

```js
if (condition) {
    if (anotherCondition) {
        // ...
    }
}
```

**Diagnostic Message:**
- This `if` statement can be collapsed into another `if` statement.
- Safe fix: Use collapsed `if` instead.

### Invalid

```js
if (condition) {
    // Comment
    if (anotherCondition) {
        // ...
    }
}
```

**Diagnostic Message:**
- This `if` statement can be collapsed into another `if` statement.

### Valid

```js
if (condition && anotherCondition) {
    // ...
}
```

```js
if (condition) {
    if (anotherCondition) {
        // ...
    }
    doSomething();
}
```

```js
if (condition) {
    if (anotherCondition) {
        // ...
    } else {
        // ...
    }
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useComponentExportOnlyModules

Enforce declaring components only within modules that export React Components exclusively.

**Diagnostic Category:** `lint/nursery/useComponentExportOnlyModules`

**Since:** `v1.9.2`

:::caution
This rule is part of the nursery group.
:::

**Sources:** 
- Inspired from: react-refresh/only-export-components

This rule is necessary to enable the React Fast Refresh feature, which improves development efficiency. The determination of whether something is a component depends on naming conventions. Components should be written in PascalCase and regular functions in camelCase. If the framework already has established conventions, consider optionally specifying exceptions.

## Examples

### Invalid

```jsx
export const foo = () => {};
export const Bar = () => <></>;
```

```
code-block.jsx:1:14 lint/nursery/useComponentExportOnlyModules ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠ Exporting a non-component with components is not allowed.
1 │ export const foo = () => {};
   │             ^^^
2 │ export const Bar = () => <></>;

ℹ Fast Refresh only works when a file only exports components.
ℹ Consider separating non-component exports into a new file.
ℹ If it is a component, it may not be following the variable naming conventions.
```

```jsx
const Tab = () => {};
export const tabs = [<Tab />, <Tab />];
```

```
code-block.jsx:1:7 lint/nursery/useComponentExportOnlyModules ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠ Components should be exported.
1 │ const Tab = () => {};
   │      ^^^
2 │ export const tabs = [<Tab />, <Tab />];

ℹ Fast Refresh only works when a file only exports components.
ℹ Consider separating component exports into a new file.
ℹ If it is not a component, it may not be following the variable naming conventions.
```

```jsx
const App = () => {}
createRoot(document.getElementById("root")).render(<App />);
```

```
code-block.jsx:1:7 lint/nursery/useComponentExportOnlyModules ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠ Unexported components are not allowed.
1 │ const App = () => {}
   │      ^^^
2 │ createRoot(document.getElementById("root")).render(<App />);

ℹ Fast Refresh only works when a file only exports components.
ℹ Consider separating component exports into a new file.
ℹ If it is not a component, it may not be following the variable naming conventions.
```

### Valid

```jsx
export default function Foo() {
    return <></>;
}
```

```jsx
const foo = () => {};
export const Bar = () => <></>;
```

```jsx
import { App } from "./App";
createRoot(document.getElementById("root")).render(<App />);
```

Functions that return standard React components are also permitted.

```jsx
import { memo } from 'react';
const Component = () => <></>
export default memo(Component);
```

## Options

### `allowConstantExport`

Some tools, such as Vite, allow exporting constants along with components. By enabling the following, the rule will support the pattern.

```json
{
    "//": "...",
    "options":{
        "allowConstantExport" : true
    }
}
```

### `allowExportNames`

If you use a framework that handles Hot Module Replacement (HMR) of some specific exports, you can use this option to avoid warning for them.

Example for Remix:

```json
{
    "//": "...",
    "options":{
        "allowExportNames": ["json", "loader", "headers", "meta", "links", "scripts"]
    }
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useConsistentArrayType

Require consistently using either `T[]` or `Array<T>`

**Diagnostic Category:** `lint/style/useConsistentArrayType`  
**Since:** `v1.5.0`  
**Note:** This rule has an **unsafe** fix.

Sources: Same as: `@typescript-eslint/array-type`

_TypeScript_ provides two equivalent ways to define an array type: `T[]` and `Array<T>`. The two styles are functionally equivalent. Using the same style consistently across your codebase makes it easier for developers to read and understand array types.

## Example

### Invalid

```ts
let invalid: Array<foo>;
```

code-block.ts:1:14 lint/style/useConsistentArrayType FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Use shorthand T[] syntax instead of Array<T> syntax.  

```ts
let invalid: Promise<Array<string>>;
```

code-block.ts:1:22 lint/style/useConsistentArrayType FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Use shorthand T[] syntax instead of Array<T> syntax.  

```ts
let invalid3: Array<Foo<Bar>>;
```

code-block.ts:1:15 lint/style/useConsistentArrayType FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Use shorthand T[] syntax instead of Array<T> syntax.  

### Valid

```ts
const valid: Array<string | number> = ['a', 'b'];
const valid: Array<{ prop: string }> = [{ prop: 'a' }];
const valid: Array<() => void> = [() => {}];
const valid: MyType[] = ['a', 'b'];
const valid: string[] = ['a', 'b'];
const valid: readonly string[] = ['a', 'b'];
```

## Options

Use the options to specify the syntax of array declarations to use.

```json
{
    "//": "...",
    "options": {
        "syntax": "shorthand"
    }
}
```

### syntax

The syntax to use:

- `generic`: array declarations will be converted to `Array<T>` or `ReadonlyArray<T>`
- `shorthand`: array declarations will be converted to `T[]` or `readonly T[]`

Default: `shorthand`

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useConsistentBuiltinInstantiation

Enforce the use of `new` for all builtins, except `String`, `Number`, and `Boolean`.

**Diagnostic Category:** `lint/style/useConsistentBuiltinInstantiation`

**Since:** `v1.7.2`

**Note:** This rule has an **unsafe** fix.

**Sources:** Same as: `no-new-wrappers`

This rule enforces the use of `new` for the following builtins:

- AggregateError
- Array
- Date
- Error
- EvalError
- Object
- Promise
- RangeError
- ReferenceError
- RegExp
- SyntaxError
- TypeError
- URIError

Disallows the use of `new` for the following builtins:

- Boolean
- Number
- String

These should not use `new` as that would create object wrappers for the primitive values, which is not desired. However, without `new`, they can be useful for coercing a value to that type.

Note that builtins that require `new` to be instantiated and builtins that require no `new` to be instantiated (e.g., `Symbol` and `BigInt`) are covered by the `noInvalidBuiltinInstantiation` rule.

## Examples

### Invalid

```js
const text = new String(10);
```

**Error:** Use `String()` instead of `new String()`.

```js
const now = Date();
```

**Error:** Use `new Date()` instead of `Date()`.

### Valid

```js
const text = String(10);
```

```js
const now = new Date();
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useConsistentCurlyBraces

This rule enforces consistent use of curly braces inside JSX attributes and JSX children.

**Diagnostic Category:** `lint/nursery/useConsistentCurlyBraces`

**Since:** `v1.8.2`

**Note:** This rule has an **unsafe** fix.

**Caution:** This rule is part of the nursery group.

**Sources:**
- Inspired from: react/jsx-curly-brace-presence

This rule checks for and warns about unnecessary curly braces in both JSX props and children. For situations where JSX expressions are unnecessary, refer to the React documentation and the page about JSX gotchas.

## Examples

### Invalid

```jsx
<Foo>{'Hello world'}</Foo>
```
Diagnostic: 
- Should not have curly braces around expression.
- JSX child does not need to be wrapped in curly braces.
- Unsafe fix: Remove curly braces around the expression.

```jsx
<Foo foo={'bar'} />
```
Diagnostic: 
- Should not have curly braces around expression.
- JSX attribute value does not need to be wrapped in curly braces.
- Unsafe fix: Remove curly braces around the expression.

```jsx
<Foo foo=<Bar /> />
```
Diagnostic: 
- Should have curly braces around expression.
- JSX attribute value should be wrapped in curly braces for readability.
- Unsafe fix: Add curly braces around the expression.

### Valid

```jsx
<>
    <Foo>Hello world</Foo>
    <Foo foo="bar" />
    <Foo foo={5} />
    <Foo foo={<Bar />} />
</>
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useConsistentMemberAccessibility

Require consistent accessibility modifiers on class properties and methods.

**Diagnostic Category:** `lint/nursery/useConsistentMemberAccessibility`

**Since:** `v1.9.0`

**Caution:** This rule is part of the nursery group.

**Sources:** Same as: `@typescript-eslint/explicit-member-accessibility`

TypeScript allows placing explicit `public`, `protected`, and `private` accessibility modifiers in front of class members. The modifiers exist solely in the type system and serve to describe who is allowed to access those members. Leaving off accessibility modifiers makes for less code to read and write. Members are public by default. However, adding consistent accessibility modifiers can be helpful in codebases with many classes for enforcing proper privacy of members. Some developers also find it preferable for code readability to keep member publicity explicit.

## Examples

### Invalid

The following patterns are considered incorrect code with the default options `noPublic`:

```js
class Animal {
  public constructor(
    public breed,
    name,
  ) {
    this.animalName = name;
  }
  public animalName: string; 
  public get name(): string {
    return this.animalName;
  }
  public set name(value: string) {
    this.animalName = value;
  }
  public walk() {
  }
}
```

The following patterns are considered incorrect code with the accessibility set to `explicit`:

```ts
class Animal {
  constructor(
    public breed,
    name,
  ) {
    this.animalName = name;
  }
  private animalName: string; 
  public get name(): string {
    return this.animalName;
  }
  public set name(value: string) {
    this.animalName = value;
  }
  protected walk() {
  }
}
```

The following patterns are considered incorrect code with the accessibility set to `none`:

```ts
class Animal {
  constructor(
    protected breed,
    name,
  ) {
    this.name = name;
  }
  private animalName: string; 
  get name(): string {
    return this.animalName;
  }
  set name(value: string) {
    this.animalName = value;
  }
  protected walk() {
  }
}
```

### Valid

The following patterns are considered correct code with the default options `noPublic`:

```ts
class Animal {
  constructor(
    public breed,
    name,
  ) {
    this.animalName = name;
  }
  private animalName: string; 
  get name(): string {
    return this.animalName;
  }
  set name(value: string) {
    this.animalName = value;
  }
  protected walk() {
  }
}
```

The following patterns are considered correct code with the accessibility set to `explicit`:

```ts
class Animal {
  public constructor(
    public breed,
    name,
  ) {
    this.animalName = name;
  }
  private animalName: string; 
  public get name(): string {
    return this.animalName;
  }
  public set name(value: string) {
    this.animalName = value;
  }
  protected walk() {
  }
}
```

The following patterns are considered correct code with the accessibility set to `none`:

```ts
class Animal {
  constructor(
    breed,
    name,
  ) {
    this.name = name;
  }
  animalName: string; 
  get name(): string {
    return this.animalName;
  }
  set name(value: string) {
    this.animalName = value;
  }
  walk() {
  }
}
```

## Options

The rule supports the following options:

```json
{
    "//": "...",
    "options": {
        "accessibility": "explicit"
    }
}
```

### `accessibility`

This option determines the required accessibility modifiers on class properties and methods. It can be set to one of the following values:

- `noPublic` - forbid the use of public (a safe fix will remove it).
- `explicit` - requires an accessibility modifier for every member that allows that (a safe fix will add public).
- `none` - forbid all accessibility modifiers (public, protected, private).

**Default:** `noPublic`.

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useConst

Require `const` declarations for variables that are only assigned once.

**Diagnostic Category: `lint/style/useConst`**

**Since**: `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

Sources: 
- Same as: prefer-const

Require `const` declarations for variables that are only assigned once.

Variables that are initialized and never reassigned and variables that are only assigned once can be declared as `const`.

## Examples

### Invalid

```js
let a = 3;
console.log(a);
```

Diagnostic:
```
code-block.js:1:1 lint/style/useConst FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ This let declares a variable that is only assigned once.
1 │ let a = 3;
   │ ^^^
2 │ console.log(a);
3 │
ℹ 'a' is never reassigned.
Safe fix: Use const instead.
```

```js
// `a` is redefined (not reassigned) on each loop step.
for (let a of [1, 2, 3]) {
    console.log(a);
}
```

Diagnostic:
```
code-block.js:2:6 lint/style/useConst FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ This let declares a variable that is only assigned once.
1 │ // `a` is redefined (not reassigned) on each loop step.
2 │ for (let a of [1, 2, 3]) {
   │ ^^^
3 │     console.log(a);
4 │ }
ℹ 'a' is never reassigned.
Safe fix: Use const instead.
```

```js
// `a` is redefined (not reassigned) on each loop step.
for (let a in [1, 2, 3]) {
    console.log(a);
}
```

Diagnostic:
```
code-block.js:2:6 lint/style/useConst FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ This let declares a variable that is only assigned once.
1 │ // `a` is redefined (not reassigned) on each loop step.
2 │ for (let a in [1, 2, 3]) {
   │ ^^^
3 │     console.log(a);
4 │ }
ℹ 'a' is never reassigned.
Safe fix: Use const instead.
```

```js
let a;
a = 0;
```

Diagnostic:
```
code-block.js:1:1 lint/style/useConst ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ This let declares a variable that is only assigned once.
1 │ let a;
   │ ^^^
2 │ a = 0;
3 │
ℹ 'a' is only assigned here.
```

```js
let a = 3;
{
    let a = 4;
    a = 2;
}
```

Diagnostic:
```
code-block.js:1:1 lint/style/useConst FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ This let declares a variable that is only assigned once.
1 │ let a = 3;
   │ ^^^
2 │ {
3 │     let a = 4;
ℹ 'a' is never reassigned.
Safe fix: Use const instead.
```

### Valid

```js
let a = 2;
a = 3;
console.log(a);
```

```js
let a = 1, b = 2;
b = 3;
```

```js
let a;
a; // the variable is read before its assignment
a = 0;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useDateNow

Use `Date.now()` to get the number of milliseconds since the Unix Epoch.

**Diagnostic Category:** `lint/complexity/useDateNow`

**Since:** `v1.8.0`

**Note:** This rule has an **unsafe** fix.

**Sources:** Same as: `unicorn/prefer-date-now`

`Date.now()` is more readable than `new Date().getTime()` and its variants, and it also avoids unnecessary instantiation of the `Date` object.

## Examples

### Invalid

```js
const foo = new Date().getTime();
```
Warning: Use `Date.now()` instead of `new Date().getTime()`.

```js
const foo = new Date().valueOf();
```
Warning: Use `Date.now()` instead of `new Date().valueOf()`.

```js
const foo = +new Date();
```
Warning: Use `Date.now()` instead of `new Date()`.

```js
const foo = Number(new Date());
```
Warning: Use `Date.now()` instead of `Number(new Date())`.

```js
const foo = new Date() * 2;
```
Warning: Use `Date.now()` instead of `new Date()`.

### Valid

```js
const foo = Date.now();
```

```js
const foo = Date.now() * 2;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useDefaultParameterLast

Enforce default function parameters and optional function parameters to be last.

**Diagnostic Category:** `lint/style/useDefaultParameterLast`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:**
- Same as: default-param-last documentation on eslint.org
- Same as: @typescript-eslint/default-param-last documentation on typescript-eslint.io

Default and optional parameters that precede a required parameter cannot be omitted at call site.

## Examples

### Invalid

```js
function f(a = 0, b) {}
```

Diagnostic:
```
code-block.js:1:12 lint/style/useDefaultParameterLast FIXABLE
✖ This default parameter should follow the last required parameter or should be a required parameter.
> 1 │ function f(a = 0, b) {}
   │           ^^^^^
```

```js
function f(a, b = 0, c) {}
```

Diagnostic:
```
code-block.js:1:15 lint/style/useDefaultParameterLast FIXABLE
✖ This default parameter should follow the last required parameter or should be a required parameter.
> 1 │ function f(a, b = 0, c) {}
   │              ^^^^^
```

```ts
function f(a: number, b?: number, c: number) {}
```

Diagnostic:
```
code-block.ts:1:23 lint/style/useDefaultParameterLast FIXABLE
✖ This optional parameter should follow the last required parameter or should be a required parameter.
> 1 │ function f(a: number, b?: number, c: number) {}
   │                      ^^^^^
```

```ts
class Foo {
    constructor(readonly a = 10, readonly b: number) {}
}
```

Diagnostic:
```
code-block.ts:2:17 lint/style/useDefaultParameterLast FIXABLE
✖ This default parameter should follow the last required parameter or should be a required parameter.
> 2 │ constructor(readonly a = 10, readonly b: number) {}
   │                ^^^^^
```

### Valid

```js
function f(a, b = 0) {}
```

```ts
function f(a: number, b?: number, c = 0) {}
```

```ts
function f(a: number, b = 0, c?: number) {}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useDefaultSwitchClauseLast

**Description:** Enforce default clauses in switch statements to be last.

**Diagnostic Category:** `lint/suspicious/useDefaultSwitchClauseLast`

**Since:** `v1.0.0`

**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:** Same as: default-case-last

A switch statement can optionally have a default clause. If present, it’s usually the last clause, but it doesn’t need to be. It is allowed to put the default clause before all case clauses, or anywhere between. The behavior is mostly the same as if it was the last clause.

The default block will be executed only if there is no match in the case clauses (including those defined after the default), but there is also the ability to “fall through” from the default clause to the following clause in the list. However, such flow is uncommon and can be confusing to readers.

Even without "fall through" logic, it’s unexpected to see the default clause before or between the case clauses. By convention, it is expected to be the last clause.

## Examples

### Invalid

```js
switch (foo) {
    default:
        break;
    case 0:
        break;
}
```

Diagnostic: The default clause should be the last switch clause.

```js
switch (foo) {
    default:
        f();
    case 0:
        break;
}
```

Diagnostic: The default clause should be the last switch clause.

```js
switch (foo) {
    case 0:
        break;
    default:
    case 1:
        break;
}
```

Diagnostic: The default clause should be the last switch clause.

### Valid

```js
switch (foo) {
    case 0:
        break;
    case 1:
    default:
        break;
}
```

```js
switch (foo) {
    case 0:
        break;
    default:
        break;
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useDefaultSwitchClause

Require the default clause in switch statements.

**Diagnostic Category:** `lint/style/useDefaultSwitchClause`

**Since:** `v1.7.2`  
**Sources:** Same as: default-case

Some code conventions require that all switch statements have a default clause. The thinking is that it’s better to always explicitly state what the default behavior should be so that it’s clear whether or not the developer forgot to include the default behavior by mistake.

## Examples

### Invalid

```js
switch (a) {
    case 1:
        /* code */
        break;
}
```

code-block.js:1:1 lint/style/useDefaultSwitchClause ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Expected a default switch clause.

> 1 │ switch (a) {  
> 2 │     case 1:  
> 3 │         /* code */  
> 4 │         break;  
> 5 │ }  
> 6 │  

ℹ The lack of a default clause can be a possible omission.  
ℹ Consider adding a default clause.  

### Valid

```js
switch (a) {
    case 1:
        /* code */
        break;
    default:
        /* code */
        break;
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useDeprecatedReason

Require specifying the reason argument when using `@deprecated` directive.

**Diagnostic Category:** `lint/nursery/useDeprecatedReason`

**Since:** `v1.9.0`

**Caution:** This rule is part of the nursery group.

**Sources:** Same as: `graphql/require-deprecation-reason`

This rule checks the parameter of `@deprecated` directive for the use of reason argument, suggesting the user to add it in case the argument is missing.

## Examples

### Invalid

```graphql
query {
  member @deprecated
}
```

### Valid

```graphql
query {
  member @deprecated(reason: "Why?")
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useEnumInitializers

Require that each enum member value be explicitly initialized.

**Diagnostic Category:** `lint/style/useEnumInitializers`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

Sources: 
- Same as: `@typescript-eslint/prefer-enum-initializers`

_TypeScript_ enums are a practical way to organize semantically related constant values. Members of enums that don't have explicit values are by default given sequentially increasing numbers. When the value of enum members is important, allowing implicit values for enum members can cause bugs if enum declarations are modified over time.

## Examples

### Invalid

```ts
enum Version {
    V1,
}
```

Diagnostic:
```
code-block.ts:1:6 lint/style/useEnumInitializers FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ This enum declaration contains members that are implicitly initialized.
1 │ enum Version {
   │     ^^^^^^
2 │     V1,
3 │ }
ℹ This enum member should be explicitly initialized.
1 │ enum Version {
2 │     V1,
   │     ^^^^^^
3 │ }
ℹ Allowing implicit initializations for enum members can cause bugs if enum declarations are modified over time.
ℹ Safe fix: Initialize all enum members.
```

```ts
enum Status {
    Open = 1,
    Close,
}
```

Diagnostic:
```
code-block.ts:1:6 lint/style/useEnumInitializers FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ This enum declaration contains members that are implicitly initialized.
1 │ enum Status {
   │     ^^^^^^
2 │     Open = 1,
3 │     Close,
ℹ This enum member should be explicitly initialized.
1 │ enum Status {
2 │     Open = 1,
3 │     Close,
   │     ^^^^^^
4 │ }
ℹ Allowing implicit initializations for enum members can cause bugs if enum declarations are modified over time.
ℹ Safe fix: Initialize all enum members.
```

```ts
enum Color {
    Red = "Red",
    Green = "Green",
    Blue,
}
```

Diagnostic:
```
code-block.ts:1:6 lint/style/useEnumInitializers FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ This enum declaration contains members that are implicitly initialized.
1 │ enum Color {
   │     ^^^^^^
2 │     Red = "Red",
3 │     Green = "Green",
4 │     Blue,
ℹ This enum member should be explicitly initialized.
2 │     Red = "Red",
3 │     Green = "Green",
4 │     Blue,
   │     ^^^^^^
5 │ }
ℹ Allowing implicit initializations for enum members can cause bugs if enum declarations are modified over time.
ℹ Safe fix: Initialize all enum members.
```

### Valid

```ts
enum Status {
    Open = 1,
    Close = 2,
}
```

```ts
enum Color {
    Red = "Red",
    Green = "Green",
    Blue = "Blue",
}
```

```ts
declare enum Weather {
    Rainy,
    Sunny,
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useErrorMessage

**Description:** Enforce passing a message value when creating a built-in error.

**Diagnostic Category:** `lint/suspicious/useErrorMessage`

**Since:** `v1.8.0`

**Sources:** Same as: unicorn/error-message

This rule enforces a message value to be passed in when creating an instance of a built-in `Error` object, which leads to more readable and debuggable code.

## Examples

### Invalid

```js
throw Error();
```
Diagnostic: Provide an error message for the error.  
Providing meaningful error messages leads to more readable and debuggable code.

```js
throw Error('');
```
Diagnostic: Error message should not be an empty string.  
Providing meaningful error messages leads to more readable and debuggable code.

```js
throw new TypeError();
```
Diagnostic: Provide an error message for the error.  
Providing meaningful error messages leads to more readable and debuggable code.

```js
const error = new AggregateError(errors);
```
Diagnostic: Provide an error message for the error.  
Providing meaningful error messages leads to more readable and debuggable code.

### Valid

```js
throw Error('Unexpected property.');
```

```js
throw new TypeError('Array expected.');
```

```js
const error = new AggregateError(errors, 'Promises rejected.');
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useExhaustiveDependencies

Enforce all dependencies are correctly specified in a React hook.

**Diagnostic Category:** `lint/correctness/useExhaustiveDependencies`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `react-hooks/exhaustive-deps`

This rule is a port of the rule `react-hooks/exhaustive-deps`, and it's meant to target projects that use React. If your project does not use React (or Preact), you shouldn't use this rule.

The rule will inspect the following known hooks:

- `useEffect`
- `useLayoutEffect`
- `useInsertionEffect`
- `useCallback`
- `useMemo`
- `useImperativeHandle`
- `useState`
- `useReducer`
- `useRef`
- `useDebugValue`
- `useDeferredValue`
- `useTransition`

If you want to add more hooks to the rule, check the options.

## Examples

### Invalid

```js
import { useEffect } from "react";

function component() {
    let a = 1;
    useEffect(() => {
        console.log(a);
    }, []);
}
```

Diagnostic: This hook does not specify all of its dependencies: a

### Invalid

```js
import { useEffect } from "react";

function component() {
    let b = 1;
    useEffect(() => {
    }, [b]);
}
```

Diagnostic: This hook specifies more dependencies than necessary: b

### Invalid

```js
import { useEffect, useState } from "react";

function component() {
    const [name, setName] = useState();
    useEffect(() => {
        console.log(name);
        setName("");
    }, [name, setName]);
}
```

Diagnostic: This hook specifies more dependencies than necessary: setName

### Invalid

```js
import { useEffect } from "react";

function component() {
    let a = 1;
    const b = a + 1;
    useEffect(() => {
        console.log(b);
    }, []);
}
```

Diagnostic: This hook does not specify all of its dependencies: b

### Valid

```js
import { useEffect } from "react";

function component() {
    let a = 1;
    useEffect(() => {
        console.log(a);
    }, [a]);
}
```

### Ignoring a specific dependency

To ignore a diagnostic about a specific dependency without disabling all linting for that hook, specify the name of the dependency in parentheses:

```js
import { useEffect } from "react";

function component() {
    let a = 1;
    // biome-ignore lint/correctness/useExhaustiveDependencies(a): <explanation>
    useEffect(() => {
        console.log(a);
    }, []);
}
```

## Options

Allows specifying custom hooks for which dependencies should be checked and/or which are known to have stable return values.

### Validating dependencies

For every hook for which you want the dependencies to be validated, specify the index of the closure and the index of the dependencies array to validate against.

#### Example

```json
{
    "options": {
        "hooks": [
            { "name": "useLocation", "closureIndex": 0, "dependenciesIndex": 1},
            { "name": "useQuery", "closureIndex": 1, "dependenciesIndex": 0}
        ]
    }
}
```

### Stable results

When a hook is known to have a stable return value, that value doesn't need to be specified in dependency arrays. You can configure custom hooks that return stable results in one of three ways:

- `"stableResult": true` 
- `"stableResult": [1]` 
- `"stableResult": 1` 

#### Example

```json
{
    "options": {
        "hooks": [
            { "name": "useDispatch", "stableResult": true }
        ]
    }
}
```

## Preact support

This rule recognizes rules imported from `preact/compat` and `preact/hooks` and applies the same rules as for React hooks.

# useExplicitLengthCheck

## Description
Enforce explicitly comparing the `length`, `size`, `byteLength` or `byteOffset` property of a value. This rule enforces a specific style for length comparisons to enhance clarity.

### Diagnostic Category
`lint/style/useExplicitLengthCheck`

### Sources
Same as: `unicorn/explicit-length-check`

### Zero Comparison Examples
Enforce comparison with `=== 0` when checking for zero length.

#### Invalid
```js
const isEmpty = !foo.length;
```
**Warning**: Use `.length === 0` when checking `.length` is zero.

```js
const isEmpty = foo.length == 0;
```
**Warning**: Use `.length === 0` when checking `.length` is zero.

```js
const isEmpty = foo.length < 1;
```
**Warning**: Use `.length === 0` when checking `.length` is zero.

```js
const isEmpty = 0 === foo.length;
```
**Warning**: Use `.length === 0` when checking `.length` is zero.

```js
const isEmpty = 0 == foo.length;
```
**Warning**: Use `.length === 0` when checking `.length` is zero.

```js
const isEmpty = 1 > foo.length;
```
**Warning**: Use `.length === 0` when checking `.length` is zero.

```js
// Negative style is disallowed too
const isEmpty = !(foo.length > 0);
```
**Warning**: Use `.length === 0` when checking `.length` is zero.

```js
const isEmptySet = !foo.size;
```
**Warning**: Use `.size === 0` when checking `.size` is zero.

#### Valid
```js
const isEmpty = foo.length === 0;
```

### Non-Zero Comparison Examples
Enforce comparison with `> 0` when checking for non-zero length.

#### Invalid
```js
const isNotEmpty = foo.length !== 0;
```
**Warning**: Use `.length > 0` when checking `.length` is not zero.

```js
const isNotEmpty = foo.length != 0;
```
**Warning**: Use `.length > 0` when checking `.length` is not zero.

```js
const isNotEmpty = foo.length >= 1;
```
**Warning**: Use `.length > 0` when checking `.length` is not zero.

```js
const isNotEmpty = 0 !== foo.length;
```
**Warning**: Use `.length > 0` when checking `.length` is not zero.

```js
const isNotEmpty = 1 <= foo.length;
```
**Warning**: Use `.length > 0` when checking `.length` is not zero.

```js
const isNotEmpty = Boolean(foo.length);
```
**Warning**: Use `.length > 0` when checking `.length` is not zero.

```js
if (foo.length) {}
```
**Warning**: Use `.length > 0` when checking `.length` is not zero.

```js
const biome = foo.length ? 1 : 2;
```
**Warning**: Use `.length > 0` when checking `.length` is not zero.

```js
while (foo.length) {}
```
**Warning**: Use `.length > 0` when checking `.length` is not zero.

```js
do {} while (foo.length);
```
**Warning**: Use `.length > 0` when checking `.length` is not zero.

```js
for (; foo.length; ) {};
```
**Warning**: Use `.length > 0` when checking `.length` is not zero.

#### Valid
```js
const isNotEmpty = foo.length > 0;
```
```js
if (foo.length > 0 || bar.length > 0) {}
```

### Caveats
This rule assumes that the `length`/`size` property is always numeric, even if it actually is not. For example:
```js
const foo1 = { size: "small" }; if (foo1.size) {}
```
**Warning**: Use `.size > 0` when checking `.size` is not zero.

To properly handle this case, type inference would be required, which is not supported by Biome at the moment. We recommend disabling this rule when working with non-numeric `length`/`size` properties.

### Related Links
- Disable a rule
- Configure the rule fix
- Rule options

# useExplicitType

Require explicit return types on functions and class methods.

**Diagnostic Category: `lint/nursery/useExplicitType`**

**Since**: `v1.9.3`

**Caution**: This rule is part of the nursery group.

Sources: 
- Same as: @typescript-eslint/explicit-function-return-type

Require explicit return types on functions and class methods.

Functions in TypeScript often don't need to be given an explicit return type annotation. Leaving off the return type is less code to read or write and allows the compiler to infer it from the contents of the function. However, explicit return types do make it visually more clear what type is returned by a function. They can also speed up TypeScript type checking performance in large codebases with many large functions. Explicit return types also reduce the chance of bugs by asserting the return type, and it avoids surprising "action at a distance," where changing the body of one function may cause failures inside another function.

This rule enforces that functions do have an explicit return type annotation.

## Examples

### Invalid

```ts
// Should indicate that no value is returned (void)
function test() {
  return;
}
```

code-block.ts:1:1 lint/nursery/useExplicitType ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Missing return type on function.  
1 │ // Should indicate that no value is returned (void)  
2 │ function test() {  
3 │ return;  
4 │ }  
ℹ Declaring the return type makes the code self-documenting and can speed up TypeScript type checking.  
ℹ Add a return type annotation.  

```ts
// Should indicate that a number is returned
var fn = function () {
   return 1;
};
```

code-block.ts:2:10 lint/nursery/useExplicitType ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Missing return type on function.  
1 │ // Should indicate that a number is returned  
2 │ var fn = function () {  
3 │ return 1;  
4 │ };  
ℹ Declaring the return type makes the code self-documenting and can speed up TypeScript type checking.  
ℹ Add a return type annotation.  

```ts
// Should indicate that a string is returned
var arrowFn = () => 'test';
```

code-block.ts:2:15 lint/nursery/useExplicitType ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Missing return type on function.  
1 │ // Should indicate that a string is returned  
2 │ var arrowFn = () => 'test';  
ℹ Declaring the return type makes the code self-documenting and can speed up TypeScript type checking.  
ℹ Add a return type annotation.  

```ts
class Test {
  // Should indicate that no value is returned (void)
  method() {
    return;
  }
}
```

code-block.ts:3:3 lint/nursery/useExplicitType ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Missing return type on function.  
1 │ class Test {  
2 │ // Should indicate that no value is returned (void)  
3 │ method() {  
4 │ return;  
5 │ }  
ℹ Declaring the return type makes the code self-documenting and can speed up TypeScript type checking.  
ℹ Add a return type annotation.  

```ts
// Should indicate that no value is returned (void)
function test(a: number) {
  a += 1;
}
```

code-block.ts:1:1 lint/nursery/useExplicitType ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Missing return type on function.  
1 │ // Should indicate that no value is returned (void)  
2 │ function test(a: number) {  
3 │ a += 1;  
4 │ }  
ℹ Declaring the return type makes the code self-documenting and can speed up TypeScript type checking.  
ℹ Add a return type annotation.  

```ts
// Should use const assertions
const func = (value: number) => ({ type: 'X', value }) as any;
```

code-block.ts:2:14 lint/nursery/useExplicitType ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Missing return type on function.  
1 │ // Should use const assertions  
2 │ const func = (value: number) => ({ type: 'X', value }) as any;  
ℹ Declaring the return type makes the code self-documenting and can speed up TypeScript type checking.  
ℹ Add a return type annotation.  

The following pattern is considered incorrect code for a higher-order function, as the returned function does not specify a return type:

```ts
const arrowFn = () => () => {};
```

code-block.ts:1:23 lint/nursery/useExplicitType ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Missing return type on function.  
1 │ const arrowFn = () => () => {};  
ℹ Declaring the return type makes the code self-documenting and can speed up TypeScript type checking.  
ℹ Add a return type annotation.  

```ts
const arrowFn = () => {
  return () => { };
}
```

code-block.ts:2:10 lint/nursery/useExplicitType ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Missing return type on function.  
1 │ const arrowFn = () => {  
2 │ return () => { };  
3 │ }  
ℹ Declaring the return type makes the code self-documenting and can speed up TypeScript type checking.  
ℹ Add a return type annotation.  

The following pattern is considered incorrect code for a higher-order function because the function body contains multiple statements. We only check whether the first statement is a function return.

```ts
// A function has multiple statements in the body
function f() {
  if (x) {
    return 0;
  }
  return (): void => {}
}
```

code-block.ts:1:1 lint/nursery/useExplicitType ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Missing return type on function.  
1 │ // A function has multiple statements in the body  
2 │ function f() {  
3 │ if (x) {  
4 │ return 0;  
5 │ }  
ℹ Declaring the return type makes the code self-documenting and can speed up TypeScript type checking.  
ℹ Add a return type annotation.  

```ts
// A function has multiple statements in the body
function f() {
  let str = "test";
  return (): string => {
    str;
  }
}
```

code-block.ts:1:1 lint/nursery/useExplicitType ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Missing return type on function.  
1 │ // A function has multiple statements in the body  
2 │ function f() {  
3 │ let str = "test";  
4 │ return (): string => {  
5 │ str;  
6 │ }  
ℹ Declaring the return type makes the code self-documenting and can speed up TypeScript type checking.  
ℹ Add a return type annotation.  

### Valid

```ts
// No return value should be expected (void)
function test(): void {
  return;
}
```

```ts
// A return value of type number
var fn = function (): number {
  return 1;
}
```

```ts
// A return value of type string
var arrowFn = (): string => 'test';
```

```ts
class Test {
  // No return value should be expected (void)
  method(): void {
    return;
  }
}
```

The following patterns are considered correct code for a function immediately returning a value with `as const`:

```ts
const func = (value: number) => ({ foo: 'bar', value }) as const;
```

The following patterns are considered correct code for a function allowed within specific expression contexts, such as an IIFE, a function passed as an argument, or a function inside an array:

```ts
// Callbacks without return types
setTimeout(function() { console.log("Hello!"); }, 1000);
```

```ts
// IIFE
(() => {})();
```

```ts
// a function inside an array
[function () {}, () => {}];
```

The following pattern is considered correct code for a higher-order function, where the returned function explicitly specifies a return type and the function body contains only one statement:

```ts
// the outer function returns an inner function that has a `void` return type
const arrowFn = () => (): void => {};
```

```ts
// the outer function returns an inner function that has a `void` return type
const arrowFn = () => {
  return (): void => { };
}
```

The following patterns are considered correct for type annotations on variables in function expressions:

```ts
// A function with a type assertion using `as`
const asTyped = (() => '') as () => string;
```

```ts
// A function with a type assertion using `<>`
const castTyped = <() => string>(() => '');
```

```ts
// A variable declarator with a type annotation.
type FuncType = () => string;
const arrowFn: FuncType = () => 'test';
```

```ts
// A function is a default parameter with a type annotation
type CallBack = () => void;
const f = (gotcha: CallBack = () => { }): void => { };
```

```ts
// A class property with a type annotation
type MethodType = () => void;
class App {
    private method: MethodType = () => { };
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useExponentiationOperator

Disallow the use of `Math.pow` in favor of the `**` operator.

**Diagnostic Category:** `lint/style/useExponentiationOperator`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

Sources: 
- Same as: `prefer-exponentiation-operator` (see ESLint documentation)

Introduced in ES2016, the infix exponentiation operator `**` is an alternative for the standard `Math.pow` function. Infix notation is considered to be more readable and thus more preferable than the function notation.

## Examples

### Invalid

```js
const foo = Math.pow(2, 8);
```
Diagnostic: Use the '**' operator instead of 'Math.pow'.

```js
const bar = Math.pow(a, b);
```
Diagnostic: Use the '**' operator instead of 'Math.pow'.

```js
let baz = Math.pow(a + b, c + d);
```
Diagnostic: Use the '**' operator instead of 'Math.pow'.

```js
let quux = Math.pow(-1, n);
```
Diagnostic: Use the '**' operator instead of 'Math.pow'.

### Valid

```js
const foo = 2 ** 8;

const bar = a ** b;

let baz = (a + b) ** (c + d);

let quux = (-1) ** n;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useExportType

Promotes the use of `export type` for types.

**Diagnostic Category: `lint/style/useExportType`**

**Since**: `v1.5.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

Sources: 
- Inspired from: @typescript-eslint/consistent-type-exports

Promotes the use of `export type` for types.

_TypeScript_ allows adding the `type` keyword on an `export` to indicate that the `export` doesn't exist at runtime. This allows compilers to safely drop exports of types without looking for their definition.

The rule ensures that types are exported using a type-only `export`. It also groups inline type exports into a grouped `export type`.

## Examples

### Invalid

```ts
interface I {}
export { I };
```

code-block.ts:2:8 lint/style/useExportType FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ All exports are only types.

1 │ interface I {}
2 │ export { I };
3 │ 

ℹ Using export type allows compilers to safely drop exports of types without looking for their definition.

ℹ Safe fix: Use export type.

2 │ export type { I };

```ts
type T = number;
export { T };
```

code-block.ts:2:8 lint/style/useExportType FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ All exports are only types.

1 │ type T = number;
2 │ export { T };
3 │ 

ℹ Using export type allows compilers to safely drop exports of types without looking for their definition.

ℹ Safe fix: Use export type.

2 │ export type { T };

```ts
import type { T } from "./mod.js";
export { T };
```

code-block.ts:2:8 lint/style/useExportType FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ All exports are only types.

1 │ import type { T } from "./mod.js";
2 │ export { T };
3 │ 

ℹ Using export type allows compilers to safely drop exports of types without looking for their definition.

ℹ Safe fix: Use export type.

2 │ export type { T };

```ts
export { type X, type Y };
```

code-block.ts:1:8 lint/style/useExportType FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ All exports are only types.

1 │ export { type X, type Y };
2 │ 

ℹ Using export type allows compilers to safely drop exports of types without looking for their definition.

ℹ Safe fix: Use export type.

1 │ export type { X, Y };

### Valid

```js
class C {}
function f() {}
export { C, f };
```

This rule checks only the identifiers that are defined in a file. It doesn't warn against a type exported as a value in a re-export clause such as:

```ts
export { TypeA } from "./mod.ts"
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

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

# useFlatMap

Promotes the use of `.flatMap()` when `map().flat()` are used together.

**Diagnostic Category:** `lint/complexity/useFlatMap`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

**Sources:**
- Same as: `unicorn/prefer-array-flat-map`
- Same as: `map_flatten`

## Examples

### Invalid

```js
const array = ["split", "the text", "into words"];
array.map(sentence => sentence.split(' ')).flat();
```

```
code-block.js:2:1 lint/complexity/useFlatMap FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ The call chain .map().flat() can be replaced with a single .flatMap() call.

1 │ const array = ["split", "the text", "into words"];
2 │ array.map(sentence => sentence.split(' ')).flat();
3 │ 

ℹ Safe fix: Replace the chain with .flatMap().
1 │ const array = ["split", "the text", "into words"];
2 │ - array.map(sentence => sentence.split(' ')).flat();
2 │ + array.flatMap(sentence => sentence.split(' '));
3 │ 
```

```js
const array = ["split", "the text", "into words"];
array.map(sentence => sentence.split(' ')).flat(1);
```

```
code-block.js:2:1 lint/complexity/useFlatMap FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ The call chain .map().flat() can be replaced with a single .flatMap() call.

1 │ const array = ["split", "the text", "into words"];
2 │ array.map(sentence => sentence.split(' ')).flat(1);
3 │ 

ℹ Safe fix: Replace the chain with .flatMap().
1 │ const array = ["split", "the text", "into words"];
2 │ - array.map(sentence => sentence.split(' ')).flat(1);
2 │ + array.flatMap(sentence => sentence.split(' '));
3 │ 
```

### Valid

```js
const array = ["split", "the text", "into words"];
array.map(sentence => sentence.split(' ')).flat(2);
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useFocusableInteractive

**Description:**  
Elements with an interactive role and interaction handlers must be focusable.

**Diagnostic Category:** `lint/a11y/useFocusableInteractive`  
**Since:** `v1.8.0`  
**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:**  
Same as: `jsx-a11y/interactive-supports-focus`

Elements with an interactive role and interaction handlers must be focusable. HTML elements with interactive roles must have `tabIndex` defined to ensure they are focusable. Without `tabIndex`, assistive technologies may not recognize these elements as interactive. Consider switching from an interactive role to its semantic HTML element instead.

## Examples

### Invalid

```jsx
<div role="button" />
```
Diagnostic:  
The HTML element with the interactive role "button" is not focusable.  
Add a `tabIndex` attribute to make this element focusable.

```jsx
<div role="tab" />
```
Diagnostic:  
The HTML element with the interactive role "tab" is not focusable.  
Add a `tabIndex` attribute to make this element focusable.

### Valid

```jsx
<div role="button" tabIndex={0} />
```

```jsx
<div />
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useForOf

This rule recommends a `for-of` loop when in a `for` loop, the index used to extract an item from the iterated array.

**Diagnostic Category:** `lint/style/useForOf`

**Since:** `v1.5.0`

**Sources:**
- Same as: @typescript-eslint/prefer-for-of
- Same as: unicorn/no-for-loop

## Examples

### Invalid

```js
for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}
```

**Warning:**
Use `for-of` loop instead of a `for` loop.

### Valid

```js
for (let item of array) {
   console.log(item);
}
```

```js
for (let i = 0; i < array.length; i++) {
   console.log(i, array[i]);
}
```

```js
for (let i = 0, j = 0; i < array.length; i++) {
   console.log(i, array[i]);
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useFragmentSyntax

**Description:** This rule enforces the use of `<>...</>` over `<Fragment>...</Fragment>`.

**Diagnostic Category:** `lint/style/useFragmentSyntax`

**Since:** `v1.0.0`

**Note:** This rule has an **unsafe** fix.

**Sources:** Same as: `react/jsx-fragments`

This rule enforces the use of `<>...</>` over `<Fragment>...</Fragment>`. The shorthand fragment syntax saves keystrokes and is only inapplicable when keys are required.

## Examples

### Invalid

```jsx
<Fragment>child</Fragment>
```

**Diagnostic Message:**
- FIXABLE
- ⚠ Use shorthand syntax for Fragment elements instead of standard syntax.

**Suggested Fix:**
Replace `<Fragment>` with the fragment syntax.

### Invalid

```jsx
<React.Fragment>child</React.Fragment>
```

**Diagnostic Message:**
- FIXABLE
- ⚠ Use shorthand syntax for Fragment elements instead of standard syntax.

**Suggested Fix:**
Replace `<React.Fragment>` with the fragment syntax.

## Related Links

- Disable a rule
- Configure the rule fix
- Rule options

# useGenericFontNames

Disallow a missing generic family keyword within font families.

**Diagnostic Category:** `lint/a11y/useGenericFontNames`

**Since:** `v1.8.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: stylelint/font-family-no-missing-generic-family-keyword

Disallow a missing generic family keyword within font families.

The generic font family can be:

- Placed anywhere in the font family list
- Omitted if a keyword related to property inheritance or a system font is used

This rule checks the font and font-family properties. The following special situations are ignored:

- Property with a keyword value such as `inherit`, `initial`.
- The last value being a CSS variable.
- `font-family` property in an `@font-face` rule.

## Examples

### Invalid

```css
a { font-family: Arial; }
```

code-block.css:1:18 lint/a11y/useGenericFontNames ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Generic font family missing.

> 1 │ a { font-family: Arial; }
>   │                 ^^^^^^^^^
> 2 │ 

ℹ Consider adding a generic font family as a fallback.

ℹ For examples and more information, see the MDN Web Docs

- serif
- sans-serif
- monospace
- etc.

```css
a { font: normal 14px/32px -apple-system, BlinkMacSystemFont; }
```

code-block.css:1:43 lint/a11y/useGenericFontNames ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Generic font family missing.

> 1 │ a { font: normal 14px/32px -apple-system, BlinkMacSystemFont; }
>   │                                          ^^^^^^^^^^^^^^^^^^^
> 2 │ 

ℹ Consider adding a generic font family as a fallback.

ℹ For examples and more information, see the MDN Web Docs

- serif
- sans-serif
- monospace
- etc.

### Valid

```css
a { font-family: "Lucida Grande", "Arial", sans-serif; }
```

```css
a { font-family: inherit; }
```

```css
a { font-family: sans-serif; }
```

```css
a { font-family: var(--font); }
```

```css
@font-face { font-family: Gentium; }
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useGetterReturn

Enforce `get` methods to always return a value.

**Diagnostic Category:** `lint/suspicious/useGetterReturn`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `getter-return` from ESLint documentation.

## Examples

### Invalid

```js
class Person {
    get firstName() {}
}
```
code-block.js:2:5 lint/suspicious/useGetterReturn ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ This getter should return a value.  
1 │ class Person {  
2 │     get firstName() {}  
3 │ }  

```js
const obj = {
    get firstName() {
        return;
    }
}
```
code-block.js:3:9 lint/suspicious/useGetterReturn ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ This return should return a value because it is located in a getter.  
1 │ const obj = {  
2 │     get firstName() {  
3 │         return;  
4 │     }  
5 │ }  

```js
class Option {
    get value() {
        if (this.hasValue) {
            log();
        } else {
            return null;
        }
    }
}
```
code-block.js:2:5 lint/suspicious/useGetterReturn ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ This getter should return a value.  
1 │ class Option {  
2 │     get value() {  
3 │         if (this.hasValue) {  
4 │             log();  
5 │         } else {  
6 │             return null;  
7 │         }  
8 │     }  
9 │ }  

### Valid

```js
class Person {
    get firstName() {
        return this.fullname.split(" ")[0];
    }
}
```

```js
const obj = {
    get firstName() {
        return this.fullname.split(" ")[0];
    }
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useGoogleFontDisplay

**Description:** Enforces the use of a recommended `display` strategy with Google Fonts.

**Diagnostic Category:** `lint/nursery/useGoogleFontDisplay`

**Since:** `v1.9.4`

**Caution:** This rule is part of the nursery group.

**Sources:** Same as: `@next/google-font-display`

The `display` property controls how a font is displayed while it is loading. When using Google Fonts, it's important to specify an appropriate value for this property to ensure good user experience and prevent layout shifts.

This rule flags the absence of the `display` parameter, or the usage of less optimal values such as `auto`, `block`, or `fallback`. Using `&display=optional` is generally recommended as it minimizes the risk of invisible text or layout shifts. In cases where swapping to the custom font after it has loaded is important, consider using `&display=swap`.

## Examples

### Invalid

```jsx
<link href="https://fonts.googleapis.com/css2?family=Krona+One" />
```
**Warning:** The Google Font link is missing the `display` parameter.  
**Suggestion:** Use `&display=optional` to prevent invisible text and layout shifts. If font swapping is important, use `&display=swap`.

```jsx
<link href="https://fonts.googleapis.com/css2?family=Krona+One&display=auto" />
```
**Warning:** The Google Font link has a non-recommended `display` value.  
**Suggestion:** Use `&display=optional` to prevent invisible text and layout shifts. If font swapping is important, use `&display=swap`.

```jsx
<link href="https://fonts.googleapis.com/css2?family=Krona+One&display=block" />
```
**Warning:** The Google Font link has a non-recommended `display` value.  
**Suggestion:** Use `&display=optional` to prevent invisible text and layout shifts. If font swapping is important, use `&display=swap`.

```jsx
<link href="https://fonts.googleapis.com/css2?family=Krona+One&display=fallback" />
```
**Warning:** The Google Font link has a non-recommended `display` value.  
**Suggestion:** Use `&display=optional` to prevent invisible text and layout shifts. If font swapping is important, use `&display=swap`.

### Valid

```jsx
<link href="https://fonts.googleapis.com/css2?family=Krona+One&display=optional" rel="stylesheet" />
```

```jsx
<link href="https://fonts.googleapis.com/css2?display=unknown" rel="stylesheet" />
```

```jsx
<link rel="stylesheet" />
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useGuardForIn

Require `for-in` loops to include an `if` statement.

**Diagnostic Category:** `lint/nursery/useGuardForIn`

**Since:** `v1.9.4`

**Caution:** This rule is part of the nursery group.

**Sources:** Same as: `guard-for-in` (https://eslint.org/docs/latest/rules/guard-for-in)

Looping over objects with a `for-in` loop will include properties inherited through the prototype chain. This behavior can lead to unexpected items in your for loop.

For codebases that do not support ES2022, `Object.prototype.hasOwnProperty.call(foo, key)` can be used as a check that the property is not inherited.

For codebases that do support ES2022, `Object.hasOwn(foo, key)` can be used as a shorter and more reliable alternative.

## Examples

### Invalid

```js
for (key in foo) {
  doSomething(key);
}
```

**Diagnostic Message:**
code-block.js:1:1 lint/nursery/useGuardForIn ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ The body of a for-in should be wrapped in an `if` statement.  

1 │ for (key in foo) {  
2 │   doSomething(key);  
3 │ }  

ℹ Looping over the object with for-in loop will include properties that are inherited through the prototype chain, the behavior can lead to some unexpected items in your loop.  
ℹ To resolve this issue, add an if statement like `if (Object.hasOwn(foo, key)) {...}` to filter out the extraneous properties.  

### Valid

```js
for (key in foo) {
  if (Object.hasOwn(foo, key)) {
    doSomething(key);
  }
}
```

```js
for (key in foo) {
  if (Object.prototype.hasOwnProperty.call(foo, key)) {
    doSomething(key);
  }
}
```

```js
for (key in foo) {
  if ({}.hasOwnProperty.call(foo, key)) {
    doSomething(key);
  }
}
```

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)

# useHeadingContent

Enforce that heading elements (h1, h2, etc.) have content and that the content is accessible to screen readers. Accessible means that it is not hidden using the aria-hidden prop.

**Diagnostic Category:** `lint/a11y/useHeadingContent`  
**Since:** `v1.0.0`  
**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: Same as: `jsx-a11y/heading-has-content`

## Examples

### Invalid

```jsx
<h1 />
```
Diagnostic: Provide screen reader accessible content when using heading elements.

```jsx
<h1><div aria-hidden /></h1>
```
Diagnostic: Provide screen reader accessible content when using heading elements.

```jsx
<h1 aria-label="Screen reader content" aria-hidden>invisible content</h1>
```
Diagnostic: Provide screen reader accessible content when using heading elements.

```jsx
<h1></h1>
```
Diagnostic: Provide screen reader accessible content when using heading elements.

### Valid

```jsx
<h1>heading</h1>
```

```jsx
<h1><div aria-hidden="true"></div>visible content</h1>
```

```jsx
<h1 aria-label="Screen reader content"><div aria-hidden="true">invisible content</div></h1>
```

```jsx
<h1 dangerouslySetInnerHTML={{ __html: "heading" }} />
```

```jsx
<h1><div aria-hidden />visible content</h1>
```

## Accessibility guidelines

- WCAG 2.4.6

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useHookAtTopLevel

Enforce that all React hooks are being called from the Top Level component functions.

**Diagnostic Category:** `lint/correctness/useHookAtTopLevel`  
**Since:** `v1.0.0`  
**Sources:** Same as: `react-hooks/rules-of-hooks`

_This rule should be used only in **React** projects._

To understand why this is required, see: reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level

## Examples

### Invalid

```js
function Component1({ a }) {
    if (a == 1) {
        useEffect();
    }
}
```

**Warning:** This hook is being called conditionally, but all hooks must be called in the exact same order in every component render.

```js
function Component1({ a }) {
    if (a != 1) {
        return;
    }

    useEffect();
}
```

**Warning:** This hook is being called conditionally, but all hooks must be called in the exact same order in every component render.

### Valid

```js
function Component1() {
    useEffect();
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useHtmlLang

Enforce that `html` element has `lang` attribute.

**Diagnostic Category: `lint/a11y/useHtmlLang`**

**Since**: `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: jsx-a11y/html-has-lang

Enforce that `html` element has `lang` attribute.

## Examples

### Invalid

```jsx
<html></html>
```
```
code-block.jsx:1:1 lint/a11y/useHtmlLang ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a lang attribute when using the html element.

> 1 │ <html></html>
   │ ^^^^^^
2 │ 

ℹ Setting a lang attribute on HTML document elements configures the language used by screen readers when no user default is specified.
```

```jsx
<html lang={""}></html>
```
```
code-block.jsx:1:1 lint/a11y/useHtmlLang ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a lang attribute when using the html element.

> 1 │ <html lang={""}></html>
   │ ^^^^^^
2 │ 

ℹ Setting a lang attribute on HTML document elements configures the language used by screen readers when no user default is specified.
```

```jsx
<html lang={null}></html>
```
```
code-block.jsx:1:1 lint/a11y/useHtmlLang ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a lang attribute when using the html element.

> 1 │ <html lang={null}></html>
   │ ^^^^^^
2 │ 

ℹ Setting a lang attribute on HTML document elements configures the language used by screen readers when no user default is specified.
```

```jsx
<html lang={undefined}></html>
```
```
code-block.jsx:1:1 lint/a11y/useHtmlLang ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a lang attribute when using the html element.

> 1 │ <html lang={undefined}></html>
   │ ^^^^^^
2 │ 

ℹ Setting a lang attribute on HTML document elements configures the language used by screen readers when no user default is specified.
```

```jsx
<html lang={true}></html>
```
```
code-block.jsx:1:1 lint/a11y/useHtmlLang ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a lang attribute when using the html element.

> 1 │ <html lang={true}></html>
   │ ^^^^^^
2 │ 

ℹ Setting a lang attribute on HTML document elements configures the language used by screen readers when no user default is specified.
```

### Valid

```jsx
<html lang="en"></html>
```

```jsx
<html lang={language}></html>
```

```jsx
<html {...props}></html>
```

```jsx
<html lang={""} {...props}></html>
```

## Accessibility guidelines

- WCAG 3.1.1

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useIframeTitle

**Description:** Enforces the usage of the attribute `title` for the element `iframe`.

**Diagnostic Category:** `lint/a11y/useIframeTitle`

**Since:** `v1.0.0`

**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:** Same as: `jsx-a11y/iframe-has-title`

Enforces the usage of the attribute `title` for the element `iframe`.

## Examples

### Invalid

```jsx
<iframe />
```

```
code-block.jsx:1:2 lint/a11y/useIframeTitle ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a title attribute when using iframe elements.

> 1 │ <iframe />
   │ ^^^^^^^^^^^
2 │ 

ℹ Screen readers rely on the title set on an iframe to describe the content being displayed.
```

```jsx
<iframe></iframe>
```

```
code-block.jsx:1:1 lint/a11y/useIframeTitle ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a title attribute when using iframe elements.

> 1 │ <iframe></iframe>
   │ ^^^^^^^^^^^
2 │ 

ℹ Screen readers rely on the title set on an iframe to describe the content being displayed.
```

```jsx
<iframe title="" />
```

```
code-block.jsx:1:1 lint/a11y/useIframeTitle ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a title attribute when using iframe elements.

> 1 │ <iframe title="" />
   │ ^^^^^^^^^^^
2 │ 

ℹ Screen readers rely on the title set on an iframe to describe the content being displayed.
```

```jsx
<iframe title={""} />
```

```
code-block.jsx:1:1 lint/a11y/useIframeTitle ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a title attribute when using iframe elements.

> 1 │ <iframe title={""} />
   │ ^^^^^^^^^^^
2 │ 

ℹ Screen readers rely on the title set on an iframe to describe the content being displayed.
```

```jsx
<iframe title={undefined} />
```

```
code-block.jsx:1:1 lint/a11y/useIframeTitle ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a title attribute when using iframe elements.

> 1 │ <iframe title={undefined} />
   │ ^^^^^^^^^^^
2 │ 

ℹ Screen readers rely on the title set on an iframe to describe the content being displayed.
```

```jsx
<iframe title={false} />
```

```
code-block.jsx:1:1 lint/a11y/useIframeTitle ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a title attribute when using iframe elements.

> 1 │ <iframe title={false} />
   │ ^^^^^^^^^^^
2 │ 

ℹ Screen readers rely on the title set on an iframe to describe the content being displayed.
```

```jsx
<iframe title={true} />
```

```
code-block.jsx:1:1 lint/a11y/useIframeTitle ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a title attribute when using iframe elements.

> 1 │ <iframe title={true} />
   │ ^^^^^^^^^^^
2 │ 

ℹ Screen readers rely on the title set on an iframe to describe the content being displayed.
```

```jsx
<iframe title={42} />
```

```
code-block.jsx:1:1 lint/a11y/useIframeTitle ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a title attribute when using iframe elements.

> 1 │ <iframe title={42} />
   │ ^^^^^^^^^^^
2 │ 

ℹ Screen readers rely on the title set on an iframe to describe the content being displayed.
```

### Valid

```jsx
<>
  <iframe title="This is a unique title" />
  <iframe title={uniqueTitle} />
  <iframe {...props} />
</>
```

## Accessibility guidelines

- WCAG 2.4.1
- WCAG 4.1.2

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useImportExtensions

Enforce file extensions for relative imports.

**Diagnostic Category:** `lint/correctness/useImportExtensions`

**Since:** `v1.8.0`

:::note
- This rule has an **unsafe** fix.
:::

Browsers and Node.js do not natively support importing files without extensions. This rule enforces the use of file extensions for relative imports to make the code more consistent. Tooling also benefits from explicit file extensions, as they do not need to guess which file to resolve.

The rule checks static imports and dynamic import calls such as `import()` and `require()`.

To ensure that Visual Studio Code adds the file extension when it automatically imports a variable, set `javascript.preferences.importModuleSpecifierEnding` and `typescript.preferences.importModuleSpecifierEnding` to the desired file extension.

## Examples

### Invalid

```js
import "./foo";
```
```
code-block.js:1:8 lint/correctness/useImportExtensions FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Add a file extension for relative imports.

> 1 │ import "./foo";
   │       ^^^^^^^^
2 │ 

ℹ Explicit import improves compatibility with browsers and makes file resolution in tooling faster.

ℹ Unsafe fix: Add potential import extension .js.
```

```js
import "./foo/";
```
```
code-block.js:1:8 lint/correctness/useImportExtensions FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Add a file extension for relative imports.

> 1 │ import "./foo/";
   │       ^^^^^^^^
2 │ 

ℹ Explicit import improves compatibility with browsers and makes file resolution in tooling faster.

ℹ Unsafe fix: Add potential import extension .js.
```

```js
import "../";
```
```
code-block.js:1:8 lint/correctness/useImportExtensions FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Add a file extension for relative imports.

> 1 │ import "../";
   │       ^^^^^
2 │ 

ℹ Explicit import improves compatibility with browsers and makes file resolution in tooling faster.

ℹ Unsafe fix: Add potential import extension .js.
```

```js
import "../.";
```
```
code-block.js:1:8 lint/correctness/useImportExtensions FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Add a file extension for relative imports.

> 1 │ import "../.";
   │       ^^^^^
2 │ 

ℹ Explicit import improves compatibility with browsers and makes file resolution in tooling faster.

ℹ Unsafe fix: Add potential import extension .js.
```

```js
import("./foo");
```
```
code-block.js:1:8 lint/correctness/useImportExtensions FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Add a file extension for relative imports.

> 1 │ import("./foo");
   │       ^^^^^^^^
2 │ 

ℹ Explicit import improves compatibility with browsers and makes file resolution in tooling faster.

ℹ Unsafe fix: Add potential import extension .js.
```

```js
require("./foo");
```
```
code-block.js:1:9 lint/correctness/useImportExtensions FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Add a file extension for relative imports.

> 1 │ require("./foo");
   │        ^^^^^^^^
2 │ 

ℹ Explicit import improves compatibility with browsers and makes file resolution in tooling faster.

ℹ Unsafe fix: Add potential import extension .js.
```

### Valid

```js
import "biome";
```

```js
import "./foo.js";
```

```js
import "./bar/index.js";
```

```js
import("./foo.js");
```

```js
require("./foo.js");
```

### Options

Use the options to specify the correct import extensions for your project based on the linted file extension. These mappings will override the rule's default logic.

Currently, Biome determines the import extension based on the inspected file extension. The `suggestedExtensions` option works as a map, where the key is the source file extension and the value should provide two possible mappings for imports:

- `module` is used for module imports that start with a lower-case character, e.g. `foo.js`
- `component` is used for component files that start with an upper-case character, e.g. `Foo.jsx`

Example configuration for `.ts` files to import other modules as `.js` (or `.jsx`):

```json
{
    "//": "...",
    "options": {
        "suggestedExtensions": {
            "ts": {
                "module": "js",
                "component": "jsx"
            }
        }
    }
}
```

:::caution
This is a temporary workaround that allows Biome to propose correct import extensions for TypeScript projects that use ES Modules. TypeScript requires you to specify imports to the actual files used in runtime: `.js` or `.mjs`.
:::

## Caveats

If you are using TypeScript, TypeScript version 5.0 and later is required. Also, enable `allowImportingTsExtensions=true` in your `tsconfig.json`.

The rule does not yet check the filesystem for file type. It tries to guess which extension it should add based on the file extension of the current file and the import path. When applying the suggested fix, verify that the file type is correct.

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useImportRestrictions

Disallows package private imports.

**Diagnostic Category:** `lint/nursery/useImportRestrictions`

**Since:** `v1.0.0`

:::caution
This rule is part of the nursery group.
:::

Sources: 
- Inspired from: import-access/eslint-plugin-import-access

This rule enforces the following restrictions:

## Package private visibility

All exported symbols, such as types, functions, or other things that may be exported, are considered to be "package private". This means that modules that reside in the same directory, as well as submodules of those "sibling" modules, are allowed to import them, while any other modules that are further away in the file system are restricted from importing them. A symbol's visibility may be extended by re-exporting from an index file.

Notes:

- This rule only applies to relative imports. External dependencies are exempted.
- This rule only applies to imports for JavaScript and TypeScript files. Imports for resources such as images or CSS files are exempted.

## Examples

### Invalid

```js
// Attempt to import from `foo.js` from outside its `sub` module.
import { fooPackageVariable } from "./sub/foo.js";
```
code-block.js:2:36 lint/nursery/useImportRestrictions ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Importing package private symbols is prohibited from outside the module directory.

1 │ // Attempt to import from `foo.js` from outside its `sub` module.
2 │ import { fooPackageVariable } from "./sub/foo.js";
3 │ 

ℹ Please import from ./sub instead (you may need to re-export the symbol(s) from ./sub/foo.js).

```js
// Attempt to import from `bar.ts` from outside its `aunt` module.
import { barPackageVariable } from "../aunt/bar.ts";
```
code-block.js:2:36 lint/nursery/useImportRestrictions ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Importing package private symbols is prohibited from outside the module directory.

1 │ // Attempt to import from `bar.ts` from outside its `aunt` module.
2 │ import { barPackageVariable } from "../aunt/bar.ts";
3 │ 

ℹ Please import from ../aunt instead (you may need to re-export the symbol(s) from ../aunt/bar.ts).

```js
// Assumed to resolve to a JS/TS file.
import { fooPackageVariable } from "./sub/foo";
```
code-block.js:2:36 lint/nursery/useImportRestrictions ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Importing package private symbols is prohibited from outside the module directory.

1 │ // Assumed to resolve to a JS/TS file.
2 │ import { fooPackageVariable } from "./sub/foo";
3 │ 

ℹ Please import from ./sub instead (you may need to re-export the symbol(s) from ./sub/foo).

```js
// If the `sub/foo` module is inaccessible, so is its index file.
import { fooPackageVariable } from "./sub/foo/index.js";
```
code-block.js:2:36 lint/nursery/useImportRestrictions ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ Importing package private symbols is prohibited from outside the module directory.

1 │ // If the `sub/foo` module is inaccessible, so is its index file.
2 │ import { fooPackageVariable } from "./sub/foo/index.js";
3 │ 

ℹ Please import from ./sub/index.js instead (you may need to re-export the symbol(s) from ./sub/foo/index.js).

### Valid

```js
// Imports within the same module are always allowed.
import { fooPackageVariable } from "./foo.js";

// Resources (anything other than JS/TS files) are exempt.
import { barResource } from "../aunt/bar.png";

// A parent index file is accessible like other modules.
import { internal } from "../../index.js";

// If the `sub` module is accessible, so is its index file.
import { subPackageVariable } from "./sub/index.js";

// Library imports are exempt.
import useAsync from "react-use/lib/useAsync";
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useImportType

Promotes the use of `import type` for types.

**Diagnostic Category: `lint/style/useImportType`**

**Since**: `v1.5.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

Sources: 
- Inspired from: @typescript-eslint/consistent-type-imports

Promotes the use of `import type` for types.

_TypeScript_ allows specifying a `type` keyword on an `import` to indicate that the `import` doesn't exist at runtime. This allows compilers to safely drop imports of types without looking for their definition, ensuring that some modules are not loaded at runtime.

The rule ensures that all imports used only as a type use a type-only `import`. It also groups inline type imports into a grouped `import type`.

If you use the TypeScript Compiler (TSC) to compile your code into JavaScript, you can disable this rule, as TSC can remove imports only used as types. However, for consistency and compatibility with other compilers, you may want to enable this rule. In that case, we recommend enabling TSC's `verbatimModuleSyntax`. This configuration ensures that TSC preserves imports not marked with the `type` keyword.

You may also want to enable the editor setting `typescript.preferences.preferTypeOnlyAutoImports` from the TypeScript LSP. This setting is available in Visual Studio Code and ensures the `type` is used when the editor automatically imports a type.

## Caveat with TypeScript experimental decorators

Some frameworks like Angular and NestJS rely on experimental TypeScript decorators, which allow code to be generated based on type annotations, mainly used for dependency injection.

Since Biome doesn't know how a decorator is implemented, it is unable to detect that an import used as a type is also used as a value in the code generated by a decorator. This leads Biome to suggest importing some imports as type, which are actually used as value at runtime.

We haven't found a way to support this pattern yet. We recommend disabling this rule when using such decorators.

## Options

This rule respects the `jsxRuntime` setting and will make an exception for React globals if it is set to `"reactClassic"`.

## Examples

### Invalid

```ts
import { A } from "./mod.js";
type TypeOfA = typeof A;
let a: A;
```

code-block.ts:1:8 lint/style/useImportType FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ All these imports are only used as types.

> 1 │ import { A } from "./mod.js";
   │       ^^^^^^^^^^^^^^^^^^^^^
2 │ type TypeOfA = typeof A;
3 │ let a: A;

ℹ Importing the types with `import type` ensures that they are removed by the compilers and avoids loading unnecessary modules.

ℹ Safe fix: Use `import type`.

```ts
import { type A, type B } from "./mod.js";
```

code-block.ts:1:8 lint/style/useImportType FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ All these imports are only used as types.

> 1 │ import { type A, type B } from "./mod.js";
   │       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Importing the types with `import type` ensures that they are removed by the compilers and avoids loading unnecessary modules.

ℹ Safe fix: Use `import type`.

```ts
import { type A, B } from "./mod.js";
let c: A;
let d: typeof B;
```

code-block.ts:1:8 lint/style/useImportType FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ All these imports are only used as types.

> 1 │ import { type A, B } from "./mod.js";
   │       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ let c: A;
3 │ let d: typeof B;

ℹ Importing the types with `import type` ensures that they are removed by the compilers and avoids loading unnecessary modules.

ℹ Safe fix: Use `import type`.

### Valid

```ts
import type { A } from "./mod.js";
let a: A;
```

```ts
import { B } from "./mod.js";
let a: B = new B();
```

```ts
import { type A, B } from "./mod.js";
let c: A;
let d = new B();
```

The rule ignores unused imports and imports with import attributes.

```ts
import { A } from "./mod.js";

import { B } from "./mod.js" with {};
export type { B };
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useIsArray

Use `Array.isArray()` instead of `instanceof Array`.

**Diagnostic Category:** `lint/suspicious/useIsArray`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:**
- Same as: `unicorn/no-instanceof-array`

In JavaScript, some array-like objects such as `arguments` are not instances of the `Array` class. Moreover, the global `Array` class can differ between execution contexts. For instance, two frames in a web browser have distinct `Array` classes. Passing arrays across these contexts results in arrays that are not instances of the contextual global `Array` class. To avoid these issues, use `Array.isArray()` instead of `instanceof Array`. See the MDN docs for more details.

## Examples

### Invalid

```js
const xs = [];
if (xs instanceof Array) {}
```

**Error:**
Use `Array.isArray()` instead of `instanceof Array`.

### Valid

```js
const xs = [];
if (Array.isArray(xs)) {}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useIsNan

**Description:** Require calls to `isNaN()` when checking for `NaN`.

**Diagnostic Category:** `lint/correctness/useIsNan`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:** Same as: `use-isnan`

In JavaScript, `NaN` is a special value of the `Number` type, representing "not-a-number" values. It is unique in that it is not equal to anything, including itself. Therefore, comparisons to `NaN` yield confusing results:
- `NaN === NaN` evaluates to false
- `NaN !== NaN` evaluates to true

Use `Number.isNaN()` or global `isNaN()` functions to test for `NaN`. Note that `Number.isNaN()` does not perform coercion, making it a more reliable method.

## Examples

### Invalid

```js
123 == NaN
```
Diagnostic: Use the Number.isNaN function to compare with NaN.

```js
123 != NaN
```
Diagnostic: Use the Number.isNaN function to compare with NaN.

```js
switch(foo) { case (NaN): break; }
```
Diagnostic: 'case NaN' can never match. Use Number.isNaN before the switch.

```js
Number.NaN == "abc"
```
Diagnostic: Use the Number.isNaN function to compare with NaN.

### Valid

```js
if (Number.isNaN(123) !== true) {}

foo(Number.NaN / 2)

switch(foo) {}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useJsxKeyInIterable

Disallow missing key props in iterators/collection literals.

**Diagnostic Category:** `lint/correctness/useJsxKeyInIterable`

**Since:** `v1.6.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `react/jsx-key`

Disallow missing key props in iterators/collection literals.

Warn if an element that likely requires a key prop—namely, one present in an array literal or an arrow function expression. Check out React documentation for explanation on why React needs keys.

## Examples

### Invalid

```jsx
[<Hello />];
```

code-block.jsx:1:2 lint/correctness/useJsxKeyInIterable ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Missing key property for this element in iterable.

1 │ [<Hello />];
   │ ^^^^^^^^^^
2 │ 

ℹ The order of the items may change, and having a key can help React identify which item was moved.

```jsx
data.map((x) => <Hello>{x}</Hello>);
```

code-block.jsx:1:17 lint/correctness/useJsxKeyInIterable ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Missing key property for this element in iterable.

1 │ data.map((x) => <Hello>{x}</Hello>);
   │ ^^^^^^^^
2 │ 

ℹ The order of the items may change, and having a key can help React identify which item was moved.

### Valid

```jsx
[<Hello key="first" />, <Hello key="second" />, <Hello key="third" />];
data.map((x) => <Hello key={x.id}>{x}</Hello>);
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useKeyWithClickEvents

**Description:** Enforce onClick is accompanied by at least one of the following: `onKeyUp`, `onKeyDown`, `onKeyPress`.

**Diagnostic Category:** `lint/a11y/useKeyWithClickEvents`

**Since:** `v1.0.0`

**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:** Same as: `jsx-a11y/click-events-have-key-events`

Enforcing keyboard accessibility is crucial for users with physical disabilities, AT compatibility, and screenreader users. This rule does not apply to interactive or hidden elements.

## Examples

### Invalid

```jsx
<div onClick={() => {}} />
```

```
code-block.jsx:1:1 lint/a11y/useKeyWithClickEvents ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Enforce to have the onClick mouse event with the onKeyUp, the onKeyDown, or the onKeyPress keyboard event.

> 1 │ <div onClick={() => {}} />
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Actions triggered using mouse events should have corresponding keyboard events to account for keyboard-only navigation.
```

### Valid

```jsx
<div onClick={() => {}} onKeyDown={handleKeyDown} />
```

```jsx
<div onClick={() => {}} onKeyUp={handleKeyUp} />
```

```jsx
<div onClick={() => {}} onKeyPress={handleKeyPress} />
```

```jsx
// this rule doesn't apply to user created component
<MyComponent onClick={() => {}} />
```

```jsx
<div onClick={() => {}} {...spread}></div>
```

```jsx
<div {...spread} onClick={() => {}} ></div>
```

```jsx
<button onClick={() => console.log("test")}>Submit</button>
```

## Accessibility guidelines

- WCAG 2.1.1

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useKeyWithMouseEvents

Enforce `onMouseOver` / `onMouseOut` are accompanied by `onFocus` / `onBlur`.

**Diagnostic Category:** `lint/a11y/useKeyWithMouseEvents`

**Since:** `v1.0.0`

**Note:** 
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:** 
- Same as: `jsx-a11y/mouse-events-have-key-events`

Enforce `onMouseOver` / `onMouseOut` are accompanied by `onFocus` / `onBlur`.

Coding for the keyboard is important for users with physical disabilities who cannot use a mouse, AT compatibility, and screenreader users.

## Examples

### Invalid

```jsx
<div onMouseOver={() => {}} />
```

```
code-block.jsx:1:1 lint/a11y/useKeyWithMouseEvents ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ onMouseOver must be accompanied by onFocus for accessibility.

> 1 │ <div onMouseOver={() => {}} />
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Actions triggered using mouse events should have corresponding events to account for keyboard-only navigation.
```

```jsx
<div onMouseOut={() => {}} />
```

```
code-block.jsx:1:1 lint/a11y/useKeyWithMouseEvents ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ onMouseOut must be accompanied by onBlur for accessibility.

> 1 │ <div onMouseOut={() => {}} />
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Actions triggered using mouse events should have corresponding events to account for keyboard-only navigation.
```

### Valid

```jsx
<>
  <div onMouseOver={() => {}} onFocus={() => {}} />
  <div onMouseOut={() => {}} onBlur={() => {}} />
  <div onMouseOver={() => {}} {...otherProps} />
  <div onMouseOut={() => {}} {...otherProps} />
  <div onMouseOver={() => {}} onFocus={() => {}} {...otherProps} />
  <div onMouseOut={() => {}} onBlur={() => {}} {...otherProps} />
</>
```

## Accessibility guidelines

- WCAG 2.1.1

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useLiteralEnumMembers

Require all enum members to be literal values.

**Diagnostic Category:** `lint/style/useLiteralEnumMembers`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `@typescript-eslint/prefer-literal-enum-member`

Require all enum members to be literal values. Usually, an enum member is initialized with a literal number or a literal string. However, TypeScript allows the value of an enum member to be many different kinds of expressions. Using a computed enum member is often error-prone and confusing. This rule requires the initialization of enum members with constant expressions. It allows numeric and bitwise expressions for supporting enum flags. It also allows referencing previous enum members.

## Examples

### Invalid

```ts
const x = 2;
enum Computed {
    A,
    B = x,
}
```

code-block.ts:4:9 lint/style/useLiteralEnumMembers ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ The enum member should be initialized with a literal value such as a number or a string.  
2 │ enum Computed {  
3 │ A,  
4 │ B = x,  
   │ ^  
5 │ }  

### Valid

```ts
enum Direction {
    Left,
    Right,
}
```

```ts
enum Order {
    Less = -1,
    Equal = 0,
    Greater = 1,
}
```

```ts
enum State {
    Open = "Open",
    Close = "Close",
}
```

```ts
enum FileAccess {
    None = 0,
    Read = 1,
    Write = 1 << 1,
    All = Read | Write
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useLiteralKeys

Enforce the usage of a literal access to properties over computed property access.

**Diagnostic Category:** `lint/complexity/useLiteralKeys`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:**
- Same as: `dot-notation` (https://eslint.org/docs/latest/rules/dot-notation)
- Same as: `@typescript-eslint/dot-notation` (https://typescript-eslint.io/rules/dot-notation)

## Examples

### Invalid

```js
a.b["c"];
```
Diagnostic: 
- FIXABLE 
- ✖ The computed expression can be simplified without the use of a string literal.
- Unsafe fix: Use a literal key instead.
- Suggested fix: `a.b.c;`

```js
a.c[`d`];
```
Diagnostic: 
- FIXABLE 
- ✖ The computed expression can be simplified without the use of a string literal.
- Unsafe fix: Use a literal key instead.
- Suggested fix: `a.c.d;`

```js
a.c[`d`] = "something";
```
Diagnostic: 
- FIXABLE 
- ✖ The computed expression can be simplified without the use of a string literal.
- Unsafe fix: Use a literal key instead.
- Suggested fix: `a.c.d = "something";`

```js
a = {
	['b']: d
}
```
Diagnostic: 
- FIXABLE 
- ✖ The computed expression can be simplified to a string literal.
- Unsafe fix: Use a literal key instead.
- Suggested fix: `a = { 'b': d };`

### Valid

```js
a["c" + "d"];
a[d.c];
```

## Related links

- Disable a rule (link)
- Configure the rule fix (link)
- Rule options (link)

# useMediaCaption

Enforces that `audio` and `video` elements must have a `track` for captions.

**Diagnostic Category:** `lint/a11y/useMediaCaption`

**Since:** `v1.0.0`

**Note:** 
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:** 
- Same as: jsx-a11y/media-has-caption

## Examples

### Invalid

```jsx
<video />
```
```
code-block.jsx:1:2 lint/a11y/useMediaCaption ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a track for captions when using audio or video elements.

> 1 │ <video />
   │ ^^^^^^^^^^
2 │ 

ℹ Captions support users with hearing-impairments. They should be a transcription or translation of the dialogue, sound effects, musical cues, and other relevant audio information.
```

```jsx
<audio>child</audio>
```
```
code-block.jsx:1:2 lint/a11y/useMediaCaption ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a track for captions when using audio or video elements.

> 1 │ <audio>child</audio>
   │ ^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Captions support users with hearing-impairments. They should be a transcription or translation of the dialogue, sound effects, musical cues, and other relevant audio information.
```

### Valid

```jsx
<audio>
    <track kind="captions" {...props} />
</audio>
```

```jsx
<video muted {...props}></video>
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useNamespaceKeyword

Require using the `namespace` keyword over the `module` keyword to declare TypeScript namespaces.

**Diagnostic Category: `lint/suspicious/useNamespaceKeyword`**

**Since**: `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

Sources: 
- Same as: @typescript-eslint/prefer-namespace-keyword

Require using the `namespace` keyword over the `module` keyword to declare TypeScript namespaces.

TypeScript historically allowed a code organization called _namespace_. _ECMAScript modules_ are preferred (import / export).

For projects still using _namespaces_, it's preferred to use the `namespace` keyword instead of the `module` keyword. The `module` keyword is deprecated to avoid any confusion with the _ECMAScript modules_ which are often called _modules_.

Note that TypeScript `module` declarations to describe external APIs (`declare module "foo" {}`) are still allowed.

See also: https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html

## Examples

### Invalid

```ts
module Example {}
```

code-block.ts:1:1 lint/suspicious/useNamespaceKeyword FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Use the **namespace** keyword instead of the outdated **module** keyword.

> 1 │ module Example {}
   │ ^^^^^^
   
ℹ The **module** keyword is deprecated to avoid any confusion with the **ECMAScript modules** which are often called **modules**.

ℹ Safe fix: Use **namespace** instead.

```ts
namespace Example {}
```

```ts
declare module "foo" {}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useNamingConvention

Enforce naming conventions for everything across a codebase.

**Diagnostic Category:** `lint/style/useNamingConvention`

**Since:** `v1.0.0`

**Note:** This rule has a **safe** fix.

**Sources:** Inspired from: `@typescript-eslint/naming-convention`

Enforcing naming conventions helps to keep the codebase consistent and reduces overhead when thinking about the name case of a variable.

## Naming conventions

All names can be prefixed and suffixed by underscores `_` and dollar signs `$`.

### Variable and parameter names

All variables and function parameters are in `camelCase` or `PascalCase`. Catch parameters are in `camelCase`.

Additionally, global variables declared as `const` or `var` may be in `CONSTANT_CASE`. Global variables are declared at module or script level. Variables declared in a TypeScript `namespace` are also considered global.

**Examples of incorrect names:**

```js
let a_value = 0;
```

**Fixable Example:**

```js
const fooYPosition = 0;
```

### Function names

- A `function` name is in `camelCase` or `PascalCase`.
- A global `function` can also be in `UPPERCASE`.

### TypeScript `enum` names

A TypeScript `enum` name is in `PascalCase`. Enum members are by default in `PascalCase`.

### Classes

- A class name is in `PascalCase`.
- Static property and static getter names are in `camelCase` or `CONSTANT_CASE`.
- Class property and method names are in `camelCase`.

### TypeScript `type` aliases and `interface`

- A `type` alias or an interface name are in `PascalCase`.
- Member names of a type are in `camelCase`.
- `readonly` property and getter names can also be in `CONSTANT_CASE`.

**Example of an incorrect type alias:**

```ts
type person = { fullName: string };
```

### Literal object member names

- Literal object members are in `camelCase`.

### Import and export aliases and namespaces

Import and export namespaces are in `camelCase` or `PascalCase`. Import and export aliases are in `camelCase`, `PascalCase`, or `CONSTANT_CASE`.

### TypeScript type parameter names

A TypeScript type parameter name is in `PascalCase`.

### TypeScript `namespace` names

A TypeScript namespace name is in `camelCase` or `PascalCase`.

## Ignored declarations

Some declarations are always ignored, including:

- Member names that are not identifiers
- Named imports
- Destructured object properties
- Class members marked with `override`
- Declarations inside an external TypeScript module

## Options

The rule provides several options:

```json
{
    "options": {
        "strictCase": false,
        "requireAscii": true,
        "enumMemberCase": "CONSTANT_CASE",
        "conventions": [
            {
                "selector": {
                    "kind": "memberLike",
                    "modifiers": ["private"]
                },
                "match": "_(.+)",
                "formats": ["camelCase"]
            }
        ]
    }
}
```

### strictCase

When set to `true`, it forbids consecutive uppercase characters in `camelCase` and `PascalCase`. Default: `true`.

### requireAscii

When set to `true`, it forbids names that include non-ASCII characters. Default: `false`.

### enumMemberCase

By default, an enum member is in `PascalCase`. You can enforce another convention by setting `enumMemberCase`. This option will be deprecated in the future.

### conventions

The `conventions` option allows applying custom conventions. Each convention includes a `selector` and one or more requirements (`match` and `formats`).

## Regular expression syntax

The `match` option supports various syntaxes including greedy and non-greedy quantifiers, character classes, alternations, and capturing groups.

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useNodeAssertStrict

**Description**: Promotes the usage of `node:assert/strict` over `node:assert`.

**Diagnostic Category**: `lint/style/useNodeAssertStrict`

**Since**: `v1.6.0`

**Note**: This rule has a **safe** fix.

Promotes the usage of `node:assert/strict` over `node:assert`. If you prefer stricter assertions when using the Node.js assertion module, the package `node:assert/strict` exposes a set of alias for stricter assertions.

## Examples

### Invalid

```js
import * as assert from "node:assert"
```

**Error**: 
code-block.js:1:25 lint/style/useNodeAssertStrict FIXABLE 
⚠ Use **node:assert/strict** instead.

1 │ import * as assert from "node:assert"
   │                        ^^^^^^^^^^^^^^^
2 │ 

ℹ The use of stricter assertion is preferred.
ℹ Safe fix: Replace with **node:assert/strict**.

1 │ import * as assert from "node:assert/strict"

### Valid

```js
import * as assert from "node:assert/strict"
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useNodejsImportProtocol

Enforces using the `node:` protocol for Node.js builtin modules.

**Diagnostic Category:** `lint/style/useNodejsImportProtocol`

**Since:** `v1.5.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:**
- Same as: `unicorn/prefer-node-protocol`

The rule marks traditional imports like `import fs from "fs";` as invalid, suggesting the format `import fs from "node:fs";` instead. The rule also isn't triggered if there are dependencies declared in the `package.json` that match the name of a built-in Node.js module.

**Caution:** The rule doesn't support dependencies installed inside a monorepo.

## Examples

### Invalid

```js
import fs from 'fs';
```

Diagnostic:
```
code-block.js:1:16 lint/style/useNodejsImportProtocol FIXABLE
✖ A Node.js builtin module should be imported with the node: protocol.
> 1 │ import fs from 'fs';
  │               ^^^^
2 │
ℹ Using the node: protocol is more explicit and signals that the imported module belongs to Node.js.
ℹ Unsafe fix: Add the node: protocol.
1 │ -import fs from 'fs';
  │ +import fs from 'node:fs';
2 │
```

```js
import os from 'os';
```

Diagnostic:
```
code-block.js:1:16 lint/style/useNodejsImportProtocol FIXABLE
✖ A Node.js builtin module should be imported with the node: protocol.
> 1 │ import os from 'os';
  │               ^^^^
2 │
ℹ Using the node: protocol is more explicit and signals that the imported module belongs to Node.js.
ℹ Unsafe fix: Add the node: protocol.
1 │ -import os from 'os';
  │ +import os from 'node:os';
2 │
```

```js
import path from 'path';
```

Diagnostic:
```
code-block.js:1:18 lint/style/useNodejsImportProtocol FIXABLE
✖ A Node.js builtin module should be imported with the node: protocol.
> 1 │ import path from 'path';
  │                 ^^^^^^
2 │
ℹ Using the node: protocol is more explicit and signals that the imported module belongs to Node.js.
ℹ Unsafe fix: Add the node: protocol.
1 │ -import path from 'path';
  │ +import path from 'node:path';
2 │
```

### Valid

```js
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useNumberNamespace

Use the `Number` properties instead of global ones.

**Diagnostic Category: `lint/style/useNumberNamespace`**

**Since**: `v1.5.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

Sources: 
- Same as: `unicorn/prefer-number-properties`

Use the `Number` properties instead of global ones.

ES2015 moved some globals into the `Number` properties for consistency.

The rule doesn't report the globals `isFinite` and `isNaN` because they have a slightly different behavior to their corresponding `Number`'s properties `Number.isFinite` and `Number.isNaN`. You can use the dedicated rules `noGlobalIsFinite` and `noGlobalIsNan` to enforce the use of `Number.isFinite` and `Number.isNaN`.

## Examples

### Invalid

```js
parseInt("1"); // true
```
code-block.js:1:1 lint/style/useNumberNamespace FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ Use Number.parseInt instead of the equivalent global.  
> 1 │ parseInt("1"); // true  
>  │ ^  
ℹ ES2015 moved some globals into the Number namespace for consistency.  
ℹ Safe fix: Use Number.parseInt instead.  

```js
parseFloat("1.1"); // true
```
code-block.js:1:1 lint/style/useNumberNamespace FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ Use Number.parseFloat instead of the equivalent global.  
> 1 │ parseFloat("1.1"); // true  
>  │ ^  
ℹ ES2015 moved some globals into the Number namespace for consistency.  
ℹ Safe fix: Use Number.parseFloat instead.  

```js
NaN; // true
```
code-block.js:1:1 lint/style/useNumberNamespace FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ Use Number.NaN instead of the equivalent global.  
> 1 │ NaN; // true  
>  │ ^  
ℹ ES2015 moved some globals into the Number namespace for consistency.  
ℹ Safe fix: Use Number.NaN instead.  

```js
Infinity; // true
```
code-block.js:1:1 lint/style/useNumberNamespace FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ Use Number.POSITIVE_INFINITY instead of the equivalent global.  
> 1 │ Infinity; // true  
>  │ ^  
ℹ ES2015 moved some globals into the Number namespace for consistency.  
ℹ Safe fix: Use Number.POSITIVE_INFINITY instead.  

```js
-Infinity; // true
```
code-block.js:1:2 lint/style/useNumberNamespace FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ Use Number.NEGATIVE_INFINITY instead of the equivalent global.  
> 1 │ -Infinity; // true  
>  │ ^  
ℹ ES2015 moved some globals into the Number namespace for consistency.  
ℹ Safe fix: Use Number.NEGATIVE_INFINITY instead.  

### Valid

```js
Number.parseInt("1"); // false
```

```js
Number.parseFloat("1.1"); // false
```

```js
Number.NaN; // false
```

```js
Number.POSITIVE_INFINITY; // false
```

```js
Number.NEGATIVE_INFINITY; // false
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useNumberToFixedDigitsArgument

Enforce using the digits argument with `Number#toFixed()`.

**Diagnostic Category:** `lint/suspicious/useNumberToFixedDigitsArgument`  
**Since:** `v1.8.0`  
**Note:** This rule has an **unsafe** fix.

Sources: Same as: `unicorn/require-number-to-fixed-digits-argument`

When using `Number#toFixed()`, explicitly specify the number of digits you want to appear after the decimal point to avoid unexpected results, rather than relying on its default value of 0.

## Examples

### Invalid

```js
const string = number.toFixed();
```

Diagnostic message:  
code-block.js:1:30 lint/suspicious/useNumberToFixedDigitsArgument FIXABLE  
⚠ Specify the number of digits you want to appear after the decimal point.  
1 │ const string = number.toFixed();  
   │                             ^^  
2 │  

Unsafe fix: Add explicit digits argument to `toFixed` method.  
1 │ const string = number.toFixed(0);  

### Valid

```js
const string = foo.toFixed(0);
```

```js
const string = foo.toFixed(2);
```

## Caveats

This rule always assumes that `toFixed` is called on a number. It does not check the type of the callee.

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useNumericLiterals

Disallow `parseInt()` and `Number.parseInt()` in favor of binary, octal, and hexadecimal literals.

**Diagnostic Category:** `lint/style/useNumericLiterals`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

Sources: 
- Same as: prefer-numeric-literals

Disallow `parseInt()` and `Number.parseInt()` in favor of binary, octal, and hexadecimal literals.

JavaScript provides literal forms for binary, octal, and hexadecimal numbers. For example: `0b11`, `0o77`, and `0xff`. Using the literal forms enables static code analysis and avoids unnecessary computations.

## Examples

### Invalid

```js
parseInt("111110111", 2);
```
Diagnostic: This call to `parseInt()` can be replaced by a binary literal.

```js
Number.parseInt("767", 8);
```
Diagnostic: This call to `Number.parseInt()` can be replaced by an octal literal.

```js
Number.parseInt("-1f7", 16);
```
Diagnostic: This call to `Number.parseInt()` can be replaced by a hexadecimal literal.

### Valid

```js
parseInt(1);
parseInt(1, 3);
Number.parseInt(1);
Number.parseInt(1, 3);

0b111110111 === 503;
0o767 === 503;
0x1F7 === 503;

a[parseInt](1,2);

parseInt(foo);
parseInt(foo, 2);
Number.parseInt(foo);
Number.parseInt(foo, 2);
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useOptionalChain

**Description:** Enforce using concise optional chain instead of chained logical expressions.

**Diagnostic Category:** `lint/complexity/useOptionalChain`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:** Same as: `@typescript-eslint/prefer-optional-chain`

The optional chain operator allows you to safely access properties and methods on objects when they are potentially `null` or `undefined`. It only chains when the property value is `null` or `undefined`, making it safer than relying on logical operator chaining.

## Examples

### Invalid

```js
foo && foo.bar && foo.bar.baz && foo.bar.baz.buzz
```

**Diagnostic:**
- Change to an optional chain.

```js
foo.bar && foo.bar.baz.buzz
```

**Diagnostic:**
- Change to an optional chain.

```js
foo !== undefined && foo.bar != undefined && foo.bar.baz !== null && foo.bar.baz.buzz
```

**Diagnostic:**
- Change to an optional chain.

```js
((foo || {}).bar || {}).baz;
```

**Diagnostic:**
- Change to an optional chain.

```js
(await (foo1 || {}).foo2 || {}).foo3;
```

**Diagnostic:**
- Change to an optional chain.

```ts
(((typeof x) as string) || {}).bar;
```

**Diagnostic:**
- Change to an optional chain.

### Valid

```js
foo && bar;
```

```js
foo || {};
```

```js
(foo = 2 || {}).bar;
```

```js
foo || foo.bar;
```

```js
foo["some long"] && foo["some long string"].baz
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useRegexLiterals

Enforce the use of the regular expression literals instead of the RegExp constructor if possible.

**Diagnostic Category:** `lint/complexity/useRegexLiterals`

**Since:** `v1.3.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

**Sources:** 
- Same as: prefer-regex-literals

There are two ways to create a regular expression:
- Regular expression literals, e.g., `/abc/u`.
- The RegExp constructor function, e.g., `new RegExp("abc", "u")`.

The constructor function is particularly useful when you want to dynamically generate the pattern, because it takes string arguments. Using regular expression literals avoids some escaping required in a string literal and are easier to analyze statically.

## Examples

### Invalid

```js
new RegExp("abc", "u");
```

**Diagnostic Message:**
code-block.js:1:1 lint/complexity/useRegexLiterals FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Use a regular expression literal instead of the RegExp constructor.

> 1 │ new RegExp("abc", "u");
> 2 │ 

ℹ Regular expression literals avoid some escaping required in a string literal, and are easier to analyze statically.

ℹ Safe fix: Use a literal notation instead.

```js
// Fix
/abc/u;
```

### Valid

```js
/abc/u;

new RegExp("abc", flags);
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useSelfClosingElements

Prevent extra closing tags for components without children.

**Diagnostic Category:** `lint/style/useSelfClosingElements`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:** 
- Same as: `@stylistic/jsx-self-closing-comp`

## Examples

### Invalid

```jsx
<div></div>
```
```
code-block.jsx:1:1 lint/style/useSelfClosingElements FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ JSX elements without children should be marked as self-closing. In JSX, it is valid for any element to be self-closing.

> 1 │ <div></div>
   │ ^^^^^^^^^^^
2 │ 

ℹ Unsafe fix: Use a SelfClosingElement instead

1 │ - <div></div>
   │ +
2 │  <div·/>
```

```jsx
<Component></Component>
```
```
code-block.jsx:1:1 lint/style/useSelfClosingElements FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ JSX elements without children should be marked as self-closing. In JSX, it is valid for any element to be self-closing.

> 1 │ <Component></Component>
   │ ^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Unsafe fix: Use a SelfClosingElement instead

1 │ - <Component></Component>
   │ +
2 │  <Component·/>
```

```jsx
<Foo.bar></Foo.bar>
```
```
code-block.jsx:1:1 lint/style/useSelfClosingElements FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ JSX elements without children should be marked as self-closing. In JSX, it is valid for any element to be self-closing.

> 1 │ <Foo.bar></Foo.bar>
   │ ^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Unsafe fix: Use a SelfClosingElement instead

1 │ - <Foo.bar></Foo.bar>
   │ +
2 │  <Foo.bar·/>
```

### Valid

```js
<div />
```

```js
<div>child</div>
```

```js
<Component />
```

```js
<Component>child</Component>
```

```js
<Foo.bar />
```

```js
<Foo.bar>child</Foo.bar>
```

## Options

### `ignoreHtmlElements`

**Since version 2.0.0.**

Default: `false`

This option allows you to specify whether to ignore checking native HTML elements.

In the following example, when the option is set to "true", it will not self-close native HTML elements.

```json
{
    "//":"...",
    "options": {
        "ignoreHtmlElements": true
    }
}
```

```jsx
<div></div>
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useSemanticElements

**Description:**  
It detects the use of `role` attributes in JSX elements and suggests using semantic elements instead.

**Diagnostic Category:** `lint/a11y/useSemanticElements`  
**Since:** `v1.8.0`  
**Note:**  
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:**  
- Same as: `jsx-a11y/prefer-tag-over-role`

The `role` attribute is used to define the purpose of an element, but it should be used as a last resort. Using semantic elements like `<button>`, `<nav>`, and others are more accessible and provide better semantics.

## Examples

### Invalid

```jsx
<div role="checkbox"></div>
```
```
code-block.jsx:1:6 lint/a11y/useSemanticElements ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ The elements with the following roles can be changed to the following elements:
  <input type="checkbox">

1 │ <div role="checkbox"></div>
   │     ^^^^^^^^^^
2 │ 

ℹ For examples and more information, see WAI-ARIA Roles
```

```jsx
<div role="separator"></div>
```
```
code-block.jsx:1:6 lint/a11y/useSemanticElements ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ The elements with the following roles can be changed to the following elements:
  <hr>

1 │ <div role="separator"></div>
   │     ^^^^^^^^^^
2 │ 

ℹ For examples and more information, see WAI-ARIA Roles
```

### Valid

```jsx
<>
  <input type="checkbox">label</input>
  <hr/>
</>;
```

All elements with `role="img"` are ignored:

```jsx
<div role="img" aria-label="That cat is so cute">
  <p>&#x1F408; &#x1F602;</p>
</div>
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useShorthandArrayType

When expressing array types, this rule promotes the usage of `T[]` shorthand instead of `Array<T>`.

**Diagnostic Category:** `lint/style/useShorthandArrayType`

**Caution:** This rule is deprecated and will be removed in the next major release.  
**Reason:** Use `useConsistentArrayType` instead.  
**Since:** `v1.0.0`  
**Note:** This rule has an **unsafe** fix.

## Examples

### Invalid

```ts
let invalid: Array<foo>;
```
code-block.ts:1:14 lint/style/useShorthandArrayType FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Use shorthand T[] syntax instead of Array<T> syntax.  
1 │ let invalid: Array<foo>;  
   │ ^^^^^^^^^^^^^^^^^^^^^  
ℹ Unsafe fix: Use shorthand T[] syntax to replace  
1 │ -let invalid: Array<foo>;  
   │ +let invalid: foo[];  

```ts
let invalid: Promise<Array<string>>;
```
code-block.ts:1:22 lint/style/useShorthandArrayType FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Use shorthand T[] syntax instead of Array<T> syntax.  
1 │ let invalid: Promise<Array<string>>;  
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  
ℹ Unsafe fix: Use shorthand T[] syntax to replace  
1 │ -let invalid: Promise<Array<string>>;  
   │ +let invalid: Promise<string[]>;  

```ts
let invalid: Array<Foo<Bar>>;
```
code-block.ts:1:14 lint/style/useShorthandArrayType FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Use shorthand T[] syntax instead of Array<T> syntax.  
1 │ let invalid: Array<Foo<Bar>>;  
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  
ℹ Unsafe fix: Use shorthand T[] syntax to replace  
1 │ -let invalid: Array<Foo<Bar>>;  
   │ +let invalid: Foo<Bar>[];  

```ts
let invalid: Array<[number, number]>;
```
code-block.ts:1:14 lint/style/useShorthandArrayType FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Use shorthand T[] syntax instead of Array<T> syntax.  
1 │ let invalid: Array<[number, number]>;  
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  
ℹ Unsafe fix: Use shorthand T[] syntax to replace  
1 │ -let invalid: Array<[number, number]>;  
   │ +let invalid: [number, number][];  

```ts
let invalid: ReadonlyArray<string>;
```
code-block.ts:1:14 lint/style/useShorthandArrayType FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Use shorthand readonly T[] syntax instead of ReadonlyArray<T> syntax.  
1 │ let invalid: ReadonlyArray<string>;  
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  
ℹ Unsafe fix: Use shorthand readonly T[] syntax to replace  
1 │ -let invalid: ReadonlyArray<string>;  
   │ +let invalid: readonly string[];  

### Valid

```ts
let valid: Array<Foo | Bar>;
let valid: Array<keyof Bar>;
let valid: Array<foo | bar>;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useShorthandAssign

Require assignment operator shorthand where possible.

**Diagnostic Category:** `lint/style/useShorthandAssign`

**Since:** `v1.3.0`

**Note:** This rule has an **unsafe** fix.

**Sources:** Same as: `operator-assignment` (https://eslint.org/docs/latest/rules/operator-assignment)

JavaScript provides shorthand operators combining a variable assignment and simple mathematical operation.

## Examples

### Invalid

```js
a = a + 1;
```
code-block.js:1:1 lint/style/useShorthandAssign FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Assignment (=) can be replaced with operator assignment +=.  
> 1 │ a = a + 1;  
  │ ^^^^^^^^^^  
ℹ Unsafe fix: Use += instead.

```js
a = a - 1;
```
code-block.js:1:1 lint/style/useShorthandAssign FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Assignment (=) can be replaced with operator assignment -=.  
> 1 │ a = a - 1;  
  │ ^^^^^^^^^^  
ℹ Unsafe fix: Use -= instead.

```js
a = a * 1;
```
code-block.js:1:1 lint/style/useShorthandAssign FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Assignment (=) can be replaced with operator assignment *=.  
> 1 │ a = a * 1;  
  │ ^^^^^^^^^^  
ℹ Unsafe fix: Use *= instead.

### Valid

```js
a += 1;
```

```js
a -= 1;
```

```js
a *= 1;
```

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)

# useShorthandFunctionType

Enforce using function types instead of object type with call signatures.

**Diagnostic Category:** `lint/style/useShorthandFunctionType`

**Since:** `v1.5.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

**Sources:** 
- Same as: `@typescript-eslint/prefer-function-type`

TypeScript allows for two common ways to declare a type for a function:

- Function type: `() => string`
- Object type with a signature: `{ (): string }`

The function type form is generally preferred when possible for being more succinct. This rule suggests using a function type instead of an interface or object type literal with a single call signature.

## Examples

### Invalid

```ts
interface Example {
  (): string;
}
```
Diagnostic: 
- `lint/style/useShorthandFunctionType` FIXABLE 
- ✖ Use a function type instead of a call signature.

```ts
function foo(example: { (): number }): number {
  return example();
}
```
Diagnostic: 
- `lint/style/useShorthandFunctionType` FIXABLE 
- ✖ Use a function type instead of a call signature.

### Valid

```ts
type Example = () => string;
```

```ts
function foo(example: () => number): number {
  return bar();
}
```

```ts
type ReturnsSelf2 = (arg: string) => ReturnsSelf;
```

```ts
interface Foo {
  bar: string;
}
interface Bar extends Foo {
  (): void;
}
```

```ts
interface Overloaded {
  (data: string): number;
  (id: number): string;
}
type Intersection = ((data: string) => number) & ((id: number) => string);
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useSimpleNumberKeys

**Description:** Disallow number literal object member names which are not base10 or use underscore as a separator.

**Diagnostic Category:** `lint/complexity/useSimpleNumberKeys`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

## Examples

### Invalid

```js
({ 0x1: 1 });
```
```
code-block.js:1:4 lint/complexity/useSimpleNumberKeys FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Hexadecimal number literal is not allowed here.

> 1 │ ({ 0x1: 1 });
  │   ^^^
2 │

ℹ Safe fix: Replace 0x1 with 1
```

```js
({ 11_1.11: "ee" });
```
```
code-block.js:1:4 lint/complexity/useSimpleNumberKeys FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Number literal with underscore is not allowed here.

> 1 │ ({ 11_1.11: "ee" });
  │   ^^^^^^^
2 │

ℹ Safe fix: Replace 11_1.11 with 111.11
```

```js
({ 0o1: 1 });
```
```
code-block.js:1:4 lint/complexity/useSimpleNumberKeys FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Octal number literal is not allowed here.

> 1 │ ({ 0o1: 1 });
  │   ^^^
2 │

ℹ Safe fix: Replace 0o1 with 1
```

```js
({ 1n: 1 });
```
```
code-block.js:1:4 lint/complexity/useSimpleNumberKeys FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Bigint is not allowed here.

> 1 │ ({ 1n: 1 });
  │   ^^
2 │

ℹ Safe fix: Replace 1n with 1
```

### Valid

```js
({ 0: "zero" });
({ 122: "integer" });
({ 1.22: "floating point" });
({ 3.1e12: "floating point with e" });
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useSimplifiedLogicExpression

Discard redundant terms from logical expressions.

**Diagnostic Category:** `lint/complexity/useSimplifiedLogicExpression`

**Since:** `v1.0.0`

**Note:** This rule has an **unsafe** fix.

## Examples

### Invalid

```js
const boolExp = true;
const r = true && boolExp;
```
code-block.js:2:11 lint/complexity/useSimplifiedLogicExpression FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Logical expression contains unnecessary complexity.  
1 │ const boolExp = true;  
2 │ const r = true && boolExp;  
3 │  
ℹ Unsafe fix: Discard redundant terms from the logical expression.  
2 │ const r = true && boolExp;  

```js
const boolExp2 = true;
const r2 = boolExp || true;
```
code-block.js:2:12 lint/complexity/useSimplifiedLogicExpression FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Logical expression contains unnecessary complexity.  
1 │ const boolExp2 = true;  
2 │ const r2 = boolExp || true;  
3 │  
ℹ Unsafe fix: Discard redundant terms from the logical expression.  
2 │ const r2 = boolExp || true;  

```js
const nonNullExp = 123;
const r3 = null ?? nonNullExp;
```
code-block.js:2:12 lint/complexity/useSimplifiedLogicExpression FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Logical expression contains unnecessary complexity.  
1 │ const nonNullExp = 123;  
2 │ const r3 = null ?? nonNullExp;  
3 │  
ℹ Unsafe fix: Discard redundant terms from the logical expression.  
2 │ const r3 = null ?? nonNullExp;  

```js
const boolExpr1 = true;
const boolExpr2 = false;
const r4 = !boolExpr1 || !boolExpr2;
```
code-block.js:3:12 lint/complexity/useSimplifiedLogicExpression FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Logical expression contains unnecessary complexity.  
1 │ const boolExpr1 = true;  
2 │ const boolExpr2 = false;  
3 │ const r4 = !boolExpr1 || !boolExpr2;  
4 │  
ℹ Unsafe fix: Reduce the complexity of the logical expression.  
3 │ const r4 = !boolExpr1 || !boolExpr2;  

### Valid

```js
const boolExpr3 = true;
const boolExpr4 = false;
const r5 = !(boolExpr1 && boolExpr2);
const boolExpr5 = true;
const boolExpr6 = false;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useSingleCaseStatement

Enforces switch clauses have a single statement, emits a quick fix wrapping the statements in a block.

**Diagnostic Category:** `lint/style/useSingleCaseStatement`

**Caution:** This rule is deprecated and will be removed in the next major release.  
**Reason:** Use the rule noSwitchDeclarations instead.  
**Since:** `v1.0.0`  
**Note:** This rule has an **unsafe** fix.

## Examples

### Invalid

```js
switch (foo) {
    case true:
    case false:
        let foo = '';
        foo;
}
```

code-block.js:4:9 lint/style/useSingleCaseStatement FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ A switch clause should only have a single statement.  

```plaintext
  2 │      case true:
  3 │      case false:
> 4 │          let foo = '';
  5 │          foo;
  6 │      }
```

**Unsafe fix:** Wrap the statements in a block.

```js
switch (foo) {
    case true:
    case false: {
        let foo = '';
        foo;
    }
}
```

### Valid

```js
switch (foo) {
    case true:
    case false: {
        let foo = '';
        foo;
    }
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useSingleVarDeclarator

Disallow multiple variable declarations in the same variable statement.

**Diagnostic Category:** `lint/style/useSingleVarDeclarator`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:** 
- Same as: `one-var` from ESLint documentation.

In JavaScript, multiple variables can be declared within a single `var`, `const`, or `let` declaration. It is often considered a best practice to declare every variable separately. This rule enforces that practice.

## Examples

### Invalid

```js
let foo = 0, bar, baz;
```

Diagnostic output:
```
code-block.js:1:1 lint/style/useSingleVarDeclarator FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Declare variables separately

> 1 │ let foo = 0, bar, baz;
  │ ^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Unsafe fix: Break out into multiple declarations

1 │ let foo = 0, bar, baz;
2 │ let bar;
3 │ let baz;
```

### Valid

```js
const foo = 0;
let bar;
let baz;
```

```js
for (let i = 0, x = 1; i < arr.length; i++) {}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useSortedClasses

Enforce the sorting of CSS utility classes.

**Diagnostic Category:** `lint/nursery/useSortedClasses`

**Since:** `v1.6.0`

**Note:** This rule has an **unsafe** fix.

**Caution:** This rule is part of the nursery group.

This rule implements the same sorting algorithm as Tailwind CSS but supports any utility class framework including UnoCSS. It is analogous to `prettier-plugin-tailwindcss`.

## Important notes

This rule is a work in progress and is only partially implemented. Progress is being tracked in the following GitHub issue: github.com/biomejs/biome/issues/1274

Currently, utility class sorting is **not part of the formatter** and is implemented as a linter rule instead, with an automatic fix. The fix is classified as unsafe, meaning it won't be applied automatically as part of IDE actions such as "fix on save".

Feedback on this rule is appreciated, and users are encouraged to try it out and report any issues.

**Please read this entire documentation page before reporting an issue.**

Notably, the following features are not supported yet:

- Screen variant sorting (e.g., `md:`, `max-lg:`). Only static, dynamic, and arbitrary variants are supported.
- Custom utilities and variants (such as those introduced by Tailwind CSS plugins). Only the default Tailwind CSS configuration is supported.
- Options such as `prefix` and `separator`.
- Object properties (e.g., in `clsx` calls).

Please do not report issues about these features.

## Examples

### Invalid

```jsx
<div class="px-2 foo p-4 bar" />;
```

**Error:** These CSS classes should be sorted.

**Unsafe fix:** Sort the classes.

```jsx
<div class="foo p-4 px-2 bar" />;
```

```jsx
<div class="hover:focus:m-2 foo hover:px-2 p-4">
```

**Error:** expected `<` but instead the file ends.

## Options

### Code-related

```json
{
    "options": {
        "attributes": ["classList"],
        "functions": ["clsx", "cva", "tw"]
    }
}
```

#### attributes

Classes in the `class` and `className` JSX attributes are always sorted. Use this option to add more attributes that should be sorted.

#### functions

If specified, strings in the indicated functions will be sorted. This is useful when working with libraries like clsx or cva.

Tagged template literals are also supported.

### Sort-related

**Caution:** At the moment, this rule does not support customizing the sort options. The default Tailwind CSS configuration is hard-coded.

## Differences with Prettier

The main difference is that Tailwind CSS and its Prettier plugin read and execute the `tailwind.config.js` file, which Biome cannot do. Instead, Biome implements a simpler version of the configuration.

### Values are not known

The rule has no knowledge of values such as colors, font sizes, or spacing values. This leads to potential false positives and no distinction between different utilities that share the same prefix.

### Custom additions must be specified

The built-in Tailwind CSS preset contains the set of utilities and variants available with the default configuration. In Biome, these need to be manually specified in the configuration file to extend the preset.

### Presets can't be modified

In Tailwind CSS, core plugins can be disabled. In Biome, there is no way to disable parts of a preset.

### Whitespace is collapsed

The Tailwind CSS Prettier plugin preserves all original whitespace. This rule collapses all whitespace into single spaces.

Feedback on this behavior is welcome.

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useStrictMode

Enforce the use of the directive `"use strict"` in script files.

**Diagnostic Category:** `lint/nursery/useStrictMode`

**Since:** `v1.8.0`

- This rule has a **safe** fix.

**Caution:** This rule is part of the nursery group.

Enforce the use of the directive `"use strict"` in script files.

The JavaScript strict mode prohibits some obsolete JavaScript syntaxes and makes some slight semantic changes to allow more optimizations by JavaScript engines. EcmaScript modules are always in strict mode, while JavaScript scripts are by default in non-strict mode, also known as _sloppy mode_. A developer can add the `"use strict"` directive at the start of a script file to enable strict mode in that file.

Biome considers a CommonJS (`.cjs`) file as a script file. By default, Biome recognizes a JavaScript file (`.js`) as a module file, except if `"type": "commonjs"` is specified in `package.json`.

## Examples

### Invalid

```cjs
var a = 1;
```

code-block.cjs:1:1 lint/nursery/useStrictMode FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Unexpected absence of the directive "use strict".

> 1 │ var a = 1;
   │ ^^^^^^^^^^^
  
ℹ Strict mode allows to opt-in some optimizations of the runtime engines, and it eliminates some JavaScript silent errors by changing them to throw errors.

ℹ Check the documentation for more information regarding strict mode.

ℹ Safe fix: Insert a top level "use strict".

```cjs
"use strict";

var a = 1;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useTemplate

Prefer template literals over string concatenation.

**Diagnostic Category:** `lint/style/useTemplate`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

Sources: 
- Same as: prefer-template

## Examples

### Invalid

```js
const s = foo + "baz";
```

code-block.js:1:11 lint/style/useTemplate FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Template literals are preferred over string concatenation.

> 1 │ const s = foo + "baz";
>   │          ^^^^^^^^^^^
> 2 │ 

ℹ Unsafe fix: Use a template literal.

```js
const s = 1 + 2 + "foo" + 3;
```

code-block.js:1:11 lint/style/useTemplate FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Template literals are preferred over string concatenation.

> 1 │ const s = 1 + 2 + "foo" + 3;
>   │          ^^^^^^^^^^^^^^^^^
> 2 │ 

ℹ Unsafe fix: Use a template literal.

```js
const s = 1 * 2 + "foo";
```

code-block.js:1:11 lint/style/useTemplate FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Template literals are preferred over string concatenation.

> 1 │ const s = 1 * 2 + "foo";
>   │          ^^^^^^^^^^^
> 2 │ 

ℹ Unsafe fix: Use a template literal.

```js
const s = 1 + "foo" + 2 + "bar" + "baz" + 3;
```

code-block.js:1:11 lint/style/useTemplate FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Template literals are preferred over string concatenation.

> 1 │ const s = 1 + "foo" + 2 + "bar" + "baz" + 3;
>   │          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 2 │ 

ℹ Unsafe fix: Use a template literal.

### Valid

```js
let s = "foo" + "bar" + `baz`;
```

```js
let s = `value: ${1}`;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useThrowNewError

Require `new` when throwing an error.

**Diagnostic Category:** `lint/style/useThrowNewError`

**Since:** `v1.8.0`

:::note
- This rule has an **unsafe** fix.
:::

**Sources:** 
- Same as: `unicorn/throw-new-error`

Require `new` when throwing an error. While it's possible to instantiate `Error` without using the `new` keyword, it's better to be consistent: modern builtins require `new` to be instantiated. Rule matches errors when their name ends with the word "Error" and the first character is uppercase.

## Examples

### Invalid

```js
throw Error();
```
**Diagnostic:** 
- FIXABLE 
- ⚠ Use `new Error()` instead of `Error()` when throwing an error.
- ℹ Instantiate `Error` with `new` keyword for consistency with modern builtins.
- Unsafe fix: Add `new` keyword.

```js
throw TypeError('biome');
```
**Diagnostic:** 
- FIXABLE 
- ⚠ Use `new TypeError()` instead of `TypeError()` when throwing an error.
- ℹ Instantiate `Error` with `new` keyword for consistency with modern builtins.
- Unsafe fix: Add `new` keyword.

```js
throw lib.TypeError();
```
**Diagnostic:** 
- FIXABLE 
- ⚠ Use `new TypeError()` instead of `TypeError()` when throwing an error.
- ℹ Instantiate `Error` with `new` keyword for consistency with modern builtins.
- Unsafe fix: Add `new` keyword.

### Valid

```js
throw new Error();
```

```js
throw new TypeError('biome');
```

```js
throw new lib.TypeError();
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useThrowOnlyError

**Description:** Disallow throwing non-`Error` values.

**Diagnostic Category:** `lint/style/useThrowOnlyError`

**Since:** `v1.8.0`

**Sources:**
- Inspired from: no-throw-literal (https://eslint.org/docs/latest/rules/no-throw-literal)
- Inspired from: @typescript-eslint/only-throw-error (https://typescript-eslint.io/rules/only-throw-error)

It is considered good practice only to throw the `Error` object itself or an object using the `Error` object as base objects for user-defined exceptions. The fundamental benefit of `Error` objects is that they automatically keep track of where they were built and originated.

## Examples

### Invalid

```js
throw undefined;
```
Diagnostic: Throwing non-`Error` values is not allowed.

```js
throw false;
```
Diagnostic: Throwing non-`Error` values is not allowed.

```js
throw "a" + "b";
```
Diagnostic: Throwing non-`Error` values is not allowed.

### Valid

```js
throw new Error();
```

```js
throw new TypeError('biome');
```

```js
class CustomError extends Error {}

throw new CustomError();
```

## Caveats

This rule only covers cases where throwing the value can be known statically. Complex cases such as object and function access aren't checked. This will be improved in the future once Biome supports type inference.

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)

# useTopLevelRegex

Require regex literals to be declared at the top level.

**Diagnostic Category:** `lint/performance/useTopLevelRegex`

**Since:** `v1.8.0`

Require regex literals to be declared at the top level. This rule is useful to avoid performance issues when using regex literals inside functions called many times (hot paths). Regex literals create a new RegExp object when they are evaluated. By declaring them at the top level, this overhead can be avoided.

It's important to note that this rule is not recommended for all cases. Placing regex literals at the top level can hurt startup times. In browser contexts, this can result in longer page loads.

Additionally, this rule ignores regular expressions with the `g` and/or `y` flags, as they maintain internal state and can cause side effects when calling `test` and `exec` with them.

## Examples

### Invalid

```js
function foo(someString) {
    return /[a-Z]*/.test(someString)
}
```

code-block.js:2:12 lint/performance/useTopLevelRegex ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ This regex literal is not defined in the top level scope. This can lead to performance issues if this function is called frequently.  

1 │ function foo(someString) {  
2 │ return /[a-Z]*/.test(someString)  
   │ ^  
3 │ }  
4 │  

ℹ Move the regex literal outside of this scope, and place it at the top level of this module as a constant.

### Valid

```js
const REGEX = /[a-Z]*/;

function foo(someString) {
    return REGEX.test(someString)
}
```

```js
function foo(str) {
    return /[a-Z]*/g.exec(str)
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useTrimStartEnd

Enforce the use of `String.trimStart()` and `String.trimEnd()` over `String.trimLeft()` and `String.trimRight()`.

**Diagnostic Category:** `lint/nursery/useTrimStartEnd`

**Since:** `v1.9.0`

- This rule has a **safe** fix.

**Caution:** This rule is part of the nursery group.

**Sources:** Same as: `unicorn/prefer-string-trim-start-end`

`String.trimLeft()` and `String.trimRight()` are aliases for `String.trimStart()` and `String.trimEnd()`. Using the latter ensures consistency and is preferable for their direction-independent wording. Note that `String.trimStart()` and `String.trimEnd()` methods do not take any parameters. Any arguments passed to these methods will be ignored.

**Examples**

### Invalid

```js
const foo = bar.trimLeft();
```

**Fixable:** Use `trimStart` instead of `trimLeft`.

```js
const foo = bar.trimRight();
```

**Fixable:** Use `trimEnd` instead of `trimRight`.

### Valid

```js
const foo = bar.trimStart();
```

```js
const foo = bar.trimEnd();
```

**Related links**

- Disable a rule
- Configure the rule fix
- Rule options

# useValidAnchor

Enforce that all anchors are valid, and they are navigable elements.

**Diagnostic Category: `lint/a11y/useValidAnchor`**

**Since**: `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `jsx-a11y/anchor-is-valid`

The anchor element (`<a></a>`) - also called **hyperlink** - is an important element that allows users to navigate pages, in the same page, same website or on another website.

With the advent of JSX libraries, it's now easier to attach logic to any HTML element, including anchors. This rule is designed to prevent users from attaching logic to anchors when the `href` provided is not valid. Avoid using `#` in the `href` when attaching logic to the anchor element. If the anchor has logic attached with an incorrect `href`, it is suggested to turn it into a `button`, as that is likely the intended use.

Anchor `<a></a>` elements should be used for navigation, while `<button></button>` should be used for user interaction.

**Reasons to avoid logic with an incorrect `href`:**

- It can disrupt the correct flow of user navigation (e.g., preventing a user from opening a link in another tab).
- It can create invalid links, making it difficult for crawlers to navigate the website, risking SEO penalties.

For a detailed explanation, check out the article on links vs buttons in modern web applications.

## Examples

### Invalid

```jsx
<a href={null}>navigate here</a>
```
Diagnostic: Provide a valid value for the attribute `href`.

```jsx
<a href={undefined}>navigate here</a>
```
Diagnostic: Provide a valid value for the attribute `href`.

```jsx
<a href>navigate here</a>
```
Diagnostic: Provide a valid value for the attribute `href`.

```jsx
<a href="javascript:void(0)">navigate here</a>
```
Diagnostic: Provide a valid value for the attribute `href`.

```jsx
<a onClick={something}>navigate here</a>
```
Diagnostic: Use a `button` element instead of an `a` element.

### Valid

```jsx
<a href="https://example.com" onClick={something}>navigate here</a>
```

```jsx
<a href={`https://www.javascript.com`}>navigate here</a>
```

```jsx
<a href={somewhere}>navigate here</a>
```

```jsx
<a {...spread}>navigate here</a>
```

## Accessibility guidelines

- WCAG 2.1.1

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useValidAriaProps

Ensures that ARIA properties `aria-*` are all valid.

**Diagnostic Category: `lint/a11y/useValidAriaProps`**

**Since**: `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

Sources: 
- Same as: `jsx-a11y/aria-props`

## Examples

### Invalid

```jsx
<input className="" aria-labell="" />
```

code-block.jsx:1:1 lint/a11y/useValidAriaProps FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ The element contains invalid ARIA attribute(s)

1 │ <input className="" aria-labell="" />
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ aria-labell is not a valid ARIA attribute.

1 │ <input className="" aria-labell="" />
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Unsafe fix: Remove the invalid aria-* attribute. Check the list of all valid aria-* attributes.

```jsx
<div aria-lorem="foobar" />;
```

code-block.jsx:1:1 lint/a11y/useValidAriaProps FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ The element contains invalid ARIA attribute(s)

1 │ <div aria-lorem="foobar" />;
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ aria-lorem is not a valid ARIA attribute.

1 │ <div aria-lorem="foobar" />;
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Unsafe fix: Remove the invalid aria-* attribute. Check the list of all valid aria-* attributes.

## Accessibility guidelines

- WCAG 4.1.2

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useValidAriaRole

Elements with ARIA roles must use a valid, non-abstract ARIA role.

**Diagnostic Category:** `lint/a11y/useValidAriaRole`

**Since:** `v1.4.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:** 
- Same as: `jsx-a11y/aria-role`

## Examples

### Invalid

```jsx
<div role="datepicker"></div>
```

```
code-block.jsx:1:1 lint/a11y/useValidAriaRole FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Enforce that elements with ARIA roles must use a valid, non-abstract ARIA role.

> 1 │ <div role="datepicker"></div>
   │ ^^^^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Check WAI-ARIA for valid roles or provide options accordingly.

ℹ Unsafe fix: Remove the invalid role attribute. Check the list of all valid role attributes.
```

```jsx
<div role="range"></div>
```

```
code-block.jsx:1:1 lint/a11y/useValidAriaRole FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Enforce that elements with ARIA roles must use a valid, non-abstract ARIA role.

> 1 │ <div role="range"></div>
   │ ^^^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Check WAI-ARIA for valid roles or provide options accordingly.

ℹ Unsafe fix: Remove the invalid role attribute. Check the list of all valid role attributes.
```

```jsx
<div role=""></div>
```

```
code-block.jsx:1:1 lint/a11y/useValidAriaRole FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Enforce that elements with ARIA roles must use a valid, non-abstract ARIA role.

> 1 │ <div role=""></div>
   │ ^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Check WAI-ARIA for valid roles or provide options accordingly.

ℹ Unsafe fix: Remove the invalid role attribute. Check the list of all valid role attributes.
```

```jsx
<Foo role="foo"></Foo>
```

```
code-block.jsx:1:1 lint/a11y/useValidAriaRole FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Enforce that elements with ARIA roles must use a valid, non-abstract ARIA role.

> 1 │ <Foo role="foo"></Foo>
   │ ^^^^^^^^^^^^^^^^^^^^^
2 │ 

ℹ Check WAI-ARIA for valid roles or provide options accordingly.

ℹ Unsafe fix: Remove the invalid role attribute. Check the list of all valid role attributes.
```

### Valid

```jsx
<>
  <div role="button"></div>
  <div role={role}></div>
  <div></div>
</>
```

## Options

```json
{
    "//": "...",
    "options": {
        "allowInvalidRoles": ["invalid-role", "text"],
        "ignoreNonDom": true
    }
}
```

## Accessibility guidelines

- WCAG 4.1.2

## Resources

- Chrome Audit Rules, AX_ARIA_01
- DPUB-ARIA roles
- MDN: Using ARIA: Roles, states, and properties

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useValidAriaValues

Enforce that ARIA state and property values are valid.

**Diagnostic Category:** `lint/a11y/useValidAriaValues`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `jsx-a11y/aria-proptypes`

## Examples

### Invalid

```jsx
<span role="checkbox" aria-checked="test">some text</span>
```
```
code-block.jsx:1:23 lint/a11y/useValidAriaValues ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ The value of the ARIA attribute aria-checked is not correct.
1 │ <span role="checkbox" aria-checked="test">some text</span>
   │                      ^^^^^^^^^^^^
ℹ The only supported value for the aria-checked property is one of the following:
- true
- false
- mixed
```

```jsx
<span aria-labelledby="">some text</span>
```
```
code-block.jsx:1:7 lint/a11y/useValidAriaValues ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ The value of the ARIA attribute aria-labelledby is not correct.
1 │ <span aria-labelledby="">some text</span>
   │      ^^^^^^^^
ℹ The only supported value is a space-separated list of HTML identifiers.
```

```jsx
<span aria-valuemax="hey">some text</span>
```
```
code-block.jsx:1:7 lint/a11y/useValidAriaValues ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ The value of the ARIA attribute aria-valuemax is not correct.
1 │ <span aria-valuemax="hey">some text</span>
   │      ^^^^^^
ℹ The only supported value is number.
```

```jsx
<span aria-orientation="hey">some text</span>
```
```
code-block.jsx:1:7 lint/a11y/useValidAriaValues ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✖ The value of the ARIA attribute aria-orientation is not correct.
1 │ <span aria-orientation="hey">some text</span>
   │      ^^^^^^^^^^^
ℹ The only supported value for the aria-orientation property is one of the following:
- vertical
- undefined
- horizontal
```

### Valid

```jsx
<>
    <span role="checkbox" aria-checked={checked}>some text</span>
    <span aria-labelledby="fooId barId">some text</span>
</>
```

## Accessibility guidelines

- WCAG 4.1.2

### Resources

- ARIA Spec, States and Properties
- Chrome Audit Rules, AX_ARIA_04

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useValidAutocomplete

Use valid values for the `autocomplete` attribute on `input` elements.

**Diagnostic Category:** `lint/nursery/useValidAutocomplete`

**Since:** `v1.9.0`

**Caution:** This rule is part of the nursery group.

**Sources:** Same as: `jsx-a11y/autocomplete-valid`

The HTML autocomplete attribute only accepts specific predefined values. This allows for more detailed purpose definitions compared to the `type` attribute. Using these predefined values, user agents and assistive technologies can present input purposes to users in different ways.

## Examples

### Invalid

```jsx
<input type="text" autocomplete="incorrect" />
```

**Error Message:**
code-block.jsx:1:20 lint/nursery/useValidAutocomplete ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Use valid values for the autocomplete attribute.  
> 1 │ <input type="text" autocomplete="incorrect" />  
> 2 │  
ℹ The autocomplete attribute only accepts a certain number of specific fixed values.  
ℹ Follow the links for more information,  
WCAG 1.3.5  
HTML Living Standard autofill  
HTML attribute: autocomplete - HTML: HyperText Markup Language | MDN  

### Valid

```jsx
<>
  <input type="text" autocomplete="name" />
  <MyInput autocomplete="incorrect" />
</>
```

## Options

```json
{
    "//": "...",
    "options": {
        "inputComponents": ["MyInput"]
    }
}
```

## Accessibility guidelines

- WCAG 1.3.5

### Resources

- HTML Living Standard autofill
- HTML attribute: autocomplete - HTML: HyperText Markup Language | MDN

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useValidForDirection

Enforce "for" loop update clause moving the counter in the right direction.

**Diagnostic Category:** `lint/correctness/useValidForDirection`

**Since:** `v1.0.0`

**Note:** 
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:** 
- Same as: for-direction (https://eslint.org/docs/latest/rules/for-direction)

A for loop with a stop condition that can never be reached, such as one with a counter that moves in the wrong direction, will run infinitely. While there are occasions when an infinite loop is intended, the convention is to construct such loops as while loops. More typically, an infinite for loop is a bug.

## Examples

### Invalid

```js
for (var i = 0; i < 10; i--) {
}
```
code-block.js:1:5 lint/correctness/useValidForDirection ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ The update clause in this loop moves the variable in the wrong direction.  
> 1 │ for (var i = 0; i < 10; i--) {  
> 2 │ }  

```js
for (var i = 10; i >= 0; i++) {
}
```
code-block.js:1:5 lint/correctness/useValidForDirection ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ The update clause in this loop moves the variable in the wrong direction.  
> 1 │ for (var i = 10; i >= 0; i++) {  
> 2 │ }  

```js
for (var i = 0; i > 10; i++) {
}
```
code-block.js:1:5 lint/correctness/useValidForDirection ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ The update clause in this loop moves the variable in the wrong direction.  
> 1 │ for (var i = 0; i > 10; i++) {  
> 2 │ }  

### Valid

```js
for (var i = 0; i < 10; i++) {
}
```

## Related links

- Disable a rule (https://biomejs.dev/linter/#disable-a-lint-rule)
- Configure the rule fix (https://biomejs.dev/linter#configure-the-rule-fix)
- Rule options (https://biomejs.dev/linter/#rule-options)

# useValidLang

Ensure that the attribute passed to the `lang` attribute is a correct ISO language and/or country.

**Diagnostic Category:** `lint/a11y/useValidLang`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: jsx-a11y/lang

## Examples

### Invalid

```jsx
<html lang="lorem" />
```

code-block.jsx:1:12 lint/a11y/useValidLang ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a valid value for the lang attribute.

1 │ <html lang="lorem" />
   │           ^^^^^^^^
2 │ 

ℹ Some valid languages:

- ab
- aa
- af
- sq
- am
- ar
- an
- hy
- as
- ay
- az
- ba
- eu
- bn
- dz

```jsx
<html lang="en-babab" />
```

code-block.jsx:1:12 lint/a11y/useValidLang ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a valid value for the lang attribute.

1 │ <html lang="en-babab" />
   │           ^^^^^^^^^
2 │ 

ℹ Some valid countries:

- AF
- AL
- DZ
- AS
- AD
- AO
- AI
- AQ
- AG
- AR
- AM
- AW
- AU
- AT
- AZ

```jsx
<html lang="en-GB-typo" />
```

code-block.jsx:1:12 lint/a11y/useValidLang ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Provide a valid value for the lang attribute.

1 │ <html lang="en-GB-typo" />
   │           ^^^^^^^^^^^^^
2 │ 

### Valid

```jsx
<Html lang="en-babab" />
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useValidTypeof

**Description:**  
This rule verifies the result of `typeof $expr` unary expressions is being compared to valid values, either string literals containing valid type names or other `typeof` expressions.

**Diagnostic Category:** `lint/suspicious/useValidTypeof`

**Since:** `v1.0.0`

**Note:**  
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:**  
Same as: valid-typeof

## Examples

### Invalid

```js
typeof foo === "strnig"
```
Diagnostic: Invalid `typeof` comparison value  
Location: code-block.js:1:16  
Info: not a valid type name

```js
typeof foo == "undefimed"
```
Diagnostic: Invalid `typeof` comparison value  
Location: code-block.js:1:15  
Info: not a valid type name

```js
typeof bar != "nunber"
```
Diagnostic: Invalid `typeof` comparison value  
Location: code-block.js:1:15  
Info: not a valid type name

```js
typeof bar !== "fucntion"
```
Diagnostic: Invalid `typeof` comparison value  
Location: code-block.js:1:16  
Info: not a valid type name

```js
typeof foo === undefined
```
Diagnostic: Invalid `typeof` comparison value  
Location: code-block.js:1:16  
Info: not a string literal  
Unsafe fix: Compare the result of `typeof` with a valid type name

```js
typeof bar == Object
```
Diagnostic: Invalid `typeof` comparison value  
Location: code-block.js:1:15  
Info: not a string literal  
Unsafe fix: Compare the result of `typeof` with a valid type name

```js
typeof foo === baz
```
Diagnostic: Invalid `typeof` comparison value  
Location: code-block.js:1:16  
Info: not a string literal

```js
typeof foo == 5
```
Diagnostic: Invalid `typeof` comparison value  
Location: code-block.js:1:15  
Info: not a string literal

```js
typeof foo == -5
```
Diagnostic: Invalid `typeof` comparison value  
Location: code-block.js:1:15  
Info: not a string literal

### Valid

```js
typeof foo === "string"
```

```js
typeof bar == "undefined"
```

```js
typeof bar === typeof qux
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useWhile

Enforce the use of `while` loops instead of `for` loops when the initializer and update expressions are not needed.

**Diagnostic Category:** `lint/style/useWhile`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has a **safe** fix.

Sources: 
- Same as: sonarjs/prefer-while

## Examples

### Invalid

```js
for (; x.running;) {
    x.step();
}
```

code-block.js:1:1 lint/style/useWhile FIXABLE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ Use a while loop instead of a for loop.

> 1 │ for (; x.running;) {
> 2 │     x.step();
> 3 │ }

ℹ Prefer a while loop over a for loop without initialization and update.

ℹ Safe fix: Use a while loop.

```js
while (x.running) {
    x.step();
}
```

### Valid

```js
for(let x = 0; x < 10; i++) {}
```

```js
let x = 0
for(; x < 10; i++) {}
```

```js
for(let x = 0; x < 10;) {
    i++
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

# useYield

Require generator functions to contain `yield`.

**Diagnostic Category:** `lint/correctness/useYield`

**Since:** `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: require-yield

Require generator functions to contain `yield`. This rule generates warnings for generator functions that do not have the `yield` keyword.

## Examples

### Invalid

```js
function* foo() {
  return 10;
}
```

code-block.js:1:1 lint/correctness/useYield ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✖ This generator function doesn't contain yield.

> 1 │ function* foo() {  
>   │ ^^^^^^^^^^^^^^^^^  
> 2 │   return 10;  
> 3 │ }  
>   │ ^  

### Valid

```js
function* foo() {
  yield 5;
  return 10;
}

function foo() {
  return 10;
}

// This rule does not warn on empty generator functions.
function* foo() { }
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options

---
# Don't modify this file manually. This file is auto generated from source, and you will lose your changes next time the website is built.
# Head to the `biomejs/biome` repository, and modify the source code in there.


title: Rules sources
description: A page that maps lint rules from other sources to Biome
---
    
## Biome exclusive rules
- [noAccumulatingSpread](/linter/rules/no-accumulating-spread) 
- [noConsoleLog](/linter/rules/no-console-log) 
- [noConstEnum](/linter/rules/no-const-enum) 
- [noDelete](/linter/rules/no-delete) 
- [noDuplicateObjectKeys](/linter/rules/no-duplicate-object-keys) 
- [noDynamicNamespaceImportAccess](/linter/rules/no-dynamic-namespace-import-access) 
- [noEmptyTypeParameters](/linter/rules/no-empty-type-parameters) 
- [noEnum](/linter/rules/no-enum) 
- [noEvolvingTypes](/linter/rules/no-evolving-types) 
- [noExportedImports](/linter/rules/no-exported-imports) 
- [noGlobalIsFinite](/linter/rules/no-global-is-finite) 
- [noGlobalIsNan](/linter/rules/no-global-is-nan) 
- [noImplicitAnyLet](/linter/rules/no-implicit-any-let) 
- [noInvalidNewBuiltin](/linter/rules/no-invalid-new-builtin) 
- [noRedundantUseStrict](/linter/rules/no-redundant-use-strict) 
- [noRenderReturnValue](/linter/rules/no-render-return-value) 
- [noShoutyConstants](/linter/rules/no-shouty-constants) 
- [noSuspiciousSemicolonInJsx](/linter/rules/no-suspicious-semicolon-in-jsx) 
- [noSvgWithoutTitle](/linter/rules/no-svg-without-title) 
- [noUndeclaredDependencies](/linter/rules/no-undeclared-dependencies) 
- [noUnnecessaryContinue](/linter/rules/no-unnecessary-continue) 
- [noUnusedFunctionParameters](/linter/rules/no-unused-function-parameters) 
- [noUnusedTemplateLiteral](/linter/rules/no-unused-template-literal) 
- [noUselessStringRaw](/linter/rules/no-useless-string-raw) 
- [noValueAtRule](/linter/rules/no-value-at-rule) 
- [noVoidTypeReturn](/linter/rules/no-void-type-return) 
- [useImportExtensions](/linter/rules/use-import-extensions) 
- [useNodeAssertStrict](/linter/rules/use-node-assert-strict) 
- [useShorthandArrayType](/linter/rules/use-shorthand-array-type) 
- [useSimpleNumberKeys](/linter/rules/use-simple-number-keys) 
- [useSimplifiedLogicExpression](/linter/rules/use-simplified-logic-expression) 
- [useSingleCaseStatement](/linter/rules/use-single-case-statement) 
- [useSortedClasses](/linter/rules/use-sorted-classes) 
- [useStrictMode](/linter/rules/use-strict-mode) 
- [useTopLevelRegex](/linter/rules/use-top-level-regex) 
## Rules from other sources
:::note
Some **Biome** rules might **not** have options, compared to the original rule.
:::
### @mysticatea/eslint-plugin
| @mysticatea/eslint-plugin rule name | Biome rule name |
| ---- | ---- |
| [no-this-in-static](https://github.com/mysticatea/eslint-plugin/blob/master/docs/rules/no-this-in-static.md) |[noThisInStatic](/linter/rules/no-this-in-static) (inspired) |
### @next/eslint-plugin-next
| @next/eslint-plugin-next rule name | Biome rule name |
| ---- | ---- |
| [google-font-display](https://nextjs.org/docs/messages/google-font-display) |[useGoogleFontDisplay](/linter/rules/use-google-font-display) |
| [no-document-import-in-page](https://nextjs.org/docs/messages/no-document-import-in-page) |[noDocumentImportInPage](/linter/rules/no-document-import-in-page) |
| [no-head-element](https://nextjs.org/docs/messages/no-head-element) |[noHeadElement](/linter/rules/no-head-element) |
| [no-head-import-in-document](https://nextjs.org/docs/messages/no-head-import-in-document) |[noHeadImportInDocument](/linter/rules/no-head-import-in-document) |
| [no-img-element](https://nextjs.org/docs/messages/no-img-element) |[noImgElement](/linter/rules/no-img-element) |
### Clippy
| Clippy rule name | Biome rule name |
| ---- | ---- |
| [approx_constant](https://rust-lang.github.io/rust-clippy/master/#/approx_constant) |[noApproximativeNumericConstant](/linter/rules/no-approximative-numeric-constant) (inspired) |
| [collapsible_else_if](https://rust-lang.github.io/rust-clippy/master/#/collapsible_else_if) |[useCollapsedElseIf](/linter/rules/use-collapsed-else-if) |
| [collapsible_if](https://rust-lang.github.io/rust-clippy/master/#/collapsible_if) |[useCollapsedIf](/linter/rules/use-collapsed-if) |
| [eq_op](https://rust-lang.github.io/rust-clippy/master/#/eq_op) |[noSelfCompare](/linter/rules/no-self-compare) |
| [flat_map_identity](https://rust-lang.github.io/rust-clippy/master/#/flat_map_identity) |[noFlatMapIdentity](/linter/rules/no-flat-map-identity) |
| [if_not_else](https://rust-lang.github.io/rust-clippy/master/#/if_not_else) |[noNegationElse](/linter/rules/no-negation-else) |
| [lossy_float_literal](https://rust-lang.github.io/rust-clippy/master/#/lossy_float_literal) |[noPrecisionLoss](/linter/rules/no-precision-loss) |
| [map_flatten](https://rust-lang.github.io/rust-clippy/master/#/map_flatten) |[useFlatMap](/linter/rules/use-flat-map) |
| [match_str_case_mismatch](https://rust-lang.github.io/rust-clippy/master/#/match_str_case_mismatch) |[noStringCaseMismatch](/linter/rules/no-string-case-mismatch) |
| [min_max](https://rust-lang.github.io/rust-clippy/master/#/min_max) |[noConstantMathMinMaxClamp](/linter/rules/no-constant-math-min-max-clamp) |
| [misrefactored_assign_op](https://rust-lang.github.io/rust-clippy/master/#/misrefactored_assign_op) |[noMisrefactoredShorthandAssign](/linter/rules/no-misrefactored-shorthand-assign) |
| [needless_for_each](https://rust-lang.github.io/rust-clippy/master/#/needless_for_each) |[noForEach](/linter/rules/no-for-each) |
| [redundant_else 	](https://rust-lang.github.io/rust-clippy/master/#/redundant_else 	) |[noUselessElse](/linter/rules/no-useless-else) (inspired) |
| [self_assignment](https://rust-lang.github.io/rust-clippy/master/#/self_assignment) |[noSelfAssign](/linter/rules/no-self-assign) |
### ESLint
| ESLint rule name | Biome rule name |
| ---- | ---- |
| [constructor-super](https://eslint.org/docs/latest/rules/constructor-super) |[noInvalidConstructorSuper](/linter/rules/no-invalid-constructor-super) |
| [curly](https://eslint.org/docs/latest/rules/curly) |[useBlockStatements](/linter/rules/use-block-statements) |
| [default-case](https://eslint.org/docs/latest/rules/default-case) |[useDefaultSwitchClause](/linter/rules/use-default-switch-clause) |
| [default-case-last](https://eslint.org/docs/latest/rules/default-case-last) |[useDefaultSwitchClauseLast](/linter/rules/use-default-switch-clause-last) |
| [default-param-last](https://eslint.org/docs/latest/rules/default-param-last) |[useDefaultParameterLast](/linter/rules/use-default-parameter-last) |
| [dot-notation](https://eslint.org/docs/latest/rules/dot-notation) |[useLiteralKeys](/linter/rules/use-literal-keys) |
| [eqeqeq](https://eslint.org/docs/latest/rules/eqeqeq) |[noDoubleEquals](/linter/rules/no-double-equals) |
| [for-direction](https://eslint.org/docs/latest/rules/for-direction) |[useValidForDirection](/linter/rules/use-valid-for-direction) |
| [getter-return](https://eslint.org/docs/latest/rules/getter-return) |[useGetterReturn](/linter/rules/use-getter-return) |
| [guard-for-in](https://eslint.org/docs/latest/rules/guard-for-in) |[useGuardForIn](/linter/rules/use-guard-for-in) |
| [no-array-constructor](https://eslint.org/docs/latest/rules/no-array-constructor) |[useArrayLiterals](/linter/rules/use-array-literals) |
| [no-async-promise-executor](https://eslint.org/docs/latest/rules/no-async-promise-executor) |[noAsyncPromiseExecutor](/linter/rules/no-async-promise-executor) |
| [no-case-declarations](https://eslint.org/docs/latest/rules/no-case-declarations) |[noSwitchDeclarations](/linter/rules/no-switch-declarations) |
| [no-class-assign](https://eslint.org/docs/latest/rules/no-class-assign) |[noClassAssign](/linter/rules/no-class-assign) |
| [no-compare-neg-zero](https://eslint.org/docs/latest/rules/no-compare-neg-zero) |[noCompareNegZero](/linter/rules/no-compare-neg-zero) |
| [no-cond-assign](https://eslint.org/docs/latest/rules/no-cond-assign) |[noAssignInExpressions](/linter/rules/no-assign-in-expressions) (inspired) |
| [no-console](https://eslint.org/docs/latest/rules/no-console) |[noConsole](/linter/rules/no-console) |
| [no-const-assign](https://eslint.org/docs/latest/rules/no-const-assign) |[noConstAssign](/linter/rules/no-const-assign) |
| [no-constant-condition](https://eslint.org/docs/latest/rules/no-constant-condition) |[noConstantCondition](/linter/rules/no-constant-condition) |
| [no-constructor-return](https://eslint.org/docs/latest/rules/no-constructor-return) |[noConstructorReturn](/linter/rules/no-constructor-return) |
| [no-control-regex](https://eslint.org/docs/latest/rules/no-control-regex) |[noControlCharactersInRegex](/linter/rules/no-control-characters-in-regex) |
| [no-debugger](https://eslint.org/docs/latest/rules/no-debugger) |[noDebugger](/linter/rules/no-debugger) |
| [no-dupe-args](https://eslint.org/docs/latest/rules/no-dupe-args) |[noDuplicateParameters](/linter/rules/no-duplicate-parameters) |
| [no-dupe-class-members](https://eslint.org/docs/latest/rules/no-dupe-class-members) |[noDuplicateClassMembers](/linter/rules/no-duplicate-class-members) |
| [no-dupe-else-if](https://eslint.org/docs/latest/rules/no-dupe-else-if) |[noDuplicateElseIf](/linter/rules/no-duplicate-else-if) |
| [no-dupe-keys](https://eslint.org/docs/latest/rules/no-dupe-keys) |[noDuplicateObjectKeys](/linter/rules/no-duplicate-object-keys) |
| [no-duplicate-case](https://eslint.org/docs/latest/rules/no-duplicate-case) |[noDuplicateCase](/linter/rules/no-duplicate-case) |
| [no-else-return](https://eslint.org/docs/latest/rules/no-else-return) |[noUselessElse](/linter/rules/no-useless-else) (inspired) |
| [no-empty](https://eslint.org/docs/latest/rules/no-empty) |[noEmptyBlockStatements](/linter/rules/no-empty-block-statements) |
| [no-empty-character-class](https://eslint.org/docs/latest/rules/no-empty-character-class) |[noEmptyCharacterClassInRegex](/linter/rules/no-empty-character-class-in-regex) |
| [no-empty-function](https://eslint.org/docs/latest/rules/no-empty-function) |[noEmptyBlockStatements](/linter/rules/no-empty-block-statements) |
| [no-empty-pattern](https://eslint.org/docs/latest/rules/no-empty-pattern) |[noEmptyPattern](/linter/rules/no-empty-pattern) |
| [no-empty-static-block](https://eslint.org/docs/latest/rules/no-empty-static-block) |[noEmptyBlockStatements](/linter/rules/no-empty-block-statements) |
| [no-eval](https://eslint.org/docs/latest/rules/no-eval) |[noGlobalEval](/linter/rules/no-global-eval) |
| [no-ex-assign](https://eslint.org/docs/latest/rules/no-ex-assign) |[noCatchAssign](/linter/rules/no-catch-assign) |
| [no-extra-boolean-cast](https://eslint.org/docs/latest/rules/no-extra-boolean-cast) |[noExtraBooleanCast](/linter/rules/no-extra-boolean-cast) |
| [no-extra-label](https://eslint.org/docs/latest/rules/no-extra-label) |[noUselessLabel](/linter/rules/no-useless-label) |
| [no-fallthrough](https://eslint.org/docs/latest/rules/no-fallthrough) |[noFallthroughSwitchClause](/linter/rules/no-fallthrough-switch-clause) |
| [no-func-assign](https://eslint.org/docs/latest/rules/no-func-assign) |[noFunctionAssign](/linter/rules/no-function-assign) |
| [no-global-assign](https://eslint.org/docs/latest/rules/no-global-assign) |[noGlobalAssign](/linter/rules/no-global-assign) |
| [no-import-assign](https://eslint.org/docs/latest/rules/no-import-assign) |[noImportAssign](/linter/rules/no-import-assign) |
| [no-inner-declarations](https://eslint.org/docs/latest/rules/no-inner-declarations) |[noInnerDeclarations](/linter/rules/no-inner-declarations) |
| [no-irregular-whitespace](https://eslint.org/docs/latest/rules/no-irregular-whitespace) |[noIrregularWhitespace](/linter/rules/no-irregular-whitespace) |
| [no-label-var](https://eslint.org/docs/latest/rules/no-label-var) |[noLabelVar](/linter/rules/no-label-var) |
| [no-labels](https://eslint.org/docs/latest/rules/no-labels) |[noConfusingLabels](/linter/rules/no-confusing-labels) (inspired) |
| [no-lone-blocks](https://eslint.org/docs/latest/rules/no-lone-blocks) |[noUselessLoneBlockStatements](/linter/rules/no-useless-lone-block-statements) |
| [no-lonely-if](https://eslint.org/docs/latest/rules/no-lonely-if) |[useCollapsedElseIf](/linter/rules/use-collapsed-else-if) |
| [no-loss-of-precision](https://eslint.org/docs/latest/rules/no-loss-of-precision) |[noPrecisionLoss](/linter/rules/no-precision-loss) |
| [no-misleading-character-class](https://eslint.org/docs/latest/rules/no-misleading-character-class) |[noMisleadingCharacterClass](/linter/rules/no-misleading-character-class) |
| [no-negated-condition](https://eslint.org/docs/latest/rules/no-negated-condition) |[noNegationElse](/linter/rules/no-negation-else) |
| [no-nested-ternary](https://eslint.org/docs/latest/rules/no-nested-ternary) |[noNestedTernary](/linter/rules/no-nested-ternary) |
| [no-new-native-nonconstructor](https://eslint.org/docs/latest/rules/no-new-native-nonconstructor) |[noInvalidBuiltinInstantiation](/linter/rules/no-invalid-builtin-instantiation) |
| [no-new-symbol](https://eslint.org/docs/latest/rules/no-new-symbol) |[noNewSymbol](/linter/rules/no-new-symbol) |
| [no-new-wrappers](https://eslint.org/docs/latest/rules/no-new-wrappers) |[useConsistentBuiltinInstantiation](/linter/rules/use-consistent-builtin-instantiation) |
| [no-nonoctal-decimal-escape](https://eslint.org/docs/latest/rules/no-nonoctal-decimal-escape) |[noNonoctalDecimalEscape](/linter/rules/no-nonoctal-decimal-escape) |
| [no-obj-calls](https://eslint.org/docs/latest/rules/no-obj-calls) |[noGlobalObjectCalls](/linter/rules/no-global-object-calls) |
| [no-octal-escape](https://eslint.org/docs/latest/rules/no-octal-escape) |[noOctalEscape](/linter/rules/no-octal-escape) |
| [no-param-reassign](https://eslint.org/docs/latest/rules/no-param-reassign) |[noParameterAssign](/linter/rules/no-parameter-assign) |
| [no-prototype-builtins](https://eslint.org/docs/latest/rules/no-prototype-builtins) |[noPrototypeBuiltins](/linter/rules/no-prototype-builtins) |
| [no-redeclare](https://eslint.org/docs/latest/rules/no-redeclare) |[noRedeclare](/linter/rules/no-redeclare) |
| [no-regex-spaces](https://eslint.org/docs/latest/rules/no-regex-spaces) |[noMultipleSpacesInRegularExpressionLiterals](/linter/rules/no-multiple-spaces-in-regular-expression-literals) |
| [no-restricted-globals](https://eslint.org/docs/latest/rules/no-restricted-globals) |[noRestrictedGlobals](/linter/rules/no-restricted-globals) |
| [no-restricted-imports](https://eslint.org/docs/latest/rules/no-restricted-imports) |[noRestrictedImports](/linter/rules/no-restricted-imports) |
| [no-self-assign](https://eslint.org/docs/latest/rules/no-self-assign) |[noSelfAssign](/linter/rules/no-self-assign) |
| [no-self-compare](https://eslint.org/docs/latest/rules/no-self-compare) |[noSelfCompare](/linter/rules/no-self-compare) |
| [no-sequences](https://eslint.org/docs/latest/rules/no-sequences) |[noCommaOperator](/linter/rules/no-comma-operator) |
| [no-setter-return](https://eslint.org/docs/latest/rules/no-setter-return) |[noSetterReturn](/linter/rules/no-setter-return) |
| [no-shadow-restricted-names](https://eslint.org/docs/latest/rules/no-shadow-restricted-names) |[noShadowRestrictedNames](/linter/rules/no-shadow-restricted-names) |
| [no-sparse-arrays](https://eslint.org/docs/latest/rules/no-sparse-arrays) |[noSparseArray](/linter/rules/no-sparse-array) |
| [no-template-curly-in-string](https://eslint.org/docs/latest/rules/no-template-curly-in-string) |[noTemplateCurlyInString](/linter/rules/no-template-curly-in-string) |
| [no-this-before-super](https://eslint.org/docs/latest/rules/no-this-before-super) |[noUnreachableSuper](/linter/rules/no-unreachable-super) |
| [no-throw-literal](https://eslint.org/docs/latest/rules/no-throw-literal) |[useThrowOnlyError](/linter/rules/use-throw-only-error) (inspired) |
| [no-undef](https://eslint.org/docs/latest/rules/no-undef) |[noUndeclaredVariables](/linter/rules/no-undeclared-variables) |
| [no-undef-init](https://eslint.org/docs/latest/rules/no-undef-init) |[noUselessUndefinedInitialization](/linter/rules/no-useless-undefined-initialization) |
| [no-unneeded-ternary](https://eslint.org/docs/latest/rules/no-unneeded-ternary) |[noUselessTernary](/linter/rules/no-useless-ternary) |
| [no-unreachable](https://eslint.org/docs/latest/rules/no-unreachable) |[noUnreachable](/linter/rules/no-unreachable) |
| [no-unsafe-finally](https://eslint.org/docs/latest/rules/no-unsafe-finally) |[noUnsafeFinally](/linter/rules/no-unsafe-finally) |
| [no-unsafe-negation](https://eslint.org/docs/latest/rules/no-unsafe-negation) |[noUnsafeNegation](/linter/rules/no-unsafe-negation) |
| [no-unsafe-optional-chaining](https://eslint.org/docs/latest/rules/no-unsafe-optional-chaining) |[noUnsafeOptionalChaining](/linter/rules/no-unsafe-optional-chaining) |
| [no-unused-labels](https://eslint.org/docs/latest/rules/no-unused-labels) |[noUnusedLabels](/linter/rules/no-unused-labels) |
| [no-unused-private-class-members](https://eslint.org/docs/latest/rules/no-unused-private-class-members) |[noUnusedPrivateClassMembers](/linter/rules/no-unused-private-class-members) |
| [no-unused-vars](https://eslint.org/docs/latest/rules/no-unused-vars) |[noUnusedVariables](/linter/rules/no-unused-variables) |
| [no-use-before-define](https://eslint.org/docs/latest/rules/no-use-before-define) |[noInvalidUseBeforeDeclaration](/linter/rules/no-invalid-use-before-declaration) |
| [no-useless-catch](https://eslint.org/docs/latest/rules/no-useless-catch) |[noUselessCatch](/linter/rules/no-useless-catch) |
| [no-useless-concat](https://eslint.org/docs/latest/rules/no-useless-concat) |[noUselessStringConcat](/linter/rules/no-useless-string-concat) |
| [no-useless-constructor](https://eslint.org/docs/latest/rules/no-useless-constructor) |[noUselessConstructor](/linter/rules/no-useless-constructor) |
| [no-useless-escape](https://eslint.org/docs/latest/rules/no-useless-escape) |[noUselessEscapeInRegex](/linter/rules/no-useless-escape-in-regex) |
| [no-useless-rename](https://eslint.org/docs/latest/rules/no-useless-rename) |[noUselessRename](/linter/rules/no-useless-rename) |
| [no-var](https://eslint.org/docs/latest/rules/no-var) |[noVar](/linter/rules/no-var) |
| [no-void](https://eslint.org/docs/latest/rules/no-void) |[noVoid](/linter/rules/no-void) |
| [no-with](https://eslint.org/docs/latest/rules/no-with) |[noWith](/linter/rules/no-with) |
| [one-var](https://eslint.org/docs/latest/rules/one-var) |[useSingleVarDeclarator](/linter/rules/use-single-var-declarator) |
| [operator-assignment](https://eslint.org/docs/latest/rules/operator-assignment) |[useShorthandAssign](/linter/rules/use-shorthand-assign) |
| [prefer-arrow-callback](https://eslint.org/docs/latest/rules/prefer-arrow-callback) |[useArrowFunction](/linter/rules/use-arrow-function) (inspired) |
| [prefer-const](https://eslint.org/docs/latest/rules/prefer-const) |[useConst](/linter/rules/use-const) |
| [prefer-exponentiation-operator](https://eslint.org/docs/latest/rules/prefer-exponentiation-operator) |[useExponentiationOperator](/linter/rules/use-exponentiation-operator) |
| [prefer-numeric-literals](https://eslint.org/docs/latest/rules/prefer-numeric-literals) |[useNumericLiterals](/linter/rules/use-numeric-literals) |
| [prefer-object-has-own](https://eslint.org/docs/latest/rules/prefer-object-has-own) |[noPrototypeBuiltins](/linter/rules/no-prototype-builtins) |
| [prefer-regex-literals](https://eslint.org/docs/latest/rules/prefer-regex-literals) |[useRegexLiterals](/linter/rules/use-regex-literals) |
| [prefer-rest-params](https://eslint.org/docs/latest/rules/prefer-rest-params) |[noArguments](/linter/rules/no-arguments) (inspired) |
| [prefer-template](https://eslint.org/docs/latest/rules/prefer-template) |[useTemplate](/linter/rules/use-template) |
| [require-await](https://eslint.org/docs/latest/rules/require-await) |[useAwait](/linter/rules/use-await) |
| [require-yield](https://eslint.org/docs/latest/rules/require-yield) |[useYield](/linter/rules/use-yield) |
| [use-isnan](https://eslint.org/docs/latest/rules/use-isnan) |[useIsNan](/linter/rules/use-is-nan) |
| [valid-typeof](https://eslint.org/docs/latest/rules/valid-typeof) |[useValidTypeof](/linter/rules/use-valid-typeof) |
| [yoda](https://eslint.org/docs/latest/rules/yoda) |[noYodaExpression](/linter/rules/no-yoda-expression) |
### GraphQL-ESLint
| GraphQL-ESLint rule name | Biome rule name |
| ---- | ---- |
| [no-duplicate-fields](https://the-guild.dev/graphql/eslint/rules/no-duplicate-fields) |[noDuplicatedFields](/linter/rules/no-duplicated-fields) |
| [require-deprecation-reason](https://the-guild.dev/graphql/eslint/rules/require-deprecation-reason) |[useDeprecatedReason](/linter/rules/use-deprecated-reason) |
### Stylelint
| Stylelint rule name | Biome rule name |
| ---- | ---- |
| [block-no-empty](https://github.com/stylelint/stylelint/blob/main/lib/rules/block-no-empty/README.md) |[noEmptyBlock](/linter/rules/no-empty-block) |
| [custom-property-no-missing-var-function](https://github.com/stylelint/stylelint/blob/main/lib/rules/custom-property-no-missing-var-function/README.md) |[noMissingVarFunction](/linter/rules/no-missing-var-function) |
| [declaration-block-no-duplicate-custom-properties](https://github.com/stylelint/stylelint/blob/main/lib/rules/declaration-block-no-duplicate-custom-properties/README.md) |[noDuplicateCustomProperties](/linter/rules/no-duplicate-custom-properties) |
| [declaration-block-no-duplicate-properties](https://github.com/stylelint/stylelint/blob/main/lib/rules/declaration-block-no-duplicate-properties/README.md) |[noDuplicateProperties](/linter/rules/no-duplicate-properties) |
| [declaration-block-no-shorthand-property-overrides](https://github.com/stylelint/stylelint/blob/main/lib/rules/declaration-block-no-shorthand-property-overrides/README.md) |[noShorthandPropertyOverrides](/linter/rules/no-shorthand-property-overrides) |
| [font-family-no-duplicate-names](https://github.com/stylelint/stylelint/blob/main/lib/rules/font-family-no-duplicate-names/README.md) |[noDuplicateFontNames](/linter/rules/no-duplicate-font-names) |
| [font-family-no-missing-generic-family-keyword](https://github.com/stylelint/stylelint/blob/main/lib/rules/font-family-no-missing-generic-family-keyword/README.md) |[useGenericFontNames](/linter/rules/use-generic-font-names) |
| [function-linear-gradient-no-nonstandard-direction](https://github.com/stylelint/stylelint/blob/main/lib/rules/function-linear-gradient-no-nonstandard-direction/README.md) |[noInvalidDirectionInLinearGradient](/linter/rules/no-invalid-direction-in-linear-gradient) |
| [function-no-unknown](https://github.com/stylelint/stylelint/blob/main/lib/rules/function-no-unknown/README.md) |[noUnknownFunction](/linter/rules/no-unknown-function) |
| [keyframe-block-no-duplicate-selectors](https://github.com/stylelint/stylelint/blob/main/lib/rules/keyframe-block-no-duplicate-selectors/README.md) |[noDuplicateSelectorsKeyframeBlock](/linter/rules/no-duplicate-selectors-keyframe-block) |
| [keyframe-declaration-no-important](https://github.com/stylelint/stylelint/blob/main/lib/rules/keyframe-declaration-no-important/README.md) |[noImportantInKeyframe](/linter/rules/no-important-in-keyframe) |
| [media-feature-name-no-unknown](https://github.com/stylelint/stylelint/blob/main/lib/rules/media-feature-name-no-unknown/README.md) |[noUnknownMediaFeatureName](/linter/rules/no-unknown-media-feature-name) |
| [named-grid-areas-no-invalid](https://github.com/stylelint/stylelint/blob/main/lib/rules/named-grid-areas-no-invalid/README.md) |[noInvalidGridAreas](/linter/rules/no-invalid-grid-areas) |
| [no-descending-specificity](https://github.com/stylelint/stylelint/blob/main/lib/rules/no-descending-specificity/README.md) |[noDescendingSpecificity](/linter/rules/no-descending-specificity) (inspired) |
| [no-duplicate-at-import-rules](https://github.com/stylelint/stylelint/blob/main/lib/rules/no-duplicate-at-import-rules/README.md) |[noDuplicateAtImportRules](/linter/rules/no-duplicate-at-import-rules) |
| [no-invalid-position-at-import-rule](https://github.com/stylelint/stylelint/blob/main/lib/rules/no-invalid-position-at-import-rule/README.md) |[noInvalidPositionAtImportRule](/linter/rules/no-invalid-position-at-import-rule) |
| [no-irregular-whitespace](https://github.com/stylelint/stylelint/blob/main/lib/rules/no-irregular-whitespace/README.md) |[noIrregularWhitespace](/linter/rules/no-irregular-whitespace) |
| [property-no-unknown](https://github.com/stylelint/stylelint/blob/main/lib/rules/property-no-unknown/README.md) |[noUnknownProperty](/linter/rules/no-unknown-property) |
| [selector-anb-no-unmatchable](https://github.com/stylelint/stylelint/blob/main/lib/rules/selector-anb-no-unmatchable/README.md) |[noUnmatchableAnbSelector](/linter/rules/no-unmatchable-anb-selector) |
| [selector-pseudo-class-no-unknown](https://github.com/stylelint/stylelint/blob/main/lib/rules/selector-pseudo-class-no-unknown/README.md) |[noUnknownPseudoClass](/linter/rules/no-unknown-pseudo-class) |
| [selector-pseudo-element-no-unknown](https://github.com/stylelint/stylelint/blob/main/lib/rules/selector-pseudo-element-no-unknown/README.md) |[noUnknownPseudoElement](/linter/rules/no-unknown-pseudo-element) |
| [selector-type-no-unknown](https://github.com/stylelint/stylelint/blob/main/lib/rules/selector-type-no-unknown/README.md) |[noUnknownTypeSelector](/linter/rules/no-unknown-type-selector) |
| [unit-no-unknown](https://github.com/stylelint/stylelint/blob/main/lib/rules/unit-no-unknown/README.md) |[noUnknownUnit](/linter/rules/no-unknown-unit) |
### eslint-plugin-barrel-files
| eslint-plugin-barrel-files rule name | Biome rule name |
| ---- | ---- |
| [avoid-barrel-files](https://github.com/thepassle/eslint-plugin-barrel-files/blob/main/docs/rules/avoid-barrel-files.md) |[noBarrelFile](/linter/rules/no-barrel-file) (inspired) |
| [avoid-namespace-import](https://github.com/thepassle/eslint-plugin-barrel-files/blob/main/docs/rules/avoid-namespace-import.md) |[noNamespaceImport](/linter/rules/no-namespace-import) |
| [avoid-re-export-all](https://github.com/thepassle/eslint-plugin-barrel-files/blob/main/docs/rules/avoid-re-export-all.md) |[noReExportAll](/linter/rules/no-re-export-all) |
### eslint-plugin-import
| eslint-plugin-import rule name | Biome rule name |
| ---- | ---- |
| [no-commonjs](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-commonjs.md) |[noCommonJs](/linter/rules/no-common-js) (inspired) |
| [no-default-export](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-default-export.md) |[noDefaultExport](/linter/rules/no-default-export) |
| [no-nodejs-modules](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-nodejs-modules.md) |[noNodejsModules](/linter/rules/no-nodejs-modules) |
### eslint-plugin-import-access
| eslint-plugin-import-access rule name | Biome rule name |
| ---- | ---- |
| [eslint-plugin-import-access](https://github.com/uhyo/eslint-plugin-import-access) |[useImportRestrictions](/linter/rules/use-import-restrictions) (inspired) |
### eslint-plugin-jest
| eslint-plugin-jest rule name | Biome rule name |
| ---- | ---- |
| [max-nested-describe](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/max-nested-describe.md) |[noExcessiveNestedTestSuites](/linter/rules/no-excessive-nested-test-suites) |
| [no-disabled-tests](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-disabled-tests.md) |[noSkippedTests](/linter/rules/no-skipped-tests) (inspired) |
| [no-done-callback](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-done-callback.md) |[noDoneCallback](/linter/rules/no-done-callback) (inspired) |
| [no-duplicate-hooks](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-duplicate-hooks.md) |[noDuplicateTestHooks](/linter/rules/no-duplicate-test-hooks) (inspired) |
| [no-export](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-export.md) |[noExportsInTest](/linter/rules/no-exports-in-test) (inspired) |
| [no-focused-tests](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-focused-tests.md) |[noFocusedTests](/linter/rules/no-focused-tests) (inspired) |
| [no-standalone-expect](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-standalone-expect.md) |[noMisplacedAssertion](/linter/rules/no-misplaced-assertion) (inspired) |
### eslint-plugin-jsx-a11y
| eslint-plugin-jsx-a11y rule name | Biome rule name |
| ---- | ---- |
| [alt-text](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/alt-text.md) |[useAltText](/linter/rules/use-alt-text) |
| [anchor-has-content](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/anchor-has-content.md) |[useAnchorContent](/linter/rules/use-anchor-content) |
| [anchor-is-valid](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/anchor-is-valid.md) |[useValidAnchor](/linter/rules/use-valid-anchor) |
| [aria-activedescendant-has-tabindex](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-activedescendant-has-tabindex.md) |[useAriaActivedescendantWithTabindex](/linter/rules/use-aria-activedescendant-with-tabindex) |
| [aria-props](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-props.md) |[useValidAriaProps](/linter/rules/use-valid-aria-props) |
| [aria-proptypes](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-proptypes.md) |[useValidAriaValues](/linter/rules/use-valid-aria-values) |
| [aria-role](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-role.md) |[useValidAriaRole](/linter/rules/use-valid-aria-role) |
| [aria-unsupported-elements](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-unsupported-elements.md) |[noAriaUnsupportedElements](/linter/rules/no-aria-unsupported-elements) |
| [autocomplete-valid](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/autocomplete-valid.md) |[useValidAutocomplete](/linter/rules/use-valid-autocomplete) |
| [click-events-have-key-events](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/click-events-have-key-events.md) |[useKeyWithClickEvents](/linter/rules/use-key-with-click-events) |
| [heading-has-content](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/heading-has-content.md) |[useHeadingContent](/linter/rules/use-heading-content) |
| [html-has-lang](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/html-has-lang.md) |[useHtmlLang](/linter/rules/use-html-lang) |
| [iframe-has-title](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/iframe-has-title.md) |[useIframeTitle](/linter/rules/use-iframe-title) |
| [img-redundant-alt](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/img-redundant-alt.md) |[noRedundantAlt](/linter/rules/no-redundant-alt) |
| [interactive-supports-focus](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/interactive-supports-focus.md) |[useFocusableInteractive](/linter/rules/use-focusable-interactive) |
| [label-has-associated-control](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/label-has-associated-control.md) |[noLabelWithoutControl](/linter/rules/no-label-without-control) |
| [lang](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/lang.md) |[useValidLang](/linter/rules/use-valid-lang) |
| [media-has-caption](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/media-has-caption.md) |[useMediaCaption](/linter/rules/use-media-caption) |
| [mouse-events-have-key-events](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/mouse-events-have-key-events.md) |[useKeyWithMouseEvents](/linter/rules/use-key-with-mouse-events) |
| [no-access-key](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-access-key.md) |[noAccessKey](/linter/rules/no-access-key) (inspired) |
| [no-aria-hidden-on-focusable](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-aria-hidden-on-focusable.md) |[noAriaHiddenOnFocusable](/linter/rules/no-aria-hidden-on-focusable) |
| [no-autofocus](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-autofocus.md) |[noAutofocus](/linter/rules/no-autofocus) |
| [no-distracting-elements](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-distracting-elements.md) |[noDistractingElements](/linter/rules/no-distracting-elements) |
| [no-interactive-element-to-noninteractive-role](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-interactive-element-to-noninteractive-role.md) |[noInteractiveElementToNoninteractiveRole](/linter/rules/no-interactive-element-to-noninteractive-role) |
| [no-noninteractive-element-to-interactive-role](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-noninteractive-element-to-interactive-role.md) |[noNoninteractiveElementToInteractiveRole](/linter/rules/no-noninteractive-element-to-interactive-role) |
| [no-noninteractive-tabindex](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-noninteractive-tabindex.md) |[noNoninteractiveTabindex](/linter/rules/no-noninteractive-tabindex) |
| [no-redundant-roles](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-redundant-roles.md) |[noRedundantRoles](/linter/rules/no-redundant-roles) |
| [no-static-element-interactions](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-static-element-interactions.md) |[noStaticElementInteractions](/linter/rules/no-static-element-interactions) |
| [prefer-tag-over-role](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/prefer-tag-over-role.md) |[useSemanticElements](/linter/rules/use-semantic-elements) |
| [role-has-required-aria-props](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/role-has-required-aria-props.md) |[useAriaPropsForRole](/linter/rules/use-aria-props-for-role) |
| [role-supports-aria-props](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/role-supports-aria-props.md) |[useAriaPropsSupportedByRole](/linter/rules/use-aria-props-supported-by-role) |
| [scope](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/scope.md) |[noHeaderScope](/linter/rules/no-header-scope) |
| [tabindex-no-positive](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/tabindex-no-positive.md) |[noPositiveTabindex](/linter/rules/no-positive-tabindex) |
### eslint-plugin-n
| eslint-plugin-n rule name | Biome rule name |
| ---- | ---- |
| [no-process-env](https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-process-env.md) |[noProcessEnv](/linter/rules/no-process-env) (inspired) |
### eslint-plugin-no-secrets
| eslint-plugin-no-secrets rule name | Biome rule name |
| ---- | ---- |
| [no-secrets](https://github.com/nickdeis/eslint-plugin-no-secrets/blob/master/README.md) |[noSecrets](/linter/rules/no-secrets) (inspired) |
### eslint-plugin-react
| eslint-plugin-react rule name | Biome rule name |
| ---- | ---- |
| [button-has-type](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/button-has-type.md) |[useButtonType](/linter/rules/use-button-type) |
| [jsx-boolean-value](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md) |[noImplicitBoolean](/linter/rules/no-implicit-boolean) (inspired) |
| [jsx-curly-brace-presence](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md) |[useConsistentCurlyBraces](/linter/rules/use-consistent-curly-braces) (inspired) |
| [jsx-fragments](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-fragments.md) |[useFragmentSyntax](/linter/rules/use-fragment-syntax) |
| [jsx-key](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-key.md) |[useJsxKeyInIterable](/linter/rules/use-jsx-key-in-iterable) |
| [jsx-no-comment-textnodes](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-comment-textnodes.md) |[noCommentText](/linter/rules/no-comment-text) |
| [jsx-no-duplicate-props](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-duplicate-props.md) |[noDuplicateJsxProps](/linter/rules/no-duplicate-jsx-props) |
| [jsx-no-target-blank](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md) |[noBlankTarget](/linter/rules/no-blank-target) |
| [jsx-no-useless-fragment](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md) |[noUselessFragments](/linter/rules/no-useless-fragments) |
| [no-array-index-key](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md) |[noArrayIndexKey](/linter/rules/no-array-index-key) (inspired) |
| [no-children-prop](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-children-prop.md) |[noChildrenProp](/linter/rules/no-children-prop) |
| [no-danger](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-danger.md) |[noDangerouslySetInnerHtml](/linter/rules/no-dangerously-set-inner-html) |
| [no-danger-with-children](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-danger-with-children.md) |[noDangerouslySetInnerHtmlWithChildren](/linter/rules/no-dangerously-set-inner-html-with-children) |
| [void-dom-elements-no-children](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/void-dom-elements-no-children.md) |[noVoidElementsWithChildren](/linter/rules/no-void-elements-with-children) |
### eslint-plugin-react-hooks
| eslint-plugin-react-hooks rule name | Biome rule name |
| ---- | ---- |
| [exhaustive-deps](https://github.com/facebook/react/blob/main/packages/eslint-plugin-react-hooks/README.md) |[useExhaustiveDependencies](/linter/rules/use-exhaustive-dependencies) (inspired) |
| [rules-of-hooks](https://github.com/facebook/react/blob/main/packages/eslint-plugin-react-hooks/README.md) |[useHookAtTopLevel](/linter/rules/use-hook-at-top-level) |
### eslint-plugin-react-refresh
| eslint-plugin-react-refresh rule name | Biome rule name |
| ---- | ---- |
| [only-export-components](https://github.com/ArnaudBarre/eslint-plugin-react-refresh) |[useComponentExportOnlyModules](/linter/rules/use-component-export-only-modules) (inspired) |
### eslint-plugin-solid
| eslint-plugin-solid rule name | Biome rule name |
| ---- | ---- |
| [no-react-specific-props](https://github.com/solidjs-community/eslint-plugin-solid/blob/main/packages/eslint-plugin-solid/docs/no-react-specific-props.md) |[noReactSpecificProps](/linter/rules/no-react-specific-props) (inspired) |
### eslint-plugin-sonarjs
| eslint-plugin-sonarjs rule name | Biome rule name |
| ---- | ---- |
| [cognitive-complexity](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/HEAD/docs/rules/cognitive-complexity.md) |[noExcessiveCognitiveComplexity](/linter/rules/no-excessive-cognitive-complexity) (inspired) |
| [prefer-while](https://github.com/SonarSource/eslint-plugin-sonarjs/blob/HEAD/docs/rules/prefer-while.md) |[useWhile](/linter/rules/use-while) |
### eslint-plugin-stylistic
| eslint-plugin-stylistic rule name | Biome rule name |
| ---- | ---- |
| [jsx-self-closing-comp](https://eslint.style/rules/default/jsx-self-closing-comp) |[useSelfClosingElements](/linter/rules/use-self-closing-elements) (inspired) |
### eslint-plugin-unicorn
| eslint-plugin-unicorn rule name | Biome rule name |
| ---- | ---- |
| [error-message](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/error-message.md) |[useErrorMessage](/linter/rules/use-error-message) |
| [explicit-length-check](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/explicit-length-check.md) |[useExplicitLengthCheck](/linter/rules/use-explicit-length-check) |
| [filename-case](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/filename-case.md) |[useFilenamingConvention](/linter/rules/use-filenaming-convention) (inspired) |
| [new-for-builtins](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/new-for-builtins.md) |[noInvalidBuiltinInstantiation](/linter/rules/no-invalid-builtin-instantiation) |
| [no-array-for-each](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-for-each.md) |[noForEach](/linter/rules/no-for-each) |
| [no-document-cookie](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-document-cookie.md) |[noDocumentCookie](/linter/rules/no-document-cookie) (inspired) |
| [no-for-loop](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-for-loop.md) |[useForOf](/linter/rules/use-for-of) |
| [no-instanceof-array](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-instanceof-array.md) |[useIsArray](/linter/rules/use-is-array) |
| [no-lonely-if](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-lonely-if.md) |[useCollapsedIf](/linter/rules/use-collapsed-if) |
| [no-static-only-class](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-static-only-class.md) |[noStaticOnlyClass](/linter/rules/no-static-only-class) |
| [no-thenable](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-thenable.md) |[noThenProperty](/linter/rules/no-then-property) |
| [no-useless-switch-case](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-switch-case.md) |[noUselessSwitchCase](/linter/rules/no-useless-switch-case) |
| [prefer-array-flat-map](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-flat-map.md) |[useFlatMap](/linter/rules/use-flat-map) |
| [prefer-at](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-at.md) |[useAtIndex](/linter/rules/use-at-index) (inspired) |
| [prefer-date-now](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-date-now.md) |[useDateNow](/linter/rules/use-date-now) |
| [prefer-node-protocol](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-node-protocol.md) |[useNodejsImportProtocol](/linter/rules/use-nodejs-import-protocol) |
| [prefer-number-properties](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-number-properties.md) |[useNumberNamespace](/linter/rules/use-number-namespace) |
| [prefer-string-slice](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-slice.md) |[noSubstr](/linter/rules/no-substr) |
| [prefer-string-trim-start-end](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-trim-start-end.md) |[useTrimStartEnd](/linter/rules/use-trim-start-end) |
| [require-number-to-fixed-digits-argument](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-number-to-fixed-digits-argument.md) |[useNumberToFixedDigitsArgument](/linter/rules/use-number-to-fixed-digits-argument) |
| [throw-new-error](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/throw-new-error.md) |[useThrowNewError](/linter/rules/use-throw-new-error) |
### eslint-plugin-unused-imports
| eslint-plugin-unused-imports rule name | Biome rule name |
| ---- | ---- |
| [no-unused-imports](https://github.com/sweepline/eslint-plugin-unused-imports/blob/master/docs/rules/no-unused-imports.md) |[noUnusedImports](/linter/rules/no-unused-imports) (inspired) |
| [no-unused-vars](https://github.com/sweepline/eslint-plugin-unused-imports/blob/master/docs/rules/no-unused-vars.md) |[noUnusedVariables](/linter/rules/no-unused-variables) |
### typescript-eslint
| typescript-eslint rule name | Biome rule name |
| ---- | ---- |
| [adjacent-overload-signatures](https://typescript-eslint.io/rules/adjacent-overload-signatures) |[useAdjacentOverloadSignatures](/linter/rules/use-adjacent-overload-signatures) |
| [array-type](https://typescript-eslint.io/rules/array-type) |[useConsistentArrayType](/linter/rules/use-consistent-array-type) |
| [ban-types](https://typescript-eslint.io/rules/ban-types) |[noBannedTypes](/linter/rules/no-banned-types) (inspired) |
| [consistent-type-exports](https://typescript-eslint.io/rules/consistent-type-exports) |[useExportType](/linter/rules/use-export-type) (inspired) |
| [consistent-type-imports](https://typescript-eslint.io/rules/consistent-type-imports) |[useImportType](/linter/rules/use-import-type) (inspired) |
| [default-param-last](https://typescript-eslint.io/rules/default-param-last) |[useDefaultParameterLast](/linter/rules/use-default-parameter-last) |
| [dot-notation](https://typescript-eslint.io/rules/dot-notation) |[useLiteralKeys](/linter/rules/use-literal-keys) |
| [explicit-function-return-type](https://typescript-eslint.io/rules/explicit-function-return-type) |[useExplicitType](/linter/rules/use-explicit-type) |
| [explicit-member-accessibility](https://typescript-eslint.io/rules/explicit-member-accessibility) |[useConsistentMemberAccessibility](/linter/rules/use-consistent-member-accessibility) |
| [naming-convention](https://typescript-eslint.io/rules/naming-convention) |[useNamingConvention](/linter/rules/use-naming-convention) (inspired) |
| [no-dupe-class-members](https://typescript-eslint.io/rules/no-dupe-class-members) |[noDuplicateClassMembers](/linter/rules/no-duplicate-class-members) |
| [no-empty-function](https://typescript-eslint.io/rules/no-empty-function) |[noEmptyBlockStatements](/linter/rules/no-empty-block-statements) |
| [no-empty-interface](https://typescript-eslint.io/rules/no-empty-interface) |[noEmptyInterface](/linter/rules/no-empty-interface) (inspired) |
| [no-explicit-any](https://typescript-eslint.io/rules/no-explicit-any) |[noExplicitAny](/linter/rules/no-explicit-any) |
| [no-extra-non-null-assertion](https://typescript-eslint.io/rules/no-extra-non-null-assertion) |[noExtraNonNullAssertion](/linter/rules/no-extra-non-null-assertion) |
| [no-extraneous-class](https://typescript-eslint.io/rules/no-extraneous-class) |[noStaticOnlyClass](/linter/rules/no-static-only-class) |
| [no-inferrable-types](https://typescript-eslint.io/rules/no-inferrable-types) |[noInferrableTypes](/linter/rules/no-inferrable-types) |
| [no-invalid-void-type](https://typescript-eslint.io/rules/no-invalid-void-type) |[noConfusingVoidType](/linter/rules/no-confusing-void-type) |
| [no-loss-of-precision](https://typescript-eslint.io/rules/no-loss-of-precision) |[noPrecisionLoss](/linter/rules/no-precision-loss) |
| [no-misused-new](https://typescript-eslint.io/rules/no-misused-new) |[noMisleadingInstantiator](/linter/rules/no-misleading-instantiator) |
| [no-namespace](https://typescript-eslint.io/rules/no-namespace) |[noNamespace](/linter/rules/no-namespace) |
| [no-non-null-assertion](https://typescript-eslint.io/rules/no-non-null-assertion) |[noNonNullAssertion](/linter/rules/no-non-null-assertion) |
| [no-redeclare](https://typescript-eslint.io/rules/no-redeclare) |[noRedeclare](/linter/rules/no-redeclare) |
| [no-require-imports](https://typescript-eslint.io/rules/no-require-imports) |[noCommonJs](/linter/rules/no-common-js) |
| [no-restricted-imports](https://typescript-eslint.io/rules/no-restricted-imports) |[noRestrictedImports](/linter/rules/no-restricted-imports) |
| [no-restricted-types](https://typescript-eslint.io/rules/no-restricted-types) |[noRestrictedTypes](/linter/rules/no-restricted-types) |
| [no-this-alias](https://typescript-eslint.io/rules/no-this-alias) |[noUselessThisAlias](/linter/rules/no-useless-this-alias) (inspired) |
| [no-unnecessary-type-constraint](https://typescript-eslint.io/rules/no-unnecessary-type-constraint) |[noUselessTypeConstraint](/linter/rules/no-useless-type-constraint) |
| [no-unsafe-declaration-merging](https://typescript-eslint.io/rules/no-unsafe-declaration-merging) |[noUnsafeDeclarationMerging](/linter/rules/no-unsafe-declaration-merging) |
| [no-unused-vars](https://typescript-eslint.io/rules/no-unused-vars) |[noUnusedVariables](/linter/rules/no-unused-variables) |
| [no-use-before-define](https://typescript-eslint.io/rules/no-use-before-define) |[noInvalidUseBeforeDeclaration](/linter/rules/no-invalid-use-before-declaration) |
| [no-useless-constructor](https://typescript-eslint.io/rules/no-useless-constructor) |[noUselessConstructor](/linter/rules/no-useless-constructor) |
| [no-useless-empty-export](https://typescript-eslint.io/rules/no-useless-empty-export) |[noUselessEmptyExport](/linter/rules/no-useless-empty-export) |
| [only-throw-error](https://typescript-eslint.io/rules/only-throw-error) |[useThrowOnlyError](/linter/rules/use-throw-only-error) (inspired) |
| [parameter-properties](https://typescript-eslint.io/rules/parameter-properties) |[noParameterProperties](/linter/rules/no-parameter-properties) (inspired) |
| [prefer-as-const](https://typescript-eslint.io/rules/prefer-as-const) |[useAsConstAssertion](/linter/rules/use-as-const-assertion) |
| [prefer-enum-initializers](https://typescript-eslint.io/rules/prefer-enum-initializers) |[useEnumInitializers](/linter/rules/use-enum-initializers) |
| [prefer-for-of](https://typescript-eslint.io/rules/prefer-for-of) |[useForOf](/linter/rules/use-for-of) |
| [prefer-function-type](https://typescript-eslint.io/rules/prefer-function-type) |[useShorthandFunctionType](/linter/rules/use-shorthand-function-type) |
| [prefer-literal-enum-member](https://typescript-eslint.io/rules/prefer-literal-enum-member) |[useLiteralEnumMembers](/linter/rules/use-literal-enum-members) |
| [prefer-namespace-keyword](https://typescript-eslint.io/rules/prefer-namespace-keyword) |[useNamespaceKeyword](/linter/rules/use-namespace-keyword) |
| [prefer-optional-chain](https://typescript-eslint.io/rules/prefer-optional-chain) |[useOptionalChain](/linter/rules/use-optional-chain) |
| [require-await](https://typescript-eslint.io/rules/require-await) |[useAwait](/linter/rules/use-await) |


# Social badges

Add the Biome badges to your `README.md`! 💅

## Formatter badge

**Badge**

![Formatted with Biome](https://img.shields.io/badge/Formatted_with-Biome-60a5fa?style=flat&logo=biome)

**URL**

```
https://img.shields.io/badge/Formatted_with-Biome-60a5fa?style=flat&logo=biome
```

**Markdown**

```markdown
![Formatted with Biome](https://img.shields.io/badge/Formatted_with-Biome-60a5fa?style=flat&logo=biome)
```

**HTML**

```html
<img alt="Static Badge" src="https://img.shields.io/badge/Formatted_with-Biome-60a5fa?style=flat&logo=biome">
```

## Linter badge

**Badge**

![Linted with Biome](https://img.shields.io/badge/Linted_with-Biome-60a5fa?style=flat&logo=biome)

**URL**

```
https://img.shields.io/badge/Linted_with-Biome-60a5fa?style=flat&logo=biome
```

**Markdown**

```markdown
![Linted with Biome](https://img.shields.io/badge/Linted_with-Biome-60a5fa?style=flat&logo=biome)
```

**HTML**

```html
<img alt="Linted with Biome" src="https://img.shields.io/badge/Linted_with-Biome-60a5fa?style=flat&logo=biome">
```

## Check badge

**Badge**

![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)

**URL**

```
https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome
```

**Markdown**

```markdown
![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)
```

**HTML**

```html
<img alt="Checked with Biome" src="https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome">
```

---
title: Continuous Integration
description: Using Biome in a CI environment
---

Running Biome in a CI environment is easy. Check out the following examples for some inspiration.

## GitHub Actions

We provide a first-party [GitHub Action](https://github.com/marketplace/actions/setup-biome) to setup Biome in your runner.
Here's what a simple workflow might look like:

```yaml title="pull_request.yml"
name: Code quality

on:
  push:
  pull_request:

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Biome
        uses: biomejs/setup-biome@v2
        with:
          version: latest
      - name: Run Biome
        run: biome ci .
```

### Third-party actions

These are actions maintained by other communities, that you use in your runner:

- [reviewdog-action-biome](https://github.com/marketplace/actions/run-biome-with-reviewdog): run Biome with reviewdog and make comments and commit suggestions on the pull request.

```yaml title="pull_request.yml"
name: reviewdog
on: [pull_request]
jobs:
  biome:
    name: runner / Biome
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
      - uses: mongolyy/reviewdog-action-biome@v1
        with:
          github_token: ${{ secrets.github_token }}
          reporter: github-pr-review
```


---
title: Git Hooks
description: Using Biome in Git Hooks
---

Git allows executing scripts during the run of a git command using [Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks).
For example, you can format and lint the staged files before committing or pushing.
Several tools exist to simplify the management of Git Hooks.
In the following sections we introduce some of them and how they can be used with Biome.


## Lefthook

[Lefthook](https://github.com/evilmartians/lefthook) provides a fast, cross-platform, and dependency-free hook manager.
It can be [installed via NPM](https://github.com/evilmartians/lefthook#install).

Add a file named `lefthook.yml` at the root of your Git repository.
Some examples of _Lefthook_ configurations:

- Check formatting and lint before committing

  ```yaml title="lefthook.yml"
  pre-commit:
    commands:
      check:
        glob: "*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc}"
        run: npx @biomejs/biome check --no-errors-on-unmatched --files-ignore-unknown=true --colors=off {staged_files}
  ```

- Format, lint, and apply safe code fixes before committing

  ```yaml title="lefthook.yml"
  pre-commit:
    commands:
      check:
        glob: "*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc}"
        run: npx @biomejs/biome check --write --no-errors-on-unmatched --files-ignore-unknown=true --colors=off {staged_files}
        stage_fixed: true
  ```

  `stage_fixed: true` adds again the staged files.

- Check formatting and lint before pushing

  ```yaml title="lefthook.yml"
  pre-push:
    commands:
      check:
        glob: "*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc}"
        run: npx @biomejs/biome check --no-errors-on-unmatched --files-ignore-unknown=true --colors=off {push_files}
  ```

Note that you don't need to use both `glob` and `--files-ignore-unknown=true`.
Using only `--files-ignore-unknown=true` allows handling files supported in the present and in the future by Biome.
If you wish more control over which files are handled, you should use `glob`.

`--no-errors-on-unmatched` silents possible errors in case *no files are processed*.

Once configured, run `lefthook install` to set up the hooks.


## Husky

[Husky](https://github.com/typicode/husky) is a widely-used hook manager in the JavaScript ecosystem.
Husky doesn't hide unstaged changes and is not able to provide the list of staged files.
This is why it is often used in tandem with another tool such as _lint-staged_ or _git-format-staged_.

If your project contains a `package.json`,
you can automatically set up _husky_ hooks upon package installation using `scripts.prepare`:

```json title="package.json"
{
  "scripts": {
    "prepare": "husky"
  }
}
```

### lint-staged

[lint-staged](https://github.com/lint-staged/lint-staged) is one of the most used tools in the JavaScript ecosystem.

Add the following husky configuration:

```shell title=".husky/pre-commit"
lint-staged
```

The configuration of lint-staged is directly embedded in `package.json`.
Here's some example of commands that you could find useful when running the Git hooks:

```jsonc title="package.json"
{
  "lint-staged": {
    // Run Biome on staged files that have the following extensions: js, ts, jsx, tsx, json and jsonc
    "*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc}": [
      "biome check --files-ignore-unknown=true", // Check formatting and lint
      "biome check --write --no-errors-on-unmatched", // Format, sort imports, lint, and apply safe fixes
      "biome check --write --organize-imports-enabled=false --no-errors-on-unmatched", // format and apply safe fixes
      "biome check --write --unsafe --no-errors-on-unmatched", // Format, sort imports, lints, apply safe/unsafe fixes
      "biome format --write --no-errors-on-unmatched", // Format
      "biome lint --write --no-errors-on-unmatched", // Lint and apply safe fixes
    ],
    // Alternatively you can pass every files and ignore unknown extensions
    "*": [
      "biome check --no-errors-on-unmatched --files-ignore-unknown=true", // Check formatting and lint
    ]
  }
}
```

Remember to use the CLI option `--no-errors-on-unmatched` in your command, to silent possible errors in case *no files are processed*.


### git-format-staged

In contrast to other tools such as _lefthook_, _pre-commit_, and _lint-staged_,
[git-format-staged](https://github.com/hallettj/git-format-staged) doesn't use `git stash` internally.
This avoids manual intervention when conflicts arise between unstaged changes and updated staged changes.
See the [comparison of _git-format-staged_ with other tools](https://github.com/hallettj/git-format-staged#comparisons-to-similar-utilities).

Some examples of configuration:

- Check formatting and lint before committing

  ```shell title=".husky/pre-commit"
  git-format-staged --formatter 'biome check --files-ignore-unknown=true --no-errors-on-unmatched \"{}\"' .
  ```

- Format, lint, and apply safe code fixes before committing

  ```shell title=".husky/pre-commit"
  git-format-staged --formatter 'biome check --write --files-ignore-unknown=true --no-errors-on-unmatched \"{}\"' .
  ```


## pre-commit

[pre-commit](https://pre-commit.com/) provides a multi-language hook manager.
Biome provides four [pre-commit](https://pre-commit.com/) hooks via the [biomejs/pre-commit](https://github.com/biomejs/pre-commit) repository.

| hook `id`       | description                                                                 |
| --------------- | --------------------------------------------------------------------------- |
| `biome-ci`      | Check formatting, check if imports are organized, and lints                 |
| `biome-check`   | Format, organize imports, lint, and apply safe fixes to the committed files |
| `biome-format`  | Format the committed files                                                  |
| `biome-lint`    | Lint and apply safe fixes to the committed files                            |

In the following example, we assume that you [installed pre-commit](https://pre-commit.com/index.html#install) and run `pre-commit install` in your repository.
if you want to use the `biome-check` hook, add the following pre-commit configuration to the root of your project in a file named `.pre-commit-config.yaml`:

```yaml title=".pre-commit-config.yaml"
repos:
-   repo: https://github.com/biomejs/pre-commit
    rev: "v0.1.0"  # Use the sha / tag you want to point at
    hooks:
    -   id: biome-check
        additional_dependencies: ["@biomejs/biome@1.4.1"]
```

This will run `biome check --write` when you run `git commit`.

Note that you must specify which version of Biome to use thanks to the `additional_dependencies` option.
[pre-commit](https://pre-commit.com/) separately installs tools and need to know which one to install.

If Biome is already installed as a `npm` package in your local repository,
then it can be a burden to update both `package.json` and `.pre-commit-config.yaml` when you update Biome.
Instead of using the provided Biome hooks, you can specify your own [local hook](https://pre-commit.com/index.html#repository-local-hooks).

For example, if you use `npm`, you can write the following hook in `.pre-commit-config.yaml`:

```yaml title=".pre-commit-config.yaml"
repos:
  - repo: local
    hooks:
      - id: local-biome-check
        name: biome check
        entry: npx @biomejs/biome check --write --files-ignore-unknown=true --no-errors-on-unmatched
        language: system
        types: [text]
        files: "\\.(jsx?|tsx?|c(js|ts)|m(js|ts)|d\\.(ts|cts|mts)|jsonc?)$"
```

The pre-commit option `files` is optional,
because Biome is able to ignore unknown files (using the option `--files-ignore-unknown=true`).


## Shell script

You can also use a custom shell script.
Note that you can encounter cross-platform incompatibilities.
We recommend the use of a dedicated tool as the one presented in the previous sections.

Some examples of shells scripts:

- Check formatting and lint before committing

  ```shell title=".git/hooks/pre-commit"
  #!/bin/sh
  set -eu

  npx @biomejs/biome check --staged --files-ignore-unknown=true --no-errors-on-unmatched
  ```

- Format, lint, and apply safe code fixes before committing

  ```shell title=".git/hooks/pre-commit"
  #!/bin/sh
  set -eu

  if git status --short | grep --quiet '^MM'; then
    printf '%s\n' "ERROR: Some staged files have unstaged changes" >&2
    exit 1;
  fi

  npx @biomejs/biome check --write --staged --files-ignore-unknown=true --no-errors-on-unmatched

  git update-index --again
  ```

  Note that we make the hook fail if staged files have unstaged changes.


---
title: Renovate
description: Configuring Renovate Bot
---

[Renovate](https://docs.renovatebot.com/) is a popular tool for automated dependency updates.

## biome.json

Renovate has a [shared preset rule](https://docs.renovatebot.com/presets-customManagers/#custommanagersbiomeversions) that can help keep the `$schema` version in-sync and up-to-date within the `biome.json` configuration files.

To use, add `customManagers:biomeVersions` to your `extends` list.


```json title="renovate.json"
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["customManagers:biomeVersions"]
}
```


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

# Diagnostics

Learn the different parts of Biome's diagnostics.

Biome's diagnostics provide comprehensive information to understand and fix errors. They are not limited to errors but also offer structured information, warnings, and tips. This documentation breaks down the various components of a diagnostic, helping you identify important aspects and uncover underlying details.

## Diagnostic Severity

The severity of a diagnostic can influence the CLI behavior. For instance, error diagnostics will cause the CLI to exit with an error code.

### Fatal

Fatal diagnostics are indicated by red text and are emitted when an unexpected error occurs within Biome. They carry the fatal tag.

### Error

Error diagnostics are also shown in red text. They should be addressed as they emit an error code when encountered by the CLI.

### Warning

Warning diagnostics are displayed in yellow text. While they should be addressed, they do not block the CLI from functioning.

### Information

Information diagnostics are presented in green text. They provide useful insights and do not hinder the CLI.

## Diagnostic Tags

Tags serve as metadata attached to a diagnostic, influencing client behavior in various ways.

### Verbose

Verbose diagnostics are typically hidden. They can be revealed in the CLI using the `--verbose` option.

### Internal

Internal diagnostics are emitted when an internal error occurs. Users are encouraged to report a bug upon encountering one.

### Fixable

Fixable diagnostics indicate situations that users can resolve. They are often associated with lint diagnostics that offer a code action.

### Deprecated

These diagnostics indicate the use of deprecated code.

## Diagnostic Category

Categories group diagnostics. A category may include a link, particularly for lint rules.

### Simple Category

This diagnostic belongs to the category "check," emitted during the execution of the `check` command.

### Category with Link

This diagnostic belongs to the category "lint/a11y/noAccessKey." The link directs users to the webpage for the lint rule "noAccessKey."

## Diagnostic Location

Diagnostics can have a "location," consisting of three optional parts:
- A resource, the origin of the diagnostic.
- Source code of the file.
- A span (or text range), typically the line and column within the file.

### Diagnostic File Path

The file path is usually the first piece of information displayed at the top left of the diagnostic.

### Diagnostic Source Code

This shows the source code associated with a file, without displaying line and column numbers.

### Diagnostic Line and Column

Line and column information is typically printed next to the file path and is shown only when source code is associated.

When diagnostics are printed in an IDE's terminal, clicking `path/to/file.js:2:2` opens the file and places the cursor at the beginning of the span.

## Diagnostic Advices

Diagnostics can also include advices, which are additional messages appended after the original message. These advices come in various forms and are usually printed unless they are verbose advices.

---
# Don't modify this file. This file is autogenerate by `codegen/src/env_variables.rs`

title: Environment variables
description: A list of the environment variables available via Biome
---
### `BIOME_LOG_PREFIX_NAME`

 A prefix that's added to the name of the log. Default: `server.log.`

### `BIOME_LOG_PATH`

 The directory where the Daemon logs will be saved.

### `BIOME_CONFIG_PATH`

 A path to the configuration file


### `BIOME_BINARY`

Overrides the Biome binary being used. This allows you, for example, to use a system-wide Biome binary.

If you don't define this variable, Biome will automatically detect the correct binary for your platform.

```
# Nix derivation example; the binary path comes from "${pkgs.biome}/bin/biome"
BIOME_BINARY=/nix/store/68fyfw1hidsqkal1839whi3nzgvqv4pa-biome-1.0.0/bin/biome npx @biomejs/biome format .
```


---
# Don't modify this file. This file is autogenerate by `codegen/src/env_variables.rs`

title: Environment variables
description: A list of the environment variables available via Biome
---
### `BIOME_LOG_PREFIX_NAME`

 A prefix that's added to the name of the log. Default: `server.log.`

### `BIOME_LOG_PATH`

 The directory where the Daemon logs will be saved.

### `BIOME_CONFIG_PATH`

 A path to the configuration file


### `BIOME_BINARY`

Overrides the Biome binary being used. This allows you, for example, to use a system-wide Biome binary.

If you don't define this variable, Biome will automatically detect the correct binary for your platform.

```
# Nix derivation example; the binary path comes from "${pkgs.biome}/bin/biome"
BIOME_BINARY=/nix/store/68fyfw1hidsqkal1839whi3nzgvqv4pa-biome-1.0.0/bin/biome npx @biomejs/biome format .
```


# GritQL [EXPERIMENTAL]

GritQL is a query language for performing structural searches on source code, ignoring formatting details such as whitespace and quote types. It offers features for querying syntax structure, including snippets, matching, nesting, and variables.

GritQL is open-source and created by Grit.io.

Biome integrates GritQL for:

- The `biome search` command, with plans to extend it to IDE extensions.
- Ongoing plugin development efforts.

## Patterns

GritQL queries utilize _patterns_, primarily code snippets wrapped in backticks:

```grit
`console.log('Hello, world!')`
```

This matches any `console.log()` call with the string `'Hello, world!'`, regardless of formatting:

```js
console.log (
    'Hello, world!'
)
```

```js
console.log("Hello, world!")
```

Note: Use _single quotes_ around Grit queries in the `biome search` command to avoid shell conflicts:

```shell
biome search '`console.log($message)`' # find all `console.log` invocations
```

## Variables

GritQL supports _variables_ in queries. For example, this matches any `console.log()` call:

```grit
`console.log($message)`
```

It also matches methods on the `console` object:

```grit
`console.$method($message)`
```

The same variable can appear multiple times:

```grit
`$fn && $fn()`
```

This matches `foo && foo()` and `foo.bar && foo.bar()`, but not `foo && bar()`.

## Conditions

Add conditions to patterns using the `where` operator, often with the _match operator_, `<:`:

```grit
`console.$method($message)` where {
    $method <: `log`
}
```

This is similar to the previous `console.log($message)` pattern, but can be expanded with additional operators:

```grit
`console.$method($message)` where {
    $method <: or { `log`, `info`, `warn`, `error` }
}
```

## Language Documentation

For more information about GritQL and its syntax, refer to the official GritQL Language Documentation.

Note: Biome does not yet support all Grit features.

## Integration Status

GritQL support in Biome is under active development. While many features work, bugs and missing functionalities are expected.

For a detailed overview of supported and in-progress GritQL features, refer to the GitHub issue.

A detailed RFC guides the direction for plugin development.

**tl;dr**: We are working on supporting plugins, which can be pure GritQL plugins or JS/TS plugins using GritQL to select code for operations. Stay tuned!

# Reporters

Control Biome's output with reporters.

Since version **v1.8.0**, Biome's CLI accepts a `--reporter` argument that allows changing how diagnostics and summary are printed to the terminal.

## Summary

```shell
biome check --reporter=summary
```

Formatter:
The following files need to be formatted:
- main.ts
- index.ts

Organize Imports:
The following files need to have their imports sorted:
- main.ts
- index.ts

Analyzer:
Some analyzer rules were triggered.

| Rule Name                                           | Diagnostics                          |
|-----------------------------------------------------|--------------------------------------|
| lint/suspicious/noImplicitAnyLet                    | 12 (12 error(s), 0 warning(s), 0 info(s)) |
| lint/suspicious/noDoubleEquals                      | 8 (8 error(s), 0 warning(s), 0 info(s))   |
| lint/suspicious/noRedeclare                         | 12 (12 error(s), 0 warning(s), 0 info(s)) |
| lint/suspicious/noDebugger                          | 20 (20 error(s), 0 warning(s), 0 info(s)) |

## JSON

**Caution:** This reporter is experimental and subject to changes in patch releases.

It emits the summary and diagnostics in a JSON format.

```shell
biome ci --reporter=json
```

## JSON Pretty

**Caution:** This reporter is experimental and subject to changes in patch releases.

Same as `--reporter=json`, it emits the summary and diagnostics in a JSON format, and the output is formatted using the current JSON formatting options (configuration file or defaults).

```shell
biome ci --reporter=json-pretty
```

## GitHub

Use this reporter in a GitHub workflow. When properly configured in a PR workflow, GitHub will print a message for each info/warning/error emitted.

```shell
biome ci --reporter=github
```

Error messages:
```
::error title=lint/suspicious/noDoubleEquals,file=main.ts,line=4,endLine=4,col=3,endColumn=5::Use === instead of ==
::error title=lint/suspicious/noDebugger,file=main.ts,line=6,endLine=6,col=1,endColumn=9::This is an unexpected use of the debugger statement.
::error title=lint/nursery/noEvolvingAny,file=main.ts,line=8,endLine=8,col=5,endColumn=6::This variable's type is not allowed to evolve implicitly, leading to potential any types.
```

## JUnit

```shell
biome check --reporter=junit
```

JUnit output example:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<testsuites name="Biome" tests="16" failures="16" errors="20" time="<TIME>">
  <testsuite name="main.ts" tests="1" disabled="0" errors="0" failures="1" package="org.biome">
      <testcase name="org.biome.lint.suspicious.noDoubleEquals" line="4" column="3">
          <failure message="Use === instead of ==. == is only allowed when comparing against `null`">line 3, col 2, Use === instead of ==. == is only allowed when comparing against `null`</failure>
      </testcase>
  </testsuite>
  <testsuite name="main.ts" tests="1" disabled="0" errors="0" failures="1" package="org.biome">
      <testcase name="org.biome.lint.suspicious.noDebugger" line="6" column="1">
          <failure message="This is an unexpected use of the debugger statement.">line 5, col 0, This is an unexpected use of the debugger statement.</failure>
      </testcase>
  </testsuite>
  <testsuite name="main.ts" tests="1" disabled="0" errors="0" failures="1" package="org.biome">
      <testcase name="org.biome.lint.nursery.noEvolvingAny" line="8" column="5">
          <failure message="This variable's type is not allowed to evolve implicitly, leading to potential any types.">line 7, col 4, This variable's type is not allowed to evolve implicitly, leading to potential any types.</failure>
      </testcase>
  </testsuite>
</testsuites>
```

# Biome VS Code Extension

Biome unifies your development stack by combining the functionality of separate tools. It uses a single configuration file, has fantastic performance, and works with any stack. This extension brings Biome to your editor so that you can:

- Format files on save or when issuing the Format Document command
- See lints while you type and apply code fixes
- Perform refactors

## Installation

You can install the code extension by heading to the extension's Visual Studio Code Market Place page or from within VS Code by either:

- Open the extensions tab (View → Extensions) and search for Biome.
- Open the Quick Open Overlay (Ctrl/Cmd+P or Go -> Go to File), enter `ext install biomejs.biome`, and hit enter.

## Getting Started

### Default Formatter

Configure Biome as the default formatter for supported files to ensure that VS Code uses Biome over other formatters that you may have installed. You can do so by opening a JavaScript or TypeScript file and then:

- Open the Command Palette (Ctrl/Cmd+Shift+P or View → Command Palette)
- Select Format Document With…
- Select Configure Default Formatter…
- Select Biome

You can also enable Biome for specific languages only:

- Open the `settings.json`: open the Command Palette (Ctrl/Cmd+Shift+P) and select Preferences: Open User Settings (JSON)
- Set the `editor.defaultFormatter` to `biomejs.biome` for the desired language

```json
{
	"editor.defaultFormatter": "<other formatter>",
	"[javascript]": {
		"editor.defaultFormatter": "biomejs.biome"
	}
}
```

This configuration sets Biome as the default formatter for JavaScript files. All other files will be formatted using `<other formatter>`.

## Configuration Resolution

The extension automatically loads the `biome.json` file from the workspace’s root directory.

## Biome Resolution

The extension tries to use Biome from your project's local dependencies (`node_modules/@biomejs/biome`). It is recommended to add Biome as a project dependency to ensure that NPM scripts and the extension use the same Biome version.

You can also explicitly specify the Biome binary the extension should use by configuring the `biome.lspBin` setting in your editor options.

If the project has no dependency on Biome and no explicit path is configured, the extension uses the Biome version included in its bundle.

## Usage

### Format Document

To format an entire document, open the Command Palette (Ctrl/Cmd+Shift+P) and select Format Document.

To format a text range, select the text you want to format, open the Command Palette (Ctrl/Cmd+Shift+P), and select Format Selection.

### Format on Save

Biome respects VS Code's Format on Save setting. To enable format on save, open the settings (File -> Preferences -> Settings), search for `editor.formatOnSave`, and enable the option.

### Fix on Save

Biome respects VS Code's Code Actions On Save setting. To enable fix on save, add

```json
{
  "editor.codeActionsOnSave": {
    "quickfix.biome": "explicit"
  }
}
```

in vscode `settings.json`.

### Imports Sorting [Experimental]

The Biome VS Code extension supports imports sorting through the "Organize Imports" code action. By default, this action can be run using the Shift+Alt+O keyboard shortcut or is accessible through the Command Palette (Ctrl/Cmd+Shift+P) by selecting Organize Imports.

You can add the following to your editor configuration if you want the action to run automatically on save instead of calling it manually:

```json
{
	"editor.codeActionsOnSave":{
		"source.organizeImports.biome": "explicit"
	}
}
```

## Extension Settings

### `biome.lspBin`

The `biome.lspBin` option overrides the Biome binary used by the extension. The workspace folder is used as the base path if the path is relative.

### `biome.rename`

Enables Biome to handle renames in the workspace (experimental).

## Versioning

We follow the specs suggested by the official documentation:

Odd minor versions are dedicated to pre-releases, e.g. `*.5.*`. Even minor versions are dedicated to official releases, e.g. `*.6.*`.

## Troubleshooting

### I installed `@biomejs/biome`, but the extension shows a warning saying that it could not resolve library

The library `@biomejs/biome` specifies some optional dependencies that are installed based on your OS and architecture. It's possible that the extension can't resolve the binary when loading the extension due to your package manager.

**To resolve the issue**, try to install the binary manually. The warning should show you the binary that belongs to your machine.

**If you work in a team that uses different OSs/architectures**, it's advised to install all the binaries:

- `@biomejs/cli-darwin-arm64`
- `@biomejs/cli-darwin-x64`
- `@biomejs/cli-linux-arm64`
- `@biomejs/cli-linux-x64`
- `@biomejs/cli-win32-arm64`
- `@biomejs/cli-win32-x64`

### My `biome.json` file is ignored in a multi-root workspace

Currently, support for multi-root workspaces is limited, making `biome.json` files placed in individual root folders sometimes invisible to the extension. For now, you may need to set up an individual workspace for each folder that depends on Biome. You can track our progress on this issue.

# Zed extension

## Installation

Requires Zed >= v0.131.0.

This extension is available in the extensions view inside the Zed editor. Open zed: extensions and search for Biome.

## Configuration

By default, the biome.json file is required to be in the root of the workspace.

Otherwise, it can be configured through the LSP settings:

```jsonc
// settings.json
{
  "lsp": {
    "biome": {
      "settings": {
        "config_path": "<path>/biome.json"
      }
    }
  }
}
```

### Formatting

To use the language server as a formatter, specify biome as your formatter in the settings:

```jsonc
// settings.json
{
  "formatter": {
    "language_server": {
      "name": "biome"
    }
  }
}
```

### Enable biome only when biome.json is present

```jsonc
// settings.json
{
  "lsp": {
    "biome": {
      "settings": {
        "require_config_file": true
      }
    }
  }
}
```

### Project based configuration

If you'd like to exclude biome from running in every project:

1. Disable the biome language server in user settings:

```jsonc
// settings.json
{
  "language_servers": [ "!biome", "..." ]
}
```

2. Enable it in the project's local settings:

```jsonc
// <workspace>/.zed/settings.json
{
  "language_servers": [ "biome", "..." ]
}
```

The same can be configured on a per-language basis with the languages key.

### Run code actions on format:

```jsonc
// settings.json
{
  "code_actions_on_format": {
    "source.fixAll.biome": true,
    "source.organizeImports.biome": true
  }
}
```