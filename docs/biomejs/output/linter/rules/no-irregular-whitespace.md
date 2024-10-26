# noIrregularWhitespace

**Diagnostic Category: `lint/nursery/noIrregularWhitespace`**

## JavaScript (and super languages)

**Since**: `v1.9.0`

This rule is part of the nursery group.

Sources: 
- Same as: no-irregular-whitespace

Disallows the use of irregular whitespace characters.

Invalid or irregular whitespace causes issues with various parsers and also makes code harder to debug.

### Examples

#### Invalid

```js
letcount;
```

```js
let foo;
```

#### Valid

```js
const count = 1;
```

```js
const foo = '';
```

## CSS

**Since**: `v1.9.9`

This rule is part of the nursery group.

Sources: 
- Same as: stylelint/no-irregular-whitespace

Disallows the use of irregular whitespace characters.

Using irregular whitespace would lead to the failure of selecting the correct target.

### Examples

#### Invalid

```css
.firstClass.secondClass {
  color: red;
}
```

```css
.firstClass .secondClass {
  color:red;
}
```

#### Valid

```css
.firstClass .secondClass {
  color: red;
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options