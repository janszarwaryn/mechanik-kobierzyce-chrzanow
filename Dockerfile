# syntax=docker/dockerfile:1

# --- build stage: generate the static SSG output ---
FROM node:24-alpine AS build
WORKDIR /app

# Copy the full source before install: the postinstall hook runs `nuxt prepare`,
# which needs nuxt.config + i18n locale files present.
COPY . .
RUN npm ci && npm run generate

# --- runtime stage: serve the static site with nginx ---
FROM nginx:1.27-alpine AS runtime

# custom config: pretty-url fallbacks + long-cache for hashed assets
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/.output/public /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://localhost/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
