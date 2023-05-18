const {Router} = require ('express');
const routes = new Router ();
var _token = undefined;
const {PrismaClient} = require ('@prisma/client');
const prisma = new PrismaClient ();

routes.use ((req, res, next) => {
  _token = req.headers.authorization.split (' ')[1];
  if (_token) {
    next ();
  } else {
    res.status (401).json ({msg: 'Unauthorized'});
  }
});

routes.post ('/', async (req, res) => {
  try {
    const {email, password} = req.body;

    res.status (201).json ({msg: 'User Created'});
  } catch (error) {
    res.json ({msg: error.message});
  }
});

module.exports = routes;
