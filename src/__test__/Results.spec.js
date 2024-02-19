/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Results } from '../components';

const questions = [
    { id: 1, text: 'Test question 1', userAnswer: true, correctAnswer: true },
    { id: 2, text: 'Test question 2', userAnswer: true, correctAnswer: false },
];

// Basic display testing
test('It should display the test data corectly', async () => {
    render(<Results 
        chapter="Test chapter"
        subject="Test subject"
        questions={questions}
        instructions="Test instructions"
        onCloseResults={() => {}}
    />);

    const chapter = await screen.findByText('Test chapter');
    expect(chapter).toBeInTheDocument();

    const subject = await screen.findByText('Test subject');
    expect(subject).toBeInTheDocument();

    const instructions = await screen.findByText('Test instructions');
    expect(instructions).toBeInTheDocument();

    // Four radio inputs, one true and false for each question
    const radioInputs = screen.getAllByRole('radio');
    expect(radioInputs).toHaveLength(4);
});

// Check if the test results are displayed correctly
test('It should display the test results correctly', async () => {
    const { container } = render(<Results 
        chapter="Test chapter"
        subject="Test subject"
        questions={questions}
        instructions="Test instructions"
        onCloseResults={() => {}}
    />);

    
    // eslint-disable-next-line testing-library/no-container
    const truthAnswers = container.querySelector('.answer.good')
    expect(truthAnswers).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-container
    const falseAnswers = container.querySelector('.answer.bad');
    expect(falseAnswers).toBeInTheDocument();

   
});

// Check if the onCompleteTest method is triggered when the button Finish Test button is clicked
test('It should trigger the onCompleteTest method when the button is clicked on the Test Component', async () => {
    const onCloseResults = jest.fn();
    render(<Results 
        chapter="Test chapter"
        subject="Test subject"
        questions={questions}
        instructions="Test instructions"
        onCloseResults={onCloseResults}
    />);

    const button = await screen.findByRole('button', { name: 'Volver al Inicio' });
    user.click(button);
    expect(onCloseResults).toHaveBeenCalled();
});

// Check if the component doesn't crash when no data is passed
test('It should display an error message when no data is passed', () => {
    render(<Results />);
    const loadingMessage = screen.getByText('Alguno de los datos', { exact: false });
    expect(loadingMessage).toBeInTheDocument();
});
