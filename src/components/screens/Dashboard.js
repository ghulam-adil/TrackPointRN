import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, FlatList, ScrollView, ActivityIndicator, 
    StatusBar } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import { VictoryBar, VictoryChart, VictoryTheme, VictoryScatter } from "victory-native";

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { variables } from '../variables';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const whiteColor = '#fff';
const primaryColor = '#8BC34A';
const greenColor = 'green';
const grayColor = 'gray';

const data1 = [
    {id: 'Night Time Violation', type: 'Night Time Violation', fill: '#512DA8', count: 5, label: 5, },
    {id: 'Continuous Driving', type: 'Continuous Driving', fill: '#E53935', count: 5, label: 5, },
    {id: 'Stop Time Violation', type: 'Stop Time Violation', fill: '#C51162', count: 5, label: 5, },
    {id: 'Speed Violation', type: 'Speed Violation', fill: '#C2185B', count: 5, label: 5, },
    {id: 'Harsh Break', type: 'Harsh Break', fill: '#0097A7', count: 5, label: 5, },
    {id: 'No Vehicle Activity', type: 'No Vehicle Activity', fill: '#607D8B', count: 5, label: 5, },
    {id: 'Moving', type: 'Moving', fill: '#689F38', count: 5, label: 5, },
    {id: 'Parked', type: 'Parked', fill: '#FDD835', count: 5, label: 5, },
    {id: 'Idle', type: 'Idle', fill: '#1976D2', count: 5, label: 5, },
    {id: 'Fence', type: 'Fence', fill: '#FF5722', count: 5, label: 5, },
    {id: 'Blackspot Violation', type: 'Blackspot Violation', fill: '#131313', count: 5, label: 5, },
    {id: 'Route Deviation', type: 'Route Deviation', fill: '#D50000', count: 5, label: 5, },
    {id: 'ETA', type: 'ETA', fill: '#7986CB', count: 5, label: 5, },
    {id: 'RTDT', type: 'RTDT', fill: '#039BE5', count: 5, label: 5, },
    {id: 'Destination Time In', type: 'Destination Time In', fill: '#7EC148', count: 5, label: 5, },
    {id: 'Source Time Out', type: 'Source Time Out', fill: '#9575CD', count: 5, label: 5, },
    {id: 'Battery Temper', type: 'Battery Temper', fill: '#FF5252', count: 15, label: 15, },
    {id: 'Idle Exceed', type: 'Idle Exceed', fill: '#D500F9', count: 5, label: 5, },
    {id: 'Poi Stay', type: 'Poi Stay', fill: '#448AFF', count: 5, label: 5, },
    {id: 'Destination Time Out', type: 'Destination Time Out', fill: '#7EC148', count: 5, label: 5, },
    {id: 'WayPoint Time In', type: 'WayPoint Time In', fill: '#7EC148', count: 5, label: 5, },
    {id: 'WayPoint Time Out', type: 'WayPoint Time Out', fill: '#7EC148', count: 5, label: 5, }
];

class Dashboard extends Component {

    static navigationOptions = {
        header: null,
        // drawerLabel: 'Dashboard',
        // drawerIcon: ({ tintColor }) => (
        //     <MaterialIcon name='dashboard' size={24} color={tintColor} />
        // )
    };

    state = {
        isSearch: false,
        data: [
            { fill: '#512DA8' },
            { fill: '#E53935' },
            { fill: '#C51162' },
            { fill: '#C2185B' },
            { fill: '#0097A7' },
            { fill: '#607D8B' },
            { fill: '#689F38' },
            { fill: '#FDD835' },
            { fill: '#1976D2' },
            { fill: '#FF5722' },
            { fill: '#131313' },
            { fill: '#D50000' },
            { fill: '#7986CB' },
            { fill: '#039BE5' },
            { fill: '#7EC148' },
            { fill: '#9575CD' },
            { fill: '#FF5252' },
            { fill: '#D500F9' },
            { fill: '#448AFF' },
            { fill: '#7EC148' },
            { fill: '#7EC148' },
            { fill: '#7EC148' }
        ],
        check: false,
        loading: true,
    }

    componentDidMount() {

        // this.props.navigation.closeDrawer();

        console.log('sssssss');
        // console.log(AsyncStorage);

        AsyncStorage.getItem('data').then(value => {
            var getter = (JSON.parse(value));

            // this.setState({
            //     vehicleIdsString: getter.vehicleIdsString,
            //     gName: getter.gName,
            //     token: getter.token,
            // });
            console.log('this is data');
            console.log(getter.vehicleIdsString +' '+ getter.gName +' '+ getter.token);

                fetch(variables.ip +'DASHBOARD_COUNTSANDROID', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        vehicleids: getter.vehicleIdsString.toString(),
                        groupname: getter.gName.toString(),
                        token: getter.token.toString(),
                    }),
                }
            )
            .then(response => response.json())
            .then(responseJson => {
                console.log("Adil hola");
                console.log(responseJson);

                console.log(JSON.parse(responseJson.d));
                var data = JSON.parse(responseJson.d).alarmlist;

                console.log('dashboard response ' + JSON.stringify(responseJson));

                var newArray = [...this.state.data];

                data.map((value, index) => {
                    
                    console.log(value);
                    console.log(newArray[index]);
                    newArray[index].id = value.id;
                    newArray[index].type = value.type;
                    newArray[index].count = value.count;
                    newArray[index].label = value.count;
                    // newArray[index].y = index;
                })
                this.setState({ data: newArray, check: true, loading: false });

            })
            .catch(error => {
                console.log(error);
            })
            
        });

    }

    renderHeader(){
        
            return(

                <View style={styles.header}>

                    <StatusBar backgroundColor={primaryColor} barStyle="light-content" />

                    <TouchableOpacity
                        onPress={() => { this.props.navigation.toggleDrawer() }}
                    >
                        <MaterialIcon name='dehaze' size={24} color={whiteColor} />
                    </TouchableOpacity>

                    <View style={{ width: '80%' }}>
                        <Text style={styles.headerText}>Dashboard</Text>
                    </View>

                </View>

            );

    }

    render()
    {
        return(
            <View style={{ flex: 1 }}>

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

                        <View style={{ backgroundColor: '#ececec' }}>

                            <VictoryChart width={screenWidth} height={screenHeight * 0.4} theme={VictoryTheme.material}
                                domainPadding={{ x: 20 }}
                            >
                                <VictoryBar
                                    data={this.state.check ? this.state.data : data1}
                                    y='count'
                                    // y='y'
                                    style={{
                                        data: {
                                            fill: ({ datum }) => datum.fill,
                                        }
                                    }}
                                
                                />
                            </VictoryChart>

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                        {
                            this.state.data.map( (value, index, array) => {
                        
                                return(

                                    <View key={index} style={[ styles.smallBox, { backgroundColor: value.fill } ]}>

                                    </View>

                                );
                            })
                        }

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>

                        {
                            this.state.data.map( (value, index, array) => {
                        
                                return(

                                    <View key={index} style={[styles.box, { borderColor: value.fill }]}>
                                        <Text>{value.id}</Text>
                                        <Text>{value.count}</Text>
                                    </View>

                                );
                            })
                        }

                        </View>

                    </View>

                }

                </ScrollView>

            </View>
            
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
    row: {
        flexDirection: 'row', alignItems: 'center',
    },
    box: {
        width: screenWidth * 0.46, paddingVertical: screenHeight * 0.03, backgroundColor: whiteColor, borderLeftWidth: screenWidth * 0.03, 
        elevation: 4, alignItems: 'center', justifyContent: 'center', margin: screenHeight * 0.01,
    },
    smallBox: {
        height: screenHeight * 0.015, width: screenHeight * 0.015, margin: screenWidth * 0.005
    },
    waitingText: {
        color: primaryColor
    },
    loadingContainer: {
        alignItems: 'center', justifyContent: 'center', height: screenHeight
    }
});

export default Dashboard;