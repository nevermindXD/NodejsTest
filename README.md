

# Node Example with jwt and Moongose

Hey there, this is an application from scratch and uses nodeJS with babel.

## Heroku 

This Application is also deployed in heroku, you can test with Insomnia, ARC or whatever program you like.

https://example-of-node.herokuapp.com/

## API
This API contains public and private.
Public: https://example-of-node.herokuapp.com/api/v1/public/
Private: https://example-of-node.herokuapp.com/api/v1/private/

## DB Tables

 - Teacher
 - Student
 - ClassI

## Calls
Some of diferents call that you can do are the following:
(post) https://example-of-node.herokuapp.com/api/v1/public/teacher
with a JSON or multipart form with the following information

 - Name
 - Lastname
 - Mail
 - Password
 - Picture (only in multipart Form)

(get)  https://example-of-node.herokuapp.com/api/v1/private/teacher
you need to add Authorization value in header ("Authorization":"JWT :token")

## Dependencies

 - Bcrypt
 - jsonwebtoken
 - cloudinary
 - mongoose
 - nodemon
 - etc
