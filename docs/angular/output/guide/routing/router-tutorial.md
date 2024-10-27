# Using Angular routes in a single-page application

This tutorial describes how to build a single-page application (SPA) that uses multiple Angular routes. In an SPA, all application functions exist in a single HTML page, improving user experience by rendering only the necessary parts without loading a new page.

## Objectives

- Organize a sample application's features into modules.
- Define navigation to a component.
- Pass information to a component using a parameter.
- Structure routes by nesting several routes.
- Check user access to a route.
- Control unsaved changes.
- Improve performance with pre-fetching route data and lazy loading.
- Require specific criteria to load components.

## Create a sample application

Using the Angular CLI, create a new application, *angular-router-sample*, with two components: *crisis-list* and *heroes-list*.

1. Create a new Angular project:

    ```
    ng new angular-router-sample
    ```

    Select `N` for Angular routing and `CSS` for stylesheet format.

2. Navigate to the `angular-router-sample` directory.
3. Create the *crisis-list* component:

    ```
    ng generate component crisis-list
    ```

4. Replace the content in `crisis-list.component.html` with the provided HTML.
5. Create the *heroes-list* component:

    ```
    ng generate component heroes-list
    ```

6. Replace the content in `heroes-list.component.html` with the provided HTML.
7. Update `app.component.html` with the provided HTML.
8. Run the application:

    ```
    ng serve
    ```

9. Open a browser to `http://localhost:4200` to see the application.

## Define your routes

Define two routes:

- `/crisis-list` opens the `crisis-list` component.
- `/heroes-list` opens the `heroes-list` component.

1. Create and open `app.routes.ts`:

    ```ts
    import {Routes} from '@angular/router';

    export const routes = [
        {path: 'crisis-list', component: CrisisListComponent},
        {path: 'heroes-list', component: HeroesListComponent},
    ];
    ```

## Import `provideRouter` from `@angular/router`

1. Open `app.config.ts` and add:

    ```ts
    import { provideRouter } from '@angular/router';
    import { routes } from './app.routes';

    providers: [provideRouter(routes)]
    ```

## Update your component with `router-outlet`

1. Open `app.component.html` and replace the content with:

    ```html
    <router-outlet></router-outlet>
    ```

2. Add `RouterOutlet` to the imports in `app.component.ts`.

View the application in the browser. Use the following URLs to load components:

- `http://localhost:4200/crisis-list`
- `http://localhost:4200/heroes-list`

## Control navigation with UI elements

1. Add navigation links in `app.component.html`:

    ```html
    <a routerLink="/crisis-list">Crisis List</a>
    <a routerLink="/heroes-list">Heroes List</a>
    ```

2. Add `RouterLink` to the imports in `app.component.ts`.
3. Add styles in `app.component.css`.

## Identify the active route

1. Update anchor tags in `app.component.html` to include `routerLinkActive`.

2. Add `RouterLinkActive` to the imports in `app.component.ts`.

## Adding a redirect

1. Open `app.routes.ts` and add:

    ```ts
    {path: '', redirectTo: '/heroes-list', pathMatch: 'full'},
    ```

## Adding a 404 page

1. Create a new component, `PageNotFound`:

    ```
    ng generate component page-not-found
    ```

2. Replace the content in `page-not-found.component.html` with the provided HTML.
3. Add the wildcard route in `app.routes.ts`:

    ```ts
    {path: '**', component: PageNotFoundComponent}
    ```

## Next steps

You now have a basic application using Angular's routing feature, including a redirect and a wildcard route for a custom 404 page. 

For more information about routing, see:

- In-app Routing and Navigation
- Router API