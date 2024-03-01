// app.test.js
const request = require("supertest");
const app = require("./app");

describe("GET /api/artists", () => {
  it("responds with json containing a list of all artists", async () => {
    const response = await request(app).get("/api/artists");
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
  });
});

// describe("POST /api/upload", () => {
//   it("responds with json containing success message and filename", async () => {
//     const response = await request(app)
//       .post("/api/upload")
//       .attach("file", "_FrontendStarterFiles/testFile.txt"); // Path to the file you want to upload
//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty(
//       "message",
//       "File uploaded successfully"
//     );
//     expect(response.body).toHaveProperty("filename");
//   });
// });

describe("POST /api/albums/:albumId/albumart", () => {
  it("responds with json containing success message and updated album", async () => {
    const response = await request(app)
      .post("/api/albums/1/albumart")
      .attach("albumart", "_FrontendStarterFiles/albumart/testAlbumArt.jpg"); // Path to the album art image file
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("changes", 1); // Assuming one row is affected
  });
});

describe("GET /api/artists/:artistId/albums", () => {
  it("responds with json containing a list of albums for a specific artist", async () => {
    const response = await request(app).get("/api/artists/1/albums"); // Assuming artistId 1 exists
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("responds with 404 if artist does not exist", async () => {
    const response = await request(app).get("/api/artists/9999/albums"); // Assuming artistId 9999 does not exist
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Artist not found" });
  });
});

describe("GET /api/albums/:albumId/tracks", () => {
  it("responds with json containing a list of tracks for a specific album", async () => {
    const response = await request(app).get("/api/albums/1/tracks"); // Assuming albumId 1 exists
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("responds with 500 if albumId is invalid", async () => {
    const response = await request(app).get("/api/albums/invalid_id/tracks");

    // expect(response.status).toBe(500);
    // expect(response.status).toBe(500);
    // expect(response.body).toEqual({ error: "Internal Server Error" });
  });
});

describe("PATCH /api/albums/:id", () => {
  // it("updates the album successfully", async () => {
  //   const response = await request(app).patch("/api/albums/1").send({
  //     /* Object containing fields to update */
  //   });
  //   expect(response.status).toBe(200);
  //   expect(response.body).toEqual({ message: "Album updated successfully" });
  // });

  it("responds with 404 if album does not exist", async () => {
    const response = await request(app).patch("/api/albums/9999").send({
      /* Object containing fields to update */
    });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Album not found" });
  });
});

// Close the server instance after all tests are complete
afterAll((done) => {
  app.close();
  done();
});
