# --- compile wasm bindings from rust ---
FROM rust:1.55 as wasm-builder

WORKDIR /usr/src/wasm-pack

# compile wasm pack from source
RUN \
	# generate md5 file to validate wasm pack
	echo "db9d61182a4d83feb2415accc2f9104b v0.10.1.tar.gz" > wasm_pack_0_10_1.md5 && \
	# get wasm pack sources
	wget https://github.com/rustwasm/wasm-pack/archive/refs/tags/v0.10.1.tar.gz && \
	# validate checksum
	md5sum -c wasm_pack_0_10_1.md5 && \
	# extract
	tar -xvf v0.10.1.tar.gz && \
	cd wasm-pack-0.10.1 && \
	# there is a bug on the latest version of wasm pack (0.10.1) that causes a segfault
	# use static curl to workaround it (https://github.com/rustwasm/wasm-pack/issues/823)
	sed -i "s/curl = \"0.4.13\"/curl = { version = \"0.4.13\", features = ['static-curl'] }/g" Cargo.toml && \
	cargo install --path .

WORKDIR /usr/src/sds

COPY . .

# build the wasm bindings for webapp to use
RUN cd packages/lib-wasm && wasm-pack build --release --target web --out-dir ../../target/wasm

# --- compile application from typescript ---
FROM node:14 as app-builder

WORKDIR /usr/src/sds

# copy from rust build
COPY --from=wasm-builder /usr/src/sds ./

# setting sds wasm log level
ENV VITE_SDS_WASM_LOG_LEVEL=warn

# install dependencies and build
RUN yarn install && yarn build:

# --- statically serve built application with nginx ---
FROM nginx:1.21

COPY --from=app-builder /usr/src/sds/packages/webapp/dist /usr/share/nginx/html