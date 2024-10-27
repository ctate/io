# Error Handling

This documentation explains how to handle development, server-side, and client-side errors in your Next.js app.

## Handling Errors in Development

During development, if a runtime error occurs, an **overlay** modal will appear, covering the webpage. This overlay is visible only when the development server is running with `next dev`, `pnpm dev`, `npm run dev`, `yarn dev`, or `bun dev`. It will not appear in production. Fixing the error will automatically dismiss the overlay.

## Handling Server Errors

Next.js provides a static 500 page by default for server-side errors. You can customize this page by creating a `pages/500.js` file. The 500 page does not display specific errors to users. Additionally, you can use a 404 page to handle specific runtime errors like "file not found."

## Handling Client Errors

React Error Boundaries allow you to handle JavaScript errors on the client gracefully, ensuring other parts of the application continue to function. They prevent page crashes, provide a custom fallback component, and enable error logging.

To implement Error Boundaries in your Next.js application, create a class component `ErrorBoundary` and wrap the `Component` prop in the `pages/_app.js` file. The `ErrorBoundary` component should:

- Render a fallback UI after an error is thrown
- Provide a way to reset the application's state
- Log error information

Example of an `ErrorBoundary` class component:

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true }
  }
  
  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo })
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
```

The `ErrorBoundary` component tracks an `hasError` state. When `hasError` is `true`, it renders a fallback UI; otherwise, it renders the children components.

After creating the `ErrorBoundary`, import it in the `pages/_app.js` file to wrap the `Component` prop:

```jsx
import ErrorBoundary from '../components/ErrorBoundary'

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  )
}

export default MyApp
```

For more information on Error Boundaries, refer to React's documentation.

### Reporting Errors

To monitor client errors, consider using services like Sentry, Bugsnag, or Datadog.