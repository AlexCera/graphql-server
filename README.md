# Graphql with simple Nodejs and  Express App
(English)
This a simple project to practice Graphql, the information (data) contained in the project refers to Airbus and Boeing **aircraft models**.

(Spanish)
Este es un proyecto simple para practicar Graphql, la información (datos) contenida en el proyecto se refiere a modelos de aviones Airbus y Boeing.
## ¿How to use the project?
Follow the following steps in detail:
```sh
1.  Install node modules (dependencies):
    npm install 
```
```sh
2.  Execute the project from a terminal.
    npm start
```

```sh
3.  Open in the browser:
    http://localhost:3000/graphql.
```

```sh
4.  Copy and paste the examples and you are done.
```

## Simple queries examples
**getPlane:** returns an object information of a specific aircraft model by its ID (required).
```sh
query getPlane($planeId: Int!){
  plane(id: $planeId){
    model
    status
    manufacturer
    firstFlight
    production
    type
  }
}
```
**getPlanes:** returns an array of aircraft objects by manufacturer (if the manufacturer is set) Parameter not required. Otherwise it returns all available aircraft models.
```sh
query getPlanes($manufacturer: String) {
  planes(manufacturer: $manufacturer) {
    model
    status
    manufacturer
    firstFlight
    production
    type
  }
}
```

## Fragment queries examples
**getPlanesByManufacturerWithFragments:** Return two objects with the aircraft models of each manufacturer.
```sh
query getPlanesByManufacturerWithFragments($manufacturerA: String, $manufacturerB: String){
  # First object
  airbus: planes(manufacturer: $manufacturerA){
    ...planesByManufacturerFields
  }
  # Second Object
  boening: planes(manufacturer: $manufacturerB){
    ...planesByManufacturerFields
  }
}

# This is the structure to use for the above query response (English).
# Esta es la estructura a utilizar para la respuesta de la consulta de arriba (Spanish).
fragment planesByManufacturerFields on Plane{
  model
  firstFlight
}
```

## Mutation example
**updatePlaneModel:** Returns an object with the structure of the given fragment, updating the aircraft model in this case.
```sh
mutation updatePlaneModel($id: Int!, $model: String){
  updatePlaneModel(id: $id, model: $model){
    planeStructure
  }
}

# This is the structure to use for the above query response (English).
# Esta es la estructura a utilizar para la respuesta de la consulta de arriba (Spanish).
fragment planeStructure on Plane{
  model
  firstFlight
  status
}
```

## Example of the official website

"The simplest way to run a GraphQL API server is to use Express, a popular web application framework for Node.js."
```sh
{ hello } 
```
[Check the example in detail here.](https://graphql.org/graphql-js/running-an-express-graphql-server/)
