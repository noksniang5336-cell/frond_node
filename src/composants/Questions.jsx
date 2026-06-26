import React from "react";
import QuestionCard from "./QuestionCard";

const Questions = () => {
  const questions = [
    
  ];

  

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] text-slate-700 px-4 py-12 sm:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* En-tête épuré */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 pb-6 border-b border-slate-200/80">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
              Toutes les questions
            </h1>
            <p className="text-xs font-medium text-slate-400 mt-1">
              {questions.length} {questions.length > 1 ? 'discussions actives' : 'discussion active'}
            </p>
          </div>
          
          <button className="self-start sm:self-center bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all duration-200 active:scale-98">
            Poser une question
          </button>
        </div>

        {/* Liste des questions */}
        {questions.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/60 text-slate-400 text-sm shadow-sm">
            Aucune question pour le moment.
          </div>
        ) : (
          <div className="space-y-3.5">
            {questions.map((question) => {
              // Injection de l'id simulé sous la clé _id attendue par QuestionCard
              const questionFormatee = {
                ...question,
                _id: question.id
              };

              return (
                <div 
                  key={question.id} 
                  className="bg-white rounded-2xl border border-slate-200/60 p-1 shadow-[0_2px_8px_-3px_rgba(0,0,0,0,05)] hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.08)] hover:border-slate-300/80 transition-all duration-300"
                >
                  <QuestionCard question={questionFormatee} />
                </div>
              );
            })}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Questions;