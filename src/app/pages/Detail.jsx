import React from "react";
import { useParams } from "react-router-dom";

const questions = [
  {
    id: 1,
    titre: "Comment utiliser useEffect dans React pour récupérer des données ?",
    description:
      "Je débute avec React et je souhaite récupérer des données depuis une API avec useEffect.",
    heure: "09:15",
    auteur: "Aminata Ndiaye",
  },
  {
    id: 2,
    titre: "Pourquoi mon serveur Express retourne une erreur 404 ?",
    description:
      "J'ai créé une route GET /users mais lorsque je fais une requête depuis Postman, je reçois une erreur 404.",
    heure: "10:30",
    auteur: "Mamadou Diallo",
  },
  {
    id: 3,
    titre: "Comment connecter Spring Boot à une base de données MySQL ?",
    description:
      "Mon application Spring Boot ne parvient pas à se connecter à MySQL.",
    heure: "11:45",
    auteur: "Fatou Sow",
  },
];


const Detail = () => {

  const { id } = useParams();

  const question = questions.find(
    (q) => q.id === Number(id)
  );


  if (!question) {
    return <h1>Question introuvable</h1>;
  }


  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">

        <h1 className="text-3xl font-bold mb-4">
          {question.titre}
        </h1>

        <p className="text-gray-600 mb-6">
          {question.description}
        </p>


        <div className="flex justify-between text-sm text-gray-500">

          <span>
            👤 {question.auteur}
          </span>

          <span>
            ⏰ {question.heure}
          </span>

        </div>


        <div className="mt-8 border-t pt-5">

          <h2 className="text-xl font-semibold">
            Réponses
          </h2>

          <p className="text-gray-500 mt-3">
            Aucune réponse pour le moment...
          </p>

        </div>


      </div>

    </div>
  );
};


export default Detail;