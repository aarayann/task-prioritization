import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI()

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this for production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Task(BaseModel):
    title: str
    priority: int  # 0=High, 1=Medium, 2=Low

class TaskList(BaseModel):
    tasks: List[Task]

class SortedTasksResponse(BaseModel):
    sorted_tasks: List[Task]

def sort_tasks(tasks):
    low, mid, high = 0, 0, len(tasks) - 1
    tasks = tasks.copy()
    while mid <= high:
        if tasks[mid].priority == 0:
            tasks[low], tasks[mid] = tasks[mid], tasks[low]
            low += 1
            mid += 1
        elif tasks[mid].priority == 1:
            mid += 1
        else:
            tasks[mid], tasks[high] = tasks[high], tasks[mid]
            high -= 1
    return tasks

@app.post("/sort-tasks", response_model=SortedTasksResponse)
def sort_tasks_api(task_list: TaskList):
    if not all(task.priority in [0, 1, 2] for task in task_list.tasks):
        raise HTTPException(status_code=400, detail="Invalid priority value")
    sorted_tasks = sort_tasks(task_list.tasks)
    # Save to Supabase
    data = {
        "input": [task.dict() for task in task_list.tasks],
        "output": [task.dict() for task in sorted_tasks]
    }
    supabase.table("sorted_tasks").insert(data).execute()
    return {"sorted_tasks": sorted_tasks}
