import React from 'react';
import { TestFrame } from '../index';
import './Test.css';

const Test = ({ 
    chapter,
    subject,
    questions,
    instructions, 
    updateAnswer, 
    onCompleteTest
}) => {

    // Check if all questions have been answered
    const allAnswered = (!!questions && questions.length > 0) ? questions.every((question) => question.userAnswer !== null) : false;
    
    return (
        <>
        { chapter && subject && questions && instructions && updateAnswer && onCompleteTest ? 
        
            <TestFrame chapter={chapter} subject={subject}>
                <h3 className='test-instructions'>{ instructions }</h3>
                <ul className='question-list'>
                    {questions.map((question) => (
                        <li key={question.id}>
                            <p className='question-text'>{question.text}</p>
                            <div className="options">
                                <div>
                                    <input
                                        type="radio"
                                        id={`true-${question.id}`}
                                        name={`answer-${question.id}`}
                                        value="true"
                                        checked={question.userAnswer === true}
                                        onChange={() => updateAnswer(question.id, true)}
                                    />
                                    <label htmlFor={`true-${question.id}`}>True</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id={`false-${question.id}`}
                                        name={`answer-${question.id}`}
                                        value="false"
                                        checked={question.userAnswer === false}
                                        onChange={() => updateAnswer(question.id, false)}
                                    />
                                    <label htmlFor={`false-${question.id}`}>False</label>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <footer className='footer'>
                    <button className='secondary' disabled={!allAnswered} onClick={onCompleteTest}>Finalizar</button>
                </footer>
            </TestFrame>
            : 
            <div className='loading'>
                <h3>Alguno de los datos del test no se han encontrado, por favor intentelo más tarde.</h3>
                <p>El componente Test no puede mostrarse correctamente</p>
            </div> }
        </>
    );
};

export default Test;
