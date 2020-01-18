import React, { Component } from 'react'
import Text from '../UI/Text'
import './Calendar.scss'
import moment from 'moment'
import Cell from './cell/Cell';

export default class Calendar extends Component {
  constructor() {
    super();
    this.events = {};
    this.days = ['Sunday','Monday','Tuesday','Wednesday','thursday','Friday','Saturday']
    this.state = {
      numberOfCells: moment().daysInMonth(),
      selectedMonth: moment().format('MMMM'),
      selectedDay: moment().date(),
      selectedYear: moment().year(),
      
    };
  }
  componentDidMount() {
    this.events = {
    }
    // console.log( moment().format('YY-MM-DD'))
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
    return []
  }

  renderCells = () => {
    const { numberOfCells, selectedMonth, selectedYear } = this.state;
    const cellArray = []
    const startingDay = moment(selectedYear+'-' +selectedMonth+'1').format('dddd');
    const endDay = moment(selectedYear+'-' +selectedMonth+'-'+numberOfCells).format('dddd');
    const arrLength =  this.days.length;
    const numberOfPrevMonthDays = moment(selectedYear+'-' +selectedMonth+'1').daysInMonth()
    
    for (let i = 0; i < arrLength; i++) {
      if (startingDay !== this.days[i]) {
        cellArray.unshift(
          {
            dayName: numberOfPrevMonthDays - i,
            currentMonth: false,
            weekend: this.isWeekend(numberOfPrevMonthDays - i, -1),
            events: []
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
        events: this.getDayEvents(i)
      })
    }

    for (let i = 1; i < arrLength; i++) {
      if (endDay !== this.days[arrLength - i]){
        cellArray.push({
          dayName: i,
          currentMonth: false,
          weekend: this.isWeekend(i, +1),
          events: []
        }) 
      } else break;
    }
    
    return cellArray.map((i) => {
      return (
        <Cell key={Math.random()} events={''} dayOject={i} />
      )
    })
  }

  render() {
    return (
      <div className="calendar-wrapper">
        <div className="title-bar">
          {this.renderDayTitles()}
        </div>
        <div className="calendar-body">
          {this.renderCells()}
        </div>
      </div>
    )
  }
}
