# User Todo-List 

User Todo-List with JWT authorization and validation user input built with Sequelize, Express.js and Node.js.

---

## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm



### Yarn installation

  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Install

    $ git clone https://github.com/AkihitoVM/amcef-backend.git
    $ cd amcef-backend
    $ yarn install
    $ touch .env

## Example of .env file

```sh
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=amcef
SALT=$2a$10$psPHgzGvYT5xOThEvsKWs.
JWTACCESS=JWTSECRET
```

## Running the project

    $ yarn start



## Your app should now be running on [localhost:5000](http://localhost:5000/).



## API documentation

### Visit http://localhost:5000/swagger

