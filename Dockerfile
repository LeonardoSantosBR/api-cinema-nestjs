FROM node:20-alpine
WORKDIR /API-CINEMA
COPY . .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/main.js"]