import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const questionId = id;

  const [showForm, setShowForm] = useState(false);
  const [reponse, setReponse] = useState("");
  const [reponses, setReponses] = useState([]);
  const [error, setError] = useState(null); // Pour afficher les erreurs d'API

  // ✅ Charger les réponses depuis MongoDB
  useEffect(() => {
    const chargerReponses = async () => {
      try {
        setError(null);
        const res = await fetch(`http://localhost:3000/api/reponses/${questionId}`);

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || `Erreur serveur: ${res.status}`);
        }

        const data = await res.json();

        // 🔥 Sécurité : on force un tableau quoi qu'il arrive
        const liste = Array.isArray(data)
          ? data
          : data.reponses || data.data || data.result || [];

        setReponses(liste);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
        setError(error.message);
      }
    };

    if (questionId) {
      chargerReponses();
    }
  }, [questionId]);

  // ✅ Ajouter une réponse vers MongoDB
  const ajouterReponse = async () => {
    if (!reponse.trim()) return;

    try {
      setError(null);
      const res = await fetch("http://localhost:3000/api/reponses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contenu: reponse.trim(),
          question: questionId,
        }),
      });

      // Si le serveur répond avec une erreur (ex: 400 Bad Request)
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || `Erreur serveur: ${res.status}`);
      }

      const data = await res.json();

      // 🔥 Ajout safe dans le state de la nouvelle réponse créée par Mongo
      setReponses((prev) => [...prev, data]);
      setReponse("");
      setShowForm(false);
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="bg-white rounded-xl shadow p-8">
        
        {/* Affichage d'un bandeau d'erreur si l'API échoue */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
            <strong>Attention :</strong> {error}
          </div>
        )}

        {/* Question (statique pour l’instant) */}
        <h1 className="text-3xl font-bold">
          Comment utiliser useEffect dans React pour récupérer des données ?
        </h1>

        <p className="mt-4 text-gray-600">
          Je débute avec React et je souhaite récupérer des données depuis une API avec useEffect.
        </p>

        <div className="mt-6 border-b pb-4">
          👤 Aminata Ndiaye
          <span className="float-right">⏰ 09:15</span>
        </div>

        {/* Réponses */}
        <h2 className="text-xl font-bold mt-6">
          Réponses ({reponses.length})
        </h2>

        {reponses.length === 0 ? (
          <p className="text-gray-500 mt-3">
            Aucune réponse pour le moment...
          </p>
        ) : (
          reponses.map((rep) => (
            <div
              key={rep._id || Math.random().toString()}
              className="bg-gray-100 p-4 rounded mt-3 shadow-sm border-l-4 border-blue-500"
            >
              {rep.contenu}
            </div>
          ))
        )}

        {/* Bouton répondre */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="mt-6 bg-blue-600 hover:bg-blue-700 transition-colors text-white px-5 py-2 rounded-lg"
        >
          {showForm ? "Annuler" : "Répondre"}
        </button>

        {/* Formulaire */}
        {showForm && (
          <div className="mt-5">
            <textarea
              value={reponse}
              onChange={(e) => setReponse(e.target.value)}
              placeholder="Écrire votre réponse..."
              className="w-full border rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={ajouterReponse}
              className="mt-3 bg-green-600 hover:bg-green-700 transition-colors text-white px-5 py-2 rounded-lg"
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