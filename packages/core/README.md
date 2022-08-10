# SDS core library

Core implementation of the synthetic data showcase library for data aggregation and synthesis. This is implemented in Rust, but we offer bindings for the main capabilities to both [python](../lib-python/README.md) and [web assembly](../lib-wasm/README.md). If you are looking for a directly exposed DP Synthesizer, please refer to [`pac-synth`](../lib-pacsynth/README.md).

# How to compile

The project can be compiled and run on both Windows and Linux operating systems, you will need the stable Rust tolling installed in order to compile it.

Please follow the steps below to compile it locally.

## I. Install Rust tooling

Please follow the [steps](https://www.rust-lang.org/tools/install) according to your operating system to install the Rust tooling.

## II. Compile core library and CLI application

Open a command line in the root directory of the cloned repository and run:

```bash
> cargo build --release
```

This will compile the core library and CLI application in release mode - binaries will be stored in the `target/release` folder. The `sds-cli` binary (`sds-cli.exe` on Windows) should be available in there.
