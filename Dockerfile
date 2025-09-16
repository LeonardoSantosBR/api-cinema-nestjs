FROM node:20-alpine
WORKDIR /API-CINEMA
COPY . .
RUN npm install
ENV DATABASE_URL="mysql://root:0407@host.docker.internal:3306/apicinema"
ENV JWT_SECRET="KHDFLAKHSDGLÇKHLAKDKHFGLNFGL" 
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/main.js"]