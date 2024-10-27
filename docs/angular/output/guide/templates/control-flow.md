# Control flow

Angular templates support control flow blocks for conditionally showing, hiding, and repeating elements. This was previously done using *ngIf, *ngFor, and *ngSwitch directives.

## Conditionally display content with `@if`, `@else-if`, and `@else`

The `@if` block displays content when its condition is truthy:

```angular-html
@if (a > b) {
  <p>{{a}} is greater than {{b}}</p>
}
```

Alternative content can be displayed using `@else if` and `@else` blocks:

```angular-html
@if (a > b) {
  {{a}} is greater than {{b}}
} @else if (b > a) {
  {{a}} is less than {{b}}
} @else {
  {{a}} is equal to {{b}}
}
```

### Referencing the conditional expression's result

The `@if` block can save the result of the conditional expression into a variable for reuse:

```angular-html
@if (user.profile.settings.startDate; as startDate) {
  {{ startDate }}
}
```

## Repeat content with the `@for` block

The `@for` block loops through a collection and renders the content repeatedly. The collection can be any JavaScript iterable, with optimizations for `Array` values.

A typical `@for` loop looks like:

```angular-html
@for (item of items; track item.id) {
  {{ item.name }}
}
```

### Importance of `track` in `@for` blocks

The `track` expression helps Angular maintain a relationship between data and DOM nodes, optimizing performance during data changes. Use a unique property like `id` or `uuid` for tracking. For static collections, use `$index`. Avoid using `identity` as it can slow down rendering.

### Contextual variables in `@for` blocks

Implicit variables available in `@for` blocks include:

| Variable | Meaning                                       |
| -------- | --------------------------------------------- |
| `$count` | Number of items in the collection             |
| `$index` | Index of the current item                     |
| `$first` | Whether the current item is the first        |
| `$last`  | Whether the current item is the last         |
| `$even`  | Whether the current index is even            |
| `$odd`   | Whether the current index is odd             |

These can be aliased using a `let` segment:

```angular-html
@for (item of items; track item.id; let idx = $index, e = $even) {
  <p>Item #{{ idx }}: {{ item.name }}</p>
}
```

### Providing a fallback for `@for` blocks with the `@empty` block

An `@empty` section can be included after the `@for` block to display content when there are no items:

```angular-html
@for (item of items; track item.name) {
  <li> {{ item.name }}</li>
} @empty {
  <li aria-hidden="true"> There are no items. </li>
}
```

## Conditionally display content with the `@switch` block

The `@switch` block provides an alternate syntax for conditional rendering, resembling JavaScript's `switch` statement:

```angular-html
@switch (userPermissions) {
  @case ('admin') {
    <app-admin-dashboard />
  }
  @case ('reviewer') {
    <app-reviewer-dashboard />
  }
  @case ('editor') {
    <app-editor-dashboard />
  }
  @default {
    <app-viewer-dashboard />
  }
}
```

The conditional expression is compared to case expressions using the triple-equals (`===`) operator. 

**`@switch` does not have fallthrough**, so no `break` or `return` is needed. A `@default` block can be included to display content if no cases match. If no matches occur and there is no `@default`, nothing is shown.