import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import type { TaskProp } from "../helpers/types";
import ErrorBanner from "../components/ErrorBanner";
import { useState } from "react";


async function createTask(task: TaskProp) {
  const response = await fetch("/api/tasks/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return await response.json();
}

export default function TaskAddPage() {
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  async function handleSubmit(task: TaskProp) {
    try {
      await createTask(task);
      navigate(`/`);
    } catch (error) {
      setError((error as Error).message);
    }
  }

  return <>
    { error && <ErrorBanner message={error} /> }
    <TaskForm 
      onSubmit={handleSubmit} 
      sumbitLabel="Create"
    />
  </>
}