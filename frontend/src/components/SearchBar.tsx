import { useState } from "react";
import type { Orderings } from "../helpers/types";
import { ORDERING_CHOICES } from "../helpers/utils";


type Props = {
    onApply: (search: string, ordering: Orderings) => void;
    searchTerm?: string;
    orderingTerm?: Orderings; 
};

/**
 * Responsive search and ordering toolbar.
 * Applies search and ordering parameters to backend query via URL.
 */
export default function SearchBar({onApply, searchTerm="", orderingTerm=""}: Props) {
    const [search, setSearch] = useState(searchTerm);
    const [ordering, setOrdering] = useState(orderingTerm);

    return (<>
        <div className="my-2 flex flex-col gap-2 md:flex-row md:items-center">
            <input 
                type="text" 
                placeholder="Search tasks..." 
                value={search}
                onChange={(e)=> setSearch(e.target.value)}
                className="w-full md:flex-1 md:basis-0 rounded-md border border-gray-300 px-4 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            <select 
                value={ordering}
                onChange={(e) => setOrdering(e.target.value as Orderings)}
                className="w-full md:flex-1 md:basis-0 rounded-md border border-gray-300 px-4 py-2 text-sm
                     bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {ORDERING_CHOICES.map(([value, label])=>(
                        <option key={value} value={value}>{label}</option>
                    ))}
            </select>

            <button 
                onClick={() => onApply(search.trim(), ordering)}
                className="w-full md:w-auto shrink-0 rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white
                     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >Applay</button>
        </div>
    </>);
}
