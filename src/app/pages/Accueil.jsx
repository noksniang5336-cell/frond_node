import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Questions from "./../../composants/Questions";


const Accueil = () => {

  const token = localStorage.getItem("token");
  const navigate = useNavigate();



  const VerificationToken = () => {

    if(token){
      navigate("/ajouter_question");
    }else{
      navigate("/connexion");
    }

  };



  return (


    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-orange-50">


      {/* NAVBAR */}

      <div className="
      w-full 
      flex 
      items-center 
      justify-between
      px-6 
      md:px-12
      py-6
      bg-white
      shadow-sm
      border-b
      border-slate-100
      ">


        <div>


          <h1 className="
          text-2xl
          md:text-3xl
          font-bold
          text-slate-900
          ">

            Question<span className="text-orange-600">Hub</span>

          </h1>


          <p className="text-sm text-slate-400">

            La communauté des questions et réponses

          </p>


        </div>





        <button

        onClick={VerificationToken}

        className="
        bg-orange-600
        hover:bg-orange-500
        text-white
        font-semibold
        px-5
        py-3
        rounded-2xl
        shadow-lg
        shadow-orange-200
        transition-all
        duration-300
        hover:-translate-y-1
        active:scale-95
        ">

          + Ajouter une question

        </button>



      </div>





      {/* CONTENU */}


      <main className="
      px-4
      md:px-10
      py-10
      ">


        <Questions />


      </main>




    </div>


  );

};


export default Accueil;