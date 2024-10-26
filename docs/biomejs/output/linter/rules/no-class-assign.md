# noClassAssign
Disallow reassigning class members.

## Diagnostic Category
lint/suspicious/noClassAssign

## Since
v1.0.0

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

## Sources
- Same as: no-class-assign

## Description
A class declaration creates a variable that we can modify, however, the modification is a mistake in most cases.

## Examples

### Invalid

```javascript
class A {}
A = 0;
```

```javascript
A = 0;
class A {}
```

```javascript
class A {
	b() {
		A = 0;
	}
}
```

```javascript
let A = class A {
	b() {
		A = 0;
		// `let A` is shadowed by the class name.
	}
}
```

### Valid

```javascript
let A = class A {}
A = 0; // A is a variable.
```

```javascript
let A = class {
    b() {
        A = 0; // A is a variable.
    }
}
```

```javascript
class A {
	b(A) {
		A = 0; // A is a parameter.
	}
}
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options