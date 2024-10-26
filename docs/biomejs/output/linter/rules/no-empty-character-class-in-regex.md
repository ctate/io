# noEmptyCharacterClassInRegex

Disallow empty character classes in regular expression literals.

## Diagnostic Category: `lint/correctness/noEmptyCharacterClassInRegex`

### Since: `v1.3.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: no-empty-character-class

Disallow empty character classes in regular expression literals.

Empty character classes don't match anything.
In contrast, negated empty classes match any character.
They are often the result of a typing mistake.

## Examples

### Invalid

```js
/^a[]/.test("a"); // false
```

The regular expression includes this empty character class.
Empty character classes don't match anything.
If you want to match against [, escape it \[.
Otherwise, remove the character class or fill it.

```js
/^a[^]/.test("ax"); // true
```

The regular expression includes this negated empty character class.
Negated empty character classes match anything.
If you want to match against [, escape it \[.
Otherwise, remove the character class or fill it.

### Valid

```js
/^a[xy]/.test("ay"); // true
```

```js
/^a[^xy]/.test("ab"); // true
```

```js
/^a\[]/.test("a[]"); // true
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options