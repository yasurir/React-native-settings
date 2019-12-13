import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Switch
} from 'react-native';
import { Card, Text, ButtonGroup, Button } from 'react-native-elements';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-community/async-storage';


const SHOW_NOTIFICATIONS_KEY = 'notifications';

//const AGE_KEY = 'age';

export default class Home extends Component {

  state = {
    showNotifications: false,
    //age: 18
  }


  static navigationOptions = ({ navigation }) => {
    console.log(navigation);

    const navigationParams = navigation.state.params;

    return {
      title: 'Settings',
      headerTintColor: 'white',
     
    }
  }

  componentDidMount() {
    //this.props.navigation.setParams({ colors: this.colors });
    this.loadAsyncData();
  }

  loadAsyncData = async () => {
    try {
      const showNotifications = await AsyncStorage.getItem(SHOW_NOTIFICATIONS_KEY)
      if (showNotifications !== null) {
        this.setState({ showNotifications: JSON.parse(showNotifications) });
      }
    } catch (e) {
      console.log(e)
    }

}

storeNotification = async (key, showNotifications) => {
    try {
      await AsyncStorage.setItem(SHOW_NOTIFICATIONS_KEY, JSON.stringify(showNotifications))
      this.setState({ showNotifications });
    } catch (e) {
      console.log(e);
    }
  }


  /* restoreDefaults = () => {
    this.storeNotification(SHOW_NOTIFICATIONS_KEY, false);
    //this.storeThemeColors(THEME_COLOR_KEY, 0);
    //this.storeAge(AGE_KEY, 18);
  } */

  render() {
   
    console.disableYellowBox = true;
    return (
      <View style={styles.container}>
        <Card containerStyle={styles.card} title='Notifications' >
          <View style={styles.row}>
            <Text style={{ fontSize: 16 }}>Show Notifications</Text>
            <Switch
              style={{ marginLeft: 16 }}
              
              thumbColor='white'
              value={this.state.showNotifications}
              onValueChange={(showNotifications) => {
                this.storeNotification(SHOW_NOTIFICATIONS_KEY, showNotifications);
                console.log(showNotifications)
              }}
            />
          </View>
        </Card>
      
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#D0D3D4'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonGroup: {
    height: 60,
    width: 300
  },
  buttonGroupText: {
    fontSize: 18,
    color: 'white'
  },
  slider: {
    width: 250,
    marginLeft: 16
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#EAECEE',
    borderColor: '#ABB2B9',
    borderWidth: 0.3,
    width: '90%',
  },
  restoreButtonContainer: {
    margin: 32
  }
});