import { useState } from "react";
import type { TaskProp, TaskStatus } from "../helpers/types";
import { STATUS_CHOICES } from "../helpers/utils";


type TaskFormProps = {
    task?: TaskProp;
    onSubmit: (task: TaskProp) => void;
    sumbitLabel?: string;
};

type Validation = {
    isValid: boolean;
    errors: string[];
}

type TaskValidation = {
    title: Validation;
    description: Validation;
    status: Validation;
}

/**
 * Validates a given Task object.
 * Returns an object with validation results for each field (title, description, status).
 */
function validate(task?: TaskProp): TaskValidation {
    const validationData: TaskValidation = {
        title: { isValid: true, errors: [] },
        description: { isValid: true, errors: [] },
        status: { isValid: true, errors: [] },
    };

    if (!task) return validationData;

    if (task.title.trim() === "") {
        validationData.title.isValid = false;
        validationData.title.errors.push("Title is required.");
    }

    if (!STATUS_CHOICES.some(([value]) => value === task.status)) {
        validationData.status.isValid = false;
        validationData.status.errors.push(`Invalid status {task.status}.`);
    }  
    return validationData;
}

/**
 * Checks if all fields in the validation object are valid.
 */
function isValid(validationData: TaskValidation): boolean {
    return Object.values(validationData).every(field => field.isValid);
}

/**
 * Reusable form component for creating or editing a Task.
 * Optionally initialized with an existing Task object for editing mode.
 * Includes validation logic for title, description, and status fields.
 * Calls onSubmit() with valid data when the form is submitted.
 */
export default function TaskForm({task, onSubmit, sumbitLabel="Save"}: TaskFormProps) {
    const [data, setData] = useState<TaskProp>({
        title: task?.title || "",
        description: task?.description || "",
        status: task?.status || STATUS_CHOICES[0][0],
    });

    const [validationData, setValidationData] = useState<TaskValidation>(validate());

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setValidationData(validate(data));
        if (!isValid(validationData)) return;
        onSubmit(data);
    };

     
    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    id="title"
                    name="title"
                    value={data.title}
                    onChange={(e) => setData({ ...data, title: e.target.value })}
                    aria-invalid={!validationData.title.isValid}
                    aria-describedby={!validationData.title.isValid ? validationData.title.errors.map((_, i) => `title-error-${i}`).join(" ") : undefined}
                    className={[
                        "mt-1 w-full rounded-md border px-3 py-2 text-sm",
                        validationData.title.isValid ? 
                            "border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" : 
                            "border-red-500 focus:outline-none focus:ring-2 focus:ring-red-400",
                    ].join(" ")}
                    placeholder="Enter task title…"
                    maxLength={200}
                    required />
                {!validationData.title.isValid && (
                    <div className="mt-1 space-y-1" aria-live="polite">
                        {validationData.title.errors.map((msg, i) => (
                            <p key={i} id={`title-error-${i}`} className="text-xs text-red-600">
                                {msg}
                            </p>
                        ))}
                    </div>
                )}
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description <span className="text-gray-400">(optional)</span></label>
                <textarea
                    id="description"
                    name="description"
                    value={data.description}
                    onChange={(e) => setData({ ...data, description: e.target.value })}
                    aria-invalid={!validationData.description.isValid}
                    aria-describedby={!validationData.description.isValid ? validationData.description.errors.map((_, i) => `description-error-${i}`).join(" ") : undefined}
                    className={[
                        "mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white min-h-[100px]",
                        validationData.description.isValid
                        ? "border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        : "border-red-500 focus:outline-none focus:ring-2 focus:ring-red-400",
                    ].join(" ")}
                    placeholder="Short details…"
                    rows={5}
                    maxLength={1000} />
                {!validationData.description.isValid && (
                    <div className="mt-1 space-y-1" aria-live="polite">
                        {validationData.description.errors.map((msg, i) => (
                            <p key={i} id={`description-error-${i}`} className="text-xs text-red-600">{msg}</p>
                        ))}
                    </div>
                )}
            </div>


            <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select
                    id="status"
                    name="status"
                    value={data.status}
                    onChange={(e) => setData({ ...data, status: e.target.value as TaskStatus })}
                    aria-invalid={!validationData.status.isValid}
                    aria-describedby={!validationData.status.isValid ? validationData.status.errors.map((_, i) => `status-error-${i}`).join(" ") : undefined}
                    className={[
                        "mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white",
                        validationData.status.isValid
                        ? "border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        : "border-red-500 focus:outline-none focus:ring-2 focus:ring-red-400",
                    ].join(" ")} >
                    {STATUS_CHOICES.map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
                {!validationData.status.isValid && (
                    <div className="mt-1 space-y-1" aria-live="polite">
                        {validationData.status.errors.map((msg, i) => (
                            <p key={i} id={`status-error-${i}`} className="text-xs text-red-600">{msg}</p>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
                <button
                type="submit"
                className="btn btn-primary" >{sumbitLabel}</button>
            </div>

        </form>
        
    );
}

