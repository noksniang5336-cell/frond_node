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
    <nav className="w-full bg-white border-b border-gray-100 px-8 py-3.5 flex justify-between items-center tracking-tight">
      
      {/* Logo sobre et intemporel */}
      <Link to="/" className="text-lg font-medium text-black hover:opacity-70 transition-opacity">
        MonApp
      </Link>

      {/* Liens et Actions */}
      <div className="flex items-center gap-8">
        <Link 
          to="/" 
          className="text-sm text-gray-500 hover:text-black transition-colors duration-150"
        >
          Accueil
        </Link>
        
        {isLoggedIn ? (
          <>
            <Link 
              to="/profil" 
              className="text-sm text-gray-500 hover:text-black transition-colors duration-150"
            >
              Mon Profil
            </Link>
            <button 
              onClick={handleLogout} 
              className="text-sm text-red-600 hover:underline underline-offset-4 transition-all"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <div className="flex items-center gap-5">
            <Link 
              to="/connexion" 
              className="text-sm text-gray-600 hover:text-black transition-colors duration-150"
            >
              Connexion
            </Link>
            <Link 
              to="/inscription" 
              className="text-sm font-medium text-white bg-black hover:bg-gray-900 px-3.5 py-1.5 rounded transition-colors duration-150"
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