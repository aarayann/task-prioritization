# Task Prioritization App

A full-stack application for prioritizing tasks using the Dutch National Flag algorithm.  
Built with FastAPI (Python), React, and Supabase.

---

## Features

- **Add tasks** with High, Medium, or Low priority
- **Drag and drop** to reorder tasks before sorting
- **Sort tasks by priority** (High → Medium → Low) using an efficient algorithm
- **Persist sorting history** to Supabase database

---

## Project Structure

task-prioritization/
│
├── main.py # FastAPI backend
├── requirements.txt # Backend dependencies
├── .env # Backend environment variables (Supabase keys)
├── .gitignore # Ignore .env and other files
│
├── frontend/ # React frontend
│ ├── package.json
│ ├── src/
│ │ └── App.js
│ └── public/
│
└── README.md # This file

---

## Setup Instructions

### 1. Supabase

- Create a [Supabase](https://supabase.com/) project.
- In the SQL Editor, create the table:

CREATE TABLE IF NOT EXISTS sorted_tasks (
id SERIAL PRIMARY KEY,
input JSONB,
output JSONB
);

- Get your Supabase project URL and service key.
- Create a `.env` file in the project root with:
- 
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-service-key

---

### 2. Backend (FastAPI)

- Install Python dependencies:
pip install -r requirements.txt

- Start the backend server:
python -m uvicorn main:app --reload

- The API runs at [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

### 3. Frontend (React)

- Go to the frontend folder:
cd frontend

- Install dependencies:
npm install
npm install axios uuid

- Start the React app:
npm start
- The app runs at [http://localhost:3000](http://localhost:3000)

---

## Usage

1. Open the frontend in your browser.
2. Add tasks with different priorities.
3. Drag and drop to reorder tasks if desired.
4. Click **Sort by Priority** to sort tasks (High → Medium → Low).
5. Sorted results are displayed and saved to Supabase.

---

## Environment Variables

- `.env` (in root folder) should contain:
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-service-key

---

## Notes

- Make sure your backend and frontend are running at the same time.
- If you encounter CORS issues, check your FastAPI CORS settings in `main.py`.
- For production, restrict CORS origins and secure your Supabase keys.

---
