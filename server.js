const express = require("express");
const routes = require("./controllers");
const app = express();
const PORT = process.env.PORT || 3001;
var db = require("./models");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.get("/tracks", function (req, res) {
  db.Track.findAll({
    include: [db.User],
    order: [["track_artist", "ASC"]]
  })
    .then(function (dbTrack) {  
      return res.json(dbTrack);
    });
});
app.use(routes);

// Start the API server
// ADD SEQUELIZE HERE TO CONNECT TO YOUR DB
db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
});
