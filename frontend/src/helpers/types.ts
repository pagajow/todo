
export type TaskStatus = "open" | "in_progress" | "completed";
export type Orderings = "" | "title" | "-title" | "created_at" | "-created_at" | "updated_at" | "-updated_at";

export type Task = {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    created_at: string;
    updated_at: string; 
} 

export type TaskProp = {
    title: string;
    description: string;
    status: TaskStatus;
}

export function toTaskProp(t: Task): TaskProp {
  return { title: t.title, description: t.description, status: t.status };
}
