import React from 'react';
import io from 'socket.io-client';
import './App.css';
import ChatWindow from './ChatWindow';
import Login from './Login';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      loggedIn: false,
    }
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin = (userName, bool) => {
    this.setState({
      userName: userName,
      loggedIn: bool
    })
  }

  render() {
    const socket = io('http://3.120.96.16:3000');


    let element;

    if (this.state.loggedIn === false) {
      element = <Login onLogin={this.onLogin} />;

    } else if (this.state.loggedIn) {
      element = <ChatWindow socket={socket} onLogin={this.onLogin} username={this.state.userName}></ChatWindow>;
    }
    return (
      <section className="moac">
        <div className="App">
          {element}
        </div>
      </section>
    );
  }
}

export default App;