const { expressjwt: jwt } = require("express-jwt");
const { JWT_SECRET } = require("../config");

const isAuth = jwt({ secret: JWT_SECRET, algorithms: ["HS256"] });

module.exports = isAuth;
