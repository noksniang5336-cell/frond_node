import React from "react";
import { useNavigate } from "react-router-dom";
import { Compass, MessageSquare, Bookmark, Hash, Users, Zap, ChevronUp, ChevronDown } from "lucide-react";
import Questions from "./../../composants/Questions";

const Accueil = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const VerificationToken = () => {
    if (token) {
      navigate("/ajouter_question");
    } else {
      navigate("/connexion");
    }
  };

  return (
    <div className="min-h-[92vh] bg-[#090d16] text-slate-300 flex antialiased font-sans">
      
      {/* 1. SIDEBAR GAUCHE */}
      <aside className="w-64 border-r border-slate-900 p-6 hidden lg:flex flex-col gap-8 shrink-0">
        
        {/* Menu principal */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 px-3 py-1 text-xs font-semibold text-emerald-500 tracking-wider uppercase mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Communauté active
          </div>
          
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-orange-500/10 text-orange-500 transition-all text-left">
            <Compass size={18} /> Toutes les questions
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 transition-all text-left">
            <MessageSquare size={18} /> Mes questions
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 transition-all text-left">
            <Bookmark size={18} /> Questions suivies
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 transition-all text-left">
            <Hash size={18} /> Tags populaires
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 transition-all text-left">
            <Users size={18} /> Utilisateurs
          </button>
        </div>

        {/* Section Tags Populaires */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-500 tracking-wider uppercase px-3">
            Tags populaires
          </h3>
          <div className="flex flex-wrap gap-2 px-2">
            {["javascript", "react", "mongodb", "node.js", "php", "laravel"].map((tag) => (
              <span key={tag} className={`text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white hover:border-slate-700 cursor-pointer transition-all ${
                tag === 'javascript' ? 'border-orange-500/30 text-orange-400 bg-orange-500/5' : ''
              }`}>
                {tag}
              </span>
            ))}
          </div>
          <button className="text-xs font-semibold text-orange-500 hover:text-orange-400 transition-colors px-3 pt-1 block">
            Voir tous les tags →
          </button>
        </div>

        {/* Encadré d'appel à l'action bas de la Sidebar */}
        <div className="mt-auto bg-gradient-to-b from-slate-900/60 to-slate-950 border border-slate-900 rounded-2xl p-4 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
              <Zap size={16} />
            </div>
            <h4 className="text-xs font-bold text-slate-200">Partagez vos connaissances</h4>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Aidez la communauté en posant des questions et en y répondant !
          </p>
          <button 
            onClick={VerificationToken}
            className="w-full bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-400 hover:to-purple-500 text-white text-xs font-bold py-2.5 rounded-xl transition-all active:scale-95 shadow-lg shadow-orange-500/10"
          >
            + Poser une question
          </button>
        </div>
      </aside>

      {/* 2. CONTENU PRINCIPAL */}
      <main className="flex-1 overflow-y-auto px-6 md:px-10 py-8 space-y-8 max-w-6xl">
        
        {/* BANNIÈRE GÉANTE (HERO) */}
        <section className="relative w-full rounded-3xl bg-[#111625] border border-slate-900 p-8 md:p-10 flex items-center justify-between overflow-hidden shadow-2xl">
          {/* Formes lumineuses décoratives en arrière-plan (côté droit) */}
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-30 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-orange-500/5 to-transparent"></div>
          
          <div className="space-y-4 relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              Communauté active
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
              Toutes les <span className="text-orange-500">questions</span>
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              Rejoignez la discussion, trouvez des réponses et partagez votre expertise avec les développeurs du monde entier.
            </p>
            <button
              onClick={VerificationToken}
              className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-400 hover:to-purple-500 text-white text-sm font-bold px-6 py-3.5 rounded-xl shadow-xl shadow-orange-500/10 active:scale-95 transition-all flex items-center gap-2"
            >
              <span className="text-lg leading-none">+</span> Poser une question
            </button>
          </div>

          {/* Graphismes flottants à droite de la bannière (Optionnels) */}
          <div className="hidden md:flex items-center gap-4 relative z-10 opacity-80 scale-110 mr-4">
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-sm rotate-[-12deg] shadow-lg">&lt;/&gt;</div>
            <div className="w-14 h-14 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-black text-lg rotate-[15deg] shadow-lg">?</div>
          </div>
        </section>

        {/* BARRE DE FILTRES & COMPTEUR */}
        <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-900 pb-3 gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {["Récents", "Sans réponse", "Populaires", "Avec réponse"].map((tab, idx) => (
              <button
                key={tab}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                  idx === 0
                    ? "bg-slate-900 text-orange-500 border-b-2 border-orange-500 rounded-b-none"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="text-xs text-slate-500 font-medium self-end sm:self-center px-2">
            128 questions
          </div>
        </section>

        {/* FLUX DES QUESTIONS */}
        <section>
          <Questions />
        </section>

      </main>
    </div>
  );
};

export default Accueil;