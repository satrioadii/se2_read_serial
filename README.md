# API for To Do Serial Communication using Serialport.io

This project will help you to do serial communication with embedded systems such as
Raspberry PI, Arduino, or STM32. Follow instruction below to try this on your own.

## Getting Started

These instructions will get you a copy of the project up and running on your
local machine for development. See deployment for notes on how to deploy the
project on a live system.

### Prerequisites

If you interested to clone this project, you may use this command.

```
git clone https://github.com/satrioadii/se2_read_serial.git
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
```

Then run the server with this command

```
npm run dev
```

The development server is started on port 7001. If the PORT variable is not
exist, the port 5000 will be selected by default.

## Built With

- [Express JS](https://expressjs.com/) - The web framework used
- [SerialPort](https://serialport.io/) - Serial Communication Package

## Authors

- **Satrio Adi** - [satrioadii](https://github.com/satrioadii)

## License

This project is licensed under the MIT License

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc
