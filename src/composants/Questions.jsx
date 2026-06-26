import React, { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";

const Questions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/questions")
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="w-full">
      {/* Mini-Statistiques du Flux */}
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Flux en direct
          </span>
        </div>
        <div className="bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded-full text-xs">
          {questions.length} {questions.length > 1 ? "questions" : "question"}
        </div>
      </div>

      {/* Liste des Questions */}
      {questions.length === 0 ? (
        /* État Vide (Empty State) Premium */
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm">
          <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            📭
          </div>
          <h3 className="text-base font-bold text-slate-800">
            Aucune question pour le moment
          </h3>
          <p className="text-slate-400 text-sm mt-1 max-w-xs mx-auto">
            Soyez la première personne de la communauté à lancer la discussion !
          </p>
        </div>
      ) : (
        /* Conteneur de Liste Fluide */
        <div className="space-y-4">
          {questions.map((question) => (
            <div
              key={question._id || question.id}
              className="bg-white rounded-2xl border border-slate-100/80 p-1 shadow-sm hover:shadow-md hover:border-orange-500/10 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <QuestionCard question={question} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Questions;