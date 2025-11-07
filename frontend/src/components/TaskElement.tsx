import { Link } from "react-router-dom";
import { type Task } from "../helpers/types";

import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { fmt, STATUS_CHOICES, truncate } from "../helpers/utils";
import { useState } from "react";
import SelectStatusModal from "./SelectStatusModal";

type TaskElementProps = {
    task: Task;
    onDelete?: (id: number) => void;
    onRefresh?: () => void;
}

async function changeStatus(id: number, status: string) {
  if (!id) {
    throw new Error("Task ID is required.");
  }

  const response = await fetch(`/api/tasks/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({status}),
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return await response.json();
}


/**
 * Reusable component that displays a single task item.
 */
export default function TaskElement({task, onDelete, onRefresh}: TaskElementProps) {
    const [showModal, setShowModal] = useState(false);

    const statusLabel = STATUS_CHOICES.find(([value]) => value === task.status)?.[1] || task.status;

    return (
      <>
        {showModal && <SelectStatusModal message={"Select status"} onSelect={async (option: string) => {
          try {
            if (option !== task.status) {
              await changeStatus(task.id, option);
              onRefresh?.();
            }
          } catch (error) {
            console.error("Error changing status:", (error as Error).message);
          } finally {
            setShowModal(false);
          }
        }} onCancel={()=> setShowModal(false)} />}

        <article className="min-w-80 flex-shrink-0 rounded-md border bg-white p-4 shadow-sm shadow-gray-300 hover:shadow-md">
          <div className="flex items-start justify-between gap-4">
            <button
              className="text-left text-lg font-semibold text-blue-700 focus:outline-none focus:ring-0"
              onClick={() => setShowModal(true)}
            >{task.title}</button>

            <div className="flex gap-2">
              <Link
                to={`/view/${task.id}/`}
                className="rounded-md px-2 py-1 text-sm hover:bg-gray-50"
              ><FaEye className="text-gray-600"  size={20}/></Link>
              <Link
                to={`/edit/${task.id}/`}
                className="rounded-md px-2 py-1 text-sm hover:bg-gray-50"
              ><FaEdit className="text-gray-600"  size={20}/></Link>
              <button
                type="button"
                onClick={() => onDelete?.(task.id)}
                className="rounded-md px-2 py-1 text-sm text-red-600 hover:bg-gray-50"
              ><FaTrash className="text-red-600" size={20}/></button>
            </div>
          </div>

          <p className="italic text-gray-600 mb-2">{statusLabel}</p>

          {task.description ? (
            <p className="text-sm text-gray-700  mb-2">
              {truncate(task.description, 100)}
            </p>
          ) : null}

          <div className="grid grid-cols-1 gap-1 text-xs text-gray-500 sm:grid-cols-2">
            <div>
              <span className="font-medium text-gray-600">Created: </span>{fmt(task.created_at)}
            </div>
            <div>
              <span className="font-medium text-gray-600">Edited: </span>{fmt(task.updated_at)}
            </div>
          </div>
        </article>
    </>
    
  );
}