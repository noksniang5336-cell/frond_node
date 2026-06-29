import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#1F1F1F] px-8 py-3 flex justify-between items-center">
      
      {/* Logo Cyber */}
      <Link to="/" className="text-lg font-bold tracking-wider text-white hover:opacity-80 transition-opacity">
        MON<span className="text-zinc-500">APP</span>
      </Link>

      {/* Liens de navigation */}
      <div className="flex items-center gap-8">
        <Link 
          to="/" 
          className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200"
        >
          Accueil
        </Link>
        
        {isLoggedIn ? (
          <>
            <Link 
              to="/profil" 
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200"
            >
              Mon Profil
            </Link>
            <button 
              onClick={handleLogout} 
              className="text-sm font-medium text-red-400 hover:text-red-300 bg-red-950/30 border border-red-900/50 hover:border-red-700 px-4 py-1.5 rounded-md transition-all duration-200"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <Link 
              to="/connexion" 
              className="text-sm font-medium text-zinc-400 hover:text-white px-3 py-1.5 transition-colors duration-200"
            >
              Connexion
            </Link>
            <Link 
              to="/inscription" 
              className="text-sm font-medium text-black bg-white hover:bg-zinc-200 px-4 py-1.5 rounded-md shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-200"
            >
              S'inscrire
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;