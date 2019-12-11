import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, AnimatedRegion, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

// import { NavigationActions  } from 'react-navigation';

import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Geolocation from '@react-native-community/geolocation';

// const backAction  = NavigationActions.back({ key: 'LiveLocation' });

var moment = require('moment');

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const whiteColor = '#fff';
const primaryColor = '#8BC34A';
const greenColor = 'green';
const grayColor = 'gray';

const ASPECT_RATIO = screenWidth / screenHeight;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const LATITUDE = 24.871975;
const LONGITUDE = 67.062559;

const timeout = 2000;
let animationTimeout;

class LiveLocation extends Component {

    // constructor() {
    //     this.mapRef = null;
    // }

    static navigationOptions = {
        // drawerLabel: () => null,
        header: null,
    }

    state = {
        heightOfHeader: null,
        latitude: LATITUDE,
        longitude: LONGITUDE,
        routeCoordinates: [],
        distanceTravelled: 0,
        prevLatLng: {},
        coordinate: new AnimatedRegion({
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: 0,
            longitudeDelta: 0
        }),
        mapType: 'standard',
        isSidebar: false,
        data: [],
        // markers: [],
        markers: [{
            title: 'hello',
            coordinates: {
              latitude: 3.148561,
              longitude: 101.652778
            },
          },
          {
            title: 'hello',
            coordinates: {
              latitude: 3.149771,
              longitude: 101.655449
            },  
          }],
        markerIDs: [],
        visible1: false,
        visible2: false,
        visible3: false,
        currentItem: '',
    }

    componentDidMount() {

        var data = this.props.navigation.state.params.data;

        console.log('this is map screen');
        console.log(data);

        // this.setState({ data });

        // console.log(this.state.data);

        var markerIds = [...this.state.markerIDs];

        data.map(value => {
            markerIds.push(value.VehicleRegistrationNumber)
        })

        console.log(markerIds);

        // this.mapRef.fitToSuppliedMarkers(
        //     markerIds,
        //     true, // not animated
        // );

        animationTimeout = setTimeout(() => {
            this.mapRef.fitToSuppliedMarkers(markerIds, true);
        }, timeout);

        this.setState({ markerIds, data });

        // console.log(markers);

        // this.state.markers.length > 0 ?
        // console.log(this.state.markers)
        // :
        // console.log('nothing');

        // const { coordinate } = this.state;

        // this.watchID = Geolocation.watchPosition(
        //     position => {
        //         const { routeCoordinates, distanceTravelled } = this.state;
        //         const { latitude, longitude } = position.coords;

        //         const newCoordinate = {
        //             latitude,
        //             longitude
        //         };

        //         if (Platform.OS === "android") {
        //             if (this.marker) {
        //                 this.marker._component.animateMarkerToCoordinate(
        //                     newCoordinate,
        //                     500
        //                 );
        //             }
        //         } else {
        //             coordinate.timing(newCoordinate).start();
        //         }

        //         this.setState({
        //             latitude,
        //             longitude,
        //             routeCoordinates: routeCoordinates.concat([newCoordinate]),
        //             distanceTravelled:
        //                 distanceTravelled + this.calcDistance(newCoordinate),
        //             prevLatLng: newCoordinate
        //         });
        //     },
        //     error => console.log(error),
        //     {
        //         enableHighAccuracy: true,
        //         timeout: 20000,
        //         maximumAge: 1000,
        //         distanceFilter: 10
        //     }
        // );
    }

    componentWillUnmount() {
        if (animationTimeout) {
            clearTimeout(animationTimeout);
        }
    }

    // componentWillUnmount() {
    //     navigator.geolocation.clearWatch(this.watchID);
    // }

    getMapRegion = () => ({
        latitude: this.state.data.length > 0 ? this.state.data[0].latitude : this.state.latitude,
        longitude: this.state.data.length > 0 ? this.state.data[0].longitude : this.state.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    });

    calcDistance = newLatLng => {
        const { prevLatLng } = this.state;
        return haversine(prevLatLng, newLatLng) || 0;
    };

    
    handleMarker(vehiclestatus, vrn){

        // var vehiclestatus = this.state.data.length > 0 ? this.state.data[0].vehiclestatus : null;

        if(vehiclestatus == 'Parked')
        {
            return (
                <View>
                    <Text style={{ backgroundColor: whiteColor }}>{vrn}</Text>
                    <Image style={styles.imageStyle} source={require('../../assets/markers/parked.png')} />
                </View>
            );
        }
        else if(vehiclestatus == 'Moving')
        {
            return(
                <View>
                    <Text style={{ backgroundColor: whiteColor }}>{vrn}</Text>
                    <Image style={styles.imageStyle} source={require('../../assets/markers/moving.png')} />
                </View>
            );
            
        }
        else
        {
            return(
                <View>
                    <Text style={{ backgroundColor: whiteColor }}>{vrn}</Text>
                    <Image style={styles.imageStyle} source={require('../../assets/markers/idle.png')} />
                </View>
            );
        }
    }

    handleClick (value) {
        console.log(value);
        this.setState({ visible1: !this.state.visible1, currentItem: value });
    }


    render(){
        return(

            <View>

                <View style={styles.header}
                    onLayout={(event) => {
                        var { x, y, width, height } = event.nativeEvent.layout;
                        this.setState({ heightOfHeader: height });
                        console.log('this is height of header ' + height);
                    }}
                >

                    <TouchableOpacity
                        onPress={() => { this.props.navigation.goBack() }}
                    >
                        <MaterialIcon name='arrow-back' size={24} color={whiteColor} />
                    </TouchableOpacity>

                    <View style={{ width: '80%' }}>
                        <Text style={styles.headerText}>Live Location - {this.props.navigation.state.params.data.length}</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => { this.setState({ isSidebar: !this.state.isSidebar }) }}
                    >
                        <MaterialIcon name='more-vert' size={26} color={whiteColor} />
                    </TouchableOpacity>

                </View>

                <MapView
                    style={{ height: screenHeight - this.state.heightOfHeader }}
                    provider={PROVIDER_GOOGLE}
                    ref={(ref) => { this.mapRef = ref }}
                    // showUserLocation
                    // followUserLocation
                    initialRegion={this.getMapRegion()}
                    // initialRegion={{
                    //     latitude: this.state.latitude,
                    //     longitude: this.state.longitude,
                    //     latitudeDelta: 0.2,
                    //     longitudeDelta: 0.2,
                    // }}
                    mapType={this.state.mapType}
                    onStartShouldSetResponder={() => { this.setState({ isSidebar: false }) }}
                >

                    {this.state.data[0] != null && this.state.data.map((value, index) => (
                                <MapView.Marker
                                    key = {index}
                                    coordinate = {{
                                        latitude: value.latitude,
                                        longitude: value.longitude
                                    }}
                                    identifier={value.VehicleRegistrationNumber}
                                    // title = {value.VehicleRegistrationNumber}
                                    onPress={() => this.handleClick(value)}
                                >
                                    {/* <MapView.Callout tooltip style={styles.customView}>
                                      <TouchableHighlight onPress= {()=>this.markerClick()} underlayColor='#dddddd'>
                                          <View style={styles.calloutText}>
                                              <Text>{marker.title}{"\n"}{marker.description}</Text>
                                          </View>
                                      </TouchableHighlight>
                                    </MapView.Callout> */}

                                    {
                                        this.handleMarker(value.vehiclestatus, value.VehicleRegistrationNumber)
                                    }

                                </MapView.Marker>
                            ))
                    }

                </MapView>



                <Dialog
                    visible={this.state.visible1}
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                    onTouchOutside={() => {
                        this.setState({ visible1: false });
                    }}
                >
                    <DialogContent>
                        <View style={{ width: screenWidth * 0.82, }}>
                            
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalHeading}>Select Option</Text>
                            </View>

                            <View style={{ marginVertical: screenHeight * 0.02 }}>

                                <TouchableOpacity style={styles.item}
                                    onPress={() => { this.setState({ visible1: !this.state.visible1, visible2: !this.state.visible2 }) }}
                                >
                                    <View style={styles.iconContainer}>
                                        <Image source={require('../../assets/livelocationldpi.png')}  
                                            style={{ width: screenHeight * 0.035, height: screenHeight * 0.035, tintColor: 'gray' }}
                                        />
                                    </View>
                                    <Text>Location Details</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.item}
                                    onPress={() => { this.setState({ visible1: !this.state.visible1, visible3: !this.state.visible3 }) }}
                                >
                                    <View style={styles.iconContainer}>
                                        {/* <Image source={require('../../assets/livelocationldpi.png')}  
                                            style={{ width: screenHeight * 0.035, height: screenHeight * 0.035, tintColor: 'gray' }}
                                        /> */}
                                        <MaterialIcon name='person' size={24} color={grayColor} />
                                    </View>
                                    <Text>Driver Details</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </DialogContent>
                </Dialog>


                <Dialog
                    visible={this.state.visible2}
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'top',
                    })}
                    onTouchOutside={() => {
                        this.setState({ visible2: false });
                    }}
                >
                    <DialogContent>
                        <View style={{ width: screenWidth * 0.82, }}>
                            
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalHeading}>Location Details</Text>
                            </View>

                            <View style={{ marginVertical: screenHeight * 0.02 }}>

                                <View style={styles.detailsItem}>
                                    <Text style={styles.title}>VRN</Text>
                                    <Text>{this.state.currentItem.VehicleRegistrationNumber}</Text>
                                </View>

                                <View style={styles.detailsItem}>
                                    <Text style={styles.title}>Speed</Text>
                                    <Text>{this.state.currentItem.speed}</Text>
                                </View>

                                <View style={styles.detailsItem}>
                                    <Text style={styles.title}>Time Ago</Text>
                                    <Text>{moment(this.state.currentItem.ReceiveDateTime).fromNow()}</Text>
                                </View>

                                <View style={styles.detailsItem}>
                                    <Text style={styles.title}>Vehicle Status</Text>
                                    <Text>{this.state.currentItem.vehiclestatus}</Text>
                                </View>

                                <View style={styles.detailsItem}>
                                    <Text style={styles.title}>Ignition</Text>
                                    <Text>{this.state.currentItem.VehicleRegistrationNumber}</Text>
                                </View>

                                <View style={styles.detailsItem}>
                                    <Text style={styles.title}>Alarms</Text>
                                    <Text>{this.state.currentItem.vehiclestatus}</Text>
                                </View>

                                <View style={styles.detailsItem}>
                                    <Text style={styles.title}>Lat, Lng</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text>{this.state.currentItem.latitude}, </Text>
                                        <Text>{this.state.currentItem.longitude}</Text>
                                    </View>
                                </View>

                            </View>

                        </View>
                    </DialogContent>
                </Dialog>



                <Dialog
                    visible={this.state.visible3}
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'top',
                    })}
                    onTouchOutside={() => {
                        this.setState({ visible3: false });
                    }}
                >
                    <DialogContent>
                        <View style={{ width: screenWidth * 0.82, }}>
                            
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalHeading}>Driver Details</Text>
                            </View>

                            <View style={{ marginVertical: screenHeight * 0.01, flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={styles.imageStyle} source={require('../../assets/avatar.png')} />
                                <View style={{ margin: screenHeight * 0.03, }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: screenHeight * 0.03 }}>N/A</Text>
                                    <Text>N/A</Text>
                                </View>
                            </View>

                            <View style={{ marginVertical: screenHeight * 0.02 }}>

                                <View style={styles.detailsItem}>
                                    <Text style={styles.title}>CNIC</Text>
                                    <Text>N/A</Text>
                                </View>

                                <View style={styles.detailsItem}>
                                    <Text style={styles.title}>Blood Group</Text>
                                    <Text>N/A</Text>
                                </View>

                                <View style={styles.detailsItem}>
                                    <Text style={styles.title}>Address</Text>
                                    <Text>N/A</Text>
                                </View>

                                <View style={styles.detailsItem}>
                                    <Text style={styles.title}>City</Text>
                                    <Text>N/A</Text>
                                </View>

                            </View>

                        </View>
                    </DialogContent>
                </Dialog>






                {
                    this.state.isSidebar && 

                    <View style={styles.sidebar}>

                        <TouchableOpacity style={styles.sidebarItem}
                            onPress={() => { this.setState({ mapType: 'standard', isSidebar: !this.state.isSidebar }) }}
                        >
                            <Text>Default Map</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.sidebarItem}
                            onPress={() => { this.setState({ mapType: 'hybrid', isSidebar: !this.state.isSidebar }) }}
                        >
                            <Text>Road Map</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.sidebarItem}
                            onPress={() => { this.setState({ mapType: 'satellite', isSidebar: !this.state.isSidebar }) }}
                        >
                            <Text>Satellite Map</Text>
                        </TouchableOpacity>

                    </View>

                }

            </View>

        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: primaryColor, padding: screenHeight * 0.02, flexDirection: 'row', alignItems: 'center', 
        height: screenHeight * 0.09, justifyContent: 'space-between',
    },
    headerText: {
        color: whiteColor, fontSize: screenHeight * 0.03
    },
    imageStyle: {
        height: screenHeight * 0.06, width: screenHeight * 0.06
    },
    sidebar: {
        backgroundColor: whiteColor, elevation: 6, position: "absolute", right: screenHeight * 0.01, top: screenHeight * 0.01,
        paddingHorizontal: screenHeight * 0.015, paddingVertical: screenHeight * 0.01, width: screenWidth * 0.4
    },
    sidebarItem: {
        padding: screenHeight * 0.02,
    },
    iconContainer: {
        width: '10%'
    },
    item: {
        flexDirection: 'row', alignItems: 'center', marginVertical: screenHeight * 0.01,
    },
    detailsItem: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: screenHeight * 0.01,
    },
    title: {
        fontWeight: "bold",
    },
    modalHeading :{
        fontSize: screenHeight * 0.03
    },
    modalHeader: {
        alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: grayColor, 
        paddingVertical: screenHeight * 0.01
    }
});

export default LiveLocation;