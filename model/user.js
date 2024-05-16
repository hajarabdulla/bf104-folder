const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, require: true },
    email: {
      type: String,
      require: [true, "Please provide an email"],
    //   unique: true,
    },
    age: { type: Number },
    password: { type: String, require: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
