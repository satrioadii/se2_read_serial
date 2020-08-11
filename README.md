# API for satrioadi.com

Backend service for public in order to retrieve the data on my personal website
(satrioadi.com).

## Getting Started

These instructions will get you a copy of the project up and running on your
local machine for development. See deployment for notes on how to deploy the
project on a live system.

### Prerequisites

If you interested to clone this project, you may use this command.

```
git clone https://github.com/satrioadii/public-api-satrioadi.com.git
```

### Installing

A step by step series of examples that tell you how to get a development env
running

You can start the development server by enter this command after the clone
repositories succeed.

```
npm install
```

In order to run the server in development mode, you will need nodemon. You can
install it by using this command.

```
npm install -g nodemon
```

Setup the environment variables in folder config with filename **config.env**.
This is the example.

```
NODE_ENV=development
PORT=7001

MONGO_URI=YOUR_MONGO_URI
```

Then run the server with this command

```
npm run dev
```

The development server is started on port 7001. If the PORT variable is not
exist, the port 5000 will be selected by default.

## Deployment

In order to start this project in a production server, run this code.

```
npm run start
```

You may use one of this reference as the development process in your server.

- [Setup Node JS App for Production](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04) -
  Deployment using Nginx on Ubuntu

Or search for your preferred options.

## Built With

- [Express JS](https://expressjs.com/) - The web framework used
- [Mongoose](https://mongoosejs.com/) - MongoDB Object Modelling

## Authors

- **Satrio Adi** - _Initial work_ - [satrioadii](https://github.com/satrioadii)

## License

This project is licensed under the MIT License

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc
