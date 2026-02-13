# How to Upload Code to GitHub 🐙

Follow these steps to upload your backend and frontend code to a new GitHub repository.

## Prerequisites
1.  **GitHub Account**: Make sure you have an account at [github.com](https://github.com).
2.  **Git Installed**: Ensure Git is installed on your computer.

## Step 1: Create a Repository on GitHub
1.  Log in to GitHub.
2.  Click the **+** icon in the top-right corner and select **New repository**.
3.  **Name**: `maze-orienteering` (or whatever you prefer).
4.  **Public/Private**: Choose **Public** (easier for free deployment) or **Private**.
5.  **Do NOT** check "Initialize with README", ".gitignore", or "License" (we already have these locally).
6.  Click **Create repository**.
7.  Copy the URL (e.g., `https://github.com/your-username/maze-orienteering.git`).

## Step 2: Initialize Git Locally
Open your terminal in the project folder (`/Users/anmolkumar/Documents/PROTOTYPE`) and run:

```bash
# Initialize git
git init

# Add all files to staging
git add .

# Commit your changes
git commit -m "Initial commit for Maze Orienteering App"
```

## Step 3: Connect and Push
Replace `YOUR_REPO_URL` with the link you copied in Step 1.

```bash
# Rename branch to main (best practice)
git branch -M main

# Add your GitHub repository as 'origin'
git remote add origin YOUR_REPO_URL

# Push your code
git push -u origin main
```

## Step 4: Verify
Refresh your GitHub repository page. You should now see all your folders: `backend`, `frontend`, `deployment.md`, etc.

---

### Update for Future Changes
Whenever you make changes to your code, run these 3 commands to update GitHub:

```bash
git add .
git commit -m "Description of changes"
git push
```
