import React, { useState } from 'react'
import { Send, Tag, FileText, HelpCircle } from "lucide-react"


const QuestionForm = () => {

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


  const data = {
    titre: question.titre,
    description: question.description,
    tags: question.tags
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag !== "")
  };


  console.log("Envoi :", data);


  try {

    const response = await fetch(
      "http://localhost:5000/api/questions",
      {
        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify(data)
      }
    );


    const result = await response.json();


    console.log("Backend :", result);


    // vider le formulaire
    setQuestion({
      titre:"",
      description:"",
      tags:""
    });


  } catch(error){

    console.log("Erreur :", error);

  }

}


  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 flex items-center justify-center p-6">
      

      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl p-8">


    

        <div className="mb-8">

          <div className="flex items-center gap-3">

            <div className="bg-blue-600 text-white p-3 rounded-xl">
              <HelpCircle size={30}/>
            </div>


            <div>

              <h1 className="text-3xl font-bold text-gray-800">
                Poser une question
              </h1>

              <p className="text-gray-500">
                Partage ton problème avec la communauté
              </p>

            </div>

          </div>

        </div>



        <form onSubmit={handleSubmit} className="space-y-6">


    

          <div>

            <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">

              <FileText size={18}/>
              Titre

            </label>


            <input

              type="text"

              name="titre"

              value={question.titre}
              onChange={handleChange}
              placeholder="Ex: Comment utiliser React Router ?"
              className="w-full border
              border-gray-300
              rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500 transition "/>

          </div>





         

          <div>


            <label className="font-semibold text-gray-700 mb-2 block">

              Description

            </label>


            <textarea

              name="description"
              value={question.description}
              onChange={handleChange}
              placeholder="Explique ton problème en détail..."
              rows="6"
              className=" w-full border border-gray-300 rounded-xl p-4 resize-none outline-none focus:ring-2 focus:ring-blue-500 transition"/>

          </div>

          <div>

            <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">

              <Tag size={18}/>
              Tags

            </label>

            <input

              type="text"
              name="tags"
              value={question.tags}
              onChange={handleChange}
              placeholder="react, node, mongodb"
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2  focus:ring-blue-500 transition"/>

            <p className="text-sm text-gray-400 mt-2">
              Exemple : #react #javascript
            </p>

          </div>


          <button

            type="submit"

            className="w-full
            bg-blue-600 hover:bg-blue-700 text-white  font-semibold py-4 rounded-xl flex items-center justify-center  gap-2  transition shadow-lg ">

          <Send size={20}/>
            Publier la question

          </button>
        
        </form>

      </div>

    </div>


  )
}


export default QuestionForm