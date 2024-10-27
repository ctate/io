# useSortedClasses

Enforce the sorting of CSS utility classes.

**Diagnostic Category:** `lint/nursery/useSortedClasses`

**Since:** `v1.6.0`

**Note:** This rule has an **unsafe** fix.

**Caution:** This rule is part of the nursery group.

This rule implements the same sorting algorithm as Tailwind CSS but supports any utility class framework including UnoCSS. It is analogous to `prettier-plugin-tailwindcss`.

## Important notes

This rule is a work in progress and is only partially implemented. Progress is being tracked in the following GitHub issue: github.com/biomejs/biome/issues/1274

Currently, utility class sorting is **not part of the formatter** and is implemented as a linter rule instead, with an automatic fix. The fix is classified as unsafe, meaning it won't be applied automatically as part of IDE actions such as "fix on save".

Feedback on this rule is appreciated, and users are encouraged to try it out and report any issues.

**Please read this entire documentation page before reporting an issue.**

Notably, the following features are not supported yet:

- Screen variant sorting (e.g., `md:`, `max-lg:`). Only static, dynamic, and arbitrary variants are supported.
- Custom utilities and variants (such as those introduced by Tailwind CSS plugins). Only the default Tailwind CSS configuration is supported.
- Options such as `prefix` and `separator`.
- Object properties (e.g., in `clsx` calls).

Please do not report issues about these features.

## Examples

### Invalid

```jsx
<div class="px-2 foo p-4 bar" />;
```

**Error:** These CSS classes should be sorted.

**Unsafe fix:** Sort the classes.

```jsx
<div class="foo p-4 px-2 bar" />;
```

```jsx
<div class="hover:focus:m-2 foo hover:px-2 p-4">
```

**Error:** expected `<` but instead the file ends.

## Options

### Code-related

```json
{
    "options": {
        "attributes": ["classList"],
        "functions": ["clsx", "cva", "tw"]
    }
}
```

#### attributes

Classes in the `class` and `className` JSX attributes are always sorted. Use this option to add more attributes that should be sorted.

#### functions

If specified, strings in the indicated functions will be sorted. This is useful when working with libraries like clsx or cva.

Tagged template literals are also supported.

### Sort-related

**Caution:** At the moment, this rule does not support customizing the sort options. The default Tailwind CSS configuration is hard-coded.

## Differences with Prettier

The main difference is that Tailwind CSS and its Prettier plugin read and execute the `tailwind.config.js` file, which Biome cannot do. Instead, Biome implements a simpler version of the configuration.

### Values are not known

The rule has no knowledge of values such as colors, font sizes, or spacing values. This leads to potential false positives and no distinction between different utilities that share the same prefix.

### Custom additions must be specified

The built-in Tailwind CSS preset contains the set of utilities and variants available with the default configuration. In Biome, these need to be manually specified in the configuration file to extend the preset.

### Presets can't be modified

In Tailwind CSS, core plugins can be disabled. In Biome, there is no way to disable parts of a preset.

### Whitespace is collapsed

The Tailwind CSS Prettier plugin preserves all original whitespace. This rule collapses all whitespace into single spaces.

Feedback on this behavior is welcome.

## Related links

- Disable a rule
- Configure the rule fix
- Rule options