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