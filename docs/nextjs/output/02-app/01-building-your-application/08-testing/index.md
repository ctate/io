# Testing

Learn how to set up Next.js with four commonly used testing tools — Cypress, Playwright, Vitest, and Jest.

In React and Next.js, there are different types of tests, each with its own purpose and use cases. This document provides an overview of the types and commonly used tools for testing your application.

## Types of Tests

- **Unit Testing**: Tests individual units (or blocks of code) in isolation. In React, a unit can be a single function, hook, or component.
  - **Component Testing**: A focused version of unit testing where the primary subject is React components. This includes testing component rendering, interaction with props, and behavior in response to user events.
  - **Integration Testing**: Tests how multiple units work together, combining components, hooks, and functions.
- **End-to-End (E2E) Testing**: Tests user flows in an environment that simulates real user scenarios, like the browser. This includes testing specific tasks (e.g., signup flow) in a production-like environment.
- **Snapshot Testing**: Captures the rendered output of a component and saves it to a snapshot file. During tests, the current rendered output is compared against the saved snapshot, with changes indicating unexpected behavior.

## Async Server Components

Since `async` Server Components are new to the React ecosystem, some tools do not fully support them. It is recommended to use **End-to-End Testing** over **Unit Testing** for `async` components.

## Guides

Refer to the guides to learn how to set up Next.js with these commonly used testing tools.