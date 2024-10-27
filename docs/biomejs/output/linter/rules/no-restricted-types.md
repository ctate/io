# noRestrictedTypes

**Diagnostic Category: `lint/nursery/noRestrictedTypes`**

**Since**: `v1.9.0`

:::note
- This rule has a **safe** fix.
:::

:::caution
This rule is part of the nursery group.
:::

Sources: 
- Same as: @typescript-eslint/no-restricted-types

Disallow user defined types. This rule allows you to specify type names that you don’t want to use in your application. To prevent the use of commonly misleading types, refer to noBannedTypes.

## Options

Use the options to specify additional types that you want to restrict in your source code.

```json
{
    "//": "...",
    "options": {
        "types": {
           "Foo": {
              "message": "Only bar is allowed",
              "use": "bar"
            },
            "OldAPI": "Use NewAPI instead"
        }
    }
}
```

In the example above, the rule will emit diagnostics if `Foo` or `OldAPI` are used.

## Related links

- Disable a rule
- Configure the rule fix
- Rule options