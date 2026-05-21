FROM oven/bun:1-alpine AS base
WORKDIR /usr/src/app

FROM base AS install
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

FROM oven/bun:1-alpine AS release
WORKDIR /usr/src/app

COPY --from=install /usr/src/app/node_modules node_modules
COPY . .

# run the app
ENTRYPOINT [ "bun", "start" ]
