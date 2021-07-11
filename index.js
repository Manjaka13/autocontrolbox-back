require("dotenv").config();
const Express = require("express");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server");
const Database = require("./database.js");

const app = Express();
const port = process.env.PORT || 3001;
const host = process.env.HOST || "http://127.0.0.1";
const database = new Database();

//Middlewares
app.use(cors());
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

const typeDefs = gql`
	type User {
		id: String!
		name: String!
		password: String!
	}
	type Query {
		users: [User!]
	}
`;

const resolvers = {
	Query: {
		users: async () => {
			const user_list = await database.request("SELECT * FROM users");
			return user_list;
		},
	},
};

const apollo_server = new ApolloServer({ typeDefs, resolvers });
apollo_server
	.listen({
		port,
		url: host,
	})
	.then(() => {
		console.log(`🚀 Autocontrolbox webservice ready at ${host}:${port}`);
	});
