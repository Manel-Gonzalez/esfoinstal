module.exports = (sequelize, DataTypes) => {
  const test = sequelize.define("test", {
    message: {
      type: DataTypes.STRING,
      allowNull: false, // ← esto está bien AQUÍ como parte de la definición
    },
  });

  return test;
};
