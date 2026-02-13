import mongoose from "mongoose";

const athleteSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  year: String,
  department: String,
  colorCode: String,

  token: {
    type: String,
    unique: true
  },

  startTime: Date,
  finishTime: Date,

  checkpoints: [
    {
      checkpointId: Number,
      time: Date
    }
  ],

  totalTime: Number, // milliseconds
  status: {
    type: String,
    enum: ["not_started", "running", "finished"],
    default: "not_started"
  }
}, { timestamps: true });

export default mongoose.model("Athlete", athleteSchema);
