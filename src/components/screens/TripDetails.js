import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Grid from '../Grid';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const whiteColor = '#fff';
const primaryColor = '#8BC34A';
const greenColor = 'green';
const grayColor = 'gray';

class TripDetails extends Component {

    static navigationOptions = {
        header: null,
        // drawerLabel: 'Last 24 Hour Trip Report',
        // drawerIcon: ({ tintColor }) => (
        //     <Image source={require('../../assets/24hourtripldpi.png')}  
        //         style={{ width: screenHeight * 0.035, height: screenHeight * 0.035, tintColor: tintColor }}
        //     />
        // )
    };

    state = {
        liveData: [
            {id: '1', vrn: 'TGH-547', speed: 16.0, time: '5 Mins', ignition: 'on', status: 'moving'},
            {id: '2', vrn: 'ABC-258', speed: 5.0, time: '15 Mins', ignition: 'off', status: 'parked'},
            {id: '3', vrn: 'XYZ-936', speed: 99.0, time: '8 Mins', ignition: 'on', status: 'idle'},
        ],
        isSearch: false,
        value: '',
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
                        <Text style={styles.headerText}>Trip Details</Text>
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
                    // Grid__Data={this.state.liveData}
                    searchValue={this.state.value}
                    Grid__screen='TripDetails'
                    Grid__onPress={(item) => this.props.navigation.navigate('tripReport', { item: item })}
                    isCheckBox={false}
                    isVrn={true}
                    isSpeed={false}
                    isTime={false}
                    isIgnition={false}
                    isStatus={false}
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
    }
});

export default TripDetails;