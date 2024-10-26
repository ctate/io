# noRestrictedImports

Disallow specified modules when loaded by import or require.

## Diagnostic Category
lint/nursery/noRestrictedImports

## Since
v1.6.0

This rule is part of the nursery group.

## Sources
- Same as: no-restricted-imports
- Same as: @typescript-eslint/no-restricted-imports

## Options
```json
{
    "noRestrictedImports": {
        "options": {
            "paths": {
                "lodash": "Using lodash is not encouraged",
                "underscore": "Using underscore is not encouraged"
            }
        }
    }
}
```

## Related links
- Disable a rule
- Configure the rule fix
- Rule options