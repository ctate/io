# Import global variants of the locale data

The Angular CLI automatically includes locale data when you run the `ng build` command with the `--localize` option.

```shell
ng build --localize
```

Note: The initial installation of Angular includes locale data for English in the United States (`en-US`). The Angular CLI sets the `LOCALE_ID` value automatically when using the `--localize` option with the `ng build` command.

The `@angular/common` package on npm contains the locale data files. Global variants of the locale data are available in `@angular/common/locales/global`.

## Import example for French

You can import the global variants for French (`fr`) in `main.ts`, where you bootstrap the application.

```typescript
// src/main.ts (import locale)
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/global/fr';

registerLocaleData(localeFr);
```

Note: In an NgModules application, you would import it in your `app.module`.

References:
- CLI Overview and Command Reference | Angular
- ng build | CLI | Angular