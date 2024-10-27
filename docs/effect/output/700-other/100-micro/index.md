# Micro

Micro is a lightweight framework designed for building microservices. It provides a simple and efficient way to create and manage services with minimal overhead.

## Features

- **Lightweight**: Minimal footprint for quick deployment.
- **Flexible**: Easily integrates with various technologies and platforms.
- **Scalable**: Designed to handle increasing loads seamlessly.
- **Modular**: Supports a modular architecture for better organization.

## Installation

To install Micro, use the following command:

```
npm install micro
```

## Usage

To create a simple microservice, use the following code snippet:

```javascript
const { send } = require('micro');
const micro = require('micro');

const server = micro((req, res) => {
  send(res, 200, 'Hello, Micro!');
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```

## API Reference

### send(res, statusCode, body)

- **res**: The response object.
- **statusCode**: HTTP status code to send.
- **body**: The response body.

### micro(handler)

- **handler**: A function that handles incoming requests.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License

Micro is licensed under the MIT License.