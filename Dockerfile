FROM nginx:alpine

# Copy the static files to the nginx public directory
COPY . /usr/share/nginx/html

# Copy a custom nginx configuration to handle potential routing needs
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
