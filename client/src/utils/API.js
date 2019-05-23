import axios from "axios";

export default {
  // Gets all profiles
  getProfiles: function() {
    return axios.get("/api/profiles");
  },
  // Gets the Profile with the given id
  getProfile: function(id) {
    return axios.get("/api/profiles/" + id);
  },
  // Deletes the Profile with the given id
  deleteProfile: function(id) {
    return axios.delete("/api/profiles/" + id);
  },
  // Saves a Profile to the database
  saveProfile: function(profileData) {
    return axios.post("/api/profiles", profileData);
  }
};
