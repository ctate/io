# noInferrableTypes

Disallow type annotations for variables, parameters, and class properties initialized with a literal expression.

## Diagnostic Category: `lint/style/noInferrableTypes`

### Since: `v1.0.0`

This rule is recommended by Biome. A diagnostic error will appear when linting your code.
This rule has a **safe** fix.

Sources: 
- Same as: `@typescript-eslint/no-inferrable-types`

TypeScript is able to infer the types of parameters, properties, and variables from their default or initial values.
There is no need to use an explicit `:` type annotation for trivially inferred types (boolean, bigint, number, regex, string).
Doing so adds unnecessary verbosity to code making it harder to read.

In contrast to ESLint's rule, this rule allows to use a wide type for `const` declarations.
Moreover, the rule does not recognize `undefined` values, primitive type constructors (String, Number, ...), and `RegExp` type.
These global variables could be shadowed by local ones.

## Examples

### Invalid

```ts
const variable: 1 = 1;
```

```ts
let variable: number = 1;
```

```ts
class SomeClass {
  readonly field: 1 = 1;
}
```

```ts
class SomeClass {
  field: number = 1;
}
```

```ts
function f(param: number = 1): void {}
```

### Valid

```ts
const variable: number = 1;
```

```ts
let variable: 1 | 2 = 1;
```

```ts
class SomeClass {
  readonly field: number = 1;
}
```

```ts
// `undefined` could be shadowed
const variable: undefined = undefined;
```

```ts
// `RegExp` could be shadowed
const variable: RegExp = /a/;
```

```ts
// `String` could be shadowed
let variable: string = String(5);
```

```ts
class SomeClass {
  field: 1 | 2 = 1;
}
```

```ts
function f(param: 1 | 2 = 1): void {}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options