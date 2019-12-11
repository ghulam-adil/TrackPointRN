import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const whiteColor = '#fff';
const primaryColor = '#8BC34A';
const greenColor = 'green';
const grayColor = 'gray';

import Grid from '../Grid';

class HistoryReport extends Component {

    static navigationOptions = {
        header: null,
        // drawerLabel: 'Last 24 Hour History Report',
        // drawerIcon: ({ tintColor }) => (
        //     <MaterialIcon name='update' size={24} color={tintColor} />
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
                        <Text style={styles.headerText}>History Details</Text>
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
                    Grid__onPress={(uri) => this.props.navigation.navigate('testing', { uri })}
                    Grid__screen='HistoryReport'
                    searchValue={this.state.value}
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

export default HistoryReport;