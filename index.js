const express = require ('express');
const cors = require ('cors');
const cookieParser = require ('cookie-parser');
const app = express ();
const PORT = 3010;
//routes
const authRoute = require ('./routes/auth');
const tasksRoute = require ('./routes/tasks');
const notificationsRoute = require ('./routes/notifications');

app.use (express.json ());
app.use (express.urlencoded ({extended: false}));

app.use (cors ());

app.use (cookieParser ());

app.use ('/auth', authRoute);

app.use ((req, res, next) => {
  next ();
});

app.use ('/tasks', tasksRoute);

app.use ('/notifications', notificationsRoute);

app.listen (PORT, async () => {
  console.log (`Running on PORT ${PORT}`);
});
