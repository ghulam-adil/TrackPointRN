import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

const { height, width } = Dimensions.get('window');

class CustomMarker extends Component {

    state = {
        visible: false
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ visible: true })
        }, this.props.wait);
    }

    handleMarker(vehiclestatus){

        if(vehiclestatus == 'Parked')
        {
            return (
                <View>
                    <Image style={styles.imageStyle} source={require('../../assets/markers/parked.png')} />
                </View>
            );
        }
        else if(vehiclestatus == 'Moving')
        {
            return(
                <View>
                    <Image style={styles.imageStyle} source={require('../../assets/markers/moving.png')} />
                </View>
            );
            
        }
        else
        {
            return(
                <View>
                    <Image style={styles.imageStyle} source={require('../../assets/markers/idle.png')} />
                </View>
            );
        }
    }

    render() {
        return(
            <View>

                {
                    this.state.visible && 

                    <Marker
                        coordinate = {{
                            latitude: this.props.value.Latitude,
                            longitude: this.props.value.Longitude
                        }}
                        flat
                        rotation={this.props.value.VehicleStatus == 'Moving' ? this.props.value.Angle : null}
                        // title = {value.VehicleRegistrationNumber}
                    >

                        {
                            this.handleMarker(this.props.value.VehicleStatus)
                        }

                    </Marker>
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    imageStyle: {
        height: height * 0.06, width: height * 0.06
    },
});

export default CustomMarker;