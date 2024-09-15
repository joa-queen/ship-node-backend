# Ocajo Backend

Ocajo Backend is a robust Node.js backend template designed for rapid development of scalable and secure web services. It incorporates best practices and a comprehensive set of tools to help you build reliable and maintainable backend applications.

## Features

- **TypeScript**: For type-safe code and improved developer experience
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js
- **Prisma**: Next-generation ORM for Node.js and TypeScript
- **Zod**: TypeScript-first schema validation with static type inference
- **Sentry**: Error tracking and performance monitoring
- **Winston**: Versatile logging library
- **ESLint**: Linting utility for JavaScript and TypeScript with security rules
- **Mocha & Chai**: Testing framework and assertion library
- **Dotenv**: Environment variable management
- **Helmet**: Helps secure Express apps by setting various HTTP headers
- **Compression**: Response compression middleware
- **Rate Limiting**: Protects against brute-force attacks
- **In-Memory Caching**: Improves performance for frequently accessed data
- **Swagger**: API documentation

## Project Structure

- `app/`: Contains route handlers and Express routers
- `lib/`: Houses shared libraries and configurations
- `middlewares/`: Express middlewares
- `utils/`: Utility functions and helpers
- `server.ts`: Main application entry point

## Getting Started

1. Clone this repository
2. Run `npm install` to install dependencies
3. Set up your `.env` file with necessary environment variables
4. Run `npx prisma migrate dev` to set up your database
5. Start the development server with `npm run dev`

## Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the TypeScript project
- `npm start`: Start the production server
- `npm test`: Run tests
- `npm run lint`: Lint the codebase

## Environment Variables

Make sure to set up the following environment variables:

- `NODE_ENV`: Application environment (development, test, production)
- `PORT`: Port number for the server
- `DATABASE_URL`: PostgreSQL database connection string
- `SENTRY_DSN`: Sentry Data Source Name for error tracking
- `JWT_SECRET`: Secret key for JWT authentication

## Testing

This project uses Mocha for testing. Write your tests in the `src/app/**/*.test.ts` files. Run tests using `npm test`.

## Error Handling and Logging

Custom error handling is implemented using the `error-handler.ts` middleware. It provides consistent error responses and integrates with Sentry for error tracking. Logging is handled by Winston, with different log levels for different environments.

## API Responses

The `response.ts` utility provides standardized success and error responses for your API endpoints. This structure ensures consistency and predictability across all API responses.

### Why Structured Responses?

- Consistency: Maintains a uniform API interface
- Predictability: Simplifies integration for frontend developers
- Error handling: Provides a standard way to communicate errors
- Metadata: Allows for additional information beyond just the data

### Response Structure

All API responses follow this structure:

#### Success Response Properties (2XX)

- `success`: Always `true` for successful responses
- `data`: The main payload of the response (optional)
- `meta`: Additional metadata, like pagination (optional)
- `upserted`: Object containing records of upserted entities (optional)
- `deleted`: Object containing records of deleted entities (optional)

#### Error Response Properties (4XX, 5XX)

- `success`: Always `false` for error responses
- `message`: A human-readable error message
- `code`: An error code (e.g., BAD_REQUEST, UNAUTHORIZED)
- `issues`: Object containing validation or more granular issues (optional)

## Security

This project includes several security measures:

- Helmet for setting secure HTTP headers
- Rate limiting to prevent abuse
- Security-focused ESLint rules to catch potential vulnerabilities during development
- CSRF protection (ensure to implement CSRF tokens in your frontend)

## Caching

A simple in-memory caching mechanism is implemented using `node-cache`. This improves performance for frequently accessed, relatively static data.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.

## Using this template

To create a new project using this template, run the following command:
```bash
npx create-ocajo-app my-new-project
```

This will create a new directory called `my-new-project` with all the necessary files and dependencies installed.

After the project is created:

1. Navigate to the project directory:
   ```bash
   cd my-new-project
   ```

2. Set up your `.env` file with necessary environment variables.

3. Run `npx prisma migrate dev` to set up your database.

4. Start the development server:
   ```bash
   npm run dev
   ```

Your new Ocajo backend project is now ready for development!
