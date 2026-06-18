
FROM node:20 AS client-builder

WORKDIR /app/client

COPY client/package*.json ./
RUN npm install

COPY client .
RUN npm run build


FROM node:20

WORKDIR /app/server

COPY server/package*.json ./
RUN npm install

COPY server .
RUN npx prisma generate 


# Copy React build into project
COPY --from=client-builder /app/client/dist /app/client/dist

EXPOSE 3000

CMD ["npm","start"]