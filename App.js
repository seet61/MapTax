import React from 'react';
import {
  Dimensions,
  Platform,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Switch,
} from 'react-native';
import MapView from 'react-native-maps';
import { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 47.2428;
const LONGITUDE = 39.7240;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

function log(eventName, e) {
  console.warn(eventName, e.nativeEvent);
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      a: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        error: null,
      },
      b: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
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
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

module.exports = App;