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
    window.addEventListener('authChange', handleStorageChange); // Gère le même onglet
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleStorageChange);
    };
  }, []);

  const Deconnexion = () => {
    localStorage.removeItem("token");
    setToken(null);
    window.dispatchEvent(new Event('authChange'));
    navigate('/');
  };

  // Style des liens de navigation amélioré
  const linkStyle = ({ isActive }) => 
    `text-sm font-medium tracking-wide transition-all duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-orange-500 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 ${
      isActive ? 'text-orange-500 font-semibold after:scale-x-100' : 'text-slate-400 hover:text-slate-100'
    }`;

  return (
    <nav className='w-full h-[8vh] flex items-center justify-between px-8 bg-slate-900 border-b border-slate-800/80 shadow-2xl sticky top-0 z-50 backdrop-blur-md bg-opacity-95'>
      
      {/* Logo Style "Stack Overflow" Pro */}
      <NavLink to="/" className="flex items-center gap-2 group shrink-0">
        <div className="flex flex-col gap-[3px] rotate-[-15deg] group-hover:rotate-0 transition-transform duration-300">
          <span className="w-4 h-[3px] bg-slate-400 rounded-sm opacity-60"></span>
          <span className="w-5 h-[3px] bg-slate-300 rounded-sm opacity-80"></span>
          <span className="w-6 h-[3px] bg-orange-500 rounded-sm shadow-[0_0_8px_rgba(249,115,22,0.5)]"></span>
        </div>
        <span className="text-lg font-black tracking-tight text-slate-100 ml-1">
          Mini <span className="text-orange-500 group-hover:text-orange-400 transition-colors duration-200">Stack Overflow</span>
        </span>
      </NavLink>

      {/* Barre de recherche moderne intégrée au thème */}
      <div className="flex-1 max-w-2xl mx-12 relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-slate-500 group-focus-within:text-orange-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Rechercher une question, un tag..."
          className="w-full bg-slate-950/60 text-slate-200 placeholder-slate-500 border border-slate-800/80 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 focus:bg-slate-950 transition-all duration-200 shadow-inner"
        />
      </div>
      
      {/* Liens de navigation et Boutons */}
      <div className="flex items-center gap-6 shrink-0">
        <div className="flex items-center gap-6">
          <NavLink to="/" className={linkStyle}>Accueil</NavLink>
          <NavLink to="/profil" className={linkStyle}>Profil</NavLink>
        </div>
        
        {/* Séparateur vertical subtil */}
        <div className="h-5 w-[1px] bg-slate-800"></div>

        {token ? (
          <button
            onClick={Deconnexion}
            className="text-xs font-semibold text-slate-400 hover:text-red-400 bg-slate-950 border border-slate-800 hover:border-red-900/40 px-4 py-2 rounded-xl transition-all duration-200 shadow-md hover:shadow-red-950/10 active:scale-95"
          >
            Se déconnecter
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <NavLink
              to="/connexion"
              className="text-xs font-semibold text-slate-300 hover:text-white px-4 py-2 rounded-xl hover:bg-slate-800/50 border border-transparent hover:border-slate-800 transition-all duration-200"
            >
              Connexion
            </NavLink>
            <NavLink
              to="/inscription"
              className="text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 px-4 py-2 rounded-xl shadow-lg shadow-orange-950/40 hover:shadow-orange-500/20 active:scale-95 transition-all duration-200 border border-orange-500/30"
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