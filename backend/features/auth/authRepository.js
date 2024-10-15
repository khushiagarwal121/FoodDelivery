const User = require("../../models/User"); // Import the Sequelize model
const { Sequelize } = require("sequelize");

exports.findUserByEmail = async (email) => {
  if (!email) {
    throw new Error("Email cannot be empty");
  }

  return await User.findOne({ where: { email } });
};

exports.findUserByUUID = async (uuid) => {
  if (!uuid) {
    throw new Error("UUID cannot be empty");
  }

  return await User.findOne({ where: { uuid } });
};

exports.createUser = async (userData) => {
  const {
    first_name,
    last_name,
    email,
    hashedPassword,
    country_code,
    phone_number,
    dob,
  } = userData;

  // Validate that required fields are provided
  if (!first_name || !last_name || !email || !hashedPassword || !phone_number) {
    throw new Error("Missing required user data");
  }

  return await User.create({
    first_name,
    last_name,
    email,
    password: hashedPassword, // Use hashed password
    country_code,
    phone_number,
    dob,
  });
};

exports.updateUserPassword = async (uuid, hashedPassword) => {
  if (!uuid || !hashedPassword) {
    throw new Error("UUID and hashedPassword cannot be empty");
  }

  return await User.update({ password: hashedPassword }, { where: { uuid } });
};

exports.findUserByEmailOrPhone = async (email, phone_number) => {
  // Ensure that at least one value (email or phone_number) is provided
  if (!email && !phone_number) {
    throw new Error("Either email or phone_number must be provided");
  }

  console.log("email:", email);
  console.log("phone_number:", phone_number);

  return await User.findOne({
    where: {
      //or condition
      [Sequelize.Op.or]: [
        email ? { email } : {}, // Only include email condition if provided
        phone_number ? { phone_number } : {}, // Only include phone_number condition if provided
      ],
    },
  });
};
