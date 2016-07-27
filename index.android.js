/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
require("react-native-azure-ad")


import {ReactNativeAD, ADLoginView, Logger} from 'react-native-azure-ad';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
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


class AwesomeProject extends Component {
    constructor(props) {
        super(props)
        new ReactNativeAD(config)
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
        //log.error(cred)
        Alert.alert(
          'Login succeeded!',
          'Login succeeded!',
          [
            {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]
        )
        console.log(cred)
      }
}

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
