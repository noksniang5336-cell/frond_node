import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Ajuste le chemin

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">MonApp</Link>

      <div className="flex gap-4">
        <Link to="/" className="text-gray-600 hover:text-blue-600 px-3 py-2">Accueil</Link>
        
        {isLoggedIn ? (
          <>
            <Link to="/profil" className="text-gray-600 hover:text-blue-600 px-3 py-2">Mon Profil</Link>
            <button 
              onClick={logout} 
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/connexion" 
              className="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
            >
              Connexion
            </Link>
            <Link 
              to="/inscription" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Inscription
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;