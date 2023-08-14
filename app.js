const express = require('express')
const bodyParser = require('body-parser');
const session = require('express-session');
const swaggerJsDoc = require('swagger-jsdoc');
const swagger = require('./swagger');
const swaggerUi = require('swagger-ui-express');
app = express()

app.use(bodyParser.json())

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

app.use(session({
  secret: 'sessionKey',
  resave: false,
  saveUninitialized: true
}));


// Swagger options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'A simple Express API with Swagger documentation',
    },
  },
  apis: ['./swagger.js'], // Path to the API docs
};

const swaggerSpec = swaggerJsDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.use((req, res, next) => {
//   console.log("token", req.headers.authorization);

//   // Respond with an appropriate error status and message
//   res.status(500).send('Something went wrong!');

//   // You can also send a JSON response if preferred:
//   // res.status(500).json({ error: 'Something went wrong!' });
// });

// process.on('uncaughtException', (err) => {
//   console.error('Uncaught Exception:', err.stack);
//   // Gracefully shut down the application or perform cleanup
//   process.exit(1);
// });

require('./modules');
