let users = [
    {userId: 1, name: 'Bruno'},
    {userId: 2, name: 'Bruno 2'},
    {userId: 3, name: 'Bruno 3'},
    {userId: 4, name: 'Bruno 4'},
];

export const list = (req, res) => {
    res.json(users);
};

export const get = (req, res) => {
    res.json(users.find(u => u.userId == req.params.userId));
};

export const create = (req, res) => {
    users = [...users, req.body];
    res.json(req.body);
};

export const update = (req, res) => {
    user = users.find(u => u.userId == req.params.userId);
    users = users.filter(u => u.userId != req.params.userId);
    user = [...users, user];
    res.json(req.body);
};

export const remove = (req, res) => {
    users = users.filter(u => userId != req.params.userId);
};
