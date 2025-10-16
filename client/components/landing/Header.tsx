import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">I</span>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Intervi
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-slate-600 hover:text-slate-900 transition">
            Features
          </a>
          <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 transition">
            How it Works
          </a>
          <a href="#domains" className="text-slate-600 hover:text-slate-900 transition">
            Domains
          </a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost">Sign In</Button>
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600"
            onClick={() => navigate("/interview")}
          >
            Get Started
          </Button>
        </div>

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
      </nav>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-4">
          <a href="#features" className="block text-slate-600 hover:text-slate-900">
            Features
          </a>
          <a href="#how-it-works" className="block text-slate-600 hover:text-slate-900">
            How it Works
          </a>
          <a href="#domains" className="block text-slate-600 hover:text-slate-900">
            Domains
          </a>
          <div className="flex gap-3">
            <Button variant="ghost" className="flex-1">
              Sign In
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
              onClick={() => navigate("/interview-select")}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
