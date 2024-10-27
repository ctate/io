# Handling User Interaction

Handle user interaction in your application. The ability to manage user interaction is crucial for building dynamic applications. This guide focuses on event handling.

## Event Handling

To add an event handler to an element:

1. Add an attribute with the event's name in parentheses.
2. Specify the JavaScript statement to execute when the event fires.

Example:

```angular-html
<button (click)="save()">Save</button>
```

To create a button that runs a `transformText` function on a `click` event:

```angular-ts
// text-transformer.component.ts
@Component({
  standalone: true,
  selector: 'text-transformer',
  template: `
    <p>{{ announcement }}</p>
    <button (click)="transformText()">Abracadabra!</button>
  `,
})
export class TextTransformer {
  announcement = 'Hello again Angular!';

  transformText() {
    this.announcement = this.announcement.toUpperCase();
  }
}
```

Other common event listeners:

```angular-html
<input (keyup)="validateInput()" />
<input (keydown)="updateInput()" />
```

### $event

To access the event object, Angular provides an implicit `$event` variable that can be passed to a function:

```angular-html
<button (click)="createUser($event)">Submit</button>
```

## Next Step

For more information, refer to Sharing Logic at essentials/sharing-logic.