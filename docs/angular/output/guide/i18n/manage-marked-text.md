# Manage marked text with custom IDs

The Angular extractor generates a file with a translation unit entry for:

- Each `i18n` attribute in a component template
- Each `$localize` tagged message string in component code

Angular assigns each translation unit a unique ID. When translatable text changes, a new ID is generated to keep the text change in sync with translations. However, some translation systems require specific ID formats. To use a custom ID, prefix it with `@@`.

### Example of Custom ID in `i18n` Attribute

```html
<!-- Example of defining a custom ID in a heading element -->
<docs-code header="app/app.component.html" path="adev/src/content/examples/i18n/doc-files/app.component.html" visibleRegion="i18n-attribute-solo-id"/>
```

### Example of Custom ID in Variable

```typescript
variableText1 = $localize`:@@introductionHeader:Hello i18n!`;
```

When a custom ID is specified, the extractor generates a translation unit with that ID. Changing the text does not change the ID, which may lead to translations being out-of-sync.

### Use a Custom ID with a Description

Combining a custom ID with a description helps translators.

```html
<!-- Example of custom ID with description -->
<docs-code header="app/app.component.html" path="adev/src/content/examples/i18n/doc-files/app.component.html" visibleRegion="i18n-attribute-id"/>
```

```typescript
variableText2 = $localize`:An introduction header for this sample@@introductionHeader:Hello i18n!`;
```

### Adding Meaning to Custom ID

```html
<!-- Example of custom ID with meaning -->
<docs-code header="app/app.component.html" path="adev/src/content/examples/i18n/doc-files/app.component.html" visibleRegion="i18n-attribute-meaning-and-id"/>
```

```typescript
variableText3 = $localize`:site header|An introduction header for this sample@@introductionHeader:Hello i18n!`;
```

### Define Unique Custom IDs

Ensure custom IDs are unique. Using the same ID for different text elements results in only the first being extracted, causing both to use the same translation.

```html
<!-- Example of duplicate custom ID -->
<docs-code header="app/app.component.html" path="adev/src/content/examples/i18n/doc-files/app.component.html" visibleRegion="i18n-duplicate-custom-id"/>
```

Both elements will use the same translation (e.g., `Bonjour`).

```html
<docs-code path="adev/src/content/examples/i18n/doc-files/rendered-output.html"/>
```

For more information, refer to the following resources:
- $localize | init - localize - API | Angular
- How meanings control text extraction and merges - Prepare components for translations | Angular