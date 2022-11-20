# Node Boiler Plate for Beginners

## Purpose:

To provide platform for beginner to Develope APIs.

Includes API Calling, Express as intermediator, Connecting MongoDB(NoSQL) with Node and Performing CRUD operations.

Have adapted methodology to process algorithm using `Async/Await`.

Basic Call to **Generate and download** *Spreadsheets* as well as *CSVs* using **[ExcelJS](https://www.npmjs.com/package/exceljs)**.

Make a call to **Take MongoDb's Dump**


## Prerequisites on Machine:

1. [Node JS](https://nodejs.org/en/download/)
2. `npm` (Node Package Manager) - Mostly gets installed at the time of nodejs installation
3. `git`(Repository Manager)
```sh
$ sudo apt-get install git
```
4. [Mongodb](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04)
5. [Postman](https://www.postman.com/downloads/) - Tool to test API

## Steps To Execute:

1. Clone the Repo using
```sh
$ git clone https://github.com/hardik2792/node-api-boiler.git
```
2. Open Terminal, change the path to cloned project.
3. Execute
```sh
$ npm install
```
4. After successfully execution of above steps, then execute the final step to Start the server
```sh
$ npm start
```
5. Open your browser and paste the below Link
`localhost:4000/testConnection`

### End Points registered

| End points | Type | Description
| :------------ |:---------------:|:---------------:|
| 1. `/testConnection` | **GET** | To verify Server working |
| 2. `/todo/create` | **POST** | To create todo task |
| 3. `/todo/get` | **GET** | To get todo list |
| 4. `/todo/update/:id` | **PUT** | To update todo  |
| 5. `/todo/delete/:id` | **DELETE** | To add todo task |
| 5. `/file/generate/:type` | **DELETE** | To generate XLSX/CSV file and Download |
| 5. `/file/generate/` | **DELETE** | To add todo task |

