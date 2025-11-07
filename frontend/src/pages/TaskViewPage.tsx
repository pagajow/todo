import {  Link, useParams } from "react-router-dom";
import { type Task } from "../helpers/types";
import ErrorBanner from "../components/ErrorBanner";
import { useEffect, useState } from "react";
import { fmt, STATUS_CHOICES } from "../helpers/utils";


async function fetchTask(id: string) {
  const response = await fetch(`/api/tasks/${id}/`);
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  return await response.json();
}


export default function TaskViewPage() {
  const [task, setTask] = useState<Task | null>(null);
  const { id } = useParams();
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    try {
      if (id) {
        fetchTask(id).then((taskData: Task) => {
          setTask(taskData);
        });
      } else {
        setError("Task ID is missing in the URL.");
      }
    } catch (error) {
      setError((error as Error).message);
    }
  }, []);


  if (!task) return;

  const statusLabel = STATUS_CHOICES.find(([value]) => value === task.status)?.[1] || task.status;

  return <>
    { error && <ErrorBanner message={error} /> }

      <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
      <p className="italic text-gray-600 mb-2">{statusLabel}</p>

      <p className="whitespace-pre-wrap mb-6">{task.description || ""}</p>

      <div className="grid grid-cols-1 gap-1 text-xs text-gray-500 sm:grid-cols-2 mb-4">
        <div>
          <span className="font-medium text-gray-600">Created: </span>{fmt(task.created_at)}
        </div>
        <div>
          <span className="font-medium text-gray-600">Edited: </span>{fmt(task.updated_at)}
        </div>
      </div>

      <Link to="/" className="text-sm text-gray-500 hover:text-blue-600 transition-all duration-200 no-underline">
        ← Back
      </Link>
  </>
}