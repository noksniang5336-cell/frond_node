import React, { useState } from 'react'
import { Send, Tag, FileText, HelpCircle } from "lucide-react"
import { useNavigate } from 'react-router-dom';
const URL_FRONT = import.meta.env.VITE_URL_FRONT;

const QuestionForm = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [question, setQuestion] = useState({
    titre: "",
    description: "",
    tags: ""
  })

  const handleChange = (e) => {
    setQuestion({
      ...question,
      [e.target.name]: e.target.value
    })
  }

const handleSubmit = async (e) => {
  e.preventDefault();


  const user = JSON.parse(localStorage.getItem("user"));

  const data = {
    titre: question.titre,
    description: question.description,
    tags: question.tags
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag !== ""),
    auteur: user._id
  };


  console.log("Envoi :", data);


  try {

    const response = await fetch(
       `${URL_FRONT}/api/questions`,
      {
        method: "POST",
        headers: {
           "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      }
    );


    const result = await response.json();

    console.log("Backend :", result);


    setQuestion({
      titre: "",
      description: "",
      tags: ""
    });
  alert('question créer')
  navigate('/');

  } catch(error){

    console.log("Erreur :", error);

  }
}

  return (
    <div className="min-h-[92vh] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-50/40 via-slate-50 to-slate-100/70 flex items-center justify-center p-4 md:p-8 text-slate-800 antialiased">
      
      {/* Conteneur effet "Verre" Premium */}
      <div className="bg-white/80 w-full max-w-2xl rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-10 border border-white/80 backdrop-blur-xl">

        {/* En-tête du formulaire */}
        <div className="mb-8 flex items-center gap-4">
          <div className="bg-gradient-to-br from-orange-500 to-amber-500 text-white p-3 rounded-2xl shadow-md shadow-orange-500/20 shrink-0">
            <HelpCircle size={28} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
              Poser une <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">question</span>
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-0.5">
              Formulez votre problème clairement pour obtenir de l'aide rapidement.
            </p>
          </div>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Champ Titre */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 tracking-wide">
              <FileText size={16} className="text-slate-400" />
              Titre de la question
            </label>
            <input
              type="text"
              name="titre"
              value={question.titre}
              onChange={handleChange}
              placeholder="Ex: Comment propager un événement dans un Portal React ?"
              className="w-full bg-white/60 border border-slate-200 focus:border-orange-500/50 rounded-xl p-4 text-sm outline-none focus:ring-4 focus:ring-orange-500/10 transition-all duration-200 placeholder-slate-400 font-medium shadow-inner"
            />
          </div>

          {/* Champ Description */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 tracking-wide block">
              Description détaillée
            </label>
            <textarea
              name="description"
              value={question.description}
              onChange={handleChange}
              placeholder="Introduisez votre contexte, collez vos erreurs et ce que vous avez déjà tenté..."
              rows="6"
              className="w-full bg-white/60 border border-slate-200 focus:border-orange-500/50 rounded-xl p-4 text-sm resize-none outline-none focus:ring-4 focus:ring-orange-500/10 transition-all duration-200 placeholder-slate-400 font-medium shadow-inner leading-relaxed"
            />
          </div>

          {/* Champ Tags */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 tracking-wide">
              <Tag size={16} className="text-slate-400" />
              Tags associés
            </label>
            <input
              type="text"
              name="tags"
              value={question.tags}
              onChange={handleChange}
              placeholder="Ex: react, javascript, routing"
              className="w-full bg-white/60 border border-slate-200 focus:border-orange-500/50 rounded-xl p-4 text-sm outline-none focus:ring-4 focus:ring-orange-500/10 transition-all duration-200 placeholder-slate-400 font-medium shadow-inner"
            />
            <p className="text-xs text-slate-400 font-medium pl-1">
              Séparez vos mots-clés par une virgule (ex: <span className="text-orange-600/70">react, node</span>)
            </p>
          </div>

          {/* Bouton de Soumission */}
          <button
            type="submit"
            className="w-full relative group overflow-hidden bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all duration-300 border border-orange-500/10 tracking-wide"
          >
            {/* Effet lumineux linéaire */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            
            <Send size={16} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            Publier la question
          </button>
          
        </form>

      </div>
    </div>
  )
}

export default QuestionForm;