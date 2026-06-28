import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate, Link } from 'react-router-dom'
import { Sun, Bell, ChevronDown, Search } from 'lucide-react'

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  
  // Simulation des données utilisateur
  const [user, setUser] = useState({
    nom: "Nogaye Niang",
    avatar: "" 
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authChange', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleStorageChange);
    };
  }, []);

  const Deconnexion = (e) => {
    // Empêche le clic sur déconnexion de déclencher la navigation vers le profil
    e.stopPropagation(); 
    localStorage.removeItem("token");
    setToken(null);
    window.dispatchEvent(new Event('authChange'));
    navigate('/');
  };

  // Style des liens actifs de la Navbar principale
  const linkStyle = ({ isActive }) => 
    `text-xs font-semibold tracking-wide transition-all duration-200 relative py-1 after:content-[''] after:absolute after:bottom-[-22px] after:left-0 after:w-full after:h-[2px] after:bg-orange-500 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 ${
      isActive ? 'text-orange-500 after:scale-x-100' : 'text-slate-400 hover:text-slate-200'
    }`;

  return (
    <nav className='w-full h-[8vh] flex items-center justify-between px-6 md:px-8 bg-[#090d16] border-b border-slate-900 shadow-xl sticky top-0 z-50 backdrop-blur-md bg-opacity-95'>
      
      {/* 1. LOGO MINI STACK OVERFLOW */}
      <NavLink to="/" className="flex items-center gap-2 group shrink-0">
        <div className="flex flex-col gap-[3px] rotate-[-15deg] group-hover:rotate-0 transition-transform duration-300">
          <span className="w-3.5 h-[2.5px] bg-slate-500 rounded-sm opacity-60"></span>
          <span className="w-4.5 h-[2.5px] bg-slate-400 rounded-sm opacity-80"></span>
          <span className="w-5.5 h-[2.5px] bg-orange-500 rounded-sm shadow-[0_0_8px_rgba(249,115,22,0.6)]"></span>
        </div>
        <span className="text-sm font-black tracking-tight text-white ml-1">
          Mini <span className="text-orange-500 group-hover:text-orange-400 transition-colors duration-200">Stack Overflow</span>
        </span>
      </NavLink>

      {/* 2. BARRE DE RECHERCHE CENTRALISÉE */}
      <div className="flex-1 max-w-xl mx-6 md:mx-12 relative group hidden sm:block">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={14} className="text-slate-600 group-focus-within:text-orange-500 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Rechercher une question, un tag..."
          className="w-full bg-[#111625]/60 text-slate-200 placeholder-slate-600 border border-slate-900 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-orange-500/30 focus:ring-4 focus:ring-orange-500/5 focus:bg-[#111625] transition-all duration-200 shadow-inner"
        />
      </div>
      
      {/* 3. MENU DE NAVIGATION ET PROFIL */}
      <div className="flex items-center gap-5 shrink-0">
        
        {/* Liens de pages - Seul l'accueil est conservé */}
        <div className="flex items-center gap-5 mr-1">
          <NavLink to="/" className={linkStyle}>Accueil</NavLink>
        </div>

        {/* Boutons d'outils (Soleil & Cloche) */}
        <div className="flex items-center gap-3 text-slate-500 border-l border-slate-900 pl-4">
          <button className="hover:text-slate-200 transition-colors">
            <Sun size={16} />
          </button>
          <button className="hover:text-slate-200 transition-colors relative">
            <Bell size={16} />
            <span className="absolute top-0 right-0 h-1.5 w-1.5 bg-orange-500 rounded-full"></span>
          </button>
        </div>

        {/* Espace Utilisateur (Connecté vs Déconnecté) */}
        {token ? (
          /* Transformation du conteneur en Link vers la page profil */
          <Link 
            to="/profil" 
            className="flex items-center gap-2 pl-2 border-l border-slate-900 relative group cursor-pointer py-1 no-underline select-none"
          >
            {/* Avatar circulaire */}
            {user.avatar ? (
              <img src={user.avatar} alt={user.nom} className="h-7 w-7 rounded-full object-cover border border-slate-800" />
            ) : (
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-[10px] uppercase shadow-md">
                {user.nom.substring(0, 2)}
              </div>
            )}
            
            {/* Nom & Chevron */}
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">
                {user.nom}
              </span>
              <ChevronDown size={12} className="text-slate-500 group-hover:text-slate-300 transition-transform group-hover:translate-y-0.5" />
            </div>

            {/* Menu Déroulant au survol pour se déconnecter proprement */}
            <div className="absolute right-0 top-full mt-2 w-40 bg-[#111625] border border-slate-900 rounded-xl shadow-2xl p-1.5 hidden group-hover:block animate-in fade-in slide-in-from-top-1 duration-150 z-50">
              <button
                onClick={Deconnexion}
                className="w-full text-left text-xs font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/10 px-3 py-2 rounded-lg transition-all"
              >
                Se déconnecter
              </button>
            </div>
          </Link>
        ) : (
          <div className="flex items-center gap-3 pl-2">
            <NavLink
              to="/connexion"
              className="text-xs font-bold text-slate-400 hover:text-white px-3 py-2 transition-all"
            >
              Connexion
            </NavLink>
            <NavLink
              to="/inscription"
              className="text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-400 hover:to-purple-500 px-4 py-2 rounded-xl shadow-lg shadow-orange-500/10 active:scale-95 transition-all duration-200"
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