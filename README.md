# T3A2-B Full Stack App - Steve's Jobs

## By Matthew Ng, Anthony Huynh & Timothy Nguyen

### [Server Repository](https://github.com/matthewngc/T3A2-B-Server)

### [Client Repository](https://github.com/matthewngc/T3A2-B-Client)

## **Server Documentation**

---

## Installation Instructions

---

1. Clone this repository by running the following command in terminal:

    ```git clone https://github.com/matthewngc/T3A2-B-Server```

2. Move into the directory and run ```npm install``` to install dependencies
3. Create a .env file and copy the envionmental variables from the .env.sample file
4. Create a database in MongoDB Atlas and copy the database connection string
5. Paste the database connection string in the .env file for ATLAS_DB_URL
6. Set any string as the JWT_SECRET_KEY in the .env file
7. Run the server using ```nodemon```
8. Seed the database by running ```node seed.js```

---

## Libraries

---

### **Express.js**

Express is a Node.js web application framework used for building web applications and RESTful APIs. It is used in this application to build a server with routing to handle requests and send responses.

### **Mongoose**

Mongoose is a Node.js Object Data Modeling library for MongoDB, used to create and enforce schemas against the MongoDB database, as well as creating relationships between documents and models. Mongoose also provides support for validation, middleware and mapping JavaScript objects to the MongoDB database.

### **Bcrypt**

Bcrypt is a password-hashing function that applies a unique random string known as a salt to a password before hashing. It is used to encrypt passwords and sensitive data such that they can be stored securely in a database.

### **JsonWebToken**

JSON Web Token (JWT) is a standard used for securely transmitting data between two parties as a JSON object. These unique tokens are used for the purposes of authentication, where it can be assigned to a user upon login and passed on for all subsequent requests until the token expires.

### **CORS**

CORS, also known as Cross-Origin Resource Sharing, is a Node.js package that allows an API to be accessed by external origins. It is used in this application to allow the Front-end React application to access the API and fetch HTTP requests.

### **Dotenv**

Dotenv is an npm package that loads environment variables from a .env file to the process.env object to be used within a Node.js application. It is used in this application to retrieve sensitive information such as the MongoDB Atlas connection string and the JWT key from the .env file without having to expose these variables to a repository.
