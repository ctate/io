# Installation

Get started with Angular quickly with online starters or locally with your terminal.

## Play Online

If you want to experiment with Angular in your browser without setting up a project, use our online sandbox:

- Open on Playground: The fastest way to play with an Angular app. No setup required.

## Setup a new project locally

If you're starting a new project, creating a local project allows you to use tools like Git.

### Prerequisites

- **Node.js** - v18.19.1 or newer
- **Text editor** - Recommended: Visual Studio Code
- **Terminal** - Required for running Angular CLI commands

### Instructions

Follow this guide to set up a local Angular project.

#### Install Angular CLI

Open a terminal (in Visual Studio Code, use the integrated terminal) and run:

```
npm install -g @angular/cli
```

For issues on Windows or Unix, check the CLI docs for more info.

#### Create a new project

In your terminal, run the CLI command `ng new` with your desired project name (e.g., `my-first-angular-app`):

```
ng new <project-name>
```

You'll see configuration options for your project. Use the arrow and enter keys to navigate. Press enter to accept default options.

After setup, you should see:

```
✔ Packages installed successfully.
    Successfully initialized git.
```

#### Running your new project locally

Switch to your new Angular project:

```
cd my-first-angular-app
```

All dependencies should be installed. Start your project with:

```
npm start
```

If successful, you'll see:

```
Watch mode enabled. Watching for file changes...
  ➜  Local:   http://localhost:4200/
  ➜  press h + enter to show help
```

Visit the path in `Local` (e.g., `http://localhost:4200`) to see your application. Happy coding! 🎉

## Next steps

Now that you've created your Angular project, learn more about Angular in our Essentials guide or choose a topic in our in-depth guides!