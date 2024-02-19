import React, { useEffect, useReducer } from 'react';
import './Home.css';
import { Test, Results } from '../index';
import { ContentService } from '../../services';

const Home = () => {

    // Messages
    const DEFAULT_MSG = 'Cargando las preguntas. Por favor espere un momentio...';
    const WELCOME_MSG = 'A continuación encontrará opciones para acceder a la prueba. Para comenzar, presiona el botón "Realizar Prueba".';
    const TEST_COMPLETED_MSG = 'Has completado la prueba. Presiona el botón "Resultado Test" para ver tu puntaje.';
    const GENERAL_ERROR_MSG = 'Ocurrió un error cargando las preguntas.';
    const NO_QUESTIONS_MSG = 'No hay preguntas disponibles. Por favor, intenta más tarde.';
    const NO_INSTRUCTIONS_MSG = 'No hay instrucciones disponibles. Por favor, intenta más tarde.';

    // View state management
    const initialState = {
        activeView: 'home',
        message: DEFAULT_MSG,
        isTestCompleted: false,
        testContent: null,
        questions: [],
        chapter: '',
        subject: '',
        instructions: '',
        loading: true,
        error: false
    };
    
    // Manage view state
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'DISPLAY_HOME':
                return { ...state, activeView: 'home' };
            case 'DISPLAY_TEST':
                return { ...state, activeView: 'test'};
            case 'DISPLAY_RESULT':
                return { ...state, activeView: 'results'};
            case 'SET_MESSAGE':
                return { ...state, message: action.message };
            case 'SET_TEST_COMPLETED':
                return { 
                    ...state, 
                    isTestCompleted: action.isTestCompleted,
                    message: action.isTestCompleted ? TEST_COMPLETED_MSG : WELCOME_MSG,
                    activeView: 'home' };
            case 'SET_QUESTIONS':
                return { ...state, questions: action.questions };
            case 'SET_TEST_CONTENT':
                const { chapter, subject, questions, instructions } = action.testContent;   
                return { 
                    ...state,
                    chapter, 
                    subject, 
                    questions, 
                    instructions,
                    message: WELCOME_MSG,
                    loading: false
                };
            case 'SET_LOADING':
                return { ...state, loading: action.loading };
            case 'SET_ERROR':
                return { 
                    ...state, 
                    error: true,
                    message: action.error
                };
            case 'RESET':
                return initialState;
            default:
                return state;
        }
    }, initialState);

    // Fetch questions from service
    const getQuestions = async () => {
        dispatch({ type: 'SET_LOADING', loading: true });
        try {
            const data = await ContentService.getTestContent();

            // Handle basic data validation, we could add more options based on the Json test cntent structure
            if (!data) {
                throw new Error(GENERAL_ERROR_MSG);
            } else if (!data.questions || data.questions.length === 0) {
                throw new Error(NO_QUESTIONS_MSG);
            } else if (data.instructions === undefined || data.instructions === '') {
                throw new Error(NO_INSTRUCTIONS_MSG);
            }

            dispatch({ type: 'SET_TEST_CONTENT', testContent: data });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', error: error.message});
            dispatch({ type: 'SET_LOADING', loading: false });
        }
    };

    // Fetch questions from service at component mount
    useEffect(() => {
        getQuestions();
    }, []);

    // Handle update user answers
    const updateAnswer = (id, value) => {
        const questions = state.questions.map((question) => {
            if (question.id === id) {
                return { ...question, userAnswer: value };
            }
            return question;
        });
        dispatch({ type: 'SET_QUESTIONS', questions });
    };

    // Handle start test button click
    const onStartTest = () => {
        dispatch({ type: 'DISPLAY_TEST' });
    };

    // Handle results button click
    const onResults = () => {
        dispatch({ type: 'DISPLAY_RESULT' });
    };

    // Handle completing the test
    const onCompleteTest = () => {
        dispatch({ type: 'SET_TEST_COMPLETED', isTestCompleted: true });
    };

    // Handle closing the results
    const onCloseResults = () => {
        dispatch({ type: 'DISPLAY_HOME'});
    };

    // Handle reset the UI
    const onReset = () => {
        dispatch({ type: 'RESET' });
        getQuestions();
    };

    return (
        <>
            { state.activeView === 'home' &&     
                <div className='home-content'>
                    <header className='header'>
                        <h2>Bienvenido a la Prueba</h2>
                    </header>
                    <div className="body">
                        <p id='messages'>{ state.message }</p>
                    </div>
                    <footer className='footer'>
                        <button className="primary" disabled={state.isTestCompleted || state.loading || state.error} onClick={() => onStartTest()}>
                            Realizar Prueba
                        </button>
                        <button className="primary" disabled={!state.isTestCompleted} onClick={() => onResults()}>
                            Resultado Test
                        </button>
                    </footer>
                    <div className="other-actions">
                        { (state.isTestCompleted || state.error) && <button className="reset-ui small" onClick={onReset}>Reset UI</button> }
                    </div>
                </div>
            }
            { state.activeView === 'test' &&
                <Test 
                    questions={state.questions}
                    chapter={state.chapter}
                    subject={state.subject}
                    instructions={state.instructions}
                    updateAnswer={updateAnswer} 
                    onCompleteTest={onCompleteTest}
                /> 
            }
            { state.activeView === 'results' &&
                <Results 
                    questions={state.questions}
                    chapter={state.chapter}
                    subject={state.subject}
                    instructions={state.instructions}
                    onCloseResults={onCloseResults}
                /> 
            }
        </>
    );
};

export default Home;