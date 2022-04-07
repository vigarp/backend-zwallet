#  Zwallet

In this repository, This is a Backend for Zwallet App. This is based API for [Zwallet Frontend](https://github.com/vigarp/zwallet-frontend)

##  Getting Started

To get the Node server running locally:

* Clone this repo with `git clone https://github.com/vigarp/zwallet-backend.git project-name`

* `cd project-name`

* `npm install` to install all required dependencies

* Create a `.env` file and add following:
```sh

DB_HOST = yourlocalhost
DB_USER = youruser
DB_PASSWORD = yourpasswordz
DB_NAME = backend_zwallet
SECRET_KEY_JWT = `P4sswrod127;`
REACT_APP_URL_FRONTEND = http://localhost:3000

```

* `node index.js or npm run dev if nodemon installed in your computer` to start the local server

##  Architechture

The architechture to created this project:

1. Database MySQL

2. Node JS

3. Express JS ( Framework )

4. Socket.IO (realtime web socket)


##  API Endpoint

**root endpoint**

`POST /login`

`POST /register`

**users endpoint**

`GET /`
*get all users*

`GET /:id`
*detail user*

`PUT /:id`
*edit user*

`PUT /:id/picture`
*edit picture user*

`PUT /:id/phone`
*edit phone user*

`.DELETE /:id/phone`
*delete phone user*

`.PUT /:id/password`
*edit password user*

`.DELETE /:id`
*delete user*

`.POST /:id/topup`
*top-up wallet*

`.GET /:id/history`
*show history*

`.POST /:id/transfer`
*create transfer*

Documentation : [Postman Documentation](https://documenter.getpostman.com/view/17417645/UVyvvEnT)
