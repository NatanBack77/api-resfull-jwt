require("dotenv").config();
const express = require("express");
const Mongoose = require("mongoose");
const router = require("./routes/api");
const app = express();
app.use(
	express.urlencoded({
		extended: true,
	}),
);
app.use("/auth", router);

app.use(express.json);
app.get("/", (req, res) => {
	res.status(200).json({ msg: "bem vindo a api" });
    console.log('algo')
});
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

Mongoose.connect(
	`mongodb+srv://${DB_USER}:${DB_PASSWORD}@api-test.kggokoq.mongodb.net/?retryWrites=true&w=majority`,
).then(() => {
		console.log("conectamos com sucesso ");
		app.listen(3001, ()=>{console.log("deu certo a porta")});
	}).catch((error) => {
		console.log(error);
	});
