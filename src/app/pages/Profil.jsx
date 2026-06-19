import React, {useEffect, useState} from "react";


const Profil = () => {


const [profil,setProfil] = useState(null);


useEffect(()=>{


const getProfil = async()=>{


try{

const response = await fetch(
"http://localhost:3000/api/users/profil/ID_USER"
);


const data = await response.json();

setProfil(data);


}catch(error){

console.log(error);

}


};


getProfil();


},[]);



if(!profil){

return <h1 className="text-center mt-10">
Chargement...
</h1>

}




return (

<div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">


<div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-8">


<div className="flex flex-col items-center">


<div className="w-28 h-28 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">

{profil.user.nom.charAt(0)}

</div>


<h1 className="text-2xl font-bold mt-4">

{profil.user.nom}

</h1>


<p className="text-gray-500">

{profil.user.email}

</p>


</div>



<div className="grid grid-cols-2 gap-4 mt-8">


<div className="bg-blue-100 p-4 rounded-xl text-center">

<h2 className="text-3xl font-bold text-blue-600">

{profil.questions}

</h2>

<p>
Questions
</p>

</div>



<div className="bg-green-100 p-4 rounded-xl text-center">


<h2 className="text-3xl font-bold text-green-600">

{profil.reponses}

</h2>


<p>
Réponses
</p>


</div>


</div>


</div>


</div>

)

}


export default Profil;