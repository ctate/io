# noConstEnum

Disallow TypeScript `const enum`

Const enums are enums that should be inlined at use sites.
Const enums are not supported by bundlers and are incompatible with the `isolatedModules` mode.
Their use can lead to import nonexistent values (because const enums are erased).

Thus, library authors and bundler users should not use const enums.

## Examples

### Invalid

```ts
const enum Status {
  Open,
  Close,
}
```

### Error Message

lint/suspicious/noConstEnum 
 FIXABLE 
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 ✖ The enum declaration should not be const
  1 │ const enum Status {
   │               ^
  ℹ Const enums are not supported by bundlers and are incompatible with the 'isolatedModules' mode. Their use can lead to import inexistent values.
  ℹ See TypeScript Docs for more details.
  ℹ Safe fix: Turn the const enum into a regular enum.

### Valid

```ts
enum Status {
  Open,
  Close,
}
```

## Related links

- Disable a rule
- Configure the rule fix
- Rule options