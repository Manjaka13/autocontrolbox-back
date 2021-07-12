const mysql = require("mysql");

//All database functions
class Database {
	//Database connection
	constructor() {
		this.db = mysql.createConnection({
			host: process.env.DATABASE_HOST,
			user: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_NAME,
		});
	}

	//Issue a database request
	request(req) {
		if (typeof req === "string")
			return new Promise((resolve) => {
				this.db.query(req, (err, res) => {
					if (err) console.error(err);
					resolve(err ? null : res);
				});
			});
		else
			return new Promise((resolve) => {
				console.error("Unable to issue an empty request.");
				resolve(null);
			});
	}
}

module.exports = Database;
