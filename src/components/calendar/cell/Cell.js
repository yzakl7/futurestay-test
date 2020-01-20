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
      <div style={{display: 'flex', justifyContent: "space-between"}}>
        <Text>{dayName}</Text>
        {events && events[0].icon &&(
            <div className="weather-icon" >
              <img src={events[0].icon} width="24px" height="24px" alt="weather_icon"/>
        {console.log(events[0].icon)}
            </div>
        )}
      </div>
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
    return <Text key={Math.random()} style={{ marginLeft:'2px', marginRight: '2px'}} color={color}>*</Text>
  })
 }