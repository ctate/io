# Angular without ZoneJS (Zoneless)

## Why use Zoneless?

Advantages of removing ZoneJS:

- **Improved performance**: Reduces unnecessary change detection triggers.
- **Improved Core Web Vitals**: Decreases payload size and startup time.
- **Improved debugging experience**: Simplifies stack traces and error understanding.
- **Better ecosystem compatibility**: Avoids issues with browser API patches and ensures long-term compatibility.

## Enabling Zoneless in an application

The API for enabling Zoneless is experimental and may change. Known feature gaps exist.

```typescript
// standalone bootstrap
bootstrapApplication(MyApp, {providers: [
  provideExperimentalZonelessChangeDetection(),
]});

// NgModule bootstrap
platformBrowser().bootstrapModule(AppModule);
@NgModule({
  providers: [provideExperimentalZonelessChangeDetection()]
})
export class AppModule {}
```

## Removing ZoneJS

To reduce bundle size, remove ZoneJS from the build:

1. In `angular.json`, remove `zone.js` and `zone.js/testing` from the `polyfills` option for both `build` and `test` targets.
2. If using `polyfills.ts`, remove `import 'zone.js';` and `import 'zone.js/testing';`.

After removal, uninstall the package:

```shell
npm uninstall zone.js
```

## Requirements for Zoneless compatibility

Angular requires notifications from core APIs for change detection, including:

- `ChangeDetectorRef.markForCheck`
- `ComponentRef.setInput`
- Updating signals in templates
- Bound host/template listener callbacks
- Attaching marked dirty views

### `OnPush`-compatible components

Using [ChangeDetectionStrategy.OnPush] is recommended for zoneless compatibility. Components can use `Default` strategy if they notify Angular when change detection is needed.

### Remove `NgZone` observables

Remove uses of `NgZone.onMicrotaskEmpty`, `NgZone.onUnstable`, `NgZone.isStable`, and `NgZone.onStable`. These will not emit in zoneless applications. Use `afterNextRender` or `afterRender` instead, or direct DOM APIs like `MutationObserver`.

<docs-callout title="NgZone.run and NgZone.runOutsideAngular compatibility">
`NgZone.run` and `NgZone.runOutsideAngular` are compatible with Zoneless applications and should not be removed.
</docs-callout>

### `PendingTasks` for Server Side Rendering (SSR)

For SSR, use the `PendingTasks` service to manage asynchronous tasks that prevent serialization:

```typescript
const taskService = inject(PendingTasks);
const taskCleanup = taskService.add();
await doSomeWorkThatNeedsToBeRendered();
taskCleanup();
```

## Testing and Debugging

### Using Zoneless in `TestBed`

Use the zoneless provider with `TestBed` to ensure component compatibility:

```typescript
TestBed.configureTestingModule({
  providers: [provideExperimentalZonelessChangeDetection()]
});

const fixture = TestBed.createComponent(MyComponent);
await fixture.whenStable();
```

Avoid using `fixture.detectChanges()` to let Angular manage change detection.

### Debug-mode check for updates

Use `provideExperimentalCheckNoChangesForDebug` to verify state updates in a zoneless-compatible way. Angular will throw `ExpressionChangedAfterItHasBeenCheckedError` for unnotified updates.