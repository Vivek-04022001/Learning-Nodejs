## Questions

### What is REST Architecture?

**REST Architecture**:

- **Definition**: REST (Representational State Transfer) is an architectural style for designing networked applications. It relies on a stateless, client-server, cacheable communications protocol, typically HTTP.

**Key Principles of REST**:

1. **Statelessness**:

   - Each client-server interaction is independent and contains all the necessary information to understand and process the request.
   - No client context is stored on the server between requests.

2. **Client-Server Architecture**:

   - The client and server operate independently, with a clear separation of concerns.
   - The client handles the user interface and user experience, while the server manages data storage and processing.

3. **Cacheability**:

   - Responses must explicitly indicate whether they are cacheable to improve performance by reusing prior responses.

4. **Uniform Interface**:

   - A standardized way of interacting with resources, typically using HTTP methods (GET, POST, PUT, DELETE).
   - Conventions include using URIs to identify resources, standardizing on media types like JSON for data interchange, and leveraging HTTP status codes.

5. **Layered System**:

   - The architecture can be composed of multiple layers, such as proxy servers, gateways, and load balancers, to improve scalability and manageability.

6. **Code on Demand (Optional)**:
   - Servers can temporarily extend or customize the functionality of a client by transferring executable code (e.g., JavaScript).

**Components of RESTful Systems**:

- **Resources**: Any piece of information or data identified by a URI (Uniform Resource Identifier).
- **Representation**: The format in which the resource is transferred, typically JSON or XML.
- **HTTP Methods**:
  - **GET**: Retrieve a resource.
  - **POST**: Create a new resource.
  - **PUT**: Update an existing resource.
  - **DELETE**: Remove a resource.

**Benefits of REST**:

- **Scalability**: Due to statelessness and layered architecture, RESTful systems can scale easily.
- **Flexibility**: Loose coupling between client and server allows independent evolution.
- **Performance**: Caching mechanisms can significantly improve response times and reduce server load.
- **Interoperability**: Standardized interfaces facilitate integration with different systems and platforms.

**Summary**:

REST is an architectural style for networked applications, emphasizing stateless communication, a client-server model, cacheability, a uniform interface, and optional code on demand. It provides a scalable, flexible, and efficient way to build and interact with web services.

### CRUD Operations in REST

CRUD stands for Create, Read, Update, and Delete. These operations map to HTTP methods in RESTful web services, allowing clients to interact with resources on the server.

1. **POST**: Create a Resource

   - **Purpose**: Used to create a new resource on the server.
   - **Example**: Adding a new user to a database.
   - **Endpoint**: `/users`
   - **Response**: Typically returns the created resource with a status code of `201 Created`.

2. **GET**: Read a Resource

   - **Purpose**: Used to retrieve a resource or a list of resources from the server.
   - **Example**: Fetching a user's details or a list of users.
   - **Endpoints**:
     - Fetch all users: `/users`
     - Fetch a specific user: `/users/{id}`
   - **Response**: Returns the requested resource(s) with a status code of `200 OK`.

3. **PUT**: Update a Resource

   - **Purpose**: Used to update an existing resource on the server, typically replacing the entire resource.
   - **Example**: Updating a user's details.
   - **Endpoint**: `/users/{id}`
   - **Response**: Returns the updated resource with a status code of `200 OK` or `204 No Content` if no content is returned.

4. **PATCH**: Partially Update a Resource

   - **Purpose**: Used to apply partial modifications to a resource.
   - **Example**: Updating a specific field of a user's details.
   - **Endpoint**: `/users/{id}`
   - **Response**: Returns the updated resource with a status code of `200 OK` or `204 No Content`.

5. **DELETE**: Remove a Resource
   - **Purpose**: Used to delete a resource from the server.
   - **Example**: Removing a user from the database.
   - **Endpoint**: `/users/{id}`
   - **Response**: Returns a status code of `200 OK`, `202 Accepted`, or `204 No Content` to indicate successful deletion.

### Summary:

- **POST**: Create a new resource.
- **GET**: Retrieve a resource or list of resources.
- **PUT**: Update an entire existing resource.
- **PATCH**: Partially update an existing resource.
- **DELETE**: Remove a resource.

These HTTP methods form the foundation of RESTful APIs, enabling standardized operations on resources.

### Explain middleware app.use(express.json());

### What are the different ways to convert string to numbers in js? and what is the standard approach to do so?

### When we request delete http method why we don't get any console.log on terminal as well on postmann website?

### Explain deep about middlewares, and can routes be middlerwares too?

### Explain about middleware sequence of execution and how routes are affect middleware?

### Benefit of morgan using middleware?

###

### Notes

- API : Application Programming Interface: a piece of software that can be used by another piece of software, in order to allow application to talk to each other.

- Rest Architecture

  - Separate api int logical resources
  - Expose structured, resources -based urls
  - Use http methods(verb)
  - send data as json
  - be stateless

- Optional paramets : `/api/v1/tours/:id/:x/:y?` here is y is optional parameters
- Also , to get the parameters => request.params.
- middleware depends upon the sequence of code execution.
