# noMisleadingCharacterClass

Disallow characters made with multiple code points in character class syntax.

## Diagnostic Category: `lint/suspicious/noMisleadingCharacterClass`

### Since: `v1.5.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has a **safe** fix.

Sources: 
- Same as: no-misleading-character-class

Disallow characters made with multiple code points in character class syntax.

Unicode includes the characters which are made with multiple code points. e.g. Á, 🇯🇵, 👨‍👩‍👦.
A RegExp character class `/[abc]/` cannot handle characters with multiple code points.
For example, the character `❇️` consists of two code points: `❇` (U+2747) and `VARIATION SELECTOR-16` (U+FE0F).
If this character is in a RegExp character class, it will match to either `❇` or `VARIATION SELECTOR-16` rather than `❇️`.
This rule reports the regular expressions which include multiple code point characters in character class syntax.

## Examples

### Invalid

```js
/^[Á]$/u;
```

```js
/^[❇️]$/u;
```

```js
/^[👶🏻]$/u;
```

```js
/^[🇯🇵]$/u;
```

```js
/^[👨‍👩‍👦]$/u;
```

```js
/^[👍]$/; // surrogate pair without u flag
```

### Valid

```js
/^[abc]$/;
/^[👍]$/u;
/^[\q{👶🏻}]$/v;
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options