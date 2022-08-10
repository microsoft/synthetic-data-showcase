# SDS web application

Web application that allows you to synthesize, aggregate and evaluate your data directly on your browser. This requires no server or backend APIs to process the data, the data processing happens directly in the browser using Javascript and Web Assembly. This means that computation is performed locally and the data never leaves your machine.

# How to run?

The web application runs based on Typescript and the Web Assembly bindings around the `core` library.

To run it we need to build the wasm bindings as well the web application. If you want to compile it yourself, please refer to the [advanced setup](#advanced-setup) session below.

However, **to make the web application easier to run we provide a docker image that can be locally built**, so you don't need to worry about the details of compiling the wasm bindings and also the web application.

## Locally run the web application with docker

> **New to docker?** Take a look at [here](https://docs.docker.com/get-started/overview/) first.

To run the application locally with docker, please follow these steps:

1. Make sure you have docker up and running on your machine (more details on how to install it based on your operating system can be found in [here](https://docs.docker.com/engine/install/)).
2. Make also sure you have docker compose installed, this will allow us to run the application with a single command (more details about how install it can be found in [here](https://docs.docker.com/compose/install/))
3. After docker is installed and running, as well as docker compose, browse to the root directory of the cloned repository and run: `docker-compose up --build` (press CTRL + C to stop it)

## Advanced setup

### I. Compile the wasm bindings

To compile the wasm bindings please follow the steps provided in [here](../lib-wasm/README.md#how-to-compile).

### II. Install Node tooling

The application relies on NodeJS and Yarn for development and building, so you will need Yarn and Node.

### III. Install dependencies and start

Browse to the root of the cloned repository and run:

```bash
> yarn install
> yarn start:webapp
```

This will start the web application that should be accessible on [http://localhost:3000](http://localhost:3000).

> The website will start in development mode, which relies on browser native features currently supported only in Edge and Chrome. However, the docker imagine above is targeted for production and should support other browsers.

# Usage

The web application allows the user to experiment with their data and check the results in real time, without the need to run the command line application. It is currently divided into 4 steps.

## Prepare

Allows the user to load data (csv or tsv files), join multiple datasets, as well as performing transformations if necessary (binning, recoding, etc).

## Select

Allows the user to select the desired columns for synthesis and provides real-time feedback about the privacy risk related to data.

## Synthesize

Allows the user to select the desired synthesis mode, configure its parameters and perform the synthesis. Through metrics and charts, the tool also enables comparison between results for different synthesis modes and parameters.

The result of your synthesis can be directly downloaded, including aggregate and synthetic data. For a full report, there is `Download assets` button, which will include a PowerBI report comparing the aggregate and synthetic data.

## Navigate

Allow the user to compare the synthetic data counts with the aggregated data counts.
