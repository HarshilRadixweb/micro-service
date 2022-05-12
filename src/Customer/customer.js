require("dotenv").config();
const express = require("express");

// Connect
const db = require("../db");

const app = express();
const port = 5000;
app.use(express.json());

app.post("/customer", (req, res) => {
	const newCustomer = new db.customerModel({ ...req.body });
	newCustomer
		.save()
		.then(() => {
			res.send("New Customer created successfully!");
		})
		.catch((err) => {
			res.status(500).send("Internal Server Error!");
		});
});
app.get("/customers", (req, res) => {
	db.customerModel
		.findAll()
		.then((customers) => {
			if (customers) {
				res.json(customers);
			} else {
				res.status(404).send("customers not found");
			}
		})
		.catch((err) => {
			res.status(500).send("Internal Server Error!");
		});
});

app.get("/customer/:id", (req, res) => {
	db.customerModel
		.findByPk(req.params.id)
		.then((customer) => {
			if (customer) {
				res.json(customer);
			} else {
				res.status(404).send("customer not found");
			}
		})
		.catch((err) => {
			res.status(500).send("Internal Server Error!");
		});
});
/**
 * Mysql Connection
 */
console.log("Sequelize Sync");
db.sequelize.sync();
app.listen(port, () => {
	console.log(`Up and Running on port ${port}- This is Customer service`);
});
