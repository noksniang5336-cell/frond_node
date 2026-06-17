import { Link } from "react-router-dom";


const QuestionCard = ({question}) => {

return (

<Link to={`/question/${question.id}`}>

<div className="bg-white p-5 rounded-xl shadow hover:shadow-lg cursor-pointer">

<h2 className="text-xl font-bold">
{question.titre}
</h2>

<p>
{question.description}
</p>

<p>
👤 {question.auteur}
</p>

</div>

</Link>

)

}

export default QuestionCard;