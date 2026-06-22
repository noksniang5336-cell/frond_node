import React, { useState } from "react";

const Detail = () => {

  const [showForm, setShowForm] = useState(false);
  const [reponse, setReponse] = useState("");
  const [reponses, setReponses] = useState([]);


  const ajouterReponse = () => {

    if (!reponse.trim()) {
      return;
    }


    setReponses((ancienneReponses) => [
      ...ancienneReponses,
      reponse
    ]);


    setReponse("");

    setShowForm(false);

  };


  return (

    <div className="min-h-screen bg-gray-100 p-10">


      <div className="bg-white rounded-xl shadow p-8">


        <h1 className="text-3xl font-bold">
          Comment utiliser useEffect dans React pour récupérer des données ?
        </h1>


        <p className="mt-4 text-gray-600">
          Je débute avec React et je souhaite récupérer des données depuis une API avec useEffect.
        </p>



        <div className="mt-6 border-b pb-4">

          👤 Aminata Ndiaye

          <span className="float-right">
            ⏰ 09:15
          </span>

        </div>




        {/* Nombre de réponses */}

        <h2 
          key={reponses.length}
          className="text-xl font-bold mt-6"
        >

          Réponses ({reponses.length})

        </h2>




        {/* Affichage des réponses */}

        {
          reponses.length === 0 ? (

            <p className="text-gray-500 mt-3">
              Aucune réponse pour le moment...
            </p>


          ) : (


            reponses.map((rep,index)=>(

              <div
                key={index}
                className="bg-gray-100 p-4 rounded mt-3"
              >

                {rep}

              </div>


            ))

          )
        }





        {/* Bouton répondre */}

        <button

          onClick={()=>setShowForm(!showForm)}

          className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg"

        >

          Répondre

        </button>





        {/* Formulaire */}

        {
          showForm && (

            <div className="mt-5">


              <textarea

                value={reponse}

                onChange={(e)=>setReponse(e.target.value)}

                placeholder="Écrire votre réponse..."

                className="w-full border rounded-lg p-3 h-32"

              />



              <button

                onClick={ajouterReponse}

                className="mt-3 bg-green-600 text-white px-5 py-2 rounded-lg"

              >

                Envoyer

              </button>



            </div>

          )
        }



      </div>


    </div>

  )
}


export default Detail;