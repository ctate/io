# Render templates from a parent component with `ng-content`

`<ng-content>` is a special element that accepts markup or a template fragment, controlling how components render content without creating a real DOM element.

## Example: BaseButton Component

```angular-ts
// ./base-button/base-button.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'button[baseButton]',
  standalone: true,
  template: `
      <ng-content />
  `,
})
export class BaseButton {}
```

## Example: App Component

```angular-ts
// ./app.component.ts
import { Component } from '@angular/core';
import { BaseButton } from './base-button/base-button.component.ts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BaseButton],
  template: `
    <button baseButton>
      Next <span class="icon arrow-right" />
    </button>
  `,
})
export class AppComponent {}
```

For more detail, check out the `<ng-content> in-depth guide` at https://angular.io/guide/components/content-projection for other ways to leverage this pattern.