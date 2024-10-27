# Full Stack FastAPI Template

Templates are designed to be flexible and customizable, allowing you to modify them to fit your project's requirements. This template provides an excellent starting point with initial setup, security, database, and some API endpoints already configured.

GitHub Repository: Full Stack FastAPI Template

## Technology Stack and Features

- **FastAPI** for the Python backend API.
    - **SQLModel** for Python SQL database interactions (ORM).
    - **Pydantic** for data validation and settings management.
    - **PostgreSQL** as the SQL database.
- **React** for the frontend.
    - Using TypeScript, hooks, and Vite as part of a modern frontend stack.
    - **Chakra UI** for frontend components.
    - An automatically generated frontend client.
    - **Playwright** for End-to-End testing.
    - Dark mode support.
- **Docker Compose** for development and production.
- Secure password hashing by default.
- JWT token authentication.
- Email-based password recovery.
- Tests with **Pytest**.
- **Traefik** as a reverse proxy/load balancer.
- Deployment instructions using Docker Compose, including setting up a frontend Traefik proxy for automatic HTTPS certificates.
- CI (continuous integration) and CD (continuous deployment) based on GitHub Actions.