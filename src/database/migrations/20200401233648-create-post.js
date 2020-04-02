module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Posts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    headerImage: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    excerpt: {
      type: Sequelize.STRING,
      unique: false,
    },
    slug: {
      type: Sequelize.STRING,
      unique: true
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('Posts')
};
