# Common Routing Tasks

This topic describes how to implement many of the common tasks associated with adding the Angular router to your application.

## Generate an application with routing enabled

Use the Angular CLI to generate a basic Angular application with routing:

```shell
ng new routing-app
```

### Adding components for routing

Create at least two components for navigation. Use the CLI to create components:

```shell
ng generate component first
ng generate component second
```

The CLI appends `Component` to the name, so `first-component` becomes `FirstComponentComponent`.

**Note:** Ensure `<base href="/">` is in the `<head>` of your index.html file.

### Importing your new components

Import the components into `app.routes.ts`:

```ts
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
```

## Defining a basic route

Import routes into `app.config.ts` and add them to the `provideRouter` function:

```ts
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
```

### Set up a `Routes` array

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [];
```

### Define your routes

Each route is an object with `path` and `component` properties:

```ts
const routes: Routes = [
  { path: 'first-component', component: FirstComponent },
  { path: 'second-component', component: SecondComponent },
];
```

### Add your routes to your application

Add links to the components and include `<router-outlet>` in your template:

```angular-html
<h1>Angular Router App</h1>
<nav>
  <ul>
    <li><a routerLink="/first-component" routerLinkActive="active">First Component</a></li>
    <li><a routerLink="/second-component" routerLinkActive="active">Second Component</a></li>
  </ul>
</nav>
<router-outlet></router-outlet>
```

Update `AppComponent` to include necessary imports:

```ts
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'routing-app';
}
```

### Route order

Place more specific routes above less specific ones. Wildcard routes should be last.

## Getting route information

To pass information between components, use route parameters. For example, to edit a grocery item:

### Add `withComponentInputBinding`

```ts
providers: [
  provideRouter(appRoutes, withComponentInputBinding()),
]
```

### Add an `Input` to the component

```ts
@Input()
set id(heroId: string) {
  this.hero$ = this.service.getHero(heroId);
}
```

## Setting up wildcard routes

To handle non-existent routes, set up a wildcard route:

```ts
{ path: '**', component: <component-name> }
```

## Displaying a 404 page

Set up a wildcard route for a 404 page:

```ts
const routes: Routes = [
  { path: 'first-component', component: FirstComponent },
  { path: 'second-component', component: SecondComponent },
  { path: '**', component: PageNotFoundComponent },
];
```

## Setting up redirects

Configure a redirect route:

```ts
const routes: Routes = [
  { path: 'first-component', component: FirstComponent },
  { path: 'second-component', component: SecondComponent },
  { path: '', redirectTo: '/first-component', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
```

## Nesting routes

Create child routes by adding a second `<router-outlet>`:

```angular-html
<h2>First Component</h2>
<nav>
  <ul>
    <li><a routerLink="child-a">Child A</a></li>
    <li><a routerLink="child-b">Child B</a></li>
  </ul>
</nav>
<router-outlet></router-outlet>
```

Define child routes in a `children` array:

```ts
const routes: Routes = [
  {
    path: 'first-component',
    component: FirstComponent,
    children: [
      { path: 'child-a', component: ChildAComponent },
      { path: 'child-b', component: ChildBComponent },
    ],
  },
];
```

## Setting the page title

Set unique titles for each route using the `title` property:

```ts
const routes: Routes = [
  {
    path: 'first-component',
    title: 'First component',
    component: FirstComponent,
    children: [
      { path: 'child-a', title: resolvedChildATitle, component: ChildAComponent },
      { path: 'child-b', title: 'child b', component: ChildBComponent },
    ],
  },
];
```

## Using relative paths

Define paths relative to the current URL segment:

```angular-html
<h2>First Component</h2>
<nav>
  <ul>
    <li><a routerLink="../second-component">Relative Route to second component</a></li>
  </ul>
</nav>
<router-outlet></router-outlet>
```

### Specifying a relative route

Use `NavigationExtras` with `relativeTo`:

```ts
goToItems() {
  this.router.navigate(['items'], { relativeTo: this.route });
}
```

## Accessing query parameters and fragments

Access route parameters using `ActivatedRoute`:

```ts
import { ActivatedRoute } from '@angular/router';

constructor(private route: ActivatedRoute) {}

ngOnInit() {
  const heroId = this.route.snapshot.paramMap.get('id');
}
```

## Lazy loading

Configure routes to lazy load modules:

```ts
const routes: Routes = [
  {
    path: 'lazy',
    loadComponent: () => import('./lazy.component').then(c => c.LazyComponent)
  }
];
```

## Preventing unauthorized access

Use route guards to restrict access:

```ts
{
  path: '/your-path',
  component: YourComponent,
  canActivate: [yourGuardFunction],
}
```

## Link parameters array

Use a link parameters array for navigation:

```angular-html
<a [routerLink]="['/heroes']">Heroes</a>
<a [routerLink]="['/hero', hero.id]">{{ hero.name }}</a>
<a [routerLink]="['/crisis-center', { foo: 'foo' }]">Crisis Center</a>
```

## `LocationStrategy` and browser URL styles

The router updates the browser's location and history with a URL for each view. Use `PathLocationStrategy` for HTML5 style URLs or `HashLocationStrategy` for hash-based URLs.

## Choosing a routing strategy

Choose a routing strategy early in development. HTML5 style is recommended for better user experience and server-side rendering.

## `<base href>`

Add a `<base href="/">` element to the `index.html` for `pushState` routing to work. This helps the browser load resources correctly.

```angular-html
<base href="/">
```

### HTML5 URLs and the `<base href>`

Ensure the `<base href>` is configured correctly to avoid issues with resource loading.

### `HashLocationStrategy`

Use `HashLocationStrategy` by providing `useHash: true` in the `RouterModule.forRoot()`:

```ts
providers: [
  provideRouter(appRoutes, withHashLocation())
]
```