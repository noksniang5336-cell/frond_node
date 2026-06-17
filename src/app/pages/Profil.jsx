import React from 'react'
import { User, Mail, MessageCircle, HelpCircle } from "lucide-react"

const Profil = () => {

  return (

    <div className="
      min-h-screen 
      bg-gradient-to-br 
      from-blue-100 
      to-slate-100 
      flex 
      justify-center 
      items-center 
      p-6
    ">


      <div className="
        bg-white 
        w-full 
        max-w-3xl 
        rounded-3xl 
        shadow-xl 
        p-8
      ">


        {/* Profil header */}

        <div className="flex items-center gap-5 mb-8">


          <div className="
            w-24 
            h-24 
            bg-blue-600 
            rounded-full 
            flex 
            items-center 
            justify-center 
            text-white
          ">

            <User size={45}/>

          </div>



          <div>

            <h1 className="
              text-3xl 
              font-bold 
              text-gray-800
            ">
              Nogaye Niang
            </h1>


            <div className="flex items-center gap-2 text-gray-500">

              <Mail size={18}/>

              nogaye@email.com

            </div>


          </div>


        </div>




        {/* Statistiques */}

        <div className="
          grid 
          grid-cols-2 
          gap-5 
          mb-8
        ">


          <div className="
            bg-blue-50 
            rounded-2xl 
            p-5 
            text-center
          ">

            <HelpCircle 
              className="mx-auto text-blue-600"
            />

            

            <p className="text-gray-500">
              Questions posées
            </p>


          </div>





          <div className="
            bg-green-50 
            rounded-2xl 
            p-5 
            text-center
          ">


            <MessageCircle 
              className="mx-auto text-green-600"
            />


            


            <p className="text-gray-500">
              Réponses données
            </p>


          </div>


        </div>





        {/* Questions */}

        <div>


          <h2 className="
            text-xl 
            font-bold 
            mb-4
          ">
            Mes questions
          </h2>



          <div className="
            border 
            rounded-xl 
            p-4 
            hover:bg-gray-50
          ">


            <h3 className="font-semibold">
              Comment connecter React avec Node.js ?
            </h3>


            <p className="text-gray-500">
              #react #node
            </p>


          </div>



        </div>


      </div>


    </div>

  )
}

export default Profil