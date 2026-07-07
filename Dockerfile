# syntax=docker/dockerfile:1

# --- build stage: generate the static SSG output ---
FROM node:24-alpine AS build
WORKDIR /app

# Copy the full source before install: the postinstall hook runs `nuxt prepare`,
# which needs nuxt.config + i18n locale files present.
COPY . .
# BuildKit cache mount keeps the npm cache warm across rebuilds.
RUN --mount=type=cache,target=/root/.npm npm ci && npm run generate

# --- runtime stage: serve the static site with nginx ---
FROM nginx:1.27-alpine AS runtime

# nginx config + shared security-headers snippet
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build /app/.output/public /usr/share/nginx/html

EXPOSE 80
# Use 127.0.0.1 (not localhost): busybox resolves localhost to ::1 first, and
# nginx listens on IPv4/IPv6 explicitly below - 127.0.0.1 is unambiguous.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
