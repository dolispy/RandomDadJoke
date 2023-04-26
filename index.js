const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny'));

//The very root route
app.get('/', (req, res) => {
  res.send({ message: 'WELCOME!!' });
});

app.use('/api', require('./route'))
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err.status,
    });
  });
}
const PORT = process.env.APPPORT || 5001;

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});