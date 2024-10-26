# noConfusingVoidType

Disallow `void` type outside of generic or return types.

## Diagnostic Category: `lint/suspicious/noConfusingVoidType`

### Since: `v1.2.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has an **unsafe** fix.

Sources: 
- Same as: `@typescript-eslint/no-invalid-void-type`

`void` in TypeScript refers to a function return that is meant to be ignored.
Attempting to use a void type outside of a return type or a type parameter is often a sign of programmer error.
`void` can also be misleading for other developers even if used correctly.

The `void` type means cannot be mixed with any other types, other than `never`, which accepts all types.
If you think you need this then you probably want the `undefined` type instead.

The code action suggests using `undefined` instead of `void`.
It is unsafe because a variable with the `void` type cannot be assigned to a variable with the `undefined` type.

## Examples

### Invalid

```ts
let foo: void;
```

```ts
function logSomething(thing: void) {}
```

```ts
interface Interface {
    prop: void;
}
```

```ts
type PossibleValues = number | void;
```

### Valid

```ts
function foo(): void {};
```

```ts
function doSomething(this: void) {}
```

```ts
function printArg<T = void>(arg: T) {}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options