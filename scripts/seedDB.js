const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Profiles collection and inserts the profiles below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/reactprofilelist"
);

const profileSeed = [
  {
    name: "Rebeca Dodero",
    description: "An Enthusiastic and Creative Web Developer",
    picture:
      "https://www.shareicon.net/data/256x256/2017/05/24/886394_profile_512x512.png",
    date: new Date(Date.now())
  }
];

db.Profile
  .remove({})
  .then(() => db.Profile.collection.insertMany(profileSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
