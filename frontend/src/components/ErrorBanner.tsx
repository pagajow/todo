export default function ErrorBanner({ message }: { message: string | null }) {
  if (!message) return null;

  return (
    <div className="mb-4 rounded-md bg-red-100 px-4 py-2 text-sm text-red-800 shadow-sm">
      <strong className="font-semibold">Error:</strong> {message || "An unexpected error occurred."}
    </div>
  );
}
