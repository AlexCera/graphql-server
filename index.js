const express = require('express');
const app = express();

const { graphqlHTTP } = require("express-graphql")
const { buildSchema } = require("graphql")

/* data local */
const { planes } = require('./data.json');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
    plane(id: Int!): Plane
    planes(manufacturer: String): [Plane]
  }

  type Mutation {
    updatePlaneModel(id: Int!, model: String): Plane
  }

  type Plane {
    id: Int
    model: String
    status: String
    manufacturer: String
    firstFlight: String
    production: String
    type: String
  }
`)


const getPlane = (args) => {
    let id = args.id;
    return planes.filter(plane => {
        return plane.id == id
    })[0]
}

const getPlanes = (args) => {
    if (args.manufacturer) {
        let manufacturer = args.manufacturer;
        return planes.filter(plane => {
            return plane.manufacturer == manufacturer
        })
    } else {
        return planes;
    }
}

const updatePlaneModel = ({ id, model }) => {
    planes.map(plane => {
        if (plane.id === id) {
            plane.model = model
            return plane;
        }
    })
    return planes.filter(plane => plane.id === id)[0];
}

// The root provides a resolver function for each API endpoint
const root = {
    hello: () => {
        return "Hello world!"
    },
    plane: getPlane,
    planes: getPlanes,
    updatePlaneModel: updatePlaneModel
}
app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    })
)

app.listen(3000, () => {
    console.log("Running a GraphQL API server at http://localhost:3000/graphql")
})
