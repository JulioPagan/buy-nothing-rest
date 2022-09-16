## Buy Nothing REST API
Programmer: Julio Pagan

This project is a REST API built using the NestJS framework for the Javascript programming language.
The application assumes you are running an Ubuntu 20.04.3 system

## Automatically install dependencies, build and run tests, generate test coverage and run the application
```bash
# Run the following two commands
$ sudo chmod 777 run.sh
$ ./run.sh
# (you will be prompted to type 'y' and press 'enter' to continue)
```



## Manually execute each command to execute the application:

## Installation

```bash
$ sudo apt update
$ sudo apt upgrade
$ sudo apt install npm
# (you will be prompted to type 'y' and press 'enter' to continue)
$ npm install
```


## Test

```bash
# run unit tests
$ npm run test

# generate test coverage
$ npm run test:cov

# navigate to the test coverage report
$ cd coverage/lcov-report/index.html
```


## Running the app

```bash
# development
$ npm run start



## License
Nest is [MIT licensed](LICENSE).
