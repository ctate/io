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