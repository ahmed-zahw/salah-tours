"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Map, FolderTree, Info, LogOut, User, Phone, X } from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";
import clsx from "clsx";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Tours", href: "/admin/tours", icon: Map },
  { name: "Categories", href: "/admin/categories", icon: FolderTree },
  { name: "Homepage Info", href: "/admin/info", icon: Info },
  { name: "Contact Info", href: "/admin/contact", icon: Phone },
];

interface SidebarProps {
  readonly isOpen?: boolean;
  readonly onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: Readonly<SidebarProps>) {
  const { user } = useUser();
  const { signOut } = useClerk();
  const pathname = usePathname();

  const handleSignOut = () => {
    signOut({ redirectUrl: "/" });
  };

  const handleLinkClick = () => {
    // Close mobile menu when a link is clicked
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && onClose && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={clsx(
          "flex h-full w-64 flex-col bg-primary-800 transition-transform duration-300 ease-in-out z-50",
          "lg:translate-x-0 lg:static lg:z-auto",
          {
            "fixed inset-y-0 left-0 translate-x-0": isOpen && onClose,
            "fixed inset-y-0 left-0 -translate-x-full": !isOpen && onClose,
          }
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
          {/* Close button for mobile */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden text-white hover:text-primary-300"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* User Info */}
        <Link href="/admin/profile" onClick={handleLinkClick}>
          <div className="px-4 py-3 bg-primary-900 border-b border-primary-700 hover:bg-primary-800 transition-colors cursor-pointer">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-700 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-primary-100" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">
                  {user?.fullName || user?.emailAddresses[0]?.emailAddress || "Admin"}
                </p>
                <p className="text-xs text-primary-300">Administrator</p>
              </div>
            </div>
          </div>
        </Link>

        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={handleLinkClick}
              className={clsx(
                "flex items-center px-2 py-2 text-base font-medium text-primary-100 hover:bg-primary-700 rounded-md",
                {
                  "bg-primary-700": pathname === item.href,
                }
              )}
            >
              <item.icon className="mr-4 h-6 w-6" />
              {item.name}
            </Link>
          ))}
        </nav>

        <button
          onClick={handleSignOut}
          className="flex items-center px-4 py-4 hover:bg-primary-700 cursor-pointer w-full text-left"
        >
          <LogOut className="mr-4 h-6 w-6 text-primary-100" />
          <span className="text-primary-100">Logout</span>
        </button>
      </div>
    </>
  );
}
