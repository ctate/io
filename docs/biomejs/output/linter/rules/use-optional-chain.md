# useOptionalChain

**Description:** Enforce using concise optional chain instead of chained logical expressions.

**Diagnostic Category:** `lint/complexity/useOptionalChain`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:** Same as: `@typescript-eslint/prefer-optional-chain`

The optional chain operator allows you to safely access properties and methods on objects when they are potentially `null` or `undefined`. It only chains when the property value is `null` or `undefined`, making it safer than relying on logical operator chaining.

## Examples

### Invalid

```js
foo && foo.bar && foo.bar.baz && foo.bar.baz.buzz
```

**Diagnostic:**
- Change to an optional chain.

```js
foo.bar && foo.bar.baz.buzz
```

**Diagnostic:**
- Change to an optional chain.

```js
foo !== undefined && foo.bar != undefined && foo.bar.baz !== null && foo.bar.baz.buzz
```

**Diagnostic:**
- Change to an optional chain.

```js
((foo || {}).bar || {}).baz;
```

**Diagnostic:**
- Change to an optional chain.

```js
(await (foo1 || {}).foo2 || {}).foo3;
```

**Diagnostic:**
- Change to an optional chain.

```ts
(((typeof x) as string) || {}).bar;
```

**Diagnostic:**
- Change to an optional chain.

### Valid

```js
foo && bar;
```

```js
foo || {};
```

```js
(foo = 2 || {}).bar;
```

```js
foo || foo.bar;
```

```js
foo["some long"] && foo["some long string"].baz
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options