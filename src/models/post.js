module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      headerImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      excerpt: {
        type: DataTypes.STRING,
        unique: false,
      },
      slug: {
        type: DataTypes.STRING,
        unique: true
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
    },
    {}
  );
  Post.associate = () => {
  };
  return Post;
};
