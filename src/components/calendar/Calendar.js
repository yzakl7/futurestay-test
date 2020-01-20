import React, { Component } from 'react'
import Text from '../UI/Text'
import './Calendar.scss'
import moment from 'moment'
import Cell from './cell/Cell';
import EditView from './editView/EditView';
import { BG2 } from '../../constants/layout';
import Button from '../UI/Button';

export default class Calendar extends Component {
  constructor() {
    super();
    this.events = {};
    this.days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
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
    console.clear();
  }
  updateEvent = (updatedEvent) => {
    const { events, dayView, selectedDay } = this.state;
    const { index, today,
      city,
      endAt,
      eventId,
      eventName,
      startAt,
      color,
      weather,
      icon
    } = updatedEvent;
    const newEvents = { ...events };
    const newDayView = { ...dayView };
    if (!newEvents[today]){
      newEvents[today] = []
    }
    if ( index !== undefined ) {
      newEvents[today][index] = {
        city,
        endAt,
        eventId,
        eventName,
        startAt,
        color,
        weather,
        icon
      }
    } else {
      newEvents[today].push({
        city,
        endAt,
        eventId,
        eventName,
        startAt,
        color,
        weather,
        icon
      })
    }
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
    const {selectedDay} = this.state;
    this.setState((prev) => {
      const newState = { ...prev }
      if (eventIndex !== undefined){
        newState.events[eventDay].splice(eventIndex, 1)
      } else {
        newState.events[eventDay] = []
        this.selectDay(selectedDay)
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
          <Text color="white" fontSize={'bolder'}>{day}</Text>
        </div>
      )
    })
  }

  isWeekend = (day, monthDelta) => {
    const { date } = this.state;
    const newDate = new moment(date)
    const selectedDate =  newDate.add(monthDelta, 'M')
    const month = selectedDate.format('MMMM')
    const year = selectedDate.format('YYYY')
    const selectedDay = moment(`${year}-${month}-${day}`).format('dddd')
    if ( selectedDay === 'Saturday' || selectedDay === 'Sunday') return true;
    return false

  }

  getDayEvents = (day) => {
    const { selectedYear, selectedMonth, events} = this.state;
    if (events) {
      const today = `${selectedYear}${selectedMonth}${day}`
      const ret = this.sortArraybyTime(events[today])
      return ret;
    }
    return null;
  }

  selectDay = (day) => {
    const { selectedYear, selectedMonth} = this.state;
    const dayView = {}
    const today = `${selectedYear}${selectedMonth}${day}`
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
    const { numberOfCells, selectedMonth, selectedYear, date, selectedDay } = this.state;
    const newDate = new moment(date)
    const cellArray = []
    const startingDay = moment(`${selectedYear}-${selectedMonth}-1`).format('dddd');
    const endDay = moment(`${selectedYear}-${selectedMonth}-${numberOfCells}`).format('dddd');
    const arrLength =  this.days.length;
    const numberOfPrevMonthDays = newDate.add(-1, 'M').daysInMonth()
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
        selected: i === selectedDay,
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
      dayView:'Nada seleccionado',
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
            <Button icon={<Text style={{marginTop: '-5px'}}>‹</Text>} onClick={() => this.changeDate(-1)}/>
            <Text fontSize={BG2} >{selectedMonth} - {selectedYear}</Text>
            <Button icon={<Text style={{marginTop: '-5px'}}>›</Text>} onClick={() => this.changeDate(+1)}/>
          </div>
          <div className="title-bar">
            {this.renderDayTitles()}
          </div>
          <div className="calendar-body">
            {this.renderCells()}
          </div>
        </div>
        {
          dayView !== 'Nada seleccionado' ? (
            <EditView
              deleteEvent={this.deleteEvent}
              key={editViewKey}
              dayView={dayView}
              updateEvent={this.updateEvent}
            />
          ) : (<Text>{dayView}</Text>)
        }
      </div>
    )
  }
}
