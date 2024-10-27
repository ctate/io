# noUselessUndefinedInitialization

**Description:** Disallow initializing variables to `undefined`.

**Diagnostic Category:** `lint/complexity/noUselessUndefinedInitialization`

**Since:** `v1.7.2`

**Note:** This rule has a safe fix.

**Sources:** Same as: `no-undef-init` (https://eslint.org/docs/latest/rules/no-undef-init)

A variable that is declared and not initialized to any value automatically gets the value of `undefined`. It’s considered a best practice to avoid initializing variables to `undefined`. Any inline comments attached to the initialization value or variable will be moved to the end of the variable declaration on auto-fix. This differs from Eslint's behavior.

## Examples

### Invalid

```js
var a = undefined;
```

**Warning:** It's not necessary to initialize `a` to undefined.

```js
let b = undefined, c = 1, d = 2;
```

**Warning:** It's not necessary to initialize `b` to undefined.

```js
for (let i = 0; i < 100; i++) {
	let i = undefined;
}
```

**Warning:** It's not necessary to initialize `i` to undefined.

```js
let f = /**/undefined/**/ ;
```

**Warning:** It's not necessary to initialize `f` to undefined.

### Valid

```js
var a = 1;
```

```js
class Foo {
	bar = undefined;
}
```

## Related links

- Disable a rule (link)
- Configure the rule fix (link)
- Rule options (link)