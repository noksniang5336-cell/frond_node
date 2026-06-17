import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const Deconnexion = () => {
    localStorage.removeItem("token");
    setToken(null);
    alert('Déconnexion réussie');
    navigate('/');
  };

  // Style partagé pour les liens actifs/inactifs du menu
  const linkStyle = ({ isActive }) => 
    `text-sm font-medium transition-colors duration-200 ${
      isActive ? 'text-orange-500 font-semibold' : 'text-slate-300 hover:text-white'
    }`;

  return (
    <nav className='w-full h-[8vh] flex items-center justify-between px-8 bg-slate-900 border-b border-slate-800 shadow-lg sticky top-0 z-50 backdrop-blur-md bg-opacity-95'>
      
      {/* Logo Style "Stack Overflow" */}
      <NavLink to="/" className="flex items-center gap-2 group">
        <span className="text-xl font-black tracking-tight text-white">
          Mini <span className="text-orange-500 group-hover:text-orange-400 transition-colors">Stack Overflow</span>
        </span>
      </NavLink>
            <div className="flex-1 mx-10">
        <input
          type="text"
          placeholder="Rechercher une question..."
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      
      {/* Liens de navigation et Boutons */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-6">
          <NavLink to="/" className={linkStyle}>Accueil</NavLink>
          <NavLink to="/profil" className={linkStyle}>Profil</NavLink>
        </div>
        
        {/* Séparateur vertical discret */}
        <div className="h-4 w-[1px] bg-slate-700"></div>

        {token ? (
          <button
            onClick={Deconnexion}
            className="text-sm font-semibold text-slate-300 hover:text-red-400 bg-slate-800 hover:bg-red-950/30 px-4 py-2 rounded-lg border border-slate-700 hover:border-red-900/50 transition-all duration-200"
          >
            Se déconnecter
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <NavLink
              to="/connexion"
              className="text-sm font-semibold text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-all duration-200"
            >
              Connexion
            </NavLink>
            <NavLink
              to="/inscription"
              className="text-sm font-semibold text-white bg-orange-600 hover:bg-orange-500 px-4 py-2 rounded-lg shadow-md shadow-orange-900/20 active:scale-95 transition-all duration-200"
            >
              Inscription
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar;

