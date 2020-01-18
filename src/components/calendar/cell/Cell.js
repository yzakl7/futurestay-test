import React from 'react'
import Text from '../../UI/Text';
import './Cell.scss'

export default function Cell(props) {
  const { dayOject } = props;
  const {
    dayName,
    currentMonth,
    weekend,
    // events
  } = dayOject || false;
  return (
    <div className="cell-container">
      <Text>{dayName}</Text>
      <Text>{weekend && 'finde'}</Text>
      <Text>{!currentMonth && 'X'}</Text>
    </div>
  )
}
