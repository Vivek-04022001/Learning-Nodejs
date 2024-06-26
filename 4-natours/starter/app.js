const express = require('express');
const fs = require('fs');
const app = express();

// middlewares simple
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (request, response) => {
  response.status(200).json({
    status: 'success',
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

app.get('/api/v1/tours', getAllTours);
app.post(`/api/v1/tours`, createTour);
app.get(`/api/v1/tours/:id`, getTour);
app.patch(`/api/v1/tours/:id`, updateTour);
app.delete(`/api/v1/tours/:id`, deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App running n port ${port}...`);
});
