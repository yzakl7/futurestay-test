import React, { Component } from 'react'
import './EditView.scss'
import Text from '../../UI/Text';
import TimeLineEvent from './TimeLineEvent';
import Input from '../../UI/Input';
import { SM } from '../../../constants/layout';
import Button from '../../UI/Button';
import getWeather from '../../../apis/openWheater';

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
      color: "#EAEAEA",
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

  getWeather = (params) => {
    getWeather(params)
      .then(({weather})=>{
        const icon = `http://openweathermap.org/img/wn/${weather[0].icon}.png`
        this.setState({
          weather: weather[0],
          icon
        })
        return true
      })
      .catch((res)=>{
        return false;
      })
    return null;
  }

  renderEditView = () => {
    const {
      eventName,
      city,
      color,
      endAt,
      startAt,
      weather,
      icon
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
          onBlur={this.getWeather}
          onBlurParams={city}
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
        <div style={{display:'flex', justifyContent: 'space-between'}}>
          <div>
            <Text size={SM}>Color</Text>
            <Input
              stateName={'color'}
              type={'color'}
              value={color}
              onChange={this.handleOnChange}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Text size={SM}>Weather</Text>
            {icon && <img src={icon} alt="i"/>}
            {weather && <Text>{weather.description}</Text>}
          </div>
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
      color,
      weather,
      icon
    } = event;
    this.setState({
      view: 'event',
      eventName,
      city,
      endAt,
      eventId,
      startAt,
      index,
      color,
      weather,
      icon
    })
  }

  renderListView = ({events}) => {
    const { deleteEvent } = this.props;
    const { today } = this.state;
    if (events) {
      return events.map((ev, i) => {
        return (
          <TimeLineEvent
            key={Math.random() + i}
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
    const { today, view, city } = this.state;
    const { updateEvent, deleteEvent, dayView } = this.props;
    if ( view === 'list' && dayView) {
    return (
      <>
        <div className="timeline-container">
          <div className="list-area">
          {this.renderListView(dayView)}
          </div>
          <div className="button-area">
            <Button icon="×" text="Eliminar todas" onClick={deleteEvent} onClickParams={today} />
            <Button icon="+" text="Agragar" flexDirection="row-reverse" onClick={() => this.selectEvent(false)} onClickParams={today} />
          </div>
        </div>
      </>
    )}
    return (
      <div className="timeline-container">
        <div className="list-area flex">
          {this.renderEditView()}
        </div>
        <div className="button-area">
          <Button icon={<Text style={{marginTop: '-5px'}}>‹</Text>} text="Regresar" onClick={() => this.handleOnChange('view','list')} />
          <Button
            icon="✔"
            text="Guardar"
            onClick={ async() => {
              this.getWeather(city)
                updateEvent(this.state);
                this.handleOnChange('view','list');
            }} />
        </div>
      </div>
      )
  }
}
