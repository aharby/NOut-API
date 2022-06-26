# NOut-API
Express-Nodejs Rest API.

## get started
1.  npm install

2. npm run build-local

3. npm start

## Routes
post /api/v1/register {expected json data: email, firstname, lastname, password, co, street, hauseNr, zip, city, country}

post /api/v1/auth/signin {expected json data: email, password}

get /api/v1/users

get /api/v1/users/:userId

post /api/v1/users/search {expected json data: email}

get /api/v1/interests (returens list of interests)

post /api/v1/users/interests/:userId {expected json data: interestName}


## Reference code
https://github.com/larswaechter/expressjs-api
