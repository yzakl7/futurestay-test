import React from 'react'
import './EditView.scss'
import Text from '../../UI/Text'
import { MD2, BG } from '../../../constants/layout';
import Button from '../../UI/Button';

export default function TimeLineEvent(props) {
  const { event, onClick, deleteEvent, today, index } = props;
  return (
    <div className="timeline-event-container">
      <div
        onClick={() => onClick()}
        className="timeline-event-container"
      >
        <div className="bullet-container">
          <div className="bullet" style={{background: event.color}}/>
        </div>
        <div className="event-details-container">
          <Text fontSize={MD2}>{event.eventName}</Text>
          <Text fontSize={BG}>{event.startAt}</Text>
          <Text>{event.city}</Text>
        </div>

      </div>
      {/* {JSON.stringify(props)} */}
      <div className={`delete-button`}>
        <Button icon="×" onClick={() => deleteEvent(today, index)} />
      </div>
    </div>
  )
}
