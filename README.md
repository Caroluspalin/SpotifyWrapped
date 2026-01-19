# 🎵 Spotify Wrapped 2026 (Futuristic Concept)

A modern, full-stack "Spotify Wrapped" clone built to simulate real-time music analytics. This project reimagines the Spotify experience with a premium, futuristic "Glassmorphism" aesthetic (2026 Vision) while implementing a fully functional backend for tracking listening history.

The goal was to build a data-driven web app where every interaction updates the database instantly, creating a live "Wrapped" leaderboard without waiting for the end of the year.

---

## ✨ Features

* **Real-time Analytics:** Every "play" on the home screen sends an `INSERT` command to Supabase, updating the leaderboard instantly.
* **Dynamic "Wrapped" Generator:** A SQL View aggregates listening history to calculate top songs and ranking on the fly.
* **Cinematic Artist Reveal:** A dedicated "Top Artist" page that calculates if the user is in the "Top 1%" of listeners.
* **Cloud Asset Management:** High-resolution album art is fetched dynamically from **Supabase Storage** buckets.
* **Futuristic UI:** Built with pure CSS (no frameworks) featuring glassmorphism, neon glows, and smooth staggered animations.

---

## 📸 App Walkthrough

### 1. The Home Dashboard
The main player interface. It fetches the music library from the database and allows users to "listen" to tracks, logging data in real-time.

<img width="1440" height="900" alt="Screenshot 2026-01-19 at 2 03 01" src="https://github.com/user-attachments/assets/6c648b74-9be6-4cc4-9c7c-7b99d0571fa1" />


### 2. Your Top Songs (The Wrapped List)
The analytics page. It queries the `top_tracks` view to display the user's most-played songs, sorted by play count.

<img width="1440" height="900" alt="Screenshot 2026-01-19 at 2 03 18" src="https://github.com/user-attachments/assets/63494beb-fd08-4fc5-af70-2658f6f73c09" />


### 3. Top Artist Reveal
The finale. A visual reveal of the most listened-to artist, complete with dynamic stats (total plays and listener percentile).

<img width="1440" height="900" alt="Screenshot 2026-01-19 at 2 03 33" src="https://github.com/user-attachments/assets/42861a8d-502e-4c7c-a3b3-e9703e8614e9" />


---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3 (Glassmorphism, Animations), Vanilla JavaScript (ES6+).
* **Backend:** Supabase (PostgreSQL) for database & API.
* **Storage:** Supabase Storage (Object storage for album art).
* **Learning Focus:** SQL joins, database views, and connecting a frontend to a cloud backend.

---

## 💾 Database Logic (SQL)

The core logic of the app relies on a **SQL View** that joins the songs table (`biisit`) with the history table (`historia`).

### The "Wrapped" Calculation:
```sql
CREATE VIEW top_tracks AS
SELECT 
  b.id,
  b.nimi as track_name,
  b.artisti as artist,
  b.kuva_url, 
  COUNT(h.id) as play_count
FROM biisit b
JOIN historia h ON b.id = h.biisi_id
GROUP BY b.id, b.nimi, b.artisti, b.kuva_url
ORDER BY play_count DESC;
📂 Project Structure
Plaintext
/spotify-wrapped
│
├── home.html       # Main dashboard (music player)
├── wrapped.html    # Top songs list
├── artist.html     # Top artist reveal page
├── styles/         # CSS files (glassmorphism styles)
├── scripts/        # JS logic for Supabase connection
└── README.md       # Project documentation
🚀 How to Run
Clone the repository

Bash
git clone [https://github.com/caroluspalin/spotify-wrapped-2026.git](https://github.com/caroluspalin/spotify-wrapped-2026.git)
Open the project

Open home.html in your browser.

Recommended: Use "Live Server" in VS Code to avoid CORS issues.

Database Connection

The app connects to a live Supabase instance.

To run your own version, create a Supabase project and run the SQL scripts found in /sql/setup.sql.

👤 Author
Carolus - Full Stack Developer & UI Designer
