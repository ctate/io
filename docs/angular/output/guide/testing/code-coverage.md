# Find out how much code you're testing

The Angular CLI can run unit tests and generate code coverage reports, highlighting untested parts of your code base.

To generate a coverage report, run the following command in your project root:

```
ng test --no-watch --code-coverage
```

After the tests complete, a new `/coverage` directory will be created. Open the `index.html` file to view the report with your source code and coverage values.

To create coverage reports automatically with each test, set the following option in the Angular CLI configuration file, `angular.json`:

```json
"test": {
  "options": {
    "codeCoverage": true
  }
}
```

## Code coverage enforcement

Code coverage percentages help estimate how much of your code is tested. To enforce a minimum coverage percentage, modify the Karma test platform configuration file, `karma.conf.js`, by adding the `check` property in the `coverageReporter:` key.

Example for a minimum of 80% code coverage:

```javascript
coverageReporter: {
  dir: require('path').join(__dirname, './coverage/<project-name>'),
  subdir: '.',
  reporters: [
    { type: 'html' },
    { type: 'text-summary' }
  ],
  check: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    }
  }
}
```

The `check` property enforces a minimum of 80% code coverage during unit tests.

For more information, refer to the testing guide for Karma configuration and the karma coverage documentation.