ARG NODE_VERSION=latest

FROM node:${NODE_VERSION}

ARG VERCEL_ISA_BLOG_TOKEN
ARG VERCEL_APP_NAME
ARG VERCEL_ORG_ID
ARG VERCEL_PROJECT_ID

RUN <<EOI
apt-get update && apt-get install -y \
    npm \
    git \
    curl \
    wget \
    vim
EOI

## print the version of node and npm
RUN <<EOI
node -v && npm -v
EOI

RUN <<EOI
npm install -g vercel@latest
npm install -g vite
npm install -g prisma
EOI

WORKDIR /app

COPY package*.json ./

RUN <<EOI
npm install
EOI

COPY ./ ./

CMD ["npm","run", "dev"]

