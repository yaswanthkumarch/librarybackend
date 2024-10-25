# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of your application files
COPY . .

# Expose the application port
EXPOSE 3000

# Command to run your application
CMD ["node", "index.js"]  
