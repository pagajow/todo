export default function Loading() {
    return (
        <div className="flex items-center justify-center mt-4">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
            <span className="ml-2 text-gray-600 text-sm">Loading tasks...</span>
        </div>
    );
}   