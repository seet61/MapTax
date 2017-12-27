import React, { Component } from "react";
import {
	Text, View, Button, StyleSheet
} from 'react-native';
import { Header, Icon } from 'react-native-elements'

export default class MyNotificationsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Нотификации',
    drawerLabel: 'Нотификации',
    drawerIcon: ({ tintColor }) => (
      <Icon name='rowing' />
    ),
  });

  render() {
  	const { navigate } = this.props.navigation;
    return (
    	<View>
        <Header
          leftComponent={{ icon: 'menu', onPress: () => this.props.navigation.navigate('DrawerOpen'), backgroundColor: 'transparent' }}
        />
      	<Button
          onPress={() => this.props.navigation.goBack()}
          title="Назад к карте"
        />
      </View>
    );
  }
}
