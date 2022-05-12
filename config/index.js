require("dotenv").config();
module.exports = {
	mysql: {
		host: process.env.DB_HOST,

		username: process.env.DB_USERNAME,

		password: process.env.DB_PASSWORD,

		database: process.env.DB_NAME,

		dialect: "mysql",

		pool: {
			max: 5,

			min: 0,

			acquire: 30000,

			idle: 10000,
		},
	},
};
