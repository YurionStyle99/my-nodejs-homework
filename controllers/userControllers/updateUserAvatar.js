const Jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");

const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "..", "..", "public", "avatars");

const updateUserAvatar = async (req, res) => {
  try {
    const { _id: id } = req.user;
    const { path: tempUpload, originalname } = req.file;

    const avatar = await Jimp.read(tempUpload);
    await avatar.resize(250, 250).writeAsync(tempUpload);

    const fileName = `${id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, fileName);

    await fs.rename(tempUpload, resultUpload);

    const avatarUrl = path.join("avatars", fileName);

    await User.findByIdAndUpdate(id, { avatarUrl });

    res.json({ avatarUrl });
  } catch (error) {
    res.status(500).json({ message: "Error updating avatar" });
  }
};

module.exports = updateUserAvatar;
