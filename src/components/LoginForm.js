import React,{Component} from 'react';
import {View,Text} from 'react-native';
import firebase from '@firebase/app';
import '@firebase/auth';

import { Button, Card, CardSection, Spinner, Input } from './common'

class LoginForm extends Component {
  state = {email:'', password:'', error:'', isLogging:false};

  constructor (props){
    super(props);
    this.onLoginButtonClick = this.onLoginButtonClick.bind(this);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginError = this.onLoginError.bind(this);
  }

  onLoginError(){
    this.setState({error:'Authentication Error', isLogging:false});
  }

  onLoginSuccess(){
    this.setState({email:'', password:'', error:'', isLogging:false});
  }


  onLoginButtonClick(){
    const {email, password} = this.state;
    this.setState({isLogging:true});
    this.setState({error:''});
    firebase.auth().signInWithEmailAndPassword(email, password)//Tenta logar
      .then( (user)=>{
        this.onLoginSuccess();
      })
      .catch( (error) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)//O usuário não existe, vou tentar criá-lo
          .then( (user)=>{
            this.onLoginSuccess();
          })
          .catch( (error)=>{
            this.onLoginError();
          })
      })
  }

  renderButton() {
    if(this.state.isLogging){
      return <Spinner size='small'/>
    }else{
      return (
        <Button onPress={this.onLoginButtonClick}>
          <View style={{alignItems:'center'}}>
            <Text style={{fontSize:18}}>Log In</Text>
          </View>
        </Button>
      )
    }
  }

  render(){
    return(
      <Card>
        <CardSection>
          <Input
            label="Email"
            value={this.state.email}
            onChangeText={inputText=>this.setState({email:inputText})}
            placeholder="user@email.com"
          />
        </CardSection>
        <CardSection>
          <Input
            label="Password"
            value={this.state.password}
            onChangeText={inputText=>this.setState({password:inputText})}
            placeholder="password"
          />
        </CardSection>
        <CardSection>
          {this.renderButton()}
        </CardSection>
        <Text style={{color:'red', fontSize:18}}>{this.state.error}</Text>
      </Card>
    );
  }
}

export default LoginForm;