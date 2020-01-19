import React from 'react'
import Text from '../../UI/Text';
import './Cell.scss'

const handleOnClick = (dayOject) => {
  const { onClick, weekend, dayName } = dayOject;
  if (onClick && !weekend) return onClick(dayName);
  return null
}

export default function Cell(props) {
  const { dayOject } = props;
  const {
    dayName,
    currentMonth,
    weekend,
    events,
  } = dayOject || false;
  return (
    <div onClick={() => handleOnClick(dayOject)} className="cell-container">
      <Text>{dayName}</Text>
      <Text>{weekend && 'finde'}</Text>
      <Text>{!currentMonth && 'X'}</Text>
      <Text>{events && '*'}</Text>
    </div>
  )
}
