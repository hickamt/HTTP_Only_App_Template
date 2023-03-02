const allowedOrigins = [
  "https://www.yoursiteDomain.com",
  "https://google.com",
  // the following are for dev and should be removed
  "https://stackblitz.com/github/hickamt/HTTP_Only_App_Template/",
  "http://127.0.0.1:5500/",
  "http://localhost:5500/",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

module.exports = allowedOrigins;
