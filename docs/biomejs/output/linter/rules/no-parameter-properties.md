# noParameterProperties

Disallow the use of parameter properties in class constructors.

## Diagnostic Category
lint/style/noParameterProperties

## Since
v1.0.0

## Sources
Inspired from: @typescript-eslint/parameter-properties

TypeScript includes a "parameter properties" shorthand for declaring a class constructor parameter and class property in one location.
Parameter properties can confuse those new to TypeScript as they are less explicit than other ways of declaring and initializing class members.
Moreover, private class properties, starting with #, cannot be turned into "parameter properties".
This questions the future of this feature.

## Examples

### Invalid

```ts
class A {
    constructor(readonly name: string) {}
}
```

### Error Message
Use a more explicit class property instead of a parameter property.

### Valid

```ts
class A {
    constructor(name: string) {}
}
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options