import React, { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";

const Questions = () => {

  const [questions, setQuestions] = useState([]);


  useEffect(() => {

    fetch("http://localhost:3000/api/questions")
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(err => console.log(err));

  }, []);



  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 px-5 py-12">


      <div className="max-w-4xl mx-auto">


        {/* Header */}

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-10">


          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">


            <div>

              <h1 className="text-3xl font-bold text-slate-900">
                💬 Toutes les questions
              </h1>


              <p className="text-slate-500 mt-2">
                Partage tes idées, trouve des réponses et aide la communauté.
              </p>


              <div className="mt-4 inline-flex items-center bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">

                {questions.length} questions disponibles

              </div>


            </div>



            <button
            className="
            bg-orange-600 
            hover:bg-orange-500
            text-white
            font-semibold
            px-6 py-3
            rounded-2xl
            shadow-lg
            shadow-orange-200
            transition
            hover:-translate-y-1
            "
            >

              + Poser une question

            </button>


          </div>


        </div>





        {/* Questions */}


        {

        questions.length === 0 ? (


          <div className="
          bg-white 
          rounded-3xl 
          p-12 
          text-center
          border
          border-slate-100
          shadow-sm
          ">


            <div className="text-5xl mb-4">
              📭
            </div>


            <h2 className="font-semibold text-slate-700">
              Aucune question pour le moment
            </h2>


            <p className="text-slate-400 text-sm mt-2">
              Soyez le premier à lancer une discussion.
            </p>


          </div>


        ) : (



          <div className="space-y-5">


          {
          questions.map((question)=>(


            <div
            key={question._id}
            className="
            bg-white
            rounded-3xl
            p-5
            border
            border-slate-100
            shadow-sm
            hover:shadow-xl
            hover:-translate-y-1
            transition-all
            duration-300
            ">


              <QuestionCard question={question}/>


            </div>


          ))
          }



          </div>



        )


        }



      </div>


    </div>

  );

};


export default Questions;