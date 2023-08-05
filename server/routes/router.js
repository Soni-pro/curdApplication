const express= require('express');
const route = express.Router(); // this method allows us to create different router in a separate file, instead of app 
// const app= express();  //this statement will creat a new app
const services= require('../services/render');
const controller = require('../controller/controller');

route.get('/',services.HomeRoute);

route.get('/add_user',services.add_user);

route.get('/update-user',services.update_user);

route.post('/api/users', controller.create); 
route.get('/api/users', controller.find); 
route.put('/api/users/:id', controller.update); 
route.delete('/api/users/:id', controller.delete); 

module.exports = route;
