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
      pp:{type:String,default:'https://ibb.co/Sw0F9bpK/logo.png'}
    },
    contact: { // discord id,name + tag
      email: { type: String, unique: true, required: true },
      phoneNumber: { type: String, unique: true }, // whatsapp,fixed,emegency
      address:{type:String},
      district:String,
      city:String,
      postalCode:Number,
      discord:{
        id: String, // discord id
        name: String, // discord name + tag
        tag: String // discord tag
      }
    },
    social:{
      facebook:String,
      youtube:String,
      instagram:String,
      twitter:String,
      tiktok:String,
      
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
      enhansed: Boolean,//player stars, badge enhansed, 
    },
    playerLevel:{
      world: { type: Boolean, default: false },
      local: { type: Boolean, default: false },
      trainer: { type: Boolean, default: false },
      pro: { type: Boolean, default: false },
      eClan: { type: Boolean, default: false },
      clan: { type: Boolean, default: false },
      new: { type: Boolean, default: true }
    },
    managelevel: {
      coo: { type: Boolean, default: false },
      aGame: { type: Boolean, default: false }, // admin game
      game: { type: Boolean, default: true }, // game management
      leader: { type: Boolean, default: true }, // team leader
      ceo: { type: Boolean, default: false },
      dev: { type: Boolean, default: false }
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
