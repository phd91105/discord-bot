FROM arm32v7/node:18-alpine AS dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

FROM arm32v7/node:18-alpine AS build
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN yarn build
CMD ["node", "dist/index.js"]