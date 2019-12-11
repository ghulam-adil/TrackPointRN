import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import haversine from "haversine";

import Geolocation from '@react-native-community/geolocation';

import Grid from '../Grid';

import { variables } from '../variables';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const whiteColor = '#fff';
const primaryColor = '#8BC34A';
const greenColor = 'green';
const grayColor = 'gray';

class LiveDetails extends Component {

    static navigationOptions = {
        header: null,
        // drawerLabel: 'Live Location',
        // drawerIcon: ({ tintColor }) => (
        //     <Image source={require('../../assets/livelocationldpi.png')}  
        //         style={{ width: screenHeight * 0.035, height: screenHeight * 0.035, tintColor: tintColor }}
        //     />
        // )
    };

    state = {
        liveData: [
            {id: '1', vrn: 'TGH-547', speed: 16.0, time: '5 Mins', ignition: 'on', status: 'moving', isChecked: false},
            {id: '2', vrn: 'ABC-258', speed: 5.0, time: '15 Mins', ignition: 'off', status: 'parked', isChecked: false},
            {id: '3', vrn: 'XYZ-936', speed: 99.0, time: '8 Mins', ignition: 'on', status: 'idle', isChecked: false},
            {id: '4', vrn: 'YUI-865', speed: 16.0, time: '5 Mins', ignition: 'on', status: 'moving', isChecked: false},
            {id: '5', vrn: 'LOI-416', speed: 5.0, time: '15 Mins', ignition: 'off', status: 'parked', isChecked: false},
            {id: '6', vrn: 'QWE-963', speed: 99.0, time: '8 Mins', ignition: 'on', status: 'idle', isChecked: false},
            {id: '7', vrn: 'CGH-342', speed: 16.0, time: '5 Mins', ignition: 'on', status: 'moving', isChecked: false},
            {id: '8', vrn: 'DFS-639', speed: 5.0, time: '15 Mins', ignition: 'off', status: 'parked', isChecked: false},
            {id: '9', vrn: 'UJN-897', speed: 99.0, time: '8 Mins', ignition: 'on', status: 'idle', isChecked: false},
            {id: '10', vrn: 'OLJ-951', speed: 16.0, time: '5 Mins', ignition: 'on', status: 'moving', isChecked: false},
            {id: '11', vrn: 'CFG-159', speed: 5.0, time: '15 Mins', ignition: 'off', status: 'parked', isChecked: false},
            {id: '12', vrn: 'NJH-369', speed: 99.0, time: '8 Mins', ignition: 'on', status: 'idle', isChecked: false},
        ],
        data: [],
        isSearch: false,
        value: '',
    }

    
  componentDidMount () {
    // this.props.navigation.closeDrawer();

    AsyncStorage.getItem('data').then(value => {
      var getter = (JSON.parse(value));
      
      fetch(variables.ip +'GETALLVRNSANDDATA', {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  vehicleids: getter.vehicleIdsString,
                  token: getter.token
              }),
          }
      )
      .then(response => response.json())
      .then(responseJson => {
          console.log(JSON.parse(responseJson.d));
          this.setState({ data: JSON.parse(responseJson.d) });
          // console.log('this is data ' + JSON.parse(this.state.data));
      })
      .catch(error => {
          console.log(error);
      })

    })

  }

    renderHeader(){
        if(this.state.isSearch)
        {
            return(

                <View style={styles.header}>

                    <TouchableOpacity
                        onPress={() => { this.props.navigation.toggleDrawer() }}
                    >
                        <MaterialIcon name='dehaze' size={24} color={whiteColor} />
                    </TouchableOpacity>

                    <View style={{ width: '80%' }}>
                        <TextInput 
                            placeholder='Search...'
                            placeholderTextColor={whiteColor}
                            style={{ color: whiteColor, }}
                            onChangeText={(value) => this.setState({ value })}
                            autoFocus = {true}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={() => { this.setState({ isSearch: !this.state.isSearch, value: '' }) }}
                    >
                        <MaterialIcon name='close' size={24} color={whiteColor} />
                    </TouchableOpacity>

                </View>

            );
        }
        else
        {
            return(

                <View style={styles.header}>

                    <TouchableOpacity
                        onPress={() => { this.props.navigation.toggleDrawer() }}
                    >
                        <MaterialIcon name='dehaze' size={24} color={whiteColor} />
                    </TouchableOpacity>

                    <View style={{ width: '80%' }}>
                        <Text style={styles.headerText}>Live Details - {this.state.data.length}</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => { this.setState({ isSearch: !this.state.isSearch }) }}
                    >
                        <MaterialIcon name='search' size={24} color={whiteColor} />
                    </TouchableOpacity>

                </View>

            );

        }

    }

    render()
    {
        return(
            <View style={{ flex: 1 }}>

                {
                    this.renderHeader()
                }

                <Grid 
                    Grid__Header={true}
                    // Grid__Data={this.state.data}
                    Grid__onPress={(data) => this.props.navigation.navigate('liveLocation', { data })}
                    searchValue={this.state.value}
                    isCheckBox={true}
                    isVrn={true}
                    isSpeed={true}
                    isTime={true}
                    isIgnition={true}
                    isStatus={true}
                />

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
});

export default LiveDetails;