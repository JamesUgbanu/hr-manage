import express from 'express';
import 'babel-polyfill';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import userRoutes from './server/routes/users';
import leaveRoutes from './server/routes/leave';

//import userRoutes from './server/routes/users';
/* import authRoutes from './server/routes/auth';*/
import postRoutes from './server/routes/post';
// declare constants
const app = new express();
app.use(cors());

//const port = process.env.PORT || 5000;

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// Cookie parser
app.use(cookieParser());

//routes(app);
/* app.use('/users', userRoutes); */
/* app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/posts', postRoutes); */
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/posts', postRoutes);

app.use('/api/v1', leaveRoutes);

// pass the error to the next piece of middleware
/* app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  return next(err); 
}); */

if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err,
    });
  });
}

app.get('/', (req, res) =>
  res.status(200).json({
    status: 200,
    success: 'Welcome to the homepage',
  })
);

// declare 404 route
app.all('*', (req, res) =>
  res.status(404).json({
    status: 404,
    error:
      'The URL you are trying to access does not exist. Please enter a valid url',
  })
);

// listen to app port
//app.listen(port, () => console.log(`App listening on port ${port}`));
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

export default app;
