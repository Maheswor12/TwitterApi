var db = require("../config/dbConfig.js");

var user = db.sequelize.define(
  "user",
  {
    //attributes
    id: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username: {
      type: db.Sequelize.TEXT,
      allowNull: false
    },
    password: {
      type: db.Sequelize.TEXT,
      allowNull: false
    },
    email: {
      type: db.Sequelize.TEXT,
      allowNull: false
    },
    file: {
      type: db.Sequelize.TEXT,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    tableName: "twitter"
  }
);

user
  .sync({ force: false })
  .then(function() {
    //console.log("success");
  })
  .catch(function(err) {
    console.log(err);
  });

module.exports = user;
