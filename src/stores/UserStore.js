import { extendObservable } from 'mobx';

export default class UserStore {
  constructor() {
    extendObservable(this, {
      username: "",
      token: "",
      admin: false,
      loggedIn: false,
      _id: ""
    });
    this.addUserToDatabase = this.addUserToDatabase.bind(this);
    this.authenticateUser = this.authenticateUser.bind(this);

  }


    logUserOut() {
      this.token = "";
      this.username = "";
      this.loggedIn = false;
      this.admin = false;
      this._id = "";
    }

    addUserToDatabase(user){
      // user.preventDefault();
      fetch('/api/user', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: user.name,
          password: user.password
        })
      })
      .then(result => result.json()).then(res => {
        this.username = res.name;
      });
    }

    authenticateUser(user) {
      console.log(user.username + " " + user.password);
      fetch('/api/authenticate', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: user.username,
          password: user.password
        })
      })
      .then(result => result.json())
      .then( res => {
        console.log(res);
        if(res.token){
          this.token = res.token;
          this.username = user.username;
          this.loggedIn = true;
          this._id = res._id;
        }
        else{
          this.loggedIn = false;
          this.name = "";
        }
      });
    }
  }
