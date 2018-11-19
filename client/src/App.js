import React, { Component } from 'react';
import './App.css';
import io from "socket.io-client";

const socket = io("http://localhost:3001");

class Registration extends React.Component {

  state = {
    username: ""
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.setUser(this.state.username)

  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        
        <input type="text" placeholder="Username" value={this.state.username} onChange={e => this.setState({username: e.target.value})}/>
        <input type="submit" value="Enter Chat" />
      </form>
    )
  }
}


class ChatRoom extends React.Component {

  

  state = {
    users: []
  }

  componentDidMount() {
    socket.on("user", user => {
      console.log("new user " + user)
      this.setState({ users: [...this.state.users, user]})
      
    })
  }

  render() {
    const { backToHome, user,  } = this.props;
    const { users }  = this.state;
    return (
      <div>
        <h4>Hello {user}</h4>
        <form>
          <input type="text" placeholder="Your chat message" />
          <input type="submit" value="Send" />
        </form>
        <button onClick={backToHome}>Back to Home</button>
        <div style={{
          width: 150,
          height: 800,
          backgroundColor: "#eee",
          position: "fixed",
          right: 0
        }}>
        {users.map(user => <p key={user}>{user}</p>)}
        </div>
      </div>
    )
  }
  
}



class App extends Component {

  state = {
    user: "",
    
  }



  

  setUser = (user) => {
    
      
    socket.emit("user", user)
    this.setState({ user })
    
    
  }

  backToHome = () => {
    this.setState({ user: ""})
  }

  render() {

    
    

    return (
      <div className="App">
        { !this.state.user && <Registration setUser={this.setUser} />}
        { this.state.user && <ChatRoom user={this.state.user} backToHome={this.backToHome}  />  }
      </div>
    );
  }
}

export default App;
