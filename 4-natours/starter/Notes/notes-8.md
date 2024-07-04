# Questions

## 1. What is mongoose and driver of mongodb?

**Mongoose** and the **MongoDB Driver** are two different tools used to interact with MongoDB from a Node.js application. They serve different purposes and offer varying levels of abstraction and features.

#### Mongoose

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a higher level of abstraction for working with MongoDB, making it easier to manage data and enforce schemas.

**Key Features**:

- **Schemas**: Define the structure of your documents, specifying fields, types, default values, and validation rules.
- **Models**: Wrappers around schemas that provide an interface for CRUD operations.
- **Middleware**: Functions that run during certain stages of the document lifecycle, such as before saving or deleting a document.
- **Data Validation**: Ensures that data meets specified criteria before being saved to the database.
- **Built-in Query Helpers**: Simplifies complex querying and data manipulation.

**Example Use Case**:

- You need to enforce a schema and validation rules on your MongoDB documents.
- You want to leverage built-in middleware for logging, validation, or other pre/post-save operations.

#### MongoDB Driver

The MongoDB Node.js Driver is a low-level library that provides direct access to MongoDB. It is more flexible but requires more boilerplate code to perform the same tasks as Mongoose.

**Key Features**:

- **Direct Access**: Allows for direct interaction with MongoDB using MongoDB query syntax.
- **Flexibility**: Provides complete control over database operations without the abstraction of an ODM.
- **Performance**: Typically faster due to less overhead, but requires more manual coding.

**Example Use Case**:

- You need fine-grained control over your database operations and queries.
- You prefer to write raw MongoDB queries without the constraints of a predefined schema.

### Comparison

| Feature               | Mongoose                                   | MongoDB Driver                           |
| --------------------- | ------------------------------------------ | ---------------------------------------- |
| **Abstraction Level** | High (ODM)                                 | Low (Driver)                             |
| **Schemas**           | Yes                                        | No                                       |
| **Models**            | Yes                                        | No                                       |
| **Data Validation**   | Built-in                                   | Must be implemented manually             |
| **Middleware**        | Yes                                        | No                                       |
| **Ease of Use**       | Easier for beginners                       | Requires deeper knowledge of MongoDB     |
| **Flexibility**       | Less flexible, but more structured         | Highly flexible with direct control      |
| **Performance**       | Slightly lower due to abstraction overhead | Generally faster due to less abstraction |

### Summary

- **Mongoose** is ideal if you need structured data with schemas, built-in validation, and middleware support. It abstracts away much of the complexity of working with MongoDB.
- **MongoDB Driver** is suited for applications requiring direct and flexible access to MongoDB with minimal abstraction, giving you full control over database operations.

Choosing between Mongoose and the MongoDB Driver depends on your project's requirements, your need for structure and validation, and your familiarity with MongoDB.

## 2. What is the standard way of connect mongodb datatabase to nodejs both remote and local?

To connect to a MongoDB database (both remote and local) using Mongoose in a Node.js application, follow these steps:

### 1. Install Mongoose

First, you need to install Mongoose using npm:

```bash
npm install mongoose
```

### 2. Create a Connection File

Create a separate file (e.g., `db.js`) to handle your database connection logic. This keeps your code organized and maintains a single source of truth for the connection details.

### 3. Connect to MongoDB

Use Mongoose to connect to your MongoDB database. The connection string will vary depending on whether you are connecting to a local or remote database.

#### Local MongoDB Connection

For a local MongoDB instance, the connection string usually looks like this:

```javascript
const mongoose = require('mongoose');

const localDB = 'mongodb://localhost:27017/myLocalDatabase';

mongoose
  .connect(localDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Connected to the local MongoDB database');
  })
  .catch(err => {
    console.error('Error connecting to the local MongoDB database', err);
  });
```

#### Remote MongoDB Connection

For a remote MongoDB instance (e.g., MongoDB Atlas), the connection string will include the username, password, and cluster information:

```javascript
const mongoose = require('mongoose');

const remoteDB =
  'mongodb+srv://<username>:<password>@cluster0.mongodb.net/myRemoteDatabase?retryWrites=true&w=majority';

mongoose
  .connect(remoteDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Connected to the remote MongoDB database');
  })
  .catch(err => {
    console.error('Error connecting to the remote MongoDB database', err);
  });
```

### 4. Use Environment Variables

For better security and flexibility, store your database connection strings in environment variables. This way, you avoid hardcoding sensitive information in your source code.

1. **Create a `.env` file** in the root of your project:

   ```plaintext
   LOCAL_DB=mongodb://localhost:27017/myLocalDatabase
   REMOTE_DB=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myRemoteDatabase?retryWrites=true&w=majority
   ```

2. **Install `dotenv`** to load environment variables:

   ```bash
   npm install dotenv
   ```

3. **Update your `db.js` file** to use environment variables:

   ```javascript
   const mongoose = require('mongoose');
   require('dotenv').config();

   const db = process.env.REMOTE_DB || process.env.LOCAL_DB;

   mongoose
     .connect(db, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
       useCreateIndex: true,
       useFindAndModify: false
     })
     .then(() => {
       console.log('Connected to the MongoDB database');
     })
     .catch(err => {
       console.error('Error connecting to the MongoDB database', err);
     });
   ```

### 5. Run Your Application

Make sure to run your application with the environment variables loaded. If you are using `dotenv`, it will automatically load the variables from the `.env` file:

```bash
node db.js
```

### Summary

- **Install Mongoose**: `npm install mongoose`
- **Create a Connection File**: Use a separate file to manage your database connection logic.
- **Connect to MongoDB**: Use Mongoose to connect to local or remote MongoDB instances.
- **Use Environment Variables**: Store your connection strings in environment variables for better security and flexibility.
- **Run Your Application**: Ensure your application loads the environment variables when starting.

## 3. What is mongoose and its features?

**Mongoose**:
Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a higher level of abstraction, making it easier to interact with a MongoDB database.

**Key Points**:

1. **Rapid and Simple Development**:

   - Mongoose simplifies working with MongoDB by providing a clear and straightforward way to define your data structure and interact with the database.
   - It helps you quickly develop applications by automating common database tasks.

2. **Features**:

   - **Schemas**: Define the structure of your data and how different pieces of data relate to each other.
   - **Data Validation**: Ensures the data stored in the database meets certain criteria (e.g., a field must be an email address).
   - **Query API**: A simple and powerful way to interact with the database (e.g., finding, updating, deleting records).
   - **Middleware**: Functions that run before or after certain database operations (e.g., before saving a document).

3. **Mongoose Schema**:

   - A schema in Mongoose defines the structure of your data, including fields and their types, default values, and validation rules.
   - Example: You can specify that a `User` should have a `name` (string), `email` (string, unique), and `age` (number).

4. **Mongoose Model**:

   - A model is a higher-level wrapper around a schema that provides an interface to interact with the database.
   - It allows you to perform CRUD (Create, Read, Update, Delete) operations on the data defined by the schema.
   - Example: The `User` model will provide methods like `create`, `find`, `update`, and `delete` to manage users in the database.

5. **Schema => Model**:
   - **Schema**: First, you define a schema that outlines the structure and rules for your data.
   - **Model**: Then, you create a model based on the schema, which provides the interface to the database for performing CRUD operations.

**Example Summary**:

- **Schema**: A blueprint for how data is structured in the database.
- **Model**: A tool that uses the schema to interact with the database, performing operations like creating, reading, updating, and deleting records.

Understanding Mongoose helps you efficiently manage and interact with a MongoDB database within your Node.js applications.

## 4. Datatypes on Mongoose?

In Mongoose, a schema is used to define the structure of documents within a collection in MongoDB. The schema defines the various fields and their data types. Here are the primary data types supported by Mongoose:

1. **String**:

   - Represents textual data.
   - Example: `name: String`

2. **Number**:

   - Represents numerical data, both integers and floating-point numbers.
   - Example: `age: Number`

3. **Date**:

   - Represents dates and times.
   - Example: `createdAt: Date`

4. **Buffer**:

   - Represents binary data.
   - Example: `profilePicture: Buffer`

5. **Boolean**:

   - Represents true/false values.
   - Example: `isActive: Boolean`

6. **Mixed (Schema.Types.Mixed)**:

   - Represents a generic, flexible type for any kind of data.
   - Example: `any: Schema.Types.Mixed`

7. **ObjectId (Schema.Types.ObjectId)**:

   - Represents a MongoDB ObjectId. Often used for referencing other documents.
   - Example: `user: Schema.Types.ObjectId`

8. **Array**:

   - Represents an array of items, where the items can be of any data type, including other schemas.
   - Example: `tags: [String]`

9. **Decimal128**:

   - Represents high-precision decimal numbers.
   - Example: `price: Schema.Types.Decimal128`

10. **Map**:

    - Represents a Map of key-value pairs, where keys are strings and values can be any type.
    - Example: `meta: Map`

11. **Embedded Documents (Subdocuments)**:
    - Represents nested documents using another schema within a parent schema.
    - Example:
      ```javascript
      const addressSchema = new Schema({
        street: String,
        city: String
      });
      const userSchema = new Schema({
        name: String,
        address: addressSchema
      });
      ```

### Example Schema Using Various Data Types

```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String, // String data type
  age: Number, // Number data type
  email: {
    type: String,
    required: true,
    unique: true
  },
  isActive: Boolean, // Boolean data type
  createdAt: {
    type: Date,
    default: Date.now
  }, // Date data type
  profilePicture: Buffer, // Buffer data type
  tags: [String], // Array of Strings
  meta: {
    type: Map,
    of: String
  }, // Map of key-value pairs
  accountBalance: Schema.Types.Decimal128, // Decimal128 data type
  any: Schema.Types.Mixed, // Mixed data type
  address: {
    street: String,
    city: String
  } // Subdocument (embedded document)
});

const User = mongoose.model('User', userSchema);
```

### Summary

- **String**: Textual data.
- **Number**: Numeric data.
- **Date**: Date and time.
- **Buffer**: Binary data.
- **Boolean**: True/false.
- **Mixed**: Any data type.
- **ObjectId**: MongoDB ObjectId, used for referencing.
- **Array**: Array of items.
- **Decimal128**: High-precision decimal numbers.
- **Map**: Map of key-value pairs.
- **Subdocuments**: Nested documents within a schema.

Understanding these data types allows you to effectively design and interact with your MongoDB database using Mongoose in a structured and organized manner.

## 5. Explain more about Schema Types in mongnoose?

Mongoose schema types are used to define the structure and constraints of the documents in a MongoDB collection. Here’s a more detailed look at each of the schema types available in Mongoose:

#### String

- **Usage**: Represents textual data.
- **Options**: `lowercase`, `uppercase`, `trim`, `match` (regex), `enum`, `minlength`, `maxlength`.
- **Example**:
  ```javascript
  const userSchema = new Schema({
    name: { type: String, required: true, trim: true }
  });
  ```

#### Number

- **Usage**: Represents numerical data, both integers and floating-point numbers.
- **Options**: `min`, `max`.
- **Example**:
  ```javascript
  const productSchema = new Schema({
    price: { type: Number, min: 0 }
  });
  ```

#### Date

- **Usage**: Represents dates and times.
- **Options**: `min`, `max`, `default`.
- **Example**:
  ```javascript
  const eventSchema = new Schema({
    date: { type: Date, default: Date.now }
  });
  ```

#### Buffer

- **Usage**: Represents binary data.
- **Example**:
  ```javascript
  const fileSchema = new Schema({
    data: Buffer
  });
  ```

#### Boolean

- **Usage**: Represents true/false values.
- **Example**:
  ```javascript
  const userSchema = new Schema({
    isActive: { type: Boolean, default: true }
  });
  ```

#### Mixed (Schema.Types.Mixed)

- **Usage**: Represents any kind of data, allowing for flexible and dynamic schemas.
- **Example**:
  ```javascript
  const flexibleSchema = new Schema({
    any: Schema.Types.Mixed
  });
  ```

#### ObjectId (Schema.Types.ObjectId)

- **Usage**: Represents a MongoDB ObjectId, often used for referencing other documents.
- **Example**:
  ```javascript
  const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' }
  });
  ```

#### Array

- **Usage**: Represents an array of items, which can be of any data type, including other schemas.
- **Example**:
  ```javascript
  const blogSchema = new Schema({
    tags: [String]
  });
  ```

#### Decimal128 (Schema.Types.Decimal128)

- **Usage**: Represents high-precision decimal numbers, suitable for financial calculations.
- **Example**:
  ```javascript
  const transactionSchema = new Schema({
    amount: Schema.Types.Decimal128
  });
  ```

#### Map

- **Usage**: Represents a map of key-value pairs, where keys are strings and values can be any type.
- **Example**:
  ```javascript
  const settingsSchema = new Schema({
    config: {
      type: Map,
      of: String
    }
  });
  ```

#### Embedded Documents (Subdocuments)

- **Usage**: Represents nested documents using another schema within a parent schema.
- **Example**:

  ```javascript
  const addressSchema = new Schema({
    street: String,
    city: String
  });

  const userSchema = new Schema({
    name: String,
    address: addressSchema
  });
  ```

### Example: Combining Different Schema Types

Here's an example schema that uses various schema types to model a more complex data structure:

```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true }
});

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  age: { type: Number, min: 0, max: 120 },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  password: { type: String, required: true, minlength: 6 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  profilePicture: Buffer,
  addresses: [addressSchema],
  roles: {
    type: Map,
    of: String
  },
  balance: Schema.Types.Decimal128,
  metadata: Schema.Types.Mixed
});

const User = mongoose.model('User', userSchema);
```

### Summary

Mongoose schema types provide a powerful way to define the structure, constraints, and relationships of data in your MongoDB collections. Understanding these types allows you to design more robust and maintainable schemas, ensuring your data adheres to the required formats and constraints.

## 6. What are the different methods we can use on the instance of models created by mongoose?

1. **save()**

   - Saves the document to the database.

2. **remove()**

   - Removes the document from the database.

3. **update()**

   - Updates the document.

4. **toObject()**

   - Converts the document to a plain JavaScript object.

5. **toJSON()**

   - Converts the document to a JSON object.

6. **populate()**

   - Populates references to other documents.

7. **validate()**

   - Validates the document against the schema.

8. **increment()**
   - Increments the document version.

## 7. MVC Architecture Overview

MVC (Model-View-Controller) is a design pattern used for developing web applications. It divides an application into three interconnected components:

1. **Model**: Manages data and business logic.
2. **View**: Handles the presentation layer (UI).
3. **Controller**: Manages user input and interacts with the Model and View.

### Flow of MVC Architecture

1. **Request**: The process starts when a user sends a request to the server (e.g., via a browser).
2. **Router**: The request is first handled by the router. The router maps the incoming request to a specific controller action.
3. **Controller**: The router passes the request to the appropriate controller. The controller processes the request, interacts with the model if necessary, and prepares any data needed for the view.
4. **Model**: The controller interacts with the model to retrieve or manipulate data. The model contains the business logic and communicates with the database.
5. **View**: The controller selects a view to render the data. The view takes the data provided by the controller and generates the HTML response.
6. **Response**: The view sends the final HTML response back to the user.

### MVC Flow in Detail

1. **Request**:

   - User sends a request to the server (e.g., GET /users).

2. **Router**:

   - The router receives the request and directs it to the correct controller based on the URL and HTTP method (e.g., GET /users mapped to `UserController.index`).

3. **Controller**:

   - The controller method is invoked (e.g., `index` method of `UserController`).
   - It processes the request, performs necessary logic, and interacts with the model to fetch or manipulate data.

4. **Model**:

   - The model handles data-related operations, such as querying the database, and contains the business logic.
   - For example, the `User` model fetches a list of users from the database.

5. **View**:

   - The controller passes data to the view.
   - The view generates the HTML using the data and template provided.
   - For example, the `index` view renders a list of users as an HTML table.

6. **Response**:
   - The view returns the rendered HTML to the controller.
   - The controller sends the final HTML response back to the client (user's browser).

### Application Logic, Business Logic, and Presentation Logic

- **Application Logic**: Refers to the overall flow and structure of the application. It involves coordinating between different components, such as routing requests to the appropriate controller actions.

- **Business Logic**: Encompasses the rules and procedures specific to the business domain. It is typically found within the model and includes data validation, calculations, and database interactions.

- **Presentation Logic**: Pertains to the visual representation of the data. It is handled by the view and involves rendering the HTML, formatting data for display, and managing user interface elements.

### Example Alignment with MVC

1. **Request**: User requests to view a list of users by navigating to /users.
2. **Router**: Maps the request to `UserController.index`.
3. **Controller**: `UserController.index` fetches user data from the `User` model.
4. **Model**: `User` model retrieves data from the database.
5. **View**: The `index` view formats the user data into an HTML table.
6. **Response**: The formatted HTML is sent back to the user's browser.

### Summary

- **Request**: User action.
- **Router**: Maps request to controller.
- **Controller**: Processes request, interacts with model, sends data to view.
- **Model**: Manages data and business logic.
- **View**: Renders data into HTML.
- **Response**: Sends HTML back to user.

- **Application Logic**: Flow and structure coordination.
- **Business Logic**: Domain-specific rules and procedures.
- **Presentation Logic**: Visual data representation.

## 8. Difference betwee save and create method?

## 9. queries which has .prototype like Model.prototype.save() only access on the instance of the Model. We can't directly use the method on the Model itself. Explain this and what are importance concept is using behind it as well?

## 10. Understand more about \_\_dirname ? where to use these?

## 11. Explain why we write await query and Tour.find(queryObj), earlier I just do like this const tours = Tour.find(queryObj)

```javascript
// BUILD QUERY
// copy of request.query
const queryObj = { ...request.query };

const excludedFields = ['page', 'sort', 'limit', 'fields'];
excludedFields.forEach(el => delete queryObj[el]);

const query = Tour.find(queryObj);

// const tours = await Tour.find()
//   .where('duration')
//   .equals(5)
//   .where('difficulty')
//   .equals('easy');

// EXECUTE THE QUERY
const tours = await query;
```

# Notes

- Mongoose is an Object Data Modelling (ODM) library for MongoDB and Nodejs a higher level of abstraction.
  i. Mongoose allows for rapid and simple development of mongodb database interactions;
  ii. Features: schemas to model data and relationship, easy data validation, simple query API, middleware, etc;
  iii. Mongoose Schema: where we model our data, by describing the structure of the data, default values, and validation;
  iv. Mongoose model: a wrapper for the schema, providing an interface to the database for CRUD operations
  v. SCEHMA => MODEL
- Application Logic
  i. Code that is only concerted about the application's implementation, not the underlying business problem we're trying to solve(eg. showing and selling the tour)
  ii. Concerned about managing request and responses
  iii. About the app's more technical aspects;
  iv. Bridge between model and view layers
- Business Logic
  i. Code that actually solves the business problem we set out to solve,
  ii. Directly related to business rules, how the business works, and business need
  iii. Examples : creating new tours in the database, checking if the user's password is correct, validating user input data, Ensuring only users who bought a tour can review it.
- Fat models/thin controllers : offload as much logic as possible into the models, and keep the controllers as simple and lean as possible.
- If the data we push to the database has no properties defined in the schema will not be pushed and ultimately get ignored

# Important Code Syntax & Logic

- to connect local database
  `mongoose .connect(process.env.DATABASE_LOCAL, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true }) .then(() => { console.log('DB connection successful!'); });`

- to find object according to id
  `const tour = await Tour.findById({ _id: id });`

- [options.upsert=false] «Boolean» if true, and no documents found, insert a new document
  `const tour = await Tour.findByIdAndUpdate(request.params.id, request.body, { new: true });`

- process.argv : basically helps to execute the function using cmd :
  - to know more about this code look inside the data folder -> import-dev-data.json
  ```javascript
  if (process.argv[2] === '--import') {
    importData();
  } else if (process.env[2] === '--delete') {
    deleteData();
  }
  ```
- to request query from the url : `console.log(req.query) [https://www.natours.dev/api/v1/tours?duration=5&difficult=easy&test=12]`
- different ways to pass filter :

  - first
    ```javascript
    const tours = await Tour.find()
      .where('duration')
      .equals(5)
      .where('difficulty')
      .equals('easy');
    ```
  - second

  ```javascript
  const tours = await Tour.find({
    duration: 5,
    difficulty: 'easy'
  });
  ```

- if you want to add logical greater or less than do like this
  `https://www.natours.dev/api/v1/tours?duration[gte]=5&difficult=easy`

- sorting url ascending order `https://www.natours.dev/api/v1/tours?sort=price`

- sorting url descending order `https://www.natours.dev/api/v1/tours?sort=-price`
  - if there is a chance of tie between the same price you can add another sorting paramter like this:
    `https://www.natours.dev/api/v1/tours?sort=price,ratingsAverage`
