const mongoose = require('mongoose');

const subtopicSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const ruleSchema = new mongoose.Schema({
  topic: String,
  topicContent: String,
  content: [String],
  subtopics: [subtopicSchema],
});

const descriptionSchema = new mongoose.Schema({
  releaseDate: String,
  developer: String,
  publisher: String,
  platforms: [String],
  genre: [String],
});

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  src: { type: String, required: true },
  destination: { type: String, required: true },
  sectionType: { type: String, required: true },
  description: descriptionSchema,
  rules: [ruleSchema],
});

module.exports = mongoose.model('Game', gameSchema);