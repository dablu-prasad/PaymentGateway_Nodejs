import jwt from "jsonwebtoken"

export const generateToken = (user) => {
    return jwt.sign({ email: user[0].email, }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

export const isAuth = (req, res, next) => {
    const authorization = req.body.token||req.query.token||req.headers["authorization"];
    console.log(authorization)
    if (authorization) {
        const token = authorization.slice(7, authorization.length);
        console.log(token);
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                res.status(401).send({ message: 'Invalid Token' })
            }
            else {
                req.user = decode
                next();
            }
        })
    }
    else {
        res.status(401).send({ message: 'no Token' })
    }

}