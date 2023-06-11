Creating Todo Application

# Auth0: #
I utilized Auth0 for this application with built in user storage features. Only email will be stored to a mongodb atlas.

# To utilize mongodb atlas for this project: #
- create a database for todo app
- click to connect to database until you find a database connection string ( you may need to get mongodb atlas compass)
- copy everything that comes after 'mongodb+srv://' in the connection string
- in the */todo/server * directory created a **.env** file.
- inside that file create two variables:
```
MONGO_PASS=<copied portion of string>
```
