const {Router} = require ('express');
const jwt = require ('jsonwebtoken');
const {PrismaClient} = require ('@prisma/client');
const prisma = new PrismaClient ();

const routes = new Router ();
var _token = undefined;
routes.use ((req, res, next) => {
  _token = req.headers.authorization.split (' ')[1];
  if (_token) {
    next ();
  } else {
    res.status (401).json ({msg: 'Unauthorized'});
  }
});

// GET
routes.get ('/', async (req, res) => {
  if (_token) {
    const {ownerId} = req.body;
    const user = jwt.verify (_token, 'token');
    const notifications = await prisma.notification.findMany ();
    res.json ({
      userAuth: user,
      notifications,
    });
  } else {
    res.status (401);
  }
});

// POST
routes.post ('/', async (req, res) => {
  const {content} = req.body;
  const user = jwt.verify (_token, 'token');
  if (user && content) {
    await prisma.notification.create ({
      data: {
        content,
      },
    });
    const notifications = await prisma.notification.findMany ();
    res.status (201).json (notifications);
  } else {
    res.status (400).send ('Bad Request');
  }
});

module.exports = routes;
