# noAccumulatingSpread

**Diagnostic Category: `lint/performance/noAccumulatingSpread`**

**Since**: `v1.0.0`

Disallow the use of spread (`...`) syntax on accumulators.

Spread syntax allows an iterable to be expanded into its individual elements.

Spread syntax should be avoided on accumulators (like those in `.reduce`) because it causes a time complexity of `O(n^2)` instead of `O(n)`.

Source: prateeksurana.me/blog/why-using-object-spread-with-reduce-bad-idea/

## Examples

### Invalid

```js
var a = ['a', 'b', 'c'];
a.reduce((acc, val) => [...acc, val], []);
```

```js
var a = ['a', 'b', 'c'];
a.reduce((acc, val) => {return [...acc, val];}, []);
```

```js
var a = ['a', 'b', 'c'];
a.reduce((acc, val) => ({...acc, [val]: val}), {});
```

### Valid

```js
var a = ['a', 'b', 'c'];
a.reduce((acc, val) => {acc.push(val); return acc}, []);
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options