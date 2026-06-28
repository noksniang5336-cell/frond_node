import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; 

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

        // 1. Récupération du token depuis le localStorage
        const token = localStorage.getItem("token"); 

        if (!token) {
          throw new Error("Aucun utilisateur connecté trouvé.");
        }

        // 2. Décodage du token pour extraire l'ID de l'utilisateur
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id || decodedToken._id || decodedToken.userId; 

        if (!userId) {
          throw new Error("Impossible de récupérer l'ID depuis le token.");
        }

        // 3. Appel à l'API Backend sur le port 3000
        const response = await fetch(`http://localhost:3000/api/auth/profil/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
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
          setError(err.message || "Impossible de charger le profil.");
        }
      } finally {
        setLoading(false);
      }
    };

    getProfil();

    // Nettoyage si le composant est démonté avant la fin de la requête
    return () => controller.abort();
  }, []);

  // Écran de chargement
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-xl font-semibold text-gray-600 animate-pulse">
          Chargement du profil...
        </h1>
      </div>
    );
  }

  // Écran d'erreur (Si le serveur sur le port 3000 ne répond pas)
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

  if (!profil || !profil.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Aucune donnée trouvée pour ce profil.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold uppercase shadow-inner">
            {profil.user.nom ? profil.user.nom.charAt(0) : "?"}
          </div>

          <h1 className="text-2xl font-bold mt-4 text-gray-800">
            {profil.user.nom}
          </h1>

          <p className="text-gray-500">
            {profil.user.email}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100">
            <h2 className="text-3xl font-bold text-blue-600">
              {profil.questions || 0}
            </h2>
            <p className="text-gray-600 text-sm font-medium mt-1">Questions</p>
          </div>

          <div className="bg-green-50 p-4 rounded-xl text-center border border-green-100">
            <h2 className="text-3xl font-bold text-green-600">
              {profil.reponses || 0}
            </h2>
            <p className="text-gray-600 text-sm font-medium mt-1">Réponses</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;