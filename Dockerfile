FROM nginx:mainline-alpine


# Copy the static website
# Use the .dockerignore file to control what ends up inside the image!
COPY dist /usr/share/nginx/html

# Run BusyBox httpd