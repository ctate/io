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