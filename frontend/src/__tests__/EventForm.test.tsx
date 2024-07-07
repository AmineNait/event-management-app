
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EventForm from '../components/EventForm';
import { EventFormProps } from '../types';
import '@testing-library/jest-dom';

const addEventMock = jest.fn();

const defaultProps: EventFormProps = {
  addEvent: addEventMock,
};

test('renders EventForm and submits data correctly', async () => {
  render(<EventForm {...defaultProps} />);

  fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test Event' } });
  fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Test Description' } });
  fireEvent.change(screen.getByLabelText(/Start Date/i), { target: { value: '2024-07-07T10:00' } });
  fireEvent.change(screen.getByLabelText(/End Date/i), { target: { value: '2024-07-07T11:00' } });

  fireEvent.mouseDown(screen.getByLabelText(/Timezone/i));
  await waitFor(() => screen.getByRole('option', { name: /America\/New_York/i }));
  fireEvent.click(screen.getByRole('option', { name: /America\/New_York/i }));

  fireEvent.mouseDown(screen.getByLabelText(/Color/i));
  fireEvent.click(screen.getByRole('option', { name: /Green/i }));

  fireEvent.click(screen.getByRole('button', { name: /Create Event/i }));

  await waitFor(() => {
    expect(addEventMock).toHaveBeenCalledTimes(1);
    /*
        I used
            expect(addEventMock).toHaveBeenCalledWith(expect.objectContaining({
        instead of
            expect(addEventMock).toHaveBeenCalledWith({
        because the test will fail due to the properties automatically added in the backend by Mongoose (MongoDB)
        such as "_v" and "_id".
        So I am verifying my object with only the important properties that I have defined.
        */
    expect(addEventMock).toHaveBeenCalledWith(expect.objectContaining({
        name: 'Test Event',
        description: 'Test Description',
        startDate: '2024-07-07T14:00:00.000Z', // Adjusted to match the format returned by Mongoose
        endDate: '2024-07-07T15:00:00.000Z', // Adjusted to match the format returned by Mongoose
        timezone: 'America/New_York',
        color: '#7cd992',
    }));
  });
});
