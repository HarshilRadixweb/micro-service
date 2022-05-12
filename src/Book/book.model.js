module.exports = (sequelize, Sequelize) => {
	const Books = sequelize.define(
		"book",
		{
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			author: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			numberPages: {
				type: Sequelize.STRING,
			},
			publisher: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		},
		{
			freezeTableName: true,
		}
	);

	return Books;
};
