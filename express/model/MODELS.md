## MODELS as a Server Side DataBase

The models folder is the 'M' in Model View Controller (MVC) architecture.

This simulates the json objects that a REST API would typically GET, PUT, POST, DELETE from a database like MongoDB. Files in the model are json objects and include:

- employees.json, holding four mock employees with id, firstname, and lastname property key:values
- users.json, used for sign-up and login purposes

# Users.json | SignUp and Login

This file is used for registration (signup) and authorization (login validation). Routes for each process will be '/routed' to the '/controller' logic.