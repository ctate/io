# Using a pipe in a template

To apply a pipe, use the pipe operator (`|`) within a template expression as shown in the following code example.

```html
<p>The hero's birthday is {{ birthday | date }}</p>
```

The component's `birthday` value flows through the pipe operator (`|`) to the `DatePipe`, whose pipe name is `date`. The pipe renders the date in the default format like **Apr 07, 2023**.

```typescript
import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  standalone: true,
  templateUrl: './app.component.html',
  imports: [DatePipe],
})
export class AppComponent {
  birthday = new Date();
}
```

## Additional parameters for pipes

Pipes can take additional parameters that configure the transformation. Parameters can be optional or required.

For example, the `date` pipe takes optional parameters that control the date's display format. To specify the parameter, follow the pipe name with a colon (`:`) and the parameter value (the format).

```html
<p>The hero's birthday is in {{ birthday | date:'yyyy' }}</p>
```

Pipes can also take multiple parameters. You can pass multiple parameters by separating them via colons (`:`). For example, the `date` pipe accepts a second optional parameter for controlling the timezone.

```html
<p>The current time is: {{ currentTime | date:'hh:mm':'UTC' }}</p>
```

This will display the current time (like `10:53`) in the `UTC` timezone.

## Chaining pipes

You can connect multiple pipes so that the output of one pipe becomes the input to the next.

The following example passes a date to the `DatePipe` and then forwards the result to the `UpperCasePipe`.

```html
<p>The hero's birthday is {{ birthday | date }}</p>
<p>The hero's birthday is in {{ birthday | date:'yyyy' | uppercase }}</p>
```