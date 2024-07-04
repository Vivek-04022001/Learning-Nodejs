const Tour = require('../models/tourModels');

exports.getAllTours = async (request, response) => {
  try {
    // BUILD QUERY
    //1a. Filtering
    const queryObj = { ...request.query };

    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // 1b. Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryObj.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    let query = Tour.find(JSON.parse(queryStr));

    // 2. Sorting
    if (request.query.sort) {
      const sortBy = request.query.sort.splite(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // EXECUTE THE QUERY
    const tours = await query;

    // SEND RESPONSE
    response.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });

    console.log('Fetch all tours data.');
  } catch (error) {
    console.log(`${error.message}: Problem in fetching tours data.`);
    response.status(404).json({
      status: 'fail',
      message: 'Fail to fetch data.'
    });
  }
};

exports.getTour = async (request, response) => {
  try {
    const tour = await Tour.findById(request.params.id);
    response.status(200).json({
      status: 'success',
      data: { tour }
    });
    console.log('Specific tour find successfully.');
  } catch (error) {
    response.status(404).json({
      status: 'fail',
      message: 'tour is not found'
    });
    console.log(`${error.message} : Tour is not found`);
  }
};

exports.createTour = async (request, response) => {
  try {
    const newTour = await Tour.create(request.body);
    response.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
    console.log('new post created!');
  } catch (error) {
    console.log(`${error.message} : Problem with creating a new tour.`);

    response.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!'
    });
  }
};

exports.updateTour = async (request, response) => {
  try {
    const tour = await Tour.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true
    });

    response.status(200).json({
      status: 'success',
      tour
    });
    console.log('successfuly update the tour data.');
  } catch (error) {
    response.status(400).json({
      status: 'fail',
      message: 'fail in updating tour data.'
    });
    console.log(`${error.message}: Fail to update the tour data.`);
  }
};

exports.deleteTour = async (request, response) => {
  try {
    await Tour.findByIdAndDelete(request.params.id);
    response.status(200).json({
      status: 'success',
      message: `Document is delete from the database`
    });
    console.log('delete success!');
  } catch (error) {
    response.status(400).json({
      status: 'fail',
      message: 'Delete failed'
    });
    console.log(`${error.message} : Problem in deleting the document.`);
  }
};
