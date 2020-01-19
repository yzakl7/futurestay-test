import React, { Component } from 'react'
import './EditView.scss'
import Text from '../../UI/Text';
import TimeLineEvent from './TimeLineEvent';
import Input from '../../UI/Input';
import { SM } from '../../../constants/layout';
import Button from '../../UI/Button';

export default class EditView extends Component {
  constructor() {
    super();
    this.state = {
      view:'list',
      eventName: '',
      city: "",
      endAt: "",
      eventId: "",
      startAt: "",
    }
  }

  componentDidMount() {
    const { dayView } = this.props;
    const { today } = dayView;
    this.setState({today})    
  }

  componentDidUpdate() {
  }

  handleOnChange = (state, value, maxChar) => {
    this.setState({[state]: value})
  }

  renderEditView = () => {
    const { updateEvent } = this.props;
    const {
      eventName,
      city,
      color,
      endAt,
      startAt
    } = this.state;
    return (
      <div className="edit-view-form">
        <Text size={SM}>Título</Text>
        <Input
          maxChars={30}
          value={eventName}
          stateName={'eventName'}
          onChange={this.handleOnChange}
        />
        <Text size={SM}>Ciudad</Text>
        <Input
          stateName={'city'}
          value={city}
          onChange={this.handleOnChange}
        />
        <Text size={SM}>Hora de inicio</Text>
        <Input
          stateName={'startAt'}
          type={'select'}
          options={['08:00','09:00','10:00','11:00']}
          value={startAt}
          onChange={this.handleOnChange}
        />
        <Text size={SM}>Hora de finalización</Text>
        <Input
          stateName={'endAt'}
          type={'select'}
          options={['12:00','13:00','14:00','15:00']}
          value={endAt}
          onChange={this.handleOnChange}
        />
        <Text size={SM}>Color</Text>
        <Input
          stateName={'color'}
          type={'color'}
          value={color}
          onChange={this.handleOnChange}
        />
        <div className="buttons">
          <Button text="Regresar" onClick={() => this.handleOnChange('view','list')} />
          <Button text="Guardar" onClick={() => {
            updateEvent(this.state);
            this.handleOnChange('view','list');
            }} />
        </div>
      </div>

    )
  }

  selectEvent = (event, index) => {
    const {
      eventName,
      city,
      endAt,
      eventId,
      startAt,
      color
    } = event;
    this.setState({
      view: 'event',
      eventName,
      city,
      endAt,
      eventId,
      startAt,
      index,
      color
    })
  }

  renderListView = ({events}) => {
    const { deleteEvent } = this.props;
    const { today } = this.state;
    if (events) {
      return events.map((ev, i) => {
        return (
          <TimeLineEvent
            key={Math.random()}
            deleteEvent={deleteEvent}
            onClick={() => this.selectEvent(ev, i)}
            event={ev}
            index={i}
            today={today}
          />
        ) 
      })
    }
    return <Text>Nada por aqui...</Text>
  }

  render() {
    const { today, view } = this.state;
    const { deleteEvent, dayView, addEvent } = this.props;
    if ( view === 'list' && dayView) {
    return (
      <>
        <div className="timeline-container">
          {this.renderListView(dayView)}
          <div>
            <Button text="Eliminar todas" onClick={deleteEvent} onClickParams={today} />
            <Button text="Agregar" onClick={() => this.selectEvent(false)} onClickParams={today} />
          </div>
        </div>
      </>
    )}
    return this.renderEditView()
  }
}
