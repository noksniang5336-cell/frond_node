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
    <div className="min-h-[92vh] bg-slate-50/50 text-slate-800 antialiased selection:bg-orange-100">
      
      {/* HEADER DE LA PAGE */}
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 pt-12 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Toutes les <span className="text-orange-600">Questions</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Explorez les interrogations de la communauté ou partagez vos connaissances.
          </p>
        </div>

        {/* Bouton "Poser une question" Thème Clair Premium */}
        <button
          onClick={VerificationToken}
          className="self-start sm:self-center bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-lg shadow-orange-600/10 hover:shadow-orange-600/20 active:scale-98 transition-all duration-200 flex items-center gap-2 group border border-orange-700/10"
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

      {/* ZONE PRINCIPALE (LISTE DES QUESTIONS) */}
      <main className="w-full max-w-6xl mx-auto px-4 md:px-12 py-4">
        {/* Un conteneur blanc épuré avec une ombre très douce */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-4 md:p-8 shadow-sm shadow-slate-100 backdrop-blur-md">
          <Questions />
        </div>
      </main>

    </div>
  );
};

export default Accueil;