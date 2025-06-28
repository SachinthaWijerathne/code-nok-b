const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    mc: { type: String, unique: true }, // member code
    uid: { type: String, required: true, unique: true },
    role:{type:String,default:'Guest'},
    isApproved:{type:Boolean,default:false},
    main: String, // game code
    second: String, // game code
    addedAt: { type: Date, default: Date.now }, // custom timestamp
    formFilledAt: { type: Date }, // you had 'timestamp' which is not a valid type
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model("User", userSchema);
