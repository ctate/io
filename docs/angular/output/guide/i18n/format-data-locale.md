# Format data based on locale

Angular provides built-in data transformation pipes for formatting data based on locale rules.

**Data transformation pipes:**

- **DatePipe**: Formats a date value.
- **CurrencyPipe**: Transforms a number into a currency string.
- **DecimalPipe**: Transforms a number into a decimal number string.
- **PercentPipe**: Transforms a number into a percentage string.

## Use DatePipe to display the current date

To display the current date in the format for the current locale, use:

```typescript
{{ today | date }}
```

## Override current locale for CurrencyPipe

To override the current value of the `LOCALE_ID` token, add the `locale` parameter to the pipe. For American English (`en-US`), use:

```typescript
{{ amount | currency : 'en-US' }}
```

**Note**: The locale specified for the `CurrencyPipe` overrides the global `LOCALE_ID` token of your application.

## What's next

Prepare component for translation: guide/i18n/prepare

**References**:
- CurrencyPipe: api/common/CurrencyPipe
- DatePipe: api/common/DatePipe
- DecimalPipe: api/common/DecimalPipe
- PercentPipe: api/common/PercentPipe
- LOCALE_ID: api/core/LOCALE_ID