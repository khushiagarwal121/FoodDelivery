exports.findUserByEmail = async (pool, email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

exports.findUserByUUID = async (pool, uuid) => {
  const result = await pool.query("SELECT * FROM users WHERE uuid = $1", [
    uuid,
  ]);
  return result.rows[0];
};

exports.createUser = async (pool, userData) => {
  const {
    first_name,
    last_name,
    email,
    hashedPassword,
    country_code,
    phone_number,
    dob,
  } = userData;
  await pool.query(
    `INSERT INTO users (uuid, first_name, last_name, email, password, country_code, phone_number, dob)
      VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7)`,
    [
      first_name,
      last_name,
      email,
      hashedPassword,
      country_code,
      phone_number,
      dob,
    ]
  );
};

exports.updateUserPassword = async (pool, uuid, hashedPassword) => {
  await pool.query("UPDATE users SET password = $1 WHERE uuid = $2", [
    hashedPassword,
    uuid,
  ]);
};

exports.findUserByEmailOrPhone = async (pool, email, phone_number) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1 OR phone_number = $2",
    [email, phone_number]
  );
  return result.rows[0];
};
