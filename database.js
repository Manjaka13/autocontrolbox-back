const mysql = require("mysql");

class Database {
	constructor() {
		this.db = mysql.createConnection({
			host: process.env.DATABASE_HOST,
			user: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_NAME,
		});
	}

	connect(callback) {
		this.db.connect((err) => {
			let status = false;
			if (!err) status = true;
			else console.error(err);
			if (typeof callback === "function") callback(status);
		});
	}

	request(request) {
		if (typeof request === "string")
			return new Promise((resolve, reject) => {
				/* this.connect((status) => {
					if (status) {
						
					} else reject("Unable to connect to database.");
				}); */
				this.db.query(request, (err, res, fields) => {
					//this.disconnect();
					if (err) reject(err);
					else resolve(res);
				});
			});
		else
			return new Promise((resolve, reject) => {
				reject("Unable to issue an empty request.");
			});
	}

	disconnect(callback) {
		this.db.destroy(callback);
	}
}

module.exports = Database;
