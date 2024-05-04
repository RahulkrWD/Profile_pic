const express = require("express");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const File = require("./models/File");

const app = express();
app.use(cors());
app.use(bodyParser.json());
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { file } = req;
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }
    const fileModel = new File({
      name: file.originalname,
      size: file.size,
      type: file.mimetype,
      data: file.buffer,
    });
    await fileModel.save();
    res.status(200).send("File uploaded successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error.");
  }
});

app.get("/profile", async (req, res) => {
  try {
    const files = await File.find();
    if (!files || files.length === 0) {
      return res.status(404).send("No files found.");
    }
    const profiles = [];
    files.forEach((file) => {
      profiles.push({
        id: file._id,
        name: file.name,
        type: file.type,
        data: file.data.toString("base64"),
      });
    });
    res.send(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error.");
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
