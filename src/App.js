import React, {Component} from 'react';
import firebase from '@firebase/app';
import '@firebase/auth';

import {View, Text} from 'react-native';
import LoginForm from './components/LoginForm';
import { Button, Card, CardSection, Header, Spinner } from './components/common'

class App extends Component {
  state = {loggedIn: null};

  constructor (props){
    super(props);
  }

  /*Na montagem do componente eu inicializo a app.*/
  componentWillMount(){
    //Essas configurações vêm do console do firebase, configuração de web app
    firebase.initializeApp( {
      apiKey: "VER NO CONSOLE DO FIREBASE",
      authDomain: "VER NO CONSOLE DO FIREBASE",
      databaseURL: "VER NO CONSOLE DO FIREBASE",
      projectId: "VER NO CONSOLE DO FIREBASE",
      storageBucket: "VER NO CONSOLE DO FIREBASE",
      messagingSenderId: "VER NO CONSOLE DO FIREBASE"
    } );
    console.log('Firebase app name = '+firebase.app().name);
    firebase.auth().onAuthStateChanged( (user) => {
      if(user){
        this.setState({loggedIn:true});
      }else{
        this.setState({loggedIn:false});
      }
    });
  }

  renderContent(){
    switch (this.state.loggedIn){
      case true:
        return(
          <Card>
            <CardSection>
              <Button onPress={ ()=>{firebase.auth().signOut()}}>
                <Text>Log Out</Text>
              </Button>
            </CardSection>
          </Card>
        );
      case false:
        return (<LoginForm/>);
      default:
        return <Spinner size="large"/>
    }
  }

  render(){
    return(
      <View>
        <Header headerText="Autenticação"/>
        {this.renderContent()}

      </View>
    )
  }
}

export default App;