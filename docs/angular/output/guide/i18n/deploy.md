# Deploy multiple locales

To deploy different versions of your project for various locales, organize your distributable files in locale directories within the `myapp` directory. For instance, the French version is in `myapp/fr` and the Spanish version in `myapp/es`.

The HTML `base` tag with the `href` attribute sets the base URI for relative links. By setting the `"localize"` option in the `angular.json` workspace build configuration file to `true` or an array of locale IDs, the CLI modifies the base `href` for each application version. The locale is appended to the configured `"baseHref"`. Specify the `"baseHref"` for each locale in your `angular.json` file. 

Example of `"baseHref"` set to an empty string:

<docs-code header="angular.json" path="adev/src/content/examples/i18n/angular.json" visibleRegion="i18n-baseHref"/>

To declare the base `href` at compile time, use the CLI `--baseHref` option with `ng build`.

## Configure a server

For typical deployment, serve each language from a different subdirectory. Users are redirected based on the `Accept-Language` HTTP header. If no preferred language is set or available, the server defaults to the primary language. Users can switch languages by navigating to another subdirectory, often facilitated by an in-app menu.

For more information on deploying apps to a remote server, see Deployment.

### Nginx example

Example of an Nginx configuration:

<docs-code path="adev/src/content/examples/i18n/doc-files/nginx.conf" language="nginx"/>

### Apache example

Example of an Apache configuration:

<docs-code path="adev/src/content/examples/i18n/doc-files/apache2.conf" language="apache"/>

References:
- ng build | CLI | Angular
- Deployment | Angular
- Angular workspace configuration | Angular