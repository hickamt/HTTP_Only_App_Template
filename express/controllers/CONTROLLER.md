## Controller Logic

The 'C' in MVC (Model View Controller) server structure.

The controller(s) directory will handle the routing logic. In the /routes/api directory we have created a method of 'routing' api requests to the proper method such as a path for /employees with a GET request.

A controller file takes 'control' of the logic necessary to complete the specific requests. This is a seperation of concerns in that the 'routes' should only filter requests and 'route' them to the appropriate logic 'controller'.