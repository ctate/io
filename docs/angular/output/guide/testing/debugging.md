# Debugging tests

If your tests aren't working as expected, you can inspect and debug them in the browser.

Debug specs in the browser similarly to how you debug an application:

1. Reveal the Karma browser window. See "Set up testing" if you need help with this step.
2. Click the **DEBUG** button to open a new browser tab and re-run the tests.
3. Open the browser's **Developer Tools**:
   - On Windows, press `Ctrl-Shift-I`.
   - On macOS, press `Command-Option-I`.
4. Select the **Sources** section.
5. Press `Control/Command-P`, then start typing the name of your test file to open it.
6. Set a breakpoint in the test.
7. Refresh the browser, and it will stop at the breakpoint.

![Karma debugging](assets/images/guide/testing/karma-1st-spec-debug.png)