const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    name: { type: String, required: [true, "Please provide a name"] },
    email: {
      type: String,
      require: [true, "Please provide an email"],
      //   unique: true,
      validate: validator.isEmail,
    },
    photo: String,
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.checkPasswords = async function (originalPass) {
  return await bcrypt.compare(originalPass, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
