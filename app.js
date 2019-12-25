import Express from 'express';
import bodyParser from 'body-parser';
import routes from './server/routes/users';
// declare constants
const app = new Express();
const port = process.env.PORT;

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

routes(app);

app.get('/', (req, res) =>
  res.status(200).json({
    status: 200,
    success: 'Welcome to the homepage'
  })
);

// declare 404 route
app.all('*', (req, res) =>
  res.status(404).json({
    status: 404,
    error:
      'The URL you are trying to access does not exist. Please enter a valid url'
  })
);

// listen to app port
app.listen(port, () => console.log(`App listening on port ${port}`));

export default app;
