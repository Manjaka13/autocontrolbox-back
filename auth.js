const jwt = require("jsonwebtoken");

const auth = {
	generate_token: (user) => {
		if (!user) return null;
		return jwt.sign(user, process.env.JWT_SECRET || "jwtsecret", {
			expiresIn: 60 * 60,
		});
	},
	authenticate: (user) => {
		if (user.name === "Manjaka" && user.password === "aze") return true;
		return false;
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

module.exports = auth;
