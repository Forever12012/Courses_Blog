import { Menu, X, BookOpen } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-white" />
              <span className="text-white text-xl font-bold">SciAstra</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md"
              >
                Home
              </Link>
              <Link
                to="/courses"
                className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md"
              >
                Courses
              </Link>
              <Link
                to="/blog"
                className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md"
              >
                Blog
              </Link>
              <Link
                to="/admin"
                className="bg-white text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-md"
              >
                Admin
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-indigo-500 p-2 rounded-md"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-white hover:bg-indigo-500 block px-3 py-2 rounded-md"
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="text-white hover:bg-indigo-500 block px-3 py-2 rounded-md"
            >
              Courses
            </Link>
            <Link
              to="/blog"
              className="text-white hover:bg-indigo-500 block px-3 py-2 rounded-md"
            >
              Blog
            </Link>
            <Link
              to="/admin"
              className="bg-white text-indigo-600 hover:bg-indigo-50 block px-3 py-2 rounded-md"
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
