import { useState } from 'react';
import axios from 'axios'; // Assurez-vous d'installer axios : npm install axios

function AjouterQuestion() {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [etiquettes, setEtiquettes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Préparation des données (on sépare les tags par des espaces ou virgules)
    const questionData = {
      title: titre,
      body: description,
      tags: etiquettes.split(' ').map(tag => tag.trim()), 
    };

    try {
      // Remplacez l'URL par celle de votre API backend
      const response = await axios.post('http://localhost:5000/api/questions', questionData);
      
      if (response.status === 201) {
        alert('Question publiée avec succès !');
        // Redirection ou réinitialisation des champs ici
      }
    } catch (error) {
      console.error("Erreur lors de la publication de la question :", error);
      alert("Une erreur est survenue lors de la publication.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Liez vos inputs avec onChange */}
      <input 
        value={titre} 
        onChange={(e) => setTitre(e.target.value)} 
        placeholder="Titre" 
        required 
      />
      <textarea 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Description" 
        required 
      />
      <input 
        value={etiquettes} 
        onChange={(e) => setEtiquettes(e.target.value)} 
        placeholder="react javascript" 
      />
      
      {/* Assurez-vous que le bouton a le type="submit" */}
      <button type="submit">Publier la question</button>
    </form>
  );
}
