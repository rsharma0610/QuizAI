import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/QuizGeneratorForm.css";


function QuizGeneratorForm(props){

    const [quizInfo, setQuizInfo] = useState({
        topic: "",
        question_count: 5
    })

    const [loading, setLoading] = useState(false);

    function handleQuizFormChange(event){
        const {name, value} = event.target;
        setQuizInfo((prevValue) =>{
            return{
                ...prevValue,
                [name]: value
            }
        })
    }

    const handleGenerateQuiz = async (event) => {
        event.preventDefault(); // Prevent default form submission
        setLoading(true);
        try {
          const response = await axios.post("http://localhost:4000/generate-quiz", quizInfo);
          console.log("Quiz generated:", response.data);
          props.setQuiz(response.data);
          props.onGenerateQuiz(); // Pass generated quiz data to parent component
        } catch (error) {
          console.error("Error generating quiz:", error);
        } finally{
            setLoading(false);
        }
      };

    useEffect(() => {
        console.log(quizInfo);
    },[quizInfo]);

    return(
        <div className="generator-container">
            <form id="quiz-form" onSubmit={handleGenerateQuiz}>
                <label htmlFor="topic">What do you want to be quizzed on? </label>
                <input type="text" id="topic" name="topic" required 
                onChange={handleQuizFormChange} 
                value={quizInfo.topic}
                disabled={loading}></input> <br></br>
                <label htmlFor="question_count">How many questions would you like? </label>
                <select id="question_count" name="question_count"
                onChange={handleQuizFormChange}
                value={quizInfo.question_count}
                disabled={loading}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                </select> <br></br>
                <button type="submit" disabled={loading}>Generate Quiz</button>
            </form> <br/> <br/>
            {loading && <div className="loading-spinner"></div>}
        </div>
    )
}

export default QuizGeneratorForm;