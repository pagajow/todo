import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import djangoLogo from "../assets/django.svg";

import { FaBars } from "react-icons/fa";


// Navigation Links reused in both main manu and sidebar
const tasksNL = <NavLink to="/" end
                    className={({ isActive }) => [
                        "hover:text-blue-600 transition-all duration-200",
                        "no-underline font-medium",
                        isActive ? "text-blue-600 tracking-[0.15em] text-blue-400" : "text-gray-600",
                    ].filter(Boolean).join(" ")}>Tasks </NavLink>
const addTaskNL =   <NavLink to="/add" className={({ isActive }) => [
                        "hover:text-blue-600 transition-all duration-200",
                        "no-underline font-medium",
                        isActive ? "text-blue-600 tracking-[0.15em] text-blue-400" : "text-gray-600",
                    ].filter(Boolean).join(" ")}>Add Task</NavLink>


/**
 * NavBar component
 * 
 * Provides the main navigation for the App.
 * Includes responsive design with a hamburger menu for smaller screens.
 */                    
export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);    
    const location = useLocation();
    
    useEffect(() => setIsOpen(false), [location.pathname]);

    return (
        <nav className="flex h-12 items-center justify-between">
            <div className="flex items-center justify-center gap-2">
                <img src={djangoLogo} alt="Logo Django" className="h-8 w-auto"/>
                <span className="text-2xl font-semibold text-gray-500 select-none">+</span>
                <img src={reactLogo} alt="Logo React" className="h-8 w-auto"/>
            </div>
            

            <ul className="hidden md:flex items-center gap-4">
                <li>{tasksNL}</li>
                <li>{addTaskNL}</li>
            </ul>

            <button
                type="button"
                aria-label="Open menu"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(true)}
                className="md:hidden inline-flex items-center justify-center rounded-lg p-2"
            ><FaBars className="text-2xl text-gray-700" /></button>

            {isOpen && (
                <button
                    aria-label="Close menu"
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-40 bg-black/40 md:hidden"
                />
            )}

            <aside
                role="dialog"
                aria-modal="true"
                className={[
                    "fixed right-0 top-0 z-50 h-dvh w-2/3 max-w-sm bg-white shadow-lg md:hidden",
                    "transform transition-transform duration-200",
                    isOpen ? "translate-x-0" : "translate-x-full",
                ].join(" ")}
            >
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <div className="font-semibold">Menu</div>
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="rounded-lg py-2 px-4"
                        aria-label="Close"
                    >✕</button>
                </div>
                
                <nav className="px-4 py-3">
                    <ul className="flex flex-col gap-3">
                        <li>{tasksNL}</li>
                        <li>{addTaskNL}</li>
                    </ul>
                </nav>

            </aside>
        </nav>
    );
    }