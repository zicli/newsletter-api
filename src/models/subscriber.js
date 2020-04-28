module.exports = (sequelize, DataTypes) => {
  const Subscriber = sequelize.define(
    'Subscriber',
    {
      email: {
        type: DataTypes.STRING,
        isEmail: true,
        unique: true
      }
    }, {}
  );
  Subscriber.associate = () => {
    // associations can be defined here
  };
  return Subscriber;
};
