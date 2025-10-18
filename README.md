# HNG Stage Zero Task - Simple Profile API

This is a simple Node.js and Express application that serves a single API endpoint. The endpoint returns basic user information along with a random cat fact fetched from an external API.

## Features

-   Express server setup.
-   Environment variable loading with `dotenv`.
-   Validation to ensure all required environment variables are present on startup.
-   A single `GET /me` endpoint.
-   Integration with an external API (`https://catfact.ninja/fact`) to fetch data.
-   Robust error handling for external API calls.

## Prerequisites

-   Node.js (v14 or higher recommended)
-   npm (comes with Node.js)

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd HNG-Stage-Zero-Task
    ```

3.  **Install the dependencies:**
    ```bash
    npm install
    ```

## Configuration

This project uses a `.env` file to manage environment variables.

1.  Create a file named `.env` in the root of the project.
2.  Add the following variables to the file, replacing the placeholder values with your information:

    ```properties
    EMAIL="your.email@example.com"
    FULL_NAME="Your Full Name"
    STACK="Your Backend Stack (e.g., Node.js)"
    PORT=3000
    ```

## Usage

To start the server, run the following command:

```bash
node index.js
```

The server will start and listen on the port specified in your `.env` file (e.g., `Server is running on port 3000`).

## API Endpoint

### Get User Profile

-   **URL:** `/me`
-   **Method:** `GET`
-   **Description:** Returns the user's profile information and a random cat fact.
-   **Success Response (200 OK):**
    ```json
    {
      "status": "success",
      "user": {
        "email": "your.email@example.com",
        "name": "Your Full Name",
        "stack": "Node.js"
      },
      "timestamp": "2025-10-18T14:48:25.075Z",
      "fact": "The Maine Coon cat is America's only natural breed of domestic feline."
    }
    ```