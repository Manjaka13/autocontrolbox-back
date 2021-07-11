//Import .env file
require("dotenv").config();

//Import necessary modules
const { ApolloServer, gql } = require("apollo-server");
const Database = require("./database.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Define usefull vars
const port = process.env.PORT || 3001;
const host = process.env.HOST || "http://127.0.0.1";
const database = new Database();
const salt = process.env.SALT || "salt";

//Auth functions
const auth = {
	generate_token: (user) => {
		if (!user) return null;
		return jwt.sign(user, process.env.SALT || "jwtsecret", {
			expiresIn: 60 * 60,
		});
	},
	authenticate: async (user) => {
		const result = await database.request(`SELECT * FROM users`);
		const found = result.find(
			(u) => u.name === user.name && u.password === user.password
		);
		if (found) {
			return { id: found.id, name: found.name };
		}
		return null;
	},
	verify_token: (token, callback) => {
		if (!token) callback("JWT token missing.");
		else {
			jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
				if (err) callback("JWT token missing.");
				else callback(user);
			});
		}
	},
};

//Define our schemas
const typeDefs = gql`
	#User type
	type User {
		id: String
		name: String
	}
	#Authenticated user
	type Authuser {
		user: User
		token: String
	}
	#Query type
	type Query {
		users: [User!]
		user(id: String!): User
		login(name: String!, password: String!): Authuser
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
		login: async (parent, args, ctx) => {
			let token = null;
			let { name, password } = args;
			let user = {
				name: args.name,
				password: args.password,
			};
			user.password = bcrypt.hashSync(user.password, salt);
			user = await auth.authenticate(user);
			if (user) token = auth.generate_token(user);
			else user = null;
			const ret = {
				user: {
					id: user.id,
					name: user.name,
				},
				token,
			};
			console.log(ret);
			return ret;
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
