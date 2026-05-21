# Production image — Vite build + nginx (CI/CD and docker-compose.prod.yml)
FROM node:20-alpine AS builder

WORKDIR /app

ARG VITE_API_URL
ARG VITE_APP_ENV=production

ENV VITE_API_URL=${VITE_API_URL} \
    VITE_APP_ENV=${VITE_APP_ENV}

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY index.html vite.config.ts tsconfig.json tsconfig.node.json ./
COPY public ./public
COPY src ./src
COPY scripts ./scripts

RUN yarn build

FROM nginx:1.27-alpine AS runtime

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -q -O /dev/null http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
