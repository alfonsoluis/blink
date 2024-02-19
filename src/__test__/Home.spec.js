import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Home } from '../components';

// Basic rendering test
test('It should display welcome message', async () => {
  render(<Home />);
  const successMessage = await screen.findByText('Bienvenido', { exact: false } );
  expect(successMessage).toBeInTheDocument();
});

// Test if both buttons are displayed
test('It should display two buttons', async () => {
  render(<Home />);
  const buttons = await screen.findAllByRole('button');
  expect(buttons).toHaveLength(2);
});

// Test if state.loading is updated after fetching data
test('It should update state.loading after fetching data', async () => {
  render(<Home />);
  const dataLoadedMessage = await screen.findByText('A continuación encontrará', { exact: false } );
  expect(dataLoadedMessage).toBeInTheDocument();
});

// test if the button is enabled after fetching data
test('It should enable the button after fetching data', async () => {
  render(<Home />);
  const button = await screen.findByRole('button', { name: 'Realizar Prueba' });
  await waitFor(() => expect(button).toBeEnabled());
  expect(button).toBeEnabled();
});

// It should display the test component when the button is clicked
test('It should display the test component when the button is clicked', async () => {
  render(<Home />);
  const button = await screen.findByRole('button', { name: 'Realizar Prueba' });
  await waitFor(() => expect(button).toBeEnabled());
  user.click(button);
  const testComponentTitle = await screen.findByText('Señala si son verdaderas', { exact: false } );
  expect(testComponentTitle).toBeInTheDocument();
});

// Test if the onCompleteTest method is triggered when the button Finish Test button is clicked
test('It should trigger the onCompleteTest method when the button is clicked on the Test Component', async () => {
  render(<Home />);
  
  // Wait for the data to load and start the test
  const startTestButton = await screen.findByRole('button', { name: 'Realizar Prueba' });
  await waitFor(() => expect(startTestButton).toBeEnabled());
  user.click(startTestButton);
  
  // Click on all options so the Finish test button enables
  const ratioInputs = await screen.findAllByLabelText('True');
  for (const input of ratioInputs) {
    user.click(input);
  }

  // Click on the Finish test button
  const finishTestButton = await screen.findByRole('button', { name: 'Finalizar' });
  await waitFor(() => expect(finishTestButton).toBeEnabled());
  
  // Check that the user is back on the Home screen. 
  user.click(finishTestButton);
  const testIsCompleteText = await screen.findByText('Has completado', { exact: false } );
  expect(testIsCompleteText).toBeInTheDocument();

  // Check if the Reset UI button is displayed
  const resetUiButton = await screen.findByRole('button', { name: 'Reset UI' });
  expect(resetUiButton).toBeInTheDocument();
});

// Test if the onCloseResults method is triggered from the Result component when the 
// button Go back to home is clicked
test('It should trigger the onCloseResults method when the button is clicked', async () => {
  render(<Home />);
  
  // Wait for the data to load and start the test
  const startTestButton = await screen.findByRole('button', { name: 'Realizar Prueba' });
  await waitFor(() => expect(startTestButton).toBeEnabled());
  user.click(startTestButton);
  
  // Click on all options so the Finish test button enables
  const ratioInputs = await screen.findAllByLabelText('True');
  for (const input of ratioInputs) {
    user.click(input);
  }

  // Click on the Finish test button
  const finishTestButton = await screen.findByRole('button', { name: 'Finalizar' });
  await waitFor(() => expect(finishTestButton).toBeEnabled());
  user.click(finishTestButton);

  
  const showResultsButton = await screen.findByRole('button', { name: 'Resultado Test' });
  user.click(showResultsButton);
  
  // Check if the Results component is displayed
  const goBackButton = await screen.findByRole('button', { name: 'Volver al Inicio' });
  user.click(goBackButton);

  const successMessage = await screen.findByText('Has completado la prueba', { exact: false } );
  expect(successMessage).toBeInTheDocument();
});
