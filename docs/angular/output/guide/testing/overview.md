# Testing

Testing your Angular application ensures it functions as expected.

## Set up testing

The Angular CLI installs everything needed to test an Angular application with the Jasmine testing framework.

The project created with the CLI is ready to test. Run the `ng test` command:

```
ng test
```

The `ng test` command builds the application in *watch mode* and launches the Karma test runner.

Console output example:

```
02 11 2022 09:08:28.605:INFO [karma-server]: Karma v6.4.1 server started at http://localhost:9876/
02 11 2022 09:08:28.607:INFO [launcher]: Launching browsers Chrome with concurrency unlimited
02 11 2022 09:08:28.620:INFO [launcher]: Starting browser Chrome
02 11 2022 09:08:31.312:INFO [Chrome]: Connected on socket -LaEYvD2R7MdcS0-AAAB with id 31534482
Chrome: Executed 3 of 3 SUCCESS (0.193 secs / 0.172 secs)
TOTAL: 3 SUCCESS
```

The last line indicates that all three tests passed. Test output is displayed in the browser using the Karma Jasmine HTML Reporter.

Click on a test row to re-run that test or on a description to re-run tests in the selected test group ("test suite"). The `ng test` command watches for changes, automatically re-running tests when you save changes to files like `app.component.ts`.

## Configuration

The Angular CLI manages Jasmine and Karma configuration based on options in the `angular.json` file. To customize Karma, create a `karma.conf.js` with:

```
ng generate config karma
```

For more on Karma configuration, refer to the Karma configuration guide.

### Other test frameworks

You can unit test an Angular application with other testing libraries and runners, each with its own installation procedures and syntax.

### Test file name and location

The Angular CLI generates a test file for the `AppComponent` named `app.component.spec.ts` in the `src/app` folder. The test file extension must be `.spec.ts` for tooling to recognize it as a test file.

Place your spec file next to the file it tests. This practice makes tests easy to find and maintain.

#### Place your spec files in a test folder

For application integration specs that test interactions across multiple parts, create a dedicated folder in the `tests` directory. Specs for test helpers should be in the `test` folder next to their corresponding helper files.

## Testing in continuous integration

To ensure your project remains bug-free, set up a test suite that runs on every commit and pull request using Continuous Integration (CI) servers. To test your Angular CLI application in CI, run:

```
ng test --no-watch --no-progress --browsers=ChromeHeadless
```

## More information on testing

After setting up your application for testing, the following guides may be useful:

- Code coverage: How much of your app your tests cover and how to specify required amounts.
- Testing services: How to test the services your application uses.
- Basics of testing components: Fundamentals of testing Angular components.
- Component testing scenarios: Various component testing scenarios and use cases.
- Testing attribute directives: How to test your attribute directives.
- Testing pipes: How to test pipes.
- Debugging tests: Common testing bugs.
- Testing utility APIs: Angular testing features.