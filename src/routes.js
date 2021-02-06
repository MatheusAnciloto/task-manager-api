const express = require('express');
const userController = require('./controllers/userController');
const taskController = require('./controllers/taskController');
const routes = express();
const { auth }   = require('./middleware/authentication/auth');
const { userValidator } = require('./middleware/validations/userValidator');
const { taskValidator } = require('./middleware/validations/taskValidator');


routes.post('/user', userValidator, userController.create);   

routes.post('/user/login', userController.login)


routes.use(auth);
//rotas a partir desse ponto possuírão autenticação no acesso.


routes.put('/user/update', userController.update);

routes.delete('/user/delete', userController.delete);

routes.post('/task', taskValidator, taskController.create);

routes.get('/tasks/:id', taskController.getById);

routes.get('/tasks', taskController.getAllTasks);

routes.put('/tasks/:id', taskController.update);

routes.delete('/tasks/:id', taskController.delete);


module.exports = routes;