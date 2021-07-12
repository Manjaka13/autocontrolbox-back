const sha1 = require("sha1");
const jwt = require("jsonwebtoken");

//Auth functions
class Auth {
	constructor(request) {
		if (request) this._request = request;
		else console.error("Request class is not given.");
		if (!process.env.SALT) console.error("JWT token not given in .env variable.");
		this._jwtsecret = process.env.JWT_SECRET || "jwtsecret";
		this._token_expiration = 60 * 60;
	}
	//Getters
	get request() {
		return this._request;
	}
	get jwtsecret() {
		return this._jwtsecret;
	}
	get token_expiration() {
		return this._token_expiration;
	}
	//Generate new token
	generate_token(user) {
		if (!user) return null;
		return jwt.sign(
			{
				id: user.id,
				name: user.name,
			},
			this.jwtsecret,
			{
				expiresIn: this.token_expiration,
			}
		);
	}
	//Authenticate user and return all user data
	authenticate(db_users, user) {
		if (Array.isArray(db_users) && db_users.length > 0) {
			const ret = db_users.find(
				(u) => u.name === user.name && u.password === sha1(user.password)
			);
			return ret;
		}
		return null;
	}
	//Verifies token and return user associated to it
	verify_token(token) {
		return new Promise((resolve) => {
			if (!token) {
				console.error("JWT token missing");
				resolve(null);
			} else {
				jwt.verify(token, this.jwtsecret, (err, user) => {
					if (err) {
						console.error("JWT verification error.");
						resolve(null);
					} else resolve(user);
				});
			}
		});
	}
}

module.exports = Auth;
