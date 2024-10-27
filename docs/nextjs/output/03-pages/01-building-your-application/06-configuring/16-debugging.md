# Debugging

Learn how to debug your Next.js application with VS Code or Chrome DevTools.

## Debugging with VS Code

1. Open your Next.js project in VS Code.
2. Go to the Debug view by clicking on the Debug icon in the Activity Bar on the side of the window.
3. Click on the gear icon to configure a launch.json file.
4. Select "Node.js" as the environment.
5. Add the following configuration:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Next.js",
  "skipFiles": ["<node_internals>/**"],
  "program": "${workspaceFolder}/node_modules/.bin/next",
  "args": ["dev"],
  "cwd": "${workspaceFolder}",
  "runtimeArgs": ["--inspect-brk"],
  "port": 9229
}
```

6. Set breakpoints in your code by clicking in the gutter next to the line numbers.
7. Start debugging by selecting the configuration and clicking the green play button.

## Debugging with Chrome DevTools

1. Start your Next.js application in development mode using `npm run dev`.
2. Open Chrome and navigate to `chrome://inspect`.
3. Click on "Configure" and ensure your target port (default is 9229) is listed.
4. Click on "Open dedicated DevTools for Node".
5. Set breakpoints in your code directly in the Sources panel.
6. Use the Console panel to log messages and inspect variables.

## Tips

- Use the `debugger;` statement in your code to trigger breakpoints programmatically.
- Check the terminal for any error messages that may help in debugging.
- Utilize the React Developer Tools extension for additional debugging capabilities in React components.