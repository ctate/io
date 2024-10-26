# noInvalidConstructorSuper

Prevents the incorrect use of `super()` inside classes. It also checks whether a call `super()` is missing from classes that extends other constructors.

**Diagnostic Category: `lint/correctness/noInvalidConstructorSuper`**

**Since**: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `constructor-super`

## Examples

### Invalid

```js
class A {
    constructor() {
        super();
    }
}
```

```text
code-block.js:3:9 lint/correctness/noInvalidConstructorSuper 
 This class should not have a super() call. You should remove it.
  1 │ class A {
  2 │     constructor() {
> 3 │         super();
  │         ^^^^
  4 │     }
  5 │ }
```

```js
class A extends undefined {
    constructor() {
        super();
    }
}
```

```text
code-block.js:3:9 lint/correctness/noInvalidConstructorSuper 
 This class calls super(), but the class extends from a non-constructor.
  1 │ class A extends undefined {
  2 │     constructor() {
> 3 │         super();
  │         ^^^^
  4 │     }
  5 │ }
 
 This is where the non-constructor is used.
 
> 1 │ class A extends undefined {
  │                 ^^^^^^^^^
  2 │     constructor() {
  3 │         super();
```

### Valid

```js
export default class A extends B {
    constructor() {
        super();
    }
}
```

```js
export class A {
    constructor() {}
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options