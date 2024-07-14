# AssoChain

Welcome to the AssoChain project! This guide will walk you through the installation process and provide an overview of the frameworks we are using.

## Prerequisites

Before you begin, make sure you have the following software installed on your machine:

- Node.js (version 16 or higher)
- Hardhat (version 2.22.6 or higher)

## Installation

Follow these steps to get the project up and running:

1. Clone the repository to your local machine:

    ```
    git clone https://github.com/davidfradel/AssoChain.git
    ```

2. Navigate to the project directory:

    ```
    cd AssoChain
    ```

3. Install the dependencies for the frontend:

    ```
    cd frontend
    npm install
    ```

4. Install the dependencies for the blockchain folder:

    ```
    cd ../blockchain
    npm install
    ```

## Frontend - Next.js

We are using Next.js as our frontend framework. Next.js is a React framework that provides server-side rendering and other powerful features.

To start the frontend development server, run the following command from the `frontend` directory:

```
npm run dev
```

This will start the development server on `http://localhost:3000`.

## Blockchain - Hardhat

We have chosen Hardhat as our blockchain development framework. Hardhat is a powerful tool for building, testing, and deploying smart contracts.

To compile the smart contracts and start the local blockchain network, run the following command from the `blockchain` directory:

```
npx hardhat node
```

This will start a local Ethereum network with a set of predefined accounts.

## Contributing

If you would like to contribute to the project, please follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
