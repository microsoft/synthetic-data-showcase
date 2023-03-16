# Registry to pull images from
ARG REGISTRY

# --- compile wasm bindings from rust ---
FROM ${REGISTRY}rust:1.68 as wasm-builder

# install wasm-pack to build wasm bindings
RUN cargo install wasm-pack

WORKDIR /usr/src/sds

COPY . .

# build the wasm bindings for webapp to use
RUN cd packages/lib-wasm && wasm-pack build --release --target web --out-dir ../../target/wasm

# --- compile application from typescript ---
FROM ${REGISTRY}node:16 as app-builder

WORKDIR /usr/src/sds

# copy from rust build
COPY --from=wasm-builder /usr/src/sds ./

# setting sds env vars
ENV VITE_SDS_WASM_LOG_LEVEL=warn

# install dependencies and build
RUN npm install replace -g
RUN replace "sds-wasm" "@essex/sds-core" ./target/wasm/package.json
RUN yarn install
RUN yarn build

# --- statically serve built application with nginx ---
FROM ${REGISTRY}nginx:1.21

COPY --from=app-builder /usr/src/sds/packages/webapp/dist /usr/share/nginx/html