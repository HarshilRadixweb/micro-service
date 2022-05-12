module.exports = (sequelize, Sequelize) => {
	const Customers = sequelize.define(
		"customer",
		{
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			age: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			address: {
				type: Sequelize.STRING,
			},
		},
		{
			freezeTableName: true,
		}
	);

	return Customers;
};
