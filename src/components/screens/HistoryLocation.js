import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ToastAndroid, Image } from 'react-native';

import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

import CustomMarker from './CustomMarker';

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';

import { variables } from '../variables';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const ASPECT_RATIO = screenWidth / screenHeight;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const timeout = 2000;
let animationTimeout;

const whiteColor = '#fff';
const primaryColor = '#8BC34A';
const greenColor = 'green';
const grayColor = 'gray';

var radio_props = [
  {label: 'All', value: 'all' },
  {label: 'Moving', value: 'moving' },
  {label: 'Parked', value: 'parked' },
  {label: 'Idle', value: 'idle' }
];

class HistoryLocation extends Component {

    static navigationOptions = {
        header: null,
    }

    state = {
        heightOfHeader: null,
        mapType: 'standard',
        isSidebar: false,
        visible: false,
        selectedItem: '',
        data: [],
        coordinate: {
            latitude: 22,
            longitude: 44,
        },
        durations: []
    }

    // setRadioButton = (index) => {
    //     alert('this is index ' +index);
    // }

    componentDidMount(){
        console.log('blalskjdfklsklfjklsj');
        console.log(this.props.navigation.state.params.data);
        // console.log(this.props.navigation.state.params.data1);
        // this.setState({ data: this.props.navigation.state.params.data })

        animationTimeout = setTimeout(() => {
            this.mapRef.fitToCoordinates(this.props.navigation.state.params.data1, true);
        }, 1000);

        // this.mapRef.fitToCoordinates(this.props.navigation.state.params.data1, true);

        // this.scheduleNextUpdate();

        var wait = 500;
        durations = [];
        this.props.navigation.state.params.data.map(value => {
            durations.push(wait);
            wait = wait + 500;
        })

        this.setState({ durations });

        setTimeout(() => {
            console.log(this.state.durations);
        }, 3000);
    }

    // componentWillMount() {
    //     var wait = 1000;
    //     durations = [];
    //     this.props.navigation.state.params.data.map(value => {
    //         durations.push(wait);
    //         wait = wait + 1000;
    //     })

    //     this.setState({ durations });

    //     setTimeout(() => {
    //         console.log(this.state.durations);
    //     }, 3000);
    // }

    handlePress = () => {



    //     fetch(variables.ip +'GETHISTORYDATA', {
    //           method: 'POST',
    //           headers: {
    //               Accept: 'application/json',
    //               'Content-Type': 'application/json',
    //           },
    //           body: JSON.stringify({
    //               VEHICLEID: id,
    //               start: start,
    //               end: end,
    //               token: getter.token
    //           }),
    //       }
    //   )
    //   .then(response => response.json())
    //   .then(responseJson => {
    //       console.log(JSON.parse(responseJson.d));
    //       this.setState({ data: JSON.parse(responseJson.d) });
    //       // console.log('this is data ' + JSON.parse(this.state.data));
    //   })
    //   .catch(error => {
    //       console.log(error);
    //   })






        if(this.state.selectedItem !=='')
        {
            this.setState({ visible: !this.state.visible });
            console.log(this.state.selectedItem);
        }
        else
        {
            ToastAndroid.showWithGravity(
                'Please select an option from above',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
            );
        }
        
        // alert(this.state.selectedItem);
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


    render()
    {
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

                    <View style={{ width: '70%', }}>
                        <Text style={styles.headerText}>History Replay</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => { this.setState({ visible: !this.state.visible }) }}
                    >
                        <MaterialIcon name='settings' size={26} color={whiteColor} />
                    </TouchableOpacity>

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
                    initialRegion={{
                        latitude: this.props.navigation.state.params.data.length > 0 ? this.props.navigation.state.params.data[0].Latitude : 24.871975,
                        longitude: this.props.navigation.state.params.data.length > 0 ? this.props.navigation.state.params.data[0].Longitude : 67.062559,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                    mapType={this.state.mapType}
                    onStartShouldSetResponder={() => { this.setState({ isSidebar: false }) }}
                >
                    
                    {
                        this.props.navigation.state.params.data != null && this.props.navigation.state.params.data.map((value, index) => (

                            // <Marker
                            //     key = {index}
                            //     coordinate = {{
                            //         latitude: value.Latitude,
                            //         longitude: value.Longitude
                            //     }}
                            //     // title = {value.VehicleRegistrationNumber}
                            // >

                            //     {
                            //         this.handleMarker(value.VehicleStatus)
                            //     }

                            // </Marker>

                            <CustomMarker 
                                key = {index}
                                value = {value}
                                wait = {this.state.durations[index]}
                            />
                        ))
                    }
                            
                    <Polyline
                        coordinates={this.props.navigation.state.params.data1}
                        strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeWidth={6}
                    />
                    

                </MapView>


                <Dialog
                    visible={this.state.visible}
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                    // onTouchOutside={() => {
                    //     this.setState({ visible: false });
                    // }}
                >
                    <DialogContent>
                        <View style={{ width: screenWidth * 0.82, height: screenHeight * 0.35 }}>
                            
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalHeading}>Settings</Text>
                            </View>

                            <View style={{ marginVertical: screenHeight * 0.02 }}>

                                <Text>Select Option from below</Text>

                                <RadioForm
                                    style={{ marginVertical: screenHeight * 0.01, }}
                                    radio_props={radio_props}
                                    onPress={(value) => { this.setState({ selectedItem: value }) }}
                                    animation={true}
                                    buttonColor={primaryColor}
                                    selectedButtonColor={primaryColor}
                                    buttonSize={screenHeight * 0.02}
                                    initial={-1}
                                >

                                </RadioForm>
                                
                                <TouchableOpacity style={styles.button}
                                    onPress={this.handlePress}
                                >
                                    <Text style={styles.buttonText}>Save Settings</Text>
                                </TouchableOpacity>

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
    },
    button: {
        backgroundColor: primaryColor, alignItems: 'center', justifyContent: 'center', padding: screenHeight * 0.02
    },
    buttonText: {
        color: whiteColor, textTransform: 'uppercase', fontSize: screenHeight * 0.025,
    }
});

export default HistoryLocation;