const express = require ('express');
const cors = require ('cors');
const cookieParser = require ('cookie-parser');
const app = express ();
const PORT = 3010;
//routes
const authRoute = require ('./routes/auth');
const tasksRoute = require ('./routes/tasks');
const notificationsRoute = require ('./routes/notifications');
const corsOptions = {
  origin: 'http://192.168.4.72',
  optionSuccessStatus: 200,
};
app.use (express.json ());
app.use (express.urlencoded ({extended: false}));

app.use (cors (corsOptions));

app.get ('/', (req, res) => {
  res.json ({hello: 'HELLO'});
});

app.use (cookieParser ());

app.use ('/auth', authRoute);

app.use ('/tasks', tasksRoute);

app.use ('/notifications', notificationsRoute);

app.listen (PORT, async () => {
  console.log (`Running on PORT ${PORT}`);
});
