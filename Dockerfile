FROM arm32v7/node:18-alpine
WORKDIR /app
COPY . .
CMD ["node", "dist/index.js"]