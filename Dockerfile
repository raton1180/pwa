FROM node:alpine

WORKDIR /app

 #Clone the React project from the repository
RUN git clone https://github.com/raton1180/pwa.git .

# Install project dependencies
RUN npm install

# Build the React project
RUN npm run build

# Expose the port that the React app will run on
EXPOSE 3000

# Command to run the React app
CMD ["npm", "start"]