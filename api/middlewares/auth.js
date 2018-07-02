import jwt from 'jsonwebtoken';
const authSecret = 'competitions';

export default (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    const token = req.body.token || req.query.token || req.headers['authorization'];

    if (!token) {
        return res.status(401).send({ error : 'No token provided' });
    }

    jwt.verify(token, authSecret, function(err, decoded) {
        if (err) {
            return res.status(401).send({
                error: 'Failed to authenticate token.'
            });
        }
        req.decoded = decoded;
        next();
    });
};