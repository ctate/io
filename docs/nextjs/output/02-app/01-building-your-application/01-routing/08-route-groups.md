# Route Groups

Route Groups can be used to partition your Next.js application into different sections.

## Overview

In the `app` directory, nested folders are normally mapped to URL paths. However, you can mark a folder as a **Route Group** to prevent the folder from being included in the route's URL path.

## Use Cases

Route groups are useful for:

* Organizing routes into groups e.g. by site section, intent, or team.
* Enabling nested layouts in the same route segment.
* Adding a loading skeleton to specific route in a common segment.

## Convention

A route group can be created by wrapping a folder's name in parenthesis: `(folderName)`

## Examples

### Organize routes without affecting the URL path

To organize routes without affecting the URL, create a group to keep related routes together. The folders in parenthesis will be omitted from the URL.

### Opting specific segments into a layout

To opt specific routes into a layout, create a new route group and move the routes that share the same layout into the group.

### Opting for loading skeletons on a specific route

To apply a loading skeleton via a `loading.js` file to a specific route, create a new route group and then move your `loading.tsx` inside that route group.

### Creating multiple root layouts

To create multiple root layouts, remove the top-level `layout.js` file, and add a `layout.js` file inside each route group.

## Important Notes

* The naming of route groups has no special significance other than for organization. They do not affect the URL path.
* Routes that include a route group should not resolve to the same URL path as other routes.
* If you use multiple root layouts without a top-level `layout.js` file, your home `page.js` file should be defined in one of the route groups.
* Navigating across multiple root layouts will cause a full page load.