import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Accordion from 'react-native-collapsible/Accordion';
import Collapsible from 'react-native-collapsible';

import AsyncStorage from '@react-native-community/async-storage';

import { variables } from '../variables';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const whiteColor = '#fff';
const primaryColor = '#8BC34A';
const greenColor = 'green';
const grayColor = 'gray';

class TripReport extends Component {

    static navigationOptions = {
        header: null,
    }

    state = {
        date: new Date(),
        isCollapsed: true,
        liveData: [
            {id: '1', startDate: new Date(), endDate: new Date(), distance: 155.65},
            {id: '2', startDate: new Date(), endDate: new Date(), distance: 100.78},
            {id: '3', startDate: new Date(), endDate: new Date(), distance: 78},
            {id: '4', startDate: new Date(), endDate: new Date(), distance: 200.65},
            {id: '5', startDate: new Date(), endDate: new Date(), distance: 23.78},
            {id: '6', startDate: new Date(), endDate: new Date(), distance: 147},
        ],
        activeSections: [],
        data: [],
        loading: true,
    }

    componentDidMount () {


        AsyncStorage.getItem('data').then(value => {
            var getter = (JSON.parse(value));

            console.log(this.props.navigation.state.params.item.VehicleRegistrationNumber +' '+ getter.gName +' '+ getter.token);
            
            fetch(variables.ip + 'Get24hTripReportData', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        VRN: this.props.navigation.state.params.item.VehicleRegistrationNumber,
                        GroupName: getter.gName,
                        token: getter.token
                    }),
                }
            )
            .then(response => response.json())
            .then(responseJson => {
                console.log(JSON.parse(responseJson.d));

                if(JSON.parse(responseJson.d).length == 0)
                {
                    // alert('Data is not available for the requested vehicle');
                    Alert.alert(
                        'Data Not Found!',
                        'Data is not available for the requested vehicle',
                        [
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        {cancelable: true},
                      );
                    this.props.navigation.goBack();
                }
                else
                {
                    this.setState({ data: JSON.parse(responseJson.d), loading: false });
                }
                
                
                // console.log('this is data ' + JSON.parse(this.state.data));
            })
            .catch(error => {
                console.log(error);
            })
      
          })



    }

    renderHeader(){
        
            return(

                <View style={styles.header}>

                    <TouchableOpacity
                        onPress={() => { this.props.navigation.goBack() }}
                    >
                        <MaterialIcon name='arrow-back' size={24} color={whiteColor} />
                    </TouchableOpacity>

                    <View style={{ width: '80%' }}>
                        <Text style={styles.headerText}>{this.props.navigation.state.params.item.VehicleRegistrationNumber} - Trip Report</Text>
                    </View>

                </View>

            );

    }

    _renderHeader = section => {
        return (
            <View style={styles.itemStyle}>

                <View style={{ width: '22%' }}>
                    <Text>
                    {/* {section ? section.time.toISOString().slice(0, 10) + section.startDate.toLocaleTimeString('it-IT') : ''} */}
                    {section.Time.replace('T', '')}
                    </Text>
                </View>

                <View style={{ width: '22%' }}>
                    <Text>
                    {/* {section ? section.time1.toISOString().slice(0, 10) + section.endDate.toLocaleTimeString('it-IT') : ''} */}
                    {section.Time1.replace('T', '')}
                    </Text>
                </View>

                <View>
                    <Text>{Math.round(section.DistanceTravel * 100) / 100}</Text>
                </View>

                <View>
                    <MaterialIcon name='arrow-drop-down' size={24} />
                </View>

            </View>
        );
    };

    _renderContent = section => {
        return (
            <View>
                
                <View style={styles.collapsedContent}>

                    <Text style={{ alignSelf: 'center' }}>Trip Start</Text>

                    <View style={styles.row}>
                        <Text>Date Time</Text>
                        <Text>{section.Time.replace('T', ' ')}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text>Ignition</Text>
                        <Text>{section.IgnitionOn}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text>Mileage</Text>
                        <Text>{Math.round(section.Mileage * 100) / 100}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text>LandMark</Text>
                        <Text style={{ width: '70%' }}>{section.Landmark}</Text>
                    </View>

                </View>

                <View style={styles.collapsedContent}>

                    <Text style={{ alignSelf: 'center' }}>Trip End</Text>

                    <View style={styles.row}>
                        <Text>Date Time</Text>
                        <Text>{section.Time1.replace('T', ' ')}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text>Ignition</Text>
                        <Text>{section.IgnitionOff}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text>Mileage</Text>
                        <Text>{Math.round(section.Mileage1 * 100) / 100}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text>LandMark</Text>
                        <Text style={{ width: '70%' }}>{section.Landmark1}</Text>
                    </View>

                </View>

                <View style={styles.collapsedContent}>

                    <Text style={{ alignSelf: 'center' }}>Trip Summary</Text>

                    <View style={styles.row}>
                        <Text>Distance</Text>
                        <Text>{Math.round(section.DistanceTravel * 100) / 100}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text>Duration</Text>
                        <Text>{section.TripDuration}</Text>
                    </View>

                </View>

            </View>
        );
    };

    _updateSections = activeSections => {
        this.setState({ activeSections });
    };

    render(){
        return(

            <ScrollView>

                {
                    this.state.loading ? 

                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size='large' color={primaryColor} />
                        <Text style={styles.waitingText}>Please Wait...</Text>
                    </View>

                    :

                    <View>

                        {
                            this.renderHeader()
                        }

                        <View style={styles.gridHeader}>

                            <Text style={styles.text}>Start Date</Text>
                            <Text style={styles.text}>End Date</Text>
                            <Text style={styles.text}>Distance</Text>

                            <View>
                                <MaterialIcon name='fullscreen' size={24} color={whiteColor} />
                            </View>
                    
                        </View>

                        <Accordion
                            sections={this.state.data}
                            activeSections={this.state.activeSections}
                            renderSectionTitle={this._renderSectionTitle}
                            renderHeader={this._renderHeader}
                            renderContent={this._renderContent}
                            onChange={this._updateSections}
                            underlayColor='transparent'
                        />


                    </View>

                }

            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: primaryColor, padding: screenHeight * 0.02, flexDirection: 'row', alignItems: 'center', height: screenHeight * 0.09,
        justifyContent: 'space-between',
    },
    headerText: {
        color: whiteColor, fontSize: screenHeight * 0.03
    },
    gridHeader: {
        backgroundColor: '#6B9946', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
        padding: screenHeight * 0.02,
    },
    text: {
        color: whiteColor
    },
    itemStyle: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: whiteColor, elevation: 3,
        marginHorizontal: screenWidth * 0.02, marginVertical: screenWidth * 0.01, padding: screenHeight * 0.01,
    },
    row: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    },
    collapsedContent: {
        borderTopWidth: 1, borderColor: grayColor, backgroundColor: whiteColor, elevation: 3,
        marginHorizontal: screenWidth * 0.02, padding: screenHeight * 0.01,
    },
    waitingText: {
        color: primaryColor
    },
    loadingContainer: {
        alignItems: 'center', justifyContent: 'center', height: screenHeight
    }
});

export default TripReport;