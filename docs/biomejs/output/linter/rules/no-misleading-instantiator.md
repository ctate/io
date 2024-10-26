# noMisleadingInstantiator

**Diagnostic Category: `lint/suspicious/noMisleadingInstantiator`**

**Since**: `v1.3.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `@typescript-eslint/no-misused-new`

Enforce proper usage of `new` and `constructor`.

In JavaScript, classes utilize the `constructor` method to initialize a new instance. On the other hand, TypeScript interfaces can describe a class type with a `new()` method signature, though this pattern is not commonly seen in real-world code. Developers, especially those new to JavaScript or TypeScript, might occasionally confuse the use of `constructor` with `new`.

This rule triggers warnings in the following scenarios:

- When a class has a method named `new`.
- When an interface defines a method named `constructor` or `new` that returns the interface type.
- When a type alias has a `constructor` method.

You should not use this rule if you intentionally want a class with a `new` method, and you're confident nobody working in your code will mistake it with an `constructor`.

## Examples

### Invalid

```ts
interface I {
  new (): I;
  constructor(): void;
}
```

```text
code-block.ts:2:3 lint/suspicious/noMisleadingInstantiator 
 Don't use the new method in interfaces.
  1 │ interface I {
> 2 │   new (): I;
 │   ^^^^^^^^^^^
  3 │   constructor(): void;
 4 │ }
 
 new in an interface suggests it's instantiable, which is incorrect. The returned type should different from the constructor's type.
```

```ts
class C {
  new(): C;
}
```

```text
code-block.ts:2:3 lint/suspicious/noMisleadingInstantiator 
 Don't use the new method in classes.
  1 │ class C {
> 2 │   new(): C;
 │   ^^^^^^^
  3 │ }
 
 new is typically used to instantiate objects. In classes, its usage can be misleading.
```

### Valid

```ts
declare class C {
  constructor();
}

interface I {
  new (): C;
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options