export const login = (req, res) => {
    res.json({ login: true });
};

export const validateToken = (req, res) => {
    res.json({ validate: true });
};
