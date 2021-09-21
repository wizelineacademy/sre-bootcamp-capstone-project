FROM node:14-alpine

WORKDIR /app

COPY package.json /app

ARG NODE_ENV=${NODE_ENV:-production}

ARG APP_PORT=${APP_PORT:-8000}

RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
    fi

COPY . /app

EXPOSE $APP_PORT

CMD ["node", "index.js"]

# App must run on port 8000
# Add your instructions to dockerize the application
