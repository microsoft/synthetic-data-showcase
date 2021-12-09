# SDS Python library

Python bindings around the core library for data aggregation and synthesis.

# How to compile

To compile the python bindings please follow these steps.

## I. Install Python and Pip

You will need _python_ and _pip_ installed on your system.

## II. Install Rust tooling

The python bindings depends on the core library. You will need the Rust tooling installed in order to compile it. To install it, please refer to [here](../core/README.md#i.-install-rust-tooling).

## III. Create a virtual env

Go to the folder where you want to store your virtual environment and run:

```bash
> python -m venv .env
> source .env/bin/activate
```

## IV. Install the required dependencies

Install _Maturin_ to build the bindings.

```bash
> pip install maturin
```

## V. Generate the python bindings

Browse to the `lib-python` package, build and install it as a python module on the current virtual environment.

```bash
> cd packages/lib-python
> maturin develop --release
```
