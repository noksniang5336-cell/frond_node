import React from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="min-h-[92vh] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-50/40 via-slate-50 to-slate-100/70 text-slate-800 antialiased selection:bg-orange-500/10">
      
      {/* HEADER DE LA PAGE */}
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 pt-16 pb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-semibold tracking-wide uppercase mb-1">
            ✨ Communauté active
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            Toutes les <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Questions</span>
          </h2>
          <p className="text-sm text-slate-500 font-medium max-w-xl">
            Rejoignez la discussion, trouvez des réponses et partagez votre expertise avec les développeurs du monde entier.
          </p>
        </div>

        {/* Bouton "Poser une question" avec effet de lueur et scale */}
        <button
          onClick={VerificationToken}
          className="self-start sm:self-center relative group overflow-hidden bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white text-sm font-bold px-6 py-3.5 rounded-2xl shadow-xl shadow-orange-500/20 active:scale-95 transition-all duration-300 border border-orange-500/20 flex items-center gap-2.5 tracking-wide"
        >
          {/* Effet brillant au survol */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
          
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 transform group-hover:rotate-180 transition-transform duration-500 ease-out" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Poser une question
        </button>
      </div>

      {/* ZONE PRINCIPALE (LISTE DES QUESTIONS) */}
      <main className="w-full max-w-6xl mx-auto px-4 md:px-12 pb-16">
        {/* Conteneur effet "Verre" (Glassmorphism) haut de gamme */}
        <div className="bg-white/70 rounded-3xl border border-white/80 p-5 md:p-10 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
          <Questions />
        </div>
      </main>

    </div>
  );
};

export default Accueil;