ARG NODE_VERSION=20.9.0

FROM node:${NODE_VERSION}

ARG VERCEL_ISA_BLOG_TOKEN
ARG VERCEL_APP_NAME
ARG VERCEL_ORG_ID
ARG VERCEL_PROJECT_ID

RUN <<EOI
apt-get update && apt-get install -y \
    yarn \
    git \
    curl \
    wget \
    vim
EOI

## print the version of node and npm
RUN <<EOI
node -v && yarn -v
EOI

RUN <<EOI
yarn add global npm@10.7.0
yarn global add vercel
yarn global add vite
yarn global add prisma
EOI

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN <<EOI
yarn install
EOI

COPY ./ ./

CMD ["yarn", "dev"]

