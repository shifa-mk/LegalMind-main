import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["police", "admin"], default: "police" },

  fullname: String,
  phoneNumber: String,

  profile: {
    rank: String,
    badgeNumber: String,
    department: String,
    station: String,
    region: String,
    yearsOfService: String,
    avatar: String
  }
});

userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// prevent mongoose overwrite error
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;