# Managing Dynamic Data

Define component state and behavior to manage dynamic data.

Components encapsulate responsibility for discrete parts of your application. For example, a `SignUpForm` component might need to track whether the form is valid. The properties a component needs to track are referred to as "state."

## What is state?

State refers to the various properties that a component needs to track.

## Defining state

To define state, use class fields syntax inside your component. For example, in the `TodoListItem` component, create two properties:

1. `taskTitle` — The title of the task
2. `isComplete` — Whether the task is complete

```angular-ts
// todo-list-item.component.ts
@Component({ ... })
export class TodoListItem {
  taskTitle = '';
  isComplete = false;
}
```

## Updating state

To update state, define methods in the component class that access the class fields with the `this` keyword.

```angular-ts
// todo-list-item.component.ts
@Component({ ... })
export class TodoListItem {
  taskTitle = '';
  isComplete = false;

  completeTask() {
    this.isComplete = true;
  }

  updateTitle(newTitle: string) {
    this.taskTitle = newTitle;
  }
}
```

## Next Step

Now that you have learned how to declare and manage dynamic data, it's time to learn how to use that data inside of templates.

For more information, visit: essentials/rendering-dynamic-templates