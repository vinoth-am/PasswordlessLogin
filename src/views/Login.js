import React, {Component} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
import Auth0 from 'react-native-auth0';
import {clientId, domain} from '../../cred.json';

const auth0 = new Auth0({
  clientId,
  domain,
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
    };
  }

  componentDidMount() {
    this.login();
  }
  login = () => {
    auth0.webAuth
      .authorize({
        scope: 'openid profile email',
      })
      .then(credentials => {
        this.setState({accessToken: credentials.accessToken});
      })
      .catch(error => {
        console.log('login error', error);
      });
  };

  logout = () => {
    auth0.webAuth
      .clearSession({})
      .then(success => {
        this.setState({accessToken: null, logoutError: null}, () =>
          this.login(),
        );
      })
      .catch(error => {
        console.log('Log out cancelled', error);
      });
  };

  render() {
    const {accessToken} = this.state;

    return (
      <View style={styles.container}>
        {accessToken && (
          <>
            <Image
              style={styles.img}
              source={require('./assert/success.png')}
            />
            <Text style={styles.title}>Welcome you are logged in. </Text>
            <Button color="green" onPress={this.logout} title="Log Out" />
          </>
        )}
        {!accessToken && (
          <>
            <ActivityIndicator />
            <Text>Loading.......</Text>
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  img: {
    width: 150,
    height: 150,
  },
  btn: {
    backgroundColor: 'green',
  },
  title: {padding: 40},
});

export default App;
