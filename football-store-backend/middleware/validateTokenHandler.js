const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

//Hämta token från AUTH: (token) header
const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];

    //Om ingen token, returnera 401 Unauthorized
    if (!token) {
      return res
        .status(401)
        .json({ message: "Ingen token, auktorisering nekad" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Ogiltig token" });
      }
      console.log("Decoded token:", decoded);
      req.user = decoded.user;
      next();
    });
  } else {
    return res
      .status(401)
      .json({ message: "Ingen token, auktorisering nekad" });
  }

});

module.exports = validateToken;
