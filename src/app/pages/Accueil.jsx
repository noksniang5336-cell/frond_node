import React from "react";
import { useNavigate } from "react-router-dom";
import { Compass } from "lucide-react"; // 👈 L'importation manquante est ici !
import Questions from "./../../composants/Questions";

const Accueil = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <div className="min-h-[92vh] bg-[#090d16] text-slate-300 flex justify-center p-4 md:p-8 font-sans">
      
      {/* Conteneur principal bridé en largeur pour éviter l'effet étiré */}
      <div className="w-full max-w-5xl space-y-6">
        
        {/* EN-TÊTE DE PAGE SIMPLE */}
        <div className="flex items-center justify-between border-b border-slate-900 pb-5">
          <div className="space-y-1">
            {/* Petit badge indicatif avec l'icône Boussole */}
            <div className="flex items-center gap-2 text-orange-500 font-semibold text-xs bg-orange-500/5 px-2.5 py-1 rounded-md w-fit">
              <Compass size={14} />
              <span>Fil d'actualité</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Toutes les questions</h1>
            <p className="text-xs text-slate-500">Rejoignez la discussion et trouvez des réponses.</p>
          </div>
          
          <button
            onClick={() => navigate(token ? "/ajouter_question" : "/connexion")}
            className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-all shadow-md shadow-orange-500/10 active:scale-95"
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