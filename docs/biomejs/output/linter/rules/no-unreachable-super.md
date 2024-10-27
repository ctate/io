# noUnreachableSuper

**Description:**  
Ensures the `super()` constructor is called exactly once on every code path in a class constructor before `this` is accessed if the class has a superclass.

**Diagnostic Category:** `lint/correctness/noUnreachableSuper`  
**Since:** `v1.0.0`  
**Note:** This rule is recommended by Biome. A diagnostic error will appear when linting your code.

**Sources:**  
Same as: `no-this-before-super` (ESLint documentation)

## Examples

### Invalid

```js
class A extends B {
    constructor() {}
}
```
Diagnostic:  
This constructor has code paths that return without calling `super()`.

```js
class A extends B {
    constructor(value) {
        this.prop = value;
        super();
    }
}
```
Diagnostic:  
This constructor has code paths accessing `this` without calling `super()` first.

```js
class A extends B {
    constructor(cond) {
        if(cond) {
            super();
        }
    }
}
```
Diagnostic:  
This constructor has code paths that return without calling `super()`.

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