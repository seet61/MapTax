import React, { Component } from "react";
import {
	Dimensions, Text, View, Button, StyleSheet, TouchableOpacity
} from 'react-native';
import { Header, Icon } from 'react-native-elements'
var {height, width} = Dimensions.get('window');

import MapView from 'react-native-maps';

const ASPECT_RATIO = width / height;
const LATITUDE = 46.4764;
const LONGITUDE = 41.5884;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

function log(eventName, e) {
  console.warn(eventName, e.nativeEvent);
}

export default class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    drawerLabel: 'Карта',
    drawerIcon: ({ tintColor }) => (
      <Icon name='add-circle' />
    ),
  });

  constructor(props) {
    super(props);

    this.state = {
      a: {
        latitude: LATITUDE,
	    longitude: LONGITUDE,
	    error: null,
      },
      b: {
        latitude: null,
      	longitude: null,
      	error: null,
      },
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          a: {
          	latitude: position.coords.latitude,
          	longitude: position.coords.longitude,
          	error: null,
          }
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
  	const { navigate } = this.props.navigation;
    return (
      	<View style={styles.container}>
	        <MapView
	          provider={this.props.provider}
	          style={styles.map}
	          showsUserLocation={true}
	          followsUserLocation={true}
	          showsMyLocationButton={true}
	          showsCompass={true}
	          zoomEnabled={true}
	          initialRegion={{
	            latitude: this.state.a.latitude,
	            longitude: this.state.a.longitude,
	            latitudeDelta: LATITUDE_DELTA,
	            longitudeDelta: LONGITUDE_DELTA,
	          }}
	        >
	          <MapView.Marker
	            coordinate={this.state.a}
	            onDragEnd={(e) => log('onDragEnd', e)}
	            draggable
	          />
	        </MapView>
	        <View style={styles.container_button}>
		       <TouchableOpacity
		         style={styles.button}
		         onPress={() => this.props.navigation.navigate('DrawerOpen')}
		       >
		         <Icon name='menu' />
		       </TouchableOpacity>
		    </View>
	    </View>
    );
  }
}

const styles = StyleSheet.create({
  container_button: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  button: {
  	flex: 1,
  	flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

