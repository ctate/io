# Quickstart

Learn how to set up a new Effect project from scratch in TypeScript, covering Node.js, Deno, Bun, and Vite + React environments. Follow step-by-step instructions for each platform to create a basic program using the Effect library.

In this tutorial, we will guide you through the process of setting up a new Effect project from scratch using plain TypeScript 5.4 or newer.

## Node.js

Follow these steps to create a new Effect project for Node.js:

1. Create a project directory and navigate into it:

   ```bash
   mkdir hello-effect
   cd hello-effect
   ```

2. Initialize a TypeScript project using npm (ensure TypeScript 5.0 or newer is installed):

   ```bash
   npm init -y
   npm install typescript --save-dev
   ```

3. Initialize TypeScript:

   ```bash
   npx tsc --init
   ```

   Open the `tsconfig.json` file and set the `strict` option to `true`:

   ```json
   {
     "compilerOptions": {
       "strict": true
     }
   }
   ```

4. Install the necessary package as a dependency:

   ```bash
   npm install effect
   ```

5. Create a simple program:

   ```bash
   mkdir src
   touch src/index.ts
   ```

   Add the following code to `index.ts`:

   ```ts
   import { Effect, Console } from "effect"

   const program = Console.log("Hello, World!")

   Effect.runSync(program)
   ```

6. Run the program:

   ```bash
   npx tsx src/index.ts
   ```

   You should see the message "Hello, World!" printed.

## Deno

Follow these steps to create a new Effect project for Deno:

1. Create a project directory and navigate into it:

   ```bash
   mkdir hello-effect
   cd hello-effect
   ```

2. Initialize Deno:

   ```bash
   deno init
   ```

3. Create a simple program by replacing the content of `main.ts` with:

   ```ts
   import { Effect, Console } from "npm:effect"

   const program = Console.log("Hello, World!")

   Effect.runSync(program)
   ```

4. Run the program:

   ```bash
   deno run main.ts
   ```

   You should see the message "Hello, World!" printed.

## Bun

Follow these steps to create a new Effect project for Bun:

1. Create a project directory and navigate into it:

   ```bash
   mkdir hello-effect
   cd hello-effect
   ```

2. Initialize Bun:

   ```bash
   bun init
   ```

   Open the `tsconfig.json` file and set the `strict` option to `true`:

   ```json
   {
     "compilerOptions": {
       "strict": true
     }
   }
   ```

3. Install the necessary package as a dependency:

   ```bash
   bun add effect
   ```

4. Create a simple program by replacing the content of `index.ts` with:

   ```ts
   import { Effect, Console } from "effect"

   const program = Console.log("Hello, World!")

   Effect.runSync(program)
   ```

5. Run the program:

   ```bash
   bun index.ts
   ```

   You should see the message "Hello, World!" printed.

## Vite + React

Follow these steps to create a new Effect project for Vite + React:

1. Scaffold your Vite project:

   ```bash
   npm create vite@latest hello-effect --template react-ts
   ```

   Navigate into the newly created project directory and install the required packages:

   ```bash
   cd hello-effect
   npm install
   ```

   Open the `tsconfig.json` file and set the `strict` option to `true`:

   ```json
   {
     "compilerOptions": {
       "strict": true
     }
   }
   ```

2. Install the necessary `effect` package as a dependency:

   ```bash
   npm install effect
   ```

3. Create a simple program by replacing the content of `src/App.tsx` with:

   ```tsx
   import { useState, useMemo, useCallback } from "react"
   import reactLogo from "./assets/react.svg"
   import viteLogo from "/vite.svg"
   import "./App.css"
   import { Effect } from "effect"

   function App() {
     const [count, setCount] = useState(0)

     const task = useMemo(
       () => Effect.sync(() => setCount((current) => current + 1)),
       [setCount]
     )

     const increment = useCallback(() => Effect.runSync(task), [task])

     return (
       <>
         <div>
           <a href="https://vitejs.dev" target="_blank">
             <img src={viteLogo} className="logo" alt="Vite logo" />
           </a>
           <a href="https://react.dev" target="_blank">
             <img src={reactLogo} className="logo react" alt="React logo" />
           </a>
         </div>
         <h1>Vite + React</h1>
         <div className="card">
           <button onClick={increment}>count is {count}</button>
           <p>
             Edit <code>src/App.tsx</code> and save to test HMR
           </p>
         </div>
         <p className="read-the-docs">
           Click on the Vite and React logos to learn more
         </p>
       </>
     )
   }

   export default App
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   Press **o** to open the application in your browser. When you click the button, you should see the counter increment.