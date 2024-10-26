# noRedeclare

Disallow variable, function, class, and type redeclarations in the same scope.

## Diagnostic Category: `lint/suspicious/noRedeclare`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

### Sources

- Same as: no-redeclare
- Same as: @typescript-eslint/no-redeclare

Disallow variable, function, class, and type redeclarations in the same scope.

## Examples

### Invalid

```javascript
var a = 3;
var a = 10;
```

```javascript
let a = 3;
let a = 10;
```

```javascript
function f() {}
function f() {}
```

```javascript
class C {
    static {
        var c = 3;
        var c = 10;
    }
}
```

```typescript
type Person = { name: string; }
class Person { name: string; }
```

### Valid

```javascript
var a = 3;
a = 10;
```

```typescript
class Foo {
    bar(a: A);
    bar(a: A, b: B);
    bar(a: A, b: B) {}
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options