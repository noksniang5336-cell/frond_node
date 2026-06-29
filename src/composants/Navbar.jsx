import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, UserPlus, LogOut } from "lucide-react";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-full px-6 py-4 bg-gray-50">
      <nav className="max-w-7xl mx-auto bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/80 px-6 h-20 flex justify-between items-center">
        
        {/* LOGO */}
        <div className="flex items-center gap-8 h-full">
          <Link to="/" className="flex items-center gap-3 group">
            {/* Le carré violet avec le O blanc à la place du M */}
            <div className="w-10 h-10 bg-[#5046e5] rounded-xl flex items-center justify-center font-black text-white text-xl tracking-tighter shadow-sm shadow-indigo-200">
              M
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
             Mini Stack Overflow
            </span>
          </Link>
          
          {/* LIENS DE NAVIGATION */}
          <div className="flex items-center h-full pt-1">
            <Link 
              to="/" 
              className={`relative text-[15px] font-medium px-2 h-20 flex items-center transition-colors ${
                isActive("/") ? "text-[#5046e5]" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Accueil
              {isActive("/") && (
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#5046e5] rounded-t-full" />
              )}
            </Link>

            {isLoggedIn && (
              <Link 
                to="/profil" 
                className={`relative text-[15px] font-medium px-2 h-20 flex items-center transition-colors ml-6 ${
                  isActive("/profil") ? "text-[#5046e5]" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Mon Profil
                {isActive("/profil") && (
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#5046e5] rounded-t-full" />
                )}
              </Link>
            )}
          </div>
        </div>

        {/* UTILS / AUTHENTIFICATION */}
        <div className="flex items-center gap-5">
          {isLoggedIn ? (
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 text-[15px] font-medium text-gray-600 hover:text-red-600 transition-colors px-4 py-2 rounded-xl hover:bg-red-50"
            >
              <LogOut size={18} />
              Déconnexion
            </button>
          ) : (
            <>
              <Link 
                to="/connexion" 
                className="flex items-center gap-2 text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-2"
              >
                <User size={18} className="text-gray-400" />
                Connexion
              </Link>

              <div className="h-6 w-[1px] bg-gray-200" />

              <Link 
                to="/inscription" 
                className="flex items-center gap-2 text-[15px] font-medium text-white bg-[#5046e5] hover:bg-[#4338ca] px-5 py-2.5 rounded-full shadow-sm shadow-indigo-100 transition-all transform active:scale-95"
              >
                <UserPlus size={16} className="opacity-90" />
                Créer un compte
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;