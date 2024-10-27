# webVitalsAttribution

Learn how to use the webVitalsAttribution option to pinpoint the source of Web Vitals issues.

When debugging issues related to Web Vitals, it is often helpful to pinpoint the source of the problem. For example, in the case of Cumulative Layout Shift (CLS), we might want to know the first element that shifted during the largest layout shift. For Largest Contentful Paint (LCP), identifying the element corresponding to the LCP can help, especially if it is an image, as knowing the URL of the image resource can assist in locating the asset for optimization.

Pinpointing the biggest contributor to the Web Vitals score, known as attribution, allows us to obtain more in-depth information such as entries for PerformanceEventTiming, PerformanceNavigationTiming, and PerformanceResourceTiming.

Attribution is disabled by default in Next.js but can be enabled per metric by specifying the following in next.config.js:

```js
experimental: {
  webVitalsAttribution: ['CLS', 'LCP']
}
```

Valid attribution values are all web-vitals metrics specified in the NextWebVitalsMetric type.