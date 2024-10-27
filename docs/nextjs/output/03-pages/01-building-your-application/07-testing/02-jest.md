# Setting up Jest with Next.js

Learn how to set up Next.js with Jest for Unit Testing.

## Introduction

Jest is a delightful JavaScript testing framework with a focus on simplicity. It works well with Next.js applications for unit testing.

## Installation

To get started, install Jest and its dependencies:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

## Configuration

Create a `jest.config.js` file in the root of your project:

```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
```

## Setup File

Create a `jest.setup.js` file in the root of your project:

```javascript
import '@testing-library/jest-dom/extend-expect';
```

## Writing Tests

Create a `__tests__` directory in your component folder. Inside, create a test file for your component, e.g., `MyComponent.test.js`:

```javascript
import { render, screen } from '@testing-library/react';
import MyComponent from '../MyComponent';

test('renders MyComponent', () => {
  render(<MyComponent />);
  const linkElement = screen.getByText(/my component/i);
  expect(linkElement).toBeInTheDocument();
});
```

## Running Tests

Run your tests using the following command:

```bash
npm test
```

## Conclusion

You have successfully set up Jest with Next.js for unit testing. You can now write and run tests for your components to ensure they work as expected.