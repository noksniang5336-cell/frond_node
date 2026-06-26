import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MessageSquare, Trash2, Edit3, Check, X, Send, ArrowLeft, Clock } from "lucide-react";

const Detail = () => {
  const { id: questionId } = useParams();
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [reponse, setReponse] = useState("");
  const [reponses, setReponses] = useState([]);
  const [error, setError] = useState(null);

  // Modification
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const chargerReponses = async () => {
      try {
        if (!questionId || questionId === "undefined") return;

        const res = await fetch(`http://localhost:3000/api/reponses/${questionId}`);
        const data = await res.json();
        const liste = Array.isArray(data) ? data : data.reponses || data.data || [];

        setReponses(liste);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };

    chargerReponses();
  }, [questionId]);

  // AJOUTER
  const ajouterReponse = async () => {
    if (!reponse.trim()) return;

    const res = await fetch("http://localhost:3000/api/reponses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contenu: reponse,
        questionId,
      }),
    });

    const data = await res.json();
    setReponses([...reponses, data]);
    setReponse("");
    setShowForm(false);
  };

  // SUPPRIMER
  const supprimerReponse = async (id) => {
    await fetch(`http://localhost:3000/api/reponses/${id}`, {
      method: "DELETE",
    });
    setReponses(reponses.filter((rep) => rep._id !== id));
  };

  // OUVRIR MODIFICATION
  const modifierReponse = (rep) => {
    setEditId(rep._id);
    setEditText(rep.contenu);
  };

  // ENREGISTRER MODIFICATION
  const enregistrerModification = async () => {
    const res = await fetch(`http://localhost:3000/api/reponses/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contenu: editText,
      }),
    });

    const data = await res.json();
    setReponses(reponses.map((rep) => (rep._id === editId ? data : rep)));
    setEditId(null);
    setEditText("");
  };

  return (
    <div className="min-h-[92vh] bg-[#090d16] text-slate-300 antialiased font-sans px-4 md:px-12 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* BOUTON RETOUR */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-orange-500 transition-colors uppercase tracking-wider mb-2"
        >
          <ArrowLeft size={14} /> Retour aux questions
        </button>

        {/* CONTAINER DE LA QUESTION */}
        <div className="bg-[#111625]/40 border border-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wide mb-4">
            📌 Question
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white tracking-tight leading-snug">
            Question détaillée # {questionId?.substring(0, 6)}
          </h1>
          <p className="text-sm text-slate-400 mt-3 leading-relaxed font-medium">
            {/* Si vous récupérez un jour l'objet question entier, placez question.description ici */}
            Consultez les contributions et les solutions apportées par la communauté ci-dessous.
          </p>
        </div>

        {/* COMPTEUR ET BOUTON RÉPONDRE */}
        <div className="flex items-center justify-between border-b border-slate-900 pb-4 pt-4 px-2">
          <div className="flex items-center gap-2.5">
            <MessageSquare size={18} className="text-orange-500" />
            <h2 className="text-base md:text-lg font-bold text-white tracking-tight">
              Réponses <span className="text-slate-500 font-medium text-sm ml-1">({reponses.length})</span>
            </h2>
          </div>
          
          <button
            onClick={() => setShowForm(!showForm)}
            className={`text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-lg active:scale-95 ${
              showForm 
                ? "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white" 
                : "bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-400 hover:to-purple-500 text-white shadow-orange-500/10"
            }`}
          >
            {showForm ? "Annuler" : "+ Ajouter une réponse"}
          </button>
        </div>

        {/* ZONE ZONE DE TEXTE D'AJOUT DE RÉPONSE */}
        {showForm && (
          <div className="bg-[#111625]/60 border border-slate-900/80 rounded-2xl p-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <textarea
              value={reponse}
              onChange={(e) => setReponse(e.target.value)}
              className="w-full bg-[#090d16]/80 text-slate-200 placeholder-slate-600 border border-slate-900 focus:border-orange-500/30 rounded-xl p-4 text-sm outline-none focus:ring-4 focus:ring-orange-500/5 transition-all shadow-inner resize-none leading-relaxed"
              placeholder="Rédigez votre réponse de manière claire, ajoutez des exemples de code si nécessaire..."
              rows="4"
            />
            <div className="flex justify-end">
              <button
                onClick={ajouterReponse}
                className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-400 hover:to-purple-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md shadow-orange-500/5 active:scale-95"
              >
                <Send size={12} /> Envoyer la réponse
              </button>
            </div>
          </div>
        )}

        {/* LISTE DES RÉPONSES */}
        <div className="space-y-4">
          {reponses.map((rep) => (
            <div
              key={rep._id}
              className="group bg-[#111625]/30 border border-slate-900/60 rounded-2xl p-5 transition-all duration-200 flex flex-col gap-4"
            >
              {editId === rep._id ? (
                /* ÉDITION EN LIGNE INTÉGRÉE */
                <div className="space-y-3 w-full animate-in fade-in duration-150">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full bg-[#090d16]/80 text-slate-200 border border-orange-500/30 rounded-xl p-4 text-sm outline-none focus:ring-4 focus:ring-orange-500/5 shadow-inner resize-none leading-relaxed"
                    rows="3"
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setEditId(null)}
                      className="bg-slate-900 text-slate-400 hover:text-white px-3 py-2 border border-slate-800 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      <X size={12} /> Annuler
                    </button>
                    <button
                      onClick={enregistrerModification}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-950/20"
                    >
                      <Check size={12} /> Enregistrer
                    </button>
                  </div>
                </div>
              ) : (
                /* RENDU NORMAL DU MESSAGE */
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    {/* Contenu textuel */}
                    <p className="text-sm md:text-base text-slate-300 font-medium whitespace-pre-line leading-relaxed">
                      {rep.contenu}
                    </p>
                    
                    {/* Méta-infos bidons pour le style */}
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold">
                      <div className="h-4 w-4 bg-slate-800 rounded-full flex items-center justify-center text-[8px] text-slate-400">R</div>
                      <span>Répondant Anonyme</span>
                      <span className="text-slate-700">•</span>
                      <span className="flex items-center gap-1"><Clock size={10}/> À l'instant</span>
                    </div>
                  </div>

                  {/* Actions (Modifier / Supprimer) stylisées avec icônes de la capture */}
                  <div className="flex items-center gap-1 bg-[#090d16]/60 border border-slate-900 rounded-xl p-1 opacity-40 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
                    <button
                      onClick={() => modifierReponse(rep)}
                      className="p-2 text-slate-400 hover:text-orange-400 hover:bg-slate-900 rounded-lg transition-all"
                      title="Modifier"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => supprimerReponse(rep._id)}
                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-900 rounded-lg transition-all"
                      title="Supprimer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {reponses.length === 0 && (
            <div className="text-center py-10 bg-[#111625]/20 border border-dashed border-slate-900 rounded-2xl">
              <p className="text-sm text-slate-500 font-medium">Aucune réponse n'a été soumise pour le moment.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Detail;