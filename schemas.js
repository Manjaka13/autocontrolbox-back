const { gql } = require("apollo-server");

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

module.exports = typeDefs;
