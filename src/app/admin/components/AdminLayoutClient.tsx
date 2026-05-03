"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

interface AdminLayoutClientProps {
  readonly children: React.ReactNode;
}

export default function AdminLayoutClient({ children }: Readonly<AdminLayoutClientProps>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for desktop and mobile */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header with menu button */}
        <div className="lg:hidden bg-primary-800 text-white border-b border-gray-200 px-4 py-3 flex items-center">
          <button
            onClick={toggleSidebar}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="ml-4 text-lg font-semibold">Admin Dashboard</h1>
        </div>

        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
