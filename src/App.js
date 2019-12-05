import React, { Component } from 'react';
import loginTransparency1 from './assets/transparency.png'
import loginTransparency2 from './assets/transparency_2.png'
import './App.scss';
const styles = {

}

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
        <div className='login-container'>olah</div>
      </MainContainer>
    )
  }

  renderDashboard = () => {
    return (
      <MainContainer>
        <>hola</>
      </MainContainer>
    )
  }

  render() {
    const { login } = this.state;
    if (login) return this.renderLogin()
    return this.renderDashboard()
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