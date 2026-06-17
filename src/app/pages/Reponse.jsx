import React, { useState } from 'react'
import { MessageCircle, Send, User } from "lucide-react"


const Reponse = () => {


  const [reponse, setReponse] = useState("")


  const handleSubmit = (e) => {

    e.preventDefault()

    console.log(reponse)

  }


  return (

    <div className="
      min-h-screen 
      bg-gradient-to-br 
      from-slate-100 
      to-blue-100 
      p-6
    ">


      <div className="
        max-w-3xl 
        mx-auto 
        bg-white 
        rounded-3xl 
        shadow-xl 
        p-8
      ">


        {/* Titre */}

        <div className="flex items-center gap-3 mb-6">


          <div className="
            bg-blue-600 
            text-white 
            p-3 
            rounded-xl
          ">

            <MessageCircle/>

          </div>


          <h1 className="
            text-3xl 
            font-bold
          ">
            Réponses
          </h1>


        </div>




        {/* Question */}

        <div className="
          bg-gray-100 
          p-5 
          rounded-xl 
          mb-6
        ">


          <h2 className="font-bold text-xl">

            Comment utiliser React Router ?

          </h2>


          <p className="text-gray-600 mt-2">

            Je cherche à comprendre les routes dynamiques dans React.

          </p>


        </div>





        {/* Liste des réponses */}

        <div className="space-y-4">


          <div className="
            border 
            rounded-xl 
            p-5
          ">


            <div className="
              flex 
              items-center 
              gap-2 
              mb-3
            ">

              <User size={18}/>

              <span className="font-semibold">
                Utilisateur
              </span>


            </div>


            <p className="text-gray-700">

              Tu peux utiliser BrowserRouter, Routes et Route 
              pour gérer tes pages React.

            </p>


          </div>

          <div className="border rounded-xl p-5">

            <div className=" flex items-center gap-2 ">

              <User size={18}/>

              <span className="font-semibold">
                Nogaye
              </span>

            </div>


            <p className="text-gray-700 mt-3">

              Il faut aussi installer react-router-dom.

            </p>

          </div>

        </div>





        {/* Ajouter réponse */}

        <form 
          onSubmit={handleSubmit}
          className="mt-8" >


          <h2 className="text-xl  font-bold mb-3">
            Ajouter une réponse
          </h2>



          <textarea

            value={reponse}

            onChange={(e)=>setReponse(e.target.value)}

            placeholder="Écris ta réponse..."

            className=" w-full border rounded-xl p-4 h-32 outline-none focus:ring-2 focus:ring-blue-500"/>

          <button

            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 ">

            <Send size={18}/>

            Envoyer la réponse


          </button>

        </form>

      </div>

    </div>

  )
}


export default Reponse