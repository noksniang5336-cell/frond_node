import React from "react";
import { useNavigate } from "react-router-dom";
import Questions from "./../../composants/Questions";

const Accueil = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <div className="min-h-[92vh] bg-[#090d16] text-slate-300 flex justify-center p-4 md:p-8 font-sans">
      {/* Conteneur principal bridé en largeur pour éviter l'effet étiré */}
      <div className="w-full max-w-5xl space-y-6">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold bg-orange-500/10 text-orange-500 text-left">
              <Compass size={16} /> Toutes les questions
            </button>
        
        {/* EN-TÊTE DE PAGE SIMPLE */}
        <div className="flex items-center justify-between border-b border-slate-900 pb-5">
          <div>
            <h1 className="text-2xl font-bold text-white">Toutes les questions</h1>
            <p className="text-xs text-slate-500 mt-1">Rejoignez la discussion et trouvez des réponses.</p>
          </div>
          <button
            onClick={() => navigate(token ? "/ajouter_question" : "/connexion")}
            className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-all"
          >
            Poser une question
          </button>
        </div>

        

        {/* FLUX DE QUESTIONS */}
        <main>
          <Questions />
        </main>
        
      </div>
    </div>
  );
};

export default Accueil;