//Import .env file
require("dotenv").config();

//Import necessary modules
const { ApolloServer, gql } = require("apollo-server");
const Database = require("./database.js");
const auth = require("./auth.js");

//Define usefull vars
const port = process.env.PORT || 3001;
const host = process.env.HOST || "http://127.0.0.1";
const database = new Database();

//Define our schemas
const typeDefs = gql`
	#User type
	type User {
		id: String
		name: String
	}
	#Query type
	type Query {
		users: [User!]
		user(id: String!): User
	}
`;

//Resolve our schemas
const resolvers = {
	Query: {
		//Get list of all users
		users: async () => {
			const result = await database.request(`SELECT * FROM users`);
			return result;
		},
		//Get a specific user
		user: async (parent, args, ctx) => {
			const result = await database.request(
				`SELECT * FROM users WHERE id="${args.id}"`
			);
			return result[0];
		},
	},
};

//Run the apollo server
const apollo_server = new ApolloServer({ typeDefs, resolvers });
apollo_server
	.listen({
		port,
		url: host,
	})
	.then(() => {
		console.log(`🚀 Autocontrolbox webservice ready at ${host}:${port}`);
	});
