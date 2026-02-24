const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const practiseModel = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"], // Whitelist of allowed values
      default: "user",
    },
  },
  { timestamps: true }
);

practiseModel.pre("validate", async function () {
  if (!this.fullName || !this.password || !this.email) {
    throw new Error("Fields cant be Empty");
  }
  return;
});

practiseModel.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 6);
});

practiseModel.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

module.exports = mongoose.model("Practise", practiseModel);
