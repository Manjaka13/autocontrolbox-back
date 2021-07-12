//Import necessary modules
const Request = require("./request");
const Database = require("./database.js");
const Auth = require("./auth.js");

const request = new Request(new Database());
const auth = new Auth(request);

//Pre-request to cache usefull data
let db_users = null;
const prefetch_users = () => {
	return new Promise(async (resolve) => {
		db_users = await request.get_users();
		resolve();
	});
};

//Resolve our schemas
const resolvers = {
	Query: {
		//Get list of all users
		users: async () => {
			if (!db_users) await prefetch_users();
			return await request.get_users();
		},
		//Get a specific user
		user: async (parent, args, ctx) => {
			if (!db_users) await prefetch_users();
			const result = db_users.find((u) => u.id === args.id);
			if (Array.isArray(result)) result[0];
			else if (result) return result;
			else return null;
		},
		//Returns user with token if logged in
		login: async (parent, args, ctx) => {
			let token = null;
			let user = {
				name: args.name,
				password: args.password,
			};
			if (!db_users) await prefetch_users();
			user = auth.authenticate(db_users, user);
			if (user) token = auth.generate_token(user);
			else user = null;
			const ret = {
				user,
				token,
			};
			return ret;
		},
	},
};

module.exports = resolvers;
