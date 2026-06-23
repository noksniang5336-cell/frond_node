import {useState} from "react";
import {useNavigate} from "react-router-dom";


export default function AjouterQuestion(){

const navigate=useNavigate();


const [form,setForm]=useState({
titre:"",
description:"",
tags:""
});


const handleChange=(e)=>{

setForm({
...form,
[e.target.name]:e.target.value
})

}


const publier=async(e)=>{

e.preventDefault();


const response=await fetch(
"http://localhost:3000/api/questions",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({

titre:form.titre,

description:form.description,

tags:form.tags.split(",")

})
});


const data=await response.json();


console.log(data);


navigate("/");


}



return (

<div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900 flex justify-center items-center">


<form 
onSubmit={publier}
className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-[520px] text-white">


<h1 className="text-4xl font-bold mb-2">
🚀 Nouvelle idée
</h1>


<p className="text-blue-200 mb-8">
Partage ton problème avec la communauté
</p>



<input

name="titre"

onChange={handleChange}

placeholder="Titre de ta question"

className="w-full p-4 rounded-xl mb-5 text-black"
/>




<textarea

name="description"

onChange={handleChange}

placeholder="Explique ton problème..."

className="w-full h-40 p-4 rounded-xl mb-5 text-black"

/>




<input

name="tags"

onChange={handleChange}

placeholder="React, Node, MongoDB"

className="w-full p-4 rounded-xl mb-6 text-black"

/>



<button

className="
w-full 
bg-gradient-to-r 
from-pink-500 
to-purple-600
p-4
rounded-xl
font-bold
hover:scale-105
transition
">

✨ Publier

</button>



</form>

</div>


)

}