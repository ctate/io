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