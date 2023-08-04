const { User } = require("../../models/user");

const verifyUserEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: "",
    });

    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    res.status(500).json({ message: "Error verify User" });
  }
};

module.exports = verifyUserEmail;
