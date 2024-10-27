# Router reference

The following sections highlight some core router concepts.

## Router imports

The Angular Router is an optional service that presents a specific component view for a given URL. It is in its own library package, `@angular/router`.

Import what you need from it as you would from any other Angular package.

```ts
import { provideRouter } from '@angular/router';
```

For more on browser URL styles, see "LocationStrategy and browser URL styles".

## Configuration

A routed Angular application has one singleton instance of the `Router` service. When the browser's URL changes, the router looks for a corresponding `Route` to determine the component to display.

A router has no routes until configured. The following example creates five route definitions, configures the router via the `provideRouter` method, and adds the result to the `providers` array of the `ApplicationConfig`.

```ts
const appRoutes: Routes = [
  { path: 'crisis-center', component: CrisisListComponent },
  { path: 'hero/:id', component: HeroDetailComponent },
  {
    path: 'heroes',
    component: HeroListComponent,
    data: { title: 'Heroes List' }
  },
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
export const appConfig: ApplicationConfig = {
    providers: [provideRouter(appRoutes, withDebugTracing())]
}
```

The `routes` array describes navigation. Pass it to the `provideRouter` method in the `ApplicationConfig` `providers` to configure the router.

Each `Route` maps a URL `path` to a component without leading slashes. The router parses and builds the final URL, allowing both relative and absolute paths.

The `:id` in the second route is a token for a route parameter. In a URL like `/hero/42`, "42" is the value of the `id` parameter. The `HeroDetailComponent` uses that value to find and present the hero.

The `data` property in the third route stores arbitrary data associated with the route, accessible within each activated route. Use it for static data like page titles and breadcrumb text.

The empty path in the fourth route represents the default path for the application, redirecting to the `/heroes` URL and displaying the `HeroesListComponent`.

The `withDebugTracing` feature outputs each router event during navigation to the browser console, intended for debugging purposes.

## Router outlet

The `RouterOutlet` is a directive that acts as a placeholder in the template for displaying components.

```html
<router-outlet></router-outlet>
<!-- Routed components go here -->
```

When the browser URL becomes `/heroes`, the router matches that URL to the route path and displays the `HeroListComponent` in the `RouterOutlet`.

## Router links

To navigate based on user actions, use `RouterLink`. 

```html
<a routerLink="/heroes">Heroes</a>
```

The `RouterLink` directives give the router control over those elements. For dynamic paths, bind to a template expression returning an array of route link parameters.

## Active router links

The `RouterLinkActive` directive toggles CSS classes for active `RouterLink` bindings based on the current `RouterState`.

```html
<a routerLink="/heroes" routerLinkActive="active">Heroes</a>
```

The template expression contains a space-delimited string of CSS classes added when the link is active. You can also bind it to a component property.

Active route links cascade through the route tree, allowing parent and child links to be active simultaneously. To override this, bind to `[routerLinkActiveOptions]` with `{ exact: true }`.

`RouterLinkActive` can also apply the `aria-current` attribute to the active element for accessibility.

## Router state

After each successful navigation, the router builds a tree of `ActivatedRoute` objects representing the current state. Access the current `RouterState` using the `Router` service and the `routerState` property.

Each `ActivatedRoute` provides methods to traverse the route tree for information from parent, child, and sibling routes.

## Activated route

The route path and parameters are available through the injected `ActivatedRoute`. It provides useful information including:

- `url`: An `Observable` of the route paths.
- `data`: An `Observable` containing the `data` object for the route.
- `params`: An `Observable` of required and optional parameters.
- `paramMap`: An `Observable` of a map of parameters.
- `queryParamMap`: An `Observable` of a map of query parameters.
- `queryParams`: An `Observable` of query parameters.
- `fragment`: An `Observable` of the URL fragment.
- `outlet`: The name of the `RouterOutlet`.
- `routeConfig`: The route configuration for the route.
- `parent`: The parent `ActivatedRoute`.
- `firstChild`: The first `ActivatedRoute` in the list of child routes.
- `children`: All child routes activated under the current route.

## Router events

During navigation, the `Router` emits events through the `Router.events` property. Key events include:

- `NavigationStart`: Triggered when navigation starts.
- `RouteConfigLoadStart`: Triggered before lazy loading a route configuration.
- `RouteConfigLoadEnd`: Triggered after a route has been lazy loaded.
- `RoutesRecognized`: Triggered when the Router recognizes routes.
- `GuardsCheckStart`: Triggered when the Router begins the Guards phase.
- `ChildActivationStart`: Triggered when activating a route's children.
- `ActivationStart`: Triggered when activating a route.
- `GuardsCheckEnd`: Triggered when the Guards phase finishes successfully.
- `ResolveStart`: Triggered when beginning the Resolve phase.
- `ResolveEnd`: Triggered when finishing the Resolve phase successfully.
- `ChildActivationEnd`: Triggered when finishing activating a route's children.
- `ActivationEnd`: Triggered when finishing activating a route.
- `NavigationEnd`: Triggered when navigation ends successfully.
- `NavigationCancel`: Triggered when navigation is canceled.
- `NavigationError`: Triggered when navigation fails.
- `Scroll`: Represents a scrolling event.

With `withDebugTracing`, Angular logs these events to the console.

## Router terminology

Key `Router` terms include:

- `Router`: Displays the application component for the active URL and manages navigation.
- `provideRouter`: Provides necessary service providers for navigation.
- `RouterModule`: NgModule that provides service providers and directives for navigation.
- `Routes`: An array of Routes mapping URL paths to components.
- `Route`: Defines how to navigate to a component based on a URL pattern.
- `RouterOutlet`: The directive marking where the router displays a view.
- `RouterLink`: The directive for binding a clickable element to a route.
- `RouterLinkActive`: The directive for adding/removing classes based on link activity.
- `ActivatedRoute`: A service containing route-specific information.
- `RouterState`: The current state of the router, including activated routes.
- Link parameters array: An array interpreted as a routing instruction.
- Routing component: An Angular component with a `RouterOutlet` displaying views based on navigation.