import React from "react";
import { Shield, Home } from "lucide-react";
import logo from "../assets/logo.png";
import { Page } from "../App";

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <header className="bg-slate-900/90 backdrop-blur-sm border-b border-blue-500/20 sticky top-0 z-50 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto py-3 sm:py-4 flex items-center justify-between">
        <div
          className="flex items-center space-x-2 sm:space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => onNavigate("home")}
        >
          <div className="relative">
            {/* <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" /> */}
            <img
              src={logo}
              alt="Logo"
              className="h-10 w-10 sm:h-14 sm:w-14 object-contain"
            />
            <div className="absolute inset-0 animate-pulse bg-blue-400/20 rounded-full blur-sm"></div>
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-white">
              CyberCoach AI
            </h1>
            <p className="text-blue-300 text-xs sm:text-lg sm:block">
              Restez cyber-serein !
            </p>
          </div>
        </div>

        {currentPage !== "home" && (
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm sm:text-base"
          >
            <Home className="h-4 w-4 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Accueil</span>
          </button>
        )}
      </div>
    </header>
  );
}
