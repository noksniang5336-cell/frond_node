import React from "react";
import { Link } from "react-router-dom";
import { ChevronUp, ChevronDown, MessageSquare, Eye } from "lucide-react";

const QuestionCard = ({ question }) => {
  console.log("Données reçues dans QuestionCard :", question);

  // Valeurs par défaut au cas où certaines propriétés manquent dans la bdd
  const votes = question.votes ?? 0;
  const reponses = question.reponses ?? 0;
  const vues = question.vues ?? 0;
  const tags = question.tags ?? [];
  const auteur = question.auteur ?? "Utilisateur anonyme";
  const date = question.date ?? "Il y a quelques heures";

  return (
    <div className="w-full bg-[#111625]/40 hover:bg-[#111625]/80 border border-transparent hover:border-slate-800/60 rounded-2xl p-5 transition-all duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 group">
      
      {/* 1. COMPTEURS GAUCHE (Votes & Réponses/Vues) */}
      <div className="flex items-center gap-6 shrink-0 w-full md:w-auto border-b border-slate-900/60 md:border-0 pb-4 md:pb-0">
        
        {/* Système de Vote Vertical */}
        <div className="flex flex-col items-center bg-[#090d16]/60 rounded-xl p-1.5 min-w-[40px]">
          <button className="text-slate-500 hover:text-orange-500 transition-colors p-0.5">
            <ChevronUp size={18} strokeWidth={3} />
          </button>
          <span className="text-sm font-black text-slate-200 my-0.5">{votes}</span>
          <button className="text-slate-500 hover:text-orange-500 transition-colors p-0.5">
            <ChevronDown size={18} strokeWidth={3} />
          </button>
        </div>

        {/* Réponses & Vues style Stack Overflow */}
        <div className="flex items-center gap-4 text-xs">
          {/* Bloc Réponses */}
          <div className={`flex flex-col items-center justify-center min-w-[65px] py-1.5 px-2 rounded-xl border ${
            reponses > 0 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
              : 'border-slate-800 text-slate-500'
          }`}>
            <span className="text-sm font-bold">{reponses}</span>
            <span className="text-[10px] font-medium opacity-80">réponses</span>
          </div>

          {/* Bloc Vues */}
          <div className="flex flex-col items-center text-slate-500 min-w-[45px]">
            <span className="text-sm font-bold text-slate-400">{vues}</span>
            <span className="text-[10px] font-medium opacity-80">vues</span>
          </div>
        </div>

      </div>

      {/* 2. BLOC CENTRAL (Titre, Description, Tags) */}
      <div className="flex-1 space-y-2.5 w-full">
        <Link 
          to={`/question/${question._id}`}
          className="block text-base md:text-lg font-bold text-slate-100 hover:text-orange-500 transition-colors duration-200 leading-snug"
        >
          {question.titre}
        </Link>
        
        <p className="text-xs md:text-sm text-slate-400 line-clamp-2 leading-relaxed font-medium">
          {question.description}
        </p>

        {/* Tags stylisés */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((tag, idx) => (
              <span 
                key={idx}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border text-xs transition-colors duration-150 cursor-pointer ${
                  tag.toLowerCase() === 'react' || tag.toLowerCase() === 'javascript'
                    ? 'bg-orange-500/5 border-orange-500/20 text-orange-400 hover:bg-orange-500/10'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 3. BLOC METADONNÉES AUTEUR (À droite) */}
      <div className="flex items-center gap-3 shrink-0 self-end md:self-center border-t border-slate-900/40 md:border-t-0 pt-3 md:pt-0 w-full md:w-auto justify-end">
        <div className="flex flex-col items-end text-right">
          <span className="text-xs font-bold text-slate-200 hover:text-orange-500 cursor-pointer transition-colors">
            {auteur}
          </span>
          <span className="text-[10px] text-slate-500 font-medium">
            {date}
          </span>
        </div>
        
        {/* Avatar Rond Pro */}
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/60 flex items-center justify-center text-slate-200 font-bold text-xs uppercase shadow-inner shadow-black/40">
          {auteur.substring(0, 2)}
        </div>
      </div>

    </div>
  );
};

export default QuestionCard;