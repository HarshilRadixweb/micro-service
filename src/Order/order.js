require("dotenv").config();
const express = require("express");
const sequelize = require("sequelize");
const axios = require("axios");

// Connect
const db = require("../db");

const app = express();
const port = 9000;
app.use(express.json());
app.post("/order", (req, res) => {
	const newOrder = new db.orderModel({ ...req.body });
	newOrder
		.save()
		.then(() => {
			res.send("New order added successfully!");
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send("Internal Server Error!");
		});
});
app.get("/orders", (req, res) => {
	db.orderModel
		.findAll()
		.then((orders) => {
			if (orders) {
				res.json(orders);
			} else {
				res.status(404).send("Orders not found");
			}
		})
		.catch((err) => {
			res.status(500).send("Internal Server Error!");
		});
});

app.get("/order/:id", (req, res) => {
	db.orderModel
		.findByPk(req.params.id)
		.then((order) => {
			if (order) {
				axios
					.get(`http://localhost:5000/customer/${order.customerID}`)
					.then((response) => {
						let orderObject = {
							CustomerName: response.data.name,
							BookTitle: "",
						};
						axios
							.get(`http://localhost:3000/book/${order.bookID}`)
							.then((response) => {
								orderObject.BookTitle = response.data.title;
								res.send(orderObject);
							});
					});
			} else {
				res.status(404).send("Orders not found");
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
	console.log(`Up and Running on port ${port} - This is Order service`);
});
