const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, pool) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = result.rows[0];
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Compare the password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Create a token (if needed, e.g., for session management)
      const token = jwt.sign({ uuid: user.uuid, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
  
      res.status(200).json({ message: 'Login successful', token }); // Send the token or user data
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


exports.signup = async (req, res, pool) => {
  const { first_name, last_name, email, password, country_code, phone_number, dob } = req.body;

  console.log('Received signup data:', req.body);
  try {
    // Check if user already exists by email or phone number
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR phone_number = $2',
      [email, phone_number]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: 'User already exists with that email or phone number' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await pool.query(
      `INSERT INTO users (uuid, first_name, last_name, email, password, country_code, phone_number, dob)
       VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7)`,
      [first_name, last_name, email, hashedPassword, country_code, phone_number, dob]
    );

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.forgotPassword = async (req, res) => {
  // Implement the forgot password logic
  res.status(200).json({ message: 'Password reset link sent to email' });
};
