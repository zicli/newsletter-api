module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    'Admin',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        isEmail: true,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
    },
    {}
  );
  Admin.associate = () => {
  };
  return Admin;
};
