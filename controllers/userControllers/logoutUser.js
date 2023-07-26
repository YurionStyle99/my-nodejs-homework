const { User } = require("../../models/user");

const logoutUser = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    user.token = null;
    await user.save();

    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error during logout" });
  }
};

module.exports = logoutUser;
