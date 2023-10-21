docker build . -t node-crud-application
docker images node-crud-application:latest   
docker run -p 3000:3000 -d node-crud-application