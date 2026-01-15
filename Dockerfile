FROM node:20-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

ENV NITRO_HOST=0.0.0.0

ENV SITE_BASE_URL=http://127.0.0.1
ENV API_BASE_URL=https://new-api.avione.uz/api
ENV IMG_BASE_URL=http://127.0.0.1/static/images

EXPOSE 7000

CMD ["npm", "run", "start"]
