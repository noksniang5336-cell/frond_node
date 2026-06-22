import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id: questionId } = useParams();

  const [showForm, setShowForm] = useState(false);
  const [reponse, setReponse] = useState("");
  const [reponses, setReponses] = useState([]);
  const [error, setError] = useState(null);

  // ✅ Charger les réponses
  useEffect(() => {
    const chargerReponses = async () => {
      try {
        setError(null);

        // Si l'id est "undefined", inutile de lancer le fetch
        if (!questionId || questionId === "undefined") {
          return;
        }

        const res = await fetch(
          `http://localhost:3000/api/reponses/${questionId}`
        );

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || `Erreur serveur: ${res.status}`);
        }

        const data = await res.json();
        const liste = Array.isArray(data) ? data : data.reponses || data.data || [];

        setReponses(liste);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };

    if (questionId) chargerReponses();
  }, [questionId]);

  // ✅ Ajouter une réponse
  const ajouterReponse = async () => {
    if (!reponse.trim()) return;

    // 🛡️ SÉCURITÉ : Bloque l'envoi si l'ID est invalide
    if (!questionId || questionId === "undefined") {
      setError("Action impossible : L'identifiant de la question est introuvable (undefined).");
      return;
    }

    try {
      setError(null);

      const res = await fetch("http://localhost:3000/api/reponses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contenu: reponse.trim(),
          questionId: questionId,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || `Erreur serveur: ${res.status}`);
      }

      const data = await res.json();

      setReponses((prev) => [...prev, data]);
      setReponse("");
      setShowForm(false);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="bg-white rounded-xl shadow p-8">

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-200">
            {error}
          </div>
        )}

        <h1 className="text-2xl font-bold">Question détaillée</h1>

        {/* Réponses */}
        <h2 className="text-xl font-bold mt-6">
          Réponses ({reponses.length})
        </h2>

        {reponses.length === 0 ? (
          <p className="text-gray-500 mt-2">Aucune réponse</p>
        ) : (
          reponses.map((rep) => (
            <div key={rep._id || Math.random()} className="p-3 bg-gray-100 mt-2 rounded">
              {rep.contenu}
            </div>
          ))
        )}

        {/* Bouton */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
        >
          {showForm ? "Annuler" : "Répondre"}
        </button>

        {/* Formulaire */}
        {showForm && (
          <div className="mt-4">
            <textarea
              value={reponse}
              onChange={(e) => setReponse(e.target.value)}
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Écrire une réponse..."
              rows="4"
            />

            <button
              onClick={ajouterReponse}
              className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
            >
              Envoyer
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Detail;