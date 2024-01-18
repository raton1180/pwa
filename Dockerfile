FROM node:alpine

COPY . .

# Install project dependencies
RUN npm install

# Build the React project
RUN npm run build

# Expose the port that the React app will run on
EXPOSE 5000

# Command to run the React app
CMD ["npm", "start"]