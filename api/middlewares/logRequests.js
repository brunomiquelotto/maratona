export default (req, res, next) => {
    console.log('Receiving request...');
    next();
};