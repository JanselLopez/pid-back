const {Router} = require ('express');
const jwt = require ('jsonwebtoken');
const {PrismaClient} = require ('@prisma/client');
const prisma = new PrismaClient ();

const routes = new Router ();

routes.post ('/login', async (req, res) => {
  const {email, password} = req.body;
  if (email && password) {
    const user = await prisma.user.findFirst ({
      where: {
        email,
      },
    });

    if (user && user.password == password) {
      const token = jwt.sign (
        {
          email,
          user,
        },
        'token',
        {
          expiresIn: '1h',
        }
      );
      res.status (200).send (token);
    } else {
      res.status (401).send ('Unauthorized');
    }
  } else {
    res.status (401).send ('Unauthorized');
  }
});
routes.post ('/register', async (req, res) => {
  const {email, password} = req.body;
  if ((email, password)) {
    const users = await prisma.user.findMany ({
      where: {
        email,
      },
    });
    if (users.length == 0) {
      const user = await prisma.user.create ({
        data: {
          email,
          password,
        },
      });
      res.status (201).json (user);
    } else {
      res.status (400).send ('email already exists');
    }
  } else {
    res.status (400).send ('empty values');
  }
});

module.exports = routes;
