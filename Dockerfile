# Stage 1: Build the Vite app
FROM node:18-alpine AS build

WORKDIR /app

# Copy only necessary files for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all the application files
COPY . .

# Build the application in production mode
RUN npm run build

# Stage 2: Serve the app with nginx
FROM nginx:alpine

# Copy the built files to nginx's web directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
