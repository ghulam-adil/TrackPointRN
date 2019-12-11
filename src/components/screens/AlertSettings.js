import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import ToggleSwitch from 'toggle-switch-react-native';
import Grid from '../Grid';
import Button from '../Button';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const whiteColor = '#fff';
const primaryColor = '#8BC34A';
const greenColor = 'green';
const grayColor = 'gray';

class AlertSettings extends Component {

    static navigationOptions = {
        header: null,
        // drawerLabel: 'Alert Settings',
        // drawerIcon: ({ tintColor }) => (
        //     <Image source={require('../../assets/alertsettingsldpi.png')}  
        //         style={{ width: screenHeight * 0.035, height: screenHeight * 0.035, tintColor: tintColor }}
        //     />
        // )
    };

    state = {
        data: [
            {id: '1', setttings: 'Ignition Off', isOn: true},
            {id: '2', setttings: 'Ignition On', isOn: true},
            {id: '3', setttings: 'Speed Limit Exceed', isOn: true},
        ],
    }

    renderHeader(){

        return(

            <View style={styles.header}>

                <TouchableOpacity
                    onPress={() => { this.props.navigation.toggleDrawer() }}
                >
                    <MaterialIcon name='dehaze' size={24} color={whiteColor} />
                </TouchableOpacity>

                <View style={{ width: '80%' }}>
                    <Text style={styles.headerText}>Alert Settings</Text>
                </View>

            </View>

        );
    }

    handleToggle (index) {
        var data = [...this.state.data];
        data[index].isOn = !data[index].isOn;
        this.setState({ data });
    }

    render()
    {
        return(
            <View style={{ flex: 1 }}>

                {
                    this.renderHeader()
                }

                {/* <ToggleSwitch
                    isOn={this.state.isOn}
                    onColor={primaryColor}
                    offColor={grayColor}
                    labelStyle={{ color: "black", fontWeight: "900" }}
                    size="small"
                    onToggle={() => this.setState({ isOn: !this.state.isOn }) }
                /> */}

                <FlatList 
                        data={this.state.data}
                        renderItem={({ item, index }) => {

                        return(

                            <View style={styles.itemStyle}>
                                
                                <View>
                                    <Text>{item.setttings}</Text>
                                </View>

                                <View>

                                    <ToggleSwitch
                                        isOn={item.isOn}
                                        onColor={primaryColor}
                                        offColor={grayColor}
                                        labelStyle={{ color: "black", fontWeight: "900" }}
                                        size="small"
                                        onToggle={() => this.handleToggle(index) }
                                    />

                                </View>
                                
                            </View>
                        );

                    }
                }
                        keyExtractor={item => item.id}
                />

                <View style={styles.footer}>

                    <Button Button__Label='SAVE SETTINGS' Button__BackgroundColor={primaryColor} Button__TextColor={whiteColor}  />

                </View>

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
    itemStyle: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: whiteColor, elevation: 3,
        marginHorizontal: screenWidth * 0.02, marginVertical: screenWidth * 0.01, padding: screenHeight * 0.02,
    },
    footer: {
        bottom: 0, right: 0, left: 0, position: 'absolute', margin: screenHeight * 0.02,
    }
});

export default AlertSettings;