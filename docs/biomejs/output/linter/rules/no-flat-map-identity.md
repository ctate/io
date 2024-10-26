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