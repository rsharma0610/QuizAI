import { useState } from "react"


function Question(props){
    const [answerChoice, setAnswerChoice] = useState("")
    const [outputMessage, setOutputMessage] = useState("");

    function checkAnswer(event){
        const isCorrect = answerChoice === props.answer
        props.onAnswerChange(isCorrect);

    }

    function handleRadioChange(event){
        setAnswerChoice(event.target.value);
        const answerChoice = event.target.value;
        const isCorrect = answerChoice === props.answer
        props.onAnswerChange(isCorrect);
        
    }

    return(
        <>
            <p><b>Question {props.question_number}: {props.question}</b></p> <br></br>

            <form>
                {Object.keys(props.options).map((option, index) => {
                    return(
                        <div>
                            <label
                            style={{
                                color: props.answer === option && props.submitted !== -1 ? "green" : 
                                    (answerChoice === option && props.submitted !== -1 ? 'red' : 'initial'),
                                fontWeight: props.answer === option && props.submitted !== -1 ? 'bold' : 'normal'
                            }} 
                            >
                                <input onChange={handleRadioChange} 
                                type="radio" 
                                name="answer" 
                                value={option}
                                disabled={props.submitted !== -1}
                                /> {props.options[option]}
                            </label> <br/>
                        </div>
                    );
                })} 
            </form>
            {/* {outputMessage && <p>{outputMessage}</p>}  Incorporate later for feedback on each question*/}
            
            
            
        </>
    )
}
export default Question;