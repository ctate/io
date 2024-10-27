# Documentation

## htmx in a Nutshell

htmx is a library that allows you to access modern browser features directly from HTML, rather than using JavaScript.

To understand htmx, first let's take a look at an anchor tag:

```html
<a href="/blog">Blog</a>
```

This anchor tag tells a browser:

> "When a user clicks on this link, issue an HTTP GET request to '/blog' and load the response content into the browser window".

With that in mind, consider the following bit of HTML:

```html
<button hx-post="/clicked"
    hx-trigger="click"
    hx-target="#parent-div"
    hx-swap="outerHTML">
    Click Me!
</button>
```

This tells htmx:

> "When a user clicks on this button, issue an HTTP POST request to '/clicked' and use the content from the response to replace the element with the id `parent-div` in the DOM".

htmx extends and generalizes the core idea of HTML as a hypertext, opening up many more possibilities directly within the language:

- Any element can issue an HTTP request.
- Any event can trigger requests.
- Any HTTP verb can be used.
- Any element can be the target for updates by the request.

When using htmx, on the server side you typically respond with HTML, not JSON, keeping you within the original web programming model.

You can also use the `data-` prefix when using htmx:

```html
<a data-hx-post="/click">Click Me!</a>
```

Version 1 of htmx is still supported and supports IE11.

## 1.x to 2.x Migration Guide

If migrating to htmx 2.x from htmx 1.x, please see the htmx 1.x migration guide.

If migrating to htmx from intercooler.js, please see the intercooler migration guide.

## Installing

Htmx is a dependency-free, browser-oriented JavaScript library. Using it is as simple as adding a `<script>` tag to your document head.

### Via A CDN

The fastest way to get going with htmx is to load it via a CDN:

```html
<script src="https://unpkg.com/htmx.org@2.0.3" integrity="sha384-0895/pl2MU10Hqc6jd4RvrthNlDiE9U1tWmX7WRESftEDRosgxNsQG/Ze9YMRzHq" crossorigin="anonymous"></script>
```

An unminified version is also available:

```html
<script src="https://unpkg.com/htmx.org@2.0.3/dist/htmx.js" integrity="sha384-BBDmZzVt6vjz5YbQqZPtFZW82o8QotoM7RUp5xOxV3nSJ8u2pSdtzFAbGKzTlKtg" crossorigin="anonymous"></script>
```

### Download a Copy

Download `htmx.min.js` from unpkg.com and add it to your project:

```html
<script src="/path/to/htmx.min.js"></script>
```

### npm

For npm-style build systems, install htmx via npm:

```sh
npm install htmx.org@2.0.3
```

### Webpack

If using webpack:

* Install `htmx` via your package manager.
* Add the import to your `index.js`:

```js
import 'htmx.org';
```

To use the global `htmx` variable, inject it to the window scope:

```js
window.htmx = require('htmx.org');
```

## AJAX

The core of htmx is a set of attributes that allow you to issue AJAX requests directly from HTML:

| Attribute                              | Description                                |
|----------------------------------------|--------------------------------------------|
| hx-get                                 | Issues a `GET` request to the given URL    |
| hx-post                                | Issues a `POST` request to the given URL   |
| hx-put                                 | Issues a `PUT` request to the given URL    |
| hx-patch                               | Issues a `PATCH` request to the given URL  |
| hx-delete                               | Issues a `DELETE` request to the given URL |

Each attribute takes a URL to issue an AJAX request to. The element will issue a request of the specified type when triggered:

```html
<button hx-put="/messages">
    Put To Messages
</button>
```

### Triggering Requests

By default, AJAX requests are triggered by the natural event of an element:

- `input`, `textarea`, and `select` are triggered on the `change` event.
- `form` is triggered on the `submit` event.
- Everything else is triggered by the `click` event.

Use the `hx-trigger` attribute to specify which event will cause the request.

Example:

```html
<div hx-post="/mouse_entered" hx-trigger="mouseenter">
    [Here Mouse, Mouse!]
</div>
```

#### Trigger Modifiers

Modifiers can change trigger behavior:

- `once` - request happens only once.
- `changed` - request only if the value has changed.
- `delay:<time interval>` - wait before issuing the request.
- `throttle:<time interval>` - wait before issuing the request, discarding new events.
- `from:<CSS Selector>` - listen for the event on a different element.

Example:

```html
<input type="text" name="q"
    hx-get="/trigger_delay"
    hx-trigger="keyup changed delay:500ms"
    hx-target="#search-results"
    placeholder="Search...">
<div id="search-results"></div>
```

#### Trigger Filters

Apply trigger filters using square brackets after the event name:

```html
<div hx-get="/clicked" hx-trigger="click[ctrlKey]">
    Control Click Me
</div>
```

#### Special Events

htmx provides special events for use in `hx-trigger`:

- `load` - fires once when the element is first loaded.
- `revealed` - fires when an element first scrolls into the viewport.
- `intersect` - fires when an element first intersects the viewport.

#### Polling

Use the `every` syntax with `hx-trigger` for polling:

```html
<div hx-get="/news" hx-trigger="every 2s"></div>
```

To stop polling from a server response, respond with HTTP response code 286.

#### Load Polling

Another technique for polling is "load polling":

```html
<div hx-get="/messages"
    hx-trigger="load delay:1s"
    hx-swap="outerHTML">
</div>
```

### Request Indicators

Use the `htmx-indicator` class to show a loading indicator during AJAX requests:

```html
<button hx-get="/click">
    Click Me!
    <img class="htmx-indicator" src="/spinner.gif">
</button>
```

### Targets

Use the `hx-target` attribute to load the response into a different element:

```html
<input type="text" name="q"
    hx-get="/trigger_delay"
    hx-trigger="keyup delay:500ms changed"
    hx-target="#search-results"
    placeholder="Search...">
<div id="search-results"></div>
```

#### Extended CSS Selectors

`hx-target` supports extended CSS syntax:

- Use `this` to indicate the element with the `hx-target` attribute.
- Use `closest <CSS selector>` to find the closest ancestor.
- Use `next <CSS selector>` to find the next element.
- Use `previous <CSS selector>` to find the previous element.
- Use `find <CSS selector>` to find the first child descendant.

### Swapping

htmx offers different ways to swap the HTML returned into the DOM. By default, content replaces the `innerHTML` of the target element. Use the `hx-swap` attribute to modify this behavior:

| Name        | Description |
|-------------|-------------|
| `innerHTML` | Default, puts content inside the target element |
| `outerHTML` | Replaces the entire target element |
| `afterbegin` | Prepends content before the first child |
| `beforebegin` | Prepends content before the target |
| `beforeend` | Appends content after the last child |
| `afterend` | Appends content after the target |
| `delete` | Deletes the target element |
| `none` | Does not append content from response |

#### Morph Swaps

htmx supports morphing swaps via extensions, which attempt to merge new content into the existing DOM.

#### View Transitions

The View Transitions API allows for animated transitions between different DOM states. Use the `htmx.config.globalViewTransitions` config variable to enable transitions for all swaps.

### Synchronization

Use the `hx-sync` attribute to coordinate requests between elements:

```html
<form hx-post="/store">
    <input id="title" name="title" type="text"
        hx-post="/validate"
        hx-trigger="change"
        hx-sync="closest form:abort">
    <button type="submit">Submit</button>
</form>
```

### CSS Transitions

htmx makes it easy to use CSS transitions without JavaScript. Ensure the element has the same ID across requests for transitions to apply.

### Out of Band Swaps

Use the `hx-swap-oob` attribute in the response HTML to swap content directly into the DOM:

```html
<div id="message" hx-swap-oob="true">Swap me directly!</div>
```

### Parameters

Elements that cause a request will include their value. Use the `hx-include` attribute to include values from other elements.

### File Upload

Set the `hx-encoding` attribute to `multipart/form-data` for file uploads.

### Confirming Requests

Use the `hx-confirm` attribute to confirm actions before issuing a request:

```html
<button hx-delete="/account" hx-confirm="Are you sure you wish to delete your account?">
    Delete My Account
</button>
```

## Attribute Inheritance

Most attributes in htmx are inherited, allowing you to hoist attributes up the DOM to avoid duplication.

## Boosting

Htmx supports boosting regular HTML anchors and forms with the `hx-boost` attribute, converting them into AJAX requests.

### Progressive Enhancement

`hx-boost` degrades gracefully if JavaScript is not enabled, allowing links and forms to continue working.

## Web Sockets & SSE

Web Sockets and Server Sent Events (SSE) are supported via extensions.

## History Support

Use the `hx-push-url` attribute to push the request URL into the browser navigation bar.

### Specifying History Snapshot Element

Use the `hx-history-elt` attribute to specify a different element for snapshotting.

### Undoing DOM Mutations By 3rd Party Libraries

Clean up the DOM before a snapshot is taken to avoid saving unwanted mutations.

### Disabling History Snapshots

Set the `hx-history` attribute to `false` to disable history snapshotting for a URL.

## Requests & Responses

Htmx expects responses to be HTML, typically HTML fragments. Return a `204 - No Content` response code to do nothing in the swap.

### Configuring Response Handling

You can configure htmx's response handling behavior by mutating the `htmx.config.responseHandling` array.

### CORS

Configure your web server to set Access-Control headers for htmx headers to be visible on the client side.

### Request Headers

htmx includes useful headers in requests, such as `HX-Boosted`, `HX-Current-URL`, and `HX-Request`.

### Response Headers

htmx supports specific response headers for client-side redirects and content updates.

## Validation

Htmx integrates with the HTML5 Validation API and fires events around validation for custom handling.

## Animations

Htmx allows you to use CSS transitions in many situations using only HTML and CSS.

## Extensions

Htmx provides an extensions mechanism to customize behavior. Extensions are defined in JavaScript and enabled via the `hx-ext` attribute.

### Core Extensions

htmx supports several core extensions, including head-support, htmx-1-compat, idiomorph, preload, response-targets, sse, and ws.

### Creating Extensions

Refer to the extension docs for creating your own extension.

## Events & Logging

Htmx has an extensive events mechanism for logging and handling events.

### Initialize A 3rd Party Library With Events

Use the `htmx:load` event to initialize content.

### Configure a Request With Events

Handle the `htmx:configRequest` event to modify an AJAX request before it is issued.

### Modifying Swapping Behavior With Events

Handle the `htmx:beforeSwap` event to modify the swap behavior.

### Event Naming

All events are fired with two names: Camel Case and Kebab Case.

### Logging

Set a logger at `htmx.logger` to log every event.

## Debugging

Use `htmx.logAll()` to log every event triggered by htmx. Use `monitorEvents()` in the console to see events occurring on an element.

## Creating Demos

Use the demo script site to facilitate easy demo creation.

## Scripting

htmx offers options for client scripting, encouraging a hypermedia approach.

### The `hx-on*` Attributes

Use `hx-on*` attributes to respond to any event, preserving locality of behavior.

### 3rd Party Javascript

Htmx integrates well with third-party libraries, allowing you to trigger requests from their events.

## Caching

Htmx works with standard HTTP caching mechanisms. Use the `Vary` header for different content based on headers.

## Security

Escape all user content to prevent XSS attacks. Use `hx-disable` to prevent processing of htmx attributes on an element.

### htmx Security Tools

Use `hx-history` to omit pages from the history cache.

### Configuration Options

htmx provides various configuration options related to security.

### CSP Options

Use a Content Security Policy to further secure your web application.