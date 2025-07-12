const mongoose = require('mongoose');

// const subtopicSchema = new mongoose.Schema({
//   title: String,
//   content: String,
// });

// const ruleSchema = new mongoose.Schema({
//   topic: String,
//   topicContent: String,
//   content: [String],
//   subtopics: [subtopicSchema],
// });

// const descriptionSchema = new mongoose.Schema({
//   releaseDate: String,
//   developer: String,
//   publisher: String,
//   platforms: [String],
//   genre: [String],
// });

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  excerpt: { type: String, required: true },
  //sectionType: { type: String, required: true },
  //description: descriptionSchema,
});

module.exports = mongoose.model('News', newsSchema);