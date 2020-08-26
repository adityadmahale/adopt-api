#Features:

1. The website lists down different types of plants in the form of a card with images.
2. Provides feature to filter plants based on their type.
3. The shop page provides a search box to search plants by their name.
4. Users will be able to add plants to a cart.
5. Info link on the card to show a modal with plant specific information.
6. Authentication and Authorization.
7. Encryption of user password.
8. POST user cart payload.
9. User details page listing down adoption history.

#Design and Implementation:

I have used following modules for the the features listed down below:
Authentication and Authorization - jsonwebtoken : To generate JWT on successful authentication
2. Client and server side validation - joi
3. Encryption - bcrypt
4. Configuration - config
5. Error handling - express-async-errors

#List of endpoints;

I have created a HTTP API service supporting four endpoints. The server supports authentication and authorisation of users. Only admin users have privilege to perform DELETE, PUT and POST operations. The user password is encrypted and stored in the MongoDB database. The users are sent a JSON Web Token when authentication is successful.

/plants
GET – Returns list of plants
PUT(Only admin) – /plants/id
Mandatory properties – name, description, category
POST(Only admin) - Mandatory properties – name, description, category
DELETE(Only admin) – – /plants/id
Removes plant by given id

/categories
 	GET – Returns list of categories.
PUT(Only admin) – /categories /id
Mandatory properties – name
POST(Only admin) – /categories /id
Mandatory properties – name
DELETE(Only admin) – /categories /id
Removes category by given id

/carts
Only for authenticated users: Requires “x-auth-token” header with JWT.
GET – Returns list of carts.
POST– /categories /id
Mandatory properties – userId, cart

/auth
POST – Authenticate using email and password
e.g. {“email”: “test@gmail.com”, “password”: “test”}
Responds with JWT in the body

/users
POST – Register a new user
Responds with JWT in the x-auth-token header