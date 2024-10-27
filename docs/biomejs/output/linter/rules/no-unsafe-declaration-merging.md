# noUnsafeDeclarationMerging

Disallow unsafe declaration merging between interfaces and classes.

**Diagnostic Category:** `lint/suspicious/noUnsafeDeclarationMerging`

**Since:** `v1.0.0`

- This rule is recommended by Biome. A diagnostic error will appear when linting your code.

Sources: 
- Same as: `@typescript-eslint/no-unsafe-declaration-merging`

Disallow unsafe declaration merging between interfaces and classes.

TypeScript's declaration merging supports merging separate declarations with the same name. Declaration merging between classes and interfaces is unsafe. The TypeScript Compiler doesn't check whether properties defined in the interface are initialized in the class. This can lead to TypeScript not detecting code that will cause runtime errors.

## Examples

### Invalid

```ts
interface Foo {
    f(): void
}

class Foo {}

const foo = new Foo();
foo.f(); // Runtime Error: Cannot read properties of undefined.
```

code-block.ts:5:7 lint/suspicious/noUnsafeDeclarationMerging ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✖ This class is unsafely merged with an interface.  
3 │ }  
4 │  
> 5 │ class Foo {}  
   │      ^^^  
6 │  
7 │ const foo = new Foo();  

ℹ The interface is declared here.  
> 1 │ interface Foo {  
   │          ^^^  
2 │     f(): void  
3 │ }  

ℹ The TypeScript compiler doesn't check whether properties defined in the interface are initialized in the class.

### Valid

```ts
interface Foo {}
class Bar implements Foo {}
```

```ts
namespace Baz {}
namespace Baz {}
enum Baz {}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options