const { Schema, model } = require("mongoose");

const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [emailRegexp, "Invalid email format"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    avatarUrl: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

const Joi = require("joi");

const userShema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),
  email: Joi.string().required().pattern(emailRegexp).messages({
    "string.pattern.base": "Invalid email format",
    "any.required": "Email is required",
  }),
});

const emailSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp).messages({
    "string.pattern.base": "Invalid email format",
    "any.required": "Email is required",
  }),
})

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({
      "any.only":
        'Invalid subscription value. It must be one of "starter", "pro", or "business"',
      "any.required": "Subscription is required",
    }),
});

const schemas = {
  userShema,
  subscriptionSchema,
  emailSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
