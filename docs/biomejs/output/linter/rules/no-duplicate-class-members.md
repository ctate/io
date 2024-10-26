# noDuplicateClassMembers

Disallow duplicate class members.

If there are declarations of the same name among class members,
the last declaration overwrites other declarations silently.
It can cause unexpected behaviours.

## Diagnostic Category
lint/suspicious/noDuplicateClassMembers

## Since
v1.0.0

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

## Sources
- Same as: no-dupe-class-members
- Same as: @typescript-eslint/no-dupe-class-members

## Examples

### Invalid

```js
class Foo {
  bar() { }
  bar() { }
}
```

```js
class Foo {
  bar() { }
  get bar() { }
}
```

```js
class Foo {
  bar;
  bar() { }
}
```

```js
class Foo {
  static bar() { }
  static bar() { }
}
```

### Valid

```js
class Foo {
  bar() { }
  qux() { }
}
```

```js
class Foo {
  set bar(value) { }
  get bar() { }
}
```

```js
class Foo {
  bar;
  qux;
}
```

```js
class Foo {
  bar;
  qux() { }
}
```

```js
class Foo {
  static bar() { }
  bar() { }
}
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options