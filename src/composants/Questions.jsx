import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
const URL_FRONT = import.meta.env.VITE_URL_FRONT;

const Questions = () => {

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);


  // Charger les questions depuis le backend
 useEffect(() => {

  const fetchQuestions = async () => {

    try {

      const response = await fetch(
      `${URL_FRONT}/api/questions`
      );

      const data = await response.json();
      console.log("Questions reçues :", data);

      if(Array.isArray(data)){

        setQuestions(data);

      }
      else if(Array.isArray(data.questions)){

        setQuestions(data.questions);

      }
      else if(Array.isArray(data.data)){

        setQuestions(data.data);

      }
      else{

        setQuestions([]);

      }



    } catch(error){

      console.error(
        "Erreur chargement questions :",
        error
      );


    } finally {

      setLoading(false);

    }

  };


  fetchQuestions();


}, []);



  // Supprimer une question de l'affichage après suppression
  const handleQuestionDeleted = (idSupprime) => {

    setQuestions((ancienneListe) =>
      ancienneListe.filter(
        (question) =>
          question._id !== idSupprime
      )
    );

  };



  if (loading) {

    return (
      <div className="text-center py-10 text-slate-400">
        Chargement des questions...
      </div>
    );

  }



  return (

    <div className="space-y-5">


      {/* Header compteur */}

      <div className="flex justify-between items-center">

        <div className="flex items-center gap-2 text-xs text-emerald-400">

          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>

          FLUX EN DIRECT

        </div>


        <span className="text-xs text-slate-400">

          {questions.length} question
          {questions.length > 1 ? "s" : ""}

        </span>


      </div>



      {/* Affichage des questions */}

      {

        questions.length === 0 ?


        (

          <div className="
            text-center
            py-12
            border
            border-dashed
            border-slate-800
            rounded-xl
            text-slate-500
          ">

            Aucune question pour le moment.

          </div>


        )


        :


        (

          questions.map((item)=>(


            <QuestionCard

              key={item._id}

              question={item}

              onDelete={handleQuestionDeleted}

            />


          ))

        )

      }


    </div>

  );

};


export default Questions;