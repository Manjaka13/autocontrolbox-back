require("dotenv").config();
const Express = require("express");
const cors = require("cors");

const app = Express();
const port = process.env.PORT || 3001;

//Middlewares
app.use(cors());
app.use(Express.urlencoded({extended: true}));
app.use(Express.json());

app.get("/", (req, res) => {
	res.json("Autocontrolbox webservice.");
});

//Listen
app.listen(port, () => {
	console.log("Autocontrolbox webservice running on port " + port);
});