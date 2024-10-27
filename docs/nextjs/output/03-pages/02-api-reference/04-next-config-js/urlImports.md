# urlImports

## Description
Configure Next.js to allow importing modules from external URLs.

## Version
Experimental

## Usage
To enable importing modules from external URLs in your Next.js application, you need to modify the `next.config.js` file. 

### Example Configuration
```javascript
module.exports = {
  experimental: {
    urlImports: ['https://example.com/path/to/module.js'],
  },
}
```

## Notes
- Ensure that the external URLs are secure and trusted.
- This feature is experimental and may change in future releases.