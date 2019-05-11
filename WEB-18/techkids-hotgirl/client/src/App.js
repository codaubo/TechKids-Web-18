import React, { Component } from 'react';
import './App.css';
import { Header } from './components/Header';
import firebase from 'firebase';

class App extends Component {
  state = {
    loginModalVisible: false,
    registerModalVisible: false,
    loginInfo: {
      username: '',
      password: '',
    },
    authUser: {},
  };

  componentDidMount () {
    firebase.initializeApp({
      apiKey: "AIzaSyDkrZixpqCxLrKXa1IkswCqootv-58zcG0",
      authDomain: "techkids-hotgirl-cfe22.firebaseapp.com",
      databaseURL: "https://techkids-hotgirl-cfe22.firebaseio.com",
      projectId: "techkids-hotgirl-cfe22",
      storageBucket: "techkids-hotgirl-cfe22.appspot.com",
      messagingSenderId: "827738647066",
    });

    const userId = window.localStorage.getItem('userId');
    const username = window.localStorage.getItem('username');

    this.setState({
      authUser: {
        userId,
        username,
      },
    });
  }

  toggleLogin = () => {
    this.setState({
      loginModalVisible: !this.state.loginModalVisible,
    });
  }

  loginInfoChange = (newLoginInfo) => {
    this.setState({
      loginInfo: {
        ...this.state.loginInfo,
        ...newLoginInfo,
      },
    });
  }

  loginSubmit = async () => {
    // validate form
    if (!this.state.loginInfo.username || !this.state.loginInfo.password) {
      window.alert('Please input username and password');
    } else {
      // fetch to api server
      try {
        const result = await fetch(`http://localhost:3001/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state.loginInfo),
        }).then((res) => res.json());

        // success => update UI
        if (!result.success) {
          window.alert(result.message);
        } else {
          window.localStorage.setItem('userId', result.userId);
          window.localStorage.setItem('username', result.username);
          this.toggleLogin();
          this.setState({
            authUser: {
              userId: result.userId,
              username: result.username,
            },
          });
        }
      } catch (error) {
        console.log(error);
        window.alert(error.message);
      }
    }
  }

  loginWithFacebook = async () => {
    try {
      const facebookProvider = new firebase.auth.FacebookAuthProvider();
      const result = await firebase.auth().signInWithPopup(facebookProvider);
      const idToken = await result.user.getIdToken();

      const verifyTokenResult = await fetch(`http://localhost:3001/api/auth/facebookOauth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idToken,
        }),
      }).then((res) => res.json());
      console.log(verifyTokenResult);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="App">
        <Header
          loginModalVisible={this.state.loginModalVisible}
          login={{
            username: this.state.loginInfo.username,
            password: this.state.loginInfo.password,
            toggle: this.toggleLogin,
            loginInfoChange: this.loginInfoChange,
            submitForm: this.loginSubmit,
            loginWithFacebook: this.loginWithFacebook,
          }}
          authUser={this.state.authUser}
        />
      </div>
    );
  }
}

export default App;
