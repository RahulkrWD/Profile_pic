const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://rahulkr:rahulkr@cluster0.uu1odbb.mongodb.net/profile"
);

const fileSchema = new mongoose.Schema({
  name: String,
  size: Number,
  type: String,
  data: Buffer,
  createdAt: { type: Date, default: Date.now },
  unique: Number,
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
