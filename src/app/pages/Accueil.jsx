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
    <div className="min-h-[92vh] bg-slate-950 text-slate-100 selection:bg-orange-500/30">
      
      {/* SECTION EN-TÊTE DE LA PAGE */}
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 pt-10 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-200">
            Toutes les <span className="text-orange-500">Questions</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Explorez les interrogations de la communauté ou partagez vos connaissances.
          </p>
        </div>

        {/* Bouton d'action "Ajouter une question" super stylisé */}
        <button
          onClick={VerificationToken}
          className="self-start sm:self-center bg-orange-600 hover:bg-orange-500 text-white text-xs md:text-sm font-bold px-5 py-3 rounded-xl shadow-lg shadow-orange-950/40 hover:shadow-orange-500/20 active:scale-95 transition-all duration-250 border border-orange-500/30 flex items-center gap-2 tracking-wide group"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 transform group-hover:rotate-90 transition-transform duration-200" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Poser une question
        </button>
      </div>

      {/* SÉPARATEUR VISUEL SUBTIL */}
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12">
        <div className="h-[1px] w-full bg-slate-900"></div>
      </div>

      {/* ZONE PRINCIPALE (CONTENU DES QUESTIONS) */}
      <main className="w-full max-w-6xl mx-auto px-4 md:px-10 py-6">
        {/* Vos cartes de questions hériteront de ce magnifique cadre immersif */}
        <div className="bg-slate-900/40 rounded-2xl border border-slate-900/60 p-2 md:p-6 backdrop-blur-sm">
          <Questions />
        </div>
      </main>

    </div>
  );
};

export default Accueil;