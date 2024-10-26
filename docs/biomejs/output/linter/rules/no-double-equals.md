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