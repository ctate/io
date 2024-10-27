# Dependency injection in Angular

"DI" is a design pattern and mechanism for creating and delivering parts of an app to other parts that require them.

Tip: Check out Angular's Essentials at essentials/sharing-logic before diving into this comprehensive guide.

When developing a smaller part of your system, like a module or class, you may need features from other classes, such as an HTTP service for backend calls. Dependency Injection (DI) increases flexibility and modularity in Angular applications.

In Angular, dependencies are typically services but can also be values like strings or functions. An injector, created automatically during bootstrap, instantiates dependencies when needed using a configured provider.

## Learn about Angular dependency injection

- **Understanding dependency injection**: Learn basic principles of dependency injection in Angular.
- **Creating and injecting service**: Describes how to create a service and inject it into other services and components.
- **Configuring dependency providers**: Explains how to configure dependencies using the providers field on the @Component and @NgModule decorators. Also covers using InjectionToken for providing and injecting non-class values.
- **Injection context**: Describes what an injection context is and how to use the DI system where needed.
- **Hierarchical injectors**: Enables sharing dependencies between different parts of the application only when necessary; this is an advanced topic.