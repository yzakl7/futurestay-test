import React, { Component } from 'react'
import Text from '../UI/Text'
import './Calendar.scss'
import moment from 'moment'
import Cell from './cell/Cell';
import EditView from './editView/EditView';
import { BG } from '../../constants/layout';
import Button from '../UI/Button';

export default class Calendar extends Component {
  constructor() {
    super();
    this.events = {};
    this.days = ['Sunday','Monday','Tuesday','Wednesday','thursday','Friday','Saturday']
    this.state = {
      date: moment(),
      numberOfCells: moment().daysInMonth(),
      selectedMonth: moment().format('MMMM'),
      selectedDay: moment().date(),
      selectedYear: moment().year(),
      dayView: 'Nada seleccionado',
      editViewKey: Math.random()
    };
  }
  componentDidMount() {
    let events = {
      '2020117': [
        {eventId:"1", eventName: 'Ejemplo', startAt: '11:00', endAt: '12:00', city: 'Mérida'},
        {eventId:"2", eventName: 'Ejemplo 2', startAt: '09:00', endAt: '15:00', city: 'Mérida'},
        {eventId:"3", eventName: 'Ejemplo 3', startAt: '08:00', endAt: '13:00', city: 'Mérida'},
      ]
    }
    this.setState({events})
  }


  updateEvent = (updatedEvent) => {
    const { events, dayView, selectedDay } = this.state;
    const { index, today,
      city,
      endAt,
      eventId,
      eventName,
      startAt,
      color
    } = updatedEvent;
    const newEvents = { ...events };
    const newDayView = { ...dayView };
    if ( index ) {
      newEvents[today][index] = {
        city,
        endAt,
        eventId,
        eventName,
        startAt,
        color
      }
    }
    if (!newEvents[today]){
      newEvents[today] = []
    }
    newEvents[today].push({
      city,
      endAt,
      eventId,
      eventName,
      startAt,
      color
    })
    // this.getDayEvents(selectedDay);
    this.setState({
      events: newEvents,
      dayView: newDayView,
    })
    setTimeout(() => {
      this.selectDay(selectedDay)
    }, 0);
  }

  deleteEvent = (eventDay, eventIndex) => {
    this.setState((prev) => {
      const newState = { ...prev }
      if (eventIndex){
        newState.events[eventDay].splice(eventIndex, 1)
      } else {
        newState.events[eventDay] = []
        this.selectDay()
      }

      return newState
    })
  }
  sortArraybyTime = (array) => {
    if (array && array.length > 0) {
      return array.sort((a,b) => {
        return new moment(a.startAt, 'HH:mm') - new moment(b.startAt, 'HH:mm')
      })
    }
    return null;
  }
  renderDayTitles = () => {
    return this.days.map((day,i) => {
      return (
        <div key={`days${i}`} className="day-label">
          <Text color="white">{day}</Text>
        </div>
      )
    })
  }

  isWeekend = (day, monthDelta) => {
    const { selectedMonth, selectedYear } = this.state;
    const month = moment().add(monthDelta, 'M').format('MMMM')
    let year =selectedYear;
    if (selectedMonth === 'January' && monthDelta < 0) year = selectedYear -1
    if (selectedMonth === 'December' && monthDelta > 0) year = selectedYear +1
    const selectedDay = (
      moment(
        year + '-' + (
          monthDelta ? month : selectedMonth
        ) + '-' + day).format('dddd')
      );
    if ( selectedDay === 'Saturday' || selectedDay === 'Sunday') return true;
    return false

  }

  getDayEvents = (day) => {
    const { selectedYear, selectedMonth, events} = this.state;
    if (events) {
      const today = `${selectedYear}${(moment().month(selectedMonth).format("M"))}${day}`
      const ret = this.sortArraybyTime(events[today])
      return ret;
    }
    return null;
  }

  selectDay = (day) => {
    const { selectedYear, selectedMonth} = this.state;
    const dayView = {}
    const today = `${selectedYear}${(moment().month(selectedMonth).format("M"))}${day}`
    dayView.events = this.getDayEvents(day)
    dayView.events = this.getDayEvents(day)
    dayView.today = today
    this.setState({dayView, selectedDay: day})
    this.resetEditViewComponent()
  }

  resetEditViewComponent = () => {
    this.setState({editViewKey: Math.random()})
  }

  renderCells = () => {
    const { numberOfCells, selectedMonth, selectedYear } = this.state;
    const cellArray = []
    const startingDay = moment(`${selectedYear}-${selectedMonth}-1`).format('dddd');
    const endDay = moment(`${selectedYear}-${selectedMonth}-${numberOfCells}`).format('dddd');
    const arrLength =  this.days.length;
    const numberOfPrevMonthDays = moment(`${selectedYear}-${selectedMonth}-1`).daysInMonth()

    for (let i = 0; i < arrLength; i++) {
      if (startingDay !== this.days[i]) {
        cellArray.unshift(
          {
            dayName: numberOfPrevMonthDays - i,
            currentMonth: false,
            weekend: this.isWeekend(numberOfPrevMonthDays - i, -1),
            events: false,
          }
        );
      } else {
        break;
      }


    }

    for (let i = 1; i <= numberOfCells; i++) {
      cellArray.push({
        dayName: i,
        currentMonth: true,
        weekend: this.isWeekend(i),
        events: this.getDayEvents(i),
        onClick: this.selectDay
      })
    }

    for (let i = 1; i < arrLength; i++) {
      if (endDay !== this.days[arrLength - i]){
        cellArray.push({
          dayName: i,
          currentMonth: false,
          weekend: this.isWeekend(i, +1),
          events: false
        })
      } else break;
    }

    return cellArray.map((i) => {
      return (
        <Cell key={Math.random()} events={''} dayOject={i} />
      )
    })
  }

  changeDate = (delta) => {
    const { date } = this.state;

    const newDate = date.add(delta, 'M')

    this.setState({

      numberOfCells: newDate.daysInMonth(),
      selectedMonth: newDate.format('MMMM'),
      selectedDay: newDate.date(),
      selectedYear: newDate.year(),
    })
   
  }

  render() {
    const { dayView, editViewKey,selectedMonth, selectedYear } = this.state;
    return (
      <div className="calendar-layout">
        <div className="calendar-wrapper">
          <div className="control-bar">
            <Button text="Previuos" onClick={() => this.changeDate(-1)}/>
            <Text size={BG} >{selectedMonth} - {selectedYear}</Text>
            <Button text="Next" onClick={() => this.changeDate(+1)}/>
          </div>
          <div className="title-bar">
            {this.renderDayTitles()}
          </div>
          <div className="calendar-body">
            {this.renderCells()}
          </div>
        </div>
        {
          console.log(dayView)
        }
        <EditView
          deleteEvent={this.deleteEvent}
          key={editViewKey}
          dayView={dayView}
          updateEvent={this.updateEvent}
          />
      </div>
    )
  }
}
