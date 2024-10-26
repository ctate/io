# Project Organization and File Colocation

Apart from routing folder and file conventions, Next.js is **unopinionated** about how you organize and colocate your project files.

## Safe Colocation by Default

In the `app` directory, a nested folder hierarchy defines route structure. Each folder represents a route segment that is mapped to a corresponding segment in a URL path. However, even though route structure is defined through folders, a route is **not publicly accessible** until a `page.js` or `route.js` file is added to a route segment.

This means that **project files** can be **safely colocated** inside route segments in the `app` directory without accidentally being routable.

## Project Organization Features

Next.js provides several features to help you organize your project.

### Private Folders

Private folders can be created by prefixing a folder with an underscore: `_folderName`. This indicates the folder is a private implementation detail and should not be considered by the routing system, thereby **opting the folder and all its subfolders** out of routing.

### Route Groups

Route groups can be created by wrapping a folder in parenthesis: `(folderName)`. This indicates the folder is for organizational purposes and should **not be included** in the route's URL path.

### `src` Directory

Next.js supports storing application code (including `app`) inside an optional [`src` directory](https://nextjs.org/docs/app/building-your-application/configuring/src-directory). This separates application code from project configuration files which mostly live in the root of a project.

### Module Path Aliases

Next.js supports [Module Path Aliases](https://nextjs.org/docs/app/building-your-application/configuring/absolute-imports-and-module-aliases) which make it easier to read and maintain imports across deeply nested project files.

```jsx
// before
import { Button } from '../../../components/button'

// after
import { Button } from '@/components/button'
```

## Project Organization Strategies

There is no "right" or "wrong" way when it comes to organizing your own files and folders in a Next.js project.

### Store Project Files Outside of `app`

This strategy stores all application code in shared folders in the **root of your project** and keeps the `app` directory purely for routing purposes.

### Store Project Files in Top-Level Folders Inside of `app`

This strategy stores all application code in shared folders in the **root of the `app` directory**.

### Split Project Files by Feature or Route

This strategy stores globally shared application code in the root `app` directory and **splits** more specific application code into the route segments that use them.