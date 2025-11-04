FROM node:16.20.0

WORKDIR /app

COPY package.json .

RUN if [ "$NODE_ENV" = "development" ]; \
       then npm install; \
       else npm install --only=production; \
       fi

COPY . ./

EXPOSE 8000

CMD ["node","server.js"]