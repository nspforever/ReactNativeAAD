/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {ReactNativeAD, ADLoginView, Logger} from 'react-native-azure-ad';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator  
} from 'react-native';

Logger.setLevel('VERBOSE')


const config = {
  client_id : 'e8517ba8-70b5-4ee9-9ef5-bd6dd344dcee',
  // redirectUrl : 'http://localhost:8080(optional)',
  // authorityHost : 'https://login.microsoftonline.com/<tenant id>/oauth2/authorize(optional)',
  // tenant  : 'common(optional)',
  // client_secret : 'client-secret-of-your-app(optional)',
  resources : [
    'https://graph.microsoft.com',
  ]
};

var PageOne = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Login Succeed!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <Text>Hello world!</Text>
      </View>
    );
  },
});


class LoginScene extends Component {
  constructor(props) {
      super(props)
      new ReactNativeAD(config)
  }
  
  getDefaultProps() {
    return {
      title: 'Login'
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ADLoginView context={ReactNativeAD.getContext(config.client_id)}
          needLogout={false}
          hideAfterLogin={true}
          onSuccess={this.onLoginSuccess.bind(this)}
        />
      </View>
    )
  }
  
  onLoginSuccess(cred) {      
    console.log('onLoginSuccess', cred)
    this.props.navigator.push({
      name: 'Home', // Matches route.name
    })
  }
}


class HomeScene extends Component {
  getDefaultProps() {
    return {
      title: 'Home'
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Login Succeed!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <Text>Hello world!</Text>
      </View>
    );
  }
}


class AwesomeProject extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Navigator
        initialRoute={{ name: 'Login', index: 0 }}
        renderScene= { this.renderScene }
      />
    )
  }
  
  renderScene(route, navigator) {
    if(route.name == 'Login') {
      return <LoginScene navigator={navigator} />
    }
    
    if(route.name == 'Home') {
      return <HomeScene navigator={navigator} />
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
