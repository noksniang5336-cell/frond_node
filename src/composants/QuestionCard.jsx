import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronUp, ChevronDown } from "lucide-react";

const QuestionCard = ({ question }) => {
  const navigate = useNavigate();
  const [votes, setVotes] = useState(question.votes ?? 0);

  const handleVote = (e, info) => {
    e.stopPropagation(); // Empêche d'ouvrir la question au clic sur le vote
    setVotes(votes + info);
  };

  return (
    <div 
      onClick={() => navigate(`/question/${question._id}`)}
      className="w-full bg-[#111625]/60 hover:bg-[#111625] border border-slate-900 rounded-xl p-4 flex items-center justify-between gap-4 cursor-pointer transition-colors"
    >
      {/* GAUCHE : VOTE & STATS */}
      <div className="flex items-center gap-4 shrink-0">
        {/* Boite des votes */}
        <div className="flex flex-col items-center bg-[#090d16] rounded-lg p-1 min-w-[35px]">
          <button onClick={(e) => handleVote(e, 1)} className="text-slate-500 hover:text-orange-500">
            <ChevronUp size={16} />
          </button>
          <span className="text-xs font-bold text-slate-300">{votes}</span>
          <button onClick={(e) => handleVote(e, -1)} className="text-slate-500 hover:text-purple-500">
            <ChevronDown size={16} />
          </button>
        </div>

        {/* Compteur Réponses */}
        <div className={`text-center px-2 py-1.5 rounded-lg min-w-[60px] ${
          question.reponses > 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-900 text-slate-500"
        }`}>
          <div className="text-xs font-bold">{question.reponses ?? 0}</div>
          <div className="text-[9px] uppercase tracking-wide">réponses</div>
        </div>
      </div>

      {/* CENTRE : TEXTES & TAGS */}
      <div className="flex-1 min-w-0 space-y-1">
        <h2 className="text-sm font-bold text-slate-200 hover:text-orange-400 transition-colors truncate">
          {question.titre}
        </h2>
        <p className="text-xs text-slate-400 line-clamp-1">
          {question.description}
        </p>
        
        {/* Tags simples */}
        {question.tags && (
          <div className="flex gap-1.5 pt-1">
            {question.tags.map((tag, i) => (
              <span key={i} className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded-md border border-slate-800">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* DROITE : AUTEUR */}
      <div className="text-right shrink-0 text-[11px] text-slate-500 hidden sm:block">
        <div className="font-semibold text-slate-300">{question.auteur ?? "Anonyme"}</div>
        <div>il y a 2h</div>
      </div>

    </div>
  );
};

export default QuestionCard;