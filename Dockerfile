FROM node:16-alpine as client
WORKDIR /app/client
COPY /client/package.json /app/client
RUN npm install
COPY /client /app/client
RUN npm run build
FROM node:16-alpine as sever
WORKDIR /app
COPY /server/package.json /app
RUN npm install
COPY /server /app
COPY --from=client /app/client/build /app/client-build
EXPOSE 8080
CMD ["npm", "run", "start"]
