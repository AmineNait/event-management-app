import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventForm from '../components/EventForm';

const addEventMock = jest.fn();

const renderComponent = () => {
  render(<EventForm addEvent={addEventMock} />);
};

test('renders EventForm and submits data correctly', async () => {
  renderComponent();

  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test Event' } });
  fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Test Description' } });
  fireEvent.change(screen.getByLabelText(/Start Date/i), { target: { value: '2024-07-07T10:00' } });
  fireEvent.change(screen.getByLabelText(/End Date/i), { target: { value: '2024-07-07T11:00' } });

  // Open timezone select dropdown
  fireEvent.mouseDown(screen.getByLabelText(/Timezone/i));

  // Wait for the timezone options to be in the document
  await waitFor(() => screen.getByRole('option', { name: /America\/New_York/i }));

  // Select timezone option
  fireEvent.click(screen.getByRole('option', { name: /America\/New_York/i }));

  // Open color select dropdown
  fireEvent.mouseDown(screen.getByLabelText(/Color/i));
  
  // Wait for the color options to be in the document
  await waitFor(() => screen.getByRole('option', { name: /Green/i }));

  // Select color option
  fireEvent.click(screen.getByRole('option', { name: /Green/i }));

  // Submit the form
  fireEvent.click(screen.getByRole('button', { name: /Create Event/i }));

  // Wait for the form submission
  await waitFor(() => {
    expect(addEventMock).toHaveBeenCalledTimes(1);
    /*
        j'ai utilise 
            expect(addEventMock).toHaveBeenCalledWith(expect.objectContaining({ 
        au lieu de
            expect(addEventMock).toHaveBeenCalledWith({
        par ce que le test va fail a cause des proprietes rajoutes automatiquement dans le backend par Mongoose (MongoDB)
        comme "_v" et "_id"
        Donc je verifie juste mon objet avec les proprietes importantes que j'ai definie
    */
    expect(addEventMock).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Test Event',
      description: 'Test Description',
      startDate: '2024-07-07T14:00:00.000Z',  // Converted to UTC
      endDate: '2024-07-07T15:00:00.000Z',    // Converted to UTC
      timezone: 'America/New_York',
      color: '#7cd992',
    }));
  });
});