# Fast Refresh

Fast Refresh is a hot module reloading experience that provides instantaneous feedback on edits made to React components. It is integrated into Next.js and is enabled by default in all Next.js applications on version 9.4 or newer. Most edits should be visible within a second.

## How It Works

- Editing a file that only exports React components updates the code for that file and re-renders the component. You can modify styles, rendering logic, event handlers, or effects.
- Editing a file with non-React component exports re-runs that file and any files importing it. For example, editing `theme.js` will update both `Button.js` and `Modal.js` if they import it.
- Editing a file imported by non-React components results in a full reload. To avoid this, consider separating constants into a different file.

## Error Resilience

### Syntax Errors

Fixing a syntax error during development will automatically remove the error without needing to reload the app. Component state will not be lost.

### Runtime Errors

Runtime errors inside a component trigger a contextual overlay. Fixing the error dismisses the overlay without reloading the app. Component state is retained unless the error occurs during rendering, in which case React will remount the application.

Error boundaries can help manage rendering errors and prevent resets to the root app state. They should be designed intentionally and not be overly granular.

## Limitations

Fast Refresh preserves local React state in function components and Hooks, but not in class components. Local state may reset due to:

- Other exports in the file besides a React component.
- Exporting a higher-order component that returns a class.
- Using anonymous arrow functions.

As more code transitions to function components and Hooks, state preservation will improve.

## Tips

- Fast Refresh preserves local state in function components and Hooks by default.
- To force a state reset and remount a component, add `// @refresh reset` in the file.
- Use `console.log` or `debugger;` for debugging during development.
- Imports are case sensitive; mismatches can cause refresh failures.

## Fast Refresh and Hooks

Fast Refresh attempts to preserve the state of components between edits. `useState` and `useRef` maintain their previous values unless their arguments or order change. Hooks with dependencies, like `useEffect`, `useMemo`, and `useCallback`, will always update during Fast Refresh, ignoring their dependency lists.

Unexpected results may occur, such as `useEffect` re-running even with an empty dependency array. Writing resilient code for `useEffect` is a good practice, making it easier to introduce new dependencies later, and is enforced by React Strict Mode, which is recommended.