# Database Management Guide 🗄️

This guide explains how to view and manage your application data using **MongoDB Atlas** (Cloud Dashboard) and **MongoDB Compass** (Desktop App).

## 1. MongoDB Atlas (Cloud Dashboard) ☁️

This is where your database lives on the internet.

1.  **Log in**: Go to [cloud.mongodb.com](https://cloud.mongodb.com) and sign in.
2.  **Navigate to Database**:
    -   Click on **"Database"** in the left sidebar.
    -   Click the **"Browse Collections"** button on your Cluster card.
3.  **View Data**:
    -   You will see your database name (likely `test` or `maze-orienteering`).
    -   Click on the **`athletes`** collection.
    -   Here you see all registered users as "documents".
4.  **Edit/Delete**:
    -   Click the **pencil icon** to edit fields (e.g., manually fix a typo in a name).
    -   Click the **trash can icon** to delete a user.

## 2. MongoDB Compass (Desktop App) 🧭

Compass is a powerful tool to manage your data from your computer.

1.  **Open Compass**.
2.  **Connect**:
    -   Paste your connection string: `mongodb+srv://Anmol1250:Anmol1250@cluster0.8pdquzt.mongodb.net/?appName=Cluster0`
    -   Click **Connect**.
3.  **Explore**:
    -   On the left sidebar, click your database name.
    -   Click **`athletes`**.
4.  **Real-time Monitoring**:
    -   You can hit the **"Refresh"** icon at the top right of the document list to see new registrations coming in live.

## 3. How to Export Data (Backups) 📥

If you want to save your race results to Excel/CSV:

1.  Open **MongoDB Compass**.
2.  Go to the **`athletes`** collection.
3.  Click the **"Export Data"** button (usually in the top menu bar, looks like an arrow pointing out of a file).
4.  Select **"Export the full collection"**.
5.  Choose **CSV** as the format.
6.  Select the fields you want (Name, Email, TotalTime, Status).
7.  Click **Export**.
    -   *Now you have an Excel-ready file of all your participants!*

## 4. Understanding Your Data

Each "Document" (User) looks like this:
```json
{
  "_id": "...",
  "name": "John Doe",
  "email": "john@college.edu",
  "token": "a1b2c3d4",
  "status": "finished",       // "not_started", "running", "finished"
  "startTime": "2026-02-13T...",
  "checkpoints": [ ... ],     // List of scanned checkpoints
  "totalTime": 125000         // Time in milliseconds
}
```
**Key Fields to Watch:**
-   **`status`**: Tells you if they are currently racing.
-   **`checkpoints`**: Shows progress (check for `checkpointId: 1`, `2`, etc.).
