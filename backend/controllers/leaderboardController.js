import Athlete from "../models/Athlete.js";

const formatTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export const getLeaderboard = async (req, res) => {
  try {
    // Return ALL athletes, not just finished ones
    const athletes = await Athlete.find().sort({
      // Sort: Completed (has totalTime) first, then by time. 
      // Using a workaround or just generic sort for now.
      // MongoDB sort: 1 for ascending. Nulls usually come first.
      totalTime: 1
    });

    const leaderboard = athletes.map((athlete, index) => ({
      _id: athlete._id, // Key for React list
      rank: index + 1,
      name: athlete.name,
      status: athlete.status, // ✅ CRITICAL: Send status
      totalTime: athlete.totalTime, // ✅ CRITICAL: Send raw number for frontend formatting
      checkpoints: athlete.checkpoints
    }));

    // Custom sort in JS to handle mixed statuses better if needed
    // For now, let's trust the DB sort or do a quick re-sort
    leaderboard.sort((a, b) => {
      // Priority: Finished > Running > Not Started
      const score = (status) => {
        if (status === 'finished') return 0;
        if (status === 'running') return 1;
        return 2;
      };

      if (score(a.status) !== score(b.status)) {
        return score(a.status) - score(b.status);
      }

      // If both finished, sort by time
      if (a.status === 'finished') {
        return (a.totalTime || 0) - (b.totalTime || 0);
      }

      return 0;
    });

    // Re-assign ranks after sort
    leaderboard.forEach((p, i) => p.rank = i + 1);

    res.json(leaderboard);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
