const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const app = express();

// middlewares simple
app.use(morgan('dev'));
app.use(express.json());

// second middleware
app.use((request, response, nextFunction) => {
  console.log('Hello from the middleware 🫡');
  nextFunction();
});

app.use((request, response, nextFunction) => {
  request.requestTime = new Date().toISOString();
  nextFunction();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2. Route Handlers
const getAllTours = (request, response) => {
  response.status(200).json({
    status: 'success',
    requestedAt: request.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (request, response) => {
  // convert the string to number,
  // use this trick to convert string to number.
  const id = request.params.id * 1;
  const tour = tours.find((element) => element.id === id);

  // if there is no tour found!
  if (id > tours.length) {
    return response.status(400).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }

  response.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (request, response) => {
  //   console.log(request.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, request.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (error) => {
      response.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (request, response) => {
  const id = request.params.id * 1;
  if (id > tours.length) {
    return response.status(400).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  response.status(200).json({
    status: 'success',
    newData: 'Updated tours here...',
  });
};

const deleteTour = (request, response) => {
  if (request.params.id * 1 > tours.length) {
    return response.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const newTours = tours.filter(
    (element) => element.id !== request.params.id * 1
  );

  response.status(402).json({
    status: 'success',
    body: newTours,
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

// 3. Routes

// app.get('/api/v1/tours', getAllTours);
// app.post(`/api/v1/tours`, createTour);
// app.get(`/api/v1/tours/:id`, getTour);
// app.patch(`/api/v1/tours/:id`, updateTour);
// app.delete(`/api/v1/tours/:id`, deleteTour);

// best way to attach http method and callbacks.
app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// 4. start the server
const port = 3000;
app.listen(port, () => {
  console.log(`App running n port ${port}...`);
});
