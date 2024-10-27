# Debugging

Learn how to debug your Next.js application with VS Code or Chrome DevTools.

This documentation explains how to debug your Next.js frontend and backend code with full source maps support using either the VS Code debugger or Chrome DevTools.

Any debugger that can attach to Node.js can also be used to debug a Next.js application. More details can be found in the Node.js Debugging Guide.

## Debugging with VS Code

Create a file named `.vscode/launch.json` at the root of your project with the following content:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    },
    {
      "name": "Next.js: debug full stack",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/next",
      "runtimeArgs": ["--inspect"],
      "skipFiles": ["<node_internals>/**"],
      "serverReadyAction": {
        "action": "debugWithEdge",
        "killOnServerStop": true,
        "pattern": "- Local:.+(https?://.+)",
        "uriFormat": "%s",
        "webRoot": "${workspaceFolder}"
      }
    }
  ]
}
```

`npm run dev` can be replaced with `yarn dev` or `pnpm dev`. If you're changing the port number, replace `3000` in `http://localhost:3000` with your port. If running Next.js from a directory other than root, add `cwd` to the server-side and full stack debugging tasks.

Go to the Debug panel, select a launch configuration, then press `F5` or select **Debug: Start Debugging** from the Command Palette to start your debugging session.

## Using the Debugger in Jetbrains WebStorm

Click the drop-down menu listing the runtime configuration, and click `Edit Configurations...`. Create a `JavaScript Debug` configuration with `http://localhost:3000` as the URL. Customize as needed and click `OK`. Run this configuration to open the selected browser.

## Debugging with Chrome DevTools

### Client-side code

Start your development server by running `next dev`, `npm run dev`, or `yarn dev`. Open `http://localhost:3000` in Chrome, then open Chrome's Developer Tools and go to the **Sources** tab. When your client-side code reaches a `debugger` statement, execution will pause, and you can set breakpoints manually.

### Server-side code

To debug server-side Next.js code, pass the `--inspect` flag to the Node.js process:

```bash
NODE_OPTIONS='--inspect' next dev
```

If using `npm run dev` or `yarn dev`, update the `dev` script in your `package.json`:

```json
{
  "scripts": {
    "dev": "NODE_OPTIONS='--inspect' next dev"
  }
}
```

Once the server starts, visit `chrome://inspect` in Chrome to see your Next.js application in the **Remote Target** section. Click **inspect** to open a separate DevTools window.

### Inspect Server Errors with Chrome DevTools

When encountering an error, inspect the source code to trace the root cause. Next.js displays a Node.js logo on the dev overlay. Clicking it copies the Chrome DevTool URL to the clipboard, allowing you to inspect the Next.js server process.

### Debugging on Windows

Windows users may encounter issues with `NODE_OPTIONS='--inspect'`. Install the `cross-env` package and replace the `dev` script:

```json
{
  "scripts": {
    "dev": "cross-env NODE_OPTIONS='--inspect' next dev"
  }
}
```

`cross-env` sets the `NODE_OPTIONS` environment variable across platforms. Ensure Windows Defender is disabled to avoid increased Fast Refresh time.

## More information

To learn more about using a JavaScript debugger, refer to the following documentation:

- Node.js debugging in VS Code: Breakpoints
- Chrome DevTools: Debug JavaScript