import Athlete from "../models/Athlete.js";
import { v4 as uuidv4 } from "uuid";
import connectDB from "../config/db.js";


// Public Registration
export const registerAthlete = async (req, res) => {
  await connectDB();
  try {
    const { name, email, year, department } = req.body;

    if (!name || !email || !year || !department) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Athlete.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const token = uuidv4();

    // Generate simple random color
    const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];
    const colorCode = colors[Math.floor(Math.random() * colors.length)];

    const athlete = await Athlete.create({
      name,
      email,
      year,
      department,
      token,
      colorCode,
      status: "not_started",
      checkpoints: []
    });

    res.json({
      message: "Registration successful",
      token: athlete.token,
      athlete: {
        name,
        email,
        year,
        department,
        colorCode
      }
    });

    // Notify admin
    const liveData = await generateLiveData();
    req.io.emit("adminLiveUpdate", liveData);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const formatDuration = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
};

// 🔥 Reusable function for sockets
export const generateLiveData = async () => {
  const athletes = await Athlete.find();
  const now = new Date();

  const running = [];
  const notStarted = [];
  const finished = [];

  athletes.forEach((athlete) => {

    if (athlete.status === "running") {
      running.push({
        name: athlete.name,
        id: athlete._id,  // ✅ ADD THIS
        startedAt: athlete.startTime,
        duration: formatDuration(now - athlete.startTime),
        lastCheckpoint:
          athlete.checkpoints.length > 0
            ? athlete.checkpoints[athlete.checkpoints.length - 1].checkpointId
            : 0
      });
    }

    else if (athlete.status === "not_started") {
      notStarted.push({
        name: athlete.name,
        id: athlete._id,  // ✅ ADD THIS    
      });
    }

    else if (athlete.status === "finished") {
      finished.push({
        name: athlete.name,
        id: athlete._id,  // ✅ ADD THIS
        totalTime: athlete.totalTime
      });
    }

  });

  return { running, notStarted, finished };
};



// 🌐 HTTP route controller
export const getLiveDashboard = async (req, res) => {
  await connectDB();
  try {
    const data = await generateLiveData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete athlete - for admin panel
export const deleteAthlete = async (req, res) => {
  await connectDB();
  try {
    const { id } = req.params;
    await Athlete.deleteOne({ _id: id });


    // 🔥 Generate fresh dashboard data
    const updatedData = await generateLiveData();

    // 🔥 Emit to all admin dashboards
    req.io.emit("adminLiveUpdate", updatedData);

    res.json({ message: "Athlete deleted" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


