module.exports = (sequelize, Sequelize) => {
	const Orders = sequelize.define(
		"order",
		{
			customerID: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			bookID: {
				type: Sequelize.STRING,
				allowNull: true,
			},
		},
		{
			freezeTableName: true,
		}
	);

	return Orders;
};
