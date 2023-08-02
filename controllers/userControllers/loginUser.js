const { User, schemas } = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = schemas.userShema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "24h" });
    user.token = token;
    await user.save();

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error during login" });
  }
};

module.exports = loginUser;
