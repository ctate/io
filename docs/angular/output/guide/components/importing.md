# Importing and using components

Tip: This guide assumes you've already read the Essentials Guide. Read that first if you're new to Angular.

Angular supports two ways of making a component available to other components: as a standalone component or in an NgModule.

## Standalone components

A **standalone component** is a component that sets `standalone: true` in its component metadata. Standalone components directly import other components, directives, and pipes used in their templates:

```typescript
@Component({
  standalone: true,
  selector: 'profile-photo',
})
export class ProfilePhoto { }

@Component({
  standalone: true,
  imports: [ProfilePhoto],
  template: `<profile-photo />`
})
export class UserProfile { }
```

Standalone components are directly importable into other standalone components. The Angular team recommends using standalone components for all new development.

## NgModules

Angular code that predates standalone components uses `NgModule` as a mechanism for importing and using other components. See the full NgModule guide for details.