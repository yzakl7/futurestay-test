import React from 'react'
import './App.scss';
import Calendar from './components/calendar/Calendar';

export default function App() { // quedo en el mismo archivo por practicidad
  return (
    <div id="MainContainer">
      <Calendar />
    </div>
  )
}
