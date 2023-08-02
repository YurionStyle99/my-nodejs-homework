const { User, schemas } = require("../../models/user");

const updateSubscription = async (req, res, next) => {
  try {
    const { subscription } = req.body;

    const { error } = schemas.subscriptionSchema.validate({ subscription });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    user.subscription = subscription;
    await user.save();

    res.json({
      status: "success",
      code: 200,
      data: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating subscription" });
  }
};

module.exports = updateSubscription;
