# useExplicitType

Require explicit return types on functions and class methods.

**Diagnostic Category: `lint/nursery/useExplicitType`**

**Since**: `v1.9.3`

**Caution**: This rule is part of the nursery group.

Sources: 
- Same as: @typescript-eslint/explicit-function-return-type

Require explicit return types on functions and class methods.

Functions in TypeScript often don't need to be given an explicit return type annotation. Leaving off the return type is less code to read or write and allows the compiler to infer it from the contents of the function. However, explicit return types do make it visually more clear what type is returned by a function. They can also speed up TypeScript type checking performance in large codebases with many large functions. Explicit return types also reduce the chance of bugs by asserting the return type, and it avoids surprising "action at a distance," where changing the body of one function may cause failures inside another function.

This rule enforces that functions do have an explicit return type annotation.

## Examples

### Invalid

```ts
// Should indicate that no value is returned (void)
function test() {
  return;
}
```

code-block.ts:1:1 lint/nursery/useExplicitType ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Missing return type on function.  
1 │ // Should indicate that no value is returned (void)  
2 │ function test() {  
3 │ return;  
4 │ }  
ℹ Declaring the return type makes the code self-documenting and can speed up TypeScript type checking.  
ℹ Add a return type annotation.  

```ts
// Should indicate that a number is returned
var fn = function () {
   return 1;
};
```

code-block.ts:2:10 lint/nursery/useExplicitType ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Missing return type on function.  
1 │ // Should indicate that a number is returned  
2 │ var fn = function () {  
3 │ return 1;  
4 │ };  
ℹ Declaring the return type makes the code self-documenting and can speed up TypeScript type checking.  
ℹ Add a return type annotation.  

```ts
// Should indicate that a string is returned
var arrowFn = () => 'test';
```

code-block.ts:2:15 lint/nursery/useExplicitType ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Missing return type on function.  
1 │ // Should indicate that a string is returned  
2 │ var arrowFn = () => 'test';  
ℹ Declaring the return type makes the code self-documenting and can speed up TypeScript type checking.  
ℹ Add a return type annotation.  

```ts
class Test {
  // Should indicate that no value is returned (void)
  method() {
    return;
  }
}
```

code-block.ts:3:3 lint/nursery/useExplicitType ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Missing return type on function.  
1 │ class Test {  
2 │ // Should indicate that no value is returned (void)  
3 │ method() {  
4 │ return;  
5 │ }  
ℹ Declaring the return type makes the code self-documenting and can speed up TypeScript type checking.  
ℹ Add a return type annotation.  

```ts
// Should indicate that no value is returned (void)
function test(a: number) {
  a += 1;
}
```

code-block.ts:1:1 lint/nursery/useExplicitType ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Missing return type on function.  
1 │ // Should indicate that no value is returned (void)  
2 │ function test(a: number) {  
3 │ a += 1;  
4 │ }  
ℹ Declaring the return type makes the code self-documenting and can speed up TypeScript type checking.  
ℹ Add a return type annotation.  

```ts
// Should use const assertions
const func = (value: number) => ({ type: 'X', value }) as any;
```

code-block.ts:2:14 lint/nursery/useExplicitType ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Missing return type on function.  
1 │ // Should use const assertions  
2 │ const func = (value: number) => ({ type: 'X', value }) as any;  
ℹ Declaring the return type makes the code self-documenting and can speed up TypeScript type checking.  
ℹ Add a return type annotation.  

The following pattern is considered incorrect code for a higher-order function, as the returned function does not specify a return type:

```ts
const arrowFn = () => () => {};
```

code-block.ts:1:23 lint/nursery/useExplicitType ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Missing return type on function.  
1 │ const arrowFn = () => () => {};  
ℹ Declaring the return type makes the code self-documenting and can speed up TypeScript type checking.  
ℹ Add a return type annotation.  

```ts
const arrowFn = () => {
  return () => { };
}
```

code-block.ts:2:10 lint/nursery/useExplicitType ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Missing return type on function.  
1 │ const arrowFn = () => {  
2 │ return () => { };  
3 │ }  
ℹ Declaring the return type makes the code self-documenting and can speed up TypeScript type checking.  
ℹ Add a return type annotation.  

The following pattern is considered incorrect code for a higher-order function because the function body contains multiple statements. We only check whether the first statement is a function return.

```ts
// A function has multiple statements in the body
function f() {
  if (x) {
    return 0;
  }
  return (): void => {}
}
```

code-block.ts:1:1 lint/nursery/useExplicitType ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Missing return type on function.  
1 │ // A function has multiple statements in the body  
2 │ function f() {  
3 │ if (x) {  
4 │ return 0;  
5 │ }  
ℹ Declaring the return type makes the code self-documenting and can speed up TypeScript type checking.  
ℹ Add a return type annotation.  

```ts
// A function has multiple statements in the body
function f() {
  let str = "test";
  return (): string => {
    str;
  }
}
```

code-block.ts:1:1 lint/nursery/useExplicitType ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚠ Missing return type on function.  
1 │ // A function has multiple statements in the body  
2 │ function f() {  
3 │ let str = "test";  
4 │ return (): string => {  
5 │ str;  
6 │ }  
ℹ Declaring the return type makes the code self-documenting and can speed up TypeScript type checking.  
ℹ Add a return type annotation.  

### Valid

```ts
// No return value should be expected (void)
function test(): void {
  return;
}
```

```ts
// A return value of type number
var fn = function (): number {
  return 1;
}
```

```ts
// A return value of type string
var arrowFn = (): string => 'test';
```

```ts
class Test {
  // No return value should be expected (void)
  method(): void {
    return;
  }
}
```

The following patterns are considered correct code for a function immediately returning a value with `as const`:

```ts
const func = (value: number) => ({ foo: 'bar', value }) as const;
```

The following patterns are considered correct code for a function allowed within specific expression contexts, such as an IIFE, a function passed as an argument, or a function inside an array:

```ts
// Callbacks without return types
setTimeout(function() { console.log("Hello!"); }, 1000);
```

```ts
// IIFE
(() => {})();
```

```ts
// a function inside an array
[function () {}, () => {}];
```

The following pattern is considered correct code for a higher-order function, where the returned function explicitly specifies a return type and the function body contains only one statement:

```ts
// the outer function returns an inner function that has a `void` return type
const arrowFn = () => (): void => {};
```

```ts
// the outer function returns an inner function that has a `void` return type
const arrowFn = () => {
  return (): void => { };
}
```

The following patterns are considered correct for type annotations on variables in function expressions:

```ts
// A function with a type assertion using `as`
const asTyped = (() => '') as () => string;
```

```ts
// A function with a type assertion using `<>`
const castTyped = <() => string>(() => '');
```

```ts
// A variable declarator with a type annotation.
type FuncType = () => string;
const arrowFn: FuncType = () => 'test';
```

```ts
// A function is a default parameter with a type annotation
type CallBack = () => void;
const f = (gotcha: CallBack = () => { }): void => { };
```

```ts
// A class property with a type annotation
type MethodType = () => void;
class App {
    private method: MethodType = () => { };
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options