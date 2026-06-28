import React from "react";
import { useNavigate } from "react-router-dom";
import { Compass, MessageSquare, Bookmark, Hash, Users, Zap } from "lucide-react";
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
    <div className="min-h-[92vh] bg-[#090d16] text-slate-300 flex justify-center antialiased">
      
      {/* Conteneur principal qui limite la largeur pour éviter l'effet étiré sur grand écran */}
      <div className="w-full max-w-7xl flex px-4 md:px-8 py-6 gap-8">
        
        {/* 1. SIDEBAR GAUCHE - Propre et fixe */}
        <aside className="w-64 hidden lg:flex flex-col gap-6 shrink-0">
          
          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold bg-orange-500/10 text-orange-500 text-left">
              <Compass size={16} /> Toutes les questions
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 transition-all text-left">
              <MessageSquare size={16} /> Mes questions
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 transition-all text-left">
              <Bookmark size={16} /> Questions suivies
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 transition-all text-left">
              <Hash size={16} /> Étiquettes populaires
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 transition-all text-left">
              <Users size={16} /> Utilisateurs
            </button>
          </div>

          {/* Section Étiquettes */}
          <div className="space-y-3 pt-4 border-t border-slate-900/60">
            <h3 className="text-[10px] font-bold text-slate-500 tracking-wider uppercase px-2">
              Étiquettes populaires
            </h3>
            <div className="flex flex-wrap gap-1.5 px-1">
              {["JavaScript", "réagir", "MongoDB", "Node.js", "PHP", "Laravel"].map((tag) => (
                <span key={tag} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-900 bg-slate-950/40 text-slate-400 hover:text-white transition-all cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* 2. ZONE DE CONTENU - Centrée et élargie */}
        <main className="flex-1 space-y-6">
          
          {/* BANNIÈRE HERO SIMPLIFIÉE */}
          <section className="w-full rounded-2xl bg-gradient-to-br from-[#121826] to-[#161d2f] border border-slate-900 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 max-w-lg">
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Toutes les <span className="text-orange-500">questions</span>
              </h1>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-medium">
                Rejoignez la discussion, trouvez des réponses et partagez votre expertise avec les développeurs.
              </p>
            </div>
            
            <button
              onClick={VerificationToken}
              className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-400 hover:to-purple-500 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-lg shadow-orange-500/10 active:scale-95 transition-all shrink-0 h-fit"
            >
              + Poser une question
            </button>
          </section>

          {/* BARRE DES FILTRES ÉPURÉE */}
          <section className="flex items-center justify-between border-b border-slate-900 pb-2">
            <div className="flex gap-1">
              {["Récents", "Sans réponse", "Populaires", "Avec réponse"].map((tab, idx) => (
                <button
                  key={tab}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    idx === 0
                      ? "text-orange-500 bg-orange-500/5"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="text-[11px] text-slate-500 font-semibold px-2">
              128 questions
            </div>
          </section>

          {/* LISTE DES QUESTIONS */}
          <section className="pt-2">
            <Questions />
          </section>

        </main>

      </div>
    </div>
  );
};

export default Accueil;