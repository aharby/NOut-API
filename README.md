# NOut-API
Express-Nodejs Rest API.

## get started
1.  npm install

2. npm run build-local

3. npm start

## End-point
https://nout-api.herokuapp.com/api/v1

## Routes
post /register {expected json data: email, firstname, lastname, password, co, street, hauseNr, zip, city, country}

post /auth/signin {expected json data: email, password}

get /users

get /users/:userId

post /users/search {expected json data: email}

get /interests (returens list of interests)

post /users/interests/:userId {expected json data: interestName}


## Reference code
https://github.com/larswaechter/expressjs-api
