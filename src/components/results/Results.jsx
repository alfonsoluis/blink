import React from 'react';
import { TestFrame } from '../index';
import './Results.css';

const Results = ({ 
    chapter,
    subject,
    questions,
    instructions, 
    onCloseResults
}) => (
    <>
    { chapter && subject && questions && instructions && onCloseResults ? 

        <TestFrame chapter={chapter} subject={subject}>
            <h3>{instructions}</h3>
            <ul className='question-list'>
                {questions.map((q) => (
                    <li key={q.id}>
                        <p className='question-text'>{q.text}</p>
                        <div className="options">
                            <div 
                            className={ `answer ${q.userAnswer ? q.correctAnswer === q.userAnswer ? 'good' : 'bad' : ''}`}>
                                <input
                                    type="radio"
                                    readOnly
                                    checked={q.userAnswer === true} />
                                <label>True</label>
                            </div>
                            <div className={ `answer ${!q.userAnswer ? q.correctAnswer === q.userAnswer ? 'good' : 'bad' : ''}` }>
                                <input
                                    type="radio"
                                    readOnly
                                    checked={q.userAnswer === false} />
                                <label >False</label>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <footer className='footer'>
                <button className='secondary' onClick={onCloseResults}>Volver al Inicio</button>
            </footer>
        </TestFrame>
    : 
    <div className='loading'>
        <h3>Alguno de los datos del test no se han encontrado, por favor intentelo más tarde.</h3>
        <p>El componente Results no puede mostrarse correctamente</p>
    </div> }
</>
);

export default Results;