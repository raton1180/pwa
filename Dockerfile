FROM node:alpine

WORKDIR /app

COPY package.json /app

# Install project dependencies
RUN npm install

COPY . /app

# Build the React project
RUN npm run build

# Expose the port that the React app will run on
EXPOSE 5000

# Command to run the React app
CMD ["npm","run", "dev"]