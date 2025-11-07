import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";


/**
 * Layout component
 * Defines the main page structure with a sticky header, content area and footer.
 * Returns the full-page wrapper used across all views.
 */
export default function Layout() {
  return (
    <div className="min-h-dvh flex flex-col bg-white">
      <header className="sticky top-0 z-40 border-b bg-white">
        <div className="container-page py-3">
          <NavBar />
        </div>
      </header>

      <main className="flex-1">
        <div className="container-page py-6">
          <Outlet />
        </div>
      </main>

      <footer className="border-t">
        <div className="container-page py-4 text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} Todo App
        </div>
      </footer>
    </div>
  )
}