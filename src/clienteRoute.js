const clienteController = require('./clienteController');

module.exports = (app) => {
    app.post('/cliente', clienteController.post);
    app.put('/cliente/:id', clienteController.put);
    app.delete('/cliente/:id', clienteController.delete);
    app.get('/cliente', clienteController.get);
    app.get('/cliente/:id', clienteController.getById);
};