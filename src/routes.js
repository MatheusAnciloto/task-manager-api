const express = require('express');
const userController = require('./controllers/userController')
const routes = express();
const { auth }   = require('./middleware/authentication/auth');
const { userValidator } = require('./middleware/validations/userValidator');


routes.post('/user', userValidator, userController.create);   

routes.post('/user/login', userController.login)


routes.use(auth);
//rotas a partir desse ponto possuírão autenticação no acesso.


routes.put('/user/update', userController.update);

routes.delete('/user/delete', userController.delete);




module.exports = routes;