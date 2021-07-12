//All requests to database
class Request {
	constructor(db) {
		if (!db) console.error("Database not reachable.");
		else this._db = db;
	}
	//Getter for db
	get db() {
		return this._db;
	}
	//Reject promise to resolve null
	_reject() {
		return new Promise((resolve) => {
			resolve(null);
		});
	}
	//Get list of all users
	get_users() {
		if (this.db) return this.db.request(`SELECT * FROM users`);
		else return this._reject();
	}
}

module.exports = Request;
