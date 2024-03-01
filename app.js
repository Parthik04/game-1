// app.js
const express = require("express");
const Database = require("better-sqlite3");
const multer = require("multer");
const path = require("path");

const app = express();
const db = new Database(process.cwd() + "/database/chinook.sqlite");

const PORT = 4000;

app.use(express.static("_FrontendStarterFiles"));
app.use(express.json());

// Endpoint to fetch and send all artists
app.get("/api/artists", (req, res) => {
  const query = "SELECT * FROM artists";
  const artists = db.prepare(query).all();
  res.json(artists);
});

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: "./_FrontendStarterFiles/albumart",
  filename: function (req, file, callback) {
    callback(null, Date.now().toString() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Endpoint to handle file upload
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.json({
    message: "File uploaded successfully",
    filename: req.file.filename,
  });
});

// Endpoint to upload album art for a specific album
app.post(
  "/api/albums/:albumId/albumart",
  upload.single("albumart"),
  (req, res) => {
    try {
      const statement = db.prepare(
        "UPDATE albums SET AlbumArt = ? WHERE AlbumId = ?"
      );
      const result = statement.run([req.file.filename, req.params.albumId]);
      res.status(201).json(result);
    } catch (error) {
      console.error("An error occurred updating album art:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Endpoint to fetch and send albums for a specific artist
app.get("/api/artists/:artistId/albums", (req, res) => {
  const { artistId } = req.params;
  const artistQuery = "SELECT * FROM artists WHERE ArtistId = ?";
  const artist = db.prepare(artistQuery).get(artistId);
  if (!artist) {
    return res.status(404).json({ error: "Artist not found" });
  }
  const albumsQuery = "SELECT * FROM albums WHERE ArtistId = ?";
  const albums = db.prepare(albumsQuery).all(artist.ArtistId);
  res.json(albums);
});

// Endpoint to fetch and send tracks for a specific album
app.get("/api/albums/:albumId/tracks", (req, res) => {
  try {
    const statement = db.prepare("SELECT * FROM tracks WHERE AlbumId = ?");
    const tracks = statement.all(req.params.albumId);
    res.status(200).json(tracks);
  } catch (error) {
    console.error("An error occurred fetching Tracks data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to update an album
app.patch("/api/albums/:id", (req, res) => {
  try {
    const albumId = req.params.id;
    const albumQuery = "SELECT * FROM albums WHERE AlbumId = ?";
    const album = db.prepare(albumQuery).get(albumId);
    if (!album) {
      return res.status(404).json({ error: "Album not found" });
    }
    let updateValues = "";
    const values = [];
    for (const field in req.body) {
      updateValues += `${field} = ?,`;
      values.push(req.body[field]);
    }
    updateValues = updateValues.slice(0, -1);
    const sql = `UPDATE albums SET ${updateValues} WHERE AlbumId = ?;`;
    values.push(req.params.id);
    const statement = db.prepare(sql);
    const result = statement.run(values);
    if (result.changes > 0) {
      res.json({ message: "Album updated successfully" });
    } else {
      res.status(404).json({ error: "Album not found" });
    }
  } catch (error) {
    console.error("An error occurred while updating album:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a route handler for the root URL
app.get("/", (req, res) => {
  res.send("Hello, this is the root URL!");
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});

module.exports = server;
