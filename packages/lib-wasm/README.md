# SDS Wasm library

Web assembly bindings around the core library for data aggregation, synthesis and evaluation.

# How to compile

The project can be compiled and run on both Windows and Linux operating systems, you will need the stable Rust tolling installed in order to compile it.

## I. Install Rust tooling

This will be the same base tooling required to build the core library, so please refer to [here](../core/README.md#i.-install-rust-tooling).

## II. Install Wasm Pack

Besides the base Rust tooling, Wasm Pack is used to compile the Web Assembly bindings and JavaScript glue. This allows the Rust implementation to directly run on the browser without the need of a server. Please follow these [steps](https://rustwasm.github.io/wasm-pack/installer/) to install it according to your operating system.

## III. Compile Wasm bindings

Open a command line on the root directory of the cloned repository and run:

```bash
> cd packages/lib-wasm
> wasm-pack build --release --target web --out-dir ../../target/wasm
```

This will build the wasm code and JS glue and put it under `target/wasm`.
