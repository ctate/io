# useDefaultParameterLast

Enforce default function parameters and optional function parameters to be last.

**Diagnostic Category:** `lint/style/useDefaultParameterLast`

**Since:** `v1.0.0`

**Note:**
- This rule is recommended by Biome. A diagnostic error will appear when linting your code.
- This rule has an **unsafe** fix.

**Sources:**
- Same as: default-param-last documentation on eslint.org
- Same as: @typescript-eslint/default-param-last documentation on typescript-eslint.io

Default and optional parameters that precede a required parameter cannot be omitted at call site.

## Examples

### Invalid

```js
function f(a = 0, b) {}
```

Diagnostic:
```
code-block.js:1:12 lint/style/useDefaultParameterLast FIXABLE
✖ This default parameter should follow the last required parameter or should be a required parameter.
> 1 │ function f(a = 0, b) {}
   │           ^^^^^
```

```js
function f(a, b = 0, c) {}
```

Diagnostic:
```
code-block.js:1:15 lint/style/useDefaultParameterLast FIXABLE
✖ This default parameter should follow the last required parameter or should be a required parameter.
> 1 │ function f(a, b = 0, c) {}
   │              ^^^^^
```

```ts
function f(a: number, b?: number, c: number) {}
```

Diagnostic:
```
code-block.ts:1:23 lint/style/useDefaultParameterLast FIXABLE
✖ This optional parameter should follow the last required parameter or should be a required parameter.
> 1 │ function f(a: number, b?: number, c: number) {}
   │                      ^^^^^
```

```ts
class Foo {
    constructor(readonly a = 10, readonly b: number) {}
}
```

Diagnostic:
```
code-block.ts:2:17 lint/style/useDefaultParameterLast FIXABLE
✖ This default parameter should follow the last required parameter or should be a required parameter.
> 2 │ constructor(readonly a = 10, readonly b: number) {}
   │                ^^^^^
```

### Valid

```js
function f(a, b = 0) {}
```

```ts
function f(a: number, b?: number, c = 0) {}
```

```ts
function f(a: number, b = 0, c?: number) {}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options