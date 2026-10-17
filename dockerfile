
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install


COPY index.js ./
EXPOSE 3000

#se ejecuta al iniciar el contenedor
CMD ["node", "index.js"]
