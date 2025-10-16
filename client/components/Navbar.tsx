import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, User, Home, BarChart3 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavigation("/")}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">I</span>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:inline">
            Intervi
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {isAuthenticated && (
            <>
              <button
                onClick={() => handleNavigation("/dashboard")}
                className="text-slate-600 hover:text-slate-900 transition flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                Dashboard
              </button>
              <button
                onClick={() => handleNavigation("/interview")}
                className="text-slate-600 hover:text-slate-900 transition flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Practice
              </button>
            </>
          )}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-lg">
                <User className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-900">
                  {user?.firstName}
                </span>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => handleNavigation("/login")}
              >
                Login
              </Button>
              <Button
                onClick={() => handleNavigation("/register")}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-4">
          {isAuthenticated && (
            <>
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-lg mb-4">
                <User className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-900">
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
              <button
                onClick={() => handleNavigation("/dashboard")}
                className="w-full text-left px-3 py-2 text-slate-600 hover:text-slate-900 flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                Dashboard
              </button>
              <button
                onClick={() => handleNavigation("/interview")}
                className="w-full text-left px-3 py-2 text-slate-600 hover:text-slate-900 flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Practice
              </button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full flex items-center gap-2 justify-center"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </>
          )}
          {!isAuthenticated && (
            <div className="flex gap-3 flex-col">
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => handleNavigation("/login")}
              >
                Login
              </Button>
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                onClick={() => handleNavigation("/register")}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
