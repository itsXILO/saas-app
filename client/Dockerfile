FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG VITE_CLERK_PUBLISHABLE_KEY
ARG VITE_BASE_URL
RUN npm run build

FROM node:22-slim
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]