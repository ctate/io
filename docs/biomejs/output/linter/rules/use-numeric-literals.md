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