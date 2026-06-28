import React, { useEffect, useState } from "react";

// Exemple : Supposons que l'ID vienne d'un vrai contexte plus tard
const userId = "12345"; 

const Profil = () => {
  const [profil, setProfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const getProfil = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Récupérer l'utilisateur stocké (ajustez la clé 'user' selon votre projet)
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const userId = storedUser?.id || storedUser?._id; 

        if (!userId) {
          throw new Error("Aucun utilisateur connecté trouvé.");
        }

        // 2. Faire l'appel avec le VRAI ID
        const response = await fetch(`http://localhost:3000/api/users/profil/${userId}`, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`Erreur serveur : ${response.status}`);
        }

        const data = await response.json();
        setProfil(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Erreur lors de la récupération du profil:", err);
          setError("Impossible de charger le profil. Veuillez réessayer.");
        }
      } finally {
        setLoading(false);
      }
    };

    getProfil();

    // Fonction de nettoyage (cleanup)
    return () => controller.abort();
  }, []);

  // 1. Gestion du chargement
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-xl font-semibold text-gray-600 animate-pulse">
          Chargement du profil...
        </h1>
      </div>
    );
  }

  // 2. Gestion de l'erreur
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-xl shadow-md text-center max-w-sm">
          <p className="text-red-500 font-medium mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  // 3. Sécurité au cas où les données de l'utilisateur sont manquantes
  if (!profil || !profil.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Aucune donnée trouvée pour ce profil.</p>
      </div>
    );
  }

  // 4. Rendu de l'interface (Inchangé mais sécurisé)
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center">
          {/* Initial du nom avec fallback au cas où le nom est vide */}
          <div className="w-28 h-28 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold uppercase">
            {profil.user.nom ? profil.user.nom.charAt(0) : "?"}
          </div>

          <h1 className="text-2xl font-bold mt-4">
            {profil.user.nom}
          </h1>

          <p className="text-gray-500">
            {profil.user.email}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-blue-100 p-4 rounded-xl text-center">
            <h2 className="text-3xl font-bold text-blue-600">
              {profil.questions || 0}
            </h2>
            <p className="text-gray-700 text-sm font-medium">Questions</p>
          </div>

          <div className="bg-green-100 p-4 rounded-xl text-center">
            <h2 className="text-3xl font-bold text-green-600">
              {profil.reponses || 0}
            </h2>
            <p className="text-gray-700 text-sm font-medium">Réponses</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;