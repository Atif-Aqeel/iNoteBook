var jwt = require('jsonwebtoken');

const JWT_SECRET = 'AtifIsA$Boy'

const fetchuser = (req, res, next) => {
    //Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Please authenticate a valid token" });
    }
    try {
        //jwt.verify() function used to verify the token 
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();

    } catch (error) {
        return res.status(401).send({ error: "Please authenticate a valid token" });
    }
}

module.exports = fetchuser;
