import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id: questionId } = useParams();

  const [showForm, setShowForm] = useState(false);
  const [reponse, setReponse] = useState("");
  const [reponses, setReponses] = useState([]);
  const [error, setError] = useState(null);

  // modification
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");


  useEffect(() => {
    const chargerReponses = async () => {
      try {

        if (!questionId || questionId === "undefined") return;

        const res = await fetch(
          `http://localhost:3000/api/reponses/${questionId}`
        );


        const data = await res.json();

        const liste = Array.isArray(data)
          ? data
          : data.reponses || data.data || [];


        setReponses(liste);


      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };


    chargerReponses();

  }, [questionId]);



  // AJOUTER
  const ajouterReponse = async () => {

    if (!reponse.trim()) return;


    const res = await fetch(
      "http://localhost:3000/api/reponses",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          contenu:reponse,
          questionId
        })
      }
    );


    const data = await res.json();


    setReponses([...reponses,data]);

    setReponse("");
    setShowForm(false);

  };



  // SUPPRIMER
  const supprimerReponse = async(id)=>{


    await fetch(
      `http://localhost:3000/api/reponses/${id}`,
      {
        method:"DELETE"
      }
    );


    setReponses(
      reponses.filter(rep=>rep._id !== id)
    );


  };



  // OUVRIR MODIFICATION
  const modifierReponse = (rep)=>{

    setEditId(rep._id);
    setEditText(rep.contenu);

  };



  // ENREGISTRER MODIFICATION
  const enregistrerModification = async()=>{


    const res = await fetch(
      `http://localhost:3000/api/reponses/${editId}`,
      {
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          contenu:editText
        })
      }
    );


    const data = await res.json();


    setReponses(
      reponses.map(rep =>
        rep._id === editId ? data : rep
      )
    );


    setEditId(null);
    setEditText("");

  };




  return (

<div className="min-h-screen bg-gray-100 p-10">

<div className="bg-white rounded-xl shadow p-8">


<h1 className="text-2xl font-bold">
Question détaillée
</h1>


<h2 className="text-xl font-bold mt-6">
Réponses ({reponses.length})
</h2>



{
reponses.map((rep)=>(

<div 
key={rep._id}
className="p-3 bg-gray-100 mt-2 rounded flex justify-between items-center"
>


<span>
{rep.contenu}
</span>


<div className="flex gap-2">


<button
onClick={()=>modifierReponse(rep)}
className="bg-yellow-500 text-white px-3 py-1 rounded"
>
Modifier
</button>



<button
onClick={()=>supprimerReponse(rep._id)}
className="bg-red-600 text-white px-3 py-1 rounded"
>
Supprimer
</button>


</div>


</div>


))
}



{
editId && (

<div className="mt-5">

<textarea
value={editText}
onChange={(e)=>setEditText(e.target.value)}
className="w-full border p-3 rounded"
/>


<button

onClick={enregistrerModification}

className="mt-2 bg-green-600 text-white px-4 py-2 rounded"

>
Enregistrer
</button>


</div>


)

}




<button
onClick={()=>setShowForm(!showForm)}
className="mt-5 bg-blue-600 text-white px-4 py-2 rounded"
>

{showForm ? "Annuler":"Répondre"}

</button>




{
showForm && (

<div className="mt-4">


<textarea

value={reponse}

onChange={(e)=>setReponse(e.target.value)}

className="w-full border p-3 rounded"

placeholder="Ecrire une réponse..."

 />



<button

onClick={ajouterReponse}

className="mt-2 bg-green-600 text-white px-4 py-2 rounded"

>
Envoyer
</button>


</div>

)

}



</div>

</div>

  );
};


export default Detail;