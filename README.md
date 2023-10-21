# NodeJS-CRUD
A basic application in Nodejs with curd functionality and MySQL as database

## DEMO VIDEO: [LINK](https://www.loom.com/share/344b8a63473a4f6c8d2558c7b71d6f47?sid=4b3f21f8-57c1-49f7-a2bf-9d7e1c5ec2db)


### Functionalities
#### Endpoints
##### Authenticated
1. GET `/api/v1/users/${id}` : to get a specific user
2. PUT `/api/v1/users/${id}` : to udpate a user
3. PATCH `/api/v1/users/${id}` : to udpate a users detail
4. DELETE `/api/v1/users/${id}` : to delete a user


##### Un-Authenticated endpoints
1. POST `/api/v1/users` : to create a user
2. POST `/api/v1/db/${tableName}` : to get a create a table user
It is recommended that you create table name as `user` only.


#### HOW TO USE 
##### ON LOCAL :
**PRE-REQUISITE: INSTALL MYSQL workbench in you local system so that node can communicate with it** 
1. Run this command from home dir `bash start.sh` 
2. Using the postman collection provided now you can execute and check for its functioning.


#### Using Docker:
1. Ensure you have docker running on your system
2. Run these commands `docker compose up` followed by `bash startapplication.sh`
3. this command will start docker images in your local.
4. Now you can test the post man collection shared with you.



