import React from 'react';
import './App.css';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Event Management</h1>
        <EventForm />
        <EventList />
      </header>
    </div>
  );
};

export default App;
