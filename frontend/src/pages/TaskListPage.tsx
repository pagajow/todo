import { useCallback, useEffect, useState } from "react";
import type { Orderings, Task } from "../helpers/types";
import ErrorBanner from "../components/ErrorBanner";
import TaskElement from "../components/TaskElement";
import DeleteModal from "../components/DeleteModal";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";

type QueryParams = Record<string, string>;

// Fetches all tasks from the backend API.
async function fetchTasks(params: QueryParams = {}): Promise<Task[]> {
  const qs = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      qs.append(key, String(value));
    }
  });

  const url = qs.toString() ? `/api/tasks/?${qs.toString()}` : `/api/tasks/`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  const tasks: Task[] = await response.json();
  return tasks;
}

// Sends a DELETE request to remove a specific task by its ID.
async function deleteTask(id: number) {
  const response = await fetch(`/api/tasks/${id}/`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
}


/**
 * TaskListPage component:
 * Displays a list of all tasks fetched from the backend.
 */
export default function TaskListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [taskId, setTaskId] = useState<number|null>(null);
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTasks({
        search: searchParams.get("search") ?? "", 
        ordering: searchParams.get("ordering") ?? ""
      });
      setTasks(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    load();
  }, [load]);


  async function handleConfirmDelete(){
    if (!taskId) return;
    try {
      await deleteTask(taskId);
      await load();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setTaskId(null);
    }
  };


  function handleApplySearch(search: string, ordering: string){
    const params: QueryParams = {};
    if (search) params.search = search;
    if (ordering) params.ordering = ordering;
    setSearchParams(params);
  }
  if (loading) return <Loading />;



  return <>
    { taskId && 
      <DeleteModal 
        message={"Do you want to delete this task?"} 
        onConfirm={handleConfirmDelete} 
        onCancel={()=> setTaskId(null)} 
        confirmText="Delete" 
        cancelText="Cancel" 
      /> 
    }

    { error && <ErrorBanner message={error} /> }

    <SearchBar 
      searchTerm={searchParams.get("search") ?? ""} 
      orderingTerm={(searchParams.get("ordering") ?? "") as Orderings}
    onApply={handleApplySearch}/>

    {tasks && (<ul>
        {tasks.map((task) => (
          <li key={task.id} className="mb-3"><TaskElement task={task} onDelete={(id)=>setTaskId(id)} onRefresh={load}/></li>
        ))}
      </ul>
    )}
  </>
}