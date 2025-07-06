
const mongoose = require("mongoose");
const { createHmac, randomBytes } = require('node:crypto');2
const {creatToken,validatetoken}=require('../services/auth')
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  salt: {
    type: String,
    required:false,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '/default/default.gif' 
  },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    default: "USER"
  }
}, {
  timestamps: true
});

userSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = randomBytes(16).toString('hex');
  const hashedPassword = createHmac('sha256', salt)
    .update(user.password)
    .digest('hex');

  user.password = hashedPassword;
  user.salt = salt;

  next();
});

userSchema.statics.matchPassword = async function (email, plainPassword) {
  const user = await this.findOne({ email });

  if (!user) throw new Error("User not found");

  const hashedPassword = createHmac('sha256', user.salt)
    .update(plainPassword)
    .digest('hex');

  if (hashedPassword !== user.password) {
    throw new Error("Password does not match");
  }

  const token=creatToken(user);
  
  return token;
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;


