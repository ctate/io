# noDuplicateObjectKeys

Disallow two keys with the same name inside objects.

## Diagnostic Category: `lint/suspicious/noDuplicateObjectKeys`

### JavaScript (and super languages)

**Since**: `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

Sources: 
- Same as: no-dupe-keys

Disallow two keys with the same name inside objects.

If an object property with the same name is defined multiple times (except when combining a getter with a setter), only the last definition makes it into the object and previous definitions are ignored, which is likely a mistake.

### Examples

#### Invalid

```js
const obj = {
   	a: 1,
   	a: 2,
}
```

```js
const obj = {
   	set a(v) {},
   	a: 2,
}
```

#### Valid

```js
const obj = {
   	a: 1,
   	b: 2,
}
```

```js
const obj = {
   	get a() { return 1; },
   	set a(v) {},
}
```

### Related links

- Disable a rule
- Configure the rule fix
- Rule options

### JSON (and super languages)

**Since**: `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Disallow two keys with the same name inside objects.

### Examples

#### Invalid

```json
{
  "title": "New title",
  "title": "Second title"
}
```

#### Valid

```json
{
  "title": "New title",
  "secondTitle": "Second title"
}
```

### Related links

- Disable a rule
- Configure the rule fix
- Rule options