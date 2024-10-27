# noUselessConstructor

Disallow unnecessary constructors.

**Diagnostic Category:** `lint/complexity/noUselessConstructor`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

Sources: 
- Same as: `no-useless-constructor` (ESLint)
- Same as: `@typescript-eslint/no-useless-constructor` (TypeScript ESLint)

ES2015 provides a default class constructor if one is not specified. As such, providing an empty constructor or one that delegates into its parent is unnecessary.

The rule ignores:
- Decorated classes
- Constructors with at least one parameter property
- `private` and `protected` constructors

## Caveat

This rule reports on constructors whose sole purpose is to make a parent constructor public.

## Examples

### Invalid

```js
class A {
    constructor (a) {}
}
```
Diagnostic: This constructor is unnecessary.  
Unsafe fix: Remove the unnecessary constructor.

```ts
class B extends A {
    constructor (a) {
        super(a);
    }
}
```
Diagnostic: This constructor is unnecessary.  
Unsafe fix: Remove the unnecessary constructor.

```js
class C {
    /**
     * Documented constructor.
     */
    constructor () {}
}
```
Diagnostic: This constructor is unnecessary.  
Unsafe fix: Remove the unnecessary constructor.

```js
class A {
    protected constructor() {
        this.prop = 1;
    }
}

class B extends A {
    constructor () {
        super();
    }
}
```
Diagnostic: 'protected' modifier can only be used in TypeScript files.

### Valid

```js
class A {
    constructor (prop) {
        this.prop = prop;
    }
}
```

```js
class B extends A {
    constructor () {
        super(5);
    }
}
```

```ts
class C {
    constructor (private prop: number) {}
}
```

```ts
class D {
  constructor(public arg: number){}
}

class F extends D {
  constructor(arg = 4) {
    super(arg)
  }
}
```

```ts
@Decorator
class C {
    constructor (prop: number) {}
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options