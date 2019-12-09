import React, { Component } from 'react';
import loginTransparency1 from './assets/transparency.png'
import loginTransparency2 from './assets/transparency_2.png'
import formLogo from './assets/form_logo.png'
import emailIcon from './assets/email_icon.png'
import passwordIcon from './assets/password_icon.png'
import topbarLogo from './assets/topbar_logo.png'
import homeIcon from './assets/home_icon.png'
import propertiesIcon from './assets/properties_icon.png'
import ratesIcon from './assets/rates_icon.png'
import connectionsIcon from './assets/connections_icon.png'
import reservationsIcon from './assets/reservations_icon.png'
import webbuilderIcon from './assets/webbuilder_icon.png'
import settingsIcon from './assets/settings_icon.png'
import smartConnectionsIcon from './assets/smartconnections_icon.png'
import upcomingScheduleIcon from './assets/upcomingschedule_icon.png'
import behanceLogo from './assets/behance_logo.png'
import vLogo from './assets/v_logo.png'
import airbnbLogo from './assets/airbnb_logo.png'
import screenLogo from './assets/screen_logo.png'
import checkIcon from './assets/check_icon.png'
import smileyIcon from './assets/smiley_icon.png'
import creditCardIcon from './assets/creditcard_icon.png'
import dateIcon from './assets/date_icon.png'
import moneyIcon from './assets/money_icon.png'
import clockIcon from './assets/clock_icon.png'


import './App.scss';

export default class App extends Component {
  constructor() {
    super();
    this.state = { login: true };
  }

  renderLogin = () => {
    return (
      <MainContainer>
        <BackgroundImage src={loginTransparency1} />
        <BackgroundImage src={loginTransparency2} />
        <div className='login-container'>
          <LoginForm onSubmit={this.login} />
        </div>
      </MainContainer>
    )
  }

  login = () => {
    this.setState({ login: false })
  }

  renderDashboard = () => {
    return (
      <MainContainer>
        <TopBar />
        <Dashboard />
      </MainContainer>
    )
  }

  render() {
    const { login } = this.state;
    return (
      <>
        <div
          className="login-modal"
          style={{
            visibility: login ? "visible" : "hidden",
            opacity: login ? 1 : 0,
          }}
        >
          {this.renderLogin()}
        </div>
        {!login && this.renderDashboard()}
      </>
    )
  }
}

function MainContainer(props) {
  const { children } = props;
  return (
    <div className="main-container">{children}</div>
  );
}

function BackgroundImage(props) {
  const { src, backgroundPosition } = props;
  return (
    <div
      className="background-image"
      style={{
        backgroundImage: `url(${src})`,
        backgroundPosition

      }}
    />
  )
}

function Image(props) {
  const { src, backgroundPosition, height, width, style } = props;
  const backgroundImage = `url(${src})`;
  return (
    <div
      className="image"
      style={{
        ...style, height,
        backgroundImage,
        backgroundPosition,
        width
      }}
    />
  )
}

function Icon(props) {
  const { src, backgroundPosition, height, width, style } = props;
  const backgroundImage = `url(${src})`;
  return (
    <div
      className="icon"
      style={{
        ...style, height,
        backgroundImage,
        backgroundPosition,
        width
      }}
    />
  )
}

function LoginForm(props) {
  return (
    <div className="login-form-container">
      <Image src={formLogo} height={40} backgroundPosition={'center'} />
      <Input placeHolder="Email address" icon={emailIcon} type="email" />
      <Input placeHolder="Password" icon={passwordIcon} type="email" />
      <Input label="Log in" action={props.onSubmit} type="button" />
      <Link color="#FEF3A2">Forgot your password?</Link>
      <Link color="white">Don't have a free account yet?</Link>
      <Input label="Sign up now" action={() => { }} type="button" buttonType="outlined" />
      {/* <Button type text="Log in"/> */}
    </div>
  )
}

function Input(props) {
  const { placeHolder, icon, type, buttonType, label, action } = props;
  const iconStyle = {
    marginLeft: 10
  }
  if (type !== "button") {
    return (
      <div className="input-div">
        <Icon src={icon} width={45} backgroundPosition={'center'} style={iconStyle} />
        <input
          type={type}
          placeholder={placeHolder}
        />
      </div>
    )
  }
  return (
    <button
      type="button"
      className={buttonType}
      onClick={() => action()}
    >{label}</button>
  )
}

function Link(props) {
  const { children, color } = props;
  return <a href="link" className="login-link" style={{ color }}>{children}</a>
}

function TopBar(props) {
  return (
    <div className="top-bar">
      <Image src={topbarLogo} width={'100px'} height={'60px'} backgroundPosition={'top left'} />
      {renderButtons()}
      <div
        style={{
          display: 'flex',
          width: 200,
          justifyContent: 'flex-end'
        }}
        className="button-container">

        <Button icon={settingsIcon} label="Hi you!" inverted />
      </div>
    </div>
  );
}

function Button(props) {
  const { label, icon, selected, inverted } = props;
  return (
    <div className="button"
      style={{
        background: selected && "#EBF9FA",
        flexDirection: inverted && "row-reverse",
      }}
    >
      <Image
        backgroundPosition="center"
        src={icon} width={'20px'}
        height={'20px'}
      />
      <p>{label}</p>
    </div>
  )
}

const renderButtons = () => {
  return (
    <div className="button-container">
      <Button icon={homeIcon} label="Home" selected />
      <Button icon={propertiesIcon} label="Properties" />
      <Button icon={ratesIcon} label="Rates" />
      <Button icon={connectionsIcon} label="Connections" />
      <Button icon={reservationsIcon} label="Reservations" />
      <Button icon={webbuilderIcon} label="Web Builder" />
    </div>
  )

}

function Dashboard() {
  const recentActivityIcon = <div className="number-icon">14</div>
  const smartConnections = <Image src={smartConnectionsIcon} width={'30px'} height={'30px'} style={{ marginRight: '5px' }} />;
  const upcomingSchedule = <Image src={upcomingScheduleIcon} width={'20px'} height={'20px'} style={{ marginRight: '5px' }} />;
  return (
    <div className="dashboard-container" >
      <div className="top-container">
        <div className="left-container">
          <Card title={'Smart Connections'} icon={smartConnections} rightContent={'last 30 days'}>
            <div className="card-container">
              <div className="section top">
                <h3>Bookings</h3>
                <div className="bookings">
                  <Booking icon={behanceLogo} num={23} />
                  <Booking icon={vLogo} num={false} />
                  <Booking icon={airbnbLogo} num={36} />
                  <Booking icon={screenLogo} num={12} />
                </div>
              </div>
              <div className="card-bottom-container">
                <div className="section bottom-left">
                  <h3>Completed Tasks</h3>
                  <div className="tasks">
                    <Task icon={smileyIcon} title={'87'} text="Great Interactions" />
                    <Task icon={dateIcon} title={'132'} text="Number of Bookings" />
                    <Task icon={creditCardIcon} title={'52'} text="Proccessed Payment" />
                  </div>
                </div>
                <div className="section bottom-right">
                  <h3>Revenue</h3>
                  <div className="tasks">
                    <Task icon={moneyIcon} title={'32,568.00'} text="Total volume of Bookings" unchecked />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="right-container">
          <Card title={'Recent Activity'} icon={recentActivityIcon} rightContent={'View All Activity'}>
            <div className="recent-activity" >
              <div style={{ position: 'relative' }}>
                <div className="list">
                  <RecentActivity
                    title="You got paid!"
                    time="2:25"
                    text="Booking.com commission for Reservation #185 has been paid."
                  />
                  <RecentActivity
                    title="You got paid!"
                    time="2:25"
                    text="Booking.com commission for Reservation #185 has been paid."
                  />
                  <RecentActivity
                    title="You got paid!"
                    time="2:25"
                    text="Booking.com commission for Reservation #185 has been paid."
                  />
                  <RecentActivity
                    title="You got paid!"
                    time="2:25"
                    text="Booking.com commission for Reservation #185 has been paid."
                  />
                  <RecentActivity
                    title="You got paid!"
                    time="2:25"
                    text="Booking.com commission for Reservation #185 has been paid."
                  />
                  <RecentActivity
                    title="You got paid!"
                    time="2:25"
                    text="Booking.com commission for Reservation #185 has been paid."
                  />
                  <RecentActivity
                    title="You got paid!"
                    time="2:25"
                    text="Booking.com commission for Reservation #185 has been paid."
                  />
                  <RecentActivity
                    title="You got paid!"
                    time="2:25"
                    text="Booking.com commission for Reservation #185 has been paid."
                  />
                  <RecentActivity
                    title="You got paid!"
                    time="2:25"
                    text="Booking.com commission for Reservation #185 has been paid."
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="bottom-container">
        <Card title={'Upcoming Schedule'} icon={upcomingSchedule} rightContent={<ScheduleControls />}>
          <div className="schedule">
            <Event TODAY />
            <Event />
            <Event />
            <Event />
            <Event />
            <Event />
            <Event />
            <Event />
            <Event />
            <Event />
          </div>
        </Card>
      </div>
    </div>
  )
}

function Card(props) {
  const { title, icon, rightContent, children } = props;
  return (
    <>
      <div className="card-title-row">
        <div className="title">{icon}<h2>{title}</h2></div>
        {rightContent}
      </div>
      <div className="card">
        {children}
      </div>
    </>
  )

}

function Booking(props) {
  const { icon, num } = props;
  return (
    <div className="booking">
      <Image src={icon} width="30px" height="30px" />
      {
        num
          ? <p>{num}</p>
          : (
            <div className="pending-tag">
              <Image src={clockIcon} width="15px" height="15px" />
              <p>pending</p>
            </div>
          )
      }
    </div>
  );
}

function Task(props) {
  const { icon, title, text, unchecked } = props;
  return (
    <div className="task">
      <Image src={icon} width="15px" height="15px" />
      <div className="task-text">
        <div className="task-title">
          <h4>{title}</h4>
          {unchecked || <Image src={checkIcon} width="15px" height="15px" />}        </div>
        <p>{text}</p>
      </div>
    </div>
  );
}

function RecentActivity(props) {
  const { title, text, time } = props;
  return (
    <div className="list-element">
      <div className="task-text">
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
      <div className="hour">{time}</div>
    </div>
  )
}

function ScheduleControls() {
  return (
    <div className="controls">
      <div className="add-icon"><i>+</i></div>
      <p>Add Reservation</p>
      <div className="separator" />
      <p>Only busy days</p>
      <div className="control-buttons">
        <div className="control-button" >{"<"}</div>
        <div className="control-button" >{">"}</div>
      </div>
    </div>
  )
}

function Event(props) {
  const { TODAY } = props;
  return (
    <div className="event">
      <div className="event-row col1">
        <p>JAN</p>
        {TODAY && <span>TODAY</span>}
      </div>
      <div className="event-row col2">
        <p>MON 21</p>
      </div>
      <div className="event-row col3">
        <p>CHECK IN</p>
        <span><Image src={behanceLogo} width="10px" height="10px" /></span>
      </div>
      <p className="event-description"> The Washington Amelia Asimov</p>
    </div>
  )
}