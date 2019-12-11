import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import AsyncStorage from '@react-native-community/async-storage';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const whiteColor = '#fff';
const primaryColor = '#8BC34A';
const greenColor = 'green';
const grayColor = 'gray';

class SideMenu extends Component {

    state = {
        gName: '',
        pressedItem: 'dashboard',
    }

    componentDidMount(){
        AsyncStorage.getItem('data').then(value => {
            var getter = (JSON.parse(value));
            
            this.setState({ gName: getter.gName });
      
        })
    }

    handlePress = (value) => {

        console.log('this is pressed!' + value);
        // this.setState({ pressedItem: value });
        if(this.state.pressedItem == value)
        {
            console.log('true');
            this.props.navigation.toggleDrawer();
        }
        else
        {
            console.log('false');
            this.setState({ pressedItem: value })
            this.props.navigation.navigate(value);
        }
        

    }


    render()
    {
        return(

            <ScrollView>

                <View style={styles.drawerHeader}>

                    <Image source={require('../assets/avatar.png')} style={styles.drawerImage} />
                    <Text style={styles.drawerTitle}>{this.state.gName}</Text>
                    
                </View>

                <View>

                    <View style={styles.itemContainer}>

                        <View style={styles.titleContainer}>
                            <Text>Main</Text>
                        </View>

                        <TouchableOpacity style={styles.item}
                            onPress={() => this.handlePress('dashboard')}
                        >
                            <View style={styles.iconContainer}>
                                <MaterialIcon name='dashboard' size={24} color='gray' />
                            </View>
                            <Text>Dashboard</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.item}
                            onPress={() => this.handlePress('liveDetails')}
                        >
                            <View style={styles.iconContainer}>
                                <Image source={require('../assets/livelocationldpi.png')}  
                                    style={{ width: screenHeight * 0.035, height: screenHeight * 0.035, tintColor: 'gray' }}
                                />
                            </View>
                            <Text>Live Location</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.item}
                            onPress={() => this.handlePress('historyReplay')}
                        >
                            <View style={styles.iconContainer}>
                                <Image source={require('../assets/historyreplayldpi.png')}
                                    style={{ width: screenHeight * 0.035, height: screenHeight * 0.035, tintColor: 'gray' }}
                                />
                            </View>
                            <Text>History Replay</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.itemContainer}>

                        <View style={styles.titleContainer}>
                            <Text>Alert Management</Text>
                        </View>

                        <TouchableOpacity style={styles.item}
                            onPress={() => this.handlePress('alertManagement')}
                        >
                            <View style={styles.iconContainer}>
                                <MaterialIcon name='warning' size={24} color={'gray'} />
                            </View>
                            <Text>Alert Management</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.item}
                            onPress={() => this.handlePress('alertSettings')}
                        >
                            <View style={styles.iconContainer}>
                                <Image source={require('../assets/alertsettingsldpi.png')}  
                                    style={{ width: screenHeight * 0.035, height: screenHeight * 0.035, tintColor: 'gray' }}
                                />
                            </View>
                            <Text>Alert Settings</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.itemContainer}>

                        <View style={styles.titleContainer}>
                            <Text>Code Red</Text>
                        </View>

                        <TouchableOpacity style={styles.item}
                            onPress={() => this.handlePress('codeRed')}
                        >
                            <View style={styles.iconContainer}>
                                <Image source={require('../assets/codered.png')}  
                                    style={{ width: screenHeight * 0.035, height: screenHeight * 0.035, tintColor: 'gray' }}
                                />
                            </View>
                            <Text>Code Red</Text>
                        </TouchableOpacity>

                    </View>


                    <View style={styles.itemContainer}>

                        <View style={styles.titleContainer}>
                            <Text>Reports</Text>
                        </View>

                        <TouchableOpacity style={styles.item}
                            onPress={() => this.handlePress('tripDetails')}
                        >
                            <View style={styles.iconContainer}>
                                <Image source={require('../assets/24hourtripldpi.png')}  
                                    style={{ width: screenHeight * 0.035, height: screenHeight * 0.035, tintColor: 'gray' }}
                                />
                            </View>
                            <Text>Last 24 Hour Trip Report</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.item}
                            onPress={() => this.handlePress('historyReport')}
                        >
                            <View style={styles.iconContainer}>
                                <MaterialIcon name='update' size={24} color={'gray'} />
                            </View>
                            <Text>Last 24 Hour History Report</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.itemContainer}>

                        <View style={styles.titleContainer}>
                            <Text>Settings</Text>
                        </View>

                        <TouchableOpacity style={styles.item}
                            onPress={() => this.handlePress('login')}
                        >
                            <View style={styles.iconContainer}>
                                <MaterialIcon name='exit-to-app' size={24} color='gray' />
                            </View>
                            <Text>Logout</Text>
                        </TouchableOpacity>

                    </View>

                </View>

                {/* <DrawerNavigatorItems {...props} activeTintColor={primaryColor} /> */}

            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    drawerHeader: {
        alignItems: 'center', justifyContent: 'center', paddingVertical: screenHeight * 0.05, borderBottomWidth: 1, borderColor: '#ddd'
    },
    drawerImage: {
        height: screenHeight * 0.06, width: screenHeight * 0.06, borderRadius: screenHeight * 0.03,
    },
    drawerTitle: {
        fontSize: screenHeight * 0.03
    },
    itemContainer: {
        borderBottomWidth: 1, borderColor: '#ddd', paddingHorizontal: screenHeight * 0.03, paddingVertical: screenHeight * 0.02,
    },
    item: {
        flexDirection: 'row', alignItems: 'center', marginVertical: screenHeight * 0.01,
    },
    titleContainer: {
        marginVertical: screenHeight * 0.02
    },
    iconContainer: {
        width: '20%'
    }

});

export default SideMenu;