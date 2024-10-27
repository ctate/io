# Custom events with outputs

Tip: This guide assumes you've already read the Essentials Guide. Read that first if you're new to Angular.

Angular components can define custom events by assigning a property to a new `EventEmitter` and adding the `@Output` decorator:

```typescript
@Component({...})
export class ExpandablePanel {
  @Output() panelClosed = new EventEmitter<void>();
}
```

```angular-html
<expandable-panel (panelClosed)="savePanelState()" />
```

You can emit an event by calling the `emit` method on the `EventEmitter`:

```typescript
this.panelClosed.emit();
```

Angular refers to properties marked with the `@Output` decorator as **outputs**. Outputs can pass data to other components, similar to native browser events like `click`.

**Angular custom events do not bubble up the DOM.**

**Output names are case-sensitive.**

When extending a component class, **outputs are inherited by the child class.**

## Emitting event data

You can pass event data when calling `emit`:

```typescript
// Emit primitive values.
this.valueChanged.emit(7);

// Emit custom event objects
this.thumbDropped.emit({
  pointerX: 123,
  pointerY: 456,
});
```

In a template, access the event data from the `$event` variable:

```angular-html
<custom-slider (valueChanged)="logValue($event)" />
```

## Customizing output names

The `@Output` decorator accepts a parameter to specify a different name for the event in a template:

```typescript
@Component({...})
export class CustomSlider {
  @Output('valueChanged') changed = new EventEmitter<number>();
}
```

```angular-html
<custom-slider (valueChanged)="saveVolume()" />
```

This alias does not affect usage of the property in TypeScript code. Avoid aliasing outputs for components unless necessary to preserve an alias for the original name or to avoid collisions with native DOM events.

## Specify outputs in the `@Component` decorator

You can specify a component's outputs with the `outputs` property in the `@Component` decorator, useful when inheriting a property from a base class:

```typescript
// `CustomSlider` inherits the `valueChanged` property from `BaseSlider`.
@Component({
  ...,
  outputs: ['valueChanged'],
})
export class CustomSlider extends BaseSlider {}
```

You can specify an output alias in the `outputs` list by using a colon:

```typescript
// `CustomSlider` inherits the `valueChanged` property from `BaseSlider`.
@Component({
  ...,
  outputs: ['valueChanged: volumeChanged'],
})
export class CustomSlider extends BaseSlider {}
```

## Choosing event names

Avoid output names that collide with events on DOM elements like HTMLElement to prevent confusion. 

Do not add prefixes for component outputs, as any custom properties can be assumed to belong to the component.

Always use camelCase output names and avoid prefixing output names with "on".