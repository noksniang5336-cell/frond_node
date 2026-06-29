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
    <nav className="bg-yellow-300 border-4 border-black p-4 flex justify-between items-center m-4 rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      
      {/* Logo Brutaliste */}
      <Link 
        to="/" 
        className="text-2xl font-black uppercase tracking-wider text-black border-2 border-black bg-white px-3 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
      >
        MonApp
      </Link>

      {/* Liens et Boutons */}
      <div className="flex items-center gap-6">
        <Link 
          to="/" 
          className="text-sm font-black uppercase text-black hover:underline underline-offset-4 decoration-4"
        >
          Accueil
        </Link>
        
        {isLoggedIn ? (
          <>
            <Link 
              to="/profil" 
              className="text-sm font-black uppercase text-black hover:underline underline-offset-4 decoration-4"
            >
              Mon Profil
            </Link>
            <button 
              onClick={handleLogout} 
              className="text-sm font-black uppercase text-white bg-red-500 border-2 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <Link 
              to="/connexion" 
              className="text-sm font-black uppercase text-black border-2 border-black bg-white px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              Connexion
            </Link>
            <Link 
              to="/inscription" 
              className="text-sm font-black uppercase text-black border-2 border-black bg-emerald-400 px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
            >
              Inscription
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;