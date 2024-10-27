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