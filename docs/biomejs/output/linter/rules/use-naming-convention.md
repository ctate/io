# useNamingConvention

Enforce naming conventions for everything across a codebase.

**Diagnostic Category:** `lint/style/useNamingConvention`

**Since:** `v1.0.0`

**Note:** This rule has a **safe** fix.

**Sources:** Inspired from: `@typescript-eslint/naming-convention`

Enforcing naming conventions helps to keep the codebase consistent and reduces overhead when thinking about the name case of a variable.

## Naming conventions

All names can be prefixed and suffixed by underscores `_` and dollar signs `$`.

### Variable and parameter names

All variables and function parameters are in `camelCase` or `PascalCase`. Catch parameters are in `camelCase`.

Additionally, global variables declared as `const` or `var` may be in `CONSTANT_CASE`. Global variables are declared at module or script level. Variables declared in a TypeScript `namespace` are also considered global.

**Examples of incorrect names:**

```js
let a_value = 0;
```

**Fixable Example:**

```js
const fooYPosition = 0;
```

### Function names

- A `function` name is in `camelCase` or `PascalCase`.
- A global `function` can also be in `UPPERCASE`.

### TypeScript `enum` names

A TypeScript `enum` name is in `PascalCase`. Enum members are by default in `PascalCase`.

### Classes

- A class name is in `PascalCase`.
- Static property and static getter names are in `camelCase` or `CONSTANT_CASE`.
- Class property and method names are in `camelCase`.

### TypeScript `type` aliases and `interface`

- A `type` alias or an interface name are in `PascalCase`.
- Member names of a type are in `camelCase`.
- `readonly` property and getter names can also be in `CONSTANT_CASE`.

**Example of an incorrect type alias:**

```ts
type person = { fullName: string };
```

### Literal object member names

- Literal object members are in `camelCase`.

### Import and export aliases and namespaces

Import and export namespaces are in `camelCase` or `PascalCase`. Import and export aliases are in `camelCase`, `PascalCase`, or `CONSTANT_CASE`.

### TypeScript type parameter names

A TypeScript type parameter name is in `PascalCase`.

### TypeScript `namespace` names

A TypeScript namespace name is in `camelCase` or `PascalCase`.

## Ignored declarations

Some declarations are always ignored, including:

- Member names that are not identifiers
- Named imports
- Destructured object properties
- Class members marked with `override`
- Declarations inside an external TypeScript module

## Options

The rule provides several options:

```json
{
    "options": {
        "strictCase": false,
        "requireAscii": true,
        "enumMemberCase": "CONSTANT_CASE",
        "conventions": [
            {
                "selector": {
                    "kind": "memberLike",
                    "modifiers": ["private"]
                },
                "match": "_(.+)",
                "formats": ["camelCase"]
            }
        ]
    }
}
```

### strictCase

When set to `true`, it forbids consecutive uppercase characters in `camelCase` and `PascalCase`. Default: `true`.

### requireAscii

When set to `true`, it forbids names that include non-ASCII characters. Default: `false`.

### enumMemberCase

By default, an enum member is in `PascalCase`. You can enforce another convention by setting `enumMemberCase`. This option will be deprecated in the future.

### conventions

The `conventions` option allows applying custom conventions. Each convention includes a `selector` and one or more requirements (`match` and `formats`).

## Regular expression syntax

The `match` option supports various syntaxes including greedy and non-greedy quantifiers, character classes, alternations, and capturing groups.

## Related links

- Disable a rule
- Configure the rule fix
- Rule options