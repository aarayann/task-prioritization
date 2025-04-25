# Task Prioritizer

A full-stack app for prioritizing tasks using the Dutch National Flag algorithm.

## How to Run

### Backend(main.py)

1. `cd backend`
2. Create `.env` with your Supabase credentials.
3. `pip install -r requirements.txt`
4. `uvicorn main:app --reload`

### Supabase

- Create a table `sorted_tasks` with columns `id` (int, pk), `input` (json), `output` (json).

### Frontend

1. `cd frontend`
2. `npm install`
3. `npm start`

The frontend runs on `localhost:3000`, backend on `localhost:8000`.
