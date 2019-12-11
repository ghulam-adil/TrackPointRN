import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, ToastAndroid, Image, StatusBar, ScrollView, KeyboardAvoidingView } 
        from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Form from '../Form';
import Button from '../Button';

import { variables } from '../variables';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const whiteColor = '#fff';
const primaryColor = '#8BC34A';
const greenColor = 'green';
const grayColor = 'gray';

class Login extends Component{

    static navigationOptions = {
        // drawerLabel: 'Logout',
        // drawerIcon: ({ tintColor }) => (
        //     <MaterialIcon name='exit-to-app' size={24} color={tintColor} />
        // )
        header: null,
    };

    state = {
        showPassword: true,
        name: '',
        password: '',
        token: '',
        // data: {
        //     userName: '',
        //     password: '',
        // }
    };

    componentDidMount() {
        //this.handleLogin();
        this.autoLogin();
    }

    autoLogin = () => {

        AsyncStorage.getItem('data').then(value => {
            console.log(JSON.parse(value).name);
            console.log(JSON.parse(value).password);


            fetch(variables.ip +'LOGINVERIFY', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: JSON.parse(value).name,
                        password: JSON.parse(value).password,
                        datetime: '23-10-19',
                        imei: '867796037481707',
                    }),
                }
            )
            .then(response => response.json())
            .then(responseJson => {

                console.log(JSON.parse(responseJson.d).status);

                if(JSON.parse(responseJson.d).status == 'successful')
                {
                    this.props.navigation.navigate('dashboard');
                }

            })
            .catch(error => {
                console.log(error);
            })

        })


    }



    handlePress = () => {
        console.log(variables.ip)
        var { name, password } = this.state;

        if(name == '' || password == '')
        {
            // ToastAndroid.show('Please Fill All Fields!', ToastAndroid.SHORT);
            ToastAndroid.showWithGravity(
                'Please Fill All Fields!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
        else
        {

            fetch(variables.ip +'generatetokenNew', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: name,
                        password: password,
                        datetime: '23-10-19',
                        imei: '867796037481707',
                    }),
                }
            )
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                // this.props.navigation.navigate('dashboard', { data: responseJson });
                console.log(responseJson.d);
                this.setState({ token: responseJson.d })
            })
            .catch(error => {
                console.log(error);
            })

            fetch(variables.ip +'LOGINVERIFY', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: name,
                        password: password,
                        datetime: '23-10-19',
                        imei: '867796037481707',
                    }),
                }
            )
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson.d);

                var vehicleIds = JSON.parse(responseJson.d).vehicleids;

                var vehicleIdsString = '';

                vehicleIds.map((value, index) => {
                    console.log(value.VehicleId);
                    if(index == 0)
                    {
                        vehicleIdsString = vehicleIdsString + value.VehicleId;
                    }
                    else
                    {
                        vehicleIdsString = vehicleIdsString +','+ value.VehicleId;
                    }
                })

                var gName = JSON.parse(responseJson.d).gname;
                var gId = JSON.parse(responseJson.d).gid;

                const data = {
                    vehicleIdsString,
                    gName,
                    gId,
                    token: this.state.token,
                    name: name,
                    password: password
                };

                AsyncStorage.setItem('data', JSON.stringify(data));

                this.props.navigation.navigate('dashboard');

            })
            .catch(error => {
                console.log(error);
            })

        }
    }

    render(){
        return(

            <View style={{ flex: 1 }}>

                    <StatusBar backgroundColor={whiteColor} barStyle="dark-content" />

                    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>

                    <View style={styles.logoContainer}>

                        <Image source={require('../../assets/logo.gif')} style={{ height: '100%', width: '100%' }} />

                    </View>

                    <View style={styles.textBox}>
                        <MaterialIcon name='person-outline' size={24} style={styles.icon} />
                        <TextInput 
                            placeholder='Username Here'
                            style={styles.textInput}
                            onChangeText={(name) => { this.setState({ name }) }}
                        />
                    </View>

                    <View style={styles.textBox}>
                        <MaterialIcon name='lock-outline' size={24} style={styles.icon} />
                        <TextInput 
                            placeholder='Password Here'
                            secureTextEntry={this.state.showPassword}
                            style={[ styles.textInput, { width: '80%' } ]}
                            onChangeText={(password) => { this.setState({ password }) }}
                        />

                        <TouchableOpacity
                            onPress={() => { this.setState({ showPassword: !this.state.showPassword }) }}
                        >
                            <FontAwesome5 style={styles.icon} name={this.state.showPassword ? 'eye-slash' : 'eye'} size={20} />
                        </TouchableOpacity>

                    </View>

                    <View style={{ marginHorizontal: screenHeight * 0.08 }}>
                        <TouchableOpacity style={styles.button}
                            onPress={() => this.handlePress()}
                        >
                            {/* <Text style={styles.buttonText}>Login</Text> */}
                            <MaterialIcon name='keyboard-arrow-right' size={40} color={whiteColor} />
                        </TouchableOpacity>
                    </View>

                    </ScrollView>

                    <Image source={require('../../assets/earth1.png')} style={styles.image} />

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: primaryColor, height: '100%', alignItems: 'center', justifyContent: 'center',
    },
    logoContainer: {
        height: screenHeight * 0.2, marginVertical: screenHeight * 0.06, alignItems: 'center', justifyContent: 'center'
    },
    innerContainer: {
        backgroundColor: whiteColor, width: screenWidth * 0.9, padding: screenHeight * 0.03
    },
    heading: {
        fontSize: screenHeight * 0.05, alignSelf: 'center'
    },
    formItem: {
        borderBottomWidth: 1, borderColor: primaryColor, marginVertical: screenHeight * 0.02
    },
    textBox: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: whiteColor, elevation: 4, borderRadius: screenHeight * 0.04,
        marginVertical: screenHeight * 0.02, marginHorizontal: screenHeight * 0.08, paddingHorizontal: screenWidth * 0.05, zIndex: 2
    },
    label: {
        fontSize: screenHeight * 0.018
    },
    textInput: {
        width: '85%',
    },
    button: {
        alignItems: 'center', justifyContent: 'center', backgroundColor: primaryColor, borderRadius: screenWidth * 0.75, 
        alignSelf: 'flex-end', elevation: 3, height: screenWidth * 0.13, width: screenWidth * 0.25, marginTop: screenHeight * 0.02,
    },
    text: {
        color: whiteColor, 
    },
    buttonText: {
        color: whiteColor
    },
    icon: {
        color: primaryColor,
    },
    image: {
        position: 'absolute', bottom: 0, left: 0, height: screenHeight * 0.35, width: screenHeight * 0.35,
    }
});

export default Login;