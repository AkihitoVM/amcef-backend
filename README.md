## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
git clone git@github.com:AkihitoVM/amcef-backend.git # or clone your own fork
cd amcef-backend
npm install
touch .env
npm start
```
## example of .env file
```sh
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=amcef
SALT=$2a$10$psPHgzGvYT5xOThEvsKWs.
JWTACCESS=JWTSECRET
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## API documentation

Visit http://localhost:5000/swagger