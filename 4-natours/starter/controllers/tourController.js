const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// check for the valid id(val)
exports.checkId = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }
  next();
};

exports.getAllTours = (request, response) => {
  response.status(200).json({
    status: 'success',
    requestedAt: request.requestTime,
    results: tours.length,
    data: {
      tours
    }
  });
};

exports.getTour = (request, response) => {
  // convert the string to number,
  // use this trick to convert string to number.
  const id = request.params.id * 1;
  const tour = tours.find(element => element.id === id);

  response.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};

exports.createTour = (request, response) => {
  //   console.log(request.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, request.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    error => {
      response.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
};

exports.updateTour = (request, response) => {
  const id = request.params.id * 1;

  response.status(200).json({
    status: 'success',
    newData: 'Updated tours here...'
  });
};

exports.deleteTour = (request, response) => {
  const newTours = tours.filter(
    element => element.id !== request.params.id * 1
  );

  response.status(402).json({
    status: 'success',
    body: newTours
  });
};
