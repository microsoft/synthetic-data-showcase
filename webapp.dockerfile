# --- compile wasm bindings from rust ---
FROM rust:1.58 as wasm-builder

WORKDIR /usr/src/wasm-pack

# compile wasm pack from source
RUN \
	# generate md5 file to validate wasm pack
	echo "9e6c24fa47e415330d50b29427c30942 v0.10.2.tar.gz" > wasm_pack_0_10_2.md5 && \
	# get wasm pack sources
	wget https://github.com/rustwasm/wasm-pack/archive/refs/tags/v0.10.2.tar.gz && \
	# validate checksum
	md5sum -c wasm_pack_0_10_2.md5 && \
	# extract
	tar -xvf v0.10.2.tar.gz && \
	cd wasm-pack-0.10.2 && \
	cargo install --path .

WORKDIR /usr/src/sds

COPY . .

# build the wasm bindings for webapp to use
RUN cd packages/lib-wasm && wasm-pack build --release --target web --out-dir ../../target/wasm

# --- compile application from typescript ---
FROM node:16 as app-builder

WORKDIR /usr/src/sds

# copy from rust build
COPY --from=wasm-builder /usr/src/sds ./

# setting sds env vars
ENV VITE_SDS_WASM_LOG_LEVEL=warn
ENV VITE_SDS_CONTEXT_CACHE_SIZE=4

# install dependencies and build
RUN yarn install && yarn build:

# --- statically serve built application with nginx ---
FROM nginx:1.21

COPY --from=app-builder /usr/src/sds/packages/webapp/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf