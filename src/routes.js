const express = require('express');
const UserController = require('./controllers/userController')
const routes = express();
const { auth }   = require('./middleware/auth');

const userController = new UserController();




routes.post('/user', userController.create);

routes.post('/user/login', userController.login)


routes.use(auth);
//rotas a partir desse ponto possuírão autenticação no acesso.


routes.put('/user/update', userController.update);

routes.delete('/user/delete', userController.delete);




module.exports = routes;