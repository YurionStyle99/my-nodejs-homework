const getCurrentUser = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user || !user.token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while getting current user" });
  }
};

module.exports = getCurrentUser;
