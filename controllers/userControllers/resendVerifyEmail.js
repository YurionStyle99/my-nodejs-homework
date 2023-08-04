const { User, schemas } = require("../../models/user");
const { BASE_URL } = process.env;
const sendEmail = require("../../helpers/sendEmail");

const resendVerifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const { error } = schemas.emailSchema.validate({ email });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.verify) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }

    const verificationEmail = {
      to: email,
      subject: "Verification",
      html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click to verify again</a>`,
    };

    await sendEmail(verificationEmail);

    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    res.status(500).json({ message: "Error resend" });
  }
};

module.exports = resendVerifyEmail;
