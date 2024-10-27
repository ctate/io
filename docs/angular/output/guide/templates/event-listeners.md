# Adding event listeners

Angular allows you to define event listeners in your template by specifying the event name in parentheses along with a statement that executes when the event occurs.

## Listening to native events

To add event listeners to an HTML element, wrap the event with parentheses `()`, allowing you to specify a listener statement.

```angular-ts
@Component({
  template: `
    <input type="text" (keyup)="updateField()" />
  `,
  ...
})
export class AppComponent {
  updateField(): void {
    console.log('Field is updated!');
  }
}
```

In this example, Angular calls `updateField` every time the `<input>` element emits a `keyup` event. You can add listeners for any native events, such as `click`, `keydown`, `mouseover`, etc. For more information, visit the MDN documentation on available events.

## Accessing the event argument

Angular provides a variable named `$event` in every template event listener, which contains a reference to the event object.

```angular-ts
@Component({
  template: `
    <input type="text" (keyup)="updateField($event)" />
  `,
  ...
})
export class AppComponent {
  updateField(event: KeyboardEvent): void {
    console.log(`The user pressed: ${event.key}`);
  }
}
```

## Using key modifiers

To capture specific keyboard events for a specific key, you can write code like this:

```angular-ts
@Component({
  template: `
    <input type="text" (keyup)="updateField($event)" />
  `,
  ...
})
export class AppComponent {
  updateField(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      console.log('The user pressed enter in the text field.');
    }
  }
}
```

Angular simplifies this common scenario by allowing you to filter events using the period (`.`) character:

```angular-ts
@Component({
  template: `
    <input type="text" (keyup.enter)="updateField($event)" />
  `,
  ...
})
export class AppComponent {
  updateField(event: KeyboardEvent): void {
    console.log('The user pressed enter in the text field.');
  }
}
```

You can also add additional key modifiers:

```angular-html
<!-- Matches shift and enter -->
<input type="text" (keyup.shift.enter)="updateField($event)" />
```

Supported modifiers include `alt`, `control`, `meta`, and `shift`. You can specify the key or code for keyboard events. The key and code fields are part of the browser keyboard event object. By default, event binding uses the Key values for keyboard events.

Angular also allows you to specify Code values for keyboard events using a built-in `code` suffix:

```angular-html
<!-- Matches alt and left shift -->
<input type="text" (keydown.code.alt.leftshift)="updateField($event)" />
```

This is useful for consistent handling of keyboard events across different operating systems. For example, on MacOS, the `key` property may report a modified character, while the `code` property corresponds to the physical button pressed.