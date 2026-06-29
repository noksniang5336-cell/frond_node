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
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200/80 px-6 h-16 flex justify-between items-center">
      
      {/* Brand / Logo - Sobre et intemporel */}
      <div className="flex items-center gap-8">
        <Link to="/" className="text-lg font-bold tracking-tight text-gray-950 hover:opacity-80 transition-opacity">
          MonApp
        </Link>
        
        {/* Navigation Principale (Visible tout le temps) */}
        <div className="hidden md:flex items-center gap-1">
          <Link 
            to="/" 
            className="text-[14px] font-medium text-gray-600 hover:text-gray-950 px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors"
          >
            Accueil
          </Link>
          {isLoggedIn && (
            <Link 
              to="/profil" 
              className="text-[14px] font-medium text-gray-600 hover:text-gray-950 px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors"
            >
              Mon Profil
            </Link>
          )}
        </div>
      </div>

      {/* Actions / Authentification */}
      <div className="flex items-center gap-3">
        {isLoggedIn ? (
          <button 
            onClick={handleLogout} 
            className="text-[14px] font-medium text-gray-600 hover:text-red-600 border border-gray-200 hover:border-red-200 px-3.5 py-1.5 rounded-md hover:bg-red-50/50 transition-all"
          >
            Déconnexion
          </button>
        ) : (
          <>
            <Link 
              to="/connexion" 
              className="text-[14px] font-medium text-gray-600 hover:text-gray-950 px-3.5 py-1.5 transition-colors"
            >
              Connexion
            </Link>
            <Link 
              to="/inscription" 
              className="text-[14px] font-medium text-white bg-gray-900 hover:bg-gray-800 px-3.5 py-1.5 rounded-md shadow-sm transition-colors"
            >
              Créer un compte
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;