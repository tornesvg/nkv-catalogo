FROM nginx:alpine

# Copiar configuración de Nginx para escuchar en el puerto 8080
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar archivos públicos de la aplicación
COPY public/ /usr/share/nginx/html/

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
