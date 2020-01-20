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
    selected,
    events,
  } = dayOject || false;
  return (
    <div
      onClick={() => handleOnClick(dayOject)}
      className={`
        cell-container ${(weekend || !currentMonth) && 'inactive'} 
        ${weekend && 'weekend'} ${selected && !(weekend || !currentMonth) && 'selected'}
      `}
    >
      <Text>{dayName}</Text>
      {events && (
        <div className="event-indicators-container">
          {renderEvents(events)}
        </div>
      )}

    </div>
  )
}
 const renderEvents = (events) => {
   if (events && events.length > 0 )
  return events.map(({color},i) => {
    return <Text key={color+i} style={{ marginLeft:'2px', marginRight: '2px'}} color={color}>*</Text>
  })
 }