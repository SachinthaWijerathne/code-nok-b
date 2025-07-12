const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    uid:{type:String,unique:true},
    mc:{type:String,unique:true},
    role:{type:String,default:'member',enum:['ceo','coo',]},
    personal:{
      fullName:String, // Full name of the user
      gamingName:String,
      dob:Date,
      gender:{type:String,enum:['Male','Female']},
      nic:{type:String},
      pp:{type:String,default:'https://ibb.co/Sw0F9bpK/logo'}
    },
    contact: { // discord id,name + tag
      email: { type: String, unique: true, required: true },
      phoneNumber: { type: String, unique: true }, // whatsapp,fixed,emegency
      address:{type:String},
      district:String,
      city:String,
      postalCode:Number
    },
    social:{
      facebook:String,
      
    },
    game: {
      main: {
        name: String,
        gamecode: String,
        team: String,
        rank: String, // rank is only for esports main game
        monthlyActivities: [{ year: Number, month: Number, weekPoints: Number, rank: String }]
        //other game details will be added ...
      },
      other: [{ name: String, gamecode: String }]
    },
    badge: {
      playerStars: Number, // player stars     level: { type: String, default: 'n', enum: ['w', 't', 'ec', 'n', 'c', 'p', 'l'] },
      
      enhansed: Boolean,//player stars, badge enhansed, 
      level: String
    },
    role: { type: String, default: 'Guest', enum: ['ceo', 'coo', 'Leader', 'admin', 'coadmin', 'Member', 'Guest'] },
    isApproved: { type: Boolean, default: false },
    addedAt: { type: Date, default: Date.now }, 
    formFilledAt: { type: Date }, 
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("User", userSchema);
