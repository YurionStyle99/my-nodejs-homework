const { User, schemas } = require("../../models/user");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const registerUser = async (req, res, next) => {
  try {
    const { email, password, subscription, token } = req.body;
    const { error } = schemas.userShema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    const avatarUrl = gravatar.url(email);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      subscription,
      token,
      avatarUrl,
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding contact" });
  }
};

module.exports = registerUser;
