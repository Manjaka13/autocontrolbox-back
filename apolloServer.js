const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schemas.js");
const resolvers = require("./resolvers.js");

class Apolloserver {
	constructor() {
		this._port = process.env.PORT || 3001;
		this._host = process.env.HOST || "http://localhost";
		if (typeDefs && resolvers) {
			//Create the apollo server
			this._apollo_server = new ApolloServer({ typeDefs, resolvers });
		} else
			console.error("Missing schemas or resolvers to instantiate apollo-server.");
	}
	run() {
		//Run the apollo server
		if (this._apollo_server)
			this._apollo_server
				.listen({
					port: this._port,
					url: this._host,
				})
				.then(() => {
					console.log(
						`🚀 Autocontrolbox webservice ready at ${this._host}:${this._port}`
					);
				});
	}
}

module.exports = Apolloserver;
