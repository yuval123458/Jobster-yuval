const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  jobs: [
    {
      position: { type: String, required: true },
      company: { type: String, required: true },
      location: { type: String, required: true },
      status: { type: String, default: "pending" },
      type: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = Job = mongoose.model("Job", jobSchema);
