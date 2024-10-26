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