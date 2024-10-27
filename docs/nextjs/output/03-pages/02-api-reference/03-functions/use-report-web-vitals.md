# useReportWebVitals

## Description
The `useReportWebVitals` function is designed to report web vitals metrics for performance monitoring.

## Usage
To utilize `useReportWebVitals`, import it into your component and call it to start tracking performance metrics.

## Parameters
- **onPerfEntry**: A function that receives a performance entry object. This function is called whenever a new performance entry is recorded.

## Example
```javascript
import { useReportWebVitals } from 'app/api-reference/functions/use-report-web-vitals';

function MyApp({ Component, pageProps }) {
  useReportWebVitals((metric) => {
    console.log(metric);
  });

  return <Component {...pageProps} />;
}
```

## Notes
- Ensure that the function is called at the top level of your component to properly track metrics.
- This function is particularly useful for measuring metrics like First Contentful Paint (FCP), Largest Contentful Paint (LCP), and others.

## Additional Information
For more details, refer to the official documentation on web vitals.