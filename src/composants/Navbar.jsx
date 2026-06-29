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
    // Effet Glassmorphism : arrière-plan semi-transparent avec flou (backdrop-blur)
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center transition-all">
      
      {/* Logo avec un dégradé de couleur moderne */}
      <Link to="/" className="text-2xl font-black tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent hover:opacity-90 transition">
        MonApp<span className="text-indigo-600">.</span>
      </Link>

      {/* Liens de navigation */}
      <div className="flex items-center gap-6">
        <Link 
          to="/" 
          className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-200"
        >
          Accueil
        </Link>
        
        {isLoggedIn ? (
          <>
            <Link 
              to="/profil" 
              className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-200"
            >
              Mon Profil
            </Link>
            <button 
              onClick={handleLogout} 
              className="text-sm font-medium text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl transition-all duration-200"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <div className="flex items-center gap-3 border-l border-gray-200 pl-6">
            <Link 
              to="/connexion" 
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 px-4 py-2 rounded-xl hover:bg-gray-50 transition-all duration-200"
            >
              Connexion
            </Link>
            <Link 
              to="/inscription" 
              className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl shadow-sm hover:shadow-indigo-100 hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
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