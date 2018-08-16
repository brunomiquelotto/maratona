import context from '../database';
import jwt from 'jsonwebtoken';
export const login = (req, res) => {
    context
        .first('UserId','Name', 'Password')
        .from('TB_USERS')
        .where({Name: req.body.name, Password: req.body.password})
        .then(data => {
            if (data) {
                const token = jwt.sign(data, 'competitions', { expiresIn: "1 day" });
                res.json({ token, name: data.Name, password: data.Password });
            } else { 
                res.status(400).send({ error: "Wrong User/Password"});
            }
            console.log(data);
        })
        .catch(error => {
            res.json(error);
        });
};

export const validateToken = (req, res) => {
    res.json({ validate: true });
};
