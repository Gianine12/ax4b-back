const { Router } = require('express');

const UserController = require('./controller/UserController');
const RestaurantController = require('./controller/RestaurantController');

const routes = Router();

// Usuario
routes.post('/usuario/create',UserController.createUser);
routes.get('/usuarios', UserController.getAllUser);
routes.get('/usuario/:id', UserController.getSpecificUser);
routes.put('/usuario/:id', UserController.updateUser);
routes.delete('/usuario/:id', UserController.deleteUser);

// Restaurante
routes.post('/restaurante/create',RestaurantController.creatRestaurant);
routes.get('/restaurantes', RestaurantController.getAllRestaurant);
routes.get('/restaurante/:id', RestaurantController.getSpecificRestaurant);
routes.put('/restaurante/:id', RestaurantController.updateRestaurant);
routes.delete('/restaurante/:id', RestaurantController.deleteRestaurant);

routes.get('/restaurante_vencedor',);
routes.get('/ranking', RestaurantController.getVotacaoDia);
routes.post('/restaurante_votado', RestaurantController.restauranteVotado);

module.exports = routes;