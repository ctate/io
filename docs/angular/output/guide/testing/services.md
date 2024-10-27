# Testing services

To ensure your services function correctly, you can write specific tests for them. Services are typically easier to unit test. Below are examples of synchronous and asynchronous unit tests for the `ValueService`.

## Services with dependencies

Services often rely on other services injected via the constructor. You can manually create and inject these dependencies when calling the service's constructor. 

The `MasterService` is a simple example that delegates its method, `getValue`, to the injected `ValueService`. Here are several ways to test it.

When testing, avoid using the real service as dependencies can be complex. Instead, mock the dependency, use a dummy value, or create a spy on the relevant service method. Prefer spies for mocking services.

These techniques are effective for unit testing services in isolation. However, you should also test how services behave when injected into application classes using Angular's dependency injection.

## Testing services with the `TestBed`

Angular's dependency injection (DI) creates services and their dependencies. As a service tester, you can use the `TestBed` utility to manage service creation and constructor argument order.

### Angular `TestBed`

The `TestBed` is a key Angular testing utility that creates a test module emulating an Angular `@NgModule`. Use `TestBed.configureTestingModule()` to set up the testing environment, specifying the `providers` metadata property with the services to test or mock.

Inject the service in a test using `TestBed.inject()` with the service class as the argument. Note that `TestBed.get()` is deprecated; use `TestBed.inject()` instead.

When testing a service with a dependency, provide the mock in the `providers` array. The mock can be a spy object, which the test consumes similarly to previous examples.

## Testing without `beforeEach()`

While most test suites use `beforeEach()` to set up conditions for each test, an alternative approach is to create classes explicitly without `beforeEach()`. 

You can place reusable setup code in a setup function that returns an object with variables for the tests. Each test then calls this setup function at the beginning. This method is often seen as cleaner and more explicit.

## Testing HTTP services

Data services that make HTTP calls typically use the Angular `HttpClient`. You can test a data service with an injected `HttpClient` spy like any other service with a dependency.

Important: Methods in the `HeroService` return `Observables`. You must subscribe to an observable to execute it and assert its success or failure. Always provide both success and error callbacks to avoid uncaught observable errors.

### `HttpClientTestingModule`

For complex interactions between a data service and the `HttpClient`, the `HttpClientTestingModule` simplifies testing scenarios. For detailed information on using `HttpClientTestingModule`, refer to the Http guide.