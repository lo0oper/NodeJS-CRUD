#!/bin/bash

npm install
npm start

# Define the URL of the local server
url="localhost:3000/db/createtable/users"  # Change the URL and port to match your local server configuration

# Make an HTTP GET request using curl
response=$(curl -s "$url")

# Check if the request was successful (HTTP status code 200)
if [ $? -eq 0 ]; then
    echo "Request to localhost was successful!"
    echo "Response content:"
    echo "$response"
else
    echo "Request to localhost failed."
fi