import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard"; // Ajustez le chemin d'accès si nécessaire

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Chargement initial des questions depuis votre API
 useEffect(() => {
  const fetchQuestions = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/questions");
      const data = await response.json();
      
      // OPTION A: Si ton API renvoie { questions: [...] }
      setQuestions(data.questions || []); 
      
      // OPTION B: Si ton API renvoie { data: [...] }
      // setQuestions(data.data || []);

    } catch (error) {
      console.error("Erreur lors du chargement des questions :", error);
    } finally {
      setLoading(false);
    }
  };

  fetchQuestions();
}, []);
  // 2. La fonction magique : met à jour le state local pour faire disparaître la carte
  const handleQuestionDeleted = (idSupprime) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((q) => q._id !== idSupprime)
    );
  };

  if (loading) {
    return <div className="text-center text-xs text-slate-500 py-4">Chargement des questions...</div>;
  }

  return (
    <div className="space-y-3">
      {/* Compteur en direct basé sur la taille du state */}
      <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          FLUX EN DIRECT
        </span>
        <span>
          {questions.length} question{questions.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Rendu conditionnel si aucune question */}
      {questions.length === 0 ? (
        <div className="text-center py-10 text-slate-500 text-sm border border-dashed border-slate-900 rounded-xl">
          Aucune question pour le moment.
        </div>
      ) : (
        // 3. Injection des données et transmission de la prop onDelete
        questions.map((item) => (
          <QuestionCard
            key={item._id}
            question={item}
            onDelete={handleQuestionDeleted} // 👈 Lié directement au bouton Trash2
          />
        ))
      )}
    </div>
  );
};

export default Questions;