## ${\color{lightblue} IRCTC \space Booking \space Platform}$

This repository is for the assignment provided by WorkIndia. The project encapsulates all the points mentioned in the assignment with the best solution possible from my end. There are few pacakages that need to be installed before running the code.

    npm install express nodemon mysql mysql2

Also, make sure to have MySQL installed in the localhost. It may not be necessary to have a database named 'irctc' created in MySQL.

After installing these packages, run the below command to start the api

    node app.js

---

### ${\color{lightblue} Folder \space Structure}$

After the API starts, there are many endpoints and routes created, the folder structure is explained below

    ---- api                            contains API endpoints
     |    |--- basic.js                  basic endpoints (get, add, etc.)
     |    |--- login.js                  login endpoints (login user, add user, etc.)
     |    |--- middleware.js             middlewares
     |    |--- tables.js                 tables schema using SQL
     |
     |-- controller                      routes or controllers
     |    |--- adminController.js        admin controllers (add train, update seats)
     |    |--- basicController.js        basic controllers (see train, status of train)
     |    |--- publicController.js       public controllers (login, book train, main code logic...)
     |    |--- testController.js         few basic data will be automatically added via these api when the server starts
     |
     |-- data                            data related work
     |    |--- authToken.js              authorisation token
     |    |--- data.js                   test data to be added in mysql
     |
     |-- node modules                    localhost modules
     |-- app.js                          application file
     |-- databaseConnection.js           MYSQL connection file
     |-- package-lock.json               dependencies (not to be altered)
     |-- package.json                    dev dependencies


Now the folder are structured to exploit the concept of microservices, such that all the api's are first defined with their MySQL queries in the `api` folder and then they are called one or more times in the `controller` foler to perform the specified operations. Also, these controllers are linked together inside the `app.js` such that all the routing and Data handling takes place from the root file `app.js`.

---

![Test](./WorkIndia.jpg)









