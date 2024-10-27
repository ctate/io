# Creating custom route matches

The Angular Router supports a powerful matching strategy for user navigation, including static routes, variable routes with parameters, and wildcard routes. You can also create custom pattern matching for complex URLs.

In this tutorial, you'll build a custom route matcher using Angular's `UrlMatcher` to look for a Twitter handle in the URL.

## Objectives

Implement Angular's `UrlMatcher` to create a custom route matcher.

## Create a sample application

Using the Angular CLI, create a new application named *angular-custom-route-match* and a *profile* component.

1. Create a new Angular project:

    ```shell
    ng new angular-custom-route-match
    ```

    - Select `Y` for Angular routing.
    - Select `CSS` for the stylesheet format.

2. Navigate to the `angular-custom-route-match` directory.
3. Create a component named *profile*:

    ```shell
    ng generate component profile
    ```

4. Replace the content of `profile.component.html` with the provided HTML.
5. Replace the content of `app.component.html` with the provided HTML.

## Configure your routes for your application

Add routing capabilities to the `app.config.ts` file and create a custom URL matcher for Twitter handles.

1. Open `app.config.ts`.
2. Add the following import statements:

    ```ts
    import {provideRouter, withComponentInputBinding} from '@angular/router';
    import {routes} from './app.routes';
    ```

3. In the providers array, add:

    ```ts
    provideRouter(routes, withComponentInputBinding())
    ```

4. Define the custom route matcher in `app.routes.ts`:

    This matcher:
   - Verifies the array contains one segment.
   - Uses a regular expression to match the username format.
   - Returns the entire URL with a `username` route parameter if matched.
   - Returns null if not matched, allowing the router to continue searching for other routes.

## Reading the route parameters

Bind the route parameter in the `profile` component.

1. Open `profile.component.ts` and create an `Input` for the `username` parameter:

    ```ts
    @Input() username!: string;
    ```

## Test your custom URL matcher

1. Run the application:

    ```shell
    ng serve
    ```

2. Open a browser to `http://localhost:4200`.

   You should see a page with the text `Navigate to my profile`.

3. Click the **my profile** hyperlink.

   A new sentence, `Hello, Angular!`, should appear.

## Next steps

Pattern matching with the Angular Router offers flexibility for dynamic URLs. To learn more, explore:

- In-app Routing and Navigation
- Router API

This content is based on Custom Route Matching with the Angular Router by Brandon Roberts.