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