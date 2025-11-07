import { Link, useNavigate, useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import  { type TaskProp, type Task, toTaskProp} from "../helpers/types";
import ErrorBanner from "../components/ErrorBanner";
import { useEffect, useState } from "react";


async function fetchTask(id: string) {
  const response = await fetch(`/api/tasks/${id}/`);
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  return await response.json();
}

async function editTask(task: TaskProp, id: string | undefined) {
  if (!id) {
    throw new Error("Task ID is required for editing.");
  }

  const response = await fetch(`/api/tasks/${id}/`, {
    method: "PATCH",
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

export default function TaskEditPage() {
  const [data, setData] = useState<Task | null>(null);
  const { id } = useParams();
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();


  useEffect(() => {
    try {
      if (id) {
        fetchTask(id).then((taskData: Task) => {
          setData(taskData);
        });
      } else {
        setError("Task ID is missing in the URL.");
      }
    } catch (error) {
      setError((error as Error).message);
    }
  }, []);

  async function handleSubmit(task: TaskProp) {
    try {
      await editTask(task, id);
      navigate(`/`);
    } catch (error) {
      setError((error as Error).message);
    }
  }

  if (!data) return;

  return <>
    { error && <ErrorBanner message={error} /> }
    <TaskForm 
      task={data ? toTaskProp(data) : undefined}
      onSubmit={handleSubmit} 
      sumbitLabel="Save"
    />
    <Link to="/" className="text-sm text-gray-500 hover:text-blue-600 transition-all duration-200 no-underline">
      ← Back
    </Link>
  </>
}