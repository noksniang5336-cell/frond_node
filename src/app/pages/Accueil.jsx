import React from 'react'
import {  NavLink, useNavigate } from 'react-router-dom';
import Questions from './../../composants/Questions';



const Accueil = () => {
    const token = localStorage.getItem("token");
       const navigate = useNavigate();
   

    const  VerificationToken = () => {
        if(token) {
           return navigate('/ajouter_question');
        }
        navigate('/connexion')
    }


  return (
     <div className="w-full  ">
         <div className="w-full h-[15vh] flex items-center justify-end px-10">
             <NavLink onClick={() => VerificationToken()}  className="text-sm font-semibold text-white bg-orange-600 hover:bg-orange-500 px-4 py-2 rounded-lg shadow-md shadow-orange-900/20 active:scale-95 transition-all duration-200">Ajouter question</NavLink>
         </div>

         {/* composants des question */}
         <Questions></Questions>
    </div>
  )
}

export default Accueil

