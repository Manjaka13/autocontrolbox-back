const mysql = require("mysql");

class Database {
	constructor() {
		this.db = mysql.createConnection({
			host: process.env.DATABASE_HOST,
			user: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_NAME,
		});
		this.err = null;
	}

	connect(callback) {
		this.db.connect((err) => {
			let status = false;
			if (err) this.err = err;
			else status = true;
			if (typeof callback === "function") callback(status);
		});
	}

	request(request) {
		return new Promise((resolve, reject) => {
			this.connect((status) => {
				if (status) {
					this.db.query(request, (err, res, fields) => {
						this.disconnect();
						if (err) reject(err);
						else resolve(res);
					});
				} else reject("Unable to connect to database.");
			});
		});
	}

	disconnect(callback) {
		this.db.end(callback);
	}
}

module.exports = Database;
