const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const path = require("path");
const credentials = require("./middleware/credentials");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5500;

/*
According to https://betterprogramming.pub/jwt-ultimate-how-to-guide-with-best-practices-in-javascript-f7ba4c48dfbd
to help prevent Cross Site Request Forgery attacks it is good practice to include CSRF Tokens.
const csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });

// Exmaple page of CSRF Token being used as middleware
app.get('/page', csrfProtection, function (req, res) { res.render('/', { csrfToken: req.csrfToken() })});
*/

// Custom middleware for logging (event emiter)
// Logic for logging events in /middleware directory
// Logged events are located in /logs directory
app.use(logger);

// Adding Header to handle CORS Access-Control-Allow-Credentials
// PreCORS credential check and fetch cookies credentials requirement
// Also, this must be added BEFORE 'app.use(cors())'
app.use(credentials);

// Middleware from the 'cors' library
// Logic for corsOptions created in the /config directory
app.use(cors(corsOptions));

// Built-in middleware to handle urlencoded data
// meaning, form data such as:
// 'content-type: application/x-www-form-urlencoded', etc...
app.use(express.urlencoded({ extended: false }));

// built-in middleware to extract json data from request
app.use(express.json());

// Middleware for cookies
app.use(cookieParser());

// STATIC FILES in Public Directory: built-in Express middleware to serve static files
// also adds the public files such as favicon.ico, style.css, images
// Each directory/subdirectory which depend on these public files/images/styles
// need a path explicitly added: 'app.use('/givePath', ....static())'
app.use("/", express.static(path.join(__dirname, "/public")));

// OPEN ROUTES: API Endpoint Redirects to Routing, then /routes -> /controllers
app.use("/", require("./routes/root")); // serving the static html index.js file
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/authorization"));
app.use("/refresh", require("./routes/refreshToken"));
app.use("/logout", require("./routes/logout"));

// JWT VERIFICATION REQUIRED for everything after this app.use(verifyJWT) statement
app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));

// Fall Through OR Catch All: app.all() catches any request that makes it this far down the 'waterfall'
// and sends the (404) 'not found' or 'bad request' back to the caller/client
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "Peugeot404.jpg"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// Anonymous Error Handling
// A 'custom' middleware function
// Logic for errorHandler() in /middleware directory
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
