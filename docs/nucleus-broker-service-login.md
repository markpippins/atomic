
# Gemini Broker Service Login Flow

This document details the login flow as invoked by the broker service, focusing on the relevant classes and the overall process.

## Overview

The login flow is initiated from the `web/nextjs-cool-people` application, but the actual authentication is handled by the `login-service` Java module via the broker service.

## Frontend Invocation

The login form in `web/nextjs-cool-people/src/app/login/page.tsx` captures the user's credentials. However, the `loginAction` in `web/nextjs-cool-people/src/lib/actions.ts` is a mock implementation for debug purposes and does not interact with the broker service.

## Backend Authentication

The authentication process is managed by the `login-service` and `user-service` modules.

### Relevant Classes

- **`com.angrysurfer.atomic.login.LoginService`**: The entry point for the login operation via the broker.
- **`com.angrysurfer.atomic.user.service.UserService`**: Handles user-related operations, including retrieving user data from the database.
- **`com.angrysurfer.atomic.user.model.User`**: The JPA entity representing a user in the database.
- **`com.angrysurfer.atomic.user.UserDTO`**: A data transfer object representing a user, which is returned to the client.

### Login Flow

1.  A request is sent to the broker service with the `service` set to `loginService` and the `operation` set to `login`. The request parameters include the user's `alias` and `password`.

    ```json
    {
        "service": "loginService",
        "operation": "login",
        "params": {
            "alias": "user-alias",
            "identifier": "user-password"
        },
        "requestId": "my-request-id"
    }
    ```

2.  The broker service routes the request to the `login` method in the `LoginService` class, which is annotated with `@BrokerOperation("login")`.

3.  The `login` method in `LoginService` calls the `findByAlias` method of the `UserService` to retrieve the user from the database.

4.  The `UserService` uses the `UserRepository` to find the `User` entity by its alias.

5.  The `LoginService` compares the provided password with the `identifier` field of the retrieved `User` object.

6.  If the password is correct, a `LoginResponse` object is created, which contains a `UserDTO` with the user's information. This response is then wrapped in a `ServiceResponse` and returned.

7.  If the password is incorrect or the user is not found, a `LoginResponse` with an error message is returned.
