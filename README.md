# Codebase: Fast Node.js Backend Template

Codebase is a template for rapidly developing Node.js backends with a robust set of tools and a well-organized file structure. It's designed to help you ship fast, reliable, and maintainable backend services.

## Features

- **TypeScript**: For type-safe code and improved developer experience
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js
- **Prisma**: Next-generation ORM for Node.js and TypeScript
- **Zod**: TypeScript-first schema validation with static type inference
- **Sentry**: Error tracking and performance monitoring
- **ESLint**: Linting utility for JavaScript and TypeScript
- **Mocha & Chai**: Testing framework and assertion library
- **Dotenv**: Environment variable management

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

This template uses Mocha for testing. Write your tests in the `src/app/**/*.test.ts` files. Run tests using `npm test`.

## Error Handling

Custom error handling is implemented using the `error-handler.ts` middleware. It provides consistent error responses and integrates with Sentry for error tracking.

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

This structured approach simplifies error handling and data extraction on the client side, improving the overall developer experience when working with the API.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.
