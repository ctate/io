# noInvalidBuiltinInstantiation

**Diagnostic Category: `lint/correctness/noInvalidBuiltinInstantiation`**

**Since**: `v1.7.2`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: unicorn/new-for-builtins
- Same as: eslint/no-new-native-nonconstructor

Ensure that builtins are correctly instantiated.

The following builtins require `new` to be instantiated:

- ArrayBuffer
- BigInt64Array
- BigUint64Array
- DataView
- FinalizationRegistry
- Float32Array
- Float64Array
- Int16Array
- Int32Array
- Int8Array
- Map
- Promise
- Proxy
- Set
- SharedArrayBuffer
- Uint16Array
- Uint32Array
- Uint8Array
- Uint8ClampedArray
- WeakMap
- WeakRef
- WeakSet

Conversely, the following builtins cannot be instantiated with `new`:

- BigInt
- Symbol

## Examples

### Invalid

```js
const text = new BigInt(1);
```

```js
const map = Map([
  ['foo', 'bar']
]);
```

### Valid

```js
const text = BigInt(1);
```

```js
const map = new Map([
 ['foo', 'bar']
]);
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options