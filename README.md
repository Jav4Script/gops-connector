<p align="center"> <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>

</p> <h1 align="center">Authentication Project with NestJS</h1> <p align="center"> <a href="https://github.com/nestjs/nest" target="_blank"><img src="https://img.shields.io/badge/NestJS-v8.0.0-red" alt="NestJS Version" /></a> <a href="https://github.com/nestjs/nest" target="_blank"><img src="https://img.shields.io/badge/TypeScript-v4.0.0-blue" alt="TypeScript Version" /></a> <a href="https://github.com/nestjs/nest" target="_blank"><img src="https://img.shields.io/badge/license-MIT-green" alt="License" /></a> </p>

## 📜 Description

This project is an authentication application built with NestJS, a progressive Node.js framework for building efficient and scalable server-side applications.

## 📂 Project Structure

```
.
├── .env
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── nest-cli.json
├── package.json
├── pnpm-lock.yaml
├── README.md
├── src/
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── common/
│   │   ├── constants/
│   │   │   └── jira.constants.ts
│   ├── config/
│   │   ├── app-config.module.ts
│   │   ├── app-config.service.ts
│   │   └── jira/
│   │       └── jira.config.ts
│   ├── connectors/
│   │   ├── domain/
│   │   │   └── connector.entity.ts
│   │   ├── infrastructure/
│   │   │   ├── connector.controller.ts
│   │   │   ├── connector.module.ts
│   │   │   ├── connector.service.ts
│   │   │   └── providers/
│   │   │       ├── base.provider.ts
│   │   │       └── jira.provider.ts
│   │   └── usecases/
│   │       └── get-connector-url.usecase.ts
│   ├── main.ts
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
└── tsconfig.json
```

## 🚀 Installation

```bash
pnpm install
```

## ⚙️ Configuration

Create a .env file in the root of the project and add the following environment variables:

```plaintext
# Environment
NODE_ENV=development
PORT=5000

# Application
CALLBACK_URL=http://localhost:5000/auth/callback

# JIRA Provider
JIRA_AUDIENCE=api.atlassian.com
JIRA_AUTH_URL=https://auth.atlassian.com/authorize
JIRA_CLIENT_ID=[value]
JIRA_CLIENT_SECRET=[value]
JIRA_TOKEN_GRANT_TYPE=authorization_code
JIRA_REDIRECT_URI=https://auth.atlassian.com/oauth/token
```

## 🏃‍♂️ Running the Application

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## 🧪 Testing

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## 📖 Usage

### Request Token

To request an authentication token, make a GET request to /auth/request-token with the following query parameters:

- provider: The authentication provider (e.g., jira).
- callback: The callback URL.

Example:

```bash
curl "http://localhost:3000/auth/callback?provider=jira&code=authorization_code&state=state_parameter"
```

##### Step by Step

- The client makes a request to this endpoint with the provider name and the callback URL.
- The server generates a random state and stores it in the user's session.
- The server retrieves the corresponding authentication provider service.
- The server uses the GetAuthUrlUseCase to get the authentication URL from the provider.
- The server redirects the client to the provider's authentication URL.

#### Handle Callback

To handle the authentication callback, make a GET request to /auth/callback with the following query parameters:

- provider: The authentication provider (e.g., jira).
- code: The authorization code.
- state: The state parameter.

Example:

```bash
curl "http://localhost:3000/auth/callback?provider=jira&code=authorization_code&state=state_parameter"
```

##### Step by Step

- The authentication provider redirects the client to this endpoint after authentication.
- The server verifies that the returned state matches the state stored in the user's session.
- The server retrieves the corresponding authentication provider service.
- The server uses the provider service to exchange the authorization code for an access token.
- The server returns the access token to the client.

## 📚 Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the NestJS Documentation to learn more about the framework.
- For questions and support, please visit our Discord channel.
- To dive deeper and get more hands-on experience, check out our official video courses.
- Visualize your application graph and interact with the NestJS application in real-time using NestJS Devtools.
- Need help with your project (part-time to full-time)? Check out our official enterprise support.
- To stay in the loop and get updates, follow us on X and LinkedIn.
- Looking for a job, or have a job to offer? Check out our official Jobs board.

## 📄 License

Nest is MIT licensed.
