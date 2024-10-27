# useConsistentMemberAccessibility

Require consistent accessibility modifiers on class properties and methods.

**Diagnostic Category:** `lint/nursery/useConsistentMemberAccessibility`

**Since:** `v1.9.0`

**Caution:** This rule is part of the nursery group.

**Sources:** Same as: `@typescript-eslint/explicit-member-accessibility`

TypeScript allows placing explicit `public`, `protected`, and `private` accessibility modifiers in front of class members. The modifiers exist solely in the type system and serve to describe who is allowed to access those members. Leaving off accessibility modifiers makes for less code to read and write. Members are public by default. However, adding consistent accessibility modifiers can be helpful in codebases with many classes for enforcing proper privacy of members. Some developers also find it preferable for code readability to keep member publicity explicit.

## Examples

### Invalid

The following patterns are considered incorrect code with the default options `noPublic`:

```js
class Animal {
  public constructor(
    public breed,
    name,
  ) {
    this.animalName = name;
  }
  public animalName: string; 
  public get name(): string {
    return this.animalName;
  }
  public set name(value: string) {
    this.animalName = value;
  }
  public walk() {
  }
}
```

The following patterns are considered incorrect code with the accessibility set to `explicit`:

```ts
class Animal {
  constructor(
    public breed,
    name,
  ) {
    this.animalName = name;
  }
  private animalName: string; 
  public get name(): string {
    return this.animalName;
  }
  public set name(value: string) {
    this.animalName = value;
  }
  protected walk() {
  }
}
```

The following patterns are considered incorrect code with the accessibility set to `none`:

```ts
class Animal {
  constructor(
    protected breed,
    name,
  ) {
    this.name = name;
  }
  private animalName: string; 
  get name(): string {
    return this.animalName;
  }
  set name(value: string) {
    this.animalName = value;
  }
  protected walk() {
  }
}
```

### Valid

The following patterns are considered correct code with the default options `noPublic`:

```ts
class Animal {
  constructor(
    public breed,
    name,
  ) {
    this.animalName = name;
  }
  private animalName: string; 
  get name(): string {
    return this.animalName;
  }
  set name(value: string) {
    this.animalName = value;
  }
  protected walk() {
  }
}
```

The following patterns are considered correct code with the accessibility set to `explicit`:

```ts
class Animal {
  public constructor(
    public breed,
    name,
  ) {
    this.animalName = name;
  }
  private animalName: string; 
  public get name(): string {
    return this.animalName;
  }
  public set name(value: string) {
    this.animalName = value;
  }
  protected walk() {
  }
}
```

The following patterns are considered correct code with the accessibility set to `none`:

```ts
class Animal {
  constructor(
    breed,
    name,
  ) {
    this.name = name;
  }
  animalName: string; 
  get name(): string {
    return this.animalName;
  }
  set name(value: string) {
    this.animalName = value;
  }
  walk() {
  }
}
```

## Options

The rule supports the following options:

```json
{
    "//": "...",
    "options": {
        "accessibility": "explicit"
    }
}
```

### `accessibility`

This option determines the required accessibility modifiers on class properties and methods. It can be set to one of the following values:

- `noPublic` - forbid the use of public (a safe fix will remove it).
- `explicit` - requires an accessibility modifier for every member that allows that (a safe fix will add public).
- `none` - forbid all accessibility modifiers (public, protected, private).

**Default:** `noPublic`.

## Related links

- Disable a rule
- Configure the rule fix
- Rule options