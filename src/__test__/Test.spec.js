import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Test } from '../components';

const questions1 = [
    { id: 1, text: 'Test question 1', userAnswer: null, correctAnswer: true },
    { id: 2, text: 'Test question 2', userAnswer: null, correctAnswer: false },
];

const questions2 = [
    { id: 1, text: 'Test question 1', userAnswer: true, correctAnswer: true },
    { id: 2, text: 'Test question 2', userAnswer: true, correctAnswer: false },
];

// Basic display testing
test('It should display the test data corectly', async () => {
    render(<Test 
        chapter="Test chapter"
        subject="Test subject"
        questions={questions1}
        instructions="Test instructions"
        updateAnswer={() => {}}
        onCompleteTest={() => {}}
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

// Basic user interaction testing
test('It should update user answers correctly', async () => {
    const updateAnswer = jest.fn();
    render(<Test 
        chapter="Test chapter"
        subject="Test subject"
        questions={questions1}
        instructions="Test instructions"
        updateAnswer={updateAnswer}
        onCompleteTest={() => {}}
    />);

    const trueRadios = await screen.findAllByLabelText('True');
    user.click(trueRadios[0]);
    expect(updateAnswer).toHaveBeenCalledWith(1, true);

    const falseRadios = await screen.findAllByLabelText('False');

    user.click(falseRadios[1]);
    expect(updateAnswer).toHaveBeenCalledWith(2, false);
});

// Check if user can end the text
test('It should enable button when the test is completed', async () => {
    render(<Test 
        chapter="Test chapter"
        subject="Test subject"
        questions={questions2}
        instructions="Test instructions"
        updateAnswer={() => {}}
        onCompleteTest={() => {}}
    />);

    const button = await screen.findByRole('button', { name: 'Finalizar' });
    await waitFor(() => expect(button).toBeEnabled());
    expect(button).toBeEnabled();
});

// Check if the onCompleteTest method is triggered when the button Finish Test button is clicked
test('It should trigger the onCompleteTest method when the button is clicked on the Test Component', async () => {
    const onCompleteTest = jest.fn();
    render(<Test 
        chapter="Test chapter"
        subject="Test subject"
        questions={questions2}
        instructions="Test instructions"
        updateAnswer={() => {}}
        onCompleteTest={onCompleteTest}
    />);

    const button = await screen.findByRole('button', { name: 'Finalizar' });
    user.click(button);
    expect(onCompleteTest).toHaveBeenCalled();
});

// Check if the component doesn't crash when no data is passed
test('It should display an error message when no data is passed', () => {
    render(<Test />);
    const loadingMessage = screen.getByText('Alguno de los datos', { exact: false });
    expect(loadingMessage).toBeInTheDocument();
});
