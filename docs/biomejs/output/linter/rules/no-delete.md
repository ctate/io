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