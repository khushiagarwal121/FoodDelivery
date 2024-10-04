const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adjust the path to your sequelize instance

class User extends Model {}

User.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Use UUIDV4 for automatic UUID generation
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    country_code: {
      type: DataTypes.STRING(255),
    },
    phone_number: {
      type: DataTypes.BIGINT,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE, // Use DATE for timestamps with timezone
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "updated_at",
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false, // Disable automatic timestamps for custom fields
    hooks: {
      beforeCreate: (user) => {
        user.created_at = new Date();
        user.updated_at = new Date();
      },
      beforeUpdate: (user) => {
        user.updated_at = new Date();
      },
    },
  }
);

module.exports = User;
