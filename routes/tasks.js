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
    const tasks = await prisma.task.findMany ({
      where: {ownerId},
    });
    res.json ({
      userAuth: user,
      tasks,
    });
  } else {
    res.status (401);
  }
});

// POST
routes.post ('/', async (req, res) => {
  const {title, place, mdContent, endDate} = req.body;
  const user = jwt.verify (_token, 'token');
  if (user && title && place && mdContent) {
    await prisma.task.create ({
      data: {
        place,
        endDate,
        title,
        mdContent,
        owner: {
          connect: {
            id: user.id,
            email: user.email,
          },
        },
      },
    });
    const tasks = await prisma.task.findMany ({
      where: {ownerId: user.id},
    });
    res.status (201).json ({tasks});
  } else {
    res.status (400).send ('Bad Request');
  }
});

routes.put ('/', async (req, res) => {
  const {id} = req.params;
  const {endDate, place, mdContent} = req.body;
  const user = jwt.verify (_token, 'token');
  if (user && id) {
    try {
      const updatedTask = await prisma.task.update ({
        where: {id: parseInt (id)},
        data: {endDate, place, mdContent},
      });
      res.json (updatedTask);
    } catch (error) {
      console.error (error);
      res.status (500).json ({error: 'Error al actualizar la tarea'});
    }
  } else {
    res.status (400).send ('Bad Request');
  }
});
routes.delete ('/', async (req, res) => {
  const {id} = req.params;
  const user = jwt.verify (_token, 'token');
  if (user && id) {
    try {
      const deletedTask = await prisma.task.delete ({
        where: {id: parseInt (id)},
      });
      res.json (deletedTask);
    } catch (error) {
      console.error (error);
      res.status (500).json ({error: 'Error'});
    }
  }
});

module.exports = routes;
